"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModalWidth = getModalWidth;
exports.getIconStyles = getIconStyles;
exports.getFieldColorStyles = getFieldColorStyles;
exports.getIconByName = getIconByName;
exports.getColor = exports.getElementStylesBySize = exports.getWithOpacity = exports.getHoverColor = exports.variables = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var commonTheme = {
  textFontSize: '14px',
  colors: {
    success: '#5cb85c',
    warning: '#f0ad4e',
    error: '#d9534f',
    muted: '#636c72',
    base: 'light',
    light: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      darker: '#DFE4E8'
    },
    dark: {
      base: '#1e262c',
      light: '#454F5B',
      lighter: '#637381'
    },
    primary: {
      base: '#181830',
      light: '#263138',
      lighter: '#34444c',
      dark: '#101021',
      darker: '#090912',
      text: '#F9FAFB'
    },
    secondary: {
      base: '#00707c',
      light: '#007E8A',
      lighter: '#008D99',
      dark: '#00616D',
      darker: '#005662',
      text: '#F9FAFB'
    },
    text: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      mute: '#aaa',
      light: '#fff'
    },
    background: {
      base: '#f1f1f1'
    },
    border: {
      base: '#ccc'
    },
    link: {
      base: '#00707c',
      over: '#00616D'
    },
    brand: {
      success: '#5cb85c',
      warning: '#f0ad4e',
      error: '#d9534f',
      muted: '#636c72'
    }
  },
  modal: {
    borderRadius: '4px',
    fluid: {
      xs: '35%',
      sm: '45%',
      md: '60%',
      lg: '80%',
      xl: '90%'
    },
    fixed: {
      xs: '200px',
      sm: '300px',
      md: '450px',
      lg: '650px',
      xl: '800px'
    }
  },
  button: {
    tt: 'none'
  }
};

var variables = _objectSpread(_objectSpread({}, commonTheme), {}, {
  radii: [0, '0.2rem', '0.25rem', '.3rem'],
  // backgrounds
  mainBackgroundColor: '#1e262c',
  mainBackgroundColorHover: '#263138',
  mainBackgroundColorActive: '#34444c',
  secondBackgroundColor: '#263138',
  // text
  textColor: '#e7f1f4',
  textColorHover: '#fff',
  textMuted: '#70777f',
  // border
  borderColor: '#70777f',
  borderDarkColor: '#161e23',
  fieldWidth: '120px',
  borderInputColor: '#3b4d54',
  borderInputColorHover: '#52686d',
  borderInputColorActive: '#52686d',
  inputBackgroundColor: '#34444c',
  inputBoxShadowColor: '#03a9bb',
  inputPlaceholderColor: '#888d94',
  // main color
  mainThemeColor: '#00707c',
  mainThemeColorHover: '#00616D',
  mainThemeColorOpacity: 'rgba(0, 112, 124, 0.5)',
  btnSaveColor: '#009345',
  btnSaveColorHover: '#00b549',
  btnThemeColor: '#34444c',
  btnPaddingSm: '2px 14px',
  btnFontSizeSm: '12px',
  btnBorderRadius: '2px',
  modalOverlayColor: '#484848',
  btnMainColor: function btnMainColor(props) {
    return "\n    color: #fff;\n    background-color: #00707c;\n    border-color: #00707c;\n\n    :hover {\n      color: #fff;\n      background-color: #00616D;\n      border-color: #00616D;\n    }\n\n    :focus {\n      -webkit-box-shadow: 0 0 0 2px rgba(0, 112, 124, 0.5);\n              box-shadow: 0 0 0 2px rgba(0, 112, 124, 0.5);\n    }\n\n    :active {\n      color: #fff;\n      background-color: #00616D;\n      background-image: none;\n      border-color: #00616D;\n    }\n\n    ".concat(props.disabled ? "\n      background-color: rgba(0, 112, 124, 0.5);\n      border-color: rgba(0, 112, 124, 0.5);\n    " : '', "\n\n    ").concat(props.active ? "\n       color: #fff;\n      background-color: #00616D;\n      background-image: none;\n      border-color: #00616D;\n    " : '', "\n  ");
  },
  button: _objectSpread(_objectSpread({}, commonTheme.button), {}, {
    sm: {
      p: '4px 10px',
      fz: '12px',
      lh: '1.5',
      br: '3px'
    },
    md: {
      p: '6px 12px',
      fz: '14px',
      lh: '1.5',
      br: '3px'
    },
    lg: {
      p: '8px 14px',
      fz: '16px',
      lh: '1.5',
      br: '5px'
    }
  }),
  modal: _objectSpread(_objectSpread({}, commonTheme.modal), {}, {
    backgroundColor: '#1e262c',
    color: '#e7f1f4',
    colorMuted: '#70777f',
    colorMutedHover: '#e7f1f4'
  })
});

