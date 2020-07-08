"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../styledComponents");

var _Tool = _interopRequireDefault(require("./Tool"));

var _Effects = _interopRequireDefault(require("./Effects"));

var _Filters = _interopRequireDefault(require("./Filters"));

var _Crop = _interopRequireDefault(require("./Crop"));

var _Resize = _interopRequireDefault(require("./Resize"));

var _Orientation = _interopRequireDefault(require("./Orientation"));

var _Adjust = _interopRequireDefault(require("./Adjust"));

var _Watermark = _interopRequireDefault(require("./Watermark"));

var _FocusPoint = _interopRequireDefault(require("./FocusPoint"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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

var _default = /*#__PURE__*/function (_Component) {
  _inherits(_default, _Component);

  var _super = _createSuper(_default);

  function _default() {
    _classCallCheck(this, _default);

    return _super.apply(this, arguments);
  }

  _createClass(_default, [{
    key: "render",
    value: function render() {
      var _this = this;

      var _this$props = this.props,
          activeTab = _this$props.activeTab,
          isShowSpinner = _this$props.isShowSpinner,
          activeBody = _this$props.activeBody,
          config = _this$props.config;
      var tools = config.tools;
      return /*#__PURE__*/_react.default.createElement(_styledComponents.Toolbar, {
        overlayYHidden: activeTab !== 'watermark'
      }, !activeTab && tools.map(function (name) {
        return /*#__PURE__*/_react.default.createElement(_Tool.default, _extends({
          name: name,
          key: name
        }, _this.props));
      }), activeTab === 'adjust' && /*#__PURE__*/_react.default.createElement(_Adjust.default, this.props), activeTab === 'effects' && /*#__PURE__*/_react.default.createElement(_Effects.default, this.props), activeTab === 'filters' && /*#__PURE__*/_react.default.createElement(_Filters.default, this.props), activeTab === 'rotate' && /*#__PURE__*/_react.default.createElement(_Orientation.default, this.props), activeTab === 'crop' && /*#__PURE__*/_react.default.createElement(_Crop.default, this.props), activeTab === 'resize' && /*#__PURE__*/_react.default.createElement(_Resize.default, this.props), activeTab === 'watermark' && /*#__PURE__*/_react.default.createElement(_Watermark.default, this.props), activeTab === 'focus_point' && /*#__PURE__*/_react.default.createElement(_FocusPoint.default, this.props), isShowSpinner && /*#__PURE__*/_react.default.createElement(_styledComponents.NoClickOverlay, null), activeBody !== 'preview' && /*#__PURE__*/_react.default.createElement(_styledComponents.NoClickToolbar, null));
    }
  }]);

  return _default;
}(_react.Component);

var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Toolbar/Toolbar.js");
}();

;