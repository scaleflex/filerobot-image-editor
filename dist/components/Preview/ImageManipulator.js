"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = require("../../styledComponents");

var _utils = require("../../utils");

var _config = require("../../config");

var _cropperjs = _interopRequireDefault(require("cropperjs"));

var _v = _interopRequireDefault(require("uuid/v4"));

require("../../utils/canvas-round-rect");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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

var ImageManipulator = /*#__PURE__*/function (_Component) {
  _inherits(ImageManipulator, _Component);

  var _super = _createSuper(ImageManipulator);

  function ImageManipulator() {
    var _this;

    _classCallCheck(this, ImageManipulator);

    _this = _super.call(this);

    _defineProperty(_assertThisInitialized(_this), "initializeCanvases", function (elem) {
      var that = _assertThisInitialized(_this);

      var _this$props = _this.props,
          _this$props$config = _this$props.config;
      _this$props$config = _this$props$config === void 0 ? {} : _this$props$config;
      var isLowQualityPreview = _this$props$config.isLowQualityPreview,
          updateState = _this$props.updateState;
      var initialZoom = 1;

      if (isLowQualityPreview && elem.height > 1050) {
        var canvasOriginal = (0, _utils.getCanvasNode)('scaleflex-image-edit-box-original');
        var ctxOriginal = canvasOriginal.getContext('2d');
        canvasOriginal.width = elem.width;
        canvasOriginal.height = elem.height;
        ctxOriginal.drawImage(elem, 0, 0, elem.width, elem.height);
        initialZoom = elem.height / 800;
        var zoomedWidth = elem.width / initialZoom;
        var zoomedHeight = elem.height / initialZoom;
        updateState({
          initialZoom: initialZoom,
          canvasOriginal: that.cloneCanvas(canvasOriginal)
        });
        setTimeout(function () {
          new window.Caman((0, _utils.getCanvasNode)('scaleflex-image-edit-box'), function () {
            this.resize({
              width: zoomedWidth,
              height: zoomedHeight
            });
            this.render(function () {
              var canvasZoomed = that.replaceWithNewCanvas('scaleflex-image-edit-box');
              that.CamanInstanceZoomed = new window.Caman(canvasZoomed, function () {
                that.CamanInstanceOriginal = new window.Caman((0, _utils.getCanvasNode)('scaleflex-image-edit-box-original'), function () {});
                updateState({
                  isShowSpinner: false,
                  canvasZoomed: that.cloneCanvas(canvasZoomed)
                });
              });
            });
          });
        });
      } else {
        setTimeout(function () {
          that.CamanInstance = new window.Caman((0, _utils.getCanvasNode)('scaleflex-image-edit-box'), function () {
            updateState({
              isShowSpinner: false,
              canvasOriginal: that.cloneCanvas((0, _utils.getCanvasNode)('scaleflex-image-edit-box'))
            });
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "drawWatermark", function (canvas, image) {
      var watermark = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var opacity = watermark.opacity;
      var tempCtx = canvas.getContext('2d');

      var _getWatermarkPosition = (0, _utils.getWatermarkPosition)(watermark, canvas, image),
          _getWatermarkPosition2 = _slicedToArray(_getWatermarkPosition, 4),
          wx = _getWatermarkPosition2[0],
          wy = _getWatermarkPosition2[1],
          ww = _getWatermarkPosition2[2],
          wh = _getWatermarkPosition2[3];

      tempCtx.globalAlpha = opacity;
      tempCtx.drawImage(image, wx, wy, ww, wh); //return canvas.toDataURL();
    });

    _defineProperty(_assertThisInitialized(_this), "cloneCanvas", function (oldCanvas) {
      //create a new canvas
      var newCanvas = document.createElement('canvas');
      var context = newCanvas.getContext('2d'); //set dimensions

      newCanvas.width = oldCanvas.width;
      newCanvas.height = oldCanvas.height; // set old id

      newCanvas.id = oldCanvas.id; //apply the old canvas to the new one

      context.drawImage(oldCanvas, 0, 0); //return the new canvas

      return newCanvas;
    });

    _defineProperty(_assertThisInitialized(_this), "replaceWithNewCanvas", function (id) {
      var rounded = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      //create a new canvas
      var oldCanvas = (0, _utils.getCanvasNode)(id);
      var width = oldCanvas.width,
          height = oldCanvas.height;
      var newCanvas = document.createElement('canvas');
      var context = newCanvas.getContext('2d');
      var container = oldCanvas.parentElement;
      container.removeChild(oldCanvas); //set dimensions

      newCanvas.width = width;
      newCanvas.height = height;
      newCanvas.id = id; //apply the old canvas to the new one

      context.drawImage(oldCanvas, 0, 0); // Make the new canvas rounded if the crop is rounded style.

      if (rounded) {
        context.imageSmoothingEnabled = true;
        context.globalCompositeOperation = 'destination-in';
        context.beginPath(); // roundRect is a manually written protoype method from canvas-round-rect file in utils.

        context.roundRect(0, 0, width, height, Math.max(width, height));
        context.fill();
      } // Append the new canvas to the container of old canvas.


      container.appendChild(newCanvas); //return the new canvas

      return newCanvas;
    });

    _defineProperty(_assertThisInitialized(_this), "replaceCanvas", function (newCanvas, id) {
      //create a new canvas
      var oldCanvas = (0, _utils.getCanvasNode)(id);
      var container = oldCanvas.parentElement;
      container.removeChild(oldCanvas);
      container.appendChild(newCanvas); //return the new canvas

      return newCanvas;
    });

    _defineProperty(_assertThisInitialized(_this), "saveImage", function () {
      var _this$props2 = _this.props,
          onComplete = _this$props2.onComplete,
          onClose = _this$props2.onClose,
          updateState = _this$props2.updateState,
          closeOnLoad = _this$props2.closeOnLoad,
          config = _this$props2.config,
          processWithCloudService = _this$props2.processWithCloudService,
          uploadCloudimageImage = _this$props2.uploadCloudimageImage,
          operations = _this$props2.operations,
          initialZoom = _this$props2.initialZoom,
          logoImage = _this$props2.logoImage,
          watermark = _this$props2.watermark,
          operationsOriginal = _this$props2.operationsOriginal;

      var imageMime = _this.getFinalImageMime();

      var imageName = _this.getFinalImageName();

      var _config$filerobot = config.filerobot,
          filerobot = _config$filerobot === void 0 ? {} : _config$filerobot,
          _config$platform = config.platform,
          platform = _config$platform === void 0 ? 'filerobot' : _config$platform;

      var src = _this.props.src.split('?')[0];

      var canvasID = initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box';
      var canvas = (0, _utils.getCanvasNode)(canvasID);
      var baseAPI = (0, _utils.getBaseAPI)(filerobot.baseAPI, filerobot.container, platform);
      var uploadParams = filerobot.uploadParams || {};
      var dir = uploadParams.dir || 'image-editor';

      var self = _assertThisInitialized(_this);

      if (!processWithCloudService) {
        if (watermark && logoImage && watermark.applyByDefault) {
          try {
            _this.drawWatermark(canvas, logoImage, watermark);
          } catch (event) {
            console.warn('Not valid link for watermark', event);
          }
        }

        var base64 = canvas.toDataURL(imageMime);
        var block = base64.split(";");
        var realData = block[1].split(",")[1];
        var blob = (0, _utils.b64toBlob)(realData, imageMime, null);
        var splittedName = imageName.replace(/-version-.{6}/g, '').split('.');
        var nameLength = splittedName.length;
        var name = '';

        if (nameLength <= 1) {
          name = "".concat(splittedName.join('.'), "-version-").concat(((0, _v.default)() || '').slice(0, 6));
        } else {
          name = [splittedName.slice(0, nameLength - 1).join('.'), '-version-', ((0, _v.default)() || '').slice(0, 6), '.', splittedName[nameLength - 1]].join('');
        }

        var formData = new FormData();
        var request = new XMLHttpRequest();
        request.addEventListener("load", self.onFileLoad);
        formData.append('files[]', blob, name);
        request.open("POST", [baseAPI, "upload?dir=".concat(dir)].join(''));
        request.setRequestHeader((0, _utils.getSecretHeaderName)(platform), filerobot.uploadKey);
        request.send(formData);
      } else {
        var resultOperations = initialZoom !== 1 ? operationsOriginal : operations;
        var allowedOperations = resultOperations.filter(function (_ref) {
          var operation = _ref.operation;
          return _config.CLOUDIMAGE_OPERATIONS.includes(operation);
        });

        var url = _this.generateCloudimageURL(allowedOperations, src.replace(/https?:\/\/scaleflex.ultrafast.io\//, ''));

        if (uploadCloudimageImage) {
          var _request = new XMLHttpRequest();

          _request.addEventListener("load", _this.onFileLoad);

          _request.open("POST", [baseAPI, "upload?dir=".concat(dir)].join(''));

          _request.setRequestHeader((0, _utils.getSecretHeaderName)(platform), filerobot.uploadKey);

          _request.setRequestHeader('Content-Type', 'application/json');

          _request.send(JSON.stringify({
            files_urls: [url]
          }));
        } else {
          updateState({
            isShowSpinner: false,
            isHideCanvas: false
          });
          onComplete(url, {
            url_permalink: url,
            url_public: url,
            url: {
              public: url,
              permalink: url
            }
          });
          closeOnLoad && onClose();
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getResultCanvas", function () {
      var _this$props3 = _this.props,
          initialZoom = _this$props3.initialZoom,
          logoImage = _this$props3.logoImage,
          watermark = _this$props3.watermark;
      var canvasID = initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box';
      var canvas = (0, _utils.getCanvasNode)(canvasID);

      if (watermark && logoImage && watermark.applyByDefault) {
        try {
          _this.drawWatermark(canvas, logoImage, watermark);
        } catch (event) {
          console.warn('Not valid link for watermark', event);
        }
      }

      return canvas;
    });

    _defineProperty(_assertThisInitialized(_this), "getFinalImageMime", function () {
      var _this$props4 = _this.props,
          roundCrop = _this$props4.roundCrop,
          imageMime = _this$props4.imageMime;
      return roundCrop ? 'image/png' : imageMime;
    });

    _defineProperty(_assertThisInitialized(_this), "getFinalImageName", function () {
      var roundCrop = _this.props.roundCrop;
      var imageName = _this.state.imageName;

      if (roundCrop) {
        imageName = imageName.replace(imageName.substr(imageName.lastIndexOf('.') + 1), 'png');
      }

      return imageName;
    });

    _defineProperty(_assertThisInitialized(_this), "downloadImage", function (callback, onUpload) {
      var canvas = _this.getResultCanvas();

      var imageName = _this.getFinalImageName();

      var imageMime = _this.getFinalImageMime();

      var lnk = document.createElement('a');
      var e;
      lnk.download = imageName;
      lnk.href = canvas.toDataURL(imageMime, 0.8);
      onUpload(lnk.href);

      if (document.createEvent) {
        e = document.createEvent("MouseEvents");
        e.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        lnk.dispatchEvent(e);
      } else if (lnk.fireEvent) {
        lnk.fireEvent("onclick");
      }

      if (callback) callback();
    });

    _defineProperty(_assertThisInitialized(_this), "onFileLoad", function (data) {
      var _this$props5 = _this.props,
          onComplete = _this$props5.onComplete,
          onClose = _this$props5.onClose,
          updateState = _this$props5.updateState,
          closeOnLoad = _this$props5.closeOnLoad;
      var _data$srcElement = data.srcElement,
          srcElement = _data$srcElement === void 0 ? {} : _data$srcElement;
      var _srcElement$response = srcElement.response,
          response = _srcElement$response === void 0 ? '{}' : _srcElement$response;
      var responseData = JSON.parse(response) || {};

      if (responseData.status === 'success') {
        var _responseData$file = responseData.file,
            file = _responseData$file === void 0 ? {} : _responseData$file;
        var publicURL = (0, _utils.getPubliclink)(file);
        if (!publicURL) return;
        updateState({
          isShowSpinner: false,
          isHideCanvas: false
        });
        onComplete(publicURL, file);
        closeOnLoad && onClose();
      } else {
        updateState({
          isShowSpinner: false,
          isHideCanvas: false
        });
        alert(responseData);
        closeOnLoad && onClose();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "generateCloudimageURL", function (operations, original) {
      var _this$props6 = _this.props,
          config = _this$props6.config,
          watermark = _this$props6.watermark,
          logoImage = _this$props6.logoImage,
          processWithCloudimage = _this$props6.processWithCloudimage,
          processWithFilerobot = _this$props6.processWithFilerobot,
          imageSealing = _this$props6.imageSealing;
      var _config$cloudimage = config.cloudimage,
          cloudimage = _config$cloudimage === void 0 ? {} : _config$cloudimage,
          _config$filerobot2 = config.filerobot,
          filerobot = _config$filerobot2 === void 0 ? {} : _config$filerobot2;
      var cloudUrl = processWithCloudimage && cloudimage.token + '.cloudimg.io/' + (cloudimage.version ? "".concat(cloudimage.version, "/") : 'v7/');
      var filerobotURL = processWithFilerobot && filerobot.token + '.filerobot.com/' + (filerobot.version ? "".concat(filerobot.version, "/") : '');
      var doNotPrefixURL = filerobotURL ? filerobot.doNotPrefixURL : cloudimage.doNotPrefixURL;
      var url = filerobotURL || cloudUrl || '';
      url = (url ? 'https://' : '') + url;
      var baseURL = doNotPrefixURL ? '' : url;

      var cropOperation = _this.isOperationExist(operations, 'crop');

      var resizeOperation = _this.isOperationExist(operations, 'resize');

      var orientationOperation = _this.isOperationExist(operations, 'rotate');

      var focusPointOperation = _this.isOperationExist(operations, 'focus_point');

      var watermarkOperation = watermark && logoImage && watermark.applyByDefault;
      var isProcessImage = cropOperation || resizeOperation || orientationOperation || watermarkOperation || focusPointOperation;
      var cropQuery = '';
      var resizeQuery = '';
      var orientationQuery = '';
      var watermarkQuery = '';
      var focusPointQuery = '';

      if (cropOperation) {
        cropQuery = _this.getCropArguments(cropOperation.props);
      }

      if (resizeOperation) {
        resizeQuery = (cropQuery ? '&' : '') + _this.getResizeArguments(resizeOperation.props);
      }

      if (orientationOperation) {
        orientationQuery = (cropQuery || resizeQuery ? '&' : '') + _this.getOrientationArguments(orientationOperation.props);
      }

      if (watermarkOperation) {
        watermarkQuery = (cropQuery || resizeQuery || orientationQuery ? '&' : '') + _this.getWatermarkArguments(watermark);
      }

      if (focusPointOperation) {
        focusPointQuery = (cropQuery || resizeQuery || orientationQuery || watermarkQuery ? '&' : '') + _this.getFocusPointArguments(focusPointOperation.props);
      }

      original = original.split('?')[0]; // remove quesry string from original url

      original = original.replace(baseURL, ''); // remove duplication in case when original url already include cdn prefix

      var paramsStr = cropQuery + resizeQuery + orientationQuery + watermarkQuery + focusPointQuery;

      if (imageSealing.enabled) {
        paramsStr = (0, _utils.getImageSealingParams)(paramsStr, imageSealing, original.replace(url, '') // always remove cdn url, to support already cdnized links and doNotPrefixURL param
        );
      }

      return baseURL + original + (paramsStr ? '?' : '') + paramsStr;
    });

    _defineProperty(_assertThisInitialized(_this), "initFiltersOrEffects", function () {});

    _defineProperty(_assertThisInitialized(_this), "applyFilterOrEffect", function (type) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var _this$props7 = _this.props,
          updateState = _this$props7.updateState,
          initialZoom = _this$props7.initialZoom;
      if (!_this.props[type]) return;
      updateState({
        isHideCanvas: true,
        isShowSpinner: true
      }, function () {
        if (initialZoom !== 1) {
          _this.CamanInstanceOriginal.revert(false);

          _this.CamanInstanceOriginal[(0, _utils.getEffectHandlerName)(_this.props[type])]();

          _this.CamanInstanceOriginal.render(function () {
            updateState(_defineProperty({}, type, null), function () {
              _this.makeCanvasSnapshot({
                operation: type
              }, callback);
            });
          });
        } else {
          updateState(_defineProperty({}, type, null), function () {
            _this.makeCanvasSnapshot({
              operation: type
            }, callback);
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "applyAdjust", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _this$props8 = _this.props,
          updateState = _this$props8.updateState,
          initialZoom = _this$props8.initialZoom,
          adjust = _this$props8.adjust;
      var brightness = adjust.brightness,
          contrast = adjust.contrast,
          saturation = adjust.saturation,
          exposure = adjust.exposure;
      var resetProps = {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        exposure: 0
      };
      updateState({
        isHideCanvas: true,
        isShowSpinner: true
      }, function () {
        if (initialZoom !== 1) {
          _this.CamanInstanceOriginal.revert(false);

          if (brightness.toString() !== '0') _this.CamanInstanceOriginal.brightness(parseInt(brightness || '0'));
          if (contrast.toString() !== '0') _this.CamanInstanceOriginal.contrast(parseInt(contrast || '0'));
          if (saturation.toString() !== '0') _this.CamanInstanceOriginal.saturation(parseInt(saturation || '0'));
          if (exposure.toString() !== '0') _this.CamanInstanceOriginal.exposure(parseInt(exposure || '0'));

          _this.CamanInstanceOriginal.render(function () {
            updateState({
              adjust: _objectSpread({}, resetProps)
            }, function () {
              _this.makeCanvasSnapshot({
                operation: 'adjust'
              }, callback);
            });
          });
        } else {
          updateState({
            adjust: _objectSpread({}, resetProps)
          }, function () {
            _this.makeCanvasSnapshot({
              operation: 'adjust'
            }, callback);
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "initOrientation", function () {
      var _this$props9 = _this.props,
          config = _this$props9.config,
          redoOperation = _this$props9.redoOperation,
          operations = _this$props9.operations,
          operationsZoomed = _this$props9.operationsZoomed,
          initialZoom = _this$props9.initialZoom;
      var processWithCloudService = config.processWithCloudService;
      var currentOperations = initialZoom !== 1 ? operationsZoomed : operations;

      if (processWithCloudService && currentOperations.length >= 1) {
        var prevCropIndex = currentOperations.findIndex(function (_ref2) {
          var operation = _ref2.operation;
          return operation === 'rotate';
        });

        if (prevCropIndex > -1) {
          redoOperation(prevCropIndex - 1, function () {}, false);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onRotate", function () {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var correctionDegree = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var flipX = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      var flipY = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
      var _this$props10 = _this.props,
          initialZoom = _this$props10.initialZoom,
          rotate = _this$props10.rotate,
          updateState = _this$props10.updateState;
      var nextRotateValue = rotate + value;
      updateState({
        isHideCanvas: true,
        isShowSpinner: true,
        rotate: nextRotateValue,
        correctionDegree: correctionDegree,
        flipX: flipX,
        flipY: flipY
      }, function () {
        if (initialZoom !== 1) {
          _this.CamanInstanceZoomed.reset();

          if (flipX) _this.CamanInstanceZoomed.flip('x');
          if (flipY) _this.CamanInstanceZoomed.flip('y');
          if (nextRotateValue || correctionDegree) _this.CamanInstanceZoomed.rotate((nextRotateValue || 0) + (correctionDegree || 0));

          _this.CamanInstanceZoomed.render(function () {
            updateState({
              isHideCanvas: false,
              isShowSpinner: false
            });
          });
        } else {
          _this.CamanInstance.reset();

          if (flipX) _this.CamanInstance.flip('x');
          if (flipY) _this.CamanInstance.flip('y');
          if (nextRotateValue || correctionDegree) _this.CamanInstance.rotate((nextRotateValue || 0) + (correctionDegree || 0));

          _this.CamanInstance.render(function () {
            updateState({
              isHideCanvas: false,
              isShowSpinner: false
            });
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "applyOrientation", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _this$props11 = _this.props,
          updateState = _this$props11.updateState,
          initialZoom = _this$props11.initialZoom,
          rotate = _this$props11.rotate,
          correctionDegree = _this$props11.correctionDegree,
          flipX = _this$props11.flipX,
          flipY = _this$props11.flipY;
      updateState({
        isHideCanvas: true,
        isShowSpinner: true
      }, function () {
        var nextRotate = (rotate || 0) + (correctionDegree || 0);

        if (initialZoom !== 1) {
          _this.CamanInstanceOriginal.reset();

          if (flipX) _this.CamanInstanceOriginal.flip('x');
          if (flipY) _this.CamanInstanceOriginal.flip('y');
          if (rotate || correctionDegree) _this.CamanInstanceOriginal.rotate(nextRotate);

          _this.CamanInstanceOriginal.render(function () {
            updateState({
              rotate: 0,
              flipX: false,
              flipY: false,
              correctionDegree: 0
            }, function () {
              _this.makeCanvasSnapshot({
                operation: 'rotate',
                props: {
                  rotate: nextRotate
                }
              }, callback);
            });
          });
        } else {
          updateState({
            rotate: 0,
            flipX: false,
            flipY: false,
            correctionDegree: 0
          }, function () {
            _this.makeCanvasSnapshot({
              operation: 'rotate',
              props: {
                rotate: nextRotate
              }
            }, callback);
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getOrientationArguments", function () {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          rotate = _ref3.rotate;

      switch (rotate) {
        case 90:
          return "r=270";

        case -90:
          return "r=90";

        default:
          return "r=".concat(rotate);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initCrop", function () {
      var _this$props12 = _this.props,
          config = _this$props12.config,
          redoOperation = _this$props12.redoOperation,
          operations = _this$props12.operations,
          operationsZoomed = _this$props12.operationsZoomed,
          initialZoom = _this$props12.initialZoom;
      var processWithCloudService = config.processWithCloudService;
      var currentOperations = initialZoom !== 1 ? operationsZoomed : operations;

      if (processWithCloudService && currentOperations.length >= 1) {
        var prevCropIndex = currentOperations.findIndex(function (_ref4) {
          var operation = _ref4.operation;
          return operation === 'crop';
        });

        if (prevCropIndex > -1) {
          redoOperation(prevCropIndex - 1, _this.onInitCrop, false);
        }
      } else {
        _this.onInitCrop();
      }
    });

    _defineProperty(_assertThisInitialized(_this), "onInitCrop", function () {
      var _this$props13 = _this.props,
          updateState = _this$props13.updateState,
          _this$props13$config$ = _this$props13.config.beginCropArea,
          beginCropArea = _this$props13$config$ === void 0 ? 1 : _this$props13$config$;
      updateState({
        isHideCanvas: true,
        isShowSpinner: true
      }, function () {
        var canvas = (0, _utils.getCanvasNode)();
        var rect = canvas.getBoundingClientRect();
        var zoom = canvas.width / rect.width;
        _this.cropper = new _cropperjs.default(canvas, {
          viewMode: 1,
          modal: false,
          background: false,
          rotatable: false,
          scalable: false,
          zoomable: false,
          movable: false,
          autoCropArea: beginCropArea,
          crop: function crop(event) {
            _this.props.updateState({
              cropDetails: event.detail
            });
          }
        });
        window.scaleflexPlugins = window.scaleflexPlugins || {};
        window.scaleflexPlugins.zoom = zoom;
        window.scaleflexPlugins.cropperjs = _this.cropper;
        updateState({
          isHideCanvas: false,
          isShowSpinner: false
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "applyCrop", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _this$props14 = _this.props,
          initialZoom = _this$props14.initialZoom,
          updateState = _this$props14.updateState,
          cropDetails = _this$props14.cropDetails,
          roundCrop = _this$props14.roundCrop;
      var width = cropDetails.width,
          height = cropDetails.height,
          x = cropDetails.x,
          y = cropDetails.y;
      updateState({
        isShowSpinner: true
      }, function () {
        var resultSize;

        _this.destroyCrop();

        if (initialZoom !== 1) {
          var _this$CamanInstanceOr;

          resultSize = [width, height, x, y].map(function (prop) {
            return prop * initialZoom;
          });

          _this.CamanInstanceZoomed.crop(width, height, x, y);

          (_this$CamanInstanceOr = _this.CamanInstanceOriginal).crop.apply(_this$CamanInstanceOr, _toConsumableArray(resultSize));
        } else {
          var _this$CamanInstance;

          resultSize = [width, height, x, y];

          (_this$CamanInstance = _this.CamanInstance).crop.apply(_this$CamanInstance, _toConsumableArray(resultSize));
        }

        _this.makeCanvasSnapshot({
          operation: 'crop',
          props: {
            width: resultSize[0],
            height: resultSize[1],
            x: resultSize[2],
            y: resultSize[3],
            roundCrop: roundCrop
          }
        }, callback);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "makeCanvasSnapshot", function (operation) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var _this$props15 = _this.props,
          updateState = _this$props15.updateState,
          initialZoom = _this$props15.initialZoom,
          operationsZoomed = _this$props15.operationsZoomed,
          currentOperation = _this$props15.currentOperation,
          operationsOriginal = _this$props15.operationsOriginal,
          operations = _this$props15.operations,
          roundCrop = _this$props15.roundCrop;

      if (initialZoom !== 1) {
        var lastOperationIndex = operationsZoomed.indexOf(currentOperation) + 1;

        _this.CamanInstanceOriginal.render(function () {
          var canvasOriginal = _this.replaceWithNewCanvas('scaleflex-image-edit-box-original', roundCrop);

          var nextOperation = _objectSpread(_objectSpread({}, operation), {}, {
            canvas: _this.cloneCanvas((0, _utils.getCanvasNode)('scaleflex-image-edit-box-original'))
          });

          _this.CamanInstanceOriginal = new window.Caman(canvasOriginal, function () {
            updateState({
              isHideCanvasOriginal: false,
              isShowSpinnerOriginal: false,
              operationsOriginal: [].concat(_toConsumableArray(operationsOriginal.slice(0, lastOperationIndex)), [nextOperation])
            }, callback);
          });
        });

        _this.CamanInstanceZoomed.render(function () {
          var canvasZoomed = _this.replaceWithNewCanvas('scaleflex-image-edit-box', roundCrop);

          var nextOperation = _objectSpread(_objectSpread({}, operation), {}, {
            canvas: _this.cloneCanvas((0, _utils.getCanvasNode)('scaleflex-image-edit-box'))
          });

          _this.CamanInstanceZoomed = new window.Caman(canvasZoomed, function () {
            updateState({
              isHideCanvas: false,
              isShowSpinner: false,
              operationsZoomed: [].concat(_toConsumableArray(operationsZoomed.slice(0, lastOperationIndex)), [nextOperation]),
              currentOperation: nextOperation
            });
          });
        });
      } else {
        var _lastOperationIndex = operations.indexOf(currentOperation) + 1;

        _this.CamanInstance.render(function () {
          var canvas = _this.replaceWithNewCanvas('scaleflex-image-edit-box', roundCrop);

          var nextOperation = _objectSpread(_objectSpread({}, operation), {}, {
            canvas: _this.cloneCanvas((0, _utils.getCanvasNode)('scaleflex-image-edit-box'))
          });

          _this.CamanInstance = new window.Caman(canvas, function () {
            updateState({
              isHideCanvas: false,
              isShowSpinner: false,
              operations: [].concat(_toConsumableArray(operations.slice(0, _lastOperationIndex)), [nextOperation]),
              currentOperation: nextOperation
            }, callback);
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "destroyCrop", function () {
      _this.cropper.destroy();
    });

    _defineProperty(_assertThisInitialized(_this), "getCropArguments", function () {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          width = _ref5.width,
          height = _ref5.height,
          x = _ref5.x,
          y = _ref5.y,
          roundCrop = _ref5.roundCrop;

      return "tl_px=".concat(Math.round(x), ",").concat(Math.round(y), "&br_px=").concat(Math.round(x + width), ",").concat(Math.round(y + height)).concat(roundCrop ? "&radius=".concat(Math.round(Math.max(width, height)), "&force_format=png") : '');
    });

    _defineProperty(_assertThisInitialized(_this), "initResize", function () {
      var _this$props16 = _this.props,
          initialZoom = _this$props16.initialZoom,
          updateState = _this$props16.updateState;
      var canvas = (0, _utils.getCanvasNode)(initialZoom !== 1 ? 'scaleflex-image-edit-box-original' : 'scaleflex-image-edit-box');
      var nextCanvasDimensions = {
        width: canvas.width,
        height: canvas.height,
        ratio: canvas.width / canvas.height
      };
      updateState({
        canvasDimensions: nextCanvasDimensions
      });
    });

    _defineProperty(_assertThisInitialized(_this), "applyResize", function () {
      var _this$props17 = _this.props,
          initialZoom = _this$props17.initialZoom,
          canvasDimensions = _this$props17.canvasDimensions,
          updateState = _this$props17.updateState,
          handleSave = _this$props17.handleSave,
          operations = _this$props17.operations,
          operationsOriginal = _this$props17.operationsOriginal;
      updateState({
        isHideCanvas: true,
        isShowSpinner: true,
        operationsOriginal: [].concat(_toConsumableArray(operationsOriginal), [{
          operation: 'resize',
          props: canvasDimensions
        }]),
        operations: [].concat(_toConsumableArray(operations), [{
          operation: 'resize',
          props: canvasDimensions
        }])
      }, function () {
        if (initialZoom !== 1) {
          _this.CamanInstanceOriginal.resize(canvasDimensions);

          _this.CamanInstanceOriginal.render(function () {
            handleSave();
          });
        } else {
          _this.CamanInstance.resize(canvasDimensions);

          _this.CamanInstance.render(function () {
            handleSave();
          });
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getResizeArguments", function () {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          width = _ref6.width,
          height = _ref6.height;

      return "w=".concat(width, "&h=").concat(height);
    });

    _defineProperty(_assertThisInitialized(_this), "initAdjust", function () {});

    _defineProperty(_assertThisInitialized(_this), "onAdjust", function (handler, value) {
      var _objectSpread2;

      var _this$props18 = _this.props,
          updateState = _this$props18.updateState,
          adjust = _this$props18.adjust;
      updateState({
        adjust: _objectSpread(_objectSpread({}, adjust), {}, (_objectSpread2 = {}, _defineProperty(_objectSpread2, handler, value), _defineProperty(_objectSpread2, "isHideCanvas", true), _defineProperty(_objectSpread2, "isShowSpinner", true), _objectSpread2))
      }, function () {
        _this.applyCorrections(function () {
          updateState({
            isHideCanvas: false,
            isShowSpinner: false
          });
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "initFocusPoint", function () {
      var _this$props19 = _this.props,
          updateState = _this$props19.updateState,
          original = _this$props19.original,
          focusPoint = _this$props19.focusPoint;

      var nextFocusPoint = _objectSpread({}, focusPoint);

      if (nextFocusPoint.x === null) {
        nextFocusPoint.x = original.width / 2;
      }

      if (nextFocusPoint.y === null) {
        nextFocusPoint.y = original.height / 2;
      }

      _this.tempFocusPoint = _objectSpread({}, focusPoint);
      updateState({
        focusPoint: nextFocusPoint,
        isHideCanvas: true,
        isShowSpinner: true
      });
    });

    _defineProperty(_assertThisInitialized(_this), "applyFocusPoint", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _this$props20 = _this.props,
          updateState = _this$props20.updateState,
          operations = _this$props20.operations,
          operationsOriginal = _this$props20.operationsOriginal,
          focusPoint = _this$props20.focusPoint;
      _this.tempFocusPoint = focusPoint;
      updateState({
        operationsOriginal: [].concat(_toConsumableArray(operationsOriginal), [{
          operation: 'focus_point',
          props: focusPoint
        }]),
        operations: [].concat(_toConsumableArray(operations), [{
          operation: 'focus_point',
          props: focusPoint
        }])
      });
      callback();
    });

    _defineProperty(_assertThisInitialized(_this), "getFocusPointArguments", function (focusPoint) {
      return "gravity=".concat(focusPoint.x, ",").concat(focusPoint.y);
    });

    _defineProperty(_assertThisInitialized(_this), "destroyFocusPoint", function () {
      _this.props.updateState({
        focusPoint: _this.tempFocusPoint,
        isHideCanvas: false,
        isShowSpinner: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "pushOperation", function (operations, operation, currentOperation) {
      var operationIndex = operations.findIndex(function (operation) {
        return operation === currentOperation;
      });
      var operationsLength = operations.length;
      if (operationsLength && operationIndex !== operations[operationsLength]) operations.splice(operationIndex + 1, operationsLength);
      operations.push(operation);
    });

    _defineProperty(_assertThisInitialized(_this), "applyOperations", function (operationIndex, callback) {
      var _this$props21 = _this.props,
          initialZoom = _this$props21.initialZoom,
          operations = _this$props21.operations,
          operationsZoomed = _this$props21.operationsZoomed,
          operationsOriginal = _this$props21.operationsOriginal,
          canvasZoomed = _this$props21.canvasZoomed,
          canvasOriginal = _this$props21.canvasOriginal,
          updateState = _this$props21.updateState;

      if (initialZoom !== 1) {
        var nextOperation = operationIndex !== -1 ? operationsZoomed[operationIndex] : {
          canvas: _this.cloneCanvas(canvasZoomed)
        };

        var canvasZoomedNext = _this.replaceCanvas(nextOperation.canvas, 'scaleflex-image-edit-box');

        _this.CamanInstanceZoomed = new window.Caman(canvasZoomedNext, function () {
          updateState(_objectSpread(_objectSpread({}, INITIAL_PARAMS), {}, {
            currentOperation: nextOperation
          }), function () {
            if (callback) callback();
          });
        });
        var nextOperationOriginal = operationIndex !== -1 ? operationsOriginal[operationIndex] : {
          canvas: _this.cloneCanvas(canvasOriginal)
        };

        var canvasNext = _this.replaceCanvas(nextOperationOriginal.canvas, 'scaleflex-image-edit-box-original');

        _this.CamanInstanceOriginal = new window.Caman(canvasNext, function () {});
      } else {
        var nextOperationSimple = operationIndex !== -1 ? operations[operationIndex] : {
          canvas: _this.cloneCanvas(canvasOriginal)
        };

        var canvas = _this.replaceCanvas(nextOperationSimple.canvas, 'scaleflex-image-edit-box');

        _this.CamanInstance = new window.Caman(canvas, function () {
          updateState(_objectSpread(_objectSpread({}, INITIAL_PARAMS), {}, {
            currentOperation: nextOperationSimple
          }), function () {
            if (callback) callback();
          });
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "isOperationExist", function (operations, type) {
      return operations.find(function (_ref7) {
        var operation = _ref7.operation;
        return operation === type;
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getOperationQuery", function (isCrop, isResize) {
      if (isCrop) return 'crop_px';else if (isResize) return 'width';else return 'cdn';
    });

    _defineProperty(_assertThisInitialized(_this), "destroyAll", function () {});

    _defineProperty(_assertThisInitialized(_this), "resetAll", function (callback) {
      var activeTab = _this.props.activeTab;

      if (activeTab) {
        _this.cancelLastOperation(activeTab, function () {
          _this.applyOperations(-1, callback);
        });
      } else {
        _this.applyOperations(-1, callback);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "applyCorrections", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
      var _this$props22 = _this.props,
          initialZoom = _this$props22.initialZoom,
          effect = _this$props22.effect,
          filter = _this$props22.filter,
          adjust = _this$props22.adjust;
      var brightness = adjust.brightness,
          contrast = adjust.contrast,
          saturation = adjust.saturation,
          exposure = adjust.exposure;

      if (initialZoom !== 1) {
        _this.CamanInstanceZoomed.revert(false);

        if (effect) _this.CamanInstanceZoomed[(0, _utils.getEffectHandlerName)(effect)]();
        if (filter) _this.CamanInstanceZoomed[(0, _utils.getEffectHandlerName)(filter)]();
        if (brightness.toString() !== '0') _this.CamanInstanceZoomed.brightness(parseInt(brightness || '0'));
        if (contrast.toString() !== '0') _this.CamanInstanceZoomed.contrast(parseInt(contrast || '0'));
        if (saturation.toString() !== '0') _this.CamanInstanceZoomed.saturation(parseInt(saturation || '0'));
        if (exposure.toString() !== '0') _this.CamanInstanceZoomed.exposure(parseInt(exposure || '0'));

        _this.CamanInstanceZoomed.render(callback);
      } else {
        _this.CamanInstance.revert(false);

        if (effect) _this.CamanInstance[(0, _utils.getEffectHandlerName)(effect)]();
        if (filter) _this.CamanInstance[(0, _utils.getEffectHandlerName)(filter)]();
        if (brightness.toString() !== '0') _this.CamanInstance.brightness(parseInt(brightness || '0'));
        if (contrast.toString() !== '0') _this.CamanInstance.contrast(parseInt(contrast || '0'));
        if (saturation.toString() !== '0') _this.CamanInstance.saturation(parseInt(saturation || '0'));
        if (exposure.toString() !== '0') _this.CamanInstance.exposure(parseInt(exposure || '0'));

        _this.CamanInstance.render(callback);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "cancelLastOperation", function (activeTab) {
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var initialZoom = _this.props.initialZoom;

      if (activeTab === 'crop') {
        _this.destroyCrop();
      }

      if (activeTab === 'watermark') {
        _this.cancelWatermark();
      }

      if (initialZoom !== 1) {
        _this.CamanInstanceZoomed.reset();

        _this.CamanInstanceOriginal.reset();

        _this.CamanInstanceOriginal.render();

        _this.CamanInstanceZoomed.render(function () {
          if (callback) callback();
        });
      } else {
        _this.CamanInstance.reset();

        _this.CamanInstance.render(function () {
          if (callback) callback();
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "initWatermark", function () {
      var _this$props23 = _this.props,
          watermark = _this$props23.watermark,
          updateState = _this$props23.updateState;

      _this.setState({
        tempWatermark: watermark && (0, _utils.deepCopy)(watermark)
      });

      if (!watermark.applyByDefault) {
        updateState({
          watermark: _objectSpread(_objectSpread({}, watermark), {}, {
            applyByDefault: true
          })
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "applyWatermark", function () {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

      _this.setState({
        tempWatermark: null
      });

      callback();
    });

    _defineProperty(_assertThisInitialized(_this), "cancelWatermark", function () {
      var tempWatermark = _this.state.tempWatermark;
      var updateState = _this.props.updateState;
      var logoImage = null;

      if (tempWatermark && tempWatermark.url && tempWatermark.applyByDefault) {
        updateState({
          isShowSpinner: true
        });
        logoImage = new Image();
        logoImage.setAttribute('crossOrigin', 'Anonymous');
        logoImage.src = tempWatermark.url + '?' + new Date().getTime();

        logoImage.onload = function () {
          updateState({
            watermark: tempWatermark,
            logoImage: logoImage,
            isShowSpinner: false
          });
        };
      } else {
        updateState({
          watermark: tempWatermark,
          logoImage: logoImage
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "getWatermarkArguments", function (watermark) {
      var url = watermark.url,
          position = watermark.position,
          opacity = watermark.opacity;

      var gravity = _this.getCloudimagePositionQuery(position);

      var gravityQuery = gravity ? "&wat_pad=2p&wat_gravity=".concat(gravity) : '';
      return "wat=1&wat_url=".concat(url.split('?')[0], "&wat_opacity=").concat(opacity, "&wat_scale=31p").concat(gravityQuery);
    });

    _defineProperty(_assertThisInitialized(_this), "getCloudimagePositionQuery", function (position) {
      switch (position) {
        case "left-top":
          return 'northwest';

        case "center-top":
          return 'north';

        case "right-top":
          return 'northeast';

        case "left-center":
          return 'west';

        case "center":
          return '';

        case "right-center":
          return 'east';

        case "left-bottom":
          return 'southwest';

        case "center-bottom":
          return 'south';

        case "right-bottom":
          return 'southeast';
      }
    });

    _defineProperty(_assertThisInitialized(_this), "applyChanges", function (activeTab, callback) {
      switch (activeTab) {
        case 'adjust':
          _this.applyAdjust(callback);

          break;

        case 'effects':
          _this.applyFilterOrEffect('effect', callback);

          break;

        case 'filters':
          _this.applyFilterOrEffect('filter', callback);

          break;

        case 'crop':
          _this.applyCrop(callback);

          break;

        case 'resize':
          _this.applyResize();

          break;

        case 'rotate':
          _this.applyOrientation(callback);

          break;

        case 'watermark':
          _this.applyWatermark(callback);

          break;

        case 'focus_point':
          _this.applyFocusPoint(callback);

          break;

        default:
          break;
      }
    });

    _defineProperty(_assertThisInitialized(_this), "changeTab", function (name) {
      switch (name) {
        case 'effects':
        case 'filters':
          _this.initFiltersOrEffects();

          break;

        case 'adjust':
          _this.initAdjust();

          break;

        case 'crop':
          _this.initCrop();

          break;

        case 'resize':
          _this.initResize();

          break;

        case 'rotate':
          _this.initOrientation();

          break;

        case 'watermark':
          _this.initWatermark();

          break;

        case 'focus_point':
          _this.initFocusPoint();

          break;

        default:
          _this.destroyAll();

      }
    });

    _defineProperty(_assertThisInitialized(_this), "destroyMode", function (name) {
      switch (name) {
        case 'effects':
          break;

        case 'filters':
          break;

        case 'adjust':
          break;

        case 'crop':
          _this.destroyCrop();

          break;

        case 'resize':
          break;

        case 'rotate':
          break;

        case 'focus_point':
          _this.destroyFocusPoint();

          break;

        default:
          break;
      }
    });

    _this.state = {
      canvas: null
    };
    _this.CamanInstance = null;
    _this.CamanInstanceOriginal = null;
    _this.CamanInstanceZoomed = null;
    return _this;
  }

  _createClass(ImageManipulator, [{
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: "UNSAFE_componentWillReceiveProps",
    value: function UNSAFE_componentWillReceiveProps(nextProps) {
      if (nextProps.activeTab !== this.props.activeTab) {
        if (this.props.activeTab) this.destroyMode(this.props.activeTab);
        this.changeTab(nextProps.activeTab);
      }

      this.setState(_objectSpread({}, nextProps));
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var that = this;
      var _this$props24 = this.props,
          updateState = _this$props24.updateState,
          img = _this$props24.img,
          isPreResize = _this$props24.isPreResize,
          preCanvasDimensions = _this$props24.preCanvasDimensions;
      updateState({
        isShowSpinner: true,
        applyChanges: this.applyChanges,
        applyOperations: this.applyOperations,
        resetAll: this.resetAll,
        onRotate: this.onRotate,
        onAdjust: this.onAdjust,
        downloadImage: this.downloadImage,
        getResultCanvas: this.getResultCanvas,
        saveImage: this.saveImage,
        applyCorrections: this.applyCorrections,
        restoreAll: this.restoreAll,
        cancelLastOperation: this.cancelLastOperation
      }, function () {
        var canvas = (0, _utils.getCanvasNode)('scaleflex-image-edit-box');
        var ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);
        var original = {
          height: img.height,
          width: img.width,
          ratio: img.width / img.height
        };
        updateState({
          original: original,
          canvasDimensions: original
        });

        if (isPreResize && preCanvasDimensions) {
          new window.Caman(canvas, function () {
            this.resize({
              width: preCanvasDimensions.width,
              height: preCanvasDimensions.height
            });
            this.render(function () {
              var resizedCanvas = that.replaceWithNewCanvas('scaleflex-image-edit-box');
              var original = {
                height: resizedCanvas.height,
                width: resizedCanvas.width,
                ratio: resizedCanvas.width / resizedCanvas.height
              };
              updateState({
                original: original,
                canvasDimensions: _objectSpread({}, original),
                canvasOriginal: that.cloneCanvas(resizedCanvas)
              }, function () {
                that.initializeCanvases(resizedCanvas);
              });
            });
          });
        } else {
          _this2.initializeCanvases(img);
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_styledComponents.Canvas, {
        id: "scaleflex-image-edit-box-original"
      }), /*#__PURE__*/_react.default.createElement(_styledComponents.Canvas, {
        id: "scaleflex-image-edit-box"
      }));
    }
  }]);

  return ImageManipulator;
}(_react.Component);

exports.default = ImageManipulator;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(INITIAL_PARAMS, "INITIAL_PARAMS", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Preview/ImageManipulator.js");

  __REACT_HOT_LOADER__.register(ImageManipulator, "ImageManipulator", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Preview/ImageManipulator.js");
}();

;