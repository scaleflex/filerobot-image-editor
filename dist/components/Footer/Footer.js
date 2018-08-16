var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Footer, PreviousBtn, NextBtn, Switcher } from '../../styledComponents/index';

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$operations = _props.operations,
          operations = _props$operations === undefined ? [] : _props$operations,
          _props$currentOperati = _props.currentOperation,
          currentOperation = _props$currentOperati === undefined ? null : _props$currentOperati,
          redoOperation = _props.redoOperation,
          updateState = _props.updateState,
          processWithCloudimage = _props.processWithCloudimage;

      var currentOperationIndex = operations.findIndex(function (operation) {
        return operation === currentOperation;
      });
      var isCurrentOperationLast = currentOperation && operations[operations.length - 1] === currentOperation;
      var isPrevForbidden = operations.length < 1 || currentOperationIndex === -1;
      var isNextForbidden = (operations.length < 2 || operations.length > 1 && isCurrentOperationLast) && (currentOperationIndex !== -1 || operations.length !== 1);

      return React.createElement(
        Footer,
        null,
        React.createElement(PreviousBtn, {
          onClick: function onClick() {
            !isPrevForbidden && redoOperation(currentOperationIndex - 1);
          },
          muted: isPrevForbidden
        }),
        React.createElement(NextBtn, {
          onClick: function onClick() {
            !isNextForbidden && redoOperation(currentOperationIndex + 1);
          },
          muted: isNextForbidden
        }),
        React.createElement(Switcher, {
          id: 'cloudimage-url-generator-switch',
          checked: processWithCloudimage,
          handleChange: function handleChange(processWithCloudimage) {
            updateState({ processWithCloudimage: processWithCloudimage });
          },
          text: 'Process with cloudimage'
        })
      );
    }
  }]);

  return _class;
}(Component);

export default _class;