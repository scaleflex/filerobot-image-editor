var _templateObject = _taggedTemplateLiteral(['\n  color: ', ';\n  text-align: center;\n'], ['\n  color: ', ';\n  text-align: center;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';

var AdjustWrapper = styled.div(_templateObject, function (props) {
  return props.theme.textColor;
});

export { AdjustWrapper };