var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n'], ['\n  background: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  line-height: 35px;\n  border-bottom: 1px solid ', ';\n  background: ', ';\n'], ['\n  line-height: 35px;\n  border-bottom: 1px solid ', ';\n  background: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  text-align: center;\n  text-transform: capitalize;\n  color: ', '\n'], ['\n  text-align: center;\n  text-transform: capitalize;\n  color: ', '\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  text-align: center;\n  width: 100px;\n  padding: 5px 10px;\n'], ['\n  text-align: center;\n  width: 100px;\n  padding: 5px 10px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  height: 100px;\n  background: ', '\n'], ['\n  display: flex;\n  align-items: center;\n  height: 100px;\n  background: ', '\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  background: ', ';\n  border-color: ', ';\n  color: ', ';\n  text-transform: uppercase;\n  \n  :hover {\n    background: ', ';\n    border-color: ', ';\n    color: ', ';  \n  }\n'], ['\n  background: ', ';\n  border-color: ', ';\n  color: ', ';\n  text-transform: uppercase;\n  \n  :hover {\n    background: ', ';\n    border-color: ', ';\n    color: ', ';  \n  }\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import { Button, getHoverColor } from 'scaleflex-react-ui-kit/dist';

var HeaderWrapper = styled.div(_templateObject, function (props) {
  return props.theme.colors.primary.light;
});

var HeaderTop = styled.div(_templateObject2, function (props) {
  return props.theme.colors.dark.base;
}, function (props) {
  return props.theme.colors.dark.base;
});

var Title = styled.div(_templateObject3, function (props) {
  return props.theme.colors.text.base;
});

var LeftActions = styled.div(_templateObject4);

var RightActions = styled.div(_templateObject4);

var ToolbarWrapper = styled.div(_templateObject5, function (props) {
  return props.theme.colors.primary.light;
});

var CancelBtn = Button.extend(_templateObject6, function (props) {
  return props.theme.colors.dark.base;
}, function (props) {
  return props.theme.colors.dark.base;
}, function (props) {
  return props.theme.colors.text.base;
}, function (props) {
  return getHoverColor(props.theme.colors.dark.base);
}, function (props) {
  return props.theme.colors.dark.base;
}, function (props) {
  return props.theme.colors.text.base;
});

export { HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn };