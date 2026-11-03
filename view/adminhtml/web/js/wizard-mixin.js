/**
 * Trusteed Setup Wizard JS mixin — Spec 050 T062.
 *
 * Flujo OAuth-like:
 *  1. Merchant pulsa "Conectar con Trusteed →".
 *  2. Se abre un popup hacia trusteed.xyz/connect/magento.
 *  3. El popup devuelve {type, connect_token, merchant_id} via postMessage.
 *  4. El mixin guarda el connect_token (de un solo uso, transitorio) en el data
 *     source del formulario y dispara el guardado. El intercambio del
 *     connect_token por los secretos provisionados
 *     ({connection_id, webhook_secret, embed_secret}) ocurre SERVER-SIDE en
 *     Setup\Save (POST /platform/magento/validate-connect-token), de modo que el
 *     connect_token NO se persiste como secreto de larga vida ni viaja de vuelta
 *     al navegador. El éxito/error se reflejan con los mensajes reales que
 *     devuelve el servidor tras el guardado (sin 201 falsos).
 */
define(["jquery", "mage/translate"], function ($, $t) {
  "use strict";

  var POPUP_WIDTH = 500;
  var POPUP_HEIGHT = 620;
  var POPUP_TIMEOUT_MS = 300000; // 5 min máximo para que el merchant autorice
  var MSG_TYPE = "trusteed:magento:connected";

  return function (Component) {
    return Component.extend({
      defaults: {
        tokenVerified: false,
        isConnected: false,
        connectPopup: null,
        connectState: null,
        connectTimeoutId: null,
        apiBaseUrl: "https://api.trusteed.xyz",
        trusteedDashboardUrl: "https://trusteed.xyz",
        imports: {
          apiBaseUrl: "${ $.provider }:data.api_base_url",
          isConnected: "${ $.provider }:data.is_connected",
        },
      },

      initialize: function () {
        this._super();
        // Si ya está conectado (merchant_id + token guardados), no bloquear guardado
        if (this.isConnected) {
          this.tokenVerified = true;
          this._showStatus(
            "success",
            $t(
              "Tu tienda ya está conectada. Puedes cambiar la configuración y guardar."
            )
          );
        }
        this._bindPostMessage();
        return this;
      },

      // -----------------------------------------------------------------------
      // Método principal: abre el popup OAuth
      // -----------------------------------------------------------------------

      connectWithTrusteed: function () {
        var self = this;

        if (this.connectPopup && !this.connectPopup.closed) {
          this.connectPopup.focus();
          return;
        }

        // Genera un nonce de estado para evitar ataques de postMessage
        this.connectState = this._generateNonce();

        var origin = window.location.origin;
        var baseUrl = (
          this.trusteedDashboardUrl || "https://trusteed.xyz"
        ).replace(/\/$/, "");
        var popupUrl =
          baseUrl +
          "/connect/magento" +
          "?origin=" +
          encodeURIComponent(origin) +
          "&state=" +
          encodeURIComponent(this.connectState);

        var left = Math.round(
          window.screenX + (window.outerWidth - POPUP_WIDTH) / 2
        );
        var top = Math.round(
          window.screenY + (window.outerHeight - POPUP_HEIGHT) / 2
        );

        this.connectPopup = window.open(
          popupUrl,
          "trusteed_connect",
          "width=" +
            POPUP_WIDTH +
            ",height=" +
            POPUP_HEIGHT +
            ",left=" +
            left +
            ",top=" +
            top +
            ",menubar=no,toolbar=no,location=no,status=no"
        );

        if (!this.connectPopup) {
          this._showStatus(
            "error",
            $t(
              "El navegador ha bloqueado la ventana emergente. Permite las ventanas emergentes para esta página e inténtalo de nuevo."
            )
          );
          return;
        }

        this._showStatus(
          "info",
          $t(
            "Se ha abierto una ventana de Trusteed. Conéctate allí y vuelve aquí."
          )
        );

        // Timeout de seguridad
        this.connectTimeoutId = setTimeout(function () {
          if (self.connectPopup && !self.connectPopup.closed) {
            self.connectPopup.close();
          }
          if (!self.tokenVerified) {
            self._showStatus(
              "error",
              $t(
                "El tiempo de espera ha expirado. Vuelve a pulsar 'Conectar con Trusteed' para intentarlo de nuevo."
              )
            );
          }
        }, POPUP_TIMEOUT_MS);
      },

      // -----------------------------------------------------------------------
      // Listener postMessage
      // -----------------------------------------------------------------------

      _bindPostMessage: function () {
        var self = this;
        window.addEventListener("message", function (event) {
          self._handlePostMessage(event);
        });
      },

      _handlePostMessage: function (event) {
        if (!event.data || event.data.type !== MSG_TYPE) return;

        // Valida el origen — solo acepta el dominio del dashboard de Trusteed
        var expectedOrigin = (
          this.trusteedDashboardUrl || "https://trusteed.xyz"
        ).replace(/\/$/, "");
        if (event.origin !== expectedOrigin) {
          return;
        }

        // Valida el nonce de estado
        if (!this.connectState || event.data.state !== this.connectState) {
          this._showStatus(
            "error",
            $t("La respuesta de Trusteed no es válida. Inténtalo de nuevo.")
          );
          return;
        }

        clearTimeout(this.connectTimeoutId);
        this.connectState = null;

        var connectToken = event.data.connect_token;
        var merchantId = event.data.merchant_id;

        if (!connectToken || !merchantId) {
          this._showStatus(
            "error",
            $t("Respuesta incompleta de Trusteed. Inténtalo de nuevo.")
          );
          return;
        }

        // El connect_token es de un solo uso: NO lo persistimos como
        // integration_token (secreto de larga vida). Lo colocamos en el data
        // source del formulario bajo `connect_token` para que Setup\Save lo
        // intercambie SERVER-SIDE por los secretos provisionados y nunca lo
        // guarde como credencial permanente.
        this._setSourceValue("connect_token", connectToken);
        this._setSourceValue("merchant_id", merchantId);

        // Limpia cualquier integration_token previo del data source para no
        // arrastrar un connect_token antiguo como si fuera secreto permanente.
        this._setSourceValue("integration_token", "");

        this.tokenVerified = true;

        this._showStatus(
          "info",
          $t("Conectando con Trusteed… completando la configuración.")
        );

        // Dispara el guardado real. El connect_token se intercambia en el
        // servidor; el mensaje de éxito/error que verá el merchant lo emite
        // Setup\Save (mensajes de Magento). No fabricamos un éxito falso aquí.
        this.save();
      },

      /**
       * Escribe un valor en el data source del formulario UI component (lo que
       * realmente se envía al guardar). Cae a manipulación del input oculto si
       * el data source aún no está disponible.
       */
      _setSourceValue: function (key, value) {
        if (this.source && typeof this.source.set === "function") {
          this.source.set("data." + key, value);
          return;
        }
        $("input[name='" + key + "']")
          .val(value)
          .trigger("change");
      },

      // -----------------------------------------------------------------------
      // Sobreescribe el guardado: requiere que el token esté verificado
      // -----------------------------------------------------------------------

      save: function (redirect, data) {
        if (!this.tokenVerified) {
          this._showStatus(
            "error",
            $t(
              "Primero conecta tu tienda pulsando el botón 'Conectar con Trusteed →'."
            )
          );
          return;
        }
        this._super(redirect, data);
      },

      // -----------------------------------------------------------------------
      // Helpers
      // -----------------------------------------------------------------------

      _generateNonce: function () {
        var arr = new Uint8Array(16);
        window.crypto.getRandomValues(arr);
        return Array.from(arr)
          .map(function (b) {
            return ("0" + b.toString(16)).slice(-2);
          })
          .join("");
      },

      _showStatus: function (type, message) {
        var container = $("#trusteed-connect-status");
        if (!container.length) {
          container = $(
            '<div id="trusteed-connect-status" style="margin-top:12px;padding:10px 14px;border-radius:6px;font-size:14px;"></div>'
          );
          // Inserta después del primer botón del fieldset step_integration_token
          $('[data-index="step_integration_token"]').append(container);
        }

        container.removeClass("message-success message-error message-notice");

        if (type === "success") {
          container.addClass("message-success");
        } else if (type === "error") {
          container.addClass("message-error");
        } else {
          container.css({
            background: "#eff6ff",
            border: "1px solid #bfdbfe",
            color: "#1e40af",
          });
        }

        container.text(message).show();
      },
    });
  };
});
