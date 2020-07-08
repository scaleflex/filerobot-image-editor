"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FocusPointImg = exports.FocusPointWrap = exports.FocusPointContainer = exports.FocusPoint = exports.Watermark = exports.PreResizeBox = exports.PreviewImgBox = exports.Canvas = exports.PreviewWrapper = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  max-height: 100%;\n  max-width: 100%;\n  vertical-align: middle;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  width: ", "px;\n  height: ", "px;\n  display: inline-block;\n  max-height: 100%;\n  max-width: 100%;\n  vertical-align: middle;\n  position: absolute;\n  background-image: url('", "');\n  background-position: ", ";\n  background-repeat: no-repeat;\n  background-size: ", ";\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  margin: auto;\n  opacity:", ";\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  max-height: 100%;\n  max-width: 100%;\n  /*width: 100%;*/\n  height: 100%;\n  vertical-align: middle;\n\n  ", "\n\n  /* Limit image width to avoid overflow the container */\n  img {\n    max-width: 100% !important; /* This rule is very important, please do not ignore this! */\n  }\n\n  #scaleflex-image-edit-box {\n    display: ", ";\n    max-height: 100%;\n    max-width: 100%;\n    vertical-align: middle;\n  }\n\n   ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  width: 100%;\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: calc(100% - 170px);\n  text-align: center;\n  line-height: calc(100% - 170px);\n  padding: 20px;\n  position: relative;\n\n  :before {\n    content: '';\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var PreviewWrapper = _styledComponents.default.div(_templateObject());

exports.PreviewWrapper = PreviewWrapper;
var PreResizeBox = (0, _styledComponents.default)('div')(_templateObject2());
exports.PreResizeBox = PreResizeBox;

var PreviewImgBox = _styledComponents.default.div(_templateObject3(), function (props) {
  return !props.hideCanvas ? "\n  :before {\n    content: '';\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n  }" : "\n  canvas {\n    position: relative;\n    left: -9999px;\n  }\n  ";
}, function (props) {
  return props.hide ? 'none' : 'inline-block';
}, function (p) {
  return p.isShowWatermark && "\ncanvas:after {\n    content: '';\n    position: absolute;\n    top: 0;\n    left: 0;\n    right: 0;\n    bottom: 0;\n    background: red;\n    opacity: 0.5;\n  }";
});

exports.PreviewImgBox = PreviewImgBox;
var Watermark = (0, _styledComponents.default)('div')(_templateObject4(), function (p) {
  return p.width || 0;
}, function (p) {
  return p.height || 0;
}, function (p) {
  return p.url ? p.url : 'none';
}, function (p) {
  return "".concat(p.wx, "px ").concat(p.wy, "px");
}, function (p) {
  return "".concat(p.ww, "px ").concat(p.wh, "px");
}, function (p) {
  return p.opacity || 0;
});
exports.Watermark = Watermark;
var FocusPointWrap = (0, _styledComponents.default)( /*#__PURE__*/_react.default.forwardRef(function (_ref, ref) {
  var width = _ref.width,
      height = _ref.height,
      rest = _objectWithoutProperties(_ref, ["width", "height"]);

  return /*#__PURE__*/_react.default.createElement("div", _extends({
    className: "focus-point"
  }, rest, {
    ref: ref
  }));
}))(function (_ref2) {
  var width = _ref2.width,
      height = _ref2.height;
  return {
    width: width,
    height: height,
    position: 'absolute',
    margin: 'auto',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    display: 'inline-block',
    maxHeight: '100%',
    maxWidth: '100%',
    verticalAlign: 'middle'
  };
});
exports.FocusPointWrap = FocusPointWrap;
var FocusPointContainer = (0, _styledComponents.default)(function (_ref3) {
  var image = _ref3.image,
      rest = _objectWithoutProperties(_ref3, ["image"]);

  return /*#__PURE__*/_react.default.createElement("div", rest);
})(function (_ref4) {
  var image = _ref4.image;
  return {
    position: 'relative',
    height: '100%',
    width: '100%',
    cursor: 'crosshair',
    backgroundImage: "url(".concat(image, ")"),
    backgroundSize: 'contain'
  };
});
exports.FocusPointContainer = FocusPointContainer;
var FocusPoint = (0, _styledComponents.default)(function (_ref5) {
  var x = _ref5.x,
      y = _ref5.y,
      visible = _ref5.visible,
      rest = _objectWithoutProperties(_ref5, ["x", "y", "visible"]);

  return /*#__PURE__*/_react.default.createElement("span", rest);
})(function (_ref6) {
  var _ref6$x = _ref6.x,
      x = _ref6$x === void 0 ? 0 : _ref6$x,
      _ref6$y = _ref6.y,
      y = _ref6$y === void 0 ? 0 : _ref6$y,
      _ref6$visible = _ref6.visible,
      visible = _ref6$visible === void 0 ? true : _ref6$visible;
  return {
    position: 'absolute',
    top: y,
    left: x,
    visibility: visible ? 'visible' : 'hidden',
    display: 'inline-block',
    width: 30,
    height: 30,
    transform: 'translate(-50%, -50%)',
    fontFamily: 'filerobot-image-editor-font !important',
    color: '#fff',
    fontSize: 30,
    '::before': {
      content: "'\\e919'",
      position: 'absolute',
      top: '50%',
      left: 0,
      textShadow: '0px 0px 3px #000000'
    }
  };
});
exports.FocusPoint = FocusPoint;
var FocusPointImg = (0, _styledComponents.default)(function (_ref7) {
  var visible = _ref7.visible,
      rest = _objectWithoutProperties(_ref7, ["visible"]);

  return /*#__PURE__*/_react.default.createElement("img", rest);
})(function (_ref8) {
  var visible = _ref8.visible;
  return {
    visibility: visible ? 'visible' : 'hidden',
    maxWidth: '100%',
    maxHeight: '100%'
  };
}); //watermarkURL
//isShowWatermark

exports.FocusPointImg = FocusPointImg;

var Canvas = _styledComponents.default.canvas.attrs(function () {
  return {};
})(_templateObject5(), function (props) {
  return props.hide ? 'none' : 'inline-block';
});

exports.Canvas = Canvas;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(PreviewWrapper, "PreviewWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(PreResizeBox, "PreResizeBox", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(PreviewImgBox, "PreviewImgBox", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(Watermark, "Watermark", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(FocusPointWrap, "FocusPointWrap", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(FocusPointContainer, "FocusPointContainer", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(FocusPoint, "FocusPoint", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(FocusPointImg, "FocusPointImg", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");

  __REACT_HOT_LOADER__.register(Canvas, "Canvas", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Preview.ui.js");
}();

;