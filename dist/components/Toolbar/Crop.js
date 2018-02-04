var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import '../../config';
import { CropWrapper, CustomLabel, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon, CropBox, CropBoxInner, CropShape, CropLabel } from '../../styledComponents';

var BOXES = [{ name: 'original', value: 0 }, { name: 'square', value: 1 }, { name: '5 : 4', value: 1.25 }, { name: '4 : 3', value: 1.33333 }, { name: '6 : 4', value: 1.5 }];

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
      aspectRatio: NaN,
      activeRatio: 'custom'
    }, _this.changeWidth = function (event) {
      var _this$props = _this.props,
          cropDetails = _this$props.cropDetails,
          original = _this$props.original;

      var container = document.querySelector('#preview-img-box');
      var rect = container.getBoundingClientRect();
      var width = original.width === rect.width ? +event.target.value : rect.width / original.width * +event.target.value;

      window.scaleflexPlugins.cropperjs.setCropBoxData(_extends({}, cropDetails, { width: width }));
    }, _this.changeHeight = function (event) {
      var _this$props2 = _this.props,
          cropDetails = _this$props2.cropDetails,
          original = _this$props2.original;

      var container = document.querySelector('#preview-img-box');
      var rect = container.getBoundingClientRect();
      var height = original.height === rect.height ? +event.target.value : rect.height / original.height * +event.target.value;

      window.scaleflexPlugins.cropperjs.setCropBoxData(_extends({}, cropDetails, { height: height }));
    }, _this.toggleRatio = function (event) {
      event.preventDefault();
      event.stopPropagation();
      var cropDetails = _this.props.cropDetails;
      var width = cropDetails.width,
          height = cropDetails.height;

      var aspectRatio = _this.state.aspectRatio;
      aspectRatio = aspectRatio ? NaN : width / height;

      window.scaleflexPlugins.cropperjs.setAspectRatio(aspectRatio);
      _this.setState({ aspectRatio: aspectRatio });
    }, _this.changeRatio = function (box) {
      var aspectRatio = _this.state.aspectRatio;
      var _this$props$original = _this.props.original,
          _this$props$original$ = _this$props$original.width,
          width = _this$props$original$ === undefined ? 1 : _this$props$original$,
          _this$props$original$2 = _this$props$original.height,
          height = _this$props$original$2 === undefined ? 1 : _this$props$original$2;

      var value = void 0;

      if (box.name === 'custom' && !aspectRatio) {
        _this.setState({ activeRatio: box.name });
        return;
      }

      value = box.name === 'original' ? width / height : box.value;
      window.scaleflexPlugins.cropperjs.setAspectRatio(value);
      _this.setState({ activeRatio: box.name, aspectRatio: value });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(_class, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          aspectRatio = _state.aspectRatio,
          activeRatio = _state.activeRatio;
      var _props = this.props,
          cropDetails = _props.cropDetails,
          original = _props.original;


      return React.createElement(
        CropWrapper,
        null,
        React.createElement(
          CropBox,
          {
            active: activeRatio === 'custom',
            onClick: this.changeRatio.bind(this, { name: 'custom' })
          },
          React.createElement(
            FieldSet,
            null,
            React.createElement(
              FieldLabel,
              null,
              'width'
            ),
            React.createElement(FieldInput, {
              dark: activeRatio === 'custom',
              fullSize: true,
              value: parseInt(cropDetails.width, 10),
              onChange: this.changeWidth
            })
          ),
          React.createElement(
            BlockRatioWrapper,
            null,
            React.createElement(
              BlockRatioBtn,
              { active: aspectRatio, link: true, onClick: this.toggleRatio },
              React.createElement(BlockRatioIcon, { active: aspectRatio })
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
              dark: activeRatio === 'custom',
              fullSize: true,
              value: parseInt(cropDetails.height, 10),
              onChange: this.changeHeight
            })
          ),
          React.createElement(
            CustomLabel,
            null,
            'Custom'
          )
        ),
        BOXES.map(function (box) {
          return React.createElement(
            CropBox,
            { active: activeRatio === box.name, onClick: _this2.changeRatio.bind(_this2, box), key: box.name },
            React.createElement(
              CropBoxInner,
              null,
              React.createElement(CropShape, { ratio: box.value || original.width / original.height }),
              React.createElement(
                CropLabel,
                null,
                box.name
              )
            )
          );
        })
      );
    }
  }]);

  return _class;
}(Component);

export default _class;