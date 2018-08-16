var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Wrapper } from '../styledComponents/index';
import { Header, Preview, Footer } from './';

// for some reason we cannot import caman.full.js into build
var script = document.createElement('script');
script.src = '//jolipage.api.airstore.io/v1/get/_/d93231a3-1e6a-5b0e-8882-342c64c5fb8f/caman.full.min.js';
document.body.appendChild(script);

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

    _initialiseProps.call(_this);

    var PROCESS_WITH_CLOUDIMAGE = props.config.PROCESS_WITH_CLOUDIMAGE;


    _this.state = {
      isShowSpinner: true,
      isHideCanvas: false,
      activeTab: null,
      operations: [],
      currentOperation: null,
      original: { width: 300, height: 200 },
      cropDetails: { width: 300, height: 200 },
      canvasDimensions: { width: 300, height: 200, ratio: 1.5 },
      processWithCloudimage: PROCESS_WITH_CLOUDIMAGE
    };
    return _this;
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var _state = this.state,
          isShowSpinner = _state.isShowSpinner,
          activeTab = _state.activeTab,
          operations = _state.operations,
          currentOperation = _state.currentOperation,
          isHideCanvas = _state.isHideCanvas,
          cropDetails = _state.cropDetails,
          original = _state.original,
          canvasDimensions = _state.canvasDimensions,
          processWithCloudimage = _state.processWithCloudimage;
      var _props = this.props,
          src = _props.src,
          config = _props.config,
          onClose = _props.onClose,
          onUpload = _props.onUpload,
          _props$closeOnLoad = _props.closeOnLoad,
          closeOnLoad = _props$closeOnLoad === undefined ? true : _props$closeOnLoad;

      var headerProps = {
        cropDetails: cropDetails,
        original: original,
        activeTab: activeTab,
        src: src,
        onClose: onClose,
        canvasDimensions: canvasDimensions,
        processWithCloudimage: processWithCloudimage,
        updateState: this.updateState,
        onRevert: this.onRevert,
        apply: this.apply,
        onSave: this.onSave,
        onResize: this.onResize,
        onApplyEffects: this.onApplyEffects,
        onRotate: this.onRotate,
        onAdjust: this.onAdjust
      };
      var previewProps = {
        activeTab: activeTab,
        isShowSpinner: isShowSpinner,
        operations: operations,
        currentOperation: currentOperation,
        isHideCanvas: isHideCanvas,
        src: src,
        onClose: onClose,
        onUpload: onUpload,
        canvasDimensions: canvasDimensions,
        closeOnLoad: closeOnLoad,
        config: config,
        processWithCloudimage: processWithCloudimage,
        updateState: this.updateState
      };
      var footerProps = {
        operations: operations,
        currentOperation: currentOperation,
        processWithCloudimage: processWithCloudimage,
        updateState: this.updateState,
        redoOperation: this.redoOperation
      };

      return React.createElement(
        Wrapper,
        null,
        React.createElement(Header, headerProps),
        React.createElement(Preview, previewProps),
        React.createElement(Footer, footerProps)
      );
    }
  }]);

  return _class;
}(Component);

var _initialiseProps = function _initialiseProps() {
  var _this2 = this;

  this.updateState = function (props) {
    _this2.setState(props);
  };

  this.onRevert = function () {
    var _state2 = _this2.state,
        cleanTemp = _state2.cleanTemp,
        activeTab = _state2.activeTab,
        revert = _state2.revert,
        applyOperations = _state2.applyOperations,
        operations = _state2.operations;


    if (activeTab === 'effects' || activeTab === 'filters') {
      _this2.setState({ activeTab: null, isShowSpinner: true, isHideCanvas: true });
      cleanTemp();
      return;
    }

    if (activeTab === 'orientation') {
      revert(function () {
        applyOperations(operations, operations.length - 1, function () {
          _this2.setState({ isHideCanvas: false, isShowSpinner: false });
        });
      });
    }

    _this2.setState({ activeTab: null, isShowSpinner: false, isHideCanvas: false });
  };

  this.onAdjust = function (handler, value) {
    var adjust = _this2.state.adjust;


    adjust(handler, value);
  };

  this.onRotate = function (value, total) {
    var rotate = _this2.state.rotate;


    rotate(value, total);
  };

  this.onSave = function () {
    var saveImage = _this2.state.saveImage;


    _this2.setState({ isShowSpinner: true });
    saveImage();
  };

  this.onResize = function (params) {
    var resize = _this2.state.resize;


    resize(params);
  };

  this.onApplyEffects = function (name) {
    var addEffect = _this2.state.addEffect;


    _this2.setState({ isHideCanvas: true, isShowSpinner: true });
    addEffect(name);
  };

  this.apply = function () {
    var _state3 = _this2.state,
        activeTab = _state3.activeTab,
        applyChanges = _state3.applyChanges;


    _this2.setState({ isHideCanvas: true });
    applyChanges(activeTab);
  };

  this.redoOperation = function (operationIndex) {
    var _state4 = _this2.state,
        applyOperations = _state4.applyOperations,
        operations = _state4.operations,
        revert = _state4.revert;


    _this2.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });
    revert(function () {
      applyOperations(operations, operationIndex, function () {
        _this2.setState({ isHideCanvas: false, isShowSpinner: false });
      });
    });
  };
};

export default _class;