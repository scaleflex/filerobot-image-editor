"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AdjustWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  text-align: center;\n  display: flex;\n  justify-content: center;\n  \n  @media (max-width: 768px) {\n    flex-wrap: wrap;\n    \n    .image-editor-range-wrapper {\n      width: 50%;\n      \n      input {\n        width: 100% !important;\n      }\n    }\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var AdjustWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.colors.text;
});

exports.AdjustWrapper = AdjustWrapper;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(AdjustWrapper, "AdjustWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Adjust.ui.js");
}();

;