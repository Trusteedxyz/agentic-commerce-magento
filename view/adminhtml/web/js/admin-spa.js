var kw = Object.defineProperty;
var wf = (se) => {
  throw TypeError(se);
};
var Sw = (se, le, _e) =>
  le in se
    ? kw(se, le, { enumerable: !0, configurable: !0, writable: !0, value: _e })
    : (se[le] = _e);
var _n = (se, le, _e) => Sw(se, typeof le != "symbol" ? le + "" : le, _e),
  ou = (se, le, _e) => le.has(se) || wf("Cannot " + _e);
var h = (se, le, _e) => (
    ou(se, le, "read from private field"),
    _e ? _e.call(se) : le.get(se)
  ),
  q = (se, le, _e) =>
    le.has(se)
      ? wf("Cannot add the same private member more than once")
      : le instanceof WeakSet
        ? le.add(se)
        : le.set(se, _e),
  L = (se, le, _e, wa) => (
    ou(se, le, "write to private field"),
    wa ? wa.call(se, _e) : le.set(se, _e),
    _e
  ),
  Q = (se, le, _e) => (ou(se, le, "access private method"), _e);
var so = (se, le, _e, wa) => ({
  set _(we) {
    L(se, le, we, _e);
  },
  get _() {
    return h(se, le, wa);
  },
});
(function () {
  "use strict";
  var mn,
    Dr,
    ca,
    uf,
    Ir,
    su,
    df,
    ua,
    Mr,
    da,
    pf,
    hn,
    mf,
    fn,
    pa,
    wt,
    gn,
    Le,
    vs,
    yn,
    dt,
    kf,
    ur,
    hf,
    rt,
    ee,
    xs,
    Ge,
    vn,
    ma,
    sr,
    Fr,
    bs,
    ha,
    fa,
    xn,
    bn,
    zr,
    ga,
    ae,
    Rs,
    lu,
    cu,
    uu,
    du,
    pu,
    mu,
    hu,
    Sf,
    ff,
    ws,
    qt,
    $e,
    wn,
    Bt,
    Kr,
    gf,
    ir,
    Et,
    ks,
    yf,
    or,
    qr,
    nt,
    lr,
    cr,
    io,
    fu,
    vf,
    Ut,
    xf,
    be,
    Br,
    Ur,
    ya,
    va,
    $r,
    xa,
    ba,
    bf,
    Vr,
    kn,
    Tt,
    Ss,
    Cs,
    ro;
  var se = document.createElement("style");
  ((se.textContent = `*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-0{bottom:0}.bottom-4{bottom:1rem}.right-4{right:1rem}.top-0{top:0}.top-0\\.5{top:.125rem}.top-1\\/2{top:50%}.top-4{top:1rem}.top-\\[-3px\\]{top:-3px}.z-50{z-index:50}.mb-0{margin-bottom:0}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-2{margin-left:.5rem}.ml-4{margin-left:1rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-16{height:4rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-24{height:6rem}.h-28{height:7rem}.h-3{height:.75rem}.h-4{height:1rem}.h-40{height:10rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-full{height:100%}.max-h-48{max-height:12rem}.w-0\\.5{width:.125rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-2{width:.5rem}.w-24{width:6rem}.w-36{width:9rem}.w-4{width:1rem}.w-40{width:10rem}.w-5{width:1.25rem}.w-7{width:1.75rem}.w-80{width:20rem}.w-full{width:100%}.min-w-0{min-width:0px}.min-w-\\[52px\\]{min-width:52px}.min-w-full{min-width:100%}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-md{max-width:28rem}.flex-1{flex:1 1 0%}.flex-shrink-0,.shrink-0{flex-shrink:0}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.cursor-pointer{cursor:pointer}.resize{resize:both}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-6{gap:1.5rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-gray-100>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(243 244 246 / var(--tw-divide-opacity, 1))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(229 231 235 / var(--tw-divide-opacity, 1))}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-t{border-top-width:1px}.border-dashed{border-style:dashed}.border-none{border-style:none}.border-amber-100{--tw-border-opacity: 1;border-color:rgb(254 243 199 / var(--tw-border-opacity, 1))}.border-amber-200{--tw-border-opacity: 1;border-color:rgb(253 230 138 / var(--tw-border-opacity, 1))}.border-blue-100{--tw-border-opacity: 1;border-color:rgb(219 234 254 / var(--tw-border-opacity, 1))}.border-blue-200{--tw-border-opacity: 1;border-color:rgb(191 219 254 / var(--tw-border-opacity, 1))}.border-blue-500{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.border-blue-600{--tw-border-opacity: 1;border-color:rgb(37 99 235 / var(--tw-border-opacity, 1))}.border-gray-100{--tw-border-opacity: 1;border-color:rgb(243 244 246 / var(--tw-border-opacity, 1))}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.border-gray-50{--tw-border-opacity: 1;border-color:rgb(249 250 251 / var(--tw-border-opacity, 1))}.border-green-100{--tw-border-opacity: 1;border-color:rgb(220 252 231 / var(--tw-border-opacity, 1))}.border-green-200{--tw-border-opacity: 1;border-color:rgb(187 247 208 / var(--tw-border-opacity, 1))}.border-green-300{--tw-border-opacity: 1;border-color:rgb(134 239 172 / var(--tw-border-opacity, 1))}.border-red-200{--tw-border-opacity: 1;border-color:rgb(254 202 202 / var(--tw-border-opacity, 1))}.border-red-300{--tw-border-opacity: 1;border-color:rgb(252 165 165 / var(--tw-border-opacity, 1))}.border-yellow-200{--tw-border-opacity: 1;border-color:rgb(254 240 138 / var(--tw-border-opacity, 1))}.border-yellow-300{--tw-border-opacity: 1;border-color:rgb(253 224 71 / var(--tw-border-opacity, 1))}.bg-amber-50{--tw-bg-opacity: 1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1))}.bg-black\\/30{background-color:#0000004d}.bg-blue-100{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity, 1))}.bg-gray-50{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity, 1))}.bg-green-50{--tw-bg-opacity: 1;background-color:rgb(240 253 244 / var(--tw-bg-opacity, 1))}.bg-green-500{--tw-bg-opacity: 1;background-color:rgb(34 197 94 / var(--tw-bg-opacity, 1))}.bg-green-600{--tw-bg-opacity: 1;background-color:rgb(22 163 74 / var(--tw-bg-opacity, 1))}.bg-green-700{--tw-bg-opacity: 1;background-color:rgb(21 128 61 / var(--tw-bg-opacity, 1))}.bg-orange-100{--tw-bg-opacity: 1;background-color:rgb(255 237 213 / var(--tw-bg-opacity, 1))}.bg-orange-50{--tw-bg-opacity: 1;background-color:rgb(255 247 237 / var(--tw-bg-opacity, 1))}.bg-purple-100{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity, 1))}.bg-purple-50{--tw-bg-opacity: 1;background-color:rgb(250 245 255 / var(--tw-bg-opacity, 1))}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1))}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1))}.bg-red-500{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity, 1))}.bg-red-600{--tw-bg-opacity: 1;background-color:rgb(220 38 38 / var(--tw-bg-opacity, 1))}.bg-teal-100{--tw-bg-opacity: 1;background-color:rgb(204 251 241 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity, 1))}.bg-yellow-50{--tw-bg-opacity: 1;background-color:rgb(254 252 232 / var(--tw-bg-opacity, 1))}.p-1{padding:.25rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pb-1{padding-bottom:.25rem}.pb-2{padding-bottom:.5rem}.pb-3{padding-bottom:.75rem}.pb-5{padding-bottom:1.25rem}.pr-4{padding-right:1rem}.pt-2{padding-top:.5rem}.pt-3{padding-top:.75rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-normal{font-weight:400}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.lowercase{text-transform:lowercase}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.text-amber-800{--tw-text-opacity: 1;color:rgb(146 64 14 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-blue-700{--tw-text-opacity: 1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-blue-800{--tw-text-opacity: 1;color:rgb(30 64 175 / var(--tw-text-opacity, 1))}.text-blue-900{--tw-text-opacity: 1;color:rgb(30 58 138 / var(--tw-text-opacity, 1))}.text-emerald-600{--tw-text-opacity: 1;color:rgb(5 150 105 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-gray-600{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity, 1))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.text-green-700{--tw-text-opacity: 1;color:rgb(21 128 61 / var(--tw-text-opacity, 1))}.text-green-800{--tw-text-opacity: 1;color:rgb(22 101 52 / var(--tw-text-opacity, 1))}.text-indigo-600{--tw-text-opacity: 1;color:rgb(79 70 229 / var(--tw-text-opacity, 1))}.text-orange-700{--tw-text-opacity: 1;color:rgb(194 65 12 / var(--tw-text-opacity, 1))}.text-purple-700{--tw-text-opacity: 1;color:rgb(126 34 206 / var(--tw-text-opacity, 1))}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity, 1))}.text-red-700{--tw-text-opacity: 1;color:rgb(185 28 28 / var(--tw-text-opacity, 1))}.text-red-800{--tw-text-opacity: 1;color:rgb(153 27 27 / var(--tw-text-opacity, 1))}.text-teal-700{--tw-text-opacity: 1;color:rgb(15 118 110 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-600{--tw-text-opacity: 1;color:rgb(202 138 4 / var(--tw-text-opacity, 1))}.text-yellow-700{--tw-text-opacity: 1;color:rgb(161 98 7 / var(--tw-text-opacity, 1))}.text-yellow-800{--tw-text-opacity: 1;color:rgb(133 77 14 / var(--tw-text-opacity, 1))}.underline{text-decoration-line:underline}.line-through{text-decoration-line:line-through}.opacity-50{opacity:.5}.opacity-55{opacity:.55}.opacity-70{opacity:.7}.opacity-80{opacity:.8}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.backdrop\\:bg-black\\/40::backdrop{background-color:#0006}.last\\:mb-0:last-child{margin-bottom:0}.last\\:border-0:last-child{border-width:0px}.last\\:pb-0:last-child{padding-bottom:0}.hover\\:bg-blue-50:hover{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-500:hover{--tw-bg-opacity: 1;background-color:rgb(59 130 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-200:hover{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-50:hover{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-100:hover{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-50:hover{--tw-bg-opacity: 1;background-color:rgb(240 253 244 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-800:hover{--tw-bg-opacity: 1;background-color:rgb(22 101 52 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-100:hover{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-50:hover{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-700:hover{--tw-bg-opacity: 1;background-color:rgb(185 28 28 / var(--tw-bg-opacity, 1))}.hover\\:bg-yellow-100:hover{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity, 1))}.hover\\:text-blue-800:hover{--tw-text-opacity: 1;color:rgb(30 64 175 / var(--tw-text-opacity, 1))}.hover\\:text-gray-600:hover{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.hover\\:text-gray-700:hover{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.hover\\:text-indigo-800:hover{--tw-text-opacity: 1;color:rgb(55 48 163 / var(--tw-text-opacity, 1))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring-1:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-inset:focus{--tw-ring-inset: inset}.focus\\:ring-blue-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width: 2px}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}@media(min-width:640px){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
/*$vite$:1*/`),
    document.head.appendChild(se));
  const le = "modulepreload",
    _e = function (e) {
      return "/" + e;
    },
    wa = {},
    we = function (t, r, n) {
      let a = Promise.resolve();
      function s(o) {
        const l = new Event("vite:preloadError", { cancelable: !0 });
        if (((l.payload = o), window.dispatchEvent(l), !l.defaultPrevented))
          throw o;
      }
      return a.then((o) => {
        for (const l of o || []) l.status === "rejected" && s(l.reason);
        return t().catch(s);
      });
    };
  function Cf(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var gu = { exports: {} },
    js = {},
    yu = { exports: {} },
    Y = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var ka = Symbol.for("react.element"),
    _f = Symbol.for("react.portal"),
    Rf = Symbol.for("react.fragment"),
    jf = Symbol.for("react.strict_mode"),
    Nf = Symbol.for("react.profiler"),
    Af = Symbol.for("react.provider"),
    Ef = Symbol.for("react.context"),
    Tf = Symbol.for("react.forward_ref"),
    Pf = Symbol.for("react.suspense"),
    Of = Symbol.for("react.memo"),
    Lf = Symbol.for("react.lazy"),
    vu = Symbol.iterator;
  function Df(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (vu && e[vu]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var xu = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    bu = Object.assign,
    wu = {};
  function Rn(e, t, r) {
    ((this.props = e),
      (this.context = t),
      (this.refs = wu),
      (this.updater = r || xu));
  }
  ((Rn.prototype.isReactComponent = {}),
    (Rn.prototype.setState = function (e, t) {
      if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    }),
    (Rn.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    }));
  function ku() {}
  ku.prototype = Rn.prototype;
  function oo(e, t, r) {
    ((this.props = e),
      (this.context = t),
      (this.refs = wu),
      (this.updater = r || xu));
  }
  var lo = (oo.prototype = new ku());
  ((lo.constructor = oo), bu(lo, Rn.prototype), (lo.isPureReactComponent = !0));
  var Su = Array.isArray,
    Cu = Object.prototype.hasOwnProperty,
    co = { current: null },
    _u = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Ru(e, t, r) {
    var n,
      a = {},
      s = null,
      o = null;
    if (t != null)
      for (n in (t.ref !== void 0 && (o = t.ref),
      t.key !== void 0 && (s = "" + t.key),
      t))
        Cu.call(t, n) && !_u.hasOwnProperty(n) && (a[n] = t[n]);
    var l = arguments.length - 2;
    if (l === 1) a.children = r;
    else if (1 < l) {
      for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
      a.children = c;
    }
    if (e && e.defaultProps)
      for (n in ((l = e.defaultProps), l)) a[n] === void 0 && (a[n] = l[n]);
    return {
      $$typeof: ka,
      type: e,
      key: s,
      ref: o,
      props: a,
      _owner: co.current,
    };
  }
  function If(e, t) {
    return {
      $$typeof: ka,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner,
    };
  }
  function uo(e) {
    return typeof e == "object" && e !== null && e.$$typeof === ka;
  }
  function Mf(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (r) {
        return t[r];
      })
    );
  }
  var ju = /\/+/g;
  function po(e, t) {
    return typeof e == "object" && e !== null && e.key != null
      ? Mf("" + e.key)
      : t.toString(36);
  }
  function Ns(e, t, r, n, a) {
    var s = typeof e;
    (s === "undefined" || s === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
      switch (s) {
        case "string":
        case "number":
          o = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case ka:
            case _f:
              o = !0;
          }
      }
    if (o)
      return (
        (o = e),
        (a = a(o)),
        (e = n === "" ? "." + po(o, 0) : n),
        Su(a)
          ? ((r = ""),
            e != null && (r = e.replace(ju, "$&/") + "/"),
            Ns(a, t, r, "", function (u) {
              return u;
            }))
          : a != null &&
            (uo(a) &&
              (a = If(
                a,
                r +
                  (!a.key || (o && o.key === a.key)
                    ? ""
                    : ("" + a.key).replace(ju, "$&/") + "/") +
                  e
              )),
            t.push(a)),
        1
      );
    if (((o = 0), (n = n === "" ? "." : n + ":"), Su(e)))
      for (var l = 0; l < e.length; l++) {
        s = e[l];
        var c = n + po(s, l);
        o += Ns(s, t, r, c, a);
      }
    else if (((c = Df(e)), typeof c == "function"))
      for (e = c.call(e), l = 0; !(s = e.next()).done; )
        ((s = s.value), (c = n + po(s, l++)), (o += Ns(s, t, r, c, a)));
    else if (s === "object")
      throw (
        (t = String(e)),
        Error(
          "Objects are not valid as a React child (found: " +
            (t === "[object Object]"
              ? "object with keys {" + Object.keys(e).join(", ") + "}"
              : t) +
            "). If you meant to render a collection of children, use an array instead."
        )
      );
    return o;
  }
  function As(e, t, r) {
    if (e == null) return e;
    var n = [],
      a = 0;
    return (
      Ns(e, n, "", "", function (s) {
        return t.call(r, s, a++);
      }),
      n
    );
  }
  function Ff(e) {
    if (e._status === -1) {
      var t = e._result;
      ((t = t()),
        t.then(
          function (r) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 1), (e._result = r));
          },
          function (r) {
            (e._status === 0 || e._status === -1) &&
              ((e._status = 2), (e._result = r));
          }
        ),
        e._status === -1 && ((e._status = 0), (e._result = t)));
    }
    if (e._status === 1) return e._result.default;
    throw e._result;
  }
  var Ve = { current: null },
    Es = { transition: null },
    zf = {
      ReactCurrentDispatcher: Ve,
      ReactCurrentBatchConfig: Es,
      ReactCurrentOwner: co,
    };
  function Nu() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  ((Y.Children = {
    map: As,
    forEach: function (e, t, r) {
      As(
        e,
        function () {
          t.apply(this, arguments);
        },
        r
      );
    },
    count: function (e) {
      var t = 0;
      return (
        As(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        As(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!uo(e))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return e;
    },
  }),
    (Y.Component = Rn),
    (Y.Fragment = Rf),
    (Y.Profiler = Nf),
    (Y.PureComponent = oo),
    (Y.StrictMode = jf),
    (Y.Suspense = Pf),
    (Y.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = zf),
    (Y.act = Nu),
    (Y.cloneElement = function (e, t, r) {
      if (e == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            "."
        );
      var n = bu({}, e.props),
        a = e.key,
        s = e.ref,
        o = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((s = t.ref), (o = co.current)),
          t.key !== void 0 && (a = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var l = e.type.defaultProps;
        for (c in t)
          Cu.call(t, c) &&
            !_u.hasOwnProperty(c) &&
            (n[c] = t[c] === void 0 && l !== void 0 ? l[c] : t[c]);
      }
      var c = arguments.length - 2;
      if (c === 1) n.children = r;
      else if (1 < c) {
        l = Array(c);
        for (var u = 0; u < c; u++) l[u] = arguments[u + 2];
        n.children = l;
      }
      return {
        $$typeof: ka,
        type: e.type,
        key: a,
        ref: s,
        props: n,
        _owner: o,
      };
    }),
    (Y.createContext = function (e) {
      return (
        (e = {
          $$typeof: Ef,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: Af, _context: e }),
        (e.Consumer = e)
      );
    }),
    (Y.createElement = Ru),
    (Y.createFactory = function (e) {
      var t = Ru.bind(null, e);
      return ((t.type = e), t);
    }),
    (Y.createRef = function () {
      return { current: null };
    }),
    (Y.forwardRef = function (e) {
      return { $$typeof: Tf, render: e };
    }),
    (Y.isValidElement = uo),
    (Y.lazy = function (e) {
      return { $$typeof: Lf, _payload: { _status: -1, _result: e }, _init: Ff };
    }),
    (Y.memo = function (e, t) {
      return { $$typeof: Of, type: e, compare: t === void 0 ? null : t };
    }),
    (Y.startTransition = function (e) {
      var t = Es.transition;
      Es.transition = {};
      try {
        e();
      } finally {
        Es.transition = t;
      }
    }),
    (Y.unstable_act = Nu),
    (Y.useCallback = function (e, t) {
      return Ve.current.useCallback(e, t);
    }),
    (Y.useContext = function (e) {
      return Ve.current.useContext(e);
    }),
    (Y.useDebugValue = function () {}),
    (Y.useDeferredValue = function (e) {
      return Ve.current.useDeferredValue(e);
    }),
    (Y.useEffect = function (e, t) {
      return Ve.current.useEffect(e, t);
    }),
    (Y.useId = function () {
      return Ve.current.useId();
    }),
    (Y.useImperativeHandle = function (e, t, r) {
      return Ve.current.useImperativeHandle(e, t, r);
    }),
    (Y.useInsertionEffect = function (e, t) {
      return Ve.current.useInsertionEffect(e, t);
    }),
    (Y.useLayoutEffect = function (e, t) {
      return Ve.current.useLayoutEffect(e, t);
    }),
    (Y.useMemo = function (e, t) {
      return Ve.current.useMemo(e, t);
    }),
    (Y.useReducer = function (e, t, r) {
      return Ve.current.useReducer(e, t, r);
    }),
    (Y.useRef = function (e) {
      return Ve.current.useRef(e);
    }),
    (Y.useState = function (e) {
      return Ve.current.useState(e);
    }),
    (Y.useSyncExternalStore = function (e, t, r) {
      return Ve.current.useSyncExternalStore(e, t, r);
    }),
    (Y.useTransition = function () {
      return Ve.current.useTransition();
    }),
    (Y.version = "18.3.1"),
    (yu.exports = Y));
  var N = yu.exports;
  const ce = Cf(N);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var qf = N,
    Bf = Symbol.for("react.element"),
    Uf = Symbol.for("react.fragment"),
    $f = Object.prototype.hasOwnProperty,
    Vf =
      qf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Kf = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Au(e, t, r) {
    var n,
      a = {},
      s = null,
      o = null;
    (r !== void 0 && (s = "" + r),
      t.key !== void 0 && (s = "" + t.key),
      t.ref !== void 0 && (o = t.ref));
    for (n in t) $f.call(t, n) && !Kf.hasOwnProperty(n) && (a[n] = t[n]);
    if (e && e.defaultProps)
      for (n in ((t = e.defaultProps), t)) a[n] === void 0 && (a[n] = t[n]);
    return {
      $$typeof: Bf,
      type: e,
      key: s,
      ref: o,
      props: a,
      _owner: Vf.current,
    };
  }
  ((js.Fragment = Uf), (js.jsx = Au), (js.jsxs = Au), (gu.exports = js));
  var i = gu.exports,
    Eu = { exports: {} },
    st = {},
    Tu = { exports: {} },
    Pu = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ ((function (e) {
    function t(F, H) {
      var G = F.length;
      F.push(H);
      e: for (; 0 < G; ) {
        var Ce = (G - 1) >>> 1,
          De = F[Ce];
        if (0 < a(De, H)) ((F[Ce] = H), (F[G] = De), (G = Ce));
        else break e;
      }
    }
    function r(F) {
      return F.length === 0 ? null : F[0];
    }
    function n(F) {
      if (F.length === 0) return null;
      var H = F[0],
        G = F.pop();
      if (G !== H) {
        F[0] = G;
        e: for (var Ce = 0, De = F.length, no = De >>> 1; Ce < no; ) {
          var Sn = 2 * (Ce + 1) - 1,
            iu = F[Sn],
            Cn = Sn + 1,
            ao = F[Cn];
          if (0 > a(iu, G))
            Cn < De && 0 > a(ao, iu)
              ? ((F[Ce] = ao), (F[Cn] = G), (Ce = Cn))
              : ((F[Ce] = iu), (F[Sn] = G), (Ce = Sn));
          else if (Cn < De && 0 > a(ao, G))
            ((F[Ce] = ao), (F[Cn] = G), (Ce = Cn));
          else break e;
        }
      }
      return H;
    }
    function a(F, H) {
      var G = F.sortIndex - H.sortIndex;
      return G !== 0 ? G : F.id - H.id;
    }
    if (
      typeof performance == "object" &&
      typeof performance.now == "function"
    ) {
      var s = performance;
      e.unstable_now = function () {
        return s.now();
      };
    } else {
      var o = Date,
        l = o.now();
      e.unstable_now = function () {
        return o.now() - l;
      };
    }
    var c = [],
      u = [],
      p = 1,
      f = null,
      m = 3,
      x = !1,
      v = !1,
      b = !1,
      C = typeof setTimeout == "function" ? setTimeout : null,
      g = typeof clearTimeout == "function" ? clearTimeout : null,
      d = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function y(F) {
      for (var H = r(u); H !== null; ) {
        if (H.callback === null) n(u);
        else if (H.startTime <= F)
          (n(u), (H.sortIndex = H.expirationTime), t(c, H));
        else break;
        H = r(u);
      }
    }
    function w(F) {
      if (((b = !1), y(F), !v))
        if (r(c) !== null) ((v = !0), _s(_));
        else {
          var H = r(u);
          H !== null && at(w, H.startTime - F);
        }
    }
    function _(F, H) {
      ((v = !1), b && ((b = !1), g(T), (T = -1)), (x = !0));
      var G = m;
      try {
        for (
          y(H), f = r(c);
          f !== null && (!(f.expirationTime > H) || (F && !$()));
        ) {
          var Ce = f.callback;
          if (typeof Ce == "function") {
            ((f.callback = null), (m = f.priorityLevel));
            var De = Ce(f.expirationTime <= H);
            ((H = e.unstable_now()),
              typeof De == "function" ? (f.callback = De) : f === r(c) && n(c),
              y(H));
          } else n(c);
          f = r(c);
        }
        if (f !== null) var no = !0;
        else {
          var Sn = r(u);
          (Sn !== null && at(w, Sn.startTime - H), (no = !1));
        }
        return no;
      } finally {
        ((f = null), (m = G), (x = !1));
      }
    }
    var A = !1,
      R = null,
      T = -1,
      S = 5,
      O = -1;
    function $() {
      return !(e.unstable_now() - O < S);
    }
    function J() {
      if (R !== null) {
        var F = e.unstable_now();
        O = F;
        var H = !0;
        try {
          H = R(!0, F);
        } finally {
          H ? U() : ((A = !1), (R = null));
        }
      } else A = !1;
    }
    var U;
    if (typeof d == "function")
      U = function () {
        d(J);
      };
    else if (typeof MessageChannel < "u") {
      var Se = new MessageChannel(),
        $t = Se.port2;
      ((Se.port1.onmessage = J),
        (U = function () {
          $t.postMessage(null);
        }));
    } else
      U = function () {
        C(J, 0);
      };
    function _s(F) {
      ((R = F), A || ((A = !0), U()));
    }
    function at(F, H) {
      T = C(function () {
        F(e.unstable_now());
      }, H);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (F) {
        F.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        v || x || ((v = !0), _s(_));
      }),
      (e.unstable_forceFrameRate = function (F) {
        0 > F || 125 < F
          ? console.error(
              "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
            )
          : (S = 0 < F ? Math.floor(1e3 / F) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return m;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return r(c);
      }),
      (e.unstable_next = function (F) {
        switch (m) {
          case 1:
          case 2:
          case 3:
            var H = 3;
            break;
          default:
            H = m;
        }
        var G = m;
        m = H;
        try {
          return F();
        } finally {
          m = G;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (F, H) {
        switch (F) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            F = 3;
        }
        var G = m;
        m = F;
        try {
          return H();
        } finally {
          m = G;
        }
      }),
      (e.unstable_scheduleCallback = function (F, H, G) {
        var Ce = e.unstable_now();
        switch (
          (typeof G == "object" && G !== null
            ? ((G = G.delay), (G = typeof G == "number" && 0 < G ? Ce + G : Ce))
            : (G = Ce),
          F)
        ) {
          case 1:
            var De = -1;
            break;
          case 2:
            De = 250;
            break;
          case 5:
            De = 1073741823;
            break;
          case 4:
            De = 1e4;
            break;
          default:
            De = 5e3;
        }
        return (
          (De = G + De),
          (F = {
            id: p++,
            callback: H,
            priorityLevel: F,
            startTime: G,
            expirationTime: De,
            sortIndex: -1,
          }),
          G > Ce
            ? ((F.sortIndex = G),
              t(u, F),
              r(c) === null &&
                F === r(u) &&
                (b ? (g(T), (T = -1)) : (b = !0), at(w, G - Ce)))
            : ((F.sortIndex = De), t(c, F), v || x || ((v = !0), _s(_))),
          F
        );
      }),
      (e.unstable_shouldYield = $),
      (e.unstable_wrapCallback = function (F) {
        var H = m;
        return function () {
          var G = m;
          m = H;
          try {
            return F.apply(this, arguments);
          } finally {
            m = G;
          }
        };
      }));
  })(Pu),
    (Tu.exports = Pu));
  var Wf = Tu.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Hf = N,
    it = Wf;
  function E(e) {
    for (
      var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e,
        r = 1;
      r < arguments.length;
      r++
    )
      t += "&args[]=" + encodeURIComponent(arguments[r]);
    return (
      "Minified React error #" +
      e +
      "; visit " +
      t +
      " for the full message or use the non-minified dev environment for full errors and additional helpful warnings."
    );
  }
  var Ou = new Set(),
    Sa = {};
  function Wr(e, t) {
    (jn(e, t), jn(e + "Capture", t));
  }
  function jn(e, t) {
    for (Sa[e] = t, e = 0; e < t.length; e++) Ou.add(t[e]);
  }
  var Vt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    mo = Object.prototype.hasOwnProperty,
    Qf =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Lu = {},
    Du = {};
  function Zf(e) {
    return mo.call(Du, e)
      ? !0
      : mo.call(Lu, e)
        ? !1
        : Qf.test(e)
          ? (Du[e] = !0)
          : ((Lu[e] = !0), !1);
  }
  function Gf(e, t, r, n) {
    if (r !== null && r.type === 0) return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return n
          ? !1
          : r !== null
            ? !r.acceptsBooleans
            : ((e = e.toLowerCase().slice(0, 5)),
              e !== "data-" && e !== "aria-");
      default:
        return !1;
    }
  }
  function Yf(e, t, r, n) {
    if (t === null || typeof t > "u" || Gf(e, t, r, n)) return !0;
    if (n) return !1;
    if (r !== null)
      switch (r.type) {
        case 3:
          return !t;
        case 4:
          return t === !1;
        case 5:
          return isNaN(t);
        case 6:
          return isNaN(t) || 1 > t;
      }
    return !1;
  }
  function Ke(e, t, r, n, a, s, o) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = n),
      (this.attributeNamespace = a),
      (this.mustUseProperty = r),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = s),
      (this.removeEmptyString = o));
  }
  var Ie = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      Ie[e] = new Ke(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      Ie[t] = new Ke(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        Ie[e] = new Ke(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      Ie[e] = new Ke(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        Ie[e] = new Ke(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      Ie[e] = new Ke(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      Ie[e] = new Ke(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      Ie[e] = new Ke(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      Ie[e] = new Ke(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var ho = /[\-:]([a-z])/g;
  function fo(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(ho, fo);
      Ie[t] = new Ke(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(ho, fo);
        Ie[t] = new Ke(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(ho, fo);
      Ie[t] = new Ke(
        t,
        1,
        !1,
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        !1
      );
    }),
    ["tabIndex", "crossOrigin"].forEach(function (e) {
      Ie[e] = new Ke(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (Ie.xlinkHref = new Ke(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      Ie[e] = new Ke(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function go(e, t, r, n) {
    var a = Ie.hasOwnProperty(t) ? Ie[t] : null;
    (a !== null
      ? a.type !== 0
      : n ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (Yf(t, r, a, n) && (r = null),
      n || a === null
        ? Zf(t) &&
          (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r))
        : a.mustUseProperty
          ? (e[a.propertyName] = r === null ? (a.type === 3 ? !1 : "") : r)
          : ((t = a.attributeName),
            (n = a.attributeNamespace),
            r === null
              ? e.removeAttribute(t)
              : ((a = a.type),
                (r = a === 3 || (a === 4 && r === !0) ? "" : "" + r),
                n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
  }
  var Kt = Hf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Ts = Symbol.for("react.element"),
    Nn = Symbol.for("react.portal"),
    An = Symbol.for("react.fragment"),
    yo = Symbol.for("react.strict_mode"),
    vo = Symbol.for("react.profiler"),
    Iu = Symbol.for("react.provider"),
    Mu = Symbol.for("react.context"),
    xo = Symbol.for("react.forward_ref"),
    bo = Symbol.for("react.suspense"),
    wo = Symbol.for("react.suspense_list"),
    ko = Symbol.for("react.memo"),
    dr = Symbol.for("react.lazy"),
    Fu = Symbol.for("react.offscreen"),
    zu = Symbol.iterator;
  function Ca(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (zu && e[zu]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var he = Object.assign,
    So;
  function _a(e) {
    if (So === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        So = (t && t[1]) || "";
      }
    return (
      `
` +
      So +
      e
    );
  }
  var Co = !1;
  function _o(e, t) {
    if (!e || Co) return "";
    Co = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (t)
        if (
          ((t = function () {
            throw Error();
          }),
          Object.defineProperty(t.prototype, "props", {
            set: function () {
              throw Error();
            },
          }),
          typeof Reflect == "object" && Reflect.construct)
        ) {
          try {
            Reflect.construct(t, []);
          } catch (u) {
            var n = u;
          }
          Reflect.construct(e, [], t);
        } else {
          try {
            t.call();
          } catch (u) {
            n = u;
          }
          e.call(t.prototype);
        }
      else {
        try {
          throw Error();
        } catch (u) {
          n = u;
        }
        e();
      }
    } catch (u) {
      if (u && n && typeof u.stack == "string") {
        for (
          var a = u.stack.split(`
`),
            s = n.stack.split(`
`),
            o = a.length - 1,
            l = s.length - 1;
          1 <= o && 0 <= l && a[o] !== s[l];
        )
          l--;
        for (; 1 <= o && 0 <= l; o--, l--)
          if (a[o] !== s[l]) {
            if (o !== 1 || l !== 1)
              do
                if ((o--, l--, 0 > l || a[o] !== s[l])) {
                  var c =
                    `
` + a[o].replace(" at new ", " at ");
                  return (
                    e.displayName &&
                      c.includes("<anonymous>") &&
                      (c = c.replace("<anonymous>", e.displayName)),
                    c
                  );
                }
              while (1 <= o && 0 <= l);
            break;
          }
      }
    } finally {
      ((Co = !1), (Error.prepareStackTrace = r));
    }
    return (e = e ? e.displayName || e.name : "") ? _a(e) : "";
  }
  function Xf(e) {
    switch (e.tag) {
      case 5:
        return _a(e.type);
      case 16:
        return _a("Lazy");
      case 13:
        return _a("Suspense");
      case 19:
        return _a("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = _o(e.type, !1)), e);
      case 11:
        return ((e = _o(e.type.render, !1)), e);
      case 1:
        return ((e = _o(e.type, !0)), e);
      default:
        return "";
    }
  }
  function Ro(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case An:
        return "Fragment";
      case Nn:
        return "Portal";
      case vo:
        return "Profiler";
      case yo:
        return "StrictMode";
      case bo:
        return "Suspense";
      case wo:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Mu:
          return (e.displayName || "Context") + ".Consumer";
        case Iu:
          return (e._context.displayName || "Context") + ".Provider";
        case xo:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case ko:
          return (
            (t = e.displayName || null),
            t !== null ? t : Ro(e.type) || "Memo"
          );
        case dr:
          ((t = e._payload), (e = e._init));
          try {
            return Ro(e(t));
          } catch {}
      }
    return null;
  }
  function Jf(e) {
    var t = e.type;
    switch (e.tag) {
      case 24:
        return "Cache";
      case 9:
        return (t.displayName || "Context") + ".Consumer";
      case 10:
        return (t._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return (
          (e = t.render),
          (e = e.displayName || e.name || ""),
          t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")
        );
      case 7:
        return "Fragment";
      case 5:
        return t;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return Ro(t);
      case 8:
        return t === yo ? "StrictMode" : "Mode";
      case 22:
        return "Offscreen";
      case 12:
        return "Profiler";
      case 21:
        return "Scope";
      case 13:
        return "Suspense";
      case 19:
        return "SuspenseList";
      case 25:
        return "TracingMarker";
      case 1:
      case 0:
      case 17:
      case 2:
      case 14:
      case 15:
        if (typeof t == "function") return t.displayName || t.name || null;
        if (typeof t == "string") return t;
    }
    return null;
  }
  function pr(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return e;
      default:
        return "";
    }
  }
  function qu(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function eg(e) {
    var t = qu(e) ? "checked" : "value",
      r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      n = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof r < "u" &&
      typeof r.get == "function" &&
      typeof r.set == "function"
    ) {
      var a = r.get,
        s = r.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return a.call(this);
          },
          set: function (o) {
            ((n = "" + o), s.call(this, o));
          },
        }),
        Object.defineProperty(e, t, { enumerable: r.enumerable }),
        {
          getValue: function () {
            return n;
          },
          setValue: function (o) {
            n = "" + o;
          },
          stopTracking: function () {
            ((e._valueTracker = null), delete e[t]);
          },
        }
      );
    }
  }
  function Ps(e) {
    e._valueTracker || (e._valueTracker = eg(e));
  }
  function Bu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(),
      n = "";
    return (
      e && (n = qu(e) ? (e.checked ? "true" : "false") : e.value),
      (e = n),
      e !== r ? (t.setValue(e), !0) : !1
    );
  }
  function Os(e) {
    if (
      ((e = e || (typeof document < "u" ? document : void 0)), typeof e > "u")
    )
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  function jo(e, t) {
    var r = t.checked;
    return he({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: r ?? e._wrapperState.initialChecked,
    });
  }
  function Uu(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue,
      n = t.checked != null ? t.checked : t.defaultChecked;
    ((r = pr(t.value != null ? t.value : r)),
      (e._wrapperState = {
        initialChecked: n,
        initialValue: r,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function $u(e, t) {
    ((t = t.checked), t != null && go(e, "checked", t, !1));
  }
  function No(e, t) {
    $u(e, t);
    var r = pr(t.value),
      n = t.type;
    if (r != null)
      n === "number"
        ? ((r === 0 && e.value === "") || e.value != r) && (e.value = "" + r)
        : e.value !== "" + r && (e.value = "" + r);
    else if (n === "submit" || n === "reset") {
      e.removeAttribute("value");
      return;
    }
    (t.hasOwnProperty("value")
      ? Ao(e, t.type, r)
      : t.hasOwnProperty("defaultValue") && Ao(e, t.type, pr(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function Vu(e, t, r) {
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var n = t.type;
      if (
        !(
          (n !== "submit" && n !== "reset") ||
          (t.value !== void 0 && t.value !== null)
        )
      )
        return;
      ((t = "" + e._wrapperState.initialValue),
        r || t === e.value || (e.value = t),
        (e.defaultValue = t));
    }
    ((r = e.name),
      r !== "" && (e.name = ""),
      (e.defaultChecked = !!e._wrapperState.initialChecked),
      r !== "" && (e.name = r));
  }
  function Ao(e, t, r) {
    (t !== "number" || Os(e.ownerDocument) !== e) &&
      (r == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var Ra = Array.isArray;
  function En(e, t, r, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var a = 0; a < r.length; a++) t["$" + r[a]] = !0;
      for (r = 0; r < e.length; r++)
        ((a = t.hasOwnProperty("$" + e[r].value)),
          e[r].selected !== a && (e[r].selected = a),
          a && n && (e[r].defaultSelected = !0));
    } else {
      for (r = "" + pr(r), t = null, a = 0; a < e.length; a++) {
        if (e[a].value === r) {
          ((e[a].selected = !0), n && (e[a].defaultSelected = !0));
          return;
        }
        t !== null || e[a].disabled || (t = e[a]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function Eo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
    return he({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function Ku(e, t) {
    var r = t.value;
    if (r == null) {
      if (((r = t.children), (t = t.defaultValue), r != null)) {
        if (t != null) throw Error(E(92));
        if (Ra(r)) {
          if (1 < r.length) throw Error(E(93));
          r = r[0];
        }
        t = r;
      }
      (t == null && (t = ""), (r = t));
    }
    e._wrapperState = { initialValue: pr(r) };
  }
  function Wu(e, t) {
    var r = pr(t.value),
      n = pr(t.defaultValue);
    (r != null &&
      ((r = "" + r),
      r !== e.value && (e.value = r),
      t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
      n != null && (e.defaultValue = "" + n));
  }
  function Hu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function Qu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function To(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? Qu(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Ls,
    Zu = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, r, n, a) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, r, n, a);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          Ls = Ls || document.createElement("div"),
            Ls.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Ls.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function ja(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Na = {
      animationIterationCount: !0,
      aspectRatio: !0,
      borderImageOutset: !0,
      borderImageSlice: !0,
      borderImageWidth: !0,
      boxFlex: !0,
      boxFlexGroup: !0,
      boxOrdinalGroup: !0,
      columnCount: !0,
      columns: !0,
      flex: !0,
      flexGrow: !0,
      flexPositive: !0,
      flexShrink: !0,
      flexNegative: !0,
      flexOrder: !0,
      gridArea: !0,
      gridRow: !0,
      gridRowEnd: !0,
      gridRowSpan: !0,
      gridRowStart: !0,
      gridColumn: !0,
      gridColumnEnd: !0,
      gridColumnSpan: !0,
      gridColumnStart: !0,
      fontWeight: !0,
      lineClamp: !0,
      lineHeight: !0,
      opacity: !0,
      order: !0,
      orphans: !0,
      tabSize: !0,
      widows: !0,
      zIndex: !0,
      zoom: !0,
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0,
    },
    tg = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Na).forEach(function (e) {
    tg.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Na[t] = Na[e]));
    });
  });
  function Gu(e, t, r) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : r || typeof t != "number" || t === 0 || (Na.hasOwnProperty(e) && Na[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Yu(e, t) {
    e = e.style;
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = r.indexOf("--") === 0,
          a = Gu(r, t[r], n);
        (r === "float" && (r = "cssFloat"),
          n ? e.setProperty(r, a) : (e[r] = a));
      }
  }
  var rg = he(
    { menuitem: !0 },
    {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0,
    }
  );
  function Po(e, t) {
    if (t) {
      if (rg[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(E(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(E(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(E(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(E(62));
    }
  }
  function Oo(e, t) {
    if (e.indexOf("-") === -1) return typeof t.is == "string";
    switch (e) {
      case "annotation-xml":
      case "color-profile":
      case "font-face":
      case "font-face-src":
      case "font-face-uri":
      case "font-face-format":
      case "font-face-name":
      case "missing-glyph":
        return !1;
      default:
        return !0;
    }
  }
  var Lo = null;
  function Do(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Io = null,
    Tn = null,
    Pn = null;
  function Xu(e) {
    if ((e = Ga(e))) {
      if (typeof Io != "function") throw Error(E(280));
      var t = e.stateNode;
      t && ((t = ni(t)), Io(e.stateNode, e.type, t));
    }
  }
  function Ju(e) {
    Tn ? (Pn ? Pn.push(e) : (Pn = [e])) : (Tn = e);
  }
  function ed() {
    if (Tn) {
      var e = Tn,
        t = Pn;
      if (((Pn = Tn = null), Xu(e), t)) for (e = 0; e < t.length; e++) Xu(t[e]);
    }
  }
  function td(e, t) {
    return e(t);
  }
  function rd() {}
  var Mo = !1;
  function nd(e, t, r) {
    if (Mo) return e(t, r);
    Mo = !0;
    try {
      return td(e, t, r);
    } finally {
      ((Mo = !1), (Tn !== null || Pn !== null) && (rd(), ed()));
    }
  }
  function Aa(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var n = ni(r);
    if (n === null) return null;
    r = n[t];
    e: switch (t) {
      case "onClick":
      case "onClickCapture":
      case "onDoubleClick":
      case "onDoubleClickCapture":
      case "onMouseDown":
      case "onMouseDownCapture":
      case "onMouseMove":
      case "onMouseMoveCapture":
      case "onMouseUp":
      case "onMouseUpCapture":
      case "onMouseEnter":
        ((n = !n.disabled) ||
          ((e = e.type),
          (n = !(
            e === "button" ||
            e === "input" ||
            e === "select" ||
            e === "textarea"
          ))),
          (e = !n));
        break e;
      default:
        e = !1;
    }
    if (e) return null;
    if (r && typeof r != "function") throw Error(E(231, t, typeof r));
    return r;
  }
  var Fo = !1;
  if (Vt)
    try {
      var Ea = {};
      (Object.defineProperty(Ea, "passive", {
        get: function () {
          Fo = !0;
        },
      }),
        window.addEventListener("test", Ea, Ea),
        window.removeEventListener("test", Ea, Ea));
    } catch {
      Fo = !1;
    }
  function ng(e, t, r, n, a, s, o, l, c) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, u);
    } catch (p) {
      this.onError(p);
    }
  }
  var Ta = !1,
    Ds = null,
    Is = !1,
    zo = null,
    ag = {
      onError: function (e) {
        ((Ta = !0), (Ds = e));
      },
    };
  function sg(e, t, r, n, a, s, o, l, c) {
    ((Ta = !1), (Ds = null), ng.apply(ag, arguments));
  }
  function ig(e, t, r, n, a, s, o, l, c) {
    if ((sg.apply(this, arguments), Ta)) {
      if (Ta) {
        var u = Ds;
        ((Ta = !1), (Ds = null));
      } else throw Error(E(198));
      Is || ((Is = !0), (zo = u));
    }
  }
  function Hr(e) {
    var t = e,
      r = e;
    if (e.alternate) for (; t.return; ) t = t.return;
    else {
      e = t;
      do ((t = e), (t.flags & 4098) !== 0 && (r = t.return), (e = t.return));
      while (e);
    }
    return t.tag === 3 ? r : null;
  }
  function ad(e) {
    if (e.tag === 13) {
      var t = e.memoizedState;
      if (
        (t === null && ((e = e.alternate), e !== null && (t = e.memoizedState)),
        t !== null)
      )
        return t.dehydrated;
    }
    return null;
  }
  function sd(e) {
    if (Hr(e) !== e) throw Error(E(188));
  }
  function og(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = Hr(e)), t === null)) throw Error(E(188));
      return t !== e ? null : e;
    }
    for (var r = e, n = t; ; ) {
      var a = r.return;
      if (a === null) break;
      var s = a.alternate;
      if (s === null) {
        if (((n = a.return), n !== null)) {
          r = n;
          continue;
        }
        break;
      }
      if (a.child === s.child) {
        for (s = a.child; s; ) {
          if (s === r) return (sd(a), e);
          if (s === n) return (sd(a), t);
          s = s.sibling;
        }
        throw Error(E(188));
      }
      if (r.return !== n.return) ((r = a), (n = s));
      else {
        for (var o = !1, l = a.child; l; ) {
          if (l === r) {
            ((o = !0), (r = a), (n = s));
            break;
          }
          if (l === n) {
            ((o = !0), (n = a), (r = s));
            break;
          }
          l = l.sibling;
        }
        if (!o) {
          for (l = s.child; l; ) {
            if (l === r) {
              ((o = !0), (r = s), (n = a));
              break;
            }
            if (l === n) {
              ((o = !0), (n = s), (r = a));
              break;
            }
            l = l.sibling;
          }
          if (!o) throw Error(E(189));
        }
      }
      if (r.alternate !== n) throw Error(E(190));
    }
    if (r.tag !== 3) throw Error(E(188));
    return r.stateNode.current === r ? e : t;
  }
  function id(e) {
    return ((e = og(e)), e !== null ? od(e) : null);
  }
  function od(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = od(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var ld = it.unstable_scheduleCallback,
    cd = it.unstable_cancelCallback,
    lg = it.unstable_shouldYield,
    cg = it.unstable_requestPaint,
    ke = it.unstable_now,
    ug = it.unstable_getCurrentPriorityLevel,
    qo = it.unstable_ImmediatePriority,
    ud = it.unstable_UserBlockingPriority,
    Ms = it.unstable_NormalPriority,
    dg = it.unstable_LowPriority,
    dd = it.unstable_IdlePriority,
    Fs = null,
    Pt = null;
  function pg(e) {
    if (Pt && typeof Pt.onCommitFiberRoot == "function")
      try {
        Pt.onCommitFiberRoot(Fs, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var kt = Math.clz32 ? Math.clz32 : fg,
    mg = Math.log,
    hg = Math.LN2;
  function fg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((mg(e) / hg) | 0)) | 0);
  }
  var zs = 64,
    qs = 4194304;
  function Pa(e) {
    switch (e & -e) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 4:
        return 4;
      case 8:
        return 8;
      case 16:
        return 16;
      case 32:
        return 32;
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return e & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return e & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return e;
    }
  }
  function Bs(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var n = 0,
      a = e.suspendedLanes,
      s = e.pingedLanes,
      o = r & 268435455;
    if (o !== 0) {
      var l = o & ~a;
      l !== 0 ? (n = Pa(l)) : ((s &= o), s !== 0 && (n = Pa(s)));
    } else ((o = r & ~a), o !== 0 ? (n = Pa(o)) : s !== 0 && (n = Pa(s)));
    if (n === 0) return 0;
    if (
      t !== 0 &&
      t !== n &&
      (t & a) === 0 &&
      ((a = n & -n), (s = t & -t), a >= s || (a === 16 && (s & 4194240) !== 0))
    )
      return t;
    if (((n & 4) !== 0 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= n; 0 < t; )
        ((r = 31 - kt(t)), (a = 1 << r), (n |= e[r]), (t &= ~a));
    return n;
  }
  function gg(e, t) {
    switch (e) {
      case 1:
      case 2:
      case 4:
        return t + 250;
      case 8:
      case 16:
      case 32:
      case 64:
      case 128:
      case 256:
      case 512:
      case 1024:
      case 2048:
      case 4096:
      case 8192:
      case 16384:
      case 32768:
      case 65536:
      case 131072:
      case 262144:
      case 524288:
      case 1048576:
      case 2097152:
        return t + 5e3;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return -1;
      case 134217728:
      case 268435456:
      case 536870912:
      case 1073741824:
        return -1;
      default:
        return -1;
    }
  }
  function yg(e, t) {
    for (
      var r = e.suspendedLanes,
        n = e.pingedLanes,
        a = e.expirationTimes,
        s = e.pendingLanes;
      0 < s;
    ) {
      var o = 31 - kt(s),
        l = 1 << o,
        c = a[o];
      (c === -1
        ? ((l & r) === 0 || (l & n) !== 0) && (a[o] = gg(l, t))
        : c <= t && (e.expiredLanes |= l),
        (s &= ~l));
    }
  }
  function Bo(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function pd() {
    var e = zs;
    return ((zs <<= 1), (zs & 4194240) === 0 && (zs = 64), e);
  }
  function Uo(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function Oa(e, t, r) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - kt(t)),
      (e[t] = r));
  }
  function vg(e, t) {
    var r = e.pendingLanes & ~t;
    ((e.pendingLanes = t),
      (e.suspendedLanes = 0),
      (e.pingedLanes = 0),
      (e.expiredLanes &= t),
      (e.mutableReadLanes &= t),
      (e.entangledLanes &= t),
      (t = e.entanglements));
    var n = e.eventTimes;
    for (e = e.expirationTimes; 0 < r; ) {
      var a = 31 - kt(r),
        s = 1 << a;
      ((t[a] = 0), (n[a] = -1), (e[a] = -1), (r &= ~s));
    }
  }
  function $o(e, t) {
    var r = (e.entangledLanes |= t);
    for (e = e.entanglements; r; ) {
      var n = 31 - kt(r),
        a = 1 << n;
      ((a & t) | (e[n] & t) && (e[n] |= t), (r &= ~a));
    }
  }
  var ie = 0;
  function md(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var hd,
    Vo,
    fd,
    gd,
    yd,
    Ko = !1,
    Us = [],
    mr = null,
    hr = null,
    fr = null,
    La = new Map(),
    Da = new Map(),
    gr = [],
    xg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function vd(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        mr = null;
        break;
      case "dragenter":
      case "dragleave":
        hr = null;
        break;
      case "mouseover":
      case "mouseout":
        fr = null;
        break;
      case "pointerover":
      case "pointerout":
        La.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Da.delete(t.pointerId);
    }
  }
  function Ia(e, t, r, n, a, s) {
    return e === null || e.nativeEvent !== s
      ? ((e = {
          blockedOn: t,
          domEventName: r,
          eventSystemFlags: n,
          nativeEvent: s,
          targetContainers: [a],
        }),
        t !== null && ((t = Ga(t)), t !== null && Vo(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        a !== null && t.indexOf(a) === -1 && t.push(a),
        e);
  }
  function bg(e, t, r, n, a) {
    switch (t) {
      case "focusin":
        return ((mr = Ia(mr, e, t, r, n, a)), !0);
      case "dragenter":
        return ((hr = Ia(hr, e, t, r, n, a)), !0);
      case "mouseover":
        return ((fr = Ia(fr, e, t, r, n, a)), !0);
      case "pointerover":
        var s = a.pointerId;
        return (La.set(s, Ia(La.get(s) || null, e, t, r, n, a)), !0);
      case "gotpointercapture":
        return (
          (s = a.pointerId),
          Da.set(s, Ia(Da.get(s) || null, e, t, r, n, a)),
          !0
        );
    }
    return !1;
  }
  function xd(e) {
    var t = Qr(e.target);
    if (t !== null) {
      var r = Hr(t);
      if (r !== null) {
        if (((t = r.tag), t === 13)) {
          if (((t = ad(r)), t !== null)) {
            ((e.blockedOn = t),
              yd(e.priority, function () {
                fd(r);
              }));
            return;
          }
        } else if (t === 3 && r.stateNode.current.memoizedState.isDehydrated) {
          e.blockedOn = r.tag === 3 ? r.stateNode.containerInfo : null;
          return;
        }
      }
    }
    e.blockedOn = null;
  }
  function $s(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = Ho(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var n = new r.constructor(r.type, r);
        ((Lo = n), r.target.dispatchEvent(n), (Lo = null));
      } else return ((t = Ga(r)), t !== null && Vo(t), (e.blockedOn = r), !1);
      t.shift();
    }
    return !0;
  }
  function bd(e, t, r) {
    $s(e) && r.delete(t);
  }
  function wg() {
    ((Ko = !1),
      mr !== null && $s(mr) && (mr = null),
      hr !== null && $s(hr) && (hr = null),
      fr !== null && $s(fr) && (fr = null),
      La.forEach(bd),
      Da.forEach(bd));
  }
  function Ma(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Ko ||
        ((Ko = !0),
        it.unstable_scheduleCallback(it.unstable_NormalPriority, wg)));
  }
  function Fa(e) {
    function t(a) {
      return Ma(a, e);
    }
    if (0 < Us.length) {
      Ma(Us[0], e);
      for (var r = 1; r < Us.length; r++) {
        var n = Us[r];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    for (
      mr !== null && Ma(mr, e),
        hr !== null && Ma(hr, e),
        fr !== null && Ma(fr, e),
        La.forEach(t),
        Da.forEach(t),
        r = 0;
      r < gr.length;
      r++
    )
      ((n = gr[r]), n.blockedOn === e && (n.blockedOn = null));
    for (; 0 < gr.length && ((r = gr[0]), r.blockedOn === null); )
      (xd(r), r.blockedOn === null && gr.shift());
  }
  var On = Kt.ReactCurrentBatchConfig,
    Vs = !0;
  function kg(e, t, r, n) {
    var a = ie,
      s = On.transition;
    On.transition = null;
    try {
      ((ie = 1), Wo(e, t, r, n));
    } finally {
      ((ie = a), (On.transition = s));
    }
  }
  function Sg(e, t, r, n) {
    var a = ie,
      s = On.transition;
    On.transition = null;
    try {
      ((ie = 4), Wo(e, t, r, n));
    } finally {
      ((ie = a), (On.transition = s));
    }
  }
  function Wo(e, t, r, n) {
    if (Vs) {
      var a = Ho(e, t, r, n);
      if (a === null) (ul(e, t, n, Ks, r), vd(e, n));
      else if (bg(a, e, t, r, n)) n.stopPropagation();
      else if ((vd(e, n), t & 4 && -1 < xg.indexOf(e))) {
        for (; a !== null; ) {
          var s = Ga(a);
          if (
            (s !== null && hd(s),
            (s = Ho(e, t, r, n)),
            s === null && ul(e, t, n, Ks, r),
            s === a)
          )
            break;
          a = s;
        }
        a !== null && n.stopPropagation();
      } else ul(e, t, n, null, r);
    }
  }
  var Ks = null;
  function Ho(e, t, r, n) {
    if (((Ks = null), (e = Do(n)), (e = Qr(e)), e !== null))
      if (((t = Hr(e)), t === null)) e = null;
      else if (((r = t.tag), r === 13)) {
        if (((e = ad(t)), e !== null)) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((Ks = e), null);
  }
  function wd(e) {
    switch (e) {
      case "cancel":
      case "click":
      case "close":
      case "contextmenu":
      case "copy":
      case "cut":
      case "auxclick":
      case "dblclick":
      case "dragend":
      case "dragstart":
      case "drop":
      case "focusin":
      case "focusout":
      case "input":
      case "invalid":
      case "keydown":
      case "keypress":
      case "keyup":
      case "mousedown":
      case "mouseup":
      case "paste":
      case "pause":
      case "play":
      case "pointercancel":
      case "pointerdown":
      case "pointerup":
      case "ratechange":
      case "reset":
      case "resize":
      case "seeked":
      case "submit":
      case "touchcancel":
      case "touchend":
      case "touchstart":
      case "volumechange":
      case "change":
      case "selectionchange":
      case "textInput":
      case "compositionstart":
      case "compositionend":
      case "compositionupdate":
      case "beforeblur":
      case "afterblur":
      case "beforeinput":
      case "blur":
      case "fullscreenchange":
      case "focus":
      case "hashchange":
      case "popstate":
      case "select":
      case "selectstart":
        return 1;
      case "drag":
      case "dragenter":
      case "dragexit":
      case "dragleave":
      case "dragover":
      case "mousemove":
      case "mouseout":
      case "mouseover":
      case "pointermove":
      case "pointerout":
      case "pointerover":
      case "scroll":
      case "toggle":
      case "touchmove":
      case "wheel":
      case "mouseenter":
      case "mouseleave":
      case "pointerenter":
      case "pointerleave":
        return 4;
      case "message":
        switch (ug()) {
          case qo:
            return 1;
          case ud:
            return 4;
          case Ms:
          case dg:
            return 16;
          case dd:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var yr = null,
    Qo = null,
    Ws = null;
  function kd() {
    if (Ws) return Ws;
    var e,
      t = Qo,
      r = t.length,
      n,
      a = "value" in yr ? yr.value : yr.textContent,
      s = a.length;
    for (e = 0; e < r && t[e] === a[e]; e++);
    var o = r - e;
    for (n = 1; n <= o && t[r - n] === a[s - n]; n++);
    return (Ws = a.slice(e, 1 < n ? 1 - n : void 0));
  }
  function Hs(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Qs() {
    return !0;
  }
  function Sd() {
    return !1;
  }
  function ot(e) {
    function t(r, n, a, s, o) {
      ((this._reactName = r),
        (this._targetInst = a),
        (this.type = n),
        (this.nativeEvent = s),
        (this.target = o),
        (this.currentTarget = null));
      for (var l in e)
        e.hasOwnProperty(l) && ((r = e[l]), (this[l] = r ? r(s) : s[l]));
      return (
        (this.isDefaultPrevented = (
          s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1
        )
          ? Qs
          : Sd),
        (this.isPropagationStopped = Sd),
        this
      );
    }
    return (
      he(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var r = this.nativeEvent;
          r &&
            (r.preventDefault
              ? r.preventDefault()
              : typeof r.returnValue != "unknown" && (r.returnValue = !1),
            (this.isDefaultPrevented = Qs));
        },
        stopPropagation: function () {
          var r = this.nativeEvent;
          r &&
            (r.stopPropagation
              ? r.stopPropagation()
              : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
            (this.isPropagationStopped = Qs));
        },
        persist: function () {},
        isPersistent: Qs,
      }),
      t
    );
  }
  var Ln = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Zo = ot(Ln),
    za = he({}, Ln, { view: 0, detail: 0 }),
    Cg = ot(za),
    Go,
    Yo,
    qa,
    Zs = he({}, za, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: Jo,
      button: 0,
      buttons: 0,
      relatedTarget: function (e) {
        return e.relatedTarget === void 0
          ? e.fromElement === e.srcElement
            ? e.toElement
            : e.fromElement
          : e.relatedTarget;
      },
      movementX: function (e) {
        return "movementX" in e
          ? e.movementX
          : (e !== qa &&
              (qa && e.type === "mousemove"
                ? ((Go = e.screenX - qa.screenX), (Yo = e.screenY - qa.screenY))
                : (Yo = Go = 0),
              (qa = e)),
            Go);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Yo;
      },
    }),
    Cd = ot(Zs),
    _g = he({}, Zs, { dataTransfer: 0 }),
    Rg = ot(_g),
    jg = he({}, za, { relatedTarget: 0 }),
    Xo = ot(jg),
    Ng = he({}, Ln, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Ag = ot(Ng),
    Eg = he({}, Ln, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Tg = ot(Eg),
    Pg = he({}, Ln, { data: 0 }),
    _d = ot(Pg),
    Og = {
      Esc: "Escape",
      Spacebar: " ",
      Left: "ArrowLeft",
      Up: "ArrowUp",
      Right: "ArrowRight",
      Down: "ArrowDown",
      Del: "Delete",
      Win: "OS",
      Menu: "ContextMenu",
      Apps: "ContextMenu",
      Scroll: "ScrollLock",
      MozPrintableKey: "Unidentified",
    },
    Lg = {
      8: "Backspace",
      9: "Tab",
      12: "Clear",
      13: "Enter",
      16: "Shift",
      17: "Control",
      18: "Alt",
      19: "Pause",
      20: "CapsLock",
      27: "Escape",
      32: " ",
      33: "PageUp",
      34: "PageDown",
      35: "End",
      36: "Home",
      37: "ArrowLeft",
      38: "ArrowUp",
      39: "ArrowRight",
      40: "ArrowDown",
      45: "Insert",
      46: "Delete",
      112: "F1",
      113: "F2",
      114: "F3",
      115: "F4",
      116: "F5",
      117: "F6",
      118: "F7",
      119: "F8",
      120: "F9",
      121: "F10",
      122: "F11",
      123: "F12",
      144: "NumLock",
      145: "ScrollLock",
      224: "Meta",
    },
    Dg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ig(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Dg[e])
        ? !!t[e]
        : !1;
  }
  function Jo() {
    return Ig;
  }
  var Mg = he({}, za, {
      key: function (e) {
        if (e.key) {
          var t = Og[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = Hs(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Lg[e.keyCode] || "Unidentified"
            : "";
      },
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: Jo,
      charCode: function (e) {
        return e.type === "keypress" ? Hs(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? Hs(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Fg = ot(Mg),
    zg = he({}, Zs, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0,
    }),
    Rd = ot(zg),
    qg = he({}, za, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Jo,
    }),
    Bg = ot(qg),
    Ug = he({}, Ln, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    $g = ot(Ug),
    Vg = he({}, Zs, {
      deltaX: function (e) {
        return "deltaX" in e
          ? e.deltaX
          : "wheelDeltaX" in e
            ? -e.wheelDeltaX
            : 0;
      },
      deltaY: function (e) {
        return "deltaY" in e
          ? e.deltaY
          : "wheelDeltaY" in e
            ? -e.wheelDeltaY
            : "wheelDelta" in e
              ? -e.wheelDelta
              : 0;
      },
      deltaZ: 0,
      deltaMode: 0,
    }),
    Kg = ot(Vg),
    Wg = [9, 13, 27, 32],
    el = Vt && "CompositionEvent" in window,
    Ba = null;
  Vt && "documentMode" in document && (Ba = document.documentMode);
  var Hg = Vt && "TextEvent" in window && !Ba,
    jd = Vt && (!el || (Ba && 8 < Ba && 11 >= Ba)),
    Nd = " ",
    Ad = !1;
  function Ed(e, t) {
    switch (e) {
      case "keyup":
        return Wg.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Td(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Dn = !1;
  function Qg(e, t) {
    switch (e) {
      case "compositionend":
        return Td(t);
      case "keypress":
        return t.which !== 32 ? null : ((Ad = !0), Nd);
      case "textInput":
        return ((e = t.data), e === Nd && Ad ? null : e);
      default:
        return null;
    }
  }
  function Zg(e, t) {
    if (Dn)
      return e === "compositionend" || (!el && Ed(e, t))
        ? ((e = kd()), (Ws = Qo = yr = null), (Dn = !1), e)
        : null;
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!(t.ctrlKey || t.altKey || t.metaKey) || (t.ctrlKey && t.altKey)) {
          if (t.char && 1 < t.char.length) return t.char;
          if (t.which) return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return jd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var Gg = {
    color: !0,
    date: !0,
    datetime: !0,
    "datetime-local": !0,
    email: !0,
    month: !0,
    number: !0,
    password: !0,
    range: !0,
    search: !0,
    tel: !0,
    text: !0,
    time: !0,
    url: !0,
    week: !0,
  };
  function Pd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Gg[e.type] : t === "textarea";
  }
  function Od(e, t, r, n) {
    (Ju(n),
      (t = ei(t, "onChange")),
      0 < t.length &&
        ((r = new Zo("onChange", "change", null, r, n)),
        e.push({ event: r, listeners: t })));
  }
  var Ua = null,
    $a = null;
  function Yg(e) {
    Yd(e, 0);
  }
  function Gs(e) {
    var t = qn(e);
    if (Bu(t)) return e;
  }
  function Xg(e, t) {
    if (e === "change") return t;
  }
  var Ld = !1;
  if (Vt) {
    var tl;
    if (Vt) {
      var rl = "oninput" in document;
      if (!rl) {
        var Dd = document.createElement("div");
        (Dd.setAttribute("oninput", "return;"),
          (rl = typeof Dd.oninput == "function"));
      }
      tl = rl;
    } else tl = !1;
    Ld = tl && (!document.documentMode || 9 < document.documentMode);
  }
  function Id() {
    Ua && (Ua.detachEvent("onpropertychange", Md), ($a = Ua = null));
  }
  function Md(e) {
    if (e.propertyName === "value" && Gs($a)) {
      var t = [];
      (Od(t, $a, e, Do(e)), nd(Yg, t));
    }
  }
  function Jg(e, t, r) {
    e === "focusin"
      ? (Id(), (Ua = t), ($a = r), Ua.attachEvent("onpropertychange", Md))
      : e === "focusout" && Id();
  }
  function ey(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Gs($a);
  }
  function ty(e, t) {
    if (e === "click") return Gs(t);
  }
  function ry(e, t) {
    if (e === "input" || e === "change") return Gs(t);
  }
  function ny(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var St = typeof Object.is == "function" ? Object.is : ny;
  function Va(e, t) {
    if (St(e, t)) return !0;
    if (
      typeof e != "object" ||
      e === null ||
      typeof t != "object" ||
      t === null
    )
      return !1;
    var r = Object.keys(e),
      n = Object.keys(t);
    if (r.length !== n.length) return !1;
    for (n = 0; n < r.length; n++) {
      var a = r[n];
      if (!mo.call(t, a) || !St(e[a], t[a])) return !1;
    }
    return !0;
  }
  function Fd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function zd(e, t) {
    var r = Fd(e);
    e = 0;
    for (var n; r; ) {
      if (r.nodeType === 3) {
        if (((n = e + r.textContent.length), e <= t && n >= t))
          return { node: r, offset: t - e };
        e = n;
      }
      e: {
        for (; r; ) {
          if (r.nextSibling) {
            r = r.nextSibling;
            break e;
          }
          r = r.parentNode;
        }
        r = void 0;
      }
      r = Fd(r);
    }
  }
  function qd(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? qd(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Bd() {
    for (var e = window, t = Os(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = Os(e.document);
    }
    return t;
  }
  function nl(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return (
      t &&
      ((t === "input" &&
        (e.type === "text" ||
          e.type === "search" ||
          e.type === "tel" ||
          e.type === "url" ||
          e.type === "password")) ||
        t === "textarea" ||
        e.contentEditable === "true")
    );
  }
  function ay(e) {
    var t = Bd(),
      r = e.focusedElem,
      n = e.selectionRange;
    if (
      t !== r &&
      r &&
      r.ownerDocument &&
      qd(r.ownerDocument.documentElement, r)
    ) {
      if (n !== null && nl(r)) {
        if (
          ((t = n.start),
          (e = n.end),
          e === void 0 && (e = t),
          "selectionStart" in r)
        )
          ((r.selectionStart = t),
            (r.selectionEnd = Math.min(e, r.value.length)));
        else if (
          ((e = ((t = r.ownerDocument || document) && t.defaultView) || window),
          e.getSelection)
        ) {
          e = e.getSelection();
          var a = r.textContent.length,
            s = Math.min(n.start, a);
          ((n = n.end === void 0 ? s : Math.min(n.end, a)),
            !e.extend && s > n && ((a = n), (n = s), (s = a)),
            (a = zd(r, s)));
          var o = zd(r, n);
          a &&
            o &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== a.node ||
              e.anchorOffset !== a.offset ||
              e.focusNode !== o.node ||
              e.focusOffset !== o.offset) &&
            ((t = t.createRange()),
            t.setStart(a.node, a.offset),
            e.removeAllRanges(),
            s > n
              ? (e.addRange(t), e.extend(o.node, o.offset))
              : (t.setEnd(o.node, o.offset), e.addRange(t)));
        }
      }
      for (t = [], e = r; (e = e.parentNode); )
        e.nodeType === 1 &&
          t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
      for (typeof r.focus == "function" && r.focus(), r = 0; r < t.length; r++)
        ((e = t[r]),
          (e.element.scrollLeft = e.left),
          (e.element.scrollTop = e.top));
    }
  }
  var sy = Vt && "documentMode" in document && 11 >= document.documentMode,
    In = null,
    al = null,
    Ka = null,
    sl = !1;
  function Ud(e, t, r) {
    var n =
      r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    sl ||
      In == null ||
      In !== Os(n) ||
      ((n = In),
      "selectionStart" in n && nl(n)
        ? (n = { start: n.selectionStart, end: n.selectionEnd })
        : ((n = (
            (n.ownerDocument && n.ownerDocument.defaultView) ||
            window
          ).getSelection()),
          (n = {
            anchorNode: n.anchorNode,
            anchorOffset: n.anchorOffset,
            focusNode: n.focusNode,
            focusOffset: n.focusOffset,
          })),
      (Ka && Va(Ka, n)) ||
        ((Ka = n),
        (n = ei(al, "onSelect")),
        0 < n.length &&
          ((t = new Zo("onSelect", "select", null, t, r)),
          e.push({ event: t, listeners: n }),
          (t.target = In))));
  }
  function Ys(e, t) {
    var r = {};
    return (
      (r[e.toLowerCase()] = t.toLowerCase()),
      (r["Webkit" + e] = "webkit" + t),
      (r["Moz" + e] = "moz" + t),
      r
    );
  }
  var Mn = {
      animationend: Ys("Animation", "AnimationEnd"),
      animationiteration: Ys("Animation", "AnimationIteration"),
      animationstart: Ys("Animation", "AnimationStart"),
      transitionend: Ys("Transition", "TransitionEnd"),
    },
    il = {},
    $d = {};
  Vt &&
    (($d = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Mn.animationend.animation,
      delete Mn.animationiteration.animation,
      delete Mn.animationstart.animation),
    "TransitionEvent" in window || delete Mn.transitionend.transition);
  function Xs(e) {
    if (il[e]) return il[e];
    if (!Mn[e]) return e;
    var t = Mn[e],
      r;
    for (r in t) if (t.hasOwnProperty(r) && r in $d) return (il[e] = t[r]);
    return e;
  }
  var Vd = Xs("animationend"),
    Kd = Xs("animationiteration"),
    Wd = Xs("animationstart"),
    Hd = Xs("transitionend"),
    Qd = new Map(),
    Zd =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function vr(e, t) {
    (Qd.set(e, t), Wr(t, [e]));
  }
  for (var ol = 0; ol < Zd.length; ol++) {
    var ll = Zd[ol],
      iy = ll.toLowerCase(),
      oy = ll[0].toUpperCase() + ll.slice(1);
    vr(iy, "on" + oy);
  }
  (vr(Vd, "onAnimationEnd"),
    vr(Kd, "onAnimationIteration"),
    vr(Wd, "onAnimationStart"),
    vr("dblclick", "onDoubleClick"),
    vr("focusin", "onFocus"),
    vr("focusout", "onBlur"),
    vr(Hd, "onTransitionEnd"),
    jn("onMouseEnter", ["mouseout", "mouseover"]),
    jn("onMouseLeave", ["mouseout", "mouseover"]),
    jn("onPointerEnter", ["pointerout", "pointerover"]),
    jn("onPointerLeave", ["pointerout", "pointerover"]),
    Wr(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    Wr(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    Wr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    Wr(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    Wr(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    Wr(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var Wa =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    ly = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(Wa)
    );
  function Gd(e, t, r) {
    var n = e.type || "unknown-event";
    ((e.currentTarget = r), ig(n, t, void 0, e), (e.currentTarget = null));
  }
  function Yd(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var n = e[r],
        a = n.event;
      n = n.listeners;
      e: {
        var s = void 0;
        if (t)
          for (var o = n.length - 1; 0 <= o; o--) {
            var l = n[o],
              c = l.instance,
              u = l.currentTarget;
            if (((l = l.listener), c !== s && a.isPropagationStopped()))
              break e;
            (Gd(a, l, u), (s = c));
          }
        else
          for (o = 0; o < n.length; o++) {
            if (
              ((l = n[o]),
              (c = l.instance),
              (u = l.currentTarget),
              (l = l.listener),
              c !== s && a.isPropagationStopped())
            )
              break e;
            (Gd(a, l, u), (s = c));
          }
      }
    }
    if (Is) throw ((e = zo), (Is = !1), (zo = null), e);
  }
  function de(e, t) {
    var r = t[gl];
    r === void 0 && (r = t[gl] = new Set());
    var n = e + "__bubble";
    r.has(n) || (Xd(t, e, 2, !1), r.add(n));
  }
  function cl(e, t, r) {
    var n = 0;
    (t && (n |= 4), Xd(r, e, n, t));
  }
  var Js = "_reactListening" + Math.random().toString(36).slice(2);
  function Ha(e) {
    if (!e[Js]) {
      ((e[Js] = !0),
        Ou.forEach(function (r) {
          r !== "selectionchange" && (ly.has(r) || cl(r, !1, e), cl(r, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Js] || ((t[Js] = !0), cl("selectionchange", !1, t));
    }
  }
  function Xd(e, t, r, n) {
    switch (wd(t)) {
      case 1:
        var a = kg;
        break;
      case 4:
        a = Sg;
        break;
      default:
        a = Wo;
    }
    ((r = a.bind(null, t, r, e)),
      (a = void 0),
      !Fo ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (a = !0),
      n
        ? a !== void 0
          ? e.addEventListener(t, r, { capture: !0, passive: a })
          : e.addEventListener(t, r, !0)
        : a !== void 0
          ? e.addEventListener(t, r, { passive: a })
          : e.addEventListener(t, r, !1));
  }
  function ul(e, t, r, n, a) {
    var s = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var l = n.stateNode.containerInfo;
          if (l === a || (l.nodeType === 8 && l.parentNode === a)) break;
          if (o === 4)
            for (o = n.return; o !== null; ) {
              var c = o.tag;
              if (
                (c === 3 || c === 4) &&
                ((c = o.stateNode.containerInfo),
                c === a || (c.nodeType === 8 && c.parentNode === a))
              )
                return;
              o = o.return;
            }
          for (; l !== null; ) {
            if (((o = Qr(l)), o === null)) return;
            if (((c = o.tag), c === 5 || c === 6)) {
              n = s = o;
              continue e;
            }
            l = l.parentNode;
          }
        }
        n = n.return;
      }
    nd(function () {
      var u = s,
        p = Do(r),
        f = [];
      e: {
        var m = Qd.get(e);
        if (m !== void 0) {
          var x = Zo,
            v = e;
          switch (e) {
            case "keypress":
              if (Hs(r) === 0) break e;
            case "keydown":
            case "keyup":
              x = Fg;
              break;
            case "focusin":
              ((v = "focus"), (x = Xo));
              break;
            case "focusout":
              ((v = "blur"), (x = Xo));
              break;
            case "beforeblur":
            case "afterblur":
              x = Xo;
              break;
            case "click":
              if (r.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              x = Cd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              x = Rg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              x = Bg;
              break;
            case Vd:
            case Kd:
            case Wd:
              x = Ag;
              break;
            case Hd:
              x = $g;
              break;
            case "scroll":
              x = Cg;
              break;
            case "wheel":
              x = Kg;
              break;
            case "copy":
            case "cut":
            case "paste":
              x = Tg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              x = Rd;
          }
          var b = (t & 4) !== 0,
            C = !b && e === "scroll",
            g = b ? (m !== null ? m + "Capture" : null) : m;
          b = [];
          for (var d = u, y; d !== null; ) {
            y = d;
            var w = y.stateNode;
            if (
              (y.tag === 5 &&
                w !== null &&
                ((y = w),
                g !== null &&
                  ((w = Aa(d, g)), w != null && b.push(Qa(d, w, y)))),
              C)
            )
              break;
            d = d.return;
          }
          0 < b.length &&
            ((m = new x(m, v, null, r, p)), f.push({ event: m, listeners: b }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((m = e === "mouseover" || e === "pointerover"),
            (x = e === "mouseout" || e === "pointerout"),
            m &&
              r !== Lo &&
              (v = r.relatedTarget || r.fromElement) &&
              (Qr(v) || v[Wt]))
          )
            break e;
          if (
            (x || m) &&
            ((m =
              p.window === p
                ? p
                : (m = p.ownerDocument)
                  ? m.defaultView || m.parentWindow
                  : window),
            x
              ? ((v = r.relatedTarget || r.toElement),
                (x = u),
                (v = v ? Qr(v) : null),
                v !== null &&
                  ((C = Hr(v)), v !== C || (v.tag !== 5 && v.tag !== 6)) &&
                  (v = null))
              : ((x = null), (v = u)),
            x !== v)
          ) {
            if (
              ((b = Cd),
              (w = "onMouseLeave"),
              (g = "onMouseEnter"),
              (d = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((b = Rd),
                (w = "onPointerLeave"),
                (g = "onPointerEnter"),
                (d = "pointer")),
              (C = x == null ? m : qn(x)),
              (y = v == null ? m : qn(v)),
              (m = new b(w, d + "leave", x, r, p)),
              (m.target = C),
              (m.relatedTarget = y),
              (w = null),
              Qr(p) === u &&
                ((b = new b(g, d + "enter", v, r, p)),
                (b.target = y),
                (b.relatedTarget = C),
                (w = b)),
              (C = w),
              x && v)
            )
              t: {
                for (b = x, g = v, d = 0, y = b; y; y = Fn(y)) d++;
                for (y = 0, w = g; w; w = Fn(w)) y++;
                for (; 0 < d - y; ) ((b = Fn(b)), d--);
                for (; 0 < y - d; ) ((g = Fn(g)), y--);
                for (; d--; ) {
                  if (b === g || (g !== null && b === g.alternate)) break t;
                  ((b = Fn(b)), (g = Fn(g)));
                }
                b = null;
              }
            else b = null;
            (x !== null && Jd(f, m, x, b, !1),
              v !== null && C !== null && Jd(f, C, v, b, !0));
          }
        }
        e: {
          if (
            ((m = u ? qn(u) : window),
            (x = m.nodeName && m.nodeName.toLowerCase()),
            x === "select" || (x === "input" && m.type === "file"))
          )
            var _ = Xg;
          else if (Pd(m))
            if (Ld) _ = ry;
            else {
              _ = ey;
              var A = Jg;
            }
          else
            (x = m.nodeName) &&
              x.toLowerCase() === "input" &&
              (m.type === "checkbox" || m.type === "radio") &&
              (_ = ty);
          if (_ && (_ = _(e, u))) {
            Od(f, _, r, p);
            break e;
          }
          (A && A(e, m, u),
            e === "focusout" &&
              (A = m._wrapperState) &&
              A.controlled &&
              m.type === "number" &&
              Ao(m, "number", m.value));
        }
        switch (((A = u ? qn(u) : window), e)) {
          case "focusin":
            (Pd(A) || A.contentEditable === "true") &&
              ((In = A), (al = u), (Ka = null));
            break;
          case "focusout":
            Ka = al = In = null;
            break;
          case "mousedown":
            sl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((sl = !1), Ud(f, r, p));
            break;
          case "selectionchange":
            if (sy) break;
          case "keydown":
          case "keyup":
            Ud(f, r, p);
        }
        var R;
        if (el)
          e: {
            switch (e) {
              case "compositionstart":
                var T = "onCompositionStart";
                break e;
              case "compositionend":
                T = "onCompositionEnd";
                break e;
              case "compositionupdate":
                T = "onCompositionUpdate";
                break e;
            }
            T = void 0;
          }
        else
          Dn
            ? Ed(e, r) && (T = "onCompositionEnd")
            : e === "keydown" &&
              r.keyCode === 229 &&
              (T = "onCompositionStart");
        (T &&
          (jd &&
            r.locale !== "ko" &&
            (Dn || T !== "onCompositionStart"
              ? T === "onCompositionEnd" && Dn && (R = kd())
              : ((yr = p),
                (Qo = "value" in yr ? yr.value : yr.textContent),
                (Dn = !0))),
          (A = ei(u, T)),
          0 < A.length &&
            ((T = new _d(T, e, null, r, p)),
            f.push({ event: T, listeners: A }),
            R ? (T.data = R) : ((R = Td(r)), R !== null && (T.data = R)))),
          (R = Hg ? Qg(e, r) : Zg(e, r)) &&
            ((u = ei(u, "onBeforeInput")),
            0 < u.length &&
              ((p = new _d("onBeforeInput", "beforeinput", null, r, p)),
              f.push({ event: p, listeners: u }),
              (p.data = R))));
      }
      Yd(f, t);
    });
  }
  function Qa(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function ei(e, t) {
    for (var r = t + "Capture", n = []; e !== null; ) {
      var a = e,
        s = a.stateNode;
      (a.tag === 5 &&
        s !== null &&
        ((a = s),
        (s = Aa(e, r)),
        s != null && n.unshift(Qa(e, s, a)),
        (s = Aa(e, t)),
        s != null && n.push(Qa(e, s, a))),
        (e = e.return));
    }
    return n;
  }
  function Fn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Jd(e, t, r, n, a) {
    for (var s = t._reactName, o = []; r !== null && r !== n; ) {
      var l = r,
        c = l.alternate,
        u = l.stateNode;
      if (c !== null && c === n) break;
      (l.tag === 5 &&
        u !== null &&
        ((l = u),
        a
          ? ((c = Aa(r, s)), c != null && o.unshift(Qa(r, c, l)))
          : a || ((c = Aa(r, s)), c != null && o.push(Qa(r, c, l)))),
        (r = r.return));
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
  }
  var cy = /\r\n?/g,
    uy = /\u0000|\uFFFD/g;
  function ep(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        cy,
        `
`
      )
      .replace(uy, "");
  }
  function ti(e, t, r) {
    if (((t = ep(t)), ep(e) !== t && r)) throw Error(E(425));
  }
  function ri() {}
  var dl = null,
    pl = null;
  function ml(e, t) {
    return (
      e === "textarea" ||
      e === "noscript" ||
      typeof t.children == "string" ||
      typeof t.children == "number" ||
      (typeof t.dangerouslySetInnerHTML == "object" &&
        t.dangerouslySetInnerHTML !== null &&
        t.dangerouslySetInnerHTML.__html != null)
    );
  }
  var hl = typeof setTimeout == "function" ? setTimeout : void 0,
    dy = typeof clearTimeout == "function" ? clearTimeout : void 0,
    tp = typeof Promise == "function" ? Promise : void 0,
    py =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof tp < "u"
          ? function (e) {
              return tp.resolve(null).then(e).catch(my);
            }
          : hl;
  function my(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function fl(e, t) {
    var r = t,
      n = 0;
    do {
      var a = r.nextSibling;
      if ((e.removeChild(r), a && a.nodeType === 8))
        if (((r = a.data), r === "/$")) {
          if (n === 0) {
            (e.removeChild(a), Fa(t));
            return;
          }
          n--;
        } else (r !== "$" && r !== "$?" && r !== "$!") || n++;
      r = a;
    } while (r);
    Fa(t);
  }
  function xr(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === 1 || t === 3) break;
      if (t === 8) {
        if (((t = e.data), t === "$" || t === "$!" || t === "$?")) break;
        if (t === "/$") return null;
      }
    }
    return e;
  }
  function rp(e) {
    e = e.previousSibling;
    for (var t = 0; e; ) {
      if (e.nodeType === 8) {
        var r = e.data;
        if (r === "$" || r === "$!" || r === "$?") {
          if (t === 0) return e;
          t--;
        } else r === "/$" && t++;
      }
      e = e.previousSibling;
    }
    return null;
  }
  var zn = Math.random().toString(36).slice(2),
    Ot = "__reactFiber$" + zn,
    Za = "__reactProps$" + zn,
    Wt = "__reactContainer$" + zn,
    gl = "__reactEvents$" + zn,
    hy = "__reactListeners$" + zn,
    fy = "__reactHandles$" + zn;
  function Qr(e) {
    var t = e[Ot];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if ((t = r[Wt] || r[Ot])) {
        if (
          ((r = t.alternate),
          t.child !== null || (r !== null && r.child !== null))
        )
          for (e = rp(e); e !== null; ) {
            if ((r = e[Ot])) return r;
            e = rp(e);
          }
        return t;
      }
      ((e = r), (r = e.parentNode));
    }
    return null;
  }
  function Ga(e) {
    return (
      (e = e[Ot] || e[Wt]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function qn(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(E(33));
  }
  function ni(e) {
    return e[Za] || null;
  }
  var yl = [],
    Bn = -1;
  function br(e) {
    return { current: e };
  }
  function pe(e) {
    0 > Bn || ((e.current = yl[Bn]), (yl[Bn] = null), Bn--);
  }
  function ue(e, t) {
    (Bn++, (yl[Bn] = e.current), (e.current = t));
  }
  var wr = {},
    ze = br(wr),
    Ye = br(!1),
    Zr = wr;
  function Un(e, t) {
    var r = e.type.contextTypes;
    if (!r) return wr;
    var n = e.stateNode;
    if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
      return n.__reactInternalMemoizedMaskedChildContext;
    var a = {},
      s;
    for (s in r) a[s] = t[s];
    return (
      n &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = a)),
      a
    );
  }
  function Xe(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function ai() {
    (pe(Ye), pe(ze));
  }
  function np(e, t, r) {
    if (ze.current !== wr) throw Error(E(168));
    (ue(ze, t), ue(Ye, r));
  }
  function ap(e, t, r) {
    var n = e.stateNode;
    if (((t = t.childContextTypes), typeof n.getChildContext != "function"))
      return r;
    n = n.getChildContext();
    for (var a in n) if (!(a in t)) throw Error(E(108, Jf(e) || "Unknown", a));
    return he({}, r, n);
  }
  function si(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        wr),
      (Zr = ze.current),
      ue(ze, e),
      ue(Ye, Ye.current),
      !0
    );
  }
  function sp(e, t, r) {
    var n = e.stateNode;
    if (!n) throw Error(E(169));
    (r
      ? ((e = ap(e, t, Zr)),
        (n.__reactInternalMemoizedMergedChildContext = e),
        pe(Ye),
        pe(ze),
        ue(ze, e))
      : pe(Ye),
      ue(Ye, r));
  }
  var Ht = null,
    ii = !1,
    vl = !1;
  function ip(e) {
    Ht === null ? (Ht = [e]) : Ht.push(e);
  }
  function gy(e) {
    ((ii = !0), ip(e));
  }
  function kr() {
    if (!vl && Ht !== null) {
      vl = !0;
      var e = 0,
        t = ie;
      try {
        var r = Ht;
        for (ie = 1; e < r.length; e++) {
          var n = r[e];
          do n = n(!0);
          while (n !== null);
        }
        ((Ht = null), (ii = !1));
      } catch (a) {
        throw (Ht !== null && (Ht = Ht.slice(e + 1)), ld(qo, kr), a);
      } finally {
        ((ie = t), (vl = !1));
      }
    }
    return null;
  }
  var $n = [],
    Vn = 0,
    oi = null,
    li = 0,
    pt = [],
    mt = 0,
    Gr = null,
    Qt = 1,
    Zt = "";
  function Yr(e, t) {
    (($n[Vn++] = li), ($n[Vn++] = oi), (oi = e), (li = t));
  }
  function op(e, t, r) {
    ((pt[mt++] = Qt), (pt[mt++] = Zt), (pt[mt++] = Gr), (Gr = e));
    var n = Qt;
    e = Zt;
    var a = 32 - kt(n) - 1;
    ((n &= ~(1 << a)), (r += 1));
    var s = 32 - kt(t) + a;
    if (30 < s) {
      var o = a - (a % 5);
      ((s = (n & ((1 << o) - 1)).toString(32)),
        (n >>= o),
        (a -= o),
        (Qt = (1 << (32 - kt(t) + a)) | (r << a) | n),
        (Zt = s + e));
    } else ((Qt = (1 << s) | (r << a) | n), (Zt = e));
  }
  function xl(e) {
    e.return !== null && (Yr(e, 1), op(e, 1, 0));
  }
  function bl(e) {
    for (; e === oi; )
      ((oi = $n[--Vn]), ($n[Vn] = null), (li = $n[--Vn]), ($n[Vn] = null));
    for (; e === Gr; )
      ((Gr = pt[--mt]),
        (pt[mt] = null),
        (Zt = pt[--mt]),
        (pt[mt] = null),
        (Qt = pt[--mt]),
        (pt[mt] = null));
  }
  var lt = null,
    ct = null,
    me = !1,
    Ct = null;
  function lp(e, t) {
    var r = yt(5, null, null, 0);
    ((r.elementType = "DELETED"),
      (r.stateNode = t),
      (r.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
  }
  function cp(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return (
          (t =
            t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (lt = e), (ct = xr(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (lt = e), (ct = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((r = Gr !== null ? { id: Qt, overflow: Zt } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: r,
                retryLane: 1073741824,
              }),
              (r = yt(18, null, null, 0)),
              (r.stateNode = t),
              (r.return = e),
              (e.child = r),
              (lt = e),
              (ct = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function wl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function kl(e) {
    if (me) {
      var t = ct;
      if (t) {
        var r = t;
        if (!cp(e, t)) {
          if (wl(e)) throw Error(E(418));
          t = xr(r.nextSibling);
          var n = lt;
          t && cp(e, t)
            ? lp(n, r)
            : ((e.flags = (e.flags & -4097) | 2), (me = !1), (lt = e));
        }
      } else {
        if (wl(e)) throw Error(E(418));
        ((e.flags = (e.flags & -4097) | 2), (me = !1), (lt = e));
      }
    }
  }
  function up(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
    )
      e = e.return;
    lt = e;
  }
  function ci(e) {
    if (e !== lt) return !1;
    if (!me) return (up(e), (me = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !ml(e.type, e.memoizedProps))),
      t && (t = ct))
    ) {
      if (wl(e)) throw (dp(), Error(E(418)));
      for (; t; ) (lp(e, t), (t = xr(t.nextSibling)));
    }
    if ((up(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(E(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                ct = xr(e.nextSibling);
                break e;
              }
              t--;
            } else (r !== "$" && r !== "$!" && r !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        ct = null;
      }
    } else ct = lt ? xr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function dp() {
    for (var e = ct; e; ) e = xr(e.nextSibling);
  }
  function Kn() {
    ((ct = lt = null), (me = !1));
  }
  function Sl(e) {
    Ct === null ? (Ct = [e]) : Ct.push(e);
  }
  var yy = Kt.ReactCurrentBatchConfig;
  function Ya(e, t, r) {
    if (
      ((e = r.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (r._owner) {
        if (((r = r._owner), r)) {
          if (r.tag !== 1) throw Error(E(309));
          var n = r.stateNode;
        }
        if (!n) throw Error(E(147, e));
        var a = n,
          s = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === s
          ? t.ref
          : ((t = function (o) {
              var l = a.refs;
              o === null ? delete l[s] : (l[s] = o);
            }),
            (t._stringRef = s),
            t);
      }
      if (typeof e != "string") throw Error(E(284));
      if (!r._owner) throw Error(E(290, e));
    }
    return e;
  }
  function ui(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        E(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e
        )
      )
    );
  }
  function pp(e) {
    var t = e._init;
    return t(e._payload);
  }
  function mp(e) {
    function t(g, d) {
      if (e) {
        var y = g.deletions;
        y === null ? ((g.deletions = [d]), (g.flags |= 16)) : y.push(d);
      }
    }
    function r(g, d) {
      if (!e) return null;
      for (; d !== null; ) (t(g, d), (d = d.sibling));
      return null;
    }
    function n(g, d) {
      for (g = new Map(); d !== null; )
        (d.key !== null ? g.set(d.key, d) : g.set(d.index, d), (d = d.sibling));
      return g;
    }
    function a(g, d) {
      return ((g = Er(g, d)), (g.index = 0), (g.sibling = null), g);
    }
    function s(g, d, y) {
      return (
        (g.index = y),
        e
          ? ((y = g.alternate),
            y !== null
              ? ((y = y.index), y < d ? ((g.flags |= 2), d) : y)
              : ((g.flags |= 2), d))
          : ((g.flags |= 1048576), d)
      );
    }
    function o(g) {
      return (e && g.alternate === null && (g.flags |= 2), g);
    }
    function l(g, d, y, w) {
      return d === null || d.tag !== 6
        ? ((d = hc(y, g.mode, w)), (d.return = g), d)
        : ((d = a(d, y)), (d.return = g), d);
    }
    function c(g, d, y, w) {
      var _ = y.type;
      return _ === An
        ? p(g, d, y.props.children, w, y.key)
        : d !== null &&
            (d.elementType === _ ||
              (typeof _ == "object" &&
                _ !== null &&
                _.$$typeof === dr &&
                pp(_) === d.type))
          ? ((w = a(d, y.props)), (w.ref = Ya(g, d, y)), (w.return = g), w)
          : ((w = Li(y.type, y.key, y.props, null, g.mode, w)),
            (w.ref = Ya(g, d, y)),
            (w.return = g),
            w);
    }
    function u(g, d, y, w) {
      return d === null ||
        d.tag !== 4 ||
        d.stateNode.containerInfo !== y.containerInfo ||
        d.stateNode.implementation !== y.implementation
        ? ((d = fc(y, g.mode, w)), (d.return = g), d)
        : ((d = a(d, y.children || [])), (d.return = g), d);
    }
    function p(g, d, y, w, _) {
      return d === null || d.tag !== 7
        ? ((d = sn(y, g.mode, w, _)), (d.return = g), d)
        : ((d = a(d, y)), (d.return = g), d);
    }
    function f(g, d, y) {
      if ((typeof d == "string" && d !== "") || typeof d == "number")
        return ((d = hc("" + d, g.mode, y)), (d.return = g), d);
      if (typeof d == "object" && d !== null) {
        switch (d.$$typeof) {
          case Ts:
            return (
              (y = Li(d.type, d.key, d.props, null, g.mode, y)),
              (y.ref = Ya(g, null, d)),
              (y.return = g),
              y
            );
          case Nn:
            return ((d = fc(d, g.mode, y)), (d.return = g), d);
          case dr:
            var w = d._init;
            return f(g, w(d._payload), y);
        }
        if (Ra(d) || Ca(d))
          return ((d = sn(d, g.mode, y, null)), (d.return = g), d);
        ui(g, d);
      }
      return null;
    }
    function m(g, d, y, w) {
      var _ = d !== null ? d.key : null;
      if ((typeof y == "string" && y !== "") || typeof y == "number")
        return _ !== null ? null : l(g, d, "" + y, w);
      if (typeof y == "object" && y !== null) {
        switch (y.$$typeof) {
          case Ts:
            return y.key === _ ? c(g, d, y, w) : null;
          case Nn:
            return y.key === _ ? u(g, d, y, w) : null;
          case dr:
            return ((_ = y._init), m(g, d, _(y._payload), w));
        }
        if (Ra(y) || Ca(y)) return _ !== null ? null : p(g, d, y, w, null);
        ui(g, y);
      }
      return null;
    }
    function x(g, d, y, w, _) {
      if ((typeof w == "string" && w !== "") || typeof w == "number")
        return ((g = g.get(y) || null), l(d, g, "" + w, _));
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case Ts:
            return (
              (g = g.get(w.key === null ? y : w.key) || null),
              c(d, g, w, _)
            );
          case Nn:
            return (
              (g = g.get(w.key === null ? y : w.key) || null),
              u(d, g, w, _)
            );
          case dr:
            var A = w._init;
            return x(g, d, y, A(w._payload), _);
        }
        if (Ra(w) || Ca(w))
          return ((g = g.get(y) || null), p(d, g, w, _, null));
        ui(d, w);
      }
      return null;
    }
    function v(g, d, y, w) {
      for (
        var _ = null, A = null, R = d, T = (d = 0), S = null;
        R !== null && T < y.length;
        T++
      ) {
        R.index > T ? ((S = R), (R = null)) : (S = R.sibling);
        var O = m(g, R, y[T], w);
        if (O === null) {
          R === null && (R = S);
          break;
        }
        (e && R && O.alternate === null && t(g, R),
          (d = s(O, d, T)),
          A === null ? (_ = O) : (A.sibling = O),
          (A = O),
          (R = S));
      }
      if (T === y.length) return (r(g, R), me && Yr(g, T), _);
      if (R === null) {
        for (; T < y.length; T++)
          ((R = f(g, y[T], w)),
            R !== null &&
              ((d = s(R, d, T)),
              A === null ? (_ = R) : (A.sibling = R),
              (A = R)));
        return (me && Yr(g, T), _);
      }
      for (R = n(g, R); T < y.length; T++)
        ((S = x(R, g, T, y[T], w)),
          S !== null &&
            (e && S.alternate !== null && R.delete(S.key === null ? T : S.key),
            (d = s(S, d, T)),
            A === null ? (_ = S) : (A.sibling = S),
            (A = S)));
      return (
        e &&
          R.forEach(function ($) {
            return t(g, $);
          }),
        me && Yr(g, T),
        _
      );
    }
    function b(g, d, y, w) {
      var _ = Ca(y);
      if (typeof _ != "function") throw Error(E(150));
      if (((y = _.call(y)), y == null)) throw Error(E(151));
      for (
        var A = (_ = null), R = d, T = (d = 0), S = null, O = y.next();
        R !== null && !O.done;
        T++, O = y.next()
      ) {
        R.index > T ? ((S = R), (R = null)) : (S = R.sibling);
        var $ = m(g, R, O.value, w);
        if ($ === null) {
          R === null && (R = S);
          break;
        }
        (e && R && $.alternate === null && t(g, R),
          (d = s($, d, T)),
          A === null ? (_ = $) : (A.sibling = $),
          (A = $),
          (R = S));
      }
      if (O.done) return (r(g, R), me && Yr(g, T), _);
      if (R === null) {
        for (; !O.done; T++, O = y.next())
          ((O = f(g, O.value, w)),
            O !== null &&
              ((d = s(O, d, T)),
              A === null ? (_ = O) : (A.sibling = O),
              (A = O)));
        return (me && Yr(g, T), _);
      }
      for (R = n(g, R); !O.done; T++, O = y.next())
        ((O = x(R, g, T, O.value, w)),
          O !== null &&
            (e && O.alternate !== null && R.delete(O.key === null ? T : O.key),
            (d = s(O, d, T)),
            A === null ? (_ = O) : (A.sibling = O),
            (A = O)));
      return (
        e &&
          R.forEach(function (J) {
            return t(g, J);
          }),
        me && Yr(g, T),
        _
      );
    }
    function C(g, d, y, w) {
      if (
        (typeof y == "object" &&
          y !== null &&
          y.type === An &&
          y.key === null &&
          (y = y.props.children),
        typeof y == "object" && y !== null)
      ) {
        switch (y.$$typeof) {
          case Ts:
            e: {
              for (var _ = y.key, A = d; A !== null; ) {
                if (A.key === _) {
                  if (((_ = y.type), _ === An)) {
                    if (A.tag === 7) {
                      (r(g, A.sibling),
                        (d = a(A, y.props.children)),
                        (d.return = g),
                        (g = d));
                      break e;
                    }
                  } else if (
                    A.elementType === _ ||
                    (typeof _ == "object" &&
                      _ !== null &&
                      _.$$typeof === dr &&
                      pp(_) === A.type)
                  ) {
                    (r(g, A.sibling),
                      (d = a(A, y.props)),
                      (d.ref = Ya(g, A, y)),
                      (d.return = g),
                      (g = d));
                    break e;
                  }
                  r(g, A);
                  break;
                } else t(g, A);
                A = A.sibling;
              }
              y.type === An
                ? ((d = sn(y.props.children, g.mode, w, y.key)),
                  (d.return = g),
                  (g = d))
                : ((w = Li(y.type, y.key, y.props, null, g.mode, w)),
                  (w.ref = Ya(g, d, y)),
                  (w.return = g),
                  (g = w));
            }
            return o(g);
          case Nn:
            e: {
              for (A = y.key; d !== null; ) {
                if (d.key === A)
                  if (
                    d.tag === 4 &&
                    d.stateNode.containerInfo === y.containerInfo &&
                    d.stateNode.implementation === y.implementation
                  ) {
                    (r(g, d.sibling),
                      (d = a(d, y.children || [])),
                      (d.return = g),
                      (g = d));
                    break e;
                  } else {
                    r(g, d);
                    break;
                  }
                else t(g, d);
                d = d.sibling;
              }
              ((d = fc(y, g.mode, w)), (d.return = g), (g = d));
            }
            return o(g);
          case dr:
            return ((A = y._init), C(g, d, A(y._payload), w));
        }
        if (Ra(y)) return v(g, d, y, w);
        if (Ca(y)) return b(g, d, y, w);
        ui(g, y);
      }
      return (typeof y == "string" && y !== "") || typeof y == "number"
        ? ((y = "" + y),
          d !== null && d.tag === 6
            ? (r(g, d.sibling), (d = a(d, y)), (d.return = g), (g = d))
            : (r(g, d), (d = hc(y, g.mode, w)), (d.return = g), (g = d)),
          o(g))
        : r(g, d);
    }
    return C;
  }
  var Wn = mp(!0),
    hp = mp(!1),
    di = br(null),
    pi = null,
    Hn = null,
    Cl = null;
  function _l() {
    Cl = Hn = pi = null;
  }
  function Rl(e) {
    var t = di.current;
    (pe(di), (e._currentValue = t));
  }
  function jl(e, t, r) {
    for (; e !== null; ) {
      var n = e.alternate;
      if (
        ((e.childLanes & t) !== t
          ? ((e.childLanes |= t), n !== null && (n.childLanes |= t))
          : n !== null && (n.childLanes & t) !== t && (n.childLanes |= t),
        e === r)
      )
        break;
      e = e.return;
    }
  }
  function Qn(e, t) {
    ((pi = e),
      (Cl = Hn = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (Je = !0), (e.firstContext = null)));
  }
  function ht(e) {
    var t = e._currentValue;
    if (Cl !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Hn === null)) {
        if (pi === null) throw Error(E(308));
        ((Hn = e), (pi.dependencies = { lanes: 0, firstContext: e }));
      } else Hn = Hn.next = e;
    return t;
  }
  var Xr = null;
  function Nl(e) {
    Xr === null ? (Xr = [e]) : Xr.push(e);
  }
  function fp(e, t, r, n) {
    var a = t.interleaved;
    return (
      a === null ? ((r.next = r), Nl(t)) : ((r.next = a.next), (a.next = r)),
      (t.interleaved = r),
      Gt(e, n)
    );
  }
  function Gt(e, t) {
    e.lanes |= t;
    var r = e.alternate;
    for (r !== null && (r.lanes |= t), r = e, e = e.return; e !== null; )
      ((e.childLanes |= t),
        (r = e.alternate),
        r !== null && (r.childLanes |= t),
        (r = e),
        (e = e.return));
    return r.tag === 3 ? r.stateNode : null;
  }
  var Sr = !1;
  function Al(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function gp(e, t) {
    ((e = e.updateQueue),
      t.updateQueue === e &&
        (t.updateQueue = {
          baseState: e.baseState,
          firstBaseUpdate: e.firstBaseUpdate,
          lastBaseUpdate: e.lastBaseUpdate,
          shared: e.shared,
          effects: e.effects,
        }));
  }
  function Yt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function Cr(e, t, r) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (te & 2) !== 0)) {
      var a = n.pending;
      return (
        a === null ? (t.next = t) : ((t.next = a.next), (a.next = t)),
        (n.pending = t),
        Gt(e, r)
      );
    }
    return (
      (a = n.interleaved),
      a === null ? ((t.next = t), Nl(n)) : ((t.next = a.next), (a.next = t)),
      (n.interleaved = t),
      Gt(e, r)
    );
  }
  function mi(e, t, r) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
    ) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (r |= n), (t.lanes = r), $o(e, r));
    }
  }
  function yp(e, t) {
    var r = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), r === n)) {
      var a = null,
        s = null;
      if (((r = r.firstBaseUpdate), r !== null)) {
        do {
          var o = {
            eventTime: r.eventTime,
            lane: r.lane,
            tag: r.tag,
            payload: r.payload,
            callback: r.callback,
            next: null,
          };
          (s === null ? (a = s = o) : (s = s.next = o), (r = r.next));
        } while (r !== null);
        s === null ? (a = s = t) : (s = s.next = t);
      } else a = s = t;
      ((r = {
        baseState: n.baseState,
        firstBaseUpdate: a,
        lastBaseUpdate: s,
        shared: n.shared,
        effects: n.effects,
      }),
        (e.updateQueue = r));
      return;
    }
    ((e = r.lastBaseUpdate),
      e === null ? (r.firstBaseUpdate = t) : (e.next = t),
      (r.lastBaseUpdate = t));
  }
  function hi(e, t, r, n) {
    var a = e.updateQueue;
    Sr = !1;
    var s = a.firstBaseUpdate,
      o = a.lastBaseUpdate,
      l = a.shared.pending;
    if (l !== null) {
      a.shared.pending = null;
      var c = l,
        u = c.next;
      ((c.next = null), o === null ? (s = u) : (o.next = u), (o = c));
      var p = e.alternate;
      p !== null &&
        ((p = p.updateQueue),
        (l = p.lastBaseUpdate),
        l !== o &&
          (l === null ? (p.firstBaseUpdate = u) : (l.next = u),
          (p.lastBaseUpdate = c)));
    }
    if (s !== null) {
      var f = a.baseState;
      ((o = 0), (p = u = c = null), (l = s));
      do {
        var m = l.lane,
          x = l.eventTime;
        if ((n & m) === m) {
          p !== null &&
            (p = p.next =
              {
                eventTime: x,
                lane: 0,
                tag: l.tag,
                payload: l.payload,
                callback: l.callback,
                next: null,
              });
          e: {
            var v = e,
              b = l;
            switch (((m = t), (x = r), b.tag)) {
              case 1:
                if (((v = b.payload), typeof v == "function")) {
                  f = v.call(x, f, m);
                  break e;
                }
                f = v;
                break e;
              case 3:
                v.flags = (v.flags & -65537) | 128;
              case 0:
                if (
                  ((v = b.payload),
                  (m = typeof v == "function" ? v.call(x, f, m) : v),
                  m == null)
                )
                  break e;
                f = he({}, f, m);
                break e;
              case 2:
                Sr = !0;
            }
          }
          l.callback !== null &&
            l.lane !== 0 &&
            ((e.flags |= 64),
            (m = a.effects),
            m === null ? (a.effects = [l]) : m.push(l));
        } else
          ((x = {
            eventTime: x,
            lane: m,
            tag: l.tag,
            payload: l.payload,
            callback: l.callback,
            next: null,
          }),
            p === null ? ((u = p = x), (c = f)) : (p = p.next = x),
            (o |= m));
        if (((l = l.next), l === null)) {
          if (((l = a.shared.pending), l === null)) break;
          ((m = l),
            (l = m.next),
            (m.next = null),
            (a.lastBaseUpdate = m),
            (a.shared.pending = null));
        }
      } while (!0);
      if (
        (p === null && (c = f),
        (a.baseState = c),
        (a.firstBaseUpdate = u),
        (a.lastBaseUpdate = p),
        (t = a.shared.interleaved),
        t !== null)
      ) {
        a = t;
        do ((o |= a.lane), (a = a.next));
        while (a !== t);
      } else s === null && (a.shared.lanes = 0);
      ((tn |= o), (e.lanes = o), (e.memoizedState = f));
    }
  }
  function vp(e, t, r) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var n = e[t],
          a = n.callback;
        if (a !== null) {
          if (((n.callback = null), (n = r), typeof a != "function"))
            throw Error(E(191, a));
          a.call(n);
        }
      }
  }
  var Xa = {},
    Lt = br(Xa),
    Ja = br(Xa),
    es = br(Xa);
  function Jr(e) {
    if (e === Xa) throw Error(E(174));
    return e;
  }
  function El(e, t) {
    switch ((ue(es, t), ue(Ja, e), ue(Lt, Xa), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : To(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = To(t, e)));
    }
    (pe(Lt), ue(Lt, t));
  }
  function Zn() {
    (pe(Lt), pe(Ja), pe(es));
  }
  function xp(e) {
    Jr(es.current);
    var t = Jr(Lt.current),
      r = To(t, e.type);
    t !== r && (ue(Ja, e), ue(Lt, r));
  }
  function Tl(e) {
    Ja.current === e && (pe(Lt), pe(Ja));
  }
  var fe = br(0);
  function fi(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === 13) {
        var r = t.memoizedState;
        if (
          r !== null &&
          ((r = r.dehydrated), r === null || r.data === "$?" || r.data === "$!")
        )
          return t;
      } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
        if ((t.flags & 128) !== 0) return t;
      } else if (t.child !== null) {
        ((t.child.return = t), (t = t.child));
        continue;
      }
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return null;
        t = t.return;
      }
      ((t.sibling.return = t.return), (t = t.sibling));
    }
    return null;
  }
  var Pl = [];
  function Ol() {
    for (var e = 0; e < Pl.length; e++)
      Pl[e]._workInProgressVersionPrimary = null;
    Pl.length = 0;
  }
  var gi = Kt.ReactCurrentDispatcher,
    Ll = Kt.ReactCurrentBatchConfig,
    en = 0,
    ge = null,
    Ne = null,
    Te = null,
    yi = !1,
    ts = !1,
    rs = 0,
    vy = 0;
  function qe() {
    throw Error(E(321));
  }
  function Dl(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!St(e[r], t[r])) return !1;
    return !0;
  }
  function Il(e, t, r, n, a, s) {
    if (
      ((en = s),
      (ge = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (gi.current = e === null || e.memoizedState === null ? ky : Sy),
      (e = r(n, a)),
      ts)
    ) {
      s = 0;
      do {
        if (((ts = !1), (rs = 0), 25 <= s)) throw Error(E(301));
        ((s += 1),
          (Te = Ne = null),
          (t.updateQueue = null),
          (gi.current = Cy),
          (e = r(n, a)));
      } while (ts);
    }
    if (
      ((gi.current = bi),
      (t = Ne !== null && Ne.next !== null),
      (en = 0),
      (Te = Ne = ge = null),
      (yi = !1),
      t)
    )
      throw Error(E(300));
    return e;
  }
  function Ml() {
    var e = rs !== 0;
    return ((rs = 0), e);
  }
  function Dt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Te === null ? (ge.memoizedState = Te = e) : (Te = Te.next = e), Te);
  }
  function ft() {
    if (Ne === null) {
      var e = ge.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = Te === null ? ge.memoizedState : Te.next;
    if (t !== null) ((Te = t), (Ne = e));
    else {
      if (e === null) throw Error(E(310));
      ((Ne = e),
        (e = {
          memoizedState: Ne.memoizedState,
          baseState: Ne.baseState,
          baseQueue: Ne.baseQueue,
          queue: Ne.queue,
          next: null,
        }),
        Te === null ? (ge.memoizedState = Te = e) : (Te = Te.next = e));
    }
    return Te;
  }
  function ns(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Fl(e) {
    var t = ft(),
      r = t.queue;
    if (r === null) throw Error(E(311));
    r.lastRenderedReducer = e;
    var n = Ne,
      a = n.baseQueue,
      s = r.pending;
    if (s !== null) {
      if (a !== null) {
        var o = a.next;
        ((a.next = s.next), (s.next = o));
      }
      ((n.baseQueue = a = s), (r.pending = null));
    }
    if (a !== null) {
      ((s = a.next), (n = n.baseState));
      var l = (o = null),
        c = null,
        u = s;
      do {
        var p = u.lane;
        if ((en & p) === p)
          (c !== null &&
            (c = c.next =
              {
                lane: 0,
                action: u.action,
                hasEagerState: u.hasEagerState,
                eagerState: u.eagerState,
                next: null,
              }),
            (n = u.hasEagerState ? u.eagerState : e(n, u.action)));
        else {
          var f = {
            lane: p,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          };
          (c === null ? ((l = c = f), (o = n)) : (c = c.next = f),
            (ge.lanes |= p),
            (tn |= p));
        }
        u = u.next;
      } while (u !== null && u !== s);
      (c === null ? (o = n) : (c.next = l),
        St(n, t.memoizedState) || (Je = !0),
        (t.memoizedState = n),
        (t.baseState = o),
        (t.baseQueue = c),
        (r.lastRenderedState = n));
    }
    if (((e = r.interleaved), e !== null)) {
      a = e;
      do ((s = a.lane), (ge.lanes |= s), (tn |= s), (a = a.next));
      while (a !== e);
    } else a === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function zl(e) {
    var t = ft(),
      r = t.queue;
    if (r === null) throw Error(E(311));
    r.lastRenderedReducer = e;
    var n = r.dispatch,
      a = r.pending,
      s = t.memoizedState;
    if (a !== null) {
      r.pending = null;
      var o = (a = a.next);
      do ((s = e(s, o.action)), (o = o.next));
      while (o !== a);
      (St(s, t.memoizedState) || (Je = !0),
        (t.memoizedState = s),
        t.baseQueue === null && (t.baseState = s),
        (r.lastRenderedState = s));
    }
    return [s, n];
  }
  function bp() {}
  function wp(e, t) {
    var r = ge,
      n = ft(),
      a = t(),
      s = !St(n.memoizedState, a);
    if (
      (s && ((n.memoizedState = a), (Je = !0)),
      (n = n.queue),
      ql(Cp.bind(null, r, n, e), [e]),
      n.getSnapshot !== t || s || (Te !== null && Te.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        as(9, Sp.bind(null, r, n, a, t), void 0, null),
        Pe === null)
      )
        throw Error(E(349));
      (en & 30) !== 0 || kp(r, t, a);
    }
    return a;
  }
  function kp(e, t, r) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: r }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.stores = [e]))
        : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e)));
  }
  function Sp(e, t, r, n) {
    ((t.value = r), (t.getSnapshot = n), _p(t) && Rp(e));
  }
  function Cp(e, t, r) {
    return r(function () {
      _p(t) && Rp(e);
    });
  }
  function _p(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !St(e, r);
    } catch {
      return !0;
    }
  }
  function Rp(e) {
    var t = Gt(e, 1);
    t !== null && Nt(t, e, 1, -1);
  }
  function jp(e) {
    var t = Dt();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: ns,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = wy.bind(null, ge, e)),
      [t.memoizedState, e]
    );
  }
  function as(e, t, r, n) {
    return (
      (e = { tag: e, create: t, destroy: r, deps: n, next: null }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.lastEffect = e.next = e))
        : ((r = t.lastEffect),
          r === null
            ? (t.lastEffect = e.next = e)
            : ((n = r.next), (r.next = e), (e.next = n), (t.lastEffect = e))),
      e
    );
  }
  function Np() {
    return ft().memoizedState;
  }
  function vi(e, t, r, n) {
    var a = Dt();
    ((ge.flags |= e),
      (a.memoizedState = as(1 | t, r, void 0, n === void 0 ? null : n)));
  }
  function xi(e, t, r, n) {
    var a = ft();
    n = n === void 0 ? null : n;
    var s = void 0;
    if (Ne !== null) {
      var o = Ne.memoizedState;
      if (((s = o.destroy), n !== null && Dl(n, o.deps))) {
        a.memoizedState = as(t, r, s, n);
        return;
      }
    }
    ((ge.flags |= e), (a.memoizedState = as(1 | t, r, s, n)));
  }
  function Ap(e, t) {
    return vi(8390656, 8, e, t);
  }
  function ql(e, t) {
    return xi(2048, 8, e, t);
  }
  function Ep(e, t) {
    return xi(4, 2, e, t);
  }
  function Tp(e, t) {
    return xi(4, 4, e, t);
  }
  function Pp(e, t) {
    if (typeof t == "function")
      return (
        (e = e()),
        t(e),
        function () {
          t(null);
        }
      );
    if (t != null)
      return (
        (e = e()),
        (t.current = e),
        function () {
          t.current = null;
        }
      );
  }
  function Op(e, t, r) {
    return (
      (r = r != null ? r.concat([e]) : null),
      xi(4, 4, Pp.bind(null, t, e), r)
    );
  }
  function Bl() {}
  function Lp(e, t) {
    var r = ft();
    t = t === void 0 ? null : t;
    var n = r.memoizedState;
    return n !== null && t !== null && Dl(t, n[1])
      ? n[0]
      : ((r.memoizedState = [e, t]), e);
  }
  function Dp(e, t) {
    var r = ft();
    t = t === void 0 ? null : t;
    var n = r.memoizedState;
    return n !== null && t !== null && Dl(t, n[1])
      ? n[0]
      : ((e = e()), (r.memoizedState = [e, t]), e);
  }
  function Ip(e, t, r) {
    return (en & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (Je = !0)), (e.memoizedState = r))
      : (St(r, t) ||
          ((r = pd()), (ge.lanes |= r), (tn |= r), (e.baseState = !0)),
        t);
  }
  function xy(e, t) {
    var r = ie;
    ((ie = r !== 0 && 4 > r ? r : 4), e(!0));
    var n = Ll.transition;
    Ll.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((ie = r), (Ll.transition = n));
    }
  }
  function Mp() {
    return ft().memoizedState;
  }
  function by(e, t, r) {
    var n = Nr(e);
    if (
      ((r = {
        lane: n,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Fp(e))
    )
      zp(t, r);
    else if (((r = fp(e, t, r, n)), r !== null)) {
      var a = He();
      (Nt(r, e, n, a), qp(r, t, n));
    }
  }
  function wy(e, t, r) {
    var n = Nr(e),
      a = {
        lane: n,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Fp(e)) zp(t, a);
    else {
      var s = e.alternate;
      if (
        e.lanes === 0 &&
        (s === null || s.lanes === 0) &&
        ((s = t.lastRenderedReducer), s !== null)
      )
        try {
          var o = t.lastRenderedState,
            l = s(o, r);
          if (((a.hasEagerState = !0), (a.eagerState = l), St(l, o))) {
            var c = t.interleaved;
            (c === null
              ? ((a.next = a), Nl(t))
              : ((a.next = c.next), (c.next = a)),
              (t.interleaved = a));
            return;
          }
        } catch {}
      ((r = fp(e, t, a, n)),
        r !== null && ((a = He()), Nt(r, e, n, a), qp(r, t, n)));
    }
  }
  function Fp(e) {
    var t = e.alternate;
    return e === ge || (t !== null && t === ge);
  }
  function zp(e, t) {
    ts = yi = !0;
    var r = e.pending;
    (r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
      (e.pending = t));
  }
  function qp(e, t, r) {
    if ((r & 4194240) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (r |= n), (t.lanes = r), $o(e, r));
    }
  }
  var bi = {
      readContext: ht,
      useCallback: qe,
      useContext: qe,
      useEffect: qe,
      useImperativeHandle: qe,
      useInsertionEffect: qe,
      useLayoutEffect: qe,
      useMemo: qe,
      useReducer: qe,
      useRef: qe,
      useState: qe,
      useDebugValue: qe,
      useDeferredValue: qe,
      useTransition: qe,
      useMutableSource: qe,
      useSyncExternalStore: qe,
      useId: qe,
      unstable_isNewReconciler: !1,
    },
    ky = {
      readContext: ht,
      useCallback: function (e, t) {
        return ((Dt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: ht,
      useEffect: Ap,
      useImperativeHandle: function (e, t, r) {
        return (
          (r = r != null ? r.concat([e]) : null),
          vi(4194308, 4, Pp.bind(null, t, e), r)
        );
      },
      useLayoutEffect: function (e, t) {
        return vi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return vi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var r = Dt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (r.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, r) {
        var n = Dt();
        return (
          (t = r !== void 0 ? r(t) : t),
          (n.memoizedState = n.baseState = t),
          (e = {
            pending: null,
            interleaved: null,
            lanes: 0,
            dispatch: null,
            lastRenderedReducer: e,
            lastRenderedState: t,
          }),
          (n.queue = e),
          (e = e.dispatch = by.bind(null, ge, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Dt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: jp,
      useDebugValue: Bl,
      useDeferredValue: function (e) {
        return (Dt().memoizedState = e);
      },
      useTransition: function () {
        var e = jp(!1),
          t = e[0];
        return ((e = xy.bind(null, e[1])), (Dt().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, r) {
        var n = ge,
          a = Dt();
        if (me) {
          if (r === void 0) throw Error(E(407));
          r = r();
        } else {
          if (((r = t()), Pe === null)) throw Error(E(349));
          (en & 30) !== 0 || kp(n, t, r);
        }
        a.memoizedState = r;
        var s = { value: r, getSnapshot: t };
        return (
          (a.queue = s),
          Ap(Cp.bind(null, n, s, e), [e]),
          (n.flags |= 2048),
          as(9, Sp.bind(null, n, s, r, t), void 0, null),
          r
        );
      },
      useId: function () {
        var e = Dt(),
          t = Pe.identifierPrefix;
        if (me) {
          var r = Zt,
            n = Qt;
          ((r = (n & ~(1 << (32 - kt(n) - 1))).toString(32) + r),
            (t = ":" + t + "R" + r),
            (r = rs++),
            0 < r && (t += "H" + r.toString(32)),
            (t += ":"));
        } else ((r = vy++), (t = ":" + t + "r" + r.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    Sy = {
      readContext: ht,
      useCallback: Lp,
      useContext: ht,
      useEffect: ql,
      useImperativeHandle: Op,
      useInsertionEffect: Ep,
      useLayoutEffect: Tp,
      useMemo: Dp,
      useReducer: Fl,
      useRef: Np,
      useState: function () {
        return Fl(ns);
      },
      useDebugValue: Bl,
      useDeferredValue: function (e) {
        var t = ft();
        return Ip(t, Ne.memoizedState, e);
      },
      useTransition: function () {
        var e = Fl(ns)[0],
          t = ft().memoizedState;
        return [e, t];
      },
      useMutableSource: bp,
      useSyncExternalStore: wp,
      useId: Mp,
      unstable_isNewReconciler: !1,
    },
    Cy = {
      readContext: ht,
      useCallback: Lp,
      useContext: ht,
      useEffect: ql,
      useImperativeHandle: Op,
      useInsertionEffect: Ep,
      useLayoutEffect: Tp,
      useMemo: Dp,
      useReducer: zl,
      useRef: Np,
      useState: function () {
        return zl(ns);
      },
      useDebugValue: Bl,
      useDeferredValue: function (e) {
        var t = ft();
        return Ne === null ? (t.memoizedState = e) : Ip(t, Ne.memoizedState, e);
      },
      useTransition: function () {
        var e = zl(ns)[0],
          t = ft().memoizedState;
        return [e, t];
      },
      useMutableSource: bp,
      useSyncExternalStore: wp,
      useId: Mp,
      unstable_isNewReconciler: !1,
    };
  function _t(e, t) {
    if (e && e.defaultProps) {
      ((t = he({}, t)), (e = e.defaultProps));
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function Ul(e, t, r, n) {
    ((t = e.memoizedState),
      (r = r(n, t)),
      (r = r == null ? t : he({}, t, r)),
      (e.memoizedState = r),
      e.lanes === 0 && (e.updateQueue.baseState = r));
  }
  var wi = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? Hr(e) === e : !1;
    },
    enqueueSetState: function (e, t, r) {
      e = e._reactInternals;
      var n = He(),
        a = Nr(e),
        s = Yt(n, a);
      ((s.payload = t),
        r != null && (s.callback = r),
        (t = Cr(e, s, a)),
        t !== null && (Nt(t, e, a, n), mi(t, e, a)));
    },
    enqueueReplaceState: function (e, t, r) {
      e = e._reactInternals;
      var n = He(),
        a = Nr(e),
        s = Yt(n, a);
      ((s.tag = 1),
        (s.payload = t),
        r != null && (s.callback = r),
        (t = Cr(e, s, a)),
        t !== null && (Nt(t, e, a, n), mi(t, e, a)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var r = He(),
        n = Nr(e),
        a = Yt(r, n);
      ((a.tag = 2),
        t != null && (a.callback = t),
        (t = Cr(e, a, n)),
        t !== null && (Nt(t, e, n, r), mi(t, e, n)));
    },
  };
  function Bp(e, t, r, n, a, s, o) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(n, s, o)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Va(r, n) || !Va(a, s)
          : !0
    );
  }
  function Up(e, t, r) {
    var n = !1,
      a = wr,
      s = t.contextType;
    return (
      typeof s == "object" && s !== null
        ? (s = ht(s))
        : ((a = Xe(t) ? Zr : ze.current),
          (n = t.contextTypes),
          (s = (n = n != null) ? Un(e, a) : wr)),
      (t = new t(r, s)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = wi),
      (e.stateNode = t),
      (t._reactInternals = e),
      n &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = a),
        (e.__reactInternalMemoizedMaskedChildContext = s)),
      t
    );
  }
  function $p(e, t, r, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(r, n),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(r, n),
      t.state !== e && wi.enqueueReplaceState(t, t.state, null));
  }
  function $l(e, t, r, n) {
    var a = e.stateNode;
    ((a.props = r), (a.state = e.memoizedState), (a.refs = {}), Al(e));
    var s = t.contextType;
    (typeof s == "object" && s !== null
      ? (a.context = ht(s))
      : ((s = Xe(t) ? Zr : ze.current), (a.context = Un(e, s))),
      (a.state = e.memoizedState),
      (s = t.getDerivedStateFromProps),
      typeof s == "function" && (Ul(e, t, s, r), (a.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof a.getSnapshotBeforeUpdate == "function" ||
        (typeof a.UNSAFE_componentWillMount != "function" &&
          typeof a.componentWillMount != "function") ||
        ((t = a.state),
        typeof a.componentWillMount == "function" && a.componentWillMount(),
        typeof a.UNSAFE_componentWillMount == "function" &&
          a.UNSAFE_componentWillMount(),
        t !== a.state && wi.enqueueReplaceState(a, a.state, null),
        hi(e, r, a, n),
        (a.state = e.memoizedState)),
      typeof a.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Gn(e, t) {
    try {
      var r = "",
        n = t;
      do ((r += Xf(n)), (n = n.return));
      while (n);
      var a = r;
    } catch (s) {
      a =
        `
Error generating stack: ` +
        s.message +
        `
` +
        s.stack;
    }
    return { value: e, source: t, stack: a, digest: null };
  }
  function Vl(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function Kl(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  var _y = typeof WeakMap == "function" ? WeakMap : Map;
  function Vp(e, t, r) {
    ((r = Yt(-1, r)), (r.tag = 3), (r.payload = { element: null }));
    var n = t.value;
    return (
      (r.callback = function () {
        (Ni || ((Ni = !0), (ic = n)), Kl(e, t));
      }),
      r
    );
  }
  function Kp(e, t, r) {
    ((r = Yt(-1, r)), (r.tag = 3));
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var a = t.value;
      ((r.payload = function () {
        return n(a);
      }),
        (r.callback = function () {
          Kl(e, t);
        }));
    }
    var s = e.stateNode;
    return (
      s !== null &&
        typeof s.componentDidCatch == "function" &&
        (r.callback = function () {
          (Kl(e, t),
            typeof n != "function" &&
              (Rr === null ? (Rr = new Set([this])) : Rr.add(this)));
          var o = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : "",
          });
        }),
      r
    );
  }
  function Wp(e, t, r) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new _y();
      var a = new Set();
      n.set(t, a);
    } else ((a = n.get(t)), a === void 0 && ((a = new Set()), n.set(t, a)));
    a.has(r) || (a.add(r), (e = zy.bind(null, e, t, r)), t.then(e, e));
  }
  function Hp(e) {
    do {
      var t;
      if (
        ((t = e.tag === 13) &&
          ((t = e.memoizedState),
          (t = t !== null ? t.dehydrated !== null : !0)),
        t)
      )
        return e;
      e = e.return;
    } while (e !== null);
    return null;
  }
  function Qp(e, t, r, n, a) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (r.flags |= 131072),
            (r.flags &= -52805),
            r.tag === 1 &&
              (r.alternate === null
                ? (r.tag = 17)
                : ((t = Yt(-1, 1)), (t.tag = 2), Cr(r, t, 1))),
            (r.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = a), e);
  }
  var Ry = Kt.ReactCurrentOwner,
    Je = !1;
  function We(e, t, r, n) {
    t.child = e === null ? hp(t, null, r, n) : Wn(t, e.child, r, n);
  }
  function Zp(e, t, r, n, a) {
    r = r.render;
    var s = t.ref;
    return (
      Qn(t, a),
      (n = Il(e, t, r, n, s, a)),
      (r = Ml()),
      e !== null && !Je
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~a),
          Xt(e, t, a))
        : (me && r && xl(t), (t.flags |= 1), We(e, t, n, a), t.child)
    );
  }
  function Gp(e, t, r, n, a) {
    if (e === null) {
      var s = r.type;
      return typeof s == "function" &&
        !mc(s) &&
        s.defaultProps === void 0 &&
        r.compare === null &&
        r.defaultProps === void 0
        ? ((t.tag = 15), (t.type = s), Yp(e, t, s, n, a))
        : ((e = Li(r.type, null, n, t, t.mode, a)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((s = e.child), (e.lanes & a) === 0)) {
      var o = s.memoizedProps;
      if (
        ((r = r.compare), (r = r !== null ? r : Va), r(o, n) && e.ref === t.ref)
      )
        return Xt(e, t, a);
    }
    return (
      (t.flags |= 1),
      (e = Er(s, n)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Yp(e, t, r, n, a) {
    if (e !== null) {
      var s = e.memoizedProps;
      if (Va(s, n) && e.ref === t.ref)
        if (((Je = !1), (t.pendingProps = n = s), (e.lanes & a) !== 0))
          (e.flags & 131072) !== 0 && (Je = !0);
        else return ((t.lanes = e.lanes), Xt(e, t, a));
    }
    return Wl(e, t, r, n, a);
  }
  function Xp(e, t, r) {
    var n = t.pendingProps,
      a = n.children,
      s = e !== null ? e.memoizedState : null;
    if (n.mode === "hidden")
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          ue(Xn, ut),
          (ut |= r));
      else {
        if ((r & 1073741824) === 0)
          return (
            (e = s !== null ? s.baseLanes | r : r),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            ue(Xn, ut),
            (ut |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (n = s !== null ? s.baseLanes : r),
          ue(Xn, ut),
          (ut |= n));
      }
    else
      (s !== null ? ((n = s.baseLanes | r), (t.memoizedState = null)) : (n = r),
        ue(Xn, ut),
        (ut |= n));
    return (We(e, t, a, r), t.child);
  }
  function Jp(e, t) {
    var r = t.ref;
    ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function Wl(e, t, r, n, a) {
    var s = Xe(r) ? Zr : ze.current;
    return (
      (s = Un(t, s)),
      Qn(t, a),
      (r = Il(e, t, r, n, s, a)),
      (n = Ml()),
      e !== null && !Je
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~a),
          Xt(e, t, a))
        : (me && n && xl(t), (t.flags |= 1), We(e, t, r, a), t.child)
    );
  }
  function em(e, t, r, n, a) {
    if (Xe(r)) {
      var s = !0;
      si(t);
    } else s = !1;
    if ((Qn(t, a), t.stateNode === null))
      (Si(e, t), Up(t, r, n), $l(t, r, n, a), (n = !0));
    else if (e === null) {
      var o = t.stateNode,
        l = t.memoizedProps;
      o.props = l;
      var c = o.context,
        u = r.contextType;
      typeof u == "object" && u !== null
        ? (u = ht(u))
        : ((u = Xe(r) ? Zr : ze.current), (u = Un(t, u)));
      var p = r.getDerivedStateFromProps,
        f =
          typeof p == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function";
      (f ||
        (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
          typeof o.componentWillReceiveProps != "function") ||
        ((l !== n || c !== u) && $p(t, o, n, u)),
        (Sr = !1));
      var m = t.memoizedState;
      ((o.state = m),
        hi(t, n, o, a),
        (c = t.memoizedState),
        l !== n || m !== c || Ye.current || Sr
          ? (typeof p == "function" && (Ul(t, r, p, n), (c = t.memoizedState)),
            (l = Sr || Bp(t, r, l, n, m, c, u))
              ? (f ||
                  (typeof o.UNSAFE_componentWillMount != "function" &&
                    typeof o.componentWillMount != "function") ||
                  (typeof o.componentWillMount == "function" &&
                    o.componentWillMount(),
                  typeof o.UNSAFE_componentWillMount == "function" &&
                    o.UNSAFE_componentWillMount()),
                typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308))
              : (typeof o.componentDidMount == "function" &&
                  (t.flags |= 4194308),
                (t.memoizedProps = n),
                (t.memoizedState = c)),
            (o.props = n),
            (o.state = c),
            (o.context = u),
            (n = l))
          : (typeof o.componentDidMount == "function" && (t.flags |= 4194308),
            (n = !1)));
    } else {
      ((o = t.stateNode),
        gp(e, t),
        (l = t.memoizedProps),
        (u = t.type === t.elementType ? l : _t(t.type, l)),
        (o.props = u),
        (f = t.pendingProps),
        (m = o.context),
        (c = r.contextType),
        typeof c == "object" && c !== null
          ? (c = ht(c))
          : ((c = Xe(r) ? Zr : ze.current), (c = Un(t, c))));
      var x = r.getDerivedStateFromProps;
      ((p =
        typeof x == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function") ||
        (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
          typeof o.componentWillReceiveProps != "function") ||
        ((l !== f || m !== c) && $p(t, o, n, c)),
        (Sr = !1),
        (m = t.memoizedState),
        (o.state = m),
        hi(t, n, o, a));
      var v = t.memoizedState;
      l !== f || m !== v || Ye.current || Sr
        ? (typeof x == "function" && (Ul(t, r, x, n), (v = t.memoizedState)),
          (u = Sr || Bp(t, r, u, n, m, v, c) || !1)
            ? (p ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(n, v, c),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(n, v, c)),
              typeof o.componentDidUpdate == "function" && (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate == "function" &&
                (t.flags |= 1024))
            : (typeof o.componentDidUpdate != "function" ||
                (l === e.memoizedProps && m === e.memoizedState) ||
                (t.flags |= 4),
              typeof o.getSnapshotBeforeUpdate != "function" ||
                (l === e.memoizedProps && m === e.memoizedState) ||
                (t.flags |= 1024),
              (t.memoizedProps = n),
              (t.memoizedState = v)),
          (o.props = n),
          (o.state = v),
          (o.context = c),
          (n = u))
        : (typeof o.componentDidUpdate != "function" ||
            (l === e.memoizedProps && m === e.memoizedState) ||
            (t.flags |= 4),
          typeof o.getSnapshotBeforeUpdate != "function" ||
            (l === e.memoizedProps && m === e.memoizedState) ||
            (t.flags |= 1024),
          (n = !1));
    }
    return Hl(e, t, r, n, s, a);
  }
  function Hl(e, t, r, n, a, s) {
    Jp(e, t);
    var o = (t.flags & 128) !== 0;
    if (!n && !o) return (a && sp(t, r, !1), Xt(e, t, s));
    ((n = t.stateNode), (Ry.current = t));
    var l =
      o && typeof r.getDerivedStateFromError != "function" ? null : n.render();
    return (
      (t.flags |= 1),
      e !== null && o
        ? ((t.child = Wn(t, e.child, null, s)), (t.child = Wn(t, null, l, s)))
        : We(e, t, l, s),
      (t.memoizedState = n.state),
      a && sp(t, r, !0),
      t.child
    );
  }
  function tm(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? np(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && np(e, t.context, !1),
      El(e, t.containerInfo));
  }
  function rm(e, t, r, n, a) {
    return (Kn(), Sl(a), (t.flags |= 256), We(e, t, r, n), t.child);
  }
  var Ql = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Zl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function nm(e, t, r) {
    var n = t.pendingProps,
      a = fe.current,
      s = !1,
      o = (t.flags & 128) !== 0,
      l;
    if (
      ((l = o) ||
        (l = e !== null && e.memoizedState === null ? !1 : (a & 2) !== 0),
      l
        ? ((s = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (a |= 1),
      ue(fe, a & 1),
      e === null)
    )
      return (
        kl(t),
        (e = t.memoizedState),
        e !== null && ((e = e.dehydrated), e !== null)
          ? ((t.mode & 1) === 0
              ? (t.lanes = 1)
              : e.data === "$!"
                ? (t.lanes = 8)
                : (t.lanes = 1073741824),
            null)
          : ((o = n.children),
            (e = n.fallback),
            s
              ? ((n = t.mode),
                (s = t.child),
                (o = { mode: "hidden", children: o }),
                (n & 1) === 0 && s !== null
                  ? ((s.childLanes = 0), (s.pendingProps = o))
                  : (s = Di(o, n, 0, null)),
                (e = sn(e, n, r, null)),
                (s.return = t),
                (e.return = t),
                (s.sibling = e),
                (t.child = s),
                (t.child.memoizedState = Zl(r)),
                (t.memoizedState = Ql),
                e)
              : Gl(t, o))
      );
    if (((a = e.memoizedState), a !== null && ((l = a.dehydrated), l !== null)))
      return jy(e, t, o, n, l, a, r);
    if (s) {
      ((s = n.fallback), (o = t.mode), (a = e.child), (l = a.sibling));
      var c = { mode: "hidden", children: n.children };
      return (
        (o & 1) === 0 && t.child !== a
          ? ((n = t.child),
            (n.childLanes = 0),
            (n.pendingProps = c),
            (t.deletions = null))
          : ((n = Er(a, c)), (n.subtreeFlags = a.subtreeFlags & 14680064)),
        l !== null ? (s = Er(l, s)) : ((s = sn(s, o, r, null)), (s.flags |= 2)),
        (s.return = t),
        (n.return = t),
        (n.sibling = s),
        (t.child = n),
        (n = s),
        (s = t.child),
        (o = e.child.memoizedState),
        (o =
          o === null
            ? Zl(r)
            : {
                baseLanes: o.baseLanes | r,
                cachePool: null,
                transitions: o.transitions,
              }),
        (s.memoizedState = o),
        (s.childLanes = e.childLanes & ~r),
        (t.memoizedState = Ql),
        n
      );
    }
    return (
      (s = e.child),
      (e = s.sibling),
      (n = Er(s, { mode: "visible", children: n.children })),
      (t.mode & 1) === 0 && (n.lanes = r),
      (n.return = t),
      (n.sibling = null),
      e !== null &&
        ((r = t.deletions),
        r === null ? ((t.deletions = [e]), (t.flags |= 16)) : r.push(e)),
      (t.child = n),
      (t.memoizedState = null),
      n
    );
  }
  function Gl(e, t) {
    return (
      (t = Di({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function ki(e, t, r, n) {
    return (
      n !== null && Sl(n),
      Wn(t, e.child, null, r),
      (e = Gl(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function jy(e, t, r, n, a, s, o) {
    if (r)
      return t.flags & 256
        ? ((t.flags &= -257), (n = Vl(Error(E(422)))), ki(e, t, o, n))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((s = n.fallback),
            (a = t.mode),
            (n = Di({ mode: "visible", children: n.children }, a, 0, null)),
            (s = sn(s, a, o, null)),
            (s.flags |= 2),
            (n.return = t),
            (s.return = t),
            (n.sibling = s),
            (t.child = n),
            (t.mode & 1) !== 0 && Wn(t, e.child, null, o),
            (t.child.memoizedState = Zl(o)),
            (t.memoizedState = Ql),
            s);
    if ((t.mode & 1) === 0) return ki(e, t, o, null);
    if (a.data === "$!") {
      if (((n = a.nextSibling && a.nextSibling.dataset), n)) var l = n.dgst;
      return (
        (n = l),
        (s = Error(E(419))),
        (n = Vl(s, n, void 0)),
        ki(e, t, o, n)
      );
    }
    if (((l = (o & e.childLanes) !== 0), Je || l)) {
      if (((n = Pe), n !== null)) {
        switch (o & -o) {
          case 4:
            a = 2;
            break;
          case 16:
            a = 8;
            break;
          case 64:
          case 128:
          case 256:
          case 512:
          case 1024:
          case 2048:
          case 4096:
          case 8192:
          case 16384:
          case 32768:
          case 65536:
          case 131072:
          case 262144:
          case 524288:
          case 1048576:
          case 2097152:
          case 4194304:
          case 8388608:
          case 16777216:
          case 33554432:
          case 67108864:
            a = 32;
            break;
          case 536870912:
            a = 268435456;
            break;
          default:
            a = 0;
        }
        ((a = (a & (n.suspendedLanes | o)) !== 0 ? 0 : a),
          a !== 0 &&
            a !== s.retryLane &&
            ((s.retryLane = a), Gt(e, a), Nt(n, e, a, -1)));
      }
      return (pc(), (n = Vl(Error(E(421)))), ki(e, t, o, n));
    }
    return a.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = qy.bind(null, e)),
        (a._reactRetry = t),
        null)
      : ((e = s.treeContext),
        (ct = xr(a.nextSibling)),
        (lt = t),
        (me = !0),
        (Ct = null),
        e !== null &&
          ((pt[mt++] = Qt),
          (pt[mt++] = Zt),
          (pt[mt++] = Gr),
          (Qt = e.id),
          (Zt = e.overflow),
          (Gr = t)),
        (t = Gl(t, n.children)),
        (t.flags |= 4096),
        t);
  }
  function am(e, t, r) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), jl(e.return, t, r));
  }
  function Yl(e, t, r, n, a) {
    var s = e.memoizedState;
    s === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: r,
          tailMode: a,
        })
      : ((s.isBackwards = t),
        (s.rendering = null),
        (s.renderingStartTime = 0),
        (s.last = n),
        (s.tail = r),
        (s.tailMode = a));
  }
  function sm(e, t, r) {
    var n = t.pendingProps,
      a = n.revealOrder,
      s = n.tail;
    if ((We(e, t, n.children, r), (n = fe.current), (n & 2) !== 0))
      ((n = (n & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && am(e, r, t);
          else if (e.tag === 19) am(e, r, t);
          else if (e.child !== null) {
            ((e.child.return = e), (e = e.child));
            continue;
          }
          if (e === t) break e;
          for (; e.sibling === null; ) {
            if (e.return === null || e.return === t) break e;
            e = e.return;
          }
          ((e.sibling.return = e.return), (e = e.sibling));
        }
      n &= 1;
    }
    if ((ue(fe, n), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (a) {
        case "forwards":
          for (r = t.child, a = null; r !== null; )
            ((e = r.alternate),
              e !== null && fi(e) === null && (a = r),
              (r = r.sibling));
          ((r = a),
            r === null
              ? ((a = t.child), (t.child = null))
              : ((a = r.sibling), (r.sibling = null)),
            Yl(t, !1, a, r, s));
          break;
        case "backwards":
          for (r = null, a = t.child, t.child = null; a !== null; ) {
            if (((e = a.alternate), e !== null && fi(e) === null)) {
              t.child = a;
              break;
            }
            ((e = a.sibling), (a.sibling = r), (r = a), (a = e));
          }
          Yl(t, !0, r, null, s);
          break;
        case "together":
          Yl(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function Si(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Xt(e, t, r) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (tn |= t.lanes),
      (r & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(E(153));
    if (t.child !== null) {
      for (
        e = t.child, r = Er(e, e.pendingProps), t.child = r, r.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (r = r.sibling = Er(e, e.pendingProps)),
          (r.return = t));
      r.sibling = null;
    }
    return t.child;
  }
  function Ny(e, t, r) {
    switch (t.tag) {
      case 3:
        (tm(t), Kn());
        break;
      case 5:
        xp(t);
        break;
      case 1:
        Xe(t.type) && si(t);
        break;
      case 4:
        El(t, t.stateNode.containerInfo);
        break;
      case 10:
        var n = t.type._context,
          a = t.memoizedProps.value;
        (ue(di, n._currentValue), (n._currentValue = a));
        break;
      case 13:
        if (((n = t.memoizedState), n !== null))
          return n.dehydrated !== null
            ? (ue(fe, fe.current & 1), (t.flags |= 128), null)
            : (r & t.child.childLanes) !== 0
              ? nm(e, t, r)
              : (ue(fe, fe.current & 1),
                (e = Xt(e, t, r)),
                e !== null ? e.sibling : null);
        ue(fe, fe.current & 1);
        break;
      case 19:
        if (((n = (r & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (n) return sm(e, t, r);
          t.flags |= 128;
        }
        if (
          ((a = t.memoizedState),
          a !== null &&
            ((a.rendering = null), (a.tail = null), (a.lastEffect = null)),
          ue(fe, fe.current),
          n)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Xp(e, t, r));
    }
    return Xt(e, t, r);
  }
  var im, Xl, om, lm;
  ((im = function (e, t) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === 5 || r.tag === 6) e.appendChild(r.stateNode);
      else if (r.tag !== 4 && r.child !== null) {
        ((r.child.return = r), (r = r.child));
        continue;
      }
      if (r === t) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t) return;
        r = r.return;
      }
      ((r.sibling.return = r.return), (r = r.sibling));
    }
  }),
    (Xl = function () {}),
    (om = function (e, t, r, n) {
      var a = e.memoizedProps;
      if (a !== n) {
        ((e = t.stateNode), Jr(Lt.current));
        var s = null;
        switch (r) {
          case "input":
            ((a = jo(e, a)), (n = jo(e, n)), (s = []));
            break;
          case "select":
            ((a = he({}, a, { value: void 0 })),
              (n = he({}, n, { value: void 0 })),
              (s = []));
            break;
          case "textarea":
            ((a = Eo(e, a)), (n = Eo(e, n)), (s = []));
            break;
          default:
            typeof a.onClick != "function" &&
              typeof n.onClick == "function" &&
              (e.onclick = ri);
        }
        Po(r, n);
        var o;
        r = null;
        for (u in a)
          if (!n.hasOwnProperty(u) && a.hasOwnProperty(u) && a[u] != null)
            if (u === "style") {
              var l = a[u];
              for (o in l) l.hasOwnProperty(o) && (r || (r = {}), (r[o] = ""));
            } else
              u !== "dangerouslySetInnerHTML" &&
                u !== "children" &&
                u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                u !== "autoFocus" &&
                (Sa.hasOwnProperty(u)
                  ? s || (s = [])
                  : (s = s || []).push(u, null));
        for (u in n) {
          var c = n[u];
          if (
            ((l = a?.[u]),
            n.hasOwnProperty(u) && c !== l && (c != null || l != null))
          )
            if (u === "style")
              if (l) {
                for (o in l)
                  !l.hasOwnProperty(o) ||
                    (c && c.hasOwnProperty(o)) ||
                    (r || (r = {}), (r[o] = ""));
                for (o in c)
                  c.hasOwnProperty(o) &&
                    l[o] !== c[o] &&
                    (r || (r = {}), (r[o] = c[o]));
              } else (r || (s || (s = []), s.push(u, r)), (r = c));
            else
              u === "dangerouslySetInnerHTML"
                ? ((c = c ? c.__html : void 0),
                  (l = l ? l.__html : void 0),
                  c != null && l !== c && (s = s || []).push(u, c))
                : u === "children"
                  ? (typeof c != "string" && typeof c != "number") ||
                    (s = s || []).push(u, "" + c)
                  : u !== "suppressContentEditableWarning" &&
                    u !== "suppressHydrationWarning" &&
                    (Sa.hasOwnProperty(u)
                      ? (c != null && u === "onScroll" && de("scroll", e),
                        s || l === c || (s = []))
                      : (s = s || []).push(u, c));
        }
        r && (s = s || []).push("style", r);
        var u = s;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    }),
    (lm = function (e, t, r, n) {
      r !== n && (t.flags |= 4);
    }));
  function ss(e, t) {
    if (!me)
      switch (e.tailMode) {
        case "hidden":
          t = e.tail;
          for (var r = null; t !== null; )
            (t.alternate !== null && (r = t), (t = t.sibling));
          r === null ? (e.tail = null) : (r.sibling = null);
          break;
        case "collapsed":
          r = e.tail;
          for (var n = null; r !== null; )
            (r.alternate !== null && (n = r), (r = r.sibling));
          n === null
            ? t || e.tail === null
              ? (e.tail = null)
              : (e.tail.sibling = null)
            : (n.sibling = null);
      }
  }
  function Be(e) {
    var t = e.alternate !== null && e.alternate.child === e.child,
      r = 0,
      n = 0;
    if (t)
      for (var a = e.child; a !== null; )
        ((r |= a.lanes | a.childLanes),
          (n |= a.subtreeFlags & 14680064),
          (n |= a.flags & 14680064),
          (a.return = e),
          (a = a.sibling));
    else
      for (a = e.child; a !== null; )
        ((r |= a.lanes | a.childLanes),
          (n |= a.subtreeFlags),
          (n |= a.flags),
          (a.return = e),
          (a = a.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = r), t);
  }
  function Ay(e, t, r) {
    var n = t.pendingProps;
    switch ((bl(t), t.tag)) {
      case 2:
      case 16:
      case 15:
      case 0:
      case 11:
      case 7:
      case 8:
      case 12:
      case 9:
      case 14:
        return (Be(t), null);
      case 1:
        return (Xe(t.type) && ai(), Be(t), null);
      case 3:
        return (
          (n = t.stateNode),
          Zn(),
          pe(Ye),
          pe(ze),
          Ol(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (ci(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), Ct !== null && (cc(Ct), (Ct = null)))),
          Xl(e, t),
          Be(t),
          null
        );
      case 5:
        Tl(t);
        var a = Jr(es.current);
        if (((r = t.type), e !== null && t.stateNode != null))
          (om(e, t, r, n, a),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(E(166));
            return (Be(t), null);
          }
          if (((e = Jr(Lt.current)), ci(t))) {
            ((n = t.stateNode), (r = t.type));
            var s = t.memoizedProps;
            switch (((n[Ot] = t), (n[Za] = s), (e = (t.mode & 1) !== 0), r)) {
              case "dialog":
                (de("cancel", n), de("close", n));
                break;
              case "iframe":
              case "object":
              case "embed":
                de("load", n);
                break;
              case "video":
              case "audio":
                for (a = 0; a < Wa.length; a++) de(Wa[a], n);
                break;
              case "source":
                de("error", n);
                break;
              case "img":
              case "image":
              case "link":
                (de("error", n), de("load", n));
                break;
              case "details":
                de("toggle", n);
                break;
              case "input":
                (Uu(n, s), de("invalid", n));
                break;
              case "select":
                ((n._wrapperState = { wasMultiple: !!s.multiple }),
                  de("invalid", n));
                break;
              case "textarea":
                (Ku(n, s), de("invalid", n));
            }
            (Po(r, s), (a = null));
            for (var o in s)
              if (s.hasOwnProperty(o)) {
                var l = s[o];
                o === "children"
                  ? typeof l == "string"
                    ? n.textContent !== l &&
                      (s.suppressHydrationWarning !== !0 &&
                        ti(n.textContent, l, e),
                      (a = ["children", l]))
                    : typeof l == "number" &&
                      n.textContent !== "" + l &&
                      (s.suppressHydrationWarning !== !0 &&
                        ti(n.textContent, l, e),
                      (a = ["children", "" + l]))
                  : Sa.hasOwnProperty(o) &&
                    l != null &&
                    o === "onScroll" &&
                    de("scroll", n);
              }
            switch (r) {
              case "input":
                (Ps(n), Vu(n, s, !0));
                break;
              case "textarea":
                (Ps(n), Hu(n));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof s.onClick == "function" && (n.onclick = ri);
            }
            ((n = a), (t.updateQueue = n), n !== null && (t.flags |= 4));
          } else {
            ((o = a.nodeType === 9 ? a : a.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = Qu(r)),
              e === "http://www.w3.org/1999/xhtml"
                ? r === "script"
                  ? ((e = o.createElement("div")),
                    (e.innerHTML = "<script><\/script>"),
                    (e = e.removeChild(e.firstChild)))
                  : typeof n.is == "string"
                    ? (e = o.createElement(r, { is: n.is }))
                    : ((e = o.createElement(r)),
                      r === "select" &&
                        ((o = e),
                        n.multiple
                          ? (o.multiple = !0)
                          : n.size && (o.size = n.size)))
                : (e = o.createElementNS(e, r)),
              (e[Ot] = t),
              (e[Za] = n),
              im(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((o = Oo(r, n)), r)) {
                case "dialog":
                  (de("cancel", e), de("close", e), (a = n));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (de("load", e), (a = n));
                  break;
                case "video":
                case "audio":
                  for (a = 0; a < Wa.length; a++) de(Wa[a], e);
                  a = n;
                  break;
                case "source":
                  (de("error", e), (a = n));
                  break;
                case "img":
                case "image":
                case "link":
                  (de("error", e), de("load", e), (a = n));
                  break;
                case "details":
                  (de("toggle", e), (a = n));
                  break;
                case "input":
                  (Uu(e, n), (a = jo(e, n)), de("invalid", e));
                  break;
                case "option":
                  a = n;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!n.multiple }),
                    (a = he({}, n, { value: void 0 })),
                    de("invalid", e));
                  break;
                case "textarea":
                  (Ku(e, n), (a = Eo(e, n)), de("invalid", e));
                  break;
                default:
                  a = n;
              }
              (Po(r, a), (l = a));
              for (s in l)
                if (l.hasOwnProperty(s)) {
                  var c = l[s];
                  s === "style"
                    ? Yu(e, c)
                    : s === "dangerouslySetInnerHTML"
                      ? ((c = c ? c.__html : void 0), c != null && Zu(e, c))
                      : s === "children"
                        ? typeof c == "string"
                          ? (r !== "textarea" || c !== "") && ja(e, c)
                          : typeof c == "number" && ja(e, "" + c)
                        : s !== "suppressContentEditableWarning" &&
                          s !== "suppressHydrationWarning" &&
                          s !== "autoFocus" &&
                          (Sa.hasOwnProperty(s)
                            ? c != null && s === "onScroll" && de("scroll", e)
                            : c != null && go(e, s, c, o));
                }
              switch (r) {
                case "input":
                  (Ps(e), Vu(e, n, !1));
                  break;
                case "textarea":
                  (Ps(e), Hu(e));
                  break;
                case "option":
                  n.value != null && e.setAttribute("value", "" + pr(n.value));
                  break;
                case "select":
                  ((e.multiple = !!n.multiple),
                    (s = n.value),
                    s != null
                      ? En(e, !!n.multiple, s, !1)
                      : n.defaultValue != null &&
                        En(e, !!n.multiple, n.defaultValue, !0));
                  break;
                default:
                  typeof a.onClick == "function" && (e.onclick = ri);
              }
              switch (r) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  n = !!n.autoFocus;
                  break e;
                case "img":
                  n = !0;
                  break e;
                default:
                  n = !1;
              }
            }
            n && (t.flags |= 4);
          }
          t.ref !== null && ((t.flags |= 512), (t.flags |= 2097152));
        }
        return (Be(t), null);
      case 6:
        if (e && t.stateNode != null) lm(e, t, e.memoizedProps, n);
        else {
          if (typeof n != "string" && t.stateNode === null) throw Error(E(166));
          if (((r = Jr(es.current)), Jr(Lt.current), ci(t))) {
            if (
              ((n = t.stateNode),
              (r = t.memoizedProps),
              (n[Ot] = t),
              (s = n.nodeValue !== r) && ((e = lt), e !== null))
            )
              switch (e.tag) {
                case 3:
                  ti(n.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    ti(n.nodeValue, r, (e.mode & 1) !== 0);
              }
            s && (t.flags |= 4);
          } else
            ((n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
              (n[Ot] = t),
              (t.stateNode = n));
        }
        return (Be(t), null);
      case 13:
        if (
          (pe(fe),
          (n = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (me && ct !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (dp(), Kn(), (t.flags |= 98560), (s = !1));
          else if (((s = ci(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!s) throw Error(E(318));
              if (
                ((s = t.memoizedState),
                (s = s !== null ? s.dehydrated : null),
                !s)
              )
                throw Error(E(317));
              s[Ot] = t;
            } else
              (Kn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Be(t), (s = !1));
          } else (Ct !== null && (cc(Ct), (Ct = null)), (s = !0));
          if (!s) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = r), t)
          : ((n = n !== null),
            n !== (e !== null && e.memoizedState !== null) &&
              n &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (fe.current & 1) !== 0
                  ? Ae === 0 && (Ae = 3)
                  : pc())),
            t.updateQueue !== null && (t.flags |= 4),
            Be(t),
            null);
      case 4:
        return (
          Zn(),
          Xl(e, t),
          e === null && Ha(t.stateNode.containerInfo),
          Be(t),
          null
        );
      case 10:
        return (Rl(t.type._context), Be(t), null);
      case 17:
        return (Xe(t.type) && ai(), Be(t), null);
      case 19:
        if ((pe(fe), (s = t.memoizedState), s === null)) return (Be(t), null);
        if (((n = (t.flags & 128) !== 0), (o = s.rendering), o === null))
          if (n) ss(s, !1);
          else {
            if (Ae !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((o = fi(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      ss(s, !1),
                      n = o.updateQueue,
                      n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      n = r,
                      r = t.child;
                    r !== null;
                  )
                    ((s = r),
                      (e = n),
                      (s.flags &= 14680066),
                      (o = s.alternate),
                      o === null
                        ? ((s.childLanes = 0),
                          (s.lanes = e),
                          (s.child = null),
                          (s.subtreeFlags = 0),
                          (s.memoizedProps = null),
                          (s.memoizedState = null),
                          (s.updateQueue = null),
                          (s.dependencies = null),
                          (s.stateNode = null))
                        : ((s.childLanes = o.childLanes),
                          (s.lanes = o.lanes),
                          (s.child = o.child),
                          (s.subtreeFlags = 0),
                          (s.deletions = null),
                          (s.memoizedProps = o.memoizedProps),
                          (s.memoizedState = o.memoizedState),
                          (s.updateQueue = o.updateQueue),
                          (s.type = o.type),
                          (e = o.dependencies),
                          (s.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (r = r.sibling));
                  return (ue(fe, (fe.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            s.tail !== null &&
              ke() > Jn &&
              ((t.flags |= 128), (n = !0), ss(s, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = fi(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (r = e.updateQueue),
                r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                ss(s, !0),
                s.tail === null &&
                  s.tailMode === "hidden" &&
                  !o.alternate &&
                  !me)
              )
                return (Be(t), null);
            } else
              2 * ke() - s.renderingStartTime > Jn &&
                r !== 1073741824 &&
                ((t.flags |= 128), (n = !0), ss(s, !1), (t.lanes = 4194304));
          s.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((r = s.last),
              r !== null ? (r.sibling = o) : (t.child = o),
              (s.last = o));
        }
        return s.tail !== null
          ? ((t = s.tail),
            (s.rendering = t),
            (s.tail = t.sibling),
            (s.renderingStartTime = ke()),
            (t.sibling = null),
            (r = fe.current),
            ue(fe, n ? (r & 1) | 2 : r & 1),
            t)
          : (Be(t), null);
      case 22:
      case 23:
        return (
          dc(),
          (n = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
          n && (t.mode & 1) !== 0
            ? (ut & 1073741824) !== 0 &&
              (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Be(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(E(156, t.tag));
  }
  function Ey(e, t) {
    switch ((bl(t), t.tag)) {
      case 1:
        return (
          Xe(t.type) && ai(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Zn(),
          pe(Ye),
          pe(ze),
          Ol(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (Tl(t), null);
      case 13:
        if (
          (pe(fe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(E(340));
          Kn();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (pe(fe), null);
      case 4:
        return (Zn(), null);
      case 10:
        return (Rl(t.type._context), null);
      case 22:
      case 23:
        return (dc(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var Ci = !1,
    Ue = !1,
    Ty = typeof WeakSet == "function" ? WeakSet : Set,
    I = null;
  function Yn(e, t) {
    var r = e.ref;
    if (r !== null)
      if (typeof r == "function")
        try {
          r(null);
        } catch (n) {
          ve(e, t, n);
        }
      else r.current = null;
  }
  function Jl(e, t, r) {
    try {
      r();
    } catch (n) {
      ve(e, t, n);
    }
  }
  var cm = !1;
  function Py(e, t) {
    if (((dl = Vs), (e = Bd()), nl(e))) {
      if ("selectionStart" in e)
        var r = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          r = ((r = e.ownerDocument) && r.defaultView) || window;
          var n = r.getSelection && r.getSelection();
          if (n && n.rangeCount !== 0) {
            r = n.anchorNode;
            var a = n.anchorOffset,
              s = n.focusNode;
            n = n.focusOffset;
            try {
              (r.nodeType, s.nodeType);
            } catch {
              r = null;
              break e;
            }
            var o = 0,
              l = -1,
              c = -1,
              u = 0,
              p = 0,
              f = e,
              m = null;
            t: for (;;) {
              for (
                var x;
                f !== r || (a !== 0 && f.nodeType !== 3) || (l = o + a),
                  f !== s || (n !== 0 && f.nodeType !== 3) || (c = o + n),
                  f.nodeType === 3 && (o += f.nodeValue.length),
                  (x = f.firstChild) !== null;
              )
                ((m = f), (f = x));
              for (;;) {
                if (f === e) break t;
                if (
                  (m === r && ++u === a && (l = o),
                  m === s && ++p === n && (c = o),
                  (x = f.nextSibling) !== null)
                )
                  break;
                ((f = m), (m = f.parentNode));
              }
              f = x;
            }
            r = l === -1 || c === -1 ? null : { start: l, end: c };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (
      pl = { focusedElem: e, selectionRange: r }, Vs = !1, I = t;
      I !== null;
    )
      if (((t = I), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (I = e));
      else
        for (; I !== null; ) {
          t = I;
          try {
            var v = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (v !== null) {
                    var b = v.memoizedProps,
                      C = v.memoizedState,
                      g = t.stateNode,
                      d = g.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? b : _t(t.type, b),
                        C
                      );
                    g.__reactInternalSnapshotBeforeUpdate = d;
                  }
                  break;
                case 3:
                  var y = t.stateNode.containerInfo;
                  y.nodeType === 1
                    ? (y.textContent = "")
                    : y.nodeType === 9 &&
                      y.documentElement &&
                      y.removeChild(y.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(E(163));
              }
          } catch (w) {
            ve(t, t.return, w);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (I = e));
            break;
          }
          I = t.return;
        }
    return ((v = cm), (cm = !1), v);
  }
  function is(e, t, r) {
    var n = t.updateQueue;
    if (((n = n !== null ? n.lastEffect : null), n !== null)) {
      var a = (n = n.next);
      do {
        if ((a.tag & e) === e) {
          var s = a.destroy;
          ((a.destroy = void 0), s !== void 0 && Jl(t, r, s));
        }
        a = a.next;
      } while (a !== n);
    }
  }
  function _i(e, t) {
    if (
      ((t = t.updateQueue), (t = t !== null ? t.lastEffect : null), t !== null)
    ) {
      var r = (t = t.next);
      do {
        if ((r.tag & e) === e) {
          var n = r.create;
          r.destroy = n();
        }
        r = r.next;
      } while (r !== t);
    }
  }
  function ec(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      (e.tag, (e = r), typeof t == "function" ? t(e) : (t.current = e));
    }
  }
  function um(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), um(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[Ot],
          delete t[Za],
          delete t[gl],
          delete t[hy],
          delete t[fy])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function dm(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function pm(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || dm(e.return)) return null;
        e = e.return;
      }
      for (
        e.sibling.return = e.return, e = e.sibling;
        e.tag !== 5 && e.tag !== 6 && e.tag !== 18;
      ) {
        if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
        ((e.child.return = e), (e = e.child));
      }
      if (!(e.flags & 2)) return e.stateNode;
    }
  }
  function tc(e, t, r) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode),
        t
          ? r.nodeType === 8
            ? r.parentNode.insertBefore(e, t)
            : r.insertBefore(e, t)
          : (r.nodeType === 8
              ? ((t = r.parentNode), t.insertBefore(e, r))
              : ((t = r), t.appendChild(e)),
            (r = r._reactRootContainer),
            r != null || t.onclick !== null || (t.onclick = ri)));
    else if (n !== 4 && ((e = e.child), e !== null))
      for (tc(e, t, r), e = e.sibling; e !== null; )
        (tc(e, t, r), (e = e.sibling));
  }
  function rc(e, t, r) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
    else if (n !== 4 && ((e = e.child), e !== null))
      for (rc(e, t, r), e = e.sibling; e !== null; )
        (rc(e, t, r), (e = e.sibling));
  }
  var Me = null,
    Rt = !1;
  function _r(e, t, r) {
    for (r = r.child; r !== null; ) (mm(e, t, r), (r = r.sibling));
  }
  function mm(e, t, r) {
    if (Pt && typeof Pt.onCommitFiberUnmount == "function")
      try {
        Pt.onCommitFiberUnmount(Fs, r);
      } catch {}
    switch (r.tag) {
      case 5:
        Ue || Yn(r, t);
      case 6:
        var n = Me,
          a = Rt;
        ((Me = null),
          _r(e, t, r),
          (Me = n),
          (Rt = a),
          Me !== null &&
            (Rt
              ? ((e = Me),
                (r = r.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(r)
                  : e.removeChild(r))
              : Me.removeChild(r.stateNode)));
        break;
      case 18:
        Me !== null &&
          (Rt
            ? ((e = Me),
              (r = r.stateNode),
              e.nodeType === 8
                ? fl(e.parentNode, r)
                : e.nodeType === 1 && fl(e, r),
              Fa(e))
            : fl(Me, r.stateNode));
        break;
      case 4:
        ((n = Me),
          (a = Rt),
          (Me = r.stateNode.containerInfo),
          (Rt = !0),
          _r(e, t, r),
          (Me = n),
          (Rt = a));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ue &&
          ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
        ) {
          a = n = n.next;
          do {
            var s = a,
              o = s.destroy;
            ((s = s.tag),
              o !== void 0 && ((s & 2) !== 0 || (s & 4) !== 0) && Jl(r, t, o),
              (a = a.next));
          } while (a !== n);
        }
        _r(e, t, r);
        break;
      case 1:
        if (
          !Ue &&
          (Yn(r, t),
          (n = r.stateNode),
          typeof n.componentWillUnmount == "function")
        )
          try {
            ((n.props = r.memoizedProps),
              (n.state = r.memoizedState),
              n.componentWillUnmount());
          } catch (l) {
            ve(r, t, l);
          }
        _r(e, t, r);
        break;
      case 21:
        _r(e, t, r);
        break;
      case 22:
        r.mode & 1
          ? ((Ue = (n = Ue) || r.memoizedState !== null), _r(e, t, r), (Ue = n))
          : _r(e, t, r);
        break;
      default:
        _r(e, t, r);
    }
  }
  function hm(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      (r === null && (r = e.stateNode = new Ty()),
        t.forEach(function (n) {
          var a = By.bind(null, e, n);
          r.has(n) || (r.add(n), n.then(a, a));
        }));
    }
  }
  function jt(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var n = 0; n < r.length; n++) {
        var a = r[n];
        try {
          var s = e,
            o = t,
            l = o;
          e: for (; l !== null; ) {
            switch (l.tag) {
              case 5:
                ((Me = l.stateNode), (Rt = !1));
                break e;
              case 3:
                ((Me = l.stateNode.containerInfo), (Rt = !0));
                break e;
              case 4:
                ((Me = l.stateNode.containerInfo), (Rt = !0));
                break e;
            }
            l = l.return;
          }
          if (Me === null) throw Error(E(160));
          (mm(s, o, a), (Me = null), (Rt = !1));
          var c = a.alternate;
          (c !== null && (c.return = null), (a.return = null));
        } catch (u) {
          ve(a, t, u);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (fm(t, e), (t = t.sibling));
  }
  function fm(e, t) {
    var r = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((jt(t, e), It(e), n & 4)) {
          try {
            (is(3, e, e.return), _i(3, e));
          } catch (b) {
            ve(e, e.return, b);
          }
          try {
            is(5, e, e.return);
          } catch (b) {
            ve(e, e.return, b);
          }
        }
        break;
      case 1:
        (jt(t, e), It(e), n & 512 && r !== null && Yn(r, r.return));
        break;
      case 5:
        if (
          (jt(t, e),
          It(e),
          n & 512 && r !== null && Yn(r, r.return),
          e.flags & 32)
        ) {
          var a = e.stateNode;
          try {
            ja(a, "");
          } catch (b) {
            ve(e, e.return, b);
          }
        }
        if (n & 4 && ((a = e.stateNode), a != null)) {
          var s = e.memoizedProps,
            o = r !== null ? r.memoizedProps : s,
            l = e.type,
            c = e.updateQueue;
          if (((e.updateQueue = null), c !== null))
            try {
              (l === "input" &&
                s.type === "radio" &&
                s.name != null &&
                $u(a, s),
                Oo(l, o));
              var u = Oo(l, s);
              for (o = 0; o < c.length; o += 2) {
                var p = c[o],
                  f = c[o + 1];
                p === "style"
                  ? Yu(a, f)
                  : p === "dangerouslySetInnerHTML"
                    ? Zu(a, f)
                    : p === "children"
                      ? ja(a, f)
                      : go(a, p, f, u);
              }
              switch (l) {
                case "input":
                  No(a, s);
                  break;
                case "textarea":
                  Wu(a, s);
                  break;
                case "select":
                  var m = a._wrapperState.wasMultiple;
                  a._wrapperState.wasMultiple = !!s.multiple;
                  var x = s.value;
                  x != null
                    ? En(a, !!s.multiple, x, !1)
                    : m !== !!s.multiple &&
                      (s.defaultValue != null
                        ? En(a, !!s.multiple, s.defaultValue, !0)
                        : En(a, !!s.multiple, s.multiple ? [] : "", !1));
              }
              a[Za] = s;
            } catch (b) {
              ve(e, e.return, b);
            }
        }
        break;
      case 6:
        if ((jt(t, e), It(e), n & 4)) {
          if (e.stateNode === null) throw Error(E(162));
          ((a = e.stateNode), (s = e.memoizedProps));
          try {
            a.nodeValue = s;
          } catch (b) {
            ve(e, e.return, b);
          }
        }
        break;
      case 3:
        if (
          (jt(t, e), It(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
        )
          try {
            Fa(t.containerInfo);
          } catch (b) {
            ve(e, e.return, b);
          }
        break;
      case 4:
        (jt(t, e), It(e));
        break;
      case 13:
        (jt(t, e),
          It(e),
          (a = e.child),
          a.flags & 8192 &&
            ((s = a.memoizedState !== null),
            (a.stateNode.isHidden = s),
            !s ||
              (a.alternate !== null && a.alternate.memoizedState !== null) ||
              (sc = ke())),
          n & 4 && hm(e));
        break;
      case 22:
        if (
          ((p = r !== null && r.memoizedState !== null),
          e.mode & 1 ? ((Ue = (u = Ue) || p), jt(t, e), (Ue = u)) : jt(t, e),
          It(e),
          n & 8192)
        ) {
          if (
            ((u = e.memoizedState !== null),
            (e.stateNode.isHidden = u) && !p && (e.mode & 1) !== 0)
          )
            for (I = e, p = e.child; p !== null; ) {
              for (f = I = p; I !== null; ) {
                switch (((m = I), (x = m.child), m.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    is(4, m, m.return);
                    break;
                  case 1:
                    Yn(m, m.return);
                    var v = m.stateNode;
                    if (typeof v.componentWillUnmount == "function") {
                      ((n = m), (r = m.return));
                      try {
                        ((t = n),
                          (v.props = t.memoizedProps),
                          (v.state = t.memoizedState),
                          v.componentWillUnmount());
                      } catch (b) {
                        ve(n, r, b);
                      }
                    }
                    break;
                  case 5:
                    Yn(m, m.return);
                    break;
                  case 22:
                    if (m.memoizedState !== null) {
                      vm(f);
                      continue;
                    }
                }
                x !== null ? ((x.return = m), (I = x)) : vm(f);
              }
              p = p.sibling;
            }
          e: for (p = null, f = e; ; ) {
            if (f.tag === 5) {
              if (p === null) {
                p = f;
                try {
                  ((a = f.stateNode),
                    u
                      ? ((s = a.style),
                        typeof s.setProperty == "function"
                          ? s.setProperty("display", "none", "important")
                          : (s.display = "none"))
                      : ((l = f.stateNode),
                        (c = f.memoizedProps.style),
                        (o =
                          c != null && c.hasOwnProperty("display")
                            ? c.display
                            : null),
                        (l.style.display = Gu("display", o))));
                } catch (b) {
                  ve(e, e.return, b);
                }
              }
            } else if (f.tag === 6) {
              if (p === null)
                try {
                  f.stateNode.nodeValue = u ? "" : f.memoizedProps;
                } catch (b) {
                  ve(e, e.return, b);
                }
            } else if (
              ((f.tag !== 22 && f.tag !== 23) ||
                f.memoizedState === null ||
                f === e) &&
              f.child !== null
            ) {
              ((f.child.return = f), (f = f.child));
              continue;
            }
            if (f === e) break e;
            for (; f.sibling === null; ) {
              if (f.return === null || f.return === e) break e;
              (p === f && (p = null), (f = f.return));
            }
            (p === f && (p = null),
              (f.sibling.return = f.return),
              (f = f.sibling));
          }
        }
        break;
      case 19:
        (jt(t, e), It(e), n & 4 && hm(e));
        break;
      case 21:
        break;
      default:
        (jt(t, e), It(e));
    }
  }
  function It(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (dm(r)) {
              var n = r;
              break e;
            }
            r = r.return;
          }
          throw Error(E(160));
        }
        switch (n.tag) {
          case 5:
            var a = n.stateNode;
            n.flags & 32 && (ja(a, ""), (n.flags &= -33));
            var s = pm(e);
            rc(e, s, a);
            break;
          case 3:
          case 4:
            var o = n.stateNode.containerInfo,
              l = pm(e);
            tc(e, l, o);
            break;
          default:
            throw Error(E(161));
        }
      } catch (c) {
        ve(e, e.return, c);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function Oy(e, t, r) {
    ((I = e), gm(e));
  }
  function gm(e, t, r) {
    for (var n = (e.mode & 1) !== 0; I !== null; ) {
      var a = I,
        s = a.child;
      if (a.tag === 22 && n) {
        var o = a.memoizedState !== null || Ci;
        if (!o) {
          var l = a.alternate,
            c = (l !== null && l.memoizedState !== null) || Ue;
          l = Ci;
          var u = Ue;
          if (((Ci = o), (Ue = c) && !u))
            for (I = a; I !== null; )
              ((o = I),
                (c = o.child),
                o.tag === 22 && o.memoizedState !== null
                  ? xm(a)
                  : c !== null
                    ? ((c.return = o), (I = c))
                    : xm(a));
          for (; s !== null; ) ((I = s), gm(s), (s = s.sibling));
          ((I = a), (Ci = l), (Ue = u));
        }
        ym(e);
      } else
        (a.subtreeFlags & 8772) !== 0 && s !== null
          ? ((s.return = a), (I = s))
          : ym(e);
    }
  }
  function ym(e) {
    for (; I !== null; ) {
      var t = I;
      if ((t.flags & 8772) !== 0) {
        var r = t.alternate;
        try {
          if ((t.flags & 8772) !== 0)
            switch (t.tag) {
              case 0:
              case 11:
              case 15:
                Ue || _i(5, t);
                break;
              case 1:
                var n = t.stateNode;
                if (t.flags & 4 && !Ue)
                  if (r === null) n.componentDidMount();
                  else {
                    var a =
                      t.elementType === t.type
                        ? r.memoizedProps
                        : _t(t.type, r.memoizedProps);
                    n.componentDidUpdate(
                      a,
                      r.memoizedState,
                      n.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var s = t.updateQueue;
                s !== null && vp(t, s, n);
                break;
              case 3:
                var o = t.updateQueue;
                if (o !== null) {
                  if (((r = null), t.child !== null))
                    switch (t.child.tag) {
                      case 5:
                        r = t.child.stateNode;
                        break;
                      case 1:
                        r = t.child.stateNode;
                    }
                  vp(t, o, r);
                }
                break;
              case 5:
                var l = t.stateNode;
                if (r === null && t.flags & 4) {
                  r = l;
                  var c = t.memoizedProps;
                  switch (t.type) {
                    case "button":
                    case "input":
                    case "select":
                    case "textarea":
                      c.autoFocus && r.focus();
                      break;
                    case "img":
                      c.src && (r.src = c.src);
                  }
                }
                break;
              case 6:
                break;
              case 4:
                break;
              case 12:
                break;
              case 13:
                if (t.memoizedState === null) {
                  var u = t.alternate;
                  if (u !== null) {
                    var p = u.memoizedState;
                    if (p !== null) {
                      var f = p.dehydrated;
                      f !== null && Fa(f);
                    }
                  }
                }
                break;
              case 19:
              case 17:
              case 21:
              case 22:
              case 23:
              case 25:
                break;
              default:
                throw Error(E(163));
            }
          Ue || (t.flags & 512 && ec(t));
        } catch (m) {
          ve(t, t.return, m);
        }
      }
      if (t === e) {
        I = null;
        break;
      }
      if (((r = t.sibling), r !== null)) {
        ((r.return = t.return), (I = r));
        break;
      }
      I = t.return;
    }
  }
  function vm(e) {
    for (; I !== null; ) {
      var t = I;
      if (t === e) {
        I = null;
        break;
      }
      var r = t.sibling;
      if (r !== null) {
        ((r.return = t.return), (I = r));
        break;
      }
      I = t.return;
    }
  }
  function xm(e) {
    for (; I !== null; ) {
      var t = I;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              _i(4, t);
            } catch (c) {
              ve(t, r, c);
            }
            break;
          case 1:
            var n = t.stateNode;
            if (typeof n.componentDidMount == "function") {
              var a = t.return;
              try {
                n.componentDidMount();
              } catch (c) {
                ve(t, a, c);
              }
            }
            var s = t.return;
            try {
              ec(t);
            } catch (c) {
              ve(t, s, c);
            }
            break;
          case 5:
            var o = t.return;
            try {
              ec(t);
            } catch (c) {
              ve(t, o, c);
            }
        }
      } catch (c) {
        ve(t, t.return, c);
      }
      if (t === e) {
        I = null;
        break;
      }
      var l = t.sibling;
      if (l !== null) {
        ((l.return = t.return), (I = l));
        break;
      }
      I = t.return;
    }
  }
  var Ly = Math.ceil,
    Ri = Kt.ReactCurrentDispatcher,
    nc = Kt.ReactCurrentOwner,
    gt = Kt.ReactCurrentBatchConfig,
    te = 0,
    Pe = null,
    Re = null,
    Fe = 0,
    ut = 0,
    Xn = br(0),
    Ae = 0,
    os = null,
    tn = 0,
    ji = 0,
    ac = 0,
    ls = null,
    et = null,
    sc = 0,
    Jn = 1 / 0,
    Jt = null,
    Ni = !1,
    ic = null,
    Rr = null,
    Ai = !1,
    jr = null,
    Ei = 0,
    cs = 0,
    oc = null,
    Ti = -1,
    Pi = 0;
  function He() {
    return (te & 6) !== 0 ? ke() : Ti !== -1 ? Ti : (Ti = ke());
  }
  function Nr(e) {
    return (e.mode & 1) === 0
      ? 1
      : (te & 2) !== 0 && Fe !== 0
        ? Fe & -Fe
        : yy.transition !== null
          ? (Pi === 0 && (Pi = pd()), Pi)
          : ((e = ie),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : wd(e.type))),
            e);
  }
  function Nt(e, t, r, n) {
    if (50 < cs) throw ((cs = 0), (oc = null), Error(E(185)));
    (Oa(e, r, n),
      ((te & 2) === 0 || e !== Pe) &&
        (e === Pe && ((te & 2) === 0 && (ji |= r), Ae === 4 && Ar(e, Fe)),
        tt(e, n),
        r === 1 &&
          te === 0 &&
          (t.mode & 1) === 0 &&
          ((Jn = ke() + 500), ii && kr())));
  }
  function tt(e, t) {
    var r = e.callbackNode;
    yg(e, t);
    var n = Bs(e, e === Pe ? Fe : 0);
    if (n === 0)
      (r !== null && cd(r), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = n & -n), e.callbackPriority !== t)) {
      if ((r != null && cd(r), t === 1))
        (e.tag === 0 ? gy(wm.bind(null, e)) : ip(wm.bind(null, e)),
          py(function () {
            (te & 6) === 0 && kr();
          }),
          (r = null));
      else {
        switch (md(n)) {
          case 1:
            r = qo;
            break;
          case 4:
            r = ud;
            break;
          case 16:
            r = Ms;
            break;
          case 536870912:
            r = dd;
            break;
          default:
            r = Ms;
        }
        r = Am(r, bm.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = r));
    }
  }
  function bm(e, t) {
    if (((Ti = -1), (Pi = 0), (te & 6) !== 0)) throw Error(E(327));
    var r = e.callbackNode;
    if (ea() && e.callbackNode !== r) return null;
    var n = Bs(e, e === Pe ? Fe : 0);
    if (n === 0) return null;
    if ((n & 30) !== 0 || (n & e.expiredLanes) !== 0 || t) t = Oi(e, n);
    else {
      t = n;
      var a = te;
      te |= 2;
      var s = Sm();
      (Pe !== e || Fe !== t) && ((Jt = null), (Jn = ke() + 500), nn(e, t));
      do
        try {
          My();
          break;
        } catch (l) {
          km(e, l);
        }
      while (!0);
      (_l(),
        (Ri.current = s),
        (te = a),
        Re !== null ? (t = 0) : ((Pe = null), (Fe = 0), (t = Ae)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((a = Bo(e)), a !== 0 && ((n = a), (t = lc(e, a)))),
        t === 1)
      )
        throw ((r = os), nn(e, 0), Ar(e, n), tt(e, ke()), r);
      if (t === 6) Ar(e, n);
      else {
        if (
          ((a = e.current.alternate),
          (n & 30) === 0 &&
            !Dy(a) &&
            ((t = Oi(e, n)),
            t === 2 && ((s = Bo(e)), s !== 0 && ((n = s), (t = lc(e, s)))),
            t === 1))
        )
          throw ((r = os), nn(e, 0), Ar(e, n), tt(e, ke()), r);
        switch (((e.finishedWork = a), (e.finishedLanes = n), t)) {
          case 0:
          case 1:
            throw Error(E(345));
          case 2:
            an(e, et, Jt);
            break;
          case 3:
            if (
              (Ar(e, n),
              (n & 130023424) === n && ((t = sc + 500 - ke()), 10 < t))
            ) {
              if (Bs(e, 0) !== 0) break;
              if (((a = e.suspendedLanes), (a & n) !== n)) {
                (He(), (e.pingedLanes |= e.suspendedLanes & a));
                break;
              }
              e.timeoutHandle = hl(an.bind(null, e, et, Jt), t);
              break;
            }
            an(e, et, Jt);
            break;
          case 4:
            if ((Ar(e, n), (n & 4194240) === n)) break;
            for (t = e.eventTimes, a = -1; 0 < n; ) {
              var o = 31 - kt(n);
              ((s = 1 << o), (o = t[o]), o > a && (a = o), (n &= ~s));
            }
            if (
              ((n = a),
              (n = ke() - n),
              (n =
                (120 > n
                  ? 120
                  : 480 > n
                    ? 480
                    : 1080 > n
                      ? 1080
                      : 1920 > n
                        ? 1920
                        : 3e3 > n
                          ? 3e3
                          : 4320 > n
                            ? 4320
                            : 1960 * Ly(n / 1960)) - n),
              10 < n)
            ) {
              e.timeoutHandle = hl(an.bind(null, e, et, Jt), n);
              break;
            }
            an(e, et, Jt);
            break;
          case 5:
            an(e, et, Jt);
            break;
          default:
            throw Error(E(329));
        }
      }
    }
    return (tt(e, ke()), e.callbackNode === r ? bm.bind(null, e) : null);
  }
  function lc(e, t) {
    var r = ls;
    return (
      e.current.memoizedState.isDehydrated && (nn(e, t).flags |= 256),
      (e = Oi(e, t)),
      e !== 2 && ((t = et), (et = r), t !== null && cc(t)),
      e
    );
  }
  function cc(e) {
    et === null ? (et = e) : et.push.apply(et, e);
  }
  function Dy(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && ((r = r.stores), r !== null))
          for (var n = 0; n < r.length; n++) {
            var a = r[n],
              s = a.getSnapshot;
            a = a.value;
            try {
              if (!St(s(), a)) return !1;
            } catch {
              return !1;
            }
          }
      }
      if (((r = t.child), t.subtreeFlags & 16384 && r !== null))
        ((r.return = t), (t = r));
      else {
        if (t === e) break;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e) return !0;
          t = t.return;
        }
        ((t.sibling.return = t.return), (t = t.sibling));
      }
    }
    return !0;
  }
  function Ar(e, t) {
    for (
      t &= ~ac,
        t &= ~ji,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;
    ) {
      var r = 31 - kt(t),
        n = 1 << r;
      ((e[r] = -1), (t &= ~n));
    }
  }
  function wm(e) {
    if ((te & 6) !== 0) throw Error(E(327));
    ea();
    var t = Bs(e, 0);
    if ((t & 1) === 0) return (tt(e, ke()), null);
    var r = Oi(e, t);
    if (e.tag !== 0 && r === 2) {
      var n = Bo(e);
      n !== 0 && ((t = n), (r = lc(e, n)));
    }
    if (r === 1) throw ((r = os), nn(e, 0), Ar(e, t), tt(e, ke()), r);
    if (r === 6) throw Error(E(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      an(e, et, Jt),
      tt(e, ke()),
      null
    );
  }
  function uc(e, t) {
    var r = te;
    te |= 1;
    try {
      return e(t);
    } finally {
      ((te = r), te === 0 && ((Jn = ke() + 500), ii && kr()));
    }
  }
  function rn(e) {
    jr !== null && jr.tag === 0 && (te & 6) === 0 && ea();
    var t = te;
    te |= 1;
    var r = gt.transition,
      n = ie;
    try {
      if (((gt.transition = null), (ie = 1), e)) return e();
    } finally {
      ((ie = n), (gt.transition = r), (te = t), (te & 6) === 0 && kr());
    }
  }
  function dc() {
    ((ut = Xn.current), pe(Xn));
  }
  function nn(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var r = e.timeoutHandle;
    if ((r !== -1 && ((e.timeoutHandle = -1), dy(r)), Re !== null))
      for (r = Re.return; r !== null; ) {
        var n = r;
        switch ((bl(n), n.tag)) {
          case 1:
            ((n = n.type.childContextTypes), n != null && ai());
            break;
          case 3:
            (Zn(), pe(Ye), pe(ze), Ol());
            break;
          case 5:
            Tl(n);
            break;
          case 4:
            Zn();
            break;
          case 13:
            pe(fe);
            break;
          case 19:
            pe(fe);
            break;
          case 10:
            Rl(n.type._context);
            break;
          case 22:
          case 23:
            dc();
        }
        r = r.return;
      }
    if (
      ((Pe = e),
      (Re = e = Er(e.current, null)),
      (Fe = ut = t),
      (Ae = 0),
      (os = null),
      (ac = ji = tn = 0),
      (et = ls = null),
      Xr !== null)
    ) {
      for (t = 0; t < Xr.length; t++)
        if (((r = Xr[t]), (n = r.interleaved), n !== null)) {
          r.interleaved = null;
          var a = n.next,
            s = r.pending;
          if (s !== null) {
            var o = s.next;
            ((s.next = a), (n.next = o));
          }
          r.pending = n;
        }
      Xr = null;
    }
    return e;
  }
  function km(e, t) {
    do {
      var r = Re;
      try {
        if ((_l(), (gi.current = bi), yi)) {
          for (var n = ge.memoizedState; n !== null; ) {
            var a = n.queue;
            (a !== null && (a.pending = null), (n = n.next));
          }
          yi = !1;
        }
        if (
          ((en = 0),
          (Te = Ne = ge = null),
          (ts = !1),
          (rs = 0),
          (nc.current = null),
          r === null || r.return === null)
        ) {
          ((Ae = 1), (os = t), (Re = null));
          break;
        }
        e: {
          var s = e,
            o = r.return,
            l = r,
            c = t;
          if (
            ((t = Fe),
            (l.flags |= 32768),
            c !== null && typeof c == "object" && typeof c.then == "function")
          ) {
            var u = c,
              p = l,
              f = p.tag;
            if ((p.mode & 1) === 0 && (f === 0 || f === 11 || f === 15)) {
              var m = p.alternate;
              m
                ? ((p.updateQueue = m.updateQueue),
                  (p.memoizedState = m.memoizedState),
                  (p.lanes = m.lanes))
                : ((p.updateQueue = null), (p.memoizedState = null));
            }
            var x = Hp(o);
            if (x !== null) {
              ((x.flags &= -257),
                Qp(x, o, l, s, t),
                x.mode & 1 && Wp(s, u, t),
                (t = x),
                (c = u));
              var v = t.updateQueue;
              if (v === null) {
                var b = new Set();
                (b.add(c), (t.updateQueue = b));
              } else v.add(c);
              break e;
            } else {
              if ((t & 1) === 0) {
                (Wp(s, u, t), pc());
                break e;
              }
              c = Error(E(426));
            }
          } else if (me && l.mode & 1) {
            var C = Hp(o);
            if (C !== null) {
              ((C.flags & 65536) === 0 && (C.flags |= 256),
                Qp(C, o, l, s, t),
                Sl(Gn(c, l)));
              break e;
            }
          }
          ((s = c = Gn(c, l)),
            Ae !== 4 && (Ae = 2),
            ls === null ? (ls = [s]) : ls.push(s),
            (s = o));
          do {
            switch (s.tag) {
              case 3:
                ((s.flags |= 65536), (t &= -t), (s.lanes |= t));
                var g = Vp(s, c, t);
                yp(s, g);
                break e;
              case 1:
                l = c;
                var d = s.type,
                  y = s.stateNode;
                if (
                  (s.flags & 128) === 0 &&
                  (typeof d.getDerivedStateFromError == "function" ||
                    (y !== null &&
                      typeof y.componentDidCatch == "function" &&
                      (Rr === null || !Rr.has(y))))
                ) {
                  ((s.flags |= 65536), (t &= -t), (s.lanes |= t));
                  var w = Kp(s, l, t);
                  yp(s, w);
                  break e;
                }
            }
            s = s.return;
          } while (s !== null);
        }
        _m(r);
      } catch (_) {
        ((t = _), Re === r && r !== null && (Re = r = r.return));
        continue;
      }
      break;
    } while (!0);
  }
  function Sm() {
    var e = Ri.current;
    return ((Ri.current = bi), e === null ? bi : e);
  }
  function pc() {
    ((Ae === 0 || Ae === 3 || Ae === 2) && (Ae = 4),
      Pe === null ||
        ((tn & 268435455) === 0 && (ji & 268435455) === 0) ||
        Ar(Pe, Fe));
  }
  function Oi(e, t) {
    var r = te;
    te |= 2;
    var n = Sm();
    (Pe !== e || Fe !== t) && ((Jt = null), nn(e, t));
    do
      try {
        Iy();
        break;
      } catch (a) {
        km(e, a);
      }
    while (!0);
    if ((_l(), (te = r), (Ri.current = n), Re !== null)) throw Error(E(261));
    return ((Pe = null), (Fe = 0), Ae);
  }
  function Iy() {
    for (; Re !== null; ) Cm(Re);
  }
  function My() {
    for (; Re !== null && !lg(); ) Cm(Re);
  }
  function Cm(e) {
    var t = Nm(e.alternate, e, ut);
    ((e.memoizedProps = e.pendingProps),
      t === null ? _m(e) : (Re = t),
      (nc.current = null));
  }
  function _m(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((r = Ay(r, t, ut)), r !== null)) {
          Re = r;
          return;
        }
      } else {
        if (((r = Ey(r, t)), r !== null)) {
          ((r.flags &= 32767), (Re = r));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((Ae = 6), (Re = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        Re = t;
        return;
      }
      Re = t = e;
    } while (t !== null);
    Ae === 0 && (Ae = 5);
  }
  function an(e, t, r) {
    var n = ie,
      a = gt.transition;
    try {
      ((gt.transition = null), (ie = 1), Fy(e, t, r, n));
    } finally {
      ((gt.transition = a), (ie = n));
    }
    return null;
  }
  function Fy(e, t, r, n) {
    do ea();
    while (jr !== null);
    if ((te & 6) !== 0) throw Error(E(327));
    r = e.finishedWork;
    var a = e.finishedLanes;
    if (r === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
      throw Error(E(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var s = r.lanes | r.childLanes;
    if (
      (vg(e, s),
      e === Pe && ((Re = Pe = null), (Fe = 0)),
      ((r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0) ||
        Ai ||
        ((Ai = !0),
        Am(Ms, function () {
          return (ea(), null);
        })),
      (s = (r.flags & 15990) !== 0),
      (r.subtreeFlags & 15990) !== 0 || s)
    ) {
      ((s = gt.transition), (gt.transition = null));
      var o = ie;
      ie = 1;
      var l = te;
      ((te |= 4),
        (nc.current = null),
        Py(e, r),
        fm(r, e),
        ay(pl),
        (Vs = !!dl),
        (pl = dl = null),
        (e.current = r),
        Oy(r),
        cg(),
        (te = l),
        (ie = o),
        (gt.transition = s));
    } else e.current = r;
    if (
      (Ai && ((Ai = !1), (jr = e), (Ei = a)),
      (s = e.pendingLanes),
      s === 0 && (Rr = null),
      pg(r.stateNode),
      tt(e, ke()),
      t !== null)
    )
      for (n = e.onRecoverableError, r = 0; r < t.length; r++)
        ((a = t[r]), n(a.value, { componentStack: a.stack, digest: a.digest }));
    if (Ni) throw ((Ni = !1), (e = ic), (ic = null), e);
    return (
      (Ei & 1) !== 0 && e.tag !== 0 && ea(),
      (s = e.pendingLanes),
      (s & 1) !== 0 ? (e === oc ? cs++ : ((cs = 0), (oc = e))) : (cs = 0),
      kr(),
      null
    );
  }
  function ea() {
    if (jr !== null) {
      var e = md(Ei),
        t = gt.transition,
        r = ie;
      try {
        if (((gt.transition = null), (ie = 16 > e ? 16 : e), jr === null))
          var n = !1;
        else {
          if (((e = jr), (jr = null), (Ei = 0), (te & 6) !== 0))
            throw Error(E(331));
          var a = te;
          for (te |= 4, I = e.current; I !== null; ) {
            var s = I,
              o = s.child;
            if ((I.flags & 16) !== 0) {
              var l = s.deletions;
              if (l !== null) {
                for (var c = 0; c < l.length; c++) {
                  var u = l[c];
                  for (I = u; I !== null; ) {
                    var p = I;
                    switch (p.tag) {
                      case 0:
                      case 11:
                      case 15:
                        is(8, p, s);
                    }
                    var f = p.child;
                    if (f !== null) ((f.return = p), (I = f));
                    else
                      for (; I !== null; ) {
                        p = I;
                        var m = p.sibling,
                          x = p.return;
                        if ((um(p), p === u)) {
                          I = null;
                          break;
                        }
                        if (m !== null) {
                          ((m.return = x), (I = m));
                          break;
                        }
                        I = x;
                      }
                  }
                }
                var v = s.alternate;
                if (v !== null) {
                  var b = v.child;
                  if (b !== null) {
                    v.child = null;
                    do {
                      var C = b.sibling;
                      ((b.sibling = null), (b = C));
                    } while (b !== null);
                  }
                }
                I = s;
              }
            }
            if ((s.subtreeFlags & 2064) !== 0 && o !== null)
              ((o.return = s), (I = o));
            else
              e: for (; I !== null; ) {
                if (((s = I), (s.flags & 2048) !== 0))
                  switch (s.tag) {
                    case 0:
                    case 11:
                    case 15:
                      is(9, s, s.return);
                  }
                var g = s.sibling;
                if (g !== null) {
                  ((g.return = s.return), (I = g));
                  break e;
                }
                I = s.return;
              }
          }
          var d = e.current;
          for (I = d; I !== null; ) {
            o = I;
            var y = o.child;
            if ((o.subtreeFlags & 2064) !== 0 && y !== null)
              ((y.return = o), (I = y));
            else
              e: for (o = d; I !== null; ) {
                if (((l = I), (l.flags & 2048) !== 0))
                  try {
                    switch (l.tag) {
                      case 0:
                      case 11:
                      case 15:
                        _i(9, l);
                    }
                  } catch (_) {
                    ve(l, l.return, _);
                  }
                if (l === o) {
                  I = null;
                  break e;
                }
                var w = l.sibling;
                if (w !== null) {
                  ((w.return = l.return), (I = w));
                  break e;
                }
                I = l.return;
              }
          }
          if (
            ((te = a),
            kr(),
            Pt && typeof Pt.onPostCommitFiberRoot == "function")
          )
            try {
              Pt.onPostCommitFiberRoot(Fs, e);
            } catch {}
          n = !0;
        }
        return n;
      } finally {
        ((ie = r), (gt.transition = t));
      }
    }
    return !1;
  }
  function Rm(e, t, r) {
    ((t = Gn(r, t)),
      (t = Vp(e, t, 1)),
      (e = Cr(e, t, 1)),
      (t = He()),
      e !== null && (Oa(e, 1, t), tt(e, t)));
  }
  function ve(e, t, r) {
    if (e.tag === 3) Rm(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          Rm(t, e, r);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof n.componentDidCatch == "function" &&
              (Rr === null || !Rr.has(n)))
          ) {
            ((e = Gn(r, e)),
              (e = Kp(t, e, 1)),
              (t = Cr(t, e, 1)),
              (e = He()),
              t !== null && (Oa(t, 1, e), tt(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function zy(e, t, r) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (t = He()),
      (e.pingedLanes |= e.suspendedLanes & r),
      Pe === e &&
        (Fe & r) === r &&
        (Ae === 4 || (Ae === 3 && (Fe & 130023424) === Fe && 500 > ke() - sc)
          ? nn(e, 0)
          : (ac |= r)),
      tt(e, t));
  }
  function jm(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = qs), (qs <<= 1), (qs & 130023424) === 0 && (qs = 4194304)));
    var r = He();
    ((e = Gt(e, t)), e !== null && (Oa(e, t, r), tt(e, r)));
  }
  function qy(e) {
    var t = e.memoizedState,
      r = 0;
    (t !== null && (r = t.retryLane), jm(e, r));
  }
  function By(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var n = e.stateNode,
          a = e.memoizedState;
        a !== null && (r = a.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      default:
        throw Error(E(314));
    }
    (n !== null && n.delete(t), jm(e, r));
  }
  var Nm;
  Nm = function (e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ye.current) Je = !0;
      else {
        if ((e.lanes & r) === 0 && (t.flags & 128) === 0)
          return ((Je = !1), Ny(e, t, r));
        Je = (e.flags & 131072) !== 0;
      }
    else ((Je = !1), me && (t.flags & 1048576) !== 0 && op(t, li, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var n = t.type;
        (Si(e, t), (e = t.pendingProps));
        var a = Un(t, ze.current);
        (Qn(t, r), (a = Il(null, t, n, e, a, r)));
        var s = Ml();
        return (
          (t.flags |= 1),
          typeof a == "object" &&
          a !== null &&
          typeof a.render == "function" &&
          a.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Xe(n) ? ((s = !0), si(t)) : (s = !1),
              (t.memoizedState =
                a.state !== null && a.state !== void 0 ? a.state : null),
              Al(t),
              (a.updater = wi),
              (t.stateNode = a),
              (a._reactInternals = t),
              $l(t, n, e, r),
              (t = Hl(null, t, n, !0, s, r)))
            : ((t.tag = 0), me && s && xl(t), We(null, t, a, r), (t = t.child)),
          t
        );
      case 16:
        n = t.elementType;
        e: {
          switch (
            (Si(e, t),
            (e = t.pendingProps),
            (a = n._init),
            (n = a(n._payload)),
            (t.type = n),
            (a = t.tag = $y(n)),
            (e = _t(n, e)),
            a)
          ) {
            case 0:
              t = Wl(null, t, n, e, r);
              break e;
            case 1:
              t = em(null, t, n, e, r);
              break e;
            case 11:
              t = Zp(null, t, n, e, r);
              break e;
            case 14:
              t = Gp(null, t, n, _t(n.type, e), r);
              break e;
          }
          throw Error(E(306, n, ""));
        }
        return t;
      case 0:
        return (
          (n = t.type),
          (a = t.pendingProps),
          (a = t.elementType === n ? a : _t(n, a)),
          Wl(e, t, n, a, r)
        );
      case 1:
        return (
          (n = t.type),
          (a = t.pendingProps),
          (a = t.elementType === n ? a : _t(n, a)),
          em(e, t, n, a, r)
        );
      case 3:
        e: {
          if ((tm(t), e === null)) throw Error(E(387));
          ((n = t.pendingProps),
            (s = t.memoizedState),
            (a = s.element),
            gp(e, t),
            hi(t, n, null, r));
          var o = t.memoizedState;
          if (((n = o.element), s.isDehydrated))
            if (
              ((s = {
                element: n,
                isDehydrated: !1,
                cache: o.cache,
                pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                transitions: o.transitions,
              }),
              (t.updateQueue.baseState = s),
              (t.memoizedState = s),
              t.flags & 256)
            ) {
              ((a = Gn(Error(E(423)), t)), (t = rm(e, t, n, r, a)));
              break e;
            } else if (n !== a) {
              ((a = Gn(Error(E(424)), t)), (t = rm(e, t, n, r, a)));
              break e;
            } else
              for (
                ct = xr(t.stateNode.containerInfo.firstChild),
                  lt = t,
                  me = !0,
                  Ct = null,
                  r = hp(t, null, n, r),
                  t.child = r;
                r;
              )
                ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
          else {
            if ((Kn(), n === a)) {
              t = Xt(e, t, r);
              break e;
            }
            We(e, t, n, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          xp(t),
          e === null && kl(t),
          (n = t.type),
          (a = t.pendingProps),
          (s = e !== null ? e.memoizedProps : null),
          (o = a.children),
          ml(n, a) ? (o = null) : s !== null && ml(n, s) && (t.flags |= 32),
          Jp(e, t),
          We(e, t, o, r),
          t.child
        );
      case 6:
        return (e === null && kl(t), null);
      case 13:
        return nm(e, t, r);
      case 4:
        return (
          El(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = Wn(t, null, n, r)) : We(e, t, n, r),
          t.child
        );
      case 11:
        return (
          (n = t.type),
          (a = t.pendingProps),
          (a = t.elementType === n ? a : _t(n, a)),
          Zp(e, t, n, a, r)
        );
      case 7:
        return (We(e, t, t.pendingProps, r), t.child);
      case 8:
        return (We(e, t, t.pendingProps.children, r), t.child);
      case 12:
        return (We(e, t, t.pendingProps.children, r), t.child);
      case 10:
        e: {
          if (
            ((n = t.type._context),
            (a = t.pendingProps),
            (s = t.memoizedProps),
            (o = a.value),
            ue(di, n._currentValue),
            (n._currentValue = o),
            s !== null)
          )
            if (St(s.value, o)) {
              if (s.children === a.children && !Ye.current) {
                t = Xt(e, t, r);
                break e;
              }
            } else
              for (s = t.child, s !== null && (s.return = t); s !== null; ) {
                var l = s.dependencies;
                if (l !== null) {
                  o = s.child;
                  for (var c = l.firstContext; c !== null; ) {
                    if (c.context === n) {
                      if (s.tag === 1) {
                        ((c = Yt(-1, r & -r)), (c.tag = 2));
                        var u = s.updateQueue;
                        if (u !== null) {
                          u = u.shared;
                          var p = u.pending;
                          (p === null
                            ? (c.next = c)
                            : ((c.next = p.next), (p.next = c)),
                            (u.pending = c));
                        }
                      }
                      ((s.lanes |= r),
                        (c = s.alternate),
                        c !== null && (c.lanes |= r),
                        jl(s.return, r, t),
                        (l.lanes |= r));
                      break;
                    }
                    c = c.next;
                  }
                } else if (s.tag === 10) o = s.type === t.type ? null : s.child;
                else if (s.tag === 18) {
                  if (((o = s.return), o === null)) throw Error(E(341));
                  ((o.lanes |= r),
                    (l = o.alternate),
                    l !== null && (l.lanes |= r),
                    jl(o, r, t),
                    (o = s.sibling));
                } else o = s.child;
                if (o !== null) o.return = s;
                else
                  for (o = s; o !== null; ) {
                    if (o === t) {
                      o = null;
                      break;
                    }
                    if (((s = o.sibling), s !== null)) {
                      ((s.return = o.return), (o = s));
                      break;
                    }
                    o = o.return;
                  }
                s = o;
              }
          (We(e, t, a.children, r), (t = t.child));
        }
        return t;
      case 9:
        return (
          (a = t.type),
          (n = t.pendingProps.children),
          Qn(t, r),
          (a = ht(a)),
          (n = n(a)),
          (t.flags |= 1),
          We(e, t, n, r),
          t.child
        );
      case 14:
        return (
          (n = t.type),
          (a = _t(n, t.pendingProps)),
          (a = _t(n.type, a)),
          Gp(e, t, n, a, r)
        );
      case 15:
        return Yp(e, t, t.type, t.pendingProps, r);
      case 17:
        return (
          (n = t.type),
          (a = t.pendingProps),
          (a = t.elementType === n ? a : _t(n, a)),
          Si(e, t),
          (t.tag = 1),
          Xe(n) ? ((e = !0), si(t)) : (e = !1),
          Qn(t, r),
          Up(t, n, a),
          $l(t, n, a, r),
          Hl(null, t, n, !0, e, r)
        );
      case 19:
        return sm(e, t, r);
      case 22:
        return Xp(e, t, r);
    }
    throw Error(E(156, t.tag));
  };
  function Am(e, t) {
    return ld(e, t);
  }
  function Uy(e, t, r, n) {
    ((this.tag = e),
      (this.key = r),
      (this.sibling =
        this.child =
        this.return =
        this.stateNode =
        this.type =
        this.elementType =
          null),
      (this.index = 0),
      (this.ref = null),
      (this.pendingProps = t),
      (this.dependencies =
        this.memoizedState =
        this.updateQueue =
        this.memoizedProps =
          null),
      (this.mode = n),
      (this.subtreeFlags = this.flags = 0),
      (this.deletions = null),
      (this.childLanes = this.lanes = 0),
      (this.alternate = null));
  }
  function yt(e, t, r, n) {
    return new Uy(e, t, r, n);
  }
  function mc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function $y(e) {
    if (typeof e == "function") return mc(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === xo)) return 11;
      if (e === ko) return 14;
    }
    return 2;
  }
  function Er(e, t) {
    var r = e.alternate;
    return (
      r === null
        ? ((r = yt(e.tag, t, e.key, e.mode)),
          (r.elementType = e.elementType),
          (r.type = e.type),
          (r.stateNode = e.stateNode),
          (r.alternate = e),
          (e.alternate = r))
        : ((r.pendingProps = t),
          (r.type = e.type),
          (r.flags = 0),
          (r.subtreeFlags = 0),
          (r.deletions = null)),
      (r.flags = e.flags & 14680064),
      (r.childLanes = e.childLanes),
      (r.lanes = e.lanes),
      (r.child = e.child),
      (r.memoizedProps = e.memoizedProps),
      (r.memoizedState = e.memoizedState),
      (r.updateQueue = e.updateQueue),
      (t = e.dependencies),
      (r.dependencies =
        t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }),
      (r.sibling = e.sibling),
      (r.index = e.index),
      (r.ref = e.ref),
      r
    );
  }
  function Li(e, t, r, n, a, s) {
    var o = 2;
    if (((n = e), typeof e == "function")) mc(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else
      e: switch (e) {
        case An:
          return sn(r.children, a, s, t);
        case yo:
          ((o = 8), (a |= 8));
          break;
        case vo:
          return (
            (e = yt(12, r, t, a | 2)),
            (e.elementType = vo),
            (e.lanes = s),
            e
          );
        case bo:
          return (
            (e = yt(13, r, t, a)),
            (e.elementType = bo),
            (e.lanes = s),
            e
          );
        case wo:
          return (
            (e = yt(19, r, t, a)),
            (e.elementType = wo),
            (e.lanes = s),
            e
          );
        case Fu:
          return Di(r, a, s, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Iu:
                o = 10;
                break e;
              case Mu:
                o = 9;
                break e;
              case xo:
                o = 11;
                break e;
              case ko:
                o = 14;
                break e;
              case dr:
                ((o = 16), (n = null));
                break e;
            }
          throw Error(E(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = yt(o, r, t, a)),
      (t.elementType = e),
      (t.type = n),
      (t.lanes = s),
      t
    );
  }
  function sn(e, t, r, n) {
    return ((e = yt(7, e, n, t)), (e.lanes = r), e);
  }
  function Di(e, t, r, n) {
    return (
      (e = yt(22, e, n, t)),
      (e.elementType = Fu),
      (e.lanes = r),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function hc(e, t, r) {
    return ((e = yt(6, e, null, t)), (e.lanes = r), e);
  }
  function fc(e, t, r) {
    return (
      (t = yt(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = r),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Vy(e, t, r, n, a) {
    ((this.tag = t),
      (this.containerInfo = e),
      (this.finishedWork =
        this.pingCache =
        this.current =
        this.pendingChildren =
          null),
      (this.timeoutHandle = -1),
      (this.callbackNode = this.pendingContext = this.context = null),
      (this.callbackPriority = 0),
      (this.eventTimes = Uo(0)),
      (this.expirationTimes = Uo(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Uo(0)),
      (this.identifierPrefix = n),
      (this.onRecoverableError = a),
      (this.mutableSourceEagerHydrationData = null));
  }
  function gc(e, t, r, n, a, s, o, l, c) {
    return (
      (e = new Vy(e, t, r, l, c)),
      t === 1 ? ((t = 1), s === !0 && (t |= 8)) : (t = 0),
      (s = yt(3, null, null, t)),
      (e.current = s),
      (s.stateNode = e),
      (s.memoizedState = {
        element: n,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      Al(s),
      e
    );
  }
  function Ky(e, t, r) {
    var n =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: Nn,
      key: n == null ? null : "" + n,
      children: e,
      containerInfo: t,
      implementation: r,
    };
  }
  function Em(e) {
    if (!e) return wr;
    e = e._reactInternals;
    e: {
      if (Hr(e) !== e || e.tag !== 1) throw Error(E(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Xe(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(E(171));
    }
    if (e.tag === 1) {
      var r = e.type;
      if (Xe(r)) return ap(e, r, t);
    }
    return t;
  }
  function Tm(e, t, r, n, a, s, o, l, c) {
    return (
      (e = gc(r, n, !0, e, a, s, o, l, c)),
      (e.context = Em(null)),
      (r = e.current),
      (n = He()),
      (a = Nr(r)),
      (s = Yt(n, a)),
      (s.callback = t ?? null),
      Cr(r, s, a),
      (e.current.lanes = a),
      Oa(e, a, n),
      tt(e, n),
      e
    );
  }
  function Ii(e, t, r, n) {
    var a = t.current,
      s = He(),
      o = Nr(a);
    return (
      (r = Em(r)),
      t.context === null ? (t.context = r) : (t.pendingContext = r),
      (t = Yt(s, o)),
      (t.payload = { element: e }),
      (n = n === void 0 ? null : n),
      n !== null && (t.callback = n),
      (e = Cr(a, t, o)),
      e !== null && (Nt(e, a, o, s), mi(e, a, o)),
      o
    );
  }
  function Mi(e) {
    return (
      (e = e.current),
      e.child ? (e.child.tag === 5, e.child.stateNode) : null
    );
  }
  function Pm(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function yc(e, t) {
    (Pm(e, t), (e = e.alternate) && Pm(e, t));
  }
  function Wy() {
    return null;
  }
  var Om =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function vc(e) {
    this._internalRoot = e;
  }
  ((Fi.prototype.render = vc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(E(409));
      Ii(e, t, null, null);
    }),
    (Fi.prototype.unmount = vc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (rn(function () {
            Ii(null, e, null, null);
          }),
            (t[Wt] = null));
        }
      }));
  function Fi(e) {
    this._internalRoot = e;
  }
  Fi.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = gd();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < gr.length && t !== 0 && t < gr[r].priority; r++);
      (gr.splice(r, 0, e), r === 0 && xd(e));
    }
  };
  function xc(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function zi(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Lm() {}
  function Hy(e, t, r, n, a) {
    if (a) {
      if (typeof n == "function") {
        var s = n;
        n = function () {
          var u = Mi(o);
          s.call(u);
        };
      }
      var o = Tm(t, n, e, 0, null, !1, !1, "", Lm);
      return (
        (e._reactRootContainer = o),
        (e[Wt] = o.current),
        Ha(e.nodeType === 8 ? e.parentNode : e),
        rn(),
        o
      );
    }
    for (; (a = e.lastChild); ) e.removeChild(a);
    if (typeof n == "function") {
      var l = n;
      n = function () {
        var u = Mi(c);
        l.call(u);
      };
    }
    var c = gc(e, 0, !1, null, null, !1, !1, "", Lm);
    return (
      (e._reactRootContainer = c),
      (e[Wt] = c.current),
      Ha(e.nodeType === 8 ? e.parentNode : e),
      rn(function () {
        Ii(t, c, r, n);
      }),
      c
    );
  }
  function qi(e, t, r, n, a) {
    var s = r._reactRootContainer;
    if (s) {
      var o = s;
      if (typeof a == "function") {
        var l = a;
        a = function () {
          var c = Mi(o);
          l.call(c);
        };
      }
      Ii(t, o, e, a);
    } else o = Hy(r, t, e, a, n);
    return Mi(o);
  }
  ((hd = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = Pa(t.pendingLanes);
          r !== 0 &&
            ($o(t, r | 1),
            tt(t, ke()),
            (te & 6) === 0 && ((Jn = ke() + 500), kr()));
        }
        break;
      case 13:
        (rn(function () {
          var n = Gt(e, 1);
          if (n !== null) {
            var a = He();
            Nt(n, e, 1, a);
          }
        }),
          yc(e, 1));
    }
  }),
    (Vo = function (e) {
      if (e.tag === 13) {
        var t = Gt(e, 134217728);
        if (t !== null) {
          var r = He();
          Nt(t, e, 134217728, r);
        }
        yc(e, 134217728);
      }
    }),
    (fd = function (e) {
      if (e.tag === 13) {
        var t = Nr(e),
          r = Gt(e, t);
        if (r !== null) {
          var n = He();
          Nt(r, e, t, n);
        }
        yc(e, t);
      }
    }),
    (gd = function () {
      return ie;
    }),
    (yd = function (e, t) {
      var r = ie;
      try {
        return ((ie = e), t());
      } finally {
        ie = r;
      }
    }),
    (Io = function (e, t, r) {
      switch (t) {
        case "input":
          if ((No(e, r), (t = r.name), r.type === "radio" && t != null)) {
            for (r = e; r.parentNode; ) r = r.parentNode;
            for (
              r = r.querySelectorAll(
                "input[name=" + JSON.stringify("" + t) + '][type="radio"]'
              ),
                t = 0;
              t < r.length;
              t++
            ) {
              var n = r[t];
              if (n !== e && n.form === e.form) {
                var a = ni(n);
                if (!a) throw Error(E(90));
                (Bu(n), No(n, a));
              }
            }
          }
          break;
        case "textarea":
          Wu(e, r);
          break;
        case "select":
          ((t = r.value), t != null && En(e, !!r.multiple, t, !1));
      }
    }),
    (td = uc),
    (rd = rn));
  var Qy = { usingClientEntryPoint: !1, Events: [Ga, qn, ni, Ju, ed, uc] },
    us = {
      findFiberByHostInstance: Qr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    Zy = {
      bundleType: us.bundleType,
      version: us.version,
      rendererPackageName: us.rendererPackageName,
      rendererConfig: us.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Kt.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = id(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: us.findFiberByHostInstance || Wy,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Bi = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Bi.isDisabled && Bi.supportsFiber)
      try {
        ((Fs = Bi.inject(Zy)), (Pt = Bi));
      } catch {}
  }
  ((st.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Qy),
    (st.createPortal = function (e, t) {
      var r =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!xc(t)) throw Error(E(200));
      return Ky(e, t, null, r);
    }),
    (st.createRoot = function (e, t) {
      if (!xc(e)) throw Error(E(299));
      var r = !1,
        n = "",
        a = Om;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (r = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (a = t.onRecoverableError)),
        (t = gc(e, 1, !1, null, null, r, !1, n, a)),
        (e[Wt] = t.current),
        Ha(e.nodeType === 8 ? e.parentNode : e),
        new vc(t)
      );
    }),
    (st.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(E(188))
          : ((e = Object.keys(e).join(",")), Error(E(268, e)));
      return ((e = id(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (st.flushSync = function (e) {
      return rn(e);
    }),
    (st.hydrate = function (e, t, r) {
      if (!zi(t)) throw Error(E(200));
      return qi(null, e, t, !0, r);
    }),
    (st.hydrateRoot = function (e, t, r) {
      if (!xc(e)) throw Error(E(405));
      var n = (r != null && r.hydratedSources) || null,
        a = !1,
        s = "",
        o = Om;
      if (
        (r != null &&
          (r.unstable_strictMode === !0 && (a = !0),
          r.identifierPrefix !== void 0 && (s = r.identifierPrefix),
          r.onRecoverableError !== void 0 && (o = r.onRecoverableError)),
        (t = Tm(t, null, e, 1, r ?? null, a, !1, s, o)),
        (e[Wt] = t.current),
        Ha(e),
        n)
      )
        for (e = 0; e < n.length; e++)
          ((r = n[e]),
            (a = r._getVersion),
            (a = a(r._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [r, a])
              : t.mutableSourceEagerHydrationData.push(r, a));
      return new Fi(t);
    }),
    (st.render = function (e, t, r) {
      if (!zi(t)) throw Error(E(200));
      return qi(null, e, t, !1, r);
    }),
    (st.unmountComponentAtNode = function (e) {
      if (!zi(e)) throw Error(E(40));
      return e._reactRootContainer
        ? (rn(function () {
            qi(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[Wt] = null));
            });
          }),
          !0)
        : !1;
    }),
    (st.unstable_batchedUpdates = uc),
    (st.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
      if (!zi(r)) throw Error(E(200));
      if (e == null || e._reactInternals === void 0) throw Error(E(38));
      return qi(e, t, r, !1, n);
    }),
    (st.version = "18.3.1-next-f1338f8080-20240426"));
  function Dm() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Dm);
      } catch (e) {
        console.error(e);
      }
  }
  (Dm(), (Eu.exports = st));
  var Gy = Eu.exports,
    Im,
    Mm = Gy;
  ((Im = Mm.createRoot), Mm.hydrateRoot);
  var ta = class {
      constructor() {
        ((this.listeners = new Set()),
          (this.subscribe = this.subscribe.bind(this)));
      }
      subscribe(e) {
        return (
          this.listeners.add(e),
          this.onSubscribe(),
          () => {
            (this.listeners.delete(e), this.onUnsubscribe());
          }
        );
      }
      hasListeners() {
        return this.listeners.size > 0;
      }
      onSubscribe() {}
      onUnsubscribe() {}
    },
    Yy =
      ((uf = class extends ta {
        constructor() {
          super();
          q(this, mn);
          q(this, Dr);
          q(this, ca);
          L(this, ca, (t) => {
            if (typeof window < "u" && window.addEventListener) {
              const r = () => t();
              return (
                window.addEventListener("visibilitychange", r, !1),
                () => {
                  window.removeEventListener("visibilitychange", r);
                }
              );
            }
          });
        }
        onSubscribe() {
          h(this, Dr) || this.setEventListener(h(this, ca));
        }
        onUnsubscribe() {
          var t;
          this.hasListeners() ||
            ((t = h(this, Dr)) == null || t.call(this), L(this, Dr, void 0));
        }
        setEventListener(t) {
          var r;
          (L(this, ca, t),
            (r = h(this, Dr)) == null || r.call(this),
            L(
              this,
              Dr,
              t((n) => {
                typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
              })
            ));
        }
        setFocused(t) {
          h(this, mn) !== t && (L(this, mn, t), this.onFocus());
        }
        onFocus() {
          const t = this.isFocused();
          this.listeners.forEach((r) => {
            r(t);
          });
        }
        isFocused() {
          return typeof h(this, mn) == "boolean"
            ? h(this, mn)
            : globalThis.document?.visibilityState !== "hidden";
        }
      }),
      (mn = new WeakMap()),
      (Dr = new WeakMap()),
      (ca = new WeakMap()),
      uf),
    bc = new Yy(),
    Xy = {
      setTimeout: (e, t) => setTimeout(e, t),
      clearTimeout: (e) => clearTimeout(e),
      setInterval: (e, t) => setInterval(e, t),
      clearInterval: (e) => clearInterval(e),
    },
    Jy =
      ((df = class {
        constructor() {
          q(this, Ir, Xy);
          q(this, su, !1);
        }
        setTimeoutProvider(e) {
          L(this, Ir, e);
        }
        setTimeout(e, t) {
          return h(this, Ir).setTimeout(e, t);
        }
        clearTimeout(e) {
          h(this, Ir).clearTimeout(e);
        }
        setInterval(e, t) {
          return h(this, Ir).setInterval(e, t);
        }
        clearInterval(e) {
          h(this, Ir).clearInterval(e);
        }
      }),
      (Ir = new WeakMap()),
      (su = new WeakMap()),
      df),
    on = new Jy();
  function e0(e) {
    setTimeout(e, 0);
  }
  var t0 = typeof window > "u" || "Deno" in globalThis;
  function Qe() {}
  function r0(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function wc(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0;
  }
  function Fm(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0);
  }
  function Tr(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function vt(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function zm(e, t) {
    const {
      type: r = "all",
      exact: n,
      fetchStatus: a,
      predicate: s,
      queryKey: o,
      stale: l,
    } = e;
    if (o) {
      if (n) {
        if (t.queryHash !== kc(o, t.options)) return !1;
      } else if (!ds(t.queryKey, o)) return !1;
    }
    if (r !== "all") {
      const c = t.isActive();
      if ((r === "active" && !c) || (r === "inactive" && c)) return !1;
    }
    return !(
      (typeof l == "boolean" && t.isStale() !== l) ||
      (a && a !== t.state.fetchStatus) ||
      (s && !s(t))
    );
  }
  function qm(e, t) {
    const { exact: r, status: n, predicate: a, mutationKey: s } = e;
    if (s) {
      if (!t.options.mutationKey) return !1;
      if (r) {
        if (ln(t.options.mutationKey) !== ln(s)) return !1;
      } else if (!ds(t.options.mutationKey, s)) return !1;
    }
    return !((n && t.state.status !== n) || (a && !a(t)));
  }
  function kc(e, t) {
    return (t?.queryKeyHashFn || ln)(e);
  }
  function ln(e) {
    return JSON.stringify(e, (t, r) =>
      Sc(r)
        ? Object.keys(r)
            .sort()
            .reduce((n, a) => ((n[a] = r[a]), n), {})
        : r
    );
  }
  function ds(e, t) {
    return e === t
      ? !0
      : typeof e != typeof t
        ? !1
        : e && t && typeof e == "object" && typeof t == "object"
          ? Object.keys(t).every((r) => ds(e[r], t[r]))
          : !1;
  }
  var n0 = Object.prototype.hasOwnProperty;
  function Bm(e, t, r = 0) {
    if (e === t) return e;
    if (r > 500) return t;
    const n = Um(e) && Um(t);
    if (!n && !(Sc(e) && Sc(t))) return t;
    const s = (n ? e : Object.keys(e)).length,
      o = n ? t : Object.keys(t),
      l = o.length,
      c = n ? new Array(l) : {};
    let u = 0;
    for (let p = 0; p < l; p++) {
      const f = n ? p : o[p],
        m = e[f],
        x = t[f];
      if (m === x) {
        ((c[f] = m), (n ? p < s : n0.call(e, f)) && u++);
        continue;
      }
      if (
        m === null ||
        x === null ||
        typeof m != "object" ||
        typeof x != "object"
      ) {
        c[f] = x;
        continue;
      }
      const v = Bm(m, x, r + 1);
      ((c[f] = v), v === m && u++);
    }
    return s === l && u === s ? e : c;
  }
  function Ui(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const r in e) if (e[r] !== t[r]) return !1;
    return !0;
  }
  function Um(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length;
  }
  function Sc(e) {
    if (!$m(e)) return !1;
    const t = e.constructor;
    if (t === void 0) return !0;
    const r = t.prototype;
    return !(
      !$m(r) ||
      !r.hasOwnProperty("isPrototypeOf") ||
      Object.getPrototypeOf(e) !== Object.prototype
    );
  }
  function $m(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  function a0(e) {
    return new Promise((t) => {
      on.setTimeout(t, e);
    });
  }
  function Cc(e, t, r) {
    return typeof r.structuralSharing == "function"
      ? r.structuralSharing(e, t)
      : r.structuralSharing !== !1
        ? Bm(e, t)
        : t;
  }
  function s0(e, t, r = 0) {
    const n = [...e, t];
    return r && n.length > r ? n.slice(1) : n;
  }
  function i0(e, t, r = 0) {
    const n = [t, ...e];
    return r && n.length > r ? n.slice(0, -1) : n;
  }
  var _c = Symbol();
  function Vm(e, t) {
    return !e.queryFn && t?.initialPromise
      ? () => t.initialPromise
      : !e.queryFn || e.queryFn === _c
        ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
        : e.queryFn;
  }
  function Rc(e, t) {
    return typeof e == "function" ? e(...t) : !!e;
  }
  function o0(e, t, r) {
    let n = !1,
      a;
    return (
      Object.defineProperty(e, "signal", {
        enumerable: !0,
        get: () => (
          a ?? (a = t()),
          n ||
            ((n = !0),
            a.aborted ? r() : a.addEventListener("abort", r, { once: !0 })),
          a
        ),
      }),
      e
    );
  }
  var ps = (() => {
    let e = () => t0;
    return {
      isServer() {
        return e();
      },
      setIsServer(t) {
        e = t;
      },
    };
  })();
  function jc() {
    let e, t;
    const r = new Promise((a, s) => {
      ((e = a), (t = s));
    });
    ((r.status = "pending"), r.catch(() => {}));
    function n(a) {
      (Object.assign(r, a), delete r.resolve, delete r.reject);
    }
    return (
      (r.resolve = (a) => {
        (n({ status: "fulfilled", value: a }), e(a));
      }),
      (r.reject = (a) => {
        (n({ status: "rejected", reason: a }), t(a));
      }),
      r
    );
  }
  var l0 = e0;
  function c0() {
    let e = [],
      t = 0,
      r = (l) => {
        l();
      },
      n = (l) => {
        l();
      },
      a = l0;
    const s = (l) => {
        t
          ? e.push(l)
          : a(() => {
              r(l);
            });
      },
      o = () => {
        const l = e;
        ((e = []),
          l.length &&
            a(() => {
              n(() => {
                l.forEach((c) => {
                  r(c);
                });
              });
            }));
      };
    return {
      batch: (l) => {
        let c;
        t++;
        try {
          c = l();
        } finally {
          (t--, t || o());
        }
        return c;
      },
      batchCalls:
        (l) =>
        (...c) => {
          s(() => {
            l(...c);
          });
        },
      schedule: s,
      setNotifyFunction: (l) => {
        r = l;
      },
      setBatchNotifyFunction: (l) => {
        n = l;
      },
      setScheduler: (l) => {
        a = l;
      },
    };
  }
  var Ee = c0(),
    u0 =
      ((pf = class extends ta {
        constructor() {
          super();
          q(this, ua, !0);
          q(this, Mr);
          q(this, da);
          L(this, da, (t) => {
            if (typeof window < "u" && window.addEventListener) {
              const r = () => t(!0),
                n = () => t(!1);
              return (
                window.addEventListener("online", r, !1),
                window.addEventListener("offline", n, !1),
                () => {
                  (window.removeEventListener("online", r),
                    window.removeEventListener("offline", n));
                }
              );
            }
          });
        }
        onSubscribe() {
          h(this, Mr) || this.setEventListener(h(this, da));
        }
        onUnsubscribe() {
          var t;
          this.hasListeners() ||
            ((t = h(this, Mr)) == null || t.call(this), L(this, Mr, void 0));
        }
        setEventListener(t) {
          var r;
          (L(this, da, t),
            (r = h(this, Mr)) == null || r.call(this),
            L(this, Mr, t(this.setOnline.bind(this))));
        }
        setOnline(t) {
          h(this, ua) !== t &&
            (L(this, ua, t),
            this.listeners.forEach((n) => {
              n(t);
            }));
        }
        isOnline() {
          return h(this, ua);
        }
      }),
      (ua = new WeakMap()),
      (Mr = new WeakMap()),
      (da = new WeakMap()),
      pf),
    $i = new u0();
  function d0(e) {
    return Math.min(1e3 * 2 ** e, 3e4);
  }
  function Km(e) {
    return (e ?? "online") === "online" ? $i.isOnline() : !0;
  }
  var Nc = class extends Error {
    constructor(e) {
      (super("CancelledError"),
        (this.revert = e?.revert),
        (this.silent = e?.silent));
    }
  };
  function Wm(e) {
    let t = !1,
      r = 0,
      n;
    const a = jc(),
      s = () => a.status !== "pending",
      o = (b) => {
        if (!s()) {
          const C = new Nc(b);
          (m(C), e.onCancel?.(C));
        }
      },
      l = () => {
        t = !0;
      },
      c = () => {
        t = !1;
      },
      u = () =>
        bc.isFocused() &&
        (e.networkMode === "always" || $i.isOnline()) &&
        e.canRun(),
      p = () => Km(e.networkMode) && e.canRun(),
      f = (b) => {
        s() || (n?.(), a.resolve(b));
      },
      m = (b) => {
        s() || (n?.(), a.reject(b));
      },
      x = () =>
        new Promise((b) => {
          ((n = (C) => {
            (s() || u()) && b(C);
          }),
            e.onPause?.());
        }).then(() => {
          ((n = void 0), s() || e.onContinue?.());
        }),
      v = () => {
        if (s()) return;
        let b;
        const C = r === 0 ? e.initialPromise : void 0;
        try {
          b = C ?? e.fn();
        } catch (g) {
          b = Promise.reject(g);
        }
        Promise.resolve(b)
          .then(f)
          .catch((g) => {
            if (s()) return;
            const d = e.retry ?? (ps.isServer() ? 0 : 3),
              y = e.retryDelay ?? d0,
              w = typeof y == "function" ? y(r, g) : y,
              _ =
                d === !0 ||
                (typeof d == "number" && r < d) ||
                (typeof d == "function" && d(r, g));
            if (t || !_) {
              m(g);
              return;
            }
            (r++,
              e.onFail?.(r, g),
              a0(w)
                .then(() => (u() ? void 0 : x()))
                .then(() => {
                  t ? m(g) : v();
                }));
          });
      };
    return {
      promise: a,
      status: () => a.status,
      cancel: o,
      continue: () => (n?.(), a),
      cancelRetry: l,
      continueRetry: c,
      canStart: p,
      start: () => (p() ? v() : x().then(v), a),
    };
  }
  var Hm =
      ((mf = class {
        constructor() {
          q(this, hn);
        }
        destroy() {
          this.clearGcTimeout();
        }
        scheduleGc() {
          (this.clearGcTimeout(),
            wc(this.gcTime) &&
              L(
                this,
                hn,
                on.setTimeout(() => {
                  this.optionalRemove();
                }, this.gcTime)
              ));
        }
        updateGcTime(e) {
          this.gcTime = Math.max(
            this.gcTime || 0,
            e ?? (ps.isServer() ? 1 / 0 : 300 * 1e3)
          );
        }
        clearGcTimeout() {
          h(this, hn) && (on.clearTimeout(h(this, hn)), L(this, hn, void 0));
        }
      }),
      (hn = new WeakMap()),
      mf),
    p0 =
      ((hf = class extends Hm {
        constructor(t) {
          super();
          q(this, dt);
          q(this, fn);
          q(this, pa);
          q(this, wt);
          q(this, gn);
          q(this, Le);
          q(this, vs);
          q(this, yn);
          (L(this, yn, !1),
            L(this, vs, t.defaultOptions),
            this.setOptions(t.options),
            (this.observers = []),
            L(this, gn, t.client),
            L(this, wt, h(this, gn).getQueryCache()),
            (this.queryKey = t.queryKey),
            (this.queryHash = t.queryHash),
            L(this, fn, Gm(this.options)),
            (this.state = t.state ?? h(this, fn)),
            this.scheduleGc());
        }
        get meta() {
          return this.options.meta;
        }
        get promise() {
          return h(this, Le)?.promise;
        }
        setOptions(t) {
          if (
            ((this.options = { ...h(this, vs), ...t }),
            this.updateGcTime(this.options.gcTime),
            this.state && this.state.data === void 0)
          ) {
            const r = Gm(this.options);
            r.data !== void 0 &&
              (this.setState(Zm(r.data, r.dataUpdatedAt)), L(this, fn, r));
          }
        }
        optionalRemove() {
          !this.observers.length &&
            this.state.fetchStatus === "idle" &&
            h(this, wt).remove(this);
        }
        setData(t, r) {
          const n = Cc(this.state.data, t, this.options);
          return (
            Q(this, dt, ur).call(this, {
              data: n,
              type: "success",
              dataUpdatedAt: r?.updatedAt,
              manual: r?.manual,
            }),
            n
          );
        }
        setState(t, r) {
          Q(this, dt, ur).call(this, {
            type: "setState",
            state: t,
            setStateOptions: r,
          });
        }
        cancel(t) {
          const r = h(this, Le)?.promise;
          return (
            h(this, Le)?.cancel(t),
            r ? r.then(Qe).catch(Qe) : Promise.resolve()
          );
        }
        destroy() {
          (super.destroy(), this.cancel({ silent: !0 }));
        }
        get resetState() {
          return h(this, fn);
        }
        reset() {
          (this.destroy(), this.setState(this.resetState));
        }
        isActive() {
          return this.observers.some((t) => vt(t.options.enabled, this) !== !1);
        }
        isDisabled() {
          return this.getObserversCount() > 0
            ? !this.isActive()
            : this.options.queryFn === _c || !this.isFetched();
        }
        isFetched() {
          return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
        }
        isStatic() {
          return this.getObserversCount() > 0
            ? this.observers.some(
                (t) => Tr(t.options.staleTime, this) === "static"
              )
            : !1;
        }
        isStale() {
          return this.getObserversCount() > 0
            ? this.observers.some((t) => t.getCurrentResult().isStale)
            : this.state.data === void 0 || this.state.isInvalidated;
        }
        isStaleByTime(t = 0) {
          return this.state.data === void 0
            ? !0
            : t === "static"
              ? !1
              : this.state.isInvalidated
                ? !0
                : !Fm(this.state.dataUpdatedAt, t);
        }
        onFocus() {
          (this.observers
            .find((r) => r.shouldFetchOnWindowFocus())
            ?.refetch({ cancelRefetch: !1 }),
            h(this, Le)?.continue());
        }
        onOnline() {
          (this.observers
            .find((r) => r.shouldFetchOnReconnect())
            ?.refetch({ cancelRefetch: !1 }),
            h(this, Le)?.continue());
        }
        addObserver(t) {
          this.observers.includes(t) ||
            (this.observers.push(t),
            this.clearGcTimeout(),
            h(this, wt).notify({
              type: "observerAdded",
              query: this,
              observer: t,
            }));
        }
        removeObserver(t) {
          this.observers.includes(t) &&
            ((this.observers = this.observers.filter((r) => r !== t)),
            this.observers.length ||
              (h(this, Le) &&
                (h(this, yn) || Q(this, dt, kf).call(this)
                  ? h(this, Le).cancel({ revert: !0 })
                  : h(this, Le).cancelRetry()),
              this.scheduleGc()),
            h(this, wt).notify({
              type: "observerRemoved",
              query: this,
              observer: t,
            }));
        }
        getObserversCount() {
          return this.observers.length;
        }
        invalidate() {
          this.state.isInvalidated ||
            Q(this, dt, ur).call(this, { type: "invalidate" });
        }
        async fetch(t, r) {
          if (
            this.state.fetchStatus !== "idle" &&
            h(this, Le)?.status() !== "rejected"
          ) {
            if (this.state.data !== void 0 && r?.cancelRefetch)
              this.cancel({ silent: !0 });
            else if (h(this, Le))
              return (h(this, Le).continueRetry(), h(this, Le).promise);
          }
          if ((t && this.setOptions(t), !this.options.queryFn)) {
            const c = this.observers.find((u) => u.options.queryFn);
            c && this.setOptions(c.options);
          }
          const n = new AbortController(),
            a = (c) => {
              Object.defineProperty(c, "signal", {
                enumerable: !0,
                get: () => (L(this, yn, !0), n.signal),
              });
            },
            s = () => {
              const c = Vm(this.options, r),
                p = (() => {
                  const f = {
                    client: h(this, gn),
                    queryKey: this.queryKey,
                    meta: this.meta,
                  };
                  return (a(f), f);
                })();
              return (
                L(this, yn, !1),
                this.options.persister
                  ? this.options.persister(c, p, this)
                  : c(p)
              );
            },
            l = (() => {
              const c = {
                fetchOptions: r,
                options: this.options,
                queryKey: this.queryKey,
                client: h(this, gn),
                state: this.state,
                fetchFn: s,
              };
              return (a(c), c);
            })();
          (this.options.behavior?.onFetch(l, this),
            L(this, pa, this.state),
            (this.state.fetchStatus === "idle" ||
              this.state.fetchMeta !== l.fetchOptions?.meta) &&
              Q(this, dt, ur).call(this, {
                type: "fetch",
                meta: l.fetchOptions?.meta,
              }),
            L(
              this,
              Le,
              Wm({
                initialPromise: r?.initialPromise,
                fn: l.fetchFn,
                onCancel: (c) => {
                  (c instanceof Nc &&
                    c.revert &&
                    this.setState({ ...h(this, pa), fetchStatus: "idle" }),
                    n.abort());
                },
                onFail: (c, u) => {
                  Q(this, dt, ur).call(this, {
                    type: "failed",
                    failureCount: c,
                    error: u,
                  });
                },
                onPause: () => {
                  Q(this, dt, ur).call(this, { type: "pause" });
                },
                onContinue: () => {
                  Q(this, dt, ur).call(this, { type: "continue" });
                },
                retry: l.options.retry,
                retryDelay: l.options.retryDelay,
                networkMode: l.options.networkMode,
                canRun: () => !0,
              })
            ));
          try {
            const c = await h(this, Le).start();
            if (c === void 0)
              throw new Error(`${this.queryHash} data is undefined`);
            return (
              this.setData(c),
              h(this, wt).config.onSuccess?.(c, this),
              h(this, wt).config.onSettled?.(c, this.state.error, this),
              c
            );
          } catch (c) {
            if (c instanceof Nc) {
              if (c.silent) return h(this, Le).promise;
              if (c.revert) {
                if (this.state.data === void 0) throw c;
                return this.state.data;
              }
            }
            throw (
              Q(this, dt, ur).call(this, { type: "error", error: c }),
              h(this, wt).config.onError?.(c, this),
              h(this, wt).config.onSettled?.(this.state.data, c, this),
              c
            );
          } finally {
            this.scheduleGc();
          }
        }
      }),
      (fn = new WeakMap()),
      (pa = new WeakMap()),
      (wt = new WeakMap()),
      (gn = new WeakMap()),
      (Le = new WeakMap()),
      (vs = new WeakMap()),
      (yn = new WeakMap()),
      (dt = new WeakSet()),
      (kf = function () {
        return (
          this.state.fetchStatus === "paused" && this.state.status === "pending"
        );
      }),
      (ur = function (t) {
        const r = (n) => {
          switch (t.type) {
            case "failed":
              return {
                ...n,
                fetchFailureCount: t.failureCount,
                fetchFailureReason: t.error,
              };
            case "pause":
              return { ...n, fetchStatus: "paused" };
            case "continue":
              return { ...n, fetchStatus: "fetching" };
            case "fetch":
              return {
                ...n,
                ...Qm(n.data, this.options),
                fetchMeta: t.meta ?? null,
              };
            case "success":
              const a = {
                ...n,
                ...Zm(t.data, t.dataUpdatedAt),
                dataUpdateCount: n.dataUpdateCount + 1,
                ...(!t.manual && {
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              };
              return (L(this, pa, t.manual ? a : void 0), a);
            case "error":
              const s = t.error;
              return {
                ...n,
                error: s,
                errorUpdateCount: n.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: n.fetchFailureCount + 1,
                fetchFailureReason: s,
                fetchStatus: "idle",
                status: "error",
                isInvalidated: !0,
              };
            case "invalidate":
              return { ...n, isInvalidated: !0 };
            case "setState":
              return { ...n, ...t.state };
          }
        };
        ((this.state = r(this.state)),
          Ee.batch(() => {
            (this.observers.forEach((n) => {
              n.onQueryUpdate();
            }),
              h(this, wt).notify({ query: this, type: "updated", action: t }));
          }));
      }),
      hf);
  function Qm(e, t) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: Km(t.networkMode) ? "fetching" : "paused",
      ...(e === void 0 && { error: null, status: "pending" }),
    };
  }
  function Zm(e, t) {
    return {
      data: e,
      dataUpdatedAt: t ?? Date.now(),
      error: null,
      isInvalidated: !1,
      status: "success",
    };
  }
  function Gm(e) {
    const t =
        typeof e.initialData == "function" ? e.initialData() : e.initialData,
      r = t !== void 0,
      n = r
        ? typeof e.initialDataUpdatedAt == "function"
          ? e.initialDataUpdatedAt()
          : e.initialDataUpdatedAt
        : 0;
    return {
      data: t,
      dataUpdateCount: 0,
      dataUpdatedAt: r ? (n ?? Date.now()) : 0,
      error: null,
      errorUpdateCount: 0,
      errorUpdatedAt: 0,
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchMeta: null,
      isInvalidated: !1,
      status: r ? "success" : "pending",
      fetchStatus: "idle",
    };
  }
  var m0 =
    ((ff = class extends ta {
      constructor(t, r) {
        super();
        q(this, ae);
        q(this, rt);
        q(this, ee);
        q(this, xs);
        q(this, Ge);
        q(this, vn);
        q(this, ma);
        q(this, sr);
        q(this, Fr);
        q(this, bs);
        q(this, ha);
        q(this, fa);
        q(this, xn);
        q(this, bn);
        q(this, zr);
        q(this, ga, new Set());
        ((this.options = r),
          L(this, rt, t),
          L(this, Fr, null),
          L(this, sr, jc()),
          this.bindMethods(),
          this.setOptions(r));
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (h(this, ee).addObserver(this),
          Ym(h(this, ee), this.options)
            ? Q(this, ae, Rs).call(this)
            : this.updateResult(),
          Q(this, ae, du).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return Ac(h(this, ee), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return Ac(h(this, ee), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        ((this.listeners = new Set()),
          Q(this, ae, pu).call(this),
          Q(this, ae, mu).call(this),
          h(this, ee).removeObserver(this));
      }
      setOptions(t) {
        const r = this.options,
          n = h(this, ee);
        if (
          ((this.options = h(this, rt).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof vt(this.options.enabled, h(this, ee)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean"
          );
        (Q(this, ae, hu).call(this),
          h(this, ee).setOptions(this.options),
          r._defaulted &&
            !Ui(this.options, r) &&
            h(this, rt)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: h(this, ee),
                observer: this,
              }));
        const a = this.hasListeners();
        (a && Xm(h(this, ee), n, this.options, r) && Q(this, ae, Rs).call(this),
          this.updateResult(),
          a &&
            (h(this, ee) !== n ||
              vt(this.options.enabled, h(this, ee)) !==
                vt(r.enabled, h(this, ee)) ||
              Tr(this.options.staleTime, h(this, ee)) !==
                Tr(r.staleTime, h(this, ee))) &&
            Q(this, ae, lu).call(this));
        const s = Q(this, ae, cu).call(this);
        a &&
          (h(this, ee) !== n ||
            vt(this.options.enabled, h(this, ee)) !==
              vt(r.enabled, h(this, ee)) ||
            s !== h(this, zr)) &&
          Q(this, ae, uu).call(this, s);
      }
      getOptimisticResult(t) {
        const r = h(this, rt).getQueryCache().build(h(this, rt), t),
          n = this.createResult(r, t);
        return (
          f0(this, n) &&
            (L(this, Ge, n),
            L(this, ma, this.options),
            L(this, vn, h(this, ee).state)),
          n
        );
      }
      getCurrentResult() {
        return h(this, Ge);
      }
      trackResult(t, r) {
        return new Proxy(t, {
          get: (n, a) => (
            this.trackProp(a),
            r?.(a),
            a === "promise" &&
              (this.trackProp("data"),
              !this.options.experimental_prefetchInRender &&
                h(this, sr).status === "pending" &&
                h(this, sr).reject(
                  new Error(
                    "experimental_prefetchInRender feature flag is not enabled"
                  )
                )),
            Reflect.get(n, a)
          ),
        });
      }
      trackProp(t) {
        h(this, ga).add(t);
      }
      getCurrentQuery() {
        return h(this, ee);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const r = h(this, rt).defaultQueryOptions(t),
          n = h(this, rt).getQueryCache().build(h(this, rt), r);
        return n.fetch().then(() => this.createResult(n, r));
      }
      fetch(t) {
        return Q(this, ae, Rs)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), h(this, Ge)));
      }
      createResult(t, r) {
        const n = h(this, ee),
          a = this.options,
          s = h(this, Ge),
          o = h(this, vn),
          l = h(this, ma),
          u = t !== n ? t.state : h(this, xs),
          { state: p } = t;
        let f = { ...p },
          m = !1,
          x;
        if (r._optimisticResults) {
          const S = this.hasListeners(),
            O = !S && Ym(t, r),
            $ = S && Xm(t, n, r, a);
          ((O || $) && (f = { ...f, ...Qm(p.data, t.options) }),
            r._optimisticResults === "isRestoring" && (f.fetchStatus = "idle"));
        }
        let { error: v, errorUpdatedAt: b, status: C } = f;
        x = f.data;
        let g = !1;
        if (r.placeholderData !== void 0 && x === void 0 && C === "pending") {
          let S;
          (s?.isPlaceholderData && r.placeholderData === l?.placeholderData
            ? ((S = s.data), (g = !0))
            : (S =
                typeof r.placeholderData == "function"
                  ? r.placeholderData(h(this, fa)?.state.data, h(this, fa))
                  : r.placeholderData),
            S !== void 0 &&
              ((C = "success"), (x = Cc(s?.data, S, r)), (m = !0)));
        }
        if (r.select && x !== void 0 && !g)
          if (s && x === o?.data && r.select === h(this, bs)) x = h(this, ha);
          else
            try {
              (L(this, bs, r.select),
                (x = r.select(x)),
                (x = Cc(s?.data, x, r)),
                L(this, ha, x),
                L(this, Fr, null));
            } catch (S) {
              L(this, Fr, S);
            }
        h(this, Fr) &&
          ((v = h(this, Fr)),
          (x = h(this, ha)),
          (b = Date.now()),
          (C = "error"));
        const d = f.fetchStatus === "fetching",
          y = C === "pending",
          w = C === "error",
          _ = y && d,
          A = x !== void 0,
          T = {
            status: C,
            fetchStatus: f.fetchStatus,
            isPending: y,
            isSuccess: C === "success",
            isError: w,
            isInitialLoading: _,
            isLoading: _,
            data: x,
            dataUpdatedAt: f.dataUpdatedAt,
            error: v,
            errorUpdatedAt: b,
            failureCount: f.fetchFailureCount,
            failureReason: f.fetchFailureReason,
            errorUpdateCount: f.errorUpdateCount,
            isFetched: t.isFetched(),
            isFetchedAfterMount:
              f.dataUpdateCount > u.dataUpdateCount ||
              f.errorUpdateCount > u.errorUpdateCount,
            isFetching: d,
            isRefetching: d && !y,
            isLoadingError: w && !A,
            isPaused: f.fetchStatus === "paused",
            isPlaceholderData: m,
            isRefetchError: w && A,
            isStale: Ec(t, r),
            refetch: this.refetch,
            promise: h(this, sr),
            isEnabled: vt(r.enabled, t) !== !1,
          };
        if (this.options.experimental_prefetchInRender) {
          const S = T.data !== void 0,
            O = T.status === "error" && !S,
            $ = (Se) => {
              O ? Se.reject(T.error) : S && Se.resolve(T.data);
            },
            J = () => {
              const Se = L(this, sr, (T.promise = jc()));
              $(Se);
            },
            U = h(this, sr);
          switch (U.status) {
            case "pending":
              t.queryHash === n.queryHash && $(U);
              break;
            case "fulfilled":
              (O || T.data !== U.value) && J();
              break;
            case "rejected":
              (!O || T.error !== U.reason) && J();
              break;
          }
        }
        return T;
      }
      updateResult() {
        const t = h(this, Ge),
          r = this.createResult(h(this, ee), this.options);
        if (
          (L(this, vn, h(this, ee).state),
          L(this, ma, this.options),
          h(this, vn).data !== void 0 && L(this, fa, h(this, ee)),
          Ui(r, t))
        )
          return;
        L(this, Ge, r);
        const n = () => {
          if (!t) return !0;
          const { notifyOnChangeProps: a } = this.options,
            s = typeof a == "function" ? a() : a;
          if (s === "all" || (!s && !h(this, ga).size)) return !0;
          const o = new Set(s ?? h(this, ga));
          return (
            this.options.throwOnError && o.add("error"),
            Object.keys(h(this, Ge)).some((l) => {
              const c = l;
              return h(this, Ge)[c] !== t[c] && o.has(c);
            })
          );
        };
        Q(this, ae, Sf).call(this, { listeners: n() });
      }
      onQueryUpdate() {
        (this.updateResult(),
          this.hasListeners() && Q(this, ae, du).call(this));
      }
    }),
    (rt = new WeakMap()),
    (ee = new WeakMap()),
    (xs = new WeakMap()),
    (Ge = new WeakMap()),
    (vn = new WeakMap()),
    (ma = new WeakMap()),
    (sr = new WeakMap()),
    (Fr = new WeakMap()),
    (bs = new WeakMap()),
    (ha = new WeakMap()),
    (fa = new WeakMap()),
    (xn = new WeakMap()),
    (bn = new WeakMap()),
    (zr = new WeakMap()),
    (ga = new WeakMap()),
    (ae = new WeakSet()),
    (Rs = function (t) {
      Q(this, ae, hu).call(this);
      let r = h(this, ee).fetch(this.options, t);
      return (t?.throwOnError || (r = r.catch(Qe)), r);
    }),
    (lu = function () {
      Q(this, ae, pu).call(this);
      const t = Tr(this.options.staleTime, h(this, ee));
      if (ps.isServer() || h(this, Ge).isStale || !wc(t)) return;
      const n = Fm(h(this, Ge).dataUpdatedAt, t) + 1;
      L(
        this,
        xn,
        on.setTimeout(() => {
          h(this, Ge).isStale || this.updateResult();
        }, n)
      );
    }),
    (cu = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(h(this, ee))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (uu = function (t) {
      (Q(this, ae, mu).call(this),
        L(this, zr, t),
        !(
          ps.isServer() ||
          vt(this.options.enabled, h(this, ee)) === !1 ||
          !wc(h(this, zr)) ||
          h(this, zr) === 0
        ) &&
          L(
            this,
            bn,
            on.setInterval(
              () => {
                (this.options.refetchIntervalInBackground || bc.isFocused()) &&
                  Q(this, ae, Rs).call(this);
              },
              h(this, zr)
            )
          ));
    }),
    (du = function () {
      (Q(this, ae, lu).call(this),
        Q(this, ae, uu).call(this, Q(this, ae, cu).call(this)));
    }),
    (pu = function () {
      h(this, xn) && (on.clearTimeout(h(this, xn)), L(this, xn, void 0));
    }),
    (mu = function () {
      h(this, bn) && (on.clearInterval(h(this, bn)), L(this, bn, void 0));
    }),
    (hu = function () {
      const t = h(this, rt).getQueryCache().build(h(this, rt), this.options);
      if (t === h(this, ee)) return;
      const r = h(this, ee);
      (L(this, ee, t),
        L(this, xs, t.state),
        this.hasListeners() && (r?.removeObserver(this), t.addObserver(this)));
    }),
    (Sf = function (t) {
      Ee.batch(() => {
        (t.listeners &&
          this.listeners.forEach((r) => {
            r(h(this, Ge));
          }),
          h(this, rt)
            .getQueryCache()
            .notify({ query: h(this, ee), type: "observerResultsUpdated" }));
      });
    }),
    ff);
  function h0(e, t) {
    return (
      vt(t.enabled, e) !== !1 &&
      e.state.data === void 0 &&
      !(e.state.status === "error" && t.retryOnMount === !1)
    );
  }
  function Ym(e, t) {
    return h0(e, t) || (e.state.data !== void 0 && Ac(e, t, t.refetchOnMount));
  }
  function Ac(e, t, r) {
    if (vt(t.enabled, e) !== !1 && Tr(t.staleTime, e) !== "static") {
      const n = typeof r == "function" ? r(e) : r;
      return n === "always" || (n !== !1 && Ec(e, t));
    }
    return !1;
  }
  function Xm(e, t, r, n) {
    return (
      (e !== t || vt(n.enabled, e) === !1) &&
      (!r.suspense || e.state.status !== "error") &&
      Ec(e, r)
    );
  }
  function Ec(e, t) {
    return vt(t.enabled, e) !== !1 && e.isStaleByTime(Tr(t.staleTime, e));
  }
  function f0(e, t) {
    return !Ui(e.getCurrentResult(), t);
  }
  function Jm(e) {
    return {
      onFetch: (t, r) => {
        const n = t.options,
          a = t.fetchOptions?.meta?.fetchMore?.direction,
          s = t.state.data?.pages || [],
          o = t.state.data?.pageParams || [];
        let l = { pages: [], pageParams: [] },
          c = 0;
        const u = async () => {
          let p = !1;
          const f = (v) => {
              o0(
                v,
                () => t.signal,
                () => (p = !0)
              );
            },
            m = Vm(t.options, t.fetchOptions),
            x = async (v, b, C) => {
              if (p) return Promise.reject();
              if (b == null && v.pages.length) return Promise.resolve(v);
              const d = (() => {
                  const A = {
                    client: t.client,
                    queryKey: t.queryKey,
                    pageParam: b,
                    direction: C ? "backward" : "forward",
                    meta: t.options.meta,
                  };
                  return (f(A), A);
                })(),
                y = await m(d),
                { maxPages: w } = t.options,
                _ = C ? i0 : s0;
              return {
                pages: _(v.pages, y, w),
                pageParams: _(v.pageParams, b, w),
              };
            };
          if (a && s.length) {
            const v = a === "backward",
              b = v ? g0 : eh,
              C = { pages: s, pageParams: o },
              g = b(n, C);
            l = await x(C, g, v);
          } else {
            const v = e ?? s.length;
            do {
              const b = c === 0 ? (o[0] ?? n.initialPageParam) : eh(n, l);
              if (c > 0 && b == null) break;
              ((l = await x(l, b)), c++);
            } while (c < v);
          }
          return l;
        };
        t.options.persister
          ? (t.fetchFn = () =>
              t.options.persister?.(
                u,
                {
                  client: t.client,
                  queryKey: t.queryKey,
                  meta: t.options.meta,
                  signal: t.signal,
                },
                r
              ))
          : (t.fetchFn = u);
      },
    };
  }
  function eh(e, { pages: t, pageParams: r }) {
    const n = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[n], t, r[n], r) : void 0;
  }
  function g0(e, { pages: t, pageParams: r }) {
    return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, r[0], r) : void 0;
  }
  var y0 =
    ((gf = class extends Hm {
      constructor(t) {
        super();
        q(this, Bt);
        q(this, ws);
        q(this, qt);
        q(this, $e);
        q(this, wn);
        (L(this, ws, t.client),
          (this.mutationId = t.mutationId),
          L(this, $e, t.mutationCache),
          L(this, qt, []),
          (this.state = t.state || th()),
          this.setOptions(t.options),
          this.scheduleGc());
      }
      setOptions(t) {
        ((this.options = t), this.updateGcTime(this.options.gcTime));
      }
      get meta() {
        return this.options.meta;
      }
      addObserver(t) {
        h(this, qt).includes(t) ||
          (h(this, qt).push(t),
          this.clearGcTimeout(),
          h(this, $e).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        (L(
          this,
          qt,
          h(this, qt).filter((r) => r !== t)
        ),
          this.scheduleGc(),
          h(this, $e).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          }));
      }
      optionalRemove() {
        h(this, qt).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : h(this, $e).remove(this));
      }
      continue() {
        return h(this, wn)?.continue() ?? this.execute(this.state.variables);
      }
      async execute(t) {
        const r = () => {
            Q(this, Bt, Kr).call(this, { type: "continue" });
          },
          n = {
            client: h(this, ws),
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        L(
          this,
          wn,
          Wm({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t, n)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (o, l) => {
              Q(this, Bt, Kr).call(this, {
                type: "failed",
                failureCount: o,
                error: l,
              });
            },
            onPause: () => {
              Q(this, Bt, Kr).call(this, { type: "pause" });
            },
            onContinue: r,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => h(this, $e).canRun(this),
          })
        );
        const a = this.state.status === "pending",
          s = !h(this, wn).canStart();
        try {
          if (a) r();
          else {
            (Q(this, Bt, Kr).call(this, {
              type: "pending",
              variables: t,
              isPaused: s,
            }),
              h(this, $e).config.onMutate &&
                (await h(this, $e).config.onMutate(t, this, n)));
            const l = await this.options.onMutate?.(t, n);
            l !== this.state.context &&
              Q(this, Bt, Kr).call(this, {
                type: "pending",
                context: l,
                variables: t,
                isPaused: s,
              });
          }
          const o = await h(this, wn).start();
          return (
            await h(this, $e).config.onSuccess?.(
              o,
              t,
              this.state.context,
              this,
              n
            ),
            await this.options.onSuccess?.(o, t, this.state.context, n),
            await h(this, $e).config.onSettled?.(
              o,
              null,
              this.state.variables,
              this.state.context,
              this,
              n
            ),
            await this.options.onSettled?.(o, null, t, this.state.context, n),
            Q(this, Bt, Kr).call(this, { type: "success", data: o }),
            o
          );
        } catch (o) {
          try {
            await h(this, $e).config.onError?.(
              o,
              t,
              this.state.context,
              this,
              n
            );
          } catch (l) {
            Promise.reject(l);
          }
          try {
            await this.options.onError?.(o, t, this.state.context, n);
          } catch (l) {
            Promise.reject(l);
          }
          try {
            await h(this, $e).config.onSettled?.(
              void 0,
              o,
              this.state.variables,
              this.state.context,
              this,
              n
            );
          } catch (l) {
            Promise.reject(l);
          }
          try {
            await this.options.onSettled?.(void 0, o, t, this.state.context, n);
          } catch (l) {
            Promise.reject(l);
          }
          throw (Q(this, Bt, Kr).call(this, { type: "error", error: o }), o);
        } finally {
          h(this, $e).runNext(this);
        }
      }
    }),
    (ws = new WeakMap()),
    (qt = new WeakMap()),
    ($e = new WeakMap()),
    (wn = new WeakMap()),
    (Bt = new WeakSet()),
    (Kr = function (t) {
      const r = (n) => {
        switch (t.type) {
          case "failed":
            return {
              ...n,
              failureCount: t.failureCount,
              failureReason: t.error,
            };
          case "pause":
            return { ...n, isPaused: !0 };
          case "continue":
            return { ...n, isPaused: !1 };
          case "pending":
            return {
              ...n,
              context: t.context,
              data: void 0,
              failureCount: 0,
              failureReason: null,
              error: null,
              isPaused: t.isPaused,
              status: "pending",
              variables: t.variables,
              submittedAt: Date.now(),
            };
          case "success":
            return {
              ...n,
              data: t.data,
              failureCount: 0,
              failureReason: null,
              error: null,
              status: "success",
              isPaused: !1,
            };
          case "error":
            return {
              ...n,
              data: void 0,
              error: t.error,
              failureCount: n.failureCount + 1,
              failureReason: t.error,
              isPaused: !1,
              status: "error",
            };
        }
      };
      ((this.state = r(this.state)),
        Ee.batch(() => {
          (h(this, qt).forEach((n) => {
            n.onMutationUpdate(t);
          }),
            h(this, $e).notify({ mutation: this, type: "updated", action: t }));
        }));
    }),
    gf);
  function th() {
    return {
      context: void 0,
      data: void 0,
      error: null,
      failureCount: 0,
      failureReason: null,
      isPaused: !1,
      status: "idle",
      variables: void 0,
      submittedAt: 0,
    };
  }
  var v0 =
    ((yf = class extends ta {
      constructor(t = {}) {
        super();
        q(this, ir);
        q(this, Et);
        q(this, ks);
        ((this.config = t),
          L(this, ir, new Set()),
          L(this, Et, new Map()),
          L(this, ks, 0));
      }
      build(t, r, n) {
        const a = new y0({
          client: t,
          mutationCache: this,
          mutationId: ++so(this, ks)._,
          options: t.defaultMutationOptions(r),
          state: n,
        });
        return (this.add(a), a);
      }
      add(t) {
        h(this, ir).add(t);
        const r = Vi(t);
        if (typeof r == "string") {
          const n = h(this, Et).get(r);
          n ? n.push(t) : h(this, Et).set(r, [t]);
        }
        this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        if (h(this, ir).delete(t)) {
          const r = Vi(t);
          if (typeof r == "string") {
            const n = h(this, Et).get(r);
            if (n)
              if (n.length > 1) {
                const a = n.indexOf(t);
                a !== -1 && n.splice(a, 1);
              } else n[0] === t && h(this, Et).delete(r);
          }
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        const r = Vi(t);
        if (typeof r == "string") {
          const a = h(this, Et)
            .get(r)
            ?.find((s) => s.state.status === "pending");
          return !a || a === t;
        } else return !0;
      }
      runNext(t) {
        const r = Vi(t);
        return typeof r == "string"
          ? (h(this, Et)
              .get(r)
              ?.find((a) => a !== t && a.state.isPaused)
              ?.continue() ?? Promise.resolve())
          : Promise.resolve();
      }
      clear() {
        Ee.batch(() => {
          (h(this, ir).forEach((t) => {
            this.notify({ type: "removed", mutation: t });
          }),
            h(this, ir).clear(),
            h(this, Et).clear());
        });
      }
      getAll() {
        return Array.from(h(this, ir));
      }
      find(t) {
        const r = { exact: !0, ...t };
        return this.getAll().find((n) => qm(r, n));
      }
      findAll(t = {}) {
        return this.getAll().filter((r) => qm(t, r));
      }
      notify(t) {
        Ee.batch(() => {
          this.listeners.forEach((r) => {
            r(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((r) => r.state.isPaused);
        return Ee.batch(() =>
          Promise.all(t.map((r) => r.continue().catch(Qe)))
        );
      }
    }),
    (ir = new WeakMap()),
    (Et = new WeakMap()),
    (ks = new WeakMap()),
    yf);
  function Vi(e) {
    return e.options.scope?.id;
  }
  var x0 =
      ((vf = class extends ta {
        constructor(t, r) {
          super();
          q(this, cr);
          q(this, or);
          q(this, qr);
          q(this, nt);
          q(this, lr);
          (L(this, or, t),
            this.setOptions(r),
            this.bindMethods(),
            Q(this, cr, io).call(this));
        }
        bindMethods() {
          ((this.mutate = this.mutate.bind(this)),
            (this.reset = this.reset.bind(this)));
        }
        setOptions(t) {
          const r = this.options;
          ((this.options = h(this, or).defaultMutationOptions(t)),
            Ui(this.options, r) ||
              h(this, or)
                .getMutationCache()
                .notify({
                  type: "observerOptionsUpdated",
                  mutation: h(this, nt),
                  observer: this,
                }),
            r?.mutationKey &&
            this.options.mutationKey &&
            ln(r.mutationKey) !== ln(this.options.mutationKey)
              ? this.reset()
              : h(this, nt)?.state.status === "pending" &&
                h(this, nt).setOptions(this.options));
        }
        onUnsubscribe() {
          this.hasListeners() || h(this, nt)?.removeObserver(this);
        }
        onMutationUpdate(t) {
          (Q(this, cr, io).call(this), Q(this, cr, fu).call(this, t));
        }
        getCurrentResult() {
          return h(this, qr);
        }
        reset() {
          (h(this, nt)?.removeObserver(this),
            L(this, nt, void 0),
            Q(this, cr, io).call(this),
            Q(this, cr, fu).call(this));
        }
        mutate(t, r) {
          return (
            L(this, lr, r),
            h(this, nt)?.removeObserver(this),
            L(
              this,
              nt,
              h(this, or).getMutationCache().build(h(this, or), this.options)
            ),
            h(this, nt).addObserver(this),
            h(this, nt).execute(t)
          );
        }
      }),
      (or = new WeakMap()),
      (qr = new WeakMap()),
      (nt = new WeakMap()),
      (lr = new WeakMap()),
      (cr = new WeakSet()),
      (io = function () {
        const t = h(this, nt)?.state ?? th();
        L(this, qr, {
          ...t,
          isPending: t.status === "pending",
          isSuccess: t.status === "success",
          isError: t.status === "error",
          isIdle: t.status === "idle",
          mutate: this.mutate,
          reset: this.reset,
        });
      }),
      (fu = function (t) {
        Ee.batch(() => {
          if (h(this, lr) && this.hasListeners()) {
            const r = h(this, qr).variables,
              n = h(this, qr).context,
              a = {
                client: h(this, or),
                meta: this.options.meta,
                mutationKey: this.options.mutationKey,
              };
            if (t?.type === "success") {
              try {
                h(this, lr).onSuccess?.(t.data, r, n, a);
              } catch (s) {
                Promise.reject(s);
              }
              try {
                h(this, lr).onSettled?.(t.data, null, r, n, a);
              } catch (s) {
                Promise.reject(s);
              }
            } else if (t?.type === "error") {
              try {
                h(this, lr).onError?.(t.error, r, n, a);
              } catch (s) {
                Promise.reject(s);
              }
              try {
                h(this, lr).onSettled?.(void 0, t.error, r, n, a);
              } catch (s) {
                Promise.reject(s);
              }
            }
          }
          this.listeners.forEach((r) => {
            r(h(this, qr));
          });
        });
      }),
      vf),
    b0 =
      ((xf = class extends ta {
        constructor(t = {}) {
          super();
          q(this, Ut);
          ((this.config = t), L(this, Ut, new Map()));
        }
        build(t, r, n) {
          const a = r.queryKey,
            s = r.queryHash ?? kc(a, r);
          let o = this.get(s);
          return (
            o ||
              ((o = new p0({
                client: t,
                queryKey: a,
                queryHash: s,
                options: t.defaultQueryOptions(r),
                state: n,
                defaultOptions: t.getQueryDefaults(a),
              })),
              this.add(o)),
            o
          );
        }
        add(t) {
          h(this, Ut).has(t.queryHash) ||
            (h(this, Ut).set(t.queryHash, t),
            this.notify({ type: "added", query: t }));
        }
        remove(t) {
          const r = h(this, Ut).get(t.queryHash);
          r &&
            (t.destroy(),
            r === t && h(this, Ut).delete(t.queryHash),
            this.notify({ type: "removed", query: t }));
        }
        clear() {
          Ee.batch(() => {
            this.getAll().forEach((t) => {
              this.remove(t);
            });
          });
        }
        get(t) {
          return h(this, Ut).get(t);
        }
        getAll() {
          return [...h(this, Ut).values()];
        }
        find(t) {
          const r = { exact: !0, ...t };
          return this.getAll().find((n) => zm(r, n));
        }
        findAll(t = {}) {
          const r = this.getAll();
          return Object.keys(t).length > 0 ? r.filter((n) => zm(t, n)) : r;
        }
        notify(t) {
          Ee.batch(() => {
            this.listeners.forEach((r) => {
              r(t);
            });
          });
        }
        onFocus() {
          Ee.batch(() => {
            this.getAll().forEach((t) => {
              t.onFocus();
            });
          });
        }
        onOnline() {
          Ee.batch(() => {
            this.getAll().forEach((t) => {
              t.onOnline();
            });
          });
        }
      }),
      (Ut = new WeakMap()),
      xf),
    w0 =
      ((bf = class {
        constructor(e = {}) {
          q(this, be);
          q(this, Br);
          q(this, Ur);
          q(this, ya);
          q(this, va);
          q(this, $r);
          q(this, xa);
          q(this, ba);
          (L(this, be, e.queryCache || new b0()),
            L(this, Br, e.mutationCache || new v0()),
            L(this, Ur, e.defaultOptions || {}),
            L(this, ya, new Map()),
            L(this, va, new Map()),
            L(this, $r, 0));
        }
        mount() {
          (so(this, $r)._++,
            h(this, $r) === 1 &&
              (L(
                this,
                xa,
                bc.subscribe(async (e) => {
                  e &&
                    (await this.resumePausedMutations(), h(this, be).onFocus());
                })
              ),
              L(
                this,
                ba,
                $i.subscribe(async (e) => {
                  e &&
                    (await this.resumePausedMutations(),
                    h(this, be).onOnline());
                })
              )));
        }
        unmount() {
          var e, t;
          (so(this, $r)._--,
            h(this, $r) === 0 &&
              ((e = h(this, xa)) == null || e.call(this),
              L(this, xa, void 0),
              (t = h(this, ba)) == null || t.call(this),
              L(this, ba, void 0)));
        }
        isFetching(e) {
          return h(this, be).findAll({ ...e, fetchStatus: "fetching" }).length;
        }
        isMutating(e) {
          return h(this, Br).findAll({ ...e, status: "pending" }).length;
        }
        getQueryData(e) {
          const t = this.defaultQueryOptions({ queryKey: e });
          return h(this, be).get(t.queryHash)?.state.data;
        }
        ensureQueryData(e) {
          const t = this.defaultQueryOptions(e),
            r = h(this, be).build(this, t),
            n = r.state.data;
          return n === void 0
            ? this.fetchQuery(e)
            : (e.revalidateIfStale &&
                r.isStaleByTime(Tr(t.staleTime, r)) &&
                this.prefetchQuery(t),
              Promise.resolve(n));
        }
        getQueriesData(e) {
          return h(this, be)
            .findAll(e)
            .map(({ queryKey: t, state: r }) => {
              const n = r.data;
              return [t, n];
            });
        }
        setQueryData(e, t, r) {
          const n = this.defaultQueryOptions({ queryKey: e }),
            s = h(this, be).get(n.queryHash)?.state.data,
            o = r0(t, s);
          if (o !== void 0)
            return h(this, be)
              .build(this, n)
              .setData(o, { ...r, manual: !0 });
        }
        setQueriesData(e, t, r) {
          return Ee.batch(() =>
            h(this, be)
              .findAll(e)
              .map(({ queryKey: n }) => [n, this.setQueryData(n, t, r)])
          );
        }
        getQueryState(e) {
          const t = this.defaultQueryOptions({ queryKey: e });
          return h(this, be).get(t.queryHash)?.state;
        }
        removeQueries(e) {
          const t = h(this, be);
          Ee.batch(() => {
            t.findAll(e).forEach((r) => {
              t.remove(r);
            });
          });
        }
        resetQueries(e, t) {
          const r = h(this, be);
          return Ee.batch(
            () => (
              r.findAll(e).forEach((n) => {
                n.reset();
              }),
              this.refetchQueries({ type: "active", ...e }, t)
            )
          );
        }
        cancelQueries(e, t = {}) {
          const r = { revert: !0, ...t },
            n = Ee.batch(() =>
              h(this, be)
                .findAll(e)
                .map((a) => a.cancel(r))
            );
          return Promise.all(n).then(Qe).catch(Qe);
        }
        invalidateQueries(e, t = {}) {
          return Ee.batch(
            () => (
              h(this, be)
                .findAll(e)
                .forEach((r) => {
                  r.invalidate();
                }),
              e?.refetchType === "none"
                ? Promise.resolve()
                : this.refetchQueries(
                    { ...e, type: e?.refetchType ?? e?.type ?? "active" },
                    t
                  )
            )
          );
        }
        refetchQueries(e, t = {}) {
          const r = { ...t, cancelRefetch: t.cancelRefetch ?? !0 },
            n = Ee.batch(() =>
              h(this, be)
                .findAll(e)
                .filter((a) => !a.isDisabled() && !a.isStatic())
                .map((a) => {
                  let s = a.fetch(void 0, r);
                  return (
                    r.throwOnError || (s = s.catch(Qe)),
                    a.state.fetchStatus === "paused" ? Promise.resolve() : s
                  );
                })
            );
          return Promise.all(n).then(Qe);
        }
        fetchQuery(e) {
          const t = this.defaultQueryOptions(e);
          t.retry === void 0 && (t.retry = !1);
          const r = h(this, be).build(this, t);
          return r.isStaleByTime(Tr(t.staleTime, r))
            ? r.fetch(t)
            : Promise.resolve(r.state.data);
        }
        prefetchQuery(e) {
          return this.fetchQuery(e).then(Qe).catch(Qe);
        }
        fetchInfiniteQuery(e) {
          return ((e.behavior = Jm(e.pages)), this.fetchQuery(e));
        }
        prefetchInfiniteQuery(e) {
          return this.fetchInfiniteQuery(e).then(Qe).catch(Qe);
        }
        ensureInfiniteQueryData(e) {
          return ((e.behavior = Jm(e.pages)), this.ensureQueryData(e));
        }
        resumePausedMutations() {
          return $i.isOnline()
            ? h(this, Br).resumePausedMutations()
            : Promise.resolve();
        }
        getQueryCache() {
          return h(this, be);
        }
        getMutationCache() {
          return h(this, Br);
        }
        getDefaultOptions() {
          return h(this, Ur);
        }
        setDefaultOptions(e) {
          L(this, Ur, e);
        }
        setQueryDefaults(e, t) {
          h(this, ya).set(ln(e), { queryKey: e, defaultOptions: t });
        }
        getQueryDefaults(e) {
          const t = [...h(this, ya).values()],
            r = {};
          return (
            t.forEach((n) => {
              ds(e, n.queryKey) && Object.assign(r, n.defaultOptions);
            }),
            r
          );
        }
        setMutationDefaults(e, t) {
          h(this, va).set(ln(e), { mutationKey: e, defaultOptions: t });
        }
        getMutationDefaults(e) {
          const t = [...h(this, va).values()],
            r = {};
          return (
            t.forEach((n) => {
              ds(e, n.mutationKey) && Object.assign(r, n.defaultOptions);
            }),
            r
          );
        }
        defaultQueryOptions(e) {
          if (e._defaulted) return e;
          const t = {
            ...h(this, Ur).queries,
            ...this.getQueryDefaults(e.queryKey),
            ...e,
            _defaulted: !0,
          };
          return (
            t.queryHash || (t.queryHash = kc(t.queryKey, t)),
            t.refetchOnReconnect === void 0 &&
              (t.refetchOnReconnect = t.networkMode !== "always"),
            t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
            !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
            t.queryFn === _c && (t.enabled = !1),
            t
          );
        }
        defaultMutationOptions(e) {
          return e?._defaulted
            ? e
            : {
                ...h(this, Ur).mutations,
                ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
                ...e,
                _defaulted: !0,
              };
        }
        clear() {
          (h(this, be).clear(), h(this, Br).clear());
        }
      }),
      (be = new WeakMap()),
      (Br = new WeakMap()),
      (Ur = new WeakMap()),
      (ya = new WeakMap()),
      (va = new WeakMap()),
      ($r = new WeakMap()),
      (xa = new WeakMap()),
      (ba = new WeakMap()),
      bf),
    rh = N.createContext(void 0),
    er = (e) => {
      const t = N.useContext(rh);
      if (!t)
        throw new Error(
          "No QueryClient set, use QueryClientProvider to set one"
        );
      return t;
    },
    k0 = ({ client: e, children: t }) => (
      N.useEffect(
        () => (
          e.mount(),
          () => {
            e.unmount();
          }
        ),
        [e]
      ),
      i.jsx(rh.Provider, { value: e, children: t })
    ),
    nh = N.createContext(!1),
    S0 = () => N.useContext(nh);
  nh.Provider;
  function C0() {
    let e = !1;
    return {
      clearReset: () => {
        e = !1;
      },
      reset: () => {
        e = !0;
      },
      isReset: () => e,
    };
  }
  var _0 = N.createContext(C0()),
    R0 = () => N.useContext(_0),
    j0 = (e, t, r) => {
      const n =
        r?.state.error && typeof e.throwOnError == "function"
          ? Rc(e.throwOnError, [r.state.error, r])
          : e.throwOnError;
      (e.suspense || e.experimental_prefetchInRender || n) &&
        (t.isReset() || (e.retryOnMount = !1));
    },
    N0 = (e) => {
      N.useEffect(() => {
        e.clearReset();
      }, [e]);
    },
    A0 = ({
      result: e,
      errorResetBoundary: t,
      throwOnError: r,
      query: n,
      suspense: a,
    }) =>
      e.isError &&
      !t.isReset() &&
      !e.isFetching &&
      n &&
      ((a && e.data === void 0) || Rc(r, [e.error, n])),
    E0 = (e) => {
      if (e.suspense) {
        const r = (a) => (a === "static" ? a : Math.max(a ?? 1e3, 1e3)),
          n = e.staleTime;
        ((e.staleTime = typeof n == "function" ? (...a) => r(n(...a)) : r(n)),
          typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
      }
    },
    T0 = (e, t) => e.isLoading && e.isFetching && !t,
    P0 = (e, t) => e?.suspense && t.isPending,
    ah = (e, t, r) =>
      t.fetchOptimistic(e).catch(() => {
        r.clearReset();
      });
  function O0(e, t, r) {
    const n = S0(),
      a = R0(),
      s = er(),
      o = s.defaultQueryOptions(e);
    s.getDefaultOptions().queries?._experimental_beforeQuery?.(o);
    const l = s.getQueryCache().get(o.queryHash);
    ((o._optimisticResults = n ? "isRestoring" : "optimistic"),
      E0(o),
      j0(o, a, l),
      N0(a));
    const c = !s.getQueryCache().get(o.queryHash),
      [u] = N.useState(() => new t(s, o)),
      p = u.getOptimisticResult(o),
      f = !n && e.subscribed !== !1;
    if (
      (N.useSyncExternalStore(
        N.useCallback(
          (m) => {
            const x = f ? u.subscribe(Ee.batchCalls(m)) : Qe;
            return (u.updateResult(), x);
          },
          [u, f]
        ),
        () => u.getCurrentResult(),
        () => u.getCurrentResult()
      ),
      N.useEffect(() => {
        u.setOptions(o);
      }, [o, u]),
      P0(o, p))
    )
      throw ah(o, u, a);
    if (
      A0({
        result: p,
        errorResetBoundary: a,
        throwOnError: o.throwOnError,
        query: l,
        suspense: o.suspense,
      })
    )
      throw p.error;
    return (
      s.getDefaultOptions().queries?._experimental_afterQuery?.(o, p),
      o.experimental_prefetchInRender &&
        !ps.isServer() &&
        T0(p, n) &&
        (c ? ah(o, u, a) : l?.promise)?.catch(Qe).finally(() => {
          u.updateResult();
        }),
      o.notifyOnChangeProps ? p : u.trackResult(p)
    );
  }
  function ye(e, t) {
    return O0(e, m0);
  }
  function xt(e, t) {
    const r = er(),
      [n] = N.useState(() => new x0(r, e));
    N.useEffect(() => {
      n.setOptions(e);
    }, [n, e]);
    const a = N.useSyncExternalStore(
        N.useCallback((o) => n.subscribe(Ee.batchCalls(o)), [n]),
        () => n.getCurrentResult(),
        () => n.getCurrentResult()
      ),
      s = N.useCallback(
        (o, l) => {
          n.mutate(o, l).catch(Qe);
        },
        [n]
      );
    if (a.error && Rc(n.options.throwOnError, [a.error])) throw a.error;
    return { ...a, mutate: s, mutateAsync: a.mutate };
  }
  var re;
  (function (e) {
    e.assertEqual = (a) => {};
    function t(a) {}
    e.assertIs = t;
    function r(a) {
      throw new Error();
    }
    ((e.assertNever = r),
      (e.arrayToEnum = (a) => {
        const s = {};
        for (const o of a) s[o] = o;
        return s;
      }),
      (e.getValidEnumValues = (a) => {
        const s = e.objectKeys(a).filter((l) => typeof a[a[l]] != "number"),
          o = {};
        for (const l of s) o[l] = a[l];
        return e.objectValues(o);
      }),
      (e.objectValues = (a) =>
        e.objectKeys(a).map(function (s) {
          return a[s];
        })),
      (e.objectKeys =
        typeof Object.keys == "function"
          ? (a) => Object.keys(a)
          : (a) => {
              const s = [];
              for (const o in a)
                Object.prototype.hasOwnProperty.call(a, o) && s.push(o);
              return s;
            }),
      (e.find = (a, s) => {
        for (const o of a) if (s(o)) return o;
      }),
      (e.isInteger =
        typeof Number.isInteger == "function"
          ? (a) => Number.isInteger(a)
          : (a) =>
              typeof a == "number" &&
              Number.isFinite(a) &&
              Math.floor(a) === a));
    function n(a, s = " | ") {
      return a.map((o) => (typeof o == "string" ? `'${o}'` : o)).join(s);
    }
    ((e.joinValues = n),
      (e.jsonStringifyReplacer = (a, s) =>
        typeof s == "bigint" ? s.toString() : s));
  })(re || (re = {}));
  var sh;
  (function (e) {
    e.mergeShapes = (t, r) => ({ ...t, ...r });
  })(sh || (sh = {}));
  const M = re.arrayToEnum([
      "string",
      "nan",
      "number",
      "integer",
      "float",
      "boolean",
      "date",
      "bigint",
      "symbol",
      "function",
      "undefined",
      "null",
      "array",
      "object",
      "unknown",
      "promise",
      "void",
      "never",
      "map",
      "set",
    ]),
    Pr = (e) => {
      switch (typeof e) {
        case "undefined":
          return M.undefined;
        case "string":
          return M.string;
        case "number":
          return Number.isNaN(e) ? M.nan : M.number;
        case "boolean":
          return M.boolean;
        case "function":
          return M.function;
        case "bigint":
          return M.bigint;
        case "symbol":
          return M.symbol;
        case "object":
          return Array.isArray(e)
            ? M.array
            : e === null
              ? M.null
              : e.then &&
                  typeof e.then == "function" &&
                  e.catch &&
                  typeof e.catch == "function"
                ? M.promise
                : typeof Map < "u" && e instanceof Map
                  ? M.map
                  : typeof Set < "u" && e instanceof Set
                    ? M.set
                    : typeof Date < "u" && e instanceof Date
                      ? M.date
                      : M.object;
        default:
          return M.unknown;
      }
    },
    P = re.arrayToEnum([
      "invalid_type",
      "invalid_literal",
      "custom",
      "invalid_union",
      "invalid_union_discriminator",
      "invalid_enum_value",
      "unrecognized_keys",
      "invalid_arguments",
      "invalid_return_type",
      "invalid_date",
      "invalid_string",
      "too_small",
      "too_big",
      "invalid_intersection_types",
      "not_multiple_of",
      "not_finite",
    ]);
  class Mt extends Error {
    get errors() {
      return this.issues;
    }
    constructor(t) {
      (super(),
        (this.issues = []),
        (this.addIssue = (n) => {
          this.issues = [...this.issues, n];
        }),
        (this.addIssues = (n = []) => {
          this.issues = [...this.issues, ...n];
        }));
      const r = new.target.prototype;
      (Object.setPrototypeOf
        ? Object.setPrototypeOf(this, r)
        : (this.__proto__ = r),
        (this.name = "ZodError"),
        (this.issues = t));
    }
    format(t) {
      const r =
          t ||
          function (s) {
            return s.message;
          },
        n = { _errors: [] },
        a = (s) => {
          for (const o of s.issues)
            if (o.code === "invalid_union") o.unionErrors.map(a);
            else if (o.code === "invalid_return_type") a(o.returnTypeError);
            else if (o.code === "invalid_arguments") a(o.argumentsError);
            else if (o.path.length === 0) n._errors.push(r(o));
            else {
              let l = n,
                c = 0;
              for (; c < o.path.length; ) {
                const u = o.path[c];
                (c === o.path.length - 1
                  ? ((l[u] = l[u] || { _errors: [] }), l[u]._errors.push(r(o)))
                  : (l[u] = l[u] || { _errors: [] }),
                  (l = l[u]),
                  c++);
              }
            }
        };
      return (a(this), n);
    }
    static assert(t) {
      if (!(t instanceof Mt)) throw new Error(`Not a ZodError: ${t}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, re.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = (r) => r.message) {
      const r = {},
        n = [];
      for (const a of this.issues)
        if (a.path.length > 0) {
          const s = a.path[0];
          ((r[s] = r[s] || []), r[s].push(t(a)));
        } else n.push(t(a));
      return { formErrors: n, fieldErrors: r };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  Mt.create = (e) => new Mt(e);
  const Tc = (e, t) => {
    let r;
    switch (e.code) {
      case P.invalid_type:
        e.received === M.undefined
          ? (r = "Required")
          : (r = `Expected ${e.expected}, received ${e.received}`);
        break;
      case P.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(e.expected, re.jsonStringifyReplacer)}`;
        break;
      case P.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${re.joinValues(e.keys, ", ")}`;
        break;
      case P.invalid_union:
        r = "Invalid input";
        break;
      case P.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${re.joinValues(e.options)}`;
        break;
      case P.invalid_enum_value:
        r = `Invalid enum value. Expected ${re.joinValues(e.options)}, received '${e.received}'`;
        break;
      case P.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case P.invalid_return_type:
        r = "Invalid function return type";
        break;
      case P.invalid_date:
        r = "Invalid date";
        break;
      case P.invalid_string:
        typeof e.validation == "object"
          ? "includes" in e.validation
            ? ((r = `Invalid input: must include "${e.validation.includes}"`),
              typeof e.validation.position == "number" &&
                (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
            : "startsWith" in e.validation
              ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
              : "endsWith" in e.validation
                ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
                : re.assertNever(e.validation)
          : e.validation !== "regex"
            ? (r = `Invalid ${e.validation}`)
            : (r = "Invalid");
        break;
      case P.too_small:
        e.type === "array"
          ? (r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "more than"} ${e.minimum} element(s)`)
          : e.type === "string"
            ? (r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at least" : "over"} ${e.minimum} character(s)`)
            : e.type === "number"
              ? (r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`)
              : e.type === "bigint"
                ? (r = `Number must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${e.minimum}`)
                : e.type === "date"
                  ? (r = `Date must be ${e.exact ? "exactly equal to " : e.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(e.minimum))}`)
                  : (r = "Invalid input");
        break;
      case P.too_big:
        e.type === "array"
          ? (r = `Array must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "less than"} ${e.maximum} element(s)`)
          : e.type === "string"
            ? (r = `String must contain ${e.exact ? "exactly" : e.inclusive ? "at most" : "under"} ${e.maximum} character(s)`)
            : e.type === "number"
              ? (r = `Number must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
              : e.type === "bigint"
                ? (r = `BigInt must be ${e.exact ? "exactly" : e.inclusive ? "less than or equal to" : "less than"} ${e.maximum}`)
                : e.type === "date"
                  ? (r = `Date must be ${e.exact ? "exactly" : e.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(e.maximum))}`)
                  : (r = "Invalid input");
        break;
      case P.custom:
        r = "Invalid input";
        break;
      case P.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case P.not_multiple_of:
        r = `Number must be a multiple of ${e.multipleOf}`;
        break;
      case P.not_finite:
        r = "Number must be finite";
        break;
      default:
        ((r = t.defaultError), re.assertNever(e));
    }
    return { message: r };
  };
  let L0 = Tc;
  function D0() {
    return L0;
  }
  const I0 = (e) => {
    const { data: t, path: r, errorMaps: n, issueData: a } = e,
      s = [...r, ...(a.path || [])],
      o = { ...a, path: s };
    if (a.message !== void 0) return { ...a, path: s, message: a.message };
    let l = "";
    const c = n
      .filter((u) => !!u)
      .slice()
      .reverse();
    for (const u of c) l = u(o, { data: t, defaultError: l }).message;
    return { ...a, path: s, message: l };
  };
  function D(e, t) {
    const r = D0(),
      n = I0({
        issueData: t,
        data: e.data,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          r,
          r === Tc ? void 0 : Tc,
        ].filter((a) => !!a),
      });
    e.common.issues.push(n);
  }
  class Ze {
    constructor() {
      this.value = "valid";
    }
    dirty() {
      this.value === "valid" && (this.value = "dirty");
    }
    abort() {
      this.value !== "aborted" && (this.value = "aborted");
    }
    static mergeArray(t, r) {
      const n = [];
      for (const a of r) {
        if (a.status === "aborted") return V;
        (a.status === "dirty" && t.dirty(), n.push(a.value));
      }
      return { status: t.value, value: n };
    }
    static async mergeObjectAsync(t, r) {
      const n = [];
      for (const a of r) {
        const s = await a.key,
          o = await a.value;
        n.push({ key: s, value: o });
      }
      return Ze.mergeObjectSync(t, n);
    }
    static mergeObjectSync(t, r) {
      const n = {};
      for (const a of r) {
        const { key: s, value: o } = a;
        if (s.status === "aborted" || o.status === "aborted") return V;
        (s.status === "dirty" && t.dirty(),
          o.status === "dirty" && t.dirty(),
          s.value !== "__proto__" &&
            (typeof o.value < "u" || a.alwaysSet) &&
            (n[s.value] = o.value));
      }
      return { status: t.value, value: n };
    }
  }
  const V = Object.freeze({ status: "aborted" }),
    ms = (e) => ({ status: "dirty", value: e }),
    bt = (e) => ({ status: "valid", value: e }),
    ih = (e) => e.status === "aborted",
    oh = (e) => e.status === "dirty",
    ra = (e) => e.status === "valid",
    Ki = (e) => typeof Promise < "u" && e instanceof Promise;
  var B;
  (function (e) {
    ((e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
      (e.toString = (t) => (typeof t == "string" ? t : t?.message)));
  })(B || (B = {}));
  class Ft {
    constructor(t, r, n, a) {
      ((this._cachedPath = []),
        (this.parent = t),
        (this.data = r),
        (this._path = n),
        (this._key = a));
    }
    get path() {
      return (
        this._cachedPath.length ||
          (Array.isArray(this._key)
            ? this._cachedPath.push(...this._path, ...this._key)
            : this._cachedPath.push(...this._path, this._key)),
        this._cachedPath
      );
    }
  }
  const lh = (e, t) => {
    if (ra(t)) return { success: !0, data: t.value };
    if (!e.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const r = new Mt(e.common.issues);
        return ((this._error = r), this._error);
      },
    };
  };
  function W(e) {
    if (!e) return {};
    const {
      errorMap: t,
      invalid_type_error: r,
      required_error: n,
      description: a,
    } = e;
    if (t && (r || n))
      throw new Error(
        `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
      );
    return t
      ? { errorMap: t, description: a }
      : {
          errorMap: (o, l) => {
            const { message: c } = e;
            return o.code === "invalid_enum_value"
              ? { message: c ?? l.defaultError }
              : typeof l.data > "u"
                ? { message: c ?? n ?? l.defaultError }
                : o.code !== "invalid_type"
                  ? { message: l.defaultError }
                  : { message: c ?? r ?? l.defaultError };
          },
          description: a,
        };
  }
  class X {
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return Pr(t.data);
    }
    _getOrReturnCtx(t, r) {
      return (
        r || {
          common: t.parent.common,
          data: t.data,
          parsedType: Pr(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent,
        }
      );
    }
    _processInputParams(t) {
      return {
        status: new Ze(),
        ctx: {
          common: t.parent.common,
          data: t.data,
          parsedType: Pr(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent,
        },
      };
    }
    _parseSync(t) {
      const r = this._parse(t);
      if (Ki(r)) throw new Error("Synchronous parse encountered promise.");
      return r;
    }
    _parseAsync(t) {
      const r = this._parse(t);
      return Promise.resolve(r);
    }
    parse(t, r) {
      const n = this.safeParse(t, r);
      if (n.success) return n.data;
      throw n.error;
    }
    safeParse(t, r) {
      const n = {
          common: {
            issues: [],
            async: r?.async ?? !1,
            contextualErrorMap: r?.errorMap,
          },
          path: r?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: t,
          parsedType: Pr(t),
        },
        a = this._parseSync({ data: t, path: n.path, parent: n });
      return lh(n, a);
    }
    "~validate"(t) {
      const r = {
        common: { issues: [], async: !!this["~standard"].async },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Pr(t),
      };
      if (!this["~standard"].async)
        try {
          const n = this._parseSync({ data: t, path: [], parent: r });
          return ra(n) ? { value: n.value } : { issues: r.common.issues };
        } catch (n) {
          (n?.message?.toLowerCase()?.includes("encountered") &&
            (this["~standard"].async = !0),
            (r.common = { issues: [], async: !0 }));
        }
      return this._parseAsync({ data: t, path: [], parent: r }).then((n) =>
        ra(n) ? { value: n.value } : { issues: r.common.issues }
      );
    }
    async parseAsync(t, r) {
      const n = await this.safeParseAsync(t, r);
      if (n.success) return n.data;
      throw n.error;
    }
    async safeParseAsync(t, r) {
      const n = {
          common: { issues: [], contextualErrorMap: r?.errorMap, async: !0 },
          path: r?.path || [],
          schemaErrorMap: this._def.errorMap,
          parent: null,
          data: t,
          parsedType: Pr(t),
        },
        a = this._parse({ data: t, path: n.path, parent: n }),
        s = await (Ki(a) ? a : Promise.resolve(a));
      return lh(n, s);
    }
    refine(t, r) {
      const n = (a) =>
        typeof r == "string" || typeof r > "u"
          ? { message: r }
          : typeof r == "function"
            ? r(a)
            : r;
      return this._refinement((a, s) => {
        const o = t(a),
          l = () => s.addIssue({ code: P.custom, ...n(a) });
        return typeof Promise < "u" && o instanceof Promise
          ? o.then((c) => (c ? !0 : (l(), !1)))
          : o
            ? !0
            : (l(), !1);
      });
    }
    refinement(t, r) {
      return this._refinement((n, a) =>
        t(n) ? !0 : (a.addIssue(typeof r == "function" ? r(n, a) : r), !1)
      );
    }
    _refinement(t) {
      return new dn({
        schema: this,
        typeName: K.ZodEffects,
        effect: { type: "refinement", refinement: t },
      });
    }
    superRefine(t) {
      return this._refinement(t);
    }
    constructor(t) {
      ((this.spa = this.safeParseAsync),
        (this._def = t),
        (this.parse = this.parse.bind(this)),
        (this.safeParse = this.safeParse.bind(this)),
        (this.parseAsync = this.parseAsync.bind(this)),
        (this.safeParseAsync = this.safeParseAsync.bind(this)),
        (this.spa = this.spa.bind(this)),
        (this.refine = this.refine.bind(this)),
        (this.refinement = this.refinement.bind(this)),
        (this.superRefine = this.superRefine.bind(this)),
        (this.optional = this.optional.bind(this)),
        (this.nullable = this.nullable.bind(this)),
        (this.nullish = this.nullish.bind(this)),
        (this.array = this.array.bind(this)),
        (this.promise = this.promise.bind(this)),
        (this.or = this.or.bind(this)),
        (this.and = this.and.bind(this)),
        (this.transform = this.transform.bind(this)),
        (this.brand = this.brand.bind(this)),
        (this.default = this.default.bind(this)),
        (this.catch = this.catch.bind(this)),
        (this.describe = this.describe.bind(this)),
        (this.pipe = this.pipe.bind(this)),
        (this.readonly = this.readonly.bind(this)),
        (this.isNullable = this.isNullable.bind(this)),
        (this.isOptional = this.isOptional.bind(this)),
        (this["~standard"] = {
          version: 1,
          vendor: "zod",
          validate: (r) => this["~validate"](r),
        }));
    }
    optional() {
      return nr.create(this, this._def);
    }
    nullable() {
      return pn.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return zt.create(this);
    }
    promise() {
      return Yi.create(this, this._def);
    }
    or(t) {
      return Hi.create([this, t], this._def);
    }
    and(t) {
      return Qi.create(this, t, this._def);
    }
    transform(t) {
      return new dn({
        ...W(this._def),
        schema: this,
        typeName: K.ZodEffects,
        effect: { type: "transform", transform: t },
      });
    }
    default(t) {
      const r = typeof t == "function" ? t : () => t;
      return new Xi({
        ...W(this._def),
        innerType: this,
        defaultValue: r,
        typeName: K.ZodDefault,
      });
    }
    brand() {
      return new gh({ typeName: K.ZodBranded, type: this, ...W(this._def) });
    }
    catch(t) {
      const r = typeof t == "function" ? t : () => t;
      return new Ji({
        ...W(this._def),
        innerType: this,
        catchValue: r,
        typeName: K.ZodCatch,
      });
    }
    describe(t) {
      const r = this.constructor;
      return new r({ ...this._def, description: t });
    }
    pipe(t) {
      return Uc.create(this, t);
    }
    readonly() {
      return eo.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const M0 = /^c[^\s-]{8,}$/i,
    F0 = /^[0-9a-z]+$/,
    z0 = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
    q0 =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    B0 = /^[a-z0-9_-]{21}$/i,
    U0 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
    $0 =
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    V0 =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
    K0 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
  let Pc;
  const W0 =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    H0 =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    Q0 =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    Z0 =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    G0 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    Y0 =
      /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    ch =
      "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    X0 = new RegExp(`^${ch}$`);
  function uh(e) {
    let t = "[0-5]\\d";
    e.precision
      ? (t = `${t}\\.\\d{${e.precision}}`)
      : e.precision == null && (t = `${t}(\\.\\d+)?`);
    const r = e.precision ? "+" : "?";
    return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${r}`;
  }
  function J0(e) {
    return new RegExp(`^${uh(e)}$`);
  }
  function ev(e) {
    let t = `${ch}T${uh(e)}`;
    const r = [];
    return (
      r.push(e.local ? "Z?" : "Z"),
      e.offset && r.push("([+-]\\d{2}:?\\d{2})"),
      (t = `${t}(${r.join("|")})`),
      new RegExp(`^${t}$`)
    );
  }
  function tv(e, t) {
    return !!(
      ((t === "v4" || !t) && W0.test(e)) ||
      ((t === "v6" || !t) && Q0.test(e))
    );
  }
  function rv(e, t) {
    if (!U0.test(e)) return !1;
    try {
      const [r] = e.split(".");
      if (!r) return !1;
      const n = r
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .padEnd(r.length + ((4 - (r.length % 4)) % 4), "="),
        a = JSON.parse(atob(n));
      return !(
        typeof a != "object" ||
        a === null ||
        ("typ" in a && a?.typ !== "JWT") ||
        !a.alg ||
        (t && a.alg !== t)
      );
    } catch {
      return !1;
    }
  }
  function nv(e, t) {
    return !!(
      ((t === "v4" || !t) && H0.test(e)) ||
      ((t === "v6" || !t) && Z0.test(e))
    );
  }
  class tr extends X {
    _parse(t) {
      if (
        (this._def.coerce && (t.data = String(t.data)),
        this._getType(t) !== M.string)
      ) {
        const s = this._getOrReturnCtx(t);
        return (
          D(s, {
            code: P.invalid_type,
            expected: M.string,
            received: s.parsedType,
          }),
          V
        );
      }
      const n = new Ze();
      let a;
      for (const s of this._def.checks)
        if (s.kind === "min")
          t.data.length < s.value &&
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              code: P.too_small,
              minimum: s.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "max")
          t.data.length > s.value &&
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              code: P.too_big,
              maximum: s.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "length") {
          const o = t.data.length > s.value,
            l = t.data.length < s.value;
          (o || l) &&
            ((a = this._getOrReturnCtx(t, a)),
            o
              ? D(a, {
                  code: P.too_big,
                  maximum: s.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: s.message,
                })
              : l &&
                D(a, {
                  code: P.too_small,
                  minimum: s.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: s.message,
                }),
            n.dirty());
        } else if (s.kind === "email")
          V0.test(t.data) ||
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              validation: "email",
              code: P.invalid_string,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "emoji")
          (Pc || (Pc = new RegExp(K0, "u")),
            Pc.test(t.data) ||
              ((a = this._getOrReturnCtx(t, a)),
              D(a, {
                validation: "emoji",
                code: P.invalid_string,
                message: s.message,
              }),
              n.dirty()));
        else if (s.kind === "uuid")
          q0.test(t.data) ||
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              validation: "uuid",
              code: P.invalid_string,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "nanoid")
          B0.test(t.data) ||
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              validation: "nanoid",
              code: P.invalid_string,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "cuid")
          M0.test(t.data) ||
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              validation: "cuid",
              code: P.invalid_string,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "cuid2")
          F0.test(t.data) ||
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              validation: "cuid2",
              code: P.invalid_string,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "ulid")
          z0.test(t.data) ||
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              validation: "ulid",
              code: P.invalid_string,
              message: s.message,
            }),
            n.dirty());
        else if (s.kind === "url")
          try {
            new URL(t.data);
          } catch {
            ((a = this._getOrReturnCtx(t, a)),
              D(a, {
                validation: "url",
                code: P.invalid_string,
                message: s.message,
              }),
              n.dirty());
          }
        else
          s.kind === "regex"
            ? ((s.regex.lastIndex = 0),
              s.regex.test(t.data) ||
                ((a = this._getOrReturnCtx(t, a)),
                D(a, {
                  validation: "regex",
                  code: P.invalid_string,
                  message: s.message,
                }),
                n.dirty()))
            : s.kind === "trim"
              ? (t.data = t.data.trim())
              : s.kind === "includes"
                ? t.data.includes(s.value, s.position) ||
                  ((a = this._getOrReturnCtx(t, a)),
                  D(a, {
                    code: P.invalid_string,
                    validation: { includes: s.value, position: s.position },
                    message: s.message,
                  }),
                  n.dirty())
                : s.kind === "toLowerCase"
                  ? (t.data = t.data.toLowerCase())
                  : s.kind === "toUpperCase"
                    ? (t.data = t.data.toUpperCase())
                    : s.kind === "startsWith"
                      ? t.data.startsWith(s.value) ||
                        ((a = this._getOrReturnCtx(t, a)),
                        D(a, {
                          code: P.invalid_string,
                          validation: { startsWith: s.value },
                          message: s.message,
                        }),
                        n.dirty())
                      : s.kind === "endsWith"
                        ? t.data.endsWith(s.value) ||
                          ((a = this._getOrReturnCtx(t, a)),
                          D(a, {
                            code: P.invalid_string,
                            validation: { endsWith: s.value },
                            message: s.message,
                          }),
                          n.dirty())
                        : s.kind === "datetime"
                          ? ev(s).test(t.data) ||
                            ((a = this._getOrReturnCtx(t, a)),
                            D(a, {
                              code: P.invalid_string,
                              validation: "datetime",
                              message: s.message,
                            }),
                            n.dirty())
                          : s.kind === "date"
                            ? X0.test(t.data) ||
                              ((a = this._getOrReturnCtx(t, a)),
                              D(a, {
                                code: P.invalid_string,
                                validation: "date",
                                message: s.message,
                              }),
                              n.dirty())
                            : s.kind === "time"
                              ? J0(s).test(t.data) ||
                                ((a = this._getOrReturnCtx(t, a)),
                                D(a, {
                                  code: P.invalid_string,
                                  validation: "time",
                                  message: s.message,
                                }),
                                n.dirty())
                              : s.kind === "duration"
                                ? $0.test(t.data) ||
                                  ((a = this._getOrReturnCtx(t, a)),
                                  D(a, {
                                    validation: "duration",
                                    code: P.invalid_string,
                                    message: s.message,
                                  }),
                                  n.dirty())
                                : s.kind === "ip"
                                  ? tv(t.data, s.version) ||
                                    ((a = this._getOrReturnCtx(t, a)),
                                    D(a, {
                                      validation: "ip",
                                      code: P.invalid_string,
                                      message: s.message,
                                    }),
                                    n.dirty())
                                  : s.kind === "jwt"
                                    ? rv(t.data, s.alg) ||
                                      ((a = this._getOrReturnCtx(t, a)),
                                      D(a, {
                                        validation: "jwt",
                                        code: P.invalid_string,
                                        message: s.message,
                                      }),
                                      n.dirty())
                                    : s.kind === "cidr"
                                      ? nv(t.data, s.version) ||
                                        ((a = this._getOrReturnCtx(t, a)),
                                        D(a, {
                                          validation: "cidr",
                                          code: P.invalid_string,
                                          message: s.message,
                                        }),
                                        n.dirty())
                                      : s.kind === "base64"
                                        ? G0.test(t.data) ||
                                          ((a = this._getOrReturnCtx(t, a)),
                                          D(a, {
                                            validation: "base64",
                                            code: P.invalid_string,
                                            message: s.message,
                                          }),
                                          n.dirty())
                                        : s.kind === "base64url"
                                          ? Y0.test(t.data) ||
                                            ((a = this._getOrReturnCtx(t, a)),
                                            D(a, {
                                              validation: "base64url",
                                              code: P.invalid_string,
                                              message: s.message,
                                            }),
                                            n.dirty())
                                          : re.assertNever(s);
      return { status: n.value, value: t.data };
    }
    _regex(t, r, n) {
      return this.refinement((a) => t.test(a), {
        validation: r,
        code: P.invalid_string,
        ...B.errToObj(n),
      });
    }
    _addCheck(t) {
      return new tr({ ...this._def, checks: [...this._def.checks, t] });
    }
    email(t) {
      return this._addCheck({ kind: "email", ...B.errToObj(t) });
    }
    url(t) {
      return this._addCheck({ kind: "url", ...B.errToObj(t) });
    }
    emoji(t) {
      return this._addCheck({ kind: "emoji", ...B.errToObj(t) });
    }
    uuid(t) {
      return this._addCheck({ kind: "uuid", ...B.errToObj(t) });
    }
    nanoid(t) {
      return this._addCheck({ kind: "nanoid", ...B.errToObj(t) });
    }
    cuid(t) {
      return this._addCheck({ kind: "cuid", ...B.errToObj(t) });
    }
    cuid2(t) {
      return this._addCheck({ kind: "cuid2", ...B.errToObj(t) });
    }
    ulid(t) {
      return this._addCheck({ kind: "ulid", ...B.errToObj(t) });
    }
    base64(t) {
      return this._addCheck({ kind: "base64", ...B.errToObj(t) });
    }
    base64url(t) {
      return this._addCheck({ kind: "base64url", ...B.errToObj(t) });
    }
    jwt(t) {
      return this._addCheck({ kind: "jwt", ...B.errToObj(t) });
    }
    ip(t) {
      return this._addCheck({ kind: "ip", ...B.errToObj(t) });
    }
    cidr(t) {
      return this._addCheck({ kind: "cidr", ...B.errToObj(t) });
    }
    datetime(t) {
      return typeof t == "string"
        ? this._addCheck({
            kind: "datetime",
            precision: null,
            offset: !1,
            local: !1,
            message: t,
          })
        : this._addCheck({
            kind: "datetime",
            precision: typeof t?.precision > "u" ? null : t?.precision,
            offset: t?.offset ?? !1,
            local: t?.local ?? !1,
            ...B.errToObj(t?.message),
          });
    }
    date(t) {
      return this._addCheck({ kind: "date", message: t });
    }
    time(t) {
      return typeof t == "string"
        ? this._addCheck({ kind: "time", precision: null, message: t })
        : this._addCheck({
            kind: "time",
            precision: typeof t?.precision > "u" ? null : t?.precision,
            ...B.errToObj(t?.message),
          });
    }
    duration(t) {
      return this._addCheck({ kind: "duration", ...B.errToObj(t) });
    }
    regex(t, r) {
      return this._addCheck({ kind: "regex", regex: t, ...B.errToObj(r) });
    }
    includes(t, r) {
      return this._addCheck({
        kind: "includes",
        value: t,
        position: r?.position,
        ...B.errToObj(r?.message),
      });
    }
    startsWith(t, r) {
      return this._addCheck({ kind: "startsWith", value: t, ...B.errToObj(r) });
    }
    endsWith(t, r) {
      return this._addCheck({ kind: "endsWith", value: t, ...B.errToObj(r) });
    }
    min(t, r) {
      return this._addCheck({ kind: "min", value: t, ...B.errToObj(r) });
    }
    max(t, r) {
      return this._addCheck({ kind: "max", value: t, ...B.errToObj(r) });
    }
    length(t, r) {
      return this._addCheck({ kind: "length", value: t, ...B.errToObj(r) });
    }
    nonempty(t) {
      return this.min(1, B.errToObj(t));
    }
    trim() {
      return new tr({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }],
      });
    }
    toLowerCase() {
      return new tr({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }],
      });
    }
    toUpperCase() {
      return new tr({
        ...this._def,
        checks: [...this._def.checks, { kind: "toUpperCase" }],
      });
    }
    get isDatetime() {
      return !!this._def.checks.find((t) => t.kind === "datetime");
    }
    get isDate() {
      return !!this._def.checks.find((t) => t.kind === "date");
    }
    get isTime() {
      return !!this._def.checks.find((t) => t.kind === "time");
    }
    get isDuration() {
      return !!this._def.checks.find((t) => t.kind === "duration");
    }
    get isEmail() {
      return !!this._def.checks.find((t) => t.kind === "email");
    }
    get isURL() {
      return !!this._def.checks.find((t) => t.kind === "url");
    }
    get isEmoji() {
      return !!this._def.checks.find((t) => t.kind === "emoji");
    }
    get isUUID() {
      return !!this._def.checks.find((t) => t.kind === "uuid");
    }
    get isNANOID() {
      return !!this._def.checks.find((t) => t.kind === "nanoid");
    }
    get isCUID() {
      return !!this._def.checks.find((t) => t.kind === "cuid");
    }
    get isCUID2() {
      return !!this._def.checks.find((t) => t.kind === "cuid2");
    }
    get isULID() {
      return !!this._def.checks.find((t) => t.kind === "ulid");
    }
    get isIP() {
      return !!this._def.checks.find((t) => t.kind === "ip");
    }
    get isCIDR() {
      return !!this._def.checks.find((t) => t.kind === "cidr");
    }
    get isBase64() {
      return !!this._def.checks.find((t) => t.kind === "base64");
    }
    get isBase64url() {
      return !!this._def.checks.find((t) => t.kind === "base64url");
    }
    get minLength() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxLength() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
  }
  tr.create = (e) =>
    new tr({
      checks: [],
      typeName: K.ZodString,
      coerce: e?.coerce ?? !1,
      ...W(e),
    });
  function av(e, t) {
    const r = (e.toString().split(".")[1] || "").length,
      n = (t.toString().split(".")[1] || "").length,
      a = r > n ? r : n,
      s = Number.parseInt(e.toFixed(a).replace(".", "")),
      o = Number.parseInt(t.toFixed(a).replace(".", ""));
    return (s % o) / 10 ** a;
  }
  class na extends X {
    constructor() {
      (super(...arguments),
        (this.min = this.gte),
        (this.max = this.lte),
        (this.step = this.multipleOf));
    }
    _parse(t) {
      if (
        (this._def.coerce && (t.data = Number(t.data)),
        this._getType(t) !== M.number)
      ) {
        const s = this._getOrReturnCtx(t);
        return (
          D(s, {
            code: P.invalid_type,
            expected: M.number,
            received: s.parsedType,
          }),
          V
        );
      }
      let n;
      const a = new Ze();
      for (const s of this._def.checks)
        s.kind === "int"
          ? re.isInteger(t.data) ||
            ((n = this._getOrReturnCtx(t, n)),
            D(n, {
              code: P.invalid_type,
              expected: "integer",
              received: "float",
              message: s.message,
            }),
            a.dirty())
          : s.kind === "min"
            ? (s.inclusive ? t.data < s.value : t.data <= s.value) &&
              ((n = this._getOrReturnCtx(t, n)),
              D(n, {
                code: P.too_small,
                minimum: s.value,
                type: "number",
                inclusive: s.inclusive,
                exact: !1,
                message: s.message,
              }),
              a.dirty())
            : s.kind === "max"
              ? (s.inclusive ? t.data > s.value : t.data >= s.value) &&
                ((n = this._getOrReturnCtx(t, n)),
                D(n, {
                  code: P.too_big,
                  maximum: s.value,
                  type: "number",
                  inclusive: s.inclusive,
                  exact: !1,
                  message: s.message,
                }),
                a.dirty())
              : s.kind === "multipleOf"
                ? av(t.data, s.value) !== 0 &&
                  ((n = this._getOrReturnCtx(t, n)),
                  D(n, {
                    code: P.not_multiple_of,
                    multipleOf: s.value,
                    message: s.message,
                  }),
                  a.dirty())
                : s.kind === "finite"
                  ? Number.isFinite(t.data) ||
                    ((n = this._getOrReturnCtx(t, n)),
                    D(n, { code: P.not_finite, message: s.message }),
                    a.dirty())
                  : re.assertNever(s);
      return { status: a.value, value: t.data };
    }
    gte(t, r) {
      return this.setLimit("min", t, !0, B.toString(r));
    }
    gt(t, r) {
      return this.setLimit("min", t, !1, B.toString(r));
    }
    lte(t, r) {
      return this.setLimit("max", t, !0, B.toString(r));
    }
    lt(t, r) {
      return this.setLimit("max", t, !1, B.toString(r));
    }
    setLimit(t, r, n, a) {
      return new na({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: t, value: r, inclusive: n, message: B.toString(a) },
        ],
      });
    }
    _addCheck(t) {
      return new na({ ...this._def, checks: [...this._def.checks, t] });
    }
    int(t) {
      return this._addCheck({ kind: "int", message: B.toString(t) });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !1,
        message: B.toString(t),
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !1,
        message: B.toString(t),
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: 0,
        inclusive: !0,
        message: B.toString(t),
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: 0,
        inclusive: !0,
        message: B.toString(t),
      });
    }
    multipleOf(t, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: B.toString(r),
      });
    }
    finite(t) {
      return this._addCheck({ kind: "finite", message: B.toString(t) });
    }
    safe(t) {
      return this._addCheck({
        kind: "min",
        inclusive: !0,
        value: Number.MIN_SAFE_INTEGER,
        message: B.toString(t),
      })._addCheck({
        kind: "max",
        inclusive: !0,
        value: Number.MAX_SAFE_INTEGER,
        message: B.toString(t),
      });
    }
    get minValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
    get isInt() {
      return !!this._def.checks.find(
        (t) =>
          t.kind === "int" || (t.kind === "multipleOf" && re.isInteger(t.value))
      );
    }
    get isFinite() {
      let t = null,
        r = null;
      for (const n of this._def.checks) {
        if (n.kind === "finite" || n.kind === "int" || n.kind === "multipleOf")
          return !0;
        n.kind === "min"
          ? (r === null || n.value > r) && (r = n.value)
          : n.kind === "max" && (t === null || n.value < t) && (t = n.value);
      }
      return Number.isFinite(r) && Number.isFinite(t);
    }
  }
  na.create = (e) =>
    new na({
      checks: [],
      typeName: K.ZodNumber,
      coerce: e?.coerce || !1,
      ...W(e),
    });
  class hs extends X {
    constructor() {
      (super(...arguments), (this.min = this.gte), (this.max = this.lte));
    }
    _parse(t) {
      if (this._def.coerce)
        try {
          t.data = BigInt(t.data);
        } catch {
          return this._getInvalidInput(t);
        }
      if (this._getType(t) !== M.bigint) return this._getInvalidInput(t);
      let n;
      const a = new Ze();
      for (const s of this._def.checks)
        s.kind === "min"
          ? (s.inclusive ? t.data < s.value : t.data <= s.value) &&
            ((n = this._getOrReturnCtx(t, n)),
            D(n, {
              code: P.too_small,
              type: "bigint",
              minimum: s.value,
              inclusive: s.inclusive,
              message: s.message,
            }),
            a.dirty())
          : s.kind === "max"
            ? (s.inclusive ? t.data > s.value : t.data >= s.value) &&
              ((n = this._getOrReturnCtx(t, n)),
              D(n, {
                code: P.too_big,
                type: "bigint",
                maximum: s.value,
                inclusive: s.inclusive,
                message: s.message,
              }),
              a.dirty())
            : s.kind === "multipleOf"
              ? t.data % s.value !== BigInt(0) &&
                ((n = this._getOrReturnCtx(t, n)),
                D(n, {
                  code: P.not_multiple_of,
                  multipleOf: s.value,
                  message: s.message,
                }),
                a.dirty())
              : re.assertNever(s);
      return { status: a.value, value: t.data };
    }
    _getInvalidInput(t) {
      const r = this._getOrReturnCtx(t);
      return (
        D(r, {
          code: P.invalid_type,
          expected: M.bigint,
          received: r.parsedType,
        }),
        V
      );
    }
    gte(t, r) {
      return this.setLimit("min", t, !0, B.toString(r));
    }
    gt(t, r) {
      return this.setLimit("min", t, !1, B.toString(r));
    }
    lte(t, r) {
      return this.setLimit("max", t, !0, B.toString(r));
    }
    lt(t, r) {
      return this.setLimit("max", t, !1, B.toString(r));
    }
    setLimit(t, r, n, a) {
      return new hs({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: t, value: r, inclusive: n, message: B.toString(a) },
        ],
      });
    }
    _addCheck(t) {
      return new hs({ ...this._def, checks: [...this._def.checks, t] });
    }
    positive(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !1,
        message: B.toString(t),
      });
    }
    negative(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !1,
        message: B.toString(t),
      });
    }
    nonpositive(t) {
      return this._addCheck({
        kind: "max",
        value: BigInt(0),
        inclusive: !0,
        message: B.toString(t),
      });
    }
    nonnegative(t) {
      return this._addCheck({
        kind: "min",
        value: BigInt(0),
        inclusive: !0,
        message: B.toString(t),
      });
    }
    multipleOf(t, r) {
      return this._addCheck({
        kind: "multipleOf",
        value: t,
        message: B.toString(r),
      });
    }
    get minValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t;
    }
    get maxValue() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t;
    }
  }
  hs.create = (e) =>
    new hs({
      checks: [],
      typeName: K.ZodBigInt,
      coerce: e?.coerce ?? !1,
      ...W(e),
    });
  class Oc extends X {
    _parse(t) {
      if (
        (this._def.coerce && (t.data = !!t.data),
        this._getType(t) !== M.boolean)
      ) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.boolean,
            received: n.parsedType,
          }),
          V
        );
      }
      return bt(t.data);
    }
  }
  Oc.create = (e) =>
    new Oc({ typeName: K.ZodBoolean, coerce: e?.coerce || !1, ...W(e) });
  class Wi extends X {
    _parse(t) {
      if (
        (this._def.coerce && (t.data = new Date(t.data)),
        this._getType(t) !== M.date)
      ) {
        const s = this._getOrReturnCtx(t);
        return (
          D(s, {
            code: P.invalid_type,
            expected: M.date,
            received: s.parsedType,
          }),
          V
        );
      }
      if (Number.isNaN(t.data.getTime())) {
        const s = this._getOrReturnCtx(t);
        return (D(s, { code: P.invalid_date }), V);
      }
      const n = new Ze();
      let a;
      for (const s of this._def.checks)
        s.kind === "min"
          ? t.data.getTime() < s.value &&
            ((a = this._getOrReturnCtx(t, a)),
            D(a, {
              code: P.too_small,
              message: s.message,
              inclusive: !0,
              exact: !1,
              minimum: s.value,
              type: "date",
            }),
            n.dirty())
          : s.kind === "max"
            ? t.data.getTime() > s.value &&
              ((a = this._getOrReturnCtx(t, a)),
              D(a, {
                code: P.too_big,
                message: s.message,
                inclusive: !0,
                exact: !1,
                maximum: s.value,
                type: "date",
              }),
              n.dirty())
            : re.assertNever(s);
      return { status: n.value, value: new Date(t.data.getTime()) };
    }
    _addCheck(t) {
      return new Wi({ ...this._def, checks: [...this._def.checks, t] });
    }
    min(t, r) {
      return this._addCheck({
        kind: "min",
        value: t.getTime(),
        message: B.toString(r),
      });
    }
    max(t, r) {
      return this._addCheck({
        kind: "max",
        value: t.getTime(),
        message: B.toString(r),
      });
    }
    get minDate() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "min" && (t === null || r.value > t) && (t = r.value);
      return t != null ? new Date(t) : null;
    }
    get maxDate() {
      let t = null;
      for (const r of this._def.checks)
        r.kind === "max" && (t === null || r.value < t) && (t = r.value);
      return t != null ? new Date(t) : null;
    }
  }
  Wi.create = (e) =>
    new Wi({
      checks: [],
      coerce: e?.coerce || !1,
      typeName: K.ZodDate,
      ...W(e),
    });
  class dh extends X {
    _parse(t) {
      if (this._getType(t) !== M.symbol) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.symbol,
            received: n.parsedType,
          }),
          V
        );
      }
      return bt(t.data);
    }
  }
  dh.create = (e) => new dh({ typeName: K.ZodSymbol, ...W(e) });
  class Lc extends X {
    _parse(t) {
      if (this._getType(t) !== M.undefined) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.undefined,
            received: n.parsedType,
          }),
          V
        );
      }
      return bt(t.data);
    }
  }
  Lc.create = (e) => new Lc({ typeName: K.ZodUndefined, ...W(e) });
  class Dc extends X {
    _parse(t) {
      if (this._getType(t) !== M.null) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.null,
            received: n.parsedType,
          }),
          V
        );
      }
      return bt(t.data);
    }
  }
  Dc.create = (e) => new Dc({ typeName: K.ZodNull, ...W(e) });
  class Ic extends X {
    constructor() {
      (super(...arguments), (this._any = !0));
    }
    _parse(t) {
      return bt(t.data);
    }
  }
  Ic.create = (e) => new Ic({ typeName: K.ZodAny, ...W(e) });
  class Mc extends X {
    constructor() {
      (super(...arguments), (this._unknown = !0));
    }
    _parse(t) {
      return bt(t.data);
    }
  }
  Mc.create = (e) => new Mc({ typeName: K.ZodUnknown, ...W(e) });
  class Or extends X {
    _parse(t) {
      const r = this._getOrReturnCtx(t);
      return (
        D(r, {
          code: P.invalid_type,
          expected: M.never,
          received: r.parsedType,
        }),
        V
      );
    }
  }
  Or.create = (e) => new Or({ typeName: K.ZodNever, ...W(e) });
  class ph extends X {
    _parse(t) {
      if (this._getType(t) !== M.undefined) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.void,
            received: n.parsedType,
          }),
          V
        );
      }
      return bt(t.data);
    }
  }
  ph.create = (e) => new ph({ typeName: K.ZodVoid, ...W(e) });
  class zt extends X {
    _parse(t) {
      const { ctx: r, status: n } = this._processInputParams(t),
        a = this._def;
      if (r.parsedType !== M.array)
        return (
          D(r, {
            code: P.invalid_type,
            expected: M.array,
            received: r.parsedType,
          }),
          V
        );
      if (a.exactLength !== null) {
        const o = r.data.length > a.exactLength.value,
          l = r.data.length < a.exactLength.value;
        (o || l) &&
          (D(r, {
            code: o ? P.too_big : P.too_small,
            minimum: l ? a.exactLength.value : void 0,
            maximum: o ? a.exactLength.value : void 0,
            type: "array",
            inclusive: !0,
            exact: !0,
            message: a.exactLength.message,
          }),
          n.dirty());
      }
      if (
        (a.minLength !== null &&
          r.data.length < a.minLength.value &&
          (D(r, {
            code: P.too_small,
            minimum: a.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: a.minLength.message,
          }),
          n.dirty()),
        a.maxLength !== null &&
          r.data.length > a.maxLength.value &&
          (D(r, {
            code: P.too_big,
            maximum: a.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: a.maxLength.message,
          }),
          n.dirty()),
        r.common.async)
      )
        return Promise.all(
          [...r.data].map((o, l) => a.type._parseAsync(new Ft(r, o, r.path, l)))
        ).then((o) => Ze.mergeArray(n, o));
      const s = [...r.data].map((o, l) =>
        a.type._parseSync(new Ft(r, o, r.path, l))
      );
      return Ze.mergeArray(n, s);
    }
    get element() {
      return this._def.type;
    }
    min(t, r) {
      return new zt({
        ...this._def,
        minLength: { value: t, message: B.toString(r) },
      });
    }
    max(t, r) {
      return new zt({
        ...this._def,
        maxLength: { value: t, message: B.toString(r) },
      });
    }
    length(t, r) {
      return new zt({
        ...this._def,
        exactLength: { value: t, message: B.toString(r) },
      });
    }
    nonempty(t) {
      return this.min(1, t);
    }
  }
  zt.create = (e, t) =>
    new zt({
      type: e,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: K.ZodArray,
      ...W(t),
    });
  function aa(e) {
    if (e instanceof je) {
      const t = {};
      for (const r in e.shape) {
        const n = e.shape[r];
        t[r] = nr.create(aa(n));
      }
      return new je({ ...e._def, shape: () => t });
    } else
      return e instanceof zt
        ? new zt({ ...e._def, type: aa(e.element) })
        : e instanceof nr
          ? nr.create(aa(e.unwrap()))
          : e instanceof pn
            ? pn.create(aa(e.unwrap()))
            : e instanceof cn
              ? cn.create(e.items.map((t) => aa(t)))
              : e;
  }
  class je extends X {
    constructor() {
      (super(...arguments),
        (this._cached = null),
        (this.nonstrict = this.passthrough),
        (this.augment = this.extend));
    }
    _getCached() {
      if (this._cached !== null) return this._cached;
      const t = this._def.shape(),
        r = re.objectKeys(t);
      return ((this._cached = { shape: t, keys: r }), this._cached);
    }
    _parse(t) {
      if (this._getType(t) !== M.object) {
        const u = this._getOrReturnCtx(t);
        return (
          D(u, {
            code: P.invalid_type,
            expected: M.object,
            received: u.parsedType,
          }),
          V
        );
      }
      const { status: n, ctx: a } = this._processInputParams(t),
        { shape: s, keys: o } = this._getCached(),
        l = [];
      if (
        !(this._def.catchall instanceof Or && this._def.unknownKeys === "strip")
      )
        for (const u in a.data) o.includes(u) || l.push(u);
      const c = [];
      for (const u of o) {
        const p = s[u],
          f = a.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: p._parse(new Ft(a, f, a.path, u)),
          alwaysSet: u in a.data,
        });
      }
      if (this._def.catchall instanceof Or) {
        const u = this._def.unknownKeys;
        if (u === "passthrough")
          for (const p of l)
            c.push({
              key: { status: "valid", value: p },
              value: { status: "valid", value: a.data[p] },
            });
        else if (u === "strict")
          l.length > 0 &&
            (D(a, { code: P.unrecognized_keys, keys: l }), n.dirty());
        else if (u !== "strip")
          throw new Error(
            "Internal ZodObject error: invalid unknownKeys value."
          );
      } else {
        const u = this._def.catchall;
        for (const p of l) {
          const f = a.data[p];
          c.push({
            key: { status: "valid", value: p },
            value: u._parse(new Ft(a, f, a.path, p)),
            alwaysSet: p in a.data,
          });
        }
      }
      return a.common.async
        ? Promise.resolve()
            .then(async () => {
              const u = [];
              for (const p of c) {
                const f = await p.key,
                  m = await p.value;
                u.push({ key: f, value: m, alwaysSet: p.alwaysSet });
              }
              return u;
            })
            .then((u) => Ze.mergeObjectSync(n, u))
        : Ze.mergeObjectSync(n, c);
    }
    get shape() {
      return this._def.shape();
    }
    strict(t) {
      return (
        B.errToObj,
        new je({
          ...this._def,
          unknownKeys: "strict",
          ...(t !== void 0
            ? {
                errorMap: (r, n) => {
                  const a =
                    this._def.errorMap?.(r, n).message ?? n.defaultError;
                  return r.code === "unrecognized_keys"
                    ? { message: B.errToObj(t).message ?? a }
                    : { message: a };
                },
              }
            : {}),
        })
      );
    }
    strip() {
      return new je({ ...this._def, unknownKeys: "strip" });
    }
    passthrough() {
      return new je({ ...this._def, unknownKeys: "passthrough" });
    }
    extend(t) {
      return new je({
        ...this._def,
        shape: () => ({ ...this._def.shape(), ...t }),
      });
    }
    merge(t) {
      return new je({
        unknownKeys: t._def.unknownKeys,
        catchall: t._def.catchall,
        shape: () => ({ ...this._def.shape(), ...t._def.shape() }),
        typeName: K.ZodObject,
      });
    }
    setKey(t, r) {
      return this.augment({ [t]: r });
    }
    catchall(t) {
      return new je({ ...this._def, catchall: t });
    }
    pick(t) {
      const r = {};
      for (const n of re.objectKeys(t))
        t[n] && this.shape[n] && (r[n] = this.shape[n]);
      return new je({ ...this._def, shape: () => r });
    }
    omit(t) {
      const r = {};
      for (const n of re.objectKeys(this.shape)) t[n] || (r[n] = this.shape[n]);
      return new je({ ...this._def, shape: () => r });
    }
    deepPartial() {
      return aa(this);
    }
    partial(t) {
      const r = {};
      for (const n of re.objectKeys(this.shape)) {
        const a = this.shape[n];
        t && !t[n] ? (r[n] = a) : (r[n] = a.optional());
      }
      return new je({ ...this._def, shape: () => r });
    }
    required(t) {
      const r = {};
      for (const n of re.objectKeys(this.shape))
        if (t && !t[n]) r[n] = this.shape[n];
        else {
          let s = this.shape[n];
          for (; s instanceof nr; ) s = s._def.innerType;
          r[n] = s;
        }
      return new je({ ...this._def, shape: () => r });
    }
    keyof() {
      return hh(re.objectKeys(this.shape));
    }
  }
  ((je.create = (e, t) =>
    new je({
      shape: () => e,
      unknownKeys: "strip",
      catchall: Or.create(),
      typeName: K.ZodObject,
      ...W(t),
    })),
    (je.strictCreate = (e, t) =>
      new je({
        shape: () => e,
        unknownKeys: "strict",
        catchall: Or.create(),
        typeName: K.ZodObject,
        ...W(t),
      })),
    (je.lazycreate = (e, t) =>
      new je({
        shape: e,
        unknownKeys: "strip",
        catchall: Or.create(),
        typeName: K.ZodObject,
        ...W(t),
      })));
  class Hi extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t),
        n = this._def.options;
      function a(s) {
        for (const l of s) if (l.result.status === "valid") return l.result;
        for (const l of s)
          if (l.result.status === "dirty")
            return (r.common.issues.push(...l.ctx.common.issues), l.result);
        const o = s.map((l) => new Mt(l.ctx.common.issues));
        return (D(r, { code: P.invalid_union, unionErrors: o }), V);
      }
      if (r.common.async)
        return Promise.all(
          n.map(async (s) => {
            const o = {
              ...r,
              common: { ...r.common, issues: [] },
              parent: null,
            };
            return {
              result: await s._parseAsync({
                data: r.data,
                path: r.path,
                parent: o,
              }),
              ctx: o,
            };
          })
        ).then(a);
      {
        let s;
        const o = [];
        for (const c of n) {
          const u = { ...r, common: { ...r.common, issues: [] }, parent: null },
            p = c._parseSync({ data: r.data, path: r.path, parent: u });
          if (p.status === "valid") return p;
          (p.status === "dirty" && !s && (s = { result: p, ctx: u }),
            u.common.issues.length && o.push(u.common.issues));
        }
        if (s) return (r.common.issues.push(...s.ctx.common.issues), s.result);
        const l = o.map((c) => new Mt(c));
        return (D(r, { code: P.invalid_union, unionErrors: l }), V);
      }
    }
    get options() {
      return this._def.options;
    }
  }
  Hi.create = (e, t) => new Hi({ options: e, typeName: K.ZodUnion, ...W(t) });
  const rr = (e) =>
    e instanceof qc
      ? rr(e.schema)
      : e instanceof dn
        ? rr(e.innerType())
        : e instanceof Gi
          ? [e.value]
          : e instanceof un
            ? e.options
            : e instanceof Bc
              ? re.objectValues(e.enum)
              : e instanceof Xi
                ? rr(e._def.innerType)
                : e instanceof Lc
                  ? [void 0]
                  : e instanceof Dc
                    ? [null]
                    : e instanceof nr
                      ? [void 0, ...rr(e.unwrap())]
                      : e instanceof pn
                        ? [null, ...rr(e.unwrap())]
                        : e instanceof gh || e instanceof eo
                          ? rr(e.unwrap())
                          : e instanceof Ji
                            ? rr(e._def.innerType)
                            : [];
  class Fc extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== M.object)
        return (
          D(r, {
            code: P.invalid_type,
            expected: M.object,
            received: r.parsedType,
          }),
          V
        );
      const n = this.discriminator,
        a = r.data[n],
        s = this.optionsMap.get(a);
      return s
        ? r.common.async
          ? s._parseAsync({ data: r.data, path: r.path, parent: r })
          : s._parseSync({ data: r.data, path: r.path, parent: r })
        : (D(r, {
            code: P.invalid_union_discriminator,
            options: Array.from(this.optionsMap.keys()),
            path: [n],
          }),
          V);
    }
    get discriminator() {
      return this._def.discriminator;
    }
    get options() {
      return this._def.options;
    }
    get optionsMap() {
      return this._def.optionsMap;
    }
    static create(t, r, n) {
      const a = new Map();
      for (const s of r) {
        const o = rr(s.shape[t]);
        if (!o.length)
          throw new Error(
            `A discriminator value for key \`${t}\` could not be extracted from all schema options`
          );
        for (const l of o) {
          if (a.has(l))
            throw new Error(
              `Discriminator property ${String(t)} has duplicate value ${String(l)}`
            );
          a.set(l, s);
        }
      }
      return new Fc({
        typeName: K.ZodDiscriminatedUnion,
        discriminator: t,
        options: r,
        optionsMap: a,
        ...W(n),
      });
    }
  }
  function zc(e, t) {
    const r = Pr(e),
      n = Pr(t);
    if (e === t) return { valid: !0, data: e };
    if (r === M.object && n === M.object) {
      const a = re.objectKeys(t),
        s = re.objectKeys(e).filter((l) => a.indexOf(l) !== -1),
        o = { ...e, ...t };
      for (const l of s) {
        const c = zc(e[l], t[l]);
        if (!c.valid) return { valid: !1 };
        o[l] = c.data;
      }
      return { valid: !0, data: o };
    } else if (r === M.array && n === M.array) {
      if (e.length !== t.length) return { valid: !1 };
      const a = [];
      for (let s = 0; s < e.length; s++) {
        const o = e[s],
          l = t[s],
          c = zc(o, l);
        if (!c.valid) return { valid: !1 };
        a.push(c.data);
      }
      return { valid: !0, data: a };
    } else
      return r === M.date && n === M.date && +e == +t
        ? { valid: !0, data: e }
        : { valid: !1 };
  }
  class Qi extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t),
        a = (s, o) => {
          if (ih(s) || ih(o)) return V;
          const l = zc(s.value, o.value);
          return l.valid
            ? ((oh(s) || oh(o)) && r.dirty(),
              { status: r.value, value: l.data })
            : (D(n, { code: P.invalid_intersection_types }), V);
        };
      return n.common.async
        ? Promise.all([
            this._def.left._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseAsync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
          ]).then(([s, o]) => a(s, o))
        : a(
            this._def.left._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            }),
            this._def.right._parseSync({
              data: n.data,
              path: n.path,
              parent: n,
            })
          );
    }
  }
  Qi.create = (e, t, r) =>
    new Qi({ left: e, right: t, typeName: K.ZodIntersection, ...W(r) });
  class cn extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== M.array)
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.array,
            received: n.parsedType,
          }),
          V
        );
      if (n.data.length < this._def.items.length)
        return (
          D(n, {
            code: P.too_small,
            minimum: this._def.items.length,
            inclusive: !0,
            exact: !1,
            type: "array",
          }),
          V
        );
      !this._def.rest &&
        n.data.length > this._def.items.length &&
        (D(n, {
          code: P.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        r.dirty());
      const s = [...n.data]
        .map((o, l) => {
          const c = this._def.items[l] || this._def.rest;
          return c ? c._parse(new Ft(n, o, n.path, l)) : null;
        })
        .filter((o) => !!o);
      return n.common.async
        ? Promise.all(s).then((o) => Ze.mergeArray(r, o))
        : Ze.mergeArray(r, s);
    }
    get items() {
      return this._def.items;
    }
    rest(t) {
      return new cn({ ...this._def, rest: t });
    }
  }
  cn.create = (e, t) => {
    if (!Array.isArray(e))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new cn({ items: e, typeName: K.ZodTuple, rest: null, ...W(t) });
  };
  class Zi extends X {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== M.object)
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.object,
            received: n.parsedType,
          }),
          V
        );
      const a = [],
        s = this._def.keyType,
        o = this._def.valueType;
      for (const l in n.data)
        a.push({
          key: s._parse(new Ft(n, l, n.path, l)),
          value: o._parse(new Ft(n, n.data[l], n.path, l)),
          alwaysSet: l in n.data,
        });
      return n.common.async
        ? Ze.mergeObjectAsync(r, a)
        : Ze.mergeObjectSync(r, a);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, r, n) {
      return r instanceof X
        ? new Zi({ keyType: t, valueType: r, typeName: K.ZodRecord, ...W(n) })
        : new Zi({
            keyType: tr.create(),
            valueType: t,
            typeName: K.ZodRecord,
            ...W(r),
          });
    }
  }
  class mh extends X {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== M.map)
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.map,
            received: n.parsedType,
          }),
          V
        );
      const a = this._def.keyType,
        s = this._def.valueType,
        o = [...n.data.entries()].map(([l, c], u) => ({
          key: a._parse(new Ft(n, l, n.path, [u, "key"])),
          value: s._parse(new Ft(n, c, n.path, [u, "value"])),
        }));
      if (n.common.async) {
        const l = new Map();
        return Promise.resolve().then(async () => {
          for (const c of o) {
            const u = await c.key,
              p = await c.value;
            if (u.status === "aborted" || p.status === "aborted") return V;
            ((u.status === "dirty" || p.status === "dirty") && r.dirty(),
              l.set(u.value, p.value));
          }
          return { status: r.value, value: l };
        });
      } else {
        const l = new Map();
        for (const c of o) {
          const u = c.key,
            p = c.value;
          if (u.status === "aborted" || p.status === "aborted") return V;
          ((u.status === "dirty" || p.status === "dirty") && r.dirty(),
            l.set(u.value, p.value));
        }
        return { status: r.value, value: l };
      }
    }
  }
  mh.create = (e, t, r) =>
    new mh({ valueType: t, keyType: e, typeName: K.ZodMap, ...W(r) });
  class fs extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== M.set)
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.set,
            received: n.parsedType,
          }),
          V
        );
      const a = this._def;
      (a.minSize !== null &&
        n.data.size < a.minSize.value &&
        (D(n, {
          code: P.too_small,
          minimum: a.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: a.minSize.message,
        }),
        r.dirty()),
        a.maxSize !== null &&
          n.data.size > a.maxSize.value &&
          (D(n, {
            code: P.too_big,
            maximum: a.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: a.maxSize.message,
          }),
          r.dirty()));
      const s = this._def.valueType;
      function o(c) {
        const u = new Set();
        for (const p of c) {
          if (p.status === "aborted") return V;
          (p.status === "dirty" && r.dirty(), u.add(p.value));
        }
        return { status: r.value, value: u };
      }
      const l = [...n.data.values()].map((c, u) =>
        s._parse(new Ft(n, c, n.path, u))
      );
      return n.common.async ? Promise.all(l).then((c) => o(c)) : o(l);
    }
    min(t, r) {
      return new fs({
        ...this._def,
        minSize: { value: t, message: B.toString(r) },
      });
    }
    max(t, r) {
      return new fs({
        ...this._def,
        maxSize: { value: t, message: B.toString(r) },
      });
    }
    size(t, r) {
      return this.min(t, r).max(t, r);
    }
    nonempty(t) {
      return this.min(1, t);
    }
  }
  fs.create = (e, t) =>
    new fs({
      valueType: e,
      minSize: null,
      maxSize: null,
      typeName: K.ZodSet,
      ...W(t),
    });
  class qc extends X {
    get schema() {
      return this._def.getter();
    }
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      return this._def
        .getter()
        ._parse({ data: r.data, path: r.path, parent: r });
    }
  }
  qc.create = (e, t) => new qc({ getter: e, typeName: K.ZodLazy, ...W(t) });
  class Gi extends X {
    _parse(t) {
      if (t.data !== this._def.value) {
        const r = this._getOrReturnCtx(t);
        return (
          D(r, {
            received: r.data,
            code: P.invalid_literal,
            expected: this._def.value,
          }),
          V
        );
      }
      return { status: "valid", value: t.data };
    }
    get value() {
      return this._def.value;
    }
  }
  Gi.create = (e, t) => new Gi({ value: e, typeName: K.ZodLiteral, ...W(t) });
  function hh(e, t) {
    return new un({ values: e, typeName: K.ZodEnum, ...W(t) });
  }
  class un extends X {
    _parse(t) {
      if (typeof t.data != "string") {
        const r = this._getOrReturnCtx(t),
          n = this._def.values;
        return (
          D(r, {
            expected: re.joinValues(n),
            received: r.parsedType,
            code: P.invalid_type,
          }),
          V
        );
      }
      if (
        (this._cache || (this._cache = new Set(this._def.values)),
        !this._cache.has(t.data))
      ) {
        const r = this._getOrReturnCtx(t),
          n = this._def.values;
        return (
          D(r, { received: r.data, code: P.invalid_enum_value, options: n }),
          V
        );
      }
      return bt(t.data);
    }
    get options() {
      return this._def.values;
    }
    get enum() {
      const t = {};
      for (const r of this._def.values) t[r] = r;
      return t;
    }
    get Values() {
      const t = {};
      for (const r of this._def.values) t[r] = r;
      return t;
    }
    get Enum() {
      const t = {};
      for (const r of this._def.values) t[r] = r;
      return t;
    }
    extract(t, r = this._def) {
      return un.create(t, { ...this._def, ...r });
    }
    exclude(t, r = this._def) {
      return un.create(
        this.options.filter((n) => !t.includes(n)),
        { ...this._def, ...r }
      );
    }
  }
  un.create = hh;
  class Bc extends X {
    _parse(t) {
      const r = re.getValidEnumValues(this._def.values),
        n = this._getOrReturnCtx(t);
      if (n.parsedType !== M.string && n.parsedType !== M.number) {
        const a = re.objectValues(r);
        return (
          D(n, {
            expected: re.joinValues(a),
            received: n.parsedType,
            code: P.invalid_type,
          }),
          V
        );
      }
      if (
        (this._cache ||
          (this._cache = new Set(re.getValidEnumValues(this._def.values))),
        !this._cache.has(t.data))
      ) {
        const a = re.objectValues(r);
        return (
          D(n, { received: n.data, code: P.invalid_enum_value, options: a }),
          V
        );
      }
      return bt(t.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  Bc.create = (e, t) =>
    new Bc({ values: e, typeName: K.ZodNativeEnum, ...W(t) });
  class Yi extends X {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== M.promise && r.common.async === !1)
        return (
          D(r, {
            code: P.invalid_type,
            expected: M.promise,
            received: r.parsedType,
          }),
          V
        );
      const n = r.parsedType === M.promise ? r.data : Promise.resolve(r.data);
      return bt(
        n.then((a) =>
          this._def.type.parseAsync(a, {
            path: r.path,
            errorMap: r.common.contextualErrorMap,
          })
        )
      );
    }
  }
  Yi.create = (e, t) => new Yi({ type: e, typeName: K.ZodPromise, ...W(t) });
  class dn extends X {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === K.ZodEffects
        ? this._def.schema.sourceType()
        : this._def.schema;
    }
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t),
        a = this._def.effect || null,
        s = {
          addIssue: (o) => {
            (D(n, o), o.fatal ? r.abort() : r.dirty());
          },
          get path() {
            return n.path;
          },
        };
      if (((s.addIssue = s.addIssue.bind(s)), a.type === "preprocess")) {
        const o = a.transform(n.data, s);
        if (n.common.async)
          return Promise.resolve(o).then(async (l) => {
            if (r.value === "aborted") return V;
            const c = await this._def.schema._parseAsync({
              data: l,
              path: n.path,
              parent: n,
            });
            return c.status === "aborted"
              ? V
              : c.status === "dirty" || r.value === "dirty"
                ? ms(c.value)
                : c;
          });
        {
          if (r.value === "aborted") return V;
          const l = this._def.schema._parseSync({
            data: o,
            path: n.path,
            parent: n,
          });
          return l.status === "aborted"
            ? V
            : l.status === "dirty" || r.value === "dirty"
              ? ms(l.value)
              : l;
        }
      }
      if (a.type === "refinement") {
        const o = (l) => {
          const c = a.refinement(l, s);
          if (n.common.async) return Promise.resolve(c);
          if (c instanceof Promise)
            throw new Error(
              "Async refinement encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return l;
        };
        if (n.common.async === !1) {
          const l = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return l.status === "aborted"
            ? V
            : (l.status === "dirty" && r.dirty(),
              o(l.value),
              { status: r.value, value: l.value });
        } else
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((l) =>
              l.status === "aborted"
                ? V
                : (l.status === "dirty" && r.dirty(),
                  o(l.value).then(() => ({ status: r.value, value: l.value })))
            );
      }
      if (a.type === "transform")
        if (n.common.async === !1) {
          const o = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          if (!ra(o)) return V;
          const l = a.transform(o.value, s);
          if (l instanceof Promise)
            throw new Error(
              "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return { status: r.value, value: l };
        } else
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((o) =>
              ra(o)
                ? Promise.resolve(a.transform(o.value, s)).then((l) => ({
                    status: r.value,
                    value: l,
                  }))
                : V
            );
      re.assertNever(a);
    }
  }
  ((dn.create = (e, t, r) =>
    new dn({ schema: e, typeName: K.ZodEffects, effect: t, ...W(r) })),
    (dn.createWithPreprocess = (e, t, r) =>
      new dn({
        schema: t,
        effect: { type: "preprocess", transform: e },
        typeName: K.ZodEffects,
        ...W(r),
      })));
  class nr extends X {
    _parse(t) {
      return this._getType(t) === M.undefined
        ? bt(void 0)
        : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  nr.create = (e, t) =>
    new nr({ innerType: e, typeName: K.ZodOptional, ...W(t) });
  class pn extends X {
    _parse(t) {
      return this._getType(t) === M.null
        ? bt(null)
        : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  pn.create = (e, t) =>
    new pn({ innerType: e, typeName: K.ZodNullable, ...W(t) });
  class Xi extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      let n = r.data;
      return (
        r.parsedType === M.undefined && (n = this._def.defaultValue()),
        this._def.innerType._parse({ data: n, path: r.path, parent: r })
      );
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  Xi.create = (e, t) =>
    new Xi({
      innerType: e,
      typeName: K.ZodDefault,
      defaultValue:
        typeof t.default == "function" ? t.default : () => t.default,
      ...W(t),
    });
  class Ji extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t),
        n = { ...r, common: { ...r.common, issues: [] } },
        a = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: { ...n },
        });
      return Ki(a)
        ? a.then((s) => ({
            status: "valid",
            value:
              s.status === "valid"
                ? s.value
                : this._def.catchValue({
                    get error() {
                      return new Mt(n.common.issues);
                    },
                    input: n.data,
                  }),
          }))
        : {
            status: "valid",
            value:
              a.status === "valid"
                ? a.value
                : this._def.catchValue({
                    get error() {
                      return new Mt(n.common.issues);
                    },
                    input: n.data,
                  }),
          };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  Ji.create = (e, t) =>
    new Ji({
      innerType: e,
      typeName: K.ZodCatch,
      catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
      ...W(t),
    });
  class fh extends X {
    _parse(t) {
      if (this._getType(t) !== M.nan) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: P.invalid_type,
            expected: M.nan,
            received: n.parsedType,
          }),
          V
        );
      }
      return { status: "valid", value: t.data };
    }
  }
  fh.create = (e) => new fh({ typeName: K.ZodNaN, ...W(e) });
  class gh extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t),
        n = r.data;
      return this._def.type._parse({ data: n, path: r.path, parent: r });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class Uc extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.common.async)
        return (async () => {
          const s = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return s.status === "aborted"
            ? V
            : s.status === "dirty"
              ? (r.dirty(), ms(s.value))
              : this._def.out._parseAsync({
                  data: s.value,
                  path: n.path,
                  parent: n,
                });
        })();
      {
        const a = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return a.status === "aborted"
          ? V
          : a.status === "dirty"
            ? (r.dirty(), { status: "dirty", value: a.value })
            : this._def.out._parseSync({
                data: a.value,
                path: n.path,
                parent: n,
              });
      }
    }
    static create(t, r) {
      return new Uc({ in: t, out: r, typeName: K.ZodPipeline });
    }
  }
  class eo extends X {
    _parse(t) {
      const r = this._def.innerType._parse(t),
        n = (a) => (ra(a) && (a.value = Object.freeze(a.value)), a);
      return Ki(r) ? r.then((a) => n(a)) : n(r);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  eo.create = (e, t) =>
    new eo({ innerType: e, typeName: K.ZodReadonly, ...W(t) });
  var K;
  (function (e) {
    ((e.ZodString = "ZodString"),
      (e.ZodNumber = "ZodNumber"),
      (e.ZodNaN = "ZodNaN"),
      (e.ZodBigInt = "ZodBigInt"),
      (e.ZodBoolean = "ZodBoolean"),
      (e.ZodDate = "ZodDate"),
      (e.ZodSymbol = "ZodSymbol"),
      (e.ZodUndefined = "ZodUndefined"),
      (e.ZodNull = "ZodNull"),
      (e.ZodAny = "ZodAny"),
      (e.ZodUnknown = "ZodUnknown"),
      (e.ZodNever = "ZodNever"),
      (e.ZodVoid = "ZodVoid"),
      (e.ZodArray = "ZodArray"),
      (e.ZodObject = "ZodObject"),
      (e.ZodUnion = "ZodUnion"),
      (e.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
      (e.ZodIntersection = "ZodIntersection"),
      (e.ZodTuple = "ZodTuple"),
      (e.ZodRecord = "ZodRecord"),
      (e.ZodMap = "ZodMap"),
      (e.ZodSet = "ZodSet"),
      (e.ZodFunction = "ZodFunction"),
      (e.ZodLazy = "ZodLazy"),
      (e.ZodLiteral = "ZodLiteral"),
      (e.ZodEnum = "ZodEnum"),
      (e.ZodEffects = "ZodEffects"),
      (e.ZodNativeEnum = "ZodNativeEnum"),
      (e.ZodOptional = "ZodOptional"),
      (e.ZodNullable = "ZodNullable"),
      (e.ZodDefault = "ZodDefault"),
      (e.ZodCatch = "ZodCatch"),
      (e.ZodPromise = "ZodPromise"),
      (e.ZodBranded = "ZodBranded"),
      (e.ZodPipeline = "ZodPipeline"),
      (e.ZodReadonly = "ZodReadonly"));
  })(K || (K = {}));
  const k = tr.create,
    z = na.create,
    Oe = Oc.create,
    yh = Ic.create,
    gs = Mc.create;
  Or.create;
  const Z = zt.create,
    j = je.create;
  Hi.create;
  const $c = Fc.create;
  (Qi.create, cn.create);
  const sa = Zi.create,
    ia = Gi.create,
    oe = un.create;
  (Yi.create, nr.create, pn.create);
  var vh = oe(["ok", "action_required", "unavailable"]),
    Vc = j({
      id: k().min(1),
      title: k().min(1),
      severity: oe(["info", "warning", "critical"]),
      actionUrl: k().optional(),
      deadline: k().datetime().optional(),
    }),
    to = j({
      status: vh,
      lastChecked: k().datetime(),
      actionsRequired: Z(Vc).default([]),
    });
  j({ gdpr: to, eidas: to, pci: to, schemaOrg: to });
  var sv = j({
      overallStatus: vh,
      pendingActionsCount: z().int().min(0),
      actions: Z(Vc).optional(),
    }),
    iv = j({
      value: z().int().min(0).max(100).nullable(),
      weight: z().min(0).max(1),
      recommendations: Z(k()).default([]),
      dataQuality: k().optional(),
    }).passthrough(),
    xh = sa(iv),
    ov = j({
      id: k().min(1),
      title: k().min(1),
      status: oe(["todo", "done"]),
      actionUrl: k().url().optional(),
    }),
    lv = j({ steps: Z(ov) }),
    bh = oe([
      "cold_start",
      "human_established",
      "agent_verified_thin",
      "agent_verified",
      "insufficient_data",
    ]),
    wh = j({
      humanOrders: z().int().min(0),
      agentOrders: z().int().min(0),
      storeAgeDays: z().int().min(0),
      agenticEvidenceStatus: oe([
        "verified",
        "not_yet_observed",
        "not_applicable",
      ]),
    }),
    kh = j({
      status: ia("ready"),
      score: z().int().min(0).max(100).nullable(),
      breakdown: xh,
      computedAt: k().datetime(),
      expiresAt: k().datetime(),
      confidenceLevel: bh,
      evidenceProfile: wh,
      scoreCap: z().int().min(0).max(100),
      nextMilestone: k().nullable(),
    }),
    Sh = j({ status: ia("pending"), checklist: lv }),
    Ch = j({
      status: ia("stale"),
      score: z().int().min(0).max(100).nullable(),
      breakdown: xh,
      computedAt: k().datetime(),
      expiresAt: k().datetime(),
      confidenceLevel: bh,
      evidenceProfile: wh,
      scoreCap: z().int().min(0).max(100),
      nextMilestone: k().nullable(),
    });
  $c("status", [kh, Sh, Ch]);
  var _h = oe(["discovery", "customer", "checkout"]),
    Kc = j({
      id: k().min(1),
      callId: k().min(1),
      agentId: k().min(1),
      merchantId: k().min(1),
      bucket: _h,
      tool: k().min(1),
      inputHash: k().regex(/^[a-f0-9]{64}$/, "expected SHA-256 hex"),
      outputHash: k().regex(/^[a-f0-9]{64}$/, "expected SHA-256 hex"),
      signingKeyKid: k().min(1),
      jws: k().min(1),
      jwksSnapshotUrl: k().url().nullish(),
      createdAt: k().datetime(),
    });
  j({
    agentId: k().optional(),
    bucket: _h.optional(),
    from: k().datetime().optional(),
    to: k().datetime().optional(),
    cursor: k().optional(),
    limit: z().int().min(1).max(100).default(50),
  });
  var cv = j({ items: Z(Kc), nextCursor: k().nullable() });
  (j({
    agentId: k().optional(),
    from: k().datetime().optional(),
    to: k().datetime().optional(),
    format: oe(["jws-zip", "json-bulk"]).default("jws-zip"),
  }),
    j({ jobId: k().min(1), status: ia("queued") }));
  var uv = oe(["pending", "active", "expired", "extended", "reverted"]);
  (j({ gracePeriodDays: z().int().min(1).max(90).default(30) }),
    j({
      id: k().min(1),
      merchantId: k().min(1),
      oldKeyKid: k().min(1),
      newKeyKid: k().min(1),
      status: uv,
      graceEndsAt: k().datetime(),
      notifiedAt: k().datetime().nullable(),
      createdAt: k().datetime(),
      updatedAt: k().datetime(),
    }));
  var ys = j({
      activeKid: k().min(1),
      retiredGraceKids: Z(k().min(1)).default([]),
      lastRotatedAt: k().datetime().nullable(),
      daysSinceRotation: z().int().min(0).nullable(),
    }),
    Rh = j({
      id: k().min(1),
      merchantId: k().min(1),
      agentId: k().nullable(),
      bucket: k().nullable(),
      tool: k().nullable(),
      source: oe([
        "portal",
        "shopify-embed",
        "wp-embed",
        "api",
        "mcp",
        "webhook",
      ]),
      outcome: k().min(1),
      prevHash: k().nullable(),
      entryHash: k().min(1),
      metadata: sa(gs()).default({}),
      createdAt: k().datetime(),
    });
  j({
    agentId: k().optional(),
    bucket: k().optional(),
    tool: k().optional(),
    source: Rh.shape.source.optional(),
    from: k().datetime().optional(),
    to: k().datetime().optional(),
    cursor: k().optional(),
    limit: z().int().min(1).max(100).default(50),
  });
  var jh = j({
      items: Z(Rh),
      nextCursor: k().nullable(),
      chainIntegrity: j({
        verified: Oe(),
        verifiedThrough: k().min(1).nullable(),
        note: k().optional(),
      }),
    }),
    dv = j({
      catalog_completeness: z().min(0).max(1),
      catalog_freshness: z().min(0).max(1),
      price_accuracy: z().min(0).max(1),
      availability_accuracy: z().min(0).max(1),
      policy_coverage: z().min(0).max(1),
      checkout_success_rate: z().min(0).max(1),
      fulfillment_rate: z().min(0).max(1),
      dispute_rate: z().min(0).max(1),
      agent_satisfaction_rate: z().min(0).max(1),
      response_latency: z().min(0).max(1),
      review_sentiment: z().min(0).max(1),
      data_consistency: z().min(0).max(1),
    }),
    pv = j({
      fulfillmentOnTimeRate: z().min(0).max(1).nullable(),
      disputeRate: z().min(0).max(1).nullable(),
    }),
    Nh = j({
      score: $c("status", [kh, Sh, Ch]),
      recentReceipts: Z(Kc).max(5),
      keysStatus: ys.nullable(),
      complianceSummary: sv,
      components: dv.nullable().optional(),
      componentsAreReal: Oe().optional(),
      reliabilitySignals: pv.optional(),
      computedAt: k().datetime(),
    }),
    mv = oe(["SHOPIFY", "WOO", "ACP"]);
  j({ platform: mv });
  var hv = j({ status: ia("available"), receipt: Kc }),
    fv = j({
      status: ia("not-found"),
      reason: oe([
        "no_agent_attribution",
        "order_not_found",
        "receipt_not_yet_generated",
      ]),
    });
  $c("status", [hv, fv]);
  var Ah = oe([
      "SHOPIFY",
      "WOO",
      "ACP",
      "MAGENTO",
      "PRESTASHOP",
      "ODOO",
      "WIX",
    ]),
    Eh = oe([
      "created",
      "updated",
      "paid",
      "fulfilled",
      "cancelled",
      "refunded",
      "completed",
    ]),
    gv = j({
      amount: k().regex(/^-?\d+(\.\d+)?$/, "Decimal as string"),
      currency: k().length(3),
    }),
    Th = j({
      id: k().min(1),
      platform: Ah,
      externalOrderId: k().min(1),
      status: Eh,
      total: gv,
      agentId: k().nullable(),
      paymentRail: k().nullable(),
      storeId: k().min(1),
      createdAt: k().datetime(),
      receiptUri: k().url().nullish(),
    }),
    yv = j({
      id: k().min(1),
      platformOrderId: k().min(1),
      type: k().min(1),
      payload: sa(gs()).default({}),
      createdAt: k().datetime(),
    });
  (Th.extend({ events: Z(yv).default([]) }),
    j({
      platform: Ah.optional(),
      status: Eh.optional(),
      agentId: k().optional(),
      from: k().datetime().optional(),
      to: k().datetime().optional(),
      search: k().optional(),
      cursor: k().optional(),
      limit: z().int().min(1).max(100).default(50),
    }));
  var Ph = j({ items: Z(Th), nextCursor: k().nullable() }),
    vv = oe(["stripe-connect", "x402-wallet", "acp", "paypal", "eidas"]),
    Oh = oe(["pending", "active", "error", "disabled"]),
    xv = j({
      id: k().min(1),
      type: vv,
      state: Oh,
      label: k().min(1),
      lastHealthCheck: k().datetime().nullable(),
      errorReason: k().nullable(),
      actions: Z(oe(["rotate", "disable", "enable", "reconnect"])).default([]),
      createdAt: k().datetime(),
    });
  (j({ items: Z(xv) }),
    j({ reason: k().min(3).max(500).optional() }),
    j({ id: k().min(1), state: Oh, rotatedAt: k().datetime() }));
  var Wc = oe(["allow", "block", "probation", "pending"]),
    bv = j({
      id: k().min(1),
      agentId: k().min(1),
      publicKey: k().min(1),
      displayName: k().nullable(),
      state: Wc,
      agenticTrustScore: z().int().min(0).max(100).nullable(),
      callsLast30d: z().int().min(0),
      lastCallAt: k().datetime().nullable(),
      createdAt: k().datetime(),
    });
  j({
    state: Wc.optional(),
    cursor: k().optional(),
    limit: z().int().min(1).max(100).default(50),
  });
  var wv = j({ items: Z(bv), nextCursor: k().nullable() }),
    kv = oe(["revoke", "allow", "probation"]);
  j({ reason: k().min(3).max(500) });
  var Sv = j({ id: k().min(1), state: Wc, updatedAt: k().datetime() });
  (j({
    items: Z(
      j({ agentId: k().min(1), action: kv, reason: k().min(3).max(500) })
    )
      .min(1)
      .max(50),
  }),
    j({
      succeeded: Z(k()),
      failed: Z(j({ agentId: k().min(1), error: k() })),
    }));
  var Hc = oe(["stripe-connect", "x402", "acp", "paypal", "eidas"]),
    Lh = j({
      rail: Hc,
      enabled: Oe().default(!0),
      minAmount: k()
        .regex(/^-?\d+(\.\d+)?$/)
        .nullable()
        .default(null),
      maxAmount: k()
        .regex(/^-?\d+(\.\d+)?$/)
        .nullable()
        .default(null),
      currencyAllowlist: Z(k().length(3)).default([]),
    }),
    Dh = j({
      railsPriority: Z(Hc),
      rules: Z(Lh).default([]),
      updatedAt: k().datetime(),
    });
  j({ railsPriority: Z(Hc).min(1), rules: Z(Lh).optional() });
  var Cv = oe([
      "active",
      "expiring_soon",
      "expired",
      "pending",
      "not_applicable",
    ]),
    Qc = j({
      status: Cv,
      expiresAt: k().datetime().nullable(),
      pendingSteps: Z(k()).default([]),
      actionsRequired: Z(Vc).default([]),
    }),
    _v = j({ eidas: Qc, kyc: Qc, schemaOrg: Qc }),
    Rv = oe(["shopify-theme", "woocommerce-plugin", "custom-snippet"]),
    jv = j({
      enabled: Oe(),
      detectedAdapter: Rv.nullable(),
      bridgeLastSeenAt: k().datetime().nullable(),
      updatedAt: k().datetime(),
    });
  (j({ enabled: Oe() }),
    j({
      snippet: k().min(1),
      hash: k().regex(/^[a-f0-9]{64}$/),
      generatedAt: k().datetime(),
    }));
  var Nv = oe(["idle", "indexing", "error", "never_indexed"]),
    Av = j({
      status: Nv,
      lastIndexedAt: k().datetime().nullable(),
      productsIndexed: z().int().min(0),
      lastError: k().nullable(),
      jobId: k().nullable(),
    }),
    Ev = j({ jobId: k().min(1), enqueuedAt: k().datetime() }),
    Tv = j({
      ruleCode: k(),
      blockedCount: z().int().nonnegative(),
      failOpenCount: z().int().nonnegative(),
    });
  j({ window: k(), rules: Z(Tv) });
  var At = class extends Error {
      constructor(t, r) {
        super(t);
        _n(this, "status");
        _n(this, "body");
        _n(this, "url");
        ((this.name = "ApiClientError"),
          (this.status = r.status),
          (this.body = r.body),
          (this.url = r.url));
      }
    },
    Ih = class extends At {
      constructor(e) {
        (super(e.body?.error ?? e.body?.code ?? "auth_required", {
          status: 401,
          body: e.body,
          url: e.url,
        }),
          (this.name = "ApiAuthError"));
      }
    },
    Pv = class extends At {
      constructor(t) {
        super(t.body?.error ?? t.body?.code ?? "forbidden", {
          status: 403,
          body: t.body,
          url: t.url,
        });
        _n(this, "portalUpgradeUrl");
        this.name = "ApiForbiddenError";
        const r = t.body?.details?.portal_upgrade_url;
        this.portalUpgradeUrl = typeof r == "string" ? r : null;
      }
    },
    Mh = class extends At {
      constructor(t) {
        super(t.body?.message ?? "validation failed", {
          status: 422,
          body: t.body,
          url: t.url,
        });
        _n(this, "issues");
        ((this.name = "ApiValidationError"),
          (this.issues = t.issues ?? t.body?.issues ?? []));
      }
    },
    Ov = class extends At {
      constructor(t) {
        super(t.body?.error ?? "rate_limited", {
          status: 429,
          body: t.body,
          url: t.url,
        });
        _n(this, "retryAfterSeconds");
        ((this.name = "ApiRateLimitError"),
          (this.retryAfterSeconds = t.retryAfterSeconds));
      }
    },
    Lv = class extends At {
      constructor(e) {
        (super(e.body?.error ?? e.body?.message ?? "server_error", {
          status: e.status,
          body: e.body,
          url: e.url,
        }),
          (this.name = "ApiServerError"));
      }
    },
    Dv = (e) => {
      const { status: t, body: r, url: n, retryAfterHeader: a } = e;
      if (t === 401) return new Ih({ body: r, url: n });
      if (t === 403) return new Pv({ body: r, url: n });
      if (t === 422) return new Mh({ body: r, url: n });
      if (t === 429) {
        const s = a ? Number.parseInt(a, 10) : null;
        return new Ov({
          body: r,
          url: n,
          retryAfterSeconds: s !== null && Number.isFinite(s) ? s : null,
        });
      }
      return t >= 500
        ? new Lv({ status: t, body: r, url: n })
        : new At(r?.error ?? r?.message ?? `http_${t}`, {
            status: t,
            body: r,
            url: n,
          });
    },
    Iv = async (e, t, r) => {
      const n = await Promise.resolve(e.getToken()),
        a = { Accept: "application/json", "X-Embed-Source": e.source };
      return (
        n && (a.Authorization = `Bearer ${n}`),
        r && (a["Idempotency-Key"] = r),
        t && (a["Content-Type"] = "application/json"),
        a
      );
    },
    Mv = async (e) => {
      if (!(e.headers.get("content-type") ?? "").includes("application/json"))
        return { body: null, raw: null };
      try {
        const r = await e.json();
        return { body: r, raw: r };
      } catch {
        return { body: null, raw: null };
      }
    },
    Fh = (e) => {
      const t = e.baseUrl.replace(/\/+$/, ""),
        r = e.fetchImpl ?? ((s, o) => globalThis.fetch(s, o)),
        n = async (s, o, l, c, u, p) => {
          const f = c !== void 0;
          let m;
          u !== void 0
            ? ((m = { Accept: "application/json", "X-Embed-Source": e.source }),
              u && (m.Authorization = `Bearer ${u}`),
              p?.idempotencyKey && (m["Idempotency-Key"] = p.idempotencyKey),
              f && (m["Content-Type"] = "application/json"))
            : (m = await Iv(e, f, p?.idempotencyKey));
          const x = {
            method: s,
            headers: m,
            ...(f ? { body: JSON.stringify(c) } : {}),
          };
          let v;
          if (p?.signal) x.signal = p.signal;
          else if (e.timeoutMs) {
            const d = new AbortController();
            ((x.signal = d.signal),
              (v = setTimeout(() => d.abort(), e.timeoutMs)));
          }
          let b;
          try {
            b = await r(o, x);
          } finally {
            v !== void 0 && clearTimeout(v);
          }
          const { raw: C, body: g } = await Mv(b);
          if (!b.ok) {
            const d = b.headers.get("retry-after");
            throw Dv({
              status: b.status,
              body: g,
              url: o,
              retryAfterHeader: d,
            });
          }
          try {
            return l.parse(C);
          } catch (d) {
            throw d instanceof Mt
              ? new Mh({ body: g, url: o, issues: d.issues })
              : new At("response_schema_parse_failed", {
                  status: b.status,
                  body: g,
                  url: o,
                });
          }
        },
        a = async (s, o, l, c, u) => {
          const p = o.startsWith("http")
            ? o
            : `${t}${o.startsWith("/") ? o : `/${o}`}`;
          try {
            return await n(s, p, l, c, void 0, u);
          } catch (f) {
            if (f instanceof Ih && e.refreshTokenFn !== void 0) {
              const m = await e.refreshTokenFn();
              if (m !== null) return n(s, p, l, c, m, u);
            }
            throw f;
          }
        };
      return {
        get: (s, o, l) => a("GET", s, o, void 0, l),
        post: (s, o, l, c) => a("POST", s, l, o, c),
        put: (s, o, l, c) => a("PUT", s, l, o, c),
        del: (s, o, l) => a("DELETE", s, o, void 0, l),
      };
    };
  class Zc extends Error {
    constructor(t, r) {
      (super(r ?? `Token refresh failed with HTTP ${t}`),
        (this.name = "TokenRefreshError"),
        (this.status = t));
    }
  }
  class Fv {
    constructor(t = {}) {
      q(this, Vr, null);
      q(this, kn, null);
      q(this, Tt, null);
      q(this, Ss);
      q(this, Cs);
      q(this, ro, 3e4);
      (L(this, Ss, t.fetchImpl ?? ((r, n) => globalThis.fetch(r, n))),
        L(this, Cs, t.expiryBufferMs ?? 3e4));
    }
    async getToken() {
      return h(this, Vr) === null ||
        h(this, kn) === null ||
        Date.now() >= h(this, kn) - h(this, Cs)
        ? null
        : h(this, Vr);
    }
    async refresh() {
      if (
        h(this, Tt) !== null &&
        h(this, Tt).status === 503 &&
        Date.now() - h(this, Tt).at < h(this, ro)
      )
        throw new Zc(h(this, Tt).status, h(this, Tt).message);
      const t = window.__AMCP_CONFIG__,
        r = `${t.restRoot}agenticmcps/v1/embed/token`,
        n = await h(this, Ss).call(this, r, {
          method: "POST",
          headers: { "X-WP-Nonce": t.nonce, Accept: "application/json" },
        });
      if (!n.ok) {
        let o,
          l = !1;
        try {
          const c = await n.json();
          typeof c.message == "string" &&
            c.message.length > 0 &&
            (o = c.message);
        } catch {
          l = !0;
        }
        throw (
          o === void 0 &&
            l &&
            (o = `El servidor de WordPress devolvió HTTP ${n.status} sin JSON. Comprueba que el sitio esté activo y que no esté en modo mantenimiento.`),
          L(this, Tt, { at: Date.now(), status: n.status, message: o }),
          new Zc(n.status, o)
        );
      }
      L(this, Tt, null);
      const a = await n.json(),
        s = (a.expiresIn ?? 300) * 1e3;
      return (L(this, Vr, a.token), L(this, kn, Date.now() + s), h(this, Vr));
    }
    clear() {
      (L(this, Vr, null), L(this, kn, null), L(this, Tt, null));
    }
  }
  ((Vr = new WeakMap()),
    (kn = new WeakMap()),
    (Tt = new WeakMap()),
    (Ss = new WeakMap()),
    (Cs = new WeakMap()),
    (ro = new WeakMap()));
  const oa = new Fv(),
    zv = async () => {
      const e = await oa.getToken();
      return e !== null ? e : oa.refresh();
    },
    qv = async () => {
      try {
        return await oa.refresh();
      } catch {
        return (oa.clear(), null);
      }
    },
    Gc = (e) => "https://api.trusteed.xyz";
  let zh = Fh({
      baseUrl: Gc(),
      source: "wp-embed",
      getToken: zv,
      refreshTokenFn: qv,
    }),
    qh = "wp-embed",
    Bh = Gc();
  function Uh() {
    return qh;
  }
  function Bv() {
    return Bh;
  }
  function Uv(e) {
    const t = e.baseUrl ?? Gc();
    ((zh = Fh({ baseUrl: t, source: e.source, getToken: e.getToken })),
      (qh = e.source),
      (Bh = t));
  }
  const ne = new Proxy(
      {},
      {
        get(e, t) {
          return zh[t];
        },
      }
    ),
    $v = {
      common: {
        loading: "Cargando...",
        error: "Error",
        errorUnknown: "Error desconocido",
        save: "Guardar",
        cancel: "Cancelar",
        close: "Cerrar",
        back: "Volver",
        retry: "Intentar de nuevo",
        active: "Activo",
        inactive: "Inactivo",
        enabled: "Habilitado",
        disabled: "Deshabilitado",
        noData: "Sin datos",
        notifications: "Notificaciones",
        closeNotification: "Cerrar notificación",
        loadingMore: "Cargando…",
        loadMore: "Cargar más",
        configSaved: "Configuración guardada correctamente.",
      },
      inicio: {
        title: "¿Cómo va mi tienda hoy?",
        errorLoadingSummary: "No se pudo cargar el resumen:",
        reputationSection: "Tu reputación como vendedor",
        scoreLabelComputing: "Calculando…",
        scoreLabelExcellent: "Excelente",
        scoreLabelAcceptable: "Aceptable",
        scoreLabelNeedsAttention: "Necesita atención",
        scoreDescComputing:
          "Trusteed está analizando tu tienda. Vuelve en unos minutos.",
        scoreDescExcellent:
          "Tu tienda tiene una reputación impecable entre los agentes de compra.",
        scoreDescAcceptable:
          "Tu tienda está bien, pero hay margen de mejora. Activa más reglas de seguridad.",
        scoreDescNeedsAttention:
          "Algunos agentes de compra tienen dudas sobre tu tienda. Revisa tus reglas.",
        scoreAriaLoading: "Cargando puntuación",
        updatedAt: "Actualizado el {{date}} UTC",
        scoreLow: "0 — Bajo",
        scoreMid: "50 — Medio",
        scoreHigh: "100 — Excelente",
        manageReputation: "Gestionar Reputación →",
        viewActivity: "Ver historial de actividad →",
        securitySection: "¿Está protegida tu tienda?",
        securityProtected: "Protegida",
        securityProtectedDesc:
          "Tu tienda tiene protección activa. Cada venta a un agente de compra queda registrada y firmada.",
        securityActiveKey: "Clave activa: {{kid}}",
        securityGraceKeys: "{{count}} en periodo de gracia",
        securityNotActive: "Sin activar",
        securityNotActiveDesc:
          "Tu tienda todavía no tiene el sello de confianza activado. Los agentes de compra no pueden ver que eres de fiar.",
        securityActivate: "Activar mi protección →",
        salesSection: "Últimas ventas a agentes de compra",
        salesEmpty: "Aún no tienes ventas a agentes de compra.",
        salesEmptyDesc:
          "Cuando un agente de compra compre en tu tienda, aparecerá aquí.",
        salesTableLabel: "Últimas ventas IA",
        salesColNumber: "Nº",
        salesColType: "Tipo",
        salesColBuyer: "Comprador",
        salesColDate: "Fecha",
        viewAllOrders: "Ver todos mis pedidos →",
        bucketCheckout: "Compra",
        bucketCustomer: "Consulta",
        bucketDiscovery: "Búsqueda",
      },
      trustCenter: {
        title: "Trust Center",
        tabOverview: "Resumen",
        tabReceipts: "Ventas IA",
        tabKeys: "Claves",
        tabAudit: "Auditoría",
        tabsAriaLabel: "Trust Center tabs",
        loading: "Cargando...",
      },
      trustReceipts: {
        panelTitle: "Panel de confianza",
        scoringMethodLink: "Cómo establecemos la puntuación de tu tienda",
        errorLoadingData:
          "Los datos de tu tienda se cargarán en cuanto el servicio esté disponible.",
        noData: "Sin datos.",
        scoreLow: "0 — Bajo",
        scoreMid: "50 — Medio",
        scoreCap: "Techo: {{cap}}/100",
        scoreHigh: "90–100 — Excelente",
        scoreCurrent: "Techo actual: {{cap}}/100",
        scoreComputing: "Calculando…",
        scoreExcellent: "Excelente",
        scoreImprovable: "Mejorable",
        scoreNeedsAttention: "Necesita atención",
        coldStartDesc:
          "Tu tienda acaba de empezar. Esta puntuación sube a medida que configuras los pasos básicos y recibes tus primeras ventas.",
        humanEstablishedDesc:
          "Tienes un buen historial como vendedor. Tu puntuación puede llegar hasta 85/100 antes de tu primera venta a un agente de compra.",
        scoreHighDesc:
          "Tu tienda tiene una reputación impecable. Los agentes confían plenamente en ti.",
        scoreMidDesc:
          "Tu tienda está bien valorada entre los agentes. Revisa las áreas en amarillo para seguir subiendo.",
        scoreLowDesc:
          "Algunos agentes de compra tienen dudas. Actúa sobre las áreas en rojo lo antes posible.",
        computedAt: "Calculado el {{date}} UTC",
        pendingActionsOne: "mejora pendiente",
        pendingActionsMany: "mejoras pendientes",
        breakdownTitle: "Desglose por área",
        coldStartNotice:
          "Tu tienda acaba de empezar. La puntuación de historial como vendedor y la experiencia con agentes estarán disponibles cuando tengas más actividad — es normal, no es negativo.",
        notApplicable: "No aplica aún",
        weightLabel: "peso {{pct}}%",
        noDataLabel: "Sin datos",
        countWillActivate: "Contará cuando se active:",
        measuredNow: "Lo que se mide en tu etapa actual",
        checklistTitle: "¿Qué hago para mejorar mi puntuación?",
        checklistProgress: "{{done}} de {{total}} completados",
        checklistMissingMany:
          "— te faltan {{count}} cosas para llegar al máximo",
        checklistMissingOne: "— te falta {{count}} cosa para llegar al máximo",
        checklistAllDone: "— ya tienes todo en orden para empezar",
        checklistNow: "Ahora mismo",
        checklistAutoTitle: "Con tus primeras ventas",
        checklistAutoNote:
          "Estos factores se miden solos cuando empiezan a llegar pedidos. No tienes que hacer nada — el sistema los recoge automáticamente.",
        checklistAutoActiveNote:
          "Estos factores ya se están midiendo con tus ventas reales y cuentan para tu puntuación.",
        practicesTitle: "Tres cosas que siempre funcionan",
        faqTitle: "Preguntas que se hace todo el mundo",
        securityTitle: "¿Está protegida tu tienda?",
        securityActiveDesc:
          "Cada venta a un agente de compra queda registrada y sellada.",
        securityProtectionActive: "Protección activa.",
        securityRotationWarning:
          "Hace más de {{days}} días que no se renueva la protección. Contacta con soporte si ves algo raro.",
        securityNotActive:
          "Tu tienda todavía no tiene el sello de confianza activado.",
        securityActivate: "Activar mi protección →",
        goToKeys: "Ir a Claves",
        milestoneText: {
          no_store: "Abre tu tienda para empezar a construir tu reputación.",
          cold_start:
            "Completa el onboarding y haz tus primeras ventas para subir tu puntuación.",
          human_established:
            "Haz tus primeras ventas a agentes de compra para desbloquear el nivel máximo.",
        },
        recText: {
          activate_security_key:
            "Activa tu sello de confianza (clave de firma).",
          add_return_policy: "Añade una política de devoluciones clara.",
          add_shipping_policy: "Añade un tiempo estimado de envío.",
          complete_first_agent_sale:
            "Completa tu primera venta a un agente de compra.",
          more_agent_sales: "Consigue más ventas a agentes de compra.",
          improve_fulfillment_rate: "Mejora tu tasa de envíos a tiempo.",
          reduce_disputes: "Reduce disputas y reembolsos.",
          external_assurance_unavailable:
            "La garantía externa aún no está disponible.",
        },
        checklistSello: "Sello de seguridad activo",
        checklistSelloDetail:
          "Garantiza que cada pedido de un agente de compra está firmado. Sin él, los agentes no confían en tu tienda.",
        checklistCompliance: "Sin errores en tus métodos de pago",
        checklistComplianceDetail:
          "Tienes un error en tu método de cobro. Los agentes de compra no pueden terminar sus compras.",
        checklistComplianceAction: "Abrir ajustes de pago en WooCommerce",
        checklistDevoluciones: "Política de devoluciones",
        checklistDevolucionesDetail:
          "¿Cuántos días tiene el cliente? ¿Pagas el envío de vuelta? Si no está escrito, los agentes lo cuentan en tu contra.",
        checklistDevolucionesAction: "Abrir página de políticas en WooCommerce",
        checklistEnvio: "Tiempo estimado de envío",
        checklistEnvioDetail:
          "Indica cuántos días tardas en enviar. Si no lo pones, parece que no tienes claro tu propio proceso.",
        checklistEnvioAction: "Abrir ajustes de envíos en WooCommerce",
        checklistCatalogo: "Catálogo con fotos, precios y descripciones",
        checklistCatalogoDetail:
          "Tus productos necesitan foto, precio real, stock actualizado y descripción. Esto ya cuenta desde el primer día.",
        checklistCatalogoAction: "Abrir listado de productos",
        checklistFulfillment: "Envíos a tiempo",
        checklistFulfillmentDetail:
          "Se mide sola — el % que llegan en el plazo prometido.",
        checklistDisputes: "Pocas disputas y reembolsos",
        checklistDisputesDetail:
          "Se mide sola — el % de pedidos con reclamación en los últimos 90 días.",
        storeAgeLine: "Tu tienda lleva",
        storeActive: "activa",
        storeYear: "año",
        storeYears: "años",
        storeDays: "días",
        practice1Title: "Mantén tu catálogo al día",
        practice1Body:
          "Actualiza el stock, los precios y las fotos para que los compradores automáticos vean lo mismo que tienes en la trastienda. Si lo que muestras no coincide con lo que tienes, la confianza baja.",
        practice2Title: "Pon tus normas de devolución por escrito",
        practice2Body:
          "¿Cuántos días tiene el cliente para devolver? ¿Pagas tú el envío? ¿Se devuelve el dinero o solo vale cambio? Si no lo tienes escrito, los compradores automáticos lo cuentan en tu contra.",
        practice3Title: "Envía rápido y sin sorpresas",
        practice3Body:
          "Cuando un pedido llega tarde o hay una reclamación, tu puntuación baja. No hace falta ser Amazon — solo cumplir lo que prometes. Si dices 3 días, envía en 3 días.",
        faq1Q:
          "¿Esta puntuación es lo mismo que las estrellas que me ponen los clientes?",
        faq1A:
          "No. Las estrellas te las pone la gente que compra. Esta puntuación la calcula Trusteed mirando cómo funciona tu tienda por dentro: si el stock cuadra, si los pedidos llegan, si hay reclamaciones. Es una cosa completamente distinta.",
        faq2Q: "¿Si tengo 100 puntos vendo más?",
        faq2A:
          "No directamente. Tener una puntuación alta hace que más compradores automáticos encuentren tu tienda y confíen en ella. Pero que compren o no depende de tus precios, tu catálogo y lo que vendas.",
        faq3Q: "¿Me pueden quitar visibilidad antes de cerrarme la tienda?",
        faq3A:
          "Sí. Si la puntuación baja mucho, primero apareces menos en las búsquedas. Si sigue bajando, la tienda se oculta. Y si no se arregla, se puede llegar a suspender. Por eso conviene actuar antes de que llegue a ese punto.",
        humanOrders: "pedido",
        humanOrdersPlural: "pedidos",
        humanOrdersOf: "de clientes humanos",
        agentSale: "venta",
        agentSalePlural: "ventas",
        agentSalesOf: "a agentes de compra",
        confidenceInsufficient:
          "Completa la configuración para ver tu puntuación",
        confidenceColdStart: "Sin historial suficiente",
        confidenceHumanEstablished: "Vendedor con historial humano",
        confidenceAgentThin: "Primeras ventas a agentes",
        confidenceAgentVerified: "Verificado con agentes",
        unlockAreaDefault:
          "Esta área se activará cuando tengas más actividad en tu tienda.",
        unlockMerchantColdStart:
          "Se activa cuando tengas al menos 5 ventas a clientes. Aún no tienes historial suficiente.",
        unlockAgentColdStart:
          "Se activa con tus primeras ventas a agentes de compra.",
        unlockAgentHuman:
          "Se activa con tus primeras ventas a agentes de compra.",
        dimMerchantReliability: "🏪 ¿Qué historial tienes como vendedor?",
        dimAgenticReadiness: "⚙️ ¿Está tu tienda lista para agentes de compra?",
        dimAgenticEvidence:
          "🤝 ¿Qué experiencia han tenido los agentes con tu tienda?",
        subDim: {
          setupQuality: "Catálogo, políticas y precios",
          protocolSecurity: "Sello de seguridad (firma digital)",
          complianceHealth: "Sin errores en tus métodos de pago",
          integrationFreshness: "Catálogo al día y sincronizado",
          fulfillmentPerformance: "Pedidos enviados en el plazo prometido",
          disputeAndRefundHealth: "Pocas reclamaciones o devoluciones",
          orderCompletionHealth: "Pedidos completados sin cancelar",
          catalogOperationalQuality: "Catálogo completo y actualizado",
          storeAgeConfidence: "Antigüedad de tu tienda",
          humanOrderVolumeConfidence: "Número de clientes atendidos",
          agentCheckoutSuccessRate: "Compras de agentes completadas",
          agentFulfillmentOnTimeRate:
            "Envíos a compradores automáticos a tiempo",
          agentDisputeRefundHealth: "Pocas disputas en ventas a agentes",
          receiptIntegrity: "Recibos digitales firmados",
          agentLatencyAndToolReliability: "Rapidez al responder a agentes",
          repeatAgentSuccess: "Agentes que vuelven a comprar",
          fulfillmentRate: "Pedidos enviados a tiempo",
          disputeRate: "Pocas quejas o devoluciones",
          returnWindowClarity: "Tienes escritas las normas de devolución",
          catalogCompleteness: "Productos con fotos, precios y stock",
          storeAgeBonus: "Cuánto tiempo lleva abierta tu tienda",
          hasActiveKey: "Clave de firma digital activa",
          hasShippingPolicy: "Tienes escrito cuánto tardas en enviar",
          hasReturnPolicy: "Tienes escritas las normas de devolución",
          paymentMethodsSetup: "Puedes recibir pagos",
          mcpEndpointHealthy: "Los agentes de compra pueden llegar a tu tienda",
          agentOrderSuccessRate: "Agentes de compra completan sus pedidos",
          trustReceiptCoverage: "Comprobantes firmados en cada venta a agente",
          agentConsentCompliance:
            "Los agentes pueden comprar sin inconvenientes",
        },
      },
      paymentMethods: {
        title: "Metodos de pago",
        ariaLoading: "Cargando metodos de pago",
        errorLoading: "No se pudieron cargar los metodos de pago:",
        noMethods: "No hay metodos de pago configurados.",
        listAriaLabel: "Lista de metodos de pago",
        rotateBtnLabel: "Rotar credenciales de {{label}}",
        rotateBtn: "Rotar credenciales",
        dialogTitle: "Rotar credenciales",
        dialogDesc:
          "Confirmas la rotacion de credenciales? Esta accion no se puede deshacer.",
        confirmBtn: "Confirmar",
        cancelBtn: "Cancelar",
        rotating: "Rotando...",
        rotateSuccess: "Credenciales rotadas correctamente",
        rotateErrorFallback: "Error al rotar credenciales",
        closeNotification: "Cerrar notificacion",
        statePending: "Pendiente",
        stateActive: "Activo",
        stateError: "Error",
        stateDisabled: "Deshabilitado",
      },
      misVentas: {
        title: "Mis ventas",
        tabOrders: "Mis pedidos",
        tabReceipts: "Ventas IA",
        tabKeys: "Claves",
        tabAudit: "Auditoría",
        tabsAriaLabel: "Secciones de Mis ventas",
        ordersSection: "Todos mis pedidos",
        ordersSectionDesc:
          "Aquí aparecen todos los pedidos que han entrado en tu tienda, tanto de compradores normales como de agentes de compra.",
        ordersErrorLoading: "No se pudieron cargar los pedidos:",
        ordersEmpty: "Aún no tienes pedidos registrados.",
        ordersEmptyDesc:
          "Cuando alguien compre en tu tienda, el pedido aparecerá aquí.",
        ordersTableLabel: "Lista de pedidos",
        colOrderNumber: "Nº pedido",
        colStore: "Tienda",
        colStatus: "Estado",
        colTotal: "Total",
        colBuyer: "Quién compró",
        colDate: "Fecha",
        platformShopify: "Shopify",
        platformWoo: "WooCommerce",
        platformAcp: "Otro canal",
        statusCreated: "Creada",
        statusUpdated: "Actualizada",
        statusPaid: "Pagada",
        statusFulfilled: "Completada",
        statusCancelled: "Cancelada",
        statusRefunded: "Reembolsada",
        buyerAuto: "🤖 Comprador automático #{{id}}",
        buyerHuman: "👤 Persona",
        loadMoreOrders: "Cargar más pedidos →",
        receiptsSection: "Comprobantes de ventas a agentes de compra",
        receiptsSectionDesc:
          "Cada vez que un agente de compra compra en tu tienda, se genera un comprobante firmado y sellado con hora.",
        receiptsBenefits:
          "✅ ¿Para qué sirve? Si un comprador dice 'yo no hice ese pedido', este comprobante — firmado, sellado con hora y a prueba de manipulación — es un respaldo sólido: puedes descargarlo y aportarlo a tu banco o abogado. Por sí solo no sustituye a la evidencia que te pidan en una disputa. Nosotros lo guardamos automáticamente el tiempo que exige la ley de tu país (entre 5 y 10 años), sin que hagas nada.",
        receiptsRegulation:
          "🏛️ Nivel técnico: estos comprobantes están diseñados siguiendo la norma europea de firma electrónica (eIDAS) y llevan firma digital + sello de tiempo. Aún no son firma ni sello cualificados (eso requiere una autoridad certificadora en la lista de confianza de la UE): valen como prueba de integridad verificable, no como evidencia de disputa lista para banco o tribunal.",
        receiptsErrorLoading: "No se pudieron cargar los comprobantes:",
        receiptsEmpty: "Aún no hay comprobantes de ventas automáticas.",
        receiptsEmptyDesc:
          "Cuando un agente de compra haga una compra, el comprobante aparecerá aquí automáticamente.",
        receiptsTableLabel: "Comprobantes IA",
        colReceiptNumber: "Nº comprobante",
        colType: "Tipo",
        colAction: "Qué hizo",
        colBuyer2: "Comprador",
        bucketCheckout: "Compra",
        bucketCustomer: "Consulta",
        bucketDiscovery: "Búsqueda",
      },
      misReglas: {
        title: "Mis Reglas",
        infoNotice:
          "Estas reglas se aplican automáticamente a cualquier agente de compra que intente comprar en tu tienda. Actívalas o desactívalas con un clic. Cuantas más actives, más protegida estará tu tienda.",
        errorNotice:
          "Las reglas se muestran en modo provisional. Los cambios se guardarán cuando el servicio esté disponible.",
        rulesByCategoryTitle: "Reglas por categoría",
        activeCountLabel: "{{active}} de {{total}} reglas activas",
        ruleActive: "Activa",
        ruleInactive: "Inactiva",
        blockedLast7d: "{{count}} bloqueados 7d",
        failOpenLast7d: "{{count}} fail-open 7d",
        toggleAriaActive: "Desactivar regla",
        toggleAriaInactive: "Activar regla",
        howItWorksTitle: "¿Cómo funcionan las reglas?",
        howInactive:
          "No se aplica. El agente de compra pasa sin ser evaluado por este criterio.",
        howInactiveLabel: "Regla inactiva:",
        howActive:
          "Se evalúa en cada compra. Si el agente de compra la incumple, se bloquea o se pone en revisión según la gravedad.",
        howActiveLabel: "Regla activa:",
        howStats:
          "Las insignias junto a cada regla muestran cuántos compradores han sido afectados en los últimos 7 días.",
        howStatsLabel: "Estadísticas en tiempo real:",
        ruleActivatedMsg: "Regla activada",
        ruleDeactivatedMsg: "Regla desactivada",
        ruleChangeError: "No se pudo cambiar la regla. Inténtalo de nuevo.",
        paramsTitle: "Parámetros",
        paramsSaveBtn: "Guardar parámetros",
        paramsResetBtn: "Descartar",
        paramsCsvHint: "Valores separados por comas",
        taxonomyUnavailable:
          "La búsqueda de categorías de Shopify no está disponible en esta plataforma",
        taxonomySearchPlaceholder: "Buscar categoría…",
        taxonomyRemoveLabel: "Quitar {{name}}",
        r001r009Redundancy:
          "R009 se ejecutará en modo sombra (mismo veredicto que R001 — gana la primera coincidencia). No cambiará resultados, solo separa la telemetría.",
        r002WithoutR001:
          "R001 está OFF, por lo que R002 solo bloquea tokens inválidos presentados. Activa R001 para exigir token en todas las solicitudes.",
        paramsRequiredHint:
          "Proporciona al menos uno de los parámetros listados antes de activar.",
        paramsRequiredError: "Falta parámetro requerido:",
        params: {
          "R001.requireAgentId": "Requerir ID del agente",
          "R001.merchantTier": "Nivel del comercio (high = exigir ID siempre)",
          "R004.maxKeyAgeHours": "Antigüedad máx. de la clave (horas)",
          "R009.requireAgentId": "Requerir ID del agente",
          "R010.minCompletedOrders": "Pedidos completados mínimos",
          "R003.allowedCategories": "Categorías permitidas (mandato)",
          "R012.categories": "Categorías bloqueadas",
          "option.alcohol": "Alcohol",
          "option.tobacco": "Tabaco",
          "option.firearms": "Armas de fuego",
          "option.pharmaceuticals": "Farmacéuticos",
          "option.adult": "Contenido adulto",
          "option.gambling": "Apuestas / Juego",
          "option.cbd": "CBD",
          "option.electronics_high_value": "Electrónica de alto valor",
          "option.jewelry": "Joyería",
          "option.crypto": "Cripto",
          "option.gift_cards": "Tarjetas regalo",
          "option.subscriptions": "Suscripciones",
          "R014.highRiskCountries": "Países de alto riesgo (ISO-2)",
          "R014.maxCancellations": "Cancelaciones máximas",
          "R014.windowDays": "Ventana (días)",
          "R015.maxDeltaBps": "Delta máx. de precio (bps)",
          "R016.minStock": "Stock mínimo",
          "R018.spikeMultiplier": "Multiplicador de pico",
          "R018.merchantAvgOrderCents": "Ticket medio del comercio (céntimos)",
          "R018.maxItemCount": "Ítems máx. por carrito",
          "R018.maxSingleSkuQty": "Cantidad máx. por SKU",
          "R021.minCompletedOrders":
            "Pedidos completados mín. para primera compra",
          "R022.allowedPaymentMethods": "Métodos de pago permitidos",
          "R022.blockedPaymentMethods": "Métodos de pago bloqueados",
          "option.card": "Tarjeta",
          "option.paypal": "PayPal",
          "option.bnpl": "Compra ahora, paga después (BNPL)",
          "option.klarna": "Klarna",
          "option.afterpay": "Afterpay",
          "option.bank_transfer": "Transferencia bancaria",
          "option.apple_pay": "Apple Pay",
          "option.google_pay": "Google Pay",
          "option.gift_card": "Tarjeta regalo",
          "R023.windowDays": "Ventana (días)",
          "R023.maxRatio": "Ratio máx. de reembolsos (0–1)",
          "R024.windowDays": "Ventana (días)",
          "R024.maxDisputes": "Disputas máximas",
          "R025.blockPoBox": "Bloquear apartados postales",
          "R025.blockFreightForwarder": "Bloquear reexpedidores",
          "R026.requireConsent": "Requerir consentimiento explícito",
          "R027.maxStoredValueCents": "Valor almacenado máx. (céntimos)",
          "R028.requirePurchaseOrder": "Requerir orden de compra",
          "R032.blockedCategoryIds": "Categorías bloqueadas",
          "R034.blockedSkus": "SKU bloqueados",
          "R035.maxCents": "Importe máx. del pedido (céntimos)",
          "R036.maxCentsPerLine": "Importe máx. por línea (céntimos)",
          "R038.maxQuantity": "Artículos máx. por pedido",
          "R039.maxPerSku": "Cantidad máx. por producto",
          "R043.ttlMinutes": "Validez de la aprobación (minutos)",
          "R048.blockedTypes": "Tipos digitales bloqueados",
          "option.license_key": "Clave de licencia",
          "option.downloadable": "Descargable",
          "option.stored_value": "Valor almacenado",
        },
        helpLinkLabel: "¿Qué hace esta regla? →",
        helpBase: "https://trusteed.xyz/es/agent-rules",
        categoryLabels: {
          identity: "Identidad",
          behavior: "Comportamiento",
          transaction: "Transacción",
          postsale: "Posventa",
          general: "General",
          other: "Otra",
        },
        rulesMeta: {
          "R001.verified-agent-required": {
            category: "identity",
            title: "El agente debe identificarse",
            description:
              "Si un robot o asistente quiere comprar en tu tienda, tiene que presentar su 'DNI digital'. Sin identificación, no hay compra.",
          },
          "R002.signature-spoof-block": {
            category: "identity",
            title: "Bloquear firma falsificada",
            description:
              "Si el robot intenta comprar con una firma digital que no cuadra, lo paramos de inmediato.",
          },
          "R003.mandate-boundary-match": {
            category: "identity",
            title:
              "El robot no puede gastar más de lo que le autoriza su dueño",
            description:
              "Si el asistente tiene un límite firmado de 100 € y pone 250 € en el carrito, el pedido se cancela.",
          },
          "R004.new-key-friction": {
            category: "identity",
            title: "Clave de identidad muy nueva",
            description:
              "Si el robot estrena clave de identidad, esperamos unas horas antes de dejarle comprar.",
          },
          "R005.revoked-agent-block": {
            category: "identity",
            title: "Robot con el acceso revocado",
            description:
              "Si el asistente está en la lista negra de Trusteed, no puede comprar en ninguna tienda.",
          },
          "R006.provider-confidence-tier": {
            category: "identity",
            title: "Bloquear compradores con mala reputación",
            description:
              "Si el proveedor de identidad del robot nos dice que su confianza es muy baja, no le dejo comprar.",
          },
          "R007.cross-merchant-abuse-signal": {
            category: "identity",
            title: "Robot que ya ha hecho daño en otras tiendas",
            description:
              "Si el asistente ha tenido problemas serios en otras tiendas de Trusteed, lo bloqueamos aquí también.",
          },
          "R008.scope-escalation-detection": {
            category: "identity",
            title: "El robot pide más permisos de los autorizados",
            description:
              "Si el asistente intenta acceder a zonas de tu tienda para las que no tiene permiso, lo paramos.",
          },
          "R009.agent-verification-required": {
            category: "behavior",
            title: "Verificación de agente obligatoria",
            description:
              "Para ciertas operaciones, el asistente debe demostrar su identidad antes de continuar.",
          },
          "R010.new-agent-probation": {
            category: "behavior",
            title: "Robot sin historial en tu tienda",
            description:
              "Si es la primera vez que este asistente compra aquí, añadimos una pequeña comprobación extra.",
          },
          "R011.repeat-failed-checkout": {
            category: "behavior",
            title: "Detectar compras sospechosamente rápidas",
            description:
              "Si el robot falla varias veces seguidas en el pago en pocos minutos, lo pausamos.",
          },
          "R012.high-risk-category": {
            category: "behavior",
            title: "Categoría de producto de riesgo alto",
            description:
              "Algunos productos (tarjetas regalo, vino, tabaco…) tienen más posibilidad de fraude. Añadimos precaución.",
          },
          "R013.return-policy-guard": {
            category: "behavior",
            title: "El robot no acepta tu política de devoluciones",
            description:
              "Si el asistente no ha aceptado las condiciones de devolución de tu tienda, el pedido se para.",
          },
          "R014.delivery-risk-guard": {
            category: "behavior",
            title: "País de envío de riesgo alto",
            description:
              "Si el destino del paquete está en una lista de países problemáticos (sanciones, fraude frecuente), lo revisamos.",
          },
          "R015.price-change-guard": {
            category: "transaction",
            title: "El precio cambió mucho durante el proceso",
            description:
              "Si el precio de un artículo sube o baja más de un % configurado entre que se pone en el carrito y se paga, lo paramos.",
          },
          "R016.stock-confidence-guard": {
            category: "transaction",
            title: "Stock insuficiente para el robot",
            description:
              "Si un producto está a punto de agotarse, solo dejamos que los humanos completen la compra.",
          },
          "R017.coupon-discount-anomaly": {
            category: "transaction",
            title: "Detectar búsqueda repetida de descuentos",
            description:
              "Si el robot prueba muchos cupones de descuento de forma anormal, lo marcamos como sospechoso.",
          },
          "R018.cart-composition-guard": {
            category: "transaction",
            title: "Detectar pedidos grandes o inusuales",
            description:
              "Si el importe del carrito es muy superior al pedido medio de tu tienda, lo revisamos antes de aprobar.",
          },
          "R019.country-jurisdiction": {
            category: "transaction",
            title: "País no permitido en tu tienda",
            description:
              "Si el robot intenta facturar desde un país fuera de tu lista de países autorizados, el pedido se cancela.",
          },
          "R020.business-hours": {
            category: "transaction",
            title: "Compras solo en horario comercial",
            description:
              "Si configuras un horario de atención, los robots no podrán completar pedidos fuera de ese horario.",
          },
          "R021.first-purchase-with-merchant": {
            category: "postsale",
            title: "Primera compra del robot en tu tienda",
            description:
              "Si nunca ha comprado aquí antes, añadimos una revisión extra aunque el robot sea conocido en otras tiendas.",
          },
          "R022.payment-rail-restriction": {
            category: "postsale",
            title: "Método de pago no permitido",
            description:
              "Si el robot intenta pagar con BNPL, Klarna u otro método que tú no aceptas para robots, lo paramos.",
          },
          "R023.refund-abuse-guard": {
            category: "postsale",
            title: "Vigilar devoluciones excesivas",
            description:
              "Si el asistente tiene un ratio de devoluciones muy alto en los últimos 90 días, le restringimos el acceso.",
          },
          "R024.dispute-history-guard": {
            category: "postsale",
            title: "Bloquear si tiene disputas recientes",
            description:
              "Si el asistente ha abierto muchas reclamaciones últimamente, no le dejamos comprar hasta que se resuelvan.",
          },
          "R025.sensitive-delivery-address": {
            category: "postsale",
            title: "Dirección de envío sospechosa",
            description:
              "Si el paquete va a un apartado de correos o a un almacén de reenvío, añadimos una revisión.",
          },
          "R026.subscription-autorenew-guard": {
            category: "postsale",
            title: "Suscripción sin consentimiento de renovación",
            description:
              "Si el robot quiere activar una suscripción y el cliente no ha dado el OK explícito a la renovación, lo paramos.",
          },
          "R027.gift-card-stored-value": {
            category: "postsale",
            title: "Compra de tarjetas regalo",
            description:
              "Puedes limitar o bloquear que los robots compren tarjetas regalo o productos de valor almacenado.",
          },
          "R028.b2b-po-guard": {
            category: "postsale",
            title: "Pedido B2B sin orden de compra",
            description:
              "Si el pedido es empresarial y no incluye un número de orden de compra válido, lo paramos.",
          },
          "R035.max-order-value": {
            category: "transaction",
            title: "Limitar el importe total del pedido",
            description:
              "Bloquea los pedidos de agentes cuyo total supere el límite que fijes. Un tope financiero del comercio.",
          },
          "R036.max-line-item-value": {
            category: "transaction",
            title: "Limitar el importe por línea",
            description:
              "Bloquea cualquier línea del carrito que supere el importe que fijes.",
          },
          "R038.max-items-per-order": {
            category: "transaction",
            title: "Limitar el número de artículos por pedido",
            description:
              "Bloquea los pedidos de agentes con más artículos de los que permitas. Control anti-acaparamiento.",
          },
          "R039.max-quantity-per-sku": {
            category: "transaction",
            title: "Limitar la cantidad por producto",
            description:
              "Bloquea comprar más unidades del mismo SKU de las que permitas.",
          },
          "R034.sku-blocklist": {
            category: "transaction",
            title: "Bloquear productos concretos (SKU) para agentes",
            description:
              "Impide que los agentes compren los productos exactos que indiques por SKU.",
          },
          "R032.category-blocklist": {
            category: "transaction",
            title: "Bloquear categorías concretas para agentes",
            description:
              "Impide que los agentes compren productos de las categorías que elijas (p. ej. bienes restringidos o de riesgo alto).",
          },
          "R048.no-digital-goods-for-agents": {
            category: "transaction",
            title: "Bloquear bienes digitales para agentes",
            description:
              "Impide que los agentes compren tarjetas regalo y otros productos digitales o de valor almacenado.",
          },
          "R043.agent-checkout-approval-required": {
            category: "postsale",
            title: "Requerir tu aprobación para checkouts de agente",
            description:
              "Las compras de agentes quedan en espera de tu aprobación manual antes de completarse. Añade una validación humana.",
          },
          "R029.merchant-preset": {
            category: "general",
            title: "Perfil de seguridad de tu tienda",
            description:
              "Elige entre 'abierto', 'equilibrado', 'estricto' o 'regulado' para aplicar un conjunto de reglas predefinido.",
          },
          "R030.simple-controls": {
            category: "general",
            title: "Controles básicos: importe máximo y países",
            description:
              "Fija un importe máximo por pedido y una lista de países permitidos. Rápido de configurar.",
          },
        },
      },
      seguridad: {
        title: "Seguridad de tu tienda",
        protectionSection: "¿Está protegida tu tienda?",
        errorChecking: "No se pudo comprobar la seguridad:",
        notActivatedTitle: "Protección aún no activada",
        notActivatedDesc:
          "Tu tienda todavía no tiene sello de confianza. Actívalo desde Inicio para empezar a firmar tus ventas a agentes de compra.",
        protectionBadge: "Sí, todo en orden",
        protectionDesc:
          "Tu tienda tiene protección activa. Cada venta realizada por un agente de compra queda registrada y firmada. Cualquier intento de manipulación queda registrado y se puede detectar.",
        lastRenewal: "Última renovación: hace {{days}} días",
        graceKeysNotice:
          "Hay {{count}} protección anterior que sigue siendo válida para comprobar ventas pasadas. No necesitas hacer nada — desaparece sola en los próximos días.",
        activitySection: "¿Qué ha pasado en tu tienda?",
        activitySectionDesc:
          "Aquí ves un registro de todo lo que ha pasado en tu tienda: quién entró, qué vendiste, qué pedidos se bloquearon y cuándo se renovó tu sello.",
        chainOk:
          "✓ El registro es correcto — nadie ha tocado el historial de tu tienda.",
        chainBroken:
          "⚠ Algo no cuadra en el historial de tu tienda. Esto es raro. Por favor contacta con soporte cuanto antes.",
        errorLoadingActivity: "No se pudo cargar el historial:",
        activityEmpty: "Aún no hay actividad registrada.",
        activityEmptyDesc: "Cuando ocurra algo en tu tienda, aparecerá aquí.",
        tableLabel: "Historial de actividad",
        colWhen: "Cuándo",
        colFrom: "Desde dónde",
        colResult: "Resultado",
        colWhat: "Qué pasó",
        colBuyerType: "Tipo de comprador",
        sourceShopify: "Desde Shopify",
        sourceWp: "Desde WordPress",
        sourcePortal: "Desde el portal",
        sourceApi: "Sistema automático",
        sourceMcp: "Comprador automático",
        sourceWebhook: "Notificación automática",
        outcomeAllowed: "✓ Aprobado",
        outcomeBlocked: "✗ Bloqueado",
        outcomeSessionRenewed: "Sesión renovada",
        buyerBot: "🤖 Robot automático",
        buyerHuman: "👤 Persona",
        viewMoreActivity: "Ver más actividad →",
      },
      settings: {
        title: "Ajustes",
        failureModeSection: "Modo de fallo del sistema de enforcement",
        failureModeSectionDesc:
          "Controla el comportamiento cuando la API de Trusteed no está disponible. Las reglas de nivel 1 (R001, R007) siempre se aplican sin conexión.",
        configSaved: "Configuración guardada correctamente.",
        errorSavingConfig: "No se pudo guardar la configuración:",
        optionBalanced: "Equilibrado (recomendado)",
        optionBalancedHint:
          "Reglas críticas (R001, R007) siempre activas; reglas avanzadas permiten el pedido si hay problemas de red.",
        optionStrict: "Estricto",
        optionStrictHint:
          "Bloquea todos los pedidos si no se puede verificar al agente. Máxima protección.",
        optionPermissive: "Permisivo",
        optionPermissiveHint:
          "Solo registra incidencias. Los pedidos nunca se bloquean por problemas de red.",
        paymentSection: "¿Cómo quiero que me paguen los agentes de compra?",
        paymentSectionNotice:
          "Cuando un agente de compra hace un pedido, Trusteed intenta cobrar en el orden que tú eliges aquí. Si el primero falla, prueba con el siguiente. Para cambiar este orden contacta con soporte o accede al portal principal de Trusteed.",
        paymentErrorLoading: "No se pudo cargar la configuración:",
        paymentNoRails:
          "Aún no tienes ningún método de pago activo. Ve a Merchant Center → Pagos para conectar Stripe, PayPal u otro proveedor.",
        paymentOrder: "Orden de cobro:",
        paymentRailEnabled: "✅ Activo",
        paymentRailDisabled: "❌ Desactivado",
        paymentRailMin: "Mínimo: {{amount}}",
        paymentRailMax: "Máximo: {{amount}}",
        paymentRailCurrencies: "Solo: {{currencies}}",
        paymentChangeNote:
          "Para cambiar el orden o activar/desactivar formas de pago, contacta con tu gestor de Trusteed.",
        railStripe: "Pago con tarjeta (Stripe)",
        railX402: "Pago en criptomoneda (x402)",
        railAcp: "Pago ACP",
        railPaypal: "PayPal",
        railEidas: "eIDAS",
      },
      merchantCenter: {
        title: "Merchant Center",
        showingStore: "Mostrando datos de tienda #{{id}}",
        tabsAriaLabel: "Merchant Center tabs",
        tabOrders: "Pedidos",
        tabPayments: "Pagos",
        tabAgents: "Agentes",
        tabCheckout: "Checkout",
        tabCertNlweb: "Certificación & NLWeb",
        loading: "Cargando...",
      },
      trustAuditLog: {
        bookDescription:
          "📋 El libro de registro de tu tienda. Aquí queda apuntado todo lo que ocurre: cuándo entró un agente de compras a tu tienda, qué hizo y si salió bien o mal. Si algo falla, usa los filtros de abajo para encontrar exactamente qué pasó y cuándo.",
        integrityVerified: "Integridad verificada",
        integrityError: "Error de integridad en la cadena de auditoría",
        filterAgentId: "Agent ID",
        filterAgentIdAria: "Filtrar por agentId",
        filterSource: "Todas las fuentes",
        filterSourceAria: "Filtrar por fuente",
        filterSourcePortal: "Portal",
        filterSourceShopify: "Shopify Embed",
        filterSourceWp: "WP Embed",
        filterSourceApi: "API",
        filterSourceMcp: "MCP",
        filterSourceWebhook: "Webhook",
        filterDateFrom: "Fecha desde",
        filterDateTo: "Fecha hasta",
        errorLoading: "No se pudo cargar el audit log:",
        tableLabel: "Audit log de Trust",
        colDate: "Fecha",
        colSource: "Fuente",
        colBucket: "Bucket",
        colTool: "Tool",
        colOutcome: "Outcome",
        colAgentId: "Agent ID",
        noEntries: "Sin entradas de audit para los filtros seleccionados.",
        loadMore: "Cargar mas",
        sourceLabels: {
          portal: "Portal",
          "shopify-embed": "Shopify Embed",
          "wp-embed": "WP Embed",
          api: "API",
          mcp: "MCP",
          webhook: "Webhook",
        },
        outcomeLabels: {
          ok: "OK",
          success: "Correcto",
          allow: "Permitido",
          deny: "Bloqueado",
          blocked_by_overlay: "Bloqueado",
          token_refresh_seamless: "Sesión renovada",
          error: "Error",
        },
      },
      trustKeys: {
        description:
          '🔑 Las llaves de tu tienda. Estas claves son las "firmas" que el sistema le pone a cada comprobante de venta para que no se pueda manipular sin que se detecte. Cámbialas cada 90 días para mantener todo seguro, igual que cambias la cerradura de vez en cuando.',
        ariaLoading: "Cargando claves",
        errorLoading: "No se pudo cargar el estado de claves:",
        notActivatedTitle: "Aún sin sello de confianza",
        notActivatedDesc:
          "Tu tienda todavía no ha generado su clave de firma. Activa tu protección desde Inicio; cuando esté activa, los detalles de la clave aparecerán aquí.",
        overdueWarning:
          "Recomendamos renovar la clave — llevan {{days}} días sin renovarse.",
        activeKeyTitle: "Sello de confianza activo",
        fieldIdentifier: "Identificador",
        fieldLastRenewal: "Última renovación",
        fieldDaysActive: "Días activo",
        fieldDaysActiveSuffix: "días",
        retiredKeysTitle: "Sellos anteriores (aún válidos)",
        retiredKeysAriaLabel: "Sellos anteriores aún válidos",
        retiredColIdentifier: "Identificador",
      },
      trustReceiptDetail: {
        ariaLabel: "Detalle de Trust Receipt",
        title: "Detalle de Receipt",
        closeAriaLabel: "Cerrar panel",
        fieldReceiptId: "ID de recibo",
        fieldBucket: "Categoría",
        fieldTool: "Herramienta",
        fieldAgentId: "ID de agente",
        fieldSigningKey: "Clave de firma (kid)",
        fieldInputHash: "Hash de entrada",
        fieldOutputHash: "Hash de salida",
        fieldDate: "Fecha",
        showJws: "Ver JWS completo",
        hideJws: "Ocultar JWS completo",
        copyJwksUrl: "Copiar URL JWKS",
        copied: "¡Copiado!",
        closeBtn: "Cerrar",
        downloadBundle: "Descargar comprobante (ZIP)",
        downloading: "Preparando…",
        downloadHint:
          "Prueba de integridad verificable — no es, por sí sola, evidencia de disputa para tu banco o proveedor de pagos.",
        downloadErrorV10: "Solo disponible para comprobantes v1.1.",
        downloadErrorLegacy:
          "Este comprobante no es exportable de forma offline.",
        downloadErrorGeneric: "No se pudo descargar el comprobante.",
      },
      trustReceiptsList: {
        description:
          "🤖 Compras hechas por agentes de compras. Cuando un agente de compras automático entra a tu tienda, aquí queda el comprobante firmado — como un ticket de caja, pero para ventas automáticas. Haz clic en una fila para ver todos los detalles de esa venta.",
        pacoBenefits:
          "✅ ¿Para qué te sirve? Si un agente de compra dice que no hizo el pedido, este comprobante — a prueba de manipulación y verificable de forma independiente — es un respaldo sólido: puedes descargarlo y aportarlo a tu banco o abogado. Por sí solo no sustituye a la evidencia que te pidan en una disputa. Nosotros lo guardamos entre 5 y 10 años según la ley de tu país — sin que tengas que hacer nada.",
        pacoRegulation:
          "🏛️ Nivel técnico: tus comprobantes están diseñados siguiendo los estándares de firma electrónica de Europa (eIDAS), Estados Unidos (ESIGN) y Reino Unido (UK DIATF), con firma digital + sello de tiempo. Aún no son firma ni sello cualificados (eso requiere una autoridad certificadora en la lista de confianza de la UE): sirven como prueba de integridad verificable que puedes aportar como respaldo, no como evidencia de disputa lista para banco o tribunal. Lo guardamos entre 5 y 10 años según la ley de tu país, sin que hagas nada.",
        learnMore: "Conoce como funciona y para que sirve",
        filterBuyerId: "ID del comprador",
        filterBuyerIdAria: "Filtrar por ID del comprador",
        filterTypeTodos: "Todos los tipos",
        filterTypeDiscovery: "Búsqueda",
        filterTypeCustomer: "Consulta",
        filterTypeCheckout: "Compra",
        filterTypeAria: "Filtrar por tipo",
        filterDateFrom: "Fecha desde",
        filterDateTo: "Fecha hasta",
        errorLoading: "No se pudieron cargar las ventas:",
        tableLabel: "Lista de ventas a agentes de compra",
        colNumber: "Nº",
        colOperation: "Operación",
        colType: "Tipo",
        colBuyer: "Comprador",
        colDate: "Fecha",
        noEntries: "Sin ventas para los filtros seleccionados.",
        loadMore: "Cargar mas",
        bucketDiscovery: "Búsqueda",
        bucketCustomer: "Consulta",
        bucketCheckout: "Compra",
      },
      merchantAgentsPanel: {
        title: "Agentes",
        description:
          "Aquí ves los agentes de compra que ya han intentado comprar en tu tienda. Puedes vetarlos, ponerlos en vigilancia o dejarles comprar libremente.",
        errorLoading: "No se pudieron cargar los agentes:",
        countersCanBuy: "Pueden comprar",
        countersWatching: "Los vigilo",
        countersBanned: "Vetados",
        tableLabel: "Lista de agentes de compra",
        colWho: "Quién es",
        colStatus: "Estado",
        colReputation: "Reputación",
        colActivity: "Actividad",
        colActions: "Qué quiero hacer",
        emptyTitle: "Aún no tienes agentes de compra conectados",
        emptyDesc:
          "Cuando un agente quiera comprar en tu tienda, aparecerá aquí.",
        defaultAgentName: "Comprador automático",
        callsLast30d: "{{count}} compras",
        callsLast30dSuffix: "últimos 30 días",
        stateCanBuy: "Puede comprar",
        stateWatching: "Lo estoy vigilando",
        stateBanned: "Vetado",
        statePending: "Pendiente de revisar",
        noData: "Sin datos",
        trustVeryReliable: "Muy de fiar",
        trustAcceptable: "Aceptable — vigílalo",
        trustLow: "Poca confianza — ojo",
        revokeBtn: "🚫 Vetar — no puede comprar",
        probationBtn: "👁️ Vigilar — lo reviso yo",
        allowBtn: "✅ Dejar comprar",
        closeNotification: "Cerrar notificación",
        toastRevoked: "Agente vetado",
        toastProbation: "Agente en vigilancia",
        toastAllowed: "Agente puede comprar",
        toastError: "Error al actualizar agente",
        auditReason: "Cambiado desde el panel del comercio ({{action}})",
        guideTitle: "¿Cómo sé si un agente de compra es de fiar?",
        guide80: "80 - 100 puntos:",
        guide80Desc: "Muy de fiar. Lleva tiempo comprando sin problemas.",
        guide50: "50 - 79 puntos:",
        guide50Desc:
          "Aceptable pero vigílalo. Puede tener algún incidente menor.",
        guide0: "0 - 49 puntos:",
        guide0Desc:
          "Poca confianza. Trusteed te recomienda vetarlo o ponerlo en vigilancia.",
        notifications: "Notificaciones",
      },
      merchantCertNlweb: {
        errorCert: "Error al cargar certificación.",
        errorNlweb: "Error al cargar estado NLWeb.",
        errorWebmcp: "Error al cargar estado WebMCP.",
        certTitle: "Certificación",
        nlwebTitle: "NLWeb",
        webmcpTitle: "WebMCP",
        nlwebStatus: "Estado",
        nlwebLastIndex: "Última indexación",
        nlwebProductsIndexed: "Productos indexados",
        nlwebReindex: "Re-indexar",
        nlwebReindexing: "Iniciando...",
        nlwebReindexSuccess: "Re-indexación iniciada",
        nlwebReindexError: "Error al iniciar re-indexación",
        webmcpStatus: "Estado",
        webmcpEnabled: "Habilitado",
        webmcpDisabled: "Deshabilitado",
        webmcpAdapter: "Adaptador detectado",
        webmcpLastConnection: "Última conexión",
        notifications: "Notificaciones",
        closeNotification: "Cerrar notificacion",
        certStatusLabels: {
          active: "Activa",
          expiring_soon: "Caduca pronto",
          expired: "Caducada",
          pending: "Pendiente",
          not_applicable: "No aplica",
        },
        nlwebStatusLabels: {
          idle: "Inactivo",
          indexing: "Indexando",
          error: "Error",
          never_indexed: "Nunca indexado",
        },
      },
      merchantCheckoutConfig: {
        description:
          "Configuración de los métodos de pago habilitados para agentes en checkout.",
        ariaLoading: "Cargando configuración",
        errorLoading: "No se pudo cargar la configuración:",
        railsAriaLabel: "Rails de checkout",
        enabled: "Habilitado",
        disabled: "Deshabilitado",
        noRails:
          "Aún no hay rails de pago configurados. Conecta un método de pago para habilitar el checkout para agentes.",
      },
      merchantOrders: {
        errorLoading: "No se pudieron cargar los pedidos:",
        tableLabel: "Lista de pedidos",
        colPlatform: "Plataforma",
        colOrderId: "Order ID",
        colStatus: "Estado",
        colTotal: "Total",
        colDate: "Fecha",
        noOrders: "No hay pedidos disponibles.",
        loadMore: "Cargar más",
      },
      merchantPaymentMethods: {
        description:
          "Conecta los métodos de cobro que aceptas de agentes de compra. Puedes activarlos, desactivarlos o desconectarlos en cualquier momento.",
        methodDescriptions: {
          stripe:
            "Procesador de tarjetas global. Acepta Visa, Mastercard, Amex y métodos locales. Conéctalo con tu Secret Key.",
          x402: "Pagos en USDC sobre Base/Solana vía protocolo x402. Liquidación on-chain en segundos.",
          acp: "Pagos delegados por agentes IA vía ACP (powered by Stripe). Para checkout iniciado por agente.",
          paypal: "Acepta pagos con PayPal. Próximamente disponible.",
          visa_vic:
            "Acepta pagos con Visa mediante credenciales digitales verificadas. Próximamente disponible.",
          mastercard_mcap:
            "Acepta pagos con Mastercard mediante agentes IA. Próximamente disponible.",
          kyapay:
            "Compra ahora, paga después. Soporte para Europa (eurozona). Próximamente disponible.",
        },
        errorLoading: "No se pudieron cargar los métodos de pago:",
        sectionAvailable: "Disponibles ahora",
        sectionComingSoon: "Próximamente",
        noMethods: "No hay métodos de pago disponibles en este momento.",
        comingSoonLabel: "Disponible pronto",
        statusConnected: "Conectado",
        statusVerifying: "Verificando",
        statusError: "Error",
        statusDisabled: "Desactivado",
        statusAvailable: "Sin conectar",
        connectApiKey: "Clave secreta de API",
        connectWallet: "Dirección de cartera",
        connectBtn: "Conectar",
        connecting: "Conectando…",
        enableBtn: "✅ Activar",
        disableBtn: "Desactivar",
        disconnectBtn: "🔌 Desconectar",
        actionConnected: "Conectado",
        actionReconnected: "Reconectado",
        actionDisconnected: "Desconectado",
        actionEnabled: "Activado",
        actionDisabled: "Desactivado",
        actionError: "Error",
        verifiedAt: "Verificado: {{date}}",
        closeBtn: "Cerrar",
        notifications: "Notificaciones",
      },
      shopSwitcher: {
        superAdmin: "Super-admin",
        superAdminTitle: "Super-administrador — acceso a todas las tiendas",
        changeSrOnly: "Cambiar tienda",
        shopLabel: "Tienda #{{id}}",
      },
      operatorsInstallations: {
        title: "Operator agents",
        description:
          "Operator agents act on this store on your behalf. Every privileged action is signed by your store key and logged in Trust Center.",
        errorLoading: "Failed to load installations: ",
        errorUnknown: "Unknown error",
        loadingAria: "Loading installations",
        tableLabel: "Operator installations",
        colVendorApp: "Vendor / App",
        colVersion: "Version",
        colModelHash: "Model hash",
        colPlatform: "Platform",
        colStatus: "Status",
        colInstalled: "Installed",
        colLastAction: "Last action",
        colReputation: "Reputation (V/A/I)",
        noInstallations:
          "No operator agents installed. Visit Trust Center to add.",
        justNow: "just now",
      },
      support: {
        buttonTitle: "Reportar un problema",
        modalTitle: "¿Algo no funciona?",
        description:
          "Cuéntanos qué pasó con tus propias palabras. Incluiremos automáticamente información técnica para que podamos ayudarte más rápido.",
        placeholder:
          "Ej: Al entrar en 'Mis ventas' la página se queda en blanco…",
        autoLogsNote:
          "Se adjuntarán automáticamente los últimos errores del panel (sin datos de clientes).",
        send: "Enviar",
        sending: "Enviando…",
        successTitle: "¡Ticket enviado!",
        ticketLabel: "Número de ticket:",
        successHint:
          "Recibirás respuesta en el correo asociado a tu cuenta. Normalmente respondemos en menos de 24 h.",
      },
    },
    $h = {
      common: {
        loading: "Loading...",
        error: "Error",
        errorUnknown: "Unknown error",
        save: "Save",
        cancel: "Cancel",
        close: "Close",
        back: "Back",
        retry: "Try again",
        active: "Active",
        inactive: "Inactive",
        enabled: "Enabled",
        disabled: "Disabled",
        noData: "No data",
        notifications: "Notifications",
        closeNotification: "Close notification",
        loadingMore: "Loading…",
        loadMore: "Load more",
        configSaved: "Settings saved successfully.",
      },
      inicio: {
        title: "How is my store doing today?",
        errorLoadingSummary: "Could not load summary:",
        reputationSection: "Your reputation as a seller",
        scoreLabelComputing: "Computing…",
        scoreLabelExcellent: "Excellent",
        scoreLabelAcceptable: "Acceptable",
        scoreLabelNeedsAttention: "Needs attention",
        scoreDescComputing:
          "Trusteed is analysing your store. Come back in a few minutes.",
        scoreDescExcellent:
          "Your store has an impeccable reputation among shopping agents.",
        scoreDescAcceptable:
          "Your store is doing well, but there is room for improvement. Enable more security rules.",
        scoreDescNeedsAttention:
          "Some shopping agents have doubts about your store. Review your rules.",
        scoreAriaLoading: "Loading score",
        updatedAt: "Updated on {{date}} UTC",
        scoreLow: "0 — Low",
        scoreMid: "50 — Medium",
        scoreHigh: "100 — Excellent",
        manageReputation: "Manage Reputation →",
        viewActivity: "View activity history →",
        securitySection: "Is your store protected?",
        securityProtected: "Protected",
        securityProtectedDesc:
          "Your store has active protection. Every sale to a shopping agent is recorded and signed.",
        securityActiveKey: "Active key: {{kid}}",
        securityGraceKeys: "{{count}} in grace period",
        securityNotActive: "Not activated",
        securityNotActiveDesc:
          "Your store does not yet have the trust seal activated. Shopping agents cannot see that you are trustworthy.",
        securityActivate: "Activate my protection →",
        salesSection: "Latest sales to shopping agents",
        salesEmpty: "You have no sales to shopping agents yet.",
        salesEmptyDesc:
          "When a robot or virtual assistant buys from your store, it will appear here.",
        salesTableLabel: "Latest AI sales",
        salesColNumber: "No.",
        salesColType: "Type",
        salesColBuyer: "Buyer",
        salesColDate: "Date",
        viewAllOrders: "View all my orders →",
        bucketCheckout: "Purchase",
        bucketCustomer: "Query",
        bucketDiscovery: "Search",
      },
      trustCenter: {
        title: "Trust Center",
        tabOverview: "Resumen",
        tabReceipts: "Ventas IA",
        tabKeys: "Claves",
        tabAudit: "Auditoría",
        tabsAriaLabel: "Trust Center tabs",
        loading: "Loading...",
      },
      trustReceipts: {
        panelTitle: "Trust panel",
        scoringMethodLink: "How we determine your store score",
        errorLoadingData:
          "Your store data will load as soon as the service is available.",
        noData: "No data.",
        scoreLow: "0 — Low",
        scoreMid: "50 — Medium",
        scoreCap: "Cap: {{cap}}/100",
        scoreHigh: "90–100 — Excellent",
        scoreCurrent: "Current cap: {{cap}}/100",
        scoreComputing: "Computing…",
        scoreExcellent: "Excellent",
        scoreImprovable: "Improvable",
        scoreNeedsAttention: "Needs attention",
        coldStartDesc:
          "Your store is just getting started. This score rises as you complete the basic steps and receive your first sales.",
        humanEstablishedDesc:
          "You have a good track record as a seller. Your score can reach up to 85/100 before your first sale to a shopping agent.",
        scoreHighDesc:
          "Your store has an impeccable reputation. Agents fully trust you.",
        scoreMidDesc:
          "Your store is well rated among agents. Review the yellow areas to keep improving.",
        scoreLowDesc:
          "Some buying agents have doubts. Act on the red areas as soon as possible.",
        computedAt: "Computed on {{date}} UTC",
        pendingActionsOne: "pending improvement",
        pendingActionsMany: "pending improvements",
        breakdownTitle: "Score breakdown",
        coldStartNotice:
          "Your store is just getting started. The seller history score and agent experience will be available when you have more activity — this is normal, not negative.",
        notApplicable: "Not applicable yet",
        weightLabel: "weight {{pct}}%",
        noDataLabel: "No data",
        countWillActivate: "Will count when activated:",
        measuredNow: "What is measured at your current stage",
        checklistTitle: "What can I do to improve my score?",
        checklistProgress: "{{done}} of {{total}} completed",
        checklistMissingMany:
          "— you still need {{count}} things to reach the maximum",
        checklistMissingOne:
          "— you still need {{count}} thing to reach the maximum",
        checklistAllDone: "— everything is in order to get started",
        checklistNow: "Right now",
        checklistAutoTitle: "With your first sales",
        checklistAutoNote:
          "These factors are measured automatically when orders start coming in. You don't need to do anything — the system collects them automatically.",
        checklistAutoActiveNote:
          "These factors are now being measured from your real sales and already count toward your score.",
        practicesTitle: "Three things that always work",
        faqTitle: "Questions everyone asks",
        securityTitle: "Is your store protected?",
        securityActiveDesc:
          "Every sale to a shopping agent is recorded and sealed.",
        securityProtectionActive: "Active protection.",
        securityRotationWarning:
          "It has been more than {{days}} days since protection was last renewed. Contact support if you notice anything unusual.",
        securityNotActive:
          "Your store does not yet have the trust seal activated.",
        securityActivate: "Activate my protection →",
        goToKeys: "Go to Keys",
        milestoneText: {
          no_store: "Open your store to start building your reputation.",
          cold_start:
            "Complete onboarding and make your first sales to raise your score.",
          human_established:
            "Make your first sales to shopping agents to unlock the top score tier.",
        },
        recText: {
          activate_security_key: "Activate your trust seal (signing key).",
          add_return_policy: "Add a clear return policy.",
          add_shipping_policy: "Add an estimated shipping time.",
          complete_first_agent_sale:
            "Complete your first sale to a shopping agent.",
          more_agent_sales: "Get more sales to shopping agents.",
          improve_fulfillment_rate: "Improve your on-time shipping rate.",
          reduce_disputes: "Reduce disputes and refunds.",
          external_assurance_unavailable:
            "External assurance is not available yet.",
        },
        checklistSello: "Security seal active",
        checklistSelloDetail:
          "Ensures every order from a shopping agent is signed. Without it, agents do not trust your store.",
        checklistCompliance: "No errors in your payment methods",
        checklistComplianceDetail:
          "You have an error in your payment method. Shopping agents cannot complete their purchases.",
        checklistComplianceAction: "Open payment settings in WooCommerce",
        checklistDevoluciones: "Returns policy",
        checklistDevolucionesDetail:
          "How many days does the customer have? Do you cover return shipping? If it is not written down, agents count it against you.",
        checklistDevolucionesAction: "Open policies page in WooCommerce",
        checklistEnvio: "Estimated shipping time",
        checklistEnvioDetail:
          "Specify how many days you take to ship. If you don't, it looks like you're unsure about your own process.",
        checklistEnvioAction: "Open shipping settings in WooCommerce",
        checklistCatalogo: "Catalogue with photos, prices and descriptions",
        checklistCatalogoDetail:
          "Your products need a photo, real price, updated stock and a description. This counts from day one.",
        checklistCatalogoAction: "Open product list",
        checklistFulfillment: "On-time shipping",
        checklistFulfillmentDetail:
          "Measured automatically — the % that arrive within the promised timeframe.",
        checklistDisputes: "Few disputes and refunds",
        checklistDisputesDetail:
          "Measured automatically — the % of orders with a claim in the last 90 days.",
        storeAgeLine: "Your store has been open for",
        storeActive: "active",
        storeYear: "year",
        storeYears: "years",
        storeDays: "days",
        practice1Title: "Keep your catalogue up to date",
        practice1Body:
          "Update stock, prices and photos so automated buyers see what you actually have. If what you show doesn't match what you have, trust goes down.",
        practice2Title: "Put your return rules in writing",
        practice2Body:
          "How many days does the customer have to return? Do you cover return shipping? Store credit or full refund? If it's not written down, automated buyers count it against you.",
        practice3Title: "Ship fast and without surprises",
        practice3Body:
          "When an order arrives late or a claim is made, your score drops. You don't need to be Amazon — just do what you promise. If you say 3 days, ship in 3 days.",
        faq1Q: "Is this score the same as the star ratings customers give me?",
        faq1A:
          "No. Stars are given by people who buy. This score is calculated by Trusteed by looking at how your store works internally: whether stock matches, whether orders arrive, whether there are claims. It's a completely different thing.",
        faq2Q: "If I have 100 points, will I sell more?",
        faq2A:
          "Not directly. Having a high score means more automated buyers will find your store and trust it. But whether they buy or not depends on your prices, your catalogue and what you sell.",
        faq3Q: "Can I lose visibility before my store gets closed?",
        faq3A:
          "Yes. If the score drops a lot, you first appear less in searches. If it keeps dropping, the store gets hidden. And if it's not fixed, it can be suspended. That's why it's best to act before it reaches that point.",
        humanOrders: "order",
        humanOrdersPlural: "orders",
        humanOrdersOf: "from human customers",
        agentSale: "sale",
        agentSalePlural: "sales",
        agentSalesOf: "to shopping agents",
        confidenceInsufficient: "Complete the setup to see your score",
        confidenceColdStart: "Insufficient history",
        confidenceHumanEstablished: "Seller with human history",
        confidenceAgentThin: "First agent sales",
        confidenceAgentVerified: "Verified with agents",
        unlockAreaDefault:
          "This area will activate when you have more activity in your store.",
        unlockMerchantColdStart:
          "Activates when you have at least 5 customer sales. You don't have enough history yet.",
        unlockAgentColdStart:
          "Activates with your first sales to shopping agents.",
        unlockAgentHuman: "Activates with your first sales to shopping agents.",
        dimMerchantReliability: "🏪 What is your track record as a seller?",
        dimAgenticReadiness: "⚙️ Is your store ready for shopping agents?",
        dimAgenticEvidence:
          "🤝 What experience have agents had with your store?",
        subDim: {
          setupQuality: "Catalog, policies & pricing",
          protocolSecurity: "Security seal (digital signature)",
          complianceHealth: "No errors in your payment methods",
          integrationFreshness: "Catalog up to date & synced",
          fulfillmentPerformance: "Orders shipped on time",
          disputeAndRefundHealth: "Few claims or returns",
          orderCompletionHealth: "Orders completed without cancellation",
          catalogOperationalQuality: "Complete & up-to-date catalog",
          storeAgeConfidence: "Store age & history",
          humanOrderVolumeConfidence: "Number of customers served",
          agentCheckoutSuccessRate: "Agent purchases completed",
          agentFulfillmentOnTimeRate: "On-time shipping to agent buyers",
          agentDisputeRefundHealth: "Few disputes on agent sales",
          receiptIntegrity: "Signed digital receipts",
          agentLatencyAndToolReliability: "Response speed to agents",
          repeatAgentSuccess: "Agents that come back to buy",
          fulfillmentRate: "Orders shipped on time",
          disputeRate: "Few complaints or returns",
          returnWindowClarity: "Return rules are written down",
          catalogCompleteness: "Products with photos, prices and stock",
          storeAgeBonus: "How long your store has been open",
          hasActiveKey: "Active digital signing key",
          hasShippingPolicy: "Shipping time is written down",
          hasReturnPolicy: "Return rules are written down",
          paymentMethodsSetup: "You can receive payments",
          mcpEndpointHealthy: "Shopping agents can reach your store",
          agentOrderSuccessRate: "Shopping agents complete their orders",
          trustReceiptCoverage: "Signed receipts for every shopping agent sale",
          agentConsentCompliance:
            "Shopping agents have accepted your store terms",
        },
      },
      paymentMethods: {
        title: "Payment methods",
        ariaLoading: "Loading payment methods",
        errorLoading: "Could not load payment methods:",
        noMethods: "No payment methods configured.",
        listAriaLabel: "Payment methods list",
        rotateBtnLabel: "Rotate credentials for {{label}}",
        rotateBtn: "Rotate credentials",
        dialogTitle: "Rotate credentials",
        dialogDesc:
          "Are you sure you want to rotate the credentials? This action cannot be undone.",
        confirmBtn: "Confirm",
        cancelBtn: "Cancel",
        rotating: "Rotating...",
        rotateSuccess: "Credentials rotated successfully",
        rotateErrorFallback: "Error rotating credentials",
        closeNotification: "Close notification",
        statePending: "Pending",
        stateActive: "Active",
        stateError: "Error",
        stateDisabled: "Disabled",
      },
      misVentas: {
        title: "My sales",
        tabOrders: "My orders",
        tabReceipts: "AI Sales",
        tabKeys: "Keys",
        tabAudit: "Audit",
        tabsAriaLabel: "My sales sections",
        ordersSection: "All my orders",
        ordersSectionDesc:
          "Here you can see all orders placed in your store, from both regular and shopping agents.",
        ordersErrorLoading: "Could not load orders:",
        ordersEmpty: "You have no orders registered yet.",
        ordersEmptyDesc:
          "When someone buys from your store, the order will appear here.",
        ordersTableLabel: "Orders list",
        colOrderNumber: "Order no.",
        colStore: "Store",
        colStatus: "Status",
        colTotal: "Total",
        colBuyer: "Who bought",
        colDate: "Date",
        platformShopify: "Shopify",
        platformWoo: "WooCommerce",
        platformAcp: "Other channel",
        statusCreated: "Created",
        statusUpdated: "Updated",
        statusPaid: "Paid",
        statusFulfilled: "Fulfilled",
        statusCancelled: "Cancelled",
        statusRefunded: "Refunded",
        buyerAuto: "🤖 Shopping agent #{{id}}",
        buyerHuman: "👤 Person",
        loadMoreOrders: "Load more orders →",
        receiptsSection: "Receipts from shopping agent sales",
        receiptsSectionDesc:
          "Every time a robot or virtual assistant buys from your store, a signed, timestamped receipt is generated.",
        receiptsBenefits:
          "✅ What is it for? If a buyer claims 'I never placed that order', this receipt — signed, timestamped and tamper-evident — is solid backup: you can download it and hand it to your bank or solicitor. On its own it does not replace the evidence they may require in a dispute. We store it automatically for as long as the law in your country requires (5–10 years), with nothing to do on your end.",
        receiptsRegulation:
          "🏛️ Technical level: these receipts are designed to follow the EU electronic-signature standard (eIDAS) and carry a digital signature plus a timestamp. They are not yet a qualified signature or timestamp (that requires a certificate authority on the EU trusted list): they count as a verifiable integrity proof, not ready-made dispute evidence for a bank or court.",
        receiptsErrorLoading: "Could not load receipts:",
        receiptsEmpty: "No automated sale receipts yet.",
        receiptsEmptyDesc:
          "When a shopping agent makes a purchase, the receipt will appear here automatically.",
        receiptsTableLabel: "AI Receipts",
        colReceiptNumber: "Receipt no.",
        colType: "Type",
        colAction: "Action",
        colBuyer2: "Buyer",
        bucketCheckout: "Purchase",
        bucketCustomer: "Query",
        bucketDiscovery: "Search",
      },
      misReglas: {
        title: "My Rules",
        infoNotice:
          "These rules are applied automatically to any buying agent that tries to purchase in your store. Enable or disable them with one click. The more you enable, the better protected your store will be.",
        errorNotice:
          "Rules are shown in provisional mode. Changes will be saved when the service is available.",
        rulesByCategoryTitle: "Rules by category",
        activeCountLabel: "{{active}} of {{total}} rules active",
        ruleActive: "Active",
        ruleInactive: "Inactive",
        blockedLast7d: "{{count}} blocked 7d",
        failOpenLast7d: "{{count}} fail-open 7d",
        toggleAriaActive: "Disable rule",
        toggleAriaInactive: "Enable rule",
        howItWorksTitle: "How do rules work?",
        howInactive:
          "Not applied. The buying agent passes without being evaluated by this criterion.",
        howInactiveLabel: "Inactive rule:",
        howActive:
          "Evaluated on every purchase. If the buying agent breaks it, they are blocked or placed under review depending on severity.",
        howActiveLabel: "Active rule:",
        howStats:
          "The badges next to each rule show how many buyers have been affected in the last 7 days.",
        howStatsLabel: "Real-time statistics:",
        ruleActivatedMsg: "Rule activated",
        ruleDeactivatedMsg: "Rule deactivated",
        ruleChangeError: "Could not change the rule. Please try again.",
        paramsTitle: "Parameters",
        paramsSaveBtn: "Save parameters",
        paramsResetBtn: "Reset",
        paramsCsvHint: "Comma-separated values",
        taxonomyUnavailable:
          "Shopify category search is unavailable on this platform",
        taxonomySearchPlaceholder: "Search category…",
        taxonomyRemoveLabel: "Remove {{name}}",
        r001r009Redundancy:
          "R009 will run in shadow mode (same verdict as R001 — first match wins). It will not change outcomes, only separate telemetry.",
        r002WithoutR001:
          "R001 is OFF, so R002 only blocks invalid tokens that are presented. Enable R001 to require a token on every request.",
        paramsRequiredHint:
          "Provide at least one of the listed parameters before enabling.",
        paramsRequiredError: "Required parameter missing:",
        params: {
          "R001.requireAgentId": "Require agent ID",
          "R001.merchantTier": "Merchant tier (high = always require agent ID)",
          "R004.maxKeyAgeHours": "Max key age (hours)",
          "R009.requireAgentId": "Require agent ID",
          "R010.minCompletedOrders": "Minimum completed orders",
          "R003.allowedCategories": "Allowed categories (mandate)",
          "R012.categories": "Blocked categories",
          "option.alcohol": "Alcohol",
          "option.tobacco": "Tobacco",
          "option.firearms": "Firearms",
          "option.pharmaceuticals": "Pharmaceuticals",
          "option.adult": "Adult content",
          "option.gambling": "Gambling",
          "option.cbd": "CBD",
          "option.electronics_high_value": "High-value electronics",
          "option.jewelry": "Jewelry",
          "option.crypto": "Crypto",
          "option.gift_cards": "Gift cards",
          "option.subscriptions": "Subscriptions",
          "R014.highRiskCountries": "High-risk countries (ISO-2)",
          "R014.maxCancellations": "Max cancellations",
          "R014.windowDays": "Window (days)",
          "R015.maxDeltaBps": "Max price delta (bps)",
          "R016.minStock": "Minimum stock",
          "R018.spikeMultiplier": "Spike multiplier",
          "R018.merchantAvgOrderCents": "Merchant avg order (cents)",
          "R018.maxItemCount": "Max items per cart",
          "R018.maxSingleSkuQty": "Max qty per SKU",
          "R021.minCompletedOrders":
            "Min completed orders before first purchase",
          "R022.allowedPaymentMethods": "Allowed payment methods",
          "R022.blockedPaymentMethods": "Blocked payment methods",
          "option.card": "Card",
          "option.paypal": "PayPal",
          "option.bnpl": "Buy now, pay later (BNPL)",
          "option.klarna": "Klarna",
          "option.afterpay": "Afterpay",
          "option.bank_transfer": "Bank transfer",
          "option.apple_pay": "Apple Pay",
          "option.google_pay": "Google Pay",
          "option.gift_card": "Gift card",
          "R023.windowDays": "Window (days)",
          "R023.maxRatio": "Max refund ratio (0–1)",
          "R024.windowDays": "Window (days)",
          "R024.maxDisputes": "Max disputes",
          "R025.blockPoBox": "Block PO Box addresses",
          "R025.blockFreightForwarder": "Block freight forwarders",
          "R026.requireConsent": "Require explicit consent",
          "R027.maxStoredValueCents": "Max stored value (cents)",
          "R028.requirePurchaseOrder": "Require purchase order",
          "R032.blockedCategoryIds": "Blocked categories",
          "R034.blockedSkus": "Blocked SKUs",
          "R035.maxCents": "Max order total (cents)",
          "R036.maxCentsPerLine": "Max amount per line (cents)",
          "R038.maxQuantity": "Max items per order",
          "R039.maxPerSku": "Max quantity per SKU",
          "R043.ttlMinutes": "Approval window (minutes)",
          "R048.blockedTypes": "Blocked digital types",
          "option.license_key": "License key",
          "option.downloadable": "Downloadable",
          "option.stored_value": "Stored value",
        },
        helpLinkLabel: "What does this rule do? →",
        helpBase: "https://trusteed.xyz/en/agent-rules",
        categoryLabels: {
          identity: "Identity",
          behavior: "Behavior",
          transaction: "Transaction",
          postsale: "Post-sale",
          general: "General",
          other: "Other",
        },
        rulesMeta: {
          "R001.verified-agent-required": {
            category: "identity",
            title: "Agent must identify itself",
            description:
              "If a robot or assistant wants to buy in your store, it must present its 'digital ID'. Without identification, no purchase.",
          },
          "R002.signature-spoof-block": {
            category: "identity",
            title: "Block forged signature",
            description:
              "If the robot tries to buy with a digital signature that doesn't match, we stop it immediately.",
          },
          "R003.mandate-boundary-match": {
            category: "identity",
            title: "Robot cannot spend more than its owner authorises",
            description:
              "If the assistant has a signed limit of €100 and adds €250 to the cart, the order is cancelled.",
          },
          "R004.new-key-friction": {
            category: "identity",
            title: "Very new identity key",
            description:
              "If the robot has a brand-new identity key, we wait a few hours before letting it buy.",
          },
          "R005.revoked-agent-block": {
            category: "identity",
            title: "Robot with revoked access",
            description:
              "If the assistant is on Trusteed's blacklist, it cannot buy in any store.",
          },
          "R006.provider-confidence-tier": {
            category: "identity",
            title: "Block buyers with poor reputation",
            description:
              "If the robot's identity provider tells us its confidence is very low, I don't let it buy.",
          },
          "R007.cross-merchant-abuse-signal": {
            category: "identity",
            title: "Robot that has already caused harm in other stores",
            description:
              "If the assistant has had serious problems in other Trusteed stores, we block it here too.",
          },
          "R008.scope-escalation-detection": {
            category: "identity",
            title: "Robot requests more permissions than authorised",
            description:
              "If the assistant tries to access areas of your store it doesn't have permission for, we stop it.",
          },
          "R009.agent-verification-required": {
            category: "behavior",
            title: "Agent verification required",
            description:
              "For certain operations, the assistant must prove its identity before continuing.",
          },
          "R010.new-agent-probation": {
            category: "behavior",
            title: "Robot with no history in your store",
            description:
              "If this is the first time this assistant buys here, we add a small extra check.",
          },
          "R011.repeat-failed-checkout": {
            category: "behavior",
            title: "Detect suspiciously fast purchases",
            description:
              "If the robot fails several times in a row at payment within a few minutes, we pause it.",
          },
          "R012.high-risk-category": {
            category: "behavior",
            title: "High-risk product category",
            description:
              "Some products (gift cards, wine, tobacco…) have a higher risk of fraud. We add caution.",
          },
          "R013.return-policy-guard": {
            category: "behavior",
            title: "Robot does not accept your return policy",
            description:
              "If the assistant has not accepted your store's return conditions, the order is paused.",
          },
          "R014.delivery-risk-guard": {
            category: "behavior",
            title: "High-risk shipping country",
            description:
              "If the package destination is on a list of problematic countries (sanctions, frequent fraud), we review it.",
          },
          "R015.price-change-guard": {
            category: "transaction",
            title: "Price changed significantly during the process",
            description:
              "If the price of an item rises or falls more than a configured % between adding to cart and paying, we stop it.",
          },
          "R016.stock-confidence-guard": {
            category: "transaction",
            title: "Insufficient stock for the robot",
            description:
              "If a product is about to run out of stock, we only let humans complete the purchase.",
          },
          "R017.coupon-discount-anomaly": {
            category: "transaction",
            title: "Detect repeated discount searching",
            description:
              "If the robot tests many discount coupons abnormally, we flag it as suspicious.",
          },
          "R018.cart-composition-guard": {
            category: "transaction",
            title: "Detect large or unusual orders",
            description:
              "If the cart total is much higher than your store's average order, we review it before approving.",
          },
          "R019.country-jurisdiction": {
            category: "transaction",
            title: "Country not permitted in your store",
            description:
              "If the robot tries to invoice from a country outside your list of authorised countries, the order is cancelled.",
          },
          "R020.business-hours": {
            category: "transaction",
            title: "Purchases only during business hours",
            description:
              "If you configure a business hours window, robots cannot complete orders outside those hours.",
          },
          "R021.first-purchase-with-merchant": {
            category: "postsale",
            title: "Robot's first purchase in your store",
            description:
              "If it has never bought here before, we add an extra review even if the robot is known in other stores.",
          },
          "R022.payment-rail-restriction": {
            category: "postsale",
            title: "Payment method not permitted",
            description:
              "If the robot tries to pay with BNPL, Klarna or another method you don't accept for robots, we stop it.",
          },
          "R023.refund-abuse-guard": {
            category: "postsale",
            title: "Monitor excessive returns",
            description:
              "If the assistant has a very high return rate in the last 90 days, we restrict its access.",
          },
          "R024.dispute-history-guard": {
            category: "postsale",
            title: "Block if recent disputes exist",
            description:
              "If the assistant has opened many claims recently, we don't let it buy until they are resolved.",
          },
          "R025.sensitive-delivery-address": {
            category: "postsale",
            title: "Suspicious delivery address",
            description:
              "If the package goes to a PO box or a re-shipping warehouse, we add a review.",
          },
          "R026.subscription-autorenew-guard": {
            category: "postsale",
            title: "Subscription without renewal consent",
            description:
              "If the robot wants to activate a subscription and the customer has not given explicit OK to renewal, we stop it.",
          },
          "R027.gift-card-stored-value": {
            category: "postsale",
            title: "Gift card or stored-value purchase",
            description:
              "You can limit or block robots from buying gift cards or stored-value products.",
          },
          "R028.b2b-po-guard": {
            category: "postsale",
            title: "B2B order without purchase order",
            description:
              "If the order is corporate and does not include a valid purchase order number, we stop it.",
          },
          "R035.max-order-value": {
            category: "transaction",
            title: "Cap the total order amount",
            description:
              "Blocks agent orders whose total exceeds the limit you set. A merchant-side financial guardrail.",
          },
          "R036.max-line-item-value": {
            category: "transaction",
            title: "Cap the amount per line item",
            description:
              "Blocks any single cart line above the amount you set.",
          },
          "R038.max-items-per-order": {
            category: "transaction",
            title: "Cap the number of items per order",
            description:
              "Blocks agent orders with more total items than you allow. Anti-hoarding control.",
          },
          "R039.max-quantity-per-sku": {
            category: "transaction",
            title: "Cap the quantity per product",
            description:
              "Blocks buying more units of the same SKU than you allow.",
          },
          "R034.sku-blocklist": {
            category: "transaction",
            title: "Block specific products (SKUs) for agents",
            description:
              "Stops agents from buying the exact products you list by SKU.",
          },
          "R032.category-blocklist": {
            category: "transaction",
            title: "Block specific categories for agents",
            description:
              "Stops agents from buying products in categories you choose (e.g. restricted or high-risk goods).",
          },
          "R048.no-digital-goods-for-agents": {
            category: "transaction",
            title: "Block digital goods for agents",
            description:
              "Stops agents from buying gift cards and other digital or stored-value products.",
          },
          "R043.agent-checkout-approval-required": {
            category: "postsale",
            title: "Require your approval for agent checkouts",
            description:
              "Agent purchases are held pending your manual approval before completing. Adds a human-in-the-loop gate.",
          },
          "R029.merchant-preset": {
            category: "general",
            title: "Store security profile",
            description:
              "Choose between 'open', 'balanced', 'strict' or 'regulated' to apply a predefined set of rules.",
          },
          "R030.simple-controls": {
            category: "general",
            title: "Basic controls: maximum amount and countries",
            description:
              "Set a maximum order amount and a list of allowed countries. Quick to configure.",
          },
        },
      },
      seguridad: {
        title: "Store security",
        protectionSection: "Is your store protected?",
        errorChecking: "Could not verify security:",
        notActivatedTitle: "Protection not activated yet",
        notActivatedDesc:
          "Your store does not have a trust seal yet. Activate it from Home to start signing your sales to shopping agents.",
        protectionBadge: "Yes, all in order",
        protectionDesc:
          "Your store has active protection. Every sale made by a shopping agent is recorded and signed. Any attempt to tamper with an order is recorded and detectable.",
        lastRenewal: "Last renewal: {{days}} days ago",
        graceKeysNotice:
          "There are {{count}} previous protection keys still valid for verifying past sales. You don't need to do anything — they expire automatically in the coming days.",
        activitySection: "What has happened in your store?",
        activitySectionDesc:
          "Here you can see a log of everything that has happened in your store: who entered, what you sold, which orders were blocked and when your seal was renewed.",
        chainOk:
          "✓ The log is correct — no one has tampered with your store history.",
        chainBroken:
          "⚠ Something is off in your store history. This is unusual. Please contact support as soon as possible.",
        errorLoadingActivity: "Could not load activity history:",
        activityEmpty: "No activity recorded yet.",
        activityEmptyDesc:
          "When something happens in your store, it will appear here.",
        tableLabel: "Activity history",
        colWhen: "When",
        colFrom: "From",
        colResult: "Result",
        colWhat: "What happened",
        colBuyerType: "Buyer type",
        sourceShopify: "From Shopify",
        sourceWp: "From WordPress",
        sourcePortal: "From the portal",
        sourceApi: "Automated system",
        sourceMcp: "Shopping agent",
        sourceWebhook: "Automated notification",
        outcomeAllowed: "✓ Approved",
        outcomeBlocked: "✗ Blocked",
        outcomeSessionRenewed: "Session renewed",
        buyerBot: "🤖 Automated robot",
        buyerHuman: "👤 Person",
        viewMoreActivity: "View more activity →",
      },
      settings: {
        title: "Settings",
        failureModeSection: "Enforcement system failure mode",
        failureModeSectionDesc:
          "Controls behaviour when the Trusteed API is unavailable. Level-1 rules (R001, R007) are always applied offline.",
        configSaved: "Settings saved successfully.",
        errorSavingConfig: "Could not save settings:",
        optionBalanced: "Balanced (recommended)",
        optionBalancedHint:
          "Critical rules (R001, R007) always active; advanced rules allow the order if there are network issues.",
        optionStrict: "Strict",
        optionStrictHint:
          "Blocks all orders if the agent cannot be verified. Maximum protection.",
        optionPermissive: "Permissive",
        optionPermissiveHint:
          "Only logs incidents. Orders are never blocked due to network issues.",
        paymentSection: "How do I want shopping agents to pay me?",
        paymentSectionNotice:
          "When a shopping agent places an order, Trusteed tries to charge in the order you choose here. If the first fails, it tries the next. To change this order contact support or access the main Trusteed portal.",
        paymentErrorLoading: "Could not load configuration:",
        paymentNoRails:
          "You have no active payment method yet. Go to Merchant Center → Payments to connect Stripe, PayPal or another provider.",
        paymentOrder: "Charge order:",
        paymentRailEnabled: "✅ Active",
        paymentRailDisabled: "❌ Disabled",
        paymentRailMin: "Minimum: {{amount}}",
        paymentRailMax: "Maximum: {{amount}}",
        paymentRailCurrencies: "Only: {{currencies}}",
        paymentChangeNote:
          "To change the order or enable/disable payment methods, contact your Trusteed manager.",
        railStripe: "Card payment (Stripe)",
        railX402: "Crypto payment (x402)",
        railAcp: "ACP payment",
        railPaypal: "PayPal",
        railEidas: "eIDAS",
      },
      merchantCenter: {
        title: "Merchant Center",
        showingStore: "Showing data for store #{{id}}",
        tabsAriaLabel: "Merchant Center tabs",
        tabOrders: "Orders",
        tabPayments: "Payments",
        tabAgents: "Agents",
        tabCheckout: "Checkout",
        tabCertNlweb: "Certification & NLWeb",
        loading: "Loading...",
      },
      trustAuditLog: {
        bookDescription:
          "📋 Your store's record book. Everything that happens is logged here: when a buying agent entered your store, what they did, and whether it went well or not. If something fails, use the filters below to find exactly what happened and when.",
        integrityVerified: "Integrity verified",
        integrityError: "Chain integrity error in the audit log",
        filterAgentId: "Agent ID",
        filterAgentIdAria: "Filter by agentId",
        filterSource: "All sources",
        filterSourceAria: "Filter by source",
        filterSourcePortal: "Portal",
        filterSourceShopify: "Shopify Embed",
        filterSourceWp: "WP Embed",
        filterSourceApi: "API",
        filterSourceMcp: "MCP",
        filterSourceWebhook: "Webhook",
        filterDateFrom: "Date from",
        filterDateTo: "Date to",
        errorLoading: "Could not load the audit log:",
        tableLabel: "Trust audit log",
        colDate: "Date",
        colSource: "Source",
        colBucket: "Bucket",
        colTool: "Tool",
        colOutcome: "Outcome",
        colAgentId: "Agent ID",
        noEntries: "No audit entries for the selected filters.",
        loadMore: "Load more",
        sourceLabels: {
          portal: "Portal",
          "shopify-embed": "Shopify Embed",
          "wp-embed": "WP Embed",
          api: "API",
          mcp: "MCP",
          webhook: "Webhook",
        },
        outcomeLabels: {
          ok: "OK",
          success: "Success",
          allow: "Allowed",
          deny: "Blocked",
          blocked_by_overlay: "Blocked",
          token_refresh_seamless: "Session renewed",
          error: "Error",
        },
      },
      trustKeys: {
        description: `🔑 Your store's keys. These keys are the "signatures" the system puts on each sale receipt so any tampering is detectable. Change them every 90 days to keep everything secure, just like you change a lock every now and then.`,
        ariaLoading: "Loading keys",
        errorLoading: "Could not load key status:",
        notActivatedTitle: "No trust seal yet",
        notActivatedDesc:
          "Your store has not generated its signing key yet. Activate your protection from Home; once active, the key details appear here.",
        overdueWarning:
          "We recommend renewing the key — it has been {{days}} days since the last renewal.",
        activeKeyTitle: "Active trust seal",
        fieldIdentifier: "Identifier",
        fieldLastRenewal: "Last renewal",
        fieldDaysActive: "Days active",
        fieldDaysActiveSuffix: "days",
        retiredKeysTitle: "Previous seals (still valid)",
        retiredKeysAriaLabel: "Previous seals still valid",
        retiredColIdentifier: "Identifier",
      },
      trustReceiptDetail: {
        ariaLabel: "Trust Receipt detail",
        title: "Receipt detail",
        closeAriaLabel: "Close panel",
        fieldReceiptId: "Receipt ID",
        fieldBucket: "Bucket",
        fieldTool: "Tool",
        fieldAgentId: "Agent ID",
        fieldSigningKey: "Signing Key (kid)",
        fieldInputHash: "Input Hash",
        fieldOutputHash: "Output Hash",
        fieldDate: "Date",
        showJws: "View full JWS",
        hideJws: "Hide full JWS",
        copyJwksUrl: "Copy JWKS URL",
        copied: "Copied!",
        closeBtn: "Close",
        downloadBundle: "Download receipt (ZIP)",
        downloading: "Preparing…",
        downloadHint:
          "Verifiable integrity proof — not, on its own, dispute evidence for your bank or PSP.",
        downloadErrorV10: "Only available for v1.1 receipts.",
        downloadErrorLegacy: "This receipt is not offline-exportable.",
        downloadErrorGeneric: "Could not download the receipt.",
      },
      trustReceiptsList: {
        description:
          "🤖 Purchases made by buying agents. When an automated buying agent enters your store, a signed receipt is kept here — like a till receipt, but for automated sales. Click on a row to see all the details of that sale.",
        pacoBenefits:
          "✅ What's in it for you? If a shopping agent claims they never placed that order, this receipt — tamper-evident and independently verifiable — is solid backup: you can download it and hand it to your bank or solicitor. On its own it does not replace the evidence they may require in a dispute. We store it for 5–10 years as required by law in your country — nothing for you to do.",
        pacoRegulation:
          "🏛️ Technical level: your receipts are designed to follow the electronic-signature standards of the EU (eIDAS), the United States (ESIGN) and the United Kingdom (UK DIATF), carrying a digital signature plus a timestamp. They are not yet a qualified signature or timestamp (that requires a certificate authority on the EU trusted list): they serve as a verifiable integrity proof you can submit as backup, not ready-made dispute evidence for a bank or court. We store them for 5–10 years as required by your country's law, automatically.",
        learnMore: "Learn how it works and what it's for",
        filterBuyerId: "Buyer ID",
        filterBuyerIdAria: "Filter by buyer ID",
        filterTypeTodos: "All types",
        filterTypeDiscovery: "Search",
        filterTypeCustomer: "Query",
        filterTypeCheckout: "Purchase",
        filterTypeAria: "Filter by type",
        filterDateFrom: "Date from",
        filterDateTo: "Date to",
        errorLoading: "Could not load sales:",
        tableLabel: "Sales to shopping agents list",
        colNumber: "No.",
        colOperation: "Operation",
        colType: "Type",
        colBuyer: "Buyer",
        colDate: "Date",
        noEntries: "No sales for the selected filters.",
        loadMore: "Load more",
        bucketDiscovery: "Search",
        bucketCustomer: "Query",
        bucketCheckout: "Purchase",
      },
      merchantAgentsPanel: {
        title: "Shopping Agents",
        description:
          "Here you can see the shopping agents that have already tried to purchase in your store. You can ban them, put them under surveillance, or let them buy freely.",
        errorLoading: "Could not load agents:",
        countersCanBuy: "Can buy",
        countersWatching: "Watching",
        countersBanned: "Banned",
        tableLabel: "Shopping agents list",
        colWho: "Who",
        colStatus: "Status",
        colReputation: "Reputation",
        colActivity: "Activity",
        colActions: "Action",
        emptyTitle: "No shopping agents connected yet",
        emptyDesc:
          "When an agent wants to buy from your store, they will appear here.",
        defaultAgentName: "Shopping agent",
        callsLast30d: "{{count}} purchases",
        callsLast30dSuffix: "last 30 days",
        stateCanBuy: "Can buy",
        stateWatching: "Under surveillance",
        stateBanned: "Banned",
        statePending: "Pending review",
        noData: "No data",
        trustVeryReliable: "Very reliable",
        trustAcceptable: "Acceptable — watch them",
        trustLow: "Low trust — be careful",
        revokeBtn: "🚫 Ban — cannot buy",
        probationBtn: "👁️ Watch — I'll review them",
        allowBtn: "✅ Allow to buy",
        closeNotification: "Close notification",
        toastRevoked: "Agent banned",
        toastProbation: "Agent under surveillance",
        toastAllowed: "Agent can buy",
        toastError: "Error updating agent",
        auditReason: "Changed from merchant admin ({{action}})",
        guideTitle: "How do I know if a shopping agent is trustworthy?",
        guide80: "80 - 100 points:",
        guide80Desc:
          "Very reliable. Has been buying without issues for a while.",
        guide50: "50 - 79 points:",
        guide50Desc:
          "Acceptable but watch them. They may have had minor incidents.",
        guide0: "0 - 49 points:",
        guide0Desc:
          "Low trust. Trusteed recommends banning them or putting them under surveillance.",
        notifications: "Notifications",
      },
      merchantCertNlweb: {
        errorCert: "Error loading certification.",
        errorNlweb: "Error loading NLWeb status.",
        errorWebmcp: "Error loading WebMCP status.",
        certTitle: "Certification",
        nlwebTitle: "NLWeb",
        webmcpTitle: "WebMCP",
        nlwebStatus: "Status",
        nlwebLastIndex: "Last indexed",
        nlwebProductsIndexed: "Indexed products",
        nlwebReindex: "Re-index",
        nlwebReindexing: "Starting...",
        nlwebReindexSuccess: "Re-indexing started",
        nlwebReindexError: "Error starting re-indexing",
        webmcpStatus: "Status",
        webmcpEnabled: "Enabled",
        webmcpDisabled: "Disabled",
        webmcpAdapter: "Detected adapter",
        webmcpLastConnection: "Last connection",
        notifications: "Notifications",
        closeNotification: "Close notification",
        certStatusLabels: {
          active: "Active",
          expiring_soon: "Expiring soon",
          expired: "Expired",
          pending: "Pending",
          not_applicable: "Not applicable",
        },
        nlwebStatusLabels: {
          idle: "Idle",
          indexing: "Indexing",
          error: "Error",
          never_indexed: "Never indexed",
        },
      },
      merchantCheckoutConfig: {
        description:
          "Configuration of payment methods enabled for agents at checkout.",
        ariaLoading: "Loading configuration",
        errorLoading: "Could not load configuration:",
        railsAriaLabel: "Checkout rails",
        enabled: "Enabled",
        disabled: "Disabled",
        noRails:
          "No payment rails configured yet. Connect a payment method to enable agent checkout.",
      },
      merchantOrders: {
        errorLoading: "Could not load orders:",
        tableLabel: "Orders list",
        colPlatform: "Platform",
        colOrderId: "Order ID",
        colStatus: "Status",
        colTotal: "Total",
        colDate: "Date",
        noOrders: "No orders available.",
        loadMore: "Load more",
      },
      merchantPaymentMethods: {
        description:
          "Connect the payment methods you accept from shopping agents. You can enable, disable or disconnect them at any time.",
        methodDescriptions: {
          stripe:
            "Global card processor. Accepts Visa, Mastercard, Amex and local methods. Connect with your Secret Key.",
          x402: "USDC payments over Base/Solana via the x402 protocol. On-chain settlement in seconds.",
          acp: "Agent-delegated payments via ACP (powered by Stripe). For agent-initiated checkout.",
          paypal: "Accept PayPal payments. Coming soon.",
          visa_vic:
            "Accept Visa payments via verified digital credentials. Coming soon.",
          mastercard_mcap:
            "Accept Mastercard payments via AI agents. Coming soon.",
          kyapay:
            "Buy now, pay later. Support for Europe (eurozone). Coming soon.",
        },
        errorLoading: "Could not load payment methods:",
        sectionAvailable: "Available now",
        sectionComingSoon: "Coming soon",
        noMethods: "No payment methods available at this time.",
        comingSoonLabel: "Coming soon",
        statusConnected: "Connected",
        statusVerifying: "Verifying",
        statusError: "Error",
        statusDisabled: "Disabled",
        statusAvailable: "Not connected",
        connectApiKey: "Secret API key",
        connectWallet: "Wallet address",
        connectBtn: "Connect",
        connecting: "Connecting…",
        enableBtn: "✅ Enable",
        disableBtn: "Disable",
        disconnectBtn: "🔌 Disconnect",
        actionConnected: "Connected",
        actionReconnected: "Reconnected",
        actionDisconnected: "Disconnected",
        actionEnabled: "Enabled",
        actionDisabled: "Disabled",
        actionError: "Error",
        verifiedAt: "Verified: {{date}}",
        closeBtn: "Close",
        notifications: "Notifications",
      },
      shopSwitcher: {
        superAdmin: "Super-admin",
        superAdminTitle: "Super-administrator — access to all stores",
        changeSrOnly: "Change store",
        shopLabel: "Store #{{id}}",
      },
      operatorsInstallations: {
        title: "Operator agents",
        description:
          "Operator agents act on this store on your behalf. Every privileged action is signed by your store key and logged in Trust Center.",
        errorLoading: "Failed to load installations: ",
        errorUnknown: "Unknown error",
        loadingAria: "Loading installations",
        tableLabel: "Operator installations",
        colVendorApp: "Vendor / App",
        colVersion: "Version",
        colModelHash: "Model hash",
        colPlatform: "Platform",
        colStatus: "Status",
        colInstalled: "Installed",
        colLastAction: "Last action",
        colReputation: "Reputation (V/A/I)",
        noInstallations:
          "No operator agents installed. Visit Trust Center to add.",
        justNow: "just now",
      },
      support: {
        buttonTitle: "Report a problem",
        modalTitle: "Something not working?",
        description:
          "Tell us what happened in your own words. We will automatically attach technical info so we can help you faster.",
        placeholder: "E.g. The 'My sales' page stays blank after loading…",
        autoLogsNote:
          "The last panel errors will be attached automatically (no customer data included).",
        send: "Send",
        sending: "Sending…",
        successTitle: "Ticket sent!",
        ticketLabel: "Ticket number:",
        successHint:
          "You will receive a reply to the email linked to your account. We usually reply within 24 hours.",
      },
    },
    Vv = { es: $v, en: $h };
  function Vh() {
    try {
      const e = window;
      return (
        e.__AMCP_CONFIG__?.locale ??
        e.__AMCP_PS_CONFIG__?.locale ??
        e.__AMCP_MAGENTO_CONFIG__?.locale ??
        e.__AMCP_ODOO_CONFIG__?.locale ??
        navigator.language ??
        "en"
      )
        .split(/[-_]/)[0]
        .toLowerCase() === "es"
        ? "es"
        : "en";
    } catch {
      return "en";
    }
  }
  const Kh = N.createContext($h);
  function Kv({ children: e, locale: t }) {
    const r = t ?? Vh(),
      n = N.useMemo(() => Vv[r], [r]);
    return i.jsx(Kh.Provider, { value: n, children: e });
  }
  function xe() {
    return N.useContext(Kh);
  }
  function Wv() {
    return Vh();
  }
  const Hv = j({ success: Oe(), ticketNumber: k().optional() }),
    ar = [];
  typeof window < "u" &&
    (window.addEventListener("error", (e) => {
      const t = `[JS] ${e.message} at ${e.filename}:${e.lineno}`;
      ar.includes(t) || (ar.unshift(t), ar.length > 10 && ar.pop());
    }),
    window.addEventListener("unhandledrejection", (e) => {
      const t = `[Promise] ${String(e.reason)}`;
      ar.includes(t) || (ar.unshift(t), ar.length > 10 && ar.pop());
    }));
  function Qv() {
    const e = window;
    if (e.__AMCP_PS_CONFIG__) return "ps";
    const t = e.__AMCP_CONFIG__?.source;
    return t === "odoo-embed"
      ? "odoo"
      : t === "shopify-embed"
        ? "shopify"
        : t === "wp-embed" || document.getElementById("amcp-root") !== null
          ? "wp"
          : "unknown";
  }
  function Zv() {
    const e = xe(),
      [t, r] = ce.useState(!1),
      [n, a] = ce.useState(""),
      [s, o] = ce.useState("idle"),
      [l, c] = ce.useState(null),
      [u, p] = ce.useState(null),
      f = () => {
        (r(!0), o("idle"), a(""), c(null), p(null));
      },
      m = () => {
        r(!1);
      },
      x = async (v) => {
        if ((v.preventDefault(), !(n.trim().length < 10))) {
          o("loading");
          try {
            const b = await ne.post(
              "/v1/embed/support/report",
              {
                platform: Qv(),
                message: n.trim(),
                currentUrl: window.location.href.slice(0, 500),
                errorLogs: ar.slice(0, 10),
              },
              Hv
            );
            (c(b.ticketNumber ?? null), o("success"));
          } catch (b) {
            const C = b instanceof Error ? b.message : e.common.errorUnknown;
            (p(C), o("error"));
          }
        }
      };
    return i.jsxs(i.Fragment, {
      children: [
        i.jsx("button", {
          type: "button",
          onClick: f,
          title: e.support.buttonTitle,
          "aria-label": e.support.buttonTitle,
          style: {
            position: "fixed",
            bottom: 24,
            right: 24,
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            fontSize: 20,
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 2px 8px rgba(0,0,0,.25)",
            zIndex: 9998,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            lineHeight: 1,
          },
          children: "?",
        }),
        t &&
          i.jsx("div", {
            role: "dialog",
            "aria-modal": "true",
            "aria-label": e.support.modalTitle,
            style: {
              position: "fixed",
              inset: 0,
              zIndex: 9999,
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "flex-end",
              padding: 24,
              background: "rgba(0,0,0,.35)",
            },
            onClick: (v) => {
              v.target === v.currentTarget && m();
            },
            children: i.jsxs("div", {
              style: {
                background: "#fff",
                borderRadius: 12,
                boxShadow: "0 8px 32px rgba(0,0,0,.2)",
                width: 360,
                maxWidth: "calc(100vw - 48px)",
                padding: 24,
              },
              children: [
                i.jsxs("div", {
                  style: {
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 16,
                  },
                  children: [
                    i.jsx("h2", {
                      style: { margin: 0, fontSize: "1rem", fontWeight: 700 },
                      children: e.support.modalTitle,
                    }),
                    i.jsx("button", {
                      type: "button",
                      onClick: m,
                      "aria-label": e.common.close,
                      style: {
                        background: "none",
                        border: "none",
                        fontSize: 20,
                        cursor: "pointer",
                        color: "#555",
                        lineHeight: 1,
                        padding: "2px 6px",
                      },
                      children: "×",
                    }),
                  ],
                }),
                s === "success" &&
                  i.jsxs("div", {
                    style: { textAlign: "center", padding: "16px 0" },
                    children: [
                      i.jsx("div", { style: { fontSize: 40 }, children: "✅" }),
                      i.jsx("p", {
                        style: {
                          fontWeight: 700,
                          margin: "12px 0 4px",
                          color: "#1a7f4f",
                        },
                        children: e.support.successTitle,
                      }),
                      l &&
                        i.jsxs("p", {
                          style: { fontSize: ".85rem", color: "#555" },
                          children: [
                            e.support.ticketLabel,
                            " ",
                            i.jsxs("strong", { children: ["#", l] }),
                          ],
                        }),
                      i.jsx("p", {
                        style: {
                          fontSize: ".8rem",
                          color: "#888",
                          marginTop: 8,
                        },
                        children: e.support.successHint,
                      }),
                      i.jsx("button", {
                        type: "button",
                        onClick: m,
                        style: {
                          marginTop: 16,
                          background: "#1a73e8",
                          color: "#fff",
                          border: "none",
                          borderRadius: 6,
                          padding: "8px 20px",
                          fontSize: ".9rem",
                          cursor: "pointer",
                          fontWeight: 600,
                        },
                        children: e.common.close,
                      }),
                    ],
                  }),
                s !== "success" &&
                  i.jsxs("form", {
                    onSubmit: (v) => {
                      x(v);
                    },
                    children: [
                      i.jsx("p", {
                        style: {
                          fontSize: ".875rem",
                          color: "#555",
                          margin: "0 0 12px",
                        },
                        children: e.support.description,
                      }),
                      i.jsx("textarea", {
                        value: n,
                        onChange: (v) => a(v.target.value),
                        placeholder: e.support.placeholder,
                        rows: 5,
                        maxLength: 2e3,
                        required: !0,
                        style: {
                          width: "100%",
                          boxSizing: "border-box",
                          border: "1px solid #ccc",
                          borderRadius: 6,
                          padding: "8px 10px",
                          fontSize: ".875rem",
                          resize: "vertical",
                          fontFamily: "inherit",
                        },
                      }),
                      i.jsx("p", {
                        style: {
                          fontSize: ".75rem",
                          color: "#888",
                          margin: "4px 0 12px",
                        },
                        children: e.support.autoLogsNote,
                      }),
                      s === "error" &&
                        u &&
                        i.jsx("p", {
                          role: "alert",
                          style: {
                            color: "#c0392b",
                            fontSize: ".8rem",
                            margin: "0 0 10px",
                          },
                          children: u,
                        }),
                      i.jsxs("div", {
                        style: {
                          display: "flex",
                          gap: 8,
                          justifyContent: "flex-end",
                        },
                        children: [
                          i.jsx("button", {
                            type: "button",
                            onClick: m,
                            disabled: s === "loading",
                            style: {
                              background: "none",
                              border: "1px solid #ccc",
                              borderRadius: 6,
                              padding: "7px 16px",
                              fontSize: ".875rem",
                              cursor: "pointer",
                            },
                            children: e.common.cancel,
                          }),
                          i.jsx("button", {
                            type: "submit",
                            disabled: s === "loading" || n.trim().length < 10,
                            style: {
                              background:
                                s === "loading" || n.trim().length < 10
                                  ? "#a0c4f1"
                                  : "#1a73e8",
                              color: "#fff",
                              border: "none",
                              borderRadius: 6,
                              padding: "7px 18px",
                              fontSize: ".875rem",
                              fontWeight: 600,
                              cursor:
                                s === "loading" || n.trim().length < 10
                                  ? "not-allowed"
                                  : "pointer",
                            },
                            children:
                              s === "loading"
                                ? e.support.sending
                                : e.support.send,
                          }),
                        ],
                      }),
                    ],
                  }),
              ],
            }),
          }),
      ],
    });
  }
  const Gv = new w0({
      defaultOptions: {
        queries: {
          retry: (e, t) => {
            if (t instanceof Zc && t.status === 503) return !1;
            const r = t;
            return typeof r.status == "number" &&
              [401, 403, 503].includes(r.status)
              ? !1
              : e < 1;
          },
          staleTime: 6e4,
        },
      },
    }),
    Yc = (e) =>
      e === "payment-methods" ||
      e === "settings" ||
      e === "merchant-center" ||
      e === "inicio" ||
      e === "mis-ventas" ||
      e === "mis-reglas" ||
      e === "seguridad" ||
      e === "agentes"
        ? e
        : "trust-center",
    Yv = (e) => {
      switch (e) {
        case "inicio":
          return we(() => Promise.resolve().then(() => ax), void 0);
        case "payment-methods":
          return we(() => Promise.resolve().then(() => Gh), void 0);
        case "settings":
          return we(() => Promise.resolve().then(() => hx), void 0);
        case "merchant-center":
          return we(() => Promise.resolve().then(() => jx), void 0);
        case "mis-ventas":
          return we(() => Promise.resolve().then(() => Ux), void 0);
        case "mis-reglas":
          return we(() => Promise.resolve().then(() => db), void 0);
        case "seguridad":
          return we(() => Promise.resolve().then(() => xb), void 0);
        case "agentes":
          return we(() => Promise.resolve().then(() => sf), void 0);
        default:
          return we(() => Promise.resolve().then(() => Rb), void 0);
      }
    },
    Xv = ({ initialSection: e, onRegisterNavigate: t }) => {
      const [r, n] = ce.useState(
        e ?? Yc(document.getElementById("amcp-root")?.dataset.section)
      );
      ce.useEffect(() => {
        t?.(n);
      }, [t]);
      const a = ce.lazy(() => Yv(r));
      return i.jsxs(i.Fragment, {
        children: [
          i.jsx(ce.Suspense, {
            fallback: i.jsx("div", {
              className: "p-4 text-sm text-gray-500",
              children: "Loading...",
            }),
            children: i.jsx(a, {}),
          }),
          i.jsx(Zv, {}),
        ],
      });
    },
    Jv = (e) => {
      if (e === void 0 || e === "") return;
      const t = e.split(/[-_]/)[0]?.toLowerCase();
      if (t === "es") return "es";
      if (t === "en") return "en";
    },
    Wh = (e, t) => {
      const r = t?.section !== void 0 ? Yc(t.section) : void 0,
        n = Jv(t?.locale);
      (t?.getToken !== void 0 || t?.source !== void 0) &&
        Uv({
          source: t.source ?? "wp-embed",
          baseUrl: t.apiBase,
          getToken: t.getToken ?? (() => Promise.resolve(null)),
        });
      let a = null;
      const s = (l) => {
        a?.(Yc(l));
      };
      Im(e).render(
        i.jsx(ce.StrictMode, {
          children: i.jsx(Kv, {
            locale: n,
            children: i.jsx(k0, {
              client: Gv,
              children: i.jsx(Xv, {
                initialSection: r,
                onRegisterNavigate: (l) => {
                  a = l;
                },
              }),
            }),
          }),
        })
      );
      const o = window;
      o.TrusteedEmbed.navigateSection = s;
    };
  window.TrusteedEmbed = { mount: Wh };
  const Xc = document.getElementById("amcp-root");
  Xc !== null && Xc.dataset.autoMount !== "false" && Wh(Xc);
  const ex = j({ activated: Oe(), kid: k() }),
    tx = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    Hh = (e) => {
      try {
        return tx.format(new Date(e));
      } catch {
        return e;
      }
    },
    rx = (e, t, r) =>
      t !== "ready" || e === null
        ? {
            emoji: "⏳",
            color: "#8c9196",
            bg: "#f6f6f7",
            label: r.inicio.scoreLabelComputing,
            desc: r.inicio.scoreDescComputing,
          }
        : e >= 80
          ? {
              emoji: "🌟",
              color: "#1a7f4f",
              bg: "#e3f5ec",
              label: r.inicio.scoreLabelExcellent,
              desc: r.inicio.scoreDescExcellent,
            }
          : e >= 50
            ? {
                emoji: "👍",
                color: "#b27400",
                bg: "#fff8ec",
                label: r.inicio.scoreLabelAcceptable,
                desc: r.inicio.scoreDescAcceptable,
              }
            : {
                emoji: "⚠️",
                color: "#c0392b",
                bg: "#fff0ee",
                label: r.inicio.scoreLabelNeedsAttention,
                desc: r.inicio.scoreDescNeedsAttention,
              },
    nx = ({ ariaLabel: e }) =>
      i.jsx("div", {
        className: "h-28 animate-pulse rounded-lg bg-gray-100",
        role: "status",
        "aria-label": e,
      }),
    Jc = (e) => {
      const t = window.TrusteedEmbed;
      if (t?.navigateSection) {
        t.navigateSection(e);
        return;
      }
      const r = new URL(window.location.href);
      (r.searchParams.set("page", `amcp-${e}`),
        (window.location.href = r.toString()));
    },
    ax = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = {
                checkout: e.inicio.bucketCheckout,
                customer: e.inicio.bucketCustomer,
                discovery: e.inicio.bucketDiscovery,
              },
              {
                data: r,
                isLoading: n,
                isError: a,
                error: s,
              } = ye({
                queryKey: ["trust-overview-inicio"],
                queryFn: () => ne.get("/v1/embed/trust/overview", Nh),
              }),
              { data: o, isLoading: l } = ye({
                queryKey: ["trust-keys-inicio"],
                queryFn: async () => {
                  try {
                    return await ne.get("/v1/embed/trust/keys", ys);
                  } catch (C) {
                    if (C instanceof At && C.status === 404) return null;
                    throw C;
                  }
                },
                retry: !1,
              }),
              c = er(),
              u = xt({
                mutationFn: () =>
                  ne.post("/v1/embed/trust/keys/activate", {}, ex),
                onSuccess: () => {
                  (c.invalidateQueries({ queryKey: ["trust-keys-inicio"] }),
                    c.invalidateQueries({
                      queryKey: ["trust-overview-inicio"],
                    }));
                },
              }),
              p = r?.score?.status === "ready" ? r.score.score : null,
              f = r?.score?.status ?? "pending",
              m = r?.recentReceipts ?? [],
              x = o ?? null,
              v = r?.computedAt ?? null,
              b = rx(p, f, e);
            return i.jsxs("div", {
              className: "max-w-4xl space-y-6 p-6",
              children: [
                i.jsx("h1", {
                  className: "text-xl font-semibold text-gray-900",
                  children: e.inicio.title,
                }),
                a &&
                  i.jsxs("div", {
                    className:
                      "rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                    role: "alert",
                    children: [
                      e.inicio.errorLoadingSummary,
                      " ",
                      s instanceof Error ? s.message : e.common.errorUnknown,
                    ],
                  }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: i.jsx("h2", {
                        className: "font-semibold text-gray-900",
                        children: e.inicio.reputationSection,
                      }),
                    }),
                    i.jsx("div", {
                      className: "p-6",
                      children: n
                        ? i.jsx(nx, { ariaLabel: e.inicio.scoreAriaLoading })
                        : i.jsxs("div", {
                            className: "space-y-4",
                            children: [
                              i.jsxs("div", {
                                className: "flex flex-wrap items-center gap-5",
                                children: [
                                  i.jsxs("div", {
                                    style: {
                                      width: 96,
                                      height: 96,
                                      background: b.bg,
                                      border: `4px solid ${b.color}`,
                                    },
                                    className:
                                      "flex shrink-0 flex-col items-center justify-center rounded-full",
                                    children: [
                                      i.jsx("span", {
                                        style: {
                                          fontSize: 28,
                                          fontWeight: 800,
                                          color: b.color,
                                          lineHeight: 1,
                                        },
                                        children: f === "ready" ? p : "—",
                                      }),
                                      i.jsx("span", {
                                        style: {
                                          fontSize: 10,
                                          color: b.color,
                                          fontWeight: 600,
                                        },
                                        children: f === "ready" ? "/ 100" : "…",
                                      }),
                                    ],
                                  }),
                                  i.jsxs("div", {
                                    className: "flex-1",
                                    children: [
                                      i.jsxs("div", {
                                        className:
                                          "mb-1 flex items-center gap-2",
                                        children: [
                                          i.jsx("span", {
                                            className: "text-xl",
                                            children: b.emoji,
                                          }),
                                          i.jsx("span", {
                                            style: { color: b.color },
                                            className: "text-lg font-bold",
                                            children: b.label,
                                          }),
                                        ],
                                      }),
                                      i.jsx("p", {
                                        className: "text-sm text-gray-500",
                                        children: b.desc,
                                      }),
                                      v &&
                                        i.jsx("p", {
                                          className:
                                            "mt-1 text-xs text-gray-400",
                                          children: e.inicio.updatedAt.replace(
                                            "{{date}}",
                                            Hh(v)
                                          ),
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              f === "ready" &&
                                p !== null &&
                                i.jsxs("div", {
                                  children: [
                                    i.jsx("div", {
                                      className: "relative h-2.5 rounded-full",
                                      style: {
                                        background:
                                          "linear-gradient(to right, #fac9c3 0%, #ffd79d 40%, #95c9a8 70%, #1a7f4f 100%)",
                                      },
                                      children: i.jsx("div", {
                                        className:
                                          "absolute top-[-3px] h-4 w-4 rounded-full border-2 bg-white shadow",
                                        style: {
                                          left: `calc(${p}% - 8px)`,
                                          borderColor: b.color,
                                        },
                                      }),
                                    }),
                                    i.jsxs("div", {
                                      className:
                                        "mt-1 flex justify-between text-xs text-gray-400",
                                      children: [
                                        i.jsx("span", {
                                          children: e.inicio.scoreLow,
                                        }),
                                        i.jsx("span", {
                                          children: e.inicio.scoreMid,
                                        }),
                                        i.jsx("span", {
                                          children: e.inicio.scoreHigh,
                                        }),
                                      ],
                                    }),
                                  ],
                                }),
                              i.jsxs("div", {
                                className: "flex flex-wrap gap-3 pt-2",
                                children: [
                                  i.jsx("button", {
                                    onClick: () => Jc("trust-center"),
                                    className:
                                      "rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800",
                                    children: e.inicio.manageReputation,
                                  }),
                                  i.jsx("button", {
                                    onClick: () => Jc("seguridad"),
                                    className:
                                      "rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100",
                                    children: e.inicio.viewActivity,
                                  }),
                                ],
                              }),
                            ],
                          }),
                    }),
                  ],
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: i.jsx("h2", {
                        className: "font-semibold text-gray-900",
                        children: e.inicio.securitySection,
                      }),
                    }),
                    i.jsx("div", {
                      className: "p-6",
                      children:
                        n || l
                          ? i.jsx("div", {
                              className:
                                "h-16 animate-pulse rounded-lg bg-gray-100",
                            })
                          : x
                            ? i.jsxs("div", {
                                className: "flex items-center gap-4",
                                children: [
                                  i.jsxs("svg", {
                                    width: "52",
                                    height: "60",
                                    viewBox: "0 0 52 60",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: [
                                      i.jsx("path", {
                                        d: "M26 2L4 11v16c0 14.4 9.4 27.8 22 31.6C38.6 54.8 48 41.4 48 27V11L26 2z",
                                        fill: "#e3f5ec",
                                        stroke: "#1a7f4f",
                                        strokeWidth: "2.5",
                                        strokeLinejoin: "round",
                                      }),
                                      i.jsx("path", {
                                        d: "M16 30l7 7 13-14",
                                        stroke: "#1a7f4f",
                                        strokeWidth: "3",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                      }),
                                    ],
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("span", {
                                        className:
                                          "inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 mb-1",
                                        children: e.inicio.securityProtected,
                                      }),
                                      i.jsx("p", {
                                        className: "text-sm text-gray-500",
                                        children:
                                          e.inicio.securityProtectedDesc,
                                      }),
                                      x.activeKid &&
                                        i.jsxs("p", {
                                          className:
                                            "mt-1 text-xs text-gray-400",
                                          children: [
                                            e.inicio.securityActiveKey.replace(
                                              "{{kid}}",
                                              x.activeKid
                                            ),
                                            (x.retiredGraceKids?.length ?? 0) >
                                              0 &&
                                              ` · ${e.inicio.securityGraceKeys.replace("{{count}}", String(x.retiredGraceKids.length))}`,
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              })
                            : i.jsxs("div", {
                                className: "flex items-center gap-4",
                                children: [
                                  i.jsxs("svg", {
                                    width: "52",
                                    height: "60",
                                    viewBox: "0 0 52 60",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: [
                                      i.jsx("path", {
                                        d: "M26 2L4 11v16c0 14.4 9.4 27.8 22 31.6C38.6 54.8 48 41.4 48 27V11L26 2z",
                                        fill: "#fff8ec",
                                        stroke: "#b27400",
                                        strokeWidth: "2.5",
                                        strokeLinejoin: "round",
                                      }),
                                      i.jsx("path", {
                                        d: "M26 20v12M26 36v2",
                                        stroke: "#b27400",
                                        strokeWidth: "3",
                                        strokeLinecap: "round",
                                      }),
                                    ],
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("span", {
                                        className:
                                          "inline-block rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700 mb-1",
                                        children: e.inicio.securityNotActive,
                                      }),
                                      i.jsx("p", {
                                        className: "text-sm text-gray-500",
                                        children:
                                          e.inicio.securityNotActiveDesc,
                                      }),
                                      i.jsx("button", {
                                        onClick: () => u.mutate(),
                                        disabled: u.isPending,
                                        className:
                                          "mt-2 rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800 disabled:opacity-60",
                                        children: u.isPending
                                          ? e.common.loading
                                          : e.inicio.securityActivate,
                                      }),
                                      u.isError &&
                                        i.jsx("p", {
                                          className:
                                            "mt-2 text-xs text-red-600",
                                          role: "alert",
                                          children:
                                            u.error instanceof Error
                                              ? u.error.message
                                              : e.common.errorUnknown,
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                    }),
                  ],
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: i.jsx("h2", {
                        className: "font-semibold text-gray-900",
                        children: e.inicio.salesSection,
                      }),
                    }),
                    i.jsxs("div", {
                      className: "p-6",
                      children: [
                        n
                          ? i.jsx("div", {
                              className:
                                "h-24 animate-pulse rounded-lg bg-gray-100",
                            })
                          : m.length === 0
                            ? i.jsxs("div", {
                                className: "flex items-center gap-4",
                                children: [
                                  i.jsx("div", {
                                    className:
                                      "flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-2xl text-gray-400",
                                    children: "$",
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("p", {
                                        className:
                                          "font-semibold text-gray-800",
                                        children: e.inicio.salesEmpty,
                                      }),
                                      i.jsx("p", {
                                        className: "text-sm text-gray-500",
                                        children: e.inicio.salesEmptyDesc,
                                      }),
                                    ],
                                  }),
                                ],
                              })
                            : i.jsx("div", {
                                className: "overflow-x-auto",
                                children: i.jsxs("table", {
                                  className: "min-w-full text-sm",
                                  "aria-label": e.inicio.salesTableLabel,
                                  children: [
                                    i.jsx("thead", {
                                      children: i.jsxs("tr", {
                                        className:
                                          "border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                                        children: [
                                          i.jsx("th", {
                                            className: "px-4 py-3",
                                            children: e.inicio.salesColNumber,
                                          }),
                                          i.jsx("th", {
                                            className: "px-4 py-3",
                                            children: e.inicio.salesColType,
                                          }),
                                          i.jsx("th", {
                                            className: "px-4 py-3",
                                            children: e.inicio.salesColBuyer,
                                          }),
                                          i.jsx("th", {
                                            className: "px-4 py-3",
                                            children: e.inicio.salesColDate,
                                          }),
                                        ],
                                      }),
                                    }),
                                    i.jsx("tbody", {
                                      className: "divide-y divide-gray-100",
                                      children: m.map((C) =>
                                        i.jsxs(
                                          "tr",
                                          {
                                            className: "hover:bg-gray-50",
                                            children: [
                                              i.jsxs("td", {
                                                className:
                                                  "px-4 py-3 font-mono text-xs text-gray-400",
                                                children: [
                                                  "#",
                                                  C.id.slice(0, 8),
                                                ],
                                              }),
                                              i.jsx("td", {
                                                className: "px-4 py-3",
                                                children: i.jsx("span", {
                                                  className:
                                                    "rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700",
                                                  children:
                                                    t[C.bucket] ?? C.bucket,
                                                }),
                                              }),
                                              i.jsxs("td", {
                                                className:
                                                  "px-4 py-3 font-mono text-xs text-gray-400",
                                                children: [
                                                  "#",
                                                  C.agentId.slice(0, 12),
                                                ],
                                              }),
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-gray-500",
                                                children: Hh(C.createdAt),
                                              }),
                                            ],
                                          },
                                          C.id
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                        i.jsx("div", {
                          className: "mt-4",
                          children: i.jsx("button", {
                            onClick: () => Jc("mis-ventas"),
                            className:
                              "rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-800 hover:bg-gray-100",
                            children: e.inicio.viewAllOrders,
                          }),
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    sx = j({
      id: k(),
      name: k(),
      category: k(),
      maturity: oe(["GA", "COMING_SOON"]),
      status: k(),
      enabled: Oe(),
      connectFlow: k(),
      description: k(),
      lastHealthAt: k().nullable(),
      lastError: k().nullable(),
    }),
    ix = j({ items: Z(sx) }),
    Qh = yh(),
    ox = {
      CONECTADO: "bg-green-100 text-green-700",
      PENDIENTE: "bg-yellow-100 text-yellow-700",
      ERROR: "bg-red-100 text-red-700",
      DESACTIVADO: "bg-gray-100 text-gray-500",
      DISPONIBLE: "bg-gray-100 text-gray-500",
    },
    lx = () => {
      const [e, t] = N.useState([]),
        r = N.useRef(0),
        n = N.useCallback((s, o) => {
          const l = ++r.current;
          (t((c) => [...c, { id: l, message: s, type: o }]),
            setTimeout(() => t((c) => c.filter((u) => u.id !== l)), 5e3));
        }, []),
        a = N.useCallback((s) => t((o) => o.filter((l) => l.id !== s)), []);
      return { toasts: e, add: n, remove: a };
    },
    Zh = ({ methodId: e, connectFlow: t, onDone: r, onError: n, t: a }) => {
      const [s, o] = N.useState(""),
        l = er(),
        c = xt({
          mutationFn: () => {
            const u =
              t === "apiKey"
                ? { flow: "apiKey", apiKey: s }
                : { flow: "wallet", walletAddress: s };
            return ne.post(
              `/v1/embed/merchant/payment-methods/${encodeURIComponent(e)}/connect`,
              u,
              Qh
            );
          },
          onSuccess: () => {
            (o(""), l.invalidateQueries({ queryKey: ["pm-catalog"] }), r());
          },
          onError: (u) => {
            n(u instanceof Error ? u.message : a.common.error);
          },
        });
      return i.jsxs("form", {
        onSubmit: (u) => {
          (u.preventDefault(), s.trim() && c.mutate());
        },
        className: "mt-3 flex gap-2",
        children: [
          i.jsx("input", {
            type: t === "apiKey" ? "password" : "text",
            value: s,
            onChange: (u) => o(u.target.value),
            placeholder:
              t === "apiKey"
                ? a.merchantPaymentMethods.connectApiKey
                : a.merchantPaymentMethods.connectWallet,
            required: !0,
            className:
              "min-w-0 flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            "aria-label":
              t === "apiKey"
                ? a.merchantPaymentMethods.connectApiKey
                : a.merchantPaymentMethods.connectWallet,
          }),
          i.jsx("button", {
            type: "submit",
            disabled: c.isPending || !s.trim(),
            className:
              "shrink-0 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60",
            children: c.isPending
              ? a.merchantPaymentMethods.connecting
              : a.merchantPaymentMethods.connectBtn,
          }),
        ],
      });
    },
    cx = ({ method: e, onSuccess: t, onError: r, t: n }) => {
      const a = er(),
        s = (p) => ({
          mutationFn: () =>
            ne.post(
              `/v1/embed/merchant/payment-methods/${encodeURIComponent(e.id)}/${p}`,
              {},
              Qh
            ),
          onSuccess: () => {
            a.invalidateQueries({ queryKey: ["pm-catalog"] });
            const f = {
              disconnect: n.merchantPaymentMethods.actionDisconnected,
              enable: n.merchantPaymentMethods.actionEnabled,
              disable: n.merchantPaymentMethods.actionDisabled,
            };
            t(f[p] ?? n.merchantPaymentMethods.actionConnected);
          },
          onError: (f) => {
            r(
              f instanceof Error
                ? f.message
                : n.merchantPaymentMethods.actionError
            );
          },
        }),
        o = xt(s("disconnect")),
        l = xt(s("enable")),
        c = xt(s("disable")),
        u = o.isPending || l.isPending || c.isPending;
      return e.status === "DISPONIBLE"
        ? i.jsx(Zh, {
            methodId: e.id,
            connectFlow: e.connectFlow,
            onDone: () => t(n.merchantPaymentMethods.actionConnected),
            onError: r,
            t: n,
          })
        : e.status === "ERROR"
          ? i.jsxs(i.Fragment, {
              children: [
                e.lastError &&
                  i.jsx("p", {
                    className: "mt-2 text-xs text-red-600",
                    children: e.lastError,
                  }),
                i.jsx(Zh, {
                  methodId: e.id,
                  connectFlow: e.connectFlow,
                  onDone: () => t(n.merchantPaymentMethods.actionReconnected),
                  onError: r,
                  t: n,
                }),
              ],
            })
          : i.jsxs("div", {
              className: "mt-3 flex flex-wrap gap-2",
              children: [
                e.status === "DESACTIVADO" &&
                  i.jsx("button", {
                    onClick: () => l.mutate(),
                    disabled: u,
                    className:
                      "rounded border border-green-300 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-50 disabled:opacity-60",
                    children: n.merchantPaymentMethods.enableBtn,
                  }),
                e.status === "CONECTADO" &&
                  i.jsx("button", {
                    onClick: () => c.mutate(),
                    disabled: u,
                    className:
                      "rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-60",
                    children: n.merchantPaymentMethods.disableBtn,
                  }),
                i.jsx("button", {
                  onClick: () => o.mutate(),
                  disabled: u,
                  className:
                    "rounded border border-red-300 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50 disabled:opacity-60",
                  children: n.merchantPaymentMethods.disconnectBtn,
                }),
              ],
            });
    },
    ux = ({ method: e, onSuccess: t, onError: r, t: n }) => {
      const a = {
          CONECTADO: n.merchantPaymentMethods.statusConnected,
          PENDIENTE: n.merchantPaymentMethods.statusVerifying,
          ERROR: n.merchantPaymentMethods.statusError,
          DESACTIVADO: n.merchantPaymentMethods.statusDisabled,
          DISPONIBLE: n.merchantPaymentMethods.statusAvailable,
        },
        s = ox[e.status] ?? "bg-gray-100 text-gray-500",
        o = a[e.status] ?? e.status;
      return i.jsxs("div", {
        className: "rounded-lg border border-gray-200 bg-white p-4 shadow-sm",
        children: [
          i.jsxs("div", {
            className: "flex items-start justify-between gap-2",
            children: [
              i.jsxs("div", {
                className: "min-w-0",
                children: [
                  i.jsx("p", {
                    className: "truncate font-medium text-gray-900",
                    children: e.name,
                  }),
                  i.jsx("p", {
                    className: "mt-0.5 text-xs text-gray-400",
                    children:
                      n.merchantPaymentMethods.methodDescriptions[e.id] ??
                      e.description,
                  }),
                  e.lastHealthAt &&
                    i.jsx("p", {
                      className: "mt-1 text-xs text-gray-400",
                      children: n.merchantPaymentMethods.verifiedAt.replace(
                        "{{date}}",
                        new Intl.DateTimeFormat("es-ES", {
                          dateStyle: "short",
                          timeStyle: "short",
                          timeZone: "UTC",
                        }).format(new Date(e.lastHealthAt))
                      ),
                    }),
                ],
              }),
              i.jsx("span", {
                className: `shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${s}`,
                children: o,
              }),
            ],
          }),
          i.jsx(cx, { method: e, onSuccess: t, onError: r, t: n }),
        ],
      });
    },
    dx = () =>
      i.jsx("div", { className: "h-28 animate-pulse rounded-lg bg-gray-100" }),
    Gh = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              { toasts: t, add: r, remove: n } = lx(),
              {
                data: a,
                isLoading: s,
                isError: o,
                error: l,
              } = ye({
                queryKey: ["pm-catalog"],
                queryFn: () =>
                  ne.get("/v1/embed/merchant/payment-methods/catalog", ix),
              }),
              c = (a?.items ?? []).filter((p) => p.maturity === "GA"),
              u = (a?.items ?? []).filter((p) => p.maturity === "COMING_SOON");
            return i.jsxs("div", {
              className: "p-6 max-w-3xl",
              children: [
                i.jsx("div", {
                  className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
                  children: t.map((p) =>
                    i.jsxs(
                      "div",
                      {
                        role: "status",
                        "aria-live": "polite",
                        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${p.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: [
                          i.jsx("span", { children: p.message }),
                          i.jsx("button", {
                            onClick: () => n(p.id),
                            className: "ml-4 opacity-80 hover:opacity-100",
                            "aria-label": e.merchantPaymentMethods.closeBtn,
                            children: "✕",
                          }),
                        ],
                      },
                      p.id
                    )
                  ),
                }),
                i.jsx("p", {
                  className: "mb-5 text-sm text-gray-500",
                  children: e.merchantPaymentMethods.description,
                }),
                o &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.merchantPaymentMethods.errorLoading,
                      " ",
                      l instanceof Error ? l.message : e.common.errorUnknown,
                    ],
                  }),
                (s || c.length > 0) &&
                  i.jsxs("section", {
                    className: "mb-8",
                    children: [
                      i.jsx("h3", {
                        className:
                          "mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500",
                        children: e.merchantPaymentMethods.sectionAvailable,
                      }),
                      i.jsxs("div", {
                        className: "grid gap-4 sm:grid-cols-2",
                        children: [
                          s &&
                            Array.from({ length: 4 }).map((p, f) =>
                              i.jsx(dx, {}, f)
                            ),
                          !s &&
                            c.map((p) =>
                              i.jsx(
                                ux,
                                {
                                  method: p,
                                  onSuccess: (f) => r(f, "success"),
                                  onError: (f) => r(f, "error"),
                                  t: e,
                                },
                                p.id
                              )
                            ),
                        ],
                      }),
                    ],
                  }),
                !s &&
                  u.length > 0 &&
                  i.jsxs("section", {
                    children: [
                      i.jsx("h3", {
                        className:
                          "mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500",
                        children: e.merchantPaymentMethods.sectionComingSoon,
                      }),
                      i.jsx("div", {
                        className: "grid gap-4 sm:grid-cols-2",
                        children: u.map((p) =>
                          i.jsxs(
                            "div",
                            {
                              className:
                                "rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 opacity-70",
                              children: [
                                i.jsx("p", {
                                  className: "font-medium text-gray-700",
                                  children: p.name,
                                }),
                                i.jsx("p", {
                                  className: "mt-0.5 text-xs text-gray-400",
                                  children:
                                    e.merchantPaymentMethods.methodDescriptions[
                                      p.id
                                    ] ?? p.description,
                                }),
                                i.jsx("p", {
                                  className: "mt-2 text-xs text-gray-400",
                                  children:
                                    e.merchantPaymentMethods.comingSoonLabel,
                                }),
                              ],
                            },
                            p.id
                          )
                        ),
                      }),
                    ],
                  }),
                !s &&
                  c.length === 0 &&
                  u.length === 0 &&
                  !o &&
                  i.jsx("p", {
                    className: "text-sm text-gray-500",
                    children: e.merchantPaymentMethods.noMethods,
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    px = j({
      fallbackMode: oe(["strict", "balanced", "permissive"]).default(
        "balanced"
      ),
    }),
    mx = () =>
      i.jsx("div", {
        className: "space-y-3",
        children: Array.from({ length: 3 }).map((e, t) =>
          i.jsx(
            "div",
            { className: "h-12 animate-pulse rounded-lg bg-gray-100" },
            t
          )
        ),
      }),
    hx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = er(),
              [r, n] = N.useState(null),
              [a, s] = N.useState(null),
              o = [
                {
                  value: "balanced",
                  label: e.settings.optionBalanced,
                  hint: e.settings.optionBalancedHint,
                },
                {
                  value: "strict",
                  label: e.settings.optionStrict,
                  hint: e.settings.optionStrictHint,
                },
                {
                  value: "permissive",
                  label: e.settings.optionPermissive,
                  hint: e.settings.optionPermissiveHint,
                },
              ],
              l = {
                "stripe-connect": e.settings.railStripe,
                x402: e.settings.railX402,
                acp: e.settings.railAcp,
                paypal: e.settings.railPaypal,
                eidas: e.settings.railEidas,
              },
              c = ye({
                queryKey: ["merchant-checkout-config"],
                queryFn: () => ne.get("/v1/embed/merchant/checkout/config", Dh),
              }),
              u = ye({
                queryKey: ["merchant-config"],
                queryFn: () => ne.get("/v1/embed/merchant/config", px),
              }),
              [p, f] = N.useState(null),
              m = p ?? u.data?.fallbackMode ?? "balanced",
              x = o.find((d) => d.value === m)?.hint ?? "",
              v = xt({
                mutationFn: (d) =>
                  ne.put(
                    "/v1/embed/merchant/config",
                    { fallbackMode: d },
                    gs()
                  ),
                onMutate: (d) => {
                  (f(d), n(null), s(null));
                },
                onSuccess: () => {
                  (n(e.settings.configSaved),
                    t.invalidateQueries({ queryKey: ["merchant-config"] }),
                    setTimeout(() => n(null), 4e3));
                },
                onError: (d) => {
                  (s(
                    `${e.settings.errorSavingConfig} ${d instanceof Error ? d.message : e.common.errorUnknown}`
                  ),
                    f(null));
                },
              }),
              b = c.data,
              C = new Set(
                (b?.rules ?? []).filter((d) => d.enabled).map((d) => d.rail)
              ),
              g =
                (b?.railsPriority?.length ?? 0) > 0
                  ? (b?.railsPriority ?? [])
                  : (b?.rules ?? []).map((d) => d.rail);
            return i.jsxs("div", {
              className: "max-w-3xl space-y-6 p-6",
              children: [
                i.jsx("h1", {
                  className: "text-xl font-semibold text-gray-900",
                  children: e.settings.title,
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsxs("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: [
                        i.jsx("h2", {
                          className: "font-semibold text-gray-900",
                          children: e.settings.failureModeSection,
                        }),
                        i.jsx("p", {
                          className: "mt-1 text-sm text-gray-500",
                          children: e.settings.failureModeSectionDesc,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "space-y-3 p-6",
                      children: [
                        r &&
                          i.jsx("div", {
                            className:
                              "rounded border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-800",
                            children: r,
                          }),
                        a &&
                          i.jsx("div", {
                            className:
                              "rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                            role: "alert",
                            children: a,
                          }),
                        u.isLoading
                          ? i.jsx("div", {
                              className:
                                "h-10 animate-pulse rounded bg-gray-100",
                            })
                          : i.jsxs("div", {
                              className: "space-y-2",
                              children: [
                                i.jsx("select", {
                                  value: m,
                                  disabled: v.isPending,
                                  onChange: (d) => v.mutate(d.target.value),
                                  className:
                                    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60",
                                  children: o.map((d) =>
                                    i.jsx(
                                      "option",
                                      { value: d.value, children: d.label },
                                      d.value
                                    )
                                  ),
                                }),
                                x &&
                                  i.jsx("p", {
                                    className: "text-xs text-gray-500",
                                    children: x,
                                  }),
                              ],
                            }),
                      ],
                    }),
                  ],
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: i.jsx("h2", {
                        className: "font-semibold text-gray-900",
                        children: e.settings.paymentSection,
                      }),
                    }),
                    i.jsxs("div", {
                      className: "p-6",
                      children: [
                        i.jsx("div", {
                          className:
                            "mb-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                          children: e.settings.paymentSectionNotice,
                        }),
                        c.isError &&
                          i.jsxs("div", {
                            className:
                              "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                            role: "alert",
                            children: [
                              e.settings.paymentErrorLoading,
                              " ",
                              c.error instanceof Error
                                ? c.error.message
                                : e.common.errorUnknown,
                            ],
                          }),
                        c.isLoading
                          ? i.jsx(mx, {})
                          : g.length === 0
                            ? i.jsx("div", {
                                className:
                                  "rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                                children: e.settings.paymentNoRails,
                              })
                            : i.jsxs("div", {
                                className: "space-y-2",
                                children: [
                                  i.jsx("p", {
                                    className:
                                      "mb-3 text-sm font-semibold text-gray-800",
                                    children: e.settings.paymentOrder,
                                  }),
                                  g.map((d, y) => {
                                    const w = b?.rules.find(
                                        (A) => A.rail === d
                                      ),
                                      _ = C.has(d);
                                    return i.jsxs(
                                      "div",
                                      {
                                        className:
                                          "flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm",
                                        children: [
                                          i.jsx("span", {
                                            className:
                                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500",
                                            children: y + 1,
                                          }),
                                          i.jsxs("div", {
                                            className: "flex-1",
                                            children: [
                                              i.jsx("p", {
                                                className:
                                                  "text-sm font-medium text-gray-800",
                                                children: l[d] ?? d,
                                              }),
                                              i.jsxs("p", {
                                                className:
                                                  "text-xs text-gray-400",
                                                children: [
                                                  _
                                                    ? e.settings
                                                        .paymentRailEnabled
                                                    : e.settings
                                                        .paymentRailDisabled,
                                                  w?.minAmount != null &&
                                                    ` · ${e.settings.paymentRailMin.replace("{{amount}}", String(w.minAmount))}`,
                                                  w?.maxAmount != null &&
                                                    ` · ${e.settings.paymentRailMax.replace("{{amount}}", String(w.maxAmount))}`,
                                                  (w?.currencyAllowlist
                                                    ?.length ?? 0) > 0 &&
                                                    ` · ${e.settings.paymentRailCurrencies.replace("{{currencies}}", w.currencyAllowlist.join(", "))}`,
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      },
                                      d
                                    );
                                  }),
                                  i.jsx("p", {
                                    className: "mt-2 text-xs text-gray-400",
                                    children: e.settings.paymentChangeNote,
                                  }),
                                ],
                              }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    fx = j({
      id_shop: z().int().positive(),
      allowed_shops: Z(z().int().positive()),
      all_shops: Oe(),
    }),
    gx = () => ne.get("/v1/embed/merchant/shops", fx),
    yx = ({ onShopChange: e }) => {
      const t = xe(),
        {
          data: r,
          isLoading: n,
          isError: a,
        } = ye({
          queryKey: ["embed-merchant-shops"],
          queryFn: gx,
          staleTime: 300 * 1e3,
        });
      if (n)
        return i.jsx("div", {
          className: "h-8 w-36 animate-pulse rounded bg-gray-100",
        });
      if (a || !r || (!r.all_shops && r.allowed_shops.length <= 1)) return null;
      const s = r.all_shops
        ? [
            {
              id: r.id_shop,
              label: t.shopSwitcher.shopLabel.replace(
                "{{id}}",
                String(r.id_shop)
              ),
            },
          ]
        : r.allowed_shops.map((o) => ({
            id: o,
            label: t.shopSwitcher.shopLabel.replace("{{id}}", String(o)),
          }));
      return i.jsxs("div", {
        className: "flex items-center gap-2",
        children: [
          r.all_shops &&
            i.jsx("span", {
              className:
                "rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700",
              title: t.shopSwitcher.superAdminTitle,
              children: t.shopSwitcher.superAdmin,
            }),
          i.jsx("label", {
            htmlFor: "shop-switcher",
            className: "sr-only",
            children: t.shopSwitcher.changeSrOnly,
          }),
          i.jsx("select", {
            id: "shop-switcher",
            value: r.id_shop,
            onChange: (o) => e?.(Number(o.target.value)),
            className:
              "rounded border border-gray-300 bg-white px-2 py-1 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
            children: s.map((o) =>
              i.jsx("option", { value: o.id, children: o.label }, o.id)
            ),
          }),
        ],
      });
    },
    vx = ce.lazy(() => we(() => Promise.resolve().then(() => Ob), void 0)),
    xx = ce.lazy(() => we(() => Promise.resolve().then(() => Gh), void 0)),
    bx = ce.lazy(() => we(() => Promise.resolve().then(() => sf), void 0)),
    wx = ce.lazy(() => we(() => Promise.resolve().then(() => Db), void 0)),
    kx = ce.lazy(() => we(() => Promise.resolve().then(() => Ub), void 0)),
    Sx = {
      "#orders": "orders",
      "#payments": "payments",
      "#agents": "agents",
      "#checkout": "checkout",
      "#cert-nlweb": "cert-nlweb",
    },
    Cx = {
      orders: "#orders",
      payments: "#payments",
      agents: "#agents",
      checkout: "#checkout",
      "cert-nlweb": "#cert-nlweb",
    },
    Yh = (e) => Sx[e] ?? "orders",
    _x = ({ active: e, onChange: t, tabs: r, ariaLabel: n }) =>
      i.jsx("nav", {
        className: "flex flex-wrap border-b border-gray-200",
        role: "tablist",
        "aria-label": n,
        children: r.map((a) =>
          i.jsx(
            "button",
            {
              role: "tab",
              "aria-selected": e === a.id,
              onClick: () => t(a.id),
              className: `px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${e === a.id ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: a.label,
            },
            a.id
          )
        ),
      }),
    Rx = ({ loading: e }) =>
      i.jsx("div", { className: "p-6 text-sm text-gray-500", children: e }),
    jx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(Yh(window.location.hash)),
              [n, a] = N.useState(void 0),
              s = [
                { id: "orders", label: e.merchantCenter.tabOrders },
                { id: "payments", label: e.merchantCenter.tabPayments },
                { id: "agents", label: e.merchantCenter.tabAgents },
                { id: "checkout", label: e.merchantCenter.tabCheckout },
                { id: "cert-nlweb", label: e.merchantCenter.tabCertNlweb },
              ];
            N.useEffect(() => {
              const c = () => {
                r(Yh(window.location.hash));
              };
              return (
                window.addEventListener("hashchange", c),
                () => window.removeEventListener("hashchange", c)
              );
            }, []);
            const o = N.useCallback((c) => {
                (r(c), window.history.replaceState(null, "", Cx[c]));
              }, []),
              l = N.useCallback((c) => {
                a(c);
              }, []);
            return i.jsxs("div", {
              className: "max-w-5xl",
              children: [
                i.jsxs("div", {
                  className: "mb-2 flex items-center justify-between",
                  children: [
                    i.jsx("h1", {
                      className: "text-lg font-semibold text-gray-900",
                      children: e.merchantCenter.title,
                    }),
                    i.jsx(yx, { onShopChange: l }),
                  ],
                }),
                n !== void 0 &&
                  i.jsx("div", {
                    className:
                      "mb-2 rounded bg-blue-50 px-3 py-1.5 text-xs text-blue-700",
                    children: e.merchantCenter.showingStore.replace(
                      "{{id}}",
                      String(n)
                    ),
                  }),
                i.jsx(_x, {
                  active: t,
                  onChange: o,
                  tabs: s,
                  ariaLabel: e.merchantCenter.tabsAriaLabel,
                }),
                i.jsxs(N.Suspense, {
                  fallback: i.jsx(Rx, { loading: e.merchantCenter.loading }),
                  children: [
                    t === "orders" && i.jsx(vx, {}),
                    t === "payments" && i.jsx(xx, {}),
                    t === "agents" && i.jsx(bx, {}),
                    t === "checkout" && i.jsx(wx, {}),
                    t === "cert-nlweb" && i.jsx(kx, {}),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    Nx = ce.lazy(() => we(() => Promise.resolve().then(() => Qb), void 0)),
    Ax = ce.lazy(() => we(() => Promise.resolve().then(() => rw), void 0)),
    Ex = ce.lazy(() => we(() => Promise.resolve().then(() => iw), void 0)),
    Tx = ce.lazy(() => we(() => Promise.resolve().then(() => gw), void 0)),
    Px = { "#ventas-ia": "receipts", "#claves": "keys", "#auditoria": "audit" },
    Ox = {
      orders: "",
      receipts: "#ventas-ia",
      keys: "#claves",
      audit: "#auditoria",
    },
    Xh = (e) => Px[e] ?? "orders",
    Lx = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    Dx = (e) => {
      try {
        return Lx.format(new Date(e));
      } catch {
        return e;
      }
    },
    Ix = {
      SHOPIFY: "bg-blue-100 text-blue-700",
      WOO: "bg-orange-100 text-orange-700",
      ACP: "bg-purple-100 text-purple-700",
    },
    Mx = {
      paid: "bg-green-100 text-green-700",
      fulfilled: "bg-teal-100 text-teal-700",
      cancelled: "bg-red-100 text-red-700",
      created: "bg-gray-100 text-gray-600",
      updated: "bg-gray-100 text-gray-600",
      refunded: "bg-yellow-100 text-yellow-700",
    },
    Jh = ({ label: e, classes: t }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t}`,
        children: e,
      }),
    Fx = ({ cols: e }) =>
      i.jsx("tr", {
        children: Array.from({ length: e }).map((t, r) =>
          i.jsx(
            "td",
            {
              className: "px-4 py-3",
              children: i.jsx("div", {
                className: "h-4 animate-pulse rounded bg-gray-100",
              }),
            },
            r
          )
        ),
      }),
    zx = ({ active: e, onChange: t, tabs: r, ariaLabel: n }) =>
      i.jsx("nav", {
        className: "flex border-b border-gray-200",
        role: "tablist",
        "aria-label": n,
        children: r.map((a) =>
          i.jsx(
            "button",
            {
              role: "tab",
              "aria-selected": e === a.id,
              onClick: () => t(a.id),
              className: `px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${e === a.id ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: a.label,
            },
            a.id
          )
        ),
      }),
    qx = (e) => {
      const t = new URLSearchParams({ limit: "25" });
      return (
        e !== null && t.set("cursor", e),
        `/v1/embed/merchant/orders?${t.toString()}`
      );
    },
    Bx = () => {
      const e = xe(),
        [t, r] = N.useState(null),
        [n, a] = N.useState([]),
        s = {
          SHOPIFY: e.misVentas.platformShopify,
          WOO: e.misVentas.platformWoo,
          ACP: e.misVentas.platformAcp,
        },
        o = {
          created: e.misVentas.statusCreated,
          updated: e.misVentas.statusUpdated,
          paid: e.misVentas.statusPaid,
          fulfilled: e.misVentas.statusFulfilled,
          cancelled: e.misVentas.statusCancelled,
          refunded: e.misVentas.statusRefunded,
        },
        l = qx(t),
        c = ye({
          queryKey: ["mis-ventas-orders", t],
          queryFn: () => ne.get(l, Ph),
          placeholderData: (p) => p,
        });
      ce.useEffect(() => {
        c.data?.items &&
          a(
            t === null
              ? c.data.items
              : (p) => {
                  const f = new Set(p.map((m) => m.id));
                  return [
                    ...p,
                    ...(c.data?.items ?? []).filter((m) => !f.has(m.id)),
                  ];
                }
          );
      }, [c.data, t]);
      const u = n.length > 0 ? n : (c.data?.items ?? []);
      return i.jsxs("div", {
        className: "p-6",
        children: [
          i.jsx("p", {
            className: "mb-4 text-sm text-gray-500",
            children: e.misVentas.ordersSectionDesc,
          }),
          c.isError &&
            i.jsxs("div", {
              className:
                "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
              role: "alert",
              children: [
                e.misVentas.ordersErrorLoading,
                " ",
                c.error instanceof Error
                  ? c.error.message
                  : e.common.errorUnknown,
              ],
            }),
          !c.isError && u.length === 0 && !c.isLoading
            ? i.jsx("div", {
                className: "flex items-center gap-4",
                children: i.jsxs("div", {
                  children: [
                    i.jsx("p", {
                      className: "font-semibold text-gray-800",
                      children: e.misVentas.ordersEmpty,
                    }),
                    i.jsx("p", {
                      className: "text-sm text-gray-500",
                      children: e.misVentas.ordersEmptyDesc,
                    }),
                  ],
                }),
              })
            : i.jsx("div", {
                className: "overflow-x-auto",
                children: i.jsxs("table", {
                  className: "min-w-full text-sm",
                  "aria-label": e.misVentas.ordersTableLabel,
                  children: [
                    i.jsx("thead", {
                      children: i.jsxs("tr", {
                        className:
                          "border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                        children: [
                          i.jsx("th", {
                            className: "px-4 py-3",
                            children: e.misVentas.colOrderNumber,
                          }),
                          i.jsx("th", {
                            className: "px-4 py-3",
                            children: e.misVentas.colStore,
                          }),
                          i.jsx("th", {
                            className: "px-4 py-3",
                            children: e.misVentas.colStatus,
                          }),
                          i.jsx("th", {
                            className: "px-4 py-3",
                            children: e.misVentas.colTotal,
                          }),
                          i.jsx("th", {
                            className: "px-4 py-3",
                            children: e.misVentas.colBuyer,
                          }),
                          i.jsx("th", {
                            className: "px-4 py-3",
                            children: e.misVentas.colDate,
                          }),
                        ],
                      }),
                    }),
                    i.jsxs("tbody", {
                      className: "divide-y divide-gray-100",
                      children: [
                        c.isLoading &&
                          Array.from({ length: 5 }).map((p, f) =>
                            i.jsx(Fx, { cols: 6 }, f)
                          ),
                        u.map((p) =>
                          i.jsxs(
                            "tr",
                            {
                              className: "hover:bg-gray-50",
                              children: [
                                i.jsxs("td", {
                                  className:
                                    "px-4 py-3 font-mono text-xs text-gray-400",
                                  children: ["#", p.externalOrderId],
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3",
                                  children: i.jsx(Jh, {
                                    label: s[p.platform] ?? p.platform,
                                    classes:
                                      Ix[p.platform] ??
                                      "bg-gray-100 text-gray-600",
                                  }),
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3",
                                  children: i.jsx(Jh, {
                                    label: o[p.status] ?? p.status,
                                    classes:
                                      Mx[p.status] ??
                                      "bg-gray-100 text-gray-600",
                                  }),
                                }),
                                i.jsxs("td", {
                                  className:
                                    "px-4 py-3 font-semibold text-gray-800",
                                  children: [
                                    p.total.amount,
                                    " ",
                                    p.total.currency,
                                  ],
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3 text-xs text-gray-400",
                                  children: p.agentId
                                    ? e.misVentas.buyerAuto.replace(
                                        "{{id}}",
                                        p.agentId.slice(0, 8)
                                      )
                                    : e.misVentas.buyerHuman,
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3 text-gray-500",
                                  children: Dx(p.createdAt),
                                }),
                              ],
                            },
                            p.id
                          )
                        ),
                      ],
                    }),
                  ],
                }),
              }),
          c.data?.nextCursor &&
            i.jsx("div", {
              className: "mt-4 text-center",
              children: i.jsx("button", {
                onClick: () => r(c.data?.nextCursor ?? null),
                disabled: c.isFetching,
                className:
                  "text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50",
                children: c.isFetching
                  ? e.common.loadingMore
                  : e.misVentas.loadMoreOrders,
              }),
            }),
        ],
      });
    },
    Ux = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(Xh(window.location.hash)),
              [n, a] = N.useState(null),
              s = [
                { id: "orders", label: e.misVentas.tabOrders },
                { id: "receipts", label: e.misVentas.tabReceipts },
                { id: "keys", label: e.misVentas.tabKeys },
                { id: "audit", label: e.misVentas.tabAudit },
              ];
            N.useEffect(() => {
              const l = () => {
                r(Xh(window.location.hash));
              };
              return (
                window.addEventListener("hashchange", l),
                () => window.removeEventListener("hashchange", l)
              );
            }, []);
            const o = N.useCallback((l) => {
              r(l);
              const c = Ox[l];
              (window.history.replaceState(
                null,
                "",
                c === "" ? window.location.pathname : c
              ),
                a(null));
            }, []);
            return i.jsxs("div", {
              className: "max-w-5xl",
              children: [
                i.jsx("div", {
                  className: "mb-0 px-6 pt-6",
                  children: i.jsx("h1", {
                    className: "text-xl font-semibold text-gray-900",
                    children: e.misVentas.title,
                  }),
                }),
                i.jsx(zx, {
                  active: t,
                  onChange: o,
                  tabs: s,
                  ariaLabel: e.misVentas.tabsAriaLabel,
                }),
                i.jsxs(N.Suspense, {
                  fallback: i.jsx("div", {
                    className: "p-6 text-sm text-gray-500",
                    children: e.trustCenter.loading,
                  }),
                  children: [
                    t === "orders" && i.jsx(Bx, {}),
                    t === "receipts" && i.jsx(Nx, { onSelect: a }),
                    t === "keys" && i.jsx(Ex, {}),
                    t === "audit" && i.jsx(Tx, {}),
                  ],
                }),
                n !== null &&
                  i.jsx(N.Suspense, {
                    fallback: null,
                    children: i.jsx(Ax, { receipt: n, onClose: () => a(null) }),
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    $x = ({
      value: e,
      onChange: t,
      searchTaxonomy: r,
      disabled: n,
      debounceMs: a = 300,
      placeholder: s = "Search category…",
      removeLabel: o = "Remove {{name}}",
    }) => {
      const [l, c] = N.useState(""),
        [u, p] = N.useState([]),
        [f, m] = N.useState(!1),
        [x, v] = N.useState({}),
        b = N.useRef(null);
      N.useEffect(() => {
        b.current && clearTimeout(b.current);
        const d = l.trim();
        if (d === "") {
          p([]);
          return;
        }
        return (
          (b.current = setTimeout(() => {
            (m(!0),
              r(d)
                .then((y) => p(y))
                .catch(() => p([]))
                .finally(() => m(!1)));
          }, a)),
          () => {
            b.current && clearTimeout(b.current);
          }
        );
      }, [l, a, r]);
      const C = N.useCallback(
          (d) => {
            e.includes(d.id) ||
              (v((y) => ({ ...y, [d.id]: d.name })),
              t([...e, d.id]),
              c(""),
              p([]));
          },
          [e, t]
        ),
        g = N.useCallback((d) => t(e.filter((y) => y !== d)), [e, t]);
      return i.jsxs("div", {
        style: { display: "flex", flexDirection: "column", gap: 6 },
        children: [
          i.jsx("div", {
            style: { display: "flex", flexWrap: "wrap", gap: 6 },
            children: e.map((d) =>
              i.jsxs(
                "span",
                {
                  style: {
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                    padding: "2px 8px",
                    background: "#e6f0ff",
                    border: "1px solid #b3d1ff",
                    borderRadius: 12,
                    fontSize: 12,
                  },
                  children: [
                    x[d] ?? d,
                    i.jsx("button", {
                      type: "button",
                      "aria-label": o.replace("{{name}}", x[d] ?? d),
                      disabled: n,
                      onClick: () => g(d),
                      style: {
                        border: "none",
                        background: "transparent",
                        cursor: "pointer",
                        fontSize: 14,
                        lineHeight: 1,
                      },
                      children: "×",
                    }),
                  ],
                },
                d
              )
            ),
          }),
          i.jsx("input", {
            type: "text",
            role: "combobox",
            "aria-expanded": u.length > 0,
            "aria-label": s,
            value: l,
            disabled: n,
            placeholder: s,
            onChange: (d) => c(d.target.value),
            style: { width: 320 },
          }),
          f
            ? i.jsx("small", { style: { color: "#666" }, children: "…" })
            : null,
          u.length > 0
            ? i.jsx("ul", {
                role: "listbox",
                style: {
                  listStyle: "none",
                  margin: 0,
                  padding: 4,
                  border: "1px solid #c3c4c7",
                  borderRadius: 4,
                  maxWidth: 320,
                  maxHeight: 180,
                  overflowY: "auto",
                },
                children: u.map((d) =>
                  i.jsx(
                    "li",
                    {
                      children: i.jsx("button", {
                        type: "button",
                        role: "option",
                        "aria-selected": e.includes(d.id),
                        disabled: n,
                        onClick: () => C(d),
                        style: {
                          display: "block",
                          width: "100%",
                          textAlign: "left",
                          border: "none",
                          background: "transparent",
                          padding: "4px 6px",
                          cursor: "pointer",
                        },
                        children: d.name,
                      }),
                    },
                    d.id
                  )
                ),
              })
            : null,
        ],
      });
    };
  function Vx(e) {
    return e
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }
  function Kx(e) {
    return Array.isArray(e) ? e.map((t) => String(t)).join(", ") : "";
  }
  const Wx = ({
      ruleCode: e,
      value: t,
      onChange: r,
      disabled: n,
      error: a,
      meta: s,
      searchTaxonomy: o,
    }) => {
      const l = xe(),
        c = N.useCallback(
          (m, x) => {
            const v = { ...t };
            (x == null || x === "" ? delete v[m] : (v[m] = x), r(v));
          },
          [t, r]
        );
      if (!s || s.fields.length === 0) return null;
      const u = l.misReglas.params ?? {},
        p = (m) => u[m] ?? m,
        f = (m) => {
          const x = t[m.name],
            v = `amcp-param-${e}-${m.name}`;
          switch (m.type) {
            case "boolean":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", alignItems: "center", gap: 8 },
                  children: [
                    i.jsx("input", {
                      id: v,
                      type: "checkbox",
                      checked: x === !0,
                      disabled: n,
                      onChange: (b) => c(m.name, b.target.checked || void 0),
                    }),
                    i.jsx("span", { children: p(m.labelKey) }),
                  ],
                },
                m.name
              );
            case "number":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: p(m.labelKey) }),
                    i.jsx("input", {
                      id: v,
                      type: "number",
                      value: typeof x == "number" ? x : "",
                      disabled: n,
                      min: m.min,
                      max: m.max,
                      placeholder: m.placeholder,
                      onChange: (b) => {
                        const C = b.target.value;
                        if (C === "") return c(m.name, void 0);
                        const g = Number(C);
                        Number.isNaN(g) || c(m.name, g);
                      },
                      style: { width: 160 },
                    }),
                  ],
                },
                m.name
              );
            case "enum":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: p(m.labelKey) }),
                    i.jsxs("select", {
                      id: v,
                      value: typeof x == "string" ? x : "",
                      disabled: n,
                      onChange: (b) => c(m.name, b.target.value || void 0),
                      style: { width: 220 },
                      children: [
                        i.jsx("option", { value: "", children: "—" }),
                        m.options?.map((b) =>
                          i.jsx("option", { value: b, children: b }, b)
                        ),
                      ],
                    }),
                  ],
                },
                m.name
              );
            case "taxonomy-select": {
              const b = Array.isArray(x) ? x : [];
              return i.jsxs(
                "div",
                {
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: p(m.labelKey) }),
                    o
                      ? i.jsx($x, {
                          value: b,
                          disabled: n,
                          searchTaxonomy: o,
                          placeholder: l.misReglas.taxonomySearchPlaceholder,
                          removeLabel: l.misReglas.taxonomyRemoveLabel,
                          onChange: (C) => c(m.name, C.length > 0 ? C : void 0),
                        })
                      : i.jsx("small", {
                          style: { color: "#b32d2e" },
                          children:
                            l.misReglas.taxonomyUnavailable ??
                            "Taxonomy search unavailable on this platform",
                        }),
                  ],
                },
                m.name
              );
            }
            case "multiselect": {
              const b = Array.isArray(x) ? x : [],
                C = (d, y) => {
                  const w = y
                    ? [...b.filter((_) => _ !== d), d]
                    : b.filter((_) => _ !== d);
                  c(m.name, w.length > 0 ? w : void 0);
                },
                g = (d) => u[`option.${d}`] ?? d;
              return i.jsxs(
                "div",
                {
                  role: "group",
                  "aria-label": p(m.labelKey),
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: p(m.labelKey) }),
                    i.jsx("div", {
                      style: {
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 8,
                        maxWidth: 480,
                      },
                      children: m.options?.map((d) => {
                        const y = `${v}-${d}`;
                        return i.jsxs(
                          "label",
                          {
                            htmlFor: y,
                            style: {
                              display: "flex",
                              alignItems: "center",
                              gap: 4,
                            },
                            children: [
                              i.jsx("input", {
                                id: y,
                                type: "checkbox",
                                checked: b.includes(d),
                                disabled: n,
                                onChange: (w) => C(d, w.target.checked),
                              }),
                              i.jsx("span", { children: g(d) }),
                            ],
                          },
                          d
                        );
                      }),
                    }),
                  ],
                },
                m.name
              );
            }
            case "string-array":
            case "country-array":
            case "payment-method-array":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: p(m.labelKey) }),
                    i.jsx("input", {
                      id: v,
                      type: "text",
                      value: Kx(x),
                      disabled: n,
                      placeholder: m.placeholder ?? "value1, value2",
                      onChange: (b) => {
                        const C = Vx(b.target.value);
                        c(m.name, C.length > 0 ? C : void 0);
                      },
                      style: { width: 320 },
                    }),
                    i.jsx("small", {
                      style: { color: "#666" },
                      children:
                        l.misReglas.paramsCsvHint ?? "Comma-separated values",
                    }),
                  ],
                },
                m.name
              );
            default:
              return null;
          }
        };
      return i.jsxs("div", {
        style: {
          marginTop: 12,
          padding: 12,
          background: "#f6f7f7",
          border: "1px solid #c3c4c7",
          borderRadius: 4,
          display: "flex",
          flexDirection: "column",
          gap: 12,
        },
        children: [
          i.jsx("strong", {
            style: { fontSize: 13 },
            children: l.misReglas.paramsTitle ?? "Parameters",
          }),
          s.fields.map((m) => f(m)),
          s.requiredAnyOf
            ? i.jsx("small", {
                style: { color: "#646970" },
                children:
                  l.misReglas.paramsRequiredHint ??
                  `At least one of: ${s.requiredAnyOf.join(", ")}`,
              })
            : null,
          a
            ? i.jsx("div", {
                role: "alert",
                style: { color: "#b32d2e", fontSize: 12 },
                children: a,
              })
            : null,
        ],
      });
    },
    Hx = k()
      .trim()
      .length(2)
      .transform((e) => e.toUpperCase()),
    ef = k()
      .trim()
      .min(1)
      .transform((e) => e.toLowerCase()),
    tf = j({}).strict(),
    eu = [
      "alcohol",
      "tobacco",
      "firearms",
      "pharmaceuticals",
      "adult",
      "gambling",
      "cbd",
      "electronics_high_value",
      "jewelry",
      "crypto",
      "gift_cards",
      "subscriptions",
    ],
    rf = [
      "card",
      "paypal",
      "crypto",
      "bnpl",
      "klarna",
      "afterpay",
      "bank_transfer",
      "apple_pay",
      "google_pay",
      "gift_card",
    ],
    tu = {
      R001: {
        schema: j({
          requireAgentId: Oe().optional(),
          merchantTier: oe(["standard", "high"]).optional(),
        }).strict(),
        fields: [
          {
            name: "requireAgentId",
            type: "boolean",
            labelKey: "R001.requireAgentId",
          },
          {
            name: "merchantTier",
            type: "enum",
            labelKey: "R001.merchantTier",
            options: ["standard", "high"],
          },
        ],
      },
      R004: {
        schema: j({
          maxKeyAgeHours: z().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "maxKeyAgeHours",
            type: "number",
            labelKey: "R004.maxKeyAgeHours",
            min: 0,
          },
        ],
        requiredAnyOf: ["maxKeyAgeHours"],
      },
      R005: { schema: tf, fields: [] },
      R007: { schema: tf, fields: [] },
      R009: {
        schema: j({ requireAgentId: Oe().optional() }).strict(),
        fields: [
          {
            name: "requireAgentId",
            type: "boolean",
            labelKey: "R009.requireAgentId",
          },
        ],
      },
      R010: {
        schema: j({ minCompletedOrders: z().int().min(1).optional() }).strict(),
        fields: [
          {
            name: "minCompletedOrders",
            type: "number",
            labelKey: "R010.minCompletedOrders",
            min: 1,
          },
        ],
        requiredAnyOf: ["minCompletedOrders"],
      },
      R012: {
        schema: j({ categories: Z(oe(eu)).optional() }).strict(),
        fields: [
          {
            name: "categories",
            type: "multiselect",
            labelKey: "R012.categories",
            options: eu,
          },
        ],
        requiredAnyOf: ["categories"],
      },
      R014: {
        schema: j({
          highRiskCountries: Z(Hx).optional(),
          maxCancellations: z().int().nonnegative().optional(),
          windowDays: z().int().positive().optional(),
        }).strict(),
        fields: [
          {
            name: "highRiskCountries",
            type: "country-array",
            labelKey: "R014.highRiskCountries",
            placeholder: "US, MX",
          },
          {
            name: "maxCancellations",
            type: "number",
            labelKey: "R014.maxCancellations",
            min: 0,
          },
          {
            name: "windowDays",
            type: "number",
            labelKey: "R014.windowDays",
            min: 1,
          },
        ],
        requiredAnyOf: ["highRiskCountries", "maxCancellations"],
      },
      R015: {
        schema: j({ maxDeltaBps: z().int().nonnegative().optional() }).strict(),
        fields: [
          {
            name: "maxDeltaBps",
            type: "number",
            labelKey: "R015.maxDeltaBps",
            min: 0,
          },
        ],
        requiredAnyOf: ["maxDeltaBps"],
      },
      R016: {
        schema: j({ minStock: z().int().nonnegative().optional() }).strict(),
        fields: [
          {
            name: "minStock",
            type: "number",
            labelKey: "R016.minStock",
            min: 0,
          },
        ],
        requiredAnyOf: ["minStock"],
      },
      R018: {
        schema: j({
          spikeMultiplier: z().positive().optional(),
          merchantAvgOrderCents: z().int().positive().optional(),
          maxItemCount: z().int().positive().optional(),
          maxSingleSkuQty: z().int().positive().optional(),
        }).strict(),
        fields: [
          {
            name: "spikeMultiplier",
            type: "number",
            labelKey: "R018.spikeMultiplier",
            min: 0,
          },
          {
            name: "merchantAvgOrderCents",
            type: "number",
            labelKey: "R018.merchantAvgOrderCents",
            min: 1,
          },
          {
            name: "maxItemCount",
            type: "number",
            labelKey: "R018.maxItemCount",
            min: 1,
          },
          {
            name: "maxSingleSkuQty",
            type: "number",
            labelKey: "R018.maxSingleSkuQty",
            min: 1,
          },
        ],
        requiredAnyOf: [
          "merchantAvgOrderCents",
          "maxItemCount",
          "maxSingleSkuQty",
        ],
      },
      R021: {
        schema: j({
          minCompletedOrders: z().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "minCompletedOrders",
            type: "number",
            labelKey: "R021.minCompletedOrders",
            min: 0,
          },
        ],
        requiredAnyOf: ["minCompletedOrders"],
      },
      R022: {
        schema: j({
          allowedPaymentMethods: Z(ef).optional(),
          blockedPaymentMethods: Z(ef).optional(),
        }).strict(),
        fields: [
          {
            name: "allowedPaymentMethods",
            type: "multiselect",
            labelKey: "R022.allowedPaymentMethods",
            options: rf,
          },
          {
            name: "blockedPaymentMethods",
            type: "multiselect",
            labelKey: "R022.blockedPaymentMethods",
            options: rf,
          },
        ],
        requiredAnyOf: ["allowedPaymentMethods", "blockedPaymentMethods"],
      },
      R023: {
        schema: j({
          windowDays: z().int().positive().optional(),
          maxRatio: z().min(0).max(1).optional(),
        }).strict(),
        fields: [
          {
            name: "windowDays",
            type: "number",
            labelKey: "R023.windowDays",
            min: 1,
          },
          {
            name: "maxRatio",
            type: "number",
            labelKey: "R023.maxRatio",
            min: 0,
            max: 1,
          },
        ],
        requiredAnyOf: ["maxRatio"],
      },
      R024: {
        schema: j({
          windowDays: z().int().positive().optional(),
          maxDisputes: z().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "windowDays",
            type: "number",
            labelKey: "R024.windowDays",
            min: 1,
          },
          {
            name: "maxDisputes",
            type: "number",
            labelKey: "R024.maxDisputes",
            min: 0,
          },
        ],
        requiredAnyOf: ["maxDisputes"],
      },
      R025: {
        schema: j({
          blockPoBox: Oe().optional(),
          blockFreightForwarder: Oe().optional(),
        }).strict(),
        fields: [
          { name: "blockPoBox", type: "boolean", labelKey: "R025.blockPoBox" },
          {
            name: "blockFreightForwarder",
            type: "boolean",
            labelKey: "R025.blockFreightForwarder",
          },
        ],
      },
      R026: {
        schema: j({ requireConsent: Oe().optional() }).strict(),
        fields: [
          {
            name: "requireConsent",
            type: "boolean",
            labelKey: "R026.requireConsent",
          },
        ],
      },
      R027: {
        schema: j({
          maxStoredValueCents: z().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "maxStoredValueCents",
            type: "number",
            labelKey: "R027.maxStoredValueCents",
            min: 0,
          },
        ],
        requiredAnyOf: ["maxStoredValueCents"],
      },
      R028: {
        schema: j({ requirePurchaseOrder: Oe().optional() }).strict(),
        fields: [
          {
            name: "requirePurchaseOrder",
            type: "boolean",
            labelKey: "R028.requirePurchaseOrder",
          },
        ],
      },
      R032: {
        schema: j({ blockedCategoryIds: Z(k()).optional() }).strict(),
        fields: [
          {
            name: "blockedCategoryIds",
            type: "multiselect",
            labelKey: "R032.blockedCategoryIds",
            options: eu,
          },
        ],
        requiredAnyOf: ["blockedCategoryIds"],
      },
      R034: {
        schema: j({ blockedSkus: Z(k()).optional() }).strict(),
        fields: [
          {
            name: "blockedSkus",
            type: "string-array",
            labelKey: "R034.blockedSkus",
            placeholder: "SKU-123, SKU-456",
          },
        ],
        requiredAnyOf: ["blockedSkus"],
      },
      R035: {
        schema: j({ maxCents: z().int().positive().optional() }).strict(),
        fields: [
          {
            name: "maxCents",
            type: "number",
            labelKey: "R035.maxCents",
            min: 1,
          },
        ],
        requiredAnyOf: ["maxCents"],
      },
      R036: {
        schema: j({
          maxCentsPerLine: z().int().positive().optional(),
        }).strict(),
        fields: [
          {
            name: "maxCentsPerLine",
            type: "number",
            labelKey: "R036.maxCentsPerLine",
            min: 1,
          },
        ],
        requiredAnyOf: ["maxCentsPerLine"],
      },
      R038: {
        schema: j({ maxQuantity: z().int().positive().optional() }).strict(),
        fields: [
          {
            name: "maxQuantity",
            type: "number",
            labelKey: "R038.maxQuantity",
            min: 1,
          },
        ],
        requiredAnyOf: ["maxQuantity"],
      },
      R039: {
        schema: j({ maxPerSku: z().int().positive().optional() }).strict(),
        fields: [
          {
            name: "maxPerSku",
            type: "number",
            labelKey: "R039.maxPerSku",
            min: 1,
          },
        ],
        requiredAnyOf: ["maxPerSku"],
      },
      R043: {
        schema: j({ ttlMinutes: z().int().positive().optional() }).strict(),
        fields: [
          {
            name: "ttlMinutes",
            type: "number",
            labelKey: "R043.ttlMinutes",
            min: 1,
          },
        ],
      },
      R048: {
        schema: j({
          blockedTypes: Z(
            oe(["gift_card", "license_key", "downloadable", "stored_value"])
          ).optional(),
        }).strict(),
        fields: [
          {
            name: "blockedTypes",
            type: "multiselect",
            labelKey: "R048.blockedTypes",
            options: [
              "gift_card",
              "license_key",
              "downloadable",
              "stored_value",
            ],
          },
        ],
      },
    },
    Qx = j({
      name: k(),
      type: oe([
        "boolean",
        "number",
        "enum",
        "string-array",
        "country-array",
        "payment-method-array",
        "multiselect",
        "taxonomy-select",
      ]),
      labelKey: k(),
      helpKey: k().optional(),
      min: z().optional(),
      max: z().optional(),
      options: Z(k()).optional(),
      placeholder: k().optional(),
    }),
    Zx = j({
      ruleCode: k(),
      prefix: k(),
      fields: Z(Qx),
      requiredAnyOf: Z(k()).optional(),
      platformAvailability: sa(j({ status: k(), reason: k().optional() }))
        .nullable()
        .optional(),
    }),
    Gx = j({ rules: Z(Zx), version: z() }),
    Yx = /^(R\d{3})/;
  function Xx(e) {
    const t = Yx.exec(e.trim().toUpperCase());
    return t ? t[1] : null;
  }
  const Jx = {
    "wp-embed": "woocommerce",
    "ps-embed": "prestashop",
    "odoo-embed": "odoo",
    "magento-embed": "magento",
    "shopify-embed": "shopify",
  };
  function eb() {
    return {
      ready: !0,
      source: "fallback",
      ruleCodes: Object.keys(tu),
      metaByPrefix: tu,
    };
  }
  function tb(e) {
    const t = {};
    for (const r of e)
      t[r.prefix] = {
        schema: tu[r.prefix]?.schema ?? void 0,
        fields: r.fields.map((n) => ({
          name: n.name,
          type: n.type,
          labelKey: n.labelKey,
          helpKey: n.helpKey,
          min: n.min,
          max: n.max,
          options: n.options,
          placeholder: n.placeholder,
        })),
        requiredAnyOf: r.requiredAnyOf,
      };
    return {
      ready: !0,
      source: "live",
      ruleCodes: e.map((r) => r.prefix),
      metaByPrefix: t,
    };
  }
  function rb() {
    const e = Uh(),
      t = Jx[e] ?? "woocommerce",
      r = ye({
        queryKey: ["rule-params-meta", t],
        queryFn: () =>
          ne.get(
            `/v1/public/rule-params-meta?platform=${encodeURIComponent(t)}`,
            Gx
          ),
        staleTime: 3600 * 1e3,
        gcTime: 1440 * 60 * 1e3,
        retry: 1,
      });
    return r.data && Array.isArray(r.data.rules) && r.data.rules.length > 0
      ? tb(r.data.rules)
      : eb();
  }
  function nf(e, t) {
    const r = Xx(t);
    return r ? (e.metaByPrefix[r] ?? null) : null;
  }
  function af(e, t, r) {
    const n = nf(e, t);
    return n?.requiredAnyOf
      ? n.requiredAnyOf.some((s) => {
          const o = r?.[s];
          return o == null
            ? !1
            : Array.isArray(o)
              ? o.length > 0
              : typeof o == "string"
                ? o.trim().length > 0
                : !0;
        })
        ? { ok: !0 }
        : { ok: !1, requiredAnyOf: n.requiredAnyOf }
      : { ok: !0 };
  }
  const nb = {
      identity: "🪪",
      behavior: "👁️",
      transaction: "💳",
      postsale: "📦",
      general: "⚙️",
    },
    ab = j({ results: Z(j({ id: k(), name: k() })) });
  async function sb(e) {
    return (
      await ne.get(
        `/v1/embed/merchant/taxonomy/search?q=${encodeURIComponent(e)}`,
        ab
      )
    ).results;
  }
  const ib = j({
      id: k().optional(),
      storeId: k().optional(),
      ruleCode: k(),
      enabled: Oe(),
      params: sa(gs()).optional().nullable(),
      mode: k().optional(),
    }),
    ob = j({ rules: Z(ib), activeCount: z() }),
    lb = j({
      rule: j({
        ruleCode: k(),
        enabled: Oe(),
        params: sa(gs()).optional().nullable(),
      }),
    }),
    cb = [
      "R001.verified-agent-required",
      "R004.new-key-friction",
      "R005.revoked-agent-block",
      "R007.cross-merchant-abuse-signal",
      "R009.agent-verification-required",
      "R010.new-agent-probation",
      "R012.high-risk-category",
      "R014.delivery-risk-guard",
      "R015.price-change-guard",
      "R016.stock-confidence-guard",
      "R018.cart-composition-guard",
      "R021.first-purchase-with-merchant",
      "R022.payment-rail-restriction",
      "R023.refund-abuse-guard",
      "R024.dispute-history-guard",
      "R025.sensitive-delivery-address",
      "R026.subscription-autorenew-guard",
      "R027.gift-card-stored-value",
      "R028.b2b-po-guard",
      "R035.max-order-value",
      "R036.max-line-item-value",
      "R038.max-items-per-order",
      "R039.max-quantity-per-sku",
      "R034.sku-blocklist",
      "R032.category-blocklist",
      "R048.no-digital-goods-for-agents",
      "R043.agent-checkout-approval-required",
    ].map((e) => ({ ruleCode: e, enabled: !1 })),
    ub = ({
      rule: e,
      stat: t,
      onToggle: r,
      onSaveParams: n,
      onParamsRequired: a,
      isPending: s,
      t: o,
      metaState: l,
    }) => {
      const c = nf(l, e.ruleCode),
        u = e.params ?? {},
        [p, f] = N.useState(u),
        [m, x] = N.useState(null),
        v = N.useRef(null),
        b = JSON.stringify(u);
      ce.useEffect(() => {
        (f(u), x(null));
      }, [b, e.ruleCode]);
      const C = JSON.stringify(p) !== b,
        g = e.ruleCode.match(/^(R\d{3})/)?.[1] ?? null,
        y = o.misReglas.rulesMeta[e.ruleCode],
        w = y
          ? { ...y, helpUrl: g ? `${o.misReglas.helpBase}#${g}` : "" }
          : {
              title: e.ruleCode,
              description: "",
              helpUrl: g ? `${o.misReglas.helpBase}#${g}` : "",
            },
        _ = e.optimisticEnabled ?? e.enabled,
        A = t?.blockedCount ?? 0,
        R = t?.failOpenCount ?? 0;
      return i.jsxs("div", {
        className: "flex items-start gap-4 border-b border-gray-100 py-4",
        style: { opacity: s ? 0.6 : 1 },
        children: [
          i.jsx("button", {
            type: "button",
            role: "switch",
            "aria-checked": _,
            disabled: s,
            onClick: () => {
              const T = !_;
              if (T) {
                const S = af(l, e.ruleCode, p);
                if (!S.ok) {
                  const O =
                    (o.misReglas.paramsRequiredError ??
                      "Required parameter missing:") +
                    " " +
                    (S.requiredAnyOf ?? []).join(" / ");
                  (x(O),
                    a(w.title, S.requiredAnyOf ?? []),
                    v.current?.scrollIntoView({
                      behavior: "smooth",
                      block: "nearest",
                    }));
                  return;
                }
              }
              (x(null), r(e.ruleCode, T, p));
            },
            className:
              "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed",
            style: { background: _ ? "#1a7f4f" : "#d1d5db" },
            "aria-label": _
              ? o.misReglas.toggleAriaActive
              : o.misReglas.toggleAriaInactive,
            children: i.jsx("span", {
              className:
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
              style: { left: _ ? "22px" : "2px" },
            }),
          }),
          i.jsxs("div", {
            className: "flex-1",
            children: [
              i.jsxs("div", {
                className: "mb-1 flex flex-wrap items-center gap-2",
                children: [
                  i.jsx("span", {
                    className: "text-sm font-semibold text-gray-900",
                    children: w.title,
                  }),
                  _
                    ? i.jsx("span", {
                        className:
                          "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700",
                        children: o.misReglas.ruleActive,
                      })
                    : i.jsx("span", {
                        className:
                          "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500",
                        children: o.misReglas.ruleInactive,
                      }),
                  A > 0 &&
                    i.jsx("span", {
                      className:
                        "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700",
                      children: o.misReglas.blockedLast7d.replace(
                        "{{count}}",
                        String(A)
                      ),
                    }),
                  R > 0 &&
                    A === 0 &&
                    i.jsx("span", {
                      className:
                        "rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700",
                      children: o.misReglas.failOpenLast7d.replace(
                        "{{count}}",
                        String(R)
                      ),
                    }),
                ],
              }),
              i.jsx("p", {
                className: "text-sm text-gray-500",
                children: w.description,
              }),
              w.helpUrl &&
                i.jsx("a", {
                  href: w.helpUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "mt-1 inline-block text-xs text-blue-600 hover:text-blue-800 underline",
                  children: o.misReglas.helpLinkLabel,
                }),
              c && c.fields.length > 0
                ? i.jsxs(i.Fragment, {
                    children: [
                      i.jsx("div", {
                        ref: v,
                        children: i.jsx(Wx, {
                          ruleCode: e.ruleCode,
                          value: p,
                          onChange: (T) => {
                            (f(T), x(null));
                          },
                          disabled: s,
                          error: m,
                          meta: c,
                          searchTaxonomy: sb,
                        }),
                      }),
                      C
                        ? i.jsxs("div", {
                            style: { marginTop: 8 },
                            children: [
                              i.jsx("button", {
                                type: "button",
                                className: "button button-primary",
                                disabled: s,
                                onClick: () => {
                                  if (_) {
                                    const T = af(l, e.ruleCode, p);
                                    if (!T.ok) {
                                      x(
                                        (o.misReglas.paramsRequiredError ??
                                          "Required parameter missing:") +
                                          " " +
                                          (T.requiredAnyOf ?? []).join(" / ")
                                      );
                                      return;
                                    }
                                  }
                                  (x(null), n(e.ruleCode, p, _));
                                },
                                children:
                                  o.misReglas.paramsSaveBtn ??
                                  "Save parameters",
                              }),
                              i.jsx("button", {
                                type: "button",
                                className: "button",
                                style: { marginLeft: 8 },
                                disabled: s,
                                onClick: () => {
                                  (f(u), x(null));
                                },
                                children: o.misReglas.paramsResetBtn ?? "Reset",
                              }),
                            ],
                          })
                        : null,
                    ],
                  })
                : null,
            ],
          }),
        ],
      });
    },
    db = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = er(),
              [r, n] = N.useState([]),
              a = N.useRef(0),
              [s, o] = N.useState(new Set()),
              [l, c] = N.useState({}),
              u = rb(),
              p = N.useMemo(() => new Set(u.ruleCodes), [u.ruleCodes]),
              f = N.useCallback((S, O) => {
                const $ = ++a.current;
                (n((J) => [...J, { id: $, message: S, type: O }]),
                  setTimeout(() => n((J) => J.filter((U) => U.id !== $)), 5e3));
              }, []),
              m = ye({
                queryKey: ["merchant-rules"],
                queryFn: () => ne.get("/v1/embed/merchant/rules", ob),
              }),
              x = ye({
                queryKey: ["merchant-stats-7d"],
                queryFn: () =>
                  ne.get(
                    "/v1/embed/merchant/stats?window=7",
                    j({ stats: Z(yh()) }).optional()
                  ),
              }),
              v = xt({
                mutationFn: ({ ruleCode: S, enabled: O, params: $ }) =>
                  ne.put(
                    `/v1/embed/merchant/rules/${encodeURIComponent(S)}`,
                    $ !== void 0 ? { enabled: O, params: $ } : { enabled: O },
                    lb
                  ),
                onMutate: ({ ruleCode: S, enabled: O }) => {
                  (o(($) => new Set([...$, S])), c(($) => ({ ...$, [S]: O })));
                },
                onSuccess: (S, { ruleCode: O }) => {
                  (f(
                    S.rule.enabled
                      ? e.misReglas.ruleActivatedMsg
                      : e.misReglas.ruleDeactivatedMsg,
                    "success"
                  ),
                    c(($) => ({ ...$, [O]: S.rule.enabled })),
                    t.invalidateQueries({ queryKey: ["merchant-rules"] }));
                },
                onError: (S, { ruleCode: O }) => {
                  (f(e.misReglas.ruleChangeError, "error"),
                    c(($) => {
                      const J = { ...$ };
                      return (delete J[O], J);
                    }));
                },
                onSettled: (S, O, { ruleCode: $ }) => {
                  o((J) => {
                    const U = new Set(J);
                    return (U.delete($), U);
                  });
                },
              }),
              C = (m.data?.rules ?? (m.isError ? cb : [])).filter((S) => {
                const O = S.ruleCode.match(/^(R\d{3})/);
                return O ? p.has(O[1]) : !1;
              }),
              g = C.filter((S) =>
                l[S.ruleCode] !== void 0 ? l[S.ruleCode] : S.enabled
              ).length,
              d = (S) => {
                const O = C.find(($) => $.ruleCode === S);
                return O ? (l[S] !== void 0 ? l[S] : O.enabled) : !1;
              },
              y =
                d("R001.verified-agent-required") &&
                d("R009.agent-verification-required"),
              w =
                !d("R001.verified-agent-required") &&
                d("R002.signature-spoof-block"),
              _ = x.data?.stats ?? [],
              A = Object.fromEntries(_.map((S) => [S.ruleCode, S])),
              R = [
                "identity",
                "behavior",
                "transaction",
                "postsale",
                "general",
              ],
              T = {};
            for (const S of R) T[S] = [];
            for (const S of C) {
              const O = e.misReglas.rulesMeta[S.ruleCode]?.category ?? "other";
              (T[O] || (T[O] = []), T[O].push(S));
            }
            return i.jsxs("div", {
              className: "max-w-3xl space-y-6 p-6",
              children: [
                i.jsx("h1", {
                  className: "text-xl font-semibold text-gray-900",
                  children: e.misReglas.title,
                }),
                i.jsx("div", {
                  className: "fixed right-4 top-4 z-50 space-y-2",
                  children: r.map((S) =>
                    i.jsx(
                      "div",
                      {
                        className: `rounded-lg px-4 py-3 text-sm font-medium shadow-lg ${S.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: S.message,
                      },
                      S.id
                    )
                  ),
                }),
                i.jsx("div", {
                  className:
                    "rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                  children: e.misReglas.infoNotice,
                }),
                m.isError &&
                  i.jsx("div", {
                    className:
                      "rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                    children: e.misReglas.errorNotice,
                  }),
                y &&
                  i.jsx("div", {
                    role: "alert",
                    className:
                      "rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                    children: e.misReglas.r001r009Redundancy,
                  }),
                w &&
                  i.jsx("div", {
                    role: "alert",
                    className:
                      "rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800",
                    children: e.misReglas.r002WithoutR001,
                  }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsxs("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: [
                        i.jsx("h2", {
                          className: "font-semibold text-gray-900",
                          children: e.misReglas.rulesByCategoryTitle,
                        }),
                        i.jsx("div", {
                          className: "mt-1",
                          children: i.jsx("span", {
                            className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${g > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`,
                            children: e.misReglas.activeCountLabel
                              .replace("{{active}}", String(g))
                              .replace("{{total}}", String(C.length)),
                          }),
                        }),
                      ],
                    }),
                    i.jsx("div", {
                      className: "px-6 py-4",
                      children: m.isLoading
                        ? Array.from({ length: 4 }).map((S, O) =>
                            i.jsx(
                              "div",
                              {
                                className:
                                  "mb-4 h-16 animate-pulse rounded-lg bg-gray-100",
                              },
                              O
                            )
                          )
                        : R.map((S) => {
                            const O = T[S] ?? [];
                            if (O.length === 0) return null;
                            const $ = e.misReglas.categoryLabels[S] ?? S;
                            return i.jsxs(
                              "div",
                              {
                                className: "mb-4",
                                children: [
                                  i.jsxs("div", {
                                    className:
                                      "flex items-center gap-1.5 border-b-2 border-gray-100 pb-1 pt-2 text-xs font-bold uppercase tracking-wider text-gray-400",
                                    children: [
                                      i.jsx("span", { children: nb[S] }),
                                      $,
                                    ],
                                  }),
                                  O.map((J) =>
                                    i.jsx(
                                      ub,
                                      {
                                        rule: {
                                          ...J,
                                          optimisticEnabled: l[J.ruleCode],
                                        },
                                        metaState: u,
                                        stat: A[J.ruleCode] ?? null,
                                        onToggle: (U, Se, $t) =>
                                          v.mutate({
                                            ruleCode: U,
                                            enabled: Se,
                                            params: $t,
                                          }),
                                        onSaveParams: (U, Se, $t) =>
                                          v.mutate({
                                            ruleCode: U,
                                            enabled: $t,
                                            params: Se,
                                          }),
                                        onParamsRequired: (U, Se) => {
                                          const $t =
                                            e.misReglas.paramsRequiredError ??
                                            "Required parameter missing:";
                                          f(
                                            `${$t} ${Se.join(" / ")} — ${U}`,
                                            "error"
                                          );
                                        },
                                        isPending: s.has(J.ruleCode),
                                        t: e,
                                      },
                                      J.ruleCode
                                    )
                                  ),
                                ],
                              },
                              S
                            );
                          }),
                    }),
                  ],
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: i.jsx("h2", {
                        className: "font-semibold text-gray-900",
                        children: e.misReglas.howItWorksTitle,
                      }),
                    }),
                    i.jsxs("div", {
                      className: "space-y-3 p-6 text-sm",
                      children: [
                        i.jsxs("div", {
                          className: "flex gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-lg",
                              children: "🟢",
                            }),
                            i.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                i.jsx("strong", {
                                  className: "text-gray-900",
                                  children: e.misReglas.howInactiveLabel,
                                }),
                                " ",
                                e.misReglas.howInactive,
                              ],
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-lg",
                              children: "🔴",
                            }),
                            i.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                i.jsx("strong", {
                                  className: "text-gray-900",
                                  children: e.misReglas.howActiveLabel,
                                }),
                                " ",
                                e.misReglas.howActive,
                              ],
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-lg",
                              children: "📊",
                            }),
                            i.jsxs("p", {
                              className: "text-gray-600",
                              children: [
                                i.jsx("strong", {
                                  className: "text-gray-900",
                                  children: e.misReglas.howStatsLabel,
                                }),
                                " ",
                                e.misReglas.howStats,
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    pb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    mb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "long",
      timeZone: "UTC",
    }),
    hb = (e) => {
      try {
        return pb.format(new Date(e));
      } catch {
        return e;
      }
    },
    fb = (e) => {
      if (!e) return "—";
      try {
        return mb.format(new Date(e));
      } catch {
        return e;
      }
    },
    gb = {
      "shopify-embed": "bg-green-50 text-green-700",
      "wp-embed": "bg-blue-50 text-blue-700",
      portal: "bg-gray-100 text-gray-700",
      api: "bg-yellow-50 text-yellow-700",
      mcp: "bg-purple-50 text-purple-700",
      webhook: "bg-orange-50 text-orange-700",
    },
    yb = () =>
      i.jsx("tr", {
        children: Array.from({ length: 5 }).map((e, t) =>
          i.jsx(
            "td",
            {
              className: "px-4 py-3",
              children: i.jsx("div", {
                className: "h-4 animate-pulse rounded bg-gray-100",
              }),
            },
            t
          )
        ),
      }),
    vb = (e) => {
      const t = new URLSearchParams({ limit: "25" });
      return (
        e !== null && t.set("cursor", e),
        `/v1/embed/trust/audit?${t.toString()}`
      );
    },
    xb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(null),
              [n, a] = N.useState([]),
              s = {
                "shopify-embed": e.seguridad.sourceShopify,
                "wp-embed": e.seguridad.sourceWp,
                portal: e.seguridad.sourcePortal,
                api: e.seguridad.sourceApi,
                mcp: e.seguridad.sourceMcp,
                webhook: e.seguridad.sourceWebhook,
              },
              o = (v) =>
                v === "allow"
                  ? e.seguridad.outcomeAllowed
                  : v === "deny" || v === "blocked_by_overlay"
                    ? e.seguridad.outcomeBlocked
                    : v === "token_refresh_seamless"
                      ? e.seguridad.outcomeSessionRenewed
                      : v,
              l = ye({
                queryKey: ["trust-keys-seguridad"],
                queryFn: async () => {
                  try {
                    return await ne.get("/v1/embed/trust/keys", ys);
                  } catch (v) {
                    if (v instanceof At && v.status === 404) return null;
                    throw v;
                  }
                },
                retry: !1,
              }),
              c = vb(t),
              u = ye({
                queryKey: ["trust-audit-seguridad", t],
                queryFn: () => ne.get(c, jh),
                placeholderData: (v) => v,
              });
            ce.useEffect(() => {
              u.data?.items &&
                a(
                  t === null
                    ? u.data.items
                    : (v) => {
                        const b = new Set(v.map((C) => C.id));
                        return [
                          ...v,
                          ...(u.data?.items ?? []).filter((C) => !b.has(C.id)),
                        ];
                      }
                );
            }, [u.data, t]);
            const p = n.length > 0 ? n : (u.data?.items ?? []),
              f = u.data?.chainIntegrity ?? null,
              m = l.data,
              x = !l.isLoading && !l.isError && m === null;
            return i.jsxs("div", {
              className: "max-w-5xl space-y-6 p-6",
              children: [
                i.jsx("h1", {
                  className: "text-xl font-semibold text-gray-900",
                  children: e.seguridad.title,
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: i.jsx("h2", {
                        className: "font-semibold text-gray-900",
                        children: e.seguridad.protectionSection,
                      }),
                    }),
                    i.jsxs("div", {
                      className: "p-6",
                      children: [
                        l.isError &&
                          i.jsxs("div", {
                            className:
                              "rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                            role: "alert",
                            children: [
                              e.seguridad.errorChecking,
                              " ",
                              l.error instanceof Error
                                ? l.error.message
                                : e.common.errorUnknown,
                            ],
                          }),
                        l.isLoading &&
                          i.jsx("div", {
                            className:
                              "h-16 animate-pulse rounded-lg bg-gray-100",
                          }),
                        x &&
                          i.jsxs("div", {
                            className:
                              "rounded-lg border border-blue-100 bg-blue-50 px-4 py-3",
                            role: "status",
                            children: [
                              i.jsx("p", {
                                className:
                                  "text-sm font-semibold text-blue-900",
                                children: e.seguridad.notActivatedTitle,
                              }),
                              i.jsx("p", {
                                className: "mt-1 text-sm text-blue-800",
                                children: e.seguridad.notActivatedDesc,
                              }),
                            ],
                          }),
                        m &&
                          i.jsxs("div", {
                            className: "space-y-3",
                            children: [
                              i.jsxs("div", {
                                className: "flex items-center gap-4",
                                children: [
                                  i.jsxs("svg", {
                                    width: "52",
                                    height: "60",
                                    viewBox: "0 0 52 60",
                                    fill: "none",
                                    "aria-hidden": "true",
                                    children: [
                                      i.jsx("path", {
                                        d: "M26 2L4 11v16c0 14.4 9.4 27.8 22 31.6C38.6 54.8 48 41.4 48 27V11L26 2z",
                                        fill: "#e3f5ec",
                                        stroke: "#1a7f4f",
                                        strokeWidth: "2.5",
                                        strokeLinejoin: "round",
                                      }),
                                      i.jsx("path", {
                                        d: "M16 30l7 7 13-14",
                                        stroke: "#1a7f4f",
                                        strokeWidth: "3",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                      }),
                                    ],
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsx("span", {
                                        className:
                                          "inline-block rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 mb-1",
                                        children: e.seguridad.protectionBadge,
                                      }),
                                      i.jsx("p", {
                                        className: "text-sm text-gray-500",
                                        children: e.seguridad.protectionDesc,
                                      }),
                                      m.daysSinceRotation !== null &&
                                        i.jsxs("p", {
                                          className:
                                            "mt-1 text-xs text-gray-400",
                                          children: [
                                            e.seguridad.lastRenewal.replace(
                                              "{{days}}",
                                              String(m.daysSinceRotation)
                                            ),
                                            m.lastRotatedAt &&
                                              ` (${fb(m.lastRotatedAt)})`,
                                          ],
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              m.retiredGraceKids.length > 0 &&
                                i.jsx("div", {
                                  className:
                                    "rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                                  children: e.seguridad.graceKeysNotice.replace(
                                    "{{count}}",
                                    String(m.retiredGraceKids.length)
                                  ),
                                }),
                            ],
                          }),
                      ],
                    }),
                  ],
                }),
                i.jsxs("section", {
                  className:
                    "rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: [
                    i.jsxs("div", {
                      className: "border-b border-gray-100 px-6 py-4",
                      children: [
                        i.jsx("h2", {
                          className: "font-semibold text-gray-900",
                          children: e.seguridad.activitySection,
                        }),
                        i.jsx("p", {
                          className: "mt-1 text-sm text-gray-500",
                          children: e.seguridad.activitySectionDesc,
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "p-6",
                      children: [
                        f &&
                          i.jsxs("div", {
                            className: `mb-4 rounded border px-4 py-3 text-sm ${f.verified ? "border-green-300 bg-green-50 text-green-800" : "border-yellow-300 bg-yellow-50 text-yellow-800"}`,
                            children: [
                              f.verified
                                ? e.seguridad.chainOk
                                : e.seguridad.chainBroken,
                              f.note && ` ${f.note}`,
                            ],
                          }),
                        u.isError &&
                          i.jsxs("div", {
                            className:
                              "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                            role: "alert",
                            children: [
                              e.seguridad.errorLoadingActivity,
                              " ",
                              u.error instanceof Error
                                ? u.error.message
                                : e.common.errorUnknown,
                            ],
                          }),
                        !u.isError && p.length === 0 && !u.isLoading
                          ? i.jsx("div", {
                              className: "flex items-center gap-4",
                              children: i.jsxs("div", {
                                children: [
                                  i.jsx("p", {
                                    className: "font-semibold text-gray-800",
                                    children: e.seguridad.activityEmpty,
                                  }),
                                  i.jsx("p", {
                                    className: "text-sm text-gray-500",
                                    children: e.seguridad.activityEmptyDesc,
                                  }),
                                ],
                              }),
                            })
                          : i.jsx("div", {
                              className: "overflow-x-auto",
                              children: i.jsxs("table", {
                                className: "min-w-full text-sm",
                                "aria-label": e.seguridad.tableLabel,
                                children: [
                                  i.jsx("thead", {
                                    children: i.jsxs("tr", {
                                      className:
                                        "border-b border-gray-200 bg-gray-50 text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                                      children: [
                                        i.jsx("th", {
                                          className: "px-4 py-3",
                                          children: e.seguridad.colWhen,
                                        }),
                                        i.jsx("th", {
                                          className: "px-4 py-3",
                                          children: e.seguridad.colFrom,
                                        }),
                                        i.jsx("th", {
                                          className: "px-4 py-3",
                                          children: e.seguridad.colResult,
                                        }),
                                        i.jsx("th", {
                                          className: "px-4 py-3",
                                          children: e.seguridad.colWhat,
                                        }),
                                        i.jsx("th", {
                                          className: "px-4 py-3",
                                          children: e.seguridad.colBuyerType,
                                        }),
                                      ],
                                    }),
                                  }),
                                  i.jsxs("tbody", {
                                    className: "divide-y divide-gray-100",
                                    children: [
                                      (u.isLoading ||
                                        (u.isFetching && p.length === 0)) &&
                                        Array.from({ length: 5 }).map((v, b) =>
                                          i.jsx(yb, {}, b)
                                        ),
                                      p.map((v) =>
                                        i.jsxs(
                                          "tr",
                                          {
                                            className: "hover:bg-gray-50",
                                            children: [
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-gray-500",
                                                children: hb(v.createdAt),
                                              }),
                                              i.jsx("td", {
                                                className: "px-4 py-3",
                                                children: i.jsx("span", {
                                                  className: `rounded-full px-2 py-0.5 text-xs font-medium ${gb[v.source] ?? "bg-gray-100 text-gray-600"}`,
                                                  children:
                                                    s[v.source] ?? v.source,
                                                }),
                                              }),
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-gray-700",
                                                children: o(v.outcome ?? "—"),
                                              }),
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-gray-700",
                                                children: v.tool
                                                  ? v.tool.replace(/_/g, " ")
                                                  : "—",
                                              }),
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-xs text-gray-400",
                                                children: v.agentId
                                                  ? e.seguridad.buyerBot
                                                  : e.seguridad.buyerHuman,
                                              }),
                                            ],
                                          },
                                          v.id
                                        )
                                      ),
                                    ],
                                  }),
                                ],
                              }),
                            }),
                        u.data?.nextCursor &&
                          i.jsx("div", {
                            className: "mt-4 text-center",
                            children: i.jsx("button", {
                              onClick: () => r(u.data?.nextCursor ?? null),
                              disabled: u.isFetching,
                              className:
                                "text-sm text-blue-600 hover:text-blue-800 disabled:opacity-50",
                              children: u.isFetching
                                ? e.common.loadingMore
                                : e.seguridad.viewMoreActivity,
                            }),
                          }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    bb = {
      allow: "bg-green-100 text-green-700",
      probation: "bg-yellow-100 text-yellow-700",
      block: "bg-red-100 text-red-700",
      pending: "bg-gray-100 text-gray-500",
    },
    wb = { allow: "✅", probation: "👁️", block: "🚫", pending: "⏳" },
    kb = () =>
      i.jsx("tr", {
        children: Array.from({ length: 5 }).map((e, t) =>
          i.jsx(
            "td",
            {
              className: "px-4 py-3",
              children: i.jsx("div", {
                className: "h-4 animate-pulse rounded bg-gray-100",
              }),
            },
            t
          )
        ),
      }),
    Sb = ({
      agent: e,
      isPending: t,
      onRevoke: r,
      onProbation: n,
      onAllow: a,
      t: s,
    }) => {
      const o = e.agenticTrustScore,
        l =
          o === null
            ? s.merchantAgentsPanel.noData
            : o >= 80
              ? s.merchantAgentsPanel.trustVeryReliable
              : o >= 50
                ? s.merchantAgentsPanel.trustAcceptable
                : s.merchantAgentsPanel.trustLow,
        c =
          o === null
            ? "#8c9196"
            : o >= 80
              ? "#1a7f4f"
              : o >= 50
                ? "#b27400"
                : "#c0392b",
        u = {
          allow: s.merchantAgentsPanel.stateCanBuy,
          probation: s.merchantAgentsPanel.stateWatching,
          block: s.merchantAgentsPanel.stateBanned,
          pending: s.merchantAgentsPanel.statePending,
        },
        p = e.state;
      return i.jsxs("tr", {
        className: "hover:bg-gray-50",
        children: [
          i.jsxs("td", {
            className: "px-4 py-3",
            children: [
              i.jsx("div", {
                className: "font-medium text-gray-800",
                children:
                  e.displayName ?? s.merchantAgentsPanel.defaultAgentName,
              }),
              i.jsxs("div", {
                className: "mt-0.5 text-xs text-gray-400",
                children: ["#", e.agentId.slice(0, 12)],
              }),
            ],
          }),
          i.jsx("td", {
            className: "px-4 py-3",
            children: i.jsxs("span", {
              className: `rounded-full px-2 py-0.5 text-xs font-medium ${bb[p] ?? "bg-gray-100 text-gray-500"}`,
              children: [wb[p] ?? "", " ", u[p] ?? p],
            }),
          }),
          i.jsx("td", {
            className: "px-4 py-3",
            children:
              e.agenticTrustScore !== null
                ? i.jsxs("div", {
                    children: [
                      i.jsxs("div", {
                        className: "text-sm font-bold",
                        style: { color: c },
                        children: [e.agenticTrustScore, "/100"],
                      }),
                      i.jsx("div", {
                        className: "text-xs",
                        style: { color: c },
                        children: l,
                      }),
                    ],
                  })
                : i.jsx("span", {
                    className: "text-xs text-gray-400",
                    children: s.merchantAgentsPanel.noData,
                  }),
          }),
          i.jsxs("td", {
            className: "px-4 py-3 text-sm text-gray-600",
            children: [
              i.jsx("div", {
                children: s.merchantAgentsPanel.callsLast30d.replace(
                  "{{count}}",
                  String(e.callsLast30d ?? 0)
                ),
              }),
              i.jsx("div", {
                className: "text-xs text-gray-400",
                children: s.merchantAgentsPanel.callsLast30dSuffix,
              }),
            ],
          }),
          i.jsx("td", {
            className: "px-4 py-3",
            children: i.jsxs("div", {
              className: "flex flex-col gap-1.5",
              children: [
                p !== "block" &&
                  i.jsx("button", {
                    onClick: r,
                    disabled: t,
                    className:
                      "w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-left text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60",
                    children: s.merchantAgentsPanel.revokeBtn,
                  }),
                (p === "allow" || p === "block") &&
                  i.jsx("button", {
                    onClick: n,
                    disabled: t,
                    className:
                      "w-full rounded border border-yellow-200 bg-yellow-50 px-2 py-1 text-left text-xs font-semibold text-yellow-700 hover:bg-yellow-100 disabled:opacity-60",
                    children: s.merchantAgentsPanel.probationBtn,
                  }),
                (p === "block" || p === "probation" || p === "pending") &&
                  i.jsx("button", {
                    onClick: a,
                    disabled: t,
                    className:
                      "w-full rounded border border-green-200 bg-green-50 px-2 py-1 text-left text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-60",
                    children: s.merchantAgentsPanel.allowBtn,
                  }),
              ],
            }),
          }),
        ],
      });
    },
    sf = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = er(),
              [r, n] = N.useState([]),
              a = N.useRef(0),
              [s, o] = N.useState(new Set()),
              l = N.useCallback((w, _) => {
                const A = ++a.current;
                (n((R) => [...R, { id: A, message: w, type: _ }]),
                  setTimeout(() => n((R) => R.filter((T) => T.id !== A)), 5e3));
              }, []),
              {
                data: c,
                isLoading: u,
                isError: p,
                error: f,
              } = ye({
                queryKey: ["merchant-agents"],
                queryFn: () => ne.get("/v1/embed/merchant/agents", wv),
              }),
              m = (w, _) => ({
                mutationFn: (A) =>
                  ne.post(
                    `/v1/embed/merchant/agents/${encodeURIComponent(A)}/${w}`,
                    {
                      reason: e.merchantAgentsPanel.auditReason.replace(
                        "{{action}}",
                        w
                      ),
                    },
                    Sv
                  ),
                onMutate: (A) => {
                  o((R) => new Set([...R, A]));
                },
                onSuccess: (A, R) => {
                  (l(_, "success"),
                    o((T) => {
                      const S = new Set(T);
                      return (S.delete(R), S);
                    }),
                    t.invalidateQueries({ queryKey: ["merchant-agents"] }));
                },
                onError: (A, R) => {
                  (o((T) => {
                    const S = new Set(T);
                    return (S.delete(R), S);
                  }),
                    l(
                      A instanceof Error
                        ? A.message
                        : e.merchantAgentsPanel.toastError,
                      "error"
                    ));
                },
              }),
              x = xt(m("revoke", e.merchantAgentsPanel.toastRevoked)),
              v = xt(m("probation", e.merchantAgentsPanel.toastProbation)),
              b = xt(m("allow", e.merchantAgentsPanel.toastAllowed)),
              C = c?.items ?? [],
              g = C.filter((w) => w.state === "allow").length,
              d = C.filter((w) => w.state === "probation").length,
              y = C.filter((w) => w.state === "block").length;
            return i.jsxs("div", {
              className: "p-6 max-w-5xl",
              children: [
                i.jsx("div", {
                  className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
                  "aria-label": e.merchantAgentsPanel.notifications,
                  children: r.map((w) =>
                    i.jsxs(
                      "div",
                      {
                        role: "status",
                        "aria-live": "polite",
                        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${w.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: [
                          i.jsx("span", { children: w.message }),
                          i.jsx("button", {
                            onClick: () =>
                              n((_) => _.filter((A) => A.id !== w.id)),
                            className: "ml-4 opacity-80 hover:opacity-100",
                            "aria-label": e.common.closeNotification,
                            children: "✕",
                          }),
                        ],
                      },
                      w.id
                    )
                  ),
                }),
                i.jsx("h1", {
                  className: "mb-2 text-xl font-semibold text-gray-900",
                  children: e.merchantAgentsPanel.title,
                }),
                i.jsx("p", {
                  className: "mb-4 text-sm text-gray-500",
                  children: e.merchantAgentsPanel.description,
                }),
                p &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.merchantAgentsPanel.errorLoading,
                      " ",
                      f instanceof Error ? f.message : e.common.errorUnknown,
                    ],
                  }),
                !u &&
                  C.length > 0 &&
                  i.jsxs("div", {
                    className:
                      "mb-4 flex gap-6 rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm",
                    children: [
                      i.jsxs("div", {
                        className: "text-center",
                        children: [
                          i.jsx("div", {
                            className: "text-2xl font-bold text-green-700",
                            children: g,
                          }),
                          i.jsx("div", {
                            className: "text-xs text-gray-500",
                            children: e.merchantAgentsPanel.countersCanBuy,
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "text-center",
                        children: [
                          i.jsx("div", {
                            className: "text-2xl font-bold text-yellow-600",
                            children: d,
                          }),
                          i.jsx("div", {
                            className: "text-xs text-gray-500",
                            children: e.merchantAgentsPanel.countersWatching,
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "text-center",
                        children: [
                          i.jsx("div", {
                            className: "text-2xl font-bold text-red-700",
                            children: y,
                          }),
                          i.jsx("div", {
                            className: "text-xs text-gray-500",
                            children: e.merchantAgentsPanel.countersBanned,
                          }),
                        ],
                      }),
                    ],
                  }),
                i.jsx("div", {
                  className:
                    "overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: i.jsxs("table", {
                    className: "min-w-full divide-y divide-gray-200 text-sm",
                    "aria-label": e.merchantAgentsPanel.tableLabel,
                    children: [
                      i.jsx("thead", {
                        children: i.jsxs("tr", {
                          className:
                            "text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                          children: [
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantAgentsPanel.colWho,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantAgentsPanel.colStatus,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantAgentsPanel.colReputation,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantAgentsPanel.colActivity,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantAgentsPanel.colActions,
                            }),
                          ],
                        }),
                      }),
                      i.jsxs("tbody", {
                        className: "divide-y divide-gray-100",
                        children: [
                          u &&
                            Array.from({ length: 4 }).map((w, _) =>
                              i.jsx(kb, {}, _)
                            ),
                          !u &&
                            C.map((w) =>
                              i.jsx(
                                Sb,
                                {
                                  agent: w,
                                  isPending: s.has(w.agentId),
                                  onRevoke: () => x.mutate(w.agentId),
                                  onProbation: () => v.mutate(w.agentId),
                                  onAllow: () => b.mutate(w.agentId),
                                  t: e,
                                },
                                w.id
                              )
                            ),
                          !u &&
                            C.length === 0 &&
                            !p &&
                            i.jsx("tr", {
                              children: i.jsx("td", {
                                colSpan: 5,
                                className:
                                  "px-4 py-8 text-center text-sm text-gray-500",
                                children: i.jsxs("div", {
                                  className: "flex flex-col items-center gap-2",
                                  children: [
                                    i.jsx("span", {
                                      className: "text-3xl",
                                      children: "🤖",
                                    }),
                                    i.jsx("span", {
                                      className: "font-medium text-gray-700",
                                      children:
                                        e.merchantAgentsPanel.emptyTitle,
                                    }),
                                    i.jsx("span", {
                                      children: e.merchantAgentsPanel.emptyDesc,
                                    }),
                                  ],
                                }),
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                i.jsxs("div", {
                  className:
                    "mt-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm",
                  children: [
                    i.jsx("h3", {
                      className: "mb-4 text-sm font-semibold text-gray-900",
                      children: e.merchantAgentsPanel.guideTitle,
                    }),
                    i.jsxs("div", {
                      className: "space-y-3",
                      children: [
                        i.jsxs("div", {
                          className: "flex items-start gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-lg",
                              children: "🟢",
                            }),
                            i.jsxs("div", {
                              className: "text-sm",
                              children: [
                                i.jsx("strong", {
                                  children: e.merchantAgentsPanel.guide80,
                                }),
                                " ",
                                i.jsx("span", {
                                  className: "text-gray-600",
                                  children: e.merchantAgentsPanel.guide80Desc,
                                }),
                              ],
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex items-start gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-lg",
                              children: "🟡",
                            }),
                            i.jsxs("div", {
                              className: "text-sm",
                              children: [
                                i.jsx("strong", {
                                  children: e.merchantAgentsPanel.guide50,
                                }),
                                " ",
                                i.jsx("span", {
                                  className: "text-gray-600",
                                  children: e.merchantAgentsPanel.guide50Desc,
                                }),
                              ],
                            }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex items-start gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-lg",
                              children: "🔴",
                            }),
                            i.jsxs("div", {
                              className: "text-sm",
                              children: [
                                i.jsx("strong", {
                                  children: e.merchantAgentsPanel.guide0,
                                }),
                                " ",
                                i.jsx("span", {
                                  className: "text-gray-600",
                                  children: e.merchantAgentsPanel.guide0Desc,
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    Cb = ce.lazy(() => we(() => Promise.resolve().then(() => ww), void 0)),
    _b = ({ loading: e }) =>
      i.jsx("div", { className: "p-6 text-sm text-gray-500", children: e }),
    Rb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe();
            return i.jsxs("div", {
              className: "max-w-5xl",
              children: [
                i.jsx("h1", {
                  className: "mb-4 text-xl font-semibold text-gray-900",
                  children: e.trustCenter.title,
                }),
                i.jsx(N.Suspense, {
                  fallback: i.jsx(_b, { loading: e.trustCenter.loading }),
                  children: i.jsx(Cb, {}),
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    jb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    Nb = (e) => {
      try {
        return jb.format(new Date(e));
      } catch {
        return e;
      }
    },
    Ab = {
      SHOPIFY: "bg-blue-100 text-blue-700",
      WOO: "bg-orange-100 text-orange-700",
      ACP: "bg-purple-100 text-purple-700",
    },
    Eb = {
      paid: "bg-green-100 text-green-700",
      fulfilled: "bg-teal-100 text-teal-700",
      cancelled: "bg-red-100 text-red-700",
      pending: "bg-gray-100 text-gray-600",
      created: "bg-gray-100 text-gray-600",
      updated: "bg-gray-100 text-gray-600",
      refunded: "bg-yellow-100 text-yellow-700",
    },
    of = ({ label: e, classes: t }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t}`,
        children: e,
      }),
    Tb = () =>
      i.jsx("tr", {
        children: Array.from({ length: 5 }).map((e, t) =>
          i.jsx(
            "td",
            {
              className: "px-4 py-3",
              children: i.jsx("div", {
                className: "h-4 animate-pulse rounded bg-gray-100",
              }),
            },
            t
          )
        ),
      }),
    Pb = (e) => {
      const t = new URLSearchParams({ limit: "20" });
      return (
        e !== null && t.set("cursor", e),
        `/v1/embed/merchant/orders?${t.toString()}`
      );
    },
    Ob = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(null),
              [n, a] = N.useState([]),
              s = Pb(t),
              {
                data: o,
                isLoading: l,
                isError: c,
                error: u,
              } = ye({
                queryKey: ["merchant-orders", t],
                queryFn: () => ne.get(s, Ph),
                placeholderData: (f) => f,
              });
            ce.useEffect(() => {
              o?.items &&
                a(
                  t === null
                    ? o.items
                    : (f) => {
                        const m = new Set(f.map((x) => x.id));
                        return [...f, ...o.items.filter((x) => !m.has(x.id))];
                      }
                );
            }, [o, t]);
            const p = n.length > 0 ? n : (o?.items ?? []);
            return i.jsxs("div", {
              className: "p-6 max-w-5xl",
              children: [
                c &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.merchantOrders.errorLoading,
                      " ",
                      u instanceof Error ? u.message : e.common.errorUnknown,
                    ],
                  }),
                i.jsx("div", {
                  className:
                    "overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: i.jsxs("table", {
                    className: "min-w-full divide-y divide-gray-200 text-sm",
                    "aria-label": e.merchantOrders.tableLabel,
                    children: [
                      i.jsx("thead", {
                        children: i.jsxs("tr", {
                          className:
                            "text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                          children: [
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantOrders.colPlatform,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantOrders.colOrderId,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantOrders.colStatus,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantOrders.colTotal,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.merchantOrders.colDate,
                            }),
                          ],
                        }),
                      }),
                      i.jsxs("tbody", {
                        className: "divide-y divide-gray-100",
                        children: [
                          l &&
                            Array.from({ length: 5 }).map((f, m) =>
                              i.jsx(Tb, {}, m)
                            ),
                          !l &&
                            p.map((f) =>
                              i.jsxs(
                                "tr",
                                {
                                  className: "hover:bg-gray-50",
                                  children: [
                                    i.jsx("td", {
                                      className: "px-4 py-3",
                                      children: i.jsx(of, {
                                        label: f.platform,
                                        classes:
                                          Ab[f.platform] ??
                                          "bg-gray-100 text-gray-700",
                                      }),
                                    }),
                                    i.jsx("td", {
                                      className:
                                        "px-4 py-3 font-mono text-xs text-gray-700",
                                      children:
                                        f.externalOrderId.length > 16
                                          ? `${f.externalOrderId.slice(0, 16)}…`
                                          : f.externalOrderId,
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-3",
                                      children: i.jsx(of, {
                                        label: f.status,
                                        classes:
                                          Eb[f.status] ??
                                          "bg-gray-100 text-gray-600",
                                      }),
                                    }),
                                    i.jsxs("td", {
                                      className: "px-4 py-3 text-gray-700",
                                      children: [
                                        f.total.amount,
                                        " ",
                                        f.total.currency,
                                      ],
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-3 text-gray-500",
                                      children: Nb(f.createdAt),
                                    }),
                                  ],
                                },
                                f.id
                              )
                            ),
                          !l &&
                            p.length === 0 &&
                            !c &&
                            i.jsx("tr", {
                              children: i.jsx("td", {
                                colSpan: 5,
                                className:
                                  "px-4 py-6 text-center text-sm text-gray-500",
                                children: e.merchantOrders.noOrders,
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                o?.nextCursor !== null &&
                  o?.nextCursor !== void 0 &&
                  i.jsx("div", {
                    className: "mt-4 flex justify-center",
                    children: i.jsx("button", {
                      onClick: () => {
                        o.nextCursor !== null && r(o.nextCursor);
                      },
                      className:
                        "rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      children: e.merchantOrders.loadMore,
                    }),
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    Lb = {
      "stripe-connect": "Stripe Connect",
      x402: "x402",
      acp: "ACP",
      paypal: "PayPal",
      eidas: "eIDAS",
    },
    Db = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              {
                data: t,
                isLoading: r,
                isError: n,
                error: a,
              } = ye({
                queryKey: ["merchant-checkout-config"],
                queryFn: () => ne.get("/v1/embed/merchant/checkout/config", Dh),
              }),
              s = new Set(
                (t?.rules ?? []).filter((l) => l.enabled).map((l) => l.rail)
              ),
              o =
                (t?.railsPriority?.length ?? 0) > 0
                  ? (t?.railsPriority ?? [])
                  : (t?.rules ?? []).map((l) => l.rail);
            return i.jsxs("div", {
              className: "p-6 max-w-2xl",
              children: [
                i.jsx("p", {
                  className: "mb-5 text-sm text-gray-500",
                  children: e.merchantCheckoutConfig.description,
                }),
                n &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.merchantCheckoutConfig.errorLoading,
                      " ",
                      a instanceof Error ? a.message : e.common.errorUnknown,
                    ],
                  }),
                r &&
                  i.jsx("div", {
                    className: "space-y-3",
                    role: "status",
                    "aria-label": e.merchantCheckoutConfig.ariaLoading,
                    children: Array.from({ length: 5 }).map((l, c) =>
                      i.jsx(
                        "div",
                        {
                          className:
                            "h-12 animate-pulse rounded-lg bg-gray-100",
                        },
                        c
                      )
                    ),
                  }),
                !r &&
                  !n &&
                  i.jsx("ul", {
                    className: "space-y-3",
                    "aria-label": e.merchantCheckoutConfig.railsAriaLabel,
                    children: o.map((l) => {
                      const c = s.has(l);
                      return i.jsxs(
                        "li",
                        {
                          className:
                            "flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm",
                          children: [
                            i.jsx("span", {
                              className: "font-medium text-gray-800",
                              children: Lb[l] ?? l,
                            }),
                            i.jsx("span", {
                              className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${c ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`,
                              children: c
                                ? e.merchantCheckoutConfig.enabled
                                : e.merchantCheckoutConfig.disabled,
                            }),
                          ],
                        },
                        l
                      );
                    }),
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    Ib = {
      active: "bg-green-100 text-green-700",
      expiring_soon: "bg-yellow-100 text-yellow-700",
      expired: "bg-red-100 text-red-700",
      pending: "bg-gray-100 text-gray-500",
      not_applicable: "bg-gray-50 text-gray-400",
    },
    Mb = {
      idle: "bg-gray-100 text-gray-600",
      indexing: "bg-blue-100 text-blue-700",
      error: "bg-red-100 text-red-700",
      never_indexed: "bg-gray-50 text-gray-400",
    },
    Fb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    lf = (e) => {
      if (e === null) return "—";
      try {
        return Fb.format(new Date(e));
      } catch {
        return e;
      }
    },
    la = ({ title: e, children: t }) =>
      i.jsxs("div", {
        className: "rounded-lg border border-gray-200 bg-white p-5 shadow-sm",
        children: [
          i.jsx("h3", {
            className: "mb-4 text-base font-semibold text-gray-900",
            children: e,
          }),
          t,
        ],
      }),
    ru = ({ label: e, classes: t }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t}`,
        children: e,
      }),
    nu = () =>
      i.jsx("div", { className: "h-40 animate-pulse rounded-lg bg-gray-100" }),
    zb = ({ t: e }) => {
      const {
        data: t,
        isLoading: r,
        isError: n,
      } = ye({
        queryKey: ["merchant-certification"],
        queryFn: () => ne.get("/v1/embed/merchant/certification", _v),
      });
      if (r) return i.jsx(nu, {});
      if (n)
        return i.jsx(la, {
          title: e.merchantCertNlweb.certTitle,
          children: i.jsx("p", {
            className: "text-sm text-red-600",
            children: e.merchantCertNlweb.errorCert,
          }),
        });
      const a = [
        { key: "eidas", label: "eIDAS" },
        { key: "kyc", label: "KYC" },
        { key: "schemaOrg", label: "Schema.org" },
      ];
      return i.jsx(la, {
        title: e.merchantCertNlweb.certTitle,
        children: i.jsx("ul", {
          className: "space-y-3",
          children: a.map(({ key: s, label: o }) => {
            const l = t?.[s],
              c = e.merchantCertNlweb.certStatusLabels,
              u = l?.status ?? "";
            return i.jsxs(
              "li",
              {
                className: "flex items-center justify-between",
                children: [
                  i.jsx("span", {
                    className: "text-sm text-gray-700",
                    children: o,
                  }),
                  i.jsx(ru, {
                    label: c[u] ?? (u || "—"),
                    classes: Ib[u] ?? "bg-gray-100 text-gray-500",
                  }),
                ],
              },
              s
            );
          }),
        }),
      });
    },
    qb = ({ onToast: e, t }) => {
      const {
          data: r,
          isLoading: n,
          isError: a,
        } = ye({
          queryKey: ["merchant-nlweb-status"],
          queryFn: () => ne.get("/v1/embed/merchant/nlweb/status", Av),
        }),
        s = xt({
          mutationFn: () => ne.post("/v1/embed/merchant/nlweb/reindex", {}, Ev),
          onSuccess: () =>
            e(t.merchantCertNlweb.nlwebReindexSuccess, "success"),
          onError: (o) => {
            const l =
              o instanceof Error
                ? o.message
                : t.merchantCertNlweb.nlwebReindexError;
            e(l, "error");
          },
        });
      return n
        ? i.jsx(nu, {})
        : a
          ? i.jsx(la, {
              title: t.merchantCertNlweb.nlwebTitle,
              children: i.jsx("p", {
                className: "text-sm text-red-600",
                children: t.merchantCertNlweb.errorNlweb,
              }),
            })
          : i.jsxs(la, {
              title: t.merchantCertNlweb.nlwebTitle,
              children: [
                i.jsxs("div", {
                  className: "space-y-3 text-sm",
                  children: [
                    i.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        i.jsx("span", {
                          className: "text-gray-600",
                          children: t.merchantCertNlweb.nlwebStatus,
                        }),
                        i.jsx(ru, {
                          label:
                            t.merchantCertNlweb.nlwebStatusLabels[
                              r?.status ?? ""
                            ] ??
                            (r?.status || "—"),
                          classes:
                            Mb[r?.status ?? ""] ?? "bg-gray-100 text-gray-500",
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        i.jsx("span", {
                          className: "text-gray-600",
                          children: t.merchantCertNlweb.nlwebLastIndex,
                        }),
                        i.jsx("span", {
                          className: "text-gray-700",
                          children: lf(r?.lastIndexedAt ?? null),
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "flex items-center justify-between",
                      children: [
                        i.jsx("span", {
                          className: "text-gray-600",
                          children: t.merchantCertNlweb.nlwebProductsIndexed,
                        }),
                        i.jsx("span", {
                          className: "text-gray-700",
                          children: r?.productsIndexed ?? 0,
                        }),
                      ],
                    }),
                    r?.lastError !== null &&
                      r?.lastError !== void 0 &&
                      i.jsx("p", {
                        className: "text-xs text-red-600",
                        children: r.lastError,
                      }),
                  ],
                }),
                i.jsx("button", {
                  onClick: () => s.mutate(),
                  disabled: s.isPending || r?.status === "indexing",
                  className:
                    "mt-4 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60",
                  children: s.isPending
                    ? t.merchantCertNlweb.nlwebReindexing
                    : t.merchantCertNlweb.nlwebReindex,
                }),
              ],
            });
    },
    Bb = ({ t: e }) => {
      const {
        data: t,
        isLoading: r,
        isError: n,
      } = ye({
        queryKey: ["merchant-webmcp"],
        queryFn: () => ne.get("/v1/embed/merchant/webmcp", jv),
      });
      return r
        ? i.jsx(nu, {})
        : n
          ? i.jsx(la, {
              title: e.merchantCertNlweb.webmcpTitle,
              children: i.jsx("p", {
                className: "text-sm text-red-600",
                children: e.merchantCertNlweb.errorWebmcp,
              }),
            })
          : i.jsx(la, {
              title: e.merchantCertNlweb.webmcpTitle,
              children: i.jsxs("div", {
                className: "space-y-3 text-sm",
                children: [
                  i.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      i.jsx("span", {
                        className: "text-gray-600",
                        children: e.merchantCertNlweb.webmcpStatus,
                      }),
                      i.jsx(ru, {
                        label: t?.enabled
                          ? e.merchantCertNlweb.webmcpEnabled
                          : e.merchantCertNlweb.webmcpDisabled,
                        classes: t?.enabled
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-500",
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      i.jsx("span", {
                        className: "text-gray-600",
                        children: e.merchantCertNlweb.webmcpAdapter,
                      }),
                      i.jsx("span", {
                        className: "text-gray-700",
                        children: t?.detectedAdapter ?? "—",
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "flex items-center justify-between",
                    children: [
                      i.jsx("span", {
                        className: "text-gray-600",
                        children: e.merchantCertNlweb.webmcpLastConnection,
                      }),
                      i.jsx("span", {
                        className: "text-gray-700",
                        children: lf(t?.bridgeLastSeenAt ?? null),
                      }),
                    ],
                  }),
                ],
              }),
            });
    },
    Ub = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState([]),
              n = N.useRef(0),
              a = N.useCallback((s, o) => {
                const l = ++n.current;
                (r((c) => [...c, { id: l, message: s, type: o }]),
                  setTimeout(() => {
                    r((c) => c.filter((u) => u.id !== l));
                  }, 5e3));
              }, []);
            return i.jsxs("div", {
              className: "p-6 max-w-2xl",
              children: [
                i.jsx("div", {
                  className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
                  "aria-label": e.merchantCertNlweb.notifications,
                  children: t.map((s) =>
                    i.jsxs(
                      "div",
                      {
                        role: "status",
                        "aria-live": "polite",
                        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${s.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: [
                          i.jsx("span", { children: s.message }),
                          i.jsx("button", {
                            onClick: () =>
                              r((o) => o.filter((l) => l.id !== s.id)),
                            className: "ml-4 opacity-80 hover:opacity-100",
                            "aria-label": e.merchantCertNlweb.closeNotification,
                            children: "✕",
                          }),
                        ],
                      },
                      s.id
                    )
                  ),
                }),
                i.jsxs("div", {
                  className: "flex flex-col gap-4",
                  children: [
                    i.jsx(zb, { t: e }),
                    i.jsx(qb, { onToast: a, t: e }),
                    i.jsx(Bb, { t: e }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    $b = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    Vb = (e) => {
      try {
        return $b.format(new Date(e));
      } catch {
        return e;
      }
    },
    Kb = {
      discovery: "bg-blue-50 text-blue-700",
      customer: "bg-purple-50 text-purple-700",
      checkout: "bg-green-50 text-green-700",
    },
    Wb = () =>
      i.jsx("tr", {
        children: Array.from({ length: 5 }).map((e, t) =>
          i.jsx(
            "td",
            {
              className: "py-2 pr-4",
              children: i.jsx("div", {
                className: "h-4 animate-pulse rounded bg-gray-100",
              }),
            },
            t
          )
        ),
      }),
    Hb = (e, t, r, n, a) => {
      const s = new URLSearchParams();
      return (
        s.set("limit", "20"),
        e && s.set("agentId", e),
        t !== "todos" && s.set("bucket", t),
        r && s.set("from", new Date(r).toISOString()),
        n && s.set("to", new Date(n).toISOString()),
        a && s.set("cursor", a),
        `/v1/embed/trust/receipts?${s.toString()}`
      );
    },
    Qb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: ({ onSelect: e }) => {
            const t = xe(),
              r = {
                discovery: t.trustReceiptsList.bucketDiscovery,
                customer: t.trustReceiptsList.bucketCustomer,
                checkout: t.trustReceiptsList.bucketCheckout,
              },
              n = ({ bucket: S }) =>
                i.jsx("span", {
                  className: `rounded-full px-2 py-0.5 text-xs font-medium ${Kb[S] ?? "bg-gray-100 text-gray-700"}`,
                  children: r[S] ?? S,
                }),
              [a, s] = N.useState(""),
              [o, l] = N.useState("todos"),
              [c, u] = N.useState(""),
              [p, f] = N.useState(""),
              [m, x] = N.useState(null),
              [v, b] = N.useState([]),
              C = Hb(a, o, c, p, m),
              {
                data: g,
                isLoading: d,
                isError: y,
                error: w,
              } = ye({
                queryKey: ["trust-receipts", a, o, c, p, m],
                queryFn: () => ne.get(C, cv),
                placeholderData: (S) => S,
              }),
              _ = N.useCallback((S, O) => {
                (S(O), x(null), b([]));
              }, []),
              A = N.useCallback((S) => {
                (l(S), x(null), b([]));
              }, []);
            ce.useEffect(() => {
              g?.items &&
                b(
                  m === null
                    ? g.items
                    : (S) => {
                        const O = new Set(S.map((J) => J.id)),
                          $ = g.items.filter((J) => !O.has(J.id));
                        return [...S, ...$];
                      }
                );
            }, [g, m]);
            const R = () => {
                g?.nextCursor && x(g.nextCursor);
              },
              T = v.length > 0 ? v : (g?.items ?? []);
            return i.jsxs("div", {
              className: "p-6 max-w-4xl",
              children: [
                i.jsx("div", {
                  className:
                    "mb-3 rounded-lg border border-blue-100 bg-blue-50 px-5 py-4",
                  children: i.jsx("p", {
                    className: "text-sm leading-relaxed text-blue-800",
                    children: t.trustReceiptsList.description,
                  }),
                }),
                i.jsx("div", {
                  className:
                    "mb-3 rounded-lg border border-green-100 bg-green-50 px-5 py-4",
                  children: i.jsx("p", {
                    className: "text-sm leading-relaxed text-green-800",
                    children: t.trustReceiptsList.pacoBenefits,
                  }),
                }),
                i.jsx("div", {
                  className:
                    "mb-3 rounded-lg border border-amber-100 bg-amber-50 px-5 py-4",
                  children: i.jsx("p", {
                    className: "text-sm leading-relaxed text-amber-800",
                    children: t.trustReceiptsList.pacoRegulation,
                  }),
                }),
                i.jsx("div", {
                  className: "mb-5 text-right",
                  children: i.jsxs("a", {
                    href: "https://trusteed.xyz/es/trust/trust-receipt",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className:
                      "text-sm text-indigo-600 underline hover:text-indigo-800",
                    children: [t.trustReceiptsList.learnMore, " →"],
                  }),
                }),
                i.jsxs("div", {
                  className: "mb-4 flex flex-wrap gap-3",
                  children: [
                    i.jsx("input", {
                      type: "text",
                      placeholder: t.trustReceiptsList.filterBuyerId,
                      value: a,
                      onChange: (S) => _(s, S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterBuyerIdAria,
                    }),
                    i.jsxs("select", {
                      value: o,
                      onChange: (S) => A(S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterTypeAria,
                      children: [
                        i.jsx("option", {
                          value: "todos",
                          children: t.trustReceiptsList.filterTypeTodos,
                        }),
                        i.jsx("option", {
                          value: "discovery",
                          children: t.trustReceiptsList.filterTypeDiscovery,
                        }),
                        i.jsx("option", {
                          value: "customer",
                          children: t.trustReceiptsList.filterTypeCustomer,
                        }),
                        i.jsx("option", {
                          value: "checkout",
                          children: t.trustReceiptsList.filterTypeCheckout,
                        }),
                      ],
                    }),
                    i.jsx("input", {
                      type: "date",
                      value: c,
                      onChange: (S) => _(u, S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterDateFrom,
                    }),
                    i.jsx("input", {
                      type: "date",
                      value: p,
                      onChange: (S) => _(f, S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterDateTo,
                    }),
                  ],
                }),
                y &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      t.trustReceiptsList.errorLoading,
                      " ",
                      w instanceof Error ? w.message : t.common.errorUnknown,
                    ],
                  }),
                i.jsx("div", {
                  className:
                    "overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: i.jsxs("table", {
                    className: "min-w-full divide-y divide-gray-200 text-sm",
                    "aria-label": t.trustReceiptsList.tableLabel,
                    children: [
                      i.jsx("thead", {
                        children: i.jsxs("tr", {
                          className:
                            "text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                          children: [
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: t.trustReceiptsList.colNumber,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: t.trustReceiptsList.colOperation,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: t.trustReceiptsList.colType,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: t.trustReceiptsList.colBuyer,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: t.trustReceiptsList.colDate,
                            }),
                          ],
                        }),
                      }),
                      i.jsxs("tbody", {
                        className: "divide-y divide-gray-100",
                        children: [
                          d &&
                            Array.from({ length: 5 }).map((S, O) =>
                              i.jsx(Wb, {}, O)
                            ),
                          !d &&
                            T.map((S) =>
                              i.jsxs(
                                "tr",
                                {
                                  onClick: () => e(S),
                                  className:
                                    "cursor-pointer hover:bg-gray-50 transition-colors",
                                  tabIndex: 0,
                                  onKeyDown: (O) => {
                                    (O.key === "Enter" || O.key === " ") &&
                                      e(S);
                                  },
                                  children: [
                                    i.jsxs("td", {
                                      className:
                                        "px-4 py-2 font-mono text-xs text-gray-700",
                                      children: [S.id.slice(0, 12), "..."],
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: S.tool,
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2",
                                      children: i.jsx(n, { bucket: S.bucket }),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: S.agentId,
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-500",
                                      children: Vb(S.createdAt),
                                    }),
                                  ],
                                },
                                S.id
                              )
                            ),
                          !d &&
                            T.length === 0 &&
                            !y &&
                            i.jsx("tr", {
                              children: i.jsx("td", {
                                colSpan: 5,
                                className:
                                  "px-4 py-6 text-center text-sm text-gray-500",
                                children: t.trustReceiptsList.noEntries,
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                g?.nextCursor &&
                  i.jsx("div", {
                    className: "mt-4 flex justify-center",
                    children: i.jsx("button", {
                      onClick: R,
                      className:
                        "rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      children: t.trustReceiptsList.loadMore,
                    }),
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    );
  async function Zb() {
    const e = await oa.getToken();
    if (e !== null) return e;
    try {
      return await oa.refresh();
    } catch {
      return null;
    }
  }
  function Gb(e, t) {
    const r = URL.createObjectURL(e),
      n = document.createElement("a");
    ((n.href = r),
      (n.download = t),
      document.body.appendChild(n),
      n.click(),
      n.remove(),
      URL.revokeObjectURL(r));
  }
  const Yb = ({ receiptId: e }) => {
      const t = xe(),
        [r, n] = N.useState(!1),
        [a, s] = N.useState(null),
        o = N.useCallback(async () => {
          (n(!0), s(null));
          try {
            const l = await Zb(),
              c = await fetch(
                `${Bv()}/v1/embed/trust/export/${encodeURIComponent(e)}`,
                {
                  method: "GET",
                  headers: {
                    "X-Embed-Source": Uh(),
                    ...(l ? { Authorization: `Bearer ${l}` } : {}),
                  },
                }
              );
            if (c.status === 400) {
              s(t.trustReceiptDetail.downloadErrorV10);
              return;
            }
            if (c.status === 409) {
              s(t.trustReceiptDetail.downloadErrorLegacy);
              return;
            }
            if (!c.ok) {
              s(t.trustReceiptDetail.downloadErrorGeneric);
              return;
            }
            const u = await c.blob();
            Gb(u, `trust-receipt-${e}.zip`);
          } catch {
            s(t.trustReceiptDetail.downloadErrorGeneric);
          } finally {
            n(!1);
          }
        }, [e, t]);
      return i.jsxs("div", {
        className: "space-y-2",
        children: [
          i.jsx("button", {
            onClick: () => {
              o();
            },
            disabled: r,
            className:
              "w-full rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60",
            children: r
              ? t.trustReceiptDetail.downloading
              : t.trustReceiptDetail.downloadBundle,
          }),
          i.jsx("p", {
            className: "text-xs text-gray-500",
            children: t.trustReceiptDetail.downloadHint,
          }),
          a
            ? i.jsx("p", {
                className: "text-xs text-red-700",
                role: "alert",
                children: a,
              })
            : null,
        ],
      });
    },
    Xb = (() => {
      try {
        const e = window;
        return (
          e.__AMCP_CONFIG__?.locale ??
          e.__AMCP_PS_CONFIG__?.locale ??
          navigator.language ??
          "en"
        )
          .split(/[-_]/)[0]
          .toLowerCase() === "es"
          ? "es-ES"
          : "en-GB";
      } catch {
        return "en-GB";
      }
    })(),
    Jb = new Intl.DateTimeFormat(Xb, {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "UTC",
    }),
    ew = (e) => {
      try {
        return `${Jb.format(new Date(e))} UTC`;
      } catch {
        return e;
      }
    },
    tw = {
      discovery: "bg-blue-50 text-blue-700",
      customer: "bg-purple-50 text-purple-700",
      checkout: "bg-green-50 text-green-700",
    },
    Lr = ({ label: e, value: t }) =>
      i.jsxs("div", {
        className: "py-2",
        children: [
          i.jsx("dt", {
            className:
              "text-xs font-medium uppercase tracking-wide text-gray-500",
            children: e,
          }),
          i.jsx("dd", {
            className: "mt-1 text-sm text-gray-900 break-all",
            children: t,
          }),
        ],
      }),
    rw = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: ({ receipt: e, onClose: t }) => {
            const r = xe(),
              [n, a] = N.useState(!1),
              [s, o] = N.useState(!1),
              l = N.useRef(null);
            N.useEffect(() => {
              const p = (f) => {
                f.key === "Escape" && t();
              };
              return (
                document.addEventListener("keydown", p),
                () => document.removeEventListener("keydown", p)
              );
            }, [t]);
            const c = N.useCallback(
                (p) => {
                  l.current && !l.current.contains(p.target) && t();
                },
                [t]
              ),
              u = N.useCallback(async () => {
                try {
                  (await navigator.clipboard.writeText(e.jwksSnapshotUrl ?? ""),
                    o(!0),
                    setTimeout(() => o(!1), 2e3));
                } catch {}
              }, [e.jwksSnapshotUrl]);
            return i.jsx("div", {
              className: "fixed inset-0 z-50 flex justify-end bg-black/30",
              onClick: c,
              "aria-modal": "true",
              role: "dialog",
              "aria-label": r.trustReceiptDetail.ariaLabel,
              children: i.jsxs("div", {
                ref: l,
                className:
                  "h-full w-full max-w-md overflow-y-auto bg-white shadow-xl",
                children: [
                  i.jsxs("div", {
                    className:
                      "flex items-center justify-between border-b border-gray-200 px-6 py-4",
                    children: [
                      i.jsx("h2", {
                        className: "text-lg font-semibold text-gray-900",
                        children: r.trustReceiptDetail.title,
                      }),
                      i.jsx("button", {
                        onClick: t,
                        className:
                          "rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        "aria-label": r.trustReceiptDetail.closeAriaLabel,
                        children: i.jsx("svg", {
                          className: "h-5 w-5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          strokeWidth: 2,
                          children: i.jsx("path", {
                            strokeLinecap: "round",
                            strokeLinejoin: "round",
                            d: "M6 18L18 6M6 6l12 12",
                          }),
                        }),
                      }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "px-6 py-4",
                    children: [
                      i.jsxs("dl", {
                        className: "divide-y divide-gray-100",
                        children: [
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldReceiptId,
                            value: e.id,
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldBucket,
                            value: i.jsx("span", {
                              className: `inline-block rounded-full px-2 py-0.5 text-xs font-medium ${tw[e.bucket] ?? "bg-gray-100 text-gray-700"}`,
                              children: e.bucket,
                            }),
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldTool,
                            value: e.tool,
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldAgentId,
                            value: e.agentId,
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldSigningKey,
                            value: e.signingKeyKid,
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldDate,
                            value: ew(e.createdAt),
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldInputHash,
                            value: i.jsx("span", {
                              className: "font-mono text-xs",
                              children: e.inputHash,
                            }),
                          }),
                          i.jsx(Lr, {
                            label: r.trustReceiptDetail.fieldOutputHash,
                            value: i.jsx("span", {
                              className: "font-mono text-xs",
                              children: e.outputHash,
                            }),
                          }),
                        ],
                      }),
                      i.jsxs("div", {
                        className: "mt-4",
                        children: [
                          i.jsx("button", {
                            onClick: () => a((p) => !p),
                            className:
                              "text-sm text-blue-600 underline hover:text-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            children: n
                              ? r.trustReceiptDetail.hideJws
                              : r.trustReceiptDetail.showJws,
                          }),
                          n &&
                            i.jsxs("pre", {
                              className:
                                "mt-2 overflow-auto rounded bg-gray-50 p-3 text-xs text-gray-700 max-h-48",
                              children: [
                                e.jws.slice(0, 300),
                                e.jws.length > 300 ? "..." : "",
                              ],
                            }),
                        ],
                      }),
                      e.jwksSnapshotUrl &&
                        i.jsx("div", {
                          className: "mt-4",
                          children: i.jsx("button", {
                            onClick: () => {
                              u();
                            },
                            className:
                              "rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                            children: s
                              ? r.trustReceiptDetail.copied
                              : r.trustReceiptDetail.copyJwksUrl,
                          }),
                        }),
                    ],
                  }),
                  i.jsxs("div", {
                    className: "space-y-3 border-t border-gray-200 px-6 py-4",
                    children: [
                      i.jsx(Yb, { receiptId: e.id }),
                      i.jsx("button", {
                        onClick: t,
                        className:
                          "w-full rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                        children: r.trustReceiptDetail.closeBtn,
                      }),
                    ],
                  }),
                ],
              }),
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    nw = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "medium",
      timeZone: "UTC",
    }),
    aw = (e) => {
      if (!e) return "—";
      try {
        return nw.format(new Date(e));
      } catch {
        return e;
      }
    },
    sw = ({ ariaLabel: e }) =>
      i.jsx("div", {
        className: "h-24 animate-pulse rounded-lg bg-gray-100",
        role: "status",
        "aria-label": e,
      }),
    iw = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              {
                data: t,
                isLoading: r,
                isError: n,
                error: a,
              } = ye({
                queryKey: ["trust-keys"],
                queryFn: async () => {
                  try {
                    return await ne.get("/v1/embed/trust/keys", ys);
                  } catch (l) {
                    if (l instanceof At && l.status === 404) return null;
                    throw l;
                  }
                },
                retry: !1,
              }),
              s = !r && !n && t === null,
              o = (t?.daysSinceRotation ?? 0) > 90;
            return i.jsxs("div", {
              className: "p-6 max-w-2xl",
              children: [
                i.jsx("div", {
                  className:
                    "mb-5 rounded-lg border border-green-100 bg-green-50 px-5 py-4",
                  children: i.jsx("p", {
                    className: "text-sm leading-relaxed text-green-800",
                    children: e.trustKeys.description,
                  }),
                }),
                r && i.jsx(sw, { ariaLabel: e.trustKeys.ariaLoading }),
                n &&
                  i.jsxs("div", {
                    className:
                      "rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.trustKeys.errorLoading,
                      " ",
                      a instanceof Error ? a.message : e.common.errorUnknown,
                    ],
                  }),
                s &&
                  i.jsxs("div", {
                    className:
                      "rounded-lg border border-blue-100 bg-blue-50 px-5 py-4",
                    role: "status",
                    children: [
                      i.jsx("p", {
                        className: "text-sm font-semibold text-blue-900",
                        children: e.trustKeys.notActivatedTitle,
                      }),
                      i.jsx("p", {
                        className: "mt-1 text-sm text-blue-800",
                        children: e.trustKeys.notActivatedDesc,
                      }),
                    ],
                  }),
                t &&
                  i.jsxs(i.Fragment, {
                    children: [
                      o &&
                        i.jsx("div", {
                          className:
                            "mb-4 rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                          role: "status",
                          children: e.trustKeys.overdueWarning.replace(
                            "{{days}}",
                            String(t.daysSinceRotation)
                          ),
                        }),
                      i.jsxs("div", {
                        className:
                          "mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm",
                        children: [
                          i.jsx("h3", {
                            className:
                              "mb-3 text-base font-semibold text-gray-900",
                            children: e.trustKeys.activeKeyTitle,
                          }),
                          i.jsxs("dl", {
                            className: "space-y-2 text-sm",
                            children: [
                              i.jsxs("div", {
                                className: "flex gap-2",
                                children: [
                                  i.jsx("dt", {
                                    className:
                                      "w-40 shrink-0 font-medium text-gray-500",
                                    children: e.trustKeys.fieldIdentifier,
                                  }),
                                  i.jsx("dd", {
                                    className: "font-mono text-gray-900",
                                    children: t.activeKid,
                                  }),
                                ],
                              }),
                              i.jsxs("div", {
                                className: "flex gap-2",
                                children: [
                                  i.jsx("dt", {
                                    className:
                                      "w-40 shrink-0 font-medium text-gray-500",
                                    children: e.trustKeys.fieldLastRenewal,
                                  }),
                                  i.jsx("dd", {
                                    className: "text-gray-900",
                                    children: aw(t.lastRotatedAt),
                                  }),
                                ],
                              }),
                              i.jsxs("div", {
                                className: "flex gap-2",
                                children: [
                                  i.jsx("dt", {
                                    className:
                                      "w-40 shrink-0 font-medium text-gray-500",
                                    children: e.trustKeys.fieldDaysActive,
                                  }),
                                  i.jsx("dd", {
                                    className: "text-gray-900",
                                    children:
                                      t.daysSinceRotation !== null
                                        ? `${t.daysSinceRotation} ${e.trustKeys.fieldDaysActiveSuffix}`
                                        : "—",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      t.retiredGraceKids.length > 0 &&
                        i.jsxs("div", {
                          className:
                            "rounded-lg border border-gray-200 bg-white shadow-sm",
                          children: [
                            i.jsx("div", {
                              className: "border-b border-gray-100 px-5 py-3",
                              children: i.jsx("h3", {
                                className:
                                  "text-sm font-semibold text-gray-900",
                                children: e.trustKeys.retiredKeysTitle,
                              }),
                            }),
                            i.jsxs("table", {
                              className: "min-w-full text-sm",
                              "aria-label": e.trustKeys.retiredKeysAriaLabel,
                              children: [
                                i.jsx("thead", {
                                  children: i.jsx("tr", {
                                    className:
                                      "text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                                    children: i.jsx("th", {
                                      className: "px-5 pb-2 pt-3",
                                      children:
                                        e.trustKeys.retiredColIdentifier,
                                    }),
                                  }),
                                }),
                                i.jsx("tbody", {
                                  className: "divide-y divide-gray-100",
                                  children: t.retiredGraceKids.map((l) =>
                                    i.jsx(
                                      "tr",
                                      {
                                        className: "hover:bg-gray-50",
                                        children: i.jsx("td", {
                                          className:
                                            "px-5 py-2 font-mono text-gray-700",
                                          children: l,
                                        }),
                                      },
                                      l
                                    )
                                  ),
                                }),
                              ],
                            }),
                          ],
                        }),
                    ],
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    ow = (() => {
      try {
        const e = window;
        return (
          e.__AMCP_CONFIG__?.locale ??
          e.__AMCP_PS_CONFIG__?.locale ??
          navigator.language ??
          "en"
        )
          .split(/[-_]/)[0]
          .toLowerCase() === "es"
          ? "es-ES"
          : "en-GB";
      } catch {
        return "en-GB";
      }
    })(),
    lw = new Intl.DateTimeFormat(ow, {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    cw = (e) => {
      try {
        return lw.format(new Date(e));
      } catch {
        return e;
      }
    },
    uw = {
      portal: "bg-gray-100 text-gray-700",
      "shopify-embed": "bg-green-50 text-green-700",
      "wp-embed": "bg-blue-50 text-blue-700",
      api: "bg-yellow-50 text-yellow-700",
      mcp: "bg-purple-50 text-purple-700",
      webhook: "bg-orange-50 text-orange-700",
    },
    dw = ({ source: e, t }) => {
      const r = t.trustAuditLog.sourceLabels;
      return i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${uw[e] ?? "bg-gray-100 text-gray-700"}`,
        children: r[e] ?? e,
      });
    },
    pw = new Set(["ok", "success", "allow", "token_refresh_seamless"]),
    mw = ({ outcome: e, t }) => {
      const r = pw.has(e),
        n = t.trustAuditLog.outcomeLabels;
      return i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${r ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`,
        children: n[e] ?? e,
      });
    },
    hw = () =>
      i.jsx("tr", {
        children: Array.from({ length: 6 }).map((e, t) =>
          i.jsx(
            "td",
            {
              className: "px-4 py-2",
              children: i.jsx("div", {
                className: "h-4 animate-pulse rounded bg-gray-100",
              }),
            },
            t
          )
        ),
      }),
    fw = (e, t, r, n, a) => {
      const s = new URLSearchParams();
      return (
        s.set("limit", "20"),
        e && s.set("agentId", e),
        t !== "todos" && s.set("source", t),
        r && s.set("from", new Date(r).toISOString()),
        n && s.set("to", new Date(n).toISOString()),
        a && s.set("cursor", a),
        `/v1/embed/trust/audit?${s.toString()}`
      );
    },
    gw = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(""),
              [n, a] = N.useState("todos"),
              [s, o] = N.useState(""),
              [l, c] = N.useState(""),
              [u, p] = N.useState(null),
              [f, m] = N.useState([]),
              x = fw(t, n, s, l, u),
              {
                data: v,
                isLoading: b,
                isError: C,
                error: g,
              } = ye({
                queryKey: ["trust-audit", t, n, s, l, u],
                queryFn: () => ne.get(x, jh),
                placeholderData: (R) => R,
              }),
              d = N.useCallback((R, T) => {
                (R(T), p(null), m([]));
              }, []),
              y = N.useCallback((R) => {
                (a(R), p(null), m([]));
              }, []);
            ce.useEffect(() => {
              v?.items &&
                m(
                  u === null
                    ? v.items
                    : (R) => {
                        const T = new Set(R.map((O) => O.id)),
                          S = v.items.filter((O) => !T.has(O.id));
                        return [...R, ...S];
                      }
                );
            }, [v, u]);
            const w = () => {
                v?.nextCursor && p(v.nextCursor);
              },
              _ = f.length > 0 ? f : (v?.items ?? []),
              A = v?.chainIntegrity;
            return i.jsxs("div", {
              className: "p-6 max-w-5xl",
              children: [
                i.jsx("div", {
                  className:
                    "mb-5 rounded-lg border border-amber-100 bg-amber-50 px-5 py-4",
                  children: i.jsx("p", {
                    className: "text-sm leading-relaxed text-amber-800",
                    children: e.trustAuditLog.bookDescription,
                  }),
                }),
                A &&
                  i.jsxs("div", {
                    className: `mb-4 flex items-center gap-2 rounded border px-4 py-2 text-sm ${A.verified ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-700"}`,
                    role: "status",
                    children: [
                      i.jsx("span", {
                        className: `inline-block h-2 w-2 rounded-full ${A.verified ? "bg-green-500" : "bg-red-500"}`,
                      }),
                      A.verified
                        ? e.trustAuditLog.integrityVerified
                        : e.trustAuditLog.integrityError,
                      A.note &&
                        i.jsxs("span", {
                          className: "ml-2 text-xs opacity-70",
                          children: ["(", A.note, ")"],
                        }),
                    ],
                  }),
                i.jsxs("div", {
                  className: "mb-4 flex flex-wrap gap-3",
                  children: [
                    i.jsx("input", {
                      type: "text",
                      placeholder: e.trustAuditLog.filterAgentId,
                      value: t,
                      onChange: (R) => d(r, R.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterAgentIdAria,
                    }),
                    i.jsxs("select", {
                      value: n,
                      onChange: (R) => y(R.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterSourceAria,
                      children: [
                        i.jsx("option", {
                          value: "todos",
                          children: e.trustAuditLog.filterSource,
                        }),
                        i.jsx("option", {
                          value: "portal",
                          children: e.trustAuditLog.filterSourcePortal,
                        }),
                        i.jsx("option", {
                          value: "shopify-embed",
                          children: e.trustAuditLog.filterSourceShopify,
                        }),
                        i.jsx("option", {
                          value: "wp-embed",
                          children: e.trustAuditLog.filterSourceWp,
                        }),
                        i.jsx("option", {
                          value: "api",
                          children: e.trustAuditLog.filterSourceApi,
                        }),
                        i.jsx("option", {
                          value: "mcp",
                          children: e.trustAuditLog.filterSourceMcp,
                        }),
                        i.jsx("option", {
                          value: "webhook",
                          children: e.trustAuditLog.filterSourceWebhook,
                        }),
                      ],
                    }),
                    i.jsx("input", {
                      type: "date",
                      value: s,
                      onChange: (R) => d(o, R.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterDateFrom,
                    }),
                    i.jsx("input", {
                      type: "date",
                      value: l,
                      onChange: (R) => d(c, R.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterDateTo,
                    }),
                  ],
                }),
                C &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.trustAuditLog.errorLoading,
                      " ",
                      g instanceof Error ? g.message : e.common.errorUnknown,
                    ],
                  }),
                i.jsx("div", {
                  className:
                    "overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm",
                  children: i.jsxs("table", {
                    className: "min-w-full divide-y divide-gray-200 text-sm",
                    "aria-label": e.trustAuditLog.tableLabel,
                    children: [
                      i.jsx("thead", {
                        children: i.jsxs("tr", {
                          className:
                            "text-left text-xs font-medium uppercase tracking-wide text-gray-500",
                          children: [
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.trustAuditLog.colDate,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.trustAuditLog.colSource,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.trustAuditLog.colBucket,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.trustAuditLog.colTool,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.trustAuditLog.colOutcome,
                            }),
                            i.jsx("th", {
                              className: "px-4 pb-3 pt-4",
                              children: e.trustAuditLog.colAgentId,
                            }),
                          ],
                        }),
                      }),
                      i.jsxs("tbody", {
                        className: "divide-y divide-gray-100",
                        children: [
                          b &&
                            Array.from({ length: 5 }).map((R, T) =>
                              i.jsx(hw, {}, T)
                            ),
                          !b &&
                            _.map((R) =>
                              i.jsxs(
                                "tr",
                                {
                                  className:
                                    "hover:bg-gray-50 transition-colors",
                                  children: [
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-500",
                                      children: cw(R.createdAt),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2",
                                      children: i.jsx(dw, {
                                        source: R.source,
                                        t: e,
                                      }),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: R.bucket ?? "—",
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: R.tool ?? "—",
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2",
                                      children: i.jsx(mw, {
                                        outcome: R.outcome,
                                        t: e,
                                      }),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: R.agentId ?? "—",
                                    }),
                                  ],
                                },
                                R.id
                              )
                            ),
                          !b &&
                            _.length === 0 &&
                            !C &&
                            i.jsx("tr", {
                              children: i.jsx("td", {
                                colSpan: 6,
                                className:
                                  "px-4 py-6 text-center text-sm text-gray-500",
                                children: e.trustAuditLog.noEntries,
                              }),
                            }),
                        ],
                      }),
                    ],
                  }),
                }),
                v?.nextCursor &&
                  i.jsx("div", {
                    className: "mt-4 flex justify-center",
                    children: i.jsx("button", {
                      onClick: w,
                      className:
                        "rounded border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      children: e.trustAuditLog.loadMore,
                    }),
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    yw = j({ activated: Oe(), kid: k() }),
    au = (() => {
      try {
        const e = window;
        return (
          e.__AMCP_CONFIG__?.locale ??
          e.__AMCP_PS_CONFIG__?.locale ??
          navigator.language ??
          "en"
        )
          .split(/[-_]/)[0]
          .toLowerCase() === "es"
          ? "es-ES"
          : "en-GB";
      } catch {
        return "en-GB";
      }
    })(),
    vw = new Intl.DateTimeFormat(au, {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    xw = (e, t) =>
      e == null
        ? {
            emoji: "⏳",
            color: "#8c9196",
            bg: "#f6f6f7",
            label: t.trustReceipts.scoreComputing,
          }
        : e >= 80
          ? {
              emoji: "🌟",
              color: "#1a7f4f",
              bg: "#e3f5ec",
              label: t.trustReceipts.scoreExcellent,
            }
          : e >= 50
            ? {
                emoji: "👍",
                color: "#b27400",
                bg: "#fff8ec",
                label: t.trustReceipts.scoreImprovable,
              }
            : {
                emoji: "⚠️",
                color: "#c0392b",
                bg: "#fff0ee",
                label: t.trustReceipts.scoreNeedsAttention,
              },
    cf = ({ name: e, value: t, weight: r, dataQuality: n, t: a }) => {
      const o = a.trustReceipts.subDim[e] ?? e.replace(/_/g, " "),
        l = n === "not_applicable" || t == null,
        c = l ? null : Math.min(100, Math.max(0, t)),
        u = l ? "⏳" : (c ?? 0) >= 80 ? "✅" : (c ?? 0) >= 50 ? "🟡" : "🔴",
        p = l
          ? "#8c9196"
          : (c ?? 0) >= 80
            ? "#1a7f4f"
            : (c ?? 0) >= 50
              ? "#b27400"
              : "#c0392b";
      return i.jsxs("div", {
        className:
          "flex items-center gap-2 border-b border-gray-50 py-1 text-xs",
        children: [
          i.jsx("span", { className: "shrink-0 text-sm", children: u }),
          i.jsx("span", { className: "flex-1 text-gray-600", children: o }),
          i.jsx("span", {
            className: "shrink-0 text-gray-400",
            children: a.trustReceipts.weightLabel.replace(
              "{{pct}}",
              String(Math.round(r * 100))
            ),
          }),
          i.jsx("span", {
            className: "min-w-[52px] shrink-0 text-right font-bold",
            style: { color: p },
            children: l ? a.trustReceipts.noDataLabel : `${c}/100`,
          }),
        ],
      });
    },
    bw = ({ name: e, dim: t, confidenceLevel: r, t: n }) => {
      const a = {
          merchantReliabilityBase: n.trustReceipts.dimMerchantReliability,
          agenticReadiness: n.trustReceipts.dimAgenticReadiness,
          agenticEvidence: n.trustReceipts.dimAgenticEvidence,
        },
        s = {
          merchantReliabilityBase: {
            cold_start: n.trustReceipts.unlockMerchantColdStart,
          },
          agenticEvidence: {
            cold_start: n.trustReceipts.unlockAgentColdStart,
            human_established: n.trustReceipts.unlockAgentHuman,
          },
        },
        o = t.dataQuality === "not_applicable",
        l = o ? 0 : Math.min(100, Math.max(0, t.value ?? 0)),
        c = a[e] ?? e.replace(/_/g, " "),
        u = l >= 80 ? "#007f5f" : l >= 50 ? "#ffc453" : "#d72c0d",
        p = t.subcomponents ? Object.entries(t.subcomponents) : [],
        f = s[e]?.[r] ?? n.trustReceipts.unlockAreaDefault;
      return i.jsxs("div", {
        className:
          "mb-5 border-b border-gray-100 pb-5 last:border-0 last:mb-0 last:pb-0",
        children: [
          i.jsxs("div", {
            className: "mb-2 flex items-center justify-between",
            children: [
              i.jsx("span", {
                className: "text-sm font-semibold",
                children: c,
              }),
              i.jsxs("div", {
                className: "flex items-center gap-2",
                children: [
                  !o &&
                    i.jsx("span", {
                      className: "text-xs text-gray-400",
                      children: n.trustReceipts.weightLabel.replace(
                        "{{pct}}",
                        String(Math.round(t.weight * 100))
                      ),
                    }),
                  i.jsx("span", {
                    className: "text-sm font-bold",
                    style: {
                      color: o
                        ? "#8c9196"
                        : l >= 80
                          ? "#1a7f4f"
                          : l >= 50
                            ? "#b27400"
                            : "#c0392b",
                    },
                    children: o ? n.trustReceipts.notApplicable : `${l}/100`,
                  }),
                ],
              }),
            ],
          }),
          o
            ? i.jsxs("div", {
                children: [
                  i.jsx("div", {
                    className:
                      "mb-2 rounded border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500",
                    children: f,
                  }),
                  p.length > 0 &&
                    i.jsxs("div", {
                      className:
                        "rounded border border-gray-200 bg-gray-50 px-3 py-2 opacity-50",
                      children: [
                        i.jsx("div", {
                          className:
                            "mb-1 text-xs font-bold uppercase tracking-wide text-gray-400",
                          children: n.trustReceipts.countWillActivate,
                        }),
                        p.map(([m, x]) =>
                          i.jsx(
                            cf,
                            {
                              name: m,
                              value: null,
                              weight: x.weight,
                              dataQuality: "not_applicable",
                              t: n,
                            },
                            m
                          )
                        ),
                      ],
                    }),
                ],
              })
            : i.jsxs(i.Fragment, {
                children: [
                  i.jsx("div", {
                    className: "mb-2 h-2 overflow-hidden rounded bg-gray-200",
                    children: i.jsx("div", {
                      className: "h-full transition-all",
                      style: { width: `${l}%`, background: u },
                    }),
                  }),
                  t.recommendations.length > 0 &&
                    i.jsx("div", {
                      className: "mb-2 rounded px-3 py-2 text-xs text-gray-700",
                      style: {
                        background:
                          l < 50 ? "#fff4f4" : l < 75 ? "#fff8e1" : "#f6f6f7",
                      },
                      children:
                        n.trustReceipts.recText[
                          t.recommendations[0].replace(/^rec\./, "")
                        ] ?? t.recommendations[0],
                    }),
                  p.length > 0 &&
                    i.jsxs("div", {
                      className:
                        "rounded border border-gray-200 bg-gray-50 px-3 py-2",
                      children: [
                        i.jsx("div", {
                          className:
                            "mb-1 text-xs font-bold uppercase tracking-wide text-gray-400",
                          children: n.trustReceipts.measuredNow,
                        }),
                        p.map(([m, x]) =>
                          i.jsx(
                            cf,
                            {
                              name: m,
                              value: x.value,
                              weight: x.weight,
                              dataQuality: x.dataQuality,
                              t: n,
                            },
                            m
                          )
                        ),
                      ],
                    }),
                ],
              }),
        ],
      });
    },
    ww = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = Wv(),
              r = {
                insufficient_data: {
                  label: e.trustReceipts.confidenceInsufficient,
                  color: "#8c9196",
                  bg: "#f6f6f7",
                  border: "#d5d8dc",
                },
                cold_start: {
                  label: e.trustReceipts.confidenceColdStart,
                  color: "#8c9196",
                  bg: "#f6f6f7",
                  border: "#d5d8dc",
                },
                human_established: {
                  label: e.trustReceipts.confidenceHumanEstablished,
                  color: "#b27400",
                  bg: "#fff8ec",
                  border: "#ffc453",
                },
                agent_verified_thin: {
                  label: e.trustReceipts.confidenceAgentThin,
                  color: "#1a7f4f",
                  bg: "#e3f5ec",
                  border: "#95c9a8",
                },
                agent_verified: {
                  label: e.trustReceipts.confidenceAgentVerified,
                  color: "#1a7f4f",
                  bg: "#e3f5ec",
                  border: "#95c9a8",
                },
              },
              {
                data: n,
                isLoading: a,
                isError: s,
                error: o,
              } = ye({
                queryKey: ["trust-overview"],
                queryFn: () => ne.get("/v1/embed/trust/overview", Nh),
              }),
              l = er(),
              c = xt({
                mutationFn: () =>
                  ne.post("/v1/embed/trust/keys/activate", {}, yw),
                onSuccess: () => {
                  (l.invalidateQueries({ queryKey: ["trust-keys-inicio"] }),
                    l.invalidateQueries({ queryKey: ["trust-overview"] }));
                },
              }),
              { data: u } = ye({
                queryKey: ["trust-keys-inicio"],
                queryFn: async () => {
                  try {
                    return await ne.get("/v1/embed/trust/keys", ys);
                  } catch (U) {
                    if (U instanceof At && U.status === 404) return null;
                    throw U;
                  }
                },
                retry: !1,
              });
            if (a)
              return i.jsx("div", {
                className: "p-6 space-y-3",
                children: Array.from({ length: 3 }).map((U, Se) =>
                  i.jsx(
                    "div",
                    { className: "h-24 animate-pulse rounded-lg bg-gray-100" },
                    Se
                  )
                ),
              });
            if (s)
              return i.jsx("div", {
                className: "p-6",
                children: i.jsxs("div", {
                  className:
                    "rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                  role: "alert",
                  children: [
                    e.trustReceipts.errorLoadingData,
                    " ",
                    o instanceof Error ? o.message : e.common.errorUnknown,
                  ],
                }),
              });
            if (!n)
              return i.jsx("div", {
                className: "p-6 text-sm text-gray-500",
                children: e.trustReceipts.noData,
              });
            const { score: p, complianceSummary: f, computedAt: m } = n,
              x = p.status === "ready" || p.status === "stale",
              v = x ? p.score : null,
              b = x ? p.confidenceLevel : "cold_start",
              C = x
                ? p.evidenceProfile
                : { humanOrders: 0, agentOrders: 0, storeAgeDays: 0 },
              g = x ? p.scoreCap : 100,
              d = x ? p.nextMilestone : null,
              y = x ? p.breakdown : {},
              w = xw(v, e),
              _ = r[b] ?? r.cold_start,
              A = y.agenticReadiness?.recommendations ?? [],
              R = A.includes("rec.activate_security_key"),
              T = A.includes("rec.add_return_policy"),
              S = A.includes("rec.add_shipping_policy"),
              O = f.overallStatus !== "ok" || f.pendingActionsCount > 0,
              $ = [
                {
                  id: "sello",
                  label: e.trustReceipts.checklistSello,
                  detail: e.trustReceipts.checklistSelloDetail,
                  done: !R,
                  action: {
                    label: e.trustReceipts.goToKeys,
                    onClick: () => c.mutate(),
                  },
                },
                {
                  id: "compliance",
                  label: e.trustReceipts.checklistCompliance,
                  detail: e.trustReceipts.checklistComplianceDetail,
                  done: !O,
                  action: {
                    label: e.trustReceipts.checklistComplianceAction,
                    href: "admin.php?page=wc-settings&tab=checkout",
                  },
                },
                {
                  id: "devoluciones",
                  label: e.trustReceipts.checklistDevoluciones,
                  detail: e.trustReceipts.checklistDevolucionesDetail,
                  done: !T,
                  action: {
                    label: e.trustReceipts.checklistDevolucionesAction,
                    href: "admin.php?page=wc-settings&tab=account",
                  },
                },
                {
                  id: "envio",
                  label: e.trustReceipts.checklistEnvio,
                  detail: e.trustReceipts.checklistEnvioDetail,
                  done: !S,
                  action: {
                    label: e.trustReceipts.checklistEnvioAction,
                    href: "admin.php?page=wc-settings&tab=shipping",
                  },
                },
              ],
              J = $.filter((U) => U.done).length;
            return i.jsxs("div", {
              className: "p-6 max-w-4xl space-y-6",
              children: [
                i.jsxs("div", {
                  className:
                    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                  children: [
                    i.jsx("div", {
                      className: "mb-4",
                      children: i.jsx("h2", {
                        className: "text-base font-semibold text-gray-900",
                        children: e.trustReceipts.panelTitle,
                      }),
                    }),
                    i.jsxs("div", {
                      className: "flex flex-wrap items-center gap-6",
                      children: [
                        i.jsxs("div", {
                          className:
                            "flex h-24 w-24 shrink-0 flex-col items-center justify-center rounded-full",
                          style: {
                            border: `5px solid ${w.color}`,
                            background: w.bg,
                          },
                          children: [
                            i.jsx("span", {
                              className: "text-3xl font-extrabold leading-none",
                              style: { color: w.color },
                              children: v ?? "—",
                            }),
                            v != null &&
                              i.jsx("span", {
                                className: "text-xs font-semibold",
                                style: { color: w.color },
                                children: "/ 100",
                              }),
                          ],
                        }),
                        i.jsxs("div", {
                          className: "flex-1 min-w-0",
                          children: [
                            i.jsxs("div", {
                              className:
                                "mb-2 flex flex-wrap items-center gap-2",
                              children: [
                                i.jsx("span", {
                                  className: "text-xl",
                                  children: w.emoji,
                                }),
                                i.jsx("span", {
                                  className: "text-lg font-bold",
                                  style: { color: w.color },
                                  children: w.label,
                                }),
                                i.jsx("span", {
                                  className:
                                    "rounded-full px-3 py-0.5 text-xs font-bold",
                                  style: {
                                    background: _.bg,
                                    color: _.color,
                                    border: `1px solid ${_.border}`,
                                  },
                                  children: _.label,
                                }),
                              ],
                            }),
                            i.jsx("p", {
                              className: "text-sm text-gray-500",
                              children:
                                b === "cold_start"
                                  ? e.trustReceipts.coldStartDesc
                                  : b === "human_established"
                                    ? e.trustReceipts.humanEstablishedDesc
                                    : (v ?? 0) >= 90
                                      ? e.trustReceipts.scoreHighDesc
                                      : (v ?? 0) >= 70
                                        ? e.trustReceipts.scoreMidDesc
                                        : e.trustReceipts.scoreLowDesc,
                            }),
                            i.jsx("p", {
                              className: "mt-1 text-xs text-gray-400",
                              children: e.trustReceipts.computedAt.replace(
                                "{{date}}",
                                vw.format(new Date(m))
                              ),
                            }),
                          ],
                        }),
                        f.pendingActionsCount > 0 &&
                          i.jsxs("div", {
                            className:
                              "shrink-0 rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-center",
                            children: [
                              i.jsx("div", {
                                className:
                                  "text-2xl font-extrabold text-red-700",
                                children: f.pendingActionsCount,
                              }),
                              i.jsx("div", {
                                className: "text-xs font-semibold text-red-700",
                                children:
                                  f.pendingActionsCount === 1
                                    ? e.trustReceipts.pendingActionsOne
                                    : e.trustReceipts.pendingActionsMany,
                              }),
                            ],
                          }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "mt-4",
                      children: [
                        i.jsxs("div", {
                          className: "relative h-3 rounded-full",
                          style: {
                            background:
                              "linear-gradient(to right, #fac9c3 0%, #ffd79d 40%, #95c9a8 70%, #1a7f4f 100%)",
                          },
                          children: [
                            i.jsx("div", {
                              className:
                                "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full border-2 bg-white shadow",
                              style: {
                                left: `calc(${Math.min(v ?? 0, 99)}% - 10px)`,
                                borderColor: w.color,
                              },
                            }),
                            g < 100 &&
                              i.jsx("div", {
                                className:
                                  "absolute top-0 bottom-0 w-0.5 rounded bg-gray-400",
                                style: { left: `${g}%` },
                                title: e.trustReceipts.scoreCurrent.replace(
                                  "{{cap}}",
                                  String(g)
                                ),
                              }),
                          ],
                        }),
                        i.jsxs("div", {
                          className:
                            "mt-1 flex justify-between text-xs text-gray-400",
                          children: [
                            i.jsx("span", {
                              children: e.trustReceipts.scoreLow,
                            }),
                            i.jsx("span", {
                              children: e.trustReceipts.scoreMid,
                            }),
                            g < 100
                              ? i.jsx("span", {
                                  style: { color: _.color },
                                  children: e.trustReceipts.scoreCap.replace(
                                    "{{cap}}",
                                    String(g)
                                  ),
                                })
                              : i.jsx("span", {
                                  children: e.trustReceipts.scoreHigh,
                                }),
                          ],
                        }),
                      ],
                    }),
                    i.jsxs("div", {
                      className: "mt-4",
                      style: {
                        background: "#f0f9ff",
                        border: "1px solid #bae6fd",
                        borderRadius: "8px",
                        padding: "10px 14px",
                        fontSize: "13px",
                        color: "#0369a1",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      },
                      children: [
                        i.jsx("span", {
                          style: { fontSize: "16px" },
                          children: "ℹ️",
                        }),
                        i.jsxs("a", {
                          href: `https://trusteed.xyz/${t}/for-merchants/trusted-score`,
                          target: "_blank",
                          rel: "noopener noreferrer",
                          style: { color: "#0369a1", textDecoration: "none" },
                          children: [e.trustReceipts.scoringMethodLink, " →"],
                        }),
                      ],
                    }),
                    d &&
                      i.jsx("div", {
                        className:
                          "mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm",
                        style: {
                          background: _.bg,
                          border: `1px solid ${_.border}`,
                          color: _.color,
                        },
                        children: i.jsx("span", {
                          children:
                            e.trustReceipts.milestoneText[
                              d.replace(/^milestone\./, "")
                            ] ?? d,
                        }),
                      }),
                    (C.storeAgeDays > 0 ||
                      C.humanOrders > 0 ||
                      C.agentOrders > 0) &&
                      i.jsxs("div", {
                        className: "mt-4 flex flex-wrap gap-2",
                        children: [
                          C.storeAgeDays > 0 &&
                            i.jsxs("div", {
                              className:
                                "rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600",
                              children: [
                                e.trustReceipts.storeAgeLine,
                                " ",
                                i.jsx("strong", {
                                  className: "text-gray-900",
                                  children:
                                    C.storeAgeDays >= 365
                                      ? `${Math.floor(C.storeAgeDays / 365)} ${Math.floor(C.storeAgeDays / 365) !== 1 ? e.trustReceipts.storeYears : e.trustReceipts.storeYear}`
                                      : `${C.storeAgeDays} ${e.trustReceipts.storeDays}`,
                                }),
                                " ",
                                e.trustReceipts.storeActive,
                              ],
                            }),
                          C.humanOrders > 0 &&
                            i.jsxs("div", {
                              className:
                                "rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600",
                              children: [
                                i.jsxs("strong", {
                                  className: "text-gray-900",
                                  children: [
                                    C.humanOrders.toLocaleString(au),
                                    " ",
                                    C.humanOrders !== 1
                                      ? e.trustReceipts.humanOrders + "s"
                                      : e.trustReceipts.humanOrders,
                                  ],
                                }),
                                " ",
                                e.trustReceipts.humanOrdersOf,
                              ],
                            }),
                          C.agentOrders > 0 &&
                            i.jsxs("div", {
                              className:
                                "rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700",
                              children: [
                                i.jsxs("strong", {
                                  children: [
                                    C.agentOrders.toLocaleString(au),
                                    " ",
                                    C.agentOrders !== 1
                                      ? e.trustReceipts.agentSalePlural
                                      : e.trustReceipts.agentSale,
                                  ],
                                }),
                                " ",
                                e.trustReceipts.agentSalesOf,
                              ],
                            }),
                        ],
                      }),
                  ],
                }),
                x &&
                  Object.keys(y).length > 0 &&
                  i.jsxs("div", {
                    className:
                      "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                    children: [
                      i.jsx("h2", {
                        className: "mb-4 text-base font-semibold text-gray-900",
                        children: e.trustReceipts.breakdownTitle,
                      }),
                      b === "cold_start" &&
                        i.jsx("div", {
                          className:
                            "mb-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                          children: e.trustReceipts.coldStartNotice,
                        }),
                      Object.entries(y).map(([U, Se]) =>
                        i.jsx(
                          bw,
                          { name: U, dim: Se, confidenceLevel: b, t: e },
                          U
                        )
                      ),
                    ],
                  }),
                i.jsxs("div", {
                  className:
                    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                  children: [
                    i.jsx("h2", {
                      className: "mb-4 text-base font-semibold text-gray-900",
                      children: e.trustReceipts.checklistTitle,
                    }),
                    i.jsx("div", {
                      className:
                        "mb-5 flex items-center gap-3 rounded-lg px-4 py-3",
                      style: {
                        background: J === $.length ? "#e3f5ec" : "#f6f6f7",
                        border: `1px solid ${J === $.length ? "#95c9a8" : "#e4e5e7"}`,
                      },
                      children: i.jsxs("div", {
                        children: [
                          i.jsx("span", {
                            className: "font-bold",
                            children: e.trustReceipts.checklistProgress
                              .replace("{{done}}", String(J))
                              .replace("{{total}}", String($.length)),
                          }),
                          J < $.length &&
                            i.jsx("span", {
                              className: "ml-2 text-sm text-gray-500",
                              children:
                                $.length - J > 1
                                  ? e.trustReceipts.checklistMissingMany.replace(
                                      "{{count}}",
                                      String($.length - J)
                                    )
                                  : e.trustReceipts.checklistMissingOne.replace(
                                      "{{count}}",
                                      String($.length - J)
                                    ),
                            }),
                          J === $.length &&
                            i.jsx("span", {
                              className: "ml-2 text-sm text-green-700",
                              children: e.trustReceipts.checklistAllDone,
                            }),
                        ],
                      }),
                    }),
                    i.jsx("p", {
                      className:
                        "mb-3 text-xs font-bold uppercase tracking-wide text-gray-400",
                      children: e.trustReceipts.checklistNow,
                    }),
                    i.jsx("div", {
                      className: "space-y-4",
                      children: $.map((U) =>
                        i.jsxs(
                          "div",
                          {
                            className: "flex items-start gap-3",
                            children: [
                              i.jsx("span", {
                                className:
                                  "mt-0.5 shrink-0 text-xl leading-none",
                                children: U.done ? "✅" : "❌",
                              }),
                              i.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  i.jsx("p", {
                                    className: "text-sm font-semibold",
                                    style: {
                                      color: U.done ? "#1a7f4f" : "#202223",
                                      textDecoration: U.done
                                        ? "line-through"
                                        : "none",
                                    },
                                    children: U.label,
                                  }),
                                  !U.done &&
                                    i.jsxs(i.Fragment, {
                                      children: [
                                        i.jsx("p", {
                                          className:
                                            "mt-1 text-xs text-gray-500 leading-relaxed",
                                          children: U.detail,
                                        }),
                                        U.action &&
                                          ("href" in U.action && U.action.href
                                            ? i.jsxs("a", {
                                                href: U.action.href,
                                                className:
                                                  "mt-2 inline-block rounded border border-blue-500 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50",
                                                children: [
                                                  U.action.label,
                                                  " →",
                                                ],
                                              })
                                            : i.jsxs(i.Fragment, {
                                                children: [
                                                  i.jsx("button", {
                                                    onClick: U.action.onClick,
                                                    disabled: c.isPending,
                                                    className:
                                                      "mt-2 inline-block rounded border border-blue-500 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50 disabled:opacity-60",
                                                    children: c.isPending
                                                      ? e.common.loading
                                                      : `${U.action.label} →`,
                                                  }),
                                                  c.isError &&
                                                    i.jsx("p", {
                                                      className:
                                                        "mt-2 text-xs text-red-600",
                                                      role: "alert",
                                                      children:
                                                        c.error instanceof Error
                                                          ? c.error.message
                                                          : e.common
                                                              .errorUnknown,
                                                    }),
                                                ],
                                              })),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          U.id
                        )
                      ),
                    }),
                    i.jsx("p", {
                      className:
                        "mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-gray-400",
                      children: e.trustReceipts.checklistAutoTitle,
                    }),
                    (() => {
                      const U =
                          n?.reliabilitySignals?.fulfillmentOnTimeRate ?? null,
                        Se = n?.reliabilitySignals?.disputeRate ?? null,
                        $t = [
                          {
                            id: "fulfillment",
                            label: e.trustReceipts.checklistFulfillment,
                            detail: e.trustReceipts.checklistFulfillmentDetail,
                            measured: U != null,
                            value: U != null ? `${Math.round(U * 100)}%` : null,
                          },
                          {
                            id: "disputes",
                            label: e.trustReceipts.checklistDisputes,
                            detail: e.trustReceipts.checklistDisputesDetail,
                            measured: Se != null,
                            value:
                              Se != null ? `${(Se * 100).toFixed(1)}%` : null,
                          },
                        ],
                        _s = $t.some((at) => at.measured);
                      return i.jsxs(i.Fragment, {
                        children: [
                          i.jsx("div", {
                            className:
                              "rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500",
                            children: _s
                              ? e.trustReceipts.checklistAutoActiveNote
                              : e.trustReceipts.checklistAutoNote,
                          }),
                          $t.map((at) =>
                            i.jsxs(
                              "div",
                              {
                                className: `mt-3 flex items-start gap-3${at.measured ? "" : " opacity-55"}`,
                                children: [
                                  i.jsx("span", {
                                    className: "shrink-0 text-xl leading-none",
                                    children: at.measured ? "✅" : "⏳",
                                  }),
                                  i.jsxs("div", {
                                    children: [
                                      i.jsxs("p", {
                                        className: `text-sm font-semibold ${at.measured ? "text-gray-700" : "text-gray-500"}`,
                                        children: [
                                          at.label,
                                          at.value != null &&
                                            i.jsx("span", {
                                              className:
                                                "ml-2 font-normal text-emerald-600",
                                              children: at.value,
                                            }),
                                        ],
                                      }),
                                      i.jsx("p", {
                                        className: "text-xs text-gray-400",
                                        children: at.detail,
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              at.id
                            )
                          ),
                        ],
                      });
                    })(),
                  ],
                }),
                i.jsxs("div", {
                  className:
                    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                  children: [
                    i.jsx("h2", {
                      className: "mb-4 text-base font-semibold text-gray-900",
                      children: e.trustReceipts.practicesTitle,
                    }),
                    i.jsx("div", {
                      className: "space-y-3",
                      children: [
                        {
                          title: e.trustReceipts.practice1Title,
                          body: e.trustReceipts.practice1Body,
                        },
                        {
                          title: e.trustReceipts.practice2Title,
                          body: e.trustReceipts.practice2Body,
                        },
                        {
                          title: e.trustReceipts.practice3Title,
                          body: e.trustReceipts.practice3Body,
                        },
                      ].map((U) =>
                        i.jsx(
                          "div",
                          {
                            className:
                              "flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3",
                            children: i.jsxs("div", {
                              children: [
                                i.jsx("p", {
                                  className:
                                    "text-sm font-semibold text-gray-900",
                                  children: U.title,
                                }),
                                i.jsx("p", {
                                  className:
                                    "mt-1 text-xs text-gray-600 leading-relaxed",
                                  children: U.body,
                                }),
                              ],
                            }),
                          },
                          U.title
                        )
                      ),
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className:
                    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                  children: [
                    i.jsx("h2", {
                      className: "mb-4 text-base font-semibold text-gray-900",
                      children: e.trustReceipts.faqTitle,
                    }),
                    i.jsx("div", {
                      className: "space-y-3",
                      children: [
                        { q: e.trustReceipts.faq1Q, a: e.trustReceipts.faq1A },
                        { q: e.trustReceipts.faq2Q, a: e.trustReceipts.faq2A },
                        { q: e.trustReceipts.faq3Q, a: e.trustReceipts.faq3A },
                      ].map((U) =>
                        i.jsxs(
                          "div",
                          {
                            className:
                              "rounded-lg border border-gray-200 bg-gray-50 p-4",
                            children: [
                              i.jsx("p", {
                                className:
                                  "text-sm font-semibold text-gray-900",
                                children: U.q,
                              }),
                              i.jsx("p", {
                                className:
                                  "mt-2 text-xs text-gray-600 leading-relaxed",
                                children: U.a,
                              }),
                            ],
                          },
                          U.q
                        )
                      ),
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className:
                    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                  children: [
                    i.jsx("h2", {
                      className: "mb-3 text-base font-semibold text-gray-900",
                      children: e.trustReceipts.securityTitle,
                    }),
                    u
                      ? i.jsxs(i.Fragment, {
                          children: [
                            i.jsx("div", {
                              className: "flex items-center gap-3",
                              children: i.jsxs("p", {
                                className: "text-sm text-gray-700",
                                children: [
                                  i.jsx("strong", {
                                    children:
                                      e.trustReceipts.securityProtectionActive,
                                  }),
                                  " ",
                                  e.trustReceipts.securityActiveDesc,
                                ],
                              }),
                            }),
                            u.daysSinceRotation !== null &&
                              u.daysSinceRotation > 90 &&
                              i.jsx("div", {
                                className:
                                  "mt-3 rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                                children:
                                  e.trustReceipts.securityRotationWarning.replace(
                                    "{{days}}",
                                    String(u.daysSinceRotation)
                                  ),
                              }),
                          ],
                        })
                      : i.jsxs("div", {
                          children: [
                            i.jsx("div", {
                              className: "flex items-center gap-3",
                              children: i.jsxs("p", {
                                className: "text-sm text-gray-600",
                                children: [
                                  e.trustReceipts.securityNotActive,
                                  " ",
                                  i.jsx("button", {
                                    onClick: () => c.mutate(),
                                    disabled: c.isPending,
                                    className:
                                      "font-semibold text-blue-600 hover:underline disabled:opacity-60",
                                    children: c.isPending
                                      ? e.common.loading
                                      : e.trustReceipts.securityActivate,
                                  }),
                                ],
                              }),
                            }),
                            c.isError &&
                              i.jsx("p", {
                                className: "mt-2 text-xs text-red-600",
                                role: "alert",
                                children:
                                  c.error instanceof Error
                                    ? c.error.message
                                    : e.common.errorUnknown,
                              }),
                          ],
                        }),
                  ],
                }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    );
})();
