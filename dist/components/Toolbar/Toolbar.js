var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { Toolbar, NoClickOverlay } from '../../styledComponents';
import { TOOLS, CLOUDIMAGE_OPERATIONS } from '../../config';
import Tool from './Tool';
import Effects from './Effects';
import Filters from './Filters';
import Crop from './Crop';
import Resize from './Resize';
import Orientation from './Orientation';
import Adjust from './Adjust';

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          activeTab = _props.activeTab,
          processWithCloudimage = _props.processWithCloudimage,
          isShowSpinner = _props.isShowSpinner,
          operations = _props.operations;

      var resizeOperationIndex = operations.findIndex(function (_ref) {
        var stack = _ref.stack;
        return stack[0].name === 'resize';
      });
      var allowedTools = TOOLS;

      if (processWithCloudimage) allowedTools = TOOLS.filter(function (tool) {
        return CLOUDIMAGE_OPERATIONS.indexOf(tool) > -1;
      });

      if (processWithCloudimage && resizeOperationIndex > -1) allowedTools = allowedTools.filter(function (tool) {
        return tool !== 'resize';
      });

      return React.createElement(
        Toolbar,
        null,
        !activeTab && allowedTools.map(function (name) {
          return React.createElement(Tool, _extends({ name: name, key: name }, _this2.props));
        }),
        activeTab === 'effects' && React.createElement(Effects, this.props),
        activeTab === 'filters' && React.createElement(Filters, this.props),
        activeTab === 'crop' && React.createElement(Crop, this.props),
        activeTab === 'resize' && React.createElement(Resize, this.props),
        activeTab === 'rotate' && React.createElement(Orientation, this.props),
        activeTab === 'adjust' && React.createElement(Adjust, this.props),
        isShowSpinner && React.createElement(NoClickOverlay, null)
      );
    }
  }]);

  return _class;
}(Component);

export default _class;