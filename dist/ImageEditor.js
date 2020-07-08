"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _index = require("./styledComponents/index");

var _index2 = require("./components/index");

var _imageType = _interopRequireDefault(require("image-type"));

require("./lib/caman");

var _config = require("./config");

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

var INITIAL_PARAMS = {
  effect: null,
  filter: null,
  crop: null,
  resize: null,
  rotate: null,
  correctionDegree: 0,
  flipX: false,
  flipY: false,
  adjust: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    exposure: 0
  },
  canvasDimensions: {
    width: 300,
    height: 200,
    ratio: 1.5
  }
};

var _default = (_temp = /*#__PURE__*/function (_Component) {
  _inherits(_default, _Component);

  var _super = _createSuper(_default);

  function _default(_props) {
    var _this;

    _classCallCheck(this, _default);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "_isMounted", false);

    _defineProperty(_assertThisInitialized(_this), "loadImage", function () {
      var src = _this.props.src;
      var _this$state = _this.state,
          _this$state$reduceBef = _this$state.reduceBeforeEdit;
      _this$state$reduceBef = _this$state$reduceBef === void 0 ? {} : _this$state$reduceBef;
      var mode = _this$state$reduceBef.mode,
          widthLimit = _this$state$reduceBef.widthLimit,
          heightLimit = _this$state$reduceBef.heightLimit,
          watermark = _this$state.watermark;

      if (src instanceof Blob) {
        src = URL.createObjectURL(src);
      }

      var splittedSrc = src.split('/');
      var imageName = splittedSrc[splittedSrc.length - 1];
      var img = new Image();
      var logoImage = null;

      if (watermark && watermark.url) {
        logoImage = new Image();
        logoImage.setAttribute('crossOrigin', 'Anonymous');
        logoImage.src = watermark.url + '?' + new Date().getTime();
      }

      img.setAttribute('crossOrigin', 'Anonymous');
      img.src = src;

      if (!src.startsWith('data:image/') && !src.startsWith('blob:')) {
        // Image is not a blob, insert query param to avoid caching
        img.src = img.src + (img.src.indexOf('?') > -1 ? '&version=' : '?version=') + new Date().getTime();
      }

      img.onload = function () {
        var canvasDimensions = {
          width: img.width,
          height: img.height,
          ratio: img.width / img.height
        };
        var propsOnApply = {
          activeBody: 'preResize',
          isShowSpinner: false,
          img: img,
          logoImage: logoImage,
          imageName: imageName.indexOf('?') > -1 ? imageName.slice(0, imageName.indexOf('?')) : imageName
        };

        if (mode === 'manual' && (widthLimit < img.width || heightLimit < img.height)) {
          _this.setState(_objectSpread({
            canvasDimensions: canvasDimensions
          }, propsOnApply));
        } else if (mode === 'auto' && (widthLimit < img.width || heightLimit < img.height)) {
          if (img.width >= img.height) {
            var ratio = img.width / img.height;
            var dimensions = {
              ratio: ratio,
              width: widthLimit,
              height: widthLimit / ratio
            };

            _this.setState(_objectSpread(_objectSpread({
              preCanvasDimensions: _objectSpread({}, dimensions),
              canvasDimensions: _objectSpread({}, dimensions)
            }, propsOnApply), {}, {
              activeBody: 'preview',
              isPreResize: true
            }));
          } else {
            var _ratio = img.height / img.width;

            var _dimensions = {
              ratio: _ratio,
              width: heightLimit / _ratio,
              height: heightLimit
            };

            _this.setState(_objectSpread(_objectSpread({
              preCanvasDimensions: _objectSpread({}, _dimensions),
              canvasDimensions: _objectSpread({}, _dimensions)
            }, propsOnApply), {}, {
              activeBody: 'preview',
              isPreResize: true
            }));
          }
        } else {
          var config = _this.props.config;
          var tools = config.tools;
          var isOneTool = tools.length === 1;
          var activeTab;

          if (isOneTool) {
            activeTab = tools[0];
          }

          _this.setState(_objectSpread(_objectSpread({}, propsOnApply), {}, {
            activeBody: 'preview',
            isPreResize: false
          }), function () {
            _this.setState({
              activeTab: activeTab
            });
          });
        }
      };
    });

    _defineProperty(_assertThisInitialized(_this), "determineImageType", function () {
      var src = _this.props.src;

      if (src instanceof Blob) {
        _this.setState({
          imageMime: src.type
        });

        return;
      }

      var xhr = new XMLHttpRequest();
      xhr.open('GET', src);
      xhr.responseType = 'arraybuffer';

      xhr.onload = function (_ref) {
        var target = _ref.target;

        _this.setState({
          imageMime: (0, _imageType.default)(new Uint8Array(target.response)).mime
        });
      };

      xhr.send();
    });

    _defineProperty(_assertThisInitialized(_this), "updateState", function (props) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (_this._isMounted) {
        _this.setState(props, callback);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRevert", function () {
      var _this$state2 = _this.state,
          cancelLastOperation = _this$state2.cancelLastOperation,
          activeTab = _this$state2.activeTab;

      _this.setState({
        activeTab: null,
        isHideCanvas: true,
        isShowSpinner: true
      });

      cancelLastOperation(activeTab, function () {
        _this.setState(_objectSpread({
          isHideCanvas: false,
          isShowSpinner: false
        }, INITIAL_PARAMS));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onAdjust", function (handler, value) {
      var onAdjust = _this.state.onAdjust;
      onAdjust(handler, value);
    });

    _defineProperty(_assertThisInitialized(_this), "onRotate", function (value, correctionDegree, flipX, flipY) {
      var onRotate = _this.state.onRotate;
      onRotate(value, correctionDegree, flipX, flipY);
    });

    _defineProperty(_assertThisInitialized(_this), "onFlip", function (axis) {
      var flip = _this.state.flip;
      flip(axis);
    });

    _defineProperty(_assertThisInitialized(_this), "onSave", function () {
      var saveImage = _this.state.saveImage;

      _this.setState({
        isShowSpinner: true
      });

      saveImage();
    });

    _defineProperty(_assertThisInitialized(_this), "onDownloadImage", function (onUpload) {
      var onBeforeComplete = _this.props.onBeforeComplete;
      var _this$state3 = _this.state,
          downloadImage = _this$state3.downloadImage,
          getResultCanvas = _this$state3.getResultCanvas;
      var canvas = getResultCanvas(); // console.log(canvas)

      var isDownload = onBeforeComplete ? onBeforeComplete({
        status: 'before-complete',
        canvas: canvas
      }) : true; // onUpload('stuff')

      if (isDownload) {
        downloadImage(function () {
          _this.props.onComplete({
            status: 'success',
            canvas: canvas
          }); //onUpload


          _this.props.onClose();
        }, _this.props.onUpload);
      } else {
        _this.props.onComplete({
          status: 'success',
          canvas: canvas
        });

        _this.props.onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onApplyEffects", function (name) {
      var _this$state4 = _this.state,
          applyCorrections = _this$state4.applyCorrections,
          effect = _this$state4.effect;
      var nextEffect = effect === name ? null : name;

      _this.setState({
        isShowSpinner: true,
        effect: nextEffect
      }, function () {
        applyCorrections(function () {
          _this.setState({
            isShowSpinner: false
          });
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onApplyFilters", function (name) {
      var _this$state5 = _this.state,
          applyCorrections = _this$state5.applyCorrections,
          filter = _this$state5.filter;
      var nextFilter = filter === name ? null : name;

      _this.setState({
        isShowSpinner: true,
        filter: nextFilter
      }, function () {
        applyCorrections(function () {
          _this.setState({
            isShowSpinner: false
          });
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleSave", function () {
      var _this$state6 = _this.state,
          processWithFilerobot = _this$state6.processWithFilerobot,
          processWithCloudService = _this$state6.processWithCloudService;

      if (!processWithFilerobot && !processWithCloudService) {
        _this.onDownloadImage();
      } else {
        _this.onSave();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "apply", function (callback) {
      var _this$state7 = _this.state,
          activeTab = _this$state7.activeTab,
          applyChanges = _this$state7.applyChanges;
      applyChanges(activeTab, callback);

      _this.setState({
        activeTab: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "redoOperation", function (operationIndex) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var resetActiveTab = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var applyOperations = _this.state.applyOperations;

      if (resetActiveTab) {
        _this.setState({
          activeTab: null,
          isHideCanvas: true,
          isShowSpinner: true
        });
      } else {
        _this.setState({
          isHideCanvas: true,
          isShowSpinner: true
        });
      }

      applyOperations(operationIndex, function () {
        _this.setState({
          isHideCanvas: false,
          isShowSpinner: false
        }, callback);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "resetOperations", function () {
      var resetAll = _this.state.resetAll;

      _this.setState({
        activeTab: null,
        isHideCanvas: true,
        isShowSpinner: true
      });

      resetAll(function () {
        _this.setState(_objectSpread({
          isHideCanvas: false,
          isShowSpinner: false
        }, INITIAL_PARAMS));
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onPreResize", function (value) {
      var config = _this.props.config;
      var tools = config.tools;
      var isOneTool = tools.length === 1;
      var activeTab;

      if (isOneTool) {
        activeTab = tools[0];
      }

      switch (value) {
        case 'keep':
          _this.setState({
            canvasDimensions: {},
            isPreResize: false,
            activeBody: 'preview'
          }, function () {
            _this.setState({
              activeTab: activeTab
            });
          });

          break;

        case 'resize':
          var canvasDimensions = _this.state.canvasDimensions;

          _this.setState({
            preCanvasDimensions: canvasDimensions,
            isPreResize: true,
            activeBody: 'preview'
          }, function () {
            _this.setState({
              activeTab: activeTab
            });
          });

          break;
      }
    });

    var _props$config = _props.config,
        processWithCloudimage = _props$config.processWithCloudimage,
        _processWithFilerobot = _props$config.processWithFilerobot,
        _processWithCloudService = _props$config.processWithCloudService,
        uploadWithCloudimageLink = _props$config.uploadWithCloudimageLink,
        reduceBeforeEdit = _props$config.reduceBeforeEdit,
        cropBeforeEdit = _props$config.cropBeforeEdit,
        _watermark = _props$config.watermark,
        imageSealing = _props$config.imageSealing;
    _this.state = _objectSpread(_objectSpread({
      isShowSpinner: true,
      isHideCanvas: false,
      activeTab: null,
      activeBody: null,
      currentOperation: null,
      original: {
        width: 300,
        height: 200
      },
      cropDetails: {
        width: 300,
        height: 200
      },
      canvasDimensions: {
        width: 300,
        height: 200,
        ratio: 1.5
      },
      processWithFilerobot: _processWithFilerobot,
      processWithCloudimage: processWithCloudimage,
      processWithCloudService: _processWithCloudService,
      uploadCloudimageImage: uploadWithCloudimageLink,
      reduceBeforeEdit: reduceBeforeEdit,
      cropBeforeEdit: cropBeforeEdit,
      roundCrop: false,
      imageSealing: _objectSpread({
        enabled: false,
        salt: '',
        char_count: 10,
        include_params: null
        /* include all by default */

      }, imageSealing),
      operationsOriginal: [],
      operationsZoomed: [],
      operations: [],
      canvasZoomed: null,
      canvasOriginal: null,
      isPreResize: false,
      initialZoom: 1
    }, INITIAL_PARAMS), {}, {
      watermark: _watermark || _config.DEFAULT_WATERMARK,
      focusPoint: {
        x: null,
        y: null
      }
    });
    return _this;
  }

  _createClass(_default, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this._isMounted = true;
      this.loadImage();
      this.determineImageType();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this._isMounted = false;
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state8 = this.state,
          isShowSpinner = _this$state8.isShowSpinner,
          activeTab = _this$state8.activeTab,
          operations = _this$state8.operations,
          operationsOriginal = _this$state8.operationsOriginal,
          operationsZoomed = _this$state8.operationsZoomed,
          currentOperation = _this$state8.currentOperation,
          isHideCanvas = _this$state8.isHideCanvas,
          cropDetails = _this$state8.cropDetails,
          original = _this$state8.original,
          canvasDimensions = _this$state8.canvasDimensions,
          processWithCloudimage = _this$state8.processWithCloudimage,
          processWithFilerobot = _this$state8.processWithFilerobot,
          processWithCloudService = _this$state8.processWithCloudService,
          uploadCloudimageImage = _this$state8.uploadCloudimageImage,
          imageMime = _this$state8.imageMime,
          lastOperation = _this$state8.lastOperation,
          operationList = _this$state8.operationList,
          initialZoom = _this$state8.initialZoom,
          canvasZoomed = _this$state8.canvasZoomed,
          canvasOriginal = _this$state8.canvasOriginal,
          reduceBeforeEdit = _this$state8.reduceBeforeEdit,
          cropBeforeEdit = _this$state8.cropBeforeEdit,
          img = _this$state8.img,
          imageName = _this$state8.imageName,
          activeBody = _this$state8.activeBody,
          isPreResize = _this$state8.isPreResize,
          preCanvasDimensions = _this$state8.preCanvasDimensions,
          logoImage = _this$state8.logoImage,
          imageSealing = _this$state8.imageSealing,
          effect = _this$state8.effect,
          filter = _this$state8.filter,
          crop = _this$state8.crop,
          roundCrop = _this$state8.roundCrop,
          resize = _this$state8.resize,
          rotate = _this$state8.rotate,
          correctionDegree = _this$state8.correctionDegree,
          flipX = _this$state8.flipX,
          flipY = _this$state8.flipY,
          adjust = _this$state8.adjust,
          watermark = _this$state8.watermark,
          focusPoint = _this$state8.focusPoint;
      var _this$props = this.props,
          src = _this$props.src,
          config = _this$props.config,
          onClose = _this$props.onClose,
          onComplete = _this$props.onComplete,
          _this$props$closeOnLo = _this$props.closeOnLoad,
          closeOnLoad = _this$props$closeOnLo === void 0 ? true : _this$props$closeOnLo,
          _this$props$showGoBac = _this$props.showGoBackBtn,
          showGoBackBtn = _this$props$showGoBac === void 0 ? false : _this$props$showGoBac,
          _this$props$t = _this$props.t,
          t = _this$props$t === void 0 ? {} : _this$props$t,
          theme = _this$props.theme,
          onUpload = _this$props.onUpload;
      var imageParams = {
        effect: effect,
        filter: filter,
        crop: crop,
        resize: resize,
        rotate: rotate,
        flipX: flipX,
        flipY: flipY,
        adjust: adjust,
        correctionDegree: correctionDegree
      };

      var headerProps = _objectSpread(_objectSpread({
        t: t,
        theme: theme,
        cropDetails: cropDetails,
        original: original,
        activeTab: activeTab,
        src: src,
        onClose: onClose,
        config: config,
        canvasDimensions: canvasDimensions,
        processWithCloudimage: processWithCloudimage,
        processWithFilerobot: processWithFilerobot,
        processWithCloudService: processWithCloudService,
        operations: operations,
        operationsOriginal: operationsOriginal,
        operationsZoomed: operationsZoomed,
        initialZoom: initialZoom,
        isShowSpinner: isShowSpinner,
        showGoBackBtn: showGoBackBtn,
        img: img,
        logoImage: logoImage,
        imageName: imageName,
        activeBody: activeBody,
        preCanvasDimensions: preCanvasDimensions,
        updateState: this.updateState,
        onRevert: this.onRevert,
        apply: this.apply,
        onSave: this.onSave,
        onFlip: this.onFlip,
        onApplyEffects: this.onApplyEffects,
        onApplyFilters: this.onApplyFilters,
        onRotate: this.onRotate,
        onAdjust: this.onAdjust,
        onDownloadImage: this.onDownloadImage,
        handleSave: this.handleSave
      }, imageParams), {}, {
        watermark: watermark,
        focusPoint: focusPoint,
        onUpload: onUpload
      });

      var previewProps = _objectSpread(_objectSpread({
        t: t,
        theme: theme,
        cropDetails: cropDetails,
        original: original,
        activeTab: activeTab,
        isShowSpinner: isShowSpinner,
        operations: operations,
        operationsOriginal: operationsOriginal,
        operationsZoomed: operationsZoomed,
        initialZoom: initialZoom,
        currentOperation: currentOperation,
        isHideCanvas: isHideCanvas,
        src: src,
        imageMime: imageMime,
        onClose: onClose,
        onComplete: onComplete,
        canvasDimensions: canvasDimensions,
        closeOnLoad: closeOnLoad,
        config: config,
        processWithCloudimage: processWithCloudimage,
        processWithFilerobot: processWithFilerobot,
        processWithCloudService: processWithCloudService,
        imageSealing: imageSealing,
        uploadCloudimageImage: uploadCloudimageImage,
        lastOperation: lastOperation,
        operationList: operationList,
        canvasZoomed: canvasZoomed,
        canvasOriginal: canvasOriginal,
        reduceBeforeEdit: reduceBeforeEdit,
        cropBeforeEdit: cropBeforeEdit,
        img: img,
        logoImage: logoImage,
        imageName: imageName,
        isPreResize: isPreResize,
        preCanvasDimensions: preCanvasDimensions,
        updateState: this.updateState,
        handleSave: this.handleSave,
        onPreResize: this.onPreResize,
        redoOperation: this.redoOperation,
        roundCrop: roundCrop
      }, imageParams), {}, {
        watermark: watermark,
        focusPoint: focusPoint
      });

      var footerProps = {
        logoImage: logoImage,
        t: t,
        theme: theme,
        activeBody: activeBody,
        operations: operations,
        operationsOriginal: operationsOriginal,
        operationsZoomed: operationsZoomed,
        initialZoom: initialZoom,
        currentOperation: currentOperation,
        processWithCloudimage: processWithCloudimage,
        processWithCloudService: processWithCloudService,
        updateState: this.updateState,
        redoOperation: this.redoOperation,
        resetOperations: this.resetOperations,
        config: config,
        watermark: watermark
      };
      return /*#__PURE__*/_react.default.createElement(_index.Wrapper, {
        roundCrop: roundCrop
      }, /*#__PURE__*/_react.default.createElement(_index2.Header, headerProps), /*#__PURE__*/_react.default.createElement(_index.PreviewWrapper, null, activeBody === 'preview' && /*#__PURE__*/_react.default.createElement(_index2.Preview, previewProps), activeBody === 'preResize' && /*#__PURE__*/_react.default.createElement(_index2.PreResize, previewProps), /*#__PURE__*/_react.default.createElement(_index.Spinner, {
        overlay: true,
        show: isShowSpinner,
        label: t['spinner.label']
      })), /*#__PURE__*/_react.default.createElement(_index2.Footer, footerProps));
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

  __REACT_HOT_LOADER__.register(INITIAL_PARAMS, "INITIAL_PARAMS", "/home/patrik/projects/filerobot-image-editor/projects/react/ImageEditor.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/ImageEditor.js");
}();

;