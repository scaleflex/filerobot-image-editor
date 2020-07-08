"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../styledComponents");

var _ = require("../");

var _fullScreenHandle = require("../../utils/full-screen-handle");

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
      var _this$props = this.props,
          activeTab = _this$props.activeTab,
          onRevert = _this$props.onRevert,
          apply = _this$props.apply,
          onClose = _this$props.onClose,
          showGoBackBtn = _this$props.showGoBackBtn,
          processWithCloudService = _this$props.processWithCloudService,
          processWithFilerobot = _this$props.processWithFilerobot,
          handleSave = _this$props.handleSave,
          activeBody = _this$props.activeBody,
          t = _this$props.t,
          config = _this$props.config,
          onUpload = _this$props.onUpload;
      var tools = config.tools;
      var isOneTool = tools.length === 1;
      var filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
      var onFinishButtonLabel = !processWithCloudService && !processWithFilerobot ? t['toolbar.download'] : t['toolbar.save'];

      var applyAndSave = function applyAndSave() {
        apply(handleSave);
      };

      return /*#__PURE__*/_react.default.createElement(_styledComponents.HeaderWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.HeaderTop, null, /*#__PURE__*/_react.default.createElement(_styledComponents.Title, null, t["toolbar.".concat(filteredName)] || t["header.image_editor_title"]), /*#__PURE__*/_react.default.createElement(_styledComponents.FullscreenBtn, {
        onClick: _fullScreenHandle.toggleModalFullscreen,
        title: t["header.toggle_fullscreen"]
      }), /*#__PURE__*/_react.default.createElement(_styledComponents.CloseBtn, {
        onClick: onClose,
        title: t["header.close_modal"]
      })), /*#__PURE__*/_react.default.createElement(_styledComponents.ToolbarWrapper, {
        overlayYHidden: activeTab !== 'watermark'
      }, /*#__PURE__*/_react.default.createElement(_styledComponents.ActionsWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.LeftActions, {
        hide: !activeTab
      }, /*#__PURE__*/_react.default.createElement(_styledComponents.CancelBtn, {
        onClick: isOneTool ? onClose : onRevert,
        sm: true,
        default: true,
        fullSize: true
      }, t["toolbar.cancel"]), showGoBackBtn && /*#__PURE__*/_react.default.createElement(_styledComponents.CancelBtn, {
        hide: activeTab,
        onClick: onClose,
        sm: true,
        default: true,
        fullSize: true
      }, t["toolbar.go_back"])), activeBody === 'preview' && /*#__PURE__*/_react.default.createElement(_styledComponents.RightActions, null, /*#__PURE__*/_react.default.createElement(_styledComponents.Button, {
        themeColor: true,
        sm: true,
        success: !activeTab || activeTab === 'resize',
        themeBtn: activeTab,
        fullSize: true,
        onClick: isOneTool ? applyAndSave : !activeTab ? function () {
          handleSave();
        } : function () {
          apply();
        } ///add here handleSave onUpload

      }, !activeTab || activeTab === 'resize' ? onFinishButtonLabel : t['toolbar.apply']))), /*#__PURE__*/_react.default.createElement(_.Toolbar, this.props)));
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

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Header/Header.js");
}();

;