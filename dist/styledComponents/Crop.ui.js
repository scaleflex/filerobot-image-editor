"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PresetsWrapper = exports.ShapeAligner = exports.CropShapeWrapper = exports.CropLabel = exports.CropShape = exports.CropBoxInner = exports.CropBox = exports.BlockRatioIcon = exports.BlockRatioBtn = exports.BlockRatioWrapper = exports.FieldInput = exports.FileInput = exports.FieldLabel = exports.FieldSet = exports.CustomLabel = exports.CropWrapper = void 0;

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _Button = require("./Button");

var _styleUtils = require("./styleUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _templateObject16() {
  var data = _taggedTemplateLiteral(["\n  height: 20px;\n  line-height: 20px;\n"]);

  _templateObject16 = function _templateObject16() {
    return data;
  };

  return data;
}

function _templateObject15() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n  height: 50px;\n"]);

  _templateObject15 = function _templateObject15() {
    return data;
  };

  return data;
}

function _templateObject14() {
  var data = _taggedTemplateLiteral(["\n  height: 50px;\n  line-height: 50px;\n"]);

  _templateObject14 = function _templateObject14() {
    return data;
  };

  return data;
}

function _templateObject13() {
  var data = _taggedTemplateLiteral(["\n  height: ", "px;\n  border: 1px solid ", ";\n  width: ", "px;\n  margin: 0 auto;\n  display: inline-block;\n  vertical-align: middle;\n  ", "\n"]);

  _templateObject13 = function _templateObject13() {
    return data;
  };

  return data;
}

function _templateObject12() {
  var data = _taggedTemplateLiteral(["\n  padding: 15px 0;\n  height: 90px;\n  line-height: 100px;\n"]);

  _templateObject12 = function _templateObject12() {
    return data;
  };

  return data;
}

function _templateObject11() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: top;\n  text-align: center;\n  padding: 0 20px;\n  cursor: pointer;\n  background: ", "\n"]);

  _templateObject11 = function _templateObject11() {
    return data;
  };

  return data;
}

function _templateObject10() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  position: relative;\n  font-weight: bold;\n  font-size: ", ";\n\n  ", "\n  ", "\n  \n  color: ", "\n"]);

  _templateObject10 = function _templateObject10() {
    return data;
  };

  return data;
}

function _templateObject9() {
  var data = _taggedTemplateLiteral(["\n  padding: 0;\n  \n  > span {\n    color: ", " !important;\n   }\n"]);

  _templateObject9 = function _templateObject9() {
    return data;
  };

  return data;
}

function _templateObject8() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  padding: 0 5px;\n"]);

  _templateObject8 = function _templateObject8() {
    return data;
  };

  return data;
}

function _templateObject7() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: ", ";\n  height: 30px;\n  padding: 6px 12px;\n  font-size: 12px;\n  line-height: 1;\n  color: ", ";\n  background: ", ";\n  border-radius: 3px;\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px inset, rgba(82, 104, 109, 0.4) 0px 1px 0px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  vertical-align: middle;\n  border: 0px solid transparent;\n  font-family: Roboto, sans-serif;\n  \n  :hover {\n    outline: none;\n  }\n  \n  :focus {\n    border: 1px solid ", ";\n    outline: none;\n    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;\n  }\n"]);

  _templateObject7 = function _templateObject7() {
    return data;
  };

  return data;
}

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: ", ";\n  height: 30px;\n  padding: 6px 12px;\n  font-size: 12px;\n  line-height: 30px;\n  color: ", ";\n  background: ", ";\n  border-radius: 3px;\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px inset, rgba(82, 104, 109, 0.4) 0px 1px 0px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  vertical-align: middle;\n  border: 0px solid transparent;\n  font-family: Roboto, sans-serif;\n  \n  :hover {\n    outline: none;\n  }\n  \n  :focus {\n    border: 1px solid ", ";\n    outline: none;\n    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;\n  }\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  margin-bottom: 5px;\n  line-height: 15px;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  width: 100px;\n  padding-top: 10px;\n  text-align: center;\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: block;\n  color: ", ";\n  height: 30px;\n  line-height: 30px;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  @media (max-width: 768px) {\n    width: 100%;\n    overflow-x: scroll;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  color: ", ";\n  display: flex;\n  \n  ::-webkit-scrollbar {\n    height: 10px !important;\n  }\n   \n  ::-webkit-scrollbar-thumb {\n    background: #3b4d54;\n    border-radius: 5px;\n  }\n  \n  @media (min-widthL 768px) {\n    overflow-x: auto;\n    overflow-y: hidden;\n    white-space: nowrap;\n  }\n  \n  @media (max-width: 768px) {\n    flex-direction: column;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var CropWrapper = _styledComponents.default.div(_templateObject(), function (props) {
  return props.theme.colors.text;
});

