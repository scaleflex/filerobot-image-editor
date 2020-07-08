"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _Preview = require("../../styledComponents/Preview.ui");

var _utils = require("../../utils");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function FocusPointPreview(_ref) {
  var original = _ref.original,
      focusPoint = _ref.focusPoint,
      updateState = _ref.updateState,
      src = _ref.src;

  var _getInnerBoxSize = (0, _utils.getInnerBoxSize)(document.getElementById('preview-img-box').parentElement, original),
      width = _getInnerBoxSize.width,
      height = _getInnerBoxSize.height;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      isLoaded = _useState2[0],
      setIsLoaded = _useState2[1];

  var ref = (0, _react.useRef)(null);
  var refRect = ref.current ? ref.current.getBoundingClientRect() : {};

  function handleMouseDown(e) {
    var dragX = e.clientX - refRect.x;
    var dragY = e.clientY - refRect.y;
    var xVal = Math.round(dragX * original.width / width);
    var yVal = Math.round(dragY * original.height / height);
    var x = Math.min(Math.max(xVal, 0), original.width);
    var y = Math.min(Math.max(yVal, 0), original.height);
    updateState({
      focusPoint: {
        x: x,
        y: y
      }
    });
  }

  function handleImageLoaded() {
    updateState({
      isShowSpinner: false
    });
    setIsLoaded(true);
  }

  function handleImageError() {
    updateState({
      isShowSpinner: false
    });
  }

  return /*#__PURE__*/_react.default.createElement(_Preview.FocusPointWrap, {
    ref: ref,
    width: width,
    height: height
  }, /*#__PURE__*/_react.default.createElement(_Preview.FocusPointContainer, {
    onMouseDown: handleMouseDown
  }, /*#__PURE__*/_react.default.createElement(_Preview.FocusPointImg, {
    visible: isLoaded,
    src: src,
    onLoad: handleImageLoaded,
    onError: handleImageError
  }), /*#__PURE__*/_react.default.createElement(_Preview.FocusPoint, {
    visible: isLoaded,
    x: focusPoint.x * width / original.width,
    y: focusPoint.y * height / original.height
  })));
}

var _default = FocusPointPreview;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(FocusPointPreview, "FocusPointPreview", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Preview/FocusPointPreview.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Preview/FocusPointPreview.js");
}();

;