var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
import { CLOUDIMAGE_OPERATIONS } from '../../config';
import Cropper from 'cropperjs';

var ImageManipulator = function (_Component) {
  _inherits(ImageManipulator, _Component);

  function ImageManipulator(props) {
    _classCallCheck(this, ImageManipulator);

    var _this = _possibleConstructorReturn(this, (ImageManipulator.__proto__ || Object.getPrototypeOf(ImageManipulator)).call(this));

    _initialiseProps.call(_this);

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
      var _this2 = this;

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

        _this2.props.updateState({
          isShowSpinner: false,
          original: { height: img.height, width: img.width },
          canvasDimensions: { height: img.height, width: img.width, ratio: img.width / img.height }
        });
        _this2.setState({
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

var _initialiseProps = function _initialiseProps() {
  var _this3 = this;

  this.saveImage = function () {
    var _state = _this3.state,
        imageName = _state.imageName,
        operations = _state.operations;
    var _props = _this3.props,
        onUpload = _props.onUpload,
        onClose = _props.onClose,
        updateState = _props.updateState,
        closeOnLoad = _props.closeOnLoad,
        config = _props.config,
        processWithCloudimage = _props.processWithCloudimage;

    var src = _this3.state.src.split('?')[0];
    var canvas = _this3.getCanvasNode();

    if (!processWithCloudimage) {
      window.Caman(canvas, function () {
        this.render(function () {
          var base64 = this.toBase64();
          var block = base64.split(";");
          var contentType = block[0].split(":")[1];
          var realData = block[1].split(",")[1];
          var blob = b64toBlob(realData, contentType, null);
          var splittedName = imageName.replace(/-edited/g, '').split('.');
          var nameLength = splittedName.length;
          var name = splittedName.slice(0, nameLength - 1).join('.') + '-' + generateUUID().substr(-6) + '.' + splittedName[nameLength - 1];
          var formData = new FormData();
          var request = new XMLHttpRequest();
          var baseUrl = '//' + config.UPLOAD_CONTAINER + '.api.airstore.io/v1/';
          var uploadParams = config.UPLOAD_PARAMS || {};
          var dir = uploadParams.dir || 'image-editor';

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
                onUpload(nweImage.src, file);
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
          request.open("POST", [baseUrl, 'upload?dir=' + dir].join(''));
          request.setRequestHeader('X-Airstore-Secret-Key', config.UPLOAD_KEY);
          request.send(formData);
        });
      });
    } else {
      var allowedOperations = operations.filter(function (_ref) {
        var stack = _ref.stack;
        return CLOUDIMAGE_OPERATIONS.indexOf(stack[0].name) > -1;
      });
      var url = _this3.generateCloudimageURL(allowedOperations);
      var original = src.replace(/https?:\/\/scaleflex.ultrafast.io\//, '');

      var nweImage = new Image();
      nweImage.onload = function () {
        updateState({ isShowSpinner: false, isHideCanvas: false });
        onUpload(url + original);
        closeOnLoad && onClose();
      };
      nweImage.src = url + original + ('?hash=' + generateUUID());
    }
  };

  this.generateCloudimageURL = function (operations) {
    var config = _this3.props.config;

    var cloudUrl = config.CLOUDIMAGE_TOKEN + '.cloudimg.io' + '/';
    var cropOperation = _this3.isOperationExist(operations, 'crop');
    var resizeOperation = _this3.isOperationExist(operations, 'resize');
    var orientationOperation = _this3.isOperationExist(operations, 'rotate');
    var operationQ = _this3.getOperationQuery(cropOperation, resizeOperation);
    var cropParams = null;
    var resizeParams = null;
    var orientationParams = null;

    if (cropOperation) cropParams = _this3.getCropArguments(cropOperation);

    var _ref2 = cropParams || [],
        _ref3 = _slicedToArray(_ref2, 4),
        cropWidth = _ref3[0],
        cropHeight = _ref3[1],
        x = _ref3[2],
        y = _ref3[3];

    if (resizeOperation) resizeParams = _this3.getResizeArguments(resizeOperation);

    if (orientationOperation) orientationParams = _this3.getOrientationArguments(orientationOperation);

    var _ref4 = resizeParams || [],
        _ref5 = _slicedToArray(_ref4, 2),
        resizeWidth = _ref5[0],
        resizeHeight = _ref5[1];

    var cropQ = cropOperation ? x + ',' + y + ',' + (x + cropWidth) + ',' + (y + cropHeight) + '-' : '';
    var resizeQ = (resizeWidth || cropWidth) + 'x' + (resizeHeight || cropHeight);
    var sizesQ = cropQ || resizeQ ? cropQ + resizeQ : 'n';
    var rotateQ = orientationParams ? orientationParams : '';
    var filtersQ = rotateQ ? 'r' + rotateQ : 'n';

    if (operationQ === 'cdn' && filtersQ !== 'n') operationQ = 'cdno';

    return 'https://' + cloudUrl + operationQ + '/' + sizesQ + '/' + filtersQ + '/';
  };

  this.isOperationExist = function (operations, type) {
    return operations.find(function (_ref6) {
      var stack = _ref6.stack;
      return stack[0].name === type;
    });
  };

  this.getOperationQuery = function (isCrop, isResize) {
    if (isCrop) return 'crop_px';else if (isResize) return 'width';else return 'cdn';
  };

  this.getCropArguments = function () {
    var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _operation$stack = operation.stack,
        stack = _operation$stack === undefined ? [] : _operation$stack;

    var params = stack[0] && stack[0].arguments;

    params = params.map(function (value) {
      return parseInt(value);
    });

    return params;
  };

  this.getResizeArguments = function () {
    var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _operation$stack2 = operation.stack,
        stack = _operation$stack2 === undefined ? [] : _operation$stack2;

    var props = stack[0] && stack[0].arguments && stack[0].arguments[0];

    return [parseInt(props.width), parseInt(props.height)];
  };

  this.getOrientationArguments = function () {
    var operation = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var _operation$stack3 = operation.stack,
        stack = _operation$stack3 === undefined ? [] : _operation$stack3;

    var rotate = stack[0] && stack[0].arguments && stack[0].arguments[0] || 0;

    // todo: need to find better way or ask julian to redo it on server
    switch (rotate) {
      case 90:
        return 270;
      case -90:
        return 90;
      default:
        return rotate;
    }
  };

  this.cleanTemp = function () {
    var _state2 = _this3.state,
        operations = _state2.operations,
        currentOperation = _state2.currentOperation;


    _this3.revert(function () {
      _this3.applyOperations(operations, operations.findIndex(function (operation) {
        return operation === currentOperation;
      }), function () {
        _this3.setState({ tempOperation: null });
        _this3.props.updateState({ isHideCanvas: false, isShowSpinner: false });
      });
    });
  };

  this.rotate = function (value, total) {
    var canvas = _this3.getCanvasNode();
    var that = _this3;

    window.Caman(canvas, function () {
      this.rotate(value);
      this.render(function () {
        that.setState({ rotate: total });
      });
    });
  };

  this.adjust = function (handler, value) {
    var _state3 = _this3.state,
        _state3$operations = _state3.operations,
        operations = _state3$operations === undefined ? [] : _state3$operations,
        currentOperation = _state3.currentOperation,
        adjust = _state3.adjust;

    var that = _this3;

    Object.assign(adjust, _defineProperty({}, handler, value));

    _this3.setState(adjust);

    _this3.revert(function () {
      _this3.applyOperations(operations, operations.findIndex(function (operation) {
        return operation === currentOperation;
      }), function () {
        var canvas = _this3.getCanvasNode();

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

  this.applyOrientation = function () {
    var _state4 = _this3.state,
        currentOperation = _state4.currentOperation,
        operations = _state4.operations,
        rotate = _state4.rotate;

    var operation = {
      stack: [{ name: 'rotate', arguments: [rotate], queue: 0 }]
    };

    _this3.pushOperation(operations, operation, currentOperation);
    _this3.setState({ rotate: null });
    _this3.props.updateState({ isHideCanvas: false, activeTab: null, operations: operations, currentOperation: operation });
  };

  this.addEffect = function (name) {
    var effectHandlerName = _this3.getEffectHandlerName(name);
    var _state5 = _this3.state,
        currentOperation = _state5.currentOperation,
        operations = _state5.operations;

    var that = _this3;
    var operation = {
      stack: [{ name: effectHandlerName, arguments: [], queue: 2 }]
    };

    _this3.setState({ tempOperation: operation });
    _this3.revert(function () {
      _this3.applyOperations(operations, operations.findIndex(function (operation) {
        return operation === currentOperation;
      }), function () {
        var canvas = _this3.getCanvasNode();

        window.Caman(canvas, function () {
          this[effectHandlerName]();
          this.render(function () {
            that.props.updateState({ isHideCanvas: false, isShowSpinner: false });
          });
        });
      });
    });
  };

  this.getCanvasNode = function () {
    return document.getElementById('scaleflex-image-edit-box');
  };

  this.initEffects = function () {};

  this.initFilters = function () {};

  this.initAdjust = function () {};

  this.initCrop = function () {
    var canvas = _this3.getCanvasNode();

    _this3.cropper = new Cropper(canvas, {
      viewMode: 1,
      modal: false,
      background: false,
      rotatable: false,
      scalable: false,
      zoomable: false,
      movable: false,
      crop: function crop(event) {
        _this3.setState({ cropDetails: event.detail });
        _this3.props.updateState({ cropDetails: event.detail });
      }
    });

    window.scaleflexPlugins = window.scaleflexPlugins || {};
    window.scaleflexPlugins.cropperjs = _this3.cropper;
  };

  this.initResize = function () {};

  this.initOrientation = function () {};

  this.destroyCrop = function () {
    _this3.cropper.destroy();
  };

  this.destroyAll = function () {};

  this.applyCanvasChanges = function () {};

  this.applyCrop = function () {
    var _state6 = _this3.state,
        cropDetails = _state6.cropDetails,
        currentOperation = _state6.currentOperation,
        operations = _state6.operations;
    var width = cropDetails.width,
        height = cropDetails.height,
        x = cropDetails.x,
        y = cropDetails.y;

    var canvas = _this3.getCanvasNode();
    var that = _this3;
    var operation = {
      stack: [{ name: 'crop', arguments: [width, height, x, y], queue: 0 }]
    };

    _this3.pushOperation(operations, operation, currentOperation);
    _this3.destroyCrop();

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

  this.applyOperations = function () {
    var operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var operationIndex = arguments[1];
    var callback = arguments[2];
    var queue = _this3.state.queue;

    var canvas = _this3.getCanvasNode();
    var that = _this3;

    window.Caman(canvas, function () {
      var _this4 = this;

      var caman = this;

      queue.forEach(function (queueIndex) {
        operations.forEach(function (operation, index) {
          if (operationIndex < index || operationIndex === -1) return;

          operation.stack.forEach(function (handler) {
            if (handler.queue === queueIndex) caman[handler.name].apply(caman, _toConsumableArray(handler.arguments));
          });
        });

        if (operationIndex > -1) _this4.render(function () {
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

  this.applyFilters = function () {
    var operations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var callback = arguments[1];

    var canvas = _this3.getCanvasNode();

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

  this.pushOperation = function (operations, operation, currentOperation) {
    var operationIndex = operations.findIndex(function (operation) {
      return operation === currentOperation;
    });
    var operationsLength = operations.length;

    if (operationsLength && operationIndex !== operations[operationsLength]) operations.splice(operationIndex + 1, operationsLength);

    operations.push(operation);
  };

  this.applyResize = function () {
    var _state7 = _this3.state,
        currentOperation = _state7.currentOperation,
        operations = _state7.operations;
    var canvasDimensions = _this3.props.canvasDimensions;
    var width = canvasDimensions.width,
        height = canvasDimensions.height;

    var canvas = _this3.getCanvasNode();
    var that = _this3;
    var operation = {
      stack: [{ name: 'resize', arguments: [{ width: width, height: height }], queue: 0 }]
    };

    _this3.pushOperation(operations, operation, currentOperation);
    window.Caman(canvas, function () {
      this.resize({ width: width, height: height });
      this.render(function () {
        that.props.updateState({ isHideCanvas: false, activeTab: null, operations: operations, currentOperation: operation });
      });
    });
  };

  this.applyEffects = function () {
    var _state8 = _this3.state,
        currentOperation = _state8.currentOperation,
        operations = _state8.operations,
        tempOperation = _state8.tempOperation;

    _this3.pushOperation(operations, tempOperation, currentOperation);
    _this3.props.updateState({ isHideCanvas: false, activeTab: null, operations: operations, currentOperation: tempOperation });
  };

  this.revert = function (callback) {
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
    img.src = _this3.state.src;

    img.onload = function () {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, img.width, img.height);

      _this3.props.updateState({
        original: { height: img.height, width: img.width },
        canvasDimensions: { height: img.height, width: img.width, ratio: img.width / img.height }
      });
      _this3.setState({
        originalWidth: img.width, originalHeight: img.height, originalImage: img
      });

      container.appendChild(canvas);
      if (callback) setTimeout(function () {
        callback();
      });
    };
  };

  this.applyChanges = function (activeTab) {
    switch (activeTab) {
      case 'effects':
      case 'filters':
        _this3.applyEffects();
        break;
      case 'adjust':
        _this3.applyCanvasChanges();
        break;
      case 'crop':
        _this3.applyCrop();
        break;
      case 'rotate':
        _this3.applyOrientation();
        break;
      case 'resize':
        _this3.applyResize();
        break;
      default:
        break;
    }
  };

  this.changeTab = function (name) {
    switch (name) {
      case 'effects':
        _this3.initEffects();
        break;
      case 'filters':
        _this3.initFilters();
        break;
      case 'adjust':
        _this3.initAdjust();
        break;
      case 'crop':
        _this3.initCrop();
        break;
      case 'resize':
        _this3.initResize();
        break;
      case 'rotate':
        _this3.initOrientation();
        break;
      default:
        _this3.destroyAll();
    }
  };

  this.destroyMode = function (name) {
    switch (name) {
      case 'effects':
        break;
      case 'filters':
        break;
      case 'adjust':
        break;
      case 'crop':
        _this3.destroyCrop();
        break;
      case 'resize':
        break;
      case 'rotate':
        break;
      default:
        break;
    }
  };

  this.getEffectHandlerName = function (name) {
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
};

export default ImageManipulator;