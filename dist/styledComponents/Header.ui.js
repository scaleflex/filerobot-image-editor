"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ActionsWrapper = exports.CancelBtn = exports.ToolbarWrapper = exports.RightActions = exports.LeftActions = exports.Title = exports.HeaderTop = exports.HeaderWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = require("./Button");

var _styleUtils = require("./styleUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  border-color: ", ";\n  color: ", ";\n  text-transform: capitalize;\n  \n  :hover {\n    background: ", ";\n    border-color: ", ";\n    color: ", ";  \n  }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100px;\n  background: ", ";\n  \n  @media (max-width: 768px) {\n    flex-direction: column;\n    height: initial;\n  }\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  right: 0;\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  left: 0;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  position: absolute;\n  top: calc(50% - 20px);\n  text-align: center;\n  width: 100px;\n  padding: 10px 10px 5px;\n  \n  @media (max-width: 768px) {\n    position: initial;\n    width: 50%;\n  }\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  @media (max-width: 768px) {\n    display: flex;\n    justify-content: center;\n    width: 100%;\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  text-align: center;\n  text-transform: capitalize;\n  color: ", "\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  line-height: 35px;\n  border-bottom: 1px solid ", ";\n  background: ", ";\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var HeaderWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.colors.secondaryBg;
});

exports.HeaderWrapper = HeaderWrapper;

var HeaderTop = _styledComponents.default.div(_templateObject2(), function (props) {
  return props.theme.colors.primaryBg;
}, function (props) {
  return props.theme.colors.primaryBg;
});

exports.HeaderTop = HeaderTop;

var Title = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.colors.text;
});

exports.Title = Title;
var ActionsWrapper = (0, _styledComponents.default)('div')(_templateObject4());
exports.ActionsWrapper = ActionsWrapper;
var Actions = (0, _styledComponents.default)('div')(_templateObject5());
var LeftActions = (0, _styledComponents.default)(Actions)(_templateObject6(), function (p) {
  return p.hide ? 'none' : 'inline-block';
});
exports.LeftActions = LeftActions;
var RightActions = (0, _styledComponents.default)(Actions)(_templateObject7());
exports.RightActions = RightActions;

var ToolbarWrapper = _styledComponents.default.div(_templateObject8(), function (props) {
  return props.theme.colors.secondaryBg;
});

exports.ToolbarWrapper = ToolbarWrapper;
var CancelBtn = (0, _styledComponents.default)(_Button.Button)(_templateObject9(), function (props) {
  return props.theme.colors.primaryBg;
}, function (props) {
  return props.theme.colors.primaryBg;
}, function (props) {
  return props.theme.colors.text;
}, function (props) {
  return (0, _styleUtils.getHoverColor)(props.theme.colors.primaryBg);
}, function (props) {
  return props.theme.colors.primaryBg;
}, function (props) {
  return props.theme.colors.text;
});
exports.CancelBtn = CancelBtn;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(HeaderWrapper, "HeaderWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(HeaderTop, "HeaderTop", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(Title, "Title", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(ActionsWrapper, "ActionsWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(Actions, "Actions", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(LeftActions, "LeftActions", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(RightActions, "RightActions", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(ToolbarWrapper, "ToolbarWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");

  __REACT_HOT_LOADER__.register(CancelBtn, "CancelBtn", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Header.ui.js");
}();

;