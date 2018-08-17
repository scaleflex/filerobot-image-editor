var _templateObject = _taggedTemplateLiteral(['\n  color: ', ';\n  text-align: center;\n'], ['\n  color: ', ';\n  text-align: center;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  padding: 20px;\n'], ['\n  display: inline-block;\n  padding: 20px;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n\n'], ['\n\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  margin-top: 10px;\n  \n  button:focus,  button:active {\n    outline: none !important;\n    box-shadow: none !important;\n  }\n'], ['\n  margin-top: 10px;\n  \n  button:focus,  button:active {\n    outline: none !important;\n    box-shadow: none !important;\n  }\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  ', '\n  ', '\n  height: 14px;\n  font-size: 14px;\n  color: ', ';\n'], ['\n  ', '\n  ', '\n  height: 14px;\n  font-size: 14px;\n  color: ', ';\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import { styleUtils } from 'scaleflex-react-ui-kit/dist';

var getIconStyles = styleUtils.getIconStyles,
    getIconByName = styleUtils.getIconByName;


var OrientationWrapper = styled.div(_templateObject, function (props) {
  return props.theme.colors.text.base;
});

var RotateWrapper = styled.div(_templateObject2);

var RotateLabel = styled.div(_templateObject3);

var RotateButton = styled.div(_templateObject4);

var RotateIcon = styled.span(_templateObject5, function (props) {
  return getIconStyles(props);
}, function (props) {
  return getIconByName(props.name);
}, function (props) {
  return props.theme.colors.text.base;
});

export { OrientationWrapper, RotateWrapper, RotateButton, RotateLabel, RotateIcon };