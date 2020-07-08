"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _styledComponents2 = require("../../styledComponents");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _templateObject6() {
  var data = _taggedTemplateLiteral(["\n  background: ", ";\n  width: 14px;\n  height: 14px;\n  display: inline-block;\n  vertical-align: middle;\n  margin-right: 3px;\n  background-size: cover;\n"]);

  _templateObject6 = function _templateObject6() {
    return data;
  };

  return data;
}

function _templateObject5() {
  var data = _taggedTemplateLiteral(["\n  display: inline-block;\n  vertical-align: middle;\n"]);

  _templateObject5 = function _templateObject5() {
    return data;
  };

  return data;
}

function _templateObject4() {
  var data = _taggedTemplateLiteral(["\n  cursor: pointer;\n  ", "\n  \n  :hover {\n    background: ", ";\n  }\n"]);

  _templateObject4 = function _templateObject4() {
    return data;
  };

  return data;
}

function _templateObject3() {
  var data = _taggedTemplateLiteral(["\n  display: ", ";\n  list-style-type: none;\n  margin: 2px 0 0 0;\n  padding: 0;\n  position: absolute;\n  background: #fff;\n  width: 100%;\n  border: none;\n  color: ", ";\n  background: ", ";\n  box-shadow: inset 0 1px 1px rgba(0,0,0,0.5), 0 1px 0 rgba(82,104,109,.6);\n  border-radius: .25rem;\n  overflow: hidden;\n  overflow-y: auto;\n  max-height: ", ";\n  z-index: 101000000000000;\n"]);

  _templateObject3 = function _templateObject3() {
    return data;
  };

  return data;
}

function _templateObject2() {
  var data = _taggedTemplateLiteral(["\n  width: 100%;\n  padding: 9px 12px;\n  cursor: pointer;\n  \n  :hover {\n    opacity: ", ";\n  }\n  \n  :after {\n    content: '';\n    position: absolute;\n    top: 50%;\n    margin-top: -2.5px;\n    right: 5px;\n    width: 0; \n    height: 0; \n    border-left: 5px solid transparent;\n    border-right: 5px solid transparent;\n    \n    border-top: 5px solid #fff;\n  }\n"]);

  _templateObject2 = function _templateObject2() {
    return data;
  };

  return data;
}

