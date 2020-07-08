"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styleUtils = require("./styleUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  text-transform: ", ";\n  display: ", ";\n  padding: ", ";\n  font-size: ", ";\n  line-height:  ", ";\n  min-width: ", ";\n  font-weight: 400;\n  text-align: center;\n  white-space: nowrap;\n  vertical-align: middle;\n  touch-action: manipulation;\n  cursor: pointer;\n  user-select: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  border: 1px solid transparent;\n  -webkit-transition: all 0.2s ease-in-out;\n  -o-transition: all 0.2s ease-in-out;\n  transition: all 0.2s ease-in-out;\n  border-radius: ", ";\n  \n  :focus, :hover {\n    text-decoration: none;\n  }\n  \n  :focus {\n    outline: 0;\n    -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);\n            box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);\n  }\n  \n  ", "\n  \n  ", "\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Button = _styledComponents.default.button(_templateObject(), function (props) {
  return props.tt || _styleUtils.variables.button && _styleUtils.variables.button.tt || 'none';
}, function (props) {
  return props.hide ? 'none' : 'inline-block';
}, function (props) {
  return getElementStylesBySize(props, 'button', 'p');
}, function (props) {
  return getElementStylesBySize(props, 'button', 'fz');
}, function (props) {
  return getElementStylesBySize(props, 'button', 'lh');
}, function (props) {
  return props.fullSize ? '100%' : 'auto';
}, function (props) {
  return getElementStylesBySize(props, 'button', 'br');
}, function (props) {
  return isDisabled(props);
}, function (props) {
  return getButtonStyles(props);
});

exports.Button = Button;

function getElementStylesBySize(props, type, field) {
  var sm = props.sm,
      lg = props.lg;
  var size = sm ? 'sm' : lg ? 'lg' : 'md';
  return _styleUtils.variables[type] && _styleUtils.variables[type][size] && _styleUtils.variables[type][size][field];
}

function isDisabled(props) {
  if (!props.disabled) return '';
  return "\n    cursor: not-allowed;\n    opacity: .65;\n  ";
}

