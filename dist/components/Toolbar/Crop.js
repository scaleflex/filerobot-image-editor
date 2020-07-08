"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../styledComponents");

var _temp;

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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

var _default = (_temp = /*#__PURE__*/function (_Component) {
  _inherits(_default, _Component);

  var _super = _createSuper(_default);

  function _default() {
    var _this;

    _classCallCheck(this, _default);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      aspectRatio: NaN,
      activeRatio: 'custom'
    });

    _defineProperty(_assertThisInitialized(_this), "changeWidth", function (event) {
      var initialZoom = _this.props.initialZoom;
      window.scaleflexPlugins.cropperjs.setCropBoxData({
        width: +event.target.value / initialZoom / window.scaleflexPlugins.zoom
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeHeight", function (event) {
      var initialZoom = _this.props.initialZoom;
      window.scaleflexPlugins.cropperjs.setCropBoxData({
        height: +event.target.value / initialZoom / window.scaleflexPlugins.zoom
      });
    });

    _defineProperty(_assertThisInitialized(_this), "toggleRatio", function (event) {
      event.preventDefault();
      event.stopPropagation();
      var cropDetails = _this.props.cropDetails;
      var width = cropDetails.width,
          height = cropDetails.height;
      var aspectRatio = _this.state.aspectRatio;
      aspectRatio = aspectRatio ? NaN : width / height;
      window.scaleflexPlugins.cropperjs.setAspectRatio(aspectRatio);
      window.scaleflexPlugins.cropperjs.setCropBoxData({
        width: width / window.scaleflexPlugins.zoom,
        height: height / window.scaleflexPlugins.zoom
      });

      _this.setState({
        aspectRatio: aspectRatio
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getCanvasNode", function () {
      return document.getElementById('preview-img-box');
    });

    _defineProperty(_assertThisInitialized(_this), "changeRatio", function (box) {
      var aspectRatio = _this.state.aspectRatio;
      var _this$props = _this.props,
          _this$props$original = _this$props.original,
          _this$props$original$ = _this$props$original.width,
          width = _this$props$original$ === void 0 ? 1 : _this$props$original$,
          _this$props$original$2 = _this$props$original.height,
          height = _this$props$original$2 === void 0 ? 1 : _this$props$original$2,
          updateState = _this$props.updateState;
      var value;

      if (box.name === 'custom' && !aspectRatio) {
        _this.setState({
          activeRatio: box.name
        });

        return;
      }

      updateState({
        roundCrop: box.name === 'round' || box.radius === 50
      });
      value = box.name === 'original' ? width / height : box.value;
      window.scaleflexPlugins.cropperjs.setAspectRatio(value);

      _this.setState({
        activeRatio: box.name,
        aspectRatio: value
      });
    });

    return _this;
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          aspectRatio = _this$state.aspectRatio,
          activeRatio = _this$state.activeRatio;
      var _this$props2 = this.props,
          cropDetails = _this$props2.cropDetails,
          original = _this$props2.original,
          initialZoom = _this$props2.initialZoom,
          t = _this$props2.t,
          config = _this$props2.config;
      var _config$cropPresets = config.cropPresets,
          cropPresets = _config$cropPresets === void 0 ? [] : _config$cropPresets;
      return /*#__PURE__*/_react.default.createElement(_styledComponents.CropWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.CropBox, {
        active: activeRatio === 'custom'
      }, /*#__PURE__*/_react.default.createElement(_styledComponents.FieldSet, null, /*#__PURE__*/_react.default.createElement(_styledComponents.FieldLabel, null, t['common.width']), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        dark: activeRatio === 'custom',
        fullSize: true,
        value: Math.round(cropDetails.width * initialZoom),
        onChange: this.changeWidth
      })), /*#__PURE__*/_react.default.createElement(_styledComponents.BlockRatioWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.BlockRatioBtn, {
        active: aspectRatio,
        link: true,
        onClick: this.toggleRatio
      }, /*#__PURE__*/_react.default.createElement(_styledComponents.BlockRatioIcon, {
        active: aspectRatio
      }))), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldSet, null, /*#__PURE__*/_react.default.createElement(_styledComponents.FieldLabel, null, t['common.height']), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        dark: activeRatio === 'custom',
        fullSize: true,
        value: Math.round(cropDetails.height * initialZoom),
        onChange: this.changeHeight
      })), /*#__PURE__*/_react.default.createElement(_styledComponents.CustomLabel, null, t['common.custom'])), /*#__PURE__*/_react.default.createElement(_styledComponents.PresetsWrapper, null, cropPresets.map(function (box) {
        return /*#__PURE__*/_react.default.createElement(_styledComponents.CropBox, {
          active: activeRatio === box.name,
          onClick: function onClick() {
            _this2.changeRatio(box);
          },
          key: box.name
        }, /*#__PURE__*/_react.default.createElement(_styledComponents.CropBoxInner, null, /*#__PURE__*/_react.default.createElement(_styledComponents.CropShapeWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.ShapeAligner, null), /*#__PURE__*/_react.default.createElement(_styledComponents.CropShape, {
          ratio: box.value || original.width / original.height,
          radius: box.radius
        })), /*#__PURE__*/_react.default.createElement(_styledComponents.CropLabel, null, t["common.".concat(box.name)] || box.name)));
      })));
    }
  }]);

  return _default;
}(_react.Component), _temp);

var _default2 = _default;
exports.default = _default2;
;

var _temp2 = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Toolbar/Crop.js");
}();

;