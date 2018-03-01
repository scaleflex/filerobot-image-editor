var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { AdjustWrapper } from '../../styledComponents';
import { Button } from 'scaleflex-react-ui-kit/dist';

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var onAdjust = this.props.onAdjust;


      return React.createElement(
        AdjustWrapper,
        null,
        React.createElement(
          Button,
          { onClick: function onClick() {
              onAdjust('brightness', -30);
            } },
          'Brightness'
        ),
        React.createElement(
          Button,
          { onClick: function onClick() {
              onAdjust('contrast', 30);
            } },
          'Contrast'
        ),
        React.createElement(
          Button,
          { onClick: function onClick() {
              onAdjust('gamma', 5);
            } },
          'Gamma'
        ),
        React.createElement(
          Button,
          { onClick: function onClick() {
              onAdjust('saturation', 30);
            } },
          'Saturation'
        )
      );
    }
  }]);

  return _class;
}(Component);

export default _class;