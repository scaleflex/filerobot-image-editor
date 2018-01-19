var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

(function () {
  var enterModule = require('react-hot-loader/patch').enterModule;

  enterModule && enterModule(module);
})();

import React, { Component } from 'react';
//import s from './image-editor-react.module.scss';
//import s from './image-editor-react.module.css';


var ImageEditorReact = function (_Component) {
  _inherits(ImageEditorReact, _Component);

  function ImageEditorReact() {
    _classCallCheck(this, ImageEditorReact);

    return _possibleConstructorReturn(this, (ImageEditorReact.__proto__ || Object.getPrototypeOf(ImageEditorReact)).apply(this, arguments));
  }

  _createClass(ImageEditorReact, [{
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        this.props.children
      );
    }
  }, {
    key: '__reactstandin__regenerateByEval',
    value: function __reactstandin__regenerateByEval(key, code) {
      this[key] = eval(code);
    }
  }]);

  return ImageEditorReact;
}(Component);

var _default = ImageEditorReact;


export default _default;
;

(function () {
  var reactHotLoader = require('react-hot-loader/patch').default;

  var leaveModule = require('react-hot-loader/patch').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  reactHotLoader.register(ImageEditorReact, 'ImageEditorReact', 'src/node_modules/components/image-editor-react/image-editor-react.js');
  reactHotLoader.register(_default, 'default', 'src/node_modules/components/image-editor-react/image-editor-react.js');
  leaveModule(module);
})();

;