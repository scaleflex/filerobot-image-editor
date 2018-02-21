var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Canvas } from '../../styledComponents';
import { b64toBlob, generateUUID } from '../../utils';
import Cropper from 'cropperjs';

var ImageManipulator = function (_Component) {
  _inherits(ImageManipulator, _Component);

  function ImageManipulator(props) {
    _classCallCheck(this, ImageManipulator);

    var _this = _possibleConstructorReturn(this, (ImageManipulator.__proto__ || Object.getPrototypeOf(ImageManipulator)).call(this));

    _this.saveImage = function () {
      var imageName = _this.state.imageName;
      var _this$props = _this.props,
          onUpload = _this$props.onUpload,
          onClose = _this$props.onClose,
          updateState = _this$props.updateState,
          closeOnLoad = _this$props.closeOnLoad;

      var config = _this.props.config;
      var canvas = _this.getCanvasNode();

      window.Caman(canvas, function () {
        this.render(function () {
          var base64 = this.toBase64();
          var block = base64.split(";");
          var contentType = block[0].split(":")[1];
          var realData = block[1].split(",")[1];
          var blob = b64toBlob(realData, contentType, null);
          var splittedName = imageName.replace(/-edited/g, '').split('.');
          var nameLength = splittedName.length;
          var name = splittedName.slice(0, nameLength - 1).join('.') + '-edited.' + splittedName[nameLength - 1];
          var formData = new FormData();
          var request = new XMLHttpRequest();
          var baseUrl = '//' + config.CONTAINER + '.api.airstore.io/v1/';

          request.addEventListener("load", function (data) {
            var _data$srcElement = data.srcElement,
                srcElement = _data$srcElement === undefined ? {} : _data$srcElement;
            var _srcElement$response = srcElement.response,
                response = _srcElement$response === undefined ? '{}' : _srcElement$response;

            var responseData = JSON.parse(response) || {};

            if (responseData.status === 'success') {
              var _responseData$file = responseData.file,
                  file = _responseData$file === undefined ? {} : _responseData$file;


              if (!file.url_public) return;

              var nweImage = new Image();
              nweImage.onload = function () {
                updateState({ isShowSpinner: false, isHideCanvas: false });
                onUpload(nweImage.src);
                closeOnLoad && onClose();
              };
              nweImage.src = file.url_public + ('?hash=' + generateUUID());
            } else {
              updateState({ isShowSpinner: false, isHideCanvas: false });
              alert(responseData);
              closeOnLoad && onClose();
            }
          });

          formData.append('files[]', blob, name);
          request.open("POST", [baseUrl, 'upload?dir=image-editor'].join(''));
          request.setRequestHeader('X-Airstore-Secret-Key', config.UPLOAD_KEY);
          request.send(formData);
        });
      });
    };

    _this.cleanTemp = function () {
      var _this$state = _this.state,
          operations = _this$state.operations,
          currentOperation = _this$state.currentOperation;


      _this.revert(function () {
        _this.applyOperations(operations, operations.findIndex(function (operation) {
          return operation === currentOperation;
        }), function () {
          _this.setState({ tempOperation: null });
          _this.props.updateState({ isHideCanvas: false, isShowSpinner: false });
        });
      });
    };

    _this.rotate = function (value, total) {
      var canvas = _this.getCanvasNode();
      var that = _this;

      window.Caman(canvas, function () {
        this.rotate(value);
        this.render(function () {
          that.setState({ rotate: total });
        });
      });
    };

    _this.adjust = function (handler, value) {
      var _this$state2 = _this.state,
          _this$state2$operatio = _this$state2.operations,
          operations = _this$state2$operatio === undefined ? [] : _this$state2$operatio,
          currentOperation = _this$state2.currentOperation,
          adjust = _this$state2.adjust;

      var that = _this;

      Object.assign(adjust, _defineProperty({}, handler, value));

      _this.setState(adjust);

      _this.revert(function () {
        _this.applyOperations(operations, operations.findIndex(function (operation) {
          return operation === currentOperation;
        }), function () {
          var canvas = _this.getCanvasNode();

          window.Caman(canvas, function () {
            this.brightness(adjust.brightness);
            this.contrast(adjust.contrast);
            this.gamma(adjust.gamma);
            this.saturation(adjust.saturation);

            this.render(function () {
              that.props.updateState({ isHideCanvas: false, isShowSpinner: false });
            });
          });
        });
      });
    };

    _this.applyOrientation = function () {
      var _this$state3 = _this.state,
          currentOperation = _this$state3.currentOperation,
          operations = _this$state3.operations,
          rotate = _this$state3.rotate;

      var operation = {
        stack: [{ name: 'rotate', arguments: [rotate], queue: 0 }]
      };

      _this.pushOperation(operations, operation, currentOperation);
      _this.setState({ rotate: null });
      _this.props.updateState({ isHideCanvas: false, activeTab: null, operations: operations, currentOperation: operation });
    };

    _this.addEffect = function (name) {
      var effectHandlerName = _this.getEffectHandlerName(name);
      var _this$state4 = _this.state,
          currentOperation = _this$state4.currentOperation,
          operations = _this$state4.operations;

      var that = _this;
      var operation = {
        stack: [{ name: effectHandlerName, arguments: [], queue: 2 }]
      };

      _this.setState({ tempOperation: operation });
      _this.revert(function () {
        _this.applyOperations(operations, operations.findIndex(function (operation) {
          return operation === currentOperation;
        }), function () {
          var canvas = _this.getCanvasNode();

          window.Caman(canvas, function () {
            this[effectHandlerName]();
            this.render(function () {
              that.props.updateState({ isHideCanvas: false, isShowSpinner: false });
            });
          });
        });
      });
    };

    _this.getCanvasNode = function () {
      return document.getElementById('scaleflex-image-edit-box');
    };

    _this.initEffects = function () {};

    _this.initFilters = function () {};

    _this.initAdjust = function () {};

    _this.initCrop = function () {
      var canvas = _this.getCanvasNode();

      _this.cropper = new Cropper(canvas, {
        viewMode: 1,
        modal: false,
        background: false,
        rotatable: false,
        scalable: false,
        zoomable: false,
        movable: false,
        crop: function crop(event) {
          _this.setState({ cropDetails: event.detail });
          _this.props.updateState({ cropDetails: event.detail });
        }
      });

      window.scaleflexPlugins = window.scaleflexPlugins || {};
      window.scaleflexPlugins.cropperjs = _this.cropper;
    };

    _this.initResize = function () {};

    _this.initOrientation = function () {};

    _this.destroyCrop = function () {
      _this.cropper.destroy();
    };

    _this.destroyAll = function () {};

    _this.applyCanvasChanges = function () {};

    _this.applyCrop = function () {
      var _this$state5 = _this.state,
          cropDetails = _this$state5.cropDetails,
          currentOperation = _this$state5.currentOperation,
          operations = _this$state5.operations;
      var width = cropDetails.width,
          height = cropDetails.height,
          x = cropDetails.x,
          y = cropDetails.y;

      var canvas = _this.getCanvasNode();
      var that = _this;
      var operation = {
        stack: [{ name: 'crop', arguments: [width, height, x, y], queue: 0 }]
      };

      _this.pushOperation(operations, operation, currentOperation);
      _this.destroyCrop();

      window.Caman(canvas, function () {
        this.crop(width, height, x, y);
        this.render(function () {
          that.props.updateState({
            isHideCanvas: false,
            activeTab: null,
            operations: operations,
            currentOperation: operation,
            canvasDimensions: { width: width, height: height, ratio: width / height }
          });
        });
      });
    };

    _this.applyOperations = function () {
      var operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var operationIndex = arguments[1];
      var callback = arguments[2];
      var queue = _this.state.queue;

      var canvas = _this.getCanvasNode();
      var that = _this;

      window.Caman(canvas, function () {
        var _this2 = this;

        var caman = this;

        queue.forEach(function (queueIndex) {
          operations.forEach(function (operation, index) {
            if (operationIndex < index || operationIndex === -1) return;

            operation.stack.forEach(function (handler) {
              if (handler.queue === queueIndex) caman[handler.name].apply(caman, _toConsumableArray(handler.arguments));
            });
          });

          if (operationIndex > -1) _this2.render(function () {
            that.props.updateState({ currentOperation: operations[operationIndex] });
            if (callback) callback();
          });
        });

        if (!(operationIndex > -1)) {
          that.props.updateState({ currentOperation: operations[operationIndex] });
          setTimeout(function () {
            if (callback) callback();
          });
        }
      });
    };

    _this.applyFilters = function () {
      var operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
      var callback = arguments[1];

      var canvas = _this.getCanvasNode();

      window.Caman(canvas, function () {
        var caman = this;

        operations.forEach(function (operation) {
          operation.stack.forEach(function (handler) {
            if (handler.queue === 2) caman[handler.name].apply(caman, _toConsumableArray(handler.arguments));
          });
        });

        this.render(function () {
          if (callback) callback();
        });
      });
    };

    _this.pushOperation = function (operations, operation, currentOperation) {
      var operationIndex = operations.findIndex(function (operation) {
        return operation === currentOperation;
      });
      var operationsLength = operations.length;

      if (operationsLength && operationIndex !== operations[operationsLength]) operations.splice(operationIndex + 1, operationsLength);

      operations.push(operation);
    };

    _this.applyResize = function () {
      var _this$state6 = _this.state,
          currentOperation = _this$state6.currentOperation,
          operations = _this$state6.operations;
      var canvasDimensions = _this.props.canvasDimensions;
      var width = canvasDimensions.width,
          height = canvasDimensions.height;

      var canvas = _this.getCanvasNode();
      var that = _this;
      var operation = {
        stack: [{ name: 'resize', arguments: [{ width: width, height: height }], queue: 0 }]
      };

      _this.pushOperation(operations, operation, currentOperation);
      window.Caman(canvas, function () {
        this.resize({ width: width, height: height });
        this.render(function () {
          that.props.updateState({ isHideCanvas: false, activeTab: null, operations: operations, currentOperation: operation });
        });
      });
    };

    _this.applyEffects = function () {
      var _this$state7 = _this.state,
          currentOperation = _this$state7.currentOperation,
          operations = _this$state7.operations,
          tempOperation = _this$state7.tempOperation;

      _this.pushOperation(operations, tempOperation, currentOperation);
      _this.props.updateState({ isHideCanvas: false, activeTab: null, operations: operations, currentOperation: tempOperation });
    };

    _this.revert = function (callback) {
      var oldcanv = document.getElementById('scaleflex-image-edit-box');
      var container = oldcanv.parentElement;
      container.removeChild(oldcanv);

      var canvas = document.createElement('canvas');
      canvas.id = 'scaleflex-image-edit-box';

      //const canvas = this.getCanvasNode();
      var ctx = canvas.getContext('2d');

      /* Enable Cross Origin Image Editing */
      var img = new Image();
      img.crossOrigin = '';
      img.src = _this.state.src;

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, img.width, img.height);

        _this.props.updateState({
          original: { height: img.height, width: img.width },
          canvasDimensions: { height: img.height, width: img.width, ratio: img.width / img.height }
        });
        _this.setState({
          originalWidth: img.width, originalHeight: img.height, originalImage: img
        });

        container.appendChild(canvas);
        if (callback) setTimeout(function () {
          callback();
        });
      };
    };

    _this.applyChanges = function (activeTab) {
      switch (activeTab) {
        case 'effects':
        case 'filters':
          _this.applyEffects();
          break;
        case 'adjust':
          _this.applyCanvasChanges();
          break;
        case 'crop':
          _this.applyCrop();
          break;
        case 'orientation':
          _this.applyOrientation();
          break;
        case 'resize':
          _this.applyResize();
          break;
        default:
          break;
      }
    };

    _this.changeTab = function (name) {
      switch (name) {
        case 'effects':
          _this.initEffects();
          break;
        case 'filters':
          _this.initFilters();
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
        case 'orientation':
          _this.initOrientation();
          break;
        default:
          _this.destroyAll();
      }
    };

    _this.destroyMode = function (name) {
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
        case 'orientation':
          break;
        default:
          break;
      }
    };

    _this.getEffectHandlerName = function (name) {
      switch (name) {
        //filters
        case 'colorize':
          return 'colorize';
        case 'contrast':
          return 'contrast';
        case 'cross_process':
          return 'crossProcess';
        case 'glow_sun':
          return 'glowingSun';
        case 'hdr_effect':
          return 'hdr';
        case 'jarques':
          return 'jarques';
        case 'love':
          return 'love';
        case 'old_boot':
          return 'oldBoot';
        case 'orange_peel':
          return 'orangePeel';
        case 'pin_hole':
          return 'pinhole';
        case 'pleasant':
          return 'pleasant';
        case 'sepia':
          return 'sepia';
        case 'sun_rise':
          return 'sunrise';
        case 'vintage':
          return 'vintage';
        //effets
        case 'clarity':
          return '';
        case 'edge_enhance':
          return 'edgeEnhance';
        case 'emboss':
          return 'emboss';
        case 'grungy':
          return 'grungy';
        case 'hazy':
          return 'hazyDays';
        case 'lomo':
          return 'lomo';
        case 'noise':
          return 'noise';
        case 'old_paper':
          return 'oldPaper'; //?
        case 'posterize':
          return 'posterize';
        case 'radial_blur':
          return 'radialBlur';
        case 'sin_city':
          return 'sinCity';
        case 'tilt_shift':
          return 'tiltShift';
        default:
          return null;
      }
    };

    _this.state = _extends({}, props, {
      queue: Array.from(Array(3).keys()),
      tempOperation: null,
      canvas: null,
      adjust: {
        brightness: 0,
        contrast: 0,
        gamma: 1,
        saturation: 0
      }
    });
    return _this;
  }

  _createClass(ImageManipulator, [{
    key: 'shouldComponentUpdate',
    value: function shouldComponentUpdate() {
      return false;
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.activeTab !== this.state.activeTab) {
        if (this.state.activeTab) this.destroyMode(this.state.activeTab);

        this.changeTab(nextProps.activeTab);
      }

      this.setState(_extends({}, nextProps));
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this3 = this;

      var src = this.state.src.split('?')[0];
      var splittedSrc = src.split('/');
      var imageName = splittedSrc[splittedSrc.length - 1];
      this.props.updateState({
        isShowSpinner: true,
        applyChanges: this.applyChanges,
        applyOperations: this.applyOperations,
        saveImage: this.saveImage,
        updateCropDetails: this.updateCropDetails,
        resize: this.resize,
        addEffect: this.addEffect,
        cleanTemp: this.cleanTemp,
        revert: this.revert,
        rotate: this.rotate,
        adjust: this.adjust
      });
      var canvas = this.getCanvasNode();
      var ctx = canvas.getContext('2d');

      /* Enable Cross Origin Image Editing */
      var img = new Image();
      img.crossOrigin = '';
      img.src = src;

      img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        _this3.props.updateState({
          isShowSpinner: false,
          original: { height: img.height, width: img.width },
          canvasDimensions: { height: img.height, width: img.width, ratio: img.width / img.height }
        });
        _this3.setState({
          originalWidth: img.width, originalHeight: img.height, originalImage: img, imageName: imageName,
          originalCanvas: canvas
        });
      };
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(Canvas, { id: 'scaleflex-image-edit-box' });
    }
  }]);

  return ImageManipulator;
}(Component);

export default ImageManipulator;