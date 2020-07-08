"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../styledComponents");

var _throttleDebounce = require("throttle-debounce");

var _Range = _interopRequireDefault(require("../Range"));

var _Select = _interopRequireDefault(require("../Shared/Select"));

var _config = require("../../config");

var _temp;

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

var _default = (_temp = /*#__PURE__*/function (_Component) {
  _inherits(_default, _Component);

  var _super = _createSuper(_default);

  function _default(props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "updateOpacity", function (value) {
      _this.setState({
        opacity: value
      }, function () {
        _this.props.updateState({
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            opacity: value
          })
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "changeURL", function (event) {
      var nextValue = event.target.value;

      _this.setState({
        url: nextValue
      }, function () {
        _this.props.updateState({
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            url: ''
          })
        });

        _this.initWatermarkImage(nextValue);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "readFile", function (event) {
      var input = event.target;

      if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
          _this.changeURL({
            target: {
              value: e.target.result
            }
          });
        };

        reader.readAsDataURL(input.files[0]);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onPositionChange", function (value) {
      _this.setState({
        position: value
      }, function () {
        _this.props.updateState({
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            position: value
          })
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "initWatermarkImage", (0, _throttleDebounce.debounce)(500, function (url) {
      var logoImage = null;

      var updateImageState = function updateImageState(newImage) {
        _this.props.updateState({
          logoImage: newImage,
          isShowSpinner: false,
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            url: newImage.src
          })
        });
      };

      if (url) {
        logoImage = new Image();
        logoImage.setAttribute('crossOrigin', 'Anonymous');

        logoImage.onload = function () {
          var imageFilter = _this.props.watermark.imageFilter;

          if (imageFilter && typeof imageFilter === 'function') {
            logoImage.onload = null;
            updateImageState(imageFilter(logoImage));
          } else {
            updateImageState(logoImage);
          }
        };

        logoImage.onerror = function () {
          _this.props.updateState({
            isShowSpinner: false
          });
        };

        if (url.match(/^https?:\/\/./)) {
          // if the url is a HTTP URL add a cache breaker
          logoImage.src = url + '?' + new Date().getTime();
        } else {
          logoImage.src = url;
        }
      }
    }));

    _defineProperty(_assertThisInitialized(_this), "onApplyWatermarkChange", function () {
      var nextValue = !_this.state.applyByDefault;

      _this.setState({
        applyByDefault: nextValue
      }, function () {
        _this.props.updateState({
          watermark: _objectSpread(_objectSpread({}, _this.props.watermark), {}, {
            applyByDefault: nextValue
          })
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "showWatermarkList", function () {
      _this.setState({
        showWaterMarkList: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "hideWatermarkList", function () {
      _this.setState({
        showWaterMarkList: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onChangeWatermark", function (url) {
      _this.changeURL({
        target: {
          value: url
        }
      });

      _this.hideWatermarkList();
    });

    _defineProperty(_assertThisInitialized(_this), "handleInputTypeChange", function (_ref) {
      var target = _ref.target;

      _this.setState({
        selectedInputType: target.value
      });
    });

    var _props$watermark = props.watermark,
        opacity = _props$watermark.opacity,
        position = _props$watermark.position,
        _url = _props$watermark.url,
        applyByDefault = _props$watermark.applyByDefault,
        activePositions = _props$watermark.activePositions,
        handleOpacity = _props$watermark.handleOpacity;
    var urls = props.watermark.urls;
    var setActivePositions = [];
    var activePosition = position || 'center'; // check if a preset was selected

    if (typeof activePositions === 'string' && _config.WATERMARK_POSITIONS_PRESET.hasOwnProperty(activePositions)) {
      setActivePositions = _config.WATERMARK_POSITIONS_PRESET[activePositions];
    } // check if activePositons is an array
    else if (Array.isArray(activePositions)) {
        var fullPos = Array(9).fill(0); // merge with an default of 9 to prevent errors when the length is lower 9

        activePositions.map(function (val, i) {
          return fullPos[i] = val;
        });
        setActivePositions = fullPos; // return the default that all positions are active
      } else {
        setActivePositions = Array(9).fill(1);
      } // check if position is active else set the first upcomming active as the new active position


    if (setActivePositions[_config.WATERMARK_POSITIONS.indexOf(activePosition)] !== 1) {
      activePosition = _config.WATERMARK_POSITIONS[setActivePositions.indexOf(1)];
    }

    if (urls) {
      urls = urls.map(function () {
        var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

        if (typeof url === 'string') {
          var splittedURL = url.split('/');
          return {
            url: url,
            label: splittedURL[splittedURL.length - 1]
          };
        } else {
          return url;
        }
      });
    }

    _this.state = {
      isBlockRatio: false,
      opacity: opacity || 0.7,
      handleOpacity: typeof handleOpacity === 'boolean' ? handleOpacity : true,
      position: activePosition,
      url: _url || urls && urls.length > 1 ? urls[0] && urls[0].url : '',
      urls: urls || [],
      activePositions: setActivePositions,
      isWatermarkList: urls && urls.length > 1,
      applyByDefault: applyByDefault || false,
      showWaterMarkList: false,
      selectedInputType: urls && urls.length > 1 ? 'gallery' : 'upload'
    };
    return _this;
  }

  _createClass(_default, [{
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      // check if position has ben modified and update
      if (nextProps.watermark.position !== this.state.position) {
        this.onPositionChange(this.state.position);
      }

      if (nextProps.watermark.applyByDefault !== this.props.watermark.applyByDefault) {
        this.setState({
          applyByDefault: nextProps.watermark.applyByDefault
        });

        if (nextProps.watermark.applyByDefault) {
          this.initWatermarkImage(nextProps.watermark.url);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$state = this.state,
          isWatermarkList = _this$state.isWatermarkList,
          url = _this$state.url,
          urls = _this$state.urls,
          opacity = _this$state.opacity,
          handleOpacity = _this$state.handleOpacity,
          position = _this$state.position,
          activePositions = _this$state.activePositions,
          applyByDefault = _this$state.applyByDefault,
          showWaterMarkList = _this$state.showWaterMarkList,
          selectedInputType = _this$state.selectedInputType;
      var fileUploadInput = selectedInputType === 'upload';
      var galleryInput = selectedInputType === 'gallery';
      var urlInput = selectedInputType === 'url';
      var t = this.props.t;
      return /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkWrapper, null, /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkInputTypes, null, /*#__PURE__*/_react.default.createElement("label", null, t['common.gallery'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "gallery",
        checked: selectedInputType === 'gallery',
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("label", null, t['common.upload'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "upload",
        checked: selectedInputType === 'upload',
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null)), /*#__PURE__*/_react.default.createElement("label", null, t['common.url'], /*#__PURE__*/_react.default.createElement("input", {
        type: "radio",
        value: "url",
        checked: selectedInputType === 'url',
        onChange: this.handleInputTypeChange
      }), /*#__PURE__*/_react.default.createElement("span", null))), /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkInputs, null, /*#__PURE__*/_react.default.createElement(_styledComponents.WrapperForURL, null, galleryInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "url"
      }, "Watermark Gallery"), /*#__PURE__*/_react.default.createElement(_Select.default, {
        width: "100%",
        list: urls,
        valueProp: "url",
        id: "gallery",
        value: url,
        style: {
          width: 'calc(100% - 120px)'
        },
        onChange: function onChange(url) {
          _this2.changeURL({
            target: {
              value: url
            }
          });
        }
      })), urlInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "url"
      }, "Watermark URL"), /*#__PURE__*/_react.default.createElement(_styledComponents.FieldInput, {
        id: "url",
        value: url,
        style: {
          width: 'calc(100% - 120px)'
        },
        onChange: this.changeURL
      })), fileUploadInput && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "image-upload"
      }, "Watermark Image"), /*#__PURE__*/_react.default.createElement(_styledComponents.FileInput, {
        id: "image-upload",
        style: {
          width: 'calc(100% - 120px)'
        },
        onChange: this.readFile
      }))), /*#__PURE__*/_react.default.createElement(_styledComponents.WrapperForControls, {
        switcherPosition: handleOpacity ? 'right' : 'left'
      }, handleOpacity && /*#__PURE__*/_react.default.createElement(_styledComponents.WrapperForOpacity, null, /*#__PURE__*/_react.default.createElement("label", {
        htmlFor: "opacity"
      }, "Opacity"), /*#__PURE__*/_react.default.createElement(_Range.default, {
        label: t['common.opacity'],
        min: 0,
        max: 1,
        step: 0.05,
        range: opacity,
        updateRange: this.updateOpacity
      })), /*#__PURE__*/_react.default.createElement(_styledComponents.Switcher, {
        id: "switch-watermark",
        checked: applyByDefault,
        handleChange: this.onApplyWatermarkChange,
        text: t['common.apply_watermark'],
        style: {
          lineHeight: 'inherit',
          float: 'none'
        }
      }))), /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkPositionWrapper, null, _config.WATERMARK_POSITIONS.map(function (value, index) {
        return /*#__PURE__*/_react.default.createElement(_styledComponents.PositionSquare, {
          key: value,
          value: value,
          active: value === position,
          clickable: activePositions[index],
          onClick: function onClick() {
            if (activePositions[index]) {
              _this2.onPositionChange(value);
            }
          }
        });
      })), isWatermarkList && showWaterMarkList && /*#__PURE__*/_react.default.createElement(_styledComponents.Watermarks, null, urls.map(function (url) {
        return /*#__PURE__*/_react.default.createElement(_styledComponents.WatermarkIcon, {
          key: url,
          src: url,
          onClick: function onClick() {
            _this2.onChangeWatermark(url);
          }
        });
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

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Toolbar/Watermark.js");
}();

;