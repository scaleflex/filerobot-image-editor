var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import '../../config';
import { ResizeWrapper, ResizeBox, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon } from '../../styledComponents';

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
      isBlockRatio: false
    }, _this.changeWidth = function (event) {
      var isBlockRatio = _this.state.isBlockRatio;
      var canvasDimensions = _this.props.canvasDimensions;

      var width = event.target.value;
      var height = canvasDimensions.height;

      if (!isBlockRatio) height = width && width / canvasDimensions.ratio || 1;

      _this.props.updateState({ canvasDimensions: _extends({}, canvasDimensions, { width: width, height: height }) });
    }, _this.changeHeight = function (event) {
      var isBlockRatio = _this.state.isBlockRatio;
      var canvasDimensions = _this.props.canvasDimensions;

      var height = event.target.value;
      var width = canvasDimensions.width;

      if (!isBlockRatio) width = height && height * canvasDimensions.ratio || 1;

      _this.props.updateState({ canvasDimensions: _extends({}, canvasDimensions, { width: width, height: height }) });
    }, _this.toggleRatio = function () {
      _this.setState({ isBlockRatio: !_this.state.isBlockRatio });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var isBlockRatio = this.state.isBlockRatio;
      var canvasDimensions = this.props.canvasDimensions;


      return React.createElement(
        ResizeWrapper,
        null,
        React.createElement(
          ResizeBox,
          null,
          React.createElement(
            FieldSet,
            null,
            React.createElement(
              FieldLabel,
              null,
              'width'
            ),
            React.createElement(FieldInput, {
              fullSize: true,
              value: parseInt(canvasDimensions.width, 10) || '',
              onChange: this.changeWidth
            })
          ),
          React.createElement(
            BlockRatioWrapper,
            null,
            React.createElement(
              BlockRatioBtn,
              { active: !isBlockRatio, link: true, onClick: this.toggleRatio },
              React.createElement(BlockRatioIcon, { active: !isBlockRatio })
            )
          ),
          React.createElement(
            FieldSet,
            null,
            React.createElement(
              FieldLabel,
              null,
              'height'
            ),
            React.createElement(FieldInput, {
              fullSize: true,
              value: parseInt(canvasDimensions.height, 10) || '',
              onChange: this.changeHeight
            })
          )
        )
      );
    }
  }]);

  return _class;
}(Component);

export default _class;