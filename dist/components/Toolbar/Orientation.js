var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { OrientationWrapper, RotateWrapper, RotateButton, RotateLabel, RotateIcon } from '../../styledComponents';
import { Button } from 'scaleflex-react-ui-kit/dist';

var _class = function (_Component) {
  _inherits(_class, _Component);

  function _class() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, _class);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args))), _this), _this.state = { rotate: 0 }, _this.leftRotate = function () {
      var onRotate = _this.props.onRotate;
      var rotate = _this.state.rotate;


      onRotate(-90, rotate - 90);
      _this.setState({ rotate: rotate - 90 });
    }, _this.rightRotate = function () {
      var onRotate = _this.props.onRotate;
      var rotate = _this.state.rotate;


      onRotate(90, rotate + 90);
      _this.setState({ rotate: rotate + 90 });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        OrientationWrapper,
        null,
        React.createElement(
          RotateWrapper,
          null,
          React.createElement(
            RotateLabel,
            null,
            'Rotate'
          ),
          React.createElement(
            RotateButton,
            null,
            React.createElement(
              Button,
              { onClick: this.leftRotate },
              React.createElement(RotateIcon, { name: 'left-rotate' })
            ),
            React.createElement(
              Button,
              { onClick: this.rightRotate },
              React.createElement(RotateIcon, { name: 'right-rotate' })
            )
          )
        )
      );
    }
  }]);

  return _class;
}(Component);

export default _class;