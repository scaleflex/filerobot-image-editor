var _templateObject = _taggedTemplateLiteral(['\n  height: calc(100% - 170px);\n  text-align: center;\n  line-height: calc(100% - 170px);\n  padding: 20px;\n  position: relative;\n  \n  :before {\n    content: \'\';\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n  }\n'], ['\n  height: calc(100% - 170px);\n  text-align: center;\n  line-height: calc(100% - 170px);\n  padding: 20px;\n  position: relative;\n  \n  :before {\n    content: \'\';\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n  }\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n  display: inline-block;\n  max-height: 100%;\n  max-width: 100%;\n  /*width: 100%;*/\n  height: 100%;\n  vertical-align: middle;\n  \n  ', '\n  \n  /* Limit image width to avoid overflow the container */\n  img {\n    max-width: 100% !important; /* This rule is very important, please do not ignore this! */\n  }\n  \n  #scaleflex-image-edit-box {\n    display: ', ';\n    max-height: 100%;\n    max-width: 100%;\n    vertical-align: middle;\n  }\n'], ['\n  display: inline-block;\n  max-height: 100%;\n  max-width: 100%;\n  /*width: 100%;*/\n  height: 100%;\n  vertical-align: middle;\n  \n  ', '\n  \n  /* Limit image width to avoid overflow the container */\n  img {\n    max-width: 100% !important; /* This rule is very important, please do not ignore this! */\n  }\n  \n  #scaleflex-image-edit-box {\n    display: ', ';\n    max-height: 100%;\n    max-width: 100%;\n    vertical-align: middle;\n  }\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n  display: ', ';\n  max-height: 100%;\n  max-width: 100%;\n  vertical-align: middle;\n'], ['\n  display: ', ';\n  max-height: 100%;\n  max-width: 100%;\n  vertical-align: middle;\n']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

import styled from 'styled-components';

var PreviewWrapper = styled.div(_templateObject);

var PreviewImgBox = styled.div(_templateObject2, function (props) {
  return !props.hideCanvas ? '\n  :before {\n    content: \'\';\n    display: inline-block;\n    height: 100%;\n    vertical-align: middle;\n  }' : '\n  canvas {\n    position: relative;\n    left: -9999px;\n  }\n  ';
}, function (props) {
  return props.hide ? 'none' : 'inline-block';
});

var Canvas = styled.canvas.attrs({
  id: 'scaleflex-image-edit-box'
})(_templateObject3, function (props) {
  return props.hide ? 'none' : 'inline-block';
});

export { PreviewWrapper, Canvas, PreviewImgBox };