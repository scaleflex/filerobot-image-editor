"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WatermarkInputTypes = exports.WatermarkIcon = exports.Watermarks = exports.SelectWatermarkLabel = exports.PositionSquare = exports.WatermarkPositionWrapper = exports.WatermarkInputs = exports.WrapperForOpacity = exports.WrapperForControls = exports.WrapperForURL = exports.WatermarkWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  width: 200px;\n  height: 70px;\n  display: inline-block;\n  vertical-align: middle;\n  background: ", " url(", ") 50% 50% / contain no-repeat; \n  margin: 10px;\n  padding: 20px;\n  border-radius: 4px;\n  cursor: pointer;\n  \n  :hover {\n    background-color: ", ";\n  }\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  position: absolute;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  line-height: 100px;\n  background: ", ";\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: 20px;\n  cursor: pointer;\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  width: 30px;\n  height: 30px;\n  display: inline-block;\n  vertical-align: top;\n  border: 1px solid ", ";\n  background: ", ";\n  cursor: ", ";\n  \n  ", "\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  width: 100px;\n  padding: 20px 10px 10px 10px;\n  display: inline-block;\n  vertical-align: top;\n  \n  /* The container */\n  label {\n    display: block;\n    position: relative;\n    line-height: 12px;\n    padding-left: 15px;\n    margin-bottom: 12px;\n    cursor: pointer;\n    user-select: none;\n  }\n  \n  /* Hide the browser's default radio button */\n  label input {\n    position: absolute;\n    opacity: 0;\n    cursor: pointer;\n  }\n  \n  /* Create a custom radio button */\n  span {\n    position: absolute;\n    top: 0;\n    left: 0;\n    height: 10px;\n    width: 10px;\n    background-color: ", ";\n    border-radius: 50%;\n  }\n  \n  /* On mouse-over, add a grey background color */\n  label:hover input ~ span {\n    // background-color: #ccc;\n  }\n  \n  /* When the radio button is checked, add a blue background */\n  label input:checked ~ span {\n    background-color: ", ";\n  }\n  \n  label input:checked ~ span:after {\n    background-color: ", ";\n  }\n  \n  /* Create the indicator (the dot/circle - hidden when not checked) */\n  span:after {\n    content: \"\";\n    position: absolute;\n    display: none;\n  }\n  \n  /* Show the indicator (dot/circle) when checked */\n  label input:checked ~ span:after {\n    display: block;\n  }\n  \n  /* Style the indicator (dot/circle) */\n  label span:after {\n    top: 3px;\n    left: 2px;\n    width: 6px;\n    height: 5px;\n    border-radius: 50%;\n    background: ", ";\n  }\n  \n  @media (max-width: 768px) {\n    width: 100%\n    \n    label {\n      display: inline-block;\n      margin-right: 10px;\n    }\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  width: 100px;\n  padding: 5px;\n  display: inline-block;\n  font-size: 0;\n  \n  div:nth-child(1) {\n    border-radius: 4px 0 0 0;\n  }\n  \n  div:nth-child(3) {\n    border-radius: 0 4px 0 0;\n  }\n  \n  div:nth-child(7) {\n    border-radius: 0 0 0 4px;\n  }\n  \n  div:nth-child(9) {\n    border-radius: 0 0 4px 0;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  width: calc(100% - 200px);\n  display: inline-block;\n  vertical-align: top;\n  \n  @media (max-width: 768px) {\n    width: 100%;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  padding: 10px;\n\n  label {\n    min-width: 120px;\n    display: inline-block;\n    vertical-align: middle;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  padding: 10px;\n  \n  label {\n    min-width: 120px;\n    display: inline-block;\n    vertical-align: middle;\n    margin: 0;\n  }\n  \n  input {\n    width: 100%;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  color: ", ";\n  text-align: left;\n  white-space: normal;\n  \n  .image-editor-range {\n    display: inline-block;\n    padding: 5px;\n    vertical-align: middle;\n  \n    :after {\n      display: none;\n    }\n    \n    label {\n      display: none;\n    }\n  }\n  \n  @media (max-width: 768px) { \n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    \n    .image-editor-range {\n      width: 100%;\n      \n      input {\n        width: 100% !important;\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var WatermarkWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.colors.text;
});

exports.WatermarkWrapper = WatermarkWrapper;
var WrapperForURL = (0, _styledComponents.default)('div')(_templateObject2());
exports.WrapperForURL = WrapperForURL;
var WrapperForControls = (0, _styledComponents.default)('div')(_templateObject3(), function (p) {
  if (p.switcherPosition === 'right') {
    return ".cloudimage-url-generator-switch {\n        margin-left: 100px;\n        margin-top: -6px;\n        \n        label {\n          min-width: auto;\n        }\n        \n        @media (max-width: 768px) {\n          margin-left: 4px;\n        }\n      }";
  } else {
    return 'padding: 10px;';
  }
});
exports.WrapperForControls = WrapperForControls;
var WrapperForOpacity = (0, _styledComponents.default)('div')(_templateObject4());
exports.WrapperForOpacity = WrapperForOpacity;
var WatermarkInputs = (0, _styledComponents.default)('div')(_templateObject5());
exports.WatermarkInputs = WatermarkInputs;
var WatermarkPositionWrapper = (0, _styledComponents.default)('div')(_templateObject6());
exports.WatermarkPositionWrapper = WatermarkPositionWrapper;
var WatermarkInputTypes = (0, _styledComponents.default)('div')(_templateObject7(), function (p) {
  return p.theme.colors.text;
}, function (p) {
  return p.theme.colors.text;
}, function (p) {
  return p.theme.colors.accent;
}, function (p) {
  return p.theme.colors.text;
});
exports.WatermarkInputTypes = WatermarkInputTypes;
var PositionSquare = (0, _styledComponents.default)('div')(_templateObject8(), function (p) {
  return p.theme.colors.secondaryBgHover;
}, function (p) {
  return p.clickable ? p.active ? p.theme.colors.accent : p.theme.colors.secondaryBg : p.theme.colors.disabledBg;
}, function (p) {
  return p.clickable ? 'pointer' : 'not-allowed';
}, function (p) {
  if (p.clickable !== 0 && !p.active) {
    return "\n        :hover {\n          background: ".concat(p.theme.colors.primaryBg, ";\n        }\n      ");
  }
});
exports.PositionSquare = PositionSquare;
var SelectWatermarkLabel = (0, _styledComponents.default)('div')(_templateObject9());
exports.SelectWatermarkLabel = SelectWatermarkLabel;
var Watermarks = (0, _styledComponents.default)('div')(_templateObject10(), function (p) {
  return p.theme.colors.secondaryBg;
});
exports.Watermarks = Watermarks;
var WatermarkIcon = (0, _styledComponents.default)('div')(_templateObject11(), function (p) {
  return p.theme.colors.primaryBgHover;
}, function (p) {
  return p.src;
}, function (p) {
  return p.theme.colors.secondaryBgHover;
});
exports.WatermarkIcon = WatermarkIcon;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(WatermarkWrapper, "WatermarkWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WrapperForURL, "WrapperForURL", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WrapperForControls, "WrapperForControls", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WrapperForOpacity, "WrapperForOpacity", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WatermarkInputs, "WatermarkInputs", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WatermarkPositionWrapper, "WatermarkPositionWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WatermarkInputTypes, "WatermarkInputTypes", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(PositionSquare, "PositionSquare", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(SelectWatermarkLabel, "SelectWatermarkLabel", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(Watermarks, "Watermarks", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");

  __REACT_HOT_LOADER__.register(WatermarkIcon, "WatermarkIcon", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Watermark.ui.js");
}();

;