var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n'], ['\n  background: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  line-height: 35px;\n  border-bottom: 1px solid ', ';\n'], ['\n  line-height: 35px;\n  border-bottom: 1px solid ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  text-align: center;\n  text-transform: capitalize;\n  color: ', '\n'], ['\n  text-align: center;\n  text-transform: capitalize;\n  color: ', '\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  text-align: center;\n  width: 100px;\n  padding: 5px 10px;\n'], ['\n  text-align: center;\n  width: 100px;\n  padding: 5px 10px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  display: flex;\n  align-items: center;\n  height: 100px;\n  background: ', '\n'], ['\n  display: flex;\n  align-items: center;\n  height: 100px;\n  background: ', '\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';

var HeaderWrapper = styled.div(_templateObject, function (props) {
  return props.theme.mainBackgroundColorHover;
});

var HeaderTop = styled.div(_templateObject2, function (props) {
  return props.theme.borderDarkColor;
});

var Title = styled.div(_templateObject3, function (props) {
  return props.theme.textColor;
});

var LeftActions = styled.div(_templateObject4);

var RightActions = styled.div(_templateObject4);

var ToolbarWrapper = styled.div(_templateObject5, function (props) {
  return props.theme.mainBackgroundColorHover;
});

export { HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper };