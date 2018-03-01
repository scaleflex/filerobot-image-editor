var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import { HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper } from '../../styledComponents';
import { CloseBtn, Button } from 'scaleflex-react-ui-kit/dist';
import { Toolbar } from '../';

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
          activeTab = _props.activeTab,
          onRevert = _props.onRevert,
          apply = _props.apply,
          onClose = _props.onClose,
          onSave = _props.onSave;


      return React.createElement(
        HeaderWrapper,
        null,
        React.createElement(
          HeaderTop,
          null,
          React.createElement(
            Title,
            null,
            activeTab || 'Image Editor'
          ),
          React.createElement(CloseBtn, { onClick: onClose })
        ),
        React.createElement(
          ToolbarWrapper,
          null,
          React.createElement(
            LeftActions,
            null,
            React.createElement(
              Button,
              { hide: !activeTab, onClick: onRevert, fullSize: true },
              'Cancel'
            )
          ),
          React.createElement(Toolbar, this.props),
          React.createElement(
            RightActions,
            null,
            React.createElement(
              Button,
              {
                success: activeTab,
                themeBtn: !activeTab,
                fullSize: true,
                onClick: function onClick() {
                  !activeTab ? onSave() : apply();
                }
              },
              !activeTab ? 'Save' : 'Apply'
            )
          )
        )
      );
    }
  }]);

  return _class;
}(Component);

export default _class;