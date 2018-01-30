var _templateObject = _taggedTemplateLiteral(['\n  color: ', ';\n  text-align: center;\n'], ['\n  color: ', ';\n  text-align: center;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  width: 300px;\n  padding: 20px;\n  height: 100px;\n'], ['\n  display: inline-block;\n  width: 300px;\n  padding: 20px;\n  height: 100px;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';

var ResizeWrapper = styled.div(_templateObject, function (props) {
  return props.theme.textColor;
});

var ResizeBox = styled.div(_templateObject2);

export { ResizeWrapper, ResizeBox };