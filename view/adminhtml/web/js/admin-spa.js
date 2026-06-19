var pw = Object.defineProperty;
var mf = (se) => {
  throw TypeError(se);
};
var hw = (se, oe, Ce) =>
  oe in se
    ? pw(se, oe, { enumerable: !0, configurable: !0, writable: !0, value: Ce })
    : (se[oe] = Ce);
var kn = (se, oe, Ce) => hw(se, typeof oe != "symbol" ? oe + "" : oe, Ce),
  tu = (se, oe, Ce) => oe.has(se) || mf("Cannot " + Ce);
var f = (se, oe, Ce) => (
    tu(se, oe, "read from private field"),
    Ce ? Ce.call(se) : oe.get(se)
  ),
  U = (se, oe, Ce) =>
    oe.has(se)
      ? mf("Cannot add the same private member more than once")
      : oe instanceof WeakSet
        ? oe.add(se)
        : oe.set(se, Ce),
  L = (se, oe, Ce, ys) => (
    tu(se, oe, "write to private field"),
    ys ? ys.call(se, Ce) : oe.set(se, Ce),
    Ce
  ),
  Q = (se, oe, Ce) => (tu(se, oe, "access private method"), Ce);
var to = (se, oe, Ce, ys) => ({
  set _(we) {
    L(se, oe, we, Ce);
  },
  get _() {
    return f(se, oe, ys);
  },
});
(function () {
  "use strict";
  var un,
    Tr,
    as,
    rf,
    Pr,
    Yc,
    nf,
    is,
    Or,
    os,
    sf,
    dn,
    af,
    pn,
    ls,
    vt,
    hn,
    Pe,
    ma,
    mn,
    ct,
    ff,
    ar,
    of,
    tt,
    J,
    fa,
    Ze,
    fn,
    cs,
    er,
    Lr,
    ga,
    us,
    ds,
    gn,
    yn,
    Mr,
    ps,
    ne,
    ka,
    ru,
    nu,
    su,
    au,
    iu,
    ou,
    lu,
    gf,
    lf,
    ya,
    Dt,
    qe,
    vn,
    It,
    Ur,
    cf,
    tr,
    jt,
    va,
    uf,
    rr,
    Dr,
    rt,
    nr,
    sr,
    ro,
    cu,
    df,
    Ft,
    pf,
    be,
    Ir,
    Fr,
    hs,
    ms,
    zr,
    fs,
    gs,
    hf,
    Br,
    xn,
    xa,
    ba;
  var se = document.createElement("style");
  ((se.textContent = `*,:before,:after{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }::backdrop{--tw-border-spacing-x: 0;--tw-border-spacing-y: 0;--tw-translate-x: 0;--tw-translate-y: 0;--tw-rotate: 0;--tw-skew-x: 0;--tw-skew-y: 0;--tw-scale-x: 1;--tw-scale-y: 1;--tw-pan-x: ;--tw-pan-y: ;--tw-pinch-zoom: ;--tw-scroll-snap-strictness: proximity;--tw-gradient-from-position: ;--tw-gradient-via-position: ;--tw-gradient-to-position: ;--tw-ordinal: ;--tw-slashed-zero: ;--tw-numeric-figure: ;--tw-numeric-spacing: ;--tw-numeric-fraction: ;--tw-ring-inset: ;--tw-ring-offset-width: 0px;--tw-ring-offset-color: #fff;--tw-ring-color: rgb(59 130 246 / .5);--tw-ring-offset-shadow: 0 0 #0000;--tw-ring-shadow: 0 0 #0000;--tw-shadow: 0 0 #0000;--tw-shadow-colored: 0 0 #0000;--tw-blur: ;--tw-brightness: ;--tw-contrast: ;--tw-grayscale: ;--tw-hue-rotate: ;--tw-invert: ;--tw-saturate: ;--tw-sepia: ;--tw-drop-shadow: ;--tw-backdrop-blur: ;--tw-backdrop-brightness: ;--tw-backdrop-contrast: ;--tw-backdrop-grayscale: ;--tw-backdrop-hue-rotate: ;--tw-backdrop-invert: ;--tw-backdrop-opacity: ;--tw-backdrop-saturate: ;--tw-backdrop-sepia: ;--tw-contain-size: ;--tw-contain-layout: ;--tw-contain-paint: ;--tw-contain-style: }*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:#e5e7eb}:before,:after{--tw-content: ""}html,:host{line-height:1.5;-webkit-text-size-adjust:100%;-moz-tab-size:4;-o-tab-size:4;tab-size:4;font-family:ui-sans-serif,system-ui,sans-serif,"Apple Color Emoji","Segoe UI Emoji",Segoe UI Symbol,"Noto Color Emoji";font-feature-settings:normal;font-variation-settings:normal;-webkit-tap-highlight-color:transparent}body{margin:0;line-height:inherit}hr{height:0;color:inherit;border-top-width:1px}abbr:where([title]){-webkit-text-decoration:underline dotted;text-decoration:underline dotted}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;font-feature-settings:normal;font-variation-settings:normal;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit;border-collapse:collapse}button,input,optgroup,select,textarea{font-family:inherit;font-feature-settings:inherit;font-variation-settings:inherit;font-size:100%;font-weight:inherit;line-height:inherit;letter-spacing:inherit;color:inherit;margin:0;padding:0}button,select{text-transform:none}button,input:where([type=button]),input:where([type=reset]),input:where([type=submit]){-webkit-appearance:button;background-color:transparent;background-image:none}:-moz-focusring{outline:auto}:-moz-ui-invalid{box-shadow:none}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}fieldset{margin:0;padding:0}legend{padding:0}ol,ul,menu{list-style:none;margin:0;padding:0}dialog{padding:0}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#9ca3af}input::placeholder,textarea::placeholder{opacity:1;color:#9ca3af}button,[role=button]{cursor:pointer}:disabled{cursor:default}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]:where(:not([hidden=until-found])){display:none}.sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border-width:0}.visible{visibility:visible}.static{position:static}.fixed{position:fixed}.absolute{position:absolute}.relative{position:relative}.inset-0{inset:0}.bottom-0{bottom:0}.bottom-4{bottom:1rem}.right-4{right:1rem}.top-0{top:0}.top-0\\.5{top:.125rem}.top-1\\/2{top:50%}.top-4{top:1rem}.top-\\[-3px\\]{top:-3px}.z-50{z-index:50}.mb-0{margin-bottom:0}.mb-1{margin-bottom:.25rem}.mb-2{margin-bottom:.5rem}.mb-3{margin-bottom:.75rem}.mb-4{margin-bottom:1rem}.mb-5{margin-bottom:1.25rem}.mb-6{margin-bottom:1.5rem}.mb-8{margin-bottom:2rem}.ml-2{margin-left:.5rem}.ml-4{margin-left:1rem}.mt-0\\.5{margin-top:.125rem}.mt-1{margin-top:.25rem}.mt-2{margin-top:.5rem}.mt-3{margin-top:.75rem}.mt-4{margin-top:1rem}.mt-6{margin-top:1.5rem}.block{display:block}.inline-block{display:inline-block}.inline{display:inline}.flex{display:flex}.inline-flex{display:inline-flex}.table{display:table}.grid{display:grid}.hidden{display:none}.h-10{height:2.5rem}.h-12{height:3rem}.h-16{height:4rem}.h-2{height:.5rem}.h-2\\.5{height:.625rem}.h-24{height:6rem}.h-28{height:7rem}.h-3{height:.75rem}.h-4{height:1rem}.h-40{height:10rem}.h-5{height:1.25rem}.h-6{height:1.5rem}.h-7{height:1.75rem}.h-8{height:2rem}.h-full{height:100%}.max-h-48{max-height:12rem}.w-0\\.5{width:.125rem}.w-11{width:2.75rem}.w-12{width:3rem}.w-2{width:.5rem}.w-24{width:6rem}.w-36{width:9rem}.w-4{width:1rem}.w-40{width:10rem}.w-5{width:1.25rem}.w-7{width:1.75rem}.w-80{width:20rem}.w-full{width:100%}.min-w-0{min-width:0px}.min-w-\\[52px\\]{min-width:52px}.min-w-full{min-width:100%}.max-w-2xl{max-width:42rem}.max-w-3xl{max-width:48rem}.max-w-4xl{max-width:56rem}.max-w-5xl{max-width:64rem}.max-w-6xl{max-width:72rem}.max-w-md{max-width:28rem}.flex-1{flex:1 1 0%}.flex-shrink-0,.shrink-0{flex-shrink:0}.-translate-y-1\\/2{--tw-translate-y: -50%;transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}.transform{transform:translate(var(--tw-translate-x),var(--tw-translate-y)) rotate(var(--tw-rotate)) skew(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))}@keyframes pulse{50%{opacity:.5}}.animate-pulse{animation:pulse 2s cubic-bezier(.4,0,.6,1) infinite}.cursor-pointer{cursor:pointer}.resize{resize:both}.flex-col{flex-direction:column}.flex-wrap{flex-wrap:wrap}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-end{justify-content:flex-end}.justify-center{justify-content:center}.justify-between{justify-content:space-between}.gap-1{gap:.25rem}.gap-1\\.5{gap:.375rem}.gap-2{gap:.5rem}.gap-3{gap:.75rem}.gap-4{gap:1rem}.gap-5{gap:1.25rem}.gap-6{gap:1.5rem}.space-y-2>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.5rem * var(--tw-space-y-reverse))}.space-y-3>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(.75rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(.75rem * var(--tw-space-y-reverse))}.space-y-4>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1rem * var(--tw-space-y-reverse))}.space-y-6>:not([hidden])~:not([hidden]){--tw-space-y-reverse: 0;margin-top:calc(1.5rem * calc(1 - var(--tw-space-y-reverse)));margin-bottom:calc(1.5rem * var(--tw-space-y-reverse))}.divide-y>:not([hidden])~:not([hidden]){--tw-divide-y-reverse: 0;border-top-width:calc(1px * calc(1 - var(--tw-divide-y-reverse)));border-bottom-width:calc(1px * var(--tw-divide-y-reverse))}.divide-gray-100>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(243 244 246 / var(--tw-divide-opacity, 1))}.divide-gray-200>:not([hidden])~:not([hidden]){--tw-divide-opacity: 1;border-color:rgb(229 231 235 / var(--tw-divide-opacity, 1))}.overflow-auto{overflow:auto}.overflow-hidden{overflow:hidden}.overflow-x-auto{overflow-x:auto}.overflow-y-auto{overflow-y:auto}.truncate{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.break-all{word-break:break-all}.rounded{border-radius:.25rem}.rounded-full{border-radius:9999px}.rounded-lg{border-radius:.5rem}.rounded-md{border-radius:.375rem}.border{border-width:1px}.border-2{border-width:2px}.border-b{border-bottom-width:1px}.border-b-2{border-bottom-width:2px}.border-t{border-top-width:1px}.border-dashed{border-style:dashed}.border-none{border-style:none}.border-amber-100{--tw-border-opacity: 1;border-color:rgb(254 243 199 / var(--tw-border-opacity, 1))}.border-amber-200{--tw-border-opacity: 1;border-color:rgb(253 230 138 / var(--tw-border-opacity, 1))}.border-amber-300{--tw-border-opacity: 1;border-color:rgb(252 211 77 / var(--tw-border-opacity, 1))}.border-blue-100{--tw-border-opacity: 1;border-color:rgb(219 234 254 / var(--tw-border-opacity, 1))}.border-blue-200{--tw-border-opacity: 1;border-color:rgb(191 219 254 / var(--tw-border-opacity, 1))}.border-blue-300{--tw-border-opacity: 1;border-color:rgb(147 197 253 / var(--tw-border-opacity, 1))}.border-blue-500{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.border-blue-600{--tw-border-opacity: 1;border-color:rgb(37 99 235 / var(--tw-border-opacity, 1))}.border-emerald-300{--tw-border-opacity: 1;border-color:rgb(110 231 183 / var(--tw-border-opacity, 1))}.border-gray-100{--tw-border-opacity: 1;border-color:rgb(243 244 246 / var(--tw-border-opacity, 1))}.border-gray-200{--tw-border-opacity: 1;border-color:rgb(229 231 235 / var(--tw-border-opacity, 1))}.border-gray-300{--tw-border-opacity: 1;border-color:rgb(209 213 219 / var(--tw-border-opacity, 1))}.border-gray-50{--tw-border-opacity: 1;border-color:rgb(249 250 251 / var(--tw-border-opacity, 1))}.border-green-100{--tw-border-opacity: 1;border-color:rgb(220 252 231 / var(--tw-border-opacity, 1))}.border-green-200{--tw-border-opacity: 1;border-color:rgb(187 247 208 / var(--tw-border-opacity, 1))}.border-green-300{--tw-border-opacity: 1;border-color:rgb(134 239 172 / var(--tw-border-opacity, 1))}.border-red-200{--tw-border-opacity: 1;border-color:rgb(254 202 202 / var(--tw-border-opacity, 1))}.border-red-300{--tw-border-opacity: 1;border-color:rgb(252 165 165 / var(--tw-border-opacity, 1))}.border-yellow-200{--tw-border-opacity: 1;border-color:rgb(254 240 138 / var(--tw-border-opacity, 1))}.border-yellow-300{--tw-border-opacity: 1;border-color:rgb(253 224 71 / var(--tw-border-opacity, 1))}.bg-amber-50{--tw-bg-opacity: 1;background-color:rgb(255 251 235 / var(--tw-bg-opacity, 1))}.bg-black\\/30{background-color:#0000004d}.bg-blue-100{--tw-bg-opacity: 1;background-color:rgb(219 234 254 / var(--tw-bg-opacity, 1))}.bg-blue-50{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.bg-blue-600{--tw-bg-opacity: 1;background-color:rgb(37 99 235 / var(--tw-bg-opacity, 1))}.bg-emerald-50{--tw-bg-opacity: 1;background-color:rgb(236 253 245 / var(--tw-bg-opacity, 1))}.bg-gray-100{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.bg-gray-200{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.bg-gray-400{--tw-bg-opacity: 1;background-color:rgb(156 163 175 / var(--tw-bg-opacity, 1))}.bg-gray-50{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.bg-green-100{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity, 1))}.bg-green-50{--tw-bg-opacity: 1;background-color:rgb(240 253 244 / var(--tw-bg-opacity, 1))}.bg-green-500{--tw-bg-opacity: 1;background-color:rgb(34 197 94 / var(--tw-bg-opacity, 1))}.bg-green-600{--tw-bg-opacity: 1;background-color:rgb(22 163 74 / var(--tw-bg-opacity, 1))}.bg-green-700{--tw-bg-opacity: 1;background-color:rgb(21 128 61 / var(--tw-bg-opacity, 1))}.bg-orange-100{--tw-bg-opacity: 1;background-color:rgb(255 237 213 / var(--tw-bg-opacity, 1))}.bg-orange-50{--tw-bg-opacity: 1;background-color:rgb(255 247 237 / var(--tw-bg-opacity, 1))}.bg-purple-100{--tw-bg-opacity: 1;background-color:rgb(243 232 255 / var(--tw-bg-opacity, 1))}.bg-purple-50{--tw-bg-opacity: 1;background-color:rgb(250 245 255 / var(--tw-bg-opacity, 1))}.bg-red-100{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1))}.bg-red-50{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1))}.bg-red-500{--tw-bg-opacity: 1;background-color:rgb(239 68 68 / var(--tw-bg-opacity, 1))}.bg-red-600{--tw-bg-opacity: 1;background-color:rgb(220 38 38 / var(--tw-bg-opacity, 1))}.bg-slate-100{--tw-bg-opacity: 1;background-color:rgb(241 245 249 / var(--tw-bg-opacity, 1))}.bg-teal-100{--tw-bg-opacity: 1;background-color:rgb(204 251 241 / var(--tw-bg-opacity, 1))}.bg-white{--tw-bg-opacity: 1;background-color:rgb(255 255 255 / var(--tw-bg-opacity, 1))}.bg-yellow-100{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity, 1))}.bg-yellow-50{--tw-bg-opacity: 1;background-color:rgb(254 252 232 / var(--tw-bg-opacity, 1))}.p-1{padding:.25rem}.p-3{padding:.75rem}.p-4{padding:1rem}.p-5{padding:1.25rem}.p-6{padding:1.5rem}.px-2{padding-left:.5rem;padding-right:.5rem}.px-2\\.5{padding-left:.625rem;padding-right:.625rem}.px-3{padding-left:.75rem;padding-right:.75rem}.px-4{padding-left:1rem;padding-right:1rem}.px-5{padding-left:1.25rem;padding-right:1.25rem}.px-6{padding-left:1.5rem;padding-right:1.5rem}.py-0\\.5{padding-top:.125rem;padding-bottom:.125rem}.py-1{padding-top:.25rem;padding-bottom:.25rem}.py-1\\.5{padding-top:.375rem;padding-bottom:.375rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.py-3{padding-top:.75rem;padding-bottom:.75rem}.py-4{padding-top:1rem;padding-bottom:1rem}.py-6{padding-top:1.5rem;padding-bottom:1.5rem}.py-8{padding-top:2rem;padding-bottom:2rem}.pb-1{padding-bottom:.25rem}.pb-2{padding-bottom:.5rem}.pb-3{padding-bottom:.75rem}.pb-5{padding-bottom:1.25rem}.pr-4{padding-right:1rem}.pt-2{padding-top:.5rem}.pt-3{padding-top:.75rem}.pt-4{padding-top:1rem}.pt-6{padding-top:1.5rem}.text-left{text-align:left}.text-center{text-align:center}.text-right{text-align:right}.font-mono{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace}.text-2xl{font-size:1.5rem;line-height:2rem}.text-3xl{font-size:1.875rem;line-height:2.25rem}.text-base{font-size:1rem;line-height:1.5rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.text-xl{font-size:1.25rem;line-height:1.75rem}.text-xs{font-size:.75rem;line-height:1rem}.font-bold{font-weight:700}.font-extrabold{font-weight:800}.font-medium{font-weight:500}.font-semibold{font-weight:600}.uppercase{text-transform:uppercase}.leading-none{line-height:1}.leading-relaxed{line-height:1.625}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.text-amber-800{--tw-text-opacity: 1;color:rgb(146 64 14 / var(--tw-text-opacity, 1))}.text-blue-600{--tw-text-opacity: 1;color:rgb(37 99 235 / var(--tw-text-opacity, 1))}.text-blue-700{--tw-text-opacity: 1;color:rgb(29 78 216 / var(--tw-text-opacity, 1))}.text-blue-800{--tw-text-opacity: 1;color:rgb(30 64 175 / var(--tw-text-opacity, 1))}.text-emerald-800{--tw-text-opacity: 1;color:rgb(6 95 70 / var(--tw-text-opacity, 1))}.text-gray-400{--tw-text-opacity: 1;color:rgb(156 163 175 / var(--tw-text-opacity, 1))}.text-gray-500{--tw-text-opacity: 1;color:rgb(107 114 128 / var(--tw-text-opacity, 1))}.text-gray-600{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.text-gray-700{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.text-gray-800{--tw-text-opacity: 1;color:rgb(31 41 55 / var(--tw-text-opacity, 1))}.text-gray-900{--tw-text-opacity: 1;color:rgb(17 24 39 / var(--tw-text-opacity, 1))}.text-green-700{--tw-text-opacity: 1;color:rgb(21 128 61 / var(--tw-text-opacity, 1))}.text-green-800{--tw-text-opacity: 1;color:rgb(22 101 52 / var(--tw-text-opacity, 1))}.text-indigo-600{--tw-text-opacity: 1;color:rgb(79 70 229 / var(--tw-text-opacity, 1))}.text-orange-700{--tw-text-opacity: 1;color:rgb(194 65 12 / var(--tw-text-opacity, 1))}.text-purple-700{--tw-text-opacity: 1;color:rgb(126 34 206 / var(--tw-text-opacity, 1))}.text-red-600{--tw-text-opacity: 1;color:rgb(220 38 38 / var(--tw-text-opacity, 1))}.text-red-700{--tw-text-opacity: 1;color:rgb(185 28 28 / var(--tw-text-opacity, 1))}.text-red-800{--tw-text-opacity: 1;color:rgb(153 27 27 / var(--tw-text-opacity, 1))}.text-slate-700{--tw-text-opacity: 1;color:rgb(51 65 85 / var(--tw-text-opacity, 1))}.text-teal-700{--tw-text-opacity: 1;color:rgb(15 118 110 / var(--tw-text-opacity, 1))}.text-white{--tw-text-opacity: 1;color:rgb(255 255 255 / var(--tw-text-opacity, 1))}.text-yellow-600{--tw-text-opacity: 1;color:rgb(202 138 4 / var(--tw-text-opacity, 1))}.text-yellow-700{--tw-text-opacity: 1;color:rgb(161 98 7 / var(--tw-text-opacity, 1))}.text-yellow-800{--tw-text-opacity: 1;color:rgb(133 77 14 / var(--tw-text-opacity, 1))}.underline{text-decoration-line:underline}.line-through{text-decoration-line:line-through}.opacity-50{opacity:.5}.opacity-55{opacity:.55}.opacity-70{opacity:.7}.opacity-80{opacity:.8}.shadow{--tw-shadow: 0 1px 3px 0 rgb(0 0 0 / .1), 0 1px 2px -1px rgb(0 0 0 / .1);--tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-lg{--tw-shadow: 0 10px 15px -3px rgb(0 0 0 / .1), 0 4px 6px -4px rgb(0 0 0 / .1);--tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-md{--tw-shadow: 0 4px 6px -1px rgb(0 0 0 / .1), 0 2px 4px -2px rgb(0 0 0 / .1);--tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-sm{--tw-shadow: 0 1px 2px 0 rgb(0 0 0 / .05);--tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.shadow-xl{--tw-shadow: 0 20px 25px -5px rgb(0 0 0 / .1), 0 8px 10px -6px rgb(0 0 0 / .1);--tw-shadow-colored: 0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color);box-shadow:var(--tw-ring-offset-shadow, 0 0 #0000),var(--tw-ring-shadow, 0 0 #0000),var(--tw-shadow)}.filter{filter:var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow)}.transition-all{transition-property:all;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.transition-colors{transition-property:color,background-color,border-color,text-decoration-color,fill,stroke;transition-timing-function:cubic-bezier(.4,0,.2,1);transition-duration:.15s}.backdrop\\:bg-black\\/40::backdrop{background-color:#0006}.last\\:mb-0:last-child{margin-bottom:0}.last\\:border-0:last-child{border-width:0px}.last\\:pb-0:last-child{padding-bottom:0}.hover\\:bg-blue-50:hover{--tw-bg-opacity: 1;background-color:rgb(239 246 255 / var(--tw-bg-opacity, 1))}.hover\\:bg-blue-700:hover{--tw-bg-opacity: 1;background-color:rgb(29 78 216 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-100:hover{--tw-bg-opacity: 1;background-color:rgb(243 244 246 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-200:hover{--tw-bg-opacity: 1;background-color:rgb(229 231 235 / var(--tw-bg-opacity, 1))}.hover\\:bg-gray-50:hover{--tw-bg-opacity: 1;background-color:rgb(249 250 251 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-100:hover{--tw-bg-opacity: 1;background-color:rgb(220 252 231 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-50:hover{--tw-bg-opacity: 1;background-color:rgb(240 253 244 / var(--tw-bg-opacity, 1))}.hover\\:bg-green-800:hover{--tw-bg-opacity: 1;background-color:rgb(22 101 52 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-100:hover{--tw-bg-opacity: 1;background-color:rgb(254 226 226 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-50:hover{--tw-bg-opacity: 1;background-color:rgb(254 242 242 / var(--tw-bg-opacity, 1))}.hover\\:bg-red-700:hover{--tw-bg-opacity: 1;background-color:rgb(185 28 28 / var(--tw-bg-opacity, 1))}.hover\\:bg-yellow-100:hover{--tw-bg-opacity: 1;background-color:rgb(254 249 195 / var(--tw-bg-opacity, 1))}.hover\\:text-blue-800:hover{--tw-text-opacity: 1;color:rgb(30 64 175 / var(--tw-text-opacity, 1))}.hover\\:text-gray-600:hover{--tw-text-opacity: 1;color:rgb(75 85 99 / var(--tw-text-opacity, 1))}.hover\\:text-gray-700:hover{--tw-text-opacity: 1;color:rgb(55 65 81 / var(--tw-text-opacity, 1))}.hover\\:text-indigo-800:hover{--tw-text-opacity: 1;color:rgb(55 48 163 / var(--tw-text-opacity, 1))}.hover\\:underline:hover{text-decoration-line:underline}.hover\\:opacity-100:hover{opacity:1}.focus\\:border-blue-500:focus{--tw-border-opacity: 1;border-color:rgb(59 130 246 / var(--tw-border-opacity, 1))}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}.focus\\:ring:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-1:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(1px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-2:focus{--tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);--tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);box-shadow:var(--tw-ring-offset-shadow),var(--tw-ring-shadow),var(--tw-shadow, 0 0 #0000)}.focus\\:ring-inset:focus{--tw-ring-inset: inset}.focus\\:ring-blue-500:focus{--tw-ring-opacity: 1;--tw-ring-color: rgb(59 130 246 / var(--tw-ring-opacity, 1))}.focus\\:ring-offset-2:focus{--tw-ring-offset-width: 2px}.disabled\\:cursor-not-allowed:disabled{cursor:not-allowed}.disabled\\:opacity-50:disabled{opacity:.5}.disabled\\:opacity-60:disabled{opacity:.6}@media(min-width:640px){.sm\\:grid-cols-2{grid-template-columns:repeat(2,minmax(0,1fr))}}
/*$vite$:1*/`),
    document.head.appendChild(se));
  const oe = "modulepreload",
    Ce = function (e) {
      return "/" + e;
    },
    ys = {},
    we = function (t, r, n) {
      let s = Promise.resolve();
      function a(o) {
        const l = new Event("vite:preloadError", { cancelable: !0 });
        if (((l.payload = o), window.dispatchEvent(l), !l.defaultPrevented))
          throw o;
      }
      return s.then((o) => {
        for (const l of o || []) l.status === "rejected" && a(l.reason);
        return t().catch(a);
      });
    };
  function yf(e) {
    return e &&
      e.__esModule &&
      Object.prototype.hasOwnProperty.call(e, "default")
      ? e.default
      : e;
  }
  var uu = { exports: {} },
    Sa = {},
    du = { exports: {} },
    G = {};
  /**
   * @license React
   * react.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var vs = Symbol.for("react.element"),
    vf = Symbol.for("react.portal"),
    xf = Symbol.for("react.fragment"),
    bf = Symbol.for("react.strict_mode"),
    wf = Symbol.for("react.profiler"),
    kf = Symbol.for("react.provider"),
    Sf = Symbol.for("react.context"),
    Cf = Symbol.for("react.forward_ref"),
    _f = Symbol.for("react.suspense"),
    jf = Symbol.for("react.memo"),
    Nf = Symbol.for("react.lazy"),
    pu = Symbol.iterator;
  function Rf(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (pu && e[pu]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var hu = {
      isMounted: function () {
        return !1;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    },
    mu = Object.assign,
    fu = {};
  function Sn(e, t, r) {
    ((this.props = e),
      (this.context = t),
      (this.refs = fu),
      (this.updater = r || hu));
  }
  ((Sn.prototype.isReactComponent = {}),
    (Sn.prototype.setState = function (e, t) {
      if (typeof e != "object" && typeof e != "function" && e != null)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, e, t, "setState");
    }),
    (Sn.prototype.forceUpdate = function (e) {
      this.updater.enqueueForceUpdate(this, e, "forceUpdate");
    }));
  function gu() {}
  gu.prototype = Sn.prototype;
  function no(e, t, r) {
    ((this.props = e),
      (this.context = t),
      (this.refs = fu),
      (this.updater = r || hu));
  }
  var so = (no.prototype = new gu());
  ((so.constructor = no), mu(so, Sn.prototype), (so.isPureReactComponent = !0));
  var yu = Array.isArray,
    vu = Object.prototype.hasOwnProperty,
    ao = { current: null },
    xu = { key: !0, ref: !0, __self: !0, __source: !0 };
  function bu(e, t, r) {
    var n,
      s = {},
      a = null,
      o = null;
    if (t != null)
      for (n in (t.ref !== void 0 && (o = t.ref),
      t.key !== void 0 && (a = "" + t.key),
      t))
        vu.call(t, n) && !xu.hasOwnProperty(n) && (s[n] = t[n]);
    var l = arguments.length - 2;
    if (l === 1) s.children = r;
    else if (1 < l) {
      for (var c = Array(l), u = 0; u < l; u++) c[u] = arguments[u + 2];
      s.children = c;
    }
    if (e && e.defaultProps)
      for (n in ((l = e.defaultProps), l)) s[n] === void 0 && (s[n] = l[n]);
    return {
      $$typeof: vs,
      type: e,
      key: a,
      ref: o,
      props: s,
      _owner: ao.current,
    };
  }
  function Af(e, t) {
    return {
      $$typeof: vs,
      type: e.type,
      key: t,
      ref: e.ref,
      props: e.props,
      _owner: e._owner,
    };
  }
  function io(e) {
    return typeof e == "object" && e !== null && e.$$typeof === vs;
  }
  function Ef(e) {
    var t = { "=": "=0", ":": "=2" };
    return (
      "$" +
      e.replace(/[=:]/g, function (r) {
        return t[r];
      })
    );
  }
  var wu = /\/+/g;
  function oo(e, t) {
    return typeof e == "object" && e !== null && e.key != null
      ? Ef("" + e.key)
      : t.toString(36);
  }
  function Ca(e, t, r, n, s) {
    var a = typeof e;
    (a === "undefined" || a === "boolean") && (e = null);
    var o = !1;
    if (e === null) o = !0;
    else
      switch (a) {
        case "string":
        case "number":
          o = !0;
          break;
        case "object":
          switch (e.$$typeof) {
            case vs:
            case vf:
              o = !0;
          }
      }
    if (o)
      return (
        (o = e),
        (s = s(o)),
        (e = n === "" ? "." + oo(o, 0) : n),
        yu(s)
          ? ((r = ""),
            e != null && (r = e.replace(wu, "$&/") + "/"),
            Ca(s, t, r, "", function (u) {
              return u;
            }))
          : s != null &&
            (io(s) &&
              (s = Af(
                s,
                r +
                  (!s.key || (o && o.key === s.key)
                    ? ""
                    : ("" + s.key).replace(wu, "$&/") + "/") +
                  e
              )),
            t.push(s)),
        1
      );
    if (((o = 0), (n = n === "" ? "." : n + ":"), yu(e)))
      for (var l = 0; l < e.length; l++) {
        a = e[l];
        var c = n + oo(a, l);
        o += Ca(a, t, r, c, s);
      }
    else if (((c = Rf(e)), typeof c == "function"))
      for (e = c.call(e), l = 0; !(a = e.next()).done; )
        ((a = a.value), (c = n + oo(a, l++)), (o += Ca(a, t, r, c, s)));
    else if (a === "object")
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
  function _a(e, t, r) {
    if (e == null) return e;
    var n = [],
      s = 0;
    return (
      Ca(e, n, "", "", function (a) {
        return t.call(r, a, s++);
      }),
      n
    );
  }
  function Tf(e) {
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
  var $e = { current: null },
    ja = { transition: null },
    Pf = {
      ReactCurrentDispatcher: $e,
      ReactCurrentBatchConfig: ja,
      ReactCurrentOwner: ao,
    };
  function ku() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  ((G.Children = {
    map: _a,
    forEach: function (e, t, r) {
      _a(
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
        _a(e, function () {
          t++;
        }),
        t
      );
    },
    toArray: function (e) {
      return (
        _a(e, function (t) {
          return t;
        }) || []
      );
    },
    only: function (e) {
      if (!io(e))
        throw Error(
          "React.Children.only expected to receive a single React element child."
        );
      return e;
    },
  }),
    (G.Component = Sn),
    (G.Fragment = xf),
    (G.Profiler = wf),
    (G.PureComponent = no),
    (G.StrictMode = bf),
    (G.Suspense = _f),
    (G.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Pf),
    (G.act = ku),
    (G.cloneElement = function (e, t, r) {
      if (e == null)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            e +
            "."
        );
      var n = mu({}, e.props),
        s = e.key,
        a = e.ref,
        o = e._owner;
      if (t != null) {
        if (
          (t.ref !== void 0 && ((a = t.ref), (o = ao.current)),
          t.key !== void 0 && (s = "" + t.key),
          e.type && e.type.defaultProps)
        )
          var l = e.type.defaultProps;
        for (c in t)
          vu.call(t, c) &&
            !xu.hasOwnProperty(c) &&
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
        $$typeof: vs,
        type: e.type,
        key: s,
        ref: a,
        props: n,
        _owner: o,
      };
    }),
    (G.createContext = function (e) {
      return (
        (e = {
          $$typeof: Sf,
          _currentValue: e,
          _currentValue2: e,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
          _defaultValue: null,
          _globalName: null,
        }),
        (e.Provider = { $$typeof: kf, _context: e }),
        (e.Consumer = e)
      );
    }),
    (G.createElement = bu),
    (G.createFactory = function (e) {
      var t = bu.bind(null, e);
      return ((t.type = e), t);
    }),
    (G.createRef = function () {
      return { current: null };
    }),
    (G.forwardRef = function (e) {
      return { $$typeof: Cf, render: e };
    }),
    (G.isValidElement = io),
    (G.lazy = function (e) {
      return { $$typeof: Nf, _payload: { _status: -1, _result: e }, _init: Tf };
    }),
    (G.memo = function (e, t) {
      return { $$typeof: jf, type: e, compare: t === void 0 ? null : t };
    }),
    (G.startTransition = function (e) {
      var t = ja.transition;
      ja.transition = {};
      try {
        e();
      } finally {
        ja.transition = t;
      }
    }),
    (G.unstable_act = ku),
    (G.useCallback = function (e, t) {
      return $e.current.useCallback(e, t);
    }),
    (G.useContext = function (e) {
      return $e.current.useContext(e);
    }),
    (G.useDebugValue = function () {}),
    (G.useDeferredValue = function (e) {
      return $e.current.useDeferredValue(e);
    }),
    (G.useEffect = function (e, t) {
      return $e.current.useEffect(e, t);
    }),
    (G.useId = function () {
      return $e.current.useId();
    }),
    (G.useImperativeHandle = function (e, t, r) {
      return $e.current.useImperativeHandle(e, t, r);
    }),
    (G.useInsertionEffect = function (e, t) {
      return $e.current.useInsertionEffect(e, t);
    }),
    (G.useLayoutEffect = function (e, t) {
      return $e.current.useLayoutEffect(e, t);
    }),
    (G.useMemo = function (e, t) {
      return $e.current.useMemo(e, t);
    }),
    (G.useReducer = function (e, t, r) {
      return $e.current.useReducer(e, t, r);
    }),
    (G.useRef = function (e) {
      return $e.current.useRef(e);
    }),
    (G.useState = function (e) {
      return $e.current.useState(e);
    }),
    (G.useSyncExternalStore = function (e, t, r) {
      return $e.current.useSyncExternalStore(e, t, r);
    }),
    (G.useTransition = function () {
      return $e.current.useTransition();
    }),
    (G.version = "18.3.1"),
    (du.exports = G));
  var N = du.exports;
  const le = yf(N);
  /**
   * @license React
   * react-jsx-runtime.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Of = N,
    Lf = Symbol.for("react.element"),
    Mf = Symbol.for("react.fragment"),
    Df = Object.prototype.hasOwnProperty,
    If =
      Of.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,
    Ff = { key: !0, ref: !0, __self: !0, __source: !0 };
  function Su(e, t, r) {
    var n,
      s = {},
      a = null,
      o = null;
    (r !== void 0 && (a = "" + r),
      t.key !== void 0 && (a = "" + t.key),
      t.ref !== void 0 && (o = t.ref));
    for (n in t) Df.call(t, n) && !Ff.hasOwnProperty(n) && (s[n] = t[n]);
    if (e && e.defaultProps)
      for (n in ((t = e.defaultProps), t)) s[n] === void 0 && (s[n] = t[n]);
    return {
      $$typeof: Lf,
      type: e,
      key: a,
      ref: o,
      props: s,
      _owner: If.current,
    };
  }
  ((Sa.Fragment = Mf), (Sa.jsx = Su), (Sa.jsxs = Su), (uu.exports = Sa));
  var i = uu.exports,
    Cu = { exports: {} },
    nt = {},
    _u = { exports: {} },
    ju = {};
  /**
   * @license React
   * scheduler.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ ((function (e) {
    function t(z, H) {
      var Z = z.length;
      z.push(H);
      e: for (; 0 < Z; ) {
        var Se = (Z - 1) >>> 1,
          Oe = z[Se];
        if (0 < s(Oe, H)) ((z[Se] = H), (z[Z] = Oe), (Z = Se));
        else break e;
      }
    }
    function r(z) {
      return z.length === 0 ? null : z[0];
    }
    function n(z) {
      if (z.length === 0) return null;
      var H = z[0],
        Z = z.pop();
      if (Z !== H) {
        z[0] = Z;
        e: for (var Se = 0, Oe = z.length, Ji = Oe >>> 1; Se < Ji; ) {
          var bn = 2 * (Se + 1) - 1,
            eu = z[bn],
            wn = bn + 1,
            eo = z[wn];
          if (0 > s(eu, Z))
            wn < Oe && 0 > s(eo, eu)
              ? ((z[Se] = eo), (z[wn] = Z), (Se = wn))
              : ((z[Se] = eu), (z[bn] = Z), (Se = bn));
          else if (wn < Oe && 0 > s(eo, Z))
            ((z[Se] = eo), (z[wn] = Z), (Se = wn));
          else break e;
        }
      }
      return H;
    }
    function s(z, H) {
      var Z = z.sortIndex - H.sortIndex;
      return Z !== 0 ? Z : z.id - H.id;
    }
    if (
      typeof performance == "object" &&
      typeof performance.now == "function"
    ) {
      var a = performance;
      e.unstable_now = function () {
        return a.now();
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
      d = 1,
      h = null,
      m = 3,
      v = !1,
      x = !1,
      k = !1,
      M = typeof setTimeout == "function" ? setTimeout : null,
      y = typeof clearTimeout == "function" ? clearTimeout : null,
      p = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" &&
      navigator.scheduling !== void 0 &&
      navigator.scheduling.isInputPending !== void 0 &&
      navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function g(z) {
      for (var H = r(u); H !== null; ) {
        if (H.callback === null) n(u);
        else if (H.startTime <= z)
          (n(u), (H.sortIndex = H.expirationTime), t(c, H));
        else break;
        H = r(u);
      }
    }
    function b(z) {
      if (((k = !1), g(z), !x))
        if (r(c) !== null) ((x = !0), Xc(j));
        else {
          var H = r(u);
          H !== null && Jc(b, H.startTime - z);
        }
    }
    function j(z, H) {
      ((x = !1), k && ((k = !1), y(P), (P = -1)), (v = !0));
      var Z = m;
      try {
        for (
          g(H), h = r(c);
          h !== null && (!(h.expirationTime > H) || (z && !$()));
        ) {
          var Se = h.callback;
          if (typeof Se == "function") {
            ((h.callback = null), (m = h.priorityLevel));
            var Oe = Se(h.expirationTime <= H);
            ((H = e.unstable_now()),
              typeof Oe == "function" ? (h.callback = Oe) : h === r(c) && n(c),
              g(H));
          } else n(c);
          h = r(c);
        }
        if (h !== null) var Ji = !0;
        else {
          var bn = r(u);
          (bn !== null && Jc(b, bn.startTime - H), (Ji = !1));
        }
        return Ji;
      } finally {
        ((h = null), (m = Z), (v = !1));
      }
    }
    var _ = !1,
      C = null,
      P = -1,
      S = 5,
      A = -1;
    function $() {
      return !(e.unstable_now() - A < S);
    }
    function O() {
      if (C !== null) {
        var z = e.unstable_now();
        A = z;
        var H = !0;
        try {
          H = C(!0, z);
        } finally {
          H ? ye() : ((_ = !1), (C = null));
        }
      } else _ = !1;
    }
    var ye;
    if (typeof p == "function")
      ye = function () {
        p(O);
      };
    else if (typeof MessageChannel < "u") {
      var Nt = new MessageChannel(),
        wa = Nt.port2;
      ((Nt.port1.onmessage = O),
        (ye = function () {
          wa.postMessage(null);
        }));
    } else
      ye = function () {
        M(O, 0);
      };
    function Xc(z) {
      ((C = z), _ || ((_ = !0), ye()));
    }
    function Jc(z, H) {
      P = M(function () {
        z(e.unstable_now());
      }, H);
    }
    ((e.unstable_IdlePriority = 5),
      (e.unstable_ImmediatePriority = 1),
      (e.unstable_LowPriority = 4),
      (e.unstable_NormalPriority = 3),
      (e.unstable_Profiling = null),
      (e.unstable_UserBlockingPriority = 2),
      (e.unstable_cancelCallback = function (z) {
        z.callback = null;
      }),
      (e.unstable_continueExecution = function () {
        x || v || ((x = !0), Xc(j));
      }),
      (e.unstable_forceFrameRate = function (z) {
        0 > z || 125 < z
          ? console.error(
              "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
            )
          : (S = 0 < z ? Math.floor(1e3 / z) : 5);
      }),
      (e.unstable_getCurrentPriorityLevel = function () {
        return m;
      }),
      (e.unstable_getFirstCallbackNode = function () {
        return r(c);
      }),
      (e.unstable_next = function (z) {
        switch (m) {
          case 1:
          case 2:
          case 3:
            var H = 3;
            break;
          default:
            H = m;
        }
        var Z = m;
        m = H;
        try {
          return z();
        } finally {
          m = Z;
        }
      }),
      (e.unstable_pauseExecution = function () {}),
      (e.unstable_requestPaint = function () {}),
      (e.unstable_runWithPriority = function (z, H) {
        switch (z) {
          case 1:
          case 2:
          case 3:
          case 4:
          case 5:
            break;
          default:
            z = 3;
        }
        var Z = m;
        m = z;
        try {
          return H();
        } finally {
          m = Z;
        }
      }),
      (e.unstable_scheduleCallback = function (z, H, Z) {
        var Se = e.unstable_now();
        switch (
          (typeof Z == "object" && Z !== null
            ? ((Z = Z.delay), (Z = typeof Z == "number" && 0 < Z ? Se + Z : Se))
            : (Z = Se),
          z)
        ) {
          case 1:
            var Oe = -1;
            break;
          case 2:
            Oe = 250;
            break;
          case 5:
            Oe = 1073741823;
            break;
          case 4:
            Oe = 1e4;
            break;
          default:
            Oe = 5e3;
        }
        return (
          (Oe = Z + Oe),
          (z = {
            id: d++,
            callback: H,
            priorityLevel: z,
            startTime: Z,
            expirationTime: Oe,
            sortIndex: -1,
          }),
          Z > Se
            ? ((z.sortIndex = Z),
              t(u, z),
              r(c) === null &&
                z === r(u) &&
                (k ? (y(P), (P = -1)) : (k = !0), Jc(b, Z - Se)))
            : ((z.sortIndex = Oe), t(c, z), x || v || ((x = !0), Xc(j))),
          z
        );
      }),
      (e.unstable_shouldYield = $),
      (e.unstable_wrapCallback = function (z) {
        var H = m;
        return function () {
          var Z = m;
          m = H;
          try {
            return z.apply(this, arguments);
          } finally {
            m = Z;
          }
        };
      }));
  })(ju),
    (_u.exports = ju));
  var zf = _u.exports;
  /**
   * @license React
   * react-dom.production.min.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */ var Bf = N,
    st = zf;
  function R(e) {
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
  var Nu = new Set(),
    xs = {};
  function qr(e, t) {
    (Cn(e, t), Cn(e + "Capture", t));
  }
  function Cn(e, t) {
    for (xs[e] = t, e = 0; e < t.length; e++) Nu.add(t[e]);
  }
  var zt = !(
      typeof window > "u" ||
      typeof window.document > "u" ||
      typeof window.document.createElement > "u"
    ),
    lo = Object.prototype.hasOwnProperty,
    Uf =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,
    Ru = {},
    Au = {};
  function qf(e) {
    return lo.call(Au, e)
      ? !0
      : lo.call(Ru, e)
        ? !1
        : Uf.test(e)
          ? (Au[e] = !0)
          : ((Ru[e] = !0), !1);
  }
  function $f(e, t, r, n) {
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
  function Vf(e, t, r, n) {
    if (t === null || typeof t > "u" || $f(e, t, r, n)) return !0;
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
  function Ve(e, t, r, n, s, a, o) {
    ((this.acceptsBooleans = t === 2 || t === 3 || t === 4),
      (this.attributeName = n),
      (this.attributeNamespace = s),
      (this.mustUseProperty = r),
      (this.propertyName = e),
      (this.type = t),
      (this.sanitizeURL = a),
      (this.removeEmptyString = o));
  }
  var Le = {};
  ("children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
    .split(" ")
    .forEach(function (e) {
      Le[e] = new Ve(e, 0, !1, e, null, !1, !1);
    }),
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (e) {
      var t = e[0];
      Le[t] = new Ve(t, 1, !1, e[1], null, !1, !1);
    }),
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(
      function (e) {
        Le[e] = new Ve(e, 2, !1, e.toLowerCase(), null, !1, !1);
      }
    ),
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (e) {
      Le[e] = new Ve(e, 2, !1, e, null, !1, !1);
    }),
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (e) {
        Le[e] = new Ve(e, 3, !1, e.toLowerCase(), null, !1, !1);
      }),
    ["checked", "multiple", "muted", "selected"].forEach(function (e) {
      Le[e] = new Ve(e, 3, !0, e, null, !1, !1);
    }),
    ["capture", "download"].forEach(function (e) {
      Le[e] = new Ve(e, 4, !1, e, null, !1, !1);
    }),
    ["cols", "rows", "size", "span"].forEach(function (e) {
      Le[e] = new Ve(e, 6, !1, e, null, !1, !1);
    }),
    ["rowSpan", "start"].forEach(function (e) {
      Le[e] = new Ve(e, 5, !1, e.toLowerCase(), null, !1, !1);
    }));
  var co = /[\-:]([a-z])/g;
  function uo(e) {
    return e[1].toUpperCase();
  }
  ("accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
    .split(" ")
    .forEach(function (e) {
      var t = e.replace(co, uo);
      Le[t] = new Ve(t, 1, !1, e, null, !1, !1);
    }),
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (e) {
        var t = e.replace(co, uo);
        Le[t] = new Ve(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
      }),
    ["xml:base", "xml:lang", "xml:space"].forEach(function (e) {
      var t = e.replace(co, uo);
      Le[t] = new Ve(
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
      Le[e] = new Ve(e, 1, !1, e.toLowerCase(), null, !1, !1);
    }),
    (Le.xlinkHref = new Ve(
      "xlinkHref",
      1,
      !1,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      !1
    )),
    ["src", "href", "action", "formAction"].forEach(function (e) {
      Le[e] = new Ve(e, 1, !1, e.toLowerCase(), null, !0, !0);
    }));
  function po(e, t, r, n) {
    var s = Le.hasOwnProperty(t) ? Le[t] : null;
    (s !== null
      ? s.type !== 0
      : n ||
        !(2 < t.length) ||
        (t[0] !== "o" && t[0] !== "O") ||
        (t[1] !== "n" && t[1] !== "N")) &&
      (Vf(t, r, s, n) && (r = null),
      n || s === null
        ? qf(t) &&
          (r === null ? e.removeAttribute(t) : e.setAttribute(t, "" + r))
        : s.mustUseProperty
          ? (e[s.propertyName] = r === null ? (s.type === 3 ? !1 : "") : r)
          : ((t = s.attributeName),
            (n = s.attributeNamespace),
            r === null
              ? e.removeAttribute(t)
              : ((s = s.type),
                (r = s === 3 || (s === 4 && r === !0) ? "" : "" + r),
                n ? e.setAttributeNS(n, t, r) : e.setAttribute(t, r))));
  }
  var Bt = Bf.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,
    Na = Symbol.for("react.element"),
    _n = Symbol.for("react.portal"),
    jn = Symbol.for("react.fragment"),
    ho = Symbol.for("react.strict_mode"),
    mo = Symbol.for("react.profiler"),
    Eu = Symbol.for("react.provider"),
    Tu = Symbol.for("react.context"),
    fo = Symbol.for("react.forward_ref"),
    go = Symbol.for("react.suspense"),
    yo = Symbol.for("react.suspense_list"),
    vo = Symbol.for("react.memo"),
    ir = Symbol.for("react.lazy"),
    Pu = Symbol.for("react.offscreen"),
    Ou = Symbol.iterator;
  function bs(e) {
    return e === null || typeof e != "object"
      ? null
      : ((e = (Ou && e[Ou]) || e["@@iterator"]),
        typeof e == "function" ? e : null);
  }
  var me = Object.assign,
    xo;
  function ws(e) {
    if (xo === void 0)
      try {
        throw Error();
      } catch (r) {
        var t = r.stack.trim().match(/\n( *(at )?)/);
        xo = (t && t[1]) || "";
      }
    return (
      `
` +
      xo +
      e
    );
  }
  var bo = !1;
  function wo(e, t) {
    if (!e || bo) return "";
    bo = !0;
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
          var s = u.stack.split(`
`),
            a = n.stack.split(`
`),
            o = s.length - 1,
            l = a.length - 1;
          1 <= o && 0 <= l && s[o] !== a[l];
        )
          l--;
        for (; 1 <= o && 0 <= l; o--, l--)
          if (s[o] !== a[l]) {
            if (o !== 1 || l !== 1)
              do
                if ((o--, l--, 0 > l || s[o] !== a[l])) {
                  var c =
                    `
` + s[o].replace(" at new ", " at ");
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
      ((bo = !1), (Error.prepareStackTrace = r));
    }
    return (e = e ? e.displayName || e.name : "") ? ws(e) : "";
  }
  function Wf(e) {
    switch (e.tag) {
      case 5:
        return ws(e.type);
      case 16:
        return ws("Lazy");
      case 13:
        return ws("Suspense");
      case 19:
        return ws("SuspenseList");
      case 0:
      case 2:
      case 15:
        return ((e = wo(e.type, !1)), e);
      case 11:
        return ((e = wo(e.type.render, !1)), e);
      case 1:
        return ((e = wo(e.type, !0)), e);
      default:
        return "";
    }
  }
  function ko(e) {
    if (e == null) return null;
    if (typeof e == "function") return e.displayName || e.name || null;
    if (typeof e == "string") return e;
    switch (e) {
      case jn:
        return "Fragment";
      case _n:
        return "Portal";
      case mo:
        return "Profiler";
      case ho:
        return "StrictMode";
      case go:
        return "Suspense";
      case yo:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Tu:
          return (e.displayName || "Context") + ".Consumer";
        case Eu:
          return (e._context.displayName || "Context") + ".Provider";
        case fo:
          var t = e.render;
          return (
            (e = e.displayName),
            e ||
              ((e = t.displayName || t.name || ""),
              (e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef")),
            e
          );
        case vo:
          return (
            (t = e.displayName || null),
            t !== null ? t : ko(e.type) || "Memo"
          );
        case ir:
          ((t = e._payload), (e = e._init));
          try {
            return ko(e(t));
          } catch {}
      }
    return null;
  }
  function Kf(e) {
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
        return ko(t);
      case 8:
        return t === ho ? "StrictMode" : "Mode";
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
  function or(e) {
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
  function Lu(e) {
    var t = e.type;
    return (
      (e = e.nodeName) &&
      e.toLowerCase() === "input" &&
      (t === "checkbox" || t === "radio")
    );
  }
  function Hf(e) {
    var t = Lu(e) ? "checked" : "value",
      r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t),
      n = "" + e[t];
    if (
      !e.hasOwnProperty(t) &&
      typeof r < "u" &&
      typeof r.get == "function" &&
      typeof r.set == "function"
    ) {
      var s = r.get,
        a = r.set;
      return (
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function () {
            return s.call(this);
          },
          set: function (o) {
            ((n = "" + o), a.call(this, o));
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
  function Ra(e) {
    e._valueTracker || (e._valueTracker = Hf(e));
  }
  function Mu(e) {
    if (!e) return !1;
    var t = e._valueTracker;
    if (!t) return !0;
    var r = t.getValue(),
      n = "";
    return (
      e && (n = Lu(e) ? (e.checked ? "true" : "false") : e.value),
      (e = n),
      e !== r ? (t.setValue(e), !0) : !1
    );
  }
  function Aa(e) {
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
  function So(e, t) {
    var r = t.checked;
    return me({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: r ?? e._wrapperState.initialChecked,
    });
  }
  function Du(e, t) {
    var r = t.defaultValue == null ? "" : t.defaultValue,
      n = t.checked != null ? t.checked : t.defaultChecked;
    ((r = or(t.value != null ? t.value : r)),
      (e._wrapperState = {
        initialChecked: n,
        initialValue: r,
        controlled:
          t.type === "checkbox" || t.type === "radio"
            ? t.checked != null
            : t.value != null,
      }));
  }
  function Iu(e, t) {
    ((t = t.checked), t != null && po(e, "checked", t, !1));
  }
  function Co(e, t) {
    Iu(e, t);
    var r = or(t.value),
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
      ? _o(e, t.type, r)
      : t.hasOwnProperty("defaultValue") && _o(e, t.type, or(t.defaultValue)),
      t.checked == null &&
        t.defaultChecked != null &&
        (e.defaultChecked = !!t.defaultChecked));
  }
  function Fu(e, t, r) {
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
  function _o(e, t, r) {
    (t !== "number" || Aa(e.ownerDocument) !== e) &&
      (r == null
        ? (e.defaultValue = "" + e._wrapperState.initialValue)
        : e.defaultValue !== "" + r && (e.defaultValue = "" + r));
  }
  var ks = Array.isArray;
  function Nn(e, t, r, n) {
    if (((e = e.options), t)) {
      t = {};
      for (var s = 0; s < r.length; s++) t["$" + r[s]] = !0;
      for (r = 0; r < e.length; r++)
        ((s = t.hasOwnProperty("$" + e[r].value)),
          e[r].selected !== s && (e[r].selected = s),
          s && n && (e[r].defaultSelected = !0));
    } else {
      for (r = "" + or(r), t = null, s = 0; s < e.length; s++) {
        if (e[s].value === r) {
          ((e[s].selected = !0), n && (e[s].defaultSelected = !0));
          return;
        }
        t !== null || e[s].disabled || (t = e[s]);
      }
      t !== null && (t.selected = !0);
    }
  }
  function jo(e, t) {
    if (t.dangerouslySetInnerHTML != null) throw Error(R(91));
    return me({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: "" + e._wrapperState.initialValue,
    });
  }
  function zu(e, t) {
    var r = t.value;
    if (r == null) {
      if (((r = t.children), (t = t.defaultValue), r != null)) {
        if (t != null) throw Error(R(92));
        if (ks(r)) {
          if (1 < r.length) throw Error(R(93));
          r = r[0];
        }
        t = r;
      }
      (t == null && (t = ""), (r = t));
    }
    e._wrapperState = { initialValue: or(r) };
  }
  function Bu(e, t) {
    var r = or(t.value),
      n = or(t.defaultValue);
    (r != null &&
      ((r = "" + r),
      r !== e.value && (e.value = r),
      t.defaultValue == null && e.defaultValue !== r && (e.defaultValue = r)),
      n != null && (e.defaultValue = "" + n));
  }
  function Uu(e) {
    var t = e.textContent;
    t === e._wrapperState.initialValue &&
      t !== "" &&
      t !== null &&
      (e.value = t);
  }
  function qu(e) {
    switch (e) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function No(e, t) {
    return e == null || e === "http://www.w3.org/1999/xhtml"
      ? qu(t)
      : e === "http://www.w3.org/2000/svg" && t === "foreignObject"
        ? "http://www.w3.org/1999/xhtml"
        : e;
  }
  var Ea,
    $u = (function (e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction
        ? function (t, r, n, s) {
            MSApp.execUnsafeLocalFunction(function () {
              return e(t, r, n, s);
            });
          }
        : e;
    })(function (e, t) {
      if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e)
        e.innerHTML = t;
      else {
        for (
          Ea = Ea || document.createElement("div"),
            Ea.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>",
            t = Ea.firstChild;
          e.firstChild;
        )
          e.removeChild(e.firstChild);
        for (; t.firstChild; ) e.appendChild(t.firstChild);
      }
    });
  function Ss(e, t) {
    if (t) {
      var r = e.firstChild;
      if (r && r === e.lastChild && r.nodeType === 3) {
        r.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }
  var Cs = {
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
    Qf = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Cs).forEach(function (e) {
    Qf.forEach(function (t) {
      ((t = t + e.charAt(0).toUpperCase() + e.substring(1)), (Cs[t] = Cs[e]));
    });
  });
  function Vu(e, t, r) {
    return t == null || typeof t == "boolean" || t === ""
      ? ""
      : r || typeof t != "number" || t === 0 || (Cs.hasOwnProperty(e) && Cs[e])
        ? ("" + t).trim()
        : t + "px";
  }
  function Wu(e, t) {
    e = e.style;
    for (var r in t)
      if (t.hasOwnProperty(r)) {
        var n = r.indexOf("--") === 0,
          s = Vu(r, t[r], n);
        (r === "float" && (r = "cssFloat"),
          n ? e.setProperty(r, s) : (e[r] = s));
      }
  }
  var Zf = me(
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
  function Ro(e, t) {
    if (t) {
      if (Zf[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw Error(R(137, e));
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null) throw Error(R(60));
        if (
          typeof t.dangerouslySetInnerHTML != "object" ||
          !("__html" in t.dangerouslySetInnerHTML)
        )
          throw Error(R(61));
      }
      if (t.style != null && typeof t.style != "object") throw Error(R(62));
    }
  }
  function Ao(e, t) {
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
  var Eo = null;
  function To(e) {
    return (
      (e = e.target || e.srcElement || window),
      e.correspondingUseElement && (e = e.correspondingUseElement),
      e.nodeType === 3 ? e.parentNode : e
    );
  }
  var Po = null,
    Rn = null,
    An = null;
  function Ku(e) {
    if ((e = Ks(e))) {
      if (typeof Po != "function") throw Error(R(280));
      var t = e.stateNode;
      t && ((t = Ja(t)), Po(e.stateNode, e.type, t));
    }
  }
  function Hu(e) {
    Rn ? (An ? An.push(e) : (An = [e])) : (Rn = e);
  }
  function Qu() {
    if (Rn) {
      var e = Rn,
        t = An;
      if (((An = Rn = null), Ku(e), t)) for (e = 0; e < t.length; e++) Ku(t[e]);
    }
  }
  function Zu(e, t) {
    return e(t);
  }
  function Gu() {}
  var Oo = !1;
  function Yu(e, t, r) {
    if (Oo) return e(t, r);
    Oo = !0;
    try {
      return Zu(e, t, r);
    } finally {
      ((Oo = !1), (Rn !== null || An !== null) && (Gu(), Qu()));
    }
  }
  function _s(e, t) {
    var r = e.stateNode;
    if (r === null) return null;
    var n = Ja(r);
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
    if (r && typeof r != "function") throw Error(R(231, t, typeof r));
    return r;
  }
  var Lo = !1;
  if (zt)
    try {
      var js = {};
      (Object.defineProperty(js, "passive", {
        get: function () {
          Lo = !0;
        },
      }),
        window.addEventListener("test", js, js),
        window.removeEventListener("test", js, js));
    } catch {
      Lo = !1;
    }
  function Gf(e, t, r, n, s, a, o, l, c) {
    var u = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(r, u);
    } catch (d) {
      this.onError(d);
    }
  }
  var Ns = !1,
    Ta = null,
    Pa = !1,
    Mo = null,
    Yf = {
      onError: function (e) {
        ((Ns = !0), (Ta = e));
      },
    };
  function Xf(e, t, r, n, s, a, o, l, c) {
    ((Ns = !1), (Ta = null), Gf.apply(Yf, arguments));
  }
  function Jf(e, t, r, n, s, a, o, l, c) {
    if ((Xf.apply(this, arguments), Ns)) {
      if (Ns) {
        var u = Ta;
        ((Ns = !1), (Ta = null));
      } else throw Error(R(198));
      Pa || ((Pa = !0), (Mo = u));
    }
  }
  function $r(e) {
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
  function Xu(e) {
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
  function Ju(e) {
    if ($r(e) !== e) throw Error(R(188));
  }
  function eg(e) {
    var t = e.alternate;
    if (!t) {
      if (((t = $r(e)), t === null)) throw Error(R(188));
      return t !== e ? null : e;
    }
    for (var r = e, n = t; ; ) {
      var s = r.return;
      if (s === null) break;
      var a = s.alternate;
      if (a === null) {
        if (((n = s.return), n !== null)) {
          r = n;
          continue;
        }
        break;
      }
      if (s.child === a.child) {
        for (a = s.child; a; ) {
          if (a === r) return (Ju(s), e);
          if (a === n) return (Ju(s), t);
          a = a.sibling;
        }
        throw Error(R(188));
      }
      if (r.return !== n.return) ((r = s), (n = a));
      else {
        for (var o = !1, l = s.child; l; ) {
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
        if (!o) {
          for (l = a.child; l; ) {
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
          if (!o) throw Error(R(189));
        }
      }
      if (r.alternate !== n) throw Error(R(190));
    }
    if (r.tag !== 3) throw Error(R(188));
    return r.stateNode.current === r ? e : t;
  }
  function ed(e) {
    return ((e = eg(e)), e !== null ? td(e) : null);
  }
  function td(e) {
    if (e.tag === 5 || e.tag === 6) return e;
    for (e = e.child; e !== null; ) {
      var t = td(e);
      if (t !== null) return t;
      e = e.sibling;
    }
    return null;
  }
  var rd = st.unstable_scheduleCallback,
    nd = st.unstable_cancelCallback,
    tg = st.unstable_shouldYield,
    rg = st.unstable_requestPaint,
    ke = st.unstable_now,
    ng = st.unstable_getCurrentPriorityLevel,
    Do = st.unstable_ImmediatePriority,
    sd = st.unstable_UserBlockingPriority,
    Oa = st.unstable_NormalPriority,
    sg = st.unstable_LowPriority,
    ad = st.unstable_IdlePriority,
    La = null,
    Rt = null;
  function ag(e) {
    if (Rt && typeof Rt.onCommitFiberRoot == "function")
      try {
        Rt.onCommitFiberRoot(La, e, void 0, (e.current.flags & 128) === 128);
      } catch {}
  }
  var xt = Math.clz32 ? Math.clz32 : lg,
    ig = Math.log,
    og = Math.LN2;
  function lg(e) {
    return ((e >>>= 0), e === 0 ? 32 : (31 - ((ig(e) / og) | 0)) | 0);
  }
  var Ma = 64,
    Da = 4194304;
  function Rs(e) {
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
  function Ia(e, t) {
    var r = e.pendingLanes;
    if (r === 0) return 0;
    var n = 0,
      s = e.suspendedLanes,
      a = e.pingedLanes,
      o = r & 268435455;
    if (o !== 0) {
      var l = o & ~s;
      l !== 0 ? (n = Rs(l)) : ((a &= o), a !== 0 && (n = Rs(a)));
    } else ((o = r & ~s), o !== 0 ? (n = Rs(o)) : a !== 0 && (n = Rs(a)));
    if (n === 0) return 0;
    if (
      t !== 0 &&
      t !== n &&
      (t & s) === 0 &&
      ((s = n & -n), (a = t & -t), s >= a || (s === 16 && (a & 4194240) !== 0))
    )
      return t;
    if (((n & 4) !== 0 && (n |= r & 16), (t = e.entangledLanes), t !== 0))
      for (e = e.entanglements, t &= n; 0 < t; )
        ((r = 31 - xt(t)), (s = 1 << r), (n |= e[r]), (t &= ~s));
    return n;
  }
  function cg(e, t) {
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
  function ug(e, t) {
    for (
      var r = e.suspendedLanes,
        n = e.pingedLanes,
        s = e.expirationTimes,
        a = e.pendingLanes;
      0 < a;
    ) {
      var o = 31 - xt(a),
        l = 1 << o,
        c = s[o];
      (c === -1
        ? ((l & r) === 0 || (l & n) !== 0) && (s[o] = cg(l, t))
        : c <= t && (e.expiredLanes |= l),
        (a &= ~l));
    }
  }
  function Io(e) {
    return (
      (e = e.pendingLanes & -1073741825),
      e !== 0 ? e : e & 1073741824 ? 1073741824 : 0
    );
  }
  function id() {
    var e = Ma;
    return ((Ma <<= 1), (Ma & 4194240) === 0 && (Ma = 64), e);
  }
  function Fo(e) {
    for (var t = [], r = 0; 31 > r; r++) t.push(e);
    return t;
  }
  function As(e, t, r) {
    ((e.pendingLanes |= t),
      t !== 536870912 && ((e.suspendedLanes = 0), (e.pingedLanes = 0)),
      (e = e.eventTimes),
      (t = 31 - xt(t)),
      (e[t] = r));
  }
  function dg(e, t) {
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
      var s = 31 - xt(r),
        a = 1 << s;
      ((t[s] = 0), (n[s] = -1), (e[s] = -1), (r &= ~a));
    }
  }
  function zo(e, t) {
    var r = (e.entangledLanes |= t);
    for (e = e.entanglements; r; ) {
      var n = 31 - xt(r),
        s = 1 << n;
      ((s & t) | (e[n] & t) && (e[n] |= t), (r &= ~s));
    }
  }
  var ae = 0;
  function od(e) {
    return (
      (e &= -e),
      1 < e ? (4 < e ? ((e & 268435455) !== 0 ? 16 : 536870912) : 4) : 1
    );
  }
  var ld,
    Bo,
    cd,
    ud,
    dd,
    Uo = !1,
    Fa = [],
    lr = null,
    cr = null,
    ur = null,
    Es = new Map(),
    Ts = new Map(),
    dr = [],
    pg =
      "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(
        " "
      );
  function pd(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        lr = null;
        break;
      case "dragenter":
      case "dragleave":
        cr = null;
        break;
      case "mouseover":
      case "mouseout":
        ur = null;
        break;
      case "pointerover":
      case "pointerout":
        Es.delete(t.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Ts.delete(t.pointerId);
    }
  }
  function Ps(e, t, r, n, s, a) {
    return e === null || e.nativeEvent !== a
      ? ((e = {
          blockedOn: t,
          domEventName: r,
          eventSystemFlags: n,
          nativeEvent: a,
          targetContainers: [s],
        }),
        t !== null && ((t = Ks(t)), t !== null && Bo(t)),
        e)
      : ((e.eventSystemFlags |= n),
        (t = e.targetContainers),
        s !== null && t.indexOf(s) === -1 && t.push(s),
        e);
  }
  function hg(e, t, r, n, s) {
    switch (t) {
      case "focusin":
        return ((lr = Ps(lr, e, t, r, n, s)), !0);
      case "dragenter":
        return ((cr = Ps(cr, e, t, r, n, s)), !0);
      case "mouseover":
        return ((ur = Ps(ur, e, t, r, n, s)), !0);
      case "pointerover":
        var a = s.pointerId;
        return (Es.set(a, Ps(Es.get(a) || null, e, t, r, n, s)), !0);
      case "gotpointercapture":
        return (
          (a = s.pointerId),
          Ts.set(a, Ps(Ts.get(a) || null, e, t, r, n, s)),
          !0
        );
    }
    return !1;
  }
  function hd(e) {
    var t = Vr(e.target);
    if (t !== null) {
      var r = $r(t);
      if (r !== null) {
        if (((t = r.tag), t === 13)) {
          if (((t = Xu(r)), t !== null)) {
            ((e.blockedOn = t),
              dd(e.priority, function () {
                cd(r);
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
  function za(e) {
    if (e.blockedOn !== null) return !1;
    for (var t = e.targetContainers; 0 < t.length; ) {
      var r = $o(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
      if (r === null) {
        r = e.nativeEvent;
        var n = new r.constructor(r.type, r);
        ((Eo = n), r.target.dispatchEvent(n), (Eo = null));
      } else return ((t = Ks(r)), t !== null && Bo(t), (e.blockedOn = r), !1);
      t.shift();
    }
    return !0;
  }
  function md(e, t, r) {
    za(e) && r.delete(t);
  }
  function mg() {
    ((Uo = !1),
      lr !== null && za(lr) && (lr = null),
      cr !== null && za(cr) && (cr = null),
      ur !== null && za(ur) && (ur = null),
      Es.forEach(md),
      Ts.forEach(md));
  }
  function Os(e, t) {
    e.blockedOn === t &&
      ((e.blockedOn = null),
      Uo ||
        ((Uo = !0),
        st.unstable_scheduleCallback(st.unstable_NormalPriority, mg)));
  }
  function Ls(e) {
    function t(s) {
      return Os(s, e);
    }
    if (0 < Fa.length) {
      Os(Fa[0], e);
      for (var r = 1; r < Fa.length; r++) {
        var n = Fa[r];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    for (
      lr !== null && Os(lr, e),
        cr !== null && Os(cr, e),
        ur !== null && Os(ur, e),
        Es.forEach(t),
        Ts.forEach(t),
        r = 0;
      r < dr.length;
      r++
    )
      ((n = dr[r]), n.blockedOn === e && (n.blockedOn = null));
    for (; 0 < dr.length && ((r = dr[0]), r.blockedOn === null); )
      (hd(r), r.blockedOn === null && dr.shift());
  }
  var En = Bt.ReactCurrentBatchConfig,
    Ba = !0;
  function fg(e, t, r, n) {
    var s = ae,
      a = En.transition;
    En.transition = null;
    try {
      ((ae = 1), qo(e, t, r, n));
    } finally {
      ((ae = s), (En.transition = a));
    }
  }
  function gg(e, t, r, n) {
    var s = ae,
      a = En.transition;
    En.transition = null;
    try {
      ((ae = 4), qo(e, t, r, n));
    } finally {
      ((ae = s), (En.transition = a));
    }
  }
  function qo(e, t, r, n) {
    if (Ba) {
      var s = $o(e, t, r, n);
      if (s === null) (il(e, t, n, Ua, r), pd(e, n));
      else if (hg(s, e, t, r, n)) n.stopPropagation();
      else if ((pd(e, n), t & 4 && -1 < pg.indexOf(e))) {
        for (; s !== null; ) {
          var a = Ks(s);
          if (
            (a !== null && ld(a),
            (a = $o(e, t, r, n)),
            a === null && il(e, t, n, Ua, r),
            a === s)
          )
            break;
          s = a;
        }
        s !== null && n.stopPropagation();
      } else il(e, t, n, null, r);
    }
  }
  var Ua = null;
  function $o(e, t, r, n) {
    if (((Ua = null), (e = To(n)), (e = Vr(e)), e !== null))
      if (((t = $r(e)), t === null)) e = null;
      else if (((r = t.tag), r === 13)) {
        if (((e = Xu(t)), e !== null)) return e;
        e = null;
      } else if (r === 3) {
        if (t.stateNode.current.memoizedState.isDehydrated)
          return t.tag === 3 ? t.stateNode.containerInfo : null;
        e = null;
      } else t !== e && (e = null);
    return ((Ua = e), null);
  }
  function fd(e) {
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
        switch (ng()) {
          case Do:
            return 1;
          case sd:
            return 4;
          case Oa:
          case sg:
            return 16;
          case ad:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var pr = null,
    Vo = null,
    qa = null;
  function gd() {
    if (qa) return qa;
    var e,
      t = Vo,
      r = t.length,
      n,
      s = "value" in pr ? pr.value : pr.textContent,
      a = s.length;
    for (e = 0; e < r && t[e] === s[e]; e++);
    var o = r - e;
    for (n = 1; n <= o && t[r - n] === s[a - n]; n++);
    return (qa = s.slice(e, 1 < n ? 1 - n : void 0));
  }
  function $a(e) {
    var t = e.keyCode;
    return (
      "charCode" in e
        ? ((e = e.charCode), e === 0 && t === 13 && (e = 13))
        : (e = t),
      e === 10 && (e = 13),
      32 <= e || e === 13 ? e : 0
    );
  }
  function Va() {
    return !0;
  }
  function yd() {
    return !1;
  }
  function at(e) {
    function t(r, n, s, a, o) {
      ((this._reactName = r),
        (this._targetInst = s),
        (this.type = n),
        (this.nativeEvent = a),
        (this.target = o),
        (this.currentTarget = null));
      for (var l in e)
        e.hasOwnProperty(l) && ((r = e[l]), (this[l] = r ? r(a) : a[l]));
      return (
        (this.isDefaultPrevented = (
          a.defaultPrevented != null ? a.defaultPrevented : a.returnValue === !1
        )
          ? Va
          : yd),
        (this.isPropagationStopped = yd),
        this
      );
    }
    return (
      me(t.prototype, {
        preventDefault: function () {
          this.defaultPrevented = !0;
          var r = this.nativeEvent;
          r &&
            (r.preventDefault
              ? r.preventDefault()
              : typeof r.returnValue != "unknown" && (r.returnValue = !1),
            (this.isDefaultPrevented = Va));
        },
        stopPropagation: function () {
          var r = this.nativeEvent;
          r &&
            (r.stopPropagation
              ? r.stopPropagation()
              : typeof r.cancelBubble != "unknown" && (r.cancelBubble = !0),
            (this.isPropagationStopped = Va));
        },
        persist: function () {},
        isPersistent: Va,
      }),
      t
    );
  }
  var Tn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function (e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0,
    },
    Wo = at(Tn),
    Ms = me({}, Tn, { view: 0, detail: 0 }),
    yg = at(Ms),
    Ko,
    Ho,
    Ds,
    Wa = me({}, Ms, {
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
      getModifierState: Zo,
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
          : (e !== Ds &&
              (Ds && e.type === "mousemove"
                ? ((Ko = e.screenX - Ds.screenX), (Ho = e.screenY - Ds.screenY))
                : (Ho = Ko = 0),
              (Ds = e)),
            Ko);
      },
      movementY: function (e) {
        return "movementY" in e ? e.movementY : Ho;
      },
    }),
    vd = at(Wa),
    vg = me({}, Wa, { dataTransfer: 0 }),
    xg = at(vg),
    bg = me({}, Ms, { relatedTarget: 0 }),
    Qo = at(bg),
    wg = me({}, Tn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }),
    kg = at(wg),
    Sg = me({}, Tn, {
      clipboardData: function (e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      },
    }),
    Cg = at(Sg),
    _g = me({}, Tn, { data: 0 }),
    xd = at(_g),
    jg = {
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
    Ng = {
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
    Rg = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey",
    };
  function Ag(e) {
    var t = this.nativeEvent;
    return t.getModifierState
      ? t.getModifierState(e)
      : (e = Rg[e])
        ? !!t[e]
        : !1;
  }
  function Zo() {
    return Ag;
  }
  var Eg = me({}, Ms, {
      key: function (e) {
        if (e.key) {
          var t = jg[e.key] || e.key;
          if (t !== "Unidentified") return t;
        }
        return e.type === "keypress"
          ? ((e = $a(e)), e === 13 ? "Enter" : String.fromCharCode(e))
          : e.type === "keydown" || e.type === "keyup"
            ? Ng[e.keyCode] || "Unidentified"
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
      getModifierState: Zo,
      charCode: function (e) {
        return e.type === "keypress" ? $a(e) : 0;
      },
      keyCode: function (e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function (e) {
        return e.type === "keypress"
          ? $a(e)
          : e.type === "keydown" || e.type === "keyup"
            ? e.keyCode
            : 0;
      },
    }),
    Tg = at(Eg),
    Pg = me({}, Wa, {
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
    bd = at(Pg),
    Og = me({}, Ms, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: Zo,
    }),
    Lg = at(Og),
    Mg = me({}, Tn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }),
    Dg = at(Mg),
    Ig = me({}, Wa, {
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
    Fg = at(Ig),
    zg = [9, 13, 27, 32],
    Go = zt && "CompositionEvent" in window,
    Is = null;
  zt && "documentMode" in document && (Is = document.documentMode);
  var Bg = zt && "TextEvent" in window && !Is,
    wd = zt && (!Go || (Is && 8 < Is && 11 >= Is)),
    kd = " ",
    Sd = !1;
  function Cd(e, t) {
    switch (e) {
      case "keyup":
        return zg.indexOf(t.keyCode) !== -1;
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
  function _d(e) {
    return (
      (e = e.detail),
      typeof e == "object" && "data" in e ? e.data : null
    );
  }
  var Pn = !1;
  function Ug(e, t) {
    switch (e) {
      case "compositionend":
        return _d(t);
      case "keypress":
        return t.which !== 32 ? null : ((Sd = !0), kd);
      case "textInput":
        return ((e = t.data), e === kd && Sd ? null : e);
      default:
        return null;
    }
  }
  function qg(e, t) {
    if (Pn)
      return e === "compositionend" || (!Go && Cd(e, t))
        ? ((e = gd()), (qa = Vo = pr = null), (Pn = !1), e)
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
        return wd && t.locale !== "ko" ? null : t.data;
      default:
        return null;
    }
  }
  var $g = {
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
  function jd(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!$g[e.type] : t === "textarea";
  }
  function Nd(e, t, r, n) {
    (Hu(n),
      (t = Ga(t, "onChange")),
      0 < t.length &&
        ((r = new Wo("onChange", "change", null, r, n)),
        e.push({ event: r, listeners: t })));
  }
  var Fs = null,
    zs = null;
  function Vg(e) {
    Wd(e, 0);
  }
  function Ka(e) {
    var t = In(e);
    if (Mu(t)) return e;
  }
  function Wg(e, t) {
    if (e === "change") return t;
  }
  var Rd = !1;
  if (zt) {
    var Yo;
    if (zt) {
      var Xo = "oninput" in document;
      if (!Xo) {
        var Ad = document.createElement("div");
        (Ad.setAttribute("oninput", "return;"),
          (Xo = typeof Ad.oninput == "function"));
      }
      Yo = Xo;
    } else Yo = !1;
    Rd = Yo && (!document.documentMode || 9 < document.documentMode);
  }
  function Ed() {
    Fs && (Fs.detachEvent("onpropertychange", Td), (zs = Fs = null));
  }
  function Td(e) {
    if (e.propertyName === "value" && Ka(zs)) {
      var t = [];
      (Nd(t, zs, e, To(e)), Yu(Vg, t));
    }
  }
  function Kg(e, t, r) {
    e === "focusin"
      ? (Ed(), (Fs = t), (zs = r), Fs.attachEvent("onpropertychange", Td))
      : e === "focusout" && Ed();
  }
  function Hg(e) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Ka(zs);
  }
  function Qg(e, t) {
    if (e === "click") return Ka(t);
  }
  function Zg(e, t) {
    if (e === "input" || e === "change") return Ka(t);
  }
  function Gg(e, t) {
    return (e === t && (e !== 0 || 1 / e === 1 / t)) || (e !== e && t !== t);
  }
  var bt = typeof Object.is == "function" ? Object.is : Gg;
  function Bs(e, t) {
    if (bt(e, t)) return !0;
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
      var s = r[n];
      if (!lo.call(t, s) || !bt(e[s], t[s])) return !1;
    }
    return !0;
  }
  function Pd(e) {
    for (; e && e.firstChild; ) e = e.firstChild;
    return e;
  }
  function Od(e, t) {
    var r = Pd(e);
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
      r = Pd(r);
    }
  }
  function Ld(e, t) {
    return e && t
      ? e === t
        ? !0
        : e && e.nodeType === 3
          ? !1
          : t && t.nodeType === 3
            ? Ld(e, t.parentNode)
            : "contains" in e
              ? e.contains(t)
              : e.compareDocumentPosition
                ? !!(e.compareDocumentPosition(t) & 16)
                : !1
      : !1;
  }
  function Md() {
    for (var e = window, t = Aa(); t instanceof e.HTMLIFrameElement; ) {
      try {
        var r = typeof t.contentWindow.location.href == "string";
      } catch {
        r = !1;
      }
      if (r) e = t.contentWindow;
      else break;
      t = Aa(e.document);
    }
    return t;
  }
  function Jo(e) {
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
  function Yg(e) {
    var t = Md(),
      r = e.focusedElem,
      n = e.selectionRange;
    if (
      t !== r &&
      r &&
      r.ownerDocument &&
      Ld(r.ownerDocument.documentElement, r)
    ) {
      if (n !== null && Jo(r)) {
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
          var s = r.textContent.length,
            a = Math.min(n.start, s);
          ((n = n.end === void 0 ? a : Math.min(n.end, s)),
            !e.extend && a > n && ((s = n), (n = a), (a = s)),
            (s = Od(r, a)));
          var o = Od(r, n);
          s &&
            o &&
            (e.rangeCount !== 1 ||
              e.anchorNode !== s.node ||
              e.anchorOffset !== s.offset ||
              e.focusNode !== o.node ||
              e.focusOffset !== o.offset) &&
            ((t = t.createRange()),
            t.setStart(s.node, s.offset),
            e.removeAllRanges(),
            a > n
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
  var Xg = zt && "documentMode" in document && 11 >= document.documentMode,
    On = null,
    el = null,
    Us = null,
    tl = !1;
  function Dd(e, t, r) {
    var n =
      r.window === r ? r.document : r.nodeType === 9 ? r : r.ownerDocument;
    tl ||
      On == null ||
      On !== Aa(n) ||
      ((n = On),
      "selectionStart" in n && Jo(n)
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
      (Us && Bs(Us, n)) ||
        ((Us = n),
        (n = Ga(el, "onSelect")),
        0 < n.length &&
          ((t = new Wo("onSelect", "select", null, t, r)),
          e.push({ event: t, listeners: n }),
          (t.target = On))));
  }
  function Ha(e, t) {
    var r = {};
    return (
      (r[e.toLowerCase()] = t.toLowerCase()),
      (r["Webkit" + e] = "webkit" + t),
      (r["Moz" + e] = "moz" + t),
      r
    );
  }
  var Ln = {
      animationend: Ha("Animation", "AnimationEnd"),
      animationiteration: Ha("Animation", "AnimationIteration"),
      animationstart: Ha("Animation", "AnimationStart"),
      transitionend: Ha("Transition", "TransitionEnd"),
    },
    rl = {},
    Id = {};
  zt &&
    ((Id = document.createElement("div").style),
    "AnimationEvent" in window ||
      (delete Ln.animationend.animation,
      delete Ln.animationiteration.animation,
      delete Ln.animationstart.animation),
    "TransitionEvent" in window || delete Ln.transitionend.transition);
  function Qa(e) {
    if (rl[e]) return rl[e];
    if (!Ln[e]) return e;
    var t = Ln[e],
      r;
    for (r in t) if (t.hasOwnProperty(r) && r in Id) return (rl[e] = t[r]);
    return e;
  }
  var Fd = Qa("animationend"),
    zd = Qa("animationiteration"),
    Bd = Qa("animationstart"),
    Ud = Qa("transitionend"),
    qd = new Map(),
    $d =
      "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(
        " "
      );
  function hr(e, t) {
    (qd.set(e, t), qr(t, [e]));
  }
  for (var nl = 0; nl < $d.length; nl++) {
    var sl = $d[nl],
      Jg = sl.toLowerCase(),
      ey = sl[0].toUpperCase() + sl.slice(1);
    hr(Jg, "on" + ey);
  }
  (hr(Fd, "onAnimationEnd"),
    hr(zd, "onAnimationIteration"),
    hr(Bd, "onAnimationStart"),
    hr("dblclick", "onDoubleClick"),
    hr("focusin", "onFocus"),
    hr("focusout", "onBlur"),
    hr(Ud, "onTransitionEnd"),
    Cn("onMouseEnter", ["mouseout", "mouseover"]),
    Cn("onMouseLeave", ["mouseout", "mouseover"]),
    Cn("onPointerEnter", ["pointerout", "pointerover"]),
    Cn("onPointerLeave", ["pointerout", "pointerover"]),
    qr(
      "onChange",
      "change click focusin focusout input keydown keyup selectionchange".split(
        " "
      )
    ),
    qr(
      "onSelect",
      "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
        " "
      )
    ),
    qr("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]),
    qr(
      "onCompositionEnd",
      "compositionend focusout keydown keypress keyup mousedown".split(" ")
    ),
    qr(
      "onCompositionStart",
      "compositionstart focusout keydown keypress keyup mousedown".split(" ")
    ),
    qr(
      "onCompositionUpdate",
      "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
    ));
  var qs =
      "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
        " "
      ),
    ty = new Set(
      "cancel close invalid load scroll toggle".split(" ").concat(qs)
    );
  function Vd(e, t, r) {
    var n = e.type || "unknown-event";
    ((e.currentTarget = r), Jf(n, t, void 0, e), (e.currentTarget = null));
  }
  function Wd(e, t) {
    t = (t & 4) !== 0;
    for (var r = 0; r < e.length; r++) {
      var n = e[r],
        s = n.event;
      n = n.listeners;
      e: {
        var a = void 0;
        if (t)
          for (var o = n.length - 1; 0 <= o; o--) {
            var l = n[o],
              c = l.instance,
              u = l.currentTarget;
            if (((l = l.listener), c !== a && s.isPropagationStopped()))
              break e;
            (Vd(s, l, u), (a = c));
          }
        else
          for (o = 0; o < n.length; o++) {
            if (
              ((l = n[o]),
              (c = l.instance),
              (u = l.currentTarget),
              (l = l.listener),
              c !== a && s.isPropagationStopped())
            )
              break e;
            (Vd(s, l, u), (a = c));
          }
      }
    }
    if (Pa) throw ((e = Mo), (Pa = !1), (Mo = null), e);
  }
  function ue(e, t) {
    var r = t[pl];
    r === void 0 && (r = t[pl] = new Set());
    var n = e + "__bubble";
    r.has(n) || (Kd(t, e, 2, !1), r.add(n));
  }
  function al(e, t, r) {
    var n = 0;
    (t && (n |= 4), Kd(r, e, n, t));
  }
  var Za = "_reactListening" + Math.random().toString(36).slice(2);
  function $s(e) {
    if (!e[Za]) {
      ((e[Za] = !0),
        Nu.forEach(function (r) {
          r !== "selectionchange" && (ty.has(r) || al(r, !1, e), al(r, !0, e));
        }));
      var t = e.nodeType === 9 ? e : e.ownerDocument;
      t === null || t[Za] || ((t[Za] = !0), al("selectionchange", !1, t));
    }
  }
  function Kd(e, t, r, n) {
    switch (fd(t)) {
      case 1:
        var s = fg;
        break;
      case 4:
        s = gg;
        break;
      default:
        s = qo;
    }
    ((r = s.bind(null, t, r, e)),
      (s = void 0),
      !Lo ||
        (t !== "touchstart" && t !== "touchmove" && t !== "wheel") ||
        (s = !0),
      n
        ? s !== void 0
          ? e.addEventListener(t, r, { capture: !0, passive: s })
          : e.addEventListener(t, r, !0)
        : s !== void 0
          ? e.addEventListener(t, r, { passive: s })
          : e.addEventListener(t, r, !1));
  }
  function il(e, t, r, n, s) {
    var a = n;
    if ((t & 1) === 0 && (t & 2) === 0 && n !== null)
      e: for (;;) {
        if (n === null) return;
        var o = n.tag;
        if (o === 3 || o === 4) {
          var l = n.stateNode.containerInfo;
          if (l === s || (l.nodeType === 8 && l.parentNode === s)) break;
          if (o === 4)
            for (o = n.return; o !== null; ) {
              var c = o.tag;
              if (
                (c === 3 || c === 4) &&
                ((c = o.stateNode.containerInfo),
                c === s || (c.nodeType === 8 && c.parentNode === s))
              )
                return;
              o = o.return;
            }
          for (; l !== null; ) {
            if (((o = Vr(l)), o === null)) return;
            if (((c = o.tag), c === 5 || c === 6)) {
              n = a = o;
              continue e;
            }
            l = l.parentNode;
          }
        }
        n = n.return;
      }
    Yu(function () {
      var u = a,
        d = To(r),
        h = [];
      e: {
        var m = qd.get(e);
        if (m !== void 0) {
          var v = Wo,
            x = e;
          switch (e) {
            case "keypress":
              if ($a(r) === 0) break e;
            case "keydown":
            case "keyup":
              v = Tg;
              break;
            case "focusin":
              ((x = "focus"), (v = Qo));
              break;
            case "focusout":
              ((x = "blur"), (v = Qo));
              break;
            case "beforeblur":
            case "afterblur":
              v = Qo;
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
              v = vd;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              v = xg;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              v = Lg;
              break;
            case Fd:
            case zd:
            case Bd:
              v = kg;
              break;
            case Ud:
              v = Dg;
              break;
            case "scroll":
              v = yg;
              break;
            case "wheel":
              v = Fg;
              break;
            case "copy":
            case "cut":
            case "paste":
              v = Cg;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              v = bd;
          }
          var k = (t & 4) !== 0,
            M = !k && e === "scroll",
            y = k ? (m !== null ? m + "Capture" : null) : m;
          k = [];
          for (var p = u, g; p !== null; ) {
            g = p;
            var b = g.stateNode;
            if (
              (g.tag === 5 &&
                b !== null &&
                ((g = b),
                y !== null &&
                  ((b = _s(p, y)), b != null && k.push(Vs(p, b, g)))),
              M)
            )
              break;
            p = p.return;
          }
          0 < k.length &&
            ((m = new v(m, x, null, r, d)), h.push({ event: m, listeners: k }));
        }
      }
      if ((t & 7) === 0) {
        e: {
          if (
            ((m = e === "mouseover" || e === "pointerover"),
            (v = e === "mouseout" || e === "pointerout"),
            m &&
              r !== Eo &&
              (x = r.relatedTarget || r.fromElement) &&
              (Vr(x) || x[Ut]))
          )
            break e;
          if (
            (v || m) &&
            ((m =
              d.window === d
                ? d
                : (m = d.ownerDocument)
                  ? m.defaultView || m.parentWindow
                  : window),
            v
              ? ((x = r.relatedTarget || r.toElement),
                (v = u),
                (x = x ? Vr(x) : null),
                x !== null &&
                  ((M = $r(x)), x !== M || (x.tag !== 5 && x.tag !== 6)) &&
                  (x = null))
              : ((v = null), (x = u)),
            v !== x)
          ) {
            if (
              ((k = vd),
              (b = "onMouseLeave"),
              (y = "onMouseEnter"),
              (p = "mouse"),
              (e === "pointerout" || e === "pointerover") &&
                ((k = bd),
                (b = "onPointerLeave"),
                (y = "onPointerEnter"),
                (p = "pointer")),
              (M = v == null ? m : In(v)),
              (g = x == null ? m : In(x)),
              (m = new k(b, p + "leave", v, r, d)),
              (m.target = M),
              (m.relatedTarget = g),
              (b = null),
              Vr(d) === u &&
                ((k = new k(y, p + "enter", x, r, d)),
                (k.target = g),
                (k.relatedTarget = M),
                (b = k)),
              (M = b),
              v && x)
            )
              t: {
                for (k = v, y = x, p = 0, g = k; g; g = Mn(g)) p++;
                for (g = 0, b = y; b; b = Mn(b)) g++;
                for (; 0 < p - g; ) ((k = Mn(k)), p--);
                for (; 0 < g - p; ) ((y = Mn(y)), g--);
                for (; p--; ) {
                  if (k === y || (y !== null && k === y.alternate)) break t;
                  ((k = Mn(k)), (y = Mn(y)));
                }
                k = null;
              }
            else k = null;
            (v !== null && Hd(h, m, v, k, !1),
              x !== null && M !== null && Hd(h, M, x, k, !0));
          }
        }
        e: {
          if (
            ((m = u ? In(u) : window),
            (v = m.nodeName && m.nodeName.toLowerCase()),
            v === "select" || (v === "input" && m.type === "file"))
          )
            var j = Wg;
          else if (jd(m))
            if (Rd) j = Zg;
            else {
              j = Hg;
              var _ = Kg;
            }
          else
            (v = m.nodeName) &&
              v.toLowerCase() === "input" &&
              (m.type === "checkbox" || m.type === "radio") &&
              (j = Qg);
          if (j && (j = j(e, u))) {
            Nd(h, j, r, d);
            break e;
          }
          (_ && _(e, m, u),
            e === "focusout" &&
              (_ = m._wrapperState) &&
              _.controlled &&
              m.type === "number" &&
              _o(m, "number", m.value));
        }
        switch (((_ = u ? In(u) : window), e)) {
          case "focusin":
            (jd(_) || _.contentEditable === "true") &&
              ((On = _), (el = u), (Us = null));
            break;
          case "focusout":
            Us = el = On = null;
            break;
          case "mousedown":
            tl = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            ((tl = !1), Dd(h, r, d));
            break;
          case "selectionchange":
            if (Xg) break;
          case "keydown":
          case "keyup":
            Dd(h, r, d);
        }
        var C;
        if (Go)
          e: {
            switch (e) {
              case "compositionstart":
                var P = "onCompositionStart";
                break e;
              case "compositionend":
                P = "onCompositionEnd";
                break e;
              case "compositionupdate":
                P = "onCompositionUpdate";
                break e;
            }
            P = void 0;
          }
        else
          Pn
            ? Cd(e, r) && (P = "onCompositionEnd")
            : e === "keydown" &&
              r.keyCode === 229 &&
              (P = "onCompositionStart");
        (P &&
          (wd &&
            r.locale !== "ko" &&
            (Pn || P !== "onCompositionStart"
              ? P === "onCompositionEnd" && Pn && (C = gd())
              : ((pr = d),
                (Vo = "value" in pr ? pr.value : pr.textContent),
                (Pn = !0))),
          (_ = Ga(u, P)),
          0 < _.length &&
            ((P = new xd(P, e, null, r, d)),
            h.push({ event: P, listeners: _ }),
            C ? (P.data = C) : ((C = _d(r)), C !== null && (P.data = C)))),
          (C = Bg ? Ug(e, r) : qg(e, r)) &&
            ((u = Ga(u, "onBeforeInput")),
            0 < u.length &&
              ((d = new xd("onBeforeInput", "beforeinput", null, r, d)),
              h.push({ event: d, listeners: u }),
              (d.data = C))));
      }
      Wd(h, t);
    });
  }
  function Vs(e, t, r) {
    return { instance: e, listener: t, currentTarget: r };
  }
  function Ga(e, t) {
    for (var r = t + "Capture", n = []; e !== null; ) {
      var s = e,
        a = s.stateNode;
      (s.tag === 5 &&
        a !== null &&
        ((s = a),
        (a = _s(e, r)),
        a != null && n.unshift(Vs(e, a, s)),
        (a = _s(e, t)),
        a != null && n.push(Vs(e, a, s))),
        (e = e.return));
    }
    return n;
  }
  function Mn(e) {
    if (e === null) return null;
    do e = e.return;
    while (e && e.tag !== 5);
    return e || null;
  }
  function Hd(e, t, r, n, s) {
    for (var a = t._reactName, o = []; r !== null && r !== n; ) {
      var l = r,
        c = l.alternate,
        u = l.stateNode;
      if (c !== null && c === n) break;
      (l.tag === 5 &&
        u !== null &&
        ((l = u),
        s
          ? ((c = _s(r, a)), c != null && o.unshift(Vs(r, c, l)))
          : s || ((c = _s(r, a)), c != null && o.push(Vs(r, c, l)))),
        (r = r.return));
    }
    o.length !== 0 && e.push({ event: t, listeners: o });
  }
  var ry = /\r\n?/g,
    ny = /\u0000|\uFFFD/g;
  function Qd(e) {
    return (typeof e == "string" ? e : "" + e)
      .replace(
        ry,
        `
`
      )
      .replace(ny, "");
  }
  function Ya(e, t, r) {
    if (((t = Qd(t)), Qd(e) !== t && r)) throw Error(R(425));
  }
  function Xa() {}
  var ol = null,
    ll = null;
  function cl(e, t) {
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
  var ul = typeof setTimeout == "function" ? setTimeout : void 0,
    sy = typeof clearTimeout == "function" ? clearTimeout : void 0,
    Zd = typeof Promise == "function" ? Promise : void 0,
    ay =
      typeof queueMicrotask == "function"
        ? queueMicrotask
        : typeof Zd < "u"
          ? function (e) {
              return Zd.resolve(null).then(e).catch(iy);
            }
          : ul;
  function iy(e) {
    setTimeout(function () {
      throw e;
    });
  }
  function dl(e, t) {
    var r = t,
      n = 0;
    do {
      var s = r.nextSibling;
      if ((e.removeChild(r), s && s.nodeType === 8))
        if (((r = s.data), r === "/$")) {
          if (n === 0) {
            (e.removeChild(s), Ls(t));
            return;
          }
          n--;
        } else (r !== "$" && r !== "$?" && r !== "$!") || n++;
      r = s;
    } while (r);
    Ls(t);
  }
  function mr(e) {
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
  function Gd(e) {
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
  var Dn = Math.random().toString(36).slice(2),
    At = "__reactFiber$" + Dn,
    Ws = "__reactProps$" + Dn,
    Ut = "__reactContainer$" + Dn,
    pl = "__reactEvents$" + Dn,
    oy = "__reactListeners$" + Dn,
    ly = "__reactHandles$" + Dn;
  function Vr(e) {
    var t = e[At];
    if (t) return t;
    for (var r = e.parentNode; r; ) {
      if ((t = r[Ut] || r[At])) {
        if (
          ((r = t.alternate),
          t.child !== null || (r !== null && r.child !== null))
        )
          for (e = Gd(e); e !== null; ) {
            if ((r = e[At])) return r;
            e = Gd(e);
          }
        return t;
      }
      ((e = r), (r = e.parentNode));
    }
    return null;
  }
  function Ks(e) {
    return (
      (e = e[At] || e[Ut]),
      !e || (e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3)
        ? null
        : e
    );
  }
  function In(e) {
    if (e.tag === 5 || e.tag === 6) return e.stateNode;
    throw Error(R(33));
  }
  function Ja(e) {
    return e[Ws] || null;
  }
  var hl = [],
    Fn = -1;
  function fr(e) {
    return { current: e };
  }
  function de(e) {
    0 > Fn || ((e.current = hl[Fn]), (hl[Fn] = null), Fn--);
  }
  function ce(e, t) {
    (Fn++, (hl[Fn] = e.current), (e.current = t));
  }
  var gr = {},
    Fe = fr(gr),
    Ge = fr(!1),
    Wr = gr;
  function zn(e, t) {
    var r = e.type.contextTypes;
    if (!r) return gr;
    var n = e.stateNode;
    if (n && n.__reactInternalMemoizedUnmaskedChildContext === t)
      return n.__reactInternalMemoizedMaskedChildContext;
    var s = {},
      a;
    for (a in r) s[a] = t[a];
    return (
      n &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = t),
        (e.__reactInternalMemoizedMaskedChildContext = s)),
      s
    );
  }
  function Ye(e) {
    return ((e = e.childContextTypes), e != null);
  }
  function ei() {
    (de(Ge), de(Fe));
  }
  function Yd(e, t, r) {
    if (Fe.current !== gr) throw Error(R(168));
    (ce(Fe, t), ce(Ge, r));
  }
  function Xd(e, t, r) {
    var n = e.stateNode;
    if (((t = t.childContextTypes), typeof n.getChildContext != "function"))
      return r;
    n = n.getChildContext();
    for (var s in n) if (!(s in t)) throw Error(R(108, Kf(e) || "Unknown", s));
    return me({}, r, n);
  }
  function ti(e) {
    return (
      (e =
        ((e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext) ||
        gr),
      (Wr = Fe.current),
      ce(Fe, e),
      ce(Ge, Ge.current),
      !0
    );
  }
  function Jd(e, t, r) {
    var n = e.stateNode;
    if (!n) throw Error(R(169));
    (r
      ? ((e = Xd(e, t, Wr)),
        (n.__reactInternalMemoizedMergedChildContext = e),
        de(Ge),
        de(Fe),
        ce(Fe, e))
      : de(Ge),
      ce(Ge, r));
  }
  var qt = null,
    ri = !1,
    ml = !1;
  function ep(e) {
    qt === null ? (qt = [e]) : qt.push(e);
  }
  function cy(e) {
    ((ri = !0), ep(e));
  }
  function yr() {
    if (!ml && qt !== null) {
      ml = !0;
      var e = 0,
        t = ae;
      try {
        var r = qt;
        for (ae = 1; e < r.length; e++) {
          var n = r[e];
          do n = n(!0);
          while (n !== null);
        }
        ((qt = null), (ri = !1));
      } catch (s) {
        throw (qt !== null && (qt = qt.slice(e + 1)), rd(Do, yr), s);
      } finally {
        ((ae = t), (ml = !1));
      }
    }
    return null;
  }
  var Bn = [],
    Un = 0,
    ni = null,
    si = 0,
    ut = [],
    dt = 0,
    Kr = null,
    $t = 1,
    Vt = "";
  function Hr(e, t) {
    ((Bn[Un++] = si), (Bn[Un++] = ni), (ni = e), (si = t));
  }
  function tp(e, t, r) {
    ((ut[dt++] = $t), (ut[dt++] = Vt), (ut[dt++] = Kr), (Kr = e));
    var n = $t;
    e = Vt;
    var s = 32 - xt(n) - 1;
    ((n &= ~(1 << s)), (r += 1));
    var a = 32 - xt(t) + s;
    if (30 < a) {
      var o = s - (s % 5);
      ((a = (n & ((1 << o) - 1)).toString(32)),
        (n >>= o),
        (s -= o),
        ($t = (1 << (32 - xt(t) + s)) | (r << s) | n),
        (Vt = a + e));
    } else (($t = (1 << a) | (r << s) | n), (Vt = e));
  }
  function fl(e) {
    e.return !== null && (Hr(e, 1), tp(e, 1, 0));
  }
  function gl(e) {
    for (; e === ni; )
      ((ni = Bn[--Un]), (Bn[Un] = null), (si = Bn[--Un]), (Bn[Un] = null));
    for (; e === Kr; )
      ((Kr = ut[--dt]),
        (ut[dt] = null),
        (Vt = ut[--dt]),
        (ut[dt] = null),
        ($t = ut[--dt]),
        (ut[dt] = null));
  }
  var it = null,
    ot = null,
    pe = !1,
    wt = null;
  function rp(e, t) {
    var r = ft(5, null, null, 0);
    ((r.elementType = "DELETED"),
      (r.stateNode = t),
      (r.return = e),
      (t = e.deletions),
      t === null ? ((e.deletions = [r]), (e.flags |= 16)) : t.push(r));
  }
  function np(e, t) {
    switch (e.tag) {
      case 5:
        var r = e.type;
        return (
          (t =
            t.nodeType !== 1 || r.toLowerCase() !== t.nodeName.toLowerCase()
              ? null
              : t),
          t !== null
            ? ((e.stateNode = t), (it = e), (ot = mr(t.firstChild)), !0)
            : !1
        );
      case 6:
        return (
          (t = e.pendingProps === "" || t.nodeType !== 3 ? null : t),
          t !== null ? ((e.stateNode = t), (it = e), (ot = null), !0) : !1
        );
      case 13:
        return (
          (t = t.nodeType !== 8 ? null : t),
          t !== null
            ? ((r = Kr !== null ? { id: $t, overflow: Vt } : null),
              (e.memoizedState = {
                dehydrated: t,
                treeContext: r,
                retryLane: 1073741824,
              }),
              (r = ft(18, null, null, 0)),
              (r.stateNode = t),
              (r.return = e),
              (e.child = r),
              (it = e),
              (ot = null),
              !0)
            : !1
        );
      default:
        return !1;
    }
  }
  function yl(e) {
    return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
  }
  function vl(e) {
    if (pe) {
      var t = ot;
      if (t) {
        var r = t;
        if (!np(e, t)) {
          if (yl(e)) throw Error(R(418));
          t = mr(r.nextSibling);
          var n = it;
          t && np(e, t)
            ? rp(n, r)
            : ((e.flags = (e.flags & -4097) | 2), (pe = !1), (it = e));
        }
      } else {
        if (yl(e)) throw Error(R(418));
        ((e.flags = (e.flags & -4097) | 2), (pe = !1), (it = e));
      }
    }
  }
  function sp(e) {
    for (
      e = e.return;
      e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13;
    )
      e = e.return;
    it = e;
  }
  function ai(e) {
    if (e !== it) return !1;
    if (!pe) return (sp(e), (pe = !0), !1);
    var t;
    if (
      ((t = e.tag !== 3) &&
        !(t = e.tag !== 5) &&
        ((t = e.type),
        (t = t !== "head" && t !== "body" && !cl(e.type, e.memoizedProps))),
      t && (t = ot))
    ) {
      if (yl(e)) throw (ap(), Error(R(418)));
      for (; t; ) (rp(e, t), (t = mr(t.nextSibling)));
    }
    if ((sp(e), e.tag === 13)) {
      if (((e = e.memoizedState), (e = e !== null ? e.dehydrated : null), !e))
        throw Error(R(317));
      e: {
        for (e = e.nextSibling, t = 0; e; ) {
          if (e.nodeType === 8) {
            var r = e.data;
            if (r === "/$") {
              if (t === 0) {
                ot = mr(e.nextSibling);
                break e;
              }
              t--;
            } else (r !== "$" && r !== "$!" && r !== "$?") || t++;
          }
          e = e.nextSibling;
        }
        ot = null;
      }
    } else ot = it ? mr(e.stateNode.nextSibling) : null;
    return !0;
  }
  function ap() {
    for (var e = ot; e; ) e = mr(e.nextSibling);
  }
  function qn() {
    ((ot = it = null), (pe = !1));
  }
  function xl(e) {
    wt === null ? (wt = [e]) : wt.push(e);
  }
  var uy = Bt.ReactCurrentBatchConfig;
  function Hs(e, t, r) {
    if (
      ((e = r.ref),
      e !== null && typeof e != "function" && typeof e != "object")
    ) {
      if (r._owner) {
        if (((r = r._owner), r)) {
          if (r.tag !== 1) throw Error(R(309));
          var n = r.stateNode;
        }
        if (!n) throw Error(R(147, e));
        var s = n,
          a = "" + e;
        return t !== null &&
          t.ref !== null &&
          typeof t.ref == "function" &&
          t.ref._stringRef === a
          ? t.ref
          : ((t = function (o) {
              var l = s.refs;
              o === null ? delete l[a] : (l[a] = o);
            }),
            (t._stringRef = a),
            t);
      }
      if (typeof e != "string") throw Error(R(284));
      if (!r._owner) throw Error(R(290, e));
    }
    return e;
  }
  function ii(e, t) {
    throw (
      (e = Object.prototype.toString.call(t)),
      Error(
        R(
          31,
          e === "[object Object]"
            ? "object with keys {" + Object.keys(t).join(", ") + "}"
            : e
        )
      )
    );
  }
  function ip(e) {
    var t = e._init;
    return t(e._payload);
  }
  function op(e) {
    function t(y, p) {
      if (e) {
        var g = y.deletions;
        g === null ? ((y.deletions = [p]), (y.flags |= 16)) : g.push(p);
      }
    }
    function r(y, p) {
      if (!e) return null;
      for (; p !== null; ) (t(y, p), (p = p.sibling));
      return null;
    }
    function n(y, p) {
      for (y = new Map(); p !== null; )
        (p.key !== null ? y.set(p.key, p) : y.set(p.index, p), (p = p.sibling));
      return y;
    }
    function s(y, p) {
      return ((y = _r(y, p)), (y.index = 0), (y.sibling = null), y);
    }
    function a(y, p, g) {
      return (
        (y.index = g),
        e
          ? ((g = y.alternate),
            g !== null
              ? ((g = g.index), g < p ? ((y.flags |= 2), p) : g)
              : ((y.flags |= 2), p))
          : ((y.flags |= 1048576), p)
      );
    }
    function o(y) {
      return (e && y.alternate === null && (y.flags |= 2), y);
    }
    function l(y, p, g, b) {
      return p === null || p.tag !== 6
        ? ((p = uc(g, y.mode, b)), (p.return = y), p)
        : ((p = s(p, g)), (p.return = y), p);
    }
    function c(y, p, g, b) {
      var j = g.type;
      return j === jn
        ? d(y, p, g.props.children, b, g.key)
        : p !== null &&
            (p.elementType === j ||
              (typeof j == "object" &&
                j !== null &&
                j.$$typeof === ir &&
                ip(j) === p.type))
          ? ((b = s(p, g.props)), (b.ref = Hs(y, p, g)), (b.return = y), b)
          : ((b = Ei(g.type, g.key, g.props, null, y.mode, b)),
            (b.ref = Hs(y, p, g)),
            (b.return = y),
            b);
    }
    function u(y, p, g, b) {
      return p === null ||
        p.tag !== 4 ||
        p.stateNode.containerInfo !== g.containerInfo ||
        p.stateNode.implementation !== g.implementation
        ? ((p = dc(g, y.mode, b)), (p.return = y), p)
        : ((p = s(p, g.children || [])), (p.return = y), p);
    }
    function d(y, p, g, b, j) {
      return p === null || p.tag !== 7
        ? ((p = tn(g, y.mode, b, j)), (p.return = y), p)
        : ((p = s(p, g)), (p.return = y), p);
    }
    function h(y, p, g) {
      if ((typeof p == "string" && p !== "") || typeof p == "number")
        return ((p = uc("" + p, y.mode, g)), (p.return = y), p);
      if (typeof p == "object" && p !== null) {
        switch (p.$$typeof) {
          case Na:
            return (
              (g = Ei(p.type, p.key, p.props, null, y.mode, g)),
              (g.ref = Hs(y, null, p)),
              (g.return = y),
              g
            );
          case _n:
            return ((p = dc(p, y.mode, g)), (p.return = y), p);
          case ir:
            var b = p._init;
            return h(y, b(p._payload), g);
        }
        if (ks(p) || bs(p))
          return ((p = tn(p, y.mode, g, null)), (p.return = y), p);
        ii(y, p);
      }
      return null;
    }
    function m(y, p, g, b) {
      var j = p !== null ? p.key : null;
      if ((typeof g == "string" && g !== "") || typeof g == "number")
        return j !== null ? null : l(y, p, "" + g, b);
      if (typeof g == "object" && g !== null) {
        switch (g.$$typeof) {
          case Na:
            return g.key === j ? c(y, p, g, b) : null;
          case _n:
            return g.key === j ? u(y, p, g, b) : null;
          case ir:
            return ((j = g._init), m(y, p, j(g._payload), b));
        }
        if (ks(g) || bs(g)) return j !== null ? null : d(y, p, g, b, null);
        ii(y, g);
      }
      return null;
    }
    function v(y, p, g, b, j) {
      if ((typeof b == "string" && b !== "") || typeof b == "number")
        return ((y = y.get(g) || null), l(p, y, "" + b, j));
      if (typeof b == "object" && b !== null) {
        switch (b.$$typeof) {
          case Na:
            return (
              (y = y.get(b.key === null ? g : b.key) || null),
              c(p, y, b, j)
            );
          case _n:
            return (
              (y = y.get(b.key === null ? g : b.key) || null),
              u(p, y, b, j)
            );
          case ir:
            var _ = b._init;
            return v(y, p, g, _(b._payload), j);
        }
        if (ks(b) || bs(b))
          return ((y = y.get(g) || null), d(p, y, b, j, null));
        ii(p, b);
      }
      return null;
    }
    function x(y, p, g, b) {
      for (
        var j = null, _ = null, C = p, P = (p = 0), S = null;
        C !== null && P < g.length;
        P++
      ) {
        C.index > P ? ((S = C), (C = null)) : (S = C.sibling);
        var A = m(y, C, g[P], b);
        if (A === null) {
          C === null && (C = S);
          break;
        }
        (e && C && A.alternate === null && t(y, C),
          (p = a(A, p, P)),
          _ === null ? (j = A) : (_.sibling = A),
          (_ = A),
          (C = S));
      }
      if (P === g.length) return (r(y, C), pe && Hr(y, P), j);
      if (C === null) {
        for (; P < g.length; P++)
          ((C = h(y, g[P], b)),
            C !== null &&
              ((p = a(C, p, P)),
              _ === null ? (j = C) : (_.sibling = C),
              (_ = C)));
        return (pe && Hr(y, P), j);
      }
      for (C = n(y, C); P < g.length; P++)
        ((S = v(C, y, P, g[P], b)),
          S !== null &&
            (e && S.alternate !== null && C.delete(S.key === null ? P : S.key),
            (p = a(S, p, P)),
            _ === null ? (j = S) : (_.sibling = S),
            (_ = S)));
      return (
        e &&
          C.forEach(function ($) {
            return t(y, $);
          }),
        pe && Hr(y, P),
        j
      );
    }
    function k(y, p, g, b) {
      var j = bs(g);
      if (typeof j != "function") throw Error(R(150));
      if (((g = j.call(g)), g == null)) throw Error(R(151));
      for (
        var _ = (j = null), C = p, P = (p = 0), S = null, A = g.next();
        C !== null && !A.done;
        P++, A = g.next()
      ) {
        C.index > P ? ((S = C), (C = null)) : (S = C.sibling);
        var $ = m(y, C, A.value, b);
        if ($ === null) {
          C === null && (C = S);
          break;
        }
        (e && C && $.alternate === null && t(y, C),
          (p = a($, p, P)),
          _ === null ? (j = $) : (_.sibling = $),
          (_ = $),
          (C = S));
      }
      if (A.done) return (r(y, C), pe && Hr(y, P), j);
      if (C === null) {
        for (; !A.done; P++, A = g.next())
          ((A = h(y, A.value, b)),
            A !== null &&
              ((p = a(A, p, P)),
              _ === null ? (j = A) : (_.sibling = A),
              (_ = A)));
        return (pe && Hr(y, P), j);
      }
      for (C = n(y, C); !A.done; P++, A = g.next())
        ((A = v(C, y, P, A.value, b)),
          A !== null &&
            (e && A.alternate !== null && C.delete(A.key === null ? P : A.key),
            (p = a(A, p, P)),
            _ === null ? (j = A) : (_.sibling = A),
            (_ = A)));
      return (
        e &&
          C.forEach(function (O) {
            return t(y, O);
          }),
        pe && Hr(y, P),
        j
      );
    }
    function M(y, p, g, b) {
      if (
        (typeof g == "object" &&
          g !== null &&
          g.type === jn &&
          g.key === null &&
          (g = g.props.children),
        typeof g == "object" && g !== null)
      ) {
        switch (g.$$typeof) {
          case Na:
            e: {
              for (var j = g.key, _ = p; _ !== null; ) {
                if (_.key === j) {
                  if (((j = g.type), j === jn)) {
                    if (_.tag === 7) {
                      (r(y, _.sibling),
                        (p = s(_, g.props.children)),
                        (p.return = y),
                        (y = p));
                      break e;
                    }
                  } else if (
                    _.elementType === j ||
                    (typeof j == "object" &&
                      j !== null &&
                      j.$$typeof === ir &&
                      ip(j) === _.type)
                  ) {
                    (r(y, _.sibling),
                      (p = s(_, g.props)),
                      (p.ref = Hs(y, _, g)),
                      (p.return = y),
                      (y = p));
                    break e;
                  }
                  r(y, _);
                  break;
                } else t(y, _);
                _ = _.sibling;
              }
              g.type === jn
                ? ((p = tn(g.props.children, y.mode, b, g.key)),
                  (p.return = y),
                  (y = p))
                : ((b = Ei(g.type, g.key, g.props, null, y.mode, b)),
                  (b.ref = Hs(y, p, g)),
                  (b.return = y),
                  (y = b));
            }
            return o(y);
          case _n:
            e: {
              for (_ = g.key; p !== null; ) {
                if (p.key === _)
                  if (
                    p.tag === 4 &&
                    p.stateNode.containerInfo === g.containerInfo &&
                    p.stateNode.implementation === g.implementation
                  ) {
                    (r(y, p.sibling),
                      (p = s(p, g.children || [])),
                      (p.return = y),
                      (y = p));
                    break e;
                  } else {
                    r(y, p);
                    break;
                  }
                else t(y, p);
                p = p.sibling;
              }
              ((p = dc(g, y.mode, b)), (p.return = y), (y = p));
            }
            return o(y);
          case ir:
            return ((_ = g._init), M(y, p, _(g._payload), b));
        }
        if (ks(g)) return x(y, p, g, b);
        if (bs(g)) return k(y, p, g, b);
        ii(y, g);
      }
      return (typeof g == "string" && g !== "") || typeof g == "number"
        ? ((g = "" + g),
          p !== null && p.tag === 6
            ? (r(y, p.sibling), (p = s(p, g)), (p.return = y), (y = p))
            : (r(y, p), (p = uc(g, y.mode, b)), (p.return = y), (y = p)),
          o(y))
        : r(y, p);
    }
    return M;
  }
  var $n = op(!0),
    lp = op(!1),
    oi = fr(null),
    li = null,
    Vn = null,
    bl = null;
  function wl() {
    bl = Vn = li = null;
  }
  function kl(e) {
    var t = oi.current;
    (de(oi), (e._currentValue = t));
  }
  function Sl(e, t, r) {
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
  function Wn(e, t) {
    ((li = e),
      (bl = Vn = null),
      (e = e.dependencies),
      e !== null &&
        e.firstContext !== null &&
        ((e.lanes & t) !== 0 && (Xe = !0), (e.firstContext = null)));
  }
  function pt(e) {
    var t = e._currentValue;
    if (bl !== e)
      if (((e = { context: e, memoizedValue: t, next: null }), Vn === null)) {
        if (li === null) throw Error(R(308));
        ((Vn = e), (li.dependencies = { lanes: 0, firstContext: e }));
      } else Vn = Vn.next = e;
    return t;
  }
  var Qr = null;
  function Cl(e) {
    Qr === null ? (Qr = [e]) : Qr.push(e);
  }
  function cp(e, t, r, n) {
    var s = t.interleaved;
    return (
      s === null ? ((r.next = r), Cl(t)) : ((r.next = s.next), (s.next = r)),
      (t.interleaved = r),
      Wt(e, n)
    );
  }
  function Wt(e, t) {
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
  var vr = !1;
  function _l(e) {
    e.updateQueue = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: { pending: null, interleaved: null, lanes: 0 },
      effects: null,
    };
  }
  function up(e, t) {
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
  function Kt(e, t) {
    return {
      eventTime: e,
      lane: t,
      tag: 0,
      payload: null,
      callback: null,
      next: null,
    };
  }
  function xr(e, t, r) {
    var n = e.updateQueue;
    if (n === null) return null;
    if (((n = n.shared), (ee & 2) !== 0)) {
      var s = n.pending;
      return (
        s === null ? (t.next = t) : ((t.next = s.next), (s.next = t)),
        (n.pending = t),
        Wt(e, r)
      );
    }
    return (
      (s = n.interleaved),
      s === null ? ((t.next = t), Cl(n)) : ((t.next = s.next), (s.next = t)),
      (n.interleaved = t),
      Wt(e, r)
    );
  }
  function ci(e, t, r) {
    if (
      ((t = t.updateQueue), t !== null && ((t = t.shared), (r & 4194240) !== 0))
    ) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (r |= n), (t.lanes = r), zo(e, r));
    }
  }
  function dp(e, t) {
    var r = e.updateQueue,
      n = e.alternate;
    if (n !== null && ((n = n.updateQueue), r === n)) {
      var s = null,
        a = null;
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
          (a === null ? (s = a = o) : (a = a.next = o), (r = r.next));
        } while (r !== null);
        a === null ? (s = a = t) : (a = a.next = t);
      } else s = a = t;
      ((r = {
        baseState: n.baseState,
        firstBaseUpdate: s,
        lastBaseUpdate: a,
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
  function ui(e, t, r, n) {
    var s = e.updateQueue;
    vr = !1;
    var a = s.firstBaseUpdate,
      o = s.lastBaseUpdate,
      l = s.shared.pending;
    if (l !== null) {
      s.shared.pending = null;
      var c = l,
        u = c.next;
      ((c.next = null), o === null ? (a = u) : (o.next = u), (o = c));
      var d = e.alternate;
      d !== null &&
        ((d = d.updateQueue),
        (l = d.lastBaseUpdate),
        l !== o &&
          (l === null ? (d.firstBaseUpdate = u) : (l.next = u),
          (d.lastBaseUpdate = c)));
    }
    if (a !== null) {
      var h = s.baseState;
      ((o = 0), (d = u = c = null), (l = a));
      do {
        var m = l.lane,
          v = l.eventTime;
        if ((n & m) === m) {
          d !== null &&
            (d = d.next =
              {
                eventTime: v,
                lane: 0,
                tag: l.tag,
                payload: l.payload,
                callback: l.callback,
                next: null,
              });
          e: {
            var x = e,
              k = l;
            switch (((m = t), (v = r), k.tag)) {
              case 1:
                if (((x = k.payload), typeof x == "function")) {
                  h = x.call(v, h, m);
                  break e;
                }
                h = x;
                break e;
              case 3:
                x.flags = (x.flags & -65537) | 128;
              case 0:
                if (
                  ((x = k.payload),
                  (m = typeof x == "function" ? x.call(v, h, m) : x),
                  m == null)
                )
                  break e;
                h = me({}, h, m);
                break e;
              case 2:
                vr = !0;
            }
          }
          l.callback !== null &&
            l.lane !== 0 &&
            ((e.flags |= 64),
            (m = s.effects),
            m === null ? (s.effects = [l]) : m.push(l));
        } else
          ((v = {
            eventTime: v,
            lane: m,
            tag: l.tag,
            payload: l.payload,
            callback: l.callback,
            next: null,
          }),
            d === null ? ((u = d = v), (c = h)) : (d = d.next = v),
            (o |= m));
        if (((l = l.next), l === null)) {
          if (((l = s.shared.pending), l === null)) break;
          ((m = l),
            (l = m.next),
            (m.next = null),
            (s.lastBaseUpdate = m),
            (s.shared.pending = null));
        }
      } while (!0);
      if (
        (d === null && (c = h),
        (s.baseState = c),
        (s.firstBaseUpdate = u),
        (s.lastBaseUpdate = d),
        (t = s.shared.interleaved),
        t !== null)
      ) {
        s = t;
        do ((o |= s.lane), (s = s.next));
        while (s !== t);
      } else a === null && (s.shared.lanes = 0);
      ((Yr |= o), (e.lanes = o), (e.memoizedState = h));
    }
  }
  function pp(e, t, r) {
    if (((e = t.effects), (t.effects = null), e !== null))
      for (t = 0; t < e.length; t++) {
        var n = e[t],
          s = n.callback;
        if (s !== null) {
          if (((n.callback = null), (n = r), typeof s != "function"))
            throw Error(R(191, s));
          s.call(n);
        }
      }
  }
  var Qs = {},
    Et = fr(Qs),
    Zs = fr(Qs),
    Gs = fr(Qs);
  function Zr(e) {
    if (e === Qs) throw Error(R(174));
    return e;
  }
  function jl(e, t) {
    switch ((ce(Gs, t), ce(Zs, e), ce(Et, Qs), (e = t.nodeType), e)) {
      case 9:
      case 11:
        t = (t = t.documentElement) ? t.namespaceURI : No(null, "");
        break;
      default:
        ((e = e === 8 ? t.parentNode : t),
          (t = e.namespaceURI || null),
          (e = e.tagName),
          (t = No(t, e)));
    }
    (de(Et), ce(Et, t));
  }
  function Kn() {
    (de(Et), de(Zs), de(Gs));
  }
  function hp(e) {
    Zr(Gs.current);
    var t = Zr(Et.current),
      r = No(t, e.type);
    t !== r && (ce(Zs, e), ce(Et, r));
  }
  function Nl(e) {
    Zs.current === e && (de(Et), de(Zs));
  }
  var fe = fr(0);
  function di(e) {
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
  var Rl = [];
  function Al() {
    for (var e = 0; e < Rl.length; e++)
      Rl[e]._workInProgressVersionPrimary = null;
    Rl.length = 0;
  }
  var pi = Bt.ReactCurrentDispatcher,
    El = Bt.ReactCurrentBatchConfig,
    Gr = 0,
    ge = null,
    Ne = null,
    Ee = null,
    hi = !1,
    Ys = !1,
    Xs = 0,
    dy = 0;
  function ze() {
    throw Error(R(321));
  }
  function Tl(e, t) {
    if (t === null) return !1;
    for (var r = 0; r < t.length && r < e.length; r++)
      if (!bt(e[r], t[r])) return !1;
    return !0;
  }
  function Pl(e, t, r, n, s, a) {
    if (
      ((Gr = a),
      (ge = t),
      (t.memoizedState = null),
      (t.updateQueue = null),
      (t.lanes = 0),
      (pi.current = e === null || e.memoizedState === null ? fy : gy),
      (e = r(n, s)),
      Ys)
    ) {
      a = 0;
      do {
        if (((Ys = !1), (Xs = 0), 25 <= a)) throw Error(R(301));
        ((a += 1),
          (Ee = Ne = null),
          (t.updateQueue = null),
          (pi.current = yy),
          (e = r(n, s)));
      } while (Ys);
    }
    if (
      ((pi.current = gi),
      (t = Ne !== null && Ne.next !== null),
      (Gr = 0),
      (Ee = Ne = ge = null),
      (hi = !1),
      t)
    )
      throw Error(R(300));
    return e;
  }
  function Ol() {
    var e = Xs !== 0;
    return ((Xs = 0), e);
  }
  function Tt() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null,
    };
    return (Ee === null ? (ge.memoizedState = Ee = e) : (Ee = Ee.next = e), Ee);
  }
  function ht() {
    if (Ne === null) {
      var e = ge.alternate;
      e = e !== null ? e.memoizedState : null;
    } else e = Ne.next;
    var t = Ee === null ? ge.memoizedState : Ee.next;
    if (t !== null) ((Ee = t), (Ne = e));
    else {
      if (e === null) throw Error(R(310));
      ((Ne = e),
        (e = {
          memoizedState: Ne.memoizedState,
          baseState: Ne.baseState,
          baseQueue: Ne.baseQueue,
          queue: Ne.queue,
          next: null,
        }),
        Ee === null ? (ge.memoizedState = Ee = e) : (Ee = Ee.next = e));
    }
    return Ee;
  }
  function Js(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Ll(e) {
    var t = ht(),
      r = t.queue;
    if (r === null) throw Error(R(311));
    r.lastRenderedReducer = e;
    var n = Ne,
      s = n.baseQueue,
      a = r.pending;
    if (a !== null) {
      if (s !== null) {
        var o = s.next;
        ((s.next = a.next), (a.next = o));
      }
      ((n.baseQueue = s = a), (r.pending = null));
    }
    if (s !== null) {
      ((a = s.next), (n = n.baseState));
      var l = (o = null),
        c = null,
        u = a;
      do {
        var d = u.lane;
        if ((Gr & d) === d)
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
          var h = {
            lane: d,
            action: u.action,
            hasEagerState: u.hasEagerState,
            eagerState: u.eagerState,
            next: null,
          };
          (c === null ? ((l = c = h), (o = n)) : (c = c.next = h),
            (ge.lanes |= d),
            (Yr |= d));
        }
        u = u.next;
      } while (u !== null && u !== a);
      (c === null ? (o = n) : (c.next = l),
        bt(n, t.memoizedState) || (Xe = !0),
        (t.memoizedState = n),
        (t.baseState = o),
        (t.baseQueue = c),
        (r.lastRenderedState = n));
    }
    if (((e = r.interleaved), e !== null)) {
      s = e;
      do ((a = s.lane), (ge.lanes |= a), (Yr |= a), (s = s.next));
      while (s !== e);
    } else s === null && (r.lanes = 0);
    return [t.memoizedState, r.dispatch];
  }
  function Ml(e) {
    var t = ht(),
      r = t.queue;
    if (r === null) throw Error(R(311));
    r.lastRenderedReducer = e;
    var n = r.dispatch,
      s = r.pending,
      a = t.memoizedState;
    if (s !== null) {
      r.pending = null;
      var o = (s = s.next);
      do ((a = e(a, o.action)), (o = o.next));
      while (o !== s);
      (bt(a, t.memoizedState) || (Xe = !0),
        (t.memoizedState = a),
        t.baseQueue === null && (t.baseState = a),
        (r.lastRenderedState = a));
    }
    return [a, n];
  }
  function mp() {}
  function fp(e, t) {
    var r = ge,
      n = ht(),
      s = t(),
      a = !bt(n.memoizedState, s);
    if (
      (a && ((n.memoizedState = s), (Xe = !0)),
      (n = n.queue),
      Dl(vp.bind(null, r, n, e), [e]),
      n.getSnapshot !== t || a || (Ee !== null && Ee.memoizedState.tag & 1))
    ) {
      if (
        ((r.flags |= 2048),
        ea(9, yp.bind(null, r, n, s, t), void 0, null),
        Te === null)
      )
        throw Error(R(349));
      (Gr & 30) !== 0 || gp(r, t, s);
    }
    return s;
  }
  function gp(e, t, r) {
    ((e.flags |= 16384),
      (e = { getSnapshot: t, value: r }),
      (t = ge.updateQueue),
      t === null
        ? ((t = { lastEffect: null, stores: null }),
          (ge.updateQueue = t),
          (t.stores = [e]))
        : ((r = t.stores), r === null ? (t.stores = [e]) : r.push(e)));
  }
  function yp(e, t, r, n) {
    ((t.value = r), (t.getSnapshot = n), xp(t) && bp(e));
  }
  function vp(e, t, r) {
    return r(function () {
      xp(t) && bp(e);
    });
  }
  function xp(e) {
    var t = e.getSnapshot;
    e = e.value;
    try {
      var r = t();
      return !bt(e, r);
    } catch {
      return !0;
    }
  }
  function bp(e) {
    var t = Wt(e, 1);
    t !== null && _t(t, e, 1, -1);
  }
  function wp(e) {
    var t = Tt();
    return (
      typeof e == "function" && (e = e()),
      (t.memoizedState = t.baseState = e),
      (e = {
        pending: null,
        interleaved: null,
        lanes: 0,
        dispatch: null,
        lastRenderedReducer: Js,
        lastRenderedState: e,
      }),
      (t.queue = e),
      (e = e.dispatch = my.bind(null, ge, e)),
      [t.memoizedState, e]
    );
  }
  function ea(e, t, r, n) {
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
  function kp() {
    return ht().memoizedState;
  }
  function mi(e, t, r, n) {
    var s = Tt();
    ((ge.flags |= e),
      (s.memoizedState = ea(1 | t, r, void 0, n === void 0 ? null : n)));
  }
  function fi(e, t, r, n) {
    var s = ht();
    n = n === void 0 ? null : n;
    var a = void 0;
    if (Ne !== null) {
      var o = Ne.memoizedState;
      if (((a = o.destroy), n !== null && Tl(n, o.deps))) {
        s.memoizedState = ea(t, r, a, n);
        return;
      }
    }
    ((ge.flags |= e), (s.memoizedState = ea(1 | t, r, a, n)));
  }
  function Sp(e, t) {
    return mi(8390656, 8, e, t);
  }
  function Dl(e, t) {
    return fi(2048, 8, e, t);
  }
  function Cp(e, t) {
    return fi(4, 2, e, t);
  }
  function _p(e, t) {
    return fi(4, 4, e, t);
  }
  function jp(e, t) {
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
  function Np(e, t, r) {
    return (
      (r = r != null ? r.concat([e]) : null),
      fi(4, 4, jp.bind(null, t, e), r)
    );
  }
  function Il() {}
  function Rp(e, t) {
    var r = ht();
    t = t === void 0 ? null : t;
    var n = r.memoizedState;
    return n !== null && t !== null && Tl(t, n[1])
      ? n[0]
      : ((r.memoizedState = [e, t]), e);
  }
  function Ap(e, t) {
    var r = ht();
    t = t === void 0 ? null : t;
    var n = r.memoizedState;
    return n !== null && t !== null && Tl(t, n[1])
      ? n[0]
      : ((e = e()), (r.memoizedState = [e, t]), e);
  }
  function Ep(e, t, r) {
    return (Gr & 21) === 0
      ? (e.baseState && ((e.baseState = !1), (Xe = !0)), (e.memoizedState = r))
      : (bt(r, t) ||
          ((r = id()), (ge.lanes |= r), (Yr |= r), (e.baseState = !0)),
        t);
  }
  function py(e, t) {
    var r = ae;
    ((ae = r !== 0 && 4 > r ? r : 4), e(!0));
    var n = El.transition;
    El.transition = {};
    try {
      (e(!1), t());
    } finally {
      ((ae = r), (El.transition = n));
    }
  }
  function Tp() {
    return ht().memoizedState;
  }
  function hy(e, t, r) {
    var n = Sr(e);
    if (
      ((r = {
        lane: n,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      }),
      Pp(e))
    )
      Op(t, r);
    else if (((r = cp(e, t, r, n)), r !== null)) {
      var s = Ke();
      (_t(r, e, n, s), Lp(r, t, n));
    }
  }
  function my(e, t, r) {
    var n = Sr(e),
      s = {
        lane: n,
        action: r,
        hasEagerState: !1,
        eagerState: null,
        next: null,
      };
    if (Pp(e)) Op(t, s);
    else {
      var a = e.alternate;
      if (
        e.lanes === 0 &&
        (a === null || a.lanes === 0) &&
        ((a = t.lastRenderedReducer), a !== null)
      )
        try {
          var o = t.lastRenderedState,
            l = a(o, r);
          if (((s.hasEagerState = !0), (s.eagerState = l), bt(l, o))) {
            var c = t.interleaved;
            (c === null
              ? ((s.next = s), Cl(t))
              : ((s.next = c.next), (c.next = s)),
              (t.interleaved = s));
            return;
          }
        } catch {}
      ((r = cp(e, t, s, n)),
        r !== null && ((s = Ke()), _t(r, e, n, s), Lp(r, t, n)));
    }
  }
  function Pp(e) {
    var t = e.alternate;
    return e === ge || (t !== null && t === ge);
  }
  function Op(e, t) {
    Ys = hi = !0;
    var r = e.pending;
    (r === null ? (t.next = t) : ((t.next = r.next), (r.next = t)),
      (e.pending = t));
  }
  function Lp(e, t, r) {
    if ((r & 4194240) !== 0) {
      var n = t.lanes;
      ((n &= e.pendingLanes), (r |= n), (t.lanes = r), zo(e, r));
    }
  }
  var gi = {
      readContext: pt,
      useCallback: ze,
      useContext: ze,
      useEffect: ze,
      useImperativeHandle: ze,
      useInsertionEffect: ze,
      useLayoutEffect: ze,
      useMemo: ze,
      useReducer: ze,
      useRef: ze,
      useState: ze,
      useDebugValue: ze,
      useDeferredValue: ze,
      useTransition: ze,
      useMutableSource: ze,
      useSyncExternalStore: ze,
      useId: ze,
      unstable_isNewReconciler: !1,
    },
    fy = {
      readContext: pt,
      useCallback: function (e, t) {
        return ((Tt().memoizedState = [e, t === void 0 ? null : t]), e);
      },
      useContext: pt,
      useEffect: Sp,
      useImperativeHandle: function (e, t, r) {
        return (
          (r = r != null ? r.concat([e]) : null),
          mi(4194308, 4, jp.bind(null, t, e), r)
        );
      },
      useLayoutEffect: function (e, t) {
        return mi(4194308, 4, e, t);
      },
      useInsertionEffect: function (e, t) {
        return mi(4, 2, e, t);
      },
      useMemo: function (e, t) {
        var r = Tt();
        return (
          (t = t === void 0 ? null : t),
          (e = e()),
          (r.memoizedState = [e, t]),
          e
        );
      },
      useReducer: function (e, t, r) {
        var n = Tt();
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
          (e = e.dispatch = hy.bind(null, ge, e)),
          [n.memoizedState, e]
        );
      },
      useRef: function (e) {
        var t = Tt();
        return ((e = { current: e }), (t.memoizedState = e));
      },
      useState: wp,
      useDebugValue: Il,
      useDeferredValue: function (e) {
        return (Tt().memoizedState = e);
      },
      useTransition: function () {
        var e = wp(!1),
          t = e[0];
        return ((e = py.bind(null, e[1])), (Tt().memoizedState = e), [t, e]);
      },
      useMutableSource: function () {},
      useSyncExternalStore: function (e, t, r) {
        var n = ge,
          s = Tt();
        if (pe) {
          if (r === void 0) throw Error(R(407));
          r = r();
        } else {
          if (((r = t()), Te === null)) throw Error(R(349));
          (Gr & 30) !== 0 || gp(n, t, r);
        }
        s.memoizedState = r;
        var a = { value: r, getSnapshot: t };
        return (
          (s.queue = a),
          Sp(vp.bind(null, n, a, e), [e]),
          (n.flags |= 2048),
          ea(9, yp.bind(null, n, a, r, t), void 0, null),
          r
        );
      },
      useId: function () {
        var e = Tt(),
          t = Te.identifierPrefix;
        if (pe) {
          var r = Vt,
            n = $t;
          ((r = (n & ~(1 << (32 - xt(n) - 1))).toString(32) + r),
            (t = ":" + t + "R" + r),
            (r = Xs++),
            0 < r && (t += "H" + r.toString(32)),
            (t += ":"));
        } else ((r = dy++), (t = ":" + t + "r" + r.toString(32) + ":"));
        return (e.memoizedState = t);
      },
      unstable_isNewReconciler: !1,
    },
    gy = {
      readContext: pt,
      useCallback: Rp,
      useContext: pt,
      useEffect: Dl,
      useImperativeHandle: Np,
      useInsertionEffect: Cp,
      useLayoutEffect: _p,
      useMemo: Ap,
      useReducer: Ll,
      useRef: kp,
      useState: function () {
        return Ll(Js);
      },
      useDebugValue: Il,
      useDeferredValue: function (e) {
        var t = ht();
        return Ep(t, Ne.memoizedState, e);
      },
      useTransition: function () {
        var e = Ll(Js)[0],
          t = ht().memoizedState;
        return [e, t];
      },
      useMutableSource: mp,
      useSyncExternalStore: fp,
      useId: Tp,
      unstable_isNewReconciler: !1,
    },
    yy = {
      readContext: pt,
      useCallback: Rp,
      useContext: pt,
      useEffect: Dl,
      useImperativeHandle: Np,
      useInsertionEffect: Cp,
      useLayoutEffect: _p,
      useMemo: Ap,
      useReducer: Ml,
      useRef: kp,
      useState: function () {
        return Ml(Js);
      },
      useDebugValue: Il,
      useDeferredValue: function (e) {
        var t = ht();
        return Ne === null ? (t.memoizedState = e) : Ep(t, Ne.memoizedState, e);
      },
      useTransition: function () {
        var e = Ml(Js)[0],
          t = ht().memoizedState;
        return [e, t];
      },
      useMutableSource: mp,
      useSyncExternalStore: fp,
      useId: Tp,
      unstable_isNewReconciler: !1,
    };
  function kt(e, t) {
    if (e && e.defaultProps) {
      ((t = me({}, t)), (e = e.defaultProps));
      for (var r in e) t[r] === void 0 && (t[r] = e[r]);
      return t;
    }
    return t;
  }
  function Fl(e, t, r, n) {
    ((t = e.memoizedState),
      (r = r(n, t)),
      (r = r == null ? t : me({}, t, r)),
      (e.memoizedState = r),
      e.lanes === 0 && (e.updateQueue.baseState = r));
  }
  var yi = {
    isMounted: function (e) {
      return (e = e._reactInternals) ? $r(e) === e : !1;
    },
    enqueueSetState: function (e, t, r) {
      e = e._reactInternals;
      var n = Ke(),
        s = Sr(e),
        a = Kt(n, s);
      ((a.payload = t),
        r != null && (a.callback = r),
        (t = xr(e, a, s)),
        t !== null && (_t(t, e, s, n), ci(t, e, s)));
    },
    enqueueReplaceState: function (e, t, r) {
      e = e._reactInternals;
      var n = Ke(),
        s = Sr(e),
        a = Kt(n, s);
      ((a.tag = 1),
        (a.payload = t),
        r != null && (a.callback = r),
        (t = xr(e, a, s)),
        t !== null && (_t(t, e, s, n), ci(t, e, s)));
    },
    enqueueForceUpdate: function (e, t) {
      e = e._reactInternals;
      var r = Ke(),
        n = Sr(e),
        s = Kt(r, n);
      ((s.tag = 2),
        t != null && (s.callback = t),
        (t = xr(e, s, n)),
        t !== null && (_t(t, e, n, r), ci(t, e, n)));
    },
  };
  function Mp(e, t, r, n, s, a, o) {
    return (
      (e = e.stateNode),
      typeof e.shouldComponentUpdate == "function"
        ? e.shouldComponentUpdate(n, a, o)
        : t.prototype && t.prototype.isPureReactComponent
          ? !Bs(r, n) || !Bs(s, a)
          : !0
    );
  }
  function Dp(e, t, r) {
    var n = !1,
      s = gr,
      a = t.contextType;
    return (
      typeof a == "object" && a !== null
        ? (a = pt(a))
        : ((s = Ye(t) ? Wr : Fe.current),
          (n = t.contextTypes),
          (a = (n = n != null) ? zn(e, s) : gr)),
      (t = new t(r, a)),
      (e.memoizedState =
        t.state !== null && t.state !== void 0 ? t.state : null),
      (t.updater = yi),
      (e.stateNode = t),
      (t._reactInternals = e),
      n &&
        ((e = e.stateNode),
        (e.__reactInternalMemoizedUnmaskedChildContext = s),
        (e.__reactInternalMemoizedMaskedChildContext = a)),
      t
    );
  }
  function Ip(e, t, r, n) {
    ((e = t.state),
      typeof t.componentWillReceiveProps == "function" &&
        t.componentWillReceiveProps(r, n),
      typeof t.UNSAFE_componentWillReceiveProps == "function" &&
        t.UNSAFE_componentWillReceiveProps(r, n),
      t.state !== e && yi.enqueueReplaceState(t, t.state, null));
  }
  function zl(e, t, r, n) {
    var s = e.stateNode;
    ((s.props = r), (s.state = e.memoizedState), (s.refs = {}), _l(e));
    var a = t.contextType;
    (typeof a == "object" && a !== null
      ? (s.context = pt(a))
      : ((a = Ye(t) ? Wr : Fe.current), (s.context = zn(e, a))),
      (s.state = e.memoizedState),
      (a = t.getDerivedStateFromProps),
      typeof a == "function" && (Fl(e, t, a, r), (s.state = e.memoizedState)),
      typeof t.getDerivedStateFromProps == "function" ||
        typeof s.getSnapshotBeforeUpdate == "function" ||
        (typeof s.UNSAFE_componentWillMount != "function" &&
          typeof s.componentWillMount != "function") ||
        ((t = s.state),
        typeof s.componentWillMount == "function" && s.componentWillMount(),
        typeof s.UNSAFE_componentWillMount == "function" &&
          s.UNSAFE_componentWillMount(),
        t !== s.state && yi.enqueueReplaceState(s, s.state, null),
        ui(e, r, s, n),
        (s.state = e.memoizedState)),
      typeof s.componentDidMount == "function" && (e.flags |= 4194308));
  }
  function Hn(e, t) {
    try {
      var r = "",
        n = t;
      do ((r += Wf(n)), (n = n.return));
      while (n);
      var s = r;
    } catch (a) {
      s =
        `
Error generating stack: ` +
        a.message +
        `
` +
        a.stack;
    }
    return { value: e, source: t, stack: s, digest: null };
  }
  function Bl(e, t, r) {
    return { value: e, source: null, stack: r ?? null, digest: t ?? null };
  }
  function Ul(e, t) {
    try {
      console.error(t.value);
    } catch (r) {
      setTimeout(function () {
        throw r;
      });
    }
  }
  var vy = typeof WeakMap == "function" ? WeakMap : Map;
  function Fp(e, t, r) {
    ((r = Kt(-1, r)), (r.tag = 3), (r.payload = { element: null }));
    var n = t.value;
    return (
      (r.callback = function () {
        (Ci || ((Ci = !0), (rc = n)), Ul(e, t));
      }),
      r
    );
  }
  function zp(e, t, r) {
    ((r = Kt(-1, r)), (r.tag = 3));
    var n = e.type.getDerivedStateFromError;
    if (typeof n == "function") {
      var s = t.value;
      ((r.payload = function () {
        return n(s);
      }),
        (r.callback = function () {
          Ul(e, t);
        }));
    }
    var a = e.stateNode;
    return (
      a !== null &&
        typeof a.componentDidCatch == "function" &&
        (r.callback = function () {
          (Ul(e, t),
            typeof n != "function" &&
              (wr === null ? (wr = new Set([this])) : wr.add(this)));
          var o = t.stack;
          this.componentDidCatch(t.value, {
            componentStack: o !== null ? o : "",
          });
        }),
      r
    );
  }
  function Bp(e, t, r) {
    var n = e.pingCache;
    if (n === null) {
      n = e.pingCache = new vy();
      var s = new Set();
      n.set(t, s);
    } else ((s = n.get(t)), s === void 0 && ((s = new Set()), n.set(t, s)));
    s.has(r) || (s.add(r), (e = Py.bind(null, e, t, r)), t.then(e, e));
  }
  function Up(e) {
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
  function qp(e, t, r, n, s) {
    return (e.mode & 1) === 0
      ? (e === t
          ? (e.flags |= 65536)
          : ((e.flags |= 128),
            (r.flags |= 131072),
            (r.flags &= -52805),
            r.tag === 1 &&
              (r.alternate === null
                ? (r.tag = 17)
                : ((t = Kt(-1, 1)), (t.tag = 2), xr(r, t, 1))),
            (r.lanes |= 1)),
        e)
      : ((e.flags |= 65536), (e.lanes = s), e);
  }
  var xy = Bt.ReactCurrentOwner,
    Xe = !1;
  function We(e, t, r, n) {
    t.child = e === null ? lp(t, null, r, n) : $n(t, e.child, r, n);
  }
  function $p(e, t, r, n, s) {
    r = r.render;
    var a = t.ref;
    return (
      Wn(t, s),
      (n = Pl(e, t, r, n, a, s)),
      (r = Ol()),
      e !== null && !Xe
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~s),
          Ht(e, t, s))
        : (pe && r && fl(t), (t.flags |= 1), We(e, t, n, s), t.child)
    );
  }
  function Vp(e, t, r, n, s) {
    if (e === null) {
      var a = r.type;
      return typeof a == "function" &&
        !cc(a) &&
        a.defaultProps === void 0 &&
        r.compare === null &&
        r.defaultProps === void 0
        ? ((t.tag = 15), (t.type = a), Wp(e, t, a, n, s))
        : ((e = Ei(r.type, null, n, t, t.mode, s)),
          (e.ref = t.ref),
          (e.return = t),
          (t.child = e));
    }
    if (((a = e.child), (e.lanes & s) === 0)) {
      var o = a.memoizedProps;
      if (
        ((r = r.compare), (r = r !== null ? r : Bs), r(o, n) && e.ref === t.ref)
      )
        return Ht(e, t, s);
    }
    return (
      (t.flags |= 1),
      (e = _r(a, n)),
      (e.ref = t.ref),
      (e.return = t),
      (t.child = e)
    );
  }
  function Wp(e, t, r, n, s) {
    if (e !== null) {
      var a = e.memoizedProps;
      if (Bs(a, n) && e.ref === t.ref)
        if (((Xe = !1), (t.pendingProps = n = a), (e.lanes & s) !== 0))
          (e.flags & 131072) !== 0 && (Xe = !0);
        else return ((t.lanes = e.lanes), Ht(e, t, s));
    }
    return ql(e, t, r, n, s);
  }
  function Kp(e, t, r) {
    var n = t.pendingProps,
      s = n.children,
      a = e !== null ? e.memoizedState : null;
    if (n.mode === "hidden")
      if ((t.mode & 1) === 0)
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          ce(Zn, lt),
          (lt |= r));
      else {
        if ((r & 1073741824) === 0)
          return (
            (e = a !== null ? a.baseLanes | r : r),
            (t.lanes = t.childLanes = 1073741824),
            (t.memoizedState = {
              baseLanes: e,
              cachePool: null,
              transitions: null,
            }),
            (t.updateQueue = null),
            ce(Zn, lt),
            (lt |= e),
            null
          );
        ((t.memoizedState = {
          baseLanes: 0,
          cachePool: null,
          transitions: null,
        }),
          (n = a !== null ? a.baseLanes : r),
          ce(Zn, lt),
          (lt |= n));
      }
    else
      (a !== null ? ((n = a.baseLanes | r), (t.memoizedState = null)) : (n = r),
        ce(Zn, lt),
        (lt |= n));
    return (We(e, t, s, r), t.child);
  }
  function Hp(e, t) {
    var r = t.ref;
    ((e === null && r !== null) || (e !== null && e.ref !== r)) &&
      ((t.flags |= 512), (t.flags |= 2097152));
  }
  function ql(e, t, r, n, s) {
    var a = Ye(r) ? Wr : Fe.current;
    return (
      (a = zn(t, a)),
      Wn(t, s),
      (r = Pl(e, t, r, n, a, s)),
      (n = Ol()),
      e !== null && !Xe
        ? ((t.updateQueue = e.updateQueue),
          (t.flags &= -2053),
          (e.lanes &= ~s),
          Ht(e, t, s))
        : (pe && n && fl(t), (t.flags |= 1), We(e, t, r, s), t.child)
    );
  }
  function Qp(e, t, r, n, s) {
    if (Ye(r)) {
      var a = !0;
      ti(t);
    } else a = !1;
    if ((Wn(t, s), t.stateNode === null))
      (xi(e, t), Dp(t, r, n), zl(t, r, n, s), (n = !0));
    else if (e === null) {
      var o = t.stateNode,
        l = t.memoizedProps;
      o.props = l;
      var c = o.context,
        u = r.contextType;
      typeof u == "object" && u !== null
        ? (u = pt(u))
        : ((u = Ye(r) ? Wr : Fe.current), (u = zn(t, u)));
      var d = r.getDerivedStateFromProps,
        h =
          typeof d == "function" ||
          typeof o.getSnapshotBeforeUpdate == "function";
      (h ||
        (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
          typeof o.componentWillReceiveProps != "function") ||
        ((l !== n || c !== u) && Ip(t, o, n, u)),
        (vr = !1));
      var m = t.memoizedState;
      ((o.state = m),
        ui(t, n, o, s),
        (c = t.memoizedState),
        l !== n || m !== c || Ge.current || vr
          ? (typeof d == "function" && (Fl(t, r, d, n), (c = t.memoizedState)),
            (l = vr || Mp(t, r, l, n, m, c, u))
              ? (h ||
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
        up(e, t),
        (l = t.memoizedProps),
        (u = t.type === t.elementType ? l : kt(t.type, l)),
        (o.props = u),
        (h = t.pendingProps),
        (m = o.context),
        (c = r.contextType),
        typeof c == "object" && c !== null
          ? (c = pt(c))
          : ((c = Ye(r) ? Wr : Fe.current), (c = zn(t, c))));
      var v = r.getDerivedStateFromProps;
      ((d =
        typeof v == "function" ||
        typeof o.getSnapshotBeforeUpdate == "function") ||
        (typeof o.UNSAFE_componentWillReceiveProps != "function" &&
          typeof o.componentWillReceiveProps != "function") ||
        ((l !== h || m !== c) && Ip(t, o, n, c)),
        (vr = !1),
        (m = t.memoizedState),
        (o.state = m),
        ui(t, n, o, s));
      var x = t.memoizedState;
      l !== h || m !== x || Ge.current || vr
        ? (typeof v == "function" && (Fl(t, r, v, n), (x = t.memoizedState)),
          (u = vr || Mp(t, r, u, n, m, x, c) || !1)
            ? (d ||
                (typeof o.UNSAFE_componentWillUpdate != "function" &&
                  typeof o.componentWillUpdate != "function") ||
                (typeof o.componentWillUpdate == "function" &&
                  o.componentWillUpdate(n, x, c),
                typeof o.UNSAFE_componentWillUpdate == "function" &&
                  o.UNSAFE_componentWillUpdate(n, x, c)),
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
              (t.memoizedState = x)),
          (o.props = n),
          (o.state = x),
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
    return $l(e, t, r, n, a, s);
  }
  function $l(e, t, r, n, s, a) {
    Hp(e, t);
    var o = (t.flags & 128) !== 0;
    if (!n && !o) return (s && Jd(t, r, !1), Ht(e, t, a));
    ((n = t.stateNode), (xy.current = t));
    var l =
      o && typeof r.getDerivedStateFromError != "function" ? null : n.render();
    return (
      (t.flags |= 1),
      e !== null && o
        ? ((t.child = $n(t, e.child, null, a)), (t.child = $n(t, null, l, a)))
        : We(e, t, l, a),
      (t.memoizedState = n.state),
      s && Jd(t, r, !0),
      t.child
    );
  }
  function Zp(e) {
    var t = e.stateNode;
    (t.pendingContext
      ? Yd(e, t.pendingContext, t.pendingContext !== t.context)
      : t.context && Yd(e, t.context, !1),
      jl(e, t.containerInfo));
  }
  function Gp(e, t, r, n, s) {
    return (qn(), xl(s), (t.flags |= 256), We(e, t, r, n), t.child);
  }
  var Vl = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Wl(e) {
    return { baseLanes: e, cachePool: null, transitions: null };
  }
  function Yp(e, t, r) {
    var n = t.pendingProps,
      s = fe.current,
      a = !1,
      o = (t.flags & 128) !== 0,
      l;
    if (
      ((l = o) ||
        (l = e !== null && e.memoizedState === null ? !1 : (s & 2) !== 0),
      l
        ? ((a = !0), (t.flags &= -129))
        : (e === null || e.memoizedState !== null) && (s |= 1),
      ce(fe, s & 1),
      e === null)
    )
      return (
        vl(t),
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
            a
              ? ((n = t.mode),
                (a = t.child),
                (o = { mode: "hidden", children: o }),
                (n & 1) === 0 && a !== null
                  ? ((a.childLanes = 0), (a.pendingProps = o))
                  : (a = Ti(o, n, 0, null)),
                (e = tn(e, n, r, null)),
                (a.return = t),
                (e.return = t),
                (a.sibling = e),
                (t.child = a),
                (t.child.memoizedState = Wl(r)),
                (t.memoizedState = Vl),
                e)
              : Kl(t, o))
      );
    if (((s = e.memoizedState), s !== null && ((l = s.dehydrated), l !== null)))
      return by(e, t, o, n, l, s, r);
    if (a) {
      ((a = n.fallback), (o = t.mode), (s = e.child), (l = s.sibling));
      var c = { mode: "hidden", children: n.children };
      return (
        (o & 1) === 0 && t.child !== s
          ? ((n = t.child),
            (n.childLanes = 0),
            (n.pendingProps = c),
            (t.deletions = null))
          : ((n = _r(s, c)), (n.subtreeFlags = s.subtreeFlags & 14680064)),
        l !== null ? (a = _r(l, a)) : ((a = tn(a, o, r, null)), (a.flags |= 2)),
        (a.return = t),
        (n.return = t),
        (n.sibling = a),
        (t.child = n),
        (n = a),
        (a = t.child),
        (o = e.child.memoizedState),
        (o =
          o === null
            ? Wl(r)
            : {
                baseLanes: o.baseLanes | r,
                cachePool: null,
                transitions: o.transitions,
              }),
        (a.memoizedState = o),
        (a.childLanes = e.childLanes & ~r),
        (t.memoizedState = Vl),
        n
      );
    }
    return (
      (a = e.child),
      (e = a.sibling),
      (n = _r(a, { mode: "visible", children: n.children })),
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
  function Kl(e, t) {
    return (
      (t = Ti({ mode: "visible", children: t }, e.mode, 0, null)),
      (t.return = e),
      (e.child = t)
    );
  }
  function vi(e, t, r, n) {
    return (
      n !== null && xl(n),
      $n(t, e.child, null, r),
      (e = Kl(t, t.pendingProps.children)),
      (e.flags |= 2),
      (t.memoizedState = null),
      e
    );
  }
  function by(e, t, r, n, s, a, o) {
    if (r)
      return t.flags & 256
        ? ((t.flags &= -257), (n = Bl(Error(R(422)))), vi(e, t, o, n))
        : t.memoizedState !== null
          ? ((t.child = e.child), (t.flags |= 128), null)
          : ((a = n.fallback),
            (s = t.mode),
            (n = Ti({ mode: "visible", children: n.children }, s, 0, null)),
            (a = tn(a, s, o, null)),
            (a.flags |= 2),
            (n.return = t),
            (a.return = t),
            (n.sibling = a),
            (t.child = n),
            (t.mode & 1) !== 0 && $n(t, e.child, null, o),
            (t.child.memoizedState = Wl(o)),
            (t.memoizedState = Vl),
            a);
    if ((t.mode & 1) === 0) return vi(e, t, o, null);
    if (s.data === "$!") {
      if (((n = s.nextSibling && s.nextSibling.dataset), n)) var l = n.dgst;
      return (
        (n = l),
        (a = Error(R(419))),
        (n = Bl(a, n, void 0)),
        vi(e, t, o, n)
      );
    }
    if (((l = (o & e.childLanes) !== 0), Xe || l)) {
      if (((n = Te), n !== null)) {
        switch (o & -o) {
          case 4:
            s = 2;
            break;
          case 16:
            s = 8;
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
            s = 32;
            break;
          case 536870912:
            s = 268435456;
            break;
          default:
            s = 0;
        }
        ((s = (s & (n.suspendedLanes | o)) !== 0 ? 0 : s),
          s !== 0 &&
            s !== a.retryLane &&
            ((a.retryLane = s), Wt(e, s), _t(n, e, s, -1)));
      }
      return (lc(), (n = Bl(Error(R(421)))), vi(e, t, o, n));
    }
    return s.data === "$?"
      ? ((t.flags |= 128),
        (t.child = e.child),
        (t = Oy.bind(null, e)),
        (s._reactRetry = t),
        null)
      : ((e = a.treeContext),
        (ot = mr(s.nextSibling)),
        (it = t),
        (pe = !0),
        (wt = null),
        e !== null &&
          ((ut[dt++] = $t),
          (ut[dt++] = Vt),
          (ut[dt++] = Kr),
          ($t = e.id),
          (Vt = e.overflow),
          (Kr = t)),
        (t = Kl(t, n.children)),
        (t.flags |= 4096),
        t);
  }
  function Xp(e, t, r) {
    e.lanes |= t;
    var n = e.alternate;
    (n !== null && (n.lanes |= t), Sl(e.return, t, r));
  }
  function Hl(e, t, r, n, s) {
    var a = e.memoizedState;
    a === null
      ? (e.memoizedState = {
          isBackwards: t,
          rendering: null,
          renderingStartTime: 0,
          last: n,
          tail: r,
          tailMode: s,
        })
      : ((a.isBackwards = t),
        (a.rendering = null),
        (a.renderingStartTime = 0),
        (a.last = n),
        (a.tail = r),
        (a.tailMode = s));
  }
  function Jp(e, t, r) {
    var n = t.pendingProps,
      s = n.revealOrder,
      a = n.tail;
    if ((We(e, t, n.children, r), (n = fe.current), (n & 2) !== 0))
      ((n = (n & 1) | 2), (t.flags |= 128));
    else {
      if (e !== null && (e.flags & 128) !== 0)
        e: for (e = t.child; e !== null; ) {
          if (e.tag === 13) e.memoizedState !== null && Xp(e, r, t);
          else if (e.tag === 19) Xp(e, r, t);
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
    if ((ce(fe, n), (t.mode & 1) === 0)) t.memoizedState = null;
    else
      switch (s) {
        case "forwards":
          for (r = t.child, s = null; r !== null; )
            ((e = r.alternate),
              e !== null && di(e) === null && (s = r),
              (r = r.sibling));
          ((r = s),
            r === null
              ? ((s = t.child), (t.child = null))
              : ((s = r.sibling), (r.sibling = null)),
            Hl(t, !1, s, r, a));
          break;
        case "backwards":
          for (r = null, s = t.child, t.child = null; s !== null; ) {
            if (((e = s.alternate), e !== null && di(e) === null)) {
              t.child = s;
              break;
            }
            ((e = s.sibling), (s.sibling = r), (r = s), (s = e));
          }
          Hl(t, !0, r, null, a);
          break;
        case "together":
          Hl(t, !1, null, null, void 0);
          break;
        default:
          t.memoizedState = null;
      }
    return t.child;
  }
  function xi(e, t) {
    (t.mode & 1) === 0 &&
      e !== null &&
      ((e.alternate = null), (t.alternate = null), (t.flags |= 2));
  }
  function Ht(e, t, r) {
    if (
      (e !== null && (t.dependencies = e.dependencies),
      (Yr |= t.lanes),
      (r & t.childLanes) === 0)
    )
      return null;
    if (e !== null && t.child !== e.child) throw Error(R(153));
    if (t.child !== null) {
      for (
        e = t.child, r = _r(e, e.pendingProps), t.child = r, r.return = t;
        e.sibling !== null;
      )
        ((e = e.sibling),
          (r = r.sibling = _r(e, e.pendingProps)),
          (r.return = t));
      r.sibling = null;
    }
    return t.child;
  }
  function wy(e, t, r) {
    switch (t.tag) {
      case 3:
        (Zp(t), qn());
        break;
      case 5:
        hp(t);
        break;
      case 1:
        Ye(t.type) && ti(t);
        break;
      case 4:
        jl(t, t.stateNode.containerInfo);
        break;
      case 10:
        var n = t.type._context,
          s = t.memoizedProps.value;
        (ce(oi, n._currentValue), (n._currentValue = s));
        break;
      case 13:
        if (((n = t.memoizedState), n !== null))
          return n.dehydrated !== null
            ? (ce(fe, fe.current & 1), (t.flags |= 128), null)
            : (r & t.child.childLanes) !== 0
              ? Yp(e, t, r)
              : (ce(fe, fe.current & 1),
                (e = Ht(e, t, r)),
                e !== null ? e.sibling : null);
        ce(fe, fe.current & 1);
        break;
      case 19:
        if (((n = (r & t.childLanes) !== 0), (e.flags & 128) !== 0)) {
          if (n) return Jp(e, t, r);
          t.flags |= 128;
        }
        if (
          ((s = t.memoizedState),
          s !== null &&
            ((s.rendering = null), (s.tail = null), (s.lastEffect = null)),
          ce(fe, fe.current),
          n)
        )
          break;
        return null;
      case 22:
      case 23:
        return ((t.lanes = 0), Kp(e, t, r));
    }
    return Ht(e, t, r);
  }
  var eh, Ql, th, rh;
  ((eh = function (e, t) {
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
    (Ql = function () {}),
    (th = function (e, t, r, n) {
      var s = e.memoizedProps;
      if (s !== n) {
        ((e = t.stateNode), Zr(Et.current));
        var a = null;
        switch (r) {
          case "input":
            ((s = So(e, s)), (n = So(e, n)), (a = []));
            break;
          case "select":
            ((s = me({}, s, { value: void 0 })),
              (n = me({}, n, { value: void 0 })),
              (a = []));
            break;
          case "textarea":
            ((s = jo(e, s)), (n = jo(e, n)), (a = []));
            break;
          default:
            typeof s.onClick != "function" &&
              typeof n.onClick == "function" &&
              (e.onclick = Xa);
        }
        Ro(r, n);
        var o;
        r = null;
        for (u in s)
          if (!n.hasOwnProperty(u) && s.hasOwnProperty(u) && s[u] != null)
            if (u === "style") {
              var l = s[u];
              for (o in l) l.hasOwnProperty(o) && (r || (r = {}), (r[o] = ""));
            } else
              u !== "dangerouslySetInnerHTML" &&
                u !== "children" &&
                u !== "suppressContentEditableWarning" &&
                u !== "suppressHydrationWarning" &&
                u !== "autoFocus" &&
                (xs.hasOwnProperty(u)
                  ? a || (a = [])
                  : (a = a || []).push(u, null));
        for (u in n) {
          var c = n[u];
          if (
            ((l = s?.[u]),
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
              } else (r || (a || (a = []), a.push(u, r)), (r = c));
            else
              u === "dangerouslySetInnerHTML"
                ? ((c = c ? c.__html : void 0),
                  (l = l ? l.__html : void 0),
                  c != null && l !== c && (a = a || []).push(u, c))
                : u === "children"
                  ? (typeof c != "string" && typeof c != "number") ||
                    (a = a || []).push(u, "" + c)
                  : u !== "suppressContentEditableWarning" &&
                    u !== "suppressHydrationWarning" &&
                    (xs.hasOwnProperty(u)
                      ? (c != null && u === "onScroll" && ue("scroll", e),
                        a || l === c || (a = []))
                      : (a = a || []).push(u, c));
        }
        r && (a = a || []).push("style", r);
        var u = a;
        (t.updateQueue = u) && (t.flags |= 4);
      }
    }),
    (rh = function (e, t, r, n) {
      r !== n && (t.flags |= 4);
    }));
  function ta(e, t) {
    if (!pe)
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
      for (var s = e.child; s !== null; )
        ((r |= s.lanes | s.childLanes),
          (n |= s.subtreeFlags & 14680064),
          (n |= s.flags & 14680064),
          (s.return = e),
          (s = s.sibling));
    else
      for (s = e.child; s !== null; )
        ((r |= s.lanes | s.childLanes),
          (n |= s.subtreeFlags),
          (n |= s.flags),
          (s.return = e),
          (s = s.sibling));
    return ((e.subtreeFlags |= n), (e.childLanes = r), t);
  }
  function ky(e, t, r) {
    var n = t.pendingProps;
    switch ((gl(t), t.tag)) {
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
        return (Ye(t.type) && ei(), Be(t), null);
      case 3:
        return (
          (n = t.stateNode),
          Kn(),
          de(Ge),
          de(Fe),
          Al(),
          n.pendingContext &&
            ((n.context = n.pendingContext), (n.pendingContext = null)),
          (e === null || e.child === null) &&
            (ai(t)
              ? (t.flags |= 4)
              : e === null ||
                (e.memoizedState.isDehydrated && (t.flags & 256) === 0) ||
                ((t.flags |= 1024), wt !== null && (ac(wt), (wt = null)))),
          Ql(e, t),
          Be(t),
          null
        );
      case 5:
        Nl(t);
        var s = Zr(Gs.current);
        if (((r = t.type), e !== null && t.stateNode != null))
          (th(e, t, r, n, s),
            e.ref !== t.ref && ((t.flags |= 512), (t.flags |= 2097152)));
        else {
          if (!n) {
            if (t.stateNode === null) throw Error(R(166));
            return (Be(t), null);
          }
          if (((e = Zr(Et.current)), ai(t))) {
            ((n = t.stateNode), (r = t.type));
            var a = t.memoizedProps;
            switch (((n[At] = t), (n[Ws] = a), (e = (t.mode & 1) !== 0), r)) {
              case "dialog":
                (ue("cancel", n), ue("close", n));
                break;
              case "iframe":
              case "object":
              case "embed":
                ue("load", n);
                break;
              case "video":
              case "audio":
                for (s = 0; s < qs.length; s++) ue(qs[s], n);
                break;
              case "source":
                ue("error", n);
                break;
              case "img":
              case "image":
              case "link":
                (ue("error", n), ue("load", n));
                break;
              case "details":
                ue("toggle", n);
                break;
              case "input":
                (Du(n, a), ue("invalid", n));
                break;
              case "select":
                ((n._wrapperState = { wasMultiple: !!a.multiple }),
                  ue("invalid", n));
                break;
              case "textarea":
                (zu(n, a), ue("invalid", n));
            }
            (Ro(r, a), (s = null));
            for (var o in a)
              if (a.hasOwnProperty(o)) {
                var l = a[o];
                o === "children"
                  ? typeof l == "string"
                    ? n.textContent !== l &&
                      (a.suppressHydrationWarning !== !0 &&
                        Ya(n.textContent, l, e),
                      (s = ["children", l]))
                    : typeof l == "number" &&
                      n.textContent !== "" + l &&
                      (a.suppressHydrationWarning !== !0 &&
                        Ya(n.textContent, l, e),
                      (s = ["children", "" + l]))
                  : xs.hasOwnProperty(o) &&
                    l != null &&
                    o === "onScroll" &&
                    ue("scroll", n);
              }
            switch (r) {
              case "input":
                (Ra(n), Fu(n, a, !0));
                break;
              case "textarea":
                (Ra(n), Uu(n));
                break;
              case "select":
              case "option":
                break;
              default:
                typeof a.onClick == "function" && (n.onclick = Xa);
            }
            ((n = s), (t.updateQueue = n), n !== null && (t.flags |= 4));
          } else {
            ((o = s.nodeType === 9 ? s : s.ownerDocument),
              e === "http://www.w3.org/1999/xhtml" && (e = qu(r)),
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
              (e[At] = t),
              (e[Ws] = n),
              eh(e, t, !1, !1),
              (t.stateNode = e));
            e: {
              switch (((o = Ao(r, n)), r)) {
                case "dialog":
                  (ue("cancel", e), ue("close", e), (s = n));
                  break;
                case "iframe":
                case "object":
                case "embed":
                  (ue("load", e), (s = n));
                  break;
                case "video":
                case "audio":
                  for (s = 0; s < qs.length; s++) ue(qs[s], e);
                  s = n;
                  break;
                case "source":
                  (ue("error", e), (s = n));
                  break;
                case "img":
                case "image":
                case "link":
                  (ue("error", e), ue("load", e), (s = n));
                  break;
                case "details":
                  (ue("toggle", e), (s = n));
                  break;
                case "input":
                  (Du(e, n), (s = So(e, n)), ue("invalid", e));
                  break;
                case "option":
                  s = n;
                  break;
                case "select":
                  ((e._wrapperState = { wasMultiple: !!n.multiple }),
                    (s = me({}, n, { value: void 0 })),
                    ue("invalid", e));
                  break;
                case "textarea":
                  (zu(e, n), (s = jo(e, n)), ue("invalid", e));
                  break;
                default:
                  s = n;
              }
              (Ro(r, s), (l = s));
              for (a in l)
                if (l.hasOwnProperty(a)) {
                  var c = l[a];
                  a === "style"
                    ? Wu(e, c)
                    : a === "dangerouslySetInnerHTML"
                      ? ((c = c ? c.__html : void 0), c != null && $u(e, c))
                      : a === "children"
                        ? typeof c == "string"
                          ? (r !== "textarea" || c !== "") && Ss(e, c)
                          : typeof c == "number" && Ss(e, "" + c)
                        : a !== "suppressContentEditableWarning" &&
                          a !== "suppressHydrationWarning" &&
                          a !== "autoFocus" &&
                          (xs.hasOwnProperty(a)
                            ? c != null && a === "onScroll" && ue("scroll", e)
                            : c != null && po(e, a, c, o));
                }
              switch (r) {
                case "input":
                  (Ra(e), Fu(e, n, !1));
                  break;
                case "textarea":
                  (Ra(e), Uu(e));
                  break;
                case "option":
                  n.value != null && e.setAttribute("value", "" + or(n.value));
                  break;
                case "select":
                  ((e.multiple = !!n.multiple),
                    (a = n.value),
                    a != null
                      ? Nn(e, !!n.multiple, a, !1)
                      : n.defaultValue != null &&
                        Nn(e, !!n.multiple, n.defaultValue, !0));
                  break;
                default:
                  typeof s.onClick == "function" && (e.onclick = Xa);
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
        if (e && t.stateNode != null) rh(e, t, e.memoizedProps, n);
        else {
          if (typeof n != "string" && t.stateNode === null) throw Error(R(166));
          if (((r = Zr(Gs.current)), Zr(Et.current), ai(t))) {
            if (
              ((n = t.stateNode),
              (r = t.memoizedProps),
              (n[At] = t),
              (a = n.nodeValue !== r) && ((e = it), e !== null))
            )
              switch (e.tag) {
                case 3:
                  Ya(n.nodeValue, r, (e.mode & 1) !== 0);
                  break;
                case 5:
                  e.memoizedProps.suppressHydrationWarning !== !0 &&
                    Ya(n.nodeValue, r, (e.mode & 1) !== 0);
              }
            a && (t.flags |= 4);
          } else
            ((n = (r.nodeType === 9 ? r : r.ownerDocument).createTextNode(n)),
              (n[At] = t),
              (t.stateNode = n));
        }
        return (Be(t), null);
      case 13:
        if (
          (de(fe),
          (n = t.memoizedState),
          e === null ||
            (e.memoizedState !== null && e.memoizedState.dehydrated !== null))
        ) {
          if (pe && ot !== null && (t.mode & 1) !== 0 && (t.flags & 128) === 0)
            (ap(), qn(), (t.flags |= 98560), (a = !1));
          else if (((a = ai(t)), n !== null && n.dehydrated !== null)) {
            if (e === null) {
              if (!a) throw Error(R(318));
              if (
                ((a = t.memoizedState),
                (a = a !== null ? a.dehydrated : null),
                !a)
              )
                throw Error(R(317));
              a[At] = t;
            } else
              (qn(),
                (t.flags & 128) === 0 && (t.memoizedState = null),
                (t.flags |= 4));
            (Be(t), (a = !1));
          } else (wt !== null && (ac(wt), (wt = null)), (a = !0));
          if (!a) return t.flags & 65536 ? t : null;
        }
        return (t.flags & 128) !== 0
          ? ((t.lanes = r), t)
          : ((n = n !== null),
            n !== (e !== null && e.memoizedState !== null) &&
              n &&
              ((t.child.flags |= 8192),
              (t.mode & 1) !== 0 &&
                (e === null || (fe.current & 1) !== 0
                  ? Re === 0 && (Re = 3)
                  : lc())),
            t.updateQueue !== null && (t.flags |= 4),
            Be(t),
            null);
      case 4:
        return (
          Kn(),
          Ql(e, t),
          e === null && $s(t.stateNode.containerInfo),
          Be(t),
          null
        );
      case 10:
        return (kl(t.type._context), Be(t), null);
      case 17:
        return (Ye(t.type) && ei(), Be(t), null);
      case 19:
        if ((de(fe), (a = t.memoizedState), a === null)) return (Be(t), null);
        if (((n = (t.flags & 128) !== 0), (o = a.rendering), o === null))
          if (n) ta(a, !1);
          else {
            if (Re !== 0 || (e !== null && (e.flags & 128) !== 0))
              for (e = t.child; e !== null; ) {
                if (((o = di(e)), o !== null)) {
                  for (
                    t.flags |= 128,
                      ta(a, !1),
                      n = o.updateQueue,
                      n !== null && ((t.updateQueue = n), (t.flags |= 4)),
                      t.subtreeFlags = 0,
                      n = r,
                      r = t.child;
                    r !== null;
                  )
                    ((a = r),
                      (e = n),
                      (a.flags &= 14680066),
                      (o = a.alternate),
                      o === null
                        ? ((a.childLanes = 0),
                          (a.lanes = e),
                          (a.child = null),
                          (a.subtreeFlags = 0),
                          (a.memoizedProps = null),
                          (a.memoizedState = null),
                          (a.updateQueue = null),
                          (a.dependencies = null),
                          (a.stateNode = null))
                        : ((a.childLanes = o.childLanes),
                          (a.lanes = o.lanes),
                          (a.child = o.child),
                          (a.subtreeFlags = 0),
                          (a.deletions = null),
                          (a.memoizedProps = o.memoizedProps),
                          (a.memoizedState = o.memoizedState),
                          (a.updateQueue = o.updateQueue),
                          (a.type = o.type),
                          (e = o.dependencies),
                          (a.dependencies =
                            e === null
                              ? null
                              : {
                                  lanes: e.lanes,
                                  firstContext: e.firstContext,
                                })),
                      (r = r.sibling));
                  return (ce(fe, (fe.current & 1) | 2), t.child);
                }
                e = e.sibling;
              }
            a.tail !== null &&
              ke() > Gn &&
              ((t.flags |= 128), (n = !0), ta(a, !1), (t.lanes = 4194304));
          }
        else {
          if (!n)
            if (((e = di(o)), e !== null)) {
              if (
                ((t.flags |= 128),
                (n = !0),
                (r = e.updateQueue),
                r !== null && ((t.updateQueue = r), (t.flags |= 4)),
                ta(a, !0),
                a.tail === null &&
                  a.tailMode === "hidden" &&
                  !o.alternate &&
                  !pe)
              )
                return (Be(t), null);
            } else
              2 * ke() - a.renderingStartTime > Gn &&
                r !== 1073741824 &&
                ((t.flags |= 128), (n = !0), ta(a, !1), (t.lanes = 4194304));
          a.isBackwards
            ? ((o.sibling = t.child), (t.child = o))
            : ((r = a.last),
              r !== null ? (r.sibling = o) : (t.child = o),
              (a.last = o));
        }
        return a.tail !== null
          ? ((t = a.tail),
            (a.rendering = t),
            (a.tail = t.sibling),
            (a.renderingStartTime = ke()),
            (t.sibling = null),
            (r = fe.current),
            ce(fe, n ? (r & 1) | 2 : r & 1),
            t)
          : (Be(t), null);
      case 22:
      case 23:
        return (
          oc(),
          (n = t.memoizedState !== null),
          e !== null && (e.memoizedState !== null) !== n && (t.flags |= 8192),
          n && (t.mode & 1) !== 0
            ? (lt & 1073741824) !== 0 &&
              (Be(t), t.subtreeFlags & 6 && (t.flags |= 8192))
            : Be(t),
          null
        );
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(R(156, t.tag));
  }
  function Sy(e, t) {
    switch ((gl(t), t.tag)) {
      case 1:
        return (
          Ye(t.type) && ei(),
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 3:
        return (
          Kn(),
          de(Ge),
          de(Fe),
          Al(),
          (e = t.flags),
          (e & 65536) !== 0 && (e & 128) === 0
            ? ((t.flags = (e & -65537) | 128), t)
            : null
        );
      case 5:
        return (Nl(t), null);
      case 13:
        if (
          (de(fe), (e = t.memoizedState), e !== null && e.dehydrated !== null)
        ) {
          if (t.alternate === null) throw Error(R(340));
          qn();
        }
        return (
          (e = t.flags),
          e & 65536 ? ((t.flags = (e & -65537) | 128), t) : null
        );
      case 19:
        return (de(fe), null);
      case 4:
        return (Kn(), null);
      case 10:
        return (kl(t.type._context), null);
      case 22:
      case 23:
        return (oc(), null);
      case 24:
        return null;
      default:
        return null;
    }
  }
  var bi = !1,
    Ue = !1,
    Cy = typeof WeakSet == "function" ? WeakSet : Set,
    I = null;
  function Qn(e, t) {
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
  function Zl(e, t, r) {
    try {
      r();
    } catch (n) {
      ve(e, t, n);
    }
  }
  var nh = !1;
  function _y(e, t) {
    if (((ol = Ba), (e = Md()), Jo(e))) {
      if ("selectionStart" in e)
        var r = { start: e.selectionStart, end: e.selectionEnd };
      else
        e: {
          r = ((r = e.ownerDocument) && r.defaultView) || window;
          var n = r.getSelection && r.getSelection();
          if (n && n.rangeCount !== 0) {
            r = n.anchorNode;
            var s = n.anchorOffset,
              a = n.focusNode;
            n = n.focusOffset;
            try {
              (r.nodeType, a.nodeType);
            } catch {
              r = null;
              break e;
            }
            var o = 0,
              l = -1,
              c = -1,
              u = 0,
              d = 0,
              h = e,
              m = null;
            t: for (;;) {
              for (
                var v;
                h !== r || (s !== 0 && h.nodeType !== 3) || (l = o + s),
                  h !== a || (n !== 0 && h.nodeType !== 3) || (c = o + n),
                  h.nodeType === 3 && (o += h.nodeValue.length),
                  (v = h.firstChild) !== null;
              )
                ((m = h), (h = v));
              for (;;) {
                if (h === e) break t;
                if (
                  (m === r && ++u === s && (l = o),
                  m === a && ++d === n && (c = o),
                  (v = h.nextSibling) !== null)
                )
                  break;
                ((h = m), (m = h.parentNode));
              }
              h = v;
            }
            r = l === -1 || c === -1 ? null : { start: l, end: c };
          } else r = null;
        }
      r = r || { start: 0, end: 0 };
    } else r = null;
    for (
      ll = { focusedElem: e, selectionRange: r }, Ba = !1, I = t;
      I !== null;
    )
      if (((t = I), (e = t.child), (t.subtreeFlags & 1028) !== 0 && e !== null))
        ((e.return = t), (I = e));
      else
        for (; I !== null; ) {
          t = I;
          try {
            var x = t.alternate;
            if ((t.flags & 1024) !== 0)
              switch (t.tag) {
                case 0:
                case 11:
                case 15:
                  break;
                case 1:
                  if (x !== null) {
                    var k = x.memoizedProps,
                      M = x.memoizedState,
                      y = t.stateNode,
                      p = y.getSnapshotBeforeUpdate(
                        t.elementType === t.type ? k : kt(t.type, k),
                        M
                      );
                    y.__reactInternalSnapshotBeforeUpdate = p;
                  }
                  break;
                case 3:
                  var g = t.stateNode.containerInfo;
                  g.nodeType === 1
                    ? (g.textContent = "")
                    : g.nodeType === 9 &&
                      g.documentElement &&
                      g.removeChild(g.documentElement);
                  break;
                case 5:
                case 6:
                case 4:
                case 17:
                  break;
                default:
                  throw Error(R(163));
              }
          } catch (b) {
            ve(t, t.return, b);
          }
          if (((e = t.sibling), e !== null)) {
            ((e.return = t.return), (I = e));
            break;
          }
          I = t.return;
        }
    return ((x = nh), (nh = !1), x);
  }
  function ra(e, t, r) {
    var n = t.updateQueue;
    if (((n = n !== null ? n.lastEffect : null), n !== null)) {
      var s = (n = n.next);
      do {
        if ((s.tag & e) === e) {
          var a = s.destroy;
          ((s.destroy = void 0), a !== void 0 && Zl(t, r, a));
        }
        s = s.next;
      } while (s !== n);
    }
  }
  function wi(e, t) {
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
  function Gl(e) {
    var t = e.ref;
    if (t !== null) {
      var r = e.stateNode;
      (e.tag, (e = r), typeof t == "function" ? t(e) : (t.current = e));
    }
  }
  function sh(e) {
    var t = e.alternate;
    (t !== null && ((e.alternate = null), sh(t)),
      (e.child = null),
      (e.deletions = null),
      (e.sibling = null),
      e.tag === 5 &&
        ((t = e.stateNode),
        t !== null &&
          (delete t[At],
          delete t[Ws],
          delete t[pl],
          delete t[oy],
          delete t[ly])),
      (e.stateNode = null),
      (e.return = null),
      (e.dependencies = null),
      (e.memoizedProps = null),
      (e.memoizedState = null),
      (e.pendingProps = null),
      (e.stateNode = null),
      (e.updateQueue = null));
  }
  function ah(e) {
    return e.tag === 5 || e.tag === 3 || e.tag === 4;
  }
  function ih(e) {
    e: for (;;) {
      for (; e.sibling === null; ) {
        if (e.return === null || ah(e.return)) return null;
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
  function Yl(e, t, r) {
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
            r != null || t.onclick !== null || (t.onclick = Xa)));
    else if (n !== 4 && ((e = e.child), e !== null))
      for (Yl(e, t, r), e = e.sibling; e !== null; )
        (Yl(e, t, r), (e = e.sibling));
  }
  function Xl(e, t, r) {
    var n = e.tag;
    if (n === 5 || n === 6)
      ((e = e.stateNode), t ? r.insertBefore(e, t) : r.appendChild(e));
    else if (n !== 4 && ((e = e.child), e !== null))
      for (Xl(e, t, r), e = e.sibling; e !== null; )
        (Xl(e, t, r), (e = e.sibling));
  }
  var Me = null,
    St = !1;
  function br(e, t, r) {
    for (r = r.child; r !== null; ) (oh(e, t, r), (r = r.sibling));
  }
  function oh(e, t, r) {
    if (Rt && typeof Rt.onCommitFiberUnmount == "function")
      try {
        Rt.onCommitFiberUnmount(La, r);
      } catch {}
    switch (r.tag) {
      case 5:
        Ue || Qn(r, t);
      case 6:
        var n = Me,
          s = St;
        ((Me = null),
          br(e, t, r),
          (Me = n),
          (St = s),
          Me !== null &&
            (St
              ? ((e = Me),
                (r = r.stateNode),
                e.nodeType === 8
                  ? e.parentNode.removeChild(r)
                  : e.removeChild(r))
              : Me.removeChild(r.stateNode)));
        break;
      case 18:
        Me !== null &&
          (St
            ? ((e = Me),
              (r = r.stateNode),
              e.nodeType === 8
                ? dl(e.parentNode, r)
                : e.nodeType === 1 && dl(e, r),
              Ls(e))
            : dl(Me, r.stateNode));
        break;
      case 4:
        ((n = Me),
          (s = St),
          (Me = r.stateNode.containerInfo),
          (St = !0),
          br(e, t, r),
          (Me = n),
          (St = s));
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (
          !Ue &&
          ((n = r.updateQueue), n !== null && ((n = n.lastEffect), n !== null))
        ) {
          s = n = n.next;
          do {
            var a = s,
              o = a.destroy;
            ((a = a.tag),
              o !== void 0 && ((a & 2) !== 0 || (a & 4) !== 0) && Zl(r, t, o),
              (s = s.next));
          } while (s !== n);
        }
        br(e, t, r);
        break;
      case 1:
        if (
          !Ue &&
          (Qn(r, t),
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
        br(e, t, r);
        break;
      case 21:
        br(e, t, r);
        break;
      case 22:
        r.mode & 1
          ? ((Ue = (n = Ue) || r.memoizedState !== null), br(e, t, r), (Ue = n))
          : br(e, t, r);
        break;
      default:
        br(e, t, r);
    }
  }
  function lh(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var r = e.stateNode;
      (r === null && (r = e.stateNode = new Cy()),
        t.forEach(function (n) {
          var s = Ly.bind(null, e, n);
          r.has(n) || (r.add(n), n.then(s, s));
        }));
    }
  }
  function Ct(e, t) {
    var r = t.deletions;
    if (r !== null)
      for (var n = 0; n < r.length; n++) {
        var s = r[n];
        try {
          var a = e,
            o = t,
            l = o;
          e: for (; l !== null; ) {
            switch (l.tag) {
              case 5:
                ((Me = l.stateNode), (St = !1));
                break e;
              case 3:
                ((Me = l.stateNode.containerInfo), (St = !0));
                break e;
              case 4:
                ((Me = l.stateNode.containerInfo), (St = !0));
                break e;
            }
            l = l.return;
          }
          if (Me === null) throw Error(R(160));
          (oh(a, o, s), (Me = null), (St = !1));
          var c = s.alternate;
          (c !== null && (c.return = null), (s.return = null));
        } catch (u) {
          ve(s, t, u);
        }
      }
    if (t.subtreeFlags & 12854)
      for (t = t.child; t !== null; ) (ch(t, e), (t = t.sibling));
  }
  function ch(e, t) {
    var r = e.alternate,
      n = e.flags;
    switch (e.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if ((Ct(t, e), Pt(e), n & 4)) {
          try {
            (ra(3, e, e.return), wi(3, e));
          } catch (k) {
            ve(e, e.return, k);
          }
          try {
            ra(5, e, e.return);
          } catch (k) {
            ve(e, e.return, k);
          }
        }
        break;
      case 1:
        (Ct(t, e), Pt(e), n & 512 && r !== null && Qn(r, r.return));
        break;
      case 5:
        if (
          (Ct(t, e),
          Pt(e),
          n & 512 && r !== null && Qn(r, r.return),
          e.flags & 32)
        ) {
          var s = e.stateNode;
          try {
            Ss(s, "");
          } catch (k) {
            ve(e, e.return, k);
          }
        }
        if (n & 4 && ((s = e.stateNode), s != null)) {
          var a = e.memoizedProps,
            o = r !== null ? r.memoizedProps : a,
            l = e.type,
            c = e.updateQueue;
          if (((e.updateQueue = null), c !== null))
            try {
              (l === "input" &&
                a.type === "radio" &&
                a.name != null &&
                Iu(s, a),
                Ao(l, o));
              var u = Ao(l, a);
              for (o = 0; o < c.length; o += 2) {
                var d = c[o],
                  h = c[o + 1];
                d === "style"
                  ? Wu(s, h)
                  : d === "dangerouslySetInnerHTML"
                    ? $u(s, h)
                    : d === "children"
                      ? Ss(s, h)
                      : po(s, d, h, u);
              }
              switch (l) {
                case "input":
                  Co(s, a);
                  break;
                case "textarea":
                  Bu(s, a);
                  break;
                case "select":
                  var m = s._wrapperState.wasMultiple;
                  s._wrapperState.wasMultiple = !!a.multiple;
                  var v = a.value;
                  v != null
                    ? Nn(s, !!a.multiple, v, !1)
                    : m !== !!a.multiple &&
                      (a.defaultValue != null
                        ? Nn(s, !!a.multiple, a.defaultValue, !0)
                        : Nn(s, !!a.multiple, a.multiple ? [] : "", !1));
              }
              s[Ws] = a;
            } catch (k) {
              ve(e, e.return, k);
            }
        }
        break;
      case 6:
        if ((Ct(t, e), Pt(e), n & 4)) {
          if (e.stateNode === null) throw Error(R(162));
          ((s = e.stateNode), (a = e.memoizedProps));
          try {
            s.nodeValue = a;
          } catch (k) {
            ve(e, e.return, k);
          }
        }
        break;
      case 3:
        if (
          (Ct(t, e), Pt(e), n & 4 && r !== null && r.memoizedState.isDehydrated)
        )
          try {
            Ls(t.containerInfo);
          } catch (k) {
            ve(e, e.return, k);
          }
        break;
      case 4:
        (Ct(t, e), Pt(e));
        break;
      case 13:
        (Ct(t, e),
          Pt(e),
          (s = e.child),
          s.flags & 8192 &&
            ((a = s.memoizedState !== null),
            (s.stateNode.isHidden = a),
            !a ||
              (s.alternate !== null && s.alternate.memoizedState !== null) ||
              (tc = ke())),
          n & 4 && lh(e));
        break;
      case 22:
        if (
          ((d = r !== null && r.memoizedState !== null),
          e.mode & 1 ? ((Ue = (u = Ue) || d), Ct(t, e), (Ue = u)) : Ct(t, e),
          Pt(e),
          n & 8192)
        ) {
          if (
            ((u = e.memoizedState !== null),
            (e.stateNode.isHidden = u) && !d && (e.mode & 1) !== 0)
          )
            for (I = e, d = e.child; d !== null; ) {
              for (h = I = d; I !== null; ) {
                switch (((m = I), (v = m.child), m.tag)) {
                  case 0:
                  case 11:
                  case 14:
                  case 15:
                    ra(4, m, m.return);
                    break;
                  case 1:
                    Qn(m, m.return);
                    var x = m.stateNode;
                    if (typeof x.componentWillUnmount == "function") {
                      ((n = m), (r = m.return));
                      try {
                        ((t = n),
                          (x.props = t.memoizedProps),
                          (x.state = t.memoizedState),
                          x.componentWillUnmount());
                      } catch (k) {
                        ve(n, r, k);
                      }
                    }
                    break;
                  case 5:
                    Qn(m, m.return);
                    break;
                  case 22:
                    if (m.memoizedState !== null) {
                      ph(h);
                      continue;
                    }
                }
                v !== null ? ((v.return = m), (I = v)) : ph(h);
              }
              d = d.sibling;
            }
          e: for (d = null, h = e; ; ) {
            if (h.tag === 5) {
              if (d === null) {
                d = h;
                try {
                  ((s = h.stateNode),
                    u
                      ? ((a = s.style),
                        typeof a.setProperty == "function"
                          ? a.setProperty("display", "none", "important")
                          : (a.display = "none"))
                      : ((l = h.stateNode),
                        (c = h.memoizedProps.style),
                        (o =
                          c != null && c.hasOwnProperty("display")
                            ? c.display
                            : null),
                        (l.style.display = Vu("display", o))));
                } catch (k) {
                  ve(e, e.return, k);
                }
              }
            } else if (h.tag === 6) {
              if (d === null)
                try {
                  h.stateNode.nodeValue = u ? "" : h.memoizedProps;
                } catch (k) {
                  ve(e, e.return, k);
                }
            } else if (
              ((h.tag !== 22 && h.tag !== 23) ||
                h.memoizedState === null ||
                h === e) &&
              h.child !== null
            ) {
              ((h.child.return = h), (h = h.child));
              continue;
            }
            if (h === e) break e;
            for (; h.sibling === null; ) {
              if (h.return === null || h.return === e) break e;
              (d === h && (d = null), (h = h.return));
            }
            (d === h && (d = null),
              (h.sibling.return = h.return),
              (h = h.sibling));
          }
        }
        break;
      case 19:
        (Ct(t, e), Pt(e), n & 4 && lh(e));
        break;
      case 21:
        break;
      default:
        (Ct(t, e), Pt(e));
    }
  }
  function Pt(e) {
    var t = e.flags;
    if (t & 2) {
      try {
        e: {
          for (var r = e.return; r !== null; ) {
            if (ah(r)) {
              var n = r;
              break e;
            }
            r = r.return;
          }
          throw Error(R(160));
        }
        switch (n.tag) {
          case 5:
            var s = n.stateNode;
            n.flags & 32 && (Ss(s, ""), (n.flags &= -33));
            var a = ih(e);
            Xl(e, a, s);
            break;
          case 3:
          case 4:
            var o = n.stateNode.containerInfo,
              l = ih(e);
            Yl(e, l, o);
            break;
          default:
            throw Error(R(161));
        }
      } catch (c) {
        ve(e, e.return, c);
      }
      e.flags &= -3;
    }
    t & 4096 && (e.flags &= -4097);
  }
  function jy(e, t, r) {
    ((I = e), uh(e));
  }
  function uh(e, t, r) {
    for (var n = (e.mode & 1) !== 0; I !== null; ) {
      var s = I,
        a = s.child;
      if (s.tag === 22 && n) {
        var o = s.memoizedState !== null || bi;
        if (!o) {
          var l = s.alternate,
            c = (l !== null && l.memoizedState !== null) || Ue;
          l = bi;
          var u = Ue;
          if (((bi = o), (Ue = c) && !u))
            for (I = s; I !== null; )
              ((o = I),
                (c = o.child),
                o.tag === 22 && o.memoizedState !== null
                  ? hh(s)
                  : c !== null
                    ? ((c.return = o), (I = c))
                    : hh(s));
          for (; a !== null; ) ((I = a), uh(a), (a = a.sibling));
          ((I = s), (bi = l), (Ue = u));
        }
        dh(e);
      } else
        (s.subtreeFlags & 8772) !== 0 && a !== null
          ? ((a.return = s), (I = a))
          : dh(e);
    }
  }
  function dh(e) {
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
                Ue || wi(5, t);
                break;
              case 1:
                var n = t.stateNode;
                if (t.flags & 4 && !Ue)
                  if (r === null) n.componentDidMount();
                  else {
                    var s =
                      t.elementType === t.type
                        ? r.memoizedProps
                        : kt(t.type, r.memoizedProps);
                    n.componentDidUpdate(
                      s,
                      r.memoizedState,
                      n.__reactInternalSnapshotBeforeUpdate
                    );
                  }
                var a = t.updateQueue;
                a !== null && pp(t, a, n);
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
                  pp(t, o, r);
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
                    var d = u.memoizedState;
                    if (d !== null) {
                      var h = d.dehydrated;
                      h !== null && Ls(h);
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
                throw Error(R(163));
            }
          Ue || (t.flags & 512 && Gl(t));
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
  function ph(e) {
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
  function hh(e) {
    for (; I !== null; ) {
      var t = I;
      try {
        switch (t.tag) {
          case 0:
          case 11:
          case 15:
            var r = t.return;
            try {
              wi(4, t);
            } catch (c) {
              ve(t, r, c);
            }
            break;
          case 1:
            var n = t.stateNode;
            if (typeof n.componentDidMount == "function") {
              var s = t.return;
              try {
                n.componentDidMount();
              } catch (c) {
                ve(t, s, c);
              }
            }
            var a = t.return;
            try {
              Gl(t);
            } catch (c) {
              ve(t, a, c);
            }
            break;
          case 5:
            var o = t.return;
            try {
              Gl(t);
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
  var Ny = Math.ceil,
    ki = Bt.ReactCurrentDispatcher,
    Jl = Bt.ReactCurrentOwner,
    mt = Bt.ReactCurrentBatchConfig,
    ee = 0,
    Te = null,
    _e = null,
    De = 0,
    lt = 0,
    Zn = fr(0),
    Re = 0,
    na = null,
    Yr = 0,
    Si = 0,
    ec = 0,
    sa = null,
    Je = null,
    tc = 0,
    Gn = 1 / 0,
    Qt = null,
    Ci = !1,
    rc = null,
    wr = null,
    _i = !1,
    kr = null,
    ji = 0,
    aa = 0,
    nc = null,
    Ni = -1,
    Ri = 0;
  function Ke() {
    return (ee & 6) !== 0 ? ke() : Ni !== -1 ? Ni : (Ni = ke());
  }
  function Sr(e) {
    return (e.mode & 1) === 0
      ? 1
      : (ee & 2) !== 0 && De !== 0
        ? De & -De
        : uy.transition !== null
          ? (Ri === 0 && (Ri = id()), Ri)
          : ((e = ae),
            e !== 0 ||
              ((e = window.event), (e = e === void 0 ? 16 : fd(e.type))),
            e);
  }
  function _t(e, t, r, n) {
    if (50 < aa) throw ((aa = 0), (nc = null), Error(R(185)));
    (As(e, r, n),
      ((ee & 2) === 0 || e !== Te) &&
        (e === Te && ((ee & 2) === 0 && (Si |= r), Re === 4 && Cr(e, De)),
        et(e, n),
        r === 1 &&
          ee === 0 &&
          (t.mode & 1) === 0 &&
          ((Gn = ke() + 500), ri && yr())));
  }
  function et(e, t) {
    var r = e.callbackNode;
    ug(e, t);
    var n = Ia(e, e === Te ? De : 0);
    if (n === 0)
      (r !== null && nd(r), (e.callbackNode = null), (e.callbackPriority = 0));
    else if (((t = n & -n), e.callbackPriority !== t)) {
      if ((r != null && nd(r), t === 1))
        (e.tag === 0 ? cy(fh.bind(null, e)) : ep(fh.bind(null, e)),
          ay(function () {
            (ee & 6) === 0 && yr();
          }),
          (r = null));
      else {
        switch (od(n)) {
          case 1:
            r = Do;
            break;
          case 4:
            r = sd;
            break;
          case 16:
            r = Oa;
            break;
          case 536870912:
            r = ad;
            break;
          default:
            r = Oa;
        }
        r = Sh(r, mh.bind(null, e));
      }
      ((e.callbackPriority = t), (e.callbackNode = r));
    }
  }
  function mh(e, t) {
    if (((Ni = -1), (Ri = 0), (ee & 6) !== 0)) throw Error(R(327));
    var r = e.callbackNode;
    if (Yn() && e.callbackNode !== r) return null;
    var n = Ia(e, e === Te ? De : 0);
    if (n === 0) return null;
    if ((n & 30) !== 0 || (n & e.expiredLanes) !== 0 || t) t = Ai(e, n);
    else {
      t = n;
      var s = ee;
      ee |= 2;
      var a = yh();
      (Te !== e || De !== t) && ((Qt = null), (Gn = ke() + 500), Jr(e, t));
      do
        try {
          Ey();
          break;
        } catch (l) {
          gh(e, l);
        }
      while (!0);
      (wl(),
        (ki.current = a),
        (ee = s),
        _e !== null ? (t = 0) : ((Te = null), (De = 0), (t = Re)));
    }
    if (t !== 0) {
      if (
        (t === 2 && ((s = Io(e)), s !== 0 && ((n = s), (t = sc(e, s)))),
        t === 1)
      )
        throw ((r = na), Jr(e, 0), Cr(e, n), et(e, ke()), r);
      if (t === 6) Cr(e, n);
      else {
        if (
          ((s = e.current.alternate),
          (n & 30) === 0 &&
            !Ry(s) &&
            ((t = Ai(e, n)),
            t === 2 && ((a = Io(e)), a !== 0 && ((n = a), (t = sc(e, a)))),
            t === 1))
        )
          throw ((r = na), Jr(e, 0), Cr(e, n), et(e, ke()), r);
        switch (((e.finishedWork = s), (e.finishedLanes = n), t)) {
          case 0:
          case 1:
            throw Error(R(345));
          case 2:
            en(e, Je, Qt);
            break;
          case 3:
            if (
              (Cr(e, n),
              (n & 130023424) === n && ((t = tc + 500 - ke()), 10 < t))
            ) {
              if (Ia(e, 0) !== 0) break;
              if (((s = e.suspendedLanes), (s & n) !== n)) {
                (Ke(), (e.pingedLanes |= e.suspendedLanes & s));
                break;
              }
              e.timeoutHandle = ul(en.bind(null, e, Je, Qt), t);
              break;
            }
            en(e, Je, Qt);
            break;
          case 4:
            if ((Cr(e, n), (n & 4194240) === n)) break;
            for (t = e.eventTimes, s = -1; 0 < n; ) {
              var o = 31 - xt(n);
              ((a = 1 << o), (o = t[o]), o > s && (s = o), (n &= ~a));
            }
            if (
              ((n = s),
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
                            : 1960 * Ny(n / 1960)) - n),
              10 < n)
            ) {
              e.timeoutHandle = ul(en.bind(null, e, Je, Qt), n);
              break;
            }
            en(e, Je, Qt);
            break;
          case 5:
            en(e, Je, Qt);
            break;
          default:
            throw Error(R(329));
        }
      }
    }
    return (et(e, ke()), e.callbackNode === r ? mh.bind(null, e) : null);
  }
  function sc(e, t) {
    var r = sa;
    return (
      e.current.memoizedState.isDehydrated && (Jr(e, t).flags |= 256),
      (e = Ai(e, t)),
      e !== 2 && ((t = Je), (Je = r), t !== null && ac(t)),
      e
    );
  }
  function ac(e) {
    Je === null ? (Je = e) : Je.push.apply(Je, e);
  }
  function Ry(e) {
    for (var t = e; ; ) {
      if (t.flags & 16384) {
        var r = t.updateQueue;
        if (r !== null && ((r = r.stores), r !== null))
          for (var n = 0; n < r.length; n++) {
            var s = r[n],
              a = s.getSnapshot;
            s = s.value;
            try {
              if (!bt(a(), s)) return !1;
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
  function Cr(e, t) {
    for (
      t &= ~ec,
        t &= ~Si,
        e.suspendedLanes |= t,
        e.pingedLanes &= ~t,
        e = e.expirationTimes;
      0 < t;
    ) {
      var r = 31 - xt(t),
        n = 1 << r;
      ((e[r] = -1), (t &= ~n));
    }
  }
  function fh(e) {
    if ((ee & 6) !== 0) throw Error(R(327));
    Yn();
    var t = Ia(e, 0);
    if ((t & 1) === 0) return (et(e, ke()), null);
    var r = Ai(e, t);
    if (e.tag !== 0 && r === 2) {
      var n = Io(e);
      n !== 0 && ((t = n), (r = sc(e, n)));
    }
    if (r === 1) throw ((r = na), Jr(e, 0), Cr(e, t), et(e, ke()), r);
    if (r === 6) throw Error(R(345));
    return (
      (e.finishedWork = e.current.alternate),
      (e.finishedLanes = t),
      en(e, Je, Qt),
      et(e, ke()),
      null
    );
  }
  function ic(e, t) {
    var r = ee;
    ee |= 1;
    try {
      return e(t);
    } finally {
      ((ee = r), ee === 0 && ((Gn = ke() + 500), ri && yr()));
    }
  }
  function Xr(e) {
    kr !== null && kr.tag === 0 && (ee & 6) === 0 && Yn();
    var t = ee;
    ee |= 1;
    var r = mt.transition,
      n = ae;
    try {
      if (((mt.transition = null), (ae = 1), e)) return e();
    } finally {
      ((ae = n), (mt.transition = r), (ee = t), (ee & 6) === 0 && yr());
    }
  }
  function oc() {
    ((lt = Zn.current), de(Zn));
  }
  function Jr(e, t) {
    ((e.finishedWork = null), (e.finishedLanes = 0));
    var r = e.timeoutHandle;
    if ((r !== -1 && ((e.timeoutHandle = -1), sy(r)), _e !== null))
      for (r = _e.return; r !== null; ) {
        var n = r;
        switch ((gl(n), n.tag)) {
          case 1:
            ((n = n.type.childContextTypes), n != null && ei());
            break;
          case 3:
            (Kn(), de(Ge), de(Fe), Al());
            break;
          case 5:
            Nl(n);
            break;
          case 4:
            Kn();
            break;
          case 13:
            de(fe);
            break;
          case 19:
            de(fe);
            break;
          case 10:
            kl(n.type._context);
            break;
          case 22:
          case 23:
            oc();
        }
        r = r.return;
      }
    if (
      ((Te = e),
      (_e = e = _r(e.current, null)),
      (De = lt = t),
      (Re = 0),
      (na = null),
      (ec = Si = Yr = 0),
      (Je = sa = null),
      Qr !== null)
    ) {
      for (t = 0; t < Qr.length; t++)
        if (((r = Qr[t]), (n = r.interleaved), n !== null)) {
          r.interleaved = null;
          var s = n.next,
            a = r.pending;
          if (a !== null) {
            var o = a.next;
            ((a.next = s), (n.next = o));
          }
          r.pending = n;
        }
      Qr = null;
    }
    return e;
  }
  function gh(e, t) {
    do {
      var r = _e;
      try {
        if ((wl(), (pi.current = gi), hi)) {
          for (var n = ge.memoizedState; n !== null; ) {
            var s = n.queue;
            (s !== null && (s.pending = null), (n = n.next));
          }
          hi = !1;
        }
        if (
          ((Gr = 0),
          (Ee = Ne = ge = null),
          (Ys = !1),
          (Xs = 0),
          (Jl.current = null),
          r === null || r.return === null)
        ) {
          ((Re = 1), (na = t), (_e = null));
          break;
        }
        e: {
          var a = e,
            o = r.return,
            l = r,
            c = t;
          if (
            ((t = De),
            (l.flags |= 32768),
            c !== null && typeof c == "object" && typeof c.then == "function")
          ) {
            var u = c,
              d = l,
              h = d.tag;
            if ((d.mode & 1) === 0 && (h === 0 || h === 11 || h === 15)) {
              var m = d.alternate;
              m
                ? ((d.updateQueue = m.updateQueue),
                  (d.memoizedState = m.memoizedState),
                  (d.lanes = m.lanes))
                : ((d.updateQueue = null), (d.memoizedState = null));
            }
            var v = Up(o);
            if (v !== null) {
              ((v.flags &= -257),
                qp(v, o, l, a, t),
                v.mode & 1 && Bp(a, u, t),
                (t = v),
                (c = u));
              var x = t.updateQueue;
              if (x === null) {
                var k = new Set();
                (k.add(c), (t.updateQueue = k));
              } else x.add(c);
              break e;
            } else {
              if ((t & 1) === 0) {
                (Bp(a, u, t), lc());
                break e;
              }
              c = Error(R(426));
            }
          } else if (pe && l.mode & 1) {
            var M = Up(o);
            if (M !== null) {
              ((M.flags & 65536) === 0 && (M.flags |= 256),
                qp(M, o, l, a, t),
                xl(Hn(c, l)));
              break e;
            }
          }
          ((a = c = Hn(c, l)),
            Re !== 4 && (Re = 2),
            sa === null ? (sa = [a]) : sa.push(a),
            (a = o));
          do {
            switch (a.tag) {
              case 3:
                ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                var y = Fp(a, c, t);
                dp(a, y);
                break e;
              case 1:
                l = c;
                var p = a.type,
                  g = a.stateNode;
                if (
                  (a.flags & 128) === 0 &&
                  (typeof p.getDerivedStateFromError == "function" ||
                    (g !== null &&
                      typeof g.componentDidCatch == "function" &&
                      (wr === null || !wr.has(g))))
                ) {
                  ((a.flags |= 65536), (t &= -t), (a.lanes |= t));
                  var b = zp(a, l, t);
                  dp(a, b);
                  break e;
                }
            }
            a = a.return;
          } while (a !== null);
        }
        xh(r);
      } catch (j) {
        ((t = j), _e === r && r !== null && (_e = r = r.return));
        continue;
      }
      break;
    } while (!0);
  }
  function yh() {
    var e = ki.current;
    return ((ki.current = gi), e === null ? gi : e);
  }
  function lc() {
    ((Re === 0 || Re === 3 || Re === 2) && (Re = 4),
      Te === null ||
        ((Yr & 268435455) === 0 && (Si & 268435455) === 0) ||
        Cr(Te, De));
  }
  function Ai(e, t) {
    var r = ee;
    ee |= 2;
    var n = yh();
    (Te !== e || De !== t) && ((Qt = null), Jr(e, t));
    do
      try {
        Ay();
        break;
      } catch (s) {
        gh(e, s);
      }
    while (!0);
    if ((wl(), (ee = r), (ki.current = n), _e !== null)) throw Error(R(261));
    return ((Te = null), (De = 0), Re);
  }
  function Ay() {
    for (; _e !== null; ) vh(_e);
  }
  function Ey() {
    for (; _e !== null && !tg(); ) vh(_e);
  }
  function vh(e) {
    var t = kh(e.alternate, e, lt);
    ((e.memoizedProps = e.pendingProps),
      t === null ? xh(e) : (_e = t),
      (Jl.current = null));
  }
  function xh(e) {
    var t = e;
    do {
      var r = t.alternate;
      if (((e = t.return), (t.flags & 32768) === 0)) {
        if (((r = ky(r, t, lt)), r !== null)) {
          _e = r;
          return;
        }
      } else {
        if (((r = Sy(r, t)), r !== null)) {
          ((r.flags &= 32767), (_e = r));
          return;
        }
        if (e !== null)
          ((e.flags |= 32768), (e.subtreeFlags = 0), (e.deletions = null));
        else {
          ((Re = 6), (_e = null));
          return;
        }
      }
      if (((t = t.sibling), t !== null)) {
        _e = t;
        return;
      }
      _e = t = e;
    } while (t !== null);
    Re === 0 && (Re = 5);
  }
  function en(e, t, r) {
    var n = ae,
      s = mt.transition;
    try {
      ((mt.transition = null), (ae = 1), Ty(e, t, r, n));
    } finally {
      ((mt.transition = s), (ae = n));
    }
    return null;
  }
  function Ty(e, t, r, n) {
    do Yn();
    while (kr !== null);
    if ((ee & 6) !== 0) throw Error(R(327));
    r = e.finishedWork;
    var s = e.finishedLanes;
    if (r === null) return null;
    if (((e.finishedWork = null), (e.finishedLanes = 0), r === e.current))
      throw Error(R(177));
    ((e.callbackNode = null), (e.callbackPriority = 0));
    var a = r.lanes | r.childLanes;
    if (
      (dg(e, a),
      e === Te && ((_e = Te = null), (De = 0)),
      ((r.subtreeFlags & 2064) === 0 && (r.flags & 2064) === 0) ||
        _i ||
        ((_i = !0),
        Sh(Oa, function () {
          return (Yn(), null);
        })),
      (a = (r.flags & 15990) !== 0),
      (r.subtreeFlags & 15990) !== 0 || a)
    ) {
      ((a = mt.transition), (mt.transition = null));
      var o = ae;
      ae = 1;
      var l = ee;
      ((ee |= 4),
        (Jl.current = null),
        _y(e, r),
        ch(r, e),
        Yg(ll),
        (Ba = !!ol),
        (ll = ol = null),
        (e.current = r),
        jy(r),
        rg(),
        (ee = l),
        (ae = o),
        (mt.transition = a));
    } else e.current = r;
    if (
      (_i && ((_i = !1), (kr = e), (ji = s)),
      (a = e.pendingLanes),
      a === 0 && (wr = null),
      ag(r.stateNode),
      et(e, ke()),
      t !== null)
    )
      for (n = e.onRecoverableError, r = 0; r < t.length; r++)
        ((s = t[r]), n(s.value, { componentStack: s.stack, digest: s.digest }));
    if (Ci) throw ((Ci = !1), (e = rc), (rc = null), e);
    return (
      (ji & 1) !== 0 && e.tag !== 0 && Yn(),
      (a = e.pendingLanes),
      (a & 1) !== 0 ? (e === nc ? aa++ : ((aa = 0), (nc = e))) : (aa = 0),
      yr(),
      null
    );
  }
  function Yn() {
    if (kr !== null) {
      var e = od(ji),
        t = mt.transition,
        r = ae;
      try {
        if (((mt.transition = null), (ae = 16 > e ? 16 : e), kr === null))
          var n = !1;
        else {
          if (((e = kr), (kr = null), (ji = 0), (ee & 6) !== 0))
            throw Error(R(331));
          var s = ee;
          for (ee |= 4, I = e.current; I !== null; ) {
            var a = I,
              o = a.child;
            if ((I.flags & 16) !== 0) {
              var l = a.deletions;
              if (l !== null) {
                for (var c = 0; c < l.length; c++) {
                  var u = l[c];
                  for (I = u; I !== null; ) {
                    var d = I;
                    switch (d.tag) {
                      case 0:
                      case 11:
                      case 15:
                        ra(8, d, a);
                    }
                    var h = d.child;
                    if (h !== null) ((h.return = d), (I = h));
                    else
                      for (; I !== null; ) {
                        d = I;
                        var m = d.sibling,
                          v = d.return;
                        if ((sh(d), d === u)) {
                          I = null;
                          break;
                        }
                        if (m !== null) {
                          ((m.return = v), (I = m));
                          break;
                        }
                        I = v;
                      }
                  }
                }
                var x = a.alternate;
                if (x !== null) {
                  var k = x.child;
                  if (k !== null) {
                    x.child = null;
                    do {
                      var M = k.sibling;
                      ((k.sibling = null), (k = M));
                    } while (k !== null);
                  }
                }
                I = a;
              }
            }
            if ((a.subtreeFlags & 2064) !== 0 && o !== null)
              ((o.return = a), (I = o));
            else
              e: for (; I !== null; ) {
                if (((a = I), (a.flags & 2048) !== 0))
                  switch (a.tag) {
                    case 0:
                    case 11:
                    case 15:
                      ra(9, a, a.return);
                  }
                var y = a.sibling;
                if (y !== null) {
                  ((y.return = a.return), (I = y));
                  break e;
                }
                I = a.return;
              }
          }
          var p = e.current;
          for (I = p; I !== null; ) {
            o = I;
            var g = o.child;
            if ((o.subtreeFlags & 2064) !== 0 && g !== null)
              ((g.return = o), (I = g));
            else
              e: for (o = p; I !== null; ) {
                if (((l = I), (l.flags & 2048) !== 0))
                  try {
                    switch (l.tag) {
                      case 0:
                      case 11:
                      case 15:
                        wi(9, l);
                    }
                  } catch (j) {
                    ve(l, l.return, j);
                  }
                if (l === o) {
                  I = null;
                  break e;
                }
                var b = l.sibling;
                if (b !== null) {
                  ((b.return = l.return), (I = b));
                  break e;
                }
                I = l.return;
              }
          }
          if (
            ((ee = s),
            yr(),
            Rt && typeof Rt.onPostCommitFiberRoot == "function")
          )
            try {
              Rt.onPostCommitFiberRoot(La, e);
            } catch {}
          n = !0;
        }
        return n;
      } finally {
        ((ae = r), (mt.transition = t));
      }
    }
    return !1;
  }
  function bh(e, t, r) {
    ((t = Hn(r, t)),
      (t = Fp(e, t, 1)),
      (e = xr(e, t, 1)),
      (t = Ke()),
      e !== null && (As(e, 1, t), et(e, t)));
  }
  function ve(e, t, r) {
    if (e.tag === 3) bh(e, e, r);
    else
      for (; t !== null; ) {
        if (t.tag === 3) {
          bh(t, e, r);
          break;
        } else if (t.tag === 1) {
          var n = t.stateNode;
          if (
            typeof t.type.getDerivedStateFromError == "function" ||
            (typeof n.componentDidCatch == "function" &&
              (wr === null || !wr.has(n)))
          ) {
            ((e = Hn(r, e)),
              (e = zp(t, e, 1)),
              (t = xr(t, e, 1)),
              (e = Ke()),
              t !== null && (As(t, 1, e), et(t, e)));
            break;
          }
        }
        t = t.return;
      }
  }
  function Py(e, t, r) {
    var n = e.pingCache;
    (n !== null && n.delete(t),
      (t = Ke()),
      (e.pingedLanes |= e.suspendedLanes & r),
      Te === e &&
        (De & r) === r &&
        (Re === 4 || (Re === 3 && (De & 130023424) === De && 500 > ke() - tc)
          ? Jr(e, 0)
          : (ec |= r)),
      et(e, t));
  }
  function wh(e, t) {
    t === 0 &&
      ((e.mode & 1) === 0
        ? (t = 1)
        : ((t = Da), (Da <<= 1), (Da & 130023424) === 0 && (Da = 4194304)));
    var r = Ke();
    ((e = Wt(e, t)), e !== null && (As(e, t, r), et(e, r)));
  }
  function Oy(e) {
    var t = e.memoizedState,
      r = 0;
    (t !== null && (r = t.retryLane), wh(e, r));
  }
  function Ly(e, t) {
    var r = 0;
    switch (e.tag) {
      case 13:
        var n = e.stateNode,
          s = e.memoizedState;
        s !== null && (r = s.retryLane);
        break;
      case 19:
        n = e.stateNode;
        break;
      default:
        throw Error(R(314));
    }
    (n !== null && n.delete(t), wh(e, r));
  }
  var kh;
  kh = function (e, t, r) {
    if (e !== null)
      if (e.memoizedProps !== t.pendingProps || Ge.current) Xe = !0;
      else {
        if ((e.lanes & r) === 0 && (t.flags & 128) === 0)
          return ((Xe = !1), wy(e, t, r));
        Xe = (e.flags & 131072) !== 0;
      }
    else ((Xe = !1), pe && (t.flags & 1048576) !== 0 && tp(t, si, t.index));
    switch (((t.lanes = 0), t.tag)) {
      case 2:
        var n = t.type;
        (xi(e, t), (e = t.pendingProps));
        var s = zn(t, Fe.current);
        (Wn(t, r), (s = Pl(null, t, n, e, s, r)));
        var a = Ol();
        return (
          (t.flags |= 1),
          typeof s == "object" &&
          s !== null &&
          typeof s.render == "function" &&
          s.$$typeof === void 0
            ? ((t.tag = 1),
              (t.memoizedState = null),
              (t.updateQueue = null),
              Ye(n) ? ((a = !0), ti(t)) : (a = !1),
              (t.memoizedState =
                s.state !== null && s.state !== void 0 ? s.state : null),
              _l(t),
              (s.updater = yi),
              (t.stateNode = s),
              (s._reactInternals = t),
              zl(t, n, e, r),
              (t = $l(null, t, n, !0, a, r)))
            : ((t.tag = 0), pe && a && fl(t), We(null, t, s, r), (t = t.child)),
          t
        );
      case 16:
        n = t.elementType;
        e: {
          switch (
            (xi(e, t),
            (e = t.pendingProps),
            (s = n._init),
            (n = s(n._payload)),
            (t.type = n),
            (s = t.tag = Dy(n)),
            (e = kt(n, e)),
            s)
          ) {
            case 0:
              t = ql(null, t, n, e, r);
              break e;
            case 1:
              t = Qp(null, t, n, e, r);
              break e;
            case 11:
              t = $p(null, t, n, e, r);
              break e;
            case 14:
              t = Vp(null, t, n, kt(n.type, e), r);
              break e;
          }
          throw Error(R(306, n, ""));
        }
        return t;
      case 0:
        return (
          (n = t.type),
          (s = t.pendingProps),
          (s = t.elementType === n ? s : kt(n, s)),
          ql(e, t, n, s, r)
        );
      case 1:
        return (
          (n = t.type),
          (s = t.pendingProps),
          (s = t.elementType === n ? s : kt(n, s)),
          Qp(e, t, n, s, r)
        );
      case 3:
        e: {
          if ((Zp(t), e === null)) throw Error(R(387));
          ((n = t.pendingProps),
            (a = t.memoizedState),
            (s = a.element),
            up(e, t),
            ui(t, n, null, r));
          var o = t.memoizedState;
          if (((n = o.element), a.isDehydrated))
            if (
              ((a = {
                element: n,
                isDehydrated: !1,
                cache: o.cache,
                pendingSuspenseBoundaries: o.pendingSuspenseBoundaries,
                transitions: o.transitions,
              }),
              (t.updateQueue.baseState = a),
              (t.memoizedState = a),
              t.flags & 256)
            ) {
              ((s = Hn(Error(R(423)), t)), (t = Gp(e, t, n, r, s)));
              break e;
            } else if (n !== s) {
              ((s = Hn(Error(R(424)), t)), (t = Gp(e, t, n, r, s)));
              break e;
            } else
              for (
                ot = mr(t.stateNode.containerInfo.firstChild),
                  it = t,
                  pe = !0,
                  wt = null,
                  r = lp(t, null, n, r),
                  t.child = r;
                r;
              )
                ((r.flags = (r.flags & -3) | 4096), (r = r.sibling));
          else {
            if ((qn(), n === s)) {
              t = Ht(e, t, r);
              break e;
            }
            We(e, t, n, r);
          }
          t = t.child;
        }
        return t;
      case 5:
        return (
          hp(t),
          e === null && vl(t),
          (n = t.type),
          (s = t.pendingProps),
          (a = e !== null ? e.memoizedProps : null),
          (o = s.children),
          cl(n, s) ? (o = null) : a !== null && cl(n, a) && (t.flags |= 32),
          Hp(e, t),
          We(e, t, o, r),
          t.child
        );
      case 6:
        return (e === null && vl(t), null);
      case 13:
        return Yp(e, t, r);
      case 4:
        return (
          jl(t, t.stateNode.containerInfo),
          (n = t.pendingProps),
          e === null ? (t.child = $n(t, null, n, r)) : We(e, t, n, r),
          t.child
        );
      case 11:
        return (
          (n = t.type),
          (s = t.pendingProps),
          (s = t.elementType === n ? s : kt(n, s)),
          $p(e, t, n, s, r)
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
            (s = t.pendingProps),
            (a = t.memoizedProps),
            (o = s.value),
            ce(oi, n._currentValue),
            (n._currentValue = o),
            a !== null)
          )
            if (bt(a.value, o)) {
              if (a.children === s.children && !Ge.current) {
                t = Ht(e, t, r);
                break e;
              }
            } else
              for (a = t.child, a !== null && (a.return = t); a !== null; ) {
                var l = a.dependencies;
                if (l !== null) {
                  o = a.child;
                  for (var c = l.firstContext; c !== null; ) {
                    if (c.context === n) {
                      if (a.tag === 1) {
                        ((c = Kt(-1, r & -r)), (c.tag = 2));
                        var u = a.updateQueue;
                        if (u !== null) {
                          u = u.shared;
                          var d = u.pending;
                          (d === null
                            ? (c.next = c)
                            : ((c.next = d.next), (d.next = c)),
                            (u.pending = c));
                        }
                      }
                      ((a.lanes |= r),
                        (c = a.alternate),
                        c !== null && (c.lanes |= r),
                        Sl(a.return, r, t),
                        (l.lanes |= r));
                      break;
                    }
                    c = c.next;
                  }
                } else if (a.tag === 10) o = a.type === t.type ? null : a.child;
                else if (a.tag === 18) {
                  if (((o = a.return), o === null)) throw Error(R(341));
                  ((o.lanes |= r),
                    (l = o.alternate),
                    l !== null && (l.lanes |= r),
                    Sl(o, r, t),
                    (o = a.sibling));
                } else o = a.child;
                if (o !== null) o.return = a;
                else
                  for (o = a; o !== null; ) {
                    if (o === t) {
                      o = null;
                      break;
                    }
                    if (((a = o.sibling), a !== null)) {
                      ((a.return = o.return), (o = a));
                      break;
                    }
                    o = o.return;
                  }
                a = o;
              }
          (We(e, t, s.children, r), (t = t.child));
        }
        return t;
      case 9:
        return (
          (s = t.type),
          (n = t.pendingProps.children),
          Wn(t, r),
          (s = pt(s)),
          (n = n(s)),
          (t.flags |= 1),
          We(e, t, n, r),
          t.child
        );
      case 14:
        return (
          (n = t.type),
          (s = kt(n, t.pendingProps)),
          (s = kt(n.type, s)),
          Vp(e, t, n, s, r)
        );
      case 15:
        return Wp(e, t, t.type, t.pendingProps, r);
      case 17:
        return (
          (n = t.type),
          (s = t.pendingProps),
          (s = t.elementType === n ? s : kt(n, s)),
          xi(e, t),
          (t.tag = 1),
          Ye(n) ? ((e = !0), ti(t)) : (e = !1),
          Wn(t, r),
          Dp(t, n, s),
          zl(t, n, s, r),
          $l(null, t, n, !0, e, r)
        );
      case 19:
        return Jp(e, t, r);
      case 22:
        return Kp(e, t, r);
    }
    throw Error(R(156, t.tag));
  };
  function Sh(e, t) {
    return rd(e, t);
  }
  function My(e, t, r, n) {
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
  function ft(e, t, r, n) {
    return new My(e, t, r, n);
  }
  function cc(e) {
    return ((e = e.prototype), !(!e || !e.isReactComponent));
  }
  function Dy(e) {
    if (typeof e == "function") return cc(e) ? 1 : 0;
    if (e != null) {
      if (((e = e.$$typeof), e === fo)) return 11;
      if (e === vo) return 14;
    }
    return 2;
  }
  function _r(e, t) {
    var r = e.alternate;
    return (
      r === null
        ? ((r = ft(e.tag, t, e.key, e.mode)),
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
  function Ei(e, t, r, n, s, a) {
    var o = 2;
    if (((n = e), typeof e == "function")) cc(e) && (o = 1);
    else if (typeof e == "string") o = 5;
    else
      e: switch (e) {
        case jn:
          return tn(r.children, s, a, t);
        case ho:
          ((o = 8), (s |= 8));
          break;
        case mo:
          return (
            (e = ft(12, r, t, s | 2)),
            (e.elementType = mo),
            (e.lanes = a),
            e
          );
        case go:
          return (
            (e = ft(13, r, t, s)),
            (e.elementType = go),
            (e.lanes = a),
            e
          );
        case yo:
          return (
            (e = ft(19, r, t, s)),
            (e.elementType = yo),
            (e.lanes = a),
            e
          );
        case Pu:
          return Ti(r, s, a, t);
        default:
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Eu:
                o = 10;
                break e;
              case Tu:
                o = 9;
                break e;
              case fo:
                o = 11;
                break e;
              case vo:
                o = 14;
                break e;
              case ir:
                ((o = 16), (n = null));
                break e;
            }
          throw Error(R(130, e == null ? e : typeof e, ""));
      }
    return (
      (t = ft(o, r, t, s)),
      (t.elementType = e),
      (t.type = n),
      (t.lanes = a),
      t
    );
  }
  function tn(e, t, r, n) {
    return ((e = ft(7, e, n, t)), (e.lanes = r), e);
  }
  function Ti(e, t, r, n) {
    return (
      (e = ft(22, e, n, t)),
      (e.elementType = Pu),
      (e.lanes = r),
      (e.stateNode = { isHidden: !1 }),
      e
    );
  }
  function uc(e, t, r) {
    return ((e = ft(6, e, null, t)), (e.lanes = r), e);
  }
  function dc(e, t, r) {
    return (
      (t = ft(4, e.children !== null ? e.children : [], e.key, t)),
      (t.lanes = r),
      (t.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        implementation: e.implementation,
      }),
      t
    );
  }
  function Iy(e, t, r, n, s) {
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
      (this.eventTimes = Fo(0)),
      (this.expirationTimes = Fo(-1)),
      (this.entangledLanes =
        this.finishedLanes =
        this.mutableReadLanes =
        this.expiredLanes =
        this.pingedLanes =
        this.suspendedLanes =
        this.pendingLanes =
          0),
      (this.entanglements = Fo(0)),
      (this.identifierPrefix = n),
      (this.onRecoverableError = s),
      (this.mutableSourceEagerHydrationData = null));
  }
  function pc(e, t, r, n, s, a, o, l, c) {
    return (
      (e = new Iy(e, t, r, l, c)),
      t === 1 ? ((t = 1), a === !0 && (t |= 8)) : (t = 0),
      (a = ft(3, null, null, t)),
      (e.current = a),
      (a.stateNode = e),
      (a.memoizedState = {
        element: n,
        isDehydrated: r,
        cache: null,
        transitions: null,
        pendingSuspenseBoundaries: null,
      }),
      _l(a),
      e
    );
  }
  function Fy(e, t, r) {
    var n =
      3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return {
      $$typeof: _n,
      key: n == null ? null : "" + n,
      children: e,
      containerInfo: t,
      implementation: r,
    };
  }
  function Ch(e) {
    if (!e) return gr;
    e = e._reactInternals;
    e: {
      if ($r(e) !== e || e.tag !== 1) throw Error(R(170));
      var t = e;
      do {
        switch (t.tag) {
          case 3:
            t = t.stateNode.context;
            break e;
          case 1:
            if (Ye(t.type)) {
              t = t.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        t = t.return;
      } while (t !== null);
      throw Error(R(171));
    }
    if (e.tag === 1) {
      var r = e.type;
      if (Ye(r)) return Xd(e, r, t);
    }
    return t;
  }
  function _h(e, t, r, n, s, a, o, l, c) {
    return (
      (e = pc(r, n, !0, e, s, a, o, l, c)),
      (e.context = Ch(null)),
      (r = e.current),
      (n = Ke()),
      (s = Sr(r)),
      (a = Kt(n, s)),
      (a.callback = t ?? null),
      xr(r, a, s),
      (e.current.lanes = s),
      As(e, s, n),
      et(e, n),
      e
    );
  }
  function Pi(e, t, r, n) {
    var s = t.current,
      a = Ke(),
      o = Sr(s);
    return (
      (r = Ch(r)),
      t.context === null ? (t.context = r) : (t.pendingContext = r),
      (t = Kt(a, o)),
      (t.payload = { element: e }),
      (n = n === void 0 ? null : n),
      n !== null && (t.callback = n),
      (e = xr(s, t, o)),
      e !== null && (_t(e, s, o, a), ci(e, s, o)),
      o
    );
  }
  function Oi(e) {
    return (
      (e = e.current),
      e.child ? (e.child.tag === 5, e.child.stateNode) : null
    );
  }
  function jh(e, t) {
    if (((e = e.memoizedState), e !== null && e.dehydrated !== null)) {
      var r = e.retryLane;
      e.retryLane = r !== 0 && r < t ? r : t;
    }
  }
  function hc(e, t) {
    (jh(e, t), (e = e.alternate) && jh(e, t));
  }
  function zy() {
    return null;
  }
  var Nh =
    typeof reportError == "function"
      ? reportError
      : function (e) {
          console.error(e);
        };
  function mc(e) {
    this._internalRoot = e;
  }
  ((Li.prototype.render = mc.prototype.render =
    function (e) {
      var t = this._internalRoot;
      if (t === null) throw Error(R(409));
      Pi(e, t, null, null);
    }),
    (Li.prototype.unmount = mc.prototype.unmount =
      function () {
        var e = this._internalRoot;
        if (e !== null) {
          this._internalRoot = null;
          var t = e.containerInfo;
          (Xr(function () {
            Pi(null, e, null, null);
          }),
            (t[Ut] = null));
        }
      }));
  function Li(e) {
    this._internalRoot = e;
  }
  Li.prototype.unstable_scheduleHydration = function (e) {
    if (e) {
      var t = ud();
      e = { blockedOn: null, target: e, priority: t };
      for (var r = 0; r < dr.length && t !== 0 && t < dr[r].priority; r++);
      (dr.splice(r, 0, e), r === 0 && hd(e));
    }
  };
  function fc(e) {
    return !(!e || (e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11));
  }
  function Mi(e) {
    return !(
      !e ||
      (e.nodeType !== 1 &&
        e.nodeType !== 9 &&
        e.nodeType !== 11 &&
        (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "))
    );
  }
  function Rh() {}
  function By(e, t, r, n, s) {
    if (s) {
      if (typeof n == "function") {
        var a = n;
        n = function () {
          var u = Oi(o);
          a.call(u);
        };
      }
      var o = _h(t, n, e, 0, null, !1, !1, "", Rh);
      return (
        (e._reactRootContainer = o),
        (e[Ut] = o.current),
        $s(e.nodeType === 8 ? e.parentNode : e),
        Xr(),
        o
      );
    }
    for (; (s = e.lastChild); ) e.removeChild(s);
    if (typeof n == "function") {
      var l = n;
      n = function () {
        var u = Oi(c);
        l.call(u);
      };
    }
    var c = pc(e, 0, !1, null, null, !1, !1, "", Rh);
    return (
      (e._reactRootContainer = c),
      (e[Ut] = c.current),
      $s(e.nodeType === 8 ? e.parentNode : e),
      Xr(function () {
        Pi(t, c, r, n);
      }),
      c
    );
  }
  function Di(e, t, r, n, s) {
    var a = r._reactRootContainer;
    if (a) {
      var o = a;
      if (typeof s == "function") {
        var l = s;
        s = function () {
          var c = Oi(o);
          l.call(c);
        };
      }
      Pi(t, o, e, s);
    } else o = By(r, t, e, s, n);
    return Oi(o);
  }
  ((ld = function (e) {
    switch (e.tag) {
      case 3:
        var t = e.stateNode;
        if (t.current.memoizedState.isDehydrated) {
          var r = Rs(t.pendingLanes);
          r !== 0 &&
            (zo(t, r | 1),
            et(t, ke()),
            (ee & 6) === 0 && ((Gn = ke() + 500), yr()));
        }
        break;
      case 13:
        (Xr(function () {
          var n = Wt(e, 1);
          if (n !== null) {
            var s = Ke();
            _t(n, e, 1, s);
          }
        }),
          hc(e, 1));
    }
  }),
    (Bo = function (e) {
      if (e.tag === 13) {
        var t = Wt(e, 134217728);
        if (t !== null) {
          var r = Ke();
          _t(t, e, 134217728, r);
        }
        hc(e, 134217728);
      }
    }),
    (cd = function (e) {
      if (e.tag === 13) {
        var t = Sr(e),
          r = Wt(e, t);
        if (r !== null) {
          var n = Ke();
          _t(r, e, t, n);
        }
        hc(e, t);
      }
    }),
    (ud = function () {
      return ae;
    }),
    (dd = function (e, t) {
      var r = ae;
      try {
        return ((ae = e), t());
      } finally {
        ae = r;
      }
    }),
    (Po = function (e, t, r) {
      switch (t) {
        case "input":
          if ((Co(e, r), (t = r.name), r.type === "radio" && t != null)) {
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
                var s = Ja(n);
                if (!s) throw Error(R(90));
                (Mu(n), Co(n, s));
              }
            }
          }
          break;
        case "textarea":
          Bu(e, r);
          break;
        case "select":
          ((t = r.value), t != null && Nn(e, !!r.multiple, t, !1));
      }
    }),
    (Zu = ic),
    (Gu = Xr));
  var Uy = { usingClientEntryPoint: !1, Events: [Ks, In, Ja, Hu, Qu, ic] },
    ia = {
      findFiberByHostInstance: Vr,
      bundleType: 0,
      version: "18.3.1",
      rendererPackageName: "react-dom",
    },
    qy = {
      bundleType: ia.bundleType,
      version: ia.version,
      rendererPackageName: ia.rendererPackageName,
      rendererConfig: ia.rendererConfig,
      overrideHookState: null,
      overrideHookStateDeletePath: null,
      overrideHookStateRenamePath: null,
      overrideProps: null,
      overridePropsDeletePath: null,
      overridePropsRenamePath: null,
      setErrorHandler: null,
      setSuspenseHandler: null,
      scheduleUpdate: null,
      currentDispatcherRef: Bt.ReactCurrentDispatcher,
      findHostInstanceByFiber: function (e) {
        return ((e = ed(e)), e === null ? null : e.stateNode);
      },
      findFiberByHostInstance: ia.findFiberByHostInstance || zy,
      findHostInstancesForRefresh: null,
      scheduleRefresh: null,
      scheduleRoot: null,
      setRefreshHandler: null,
      getCurrentFiber: null,
      reconcilerVersion: "18.3.1-next-f1338f8080-20240426",
    };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Ii = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Ii.isDisabled && Ii.supportsFiber)
      try {
        ((La = Ii.inject(qy)), (Rt = Ii));
      } catch {}
  }
  ((nt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Uy),
    (nt.createPortal = function (e, t) {
      var r =
        2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
      if (!fc(t)) throw Error(R(200));
      return Fy(e, t, null, r);
    }),
    (nt.createRoot = function (e, t) {
      if (!fc(e)) throw Error(R(299));
      var r = !1,
        n = "",
        s = Nh;
      return (
        t != null &&
          (t.unstable_strictMode === !0 && (r = !0),
          t.identifierPrefix !== void 0 && (n = t.identifierPrefix),
          t.onRecoverableError !== void 0 && (s = t.onRecoverableError)),
        (t = pc(e, 1, !1, null, null, r, !1, n, s)),
        (e[Ut] = t.current),
        $s(e.nodeType === 8 ? e.parentNode : e),
        new mc(t)
      );
    }),
    (nt.findDOMNode = function (e) {
      if (e == null) return null;
      if (e.nodeType === 1) return e;
      var t = e._reactInternals;
      if (t === void 0)
        throw typeof e.render == "function"
          ? Error(R(188))
          : ((e = Object.keys(e).join(",")), Error(R(268, e)));
      return ((e = ed(t)), (e = e === null ? null : e.stateNode), e);
    }),
    (nt.flushSync = function (e) {
      return Xr(e);
    }),
    (nt.hydrate = function (e, t, r) {
      if (!Mi(t)) throw Error(R(200));
      return Di(null, e, t, !0, r);
    }),
    (nt.hydrateRoot = function (e, t, r) {
      if (!fc(e)) throw Error(R(405));
      var n = (r != null && r.hydratedSources) || null,
        s = !1,
        a = "",
        o = Nh;
      if (
        (r != null &&
          (r.unstable_strictMode === !0 && (s = !0),
          r.identifierPrefix !== void 0 && (a = r.identifierPrefix),
          r.onRecoverableError !== void 0 && (o = r.onRecoverableError)),
        (t = _h(t, null, e, 1, r ?? null, s, !1, a, o)),
        (e[Ut] = t.current),
        $s(e),
        n)
      )
        for (e = 0; e < n.length; e++)
          ((r = n[e]),
            (s = r._getVersion),
            (s = s(r._source)),
            t.mutableSourceEagerHydrationData == null
              ? (t.mutableSourceEagerHydrationData = [r, s])
              : t.mutableSourceEagerHydrationData.push(r, s));
      return new Li(t);
    }),
    (nt.render = function (e, t, r) {
      if (!Mi(t)) throw Error(R(200));
      return Di(null, e, t, !1, r);
    }),
    (nt.unmountComponentAtNode = function (e) {
      if (!Mi(e)) throw Error(R(40));
      return e._reactRootContainer
        ? (Xr(function () {
            Di(null, null, e, !1, function () {
              ((e._reactRootContainer = null), (e[Ut] = null));
            });
          }),
          !0)
        : !1;
    }),
    (nt.unstable_batchedUpdates = ic),
    (nt.unstable_renderSubtreeIntoContainer = function (e, t, r, n) {
      if (!Mi(r)) throw Error(R(200));
      if (e == null || e._reactInternals === void 0) throw Error(R(38));
      return Di(e, t, r, !1, n);
    }),
    (nt.version = "18.3.1-next-f1338f8080-20240426"));
  function Ah() {
    if (
      !(
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" ||
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"
      )
    )
      try {
        __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Ah);
      } catch (e) {
        console.error(e);
      }
  }
  (Ah(), (Cu.exports = nt));
  var $y = Cu.exports,
    Eh,
    Th = $y;
  ((Eh = Th.createRoot), Th.hydrateRoot);
  var Xn = class {
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
    Vy =
      ((rf = class extends Xn {
        constructor() {
          super();
          U(this, un);
          U(this, Tr);
          U(this, as);
          L(this, as, (t) => {
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
          f(this, Tr) || this.setEventListener(f(this, as));
        }
        onUnsubscribe() {
          var t;
          this.hasListeners() ||
            ((t = f(this, Tr)) == null || t.call(this), L(this, Tr, void 0));
        }
        setEventListener(t) {
          var r;
          (L(this, as, t),
            (r = f(this, Tr)) == null || r.call(this),
            L(
              this,
              Tr,
              t((n) => {
                typeof n == "boolean" ? this.setFocused(n) : this.onFocus();
              })
            ));
        }
        setFocused(t) {
          f(this, un) !== t && (L(this, un, t), this.onFocus());
        }
        onFocus() {
          const t = this.isFocused();
          this.listeners.forEach((r) => {
            r(t);
          });
        }
        isFocused() {
          return typeof f(this, un) == "boolean"
            ? f(this, un)
            : globalThis.document?.visibilityState !== "hidden";
        }
      }),
      (un = new WeakMap()),
      (Tr = new WeakMap()),
      (as = new WeakMap()),
      rf),
    gc = new Vy(),
    Wy = {
      setTimeout: (e, t) => setTimeout(e, t),
      clearTimeout: (e) => clearTimeout(e),
      setInterval: (e, t) => setInterval(e, t),
      clearInterval: (e) => clearInterval(e),
    },
    Ky =
      ((nf = class {
        constructor() {
          U(this, Pr, Wy);
          U(this, Yc, !1);
        }
        setTimeoutProvider(e) {
          L(this, Pr, e);
        }
        setTimeout(e, t) {
          return f(this, Pr).setTimeout(e, t);
        }
        clearTimeout(e) {
          f(this, Pr).clearTimeout(e);
        }
        setInterval(e, t) {
          return f(this, Pr).setInterval(e, t);
        }
        clearInterval(e) {
          f(this, Pr).clearInterval(e);
        }
      }),
      (Pr = new WeakMap()),
      (Yc = new WeakMap()),
      nf),
    rn = new Ky();
  function Hy(e) {
    setTimeout(e, 0);
  }
  var Qy = typeof window > "u" || "Deno" in globalThis;
  function He() {}
  function Zy(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function yc(e) {
    return typeof e == "number" && e >= 0 && e !== 1 / 0;
  }
  function Ph(e, t) {
    return Math.max(e + (t || 0) - Date.now(), 0);
  }
  function jr(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function gt(e, t) {
    return typeof e == "function" ? e(t) : e;
  }
  function Oh(e, t) {
    const {
      type: r = "all",
      exact: n,
      fetchStatus: s,
      predicate: a,
      queryKey: o,
      stale: l,
    } = e;
    if (o) {
      if (n) {
        if (t.queryHash !== vc(o, t.options)) return !1;
      } else if (!oa(t.queryKey, o)) return !1;
    }
    if (r !== "all") {
      const c = t.isActive();
      if ((r === "active" && !c) || (r === "inactive" && c)) return !1;
    }
    return !(
      (typeof l == "boolean" && t.isStale() !== l) ||
      (s && s !== t.state.fetchStatus) ||
      (a && !a(t))
    );
  }
  function Lh(e, t) {
    const { exact: r, status: n, predicate: s, mutationKey: a } = e;
    if (a) {
      if (!t.options.mutationKey) return !1;
      if (r) {
        if (nn(t.options.mutationKey) !== nn(a)) return !1;
      } else if (!oa(t.options.mutationKey, a)) return !1;
    }
    return !((n && t.state.status !== n) || (s && !s(t)));
  }
  function vc(e, t) {
    return (t?.queryKeyHashFn || nn)(e);
  }
  function nn(e) {
    return JSON.stringify(e, (t, r) =>
      xc(r)
        ? Object.keys(r)
            .sort()
            .reduce((n, s) => ((n[s] = r[s]), n), {})
        : r
    );
  }
  function oa(e, t) {
    return e === t
      ? !0
      : typeof e != typeof t
        ? !1
        : e && t && typeof e == "object" && typeof t == "object"
          ? Object.keys(t).every((r) => oa(e[r], t[r]))
          : !1;
  }
  var Gy = Object.prototype.hasOwnProperty;
  function Mh(e, t, r = 0) {
    if (e === t) return e;
    if (r > 500) return t;
    const n = Dh(e) && Dh(t);
    if (!n && !(xc(e) && xc(t))) return t;
    const a = (n ? e : Object.keys(e)).length,
      o = n ? t : Object.keys(t),
      l = o.length,
      c = n ? new Array(l) : {};
    let u = 0;
    for (let d = 0; d < l; d++) {
      const h = n ? d : o[d],
        m = e[h],
        v = t[h];
      if (m === v) {
        ((c[h] = m), (n ? d < a : Gy.call(e, h)) && u++);
        continue;
      }
      if (
        m === null ||
        v === null ||
        typeof m != "object" ||
        typeof v != "object"
      ) {
        c[h] = v;
        continue;
      }
      const x = Mh(m, v, r + 1);
      ((c[h] = x), x === m && u++);
    }
    return a === l && u === a ? e : c;
  }
  function Fi(e, t) {
    if (!t || Object.keys(e).length !== Object.keys(t).length) return !1;
    for (const r in e) if (e[r] !== t[r]) return !1;
    return !0;
  }
  function Dh(e) {
    return Array.isArray(e) && e.length === Object.keys(e).length;
  }
  function xc(e) {
    if (!Ih(e)) return !1;
    const t = e.constructor;
    if (t === void 0) return !0;
    const r = t.prototype;
    return !(
      !Ih(r) ||
      !r.hasOwnProperty("isPrototypeOf") ||
      Object.getPrototypeOf(e) !== Object.prototype
    );
  }
  function Ih(e) {
    return Object.prototype.toString.call(e) === "[object Object]";
  }
  function Yy(e) {
    return new Promise((t) => {
      rn.setTimeout(t, e);
    });
  }
  function bc(e, t, r) {
    return typeof r.structuralSharing == "function"
      ? r.structuralSharing(e, t)
      : r.structuralSharing !== !1
        ? Mh(e, t)
        : t;
  }
  function Xy(e, t, r = 0) {
    const n = [...e, t];
    return r && n.length > r ? n.slice(1) : n;
  }
  function Jy(e, t, r = 0) {
    const n = [t, ...e];
    return r && n.length > r ? n.slice(0, -1) : n;
  }
  var wc = Symbol();
  function Fh(e, t) {
    return !e.queryFn && t?.initialPromise
      ? () => t.initialPromise
      : !e.queryFn || e.queryFn === wc
        ? () => Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`))
        : e.queryFn;
  }
  function kc(e, t) {
    return typeof e == "function" ? e(...t) : !!e;
  }
  function e0(e, t, r) {
    let n = !1,
      s;
    return (
      Object.defineProperty(e, "signal", {
        enumerable: !0,
        get: () => (
          s ?? (s = t()),
          n ||
            ((n = !0),
            s.aborted ? r() : s.addEventListener("abort", r, { once: !0 })),
          s
        ),
      }),
      e
    );
  }
  var la = (() => {
    let e = () => Qy;
    return {
      isServer() {
        return e();
      },
      setIsServer(t) {
        e = t;
      },
    };
  })();
  function Sc() {
    let e, t;
    const r = new Promise((s, a) => {
      ((e = s), (t = a));
    });
    ((r.status = "pending"), r.catch(() => {}));
    function n(s) {
      (Object.assign(r, s), delete r.resolve, delete r.reject);
    }
    return (
      (r.resolve = (s) => {
        (n({ status: "fulfilled", value: s }), e(s));
      }),
      (r.reject = (s) => {
        (n({ status: "rejected", reason: s }), t(s));
      }),
      r
    );
  }
  var t0 = Hy;
  function r0() {
    let e = [],
      t = 0,
      r = (l) => {
        l();
      },
      n = (l) => {
        l();
      },
      s = t0;
    const a = (l) => {
        t
          ? e.push(l)
          : s(() => {
              r(l);
            });
      },
      o = () => {
        const l = e;
        ((e = []),
          l.length &&
            s(() => {
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
          a(() => {
            l(...c);
          });
        },
      schedule: a,
      setNotifyFunction: (l) => {
        r = l;
      },
      setBatchNotifyFunction: (l) => {
        n = l;
      },
      setScheduler: (l) => {
        s = l;
      },
    };
  }
  var Ae = r0(),
    n0 =
      ((sf = class extends Xn {
        constructor() {
          super();
          U(this, is, !0);
          U(this, Or);
          U(this, os);
          L(this, os, (t) => {
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
          f(this, Or) || this.setEventListener(f(this, os));
        }
        onUnsubscribe() {
          var t;
          this.hasListeners() ||
            ((t = f(this, Or)) == null || t.call(this), L(this, Or, void 0));
        }
        setEventListener(t) {
          var r;
          (L(this, os, t),
            (r = f(this, Or)) == null || r.call(this),
            L(this, Or, t(this.setOnline.bind(this))));
        }
        setOnline(t) {
          f(this, is) !== t &&
            (L(this, is, t),
            this.listeners.forEach((n) => {
              n(t);
            }));
        }
        isOnline() {
          return f(this, is);
        }
      }),
      (is = new WeakMap()),
      (Or = new WeakMap()),
      (os = new WeakMap()),
      sf),
    zi = new n0();
  function s0(e) {
    return Math.min(1e3 * 2 ** e, 3e4);
  }
  function zh(e) {
    return (e ?? "online") === "online" ? zi.isOnline() : !0;
  }
  var Cc = class extends Error {
    constructor(e) {
      (super("CancelledError"),
        (this.revert = e?.revert),
        (this.silent = e?.silent));
    }
  };
  function Bh(e) {
    let t = !1,
      r = 0,
      n;
    const s = Sc(),
      a = () => s.status !== "pending",
      o = (k) => {
        if (!a()) {
          const M = new Cc(k);
          (m(M), e.onCancel?.(M));
        }
      },
      l = () => {
        t = !0;
      },
      c = () => {
        t = !1;
      },
      u = () =>
        gc.isFocused() &&
        (e.networkMode === "always" || zi.isOnline()) &&
        e.canRun(),
      d = () => zh(e.networkMode) && e.canRun(),
      h = (k) => {
        a() || (n?.(), s.resolve(k));
      },
      m = (k) => {
        a() || (n?.(), s.reject(k));
      },
      v = () =>
        new Promise((k) => {
          ((n = (M) => {
            (a() || u()) && k(M);
          }),
            e.onPause?.());
        }).then(() => {
          ((n = void 0), a() || e.onContinue?.());
        }),
      x = () => {
        if (a()) return;
        let k;
        const M = r === 0 ? e.initialPromise : void 0;
        try {
          k = M ?? e.fn();
        } catch (y) {
          k = Promise.reject(y);
        }
        Promise.resolve(k)
          .then(h)
          .catch((y) => {
            if (a()) return;
            const p = e.retry ?? (la.isServer() ? 0 : 3),
              g = e.retryDelay ?? s0,
              b = typeof g == "function" ? g(r, y) : g,
              j =
                p === !0 ||
                (typeof p == "number" && r < p) ||
                (typeof p == "function" && p(r, y));
            if (t || !j) {
              m(y);
              return;
            }
            (r++,
              e.onFail?.(r, y),
              Yy(b)
                .then(() => (u() ? void 0 : v()))
                .then(() => {
                  t ? m(y) : x();
                }));
          });
      };
    return {
      promise: s,
      status: () => s.status,
      cancel: o,
      continue: () => (n?.(), s),
      cancelRetry: l,
      continueRetry: c,
      canStart: d,
      start: () => (d() ? x() : v().then(x), s),
    };
  }
  var Uh =
      ((af = class {
        constructor() {
          U(this, dn);
        }
        destroy() {
          this.clearGcTimeout();
        }
        scheduleGc() {
          (this.clearGcTimeout(),
            yc(this.gcTime) &&
              L(
                this,
                dn,
                rn.setTimeout(() => {
                  this.optionalRemove();
                }, this.gcTime)
              ));
        }
        updateGcTime(e) {
          this.gcTime = Math.max(
            this.gcTime || 0,
            e ?? (la.isServer() ? 1 / 0 : 300 * 1e3)
          );
        }
        clearGcTimeout() {
          f(this, dn) && (rn.clearTimeout(f(this, dn)), L(this, dn, void 0));
        }
      }),
      (dn = new WeakMap()),
      af),
    a0 =
      ((of = class extends Uh {
        constructor(t) {
          super();
          U(this, ct);
          U(this, pn);
          U(this, ls);
          U(this, vt);
          U(this, hn);
          U(this, Pe);
          U(this, ma);
          U(this, mn);
          (L(this, mn, !1),
            L(this, ma, t.defaultOptions),
            this.setOptions(t.options),
            (this.observers = []),
            L(this, hn, t.client),
            L(this, vt, f(this, hn).getQueryCache()),
            (this.queryKey = t.queryKey),
            (this.queryHash = t.queryHash),
            L(this, pn, Vh(this.options)),
            (this.state = t.state ?? f(this, pn)),
            this.scheduleGc());
        }
        get meta() {
          return this.options.meta;
        }
        get promise() {
          return f(this, Pe)?.promise;
        }
        setOptions(t) {
          if (
            ((this.options = { ...f(this, ma), ...t }),
            this.updateGcTime(this.options.gcTime),
            this.state && this.state.data === void 0)
          ) {
            const r = Vh(this.options);
            r.data !== void 0 &&
              (this.setState($h(r.data, r.dataUpdatedAt)), L(this, pn, r));
          }
        }
        optionalRemove() {
          !this.observers.length &&
            this.state.fetchStatus === "idle" &&
            f(this, vt).remove(this);
        }
        setData(t, r) {
          const n = bc(this.state.data, t, this.options);
          return (
            Q(this, ct, ar).call(this, {
              data: n,
              type: "success",
              dataUpdatedAt: r?.updatedAt,
              manual: r?.manual,
            }),
            n
          );
        }
        setState(t, r) {
          Q(this, ct, ar).call(this, {
            type: "setState",
            state: t,
            setStateOptions: r,
          });
        }
        cancel(t) {
          const r = f(this, Pe)?.promise;
          return (
            f(this, Pe)?.cancel(t),
            r ? r.then(He).catch(He) : Promise.resolve()
          );
        }
        destroy() {
          (super.destroy(), this.cancel({ silent: !0 }));
        }
        get resetState() {
          return f(this, pn);
        }
        reset() {
          (this.destroy(), this.setState(this.resetState));
        }
        isActive() {
          return this.observers.some((t) => gt(t.options.enabled, this) !== !1);
        }
        isDisabled() {
          return this.getObserversCount() > 0
            ? !this.isActive()
            : this.options.queryFn === wc || !this.isFetched();
        }
        isFetched() {
          return this.state.dataUpdateCount + this.state.errorUpdateCount > 0;
        }
        isStatic() {
          return this.getObserversCount() > 0
            ? this.observers.some(
                (t) => jr(t.options.staleTime, this) === "static"
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
                : !Ph(this.state.dataUpdatedAt, t);
        }
        onFocus() {
          (this.observers
            .find((r) => r.shouldFetchOnWindowFocus())
            ?.refetch({ cancelRefetch: !1 }),
            f(this, Pe)?.continue());
        }
        onOnline() {
          (this.observers
            .find((r) => r.shouldFetchOnReconnect())
            ?.refetch({ cancelRefetch: !1 }),
            f(this, Pe)?.continue());
        }
        addObserver(t) {
          this.observers.includes(t) ||
            (this.observers.push(t),
            this.clearGcTimeout(),
            f(this, vt).notify({
              type: "observerAdded",
              query: this,
              observer: t,
            }));
        }
        removeObserver(t) {
          this.observers.includes(t) &&
            ((this.observers = this.observers.filter((r) => r !== t)),
            this.observers.length ||
              (f(this, Pe) &&
                (f(this, mn) || Q(this, ct, ff).call(this)
                  ? f(this, Pe).cancel({ revert: !0 })
                  : f(this, Pe).cancelRetry()),
              this.scheduleGc()),
            f(this, vt).notify({
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
            Q(this, ct, ar).call(this, { type: "invalidate" });
        }
        async fetch(t, r) {
          if (
            this.state.fetchStatus !== "idle" &&
            f(this, Pe)?.status() !== "rejected"
          ) {
            if (this.state.data !== void 0 && r?.cancelRefetch)
              this.cancel({ silent: !0 });
            else if (f(this, Pe))
              return (f(this, Pe).continueRetry(), f(this, Pe).promise);
          }
          if ((t && this.setOptions(t), !this.options.queryFn)) {
            const c = this.observers.find((u) => u.options.queryFn);
            c && this.setOptions(c.options);
          }
          const n = new AbortController(),
            s = (c) => {
              Object.defineProperty(c, "signal", {
                enumerable: !0,
                get: () => (L(this, mn, !0), n.signal),
              });
            },
            a = () => {
              const c = Fh(this.options, r),
                d = (() => {
                  const h = {
                    client: f(this, hn),
                    queryKey: this.queryKey,
                    meta: this.meta,
                  };
                  return (s(h), h);
                })();
              return (
                L(this, mn, !1),
                this.options.persister
                  ? this.options.persister(c, d, this)
                  : c(d)
              );
            },
            l = (() => {
              const c = {
                fetchOptions: r,
                options: this.options,
                queryKey: this.queryKey,
                client: f(this, hn),
                state: this.state,
                fetchFn: a,
              };
              return (s(c), c);
            })();
          (this.options.behavior?.onFetch(l, this),
            L(this, ls, this.state),
            (this.state.fetchStatus === "idle" ||
              this.state.fetchMeta !== l.fetchOptions?.meta) &&
              Q(this, ct, ar).call(this, {
                type: "fetch",
                meta: l.fetchOptions?.meta,
              }),
            L(
              this,
              Pe,
              Bh({
                initialPromise: r?.initialPromise,
                fn: l.fetchFn,
                onCancel: (c) => {
                  (c instanceof Cc &&
                    c.revert &&
                    this.setState({ ...f(this, ls), fetchStatus: "idle" }),
                    n.abort());
                },
                onFail: (c, u) => {
                  Q(this, ct, ar).call(this, {
                    type: "failed",
                    failureCount: c,
                    error: u,
                  });
                },
                onPause: () => {
                  Q(this, ct, ar).call(this, { type: "pause" });
                },
                onContinue: () => {
                  Q(this, ct, ar).call(this, { type: "continue" });
                },
                retry: l.options.retry,
                retryDelay: l.options.retryDelay,
                networkMode: l.options.networkMode,
                canRun: () => !0,
              })
            ));
          try {
            const c = await f(this, Pe).start();
            if (c === void 0)
              throw new Error(`${this.queryHash} data is undefined`);
            return (
              this.setData(c),
              f(this, vt).config.onSuccess?.(c, this),
              f(this, vt).config.onSettled?.(c, this.state.error, this),
              c
            );
          } catch (c) {
            if (c instanceof Cc) {
              if (c.silent) return f(this, Pe).promise;
              if (c.revert) {
                if (this.state.data === void 0) throw c;
                return this.state.data;
              }
            }
            throw (
              Q(this, ct, ar).call(this, { type: "error", error: c }),
              f(this, vt).config.onError?.(c, this),
              f(this, vt).config.onSettled?.(this.state.data, c, this),
              c
            );
          } finally {
            this.scheduleGc();
          }
        }
      }),
      (pn = new WeakMap()),
      (ls = new WeakMap()),
      (vt = new WeakMap()),
      (hn = new WeakMap()),
      (Pe = new WeakMap()),
      (ma = new WeakMap()),
      (mn = new WeakMap()),
      (ct = new WeakSet()),
      (ff = function () {
        return (
          this.state.fetchStatus === "paused" && this.state.status === "pending"
        );
      }),
      (ar = function (t) {
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
                ...qh(n.data, this.options),
                fetchMeta: t.meta ?? null,
              };
            case "success":
              const s = {
                ...n,
                ...$h(t.data, t.dataUpdatedAt),
                dataUpdateCount: n.dataUpdateCount + 1,
                ...(!t.manual && {
                  fetchStatus: "idle",
                  fetchFailureCount: 0,
                  fetchFailureReason: null,
                }),
              };
              return (L(this, ls, t.manual ? s : void 0), s);
            case "error":
              const a = t.error;
              return {
                ...n,
                error: a,
                errorUpdateCount: n.errorUpdateCount + 1,
                errorUpdatedAt: Date.now(),
                fetchFailureCount: n.fetchFailureCount + 1,
                fetchFailureReason: a,
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
          Ae.batch(() => {
            (this.observers.forEach((n) => {
              n.onQueryUpdate();
            }),
              f(this, vt).notify({ query: this, type: "updated", action: t }));
          }));
      }),
      of);
  function qh(e, t) {
    return {
      fetchFailureCount: 0,
      fetchFailureReason: null,
      fetchStatus: zh(t.networkMode) ? "fetching" : "paused",
      ...(e === void 0 && { error: null, status: "pending" }),
    };
  }
  function $h(e, t) {
    return {
      data: e,
      dataUpdatedAt: t ?? Date.now(),
      error: null,
      isInvalidated: !1,
      status: "success",
    };
  }
  function Vh(e) {
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
  var i0 =
    ((lf = class extends Xn {
      constructor(t, r) {
        super();
        U(this, ne);
        U(this, tt);
        U(this, J);
        U(this, fa);
        U(this, Ze);
        U(this, fn);
        U(this, cs);
        U(this, er);
        U(this, Lr);
        U(this, ga);
        U(this, us);
        U(this, ds);
        U(this, gn);
        U(this, yn);
        U(this, Mr);
        U(this, ps, new Set());
        ((this.options = r),
          L(this, tt, t),
          L(this, Lr, null),
          L(this, er, Sc()),
          this.bindMethods(),
          this.setOptions(r));
      }
      bindMethods() {
        this.refetch = this.refetch.bind(this);
      }
      onSubscribe() {
        this.listeners.size === 1 &&
          (f(this, J).addObserver(this),
          Wh(f(this, J), this.options)
            ? Q(this, ne, ka).call(this)
            : this.updateResult(),
          Q(this, ne, au).call(this));
      }
      onUnsubscribe() {
        this.hasListeners() || this.destroy();
      }
      shouldFetchOnReconnect() {
        return _c(f(this, J), this.options, this.options.refetchOnReconnect);
      }
      shouldFetchOnWindowFocus() {
        return _c(f(this, J), this.options, this.options.refetchOnWindowFocus);
      }
      destroy() {
        ((this.listeners = new Set()),
          Q(this, ne, iu).call(this),
          Q(this, ne, ou).call(this),
          f(this, J).removeObserver(this));
      }
      setOptions(t) {
        const r = this.options,
          n = f(this, J);
        if (
          ((this.options = f(this, tt).defaultQueryOptions(t)),
          this.options.enabled !== void 0 &&
            typeof this.options.enabled != "boolean" &&
            typeof this.options.enabled != "function" &&
            typeof gt(this.options.enabled, f(this, J)) != "boolean")
        )
          throw new Error(
            "Expected enabled to be a boolean or a callback that returns a boolean"
          );
        (Q(this, ne, lu).call(this),
          f(this, J).setOptions(this.options),
          r._defaulted &&
            !Fi(this.options, r) &&
            f(this, tt)
              .getQueryCache()
              .notify({
                type: "observerOptionsUpdated",
                query: f(this, J),
                observer: this,
              }));
        const s = this.hasListeners();
        (s && Kh(f(this, J), n, this.options, r) && Q(this, ne, ka).call(this),
          this.updateResult(),
          s &&
            (f(this, J) !== n ||
              gt(this.options.enabled, f(this, J)) !==
                gt(r.enabled, f(this, J)) ||
              jr(this.options.staleTime, f(this, J)) !==
                jr(r.staleTime, f(this, J))) &&
            Q(this, ne, ru).call(this));
        const a = Q(this, ne, nu).call(this);
        s &&
          (f(this, J) !== n ||
            gt(this.options.enabled, f(this, J)) !==
              gt(r.enabled, f(this, J)) ||
            a !== f(this, Mr)) &&
          Q(this, ne, su).call(this, a);
      }
      getOptimisticResult(t) {
        const r = f(this, tt).getQueryCache().build(f(this, tt), t),
          n = this.createResult(r, t);
        return (
          l0(this, n) &&
            (L(this, Ze, n),
            L(this, cs, this.options),
            L(this, fn, f(this, J).state)),
          n
        );
      }
      getCurrentResult() {
        return f(this, Ze);
      }
      trackResult(t, r) {
        return new Proxy(t, {
          get: (n, s) => (
            this.trackProp(s),
            r?.(s),
            s === "promise" &&
              (this.trackProp("data"),
              !this.options.experimental_prefetchInRender &&
                f(this, er).status === "pending" &&
                f(this, er).reject(
                  new Error(
                    "experimental_prefetchInRender feature flag is not enabled"
                  )
                )),
            Reflect.get(n, s)
          ),
        });
      }
      trackProp(t) {
        f(this, ps).add(t);
      }
      getCurrentQuery() {
        return f(this, J);
      }
      refetch({ ...t } = {}) {
        return this.fetch({ ...t });
      }
      fetchOptimistic(t) {
        const r = f(this, tt).defaultQueryOptions(t),
          n = f(this, tt).getQueryCache().build(f(this, tt), r);
        return n.fetch().then(() => this.createResult(n, r));
      }
      fetch(t) {
        return Q(this, ne, ka)
          .call(this, { ...t, cancelRefetch: t.cancelRefetch ?? !0 })
          .then(() => (this.updateResult(), f(this, Ze)));
      }
      createResult(t, r) {
        const n = f(this, J),
          s = this.options,
          a = f(this, Ze),
          o = f(this, fn),
          l = f(this, cs),
          u = t !== n ? t.state : f(this, fa),
          { state: d } = t;
        let h = { ...d },
          m = !1,
          v;
        if (r._optimisticResults) {
          const S = this.hasListeners(),
            A = !S && Wh(t, r),
            $ = S && Kh(t, n, r, s);
          ((A || $) && (h = { ...h, ...qh(d.data, t.options) }),
            r._optimisticResults === "isRestoring" && (h.fetchStatus = "idle"));
        }
        let { error: x, errorUpdatedAt: k, status: M } = h;
        v = h.data;
        let y = !1;
        if (r.placeholderData !== void 0 && v === void 0 && M === "pending") {
          let S;
          (a?.isPlaceholderData && r.placeholderData === l?.placeholderData
            ? ((S = a.data), (y = !0))
            : (S =
                typeof r.placeholderData == "function"
                  ? r.placeholderData(f(this, ds)?.state.data, f(this, ds))
                  : r.placeholderData),
            S !== void 0 &&
              ((M = "success"), (v = bc(a?.data, S, r)), (m = !0)));
        }
        if (r.select && v !== void 0 && !y)
          if (a && v === o?.data && r.select === f(this, ga)) v = f(this, us);
          else
            try {
              (L(this, ga, r.select),
                (v = r.select(v)),
                (v = bc(a?.data, v, r)),
                L(this, us, v),
                L(this, Lr, null));
            } catch (S) {
              L(this, Lr, S);
            }
        f(this, Lr) &&
          ((x = f(this, Lr)),
          (v = f(this, us)),
          (k = Date.now()),
          (M = "error"));
        const p = h.fetchStatus === "fetching",
          g = M === "pending",
          b = M === "error",
          j = g && p,
          _ = v !== void 0,
          P = {
            status: M,
            fetchStatus: h.fetchStatus,
            isPending: g,
            isSuccess: M === "success",
            isError: b,
            isInitialLoading: j,
            isLoading: j,
            data: v,
            dataUpdatedAt: h.dataUpdatedAt,
            error: x,
            errorUpdatedAt: k,
            failureCount: h.fetchFailureCount,
            failureReason: h.fetchFailureReason,
            errorUpdateCount: h.errorUpdateCount,
            isFetched: t.isFetched(),
            isFetchedAfterMount:
              h.dataUpdateCount > u.dataUpdateCount ||
              h.errorUpdateCount > u.errorUpdateCount,
            isFetching: p,
            isRefetching: p && !g,
            isLoadingError: b && !_,
            isPaused: h.fetchStatus === "paused",
            isPlaceholderData: m,
            isRefetchError: b && _,
            isStale: jc(t, r),
            refetch: this.refetch,
            promise: f(this, er),
            isEnabled: gt(r.enabled, t) !== !1,
          };
        if (this.options.experimental_prefetchInRender) {
          const S = P.data !== void 0,
            A = P.status === "error" && !S,
            $ = (Nt) => {
              A ? Nt.reject(P.error) : S && Nt.resolve(P.data);
            },
            O = () => {
              const Nt = L(this, er, (P.promise = Sc()));
              $(Nt);
            },
            ye = f(this, er);
          switch (ye.status) {
            case "pending":
              t.queryHash === n.queryHash && $(ye);
              break;
            case "fulfilled":
              (A || P.data !== ye.value) && O();
              break;
            case "rejected":
              (!A || P.error !== ye.reason) && O();
              break;
          }
        }
        return P;
      }
      updateResult() {
        const t = f(this, Ze),
          r = this.createResult(f(this, J), this.options);
        if (
          (L(this, fn, f(this, J).state),
          L(this, cs, this.options),
          f(this, fn).data !== void 0 && L(this, ds, f(this, J)),
          Fi(r, t))
        )
          return;
        L(this, Ze, r);
        const n = () => {
          if (!t) return !0;
          const { notifyOnChangeProps: s } = this.options,
            a = typeof s == "function" ? s() : s;
          if (a === "all" || (!a && !f(this, ps).size)) return !0;
          const o = new Set(a ?? f(this, ps));
          return (
            this.options.throwOnError && o.add("error"),
            Object.keys(f(this, Ze)).some((l) => {
              const c = l;
              return f(this, Ze)[c] !== t[c] && o.has(c);
            })
          );
        };
        Q(this, ne, gf).call(this, { listeners: n() });
      }
      onQueryUpdate() {
        (this.updateResult(),
          this.hasListeners() && Q(this, ne, au).call(this));
      }
    }),
    (tt = new WeakMap()),
    (J = new WeakMap()),
    (fa = new WeakMap()),
    (Ze = new WeakMap()),
    (fn = new WeakMap()),
    (cs = new WeakMap()),
    (er = new WeakMap()),
    (Lr = new WeakMap()),
    (ga = new WeakMap()),
    (us = new WeakMap()),
    (ds = new WeakMap()),
    (gn = new WeakMap()),
    (yn = new WeakMap()),
    (Mr = new WeakMap()),
    (ps = new WeakMap()),
    (ne = new WeakSet()),
    (ka = function (t) {
      Q(this, ne, lu).call(this);
      let r = f(this, J).fetch(this.options, t);
      return (t?.throwOnError || (r = r.catch(He)), r);
    }),
    (ru = function () {
      Q(this, ne, iu).call(this);
      const t = jr(this.options.staleTime, f(this, J));
      if (la.isServer() || f(this, Ze).isStale || !yc(t)) return;
      const n = Ph(f(this, Ze).dataUpdatedAt, t) + 1;
      L(
        this,
        gn,
        rn.setTimeout(() => {
          f(this, Ze).isStale || this.updateResult();
        }, n)
      );
    }),
    (nu = function () {
      return (
        (typeof this.options.refetchInterval == "function"
          ? this.options.refetchInterval(f(this, J))
          : this.options.refetchInterval) ?? !1
      );
    }),
    (su = function (t) {
      (Q(this, ne, ou).call(this),
        L(this, Mr, t),
        !(
          la.isServer() ||
          gt(this.options.enabled, f(this, J)) === !1 ||
          !yc(f(this, Mr)) ||
          f(this, Mr) === 0
        ) &&
          L(
            this,
            yn,
            rn.setInterval(
              () => {
                (this.options.refetchIntervalInBackground || gc.isFocused()) &&
                  Q(this, ne, ka).call(this);
              },
              f(this, Mr)
            )
          ));
    }),
    (au = function () {
      (Q(this, ne, ru).call(this),
        Q(this, ne, su).call(this, Q(this, ne, nu).call(this)));
    }),
    (iu = function () {
      f(this, gn) && (rn.clearTimeout(f(this, gn)), L(this, gn, void 0));
    }),
    (ou = function () {
      f(this, yn) && (rn.clearInterval(f(this, yn)), L(this, yn, void 0));
    }),
    (lu = function () {
      const t = f(this, tt).getQueryCache().build(f(this, tt), this.options);
      if (t === f(this, J)) return;
      const r = f(this, J);
      (L(this, J, t),
        L(this, fa, t.state),
        this.hasListeners() && (r?.removeObserver(this), t.addObserver(this)));
    }),
    (gf = function (t) {
      Ae.batch(() => {
        (t.listeners &&
          this.listeners.forEach((r) => {
            r(f(this, Ze));
          }),
          f(this, tt)
            .getQueryCache()
            .notify({ query: f(this, J), type: "observerResultsUpdated" }));
      });
    }),
    lf);
  function o0(e, t) {
    return (
      gt(t.enabled, e) !== !1 &&
      e.state.data === void 0 &&
      !(e.state.status === "error" && t.retryOnMount === !1)
    );
  }
  function Wh(e, t) {
    return o0(e, t) || (e.state.data !== void 0 && _c(e, t, t.refetchOnMount));
  }
  function _c(e, t, r) {
    if (gt(t.enabled, e) !== !1 && jr(t.staleTime, e) !== "static") {
      const n = typeof r == "function" ? r(e) : r;
      return n === "always" || (n !== !1 && jc(e, t));
    }
    return !1;
  }
  function Kh(e, t, r, n) {
    return (
      (e !== t || gt(n.enabled, e) === !1) &&
      (!r.suspense || e.state.status !== "error") &&
      jc(e, r)
    );
  }
  function jc(e, t) {
    return gt(t.enabled, e) !== !1 && e.isStaleByTime(jr(t.staleTime, e));
  }
  function l0(e, t) {
    return !Fi(e.getCurrentResult(), t);
  }
  function Hh(e) {
    return {
      onFetch: (t, r) => {
        const n = t.options,
          s = t.fetchOptions?.meta?.fetchMore?.direction,
          a = t.state.data?.pages || [],
          o = t.state.data?.pageParams || [];
        let l = { pages: [], pageParams: [] },
          c = 0;
        const u = async () => {
          let d = !1;
          const h = (x) => {
              e0(
                x,
                () => t.signal,
                () => (d = !0)
              );
            },
            m = Fh(t.options, t.fetchOptions),
            v = async (x, k, M) => {
              if (d) return Promise.reject();
              if (k == null && x.pages.length) return Promise.resolve(x);
              const p = (() => {
                  const _ = {
                    client: t.client,
                    queryKey: t.queryKey,
                    pageParam: k,
                    direction: M ? "backward" : "forward",
                    meta: t.options.meta,
                  };
                  return (h(_), _);
                })(),
                g = await m(p),
                { maxPages: b } = t.options,
                j = M ? Jy : Xy;
              return {
                pages: j(x.pages, g, b),
                pageParams: j(x.pageParams, k, b),
              };
            };
          if (s && a.length) {
            const x = s === "backward",
              k = x ? c0 : Qh,
              M = { pages: a, pageParams: o },
              y = k(n, M);
            l = await v(M, y, x);
          } else {
            const x = e ?? a.length;
            do {
              const k = c === 0 ? (o[0] ?? n.initialPageParam) : Qh(n, l);
              if (c > 0 && k == null) break;
              ((l = await v(l, k)), c++);
            } while (c < x);
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
  function Qh(e, { pages: t, pageParams: r }) {
    const n = t.length - 1;
    return t.length > 0 ? e.getNextPageParam(t[n], t, r[n], r) : void 0;
  }
  function c0(e, { pages: t, pageParams: r }) {
    return t.length > 0 ? e.getPreviousPageParam?.(t[0], t, r[0], r) : void 0;
  }
  var u0 =
    ((cf = class extends Uh {
      constructor(t) {
        super();
        U(this, It);
        U(this, ya);
        U(this, Dt);
        U(this, qe);
        U(this, vn);
        (L(this, ya, t.client),
          (this.mutationId = t.mutationId),
          L(this, qe, t.mutationCache),
          L(this, Dt, []),
          (this.state = t.state || Zh()),
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
        f(this, Dt).includes(t) ||
          (f(this, Dt).push(t),
          this.clearGcTimeout(),
          f(this, qe).notify({
            type: "observerAdded",
            mutation: this,
            observer: t,
          }));
      }
      removeObserver(t) {
        (L(
          this,
          Dt,
          f(this, Dt).filter((r) => r !== t)
        ),
          this.scheduleGc(),
          f(this, qe).notify({
            type: "observerRemoved",
            mutation: this,
            observer: t,
          }));
      }
      optionalRemove() {
        f(this, Dt).length ||
          (this.state.status === "pending"
            ? this.scheduleGc()
            : f(this, qe).remove(this));
      }
      continue() {
        return f(this, vn)?.continue() ?? this.execute(this.state.variables);
      }
      async execute(t) {
        const r = () => {
            Q(this, It, Ur).call(this, { type: "continue" });
          },
          n = {
            client: f(this, ya),
            meta: this.options.meta,
            mutationKey: this.options.mutationKey,
          };
        L(
          this,
          vn,
          Bh({
            fn: () =>
              this.options.mutationFn
                ? this.options.mutationFn(t, n)
                : Promise.reject(new Error("No mutationFn found")),
            onFail: (o, l) => {
              Q(this, It, Ur).call(this, {
                type: "failed",
                failureCount: o,
                error: l,
              });
            },
            onPause: () => {
              Q(this, It, Ur).call(this, { type: "pause" });
            },
            onContinue: r,
            retry: this.options.retry ?? 0,
            retryDelay: this.options.retryDelay,
            networkMode: this.options.networkMode,
            canRun: () => f(this, qe).canRun(this),
          })
        );
        const s = this.state.status === "pending",
          a = !f(this, vn).canStart();
        try {
          if (s) r();
          else {
            (Q(this, It, Ur).call(this, {
              type: "pending",
              variables: t,
              isPaused: a,
            }),
              f(this, qe).config.onMutate &&
                (await f(this, qe).config.onMutate(t, this, n)));
            const l = await this.options.onMutate?.(t, n);
            l !== this.state.context &&
              Q(this, It, Ur).call(this, {
                type: "pending",
                context: l,
                variables: t,
                isPaused: a,
              });
          }
          const o = await f(this, vn).start();
          return (
            await f(this, qe).config.onSuccess?.(
              o,
              t,
              this.state.context,
              this,
              n
            ),
            await this.options.onSuccess?.(o, t, this.state.context, n),
            await f(this, qe).config.onSettled?.(
              o,
              null,
              this.state.variables,
              this.state.context,
              this,
              n
            ),
            await this.options.onSettled?.(o, null, t, this.state.context, n),
            Q(this, It, Ur).call(this, { type: "success", data: o }),
            o
          );
        } catch (o) {
          try {
            await f(this, qe).config.onError?.(
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
            await f(this, qe).config.onSettled?.(
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
          throw (Q(this, It, Ur).call(this, { type: "error", error: o }), o);
        } finally {
          f(this, qe).runNext(this);
        }
      }
    }),
    (ya = new WeakMap()),
    (Dt = new WeakMap()),
    (qe = new WeakMap()),
    (vn = new WeakMap()),
    (It = new WeakSet()),
    (Ur = function (t) {
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
        Ae.batch(() => {
          (f(this, Dt).forEach((n) => {
            n.onMutationUpdate(t);
          }),
            f(this, qe).notify({ mutation: this, type: "updated", action: t }));
        }));
    }),
    cf);
  function Zh() {
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
  var d0 =
    ((uf = class extends Xn {
      constructor(t = {}) {
        super();
        U(this, tr);
        U(this, jt);
        U(this, va);
        ((this.config = t),
          L(this, tr, new Set()),
          L(this, jt, new Map()),
          L(this, va, 0));
      }
      build(t, r, n) {
        const s = new u0({
          client: t,
          mutationCache: this,
          mutationId: ++to(this, va)._,
          options: t.defaultMutationOptions(r),
          state: n,
        });
        return (this.add(s), s);
      }
      add(t) {
        f(this, tr).add(t);
        const r = Bi(t);
        if (typeof r == "string") {
          const n = f(this, jt).get(r);
          n ? n.push(t) : f(this, jt).set(r, [t]);
        }
        this.notify({ type: "added", mutation: t });
      }
      remove(t) {
        if (f(this, tr).delete(t)) {
          const r = Bi(t);
          if (typeof r == "string") {
            const n = f(this, jt).get(r);
            if (n)
              if (n.length > 1) {
                const s = n.indexOf(t);
                s !== -1 && n.splice(s, 1);
              } else n[0] === t && f(this, jt).delete(r);
          }
        }
        this.notify({ type: "removed", mutation: t });
      }
      canRun(t) {
        const r = Bi(t);
        if (typeof r == "string") {
          const s = f(this, jt)
            .get(r)
            ?.find((a) => a.state.status === "pending");
          return !s || s === t;
        } else return !0;
      }
      runNext(t) {
        const r = Bi(t);
        return typeof r == "string"
          ? (f(this, jt)
              .get(r)
              ?.find((s) => s !== t && s.state.isPaused)
              ?.continue() ?? Promise.resolve())
          : Promise.resolve();
      }
      clear() {
        Ae.batch(() => {
          (f(this, tr).forEach((t) => {
            this.notify({ type: "removed", mutation: t });
          }),
            f(this, tr).clear(),
            f(this, jt).clear());
        });
      }
      getAll() {
        return Array.from(f(this, tr));
      }
      find(t) {
        const r = { exact: !0, ...t };
        return this.getAll().find((n) => Lh(r, n));
      }
      findAll(t = {}) {
        return this.getAll().filter((r) => Lh(t, r));
      }
      notify(t) {
        Ae.batch(() => {
          this.listeners.forEach((r) => {
            r(t);
          });
        });
      }
      resumePausedMutations() {
        const t = this.getAll().filter((r) => r.state.isPaused);
        return Ae.batch(() =>
          Promise.all(t.map((r) => r.continue().catch(He)))
        );
      }
    }),
    (tr = new WeakMap()),
    (jt = new WeakMap()),
    (va = new WeakMap()),
    uf);
  function Bi(e) {
    return e.options.scope?.id;
  }
  var p0 =
      ((df = class extends Xn {
        constructor(t, r) {
          super();
          U(this, sr);
          U(this, rr);
          U(this, Dr);
          U(this, rt);
          U(this, nr);
          (L(this, rr, t),
            this.setOptions(r),
            this.bindMethods(),
            Q(this, sr, ro).call(this));
        }
        bindMethods() {
          ((this.mutate = this.mutate.bind(this)),
            (this.reset = this.reset.bind(this)));
        }
        setOptions(t) {
          const r = this.options;
          ((this.options = f(this, rr).defaultMutationOptions(t)),
            Fi(this.options, r) ||
              f(this, rr)
                .getMutationCache()
                .notify({
                  type: "observerOptionsUpdated",
                  mutation: f(this, rt),
                  observer: this,
                }),
            r?.mutationKey &&
            this.options.mutationKey &&
            nn(r.mutationKey) !== nn(this.options.mutationKey)
              ? this.reset()
              : f(this, rt)?.state.status === "pending" &&
                f(this, rt).setOptions(this.options));
        }
        onUnsubscribe() {
          this.hasListeners() || f(this, rt)?.removeObserver(this);
        }
        onMutationUpdate(t) {
          (Q(this, sr, ro).call(this), Q(this, sr, cu).call(this, t));
        }
        getCurrentResult() {
          return f(this, Dr);
        }
        reset() {
          (f(this, rt)?.removeObserver(this),
            L(this, rt, void 0),
            Q(this, sr, ro).call(this),
            Q(this, sr, cu).call(this));
        }
        mutate(t, r) {
          return (
            L(this, nr, r),
            f(this, rt)?.removeObserver(this),
            L(
              this,
              rt,
              f(this, rr).getMutationCache().build(f(this, rr), this.options)
            ),
            f(this, rt).addObserver(this),
            f(this, rt).execute(t)
          );
        }
      }),
      (rr = new WeakMap()),
      (Dr = new WeakMap()),
      (rt = new WeakMap()),
      (nr = new WeakMap()),
      (sr = new WeakSet()),
      (ro = function () {
        const t = f(this, rt)?.state ?? Zh();
        L(this, Dr, {
          ...t,
          isPending: t.status === "pending",
          isSuccess: t.status === "success",
          isError: t.status === "error",
          isIdle: t.status === "idle",
          mutate: this.mutate,
          reset: this.reset,
        });
      }),
      (cu = function (t) {
        Ae.batch(() => {
          if (f(this, nr) && this.hasListeners()) {
            const r = f(this, Dr).variables,
              n = f(this, Dr).context,
              s = {
                client: f(this, rr),
                meta: this.options.meta,
                mutationKey: this.options.mutationKey,
              };
            if (t?.type === "success") {
              try {
                f(this, nr).onSuccess?.(t.data, r, n, s);
              } catch (a) {
                Promise.reject(a);
              }
              try {
                f(this, nr).onSettled?.(t.data, null, r, n, s);
              } catch (a) {
                Promise.reject(a);
              }
            } else if (t?.type === "error") {
              try {
                f(this, nr).onError?.(t.error, r, n, s);
              } catch (a) {
                Promise.reject(a);
              }
              try {
                f(this, nr).onSettled?.(void 0, t.error, r, n, s);
              } catch (a) {
                Promise.reject(a);
              }
            }
          }
          this.listeners.forEach((r) => {
            r(f(this, Dr));
          });
        });
      }),
      df),
    h0 =
      ((pf = class extends Xn {
        constructor(t = {}) {
          super();
          U(this, Ft);
          ((this.config = t), L(this, Ft, new Map()));
        }
        build(t, r, n) {
          const s = r.queryKey,
            a = r.queryHash ?? vc(s, r);
          let o = this.get(a);
          return (
            o ||
              ((o = new a0({
                client: t,
                queryKey: s,
                queryHash: a,
                options: t.defaultQueryOptions(r),
                state: n,
                defaultOptions: t.getQueryDefaults(s),
              })),
              this.add(o)),
            o
          );
        }
        add(t) {
          f(this, Ft).has(t.queryHash) ||
            (f(this, Ft).set(t.queryHash, t),
            this.notify({ type: "added", query: t }));
        }
        remove(t) {
          const r = f(this, Ft).get(t.queryHash);
          r &&
            (t.destroy(),
            r === t && f(this, Ft).delete(t.queryHash),
            this.notify({ type: "removed", query: t }));
        }
        clear() {
          Ae.batch(() => {
            this.getAll().forEach((t) => {
              this.remove(t);
            });
          });
        }
        get(t) {
          return f(this, Ft).get(t);
        }
        getAll() {
          return [...f(this, Ft).values()];
        }
        find(t) {
          const r = { exact: !0, ...t };
          return this.getAll().find((n) => Oh(r, n));
        }
        findAll(t = {}) {
          const r = this.getAll();
          return Object.keys(t).length > 0 ? r.filter((n) => Oh(t, n)) : r;
        }
        notify(t) {
          Ae.batch(() => {
            this.listeners.forEach((r) => {
              r(t);
            });
          });
        }
        onFocus() {
          Ae.batch(() => {
            this.getAll().forEach((t) => {
              t.onFocus();
            });
          });
        }
        onOnline() {
          Ae.batch(() => {
            this.getAll().forEach((t) => {
              t.onOnline();
            });
          });
        }
      }),
      (Ft = new WeakMap()),
      pf),
    m0 =
      ((hf = class {
        constructor(e = {}) {
          U(this, be);
          U(this, Ir);
          U(this, Fr);
          U(this, hs);
          U(this, ms);
          U(this, zr);
          U(this, fs);
          U(this, gs);
          (L(this, be, e.queryCache || new h0()),
            L(this, Ir, e.mutationCache || new d0()),
            L(this, Fr, e.defaultOptions || {}),
            L(this, hs, new Map()),
            L(this, ms, new Map()),
            L(this, zr, 0));
        }
        mount() {
          (to(this, zr)._++,
            f(this, zr) === 1 &&
              (L(
                this,
                fs,
                gc.subscribe(async (e) => {
                  e &&
                    (await this.resumePausedMutations(), f(this, be).onFocus());
                })
              ),
              L(
                this,
                gs,
                zi.subscribe(async (e) => {
                  e &&
                    (await this.resumePausedMutations(),
                    f(this, be).onOnline());
                })
              )));
        }
        unmount() {
          var e, t;
          (to(this, zr)._--,
            f(this, zr) === 0 &&
              ((e = f(this, fs)) == null || e.call(this),
              L(this, fs, void 0),
              (t = f(this, gs)) == null || t.call(this),
              L(this, gs, void 0)));
        }
        isFetching(e) {
          return f(this, be).findAll({ ...e, fetchStatus: "fetching" }).length;
        }
        isMutating(e) {
          return f(this, Ir).findAll({ ...e, status: "pending" }).length;
        }
        getQueryData(e) {
          const t = this.defaultQueryOptions({ queryKey: e });
          return f(this, be).get(t.queryHash)?.state.data;
        }
        ensureQueryData(e) {
          const t = this.defaultQueryOptions(e),
            r = f(this, be).build(this, t),
            n = r.state.data;
          return n === void 0
            ? this.fetchQuery(e)
            : (e.revalidateIfStale &&
                r.isStaleByTime(jr(t.staleTime, r)) &&
                this.prefetchQuery(t),
              Promise.resolve(n));
        }
        getQueriesData(e) {
          return f(this, be)
            .findAll(e)
            .map(({ queryKey: t, state: r }) => {
              const n = r.data;
              return [t, n];
            });
        }
        setQueryData(e, t, r) {
          const n = this.defaultQueryOptions({ queryKey: e }),
            a = f(this, be).get(n.queryHash)?.state.data,
            o = Zy(t, a);
          if (o !== void 0)
            return f(this, be)
              .build(this, n)
              .setData(o, { ...r, manual: !0 });
        }
        setQueriesData(e, t, r) {
          return Ae.batch(() =>
            f(this, be)
              .findAll(e)
              .map(({ queryKey: n }) => [n, this.setQueryData(n, t, r)])
          );
        }
        getQueryState(e) {
          const t = this.defaultQueryOptions({ queryKey: e });
          return f(this, be).get(t.queryHash)?.state;
        }
        removeQueries(e) {
          const t = f(this, be);
          Ae.batch(() => {
            t.findAll(e).forEach((r) => {
              t.remove(r);
            });
          });
        }
        resetQueries(e, t) {
          const r = f(this, be);
          return Ae.batch(
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
            n = Ae.batch(() =>
              f(this, be)
                .findAll(e)
                .map((s) => s.cancel(r))
            );
          return Promise.all(n).then(He).catch(He);
        }
        invalidateQueries(e, t = {}) {
          return Ae.batch(
            () => (
              f(this, be)
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
            n = Ae.batch(() =>
              f(this, be)
                .findAll(e)
                .filter((s) => !s.isDisabled() && !s.isStatic())
                .map((s) => {
                  let a = s.fetch(void 0, r);
                  return (
                    r.throwOnError || (a = a.catch(He)),
                    s.state.fetchStatus === "paused" ? Promise.resolve() : a
                  );
                })
            );
          return Promise.all(n).then(He);
        }
        fetchQuery(e) {
          const t = this.defaultQueryOptions(e);
          t.retry === void 0 && (t.retry = !1);
          const r = f(this, be).build(this, t);
          return r.isStaleByTime(jr(t.staleTime, r))
            ? r.fetch(t)
            : Promise.resolve(r.state.data);
        }
        prefetchQuery(e) {
          return this.fetchQuery(e).then(He).catch(He);
        }
        fetchInfiniteQuery(e) {
          return ((e.behavior = Hh(e.pages)), this.fetchQuery(e));
        }
        prefetchInfiniteQuery(e) {
          return this.fetchInfiniteQuery(e).then(He).catch(He);
        }
        ensureInfiniteQueryData(e) {
          return ((e.behavior = Hh(e.pages)), this.ensureQueryData(e));
        }
        resumePausedMutations() {
          return zi.isOnline()
            ? f(this, Ir).resumePausedMutations()
            : Promise.resolve();
        }
        getQueryCache() {
          return f(this, be);
        }
        getMutationCache() {
          return f(this, Ir);
        }
        getDefaultOptions() {
          return f(this, Fr);
        }
        setDefaultOptions(e) {
          L(this, Fr, e);
        }
        setQueryDefaults(e, t) {
          f(this, hs).set(nn(e), { queryKey: e, defaultOptions: t });
        }
        getQueryDefaults(e) {
          const t = [...f(this, hs).values()],
            r = {};
          return (
            t.forEach((n) => {
              oa(e, n.queryKey) && Object.assign(r, n.defaultOptions);
            }),
            r
          );
        }
        setMutationDefaults(e, t) {
          f(this, ms).set(nn(e), { mutationKey: e, defaultOptions: t });
        }
        getMutationDefaults(e) {
          const t = [...f(this, ms).values()],
            r = {};
          return (
            t.forEach((n) => {
              oa(e, n.mutationKey) && Object.assign(r, n.defaultOptions);
            }),
            r
          );
        }
        defaultQueryOptions(e) {
          if (e._defaulted) return e;
          const t = {
            ...f(this, Fr).queries,
            ...this.getQueryDefaults(e.queryKey),
            ...e,
            _defaulted: !0,
          };
          return (
            t.queryHash || (t.queryHash = vc(t.queryKey, t)),
            t.refetchOnReconnect === void 0 &&
              (t.refetchOnReconnect = t.networkMode !== "always"),
            t.throwOnError === void 0 && (t.throwOnError = !!t.suspense),
            !t.networkMode && t.persister && (t.networkMode = "offlineFirst"),
            t.queryFn === wc && (t.enabled = !1),
            t
          );
        }
        defaultMutationOptions(e) {
          return e?._defaulted
            ? e
            : {
                ...f(this, Fr).mutations,
                ...(e?.mutationKey && this.getMutationDefaults(e.mutationKey)),
                ...e,
                _defaulted: !0,
              };
        }
        clear() {
          (f(this, be).clear(), f(this, Ir).clear());
        }
      }),
      (be = new WeakMap()),
      (Ir = new WeakMap()),
      (Fr = new WeakMap()),
      (hs = new WeakMap()),
      (ms = new WeakMap()),
      (zr = new WeakMap()),
      (fs = new WeakMap()),
      (gs = new WeakMap()),
      hf),
    Gh = N.createContext(void 0),
    Nr = (e) => {
      const t = N.useContext(Gh);
      if (!t)
        throw new Error(
          "No QueryClient set, use QueryClientProvider to set one"
        );
      return t;
    },
    f0 = ({ client: e, children: t }) => (
      N.useEffect(
        () => (
          e.mount(),
          () => {
            e.unmount();
          }
        ),
        [e]
      ),
      i.jsx(Gh.Provider, { value: e, children: t })
    ),
    Yh = N.createContext(!1),
    g0 = () => N.useContext(Yh);
  Yh.Provider;
  function y0() {
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
  var v0 = N.createContext(y0()),
    x0 = () => N.useContext(v0),
    b0 = (e, t, r) => {
      const n =
        r?.state.error && typeof e.throwOnError == "function"
          ? kc(e.throwOnError, [r.state.error, r])
          : e.throwOnError;
      (e.suspense || e.experimental_prefetchInRender || n) &&
        (t.isReset() || (e.retryOnMount = !1));
    },
    w0 = (e) => {
      N.useEffect(() => {
        e.clearReset();
      }, [e]);
    },
    k0 = ({
      result: e,
      errorResetBoundary: t,
      throwOnError: r,
      query: n,
      suspense: s,
    }) =>
      e.isError &&
      !t.isReset() &&
      !e.isFetching &&
      n &&
      ((s && e.data === void 0) || kc(r, [e.error, n])),
    S0 = (e) => {
      if (e.suspense) {
        const r = (s) => (s === "static" ? s : Math.max(s ?? 1e3, 1e3)),
          n = e.staleTime;
        ((e.staleTime = typeof n == "function" ? (...s) => r(n(...s)) : r(n)),
          typeof e.gcTime == "number" && (e.gcTime = Math.max(e.gcTime, 1e3)));
      }
    },
    C0 = (e, t) => e.isLoading && e.isFetching && !t,
    _0 = (e, t) => e?.suspense && t.isPending,
    Xh = (e, t, r) =>
      t.fetchOptimistic(e).catch(() => {
        r.clearReset();
      });
  function j0(e, t, r) {
    const n = g0(),
      s = x0(),
      a = Nr(),
      o = a.defaultQueryOptions(e);
    a.getDefaultOptions().queries?._experimental_beforeQuery?.(o);
    const l = a.getQueryCache().get(o.queryHash);
    ((o._optimisticResults = n ? "isRestoring" : "optimistic"),
      S0(o),
      b0(o, s, l),
      w0(s));
    const c = !a.getQueryCache().get(o.queryHash),
      [u] = N.useState(() => new t(a, o)),
      d = u.getOptimisticResult(o),
      h = !n && e.subscribed !== !1;
    if (
      (N.useSyncExternalStore(
        N.useCallback(
          (m) => {
            const v = h ? u.subscribe(Ae.batchCalls(m)) : He;
            return (u.updateResult(), v);
          },
          [u, h]
        ),
        () => u.getCurrentResult(),
        () => u.getCurrentResult()
      ),
      N.useEffect(() => {
        u.setOptions(o);
      }, [o, u]),
      _0(o, d))
    )
      throw Xh(o, u, s);
    if (
      k0({
        result: d,
        errorResetBoundary: s,
        throwOnError: o.throwOnError,
        query: l,
        suspense: o.suspense,
      })
    )
      throw d.error;
    return (
      a.getDefaultOptions().queries?._experimental_afterQuery?.(o, d),
      o.experimental_prefetchInRender &&
        !la.isServer() &&
        C0(d, n) &&
        (c ? Xh(o, u, s) : l?.promise)?.catch(He).finally(() => {
          u.updateResult();
        }),
      o.notifyOnChangeProps ? d : u.trackResult(d)
    );
  }
  function he(e, t) {
    return j0(e, i0);
  }
  function sn(e, t) {
    const r = Nr(),
      [n] = N.useState(() => new p0(r, e));
    N.useEffect(() => {
      n.setOptions(e);
    }, [n, e]);
    const s = N.useSyncExternalStore(
        N.useCallback((o) => n.subscribe(Ae.batchCalls(o)), [n]),
        () => n.getCurrentResult(),
        () => n.getCurrentResult()
      ),
      a = N.useCallback(
        (o, l) => {
          n.mutate(o, l).catch(He);
        },
        [n]
      );
    if (s.error && kc(n.options.throwOnError, [s.error])) throw s.error;
    return { ...s, mutate: a, mutateAsync: s.mutate };
  }
  var te;
  (function (e) {
    e.assertEqual = (s) => {};
    function t(s) {}
    e.assertIs = t;
    function r(s) {
      throw new Error();
    }
    ((e.assertNever = r),
      (e.arrayToEnum = (s) => {
        const a = {};
        for (const o of s) a[o] = o;
        return a;
      }),
      (e.getValidEnumValues = (s) => {
        const a = e.objectKeys(s).filter((l) => typeof s[s[l]] != "number"),
          o = {};
        for (const l of a) o[l] = s[l];
        return e.objectValues(o);
      }),
      (e.objectValues = (s) =>
        e.objectKeys(s).map(function (a) {
          return s[a];
        })),
      (e.objectKeys =
        typeof Object.keys == "function"
          ? (s) => Object.keys(s)
          : (s) => {
              const a = [];
              for (const o in s)
                Object.prototype.hasOwnProperty.call(s, o) && a.push(o);
              return a;
            }),
      (e.find = (s, a) => {
        for (const o of s) if (a(o)) return o;
      }),
      (e.isInteger =
        typeof Number.isInteger == "function"
          ? (s) => Number.isInteger(s)
          : (s) =>
              typeof s == "number" &&
              Number.isFinite(s) &&
              Math.floor(s) === s));
    function n(s, a = " | ") {
      return s.map((o) => (typeof o == "string" ? `'${o}'` : o)).join(a);
    }
    ((e.joinValues = n),
      (e.jsonStringifyReplacer = (s, a) =>
        typeof a == "bigint" ? a.toString() : a));
  })(te || (te = {}));
  var Jh;
  (function (e) {
    e.mergeShapes = (t, r) => ({ ...t, ...r });
  })(Jh || (Jh = {}));
  const F = te.arrayToEnum([
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
    Rr = (e) => {
      switch (typeof e) {
        case "undefined":
          return F.undefined;
        case "string":
          return F.string;
        case "number":
          return Number.isNaN(e) ? F.nan : F.number;
        case "boolean":
          return F.boolean;
        case "function":
          return F.function;
        case "bigint":
          return F.bigint;
        case "symbol":
          return F.symbol;
        case "object":
          return Array.isArray(e)
            ? F.array
            : e === null
              ? F.null
              : e.then &&
                  typeof e.then == "function" &&
                  e.catch &&
                  typeof e.catch == "function"
                ? F.promise
                : typeof Map < "u" && e instanceof Map
                  ? F.map
                  : typeof Set < "u" && e instanceof Set
                    ? F.set
                    : typeof Date < "u" && e instanceof Date
                      ? F.date
                      : F.object;
        default:
          return F.unknown;
      }
    },
    E = te.arrayToEnum([
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
  class Ot extends Error {
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
          function (a) {
            return a.message;
          },
        n = { _errors: [] },
        s = (a) => {
          for (const o of a.issues)
            if (o.code === "invalid_union") o.unionErrors.map(s);
            else if (o.code === "invalid_return_type") s(o.returnTypeError);
            else if (o.code === "invalid_arguments") s(o.argumentsError);
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
      return (s(this), n);
    }
    static assert(t) {
      if (!(t instanceof Ot)) throw new Error(`Not a ZodError: ${t}`);
    }
    toString() {
      return this.message;
    }
    get message() {
      return JSON.stringify(this.issues, te.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
      return this.issues.length === 0;
    }
    flatten(t = (r) => r.message) {
      const r = {},
        n = [];
      for (const s of this.issues)
        if (s.path.length > 0) {
          const a = s.path[0];
          ((r[a] = r[a] || []), r[a].push(t(s)));
        } else n.push(t(s));
      return { formErrors: n, fieldErrors: r };
    }
    get formErrors() {
      return this.flatten();
    }
  }
  Ot.create = (e) => new Ot(e);
  const Nc = (e, t) => {
    let r;
    switch (e.code) {
      case E.invalid_type:
        e.received === F.undefined
          ? (r = "Required")
          : (r = `Expected ${e.expected}, received ${e.received}`);
        break;
      case E.invalid_literal:
        r = `Invalid literal value, expected ${JSON.stringify(e.expected, te.jsonStringifyReplacer)}`;
        break;
      case E.unrecognized_keys:
        r = `Unrecognized key(s) in object: ${te.joinValues(e.keys, ", ")}`;
        break;
      case E.invalid_union:
        r = "Invalid input";
        break;
      case E.invalid_union_discriminator:
        r = `Invalid discriminator value. Expected ${te.joinValues(e.options)}`;
        break;
      case E.invalid_enum_value:
        r = `Invalid enum value. Expected ${te.joinValues(e.options)}, received '${e.received}'`;
        break;
      case E.invalid_arguments:
        r = "Invalid function arguments";
        break;
      case E.invalid_return_type:
        r = "Invalid function return type";
        break;
      case E.invalid_date:
        r = "Invalid date";
        break;
      case E.invalid_string:
        typeof e.validation == "object"
          ? "includes" in e.validation
            ? ((r = `Invalid input: must include "${e.validation.includes}"`),
              typeof e.validation.position == "number" &&
                (r = `${r} at one or more positions greater than or equal to ${e.validation.position}`))
            : "startsWith" in e.validation
              ? (r = `Invalid input: must start with "${e.validation.startsWith}"`)
              : "endsWith" in e.validation
                ? (r = `Invalid input: must end with "${e.validation.endsWith}"`)
                : te.assertNever(e.validation)
          : e.validation !== "regex"
            ? (r = `Invalid ${e.validation}`)
            : (r = "Invalid");
        break;
      case E.too_small:
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
      case E.too_big:
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
      case E.custom:
        r = "Invalid input";
        break;
      case E.invalid_intersection_types:
        r = "Intersection results could not be merged";
        break;
      case E.not_multiple_of:
        r = `Number must be a multiple of ${e.multipleOf}`;
        break;
      case E.not_finite:
        r = "Number must be finite";
        break;
      default:
        ((r = t.defaultError), te.assertNever(e));
    }
    return { message: r };
  };
  let N0 = Nc;
  function R0() {
    return N0;
  }
  const A0 = (e) => {
    const { data: t, path: r, errorMaps: n, issueData: s } = e,
      a = [...r, ...(s.path || [])],
      o = { ...s, path: a };
    if (s.message !== void 0) return { ...s, path: a, message: s.message };
    let l = "";
    const c = n
      .filter((u) => !!u)
      .slice()
      .reverse();
    for (const u of c) l = u(o, { data: t, defaultError: l }).message;
    return { ...s, path: a, message: l };
  };
  function D(e, t) {
    const r = R0(),
      n = A0({
        issueData: t,
        data: e.data,
        path: e.path,
        errorMaps: [
          e.common.contextualErrorMap,
          e.schemaErrorMap,
          r,
          r === Nc ? void 0 : Nc,
        ].filter((s) => !!s),
      });
    e.common.issues.push(n);
  }
  class Qe {
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
      for (const s of r) {
        if (s.status === "aborted") return V;
        (s.status === "dirty" && t.dirty(), n.push(s.value));
      }
      return { status: t.value, value: n };
    }
    static async mergeObjectAsync(t, r) {
      const n = [];
      for (const s of r) {
        const a = await s.key,
          o = await s.value;
        n.push({ key: a, value: o });
      }
      return Qe.mergeObjectSync(t, n);
    }
    static mergeObjectSync(t, r) {
      const n = {};
      for (const s of r) {
        const { key: a, value: o } = s;
        if (a.status === "aborted" || o.status === "aborted") return V;
        (a.status === "dirty" && t.dirty(),
          o.status === "dirty" && t.dirty(),
          a.value !== "__proto__" &&
            (typeof o.value < "u" || s.alwaysSet) &&
            (n[a.value] = o.value));
      }
      return { status: t.value, value: n };
    }
  }
  const V = Object.freeze({ status: "aborted" }),
    ca = (e) => ({ status: "dirty", value: e }),
    yt = (e) => ({ status: "valid", value: e }),
    em = (e) => e.status === "aborted",
    tm = (e) => e.status === "dirty",
    Jn = (e) => e.status === "valid",
    Ui = (e) => typeof Promise < "u" && e instanceof Promise;
  var B;
  (function (e) {
    ((e.errToObj = (t) => (typeof t == "string" ? { message: t } : t || {})),
      (e.toString = (t) => (typeof t == "string" ? t : t?.message)));
  })(B || (B = {}));
  class Lt {
    constructor(t, r, n, s) {
      ((this._cachedPath = []),
        (this.parent = t),
        (this.data = r),
        (this._path = n),
        (this._key = s));
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
  const rm = (e, t) => {
    if (Jn(t)) return { success: !0, data: t.value };
    if (!e.common.issues.length)
      throw new Error("Validation failed but no issues detected.");
    return {
      success: !1,
      get error() {
        if (this._error) return this._error;
        const r = new Ot(e.common.issues);
        return ((this._error = r), this._error);
      },
    };
  };
  function K(e) {
    if (!e) return {};
    const {
      errorMap: t,
      invalid_type_error: r,
      required_error: n,
      description: s,
    } = e;
    if (t && (r || n))
      throw new Error(
        `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`
      );
    return t
      ? { errorMap: t, description: s }
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
          description: s,
        };
  }
  class X {
    get description() {
      return this._def.description;
    }
    _getType(t) {
      return Rr(t.data);
    }
    _getOrReturnCtx(t, r) {
      return (
        r || {
          common: t.parent.common,
          data: t.data,
          parsedType: Rr(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent,
        }
      );
    }
    _processInputParams(t) {
      return {
        status: new Qe(),
        ctx: {
          common: t.parent.common,
          data: t.data,
          parsedType: Rr(t.data),
          schemaErrorMap: this._def.errorMap,
          path: t.path,
          parent: t.parent,
        },
      };
    }
    _parseSync(t) {
      const r = this._parse(t);
      if (Ui(r)) throw new Error("Synchronous parse encountered promise.");
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
          parsedType: Rr(t),
        },
        s = this._parseSync({ data: t, path: n.path, parent: n });
      return rm(n, s);
    }
    "~validate"(t) {
      const r = {
        common: { issues: [], async: !!this["~standard"].async },
        path: [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: t,
        parsedType: Rr(t),
      };
      if (!this["~standard"].async)
        try {
          const n = this._parseSync({ data: t, path: [], parent: r });
          return Jn(n) ? { value: n.value } : { issues: r.common.issues };
        } catch (n) {
          (n?.message?.toLowerCase()?.includes("encountered") &&
            (this["~standard"].async = !0),
            (r.common = { issues: [], async: !0 }));
        }
      return this._parseAsync({ data: t, path: [], parent: r }).then((n) =>
        Jn(n) ? { value: n.value } : { issues: r.common.issues }
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
          parsedType: Rr(t),
        },
        s = this._parse({ data: t, path: n.path, parent: n }),
        a = await (Ui(s) ? s : Promise.resolve(s));
      return rm(n, a);
    }
    refine(t, r) {
      const n = (s) =>
        typeof r == "string" || typeof r > "u"
          ? { message: r }
          : typeof r == "function"
            ? r(s)
            : r;
      return this._refinement((s, a) => {
        const o = t(s),
          l = () => a.addIssue({ code: E.custom, ...n(s) });
        return typeof Promise < "u" && o instanceof Promise
          ? o.then((c) => (c ? !0 : (l(), !1)))
          : o
            ? !0
            : (l(), !1);
      });
    }
    refinement(t, r) {
      return this._refinement((n, s) =>
        t(n) ? !0 : (s.addIssue(typeof r == "function" ? r(n, s) : r), !1)
      );
    }
    _refinement(t) {
      return new ln({
        schema: this,
        typeName: W.ZodEffects,
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
      return Yt.create(this, this._def);
    }
    nullable() {
      return cn.create(this, this._def);
    }
    nullish() {
      return this.nullable().optional();
    }
    array() {
      return Mt.create(this);
    }
    promise() {
      return Hi.create(this, this._def);
    }
    or(t) {
      return $i.create([this, t], this._def);
    }
    and(t) {
      return Vi.create(this, t, this._def);
    }
    transform(t) {
      return new ln({
        ...K(this._def),
        schema: this,
        typeName: W.ZodEffects,
        effect: { type: "transform", transform: t },
      });
    }
    default(t) {
      const r = typeof t == "function" ? t : () => t;
      return new Qi({
        ...K(this._def),
        innerType: this,
        defaultValue: r,
        typeName: W.ZodDefault,
      });
    }
    brand() {
      return new um({ typeName: W.ZodBranded, type: this, ...K(this._def) });
    }
    catch(t) {
      const r = typeof t == "function" ? t : () => t;
      return new Zi({
        ...K(this._def),
        innerType: this,
        catchValue: r,
        typeName: W.ZodCatch,
      });
    }
    describe(t) {
      const r = this.constructor;
      return new r({ ...this._def, description: t });
    }
    pipe(t) {
      return Fc.create(this, t);
    }
    readonly() {
      return Gi.create(this);
    }
    isOptional() {
      return this.safeParse(void 0).success;
    }
    isNullable() {
      return this.safeParse(null).success;
    }
  }
  const E0 = /^c[^\s-]{8,}$/i,
    T0 = /^[0-9a-z]+$/,
    P0 = /^[0-9A-HJKMNP-TV-Z]{26}$/i,
    O0 =
      /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
    L0 = /^[a-z0-9_-]{21}$/i,
    M0 = /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]*$/,
    D0 =
      /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/,
    I0 =
      /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
    F0 = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
  let Rc;
  const z0 =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/,
    B0 =
      /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\/(3[0-2]|[12]?[0-9])$/,
    U0 =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))$/,
    q0 =
      /^(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,5}(:[0-9a-fA-F]{1,4}){1,2}|([0-9a-fA-F]{1,4}:){1,4}(:[0-9a-fA-F]{1,4}){1,3}|([0-9a-fA-F]{1,4}:){1,3}(:[0-9a-fA-F]{1,4}){1,4}|([0-9a-fA-F]{1,4}:){1,2}(:[0-9a-fA-F]{1,4}){1,5}|[0-9a-fA-F]{1,4}:((:[0-9a-fA-F]{1,4}){1,6})|:((:[0-9a-fA-F]{1,4}){1,7}|:)|fe80:(:[0-9a-fA-F]{0,4}){0,4}%[0-9a-zA-Z]{1,}|::(ffff(:0{1,4}){0,1}:){0,1}((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])|([0-9a-fA-F]{1,4}:){1,4}:((25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9])\.){3,3}(25[0-5]|(2[0-4]|1{0,1}[0-9]){0,1}[0-9]))\/(12[0-8]|1[01][0-9]|[1-9]?[0-9])$/,
    $0 = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/,
    V0 =
      /^([0-9a-zA-Z-_]{4})*(([0-9a-zA-Z-_]{2}(==)?)|([0-9a-zA-Z-_]{3}(=)?))?$/,
    nm =
      "((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))",
    W0 = new RegExp(`^${nm}$`);
  function sm(e) {
    let t = "[0-5]\\d";
    e.precision
      ? (t = `${t}\\.\\d{${e.precision}}`)
      : e.precision == null && (t = `${t}(\\.\\d+)?`);
    const r = e.precision ? "+" : "?";
    return `([01]\\d|2[0-3]):[0-5]\\d(:${t})${r}`;
  }
  function K0(e) {
    return new RegExp(`^${sm(e)}$`);
  }
  function H0(e) {
    let t = `${nm}T${sm(e)}`;
    const r = [];
    return (
      r.push(e.local ? "Z?" : "Z"),
      e.offset && r.push("([+-]\\d{2}:?\\d{2})"),
      (t = `${t}(${r.join("|")})`),
      new RegExp(`^${t}$`)
    );
  }
  function Q0(e, t) {
    return !!(
      ((t === "v4" || !t) && z0.test(e)) ||
      ((t === "v6" || !t) && U0.test(e))
    );
  }
  function Z0(e, t) {
    if (!M0.test(e)) return !1;
    try {
      const [r] = e.split(".");
      if (!r) return !1;
      const n = r
          .replace(/-/g, "+")
          .replace(/_/g, "/")
          .padEnd(r.length + ((4 - (r.length % 4)) % 4), "="),
        s = JSON.parse(atob(n));
      return !(
        typeof s != "object" ||
        s === null ||
        ("typ" in s && s?.typ !== "JWT") ||
        !s.alg ||
        (t && s.alg !== t)
      );
    } catch {
      return !1;
    }
  }
  function G0(e, t) {
    return !!(
      ((t === "v4" || !t) && B0.test(e)) ||
      ((t === "v6" || !t) && q0.test(e))
    );
  }
  class Zt extends X {
    _parse(t) {
      if (
        (this._def.coerce && (t.data = String(t.data)),
        this._getType(t) !== F.string)
      ) {
        const a = this._getOrReturnCtx(t);
        return (
          D(a, {
            code: E.invalid_type,
            expected: F.string,
            received: a.parsedType,
          }),
          V
        );
      }
      const n = new Qe();
      let s;
      for (const a of this._def.checks)
        if (a.kind === "min")
          t.data.length < a.value &&
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              code: E.too_small,
              minimum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "max")
          t.data.length > a.value &&
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              code: E.too_big,
              maximum: a.value,
              type: "string",
              inclusive: !0,
              exact: !1,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "length") {
          const o = t.data.length > a.value,
            l = t.data.length < a.value;
          (o || l) &&
            ((s = this._getOrReturnCtx(t, s)),
            o
              ? D(s, {
                  code: E.too_big,
                  maximum: a.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: a.message,
                })
              : l &&
                D(s, {
                  code: E.too_small,
                  minimum: a.value,
                  type: "string",
                  inclusive: !0,
                  exact: !0,
                  message: a.message,
                }),
            n.dirty());
        } else if (a.kind === "email")
          I0.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              validation: "email",
              code: E.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "emoji")
          (Rc || (Rc = new RegExp(F0, "u")),
            Rc.test(t.data) ||
              ((s = this._getOrReturnCtx(t, s)),
              D(s, {
                validation: "emoji",
                code: E.invalid_string,
                message: a.message,
              }),
              n.dirty()));
        else if (a.kind === "uuid")
          O0.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              validation: "uuid",
              code: E.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "nanoid")
          L0.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              validation: "nanoid",
              code: E.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "cuid")
          E0.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              validation: "cuid",
              code: E.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "cuid2")
          T0.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              validation: "cuid2",
              code: E.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "ulid")
          P0.test(t.data) ||
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              validation: "ulid",
              code: E.invalid_string,
              message: a.message,
            }),
            n.dirty());
        else if (a.kind === "url")
          try {
            new URL(t.data);
          } catch {
            ((s = this._getOrReturnCtx(t, s)),
              D(s, {
                validation: "url",
                code: E.invalid_string,
                message: a.message,
              }),
              n.dirty());
          }
        else
          a.kind === "regex"
            ? ((a.regex.lastIndex = 0),
              a.regex.test(t.data) ||
                ((s = this._getOrReturnCtx(t, s)),
                D(s, {
                  validation: "regex",
                  code: E.invalid_string,
                  message: a.message,
                }),
                n.dirty()))
            : a.kind === "trim"
              ? (t.data = t.data.trim())
              : a.kind === "includes"
                ? t.data.includes(a.value, a.position) ||
                  ((s = this._getOrReturnCtx(t, s)),
                  D(s, {
                    code: E.invalid_string,
                    validation: { includes: a.value, position: a.position },
                    message: a.message,
                  }),
                  n.dirty())
                : a.kind === "toLowerCase"
                  ? (t.data = t.data.toLowerCase())
                  : a.kind === "toUpperCase"
                    ? (t.data = t.data.toUpperCase())
                    : a.kind === "startsWith"
                      ? t.data.startsWith(a.value) ||
                        ((s = this._getOrReturnCtx(t, s)),
                        D(s, {
                          code: E.invalid_string,
                          validation: { startsWith: a.value },
                          message: a.message,
                        }),
                        n.dirty())
                      : a.kind === "endsWith"
                        ? t.data.endsWith(a.value) ||
                          ((s = this._getOrReturnCtx(t, s)),
                          D(s, {
                            code: E.invalid_string,
                            validation: { endsWith: a.value },
                            message: a.message,
                          }),
                          n.dirty())
                        : a.kind === "datetime"
                          ? H0(a).test(t.data) ||
                            ((s = this._getOrReturnCtx(t, s)),
                            D(s, {
                              code: E.invalid_string,
                              validation: "datetime",
                              message: a.message,
                            }),
                            n.dirty())
                          : a.kind === "date"
                            ? W0.test(t.data) ||
                              ((s = this._getOrReturnCtx(t, s)),
                              D(s, {
                                code: E.invalid_string,
                                validation: "date",
                                message: a.message,
                              }),
                              n.dirty())
                            : a.kind === "time"
                              ? K0(a).test(t.data) ||
                                ((s = this._getOrReturnCtx(t, s)),
                                D(s, {
                                  code: E.invalid_string,
                                  validation: "time",
                                  message: a.message,
                                }),
                                n.dirty())
                              : a.kind === "duration"
                                ? D0.test(t.data) ||
                                  ((s = this._getOrReturnCtx(t, s)),
                                  D(s, {
                                    validation: "duration",
                                    code: E.invalid_string,
                                    message: a.message,
                                  }),
                                  n.dirty())
                                : a.kind === "ip"
                                  ? Q0(t.data, a.version) ||
                                    ((s = this._getOrReturnCtx(t, s)),
                                    D(s, {
                                      validation: "ip",
                                      code: E.invalid_string,
                                      message: a.message,
                                    }),
                                    n.dirty())
                                  : a.kind === "jwt"
                                    ? Z0(t.data, a.alg) ||
                                      ((s = this._getOrReturnCtx(t, s)),
                                      D(s, {
                                        validation: "jwt",
                                        code: E.invalid_string,
                                        message: a.message,
                                      }),
                                      n.dirty())
                                    : a.kind === "cidr"
                                      ? G0(t.data, a.version) ||
                                        ((s = this._getOrReturnCtx(t, s)),
                                        D(s, {
                                          validation: "cidr",
                                          code: E.invalid_string,
                                          message: a.message,
                                        }),
                                        n.dirty())
                                      : a.kind === "base64"
                                        ? $0.test(t.data) ||
                                          ((s = this._getOrReturnCtx(t, s)),
                                          D(s, {
                                            validation: "base64",
                                            code: E.invalid_string,
                                            message: a.message,
                                          }),
                                          n.dirty())
                                        : a.kind === "base64url"
                                          ? V0.test(t.data) ||
                                            ((s = this._getOrReturnCtx(t, s)),
                                            D(s, {
                                              validation: "base64url",
                                              code: E.invalid_string,
                                              message: a.message,
                                            }),
                                            n.dirty())
                                          : te.assertNever(a);
      return { status: n.value, value: t.data };
    }
    _regex(t, r, n) {
      return this.refinement((s) => t.test(s), {
        validation: r,
        code: E.invalid_string,
        ...B.errToObj(n),
      });
    }
    _addCheck(t) {
      return new Zt({ ...this._def, checks: [...this._def.checks, t] });
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
      return new Zt({
        ...this._def,
        checks: [...this._def.checks, { kind: "trim" }],
      });
    }
    toLowerCase() {
      return new Zt({
        ...this._def,
        checks: [...this._def.checks, { kind: "toLowerCase" }],
      });
    }
    toUpperCase() {
      return new Zt({
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
  Zt.create = (e) =>
    new Zt({
      checks: [],
      typeName: W.ZodString,
      coerce: e?.coerce ?? !1,
      ...K(e),
    });
  function Y0(e, t) {
    const r = (e.toString().split(".")[1] || "").length,
      n = (t.toString().split(".")[1] || "").length,
      s = r > n ? r : n,
      a = Number.parseInt(e.toFixed(s).replace(".", "")),
      o = Number.parseInt(t.toFixed(s).replace(".", ""));
    return (a % o) / 10 ** s;
  }
  class es extends X {
    constructor() {
      (super(...arguments),
        (this.min = this.gte),
        (this.max = this.lte),
        (this.step = this.multipleOf));
    }
    _parse(t) {
      if (
        (this._def.coerce && (t.data = Number(t.data)),
        this._getType(t) !== F.number)
      ) {
        const a = this._getOrReturnCtx(t);
        return (
          D(a, {
            code: E.invalid_type,
            expected: F.number,
            received: a.parsedType,
          }),
          V
        );
      }
      let n;
      const s = new Qe();
      for (const a of this._def.checks)
        a.kind === "int"
          ? te.isInteger(t.data) ||
            ((n = this._getOrReturnCtx(t, n)),
            D(n, {
              code: E.invalid_type,
              expected: "integer",
              received: "float",
              message: a.message,
            }),
            s.dirty())
          : a.kind === "min"
            ? (a.inclusive ? t.data < a.value : t.data <= a.value) &&
              ((n = this._getOrReturnCtx(t, n)),
              D(n, {
                code: E.too_small,
                minimum: a.value,
                type: "number",
                inclusive: a.inclusive,
                exact: !1,
                message: a.message,
              }),
              s.dirty())
            : a.kind === "max"
              ? (a.inclusive ? t.data > a.value : t.data >= a.value) &&
                ((n = this._getOrReturnCtx(t, n)),
                D(n, {
                  code: E.too_big,
                  maximum: a.value,
                  type: "number",
                  inclusive: a.inclusive,
                  exact: !1,
                  message: a.message,
                }),
                s.dirty())
              : a.kind === "multipleOf"
                ? Y0(t.data, a.value) !== 0 &&
                  ((n = this._getOrReturnCtx(t, n)),
                  D(n, {
                    code: E.not_multiple_of,
                    multipleOf: a.value,
                    message: a.message,
                  }),
                  s.dirty())
                : a.kind === "finite"
                  ? Number.isFinite(t.data) ||
                    ((n = this._getOrReturnCtx(t, n)),
                    D(n, { code: E.not_finite, message: a.message }),
                    s.dirty())
                  : te.assertNever(a);
      return { status: s.value, value: t.data };
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
    setLimit(t, r, n, s) {
      return new es({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: t, value: r, inclusive: n, message: B.toString(s) },
        ],
      });
    }
    _addCheck(t) {
      return new es({ ...this._def, checks: [...this._def.checks, t] });
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
          t.kind === "int" || (t.kind === "multipleOf" && te.isInteger(t.value))
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
  es.create = (e) =>
    new es({
      checks: [],
      typeName: W.ZodNumber,
      coerce: e?.coerce || !1,
      ...K(e),
    });
  class ua extends X {
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
      if (this._getType(t) !== F.bigint) return this._getInvalidInput(t);
      let n;
      const s = new Qe();
      for (const a of this._def.checks)
        a.kind === "min"
          ? (a.inclusive ? t.data < a.value : t.data <= a.value) &&
            ((n = this._getOrReturnCtx(t, n)),
            D(n, {
              code: E.too_small,
              type: "bigint",
              minimum: a.value,
              inclusive: a.inclusive,
              message: a.message,
            }),
            s.dirty())
          : a.kind === "max"
            ? (a.inclusive ? t.data > a.value : t.data >= a.value) &&
              ((n = this._getOrReturnCtx(t, n)),
              D(n, {
                code: E.too_big,
                type: "bigint",
                maximum: a.value,
                inclusive: a.inclusive,
                message: a.message,
              }),
              s.dirty())
            : a.kind === "multipleOf"
              ? t.data % a.value !== BigInt(0) &&
                ((n = this._getOrReturnCtx(t, n)),
                D(n, {
                  code: E.not_multiple_of,
                  multipleOf: a.value,
                  message: a.message,
                }),
                s.dirty())
              : te.assertNever(a);
      return { status: s.value, value: t.data };
    }
    _getInvalidInput(t) {
      const r = this._getOrReturnCtx(t);
      return (
        D(r, {
          code: E.invalid_type,
          expected: F.bigint,
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
    setLimit(t, r, n, s) {
      return new ua({
        ...this._def,
        checks: [
          ...this._def.checks,
          { kind: t, value: r, inclusive: n, message: B.toString(s) },
        ],
      });
    }
    _addCheck(t) {
      return new ua({ ...this._def, checks: [...this._def.checks, t] });
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
  ua.create = (e) =>
    new ua({
      checks: [],
      typeName: W.ZodBigInt,
      coerce: e?.coerce ?? !1,
      ...K(e),
    });
  class Ac extends X {
    _parse(t) {
      if (
        (this._def.coerce && (t.data = !!t.data),
        this._getType(t) !== F.boolean)
      ) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.boolean,
            received: n.parsedType,
          }),
          V
        );
      }
      return yt(t.data);
    }
  }
  Ac.create = (e) =>
    new Ac({ typeName: W.ZodBoolean, coerce: e?.coerce || !1, ...K(e) });
  class qi extends X {
    _parse(t) {
      if (
        (this._def.coerce && (t.data = new Date(t.data)),
        this._getType(t) !== F.date)
      ) {
        const a = this._getOrReturnCtx(t);
        return (
          D(a, {
            code: E.invalid_type,
            expected: F.date,
            received: a.parsedType,
          }),
          V
        );
      }
      if (Number.isNaN(t.data.getTime())) {
        const a = this._getOrReturnCtx(t);
        return (D(a, { code: E.invalid_date }), V);
      }
      const n = new Qe();
      let s;
      for (const a of this._def.checks)
        a.kind === "min"
          ? t.data.getTime() < a.value &&
            ((s = this._getOrReturnCtx(t, s)),
            D(s, {
              code: E.too_small,
              message: a.message,
              inclusive: !0,
              exact: !1,
              minimum: a.value,
              type: "date",
            }),
            n.dirty())
          : a.kind === "max"
            ? t.data.getTime() > a.value &&
              ((s = this._getOrReturnCtx(t, s)),
              D(s, {
                code: E.too_big,
                message: a.message,
                inclusive: !0,
                exact: !1,
                maximum: a.value,
                type: "date",
              }),
              n.dirty())
            : te.assertNever(a);
      return { status: n.value, value: new Date(t.data.getTime()) };
    }
    _addCheck(t) {
      return new qi({ ...this._def, checks: [...this._def.checks, t] });
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
  qi.create = (e) =>
    new qi({
      checks: [],
      coerce: e?.coerce || !1,
      typeName: W.ZodDate,
      ...K(e),
    });
  class am extends X {
    _parse(t) {
      if (this._getType(t) !== F.symbol) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.symbol,
            received: n.parsedType,
          }),
          V
        );
      }
      return yt(t.data);
    }
  }
  am.create = (e) => new am({ typeName: W.ZodSymbol, ...K(e) });
  class Ec extends X {
    _parse(t) {
      if (this._getType(t) !== F.undefined) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.undefined,
            received: n.parsedType,
          }),
          V
        );
      }
      return yt(t.data);
    }
  }
  Ec.create = (e) => new Ec({ typeName: W.ZodUndefined, ...K(e) });
  class Tc extends X {
    _parse(t) {
      if (this._getType(t) !== F.null) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.null,
            received: n.parsedType,
          }),
          V
        );
      }
      return yt(t.data);
    }
  }
  Tc.create = (e) => new Tc({ typeName: W.ZodNull, ...K(e) });
  class Pc extends X {
    constructor() {
      (super(...arguments), (this._any = !0));
    }
    _parse(t) {
      return yt(t.data);
    }
  }
  Pc.create = (e) => new Pc({ typeName: W.ZodAny, ...K(e) });
  class Oc extends X {
    constructor() {
      (super(...arguments), (this._unknown = !0));
    }
    _parse(t) {
      return yt(t.data);
    }
  }
  Oc.create = (e) => new Oc({ typeName: W.ZodUnknown, ...K(e) });
  class Ar extends X {
    _parse(t) {
      const r = this._getOrReturnCtx(t);
      return (
        D(r, {
          code: E.invalid_type,
          expected: F.never,
          received: r.parsedType,
        }),
        V
      );
    }
  }
  Ar.create = (e) => new Ar({ typeName: W.ZodNever, ...K(e) });
  class im extends X {
    _parse(t) {
      if (this._getType(t) !== F.undefined) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.void,
            received: n.parsedType,
          }),
          V
        );
      }
      return yt(t.data);
    }
  }
  im.create = (e) => new im({ typeName: W.ZodVoid, ...K(e) });
  class Mt extends X {
    _parse(t) {
      const { ctx: r, status: n } = this._processInputParams(t),
        s = this._def;
      if (r.parsedType !== F.array)
        return (
          D(r, {
            code: E.invalid_type,
            expected: F.array,
            received: r.parsedType,
          }),
          V
        );
      if (s.exactLength !== null) {
        const o = r.data.length > s.exactLength.value,
          l = r.data.length < s.exactLength.value;
        (o || l) &&
          (D(r, {
            code: o ? E.too_big : E.too_small,
            minimum: l ? s.exactLength.value : void 0,
            maximum: o ? s.exactLength.value : void 0,
            type: "array",
            inclusive: !0,
            exact: !0,
            message: s.exactLength.message,
          }),
          n.dirty());
      }
      if (
        (s.minLength !== null &&
          r.data.length < s.minLength.value &&
          (D(r, {
            code: E.too_small,
            minimum: s.minLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.minLength.message,
          }),
          n.dirty()),
        s.maxLength !== null &&
          r.data.length > s.maxLength.value &&
          (D(r, {
            code: E.too_big,
            maximum: s.maxLength.value,
            type: "array",
            inclusive: !0,
            exact: !1,
            message: s.maxLength.message,
          }),
          n.dirty()),
        r.common.async)
      )
        return Promise.all(
          [...r.data].map((o, l) => s.type._parseAsync(new Lt(r, o, r.path, l)))
        ).then((o) => Qe.mergeArray(n, o));
      const a = [...r.data].map((o, l) =>
        s.type._parseSync(new Lt(r, o, r.path, l))
      );
      return Qe.mergeArray(n, a);
    }
    get element() {
      return this._def.type;
    }
    min(t, r) {
      return new Mt({
        ...this._def,
        minLength: { value: t, message: B.toString(r) },
      });
    }
    max(t, r) {
      return new Mt({
        ...this._def,
        maxLength: { value: t, message: B.toString(r) },
      });
    }
    length(t, r) {
      return new Mt({
        ...this._def,
        exactLength: { value: t, message: B.toString(r) },
      });
    }
    nonempty(t) {
      return this.min(1, t);
    }
  }
  Mt.create = (e, t) =>
    new Mt({
      type: e,
      minLength: null,
      maxLength: null,
      exactLength: null,
      typeName: W.ZodArray,
      ...K(t),
    });
  function ts(e) {
    if (e instanceof je) {
      const t = {};
      for (const r in e.shape) {
        const n = e.shape[r];
        t[r] = Yt.create(ts(n));
      }
      return new je({ ...e._def, shape: () => t });
    } else
      return e instanceof Mt
        ? new Mt({ ...e._def, type: ts(e.element) })
        : e instanceof Yt
          ? Yt.create(ts(e.unwrap()))
          : e instanceof cn
            ? cn.create(ts(e.unwrap()))
            : e instanceof an
              ? an.create(e.items.map((t) => ts(t)))
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
        r = te.objectKeys(t);
      return ((this._cached = { shape: t, keys: r }), this._cached);
    }
    _parse(t) {
      if (this._getType(t) !== F.object) {
        const u = this._getOrReturnCtx(t);
        return (
          D(u, {
            code: E.invalid_type,
            expected: F.object,
            received: u.parsedType,
          }),
          V
        );
      }
      const { status: n, ctx: s } = this._processInputParams(t),
        { shape: a, keys: o } = this._getCached(),
        l = [];
      if (
        !(this._def.catchall instanceof Ar && this._def.unknownKeys === "strip")
      )
        for (const u in s.data) o.includes(u) || l.push(u);
      const c = [];
      for (const u of o) {
        const d = a[u],
          h = s.data[u];
        c.push({
          key: { status: "valid", value: u },
          value: d._parse(new Lt(s, h, s.path, u)),
          alwaysSet: u in s.data,
        });
      }
      if (this._def.catchall instanceof Ar) {
        const u = this._def.unknownKeys;
        if (u === "passthrough")
          for (const d of l)
            c.push({
              key: { status: "valid", value: d },
              value: { status: "valid", value: s.data[d] },
            });
        else if (u === "strict")
          l.length > 0 &&
            (D(s, { code: E.unrecognized_keys, keys: l }), n.dirty());
        else if (u !== "strip")
          throw new Error(
            "Internal ZodObject error: invalid unknownKeys value."
          );
      } else {
        const u = this._def.catchall;
        for (const d of l) {
          const h = s.data[d];
          c.push({
            key: { status: "valid", value: d },
            value: u._parse(new Lt(s, h, s.path, d)),
            alwaysSet: d in s.data,
          });
        }
      }
      return s.common.async
        ? Promise.resolve()
            .then(async () => {
              const u = [];
              for (const d of c) {
                const h = await d.key,
                  m = await d.value;
                u.push({ key: h, value: m, alwaysSet: d.alwaysSet });
              }
              return u;
            })
            .then((u) => Qe.mergeObjectSync(n, u))
        : Qe.mergeObjectSync(n, c);
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
                  const s =
                    this._def.errorMap?.(r, n).message ?? n.defaultError;
                  return r.code === "unrecognized_keys"
                    ? { message: B.errToObj(t).message ?? s }
                    : { message: s };
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
        typeName: W.ZodObject,
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
      for (const n of te.objectKeys(t))
        t[n] && this.shape[n] && (r[n] = this.shape[n]);
      return new je({ ...this._def, shape: () => r });
    }
    omit(t) {
      const r = {};
      for (const n of te.objectKeys(this.shape)) t[n] || (r[n] = this.shape[n]);
      return new je({ ...this._def, shape: () => r });
    }
    deepPartial() {
      return ts(this);
    }
    partial(t) {
      const r = {};
      for (const n of te.objectKeys(this.shape)) {
        const s = this.shape[n];
        t && !t[n] ? (r[n] = s) : (r[n] = s.optional());
      }
      return new je({ ...this._def, shape: () => r });
    }
    required(t) {
      const r = {};
      for (const n of te.objectKeys(this.shape))
        if (t && !t[n]) r[n] = this.shape[n];
        else {
          let a = this.shape[n];
          for (; a instanceof Yt; ) a = a._def.innerType;
          r[n] = a;
        }
      return new je({ ...this._def, shape: () => r });
    }
    keyof() {
      return lm(te.objectKeys(this.shape));
    }
  }
  ((je.create = (e, t) =>
    new je({
      shape: () => e,
      unknownKeys: "strip",
      catchall: Ar.create(),
      typeName: W.ZodObject,
      ...K(t),
    })),
    (je.strictCreate = (e, t) =>
      new je({
        shape: () => e,
        unknownKeys: "strict",
        catchall: Ar.create(),
        typeName: W.ZodObject,
        ...K(t),
      })),
    (je.lazycreate = (e, t) =>
      new je({
        shape: e,
        unknownKeys: "strip",
        catchall: Ar.create(),
        typeName: W.ZodObject,
        ...K(t),
      })));
  class $i extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t),
        n = this._def.options;
      function s(a) {
        for (const l of a) if (l.result.status === "valid") return l.result;
        for (const l of a)
          if (l.result.status === "dirty")
            return (r.common.issues.push(...l.ctx.common.issues), l.result);
        const o = a.map((l) => new Ot(l.ctx.common.issues));
        return (D(r, { code: E.invalid_union, unionErrors: o }), V);
      }
      if (r.common.async)
        return Promise.all(
          n.map(async (a) => {
            const o = {
              ...r,
              common: { ...r.common, issues: [] },
              parent: null,
            };
            return {
              result: await a._parseAsync({
                data: r.data,
                path: r.path,
                parent: o,
              }),
              ctx: o,
            };
          })
        ).then(s);
      {
        let a;
        const o = [];
        for (const c of n) {
          const u = { ...r, common: { ...r.common, issues: [] }, parent: null },
            d = c._parseSync({ data: r.data, path: r.path, parent: u });
          if (d.status === "valid") return d;
          (d.status === "dirty" && !a && (a = { result: d, ctx: u }),
            u.common.issues.length && o.push(u.common.issues));
        }
        if (a) return (r.common.issues.push(...a.ctx.common.issues), a.result);
        const l = o.map((c) => new Ot(c));
        return (D(r, { code: E.invalid_union, unionErrors: l }), V);
      }
    }
    get options() {
      return this._def.options;
    }
  }
  $i.create = (e, t) => new $i({ options: e, typeName: W.ZodUnion, ...K(t) });
  const Gt = (e) =>
    e instanceof Dc
      ? Gt(e.schema)
      : e instanceof ln
        ? Gt(e.innerType())
        : e instanceof Ki
          ? [e.value]
          : e instanceof on
            ? e.options
            : e instanceof Ic
              ? te.objectValues(e.enum)
              : e instanceof Qi
                ? Gt(e._def.innerType)
                : e instanceof Ec
                  ? [void 0]
                  : e instanceof Tc
                    ? [null]
                    : e instanceof Yt
                      ? [void 0, ...Gt(e.unwrap())]
                      : e instanceof cn
                        ? [null, ...Gt(e.unwrap())]
                        : e instanceof um || e instanceof Gi
                          ? Gt(e.unwrap())
                          : e instanceof Zi
                            ? Gt(e._def.innerType)
                            : [];
  class Lc extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== F.object)
        return (
          D(r, {
            code: E.invalid_type,
            expected: F.object,
            received: r.parsedType,
          }),
          V
        );
      const n = this.discriminator,
        s = r.data[n],
        a = this.optionsMap.get(s);
      return a
        ? r.common.async
          ? a._parseAsync({ data: r.data, path: r.path, parent: r })
          : a._parseSync({ data: r.data, path: r.path, parent: r })
        : (D(r, {
            code: E.invalid_union_discriminator,
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
      const s = new Map();
      for (const a of r) {
        const o = Gt(a.shape[t]);
        if (!o.length)
          throw new Error(
            `A discriminator value for key \`${t}\` could not be extracted from all schema options`
          );
        for (const l of o) {
          if (s.has(l))
            throw new Error(
              `Discriminator property ${String(t)} has duplicate value ${String(l)}`
            );
          s.set(l, a);
        }
      }
      return new Lc({
        typeName: W.ZodDiscriminatedUnion,
        discriminator: t,
        options: r,
        optionsMap: s,
        ...K(n),
      });
    }
  }
  function Mc(e, t) {
    const r = Rr(e),
      n = Rr(t);
    if (e === t) return { valid: !0, data: e };
    if (r === F.object && n === F.object) {
      const s = te.objectKeys(t),
        a = te.objectKeys(e).filter((l) => s.indexOf(l) !== -1),
        o = { ...e, ...t };
      for (const l of a) {
        const c = Mc(e[l], t[l]);
        if (!c.valid) return { valid: !1 };
        o[l] = c.data;
      }
      return { valid: !0, data: o };
    } else if (r === F.array && n === F.array) {
      if (e.length !== t.length) return { valid: !1 };
      const s = [];
      for (let a = 0; a < e.length; a++) {
        const o = e[a],
          l = t[a],
          c = Mc(o, l);
        if (!c.valid) return { valid: !1 };
        s.push(c.data);
      }
      return { valid: !0, data: s };
    } else
      return r === F.date && n === F.date && +e == +t
        ? { valid: !0, data: e }
        : { valid: !1 };
  }
  class Vi extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t),
        s = (a, o) => {
          if (em(a) || em(o)) return V;
          const l = Mc(a.value, o.value);
          return l.valid
            ? ((tm(a) || tm(o)) && r.dirty(),
              { status: r.value, value: l.data })
            : (D(n, { code: E.invalid_intersection_types }), V);
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
          ]).then(([a, o]) => s(a, o))
        : s(
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
  Vi.create = (e, t, r) =>
    new Vi({ left: e, right: t, typeName: W.ZodIntersection, ...K(r) });
  class an extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== F.array)
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.array,
            received: n.parsedType,
          }),
          V
        );
      if (n.data.length < this._def.items.length)
        return (
          D(n, {
            code: E.too_small,
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
          code: E.too_big,
          maximum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        r.dirty());
      const a = [...n.data]
        .map((o, l) => {
          const c = this._def.items[l] || this._def.rest;
          return c ? c._parse(new Lt(n, o, n.path, l)) : null;
        })
        .filter((o) => !!o);
      return n.common.async
        ? Promise.all(a).then((o) => Qe.mergeArray(r, o))
        : Qe.mergeArray(r, a);
    }
    get items() {
      return this._def.items;
    }
    rest(t) {
      return new an({ ...this._def, rest: t });
    }
  }
  an.create = (e, t) => {
    if (!Array.isArray(e))
      throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    return new an({ items: e, typeName: W.ZodTuple, rest: null, ...K(t) });
  };
  class Wi extends X {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== F.object)
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.object,
            received: n.parsedType,
          }),
          V
        );
      const s = [],
        a = this._def.keyType,
        o = this._def.valueType;
      for (const l in n.data)
        s.push({
          key: a._parse(new Lt(n, l, n.path, l)),
          value: o._parse(new Lt(n, n.data[l], n.path, l)),
          alwaysSet: l in n.data,
        });
      return n.common.async
        ? Qe.mergeObjectAsync(r, s)
        : Qe.mergeObjectSync(r, s);
    }
    get element() {
      return this._def.valueType;
    }
    static create(t, r, n) {
      return r instanceof X
        ? new Wi({ keyType: t, valueType: r, typeName: W.ZodRecord, ...K(n) })
        : new Wi({
            keyType: Zt.create(),
            valueType: t,
            typeName: W.ZodRecord,
            ...K(r),
          });
    }
  }
  class om extends X {
    get keySchema() {
      return this._def.keyType;
    }
    get valueSchema() {
      return this._def.valueType;
    }
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== F.map)
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.map,
            received: n.parsedType,
          }),
          V
        );
      const s = this._def.keyType,
        a = this._def.valueType,
        o = [...n.data.entries()].map(([l, c], u) => ({
          key: s._parse(new Lt(n, l, n.path, [u, "key"])),
          value: a._parse(new Lt(n, c, n.path, [u, "value"])),
        }));
      if (n.common.async) {
        const l = new Map();
        return Promise.resolve().then(async () => {
          for (const c of o) {
            const u = await c.key,
              d = await c.value;
            if (u.status === "aborted" || d.status === "aborted") return V;
            ((u.status === "dirty" || d.status === "dirty") && r.dirty(),
              l.set(u.value, d.value));
          }
          return { status: r.value, value: l };
        });
      } else {
        const l = new Map();
        for (const c of o) {
          const u = c.key,
            d = c.value;
          if (u.status === "aborted" || d.status === "aborted") return V;
          ((u.status === "dirty" || d.status === "dirty") && r.dirty(),
            l.set(u.value, d.value));
        }
        return { status: r.value, value: l };
      }
    }
  }
  om.create = (e, t, r) =>
    new om({ valueType: t, keyType: e, typeName: W.ZodMap, ...K(r) });
  class da extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.parsedType !== F.set)
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.set,
            received: n.parsedType,
          }),
          V
        );
      const s = this._def;
      (s.minSize !== null &&
        n.data.size < s.minSize.value &&
        (D(n, {
          code: E.too_small,
          minimum: s.minSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: s.minSize.message,
        }),
        r.dirty()),
        s.maxSize !== null &&
          n.data.size > s.maxSize.value &&
          (D(n, {
            code: E.too_big,
            maximum: s.maxSize.value,
            type: "set",
            inclusive: !0,
            exact: !1,
            message: s.maxSize.message,
          }),
          r.dirty()));
      const a = this._def.valueType;
      function o(c) {
        const u = new Set();
        for (const d of c) {
          if (d.status === "aborted") return V;
          (d.status === "dirty" && r.dirty(), u.add(d.value));
        }
        return { status: r.value, value: u };
      }
      const l = [...n.data.values()].map((c, u) =>
        a._parse(new Lt(n, c, n.path, u))
      );
      return n.common.async ? Promise.all(l).then((c) => o(c)) : o(l);
    }
    min(t, r) {
      return new da({
        ...this._def,
        minSize: { value: t, message: B.toString(r) },
      });
    }
    max(t, r) {
      return new da({
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
  da.create = (e, t) =>
    new da({
      valueType: e,
      minSize: null,
      maxSize: null,
      typeName: W.ZodSet,
      ...K(t),
    });
  class Dc extends X {
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
  Dc.create = (e, t) => new Dc({ getter: e, typeName: W.ZodLazy, ...K(t) });
  class Ki extends X {
    _parse(t) {
      if (t.data !== this._def.value) {
        const r = this._getOrReturnCtx(t);
        return (
          D(r, {
            received: r.data,
            code: E.invalid_literal,
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
  Ki.create = (e, t) => new Ki({ value: e, typeName: W.ZodLiteral, ...K(t) });
  function lm(e, t) {
    return new on({ values: e, typeName: W.ZodEnum, ...K(t) });
  }
  class on extends X {
    _parse(t) {
      if (typeof t.data != "string") {
        const r = this._getOrReturnCtx(t),
          n = this._def.values;
        return (
          D(r, {
            expected: te.joinValues(n),
            received: r.parsedType,
            code: E.invalid_type,
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
          D(r, { received: r.data, code: E.invalid_enum_value, options: n }),
          V
        );
      }
      return yt(t.data);
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
      return on.create(t, { ...this._def, ...r });
    }
    exclude(t, r = this._def) {
      return on.create(
        this.options.filter((n) => !t.includes(n)),
        { ...this._def, ...r }
      );
    }
  }
  on.create = lm;
  class Ic extends X {
    _parse(t) {
      const r = te.getValidEnumValues(this._def.values),
        n = this._getOrReturnCtx(t);
      if (n.parsedType !== F.string && n.parsedType !== F.number) {
        const s = te.objectValues(r);
        return (
          D(n, {
            expected: te.joinValues(s),
            received: n.parsedType,
            code: E.invalid_type,
          }),
          V
        );
      }
      if (
        (this._cache ||
          (this._cache = new Set(te.getValidEnumValues(this._def.values))),
        !this._cache.has(t.data))
      ) {
        const s = te.objectValues(r);
        return (
          D(n, { received: n.data, code: E.invalid_enum_value, options: s }),
          V
        );
      }
      return yt(t.data);
    }
    get enum() {
      return this._def.values;
    }
  }
  Ic.create = (e, t) =>
    new Ic({ values: e, typeName: W.ZodNativeEnum, ...K(t) });
  class Hi extends X {
    unwrap() {
      return this._def.type;
    }
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      if (r.parsedType !== F.promise && r.common.async === !1)
        return (
          D(r, {
            code: E.invalid_type,
            expected: F.promise,
            received: r.parsedType,
          }),
          V
        );
      const n = r.parsedType === F.promise ? r.data : Promise.resolve(r.data);
      return yt(
        n.then((s) =>
          this._def.type.parseAsync(s, {
            path: r.path,
            errorMap: r.common.contextualErrorMap,
          })
        )
      );
    }
  }
  Hi.create = (e, t) => new Hi({ type: e, typeName: W.ZodPromise, ...K(t) });
  class ln extends X {
    innerType() {
      return this._def.schema;
    }
    sourceType() {
      return this._def.schema._def.typeName === W.ZodEffects
        ? this._def.schema.sourceType()
        : this._def.schema;
    }
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t),
        s = this._def.effect || null,
        a = {
          addIssue: (o) => {
            (D(n, o), o.fatal ? r.abort() : r.dirty());
          },
          get path() {
            return n.path;
          },
        };
      if (((a.addIssue = a.addIssue.bind(a)), s.type === "preprocess")) {
        const o = s.transform(n.data, a);
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
                ? ca(c.value)
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
              ? ca(l.value)
              : l;
        }
      }
      if (s.type === "refinement") {
        const o = (l) => {
          const c = s.refinement(l, a);
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
      if (s.type === "transform")
        if (n.common.async === !1) {
          const o = this._def.schema._parseSync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          if (!Jn(o)) return V;
          const l = s.transform(o.value, a);
          if (l instanceof Promise)
            throw new Error(
              "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead."
            );
          return { status: r.value, value: l };
        } else
          return this._def.schema
            ._parseAsync({ data: n.data, path: n.path, parent: n })
            .then((o) =>
              Jn(o)
                ? Promise.resolve(s.transform(o.value, a)).then((l) => ({
                    status: r.value,
                    value: l,
                  }))
                : V
            );
      te.assertNever(s);
    }
  }
  ((ln.create = (e, t, r) =>
    new ln({ schema: e, typeName: W.ZodEffects, effect: t, ...K(r) })),
    (ln.createWithPreprocess = (e, t, r) =>
      new ln({
        schema: t,
        effect: { type: "preprocess", transform: e },
        typeName: W.ZodEffects,
        ...K(r),
      })));
  class Yt extends X {
    _parse(t) {
      return this._getType(t) === F.undefined
        ? yt(void 0)
        : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Yt.create = (e, t) =>
    new Yt({ innerType: e, typeName: W.ZodOptional, ...K(t) });
  class cn extends X {
    _parse(t) {
      return this._getType(t) === F.null
        ? yt(null)
        : this._def.innerType._parse(t);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  cn.create = (e, t) =>
    new cn({ innerType: e, typeName: W.ZodNullable, ...K(t) });
  class Qi extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t);
      let n = r.data;
      return (
        r.parsedType === F.undefined && (n = this._def.defaultValue()),
        this._def.innerType._parse({ data: n, path: r.path, parent: r })
      );
    }
    removeDefault() {
      return this._def.innerType;
    }
  }
  Qi.create = (e, t) =>
    new Qi({
      innerType: e,
      typeName: W.ZodDefault,
      defaultValue:
        typeof t.default == "function" ? t.default : () => t.default,
      ...K(t),
    });
  class Zi extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t),
        n = { ...r, common: { ...r.common, issues: [] } },
        s = this._def.innerType._parse({
          data: n.data,
          path: n.path,
          parent: { ...n },
        });
      return Ui(s)
        ? s.then((a) => ({
            status: "valid",
            value:
              a.status === "valid"
                ? a.value
                : this._def.catchValue({
                    get error() {
                      return new Ot(n.common.issues);
                    },
                    input: n.data,
                  }),
          }))
        : {
            status: "valid",
            value:
              s.status === "valid"
                ? s.value
                : this._def.catchValue({
                    get error() {
                      return new Ot(n.common.issues);
                    },
                    input: n.data,
                  }),
          };
    }
    removeCatch() {
      return this._def.innerType;
    }
  }
  Zi.create = (e, t) =>
    new Zi({
      innerType: e,
      typeName: W.ZodCatch,
      catchValue: typeof t.catch == "function" ? t.catch : () => t.catch,
      ...K(t),
    });
  class cm extends X {
    _parse(t) {
      if (this._getType(t) !== F.nan) {
        const n = this._getOrReturnCtx(t);
        return (
          D(n, {
            code: E.invalid_type,
            expected: F.nan,
            received: n.parsedType,
          }),
          V
        );
      }
      return { status: "valid", value: t.data };
    }
  }
  cm.create = (e) => new cm({ typeName: W.ZodNaN, ...K(e) });
  class um extends X {
    _parse(t) {
      const { ctx: r } = this._processInputParams(t),
        n = r.data;
      return this._def.type._parse({ data: n, path: r.path, parent: r });
    }
    unwrap() {
      return this._def.type;
    }
  }
  class Fc extends X {
    _parse(t) {
      const { status: r, ctx: n } = this._processInputParams(t);
      if (n.common.async)
        return (async () => {
          const a = await this._def.in._parseAsync({
            data: n.data,
            path: n.path,
            parent: n,
          });
          return a.status === "aborted"
            ? V
            : a.status === "dirty"
              ? (r.dirty(), ca(a.value))
              : this._def.out._parseAsync({
                  data: a.value,
                  path: n.path,
                  parent: n,
                });
        })();
      {
        const s = this._def.in._parseSync({
          data: n.data,
          path: n.path,
          parent: n,
        });
        return s.status === "aborted"
          ? V
          : s.status === "dirty"
            ? (r.dirty(), { status: "dirty", value: s.value })
            : this._def.out._parseSync({
                data: s.value,
                path: n.path,
                parent: n,
              });
      }
    }
    static create(t, r) {
      return new Fc({ in: t, out: r, typeName: W.ZodPipeline });
    }
  }
  class Gi extends X {
    _parse(t) {
      const r = this._def.innerType._parse(t),
        n = (s) => (Jn(s) && (s.value = Object.freeze(s.value)), s);
      return Ui(r) ? r.then((s) => n(s)) : n(r);
    }
    unwrap() {
      return this._def.innerType;
    }
  }
  Gi.create = (e, t) =>
    new Gi({ innerType: e, typeName: W.ZodReadonly, ...K(t) });
  var W;
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
  })(W || (W = {}));
  const w = Zt.create,
    q = es.create,
    Ie = Ac.create,
    dm = Pc.create,
    pa = Oc.create;
  Ar.create;
  const Y = Mt.create,
    T = je.create;
  $i.create;
  const zc = Lc.create;
  (Vi.create, an.create);
  const rs = Wi.create,
    ns = Ki.create,
    ie = on.create;
  (Hi.create, Yt.create, cn.create);
  const X0 = T({
      value: q().int().min(0).max(100).nullable(),
      weight: q().min(0).max(1),
      recommendations: Y(w()).default([]),
      dataQuality: w().optional(),
    }).passthrough(),
    pm = rs(X0),
    J0 = T({
      id: w().min(1),
      title: w().min(1),
      status: ie(["todo", "done"]),
      actionUrl: w().url().optional(),
    }),
    ev = T({ steps: Y(J0) }),
    hm = ie([
      "cold_start",
      "human_established",
      "agent_verified_thin",
      "agent_verified",
      "insufficient_data",
    ]),
    mm = T({
      humanOrders: q().int().min(0),
      agentOrders: q().int().min(0),
      storeAgeDays: q().int().min(0),
      agenticEvidenceStatus: ie([
        "verified",
        "not_yet_observed",
        "not_applicable",
      ]),
    }),
    fm = T({
      status: ns("ready"),
      score: q().int().min(0).max(100).nullable(),
      breakdown: pm,
      computedAt: w().datetime(),
      expiresAt: w().datetime(),
      confidenceLevel: hm,
      evidenceProfile: mm,
      scoreCap: q().int().min(0).max(100),
      nextMilestone: w().nullable(),
    }),
    gm = T({ status: ns("pending"), checklist: ev }),
    ym = T({
      status: ns("stale"),
      score: q().int().min(0).max(100).nullable(),
      breakdown: pm,
      computedAt: w().datetime(),
      expiresAt: w().datetime(),
      confidenceLevel: hm,
      evidenceProfile: mm,
      scoreCap: q().int().min(0).max(100),
      nextMilestone: w().nullable(),
    });
  zc("status", [fm, gm, ym]);
  const vm = ie(["discovery", "customer", "checkout"]),
    Bc = T({
      id: w().min(1),
      callId: w().min(1),
      agentId: w().min(1),
      merchantId: w().min(1),
      bucket: vm,
      tool: w().min(1),
      inputHash: w().regex(/^[a-f0-9]{64}$/, "expected SHA-256 hex"),
      outputHash: w().regex(/^[a-f0-9]{64}$/, "expected SHA-256 hex"),
      signingKeyKid: w().min(1),
      jws: w().min(1),
      jwksSnapshotUrl: w().url().nullish(),
      createdAt: w().datetime(),
    });
  T({
    agentId: w().optional(),
    bucket: vm.optional(),
    from: w().datetime().optional(),
    to: w().datetime().optional(),
    cursor: w().optional(),
    limit: q().int().min(1).max(100).default(50),
  });
  const tv = T({ items: Y(Bc), nextCursor: w().nullable() });
  (T({
    agentId: w().optional(),
    from: w().datetime().optional(),
    to: w().datetime().optional(),
    format: ie(["jws-zip", "json-bulk"]).default("jws-zip"),
  }),
    T({ jobId: w().min(1), status: ns("queued") }));
  const rv = ie(["pending", "active", "expired", "extended", "reverted"]);
  (T({ gracePeriodDays: q().int().min(1).max(90).default(30) }),
    T({
      id: w().min(1),
      merchantId: w().min(1),
      oldKeyKid: w().min(1),
      newKeyKid: w().min(1),
      status: rv,
      graceEndsAt: w().datetime(),
      notifiedAt: w().datetime().nullable(),
      createdAt: w().datetime(),
      updatedAt: w().datetime(),
    }));
  const ha = T({
      activeKid: w().min(1),
      retiredGraceKids: Y(w().min(1)).default([]),
      lastRotatedAt: w().datetime().nullable(),
      daysSinceRotation: q().int().min(0).nullable(),
    }),
    xm = T({
      id: w().min(1),
      merchantId: w().min(1),
      agentId: w().nullable(),
      bucket: w().nullable(),
      tool: w().nullable(),
      source: ie([
        "portal",
        "shopify-embed",
        "wp-embed",
        "api",
        "mcp",
        "webhook",
      ]),
      outcome: w().min(1),
      prevHash: w().nullable(),
      entryHash: w().min(1),
      metadata: rs(pa()).default({}),
      createdAt: w().datetime(),
    });
  T({
    agentId: w().optional(),
    bucket: w().optional(),
    tool: w().optional(),
    source: xm.shape.source.optional(),
    from: w().datetime().optional(),
    to: w().datetime().optional(),
    cursor: w().optional(),
    limit: q().int().min(1).max(100).default(50),
  });
  const bm = T({
      items: Y(xm),
      nextCursor: w().nullable(),
      chainIntegrity: T({
        verified: Ie(),
        verifiedThrough: w().min(1).nullable(),
        note: w().optional(),
      }),
    }),
    wm = ie(["ok", "action_required", "unavailable"]),
    Uc = T({
      id: w().min(1),
      title: w().min(1),
      severity: ie(["info", "warning", "critical"]),
      actionUrl: w().optional(),
      deadline: w().datetime().optional(),
    }),
    Yi = T({
      status: wm,
      lastChecked: w().datetime(),
      actionsRequired: Y(Uc).default([]),
    });
  T({ gdpr: Yi, eidas: Yi, pci: Yi, schemaOrg: Yi });
  const nv = T({
      overallStatus: wm,
      pendingActionsCount: q().int().min(0),
      actions: Y(Uc).optional(),
    }),
    sv = T({
      catalog_completeness: q().min(0).max(1),
      catalog_freshness: q().min(0).max(1),
      price_accuracy: q().min(0).max(1),
      availability_accuracy: q().min(0).max(1),
      policy_coverage: q().min(0).max(1),
      checkout_success_rate: q().min(0).max(1),
      fulfillment_rate: q().min(0).max(1),
      dispute_rate: q().min(0).max(1),
      agent_satisfaction_rate: q().min(0).max(1),
      response_latency: q().min(0).max(1),
      review_sentiment: q().min(0).max(1),
      data_consistency: q().min(0).max(1),
    }),
    km = T({
      score: zc("status", [fm, gm, ym]),
      recentReceipts: Y(Bc).max(5),
      keysStatus: ha.nullable(),
      complianceSummary: nv,
      components: sv.nullable().optional(),
      componentsAreReal: Ie().optional(),
      computedAt: w().datetime(),
    }),
    av = ie(["SHOPIFY", "WOO", "ACP"]);
  T({ platform: av });
  const iv = T({ status: ns("available"), receipt: Bc }),
    ov = T({
      status: ns("not-found"),
      reason: ie([
        "no_agent_attribution",
        "order_not_found",
        "receipt_not_yet_generated",
      ]),
    });
  zc("status", [iv, ov]);
  const Sm = ie([
      "SHOPIFY",
      "WOO",
      "ACP",
      "MAGENTO",
      "PRESTASHOP",
      "ODOO",
      "WIX",
    ]),
    Cm = ie([
      "created",
      "updated",
      "paid",
      "fulfilled",
      "cancelled",
      "refunded",
      "completed",
    ]),
    lv = T({
      amount: w().regex(/^-?\d+(\.\d+)?$/, "Decimal as string"),
      currency: w().length(3),
    }),
    _m = T({
      id: w().min(1),
      platform: Sm,
      externalOrderId: w().min(1),
      status: Cm,
      total: lv,
      agentId: w().nullable(),
      paymentRail: w().nullable(),
      storeId: w().min(1),
      createdAt: w().datetime(),
      receiptUri: w().url().nullish(),
    }),
    cv = T({
      id: w().min(1),
      platformOrderId: w().min(1),
      type: w().min(1),
      payload: rs(pa()).default({}),
      createdAt: w().datetime(),
    });
  (_m.extend({ events: Y(cv).default([]) }),
    T({
      platform: Sm.optional(),
      status: Cm.optional(),
      agentId: w().optional(),
      from: w().datetime().optional(),
      to: w().datetime().optional(),
      search: w().optional(),
      cursor: w().optional(),
      limit: q().int().min(1).max(100).default(50),
    }));
  const jm = T({ items: Y(_m), nextCursor: w().nullable() }),
    uv = ie(["stripe-connect", "x402-wallet", "acp", "paypal", "eidas"]),
    Nm = ie(["pending", "active", "error", "disabled"]),
    dv = T({
      id: w().min(1),
      type: uv,
      state: Nm,
      label: w().min(1),
      lastHealthCheck: w().datetime().nullable(),
      errorReason: w().nullable(),
      actions: Y(ie(["rotate", "disable", "enable", "reconnect"])).default([]),
      createdAt: w().datetime(),
    }),
    pv = T({ items: Y(dv) });
  T({ reason: w().min(3).max(500).optional() });
  const hv = T({ id: w().min(1), state: Nm, rotatedAt: w().datetime() }),
    qc = ie(["allow", "block", "probation", "pending"]),
    mv = T({
      id: w().min(1),
      agentId: w().min(1),
      publicKey: w().min(1),
      displayName: w().nullable(),
      state: qc,
      agenticTrustScore: q().int().min(0).max(100).nullable(),
      callsLast30d: q().int().min(0),
      lastCallAt: w().datetime().nullable(),
      createdAt: w().datetime(),
    });
  T({
    state: qc.optional(),
    cursor: w().optional(),
    limit: q().int().min(1).max(100).default(50),
  });
  const fv = T({ items: Y(mv), nextCursor: w().nullable() }),
    gv = ie(["revoke", "allow", "probation"]);
  T({ reason: w().min(3).max(500) });
  const yv = T({ id: w().min(1), state: qc, updatedAt: w().datetime() });
  (T({
    items: Y(
      T({ agentId: w().min(1), action: gv, reason: w().min(3).max(500) })
    )
      .min(1)
      .max(50),
  }),
    T({
      succeeded: Y(w()),
      failed: Y(T({ agentId: w().min(1), error: w() })),
    }));
  const $c = ie(["stripe-connect", "x402", "acp", "paypal", "eidas"]),
    Rm = T({
      rail: $c,
      enabled: Ie().default(!0),
      minAmount: w()
        .regex(/^-?\d+(\.\d+)?$/)
        .nullable()
        .default(null),
      maxAmount: w()
        .regex(/^-?\d+(\.\d+)?$/)
        .nullable()
        .default(null),
      currencyAllowlist: Y(w().length(3)).default([]),
    }),
    Am = T({
      railsPriority: Y($c),
      rules: Y(Rm).default([]),
      updatedAt: w().datetime(),
    });
  T({ railsPriority: Y($c).min(1), rules: Y(Rm).optional() });
  const vv = ie([
      "active",
      "expiring_soon",
      "expired",
      "pending",
      "not_applicable",
    ]),
    Vc = T({
      status: vv,
      expiresAt: w().datetime().nullable(),
      pendingSteps: Y(w()).default([]),
      actionsRequired: Y(Uc).default([]),
    }),
    xv = T({ eidas: Vc, kyc: Vc, schemaOrg: Vc }),
    bv = ie(["shopify-theme", "woocommerce-plugin", "custom-snippet"]),
    wv = T({
      enabled: Ie(),
      detectedAdapter: bv.nullable(),
      bridgeLastSeenAt: w().datetime().nullable(),
      updatedAt: w().datetime(),
    });
  (T({ enabled: Ie() }),
    T({
      snippet: w().min(1),
      hash: w().regex(/^[a-f0-9]{64}$/),
      generatedAt: w().datetime(),
    }));
  const kv = ie(["idle", "indexing", "error", "never_indexed"]),
    Sv = T({
      status: kv,
      lastIndexedAt: w().datetime().nullable(),
      productsIndexed: q().int().min(0),
      lastError: w().nullable(),
      jobId: w().nullable(),
    }),
    Cv = T({ jobId: w().min(1), enqueuedAt: w().datetime() }),
    _v = ie(["ok", "failed", "degraded"]),
    jv = T({ name: w(), reachable: Ie(), latencyMs: q().nullable() });
  T({
    status: _v,
    checkedAt: w().datetime(),
    targets: Y(jv),
    cacheAgeMs: q().int().nonnegative(),
    ipWhitelist: Y(w()),
  });
  class Xt extends Error {
    constructor(r, n) {
      super(r);
      kn(this, "status");
      kn(this, "body");
      kn(this, "url");
      ((this.name = "ApiClientError"),
        (this.status = n.status),
        (this.body = n.body),
        (this.url = n.url));
    }
  }
  class Em extends Xt {
    constructor(t) {
      (super(t.body?.error ?? t.body?.code ?? "auth_required", {
        status: 401,
        body: t.body,
        url: t.url,
      }),
        (this.name = "ApiAuthError"));
    }
  }
  class Nv extends Xt {
    constructor(r) {
      super(r.body?.error ?? r.body?.code ?? "forbidden", {
        status: 403,
        body: r.body,
        url: r.url,
      });
      kn(this, "portalUpgradeUrl");
      this.name = "ApiForbiddenError";
      const n = r.body?.details?.portal_upgrade_url;
      this.portalUpgradeUrl = typeof n == "string" ? n : null;
    }
  }
  class Tm extends Xt {
    constructor(r) {
      super(r.body?.message ?? "validation failed", {
        status: 422,
        body: r.body,
        url: r.url,
      });
      kn(this, "issues");
      ((this.name = "ApiValidationError"),
        (this.issues = r.issues ?? r.body?.issues ?? []));
    }
  }
  class Rv extends Xt {
    constructor(r) {
      super(r.body?.error ?? "rate_limited", {
        status: 429,
        body: r.body,
        url: r.url,
      });
      kn(this, "retryAfterSeconds");
      ((this.name = "ApiRateLimitError"),
        (this.retryAfterSeconds = r.retryAfterSeconds));
    }
  }
  class Av extends Xt {
    constructor(t) {
      (super(t.body?.error ?? t.body?.message ?? "server_error", {
        status: t.status,
        body: t.body,
        url: t.url,
      }),
        (this.name = "ApiServerError"));
    }
  }
  const Ev = (e) => {
      const { status: t, body: r, url: n, retryAfterHeader: s } = e;
      if (t === 401) return new Em({ body: r, url: n });
      if (t === 403) return new Nv({ body: r, url: n });
      if (t === 422) return new Tm({ body: r, url: n });
      if (t === 429) {
        const a = s ? Number.parseInt(s, 10) : null;
        return new Rv({
          body: r,
          url: n,
          retryAfterSeconds: a !== null && Number.isFinite(a) ? a : null,
        });
      }
      return t >= 500
        ? new Av({ status: t, body: r, url: n })
        : new Xt(r?.error ?? r?.message ?? `http_${t}`, {
            status: t,
            body: r,
            url: n,
          });
    },
    Tv = async (e, t, r) => {
      const n = await Promise.resolve(e.getToken()),
        s = { Accept: "application/json", "X-Embed-Source": e.source };
      return (
        n && (s.Authorization = `Bearer ${n}`),
        r && (s["Idempotency-Key"] = r),
        t && (s["Content-Type"] = "application/json"),
        s
      );
    },
    Pv = async (e) => {
      if (!(e.headers.get("content-type") ?? "").includes("application/json"))
        return { body: null, raw: null };
      try {
        const r = await e.json();
        return { body: r, raw: r };
      } catch {
        return { body: null, raw: null };
      }
    },
    Pm = (e) => {
      const t = e.baseUrl.replace(/\/+$/, ""),
        r = e.fetchImpl ?? ((a, o) => globalThis.fetch(a, o)),
        n = async (a, o, l, c, u, d) => {
          const h = c !== void 0;
          let m;
          u !== void 0
            ? ((m = { Accept: "application/json", "X-Embed-Source": e.source }),
              u && (m.Authorization = `Bearer ${u}`),
              d?.idempotencyKey && (m["Idempotency-Key"] = d.idempotencyKey),
              h && (m["Content-Type"] = "application/json"))
            : (m = await Tv(e, h, d?.idempotencyKey));
          const v = {
            method: a,
            headers: m,
            ...(h ? { body: JSON.stringify(c) } : {}),
          };
          let x;
          if (d?.signal) v.signal = d.signal;
          else if (e.timeoutMs) {
            const p = new AbortController();
            ((v.signal = p.signal),
              (x = setTimeout(() => p.abort(), e.timeoutMs)));
          }
          let k;
          try {
            k = await r(o, v);
          } finally {
            x !== void 0 && clearTimeout(x);
          }
          const { raw: M, body: y } = await Pv(k);
          if (!k.ok) {
            const p = k.headers.get("retry-after");
            throw Ev({
              status: k.status,
              body: y,
              url: o,
              retryAfterHeader: p,
            });
          }
          try {
            return l.parse(M);
          } catch (p) {
            throw p instanceof Ot
              ? new Tm({ body: y, url: o, issues: p.issues })
              : new Xt("response_schema_parse_failed", {
                  status: k.status,
                  body: y,
                  url: o,
                });
          }
        },
        s = async (a, o, l, c, u) => {
          const d = o.startsWith("http")
            ? o
            : `${t}${o.startsWith("/") ? o : `/${o}`}`;
          try {
            return await n(a, d, l, c, void 0, u);
          } catch (h) {
            if (h instanceof Em && e.refreshTokenFn !== void 0) {
              const m = await e.refreshTokenFn();
              if (m !== null) return n(a, d, l, c, m, u);
            }
            throw h;
          }
        };
      return {
        get: (a, o, l) => s("GET", a, o, void 0, l),
        post: (a, o, l, c) => s("POST", a, l, o, c),
        put: (a, o, l, c) => s("PUT", a, l, o, c),
        del: (a, o, l) => s("DELETE", a, o, void 0, l),
      };
    };
  class Ov extends Error {
    constructor(t, r) {
      (super(r ?? `Token refresh failed with HTTP ${t}`),
        (this.name = "TokenRefreshError"),
        (this.status = t));
    }
  }
  class Lv {
    constructor(t = {}) {
      U(this, Br, null);
      U(this, xn, null);
      U(this, xa);
      U(this, ba);
      (L(this, xa, t.fetchImpl ?? ((r, n) => globalThis.fetch(r, n))),
        L(this, ba, t.expiryBufferMs ?? 3e4));
    }
    async getToken() {
      return f(this, Br) === null ||
        f(this, xn) === null ||
        Date.now() >= f(this, xn) - f(this, ba)
        ? null
        : f(this, Br);
    }
    async refresh() {
      const t = window.__AMCP_CONFIG__,
        r = `${t.restRoot}agenticmcps/v1/embed/token`,
        n = await f(this, xa).call(this, r, {
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
          new Ov(n.status, o)
        );
      }
      const s = await n.json(),
        a = (s.expiresIn ?? 300) * 1e3;
      return (L(this, Br, s.token), L(this, xn, Date.now() + a), f(this, Br));
    }
    clear() {
      (L(this, Br, null), L(this, xn, null));
    }
  }
  ((Br = new WeakMap()),
    (xn = new WeakMap()),
    (xa = new WeakMap()),
    (ba = new WeakMap()));
  const Om = new Lv(),
    Mv = async () => {
      const e = await Om.getToken();
      return e !== null ? e : Om.refresh();
    },
    Lm = (e) => "https://api.trusteed.xyz";
  let Mm = Pm({ baseUrl: Lm(), source: "wp-embed", getToken: Mv }),
    Dm = "wp-embed";
  function Dv() {
    return Dm;
  }
  function Iv(e) {
    const t = e.baseUrl ?? Lm();
    ((Mm = Pm({ baseUrl: t, source: e.source, getToken: e.getToken })),
      (Dm = e.source));
  }
  const re = new Proxy(
      {},
      {
        get(e, t) {
          return Mm[t];
        },
      }
    ),
    Fv = {
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
          "Cada vez que un agente de compra compra en tu tienda, se genera un comprobante oficial firmado.",
        receiptsBenefits:
          "✅ ¿Para qué sirve? Si un comprador dice 'yo no hice ese pedido', este comprobante es tu prueba — firmado y sellado, imposible de falsificar. Puedes dárselo a tu banco o abogado en caso de disputa. Nosotros lo guardamos automáticamente el tiempo que exige la ley de tu país (entre 5 y 10 años), sin que hagas nada.",
        receiptsRegulation:
          "🏛️ Nivel legal: estos comprobantes cumplen la norma europea de firma electrónica (eIDAS) — equivale a firmar ante un notario, pero en digital. Cada uno lleva un sello de tiempo de una autoridad oficial. Tienen validez como evidencia en toda la Unión Europea.",
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
        paramsRequiredHint:
          "Proporciona al menos uno de los parámetros listados antes de activar.",
        paramsRequiredError: "Falta parámetro requerido:",
        params: {
          "R001.requireAgentId": "Requerir ID del agente",
          "R001.merchantTier": "Nivel del comercio (high = exigir ID siempre)",
          "R004.maxKeyAgeHours": "Antigüedad máx. de la clave (horas)",
          "R009.requireAgentId": "Requerir ID del agente",
          "R010.minCompletedOrders": "Pedidos completados mínimos",
          "R012.categories": "Categorías bloqueadas",
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
          "R023.windowDays": "Ventana (días)",
          "R023.maxRatio": "Ratio máx. de reembolsos (0–1)",
          "R024.windowDays": "Ventana (días)",
          "R024.maxDisputes": "Disputas máximas",
          "R025.blockPoBox": "Bloquear apartados postales",
          "R025.blockFreightForwarder": "Bloquear reexpedidores",
          "R026.requireConsent": "Requerir consentimiento explícito",
          "R027.maxStoredValueCents": "Valor almacenado máx. (céntimos)",
          "R028.requirePurchaseOrder": "Requerir orden de compra",
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
        protectionBadge: "Sí, todo en orden",
        protectionDesc:
          "Tu tienda tiene protección activa. Cada venta realizada por un agente de compra queda registrada y firmada. Nadie puede falsificar un pedido.",
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
      },
      trustKeys: {
        description:
          '🔑 Las llaves de tu tienda. Estas claves son las "firmas" que el sistema le pone a cada comprobante de venta para que nadie pueda falsificarlo. Cámbialas cada 90 días para mantener todo seguro, igual que cambias la cerradura de vez en cuando.',
        ariaLoading: "Cargando claves",
        errorLoading: "No se pudo cargar el estado de claves:",
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
      },
      trustReceiptsList: {
        description:
          "🤖 Compras hechas por agentes de compras. Cuando un agente de compras automático entra a tu tienda, aquí queda el comprobante firmado — como un ticket de caja, pero para ventas automáticas. Haz clic en una fila para ver todos los detalles de esa venta.",
        pacoBenefits:
          "✅ ¿Para qué te sirve? Si un agente de compra dice que no hizo el pedido, este comprobante es tu prueba oficial. Nadie puede tocarlo ni borrarlo. Puedes descargarlo y dárselo a tu banco o abogado. Nosotros lo guardamos entre 5 y 10 años según la ley de tu país — sin que tengas que hacer nada.",
        pacoRegulation:
          "🏛️ Nivel legal en 4 zonas del mundo: tus comprobantes cumplen la ley de firma electrónica de Europa (eIDAS), Estados Unidos (ESIGN), Reino Unido (UK DIATF) y son compatibles con la nueva cartera de identidad europea (EUDI Wallet). En la práctica: si un comprador —da igual si está en España, en California o en Londres— dice que no hizo el pedido, este comprobante es tu prueba ante el banco, el juez o el abogado. Cada uno lleva firma digital + sello de tiempo de una autoridad oficial, como un notario pero en digital. Lo guardamos entre 5 y 10 años según la ley de tu país, sin que hagas nada.",
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
      },
      merchantCheckoutConfig: {
        description:
          "Configuración de los métodos de pago habilitados para agentes en checkout.",
        ariaLoading: "Cargando configuración",
        errorLoading: "No se pudo cargar la configuración:",
        railsAriaLabel: "Rails de checkout",
        enabled: "Habilitado",
        disabled: "Deshabilitado",
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
    Im = {
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
          "Every time a robot or virtual assistant buys from your store, an official signed receipt is generated.",
        receiptsBenefits:
          "✅ What is it for? If a buyer claims 'I never placed that order', this receipt is your proof — signed, sealed, impossible to forge. You can hand it to your bank or solicitor in case of a dispute. We store it automatically for as long as the law in your country requires (5–10 years), with nothing to do on your end.",
        receiptsRegulation:
          "🏛️ Legal standing: these receipts comply with the EU electronic signature standard (eIDAS) — the digital equivalent of signing before a notary. Each one carries an official timestamp from a trusted time authority. They are recognised as electronic evidence throughout the European Union.",
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
        paramsRequiredHint:
          "Provide at least one of the listed parameters before enabling.",
        paramsRequiredError: "Required parameter missing:",
        params: {
          "R001.requireAgentId": "Require agent ID",
          "R001.merchantTier": "Merchant tier (high = always require agent ID)",
          "R004.maxKeyAgeHours": "Max key age (hours)",
          "R009.requireAgentId": "Require agent ID",
          "R010.minCompletedOrders": "Minimum completed orders",
          "R012.categories": "Blocked categories",
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
          "R023.windowDays": "Window (days)",
          "R023.maxRatio": "Max refund ratio (0–1)",
          "R024.windowDays": "Window (days)",
          "R024.maxDisputes": "Max disputes",
          "R025.blockPoBox": "Block PO Box addresses",
          "R025.blockFreightForwarder": "Block freight forwarders",
          "R026.requireConsent": "Require explicit consent",
          "R027.maxStoredValueCents": "Max stored value (cents)",
          "R028.requirePurchaseOrder": "Require purchase order",
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
        protectionBadge: "Yes, all in order",
        protectionDesc:
          "Your store has active protection. Every sale made by a shopping agent is recorded and signed. No one can forge an order.",
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
      },
      trustKeys: {
        description: `🔑 Your store's keys. These keys are the "signatures" the system puts on each sale receipt so no one can forge it. Change them every 90 days to keep everything secure, just like you change a lock every now and then.`,
        ariaLoading: "Loading keys",
        errorLoading: "Could not load key status:",
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
      },
      trustReceiptsList: {
        description:
          "🤖 Purchases made by buying agents. When an automated buying agent enters your store, a signed receipt is kept here — like a till receipt, but for automated sales. Click on a row to see all the details of that sale.",
        pacoBenefits:
          "✅ What's in it for you? If a shopping agent claims they never placed that order, this receipt is your official proof. Nobody can touch or delete it. You can download it and hand it to your bank or solicitor. We store it for 5–10 years as required by law in your country — nothing for you to do.",
        pacoRegulation:
          "🏛️ Legal standing across 4 regions: your receipts comply with the digital signature laws of the EU (eIDAS), the United States (ESIGN), the United Kingdom (UK DIATF), and are compatible with the new EU digital identity wallet (EUDI Wallet). In practice: if a buyer — whether from Spain, the US or the UK — claims they never placed the order, this receipt is your official proof with the bank, court or solicitor. Each carries a digital signature plus an official timestamp from a trusted authority (like a digital notary). We store them for 5–10 years as required by your country's law, automatically.",
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
      },
      merchantCheckoutConfig: {
        description:
          "Configuration of payment methods enabled for agents at checkout.",
        ariaLoading: "Loading configuration",
        errorLoading: "Could not load configuration:",
        railsAriaLabel: "Checkout rails",
        enabled: "Enabled",
        disabled: "Disabled",
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
    zv = { es: Fv, en: Im };
  function Fm() {
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
  const zm = N.createContext(Im);
  function Bv({ children: e, locale: t }) {
    const r = t ?? Fm(),
      n = N.useMemo(() => zv[r], [r]);
    return i.jsx(zm.Provider, { value: n, children: e });
  }
  function xe() {
    return N.useContext(zm);
  }
  function Uv() {
    return Fm();
  }
  const qv = T({ success: Ie(), ticketNumber: w().optional() }),
    Jt = [];
  typeof window < "u" &&
    (window.addEventListener("error", (e) => {
      const t = `[JS] ${e.message} at ${e.filename}:${e.lineno}`;
      Jt.includes(t) || (Jt.unshift(t), Jt.length > 10 && Jt.pop());
    }),
    window.addEventListener("unhandledrejection", (e) => {
      const t = `[Promise] ${String(e.reason)}`;
      Jt.includes(t) || (Jt.unshift(t), Jt.length > 10 && Jt.pop());
    }));
  function $v() {
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
  function Vv() {
    const e = xe(),
      [t, r] = le.useState(!1),
      [n, s] = le.useState(""),
      [a, o] = le.useState("idle"),
      [l, c] = le.useState(null),
      [u, d] = le.useState(null),
      h = () => {
        (r(!0), o("idle"), s(""), c(null), d(null));
      },
      m = () => {
        r(!1);
      },
      v = async (x) => {
        if ((x.preventDefault(), !(n.trim().length < 10))) {
          o("loading");
          try {
            const k = await re.post(
              "/v1/embed/support/report",
              {
                platform: $v(),
                message: n.trim(),
                currentUrl: window.location.href.slice(0, 500),
                errorLogs: Jt.slice(0, 10),
              },
              qv
            );
            (c(k.ticketNumber ?? null), o("success"));
          } catch (k) {
            const M = k instanceof Error ? k.message : e.common.errorUnknown;
            (d(M), o("error"));
          }
        }
      };
    return i.jsxs(i.Fragment, {
      children: [
        i.jsx("button", {
          type: "button",
          onClick: h,
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
            onClick: (x) => {
              x.target === x.currentTarget && m();
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
                a === "success" &&
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
                a !== "success" &&
                  i.jsxs("form", {
                    onSubmit: (x) => {
                      v(x);
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
                        onChange: (x) => s(x.target.value),
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
                      a === "error" &&
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
                            disabled: a === "loading",
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
                            disabled: a === "loading" || n.trim().length < 10,
                            style: {
                              background:
                                a === "loading" || n.trim().length < 10
                                  ? "#a0c4f1"
                                  : "#1a73e8",
                              color: "#fff",
                              border: "none",
                              borderRadius: 6,
                              padding: "7px 18px",
                              fontSize: ".875rem",
                              fontWeight: 600,
                              cursor:
                                a === "loading" || n.trim().length < 10
                                  ? "not-allowed"
                                  : "pointer",
                            },
                            children:
                              a === "loading"
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
  const Wv = new m0({
      defaultOptions: { queries: { retry: 1, staleTime: 6e4 } },
    }),
    Wc = (e) =>
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
    Kv = (e) => {
      switch (e) {
        case "inicio":
          return we(() => Promise.resolve().then(() => Yv), void 0);
        case "payment-methods":
          return we(() => Promise.resolve().then(() => ex), void 0);
        case "settings":
          return we(() => Promise.resolve().then(() => nx), void 0);
        case "merchant-center":
          return we(() => Promise.resolve().then(() => gx), void 0);
        case "mis-ventas":
          return we(() => Promise.resolve().then(() => Tx), void 0);
        case "mis-reglas":
          return we(() => Promise.resolve().then(() => Xx), void 0);
        case "seguridad":
          return we(() => Promise.resolve().then(() => ib), void 0);
        case "agentes":
          return we(() => Promise.resolve().then(() => Gm), void 0);
        default:
          return we(() => Promise.resolve().then(() => hb), void 0);
      }
    },
    Hv = ({ initialSection: e, onRegisterNavigate: t }) => {
      const [r, n] = le.useState(
        e ?? Wc(document.getElementById("amcp-root")?.dataset.section)
      );
      le.useEffect(() => {
        t?.(n);
      }, [t]);
      const s = le.lazy(() => Kv(r));
      return i.jsxs(i.Fragment, {
        children: [
          i.jsx(le.Suspense, {
            fallback: i.jsx("div", {
              className: "p-4 text-sm text-gray-500",
              children: "Loading...",
            }),
            children: i.jsx(s, {}),
          }),
          i.jsx(Vv, {}),
        ],
      });
    },
    Bm = (e, t) => {
      const r = t?.section !== void 0 ? Wc(t.section) : void 0;
      (t?.getToken !== void 0 || t?.source !== void 0) &&
        Iv({
          source: t.source ?? "wp-embed",
          baseUrl: t.apiBase,
          getToken: t.getToken ?? (() => Promise.resolve(null)),
        });
      let n = null;
      const s = (o) => {
        n?.(Wc(o));
      };
      Eh(e).render(
        i.jsx(le.StrictMode, {
          children: i.jsx(Bv, {
            children: i.jsx(f0, {
              client: Wv,
              children: i.jsx(Hv, {
                initialSection: r,
                onRegisterNavigate: (o) => {
                  n = o;
                },
              }),
            }),
          }),
        })
      );
      const a = window;
      a.TrusteedEmbed.navigateSection = s;
    };
  window.TrusteedEmbed = { mount: Bm };
  const Kc = document.getElementById("amcp-root");
  Kc !== null && Kc.dataset.autoMount !== "false" && Bm(Kc);
  const Qv = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    Um = (e) => {
      try {
        return Qv.format(new Date(e));
      } catch {
        return e;
      }
    },
    Zv = (e, t, r) =>
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
    Gv = ({ ariaLabel: e }) =>
      i.jsx("div", {
        className: "h-28 animate-pulse rounded-lg bg-gray-100",
        role: "status",
        "aria-label": e,
      }),
    Xi = (e) => {
      const t = window.TrusteedEmbed;
      if (t?.navigateSection) {
        t.navigateSection(e);
        return;
      }
      const r = new URL(window.location.href);
      (r.searchParams.set("page", `amcp-${e}`),
        (window.location.href = r.toString()));
    },
    Yv = Object.freeze(
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
                isError: s,
                error: a,
              } = he({
                queryKey: ["trust-overview-inicio"],
                queryFn: () => re.get("/v1/embed/trust/overview", km),
              }),
              { data: o, isLoading: l } = he({
                queryKey: ["trust-keys-inicio"],
                queryFn: async () => {
                  try {
                    return await re.get("/v1/embed/trust/keys", ha);
                  } catch (x) {
                    if (x instanceof Xt && x.status === 404) return null;
                    throw x;
                  }
                },
                retry: !1,
              }),
              c = r?.score?.status === "ready" ? r.score.score : null,
              u = r?.score?.status ?? "pending",
              d = r?.recentReceipts ?? [],
              h = o ?? null,
              m = r?.computedAt ?? null,
              v = Zv(c, u, e);
            return i.jsxs("div", {
              className: "max-w-4xl space-y-6 p-6",
              children: [
                i.jsx("h1", {
                  className: "text-xl font-semibold text-gray-900",
                  children: e.inicio.title,
                }),
                s &&
                  i.jsxs("div", {
                    className:
                      "rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                    role: "alert",
                    children: [
                      e.inicio.errorLoadingSummary,
                      " ",
                      a instanceof Error ? a.message : e.common.errorUnknown,
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
                        ? i.jsx(Gv, { ariaLabel: e.inicio.scoreAriaLoading })
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
                                      background: v.bg,
                                      border: `4px solid ${v.color}`,
                                    },
                                    className:
                                      "flex shrink-0 flex-col items-center justify-center rounded-full",
                                    children: [
                                      i.jsx("span", {
                                        style: {
                                          fontSize: 28,
                                          fontWeight: 800,
                                          color: v.color,
                                          lineHeight: 1,
                                        },
                                        children: u === "ready" ? c : "—",
                                      }),
                                      i.jsx("span", {
                                        style: {
                                          fontSize: 10,
                                          color: v.color,
                                          fontWeight: 600,
                                        },
                                        children: u === "ready" ? "/ 100" : "…",
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
                                            children: v.emoji,
                                          }),
                                          i.jsx("span", {
                                            style: { color: v.color },
                                            className: "text-lg font-bold",
                                            children: v.label,
                                          }),
                                        ],
                                      }),
                                      i.jsx("p", {
                                        className: "text-sm text-gray-500",
                                        children: v.desc,
                                      }),
                                      m &&
                                        i.jsx("p", {
                                          className:
                                            "mt-1 text-xs text-gray-400",
                                          children: e.inicio.updatedAt.replace(
                                            "{{date}}",
                                            Um(m)
                                          ),
                                        }),
                                    ],
                                  }),
                                ],
                              }),
                              u === "ready" &&
                                c !== null &&
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
                                          left: `calc(${c}% - 8px)`,
                                          borderColor: v.color,
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
                                    onClick: () => Xi("trust-center"),
                                    className:
                                      "rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800",
                                    children: e.inicio.manageReputation,
                                  }),
                                  i.jsx("button", {
                                    onClick: () => Xi("seguridad"),
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
                          : h
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
                                      h.activeKid &&
                                        i.jsxs("p", {
                                          className:
                                            "mt-1 text-xs text-gray-400",
                                          children: [
                                            e.inicio.securityActiveKey.replace(
                                              "{{kid}}",
                                              h.activeKid
                                            ),
                                            (h.retiredGraceKids?.length ?? 0) >
                                              0 &&
                                              ` · ${e.inicio.securityGraceKeys.replace("{{count}}", String(h.retiredGraceKids.length))}`,
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
                                        onClick: () => Xi("trust-center"),
                                        className:
                                          "mt-2 rounded-md bg-green-700 px-4 py-2 text-sm font-semibold text-white hover:bg-green-800",
                                        children: e.inicio.securityActivate,
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
                          : d.length === 0
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
                                      children: d.map((x) =>
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
                                                  x.id.slice(0, 8),
                                                ],
                                              }),
                                              i.jsx("td", {
                                                className: "px-4 py-3",
                                                children: i.jsx("span", {
                                                  className:
                                                    "rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700",
                                                  children:
                                                    t[x.bucket] ?? x.bucket,
                                                }),
                                              }),
                                              i.jsxs("td", {
                                                className:
                                                  "px-4 py-3 font-mono text-xs text-gray-400",
                                                children: [
                                                  "#",
                                                  x.agentId.slice(0, 12),
                                                ],
                                              }),
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-gray-500",
                                                children: Um(x.createdAt),
                                              }),
                                            ],
                                          },
                                          x.id
                                        )
                                      ),
                                    }),
                                  ],
                                }),
                              }),
                        i.jsx("div", {
                          className: "mt-4",
                          children: i.jsx("button", {
                            onClick: () => Xi("mis-ventas"),
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
    Xv = {
      pending: "bg-yellow-100 text-yellow-800",
      active: "bg-green-100 text-green-800",
      error: "bg-red-100 text-red-800",
      disabled: "bg-gray-100 text-gray-500",
    },
    Jv = ({ toast: e, onDismiss: t, closeLabel: r }) =>
      i.jsxs("div", {
        role: "status",
        "aria-live": "polite",
        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${e.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
        children: [
          i.jsx("span", { children: e.message }),
          i.jsx("button", {
            onClick: () => t(e.id),
            className: "ml-4 text-white opacity-80 hover:opacity-100",
            "aria-label": r,
            children: "✕",
          }),
        ],
      }),
    ex = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = Nr(),
              r = N.useRef(null),
              [n, s] = N.useState(null),
              [a, o] = N.useState([]),
              l = N.useRef(0),
              c = {
                pending: e.paymentMethods.statePending,
                active: e.paymentMethods.stateActive,
                error: e.paymentMethods.stateError,
                disabled: e.paymentMethods.stateDisabled,
              },
              u = N.useCallback((g, b) => {
                const j = ++l.current;
                (o((_) => [..._, { id: j, message: g, type: b }]),
                  setTimeout(() => {
                    o((_) => _.filter((C) => C.id !== j));
                  }, 5e3));
              }, []),
              d = N.useCallback((g) => {
                o((b) => b.filter((j) => j.id !== g));
              }, []),
              {
                data: h,
                isLoading: m,
                isError: v,
                error: x,
              } = he({
                queryKey: ["payment-methods"],
                queryFn: () => re.get("/v1/merchant/payment-methods", pv),
              }),
              k = sn({
                mutationFn: (g) =>
                  re.post(`/v1/merchant/payment-methods/${g}/rotate`, {}, hv),
                onSuccess: () => {
                  (u(e.paymentMethods.rotateSuccess, "success"),
                    t.invalidateQueries({ queryKey: ["payment-methods"] }));
                },
                onError: (g) => {
                  const b =
                    g instanceof Error
                      ? g.message
                      : e.paymentMethods.rotateErrorFallback;
                  u(b, "error");
                },
              }),
              M = N.useCallback((g) => {
                (s(g), r.current?.showModal());
              }, []),
              y = N.useCallback(() => {
                (n !== null && k.mutate(n), r.current?.close(), s(null));
              }, [n, k]),
              p = N.useCallback(() => {
                (r.current?.close(), s(null));
              }, []);
            return i.jsxs("div", {
              className: "p-6 max-w-4xl",
              children: [
                i.jsx("div", {
                  className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
                  "aria-label": e.common.notifications,
                  children: a.map((g) =>
                    i.jsx(
                      Jv,
                      {
                        toast: g,
                        onDismiss: d,
                        closeLabel: e.paymentMethods.closeNotification,
                      },
                      g.id
                    )
                  ),
                }),
                i.jsxs("dialog", {
                  ref: r,
                  className:
                    "rounded-lg border border-gray-200 p-6 shadow-xl backdrop:bg-black/40 w-80",
                  "aria-labelledby": "dialog-title",
                  "aria-describedby": "dialog-desc",
                  children: [
                    i.jsx("h3", {
                      id: "dialog-title",
                      className: "mb-2 text-lg font-semibold text-gray-900",
                      children: e.paymentMethods.dialogTitle,
                    }),
                    i.jsx("p", {
                      id: "dialog-desc",
                      className: "mb-6 text-sm text-gray-600",
                      children: e.paymentMethods.dialogDesc,
                    }),
                    i.jsxs("div", {
                      className: "flex justify-end gap-3",
                      children: [
                        i.jsx("button", {
                          onClick: p,
                          className:
                            "rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
                          children: e.paymentMethods.cancelBtn,
                        }),
                        i.jsx("button", {
                          onClick: y,
                          disabled: k.isPending,
                          className:
                            "rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60",
                          children: k.isPending
                            ? e.paymentMethods.rotating
                            : e.paymentMethods.confirmBtn,
                        }),
                      ],
                    }),
                  ],
                }),
                i.jsxs("div", {
                  className:
                    "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                  children: [
                    i.jsx("h2", {
                      className: "mb-4 text-xl font-semibold text-gray-900",
                      children: e.paymentMethods.title,
                    }),
                    m &&
                      i.jsx("div", {
                        className: "space-y-3",
                        role: "status",
                        "aria-label": e.paymentMethods.ariaLoading,
                        children: Array.from({ length: 3 }).map((g, b) =>
                          i.jsx(
                            "div",
                            {
                              className:
                                "h-16 animate-pulse rounded bg-gray-100",
                            },
                            b
                          )
                        ),
                      }),
                    v &&
                      i.jsxs("div", {
                        className:
                          "rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                        role: "alert",
                        children: [
                          e.paymentMethods.errorLoading,
                          " ",
                          x instanceof Error
                            ? x.message
                            : e.common.errorUnknown,
                        ],
                      }),
                    !m &&
                      !v &&
                      h &&
                      i.jsx(i.Fragment, {
                        children:
                          h.items.length === 0
                            ? i.jsx("p", {
                                className: "text-sm text-gray-500",
                                children: e.paymentMethods.noMethods,
                              })
                            : i.jsx("ul", {
                                className: "divide-y divide-gray-100",
                                "aria-label": e.paymentMethods.listAriaLabel,
                                children: h.items.map((g) =>
                                  i.jsxs(
                                    "li",
                                    {
                                      className:
                                        "flex items-center justify-between py-4",
                                      children: [
                                        i.jsxs("div", {
                                          className: "flex-1 min-w-0 pr-4",
                                          children: [
                                            i.jsx("p", {
                                              className:
                                                "font-medium text-gray-900 truncate",
                                              children: g.label,
                                            }),
                                            i.jsx("p", {
                                              className:
                                                "text-xs text-gray-400 mt-0.5",
                                              children: g.type,
                                            }),
                                            g.errorReason !== null &&
                                              i.jsx("p", {
                                                className:
                                                  "text-xs text-red-600 mt-0.5",
                                                children: g.errorReason,
                                              }),
                                          ],
                                        }),
                                        i.jsxs("div", {
                                          className:
                                            "flex items-center gap-3 flex-shrink-0",
                                          children: [
                                            i.jsx("span", {
                                              className: `rounded-full px-2 py-0.5 text-xs font-medium ${Xv[g.state] ?? "bg-gray-100 text-gray-500"}`,
                                              children: c[g.state] ?? g.state,
                                            }),
                                            (g.actions ?? []).includes(
                                              "rotate"
                                            ) &&
                                              i.jsx("button", {
                                                onClick: () => M(g.id),
                                                disabled: k.isPending,
                                                className:
                                                  "rounded border border-gray-300 px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50 disabled:opacity-60",
                                                "aria-label":
                                                  e.paymentMethods.rotateBtnLabel.replace(
                                                    "{{label}}",
                                                    g.label
                                                  ),
                                                children:
                                                  e.paymentMethods.rotateBtn,
                                              }),
                                          ],
                                        }),
                                      ],
                                    },
                                    g.id
                                  )
                                ),
                              }),
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
    tx = T({
      fallbackMode: ie(["strict", "balanced", "permissive"]).default(
        "balanced"
      ),
    }),
    rx = () =>
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
    nx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = Nr(),
              [r, n] = N.useState(null),
              [s, a] = N.useState(null),
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
              c = he({
                queryKey: ["merchant-checkout-config"],
                queryFn: () => re.get("/v1/embed/merchant/checkout/config", Am),
              }),
              u = he({
                queryKey: ["merchant-config"],
                queryFn: () => re.get("/v1/embed/merchant/config", tx),
              }),
              [d, h] = N.useState(null),
              m = d ?? u.data?.fallbackMode ?? "balanced",
              v = o.find((p) => p.value === m)?.hint ?? "",
              x = sn({
                mutationFn: (p) =>
                  re.put(
                    "/v1/embed/merchant/config",
                    { fallbackMode: p },
                    pa()
                  ),
                onMutate: (p) => {
                  (h(p), n(null), a(null));
                },
                onSuccess: () => {
                  (n(e.settings.configSaved),
                    t.invalidateQueries({ queryKey: ["merchant-config"] }),
                    setTimeout(() => n(null), 4e3));
                },
                onError: (p) => {
                  (a(
                    `${e.settings.errorSavingConfig} ${p instanceof Error ? p.message : e.common.errorUnknown}`
                  ),
                    h(null));
                },
              }),
              k = c.data,
              M = new Set(
                (k?.rules ?? []).filter((p) => p.enabled).map((p) => p.rail)
              ),
              y =
                (k?.railsPriority?.length ?? 0) > 0
                  ? (k?.railsPriority ?? [])
                  : (k?.rules ?? []).map((p) => p.rail);
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
                        s &&
                          i.jsx("div", {
                            className:
                              "rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                            role: "alert",
                            children: s,
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
                                  disabled: x.isPending,
                                  onChange: (p) => x.mutate(p.target.value),
                                  className:
                                    "w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-60",
                                  children: o.map((p) =>
                                    i.jsx(
                                      "option",
                                      { value: p.value, children: p.label },
                                      p.value
                                    )
                                  ),
                                }),
                                v &&
                                  i.jsx("p", {
                                    className: "text-xs text-gray-500",
                                    children: v,
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
                          ? i.jsx(rx, {})
                          : y.length === 0
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
                                  y.map((p, g) => {
                                    const b = k?.rules.find(
                                        (_) => _.rail === p
                                      ),
                                      j = M.has(p);
                                    return i.jsxs(
                                      "div",
                                      {
                                        className:
                                          "flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm",
                                        children: [
                                          i.jsx("span", {
                                            className:
                                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-500",
                                            children: g + 1,
                                          }),
                                          i.jsxs("div", {
                                            className: "flex-1",
                                            children: [
                                              i.jsx("p", {
                                                className:
                                                  "text-sm font-medium text-gray-800",
                                                children: l[p] ?? p,
                                              }),
                                              i.jsxs("p", {
                                                className:
                                                  "text-xs text-gray-400",
                                                children: [
                                                  j
                                                    ? e.settings
                                                        .paymentRailEnabled
                                                    : e.settings
                                                        .paymentRailDisabled,
                                                  b?.minAmount != null &&
                                                    ` · ${e.settings.paymentRailMin.replace("{{amount}}", String(b.minAmount))}`,
                                                  b?.maxAmount != null &&
                                                    ` · ${e.settings.paymentRailMax.replace("{{amount}}", String(b.maxAmount))}`,
                                                  (b?.currencyAllowlist
                                                    ?.length ?? 0) > 0 &&
                                                    ` · ${e.settings.paymentRailCurrencies.replace("{{currencies}}", b.currencyAllowlist.join(", "))}`,
                                                ],
                                              }),
                                            ],
                                          }),
                                        ],
                                      },
                                      p
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
    sx = T({
      id_shop: q().int().positive(),
      allowed_shops: Y(q().int().positive()),
      all_shops: Ie(),
    }),
    ax = () => re.get("/v1/embed/merchant/shops", sx),
    ix = ({ onShopChange: e }) => {
      const t = xe(),
        {
          data: r,
          isLoading: n,
          isError: s,
        } = he({
          queryKey: ["embed-merchant-shops"],
          queryFn: ax,
          staleTime: 300 * 1e3,
        });
      if (n)
        return i.jsx("div", {
          className: "h-8 w-36 animate-pulse rounded bg-gray-100",
        });
      if (s || !r || (!r.all_shops && r.allowed_shops.length <= 1)) return null;
      const a = r.all_shops
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
            children: a.map((o) =>
              i.jsx("option", { value: o.id, children: o.label }, o.id)
            ),
          }),
        ],
      });
    },
    ox = le.lazy(() => we(() => Promise.resolve().then(() => bb), void 0)),
    lx = le.lazy(() => we(() => Promise.resolve().then(() => Rb), void 0)),
    cx = le.lazy(() => we(() => Promise.resolve().then(() => Gm), void 0)),
    ux = le.lazy(() => we(() => Promise.resolve().then(() => Eb), void 0)),
    dx = le.lazy(() => we(() => Promise.resolve().then(() => Ib), void 0)),
    px = {
      "#orders": "orders",
      "#payments": "payments",
      "#agents": "agents",
      "#checkout": "checkout",
      "#cert-nlweb": "cert-nlweb",
    },
    hx = {
      orders: "#orders",
      payments: "#payments",
      agents: "#agents",
      checkout: "#checkout",
      "cert-nlweb": "#cert-nlweb",
    },
    qm = (e) => px[e] ?? "orders",
    mx = ({ active: e, onChange: t, tabs: r, ariaLabel: n }) =>
      i.jsx("nav", {
        className: "flex flex-wrap border-b border-gray-200",
        role: "tablist",
        "aria-label": n,
        children: r.map((s) =>
          i.jsx(
            "button",
            {
              role: "tab",
              "aria-selected": e === s.id,
              onClick: () => t(s.id),
              className: `px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${e === s.id ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: s.label,
            },
            s.id
          )
        ),
      }),
    fx = ({ loading: e }) =>
      i.jsx("div", { className: "p-6 text-sm text-gray-500", children: e }),
    gx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(qm(window.location.hash)),
              [n, s] = N.useState(void 0),
              a = [
                { id: "orders", label: e.merchantCenter.tabOrders },
                { id: "payments", label: e.merchantCenter.tabPayments },
                { id: "agents", label: e.merchantCenter.tabAgents },
                { id: "checkout", label: e.merchantCenter.tabCheckout },
                { id: "cert-nlweb", label: e.merchantCenter.tabCertNlweb },
              ];
            N.useEffect(() => {
              const c = () => {
                r(qm(window.location.hash));
              };
              return (
                window.addEventListener("hashchange", c),
                () => window.removeEventListener("hashchange", c)
              );
            }, []);
            const o = N.useCallback((c) => {
                (r(c), window.history.replaceState(null, "", hx[c]));
              }, []),
              l = N.useCallback((c) => {
                s(c);
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
                    i.jsx(ix, { onShopChange: l }),
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
                i.jsx(mx, {
                  active: t,
                  onChange: o,
                  tabs: a,
                  ariaLabel: e.merchantCenter.tabsAriaLabel,
                }),
                i.jsxs(N.Suspense, {
                  fallback: i.jsx(fx, { loading: e.merchantCenter.loading }),
                  children: [
                    t === "orders" && i.jsx(ox, {}),
                    t === "payments" && i.jsx(lx, {}),
                    t === "agents" && i.jsx(cx, {}),
                    t === "checkout" && i.jsx(ux, {}),
                    t === "cert-nlweb" && i.jsx(dx, {}),
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
    yx = le.lazy(() => we(() => Promise.resolve().then(() => $b), void 0)),
    vx = le.lazy(() => we(() => Promise.resolve().then(() => Qb), void 0)),
    xx = le.lazy(() => we(() => Promise.resolve().then(() => Xb), void 0)),
    bx = le.lazy(() => we(() => Promise.resolve().then(() => ow), void 0)),
    wx = { "#ventas-ia": "receipts", "#claves": "keys", "#auditoria": "audit" },
    kx = {
      orders: "",
      receipts: "#ventas-ia",
      keys: "#claves",
      audit: "#auditoria",
    },
    $m = (e) => wx[e] ?? "orders",
    Sx = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    Cx = (e) => {
      try {
        return Sx.format(new Date(e));
      } catch {
        return e;
      }
    },
    _x = {
      SHOPIFY: "bg-blue-100 text-blue-700",
      WOO: "bg-orange-100 text-orange-700",
      ACP: "bg-purple-100 text-purple-700",
    },
    jx = {
      paid: "bg-green-100 text-green-700",
      fulfilled: "bg-teal-100 text-teal-700",
      cancelled: "bg-red-100 text-red-700",
      created: "bg-gray-100 text-gray-600",
      updated: "bg-gray-100 text-gray-600",
      refunded: "bg-yellow-100 text-yellow-700",
    },
    Vm = ({ label: e, classes: t }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t}`,
        children: e,
      }),
    Nx = ({ cols: e }) =>
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
    Rx = ({ active: e, onChange: t, tabs: r, ariaLabel: n }) =>
      i.jsx("nav", {
        className: "flex border-b border-gray-200",
        role: "tablist",
        "aria-label": n,
        children: r.map((s) =>
          i.jsx(
            "button",
            {
              role: "tab",
              "aria-selected": e === s.id,
              onClick: () => t(s.id),
              className: `px-5 py-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 ${e === s.id ? "border-b-2 border-blue-600 text-blue-700" : "text-gray-500 hover:text-gray-700"}`,
              children: s.label,
            },
            s.id
          )
        ),
      }),
    Ax = (e) => {
      const t = new URLSearchParams({ limit: "25" });
      return (
        e !== null && t.set("cursor", e),
        `/v1/embed/merchant/orders?${t.toString()}`
      );
    },
    Ex = () => {
      const e = xe(),
        [t, r] = N.useState(null),
        [n, s] = N.useState([]),
        a = {
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
        l = Ax(t),
        c = he({
          queryKey: ["mis-ventas-orders", t],
          queryFn: () => re.get(l, jm),
          placeholderData: (d) => d,
        });
      le.useEffect(() => {
        c.data?.items &&
          s(
            t === null
              ? c.data.items
              : (d) => {
                  const h = new Set(d.map((m) => m.id));
                  return [
                    ...d,
                    ...(c.data?.items ?? []).filter((m) => !h.has(m.id)),
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
            ? i.jsxs("div", {
                className: "flex items-center gap-4",
                children: [
                  i.jsx("span", { className: "text-3xl", children: "🛒" }),
                  i.jsxs("div", {
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
                ],
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
                          Array.from({ length: 5 }).map((d, h) =>
                            i.jsx(Nx, { cols: 6 }, h)
                          ),
                        u.map((d) =>
                          i.jsxs(
                            "tr",
                            {
                              className: "hover:bg-gray-50",
                              children: [
                                i.jsxs("td", {
                                  className:
                                    "px-4 py-3 font-mono text-xs text-gray-400",
                                  children: ["#", d.externalOrderId],
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3",
                                  children: i.jsx(Vm, {
                                    label: a[d.platform] ?? d.platform,
                                    classes:
                                      _x[d.platform] ??
                                      "bg-gray-100 text-gray-600",
                                  }),
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3",
                                  children: i.jsx(Vm, {
                                    label: o[d.status] ?? d.status,
                                    classes:
                                      jx[d.status] ??
                                      "bg-gray-100 text-gray-600",
                                  }),
                                }),
                                i.jsxs("td", {
                                  className:
                                    "px-4 py-3 font-semibold text-gray-800",
                                  children: [
                                    d.total.amount,
                                    " ",
                                    d.total.currency,
                                  ],
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3 text-xs text-gray-400",
                                  children: d.agentId
                                    ? e.misVentas.buyerAuto.replace(
                                        "{{id}}",
                                        d.agentId.slice(0, 8)
                                      )
                                    : e.misVentas.buyerHuman,
                                }),
                                i.jsx("td", {
                                  className: "px-4 py-3 text-gray-500",
                                  children: Cx(d.createdAt),
                                }),
                              ],
                            },
                            d.id
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
    Tx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState($m(window.location.hash)),
              [n, s] = N.useState(null),
              a = [
                { id: "orders", label: e.misVentas.tabOrders },
                { id: "receipts", label: e.misVentas.tabReceipts },
                { id: "keys", label: e.misVentas.tabKeys },
                { id: "audit", label: e.misVentas.tabAudit },
              ];
            N.useEffect(() => {
              const l = () => {
                r($m(window.location.hash));
              };
              return (
                window.addEventListener("hashchange", l),
                () => window.removeEventListener("hashchange", l)
              );
            }, []);
            const o = N.useCallback((l) => {
              r(l);
              const c = kx[l];
              (window.history.replaceState(
                null,
                "",
                c === "" ? window.location.pathname : c
              ),
                s(null));
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
                i.jsx(Rx, {
                  active: t,
                  onChange: o,
                  tabs: a,
                  ariaLabel: e.misVentas.tabsAriaLabel,
                }),
                i.jsxs(N.Suspense, {
                  fallback: i.jsx("div", {
                    className: "p-6 text-sm text-gray-500",
                    children: e.trustCenter.loading,
                  }),
                  children: [
                    t === "orders" && i.jsx(Ex, {}),
                    t === "receipts" && i.jsx(yx, { onSelect: s }),
                    t === "keys" && i.jsx(xx, {}),
                    t === "audit" && i.jsx(bx, {}),
                  ],
                }),
                n !== null &&
                  i.jsx(N.Suspense, {
                    fallback: null,
                    children: i.jsx(vx, { receipt: n, onClose: () => s(null) }),
                  }),
              ],
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    );
  function Px(e) {
    return e
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t.length > 0);
  }
  function Ox(e) {
    return Array.isArray(e) ? e.map((t) => String(t)).join(", ") : "";
  }
  const Lx = ({
      ruleCode: e,
      value: t,
      onChange: r,
      disabled: n,
      error: s,
      meta: a,
    }) => {
      const o = xe(),
        l = N.useCallback(
          (h, m) => {
            const v = { ...t };
            (m == null || m === "" ? delete v[h] : (v[h] = m), r(v));
          },
          [t, r]
        );
      if (!a || a.fields.length === 0) return null;
      const c = o.misReglas.params ?? {},
        u = (h) => c[h] ?? h,
        d = (h) => {
          const m = t[h.name],
            v = `amcp-param-${e}-${h.name}`;
          switch (h.type) {
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
                      checked: m === !0,
                      disabled: n,
                      onChange: (x) => l(h.name, x.target.checked || void 0),
                    }),
                    i.jsx("span", { children: u(h.labelKey) }),
                  ],
                },
                h.name
              );
            case "number":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: u(h.labelKey) }),
                    i.jsx("input", {
                      id: v,
                      type: "number",
                      value: typeof m == "number" ? m : "",
                      disabled: n,
                      min: h.min,
                      max: h.max,
                      placeholder: h.placeholder,
                      onChange: (x) => {
                        const k = x.target.value;
                        if (k === "") return l(h.name, void 0);
                        const M = Number(k);
                        Number.isNaN(M) || l(h.name, M);
                      },
                      style: { width: 160 },
                    }),
                  ],
                },
                h.name
              );
            case "enum":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: u(h.labelKey) }),
                    i.jsxs("select", {
                      id: v,
                      value: typeof m == "string" ? m : "",
                      disabled: n,
                      onChange: (x) => l(h.name, x.target.value || void 0),
                      style: { width: 220 },
                      children: [
                        i.jsx("option", { value: "", children: "—" }),
                        h.options?.map((x) =>
                          i.jsx("option", { value: x, children: x }, x)
                        ),
                      ],
                    }),
                  ],
                },
                h.name
              );
            case "string-array":
            case "country-array":
            case "payment-method-array":
              return i.jsxs(
                "label",
                {
                  htmlFor: v,
                  style: { display: "flex", flexDirection: "column", gap: 4 },
                  children: [
                    i.jsx("span", { children: u(h.labelKey) }),
                    i.jsx("input", {
                      id: v,
                      type: "text",
                      value: Ox(m),
                      disabled: n,
                      placeholder: h.placeholder ?? "value1, value2",
                      onChange: (x) => {
                        const k = Px(x.target.value);
                        l(h.name, k.length > 0 ? k : void 0);
                      },
                      style: { width: 320 },
                    }),
                    i.jsx("small", {
                      style: { color: "#666" },
                      children:
                        o.misReglas.paramsCsvHint ?? "Comma-separated values",
                    }),
                  ],
                },
                h.name
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
            children: o.misReglas.paramsTitle ?? "Parameters",
          }),
          a.fields.map((h) => d(h)),
          a.requiredAnyOf
            ? i.jsx("small", {
                style: { color: "#646970" },
                children:
                  o.misReglas.paramsRequiredHint ??
                  `At least one of: ${a.requiredAnyOf.join(", ")}`,
              })
            : null,
          s
            ? i.jsx("div", {
                role: "alert",
                style: { color: "#b32d2e", fontSize: 12 },
                children: s,
              })
            : null,
        ],
      });
    },
    Mx = w()
      .trim()
      .length(2)
      .transform((e) => e.toUpperCase()),
    Wm = w()
      .trim()
      .min(1)
      .transform((e) => e.toLowerCase()),
    Dx = w().trim().min(1),
    Km = T({}).strict(),
    Hc = {
      R001: {
        schema: T({
          requireAgentId: Ie().optional(),
          merchantTier: ie(["standard", "high"]).optional(),
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
        schema: T({
          maxKeyAgeHours: q().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "maxKeyAgeHours",
            type: "number",
            labelKey: "R004.maxKeyAgeHours",
            min: 0,
          },
        ],
      },
      R005: { schema: Km, fields: [] },
      R007: { schema: Km, fields: [] },
      R009: {
        schema: T({ requireAgentId: Ie().optional() }).strict(),
        fields: [
          {
            name: "requireAgentId",
            type: "boolean",
            labelKey: "R009.requireAgentId",
          },
        ],
      },
      R010: {
        schema: T({ minCompletedOrders: q().int().min(1).optional() }).strict(),
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
        schema: T({ categories: Y(Dx).optional() }).strict(),
        fields: [
          {
            name: "categories",
            type: "string-array",
            labelKey: "R012.categories",
            placeholder: "electronics, jewelry",
          },
        ],
        requiredAnyOf: ["categories"],
      },
      R014: {
        schema: T({
          highRiskCountries: Y(Mx).optional(),
          maxCancellations: q().int().nonnegative().optional(),
          windowDays: q().int().positive().optional(),
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
      },
      R015: {
        schema: T({ maxDeltaBps: q().int().nonnegative().optional() }).strict(),
        fields: [
          {
            name: "maxDeltaBps",
            type: "number",
            labelKey: "R015.maxDeltaBps",
            min: 0,
          },
        ],
      },
      R016: {
        schema: T({ minStock: q().int().nonnegative().optional() }).strict(),
        fields: [
          {
            name: "minStock",
            type: "number",
            labelKey: "R016.minStock",
            min: 0,
          },
        ],
      },
      R018: {
        schema: T({
          spikeMultiplier: q().positive().optional(),
          merchantAvgOrderCents: q().int().positive().optional(),
          maxItemCount: q().int().positive().optional(),
          maxSingleSkuQty: q().int().positive().optional(),
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
        schema: T({
          minCompletedOrders: q().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "minCompletedOrders",
            type: "number",
            labelKey: "R021.minCompletedOrders",
            min: 0,
          },
        ],
      },
      R022: {
        schema: T({
          allowedPaymentMethods: Y(Wm).optional(),
          blockedPaymentMethods: Y(Wm).optional(),
        }).strict(),
        fields: [
          {
            name: "allowedPaymentMethods",
            type: "payment-method-array",
            labelKey: "R022.allowedPaymentMethods",
            placeholder: "card, paypal",
          },
          {
            name: "blockedPaymentMethods",
            type: "payment-method-array",
            labelKey: "R022.blockedPaymentMethods",
            placeholder: "crypto",
          },
        ],
        requiredAnyOf: ["allowedPaymentMethods", "blockedPaymentMethods"],
      },
      R023: {
        schema: T({
          windowDays: q().int().positive().optional(),
          maxRatio: q().min(0).max(1).optional(),
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
      },
      R024: {
        schema: T({
          windowDays: q().int().positive().optional(),
          maxDisputes: q().int().nonnegative().optional(),
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
      },
      R025: {
        schema: T({
          blockPoBox: Ie().optional(),
          blockFreightForwarder: Ie().optional(),
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
        schema: T({ requireConsent: Ie().optional() }).strict(),
        fields: [
          {
            name: "requireConsent",
            type: "boolean",
            labelKey: "R026.requireConsent",
          },
        ],
      },
      R027: {
        schema: T({
          maxStoredValueCents: q().int().nonnegative().optional(),
        }).strict(),
        fields: [
          {
            name: "maxStoredValueCents",
            type: "number",
            labelKey: "R027.maxStoredValueCents",
            min: 0,
          },
        ],
      },
      R028: {
        schema: T({ requirePurchaseOrder: Ie().optional() }).strict(),
        fields: [
          {
            name: "requirePurchaseOrder",
            type: "boolean",
            labelKey: "R028.requirePurchaseOrder",
          },
        ],
      },
    },
    Ix = T({
      name: w(),
      type: ie([
        "boolean",
        "number",
        "enum",
        "string-array",
        "country-array",
        "payment-method-array",
      ]),
      labelKey: w(),
      helpKey: w().optional(),
      min: q().optional(),
      max: q().optional(),
      options: Y(w()).optional(),
      placeholder: w().optional(),
    }),
    Fx = T({
      ruleCode: w(),
      prefix: w(),
      fields: Y(Ix),
      requiredAnyOf: Y(w()).optional(),
      platformAvailability: rs(T({ status: w(), reason: w().optional() }))
        .nullable()
        .optional(),
    }),
    zx = T({ rules: Y(Fx), version: q() }),
    Bx = /^(R\d{3})/;
  function Ux(e) {
    const t = Bx.exec(e.trim().toUpperCase());
    return t ? t[1] : null;
  }
  const qx = {
    "wp-embed": "woocommerce",
    "ps-embed": "prestashop",
    "odoo-embed": "odoo",
    "magento-embed": "magento",
    "shopify-embed": "shopify",
  };
  function $x() {
    return {
      ready: !0,
      source: "fallback",
      ruleCodes: Object.keys(Hc),
      metaByPrefix: Hc,
    };
  }
  function Vx(e) {
    const t = {};
    for (const r of e)
      t[r.prefix] = {
        schema: Hc[r.prefix]?.schema ?? void 0,
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
  function Wx() {
    const e = Dv(),
      t = qx[e] ?? "woocommerce",
      r = he({
        queryKey: ["rule-params-meta", t],
        queryFn: () =>
          re.get(
            `/v1/public/rule-params-meta?platform=${encodeURIComponent(t)}`,
            zx
          ),
        staleTime: 3600 * 1e3,
        gcTime: 1440 * 60 * 1e3,
        retry: 1,
      });
    return r.data && Array.isArray(r.data.rules) && r.data.rules.length > 0
      ? Vx(r.data.rules)
      : $x();
  }
  function Hm(e, t) {
    const r = Ux(t);
    return r ? (e.metaByPrefix[r] ?? null) : null;
  }
  function Qm(e, t, r) {
    const n = Hm(e, t);
    return n?.requiredAnyOf
      ? n.requiredAnyOf.some((a) => {
          const o = r?.[a];
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
  const Kx = {
      identity: "🪪",
      behavior: "👁️",
      transaction: "💳",
      postsale: "📦",
      general: "⚙️",
    },
    Hx = T({
      id: w().optional(),
      storeId: w().optional(),
      ruleCode: w(),
      enabled: Ie(),
      params: rs(pa()).optional().nullable(),
      mode: w().optional(),
    }),
    Qx = T({ rules: Y(Hx), activeCount: q() }),
    Zx = T({
      rule: T({
        ruleCode: w(),
        enabled: Ie(),
        params: rs(pa()).optional().nullable(),
      }),
    }),
    Zm = [
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
    ],
    Gx = Zm.map((e) => ({ ruleCode: e, enabled: !1 })),
    Yx = ({
      rule: e,
      stat: t,
      onToggle: r,
      onSaveParams: n,
      isPending: s,
      t: a,
      metaState: o,
    }) => {
      const l = Hm(o, e.ruleCode),
        c = e.params ?? {},
        [u, d] = N.useState(c),
        [h, m] = N.useState(null),
        v = JSON.stringify(c);
      le.useEffect(() => {
        (d(c), m(null));
      }, [v, e.ruleCode]);
      const x = JSON.stringify(u) !== v,
        k = e.ruleCode.match(/^(R\d{3})/)?.[1] ?? null,
        y = a.misReglas.rulesMeta[e.ruleCode],
        p = y
          ? { ...y, helpUrl: k ? `${a.misReglas.helpBase}#${k}` : "" }
          : {
              title: e.ruleCode,
              description: "",
              helpUrl: k ? `${a.misReglas.helpBase}#${k}` : "",
            },
        g = e.optimisticEnabled ?? e.enabled,
        b = t?.blockedCount ?? 0,
        j = t?.failOpenCount ?? 0;
      return i.jsxs("div", {
        className: "flex items-start gap-4 border-b border-gray-100 py-4",
        style: { opacity: s ? 0.6 : 1 },
        children: [
          i.jsx("button", {
            type: "button",
            role: "switch",
            "aria-checked": g,
            disabled: s,
            onClick: () => {
              const _ = !g;
              if (_) {
                const C = Qm(o, e.ruleCode, u);
                if (!C.ok) {
                  m(
                    (a.misReglas.paramsRequiredError ??
                      "Required parameter missing:") +
                      " " +
                      (C.requiredAnyOf ?? []).join(" / ")
                  );
                  return;
                }
              }
              (m(null), r(e.ruleCode, _, u));
            },
            className:
              "relative mt-0.5 h-6 w-11 shrink-0 rounded-full border-none transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed",
            style: { background: g ? "#1a7f4f" : "#d1d5db" },
            "aria-label": g
              ? a.misReglas.toggleAriaActive
              : a.misReglas.toggleAriaInactive,
            children: i.jsx("span", {
              className:
                "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all",
              style: { left: g ? "22px" : "2px" },
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
                    children: p.title,
                  }),
                  g
                    ? i.jsx("span", {
                        className:
                          "rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700",
                        children: a.misReglas.ruleActive,
                      })
                    : i.jsx("span", {
                        className:
                          "rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-500",
                        children: a.misReglas.ruleInactive,
                      }),
                  b > 0 &&
                    i.jsx("span", {
                      className:
                        "rounded-full bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700",
                      children: a.misReglas.blockedLast7d.replace(
                        "{{count}}",
                        String(b)
                      ),
                    }),
                  j > 0 &&
                    b === 0 &&
                    i.jsx("span", {
                      className:
                        "rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700",
                      children: a.misReglas.failOpenLast7d.replace(
                        "{{count}}",
                        String(j)
                      ),
                    }),
                ],
              }),
              i.jsx("p", {
                className: "text-sm text-gray-500",
                children: p.description,
              }),
              p.helpUrl &&
                i.jsx("a", {
                  href: p.helpUrl,
                  target: "_blank",
                  rel: "noopener noreferrer",
                  className:
                    "mt-1 inline-block text-xs text-blue-600 hover:text-blue-800 underline",
                  children: a.misReglas.helpLinkLabel,
                }),
              l && l.fields.length > 0
                ? i.jsxs(i.Fragment, {
                    children: [
                      i.jsx(Lx, {
                        ruleCode: e.ruleCode,
                        value: u,
                        onChange: (_) => {
                          (d(_), m(null));
                        },
                        disabled: s,
                        error: h,
                        meta: l,
                      }),
                      x
                        ? i.jsxs("div", {
                            style: { marginTop: 8 },
                            children: [
                              i.jsx("button", {
                                type: "button",
                                className: "button button-primary",
                                disabled: s,
                                onClick: () => {
                                  if (g) {
                                    const _ = Qm(o, e.ruleCode, u);
                                    if (!_.ok) {
                                      m(
                                        (a.misReglas.paramsRequiredError ??
                                          "Required parameter missing:") +
                                          " " +
                                          (_.requiredAnyOf ?? []).join(" / ")
                                      );
                                      return;
                                    }
                                  }
                                  (m(null), n(e.ruleCode, u, g));
                                },
                                children:
                                  a.misReglas.paramsSaveBtn ??
                                  "Save parameters",
                              }),
                              i.jsx("button", {
                                type: "button",
                                className: "button",
                                style: { marginLeft: 8 },
                                disabled: s,
                                onClick: () => {
                                  (d(c), m(null));
                                },
                                children: a.misReglas.paramsResetBtn ?? "Reset",
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
    Xx = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = Nr(),
              [r, n] = N.useState([]),
              s = N.useRef(0),
              [a, o] = N.useState(new Set()),
              [l, c] = N.useState({}),
              u = Wx(),
              d = N.useMemo(() => new Set(u.ruleCodes), [u.ruleCodes]),
              h = N.useCallback((S, A) => {
                const $ = ++s.current;
                (n((O) => [...O, { id: $, message: S, type: A }]),
                  setTimeout(
                    () => n((O) => O.filter((ye) => ye.id !== $)),
                    5e3
                  ));
              }, []),
              m = he({
                queryKey: ["merchant-rules"],
                queryFn: () => re.get("/v1/embed/merchant/rules", Qx),
              }),
              v = he({
                queryKey: ["merchant-stats-7d"],
                queryFn: () =>
                  re.get(
                    "/v1/embed/merchant/stats?window=7",
                    T({ stats: Y(dm()) }).optional()
                  ),
              }),
              x = sn({
                mutationFn: ({ ruleCode: S, enabled: A, params: $ }) =>
                  re.put(
                    `/v1/embed/merchant/rules/${encodeURIComponent(S)}`,
                    $ !== void 0 ? { enabled: A, params: $ } : { enabled: A },
                    Zx
                  ),
                onMutate: ({ ruleCode: S, enabled: A }) => {
                  (o(($) => new Set([...$, S])), c(($) => ({ ...$, [S]: A })));
                },
                onSuccess: (S, { ruleCode: A }) => {
                  (h(
                    S.rule.enabled
                      ? e.misReglas.ruleActivatedMsg
                      : e.misReglas.ruleDeactivatedMsg,
                    "success"
                  ),
                    c(($) => ({ ...$, [A]: S.rule.enabled })),
                    t.invalidateQueries({ queryKey: ["merchant-rules"] }));
                },
                onError: (S, { ruleCode: A }) => {
                  (h(e.misReglas.ruleChangeError, "error"),
                    c(($) => {
                      const O = { ...$ };
                      return (delete O[A], O);
                    }));
                },
                onSettled: (S, A, { ruleCode: $ }) => {
                  o((O) => {
                    const ye = new Set(O);
                    return (ye.delete($), ye);
                  });
                },
              }),
              M = (m.data?.rules ?? (m.isError ? Gx : [])).filter((S) => {
                const A = S.ruleCode.match(/^(R\d{3})/);
                return A ? d.has(A[1]) : !1;
              }),
              y = M.filter((S) =>
                l[S.ruleCode] !== void 0 ? l[S.ruleCode] : S.enabled
              ).length,
              p = (S) => {
                const A = M.find(($) => $.ruleCode === S);
                return A ? (l[S] !== void 0 ? l[S] : A.enabled) : !1;
              },
              g =
                p("R001.verified-agent-required") &&
                p("R009.agent-verification-required"),
              b =
                !p("R001.verified-agent-required") &&
                p("R002.signature-spoof-block"),
              j = v.data?.stats ?? [],
              _ = Object.fromEntries(j.map((S) => [S.ruleCode, S])),
              C = [
                "identity",
                "behavior",
                "transaction",
                "postsale",
                "general",
              ],
              P = {};
            for (const S of C) P[S] = [];
            for (const S of M) {
              const A = e.misReglas.rulesMeta[S.ruleCode]?.category ?? "other";
              (P[A] || (P[A] = []), P[A].push(S));
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
                g &&
                  i.jsx("div", {
                    role: "alert",
                    className:
                      "rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                    children:
                      "R009 será shadow (mismo veredicto que R001 — first-match-wins). Activa CEL_AUDIT_ALL_MATCHES para telemetría separada.",
                  }),
                b &&
                  i.jsx("div", {
                    role: "alert",
                    className:
                      "rounded border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800",
                    children:
                      "R001 está OFF y R002 sólo bloquea tokens inválidos presentados. Activa R001 o configura R002.requireTokenPresent para exigir token en todas las solicitudes.",
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
                            className: `rounded-full px-2.5 py-0.5 text-xs font-medium ${y > 0 ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`,
                            children: e.misReglas.activeCountLabel
                              .replace("{{active}}", String(y))
                              .replace("{{total}}", String(Zm.length)),
                          }),
                        }),
                      ],
                    }),
                    i.jsx("div", {
                      className: "px-6 py-4",
                      children: m.isLoading
                        ? Array.from({ length: 4 }).map((S, A) =>
                            i.jsx(
                              "div",
                              {
                                className:
                                  "mb-4 h-16 animate-pulse rounded-lg bg-gray-100",
                              },
                              A
                            )
                          )
                        : C.map((S) => {
                            const A = P[S] ?? [];
                            if (A.length === 0) return null;
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
                                      i.jsx("span", { children: Kx[S] }),
                                      $,
                                    ],
                                  }),
                                  A.map((O) =>
                                    i.jsx(
                                      Yx,
                                      {
                                        rule: {
                                          ...O,
                                          optimisticEnabled: l[O.ruleCode],
                                        },
                                        metaState: u,
                                        stat: _[O.ruleCode] ?? null,
                                        onToggle: (ye, Nt, wa) =>
                                          x.mutate({
                                            ruleCode: ye,
                                            enabled: Nt,
                                            params: wa,
                                          }),
                                        onSaveParams: (ye, Nt, wa) =>
                                          x.mutate({
                                            ruleCode: ye,
                                            enabled: wa,
                                            params: Nt,
                                          }),
                                        isPending: a.has(O.ruleCode),
                                        t: e,
                                      },
                                      O.ruleCode
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
    Jx = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    eb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "long",
      timeZone: "UTC",
    }),
    tb = (e) => {
      try {
        return Jx.format(new Date(e));
      } catch {
        return e;
      }
    },
    rb = (e) => {
      if (!e) return "—";
      try {
        return eb.format(new Date(e));
      } catch {
        return e;
      }
    },
    nb = {
      "shopify-embed": "bg-green-50 text-green-700",
      "wp-embed": "bg-blue-50 text-blue-700",
      portal: "bg-gray-100 text-gray-700",
      api: "bg-yellow-50 text-yellow-700",
      mcp: "bg-purple-50 text-purple-700",
      webhook: "bg-orange-50 text-orange-700",
    },
    sb = () =>
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
    ab = (e) => {
      const t = new URLSearchParams({ limit: "25" });
      return (
        e !== null && t.set("cursor", e),
        `/v1/embed/trust/audit?${t.toString()}`
      );
    },
    ib = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(null),
              [n, s] = N.useState([]),
              a = {
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
              l = he({
                queryKey: ["trust-keys-seguridad"],
                queryFn: () => re.get("/v1/embed/trust/keys", ha),
              }),
              c = ab(t),
              u = he({
                queryKey: ["trust-audit-seguridad", t],
                queryFn: () => re.get(c, bm),
                placeholderData: (v) => v,
              });
            le.useEffect(() => {
              u.data?.items &&
                s(
                  t === null
                    ? u.data.items
                    : (v) => {
                        const x = new Set(v.map((k) => k.id));
                        return [
                          ...v,
                          ...(u.data?.items ?? []).filter((k) => !x.has(k.id)),
                        ];
                      }
                );
            }, [u.data, t]);
            const d = n.length > 0 ? n : (u.data?.items ?? []),
              h = u.data?.chainIntegrity ?? null,
              m = l.data;
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
                                              ` (${rb(m.lastRotatedAt)})`,
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
                        h &&
                          i.jsxs("div", {
                            className: `mb-4 rounded border px-4 py-3 text-sm ${h.verified ? "border-green-300 bg-green-50 text-green-800" : "border-yellow-300 bg-yellow-50 text-yellow-800"}`,
                            children: [
                              h.verified
                                ? e.seguridad.chainOk
                                : e.seguridad.chainBroken,
                              h.note && ` ${h.note}`,
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
                        !u.isError && d.length === 0 && !u.isLoading
                          ? i.jsxs("div", {
                              className: "flex items-center gap-4",
                              children: [
                                i.jsx("span", {
                                  className: "text-3xl",
                                  children: "📋",
                                }),
                                i.jsxs("div", {
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
                              ],
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
                                        (u.isFetching && d.length === 0)) &&
                                        Array.from({ length: 5 }).map((v, x) =>
                                          i.jsx(sb, {}, x)
                                        ),
                                      d.map((v) =>
                                        i.jsxs(
                                          "tr",
                                          {
                                            className: "hover:bg-gray-50",
                                            children: [
                                              i.jsx("td", {
                                                className:
                                                  "px-4 py-3 text-gray-500",
                                                children: tb(v.createdAt),
                                              }),
                                              i.jsx("td", {
                                                className: "px-4 py-3",
                                                children: i.jsx("span", {
                                                  className: `rounded-full px-2 py-0.5 text-xs font-medium ${nb[v.source] ?? "bg-gray-100 text-gray-600"}`,
                                                  children:
                                                    a[v.source] ?? v.source,
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
    ob = {
      allow: "bg-green-100 text-green-700",
      probation: "bg-yellow-100 text-yellow-700",
      block: "bg-red-100 text-red-700",
      pending: "bg-gray-100 text-gray-500",
    },
    lb = { allow: "✅", probation: "👁️", block: "🚫", pending: "⏳" },
    cb = () =>
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
    ub = ({
      agent: e,
      isPending: t,
      onRevoke: r,
      onProbation: n,
      onAllow: s,
      t: a,
    }) => {
      const o = e.agenticTrustScore,
        l =
          o === null
            ? a.merchantAgentsPanel.noData
            : o >= 80
              ? a.merchantAgentsPanel.trustVeryReliable
              : o >= 50
                ? a.merchantAgentsPanel.trustAcceptable
                : a.merchantAgentsPanel.trustLow,
        c =
          o === null
            ? "#8c9196"
            : o >= 80
              ? "#1a7f4f"
              : o >= 50
                ? "#b27400"
                : "#c0392b",
        u = {
          allow: a.merchantAgentsPanel.stateCanBuy,
          probation: a.merchantAgentsPanel.stateWatching,
          block: a.merchantAgentsPanel.stateBanned,
          pending: a.merchantAgentsPanel.statePending,
        },
        d = e.state;
      return i.jsxs("tr", {
        className: "hover:bg-gray-50",
        children: [
          i.jsxs("td", {
            className: "px-4 py-3",
            children: [
              i.jsx("div", {
                className: "font-medium text-gray-800",
                children:
                  e.displayName ?? a.merchantAgentsPanel.defaultAgentName,
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
              className: `rounded-full px-2 py-0.5 text-xs font-medium ${ob[d] ?? "bg-gray-100 text-gray-500"}`,
              children: [lb[d] ?? "", " ", u[d] ?? d],
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
                    children: a.merchantAgentsPanel.noData,
                  }),
          }),
          i.jsxs("td", {
            className: "px-4 py-3 text-sm text-gray-600",
            children: [
              i.jsx("div", {
                children: a.merchantAgentsPanel.callsLast30d.replace(
                  "{{count}}",
                  String(e.callsLast30d ?? 0)
                ),
              }),
              i.jsx("div", {
                className: "text-xs text-gray-400",
                children: a.merchantAgentsPanel.callsLast30dSuffix,
              }),
            ],
          }),
          i.jsx("td", {
            className: "px-4 py-3",
            children: i.jsxs("div", {
              className: "flex flex-col gap-1.5",
              children: [
                d !== "block" &&
                  i.jsx("button", {
                    onClick: r,
                    disabled: t,
                    className:
                      "w-full rounded border border-red-200 bg-red-50 px-2 py-1 text-left text-xs font-semibold text-red-700 hover:bg-red-100 disabled:opacity-60",
                    children: a.merchantAgentsPanel.revokeBtn,
                  }),
                (d === "allow" || d === "block") &&
                  i.jsx("button", {
                    onClick: n,
                    disabled: t,
                    className:
                      "w-full rounded border border-yellow-200 bg-yellow-50 px-2 py-1 text-left text-xs font-semibold text-yellow-700 hover:bg-yellow-100 disabled:opacity-60",
                    children: a.merchantAgentsPanel.probationBtn,
                  }),
                (d === "block" || d === "probation" || d === "pending") &&
                  i.jsx("button", {
                    onClick: s,
                    disabled: t,
                    className:
                      "w-full rounded border border-green-200 bg-green-50 px-2 py-1 text-left text-xs font-semibold text-green-700 hover:bg-green-100 disabled:opacity-60",
                    children: a.merchantAgentsPanel.allowBtn,
                  }),
              ],
            }),
          }),
        ],
      });
    },
    Gm = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = Nr(),
              [r, n] = N.useState([]),
              s = N.useRef(0),
              [a, o] = N.useState(new Set()),
              l = N.useCallback((b, j) => {
                const _ = ++s.current;
                (n((C) => [...C, { id: _, message: b, type: j }]),
                  setTimeout(() => n((C) => C.filter((P) => P.id !== _)), 5e3));
              }, []),
              {
                data: c,
                isLoading: u,
                isError: d,
                error: h,
              } = he({
                queryKey: ["merchant-agents"],
                queryFn: () => re.get("/v1/embed/merchant/agents", fv),
              }),
              m = (b, j) =>
                sn({
                  mutationFn: (_) =>
                    re.post(
                      `/v1/embed/merchant/agents/${encodeURIComponent(_)}/${b}`,
                      { reason: `${b} vía WP Admin` },
                      yv
                    ),
                  onMutate: (_) => {
                    o((C) => new Set([...C, _]));
                  },
                  onSuccess: (_, C) => {
                    (l(j, "success"),
                      o((P) => {
                        const S = new Set(P);
                        return (S.delete(C), S);
                      }),
                      t.invalidateQueries({ queryKey: ["merchant-agents"] }));
                  },
                  onError: (_, C) => {
                    (o((P) => {
                      const S = new Set(P);
                      return (S.delete(C), S);
                    }),
                      l(
                        _ instanceof Error
                          ? _.message
                          : e.merchantAgentsPanel.toastError,
                        "error"
                      ));
                  },
                }),
              v = m("revoke", e.merchantAgentsPanel.toastRevoked),
              x = m("probation", e.merchantAgentsPanel.toastProbation),
              k = m("allow", e.merchantAgentsPanel.toastAllowed),
              M = c?.items ?? [],
              y = M.filter((b) => b.state === "allow").length,
              p = M.filter((b) => b.state === "probation").length,
              g = M.filter((b) => b.state === "block").length;
            return i.jsxs("div", {
              className: "p-6 max-w-5xl",
              children: [
                i.jsx("div", {
                  className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
                  "aria-label": e.merchantAgentsPanel.notifications,
                  children: r.map((b) =>
                    i.jsxs(
                      "div",
                      {
                        role: "status",
                        "aria-live": "polite",
                        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${b.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: [
                          i.jsx("span", { children: b.message }),
                          i.jsx("button", {
                            onClick: () =>
                              n((j) => j.filter((_) => _.id !== b.id)),
                            className: "ml-4 opacity-80 hover:opacity-100",
                            "aria-label": e.common.closeNotification,
                            children: "✕",
                          }),
                        ],
                      },
                      b.id
                    )
                  ),
                }),
                i.jsx("p", {
                  className: "mb-4 text-sm text-gray-500",
                  children: e.merchantAgentsPanel.description,
                }),
                d &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.merchantAgentsPanel.errorLoading,
                      " ",
                      h instanceof Error ? h.message : e.common.errorUnknown,
                    ],
                  }),
                !u &&
                  M.length > 0 &&
                  i.jsxs("div", {
                    className:
                      "mb-4 flex gap-6 rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm",
                    children: [
                      i.jsxs("div", {
                        className: "text-center",
                        children: [
                          i.jsx("div", {
                            className: "text-2xl font-bold text-green-700",
                            children: y,
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
                            children: p,
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
                            children: g,
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
                            Array.from({ length: 4 }).map((b, j) =>
                              i.jsx(cb, {}, j)
                            ),
                          !u &&
                            M.map((b) =>
                              i.jsx(
                                ub,
                                {
                                  agent: b,
                                  isPending: a.has(b.agentId),
                                  onRevoke: () => v.mutate(b.agentId),
                                  onProbation: () => x.mutate(b.agentId),
                                  onAllow: () => k.mutate(b.agentId),
                                  t: e,
                                },
                                b.id
                              )
                            ),
                          !u &&
                            M.length === 0 &&
                            !d &&
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
    db = le.lazy(() => we(() => Promise.resolve().then(() => dw), void 0)),
    pb = ({ loading: e }) =>
      i.jsx("div", { className: "p-6 text-sm text-gray-500", children: e }),
    hb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe();
            return i.jsx("div", {
              className: "max-w-5xl",
              children: i.jsx(N.Suspense, {
                fallback: i.jsx(pb, { loading: e.trustCenter.loading }),
                children: i.jsx(db, {}),
              }),
            });
          },
        },
        Symbol.toStringTag,
        { value: "Module" }
      )
    ),
    mb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    fb = (e) => {
      try {
        return mb.format(new Date(e));
      } catch {
        return e;
      }
    },
    gb = {
      SHOPIFY: "bg-blue-100 text-blue-700",
      WOO: "bg-orange-100 text-orange-700",
      ACP: "bg-purple-100 text-purple-700",
    },
    yb = {
      paid: "bg-green-100 text-green-700",
      fulfilled: "bg-teal-100 text-teal-700",
      cancelled: "bg-red-100 text-red-700",
      pending: "bg-gray-100 text-gray-600",
      created: "bg-gray-100 text-gray-600",
      updated: "bg-gray-100 text-gray-600",
      refunded: "bg-yellow-100 text-yellow-700",
    },
    Ym = ({ label: e, classes: t }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t}`,
        children: e,
      }),
    vb = () =>
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
    xb = (e) => {
      const t = new URLSearchParams({ limit: "20" });
      return (
        e !== null && t.set("cursor", e),
        `/v1/embed/merchant/orders?${t.toString()}`
      );
    },
    bb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(null),
              [n, s] = N.useState([]),
              a = xb(t),
              {
                data: o,
                isLoading: l,
                isError: c,
                error: u,
              } = he({
                queryKey: ["merchant-orders", t],
                queryFn: () => re.get(a, jm),
                placeholderData: (h) => h,
              });
            le.useEffect(() => {
              o?.items &&
                s(
                  t === null
                    ? o.items
                    : (h) => {
                        const m = new Set(h.map((v) => v.id));
                        return [...h, ...o.items.filter((v) => !m.has(v.id))];
                      }
                );
            }, [o, t]);
            const d = n.length > 0 ? n : (o?.items ?? []);
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
                            Array.from({ length: 5 }).map((h, m) =>
                              i.jsx(vb, {}, m)
                            ),
                          !l &&
                            d.map((h) =>
                              i.jsxs(
                                "tr",
                                {
                                  className: "hover:bg-gray-50",
                                  children: [
                                    i.jsx("td", {
                                      className: "px-4 py-3",
                                      children: i.jsx(Ym, {
                                        label: h.platform,
                                        classes:
                                          gb[h.platform] ??
                                          "bg-gray-100 text-gray-700",
                                      }),
                                    }),
                                    i.jsx("td", {
                                      className:
                                        "px-4 py-3 font-mono text-xs text-gray-700",
                                      children:
                                        h.externalOrderId.length > 16
                                          ? `${h.externalOrderId.slice(0, 16)}…`
                                          : h.externalOrderId,
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-3",
                                      children: i.jsx(Ym, {
                                        label: h.status,
                                        classes:
                                          yb[h.status] ??
                                          "bg-gray-100 text-gray-600",
                                      }),
                                    }),
                                    i.jsxs("td", {
                                      className: "px-4 py-3 text-gray-700",
                                      children: [
                                        h.total.amount,
                                        " ",
                                        h.total.currency,
                                      ],
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-3 text-gray-500",
                                      children: fb(h.createdAt),
                                    }),
                                  ],
                                },
                                h.id
                              )
                            ),
                          !l &&
                            d.length === 0 &&
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
    wb = T({
      id: w(),
      name: w(),
      category: w(),
      maturity: ie(["GA", "COMING_SOON"]),
      status: w(),
      enabled: Ie(),
      connectFlow: w(),
      description: w(),
      lastHealthAt: w().nullable(),
      lastError: w().nullable(),
    }),
    kb = T({ items: Y(wb) }),
    Xm = dm(),
    Sb = {
      CONECTADO: "bg-green-100 text-green-700",
      PENDIENTE: "bg-yellow-100 text-yellow-700",
      ERROR: "bg-red-100 text-red-700",
      DESACTIVADO: "bg-gray-100 text-gray-500",
      DISPONIBLE: "bg-gray-100 text-gray-500",
    },
    Cb = () => {
      const [e, t] = N.useState([]),
        r = N.useRef(0),
        n = N.useCallback((a, o) => {
          const l = ++r.current;
          (t((c) => [...c, { id: l, message: a, type: o }]),
            setTimeout(() => t((c) => c.filter((u) => u.id !== l)), 5e3));
        }, []),
        s = N.useCallback((a) => t((o) => o.filter((l) => l.id !== a)), []);
      return { toasts: e, add: n, remove: s };
    },
    Jm = ({ methodId: e, connectFlow: t, onDone: r, onError: n, t: s }) => {
      const [a, o] = N.useState(""),
        l = Nr(),
        c = sn({
          mutationFn: () => {
            const u =
              t === "apiKey"
                ? { flow: "apiKey", apiKey: a }
                : { flow: "wallet", walletAddress: a };
            return re.post(
              `/v1/embed/merchant/payment-methods/${encodeURIComponent(e)}/connect`,
              u,
              Xm
            );
          },
          onSuccess: () => {
            (o(""), l.invalidateQueries({ queryKey: ["pm-catalog"] }), r());
          },
          onError: (u) => {
            n(u instanceof Error ? u.message : s.common.error);
          },
        });
      return i.jsxs("form", {
        onSubmit: (u) => {
          (u.preventDefault(), a.trim() && c.mutate());
        },
        className: "mt-3 flex gap-2",
        children: [
          i.jsx("input", {
            type: t === "apiKey" ? "password" : "text",
            value: a,
            onChange: (u) => o(u.target.value),
            placeholder:
              t === "apiKey"
                ? s.merchantPaymentMethods.connectApiKey
                : s.merchantPaymentMethods.connectWallet,
            required: !0,
            className:
              "min-w-0 flex-1 rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
            "aria-label":
              t === "apiKey"
                ? s.merchantPaymentMethods.connectApiKey
                : s.merchantPaymentMethods.connectWallet,
          }),
          i.jsx("button", {
            type: "submit",
            disabled: c.isPending || !a.trim(),
            className:
              "shrink-0 rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60",
            children: c.isPending
              ? s.merchantPaymentMethods.connecting
              : s.merchantPaymentMethods.connectBtn,
          }),
        ],
      });
    },
    _b = ({ method: e, onSuccess: t, onError: r, t: n }) => {
      const s = Nr(),
        a = (d) =>
          sn({
            mutationFn: () =>
              re.post(
                `/v1/embed/merchant/payment-methods/${encodeURIComponent(e.id)}/${d}`,
                {},
                Xm
              ),
            onSuccess: () => {
              s.invalidateQueries({ queryKey: ["pm-catalog"] });
              const h = {
                disconnect: n.merchantPaymentMethods.actionDisconnected,
                enable: n.merchantPaymentMethods.actionEnabled,
                disable: n.merchantPaymentMethods.actionDisabled,
              };
              t(h[d] ?? n.merchantPaymentMethods.actionConnected);
            },
            onError: (h) => {
              r(
                h instanceof Error
                  ? h.message
                  : n.merchantPaymentMethods.actionError
              );
            },
          }),
        o = a("disconnect"),
        l = a("enable"),
        c = a("disable"),
        u = o.isPending || l.isPending || c.isPending;
      return e.status === "DISPONIBLE"
        ? i.jsx(Jm, {
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
                i.jsx(Jm, {
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
    jb = ({ method: e, onSuccess: t, onError: r, t: n }) => {
      const s = {
          CONECTADO: n.merchantPaymentMethods.statusConnected,
          PENDIENTE: n.merchantPaymentMethods.statusVerifying,
          ERROR: n.merchantPaymentMethods.statusError,
          DESACTIVADO: n.merchantPaymentMethods.statusDisabled,
          DISPONIBLE: n.merchantPaymentMethods.statusAvailable,
        },
        a = Sb[e.status] ?? "bg-gray-100 text-gray-500",
        o = s[e.status] ?? e.status;
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
                    children: e.description,
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
                className: `shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${a}`,
                children: o,
              }),
            ],
          }),
          i.jsx(_b, { method: e, onSuccess: t, onError: r, t: n }),
        ],
      });
    },
    Nb = () =>
      i.jsx("div", { className: "h-28 animate-pulse rounded-lg bg-gray-100" }),
    Rb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              { toasts: t, add: r, remove: n } = Cb(),
              {
                data: s,
                isLoading: a,
                isError: o,
                error: l,
              } = he({
                queryKey: ["pm-catalog"],
                queryFn: () =>
                  re.get("/v1/embed/merchant/payment-methods/catalog", kb),
              }),
              c = (s?.items ?? []).filter((d) => d.maturity === "GA"),
              u = (s?.items ?? []).filter((d) => d.maturity === "COMING_SOON");
            return i.jsxs("div", {
              className: "p-6 max-w-3xl",
              children: [
                i.jsx("div", {
                  className: "fixed bottom-4 right-4 z-50 flex flex-col gap-2",
                  children: t.map((d) =>
                    i.jsxs(
                      "div",
                      {
                        role: "status",
                        "aria-live": "polite",
                        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${d.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: [
                          i.jsx("span", { children: d.message }),
                          i.jsx("button", {
                            onClick: () => n(d.id),
                            className: "ml-4 opacity-80 hover:opacity-100",
                            "aria-label": e.merchantPaymentMethods.closeBtn,
                            children: "✕",
                          }),
                        ],
                      },
                      d.id
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
                (a || c.length > 0) &&
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
                          a &&
                            Array.from({ length: 4 }).map((d, h) =>
                              i.jsx(Nb, {}, h)
                            ),
                          !a &&
                            c.map((d) =>
                              i.jsx(
                                jb,
                                {
                                  method: d,
                                  onSuccess: (h) => r(h, "success"),
                                  onError: (h) => r(h, "error"),
                                  t: e,
                                },
                                d.id
                              )
                            ),
                        ],
                      }),
                    ],
                  }),
                !a &&
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
                        children: u.map((d) =>
                          i.jsxs(
                            "div",
                            {
                              className:
                                "rounded-lg border border-dashed border-gray-200 bg-gray-50 p-4 opacity-70",
                              children: [
                                i.jsx("p", {
                                  className: "font-medium text-gray-700",
                                  children: d.name,
                                }),
                                i.jsx("p", {
                                  className: "mt-0.5 text-xs text-gray-400",
                                  children: d.description,
                                }),
                                i.jsx("p", {
                                  className: "mt-2 text-xs text-gray-400",
                                  children:
                                    e.merchantPaymentMethods.comingSoonLabel,
                                }),
                              ],
                            },
                            d.id
                          )
                        ),
                      }),
                    ],
                  }),
                !a &&
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
    Ab = {
      "stripe-connect": "Stripe Connect",
      x402: "x402",
      acp: "ACP",
      paypal: "PayPal",
      eidas: "eIDAS",
    },
    Eb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              {
                data: t,
                isLoading: r,
                isError: n,
                error: s,
              } = he({
                queryKey: ["merchant-checkout-config"],
                queryFn: () => re.get("/v1/embed/merchant/checkout/config", Am),
              }),
              a = new Set(
                (t?.rules ?? []).filter((l) => l.enabled).map((l) => l.rail)
              ),
              o = t?.railsPriority ?? [
                "stripe-connect",
                "x402",
                "acp",
                "paypal",
                "eidas",
              ];
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
                      s instanceof Error ? s.message : e.common.errorUnknown,
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
                      const c = a.has(l);
                      return i.jsxs(
                        "li",
                        {
                          className:
                            "flex items-center justify-between rounded-lg border border-gray-200 bg-white px-4 py-3 shadow-sm",
                          children: [
                            i.jsx("span", {
                              className: "font-medium text-gray-800",
                              children: Ab[l] ?? l,
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
    Tb = {
      active: "bg-green-100 text-green-700",
      expiring_soon: "bg-yellow-100 text-yellow-700",
      expired: "bg-red-100 text-red-700",
      pending: "bg-gray-100 text-gray-500",
      not_applicable: "bg-gray-50 text-gray-400",
    },
    Pb = {
      idle: "bg-gray-100 text-gray-600",
      indexing: "bg-blue-100 text-blue-700",
      error: "bg-red-100 text-red-700",
      never_indexed: "bg-gray-50 text-gray-400",
    },
    Ob = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    ef = (e) => {
      if (e === null) return "—";
      try {
        return Ob.format(new Date(e));
      } catch {
        return e;
      }
    },
    ss = ({ title: e, children: t }) =>
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
    Qc = ({ label: e, classes: t }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t}`,
        children: e,
      }),
    Zc = () =>
      i.jsx("div", { className: "h-40 animate-pulse rounded-lg bg-gray-100" }),
    Lb = ({ t: e }) => {
      const {
        data: t,
        isLoading: r,
        isError: n,
      } = he({
        queryKey: ["merchant-certification"],
        queryFn: () => re.get("/v1/embed/merchant/certification", xv),
      });
      if (r) return i.jsx(Zc, {});
      if (n)
        return i.jsx(ss, {
          title: e.merchantCertNlweb.certTitle,
          children: i.jsx("p", {
            className: "text-sm text-red-600",
            children: e.merchantCertNlweb.errorCert,
          }),
        });
      const s = [
        { key: "eidas", label: "eIDAS" },
        { key: "kyc", label: "KYC" },
        { key: "schemaOrg", label: "Schema.org" },
      ];
      return i.jsx(ss, {
        title: e.merchantCertNlweb.certTitle,
        children: i.jsx("ul", {
          className: "space-y-3",
          children: s.map(({ key: a, label: o }) => {
            const l = t?.[a];
            return i.jsxs(
              "li",
              {
                className: "flex items-center justify-between",
                children: [
                  i.jsx("span", {
                    className: "text-sm text-gray-700",
                    children: o,
                  }),
                  i.jsx(Qc, {
                    label: l?.status ?? "—",
                    classes: Tb[l?.status ?? ""] ?? "bg-gray-100 text-gray-500",
                  }),
                ],
              },
              a
            );
          }),
        }),
      });
    },
    Mb = ({ onToast: e, t }) => {
      const {
          data: r,
          isLoading: n,
          isError: s,
        } = he({
          queryKey: ["merchant-nlweb-status"],
          queryFn: () => re.get("/v1/embed/merchant/nlweb/status", Sv),
        }),
        a = sn({
          mutationFn: () => re.post("/v1/embed/merchant/nlweb/reindex", {}, Cv),
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
        ? i.jsx(Zc, {})
        : s
          ? i.jsx(ss, {
              title: t.merchantCertNlweb.nlwebTitle,
              children: i.jsx("p", {
                className: "text-sm text-red-600",
                children: t.merchantCertNlweb.errorNlweb,
              }),
            })
          : i.jsxs(ss, {
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
                        i.jsx(Qc, {
                          label: r?.status ?? "—",
                          classes:
                            Pb[r?.status ?? ""] ?? "bg-gray-100 text-gray-500",
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
                          children: ef(r?.lastIndexedAt ?? null),
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
                  onClick: () => a.mutate(),
                  disabled: a.isPending || r?.status === "indexing",
                  className:
                    "mt-4 rounded bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700 disabled:opacity-60",
                  children: a.isPending
                    ? t.merchantCertNlweb.nlwebReindexing
                    : t.merchantCertNlweb.nlwebReindex,
                }),
              ],
            });
    },
    Db = ({ t: e }) => {
      const {
        data: t,
        isLoading: r,
        isError: n,
      } = he({
        queryKey: ["merchant-webmcp"],
        queryFn: () => re.get("/v1/embed/merchant/webmcp", wv),
      });
      return r
        ? i.jsx(Zc, {})
        : n
          ? i.jsx(ss, {
              title: e.merchantCertNlweb.webmcpTitle,
              children: i.jsx("p", {
                className: "text-sm text-red-600",
                children: e.merchantCertNlweb.errorWebmcp,
              }),
            })
          : i.jsx(ss, {
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
                      i.jsx(Qc, {
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
                        children: ef(t?.bridgeLastSeenAt ?? null),
                      }),
                    ],
                  }),
                ],
              }),
            });
    },
    Ib = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState([]),
              n = N.useRef(0),
              s = N.useCallback((a, o) => {
                const l = ++n.current;
                (r((c) => [...c, { id: l, message: a, type: o }]),
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
                  children: t.map((a) =>
                    i.jsxs(
                      "div",
                      {
                        role: "status",
                        "aria-live": "polite",
                        className: `flex items-center justify-between rounded-lg px-4 py-3 text-sm shadow-md ${a.type === "success" ? "bg-green-600 text-white" : "bg-red-600 text-white"}`,
                        children: [
                          i.jsx("span", { children: a.message }),
                          i.jsx("button", {
                            onClick: () =>
                              r((o) => o.filter((l) => l.id !== a.id)),
                            className: "ml-4 opacity-80 hover:opacity-100",
                            "aria-label": e.merchantCertNlweb.closeNotification,
                            children: "✕",
                          }),
                        ],
                      },
                      a.id
                    )
                  ),
                }),
                i.jsxs("div", {
                  className: "flex flex-col gap-4",
                  children: [
                    i.jsx(Lb, { t: e }),
                    i.jsx(Mb, { onToast: s, t: e }),
                    i.jsx(Db, { t: e }),
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
    Fb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    zb = (e) => {
      try {
        return Fb.format(new Date(e));
      } catch {
        return e;
      }
    },
    Bb = {
      discovery: "bg-blue-50 text-blue-700",
      customer: "bg-purple-50 text-purple-700",
      checkout: "bg-green-50 text-green-700",
    },
    Ub = () =>
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
    qb = (e, t, r, n, s) => {
      const a = new URLSearchParams();
      return (
        a.set("limit", "20"),
        e && a.set("agentId", e),
        t !== "todos" && a.set("bucket", t),
        r && a.set("from", new Date(r).toISOString()),
        n && a.set("to", new Date(n).toISOString()),
        s && a.set("cursor", s),
        `/v1/embed/trust/receipts?${a.toString()}`
      );
    },
    $b = Object.freeze(
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
                  className: `rounded-full px-2 py-0.5 text-xs font-medium ${Bb[S] ?? "bg-gray-100 text-gray-700"}`,
                  children: r[S] ?? S,
                }),
              [s, a] = N.useState(""),
              [o, l] = N.useState("todos"),
              [c, u] = N.useState(""),
              [d, h] = N.useState(""),
              [m, v] = N.useState(null),
              [x, k] = N.useState([]),
              M = qb(s, o, c, d, m),
              {
                data: y,
                isLoading: p,
                isError: g,
                error: b,
              } = he({
                queryKey: ["trust-receipts", s, o, c, d, m],
                queryFn: () => re.get(M, tv),
                placeholderData: (S) => S,
              }),
              j = N.useCallback((S, A) => {
                (S(A), v(null), k([]));
              }, []),
              _ = N.useCallback((S) => {
                (l(S), v(null), k([]));
              }, []);
            le.useEffect(() => {
              y?.items &&
                k(
                  m === null
                    ? y.items
                    : (S) => {
                        const A = new Set(S.map((O) => O.id)),
                          $ = y.items.filter((O) => !A.has(O.id));
                        return [...S, ...$];
                      }
                );
            }, [y, m]);
            const C = () => {
                y?.nextCursor && v(y.nextCursor);
              },
              P = x.length > 0 ? x : (y?.items ?? []);
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
                      value: s,
                      onChange: (S) => j(a, S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterBuyerIdAria,
                    }),
                    i.jsxs("select", {
                      value: o,
                      onChange: (S) => _(S.target.value),
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
                      onChange: (S) => j(u, S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterDateFrom,
                    }),
                    i.jsx("input", {
                      type: "date",
                      value: d,
                      onChange: (S) => j(h, S.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": t.trustReceiptsList.filterDateTo,
                    }),
                  ],
                }),
                g &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      t.trustReceiptsList.errorLoading,
                      " ",
                      b instanceof Error ? b.message : t.common.errorUnknown,
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
                          p &&
                            Array.from({ length: 5 }).map((S, A) =>
                              i.jsx(Ub, {}, A)
                            ),
                          !p &&
                            P.map((S) =>
                              i.jsxs(
                                "tr",
                                {
                                  onClick: () => e(S),
                                  className:
                                    "cursor-pointer hover:bg-gray-50 transition-colors",
                                  tabIndex: 0,
                                  onKeyDown: (A) => {
                                    (A.key === "Enter" || A.key === " ") &&
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
                                      children: zb(S.createdAt),
                                    }),
                                  ],
                                },
                                S.id
                              )
                            ),
                          !p &&
                            P.length === 0 &&
                            !g &&
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
                y?.nextCursor &&
                  i.jsx("div", {
                    className: "mt-4 flex justify-center",
                    children: i.jsx("button", {
                      onClick: C,
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
    ),
    Vb = (() => {
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
    Wb = new Intl.DateTimeFormat(Vb, {
      dateStyle: "medium",
      timeStyle: "medium",
      timeZone: "UTC",
    }),
    Kb = (e) => {
      try {
        return `${Wb.format(new Date(e))} UTC`;
      } catch {
        return e;
      }
    },
    Hb = {
      discovery: "bg-blue-50 text-blue-700",
      customer: "bg-purple-50 text-purple-700",
      checkout: "bg-green-50 text-green-700",
    },
    Er = ({ label: e, value: t }) =>
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
    Qb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: ({ receipt: e, onClose: t }) => {
            const r = xe(),
              [n, s] = N.useState(!1),
              [a, o] = N.useState(!1),
              l = N.useRef(null);
            N.useEffect(() => {
              const d = (h) => {
                h.key === "Escape" && t();
              };
              return (
                document.addEventListener("keydown", d),
                () => document.removeEventListener("keydown", d)
              );
            }, [t]);
            const c = N.useCallback(
                (d) => {
                  l.current && !l.current.contains(d.target) && t();
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
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldReceiptId,
                            value: e.id,
                          }),
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldBucket,
                            value: i.jsx("span", {
                              className: `inline-block rounded-full px-2 py-0.5 text-xs font-medium ${Hb[e.bucket] ?? "bg-gray-100 text-gray-700"}`,
                              children: e.bucket,
                            }),
                          }),
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldTool,
                            value: e.tool,
                          }),
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldAgentId,
                            value: e.agentId,
                          }),
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldSigningKey,
                            value: e.signingKeyKid,
                          }),
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldDate,
                            value: Kb(e.createdAt),
                          }),
                          i.jsx(Er, {
                            label: r.trustReceiptDetail.fieldInputHash,
                            value: i.jsx("span", {
                              className: "font-mono text-xs",
                              children: e.inputHash,
                            }),
                          }),
                          i.jsx(Er, {
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
                            onClick: () => s((d) => !d),
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
                      i.jsx("div", {
                        className: "mt-4",
                        children: i.jsx("button", {
                          onClick: () => {
                            u();
                          },
                          className:
                            "rounded border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500",
                          children: a
                            ? r.trustReceiptDetail.copied
                            : r.trustReceiptDetail.copyJwksUrl,
                        }),
                      }),
                    ],
                  }),
                  i.jsx("div", {
                    className: "border-t border-gray-200 px-6 py-4",
                    children: i.jsx("button", {
                      onClick: t,
                      className:
                        "w-full rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500",
                      children: r.trustReceiptDetail.closeBtn,
                    }),
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
    Zb = new Intl.DateTimeFormat("es-ES", {
      dateStyle: "medium",
      timeZone: "UTC",
    }),
    Gb = (e) => {
      if (!e) return "—";
      try {
        return Zb.format(new Date(e));
      } catch {
        return e;
      }
    },
    Yb = ({ ariaLabel: e }) =>
      i.jsx("div", {
        className: "h-24 animate-pulse rounded-lg bg-gray-100",
        role: "status",
        "aria-label": e,
      }),
    Xb = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              {
                data: t,
                isLoading: r,
                isError: n,
                error: s,
              } = he({
                queryKey: ["trust-keys"],
                queryFn: () => re.get("/v1/embed/trust/keys", ha),
              }),
              a = (t?.daysSinceRotation ?? 0) > 90;
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
                r && i.jsx(Yb, { ariaLabel: e.trustKeys.ariaLoading }),
                n &&
                  i.jsxs("div", {
                    className:
                      "rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.trustKeys.errorLoading,
                      " ",
                      s instanceof Error ? s.message : e.common.errorUnknown,
                    ],
                  }),
                t &&
                  i.jsxs(i.Fragment, {
                    children: [
                      a &&
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
                                    children: Gb(t.lastRotatedAt),
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
                                  children: t.retiredGraceKids.map((o) =>
                                    i.jsx(
                                      "tr",
                                      {
                                        className: "hover:bg-gray-50",
                                        children: i.jsx("td", {
                                          className:
                                            "px-5 py-2 font-mono text-gray-700",
                                          children: o,
                                        }),
                                      },
                                      o
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
    Jb = (() => {
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
    ew = new Intl.DateTimeFormat(Jb, {
      dateStyle: "short",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    tw = (e) => {
      try {
        return ew.format(new Date(e));
      } catch {
        return e;
      }
    },
    rw = {
      portal: "bg-gray-100 text-gray-700",
      "shopify-embed": "bg-green-50 text-green-700",
      "wp-embed": "bg-blue-50 text-blue-700",
      api: "bg-yellow-50 text-yellow-700",
      mcp: "bg-purple-50 text-purple-700",
      webhook: "bg-orange-50 text-orange-700",
    },
    nw = ({ source: e }) =>
      i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${rw[e] ?? "bg-gray-100 text-gray-700"}`,
        children: e,
      }),
    sw = ({ outcome: e }) => {
      const t = e === "ok" || e === "success";
      return i.jsx("span", {
        className: `rounded-full px-2 py-0.5 text-xs font-medium ${t ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`,
        children: e,
      });
    },
    aw = () =>
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
    iw = (e, t, r, n, s) => {
      const a = new URLSearchParams();
      return (
        a.set("limit", "20"),
        e && a.set("agentId", e),
        t !== "todos" && a.set("source", t),
        r && a.set("from", new Date(r).toISOString()),
        n && a.set("to", new Date(n).toISOString()),
        s && a.set("cursor", s),
        `/v1/embed/trust/audit?${a.toString()}`
      );
    },
    ow = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              [t, r] = N.useState(""),
              [n, s] = N.useState("todos"),
              [a, o] = N.useState(""),
              [l, c] = N.useState(""),
              [u, d] = N.useState(null),
              [h, m] = N.useState([]),
              v = iw(t, n, a, l, u),
              {
                data: x,
                isLoading: k,
                isError: M,
                error: y,
              } = he({
                queryKey: ["trust-audit", t, n, a, l, u],
                queryFn: () => re.get(v, bm),
                placeholderData: (C) => C,
              }),
              p = N.useCallback((C, P) => {
                (C(P), d(null), m([]));
              }, []),
              g = N.useCallback((C) => {
                (s(C), d(null), m([]));
              }, []);
            le.useEffect(() => {
              x?.items &&
                m(
                  u === null
                    ? x.items
                    : (C) => {
                        const P = new Set(C.map((A) => A.id)),
                          S = x.items.filter((A) => !P.has(A.id));
                        return [...C, ...S];
                      }
                );
            }, [x, u]);
            const b = () => {
                x?.nextCursor && d(x.nextCursor);
              },
              j = h.length > 0 ? h : (x?.items ?? []),
              _ = x?.chainIntegrity;
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
                _ &&
                  i.jsxs("div", {
                    className: `mb-4 flex items-center gap-2 rounded border px-4 py-2 text-sm ${_.verified ? "border-green-300 bg-green-50 text-green-800" : "border-red-300 bg-red-50 text-red-700"}`,
                    role: "status",
                    children: [
                      i.jsx("span", {
                        className: `inline-block h-2 w-2 rounded-full ${_.verified ? "bg-green-500" : "bg-red-500"}`,
                      }),
                      _.verified
                        ? e.trustAuditLog.integrityVerified
                        : e.trustAuditLog.integrityError,
                      _.note &&
                        i.jsxs("span", {
                          className: "ml-2 text-xs opacity-70",
                          children: ["(", _.note, ")"],
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
                      onChange: (C) => p(r, C.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterAgentIdAria,
                    }),
                    i.jsxs("select", {
                      value: n,
                      onChange: (C) => g(C.target.value),
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
                      value: a,
                      onChange: (C) => p(o, C.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterDateFrom,
                    }),
                    i.jsx("input", {
                      type: "date",
                      value: l,
                      onChange: (C) => p(c, C.target.value),
                      className:
                        "rounded border border-gray-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500",
                      "aria-label": e.trustAuditLog.filterDateTo,
                    }),
                  ],
                }),
                M &&
                  i.jsxs("div", {
                    className:
                      "mb-4 rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700",
                    role: "alert",
                    children: [
                      e.trustAuditLog.errorLoading,
                      " ",
                      y instanceof Error ? y.message : e.common.errorUnknown,
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
                          k &&
                            Array.from({ length: 5 }).map((C, P) =>
                              i.jsx(aw, {}, P)
                            ),
                          !k &&
                            j.map((C) =>
                              i.jsxs(
                                "tr",
                                {
                                  className:
                                    "hover:bg-gray-50 transition-colors",
                                  children: [
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-500",
                                      children: tw(C.createdAt),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2",
                                      children: i.jsx(nw, { source: C.source }),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: C.bucket ?? "—",
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: C.tool ?? "—",
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2",
                                      children: i.jsx(sw, {
                                        outcome: C.outcome,
                                      }),
                                    }),
                                    i.jsx("td", {
                                      className: "px-4 py-2 text-gray-700",
                                      children: C.agentId ?? "—",
                                    }),
                                  ],
                                },
                                C.id
                              )
                            ),
                          !k &&
                            j.length === 0 &&
                            !M &&
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
                x?.nextCursor &&
                  i.jsx("div", {
                    className: "mt-4 flex justify-center",
                    children: i.jsx("button", {
                      onClick: b,
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
    Gc = (() => {
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
    lw = new Intl.DateTimeFormat(Gc, {
      dateStyle: "long",
      timeStyle: "short",
      timeZone: "UTC",
    }),
    cw = (e, t) =>
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
    tf = ({ name: e, value: t, weight: r, dataQuality: n, t: s }) => {
      const o = s.trustReceipts.subDim[e] ?? e.replace(/_/g, " "),
        l = n === "not_applicable" || t == null,
        c = l ? null : Math.min(100, Math.max(0, t)),
        u = l ? "⏳" : (c ?? 0) >= 80 ? "✅" : (c ?? 0) >= 50 ? "🟡" : "🔴",
        d = l
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
            children: s.trustReceipts.weightLabel.replace(
              "{{pct}}",
              String(Math.round(r * 100))
            ),
          }),
          i.jsx("span", {
            className: "min-w-[52px] shrink-0 text-right font-bold",
            style: { color: d },
            children: l ? s.trustReceipts.noDataLabel : `${c}/100`,
          }),
        ],
      });
    },
    uw = ({ name: e, dim: t, confidenceLevel: r, t: n }) => {
      const s = {
          merchantReliabilityBase: n.trustReceipts.dimMerchantReliability,
          agenticReadiness: n.trustReceipts.dimAgenticReadiness,
          agenticEvidence: n.trustReceipts.dimAgenticEvidence,
        },
        a = {
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
        c = s[e] ?? "📊 " + e.replace(/_/g, " "),
        u = l >= 80 ? "#007f5f" : l >= 50 ? "#ffc453" : "#d72c0d",
        d = t.subcomponents ? Object.entries(t.subcomponents) : [],
        h = a[e]?.[r] ?? n.trustReceipts.unlockAreaDefault;
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
                  i.jsxs("div", {
                    className:
                      "mb-2 rounded border border-dashed border-gray-300 bg-gray-50 px-3 py-2 text-xs text-gray-500",
                    children: ["🔒 ", h],
                  }),
                  d.length > 0 &&
                    i.jsxs("div", {
                      className:
                        "rounded border border-gray-200 bg-gray-50 px-3 py-2 opacity-50",
                      children: [
                        i.jsx("div", {
                          className:
                            "mb-1 text-xs font-bold uppercase tracking-wide text-gray-400",
                          children: n.trustReceipts.countWillActivate,
                        }),
                        d.map(([m, v]) =>
                          i.jsx(
                            tf,
                            {
                              name: m,
                              value: null,
                              weight: v.weight,
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
                      children: t.recommendations[0],
                    }),
                  d.length > 0 &&
                    i.jsxs("div", {
                      className:
                        "rounded border border-gray-200 bg-gray-50 px-3 py-2",
                      children: [
                        i.jsx("div", {
                          className:
                            "mb-1 text-xs font-bold uppercase tracking-wide text-gray-400",
                          children: n.trustReceipts.measuredNow,
                        }),
                        d.map(([m, v]) =>
                          i.jsx(
                            tf,
                            {
                              name: m,
                              value: v.value,
                              weight: v.weight,
                              dataQuality: v.dataQuality,
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
    dw = Object.freeze(
      Object.defineProperty(
        {
          __proto__: null,
          default: () => {
            const e = xe(),
              t = Uv(),
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
                isLoading: s,
                isError: a,
                error: o,
              } = he({
                queryKey: ["trust-overview"],
                queryFn: () => re.get("/v1/embed/trust/overview", km),
              }),
              { data: l } = he({
                queryKey: ["trust-keys-inicio"],
                queryFn: async () => {
                  try {
                    return await re.get("/v1/embed/trust/keys", ha);
                  } catch (O) {
                    if (O instanceof Xt && O.status === 404) return null;
                    throw O;
                  }
                },
                retry: !1,
              });
            if (s)
              return i.jsx("div", {
                className: "p-6 space-y-3",
                children: Array.from({ length: 3 }).map((O, ye) =>
                  i.jsx(
                    "div",
                    { className: "h-24 animate-pulse rounded-lg bg-gray-100" },
                    ye
                  )
                ),
              });
            if (a)
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
            const { score: c, complianceSummary: u, computedAt: d } = n,
              h = c.status === "ready" || c.status === "stale",
              m = h ? c.score : null,
              v = h ? c.confidenceLevel : "cold_start",
              x = h
                ? c.evidenceProfile
                : { humanOrders: 0, agentOrders: 0, storeAgeDays: 0 },
              k = h ? c.scoreCap : 100,
              M = h ? c.nextMilestone : null,
              y = h ? c.breakdown : {},
              p = cw(m, e),
              g = r[v] ?? r.cold_start,
              b = y.agenticReadiness?.recommendations ?? [],
              j = b.some(
                (O) =>
                  O.includes("sello") ||
                  O.includes("firma") ||
                  O.includes("clave")
              ),
              _ = b.some((O) => O.includes("pendiente") || O.includes("pasos")),
              C = b.some((O) => O.includes("devoluc")),
              P = b.some(
                (O) =>
                  O.includes("envío") ||
                  O.includes("envio") ||
                  O.includes("SLA")
              ),
              S = b.some(
                (O) => O.includes("catálogo") || O.includes("catalogo")
              ),
              A = [
                {
                  id: "sello",
                  label: e.trustReceipts.checklistSello,
                  detail: e.trustReceipts.checklistSelloDetail,
                  done: !j,
                  action: {
                    label: e.trustReceipts.goToKeys,
                    onClick: () => {
                      window.location.hash = "#keys";
                    },
                  },
                },
                {
                  id: "compliance",
                  label: e.trustReceipts.checklistCompliance,
                  detail: e.trustReceipts.checklistComplianceDetail,
                  done: !_,
                  action: {
                    label: e.trustReceipts.checklistComplianceAction,
                    href: "admin.php?page=wc-settings&tab=checkout",
                  },
                },
                {
                  id: "devoluciones",
                  label: e.trustReceipts.checklistDevoluciones,
                  detail: e.trustReceipts.checklistDevolucionesDetail,
                  done: !C,
                  action: {
                    label: e.trustReceipts.checklistDevolucionesAction,
                    href: "admin.php?page=wc-settings&tab=account",
                  },
                },
                {
                  id: "envio",
                  label: e.trustReceipts.checklistEnvio,
                  detail: e.trustReceipts.checklistEnvioDetail,
                  done: !P,
                  action: {
                    label: e.trustReceipts.checklistEnvioAction,
                    href: "admin.php?page=wc-settings&tab=shipping",
                  },
                },
                {
                  id: "catalogo",
                  label: e.trustReceipts.checklistCatalogo,
                  detail: e.trustReceipts.checklistCatalogoDetail,
                  done: !S,
                  action: {
                    label: e.trustReceipts.checklistCatalogoAction,
                    href: "edit.php?post_type=product",
                  },
                },
              ],
              $ = A.filter((O) => O.done).length;
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
                            border: `5px solid ${p.color}`,
                            background: p.bg,
                          },
                          children: [
                            i.jsx("span", {
                              className: "text-3xl font-extrabold leading-none",
                              style: { color: p.color },
                              children: m ?? "—",
                            }),
                            m != null &&
                              i.jsx("span", {
                                className: "text-xs font-semibold",
                                style: { color: p.color },
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
                                  children: p.emoji,
                                }),
                                i.jsx("span", {
                                  className: "text-lg font-bold",
                                  style: { color: p.color },
                                  children: p.label,
                                }),
                                i.jsx("span", {
                                  className:
                                    "rounded-full px-3 py-0.5 text-xs font-bold",
                                  style: {
                                    background: g.bg,
                                    color: g.color,
                                    border: `1px solid ${g.border}`,
                                  },
                                  children: g.label,
                                }),
                              ],
                            }),
                            i.jsx("p", {
                              className: "text-sm text-gray-500",
                              children:
                                v === "cold_start"
                                  ? e.trustReceipts.coldStartDesc
                                  : v === "human_established"
                                    ? e.trustReceipts.humanEstablishedDesc
                                    : (m ?? 0) >= 90
                                      ? e.trustReceipts.scoreHighDesc
                                      : (m ?? 0) >= 70
                                        ? e.trustReceipts.scoreMidDesc
                                        : e.trustReceipts.scoreLowDesc,
                            }),
                            i.jsx("p", {
                              className: "mt-1 text-xs text-gray-400",
                              children: e.trustReceipts.computedAt.replace(
                                "{{date}}",
                                lw.format(new Date(d))
                              ),
                            }),
                          ],
                        }),
                        u.pendingActionsCount > 0 &&
                          i.jsxs("div", {
                            className:
                              "shrink-0 rounded-lg border border-red-200 bg-red-50 px-5 py-3 text-center",
                            children: [
                              i.jsx("div", {
                                className:
                                  "text-2xl font-extrabold text-red-700",
                                children: u.pendingActionsCount,
                              }),
                              i.jsx("div", {
                                className: "text-xs font-semibold text-red-700",
                                children:
                                  u.pendingActionsCount === 1
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
                                left: `calc(${Math.min(m ?? 0, 99)}% - 10px)`,
                                borderColor: p.color,
                              },
                            }),
                            k < 100 &&
                              i.jsx("div", {
                                className:
                                  "absolute top-0 bottom-0 w-0.5 rounded bg-gray-400",
                                style: { left: `${k}%` },
                                title: e.trustReceipts.scoreCurrent.replace(
                                  "{{cap}}",
                                  String(k)
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
                            k < 100
                              ? i.jsx("span", {
                                  style: { color: g.color },
                                  children: e.trustReceipts.scoreCap.replace(
                                    "{{cap}}",
                                    String(k)
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
                    M &&
                      i.jsxs("div", {
                        className:
                          "mt-4 flex items-center gap-2 rounded-lg px-4 py-3 text-sm",
                        style: {
                          background: g.bg,
                          border: `1px solid ${g.border}`,
                          color: g.color,
                        },
                        children: [
                          i.jsx("span", {
                            className: "text-base",
                            children: "🎯",
                          }),
                          i.jsx("span", { children: M }),
                        ],
                      }),
                    (x.storeAgeDays > 0 ||
                      x.humanOrders > 0 ||
                      x.agentOrders > 0) &&
                      i.jsxs("div", {
                        className: "mt-4 flex flex-wrap gap-2",
                        children: [
                          x.storeAgeDays > 0 &&
                            i.jsxs("div", {
                              className:
                                "rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600",
                              children: [
                                "🗓️ ",
                                e.trustReceipts.storeAgeLine,
                                " ",
                                i.jsx("strong", {
                                  className: "text-gray-900",
                                  children:
                                    x.storeAgeDays >= 365
                                      ? `${Math.floor(x.storeAgeDays / 365)} ${Math.floor(x.storeAgeDays / 365) !== 1 ? e.trustReceipts.storeYears : e.trustReceipts.storeYear}`
                                      : `${x.storeAgeDays} ${e.trustReceipts.storeDays}`,
                                }),
                                " ",
                                e.trustReceipts.storeActive,
                              ],
                            }),
                          x.humanOrders > 0 &&
                            i.jsxs("div", {
                              className:
                                "rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-xs text-gray-600",
                              children: [
                                "🛒",
                                " ",
                                i.jsxs("strong", {
                                  className: "text-gray-900",
                                  children: [
                                    x.humanOrders.toLocaleString(Gc),
                                    " ",
                                    x.humanOrders !== 1
                                      ? e.trustReceipts.humanOrders + "s"
                                      : e.trustReceipts.humanOrders,
                                  ],
                                }),
                                " ",
                                e.trustReceipts.humanOrdersOf,
                              ],
                            }),
                          x.agentOrders > 0 &&
                            i.jsxs("div", {
                              className:
                                "rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700",
                              children: [
                                "🤖",
                                " ",
                                i.jsxs("strong", {
                                  children: [
                                    x.agentOrders.toLocaleString(Gc),
                                    " ",
                                    x.agentOrders !== 1
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
                h &&
                  Object.keys(y).length > 0 &&
                  i.jsxs("div", {
                    className:
                      "rounded-lg border border-gray-200 bg-white p-6 shadow-sm",
                    children: [
                      i.jsx("h2", {
                        className: "mb-4 text-base font-semibold text-gray-900",
                        children: e.trustReceipts.breakdownTitle,
                      }),
                      v === "cold_start" &&
                        i.jsx("div", {
                          className:
                            "mb-4 rounded border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800",
                          children: e.trustReceipts.coldStartNotice,
                        }),
                      Object.entries(y).map(([O, ye]) =>
                        i.jsx(
                          uw,
                          { name: O, dim: ye, confidenceLevel: v, t: e },
                          O
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
                    i.jsxs("div", {
                      className:
                        "mb-5 flex items-center gap-3 rounded-lg px-4 py-3",
                      style: {
                        background: $ === A.length ? "#e3f5ec" : "#f6f6f7",
                        border: `1px solid ${$ === A.length ? "#95c9a8" : "#e4e5e7"}`,
                      },
                      children: [
                        i.jsx("span", {
                          className: "text-xl",
                          children: $ === A.length ? "🎉" : "📋",
                        }),
                        i.jsxs("div", {
                          children: [
                            i.jsx("span", {
                              className: "font-bold",
                              children: e.trustReceipts.checklistProgress
                                .replace("{{done}}", String($))
                                .replace("{{total}}", String(A.length)),
                            }),
                            $ < A.length &&
                              i.jsx("span", {
                                className: "ml-2 text-sm text-gray-500",
                                children:
                                  A.length - $ > 1
                                    ? e.trustReceipts.checklistMissingMany.replace(
                                        "{{count}}",
                                        String(A.length - $)
                                      )
                                    : e.trustReceipts.checklistMissingOne.replace(
                                        "{{count}}",
                                        String(A.length - $)
                                      ),
                              }),
                            $ === A.length &&
                              i.jsx("span", {
                                className: "ml-2 text-sm text-green-700",
                                children: e.trustReceipts.checklistAllDone,
                              }),
                          ],
                        }),
                      ],
                    }),
                    i.jsx("p", {
                      className:
                        "mb-3 text-xs font-bold uppercase tracking-wide text-gray-400",
                      children: e.trustReceipts.checklistNow,
                    }),
                    i.jsx("div", {
                      className: "space-y-4",
                      children: A.map((O) =>
                        i.jsxs(
                          "div",
                          {
                            className: "flex items-start gap-3",
                            children: [
                              i.jsx("span", {
                                className:
                                  "mt-0.5 shrink-0 text-xl leading-none",
                                children: O.done ? "✅" : "❌",
                              }),
                              i.jsxs("div", {
                                className: "flex-1",
                                children: [
                                  i.jsx("p", {
                                    className: "text-sm font-semibold",
                                    style: {
                                      color: O.done ? "#1a7f4f" : "#202223",
                                      textDecoration: O.done
                                        ? "line-through"
                                        : "none",
                                    },
                                    children: O.label,
                                  }),
                                  !O.done &&
                                    i.jsxs(i.Fragment, {
                                      children: [
                                        i.jsx("p", {
                                          className:
                                            "mt-1 text-xs text-gray-500 leading-relaxed",
                                          children: O.detail,
                                        }),
                                        O.action &&
                                          ("href" in O.action && O.action.href
                                            ? i.jsxs("a", {
                                                href: O.action.href,
                                                className:
                                                  "mt-2 inline-block rounded border border-blue-500 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50",
                                                children: [
                                                  O.action.label,
                                                  " →",
                                                ],
                                              })
                                            : i.jsxs("button", {
                                                onClick: O.action.onClick,
                                                className:
                                                  "mt-2 inline-block rounded border border-blue-500 px-3 py-1 text-xs font-semibold text-blue-600 hover:bg-blue-50",
                                                children: [
                                                  O.action.label,
                                                  " →",
                                                ],
                                              })),
                                      ],
                                    }),
                                ],
                              }),
                            ],
                          },
                          O.id
                        )
                      ),
                    }),
                    i.jsx("p", {
                      className:
                        "mb-3 mt-6 text-xs font-bold uppercase tracking-wide text-gray-400",
                      children: e.trustReceipts.checklistAutoTitle,
                    }),
                    i.jsx("div", {
                      className:
                        "rounded-lg border border-gray-200 bg-gray-50 p-3 text-xs text-gray-500",
                      children: e.trustReceipts.checklistAutoNote,
                    }),
                    [
                      {
                        id: "fulfillment",
                        label: e.trustReceipts.checklistFulfillment,
                        detail: e.trustReceipts.checklistFulfillmentDetail,
                      },
                      {
                        id: "disputes",
                        label: e.trustReceipts.checklistDisputes,
                        detail: e.trustReceipts.checklistDisputesDetail,
                      },
                    ].map((O) =>
                      i.jsxs(
                        "div",
                        {
                          className: "mt-3 flex items-start gap-3 opacity-55",
                          children: [
                            i.jsx("span", {
                              className: "shrink-0 text-xl leading-none",
                              children: "⏳",
                            }),
                            i.jsxs("div", {
                              children: [
                                i.jsx("p", {
                                  className:
                                    "text-sm font-semibold text-gray-500",
                                  children: O.label,
                                }),
                                i.jsx("p", {
                                  className: "text-xs text-gray-400",
                                  children: O.detail,
                                }),
                              ],
                            }),
                          ],
                        },
                        O.id
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
                      children: e.trustReceipts.practicesTitle,
                    }),
                    i.jsx("div", {
                      className: "space-y-3",
                      children: [
                        {
                          emoji: "🛒",
                          title: e.trustReceipts.practice1Title,
                          body: e.trustReceipts.practice1Body,
                        },
                        {
                          emoji: "📋",
                          title: e.trustReceipts.practice2Title,
                          body: e.trustReceipts.practice2Body,
                        },
                        {
                          emoji: "⏱️",
                          title: e.trustReceipts.practice3Title,
                          body: e.trustReceipts.practice3Body,
                        },
                      ].map((O) =>
                        i.jsxs(
                          "div",
                          {
                            className:
                              "flex items-start gap-3 rounded-lg border border-gray-200 bg-gray-50 p-3",
                            children: [
                              i.jsx("span", {
                                className: "shrink-0 text-xl",
                                children: O.emoji,
                              }),
                              i.jsxs("div", {
                                children: [
                                  i.jsx("p", {
                                    className:
                                      "text-sm font-semibold text-gray-900",
                                    children: O.title,
                                  }),
                                  i.jsx("p", {
                                    className:
                                      "mt-1 text-xs text-gray-600 leading-relaxed",
                                    children: O.body,
                                  }),
                                ],
                              }),
                            ],
                          },
                          O.title
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
                      ].map((O) =>
                        i.jsxs(
                          "div",
                          {
                            className:
                              "rounded-lg border border-gray-200 bg-gray-50 p-4",
                            children: [
                              i.jsxs("p", {
                                className:
                                  "text-sm font-semibold text-gray-900",
                                children: ["❓ ", O.q],
                              }),
                              i.jsx("p", {
                                className:
                                  "mt-2 text-xs text-gray-600 leading-relaxed",
                                children: O.a,
                              }),
                            ],
                          },
                          O.q
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
                    l
                      ? i.jsxs(i.Fragment, {
                          children: [
                            i.jsxs("div", {
                              className: "flex items-center gap-3",
                              children: [
                                i.jsx("span", {
                                  className: "text-xl",
                                  children: "🔒",
                                }),
                                i.jsxs("p", {
                                  className: "text-sm text-gray-700",
                                  children: [
                                    i.jsx("strong", {
                                      children:
                                        e.trustReceipts
                                          .securityProtectionActive,
                                    }),
                                    " ",
                                    e.trustReceipts.securityActiveDesc,
                                  ],
                                }),
                              ],
                            }),
                            l.daysSinceRotation !== null &&
                              l.daysSinceRotation > 90 &&
                              i.jsx("div", {
                                className:
                                  "mt-3 rounded border border-yellow-300 bg-yellow-50 px-4 py-3 text-sm text-yellow-800",
                                children:
                                  e.trustReceipts.securityRotationWarning.replace(
                                    "{{days}}",
                                    String(l.daysSinceRotation)
                                  ),
                              }),
                          ],
                        })
                      : i.jsxs("div", {
                          className: "flex items-center gap-3",
                          children: [
                            i.jsx("span", {
                              className: "text-xl",
                              children: "⚠️",
                            }),
                            i.jsxs("p", {
                              className: "text-sm text-gray-600",
                              children: [
                                e.trustReceipts.securityNotActive,
                                " ",
                                i.jsx("button", {
                                  onClick: () => {
                                    window.location.hash = "#keys";
                                  },
                                  className:
                                    "font-semibold text-blue-600 hover:underline",
                                  children: e.trustReceipts.securityActivate,
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
    );
})();