function getButtonStyles(props) {
  if (props.success) return "\n    color: #fff;\n    background-color: #28a745;\n    border-color: ##28a745;\n    \n    :hover {\n      color: #fff;\n      background-color: #218838;\n      border-color: #1e7e34;\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);\n              box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);\n    }\n    \n    :active {\n      color: #fff;\n      background-color: #1e7e34;\n      background-image: none;\n      border-color: #1c7430;\n    }\n    \n    ".concat(props.disabled ? "\n      background-color: #009345;\n      border-color: #009345;\n      \n      :hover {\n        background-color: #009345;\n        border-color: #009345;\n      }\n    " : '', "\n    \n    ").concat(props.active ? "\n      color: #fff;\n      background-color: #1e7e34;\n      background-image: none;\n      border-color: #1c7430;\n    " : '', "\n  ");else if (props.primary) return "\n    color: #fff;\n    background-color: #0275d8;\n    border-color: #0275d8;\n    \n    :hover {\n      color: #fff;\n      background-color: #025aa5;\n      border-color: #01549b;\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);\n              box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);\n    }\n    \n    :active {\n      color: #fff;\n      background-color: #025aa5;\n      background-image: none;\n      border-color: #01549b;\n    }\n    \n    ".concat(props.disabled ? "\n      background-color: #0275d8;\n      border-color: #0275d8;\n      \n      :hover {\n        background-color: #0275d8;\n        border-color: #0275d8;\n      }\n    " : '', "\n    \n    ").concat(props.active ? "\n      color: #fff;\n      background-color: #025aa5;\n      background-image: none;\n      border-color: #01549b;\n    " : '', "\n  ");else if (props.info) return "\n    color: #fff;\n    background-color: #5bc0de;\n    border-color: #5bc0de;\n    \n    :hover {\n      color: #fff;\n      background-color: #31b0d5;\n      border-color: #2aabd2;\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);\n              box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);\n    }\n    \n    :active {\n      color: #fff;\n      background-color: #31b0d5;\n      background-image: none;\n      border-color: #2aabd2;\n    }\n    \n    ".concat(props.disabled ? "\n      background-color: #5bc0de;\n      border-color: #5bc0de;\n      \n      :hover {\n        background-color: #5bc0de;\n        border-color: #5bc0de;\n      }\n    " : '', "\n    \n    ").concat(props.active ? "\n      color: #fff;\n      background-color: #31b0d5;\n      background-image: none;\n      border-color: #2aabd2;\n    " : '', "\n  ");else if (props.warning) return "\n    color: #fff;\n    background-color: #f0ad4e;\n    border-color: #f0ad4e;\n    \n    :hover {\n      color: #fff;\n      background-color: #ec971f;\n      border-color: #eb9316;\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);\n              box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);\n    }\n    \n    :active {\n      color: #fff;\n      background-color: #ec971f;\n      background-image: none;\n      border-color: #eb9316;\n    }\n    \n    ".concat(props.disabled ? "\n      background-color: #f0ad4e;\n      border-color: #f0ad4e;\n      \n      :hover {\n        background-color: #f0ad4e;\n        border-color: #f0ad4e;\n      }\n    " : '', "\n    \n    ").concat(props.active ? "\n      color: #fff;\n      background-color: #ec971f;\n      background-image: none;\n      border-color: #eb9316;\n    " : '', "\n  ");else if (props.danger) return "\n    color: #fff;\n    background-color: #d9534f;\n    border-color: #d9534f;\n    \n    :hover {\n      color: #fff;\n      background-color: #c9302c;\n      border-color: #c12e2a;\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);\n              box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);\n    }\n    \n    :active {\n      color: #fff;\n      background-color: #c9302c;\n      background-image: none;\n      border-color: #c12e2a;\n    }\n    \n    ".concat(props.disabled ? "\n      background-color: #d9534f;\n      border-color: #d9534f;\n      \n      :hover {\n        background-color: #d9534f;\n        border-color: #d9534f;\n      }\n    " : '', "\n    \n    ").concat(props.active ? "\n      color: #fff;\n      background-color: #c9302c;\n      background-image: none;\n      border-color: #c12e2a;\n    " : '', "\n  ");else if (props.link) return "\n    font-weight: normal;\n    color: ".concat(getLinkColor(props), "; \n    border-radius: 0;\n    background-color: transparent;\n    outline: none;\n    box-shadow: none;\n    \n    :hover {\n      border-color: transparent;\n      color: ").concat(getLinkColor(props, 'over'), ";\n      background-color: transparent;\n      outline: none;\n      box-shadow: none;\n    }\n    \n    :focus {\n      border-color: transparent;\n      outline: none;\n      box-shadow: none;\n    }\n    \n    :active {\n      background-color: transparent;\n      outline: none;\n      box-shadow: none;\n    }\n    \n    ").concat(props.disabled ? "\n      color: ".concat(getLinkColor(props, 'over'), ";\n      background-color: transparent;\n      \n      :hover {\n        color: ").concat(getLinkColor(props, 'over'), ";\n        background-color: transparent;\n      }\n    ") : '', "\n    \n    ").concat(props.active ? "\n      background-color: transparent;\n      color: ".concat(getLinkColor(props, 'over'), ";\n    ") : '', "\n    \n    :disabled:focus, :disabled:hover {\n      text-decoration: none;\n      outline: none;\n      box-shadow: none;\n    }\n  ");else if (props.themeColor) return "\n    color: ".concat(getColor(props, 'secondary', 'text'), ";\n    background-color: ").concat(getColor(props, 'secondary'), ";\n    border-color: ").concat(getColor(props, 'secondary', null, true, true), ";\n    \n    :hover {\n      color: ").concat(getColor(props, 'secondary', 'text'), ";\n      background-color: ").concat(getColor(props, 'secondary', null, true), ";\n      border-color: ").concat(getColor(props, 'secondary', null, true, true), ";\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px ").concat((0, _styleUtils.getWithOpacity)(getColor(props, 'secondary'), 0.5), ";\n              box-shadow: 0 0 0 2px ").concat((0, _styleUtils.getWithOpacity)(getColor(props, 'secondary'), 0.5), ";\n    }\n    \n    :active {\n      color: ").concat(getColor(props, 'secondary', 'text'), ";\n      background-color: ").concat(getColor(props, 'secondary', null, true), ";\n      background-image: none;\n      border-color: ").concat(getColor(props, 'secondary', null, true, true), ";\n    }\n    \n    ").concat(props.disabled ? "\n      background-color: ".concat((0, _styleUtils.getWithOpacity)(getColor(props, 'secondary'), 0.5), ";\n      border-color: ").concat((0, _styleUtils.getWithOpacity)(getColor(props, 'secondary'), 0.5), ";\n      \n      :hover {\n        background-color: ").concat((0, _styleUtils.getWithOpacity)(getColor(props, 'secondary'), 0.5), ";\n        border-color: ").concat((0, _styleUtils.getWithOpacity)(getColor(props, 'secondary'), 0.5), ";\n      }\n    ") : '', "\n    \n    ").concat(props.active ? "\n      color: ".concat(getColor(props, 'secondary', 'text'), ";\n      background-color: ").concat(getColor(props, 'secondary', null, true), ";\n      background-image: none;\n      border-color: ").concat(getColor(props, 'secondary', null, true, true), ";\n    ") : '', "\n  ");else return "\n    background: #fff;\n    color: #1e262c;\n    border-color: #B0B0B0;\n    \n    :hover {\n      color: #1e262c;\n      background-color: #E1E2E3;\n      border-color: #B0B0B0;\n    }\n    \n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);\n              box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);\n    }\n    \n    :active {\n      color: #1e262c;\n      background-color: #E1E2E3;\n      border-color: #B0B0B0;\n    }\n    \n    ".concat(props.disabled ? "\n      background-color: #fff;\n      border-color: #1e262c;\n      opacity: 0.6;\n      \n      :hover {\n        background-color: #fff;\n        border-color: #1e262c;\n        opacity: 0.6;\n      }\n    " : '', "\n    \n    ").concat(props.active ? "\n      color: #1e262c;\n      background-color: #E1E2E3;\n      border-color: #B0B0B0;\n    " : '', "\n  ");
}

