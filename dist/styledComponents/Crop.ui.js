var _templateObject = _taggedTemplateLiteral(['\n  color: ', ';\n'], ['\n  color: ', ';\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  color: ', ';\n  height: 100px;\n  line-height: 100px;\n  padding: 0 20px 0 0;\n'], ['\n  display: inline-block;\n  color: ', ';\n  height: 100px;\n  line-height: 100px;\n  padding: 0 20px 0 0;\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: inline-block;\n  width: 100px;\n  text-align: center;\n'], ['\n  display: inline-block;\n  width: 100px;\n  text-align: center;\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n  display: inline-block;\n  margin-bottom: 5px;\n'], ['\n  display: inline-block;\n  margin-bottom: 5px;\n']),
    _templateObject5 = _taggedTemplateLiteral(['\n  display: inline-block;\n  width: ', ';\n  height: 30px;\n  padding: 6px 12px;\n  font-size: 12px;\n  line-height: 30px;\n  color: rgb(242, 242, 242);\n  background: ', ';\n  border-radius: 3px;\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px inset, rgba(82, 104, 109, 0.4) 0px 1px 0px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  vertical-align: middle;\n  border: 0px solid transparent;\n  font-family: Roboto, sans-serif;\n  \n  :hover {\n    outline: none;\n  }\n  \n  :focus {\n    border: 1px solid ', ';\n    outline: none;\n    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;\n  }\n'], ['\n  display: inline-block;\n  width: ', ';\n  height: 30px;\n  padding: 6px 12px;\n  font-size: 12px;\n  line-height: 30px;\n  color: rgb(242, 242, 242);\n  background: ', ';\n  border-radius: 3px;\n  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px inset, rgba(82, 104, 109, 0.4) 0px 1px 0px;\n  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;\n  vertical-align: middle;\n  border: 0px solid transparent;\n  font-family: Roboto, sans-serif;\n  \n  :hover {\n    outline: none;\n  }\n  \n  :focus {\n    border: 1px solid ', ';\n    outline: none;\n    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;\n  }\n']),
    _templateObject6 = _taggedTemplateLiteral(['\n  display: inline-block;\n  padding: 0 5px;\n'], ['\n  display: inline-block;\n  padding: 0 5px;\n']),
    _templateObject7 = _taggedTemplateLiteral(['\n  padding: 0;\n  \n  > span {\n    color: ', ' !important;\n   }\n'], ['\n  padding: 0;\n  \n  > span {\n    color: ', ' !important;\n   }\n']),
    _templateObject8 = _taggedTemplateLiteral(['\n  cursor: pointer;\n  position: relative;\n  font-weight: bold;\n  font-size: ', ';\n\n  ', '\n  ', '\n  \n  color: ', '\n'], ['\n  cursor: pointer;\n  position: relative;\n  font-weight: bold;\n  font-size: ', ';\n\n  ', '\n  ', '\n  \n  color: ', '\n']),
    _templateObject9 = _taggedTemplateLiteral(['\n  display: inline-block;\n  vertical-align: top;\n  text-align: center;\n  padding: 0 20px;\n  cursor: pointer;\n  background: ', '\n'], ['\n  display: inline-block;\n  vertical-align: top;\n  text-align: center;\n  padding: 0 20px;\n  cursor: pointer;\n  background: ', '\n']),
    _templateObject10 = _taggedTemplateLiteral(['\n  padding: 15px 0;\n  height: 100px;\n  line-height: 100px;\n'], ['\n  padding: 15px 0;\n  height: 100px;\n  line-height: 100px;\n']),
    _templateObject11 = _taggedTemplateLiteral(['\n  height: 50px;\n  border: 1px solid ', ';\n  width: ', 'px;\n'], ['\n  height: 50px;\n  border: 1px solid ', ';\n  width: ', 'px;\n']),
    _templateObject12 = _taggedTemplateLiteral(['\n  height: 20px;\n  line-height: 20px;\n'], ['\n  height: 20px;\n  line-height: 20px;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';
import { Button } from 'scaleflex-react-modules/dist';
import { styleUtils } from 'scaleflex-react-modules/dist';

var getIconStyles = styleUtils.getIconStyles,
    getIconByName = styleUtils.getIconByName;


var CropWrapper = styled.div(_templateObject, function (props) {
  return props.theme.textColor;
});

var CustomLabel = styled.div(_templateObject2, function (props) {
  return props.theme.textColor;
});

var FieldSet = styled.div(_templateObject3);

var FieldLabel = styled.label(_templateObject4);

var FieldInput = styled.input.attrs({
  type: function type(props) {
    return props.type ? props.type : 'text';
  }
})(_templateObject5, function (props) {
  return props.fullSize ? '100%' : props.theme.fieldWidth;
}, function (props) {
  return props.dark ? props.theme.mainBackgroundColor : props.theme.inputBackgroundColor;
}, function (props) {
  return props.theme.mainThemeColor;
});

var BlockRatioWrapper = styled.div(_templateObject6);

var BlockRatioBtn = Button.extend(_templateObject7, function (props) {
  return props.active ? props.theme.textColorHover : props.theme.textMuted;
});

var BlockRatioIcon = styled.span(_templateObject8, function (props) {
  return props.fz || '28px';
}, function (props) {
  return getIconStyles(props);
}, function (props) {
  return getIconByName(props.active ? 'ratio' : 'no-ratio');
}, function (props) {
  return props.theme.textMuted;
});

var CropBox = styled.div(_templateObject9, function (props) {
  return props.active ? props.theme.mainBackgroundColorActive : 'transparent';
});

var CropBoxInner = styled.div(_templateObject10);

var CropShape = styled.div(_templateObject11, function (props) {
  return props.theme.textColor;
}, function (props) {
  return 50 * props.ratio;
});

var CropLabel = styled.div(_templateObject12);

export { CropWrapper, CustomLabel, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon, CropBox, CropBoxInner, CropShape, CropLabel };