exports.CropWrapper = CropWrapper;
var PresetsWrapper = (0, _styledComponents.default)('div')(_templateObject2());
exports.PresetsWrapper = PresetsWrapper;

var CustomLabel = _styledComponents.default.div(_templateObject3(), function (props) {
  return props.theme.colors.text;
});

exports.CustomLabel = CustomLabel;

var FieldSet = _styledComponents.default.div(_templateObject4());

exports.FieldSet = FieldSet;

var FieldLabel = _styledComponents.default.label(_templateObject5());

exports.FieldLabel = FieldLabel;

var FieldInput = _styledComponents.default.input.attrs(function (props) {
  return {
    type: props.type ? props.type : 'text'
  };
})(_templateObject6(), function (props) {
  return props.fullSize ? '100%' : props.theme.fieldWidth;
}, function (p) {
  return p.theme.colors.text;
}, function (props) {
  return props.dark ? props.theme.colors.primaryBg : props.theme.colors.secondaryBgHover;
}, function (props) {
  return props.theme.colors.secondaryBg;
});

exports.FieldInput = FieldInput;
var FileInput = (0, _styledComponents.default)('input').attrs(function (props) {
  return {
    type: props.type ? props.type : 'file'
  };
})(_templateObject7(), function (props) {
  return props.fullSize ? '100%' : props.theme.fieldWidth;
}, function (p) {
  return p.theme.colors.text;
}, function (props) {
  return props.dark ? props.theme.colors.primaryBg : props.theme.colors.secondaryBgHover;
}, function (props) {
  return props.theme.colors.secondaryBg;
});
exports.FileInput = FileInput;

var BlockRatioWrapper = _styledComponents.default.div(_templateObject8());

exports.BlockRatioWrapper = BlockRatioWrapper;
var BlockRatioBtn = (0, _styledComponents.default)(_Button.Button)(_templateObject9(), function (props) {
  return props.active ? props.theme.colors.text : props.theme.colors.textMute;
});
exports.BlockRatioBtn = BlockRatioBtn;

var BlockRatioIcon = _styledComponents.default.span(_templateObject10(), function (props) {
  return props.fz || '28px';
}, function (props) {
  return (0, _styleUtils.getIconStyles)(props);
}, function (props) {
  return (0, _styleUtils.getIconByName)(props.active ? 'ratio' : 'no-ratio');
}, function (props) {
  return props.theme.textMuted;
});

exports.BlockRatioIcon = BlockRatioIcon;

var CropBox = _styledComponents.default.div(_templateObject11(), function (props) {
  return props.active ? props.theme.colors.secondaryBgHover : 'transparent';
});

exports.CropBox = CropBox;

var CropBoxInner = _styledComponents.default.div(_templateObject12());

exports.CropBoxInner = CropBoxInner;

var CropShape = _styledComponents.default.div(_templateObject13(), function (props) {
  return getHeightOfShape(props.ratio);
}, function (props) {
  return props.theme.textColor;
}, function (props) {
  return getWidthOfShape(props.ratio);
}, function (_ref) {
  var radius = _ref.radius;
  return radius && "border-radius: ".concat(radius, "%;");
});

exports.CropShape = CropShape;
var CropShapeWrapper = (0, _styledComponents.default)('div')(_templateObject14());
exports.CropShapeWrapper = CropShapeWrapper;
var ShapeAligner = (0, _styledComponents.default)('div')(_templateObject15());
exports.ShapeAligner = ShapeAligner;

var CropLabel = _styledComponents.default.div(_templateObject16());

exports.CropLabel = CropLabel;

var getWidthOfShape = function getWidthOfShape(ratio) {
  var width = 50 * ratio;

  if (width > 200) {
    width = 200;
  }

  return width;
};

var getHeightOfShape = function getHeightOfShape(ratio) {
  var height = 50;
  var width = 50 * ratio;

  if (width > 200) {
    height = 200 / ratio;
  }

  return height;
};

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(CropWrapper, "CropWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(PresetsWrapper, "PresetsWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(CustomLabel, "CustomLabel", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(FieldSet, "FieldSet", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(FieldLabel, "FieldLabel", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(FieldInput, "FieldInput", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(FileInput, "FileInput", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(BlockRatioWrapper, "BlockRatioWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(BlockRatioBtn, "BlockRatioBtn", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(BlockRatioIcon, "BlockRatioIcon", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(CropBox, "CropBox", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(CropBoxInner, "CropBoxInner", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(CropShape, "CropShape", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(CropShapeWrapper, "CropShapeWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(ShapeAligner, "ShapeAligner", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(CropLabel, "CropLabel", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(getWidthOfShape, "getWidthOfShape", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");

  __REACT_HOT_LOADER__.register(getHeightOfShape, "getHeightOfShape", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/Crop.ui.js");
}();

;