"use strict";

var _logger = require("./logger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*
 * decaffeinate suggestions:
 * DS102: Remove unnecessary code created because of implicit returns
 * DS104: Avoid inline assignments
 * DS204: Change includes calls to have a more natural evaluation order
 * DS206: Consider reworking classes to avoid initClass
 * DS207: Consider shorter variations of null checks
 * Full docs: https://github.com/decaffeinate/decaffeinate/blob/master/docs/suggestions.md
 */
// Various I/O based operations
var IO = /*#__PURE__*/function () {
  function IO() {
    _classCallCheck(this, IO);
  }

  _createClass(IO, null, [{
    key: "initClass",
    value: function initClass() {
      // Used for parsing image URLs for domain names.
      this.domainRegex = /(?:(?:http|https):\/\/)((?:\w+)\.(?:(?:\w|\.)+))/;
    } // Is the given URL remote?
    // If a cross-origin setting is set, we assume you have CORS
    // properly configured.
    //
    // @param [DOMObject] img The image to check.
    // @return [Boolean]

  }, {
    key: "isRemote",
    value: function isRemote(img) {
      if (img == null) {
        return false;
      }

      if (this.corsEnabled(img)) {
        return false;
      }

      return this.isURLRemote(img.src);
    } // Given an image, we check to see if a CORS policy has been defined.
    // @param [DOMObject] img The image to check.
    // @return [Boolean]

  }, {
    key: "corsEnabled",
    value: function corsEnabled(img) {
      var needle;
      return img.crossOrigin != null && (needle = img.crossOrigin.toLowerCase(), ['anonymous', 'use-credentials'].includes(needle));
    } // Does the given URL exist on a different domain than the current one?
    // This is done by comparing the URL to `document.domain`.
    // @param [String] url The URL to check.
    // @return [Boolean]

  }, {
    key: "isURLRemote",
    value: function isURLRemote(url) {
      var matches = url.match(this.domainRegex);

      if (matches) {
        return matches[1] !== document.domain;
      } else {
        return false;
      }
    } // Checks to see if the URL is remote, and if there is a proxy defined, it
    // @param [String] src The URL to check.
    // @return [String] The proxy URL if the image is remote. Nothing otherwise.

  }, {
    key: "remoteCheck",
    value: function remoteCheck(src) {
      if (this.isURLRemote(src)) {
        if (!Caman.remoteProxy.length) {
          _logger.Log.info("Attempting to load a remote image without a configured proxy. URL: ".concat(src));

          return;
        } else {
          if (Caman.isURLRemote(Caman.remoteProxy)) {
            _logger.Log.info("Cannot use a remote proxy for loading images.");

            return;
          }

          return this.proxyUrl(src);
        }
      }
    } // Given a URL, get the proxy URL for it.
    // @param [String] src The URL to proxy.
    // @return [String] The proxy URL.

  }, {
    key: "proxyUrl",
    value: function proxyUrl(src) {
      return "".concat(Caman.remoteProxy, "?").concat(Caman.proxyParam, "=").concat(encodeURIComponent(src));
    } // Shortcut for using one of the bundled proxies.
    // @param [String] lang String identifier for the proxy script language.
    // @return [String] A proxy URL.

  }, {
    key: "useProxy",
    value: function useProxy(lang) {
      var langToExt = {
        ruby: 'rb',
        python: 'py',
        perl: 'pl',
        javascript: 'js'
      };
      lang = lang.toLowerCase();

      if (langToExt[lang] != null) {
        lang = langToExt[lang];
      }

      return "proxies/caman_proxy.".concat(lang);
    }
  }]);

  return IO;
}();

IO.initClass();
Caman.IO = IO;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(IO, "IO", "/home/patrik/projects/filerobot-image-editor/projects/react/lib/caman/core/io.js");
}();

;