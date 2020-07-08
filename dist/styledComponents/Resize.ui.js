"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SuggestionOption = exports.SuggestionsBox = exports.PreResizeInner = exports.PreResizeWarning = exports.PreResizeActions = exports.ResizeBox = exports.ResizeWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  background: ", ";\n  padding: 15px;\n  margin: 5px;\n  border-radius: 4px;\n  cursor: pointer;\n  \n  :hover {\n    background: ", ";\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  max-width: 600px;\n  margin: 15px auto;\n  background: ", ";\n  border-radius: 4px;\n  padding: 15px;\n  \n  h4 {\n    line-height: 1.4;\n    font-size: 16px;\n    color: ", ";\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  font-size: 14px;\n  max-width: 600px;\n  line-height: 1.4;\n  margin: 0 auto;\n  background: ", ";\n  border-radius: 4px;\n  padding: 15px 15px 15px 55px;\n  position: relative;\n  font-weight: normal;\n  text-align: left;\n  \n  :before {\n    content: '\\e917';\n    font-family: filerobot-image-editor-font;\n    position: absolute;\n    font-size: 20px;\n    line-height: 20px;\n    left: 20px;\n    top: 50%;\n    margin-top: -10px;\n  }\n"], ["\n  color: ", ";\n  font-size: 14px;\n  max-width: 600px;\n  line-height: 1.4;\n  margin: 0 auto;\n  background: ", ";\n  border-radius: 4px;\n  padding: 15px 15px 15px 55px;\n  position: relative;\n  font-weight: normal;\n  text-align: left;\n  \n  :before {\n    content: '\\\\e917';\n    font-family: filerobot-image-editor-font;\n    position: absolute;\n    font-size: 20px;\n    line-height: 20px;\n    left: 20px;\n    top: 50%;\n    margin-top: -10px;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  button {\n    min-width: 240px;\n  }\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  \n  @media (min-width: 768px) {\n    width: 300px;\n    padding: 20px;\n    height: 100px;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  text-align: center;\n  \n  @media (max-width: 768px) {\n    display: flex;\n    flex-direction: column;\n    justify-content: center;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var ResizeWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.colors.text;
});

exports.ResizeWrapper = ResizeWrapper;

var ResizeBox = _styledComponents.default.div(_templateObject2());

exports.ResizeBox = ResizeBox;
var PreResizeActions = (0, _styledComponents.default)('div')(_templateObject3());
exports.PreResizeActions = PreResizeActions;
var PreResizeWarning = (0, _styledComponents.default)('p')(_templateObject4(), function (p) {
  return p.theme.colors.textWarn;
}, function (p) {
  return p.theme.colors.secondaryBg;
});
exports.PreResizeWarning = PreResizeWarning;
var PreResizeInner = (0, _styledComponents.default)('div')(_templateObject5(), function (p) {
  return p.theme.colors.secondaryBg;
}, function (p) {
  return p.theme.colors.text;
});
exports.PreResizeInner = PreResizeInner;
var SuggestionsBox = (0, _styledComponents.default)('div')(_templateObject6());
exports.SuggestionsBox = SuggestionsBox;
var SuggestionOption = (0, _styledComponents.default)('div')(_templateObject7(), function (p) {
  return p.theme.colors.primaryBg;
}, function (p) {
  return p.theme.colors.primaryBgHover;
});
exports.SuggestionOption = SuggestionOption;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ResizeWrapper, "ResizeWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");

  __REACT_HOT_LOADER__.register(ResizeBox, "ResizeBox", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");

  __REACT_HOT_LOADER__.register(PreResizeActions, "PreResizeActions", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");

  __REACT_HOT_LOADER__.register(PreResizeWarning, "PreResizeWarning", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");

  __REACT_HOT_LOADER__.register(PreResizeInner, "PreResizeInner", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");

  __REACT_HOT_LOADER__.register(SuggestionsBox, "SuggestionsBox", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");

  __REACT_HOT_LOADER__.register(SuggestionOption, "SuggestionOption", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Resize.ui.js");
}();

;