function _templateObject() {
  var data = _taggedTemplateLiteral(["\n  position: relative;\n  display: ", ";\n  width: ", ";\n  text-align: ", ";\n"]);

  _templateObject = function _templateObject() {
    return data;
  };

  return data;
}

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Select = /*#__PURE__*/function (_Component) {
  _inherits(Select, _Component);

  var _super = _createSuper(Select);

  function Select() {
    var _this;

    _classCallCheck(this, Select);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "state", {
      isOpened: false
    });

    _defineProperty(_assertThisInitialized(_this), "getValue", function (value) {
      var _this$props = _this.props,
          list = _this$props.list,
          _this$props$placehold = _this$props.placeholder,
          placeholder = _this$props$placehold === void 0 ? 'select' : _this$props$placehold,
          _this$props$valueProp = _this$props.valueProp,
          valueProp = _this$props$valueProp === void 0 ? "id" : _this$props$valueProp,
          _this$props$labelProp = _this$props.labelProp,
          labelProp = _this$props$labelProp === void 0 ? "label" : _this$props$labelProp,
          renderLabel = _this$props.renderLabel,
          processValue = _this$props.processValue;
      var label;
      var item = list.find(function (item) {
        return item[valueProp] === value;
      });
      label = processValue ? processValue(item, value, list, valueProp, labelProp) : item && (item[labelProp] && renderLabel ? renderLabel(item[labelProp]) : item[labelProp]);
      return label ? label : "".concat(placeholder);
    });

    _defineProperty(_assertThisInitialized(_this), "toggleMenu", function () {
      var nexVal = !_this.state.isOpened;

      if (nexVal) {
        _this.onOutsideClick = function () {
          var _this2;

          return (_this2 = _this).__onOutsideClick__REACT_HOT_LOADER__.apply(_this2, arguments);
        };

        document.addEventListener('keyup', _this.onOutsideClick);
        document.addEventListener('mouseup', _this.handleOutsideMouseClick);
        document.addEventListener('touchstart', _this.handleOutsideMouseClick);
      } else {
        document.removeEventListener('keyup', _this.onOutsideClick);
        document.removeEventListener('mouseup', _this.handleOutsideMouseClick);
        document.removeEventListener('touchstart', _this.handleOutsideMouseClick);
      }

      _this.setState({
        isOpened: nexVal
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleOutsideMouseClick", function (event) {
      var target = event.target;
      if (!_this.dropdown) return;else if (_this.selectedItem && _this.selectedItem.contains(target)) return;

      if (_this.dropdown.contains(target)) {
        event.stopPropagation();
        return;
      }

      _this.setState({
        isOpened: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onItemClick", function (event, id) {
      var _this$props2 = _this.props,
          onChange = _this$props2.onChange,
          onBlur = _this$props2.onBlur;
      onChange(id, event);
      if (onBlur) onBlur(id);

      _this.setState({
        isOpened: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "filterList", function (list) {
      var _this$props3 = _this.props,
          exclude = _this$props3.exclude,
          _this$props3$valuePro = _this$props3.valueProp,
          valueProp = _this$props3$valuePro === void 0 ? 'id' : _this$props3$valuePro;
      if (exclude && exclude.length) return list.filter(function (item) {
        return !exclude.includes(item[valueProp]);
      });
      return list;
    });

    return _this;
  }

  _createClass(Select, [{
    key: "__onOutsideClick__REACT_HOT_LOADER__",
    value: function __onOutsideClick__REACT_HOT_LOADER__(e) {
      if (e.keyCode === 27) this.toggleMenu();
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener('keyup', this.onOutsideClick);
      document.removeEventListener('mouseup', this.onOutsideClick);
      document.removeEventListener('touchstart', this.onOutsideClick);
      document.removeEventListener('mouseup', this.handleOutsideMouseClick);
      document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var isOpened = this.state.isOpened;
      var _this$props4 = this.props,
          value = _this$props4.value,
          list = _this$props4.list,
          _this$props4$valuePro = _this$props4.valueProp,
          valueProp = _this$props4$valuePro === void 0 ? 'id' : _this$props4$valuePro,
          _this$props4$labelPro = _this$props4.labelProp,
          labelProp = _this$props4$labelPro === void 0 ? 'label' : _this$props4$labelPro,
          renderLabel = _this$props4.renderLabel,
          _this$props4$width = _this$props4.width,
          width = _this$props4$width === void 0 ? '' : _this$props4$width,
          _this$props4$styles = _this$props4.styles,
          styles = _this$props4$styles === void 0 ? {} : _this$props4$styles,
          display = _this$props4.display,
          style = _this$props4.style,
          _this$props4$labelDes = _this$props4.labelDescription,
          labelDescription = _this$props4$labelDes === void 0 ? '' : _this$props4$labelDes,
          size = _this$props4.size,
          _this$props4$small = _this$props4.small,
          small = _this$props4$small === void 0 ? false : _this$props4$small;

      var getLabel = function getLabel(item) {
        return item[labelProp] && renderLabel ? renderLabel(item[labelProp]) : item[labelProp];
      };

      return /*#__PURE__*/_react.default.createElement(SelectWrapper, {
        width: width,
        display: display,
        styles: styles,
        style: style
      }, /*#__PURE__*/_react.default.createElement(SelectedItem, {
        as: "div",
        small: small,
        size: size,
        styles: styles,
        focused: isOpened,
        notSelected: !value,
        onClick: this.toggleMenu,
        ref: function ref(node) {
          _this3.selectedItem = node;
        }
      }, this.getValue(value), " ", labelDescription ? "(".concat(labelDescription, ")") : ''), /*#__PURE__*/_react.default.createElement(SelectDropdown, {
        size: size,
        show: isOpened && this.filterList(list).length,
        ref: function ref(node) {
          _this3.dropdown = node;
        }
      }, this.filterList(list).map(function (item) {
        return /*#__PURE__*/_react.default.createElement(SelectDropdownItem, {
          size: size,
          key: item[valueProp],
          onClick: function onClick(event) {
            _this3.onItemClick(event, item[valueProp]);
          }
        }, item.color && /*#__PURE__*/_react.default.createElement(ItemIcon, {
          color: item.color
        }), /*#__PURE__*/_react.default.createElement(ItemName, null, getLabel(item)));
      })));
    }
  }]);

  return Select;
}(_react.Component);

var SelectWrapper = _styledComponents.default.div(_templateObject(), function (p) {
  return p.display ? p.display : p.width ? 'inline-block' : 'block';
}, function (p) {
  return p.width || 'auto';
}, function (p) {
  return p.styles.textAlign ? p.styles.textAlign : 'left';
});

var SelectedItem = (0, _styledComponents.default)(_styledComponents2.FileInput).attrs()(_templateObject2(), function (p) {
  return p.styles.opacity && 1;
});

var SelectDropdown = _styledComponents.default.ul(_templateObject3(), function (p) {
  return p.show ? "block" : "none";
}, function (p) {
  return p.theme.colors.text;
}, function (p) {
  return p.theme.colors.primaryBg;
}, function (p) {
  return p.size === 'sm' ? '250px' : '200px';
});

var SelectDropdownItem = _styledComponents.default.li(_templateObject4(), function (p) {
  return getItemStyles(p.size);
}, function (p) {
  return p.theme.colors.primaryBg;
});

var getItemStyles = function getItemStyles(size) {
  switch (size) {
    case 'sm':
      return 'padding: .2rem .6rem; font-size: 12px;';

    case 'md':
      return 'padding: .3rem .7rem; font-size: 12px;';

    default:
      return 'padding: .375rem .75rem; font-size: 14px;';
  }
};

var ItemName = _styledComponents.default.span(_templateObject5());

var ItemIcon = _styledComponents.default.span(_templateObject6(), function (p) {
  return p.color ? p.color : 'transparent';
});

var _default = Select;
var _default2 = _default;
exports.default = _default2;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Select, "Select", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(SelectWrapper, "SelectWrapper", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(SelectedItem, "SelectedItem", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(SelectDropdown, "SelectDropdown", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(SelectDropdownItem, "SelectDropdownItem", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(getItemStyles, "getItemStyles", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(ItemName, "ItemName", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(ItemIcon, "ItemIcon", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");

  __REACT_HOT_LOADER__.register(_default, "default", "/home/patrik/projects/filerobot-image-editor/projects/react/components/Shared/Select.js");
}();

;