(function (factory) {
  if (typeof exports === "object") {
    module.exports = factory();
  } else if (typeof define === "function" && define.amd) {
    define(factory);
  } else {
    window.RUHeadless = factory();
  }
})(function () {
  return function RUHeadless(callback) {
    if (!typeof window)
      throw new Error("RUHeadless: Can only be used in the browser");

    var evidences = [];

    if (/HeadlessChrome/.test(navigator.userAgent)) {
      evidences.push({
        type: "ua",
        description: "userAgent include headless declare",
      });
    }

    if (navigator.plugins.length === 0) {
      evidences.push({
        type: "plugin",
        description: "no browser plugin",
      });
    }

    if (navigator.languages === "") {
      evidences.push({
        type: "languages",
        description: "empty languages",
      });
    }

    var canvas = document.createElement("canvas");
    var gl = canvas.getContext("webgl");

    var debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
    var vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    var renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);

    if (vendor == "Brian Paul" && renderer == "Mesa OffScreen") {
      evidences.push({
        type: "webgl",
        description: "special webgl parameter",
      });
    }

    var body = document.getElementsByTagName("body")[0];
    var image = document.createElement("img");
    image.src = "//some.com/img_not_exist.jpg";
    body.appendChild(image);
    image.onerror = function () {
      if (image.width === 0 && image.height === 0) {
        evidences.push({
          type: "img",
          description: "load error img but got zero width & zero height"
        })
      }
      body.removeChild(image);

      callback(!!reason.length, evidences)
    };
  };
});