function getColor(props, type) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'base';
  var isThemeOverlay = arguments.length > 3 ? arguments[3] : undefined;
  var isSupreme = arguments.length > 4 ? arguments[4] : undefined;
  var themeOverlay = isThemeOverlay ? _styleUtils.variables.colors.base : null;
  return _styleUtils.variables.colors[type][themeOverlay ? themeOverlay + (isSupreme ? 'er' : '') : field];
}

function getLinkColor(props) {
  var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'base';
  var forcedColor = props.light ? 'light' : props.dark ? 'dark' : null;
  var isOver = type !== 'base';
  var themeType = _styleUtils.variables.colors.base;
  if (forcedColor) return _styleUtils.variables.colors[forcedColor][isOver ? themeType : 'base'];else return _styleUtils.variables.colors.link[type];
}

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Button, "Button", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Button.js");

  __REACT_HOT_LOADER__.register(getElementStylesBySize, "getElementStylesBySize", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Button.js");

  __REACT_HOT_LOADER__.register(isDisabled, "isDisabled", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Button.js");

  __REACT_HOT_LOADER__.register(getButtonStyles, "getButtonStyles", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Button.js");

  __REACT_HOT_LOADER__.register(getColor, "getColor", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Button.js");

  __REACT_HOT_LOADER__.register(getLinkColor, "getLinkColor", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Button.js");
}();

;