"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImageSealingParams = void 0;

var _jsSha = _interopRequireDefault(require("js-sha1"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var getImageSealingParams = function getImageSealingParams(paramsStr, imageSealingConfig, originalUrl) {
  var _ref = imageSealingConfig || {},
      salt = _ref.salt,
      charCount = _ref.char_count,
      includeParams = _ref.include_params;

  var isIncludeParamsDefined = Array.isArray(includeParams);

  if (isIncludeParamsDefined && includeParams.length === 0) {
    return paramsStr;
  }

  var sealingParamsStr = '';
  var restParamsStr = '';

  if (isIncludeParamsDefined) {
    // in config defined include_params with array
    var sealingParams = [];
    var restParams = [];
    paramsStr.split('&').forEach(function (item) {
      var _item$split = item.split('='),
          _item$split2 = _slicedToArray(_item$split, 1),
          paramName = _item$split2[0];

      if (includeParams.indexOf(paramName) > -1) {
        sealingParams.push(item);
      } else {
        restParams.push(item);
      }
    });

    if (restParams.length > 0) {
      restParamsStr = restParams.join('&');
    } // We need to add sealing always, even if sealingParams is empty.
    // In case with empty params sealing will be like: ci_seal=10613a92e5


    sealingParamsStr = getSealingParams(sealingParams.join('&'), originalUrl, salt, charCount);
  } else {
    // all params
    sealingParamsStr = getSealingParams(paramsStr, originalUrl, salt, charCount);
  }

  return [sealingParamsStr, restParamsStr].filter(function (p) {
    return p;
  }).join('&');
};

exports.getImageSealingParams = getImageSealingParams;

function encodeBase64(str) {
  return btoa(str).replace(/=*$/g, '');
}

function getSha1(str, length) {
  return (0, _jsSha.default)(str).slice(0, length);
}

function getSealingParams(paramsStr, originalUrl, salt, charCount) {
  var base64String = encodeBase64(paramsStr);
  var calcHash = getSha1(originalUrl + base64String + salt, charCount);
  return [calcHash ? "ci_seal=".concat(calcHash) : '', base64String ? "ci_eqs=".concat(base64String) : ''].filter(function (i) {
    return i;
  }).join('&');
}

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(getImageSealingParams, "getImageSealingParams", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-image-sealing-params.js");

  __REACT_HOT_LOADER__.register(encodeBase64, "encodeBase64", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-image-sealing-params.js");

  __REACT_HOT_LOADER__.register(getSha1, "getSha1", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-image-sealing-params.js");

  __REACT_HOT_LOADER__.register(getSealingParams, "getSealingParams", "/home/patrik/projects/filerobot-image-editor/projects/react/utils/get-image-sealing-params.js");
}();

;