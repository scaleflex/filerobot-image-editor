var _templateObject = _taggedTemplateLiteral(['\n  background: ', ';\n  height: 34px;\n  position: relative;\n  z-index: 1;\n'], ['\n  background: ', ';\n  height: 34px;\n  position: relative;\n  z-index: 1;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  ', '\n  ', '\n  \n  ', '\n'], ['\n  ', '\n  ', '\n  \n  ', '\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import { styleUtils } from 'scaleflex-react-modules/dist';

var getIconStyles = styleUtils.getIconStyles,
    getIconByName = styleUtils.getIconByName;


var Footer = styled.div(_templateObject, function (props) {
  return props.theme.mainBackgroundColorHover;
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

function getActionIconStyle(props) {
  return '\n    display: inline-block;\n    height: 34px;\n    width: 34px;\n    cursor: ' + (props.muted ? 'not-allowed' : 'pointer') + ';\n    text-align: center;\n    line-height: 34px;\n    border-right: 1px solid ' + props.theme.borderDarkColor + ';\n    \n    :hover {\n      background: ' + (props.muted ? 'inherit' : props.theme.mainBackgroundColorActive) + ';\n    }\n  ';
}

export { Footer, PreviousBtn, NextBtn };