exports.variables = variables;

function getModalWidth(props) {
  var exact = props.exact,
      xl = props.xl,
      lg = props.lg,
      md = props.md,
      sm = props.sm,
      xs = props.xs,
      fluid = props.fluid;
  var size = exact ? 'exact' : xl ? 'xl' : lg ? 'lg' : md ? 'md' : sm ? 'sm' : xs ? 'xs' : 'md';
  if (size === 'exact') return exact;
  return variables.modal[fluid ? 'fluid' : 'fixed'][size];
}

function getFieldColorStyles(props) {
  if (props.dark) return "";else return "\n    color: ".concat(getColor(props, 'text'), ";\n    background-color: ").concat(getColor(props, 'background'), ";\n    border: 1px solid ").concat(getColor(props, 'border'), ";\n\n    &::-webkit-input-placeholder {\n      color:  ").concat(getColor(props, 'text', 'muted'), ";\n    }\n    &::-moz-placeholder {\n      color:  ").concat(getColor(props, 'text', 'muted'), ";\n    }\n    &:-ms-input-placeholder {\n      color:  ").concat(getColor(props, 'text', 'muted'), ";\n    }\n    &::-ms-input-placeholder {\n      color:  ").concat(getColor(props, 'text', 'muted'), ";\n    }\n    &::placeholder {\n      color:  ").concat(getColor(props, 'text', 'muted'), ";\n    }\n\n    &:focus {\n      color: ").concat(getColor(props, 'text'), ";\n      background-color: ").concat(getColor(props, 'background'), ";\n      border-color: ").concat(getColor(props, 'link'), ";\n      outline: 0;\n    }\n    &:focus::-ms-value {\n      color: ").concat(getColor(props, 'text'), ";\n      background-color: ").concat(getColor(props, 'background'), ";\n      border-color: ").concat(getColor(props, 'link'), ";\n      outline: 0;\n    }\n  ");
}

function getIconStyles(props) {
  return "\n    font-family: 'filerobot-image-editor-font' !important;\n    color: ".concat(props.muted ? props.theme.colors.textMute : props.theme.colors.text, ";\n    speak: none;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n\n    /* Better Font Rendering =========== */\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n\n    :hover {\n      color: ").concat(props.muted ? props.theme.colors.textMute : props.theme.colors.text, ";\n    }\n  ");
}

function shadeBlendConvert(p, from, to) {
  if (typeof p != "number" || p < -1 || p > 1 || typeof from != "string" || from[0] != 'r' && from[0] != '#' || typeof to != "string" && typeof to != "undefined") return null; //ErrorCheck

  if (!window.sbcRip) window.sbcRip = function (d) {
    var l = d.length,
        RGB = new Object();

    if (l > 9) {
      d = d.split(",");
      if (d.length < 3 || d.length > 4) return null; //ErrorCheck

      RGB[0] = i(d[0].slice(4)), RGB[1] = i(d[1]), RGB[2] = i(d[2]), RGB[3] = d[3] ? parseFloat(d[3]) : -1;
    } else {
      if (l == 8 || l == 6 || l < 4) return null; //ErrorCheck

      if (l < 6) d = "#" + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (l > 4 ? d[4] + "" + d[4] : ""); //3 digit

      d = i(d.slice(1), 16), RGB[0] = d >> 16 & 255, RGB[1] = d >> 8 & 255, RGB[2] = d & 255, RGB[3] = l == 9 || l == 5 ? r((d >> 24 & 255) / 255 * 10000) / 10000 : -1;
    }

    return RGB;
  };
  var i = parseInt,
      r = Math.round,
      h = from.length > 9,
      h = typeof to == "string" ? to.length > 9 ? true : to == "c" ? !h : false : h,
      b = p < 0,
      p = b ? p * -1 : p,
      to = to && to != "c" ? to : b ? "#000000" : "#FFFFFF",
      f = window.sbcRip(from),
      t = window.sbcRip(to);
  if (!f || !t) return null; //ErrorCheck

  if (h) return "rgb(" + r((t[0] - f[0]) * p + f[0]) + "," + r((t[1] - f[1]) * p + f[1]) + "," + r((t[2] - f[2]) * p + f[2]) + (f[3] < 0 && t[3] < 0 ? ")" : "," + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 10000) / 10000 : t[3] < 0 ? f[3] : t[3]) + ")");else return "#" + (0x100000000 + (f[3] > -1 && t[3] > -1 ? r(((t[3] - f[3]) * p + f[3]) * 255) : t[3] > -1 ? r(t[3] * 255) : f[3] > -1 ? r(f[3] * 255) : 255) * 0x1000000 + r((t[0] - f[0]) * p + f[0]) * 0x10000 + r((t[1] - f[1]) * p + f[1]) * 0x100 + r((t[2] - f[2]) * p + f[2])).toString(16).slice(f[3] > -1 || t[3] > -1 ? 1 : 3);
}

