"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ImageEditor = _interopRequireDefault(require("./ImageEditor"));

var _styledComponents = require("./styledComponents");

var _styledComponents2 = require("styled-components");

var _Modal = require("./components/Modal");

var _config2 = require("./config");

require("./assets/fonts/filerobot-font.css");

var _i18n = _interopRequireDefault(require("./assets/i18n"));

var _dark = _interopRequireDefault(require("./assets/theme/dark"));

var _light = _interopRequireDefault(require("./assets/theme/light"));

var _isServerSide = require("./utils/is-server-side");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

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

var ImageEditorWrapper = /*#__PURE__*/function (_Component) {
  _inherits(ImageEditorWrapper, _Component);

  var _super = _createSuper(ImageEditorWrapper);

  function ImageEditorWrapper(_ref) {
    var _this;

    var _ref$show = _ref.show,
        show = _ref$show === void 0 ? false : _ref$show,
        _ref$src = _ref.src,
        _src = _ref$src === void 0 ? '' : _ref$src,
        _ref$config = _ref.config,
        _config = _ref$config === void 0 ? {} : _ref$config;

    _classCallCheck(this, ImageEditorWrapper);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "processConfig", function (config) {
      var processWithCloudService = config.processWithCloudimage;
      var tools = config.tools || (processWithCloudService ? _config2.CLOUDIMAGE_OPERATIONS : _config2.TOOLS);
      return _objectSpread(_objectSpread(_objectSpread({}, _config2.UPLOADER), {}, {
        processWithCloudService: processWithCloudService,
        processWithFilerobot: !!config.filerobot,
        processWithCloudimage: !!config.cloudimage
      }, config), {}, {
        tools: processWithCloudService ? tools.filter(function (tool) {
          return _config2.CLOUDIMAGE_OPERATIONS.indexOf(tool) > -1;
        }) : tools
      });
    });

    _defineProperty(_assertThisInitialized(_this), "open", function (src) {
      var onOpen = _this.props.onOpen;

      if (_this._isMounted) {
        _this.setState({
          isVisible: true,
          src: src
        }, function () {
          if (onOpen) onOpen();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "close", function () {
      var onClose = _this.props.onClose;

      if (_this._isMounted) {
        _this.setState({
          isVisible: false
        }, function () {
          if (onClose) onClose();
        });
      }
    });

    _config.translations = _config.translations || {};
    _config.language = _config.translations[_config.language] || _i18n.default[_config.language] ? _config.language : 'en';
    _config.theme = _config.theme || {};
    _config.theme.colors = _config.theme.colors || {};
    _config.theme.fonts = _config.theme.fonts || {};
    _config.colorScheme = _config.colorScheme || 'dark';
    _config.platform = _config.platform || 'filerobot';
    _this.state = {
      isVisible: show,
      src: _src,
      config: _this.processConfig(_config),
      t: _objectSpread(_objectSpread({}, _i18n.default[_config.language]), _config.translations[_config.language]),
      colorScheme: _config.colorScheme || 'dark',
      theme: {
        colors: _objectSpread(_objectSpread({}, (_config.colorScheme === 'light' ? _light.default : _dark.default).colors), _config.theme.colors),
        fonts: _objectSpread(_objectSpread({}, (_config.colorScheme === 'light' ? _light.default : _dark.default).fonts), _config.theme.fonts)
      }
    };
    return _this;
  }

  _createClass(ImageEditorWrapper, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (this.props.show !== prevProps.show) {
        if (this.props.show) {
          this.open(this.props.src);
        } else {
          this.close();
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          isVisible = _this$state.isVisible,
          src = _this$state.src,
          config = _this$state.config,
          t = _this$state.t,
          theme = _this$state.theme;
      var _this$props = this.props,
          _this$props$onComplet = _this$props.onComplete,
          onComplete = _this$props$onComplet === void 0 ? function () {} : _this$props$onComplet,
          onBeforeComplete = _this$props.onBeforeComplete,
          showGoBackBtn = _this$props.showGoBackBtn,
          closeOnLoad = _this$props.closeOnLoad,
          _this$props$showInMod = _this$props.showInModal,
          showInModal = _this$props$showInMod === void 0 ? true : _this$props$showInMod,
          onUpload = _this$props.onUpload;
      if (!src || !isVisible || _isServerSide.isServerSide) return null;
      if (src instanceof Blob && config.processWithCloudimage) return null;

      var Inner = /*#__PURE__*/_react.default.createElement(_styledComponents.Container, null, /*#__PURE__*/_react.default.createElement(_ImageEditor.default, {
        src: src,
        config: config,
        onComplete: onComplete,
        onBeforeComplete: onBeforeComplete,
        onUpload: onUpload,
        onClose: this.close,
        showGoBackBtn: showGoBackBtn,
        closeOnLoad: closeOnLoad,
        t: t
      }));

      return /*#__PURE__*/_react.default.createElement(_styledComponents2.ThemeProvider, {
        theme: _objectSpread({}, theme)
      }, showInModal ? /*#__PURE__*/_react.default.createElement(_Modal.Modal, {
        noBorder: true,
        fullScreen: 'lg',
        isHideCloseBtn: true,
        style: {
          borderRadius: 5
        },
        onClose: this.close
      }, Inner) : Inner);
    }
  }]);

  return ImageEditorWrapper;
}(_react.Component);

var _default = ImageEditorWrapper;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(ImageEditorWrapper, "ImageEditorWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/ImageEditorWrapper.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/ImageEditorWrapper.js");
}();

;