import styled from 'styled-components';


const PreviewWrapper = styled.div`
  height: calc(100% - 170px);
  text-align: center;
  line-height: calc(100% - 170px);
  padding: 20px;
  position: relative;
  
  :before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`;

const PreviewImgBox = styled.div`
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
  /*width: 100%;*/
  height: 100%;
  vertical-align: middle;
  
  ${props => !props.hideCanvas ? `
  :before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }` : `
  canvas {
    position: relative;
    left: -9999px;
  }
  `}
  
  /* Limit image width to avoid overflow the container */
  img {
    max-width: 100% !important; /* This rule is very important, please do not ignore this! */
  }
  
  #scaleflex-image-edit-box {
    display: ${props => props.hide ? 'none' : 'inline-block'};
    max-height: 100%;
    max-width: 100%;
    vertical-align: middle;
  }
`;

const Canvas = styled.canvas.attrs(() => ({
  id: 'scaleflex-image-edit-box'
}))`
  display: ${props => props.hide ? 'none' : 'inline-block'};
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
`;

export { PreviewWrapper, Canvas, PreviewImgBox }