function isHex(color) {
  return /^#?([a-f\d])([a-f\d])([a-f\d])$/i.test(color) || /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.test(color);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  });
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

var getHoverColor = function getHoverColor(color) {
  if (!color) return null;
  var nextColor = shadeBlendConvert(-0.1, color) || '';
  return nextColor.toLowerCase() === color.toLowerCase() ? shadeBlendConvert(0.25, color) : nextColor;
};

exports.getHoverColor = getHoverColor;

var getWithOpacity = function getWithOpacity(color, opacity) {
  if (!color) return null;
  var isHexColor = isHex(color);
  var hexColor = isHexColor ? color : shadeBlendConvert(0, color, 'c');
  if (!hexColor) return null;
  var rgbColor = hexToRgb(hexColor);
  if (!rgbColor) return color;
  return "rgba(".concat(rgbColor.r, ", ").concat(rgbColor.g, ", ").concat(rgbColor.b, ", ").concat(opacity, ")");
};

exports.getWithOpacity = getWithOpacity;

var getElementStylesBySize = function getElementStylesBySize(props, type, field) {
  var sm = props.sm,
      lg = props.lg;
  var size = sm ? 'sm' : lg ? 'lg' : 'md';
  return variables[type] && variables[type][size] && variables[type][size][field];
};

exports.getElementStylesBySize = getElementStylesBySize;

var getColor = function getColor(props, type) {
  var field = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'base';
  var isThemeOverlay = arguments.length > 3 ? arguments[3] : undefined;
  var isSupreme = arguments.length > 4 ? arguments[4] : undefined;
  var themeOverlay = isThemeOverlay ? variables.colors.base : null;
  return variables.colors[type][themeOverlay ? themeOverlay + (isSupreme ? 'er' : '') : field];
};

exports.getColor = getColor;

function getIconByName(name) {
  var char = '';

  switch (name) {
    case 'watermark':
      char = '\\e918';
      break;

    case 'reset':
      char = '\\e912';
      break;

    case 'flip-v':
      char = '\\e916';
      break;

    case 'flip-h':
      char = '\\e914';
      break;

    case 'cross':
      char = '\\e90c';
      break;

    case 'effects':
      char = '\\e900';
      break;

    case 'filters':
      char = '\\e904';
      break;

    case 'adjust':
      char = '\\e90a';
      break;

    case 'crop':
      char = '\\e901';
      break;

    case 'resize':
      char = '\\e907';
      break;

    case 'rotate':
      char = '\\e90b';
      break;

    case 'previous':
      char = '\\e905';
      break;

    case 'next':
      char = '\\e906';
      break;

    case 'ratio':
      char = '\\e90e';
      break;

    case 'no-ratio':
      char = '\\e90f';
      break;

    case 'left-rotate':
      char = '\\e902';
      break;

    case 'right-rotate':
      char = '\\e908';
      break;

    case 'focus_point':
      char = '\\e919';
      break;

    default:
      return;
  }

  return "\n    :before {\n      content: '".concat(char, "'\n    }\n  ");
}

;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(commonTheme, "commonTheme", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(variables, "variables", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getModalWidth, "getModalWidth", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getFieldColorStyles, "getFieldColorStyles", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getIconStyles, "getIconStyles", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(shadeBlendConvert, "shadeBlendConvert", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(isHex, "isHex", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(hexToRgb, "hexToRgb", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getHoverColor, "getHoverColor", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getWithOpacity, "getWithOpacity", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getElementStylesBySize, "getElementStylesBySize", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getColor, "getColor", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");

  __REACT_HOT_LOADER__.register(getIconByName, "getIconByName", "/home/patrik/projects/filerobot-image-editor/projects/react/styledComponents/styleUtils.js");
}();

;