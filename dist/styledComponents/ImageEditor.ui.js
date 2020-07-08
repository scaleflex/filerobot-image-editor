"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Container = exports.Wrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  background: ", ";\n  z-index: 1050;\n  width: 100%;\n  height: 100%;\n  min-height: 520px;\n  overflow-y: auto;\n  font-size: 12px;\n  \n  #scaleflex-image-edit-box-original {\n    visibility: hidden;\n    position: absolute;\n    left: -99999px;\n    display: none;\n  }\n    \n  .cropper-container {\n    direction: ltr;\n    font-size: 0;\n    line-height: 0;\n    position: relative;\n    -ms-touch-action: none;\n    touch-action: none;\n    -webkit-user-select: none;\n    -moz-user-select: none;\n    -ms-user-select: none;\n    user-select: none;\n  }\n  \n  .cropper-container img {/*Avoid margin top issue (Occur only when margin-top <= -height)*/\n    display: block;\n    height: 100%;\n    image-orientation: 0deg;\n    max-height: none !important;\n    max-width: none !important;\n    min-height: 0 !important;\n    min-width: 0 !important;\n    width: 100%;\n  }\n  \n  .cropper-wrap-box,\n  .cropper-canvas,\n  .cropper-drag-box,\n  .cropper-crop-box,\n  .cropper-modal {\n    bottom: 0;\n    left: 0;\n    position: absolute;\n    right: 0;\n    top: 0;\n  }\n  \n  .cropper-wrap-box,\n  .cropper-canvas {\n    overflow: hidden;\n  }\n  \n  .cropper-drag-box {\n    background-color: #fff;\n    opacity: 0;\n  }\n  \n  .cropper-modal {\n    background-color: #000;\n    opacity: .5;\n  }\n  \n  .cropper-view-box {\n    display: block;\n    height: 100%;\n    outline-color: rgba(255, 255, 255, 0.75);\n    outline: 1px solid #fff;\n    overflow: hidden;\n    width: 100%;\n    ", "\n  }\n  \n  .cropper-dashed {\n    border: 0 dashed #eee;\n    display: block;\n    opacity: .5;\n    position: absolute;\n  }\n  \n  .cropper-dashed.dashed-h {\n    border-bottom-width: 1px;\n    border-top-width: 1px;\n    height: 33.33333%;\n    left: 0;\n    top: 33.33333%;\n    width: 100%;\n  }\n  \n  .cropper-dashed.dashed-v {\n    border-left-width: 1px;\n    border-right-width: 1px;\n    height: 100%;\n    left: 33.33333%;\n    top: 0;\n    width: 33.33333%;\n  }\n  \n  .cropper-center {\n    display: block;\n    height: 0;\n    left: 50%;\n    opacity: .75;\n    position: absolute;\n    top: 50%;\n    width: 0;\n  }\n  \n  .cropper-center:before,\n  .cropper-center:after {\n    background-color: #fff;\n    content: ' ';\n    display: block;\n    position: absolute;\n  }\n  \n  .cropper-center:before {\n    height: 1px;\n    left: -10px;\n    top: 0;\n    width: 20px;\n  }\n  \n  .cropper-center:after {\n    height: 20px;\n    left: 0;\n    top: -10px;\n    width: 1px;\n  }\n  \n  .cropper-face,\n  .cropper-line,\n  .cropper-point {\n    display: block;\n    height: 100%;\n    opacity: .1;\n    position: absolute;\n    width: 100%;\n  }\n  \n  .cropper-face {\n    background-color: #fff;\n    left: 0;\n    top: 0;\n    ", "\n  }\n  \n  .cropper-line {\n    background-color: #fff;\n  }\n  \n  .cropper-line.line-e {\n    cursor: ew-resize;\n    right: -3px;\n    top: 0;\n    width: 5px;\n  }\n  \n  .cropper-line.line-n {\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n    top: -3px;\n  }\n  \n  .cropper-line.line-w {\n    cursor: ew-resize;\n    left: -3px;\n    top: 0;\n    width: 5px;\n  }\n  \n  .cropper-line.line-s {\n    bottom: -3px;\n    cursor: ns-resize;\n    height: 5px;\n    left: 0;\n  }\n  \n  .cropper-point {\n    background-color: #fff;\n    height: 20px;\n    opacity: .90;\n    width: 20px;\n    border-radius: 50%;\n    \n    &:before {\n      content: '';\n      display: table;\n      width: 8px;\n      height: 8px;\n      border-radius: 50%;\n      background: black;\n      opacity: 0.8;\n      z-index: 11;\n      position: absolute;\n      top: calc(50% - 4px);\n      left: calc(50% - 4px);\n    }\n  }\n  \n  .cropper-point.point-e {\n    cursor: ew-resize;\n    margin-top: -10px;\n    right: -10px;\n    top: 50%;\n  }\n  \n  .cropper-point.point-n {\n    cursor: ns-resize;\n    left: 50%;\n    margin-left: -10px;\n    top: -10px;\n  }\n  \n  .cropper-point.point-w {\n    cursor: ew-resize;\n    left: -10px;\n    margin-top: -10px;\n    top: 50%;\n  }\n  \n  .cropper-point.point-s {\n    bottom: -10px;\n    cursor: s-resize;\n    left: 50%;\n    margin-left: -10px;\n  }\n  \n  .cropper-point.point-ne {\n    cursor: nesw-resize;\n    right: -10px;\n    top: -10px;\n  }\n  \n  .cropper-point.point-nw {\n    cursor: nwse-resize;\n    left: -10px;\n    top: -10px;\n  }\n  \n  .cropper-point.point-sw {\n    bottom: -10px;\n    cursor: nesw-resize;\n    left: -10px;\n  }\n  \n  .cropper-point.point-se {\n    bottom: -10px;\n    cursor: nwse-resize;\n    height: 20px;\n    right: -10px;\n    width: 20px;\n  }\n  \n  .cropper-point.point-se:before {\n    content: '';\n    display: table;\n    width: 8px;\n    height: 8px;\n    border-radius: 50%;\n    background: black;\n    opacity: 0.8;\n    z-index: 11;\n    position: absolute;\n    top: calc(50% - 4px);\n    left: calc(50% - 4px);\n  }\n  \n  .cropper-invisible {\n    opacity: 0;\n  }\n  \n  .cropper-bg {\n    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');\n  }\n  \n  .cropper-hide {\n    display: block;\n    height: 0;\n    position: absolute;\n    width: 0;\n  }\n  \n  .cropper-hidden {\n    display: none !important;\n  }\n  \n  .cropper-move {\n    cursor: move;\n  }\n  \n  .cropper-crop {\n    cursor: crosshair;\n  }\n  \n  .cropper-disabled .cropper-drag-box,\n  .cropper-disabled .cropper-face,\n  .cropper-disabled .cropper-line,\n  .cropper-disabled .cropper-point {\n    cursor: not-allowed;\n  }\n  \n  @media (max-width: 768px) {\n    display: flex;\n    flex-direction: column;\n    justify-content: space-between;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  height: 100%;\n  overflow-y: auto;\n\n  *, *:after, *:before, *::after, *::before {\n    box-sizing: border-box;\n  }\n  *:after, *:before, *::after, *::before {\n    padding: 0;\n    margin: 0;\n    outline: 0;\n    box-sizing: border-box;\n  }\n\n  /* cyrillic-ext */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY_ZraR2Tg8w2lzm7kLNL0-w.woff2) format('woff2');\n    unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;\n  }\n  /* cyrillic */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY14sYYdJg5dU2qzJEVSuta0.woff2) format('woff2');\n    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n  }\n  /* greek-ext */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY1BW26QxpSj-_ZKm_xT4hWw.woff2) format('woff2');\n    unicode-range: U+1F00-1FFF;\n  }\n  /* greek */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpYwt_Rm691LTebKfY2ZkKSmI.woff2) format('woff2');\n    unicode-range: U+0370-03FF;\n  }\n  /* vietnamese */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY9DiNsR5a-9Oe_Ivpu8XWlY.woff2) format('woff2');\n    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;\n  }\n  /* latin-ext */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY6E8kM4xWR1_1bYURRojRGc.woff2) format('woff2');\n    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;\n  }\n  /* latin */\n  @font-face {\n    font-family: 'Roboto Mono';\n    font-style: normal;\n    font-weight: 400;\n    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY4gp9Q8gbYrhqGlRav_IXfk.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Container = (0, _styledComponents.default)('div')(_templateObject());
exports.Container = Container;

var Wrapper = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.colors.primaryBg;
}, function (_ref) {
  var roundCrop = _ref.roundCrop;
  return roundCrop && 'border-radius: 50%;';
}, function (_ref2) {
  var roundCrop = _ref2.roundCrop;
  return roundCrop && "\n      border-radius: 50%;\n      box-shadow: 0 0 80px 15px #000;\n      border: 2px solid #000;";
});

exports.Wrapper = Wrapper;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Container, "Container", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/ImageEditor.ui.js");

  __REACT_HOT_LOADER__.register(Wrapper, "Wrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/ImageEditor.ui.js");
}();

;