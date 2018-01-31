var _templateObject = _taggedTemplateLiteral(['\n  height: 100px;\n  width: calc(100% - 200px);\n  border-left: 1px solid ', ';\n  border-right: 1px solid ', ';\n'], ['\n  height: 100px;\n  width: calc(100% - 200px);\n  border-left: 1px solid ', ';\n  border-right: 1px solid ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  padding: 20px 10px;\n  cursor: pointer;\n  display: inline-block;\n  min-width: 80px;\n  min-height: 100px;\n  text-align: center;\n  font-size: 12px;\n  color: ', ';\n  text-transform: ', ';\n  background: ', ';\n  \n  :hover {\n    color: ', ';\n    background: ', ';\n  }\n'], ['\n  padding: 20px 10px;\n  cursor: pointer;\n  display: inline-block;\n  min-width: 80px;\n  min-height: 100px;\n  text-align: center;\n  font-size: 12px;\n  color: ', ';\n  text-transform: ', ';\n  background: ', ';\n  \n  :hover {\n    color: ', ';\n    background: ', ';\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  height: 40px;\n  font-size: 40px;\n  \n  ', '\n  ', '\n'], ['\n  height: 40px;\n  font-size: 40px;\n  \n  ', '\n  ', '\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  height: 20px;\n  line-height: 20px;\n'], ['\n  height: 20px;\n  line-height: 20px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n\n'], ['\n\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  display: inline-block;\n  padding: 10px;\n  text-align: center;\n  min-width: 100px;\n  height: 100px;\n  cursor: pointer;\n  color: ', ';\n  font-size: 12px;\n  \n  :hover {\n    background: ', ';\n  }\n'], ['\n  display: inline-block;\n  padding: 10px;\n  text-align: center;\n  min-width: 100px;\n  height: 100px;\n  cursor: pointer;\n  color: ', ';\n  font-size: 12px;\n  \n  :hover {\n    background: ', ';\n  }\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  background: url(\'', '\') 50% 50% / cover no-repeat;\n  width: 60px;\n  height: 60px;\n  border-radius: 2px;\n  overflow: hidden;\n  display: inline-block;\n'], ['\n  background: url(\'', '\') 50% 50% / cover no-repeat;\n  width: 60px;\n  height: 60px;\n  border-radius: 2px;\n  overflow: hidden;\n  display: inline-block;\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  text-transform: capitalize;\n  height: 20px;\n  line-height: 20px;\n'], ['\n  text-transform: capitalize;\n  height: 20px;\n  line-height: 20px;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import { styleUtils } from 'scaleflex-react-modules/dist';

var getIconStyles = styleUtils.getIconStyles,
    getIconByName = styleUtils.getIconByName;


var Toolbar = styled.div(_templateObject, function (props) {
  return props.theme.borderDarkColor;
}, function (props) {
  return props.theme.borderDarkColor;
});

var ToolWrapper = styled.div(_templateObject2, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.tt || 'capitalize';
}, function (props) {
  return props.active ? props.theme.mainBackgroundColorActive : 'inherit';
}, function (props) {
  return props.theme.textColorHover;
}, function (props) {
  return props.theme.mainBackgroundColorActive;
});

var ToolIcon = styled.div(_templateObject3, function (props) {
  return getIconStyles(props);
}, function (props) {
  return getIconByName(props.name);
});

var ToolLabel = styled.div(_templateObject4);

var EffectsWrapper = styled.div(_templateObject5);

var EffectWrapper = styled.div(_templateObject6, function (props) {
  return props.theme.textColor;
}, function (props) {
  return props.theme.mainBackgroundColorActive;
});

var EffectIcon = styled.div(_templateObject7, function (props) {
  return props.src;
});

var EffectLabel = styled.div(_templateObject8);

export { Toolbar, ToolWrapper, ToolIcon, ToolLabel, EffectsWrapper, EffectWrapper, EffectIcon, EffectLabel };