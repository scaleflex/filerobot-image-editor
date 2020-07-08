"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _throttleDebounce = require("throttle-debounce");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  width: 190px;\n  padding: 25px 5px 20px 5px;\n  \n  label {\n    display: inline-block;\n    width: 100%;\n    text-align: center;\n    padding-top: 20px;\n  }\n  \n  :after {\n    content: '';\n    display: inline-block;\n    position: absolute;\n    background: ", ";\n    height: 5px;\n    width: 2px;\n    top: 45px;\n    left: calc(50% - 1px);\n  }\n\n  /* CHROME */\n  #range {\n    -webkit-appearance: none;\n    display: block;\n    outline: none;\n    background: ", ";\n    height: 6px;\n    width: 180px;\n    border-radius: 5px;\n    margin-bottom: 5px;\n    \n    &::-webkit-slider-thumb {\n      -webkit-appearance: none;\n      width: 18px;\n      height: 18px;\n      border-radius: 50%;\n      background: ", ";\n    }\n  }\n  \n  /* FIREFOX */\n  #range::-moz-range-thumb {\n    border: none;\n    height: 14px;\n    width: 14px;\n    border-radius: 50%;\n    background: ", ";\n    cursor: pointer;\n  }\n  \n  #range::-moz-range-track {\n    width: 100%;\n    height: 3px;\n    cursor: pointer;\n    background: ", ";\n    border-radius: 5px;\n  }\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Range = /*#__PURE__*/function (_Component) {
  _inherits(Range, _Component);

  var _super = _createSuper(Range);

  function Range(props) {
    var _this;

    _classCallCheck(this, Range);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updateWithDebounce", (0, _throttleDebounce.debounce)(100, function (value) {
      _this.props.updateRange(value);
    }));

    _defineProperty(_assertThisInitialized(_this), "updateRange", function (event) {
      var nextValue = event.target.value;

      _this.setState({
        range: nextValue
      }, function () {
        _this.updateWithDebounce(nextValue);
      });
    });

    _this.state = {
      range: props.range
    };
    return _this;
  }

  _createClass(Range, [{
    key: "render",
    value: function render() {
      var range = this.state.range;
      var _this$props = this.props,
          label = _this$props.label,
          _this$props$min = _this$props.min,
          min = _this$props$min === void 0 ? -100 : _this$props$min,
          _this$props$max = _this$props.max,
          max = _this$props$max === void 0 ? 100 : _this$props$max,
          _this$props$step = _this$props.step,
          step = _this$props$step === void 0 ? 1 : _this$props$step;
      return /*#__PURE__*/_react.default.createElement(Wrapper, {
        className: "image-editor-range-wrapper"
      }, /*#__PURE__*/_react.default.createElement("input", {
        id: "range",
        type: "range",
        value: range,
        min: min,
        max: max,
        step: step,
        onChange: this.updateRange
      }), /*#__PURE__*/_react.default.createElement("label", null, label));
    }
  }]);

  return Range;
}(_react.Component);

var _default = Range;
var _default2 = _default;
exports.default = _default2;
var Wrapper = (0, _styledComponents.default)('div').attrs(function () {
  return {
    className: 'image-editor-range'
  };
})(_templateObject(), function (p) {
  return p.theme.colors.text;
}, function (p) {
  return p.theme.colors.primaryBg;
}, function (p) {
  return p.theme.colors.text;
}, function (p) {
  return p.theme.colors.text;
}, function (p) {
  return p.theme.colors.text;
});
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Range, "Range", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Range.js");

  __REACT_HOT_LOADER__.register(Wrapper, "Wrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Range.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Range.js");
}();

;