var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n  height: 34px;\n  position: relative;\n  z-index: 1;\n'], ['\n  background: ', ';\n  height: 34px;\n  position: relative;\n  z-index: 1;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  ', '\n  ', '\n  \n  ', '\n'], ['\n  ', '\n  ', '\n  \n  ', '\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  position: relative; \n  display: inline-block;\n  vertical-align: middle;\n  width: 60px;\n  margin-bottom: 2px;\n  -webkit-user-select: none; \n  -moz-user-select: none; \n  -ms-user-select: none;\n'], ['\n  position: relative; \n  display: inline-block;\n  vertical-align: middle;\n  width: 60px;\n  margin-bottom: 2px;\n  -webkit-user-select: none; \n  -moz-user-select: none; \n  -ms-user-select: none;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: none;\n  \n  :checked + .onoffswitch-label .onoffswitch-inner {\n    margin-left: 0;\n}\n'], ['\n  display: none;\n  \n  :checked + .onoffswitch-label .onoffswitch-inner {\n    margin-left: 0;\n}\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  display: block; \n  overflow: hidden; \n  cursor: pointer;\n  border: 2px solid #36464d; \n  border-radius: 12px;\n  margin: 0;\n'], ['\n  display: block; \n  overflow: hidden; \n  cursor: pointer;\n  border: 2px solid #36464d; \n  border-radius: 12px;\n  margin: 0;\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  display: block; \n  width: 200%; \n  margin-left: ', ';\n  transition: margin 0.3s ease-in 0s;\n  \n  &:before, &:after {\n    display: block; float: left; width: 50%; height: 19px; padding: 0; line-height: 19px;\n    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;\n    box-sizing: border-box;\n  }\n  \n  &:before {\n    content: "ON";\n    padding-left: 10px;\n    background-color: #01717d; \n    color: #FFFFFF;\n  }\n  \n  &:after {\n    content: "OFF";\n    padding-right: 10px;\n    background-color: #1e262c; \n    color: #aaaaaa;\n    text-align: right;\n  }\n'], ['\n  display: block; \n  width: 200%; \n  margin-left: ', ';\n  transition: margin 0.3s ease-in 0s;\n  \n  &:before, &:after {\n    display: block; float: left; width: 50%; height: 19px; padding: 0; line-height: 19px;\n    font-size: 10px; color: white; font-family: Trebuchet, Arial, sans-serif; font-weight: bold;\n    box-sizing: border-box;\n  }\n  \n  &:before {\n    content: "ON";\n    padding-left: 10px;\n    background-color: #01717d; \n    color: #FFFFFF;\n  }\n  \n  &:after {\n    content: "OFF";\n    padding-right: 10px;\n    background-color: #1e262c; \n    color: #aaaaaa;\n    text-align: right;\n  }\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n    display: block; \n    width: 10px;\n    height: 10px;\n    margin: 5.5px;\n    background: ', ';\n    position: absolute; top: 0; bottom: 0;\n    right:  ', ';\n    border: 2px solid #36464d; \n    border-radius: 12px;\n    transition: all 0.3s ease-in 0s;\n'], ['\n    display: block; \n    width: 10px;\n    height: 10px;\n    margin: 5.5px;\n    background: ', ';\n    position: absolute; top: 0; bottom: 0;\n    right:  ', ';\n    border: 2px solid #36464d; \n    border-radius: 12px;\n    transition: all 0.3s ease-in 0s;\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: calc(100% - 280px);\n'], ['\n  display: inline-block;\n  vertical-align: middle;\n  margin-left: calc(100% - 280px);\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  margin-left: 8px;\n  display: inline-block;\n  vertical-align: middle;\n  color: #aaaaaa;\n  margin-bottom: 3px;\n  cursor: pointer;\n  cursor: pointer;\n'], ['\n  margin-left: 8px;\n  display: inline-block;\n  vertical-align: middle;\n  color: #aaaaaa;\n  margin-bottom: 3px;\n  cursor: pointer;\n  cursor: pointer;\n']);

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import React from 'react';
import styled from 'styled-components';
import { styleUtils } from 'scaleflex-react-ui-kit/dist';

var getIconStyles = styleUtils.getIconStyles,
    getIconByName = styleUtils.getIconByName;


var Footer = styled.div(_templateObject, function (props) {
  return props.theme.colors.primary.light;
});

var PreviousBtn = styled.div(_templateObject2, function (props) {
  return getIconStyles(props);
}, getIconByName('previous'), function (props) {
  return getActionIconStyle(props);
});

var NextBtn = styled.div(_templateObject2, function (props) {
  return getIconStyles(props);
}, getIconByName('next'), function (props) {
  return getActionIconStyle(props);
});

var SwitcherWrapper = styled.div(_templateObject3);

var SwitcherInput = styled.input(_templateObject4);

var SwitcherLabel = styled.label(_templateObject5);

var SwitcherInner = styled.span(_templateObject6, function (props) {
  return props.checked ? '0' : '-100%';
});

var SwitcherSwitch = styled.span(_templateObject7, function (props) {
  return props.checked ? '#36464d' : '#36464d';
}, function (props) {
  return props.checked ? '0' : '37px';
});

var SwitcherBlock = styled.div(_templateObject8);

var SwitcherText = styled.div(_templateObject9);

var Switcher = function Switcher(_ref) {
  var id = _ref.id,
      handleChange = _ref.handleChange,
      text = _ref.text,
      checked = _ref.checked,
      otherProps = _objectWithoutProperties(_ref, ['id', 'handleChange', 'text', 'checked']);

  return React.createElement(
    SwitcherBlock,
    null,
    React.createElement(
      SwitcherWrapper,
      null,
      React.createElement(SwitcherInput, {
        type: 'checkbox',
        name: id,
        id: id,
        onChange: function onChange() {
          handleChange(!checked);
        },
        checked: checked
      }),
      React.createElement(
        SwitcherLabel,
        { htmlFor: id },
        React.createElement(SwitcherInner, { checked: checked }),
        React.createElement(SwitcherSwitch, { checked: checked })
      )
    ),
    text && React.createElement(
      SwitcherText,
      { onClick: function onClick() {
          handleChange(!checked);
        } },
      text
    )
  );
};

function getActionIconStyle(props) {
  return '\n    display: inline-block;\n    height: 34px;\n    width: 34px;\n    cursor: ' + (props.muted ? 'not-allowed' : 'pointer') + ';\n    text-align: center;\n    line-height: 34px;\n    border-right: 1px solid ' + props.theme.borderDarkColor + ';\n    \n    :hover {\n      background: ' + (props.muted ? 'inherit' : props.theme.colors.primary.lighter) + ';\n    }\n  ';
}

export { Footer, PreviousBtn, NextBtn, Switcher };