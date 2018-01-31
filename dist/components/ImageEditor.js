var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Wrapper } from '../styledComponents/index';
import { Header, Preview, Footer } from './';
import 'scaleflex-react-modules/dist/styledComponents/assets/styles/scaleflex-icon-font.css';

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      isShowSpinner: true,
      isHideCanvas: false,
      activeTab: null,
      operations: [],
      currentOperation: null,
      original: { width: 300, height: 200 },
      cropDetails: { width: 300, height: 200 },
      canvasDimensions: { width: 300, height: 200, ratio: 1.5 }
    }, _this.updateState = function (props) {
      _this.setState(props);
    }, _this.onRevert = function () {
      var _this$state = _this.state,
          cleanTemp = _this$state.cleanTemp,
          activeTab = _this$state.activeTab,
          revert = _this$state.revert,
          applyOperations = _this$state.applyOperations,
          operations = _this$state.operations;


      if (activeTab === 'effects' || activeTab === 'filters') {
        _this.setState({ activeTab: null, isShowSpinner: true, isHideCanvas: true });
        cleanTemp();
        return;
      }

      if (activeTab === 'orientation') {
        revert(function () {
          applyOperations(operations, operations.length - 1, function () {
            _this.setState({ isHideCanvas: false, isShowSpinner: false });
          });
        });
      }

      _this.setState({ activeTab: null, isShowSpinner: false, isHideCanvas: false });
    }, _this.onAdjust = function (handler, value) {
      var adjust = _this.state.adjust;


      adjust(handler, value);
    }, _this.onRotate = function (value, total) {
      var rotate = _this.state.rotate;


      rotate(value, total);
    }, _this.onSave = function () {
      var saveImage = _this.state.saveImage;


      _this.setState({ isShowSpinner: true });
      saveImage();
    }, _this.onResize = function (params) {
      var resize = _this.state.resize;


      resize(params);
    }, _this.onApplyEffects = function (name) {
      var addEffect = _this.state.addEffect;


      _this.setState({ isHideCanvas: true, isShowSpinner: true });
      addEffect(name);
    }, _this.apply = function () {
      var _this$state2 = _this.state,
          activeTab = _this$state2.activeTab,
          applyChanges = _this$state2.applyChanges;


      _this.setState({ isHideCanvas: true });
      applyChanges(activeTab);
    }, _this.redoOperation = function (operationIndex) {
      var _this$state3 = _this.state,
          applyOperations = _this$state3.applyOperations,
          operations = _this$state3.operations,
          revert = _this$state3.revert;


      _this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });
      revert(function () {
        applyOperations(operations, operationIndex, function () {
          _this.setState({ isHideCanvas: false, isShowSpinner: false });
        });
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
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
          canvasDimensions = _state.canvasDimensions;
      var _props = this.props,
          src = _props.src,
          onClose = _props.onClose,
          onUpdate = _props.onUpdate;

      var headerProps = {
        cropDetails: cropDetails,
        original: original,
        activeTab: activeTab,
        src: src,
        onClose: onClose,
        canvasDimensions: canvasDimensions,
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
        onUpdate: onUpdate,
        canvasDimensions: canvasDimensions,
        updateState: this.updateState
      };
      var footerProps = { operations: operations, currentOperation: currentOperation, redoOperation: this.redoOperation };

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

export default _class;