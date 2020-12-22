import styled from 'styled-components';

const Container = styled('div')`
  height: 100%;
  width: 100%;
  overflow-y: auto;
  
  ::-webkit-scrollbar {
    height: 10px !important;
    width: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.border || '#3b4d54'};
    border-radius: 5px;
  }

  *, *:after, *:before, *::after, *::before {
    box-sizing: border-box;
  }
  *:after, *:before, *::after, *::before {
    padding: 0;
    margin: 0;
    outline: 0;
    box-sizing: border-box;
  }

  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY_ZraR2Tg8w2lzm7kLNL0-w.woff2) format('woff2');
    unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY14sYYdJg5dU2qzJEVSuta0.woff2) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY1BW26QxpSj-_ZKm_xT4hWw.woff2) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpYwt_Rm691LTebKfY2ZkKSmI.woff2) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY9DiNsR5a-9Oe_Ivpu8XWlY.woff2) format('woff2');
    unicode-range: U+0102-0103, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY6E8kM4xWR1_1bYURRojRGc.woff2) format('woff2');
    unicode-range: U+0100-024F, U+1E00-1EFF, U+20A0-20AB, U+20AD-20CF, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Roboto Mono';
    font-style: normal;
    font-weight: 400;
    src: local('Roboto Mono'), local('RobotoMono-Regular'), url(https://fonts.gstatic.com/s/robotomono/v5/hMqPNLsu_dywMa4C_DEpY4gp9Q8gbYrhqGlRav_IXfk.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2212, U+2215;
  }
`;

const Wrapper = styled.div`
  position: relative;
  background: ${props => props.theme.colors.primaryBg};
  z-index: 1050;
  width: 100%;
  height: 100%;
  min-height: 520px;
  overflow: ${p => p.isLoading ? 'hidden' : 'auto'};
  font-size: 12px;
  
  .filerobot-original-canvas {
    visibility: hidden;
    position: absolute;
    left: -99999px;
    display: none;
  }
    
  .cropper-container {
    direction: ltr;
    font-size: 0;
    line-height: 0;
    position: relative;
    -ms-touch-action: none;
    touch-action: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  
  .cropper-container img {/*Avoid margin top issue (Occur only when margin-top <= -height)*/
    display: block;
    height: 100%;
    image-orientation: 0deg;
    max-height: none !important;
    max-width: none !important;
    min-height: 0 !important;
    min-width: 0 !important;
    width: 100%;
  }
  
  .cropper-wrap-box,
  .cropper-canvas,
  .cropper-drag-box,
  .cropper-crop-box,
  .cropper-modal {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }
  
  .cropper-wrap-box,
  .cropper-canvas {
    overflow: hidden;
  }
  
  .cropper-drag-box {
    background-color: #fff;
    opacity: 0;
  }
  
  .cropper-modal {
    background-color: #000;
    opacity: .5;
  }
  
  .cropper-view-box {
    display: block;
    height: 100%;
    outline-color: rgba(255, 255, 255, 0.75);
    outline: 1px solid #fff;
    overflow: hidden;
    width: 100%;
    ${({ roundCrop}) => roundCrop && 'border-radius: 50%'};
  }
  
  .cropper-dashed {
    border: 0 dashed #eee;
    display: block;
    opacity: .5;
    position: absolute;
  }
  
  .cropper-dashed.dashed-h {
    border-bottom-width: 1px;
    border-top-width: 1px;
    height: 33.33333%;
    left: 0;
    top: 33.33333%;
    width: 100%;
  }
  
  .cropper-dashed.dashed-v {
    border-left-width: 1px;
    border-right-width: 1px;
    height: 100%;
    left: 33.33333%;
    top: 0;
    width: 33.33333%;
  }
  
  .cropper-center {
    display: block;
    height: 0;
    left: 50%;
    opacity: .75;
    position: absolute;
    top: 50%;
    width: 0;
  }
  
  .cropper-center:before,
  .cropper-center:after {
    background-color: #fff;
    content: ' ';
    display: block;
    position: absolute;
  }
  
  .cropper-center:before {
    height: 1px;
    left: -10px;
    top: 0;
    width: 20px;
  }
  
  .cropper-center:after {
    height: 20px;
    left: 0;
    top: -10px;
    width: 1px;
  }
  
  .cropper-face,
  .cropper-line,
  .cropper-point {
    display: block;
    height: 100%;
    opacity: .1;
    position: absolute;
    width: 100%;
  }
  
  .cropper-face {
    background-color: #fff;
    left: 0;
    top: 0;
    ${({ roundCrop }) => roundCrop && `
      border-radius: 50%;
      box-shadow: 0 0 80px 15px #000;
      border: 2px solid #000;`};
  }
  
  .cropper-line {
    background-color: #fff;
  }
  
  .cropper-line.line-e {
    cursor: ew-resize;
    right: -3px;
    top: 0;
    width: 5px;
  }
  
  .cropper-line.line-n {
    cursor: ns-resize;
    height: 5px;
    left: 0;
    top: -3px;
  }
  
  .cropper-line.line-w {
    cursor: ew-resize;
    left: -3px;
    top: 0;
    width: 5px;
  }
  
  .cropper-line.line-s {
    bottom: -3px;
    cursor: ns-resize;
    height: 5px;
    left: 0;
  }
  
  .cropper-point {
    background-color: #fff;
    height: 20px;
    opacity: .90;
    width: 20px;
    border-radius: 50%;
    
    &:before {
      content: '';
      display: table;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: black;
      opacity: 0.8;
      z-index: 11;
      position: absolute;
      top: calc(50% - 4px);
      left: calc(50% - 4px);
    }
  }
  
  .cropper-point.point-e {
    cursor: ew-resize;
    margin-top: -10px;
    right: -10px;
    top: 50%;
  }
  
  .cropper-point.point-n {
    cursor: ns-resize;
    left: 50%;
    margin-left: -10px;
    top: -10px;
  }
  
  .cropper-point.point-w {
    cursor: ew-resize;
    left: -10px;
    margin-top: -10px;
    top: 50%;
  }
  
  .cropper-point.point-s {
    bottom: -10px;
    cursor: s-resize;
    left: 50%;
    margin-left: -10px;
  }
  
  .cropper-point.point-ne {
    cursor: nesw-resize;
    right: -10px;
    top: -10px;
  }
  
  .cropper-point.point-nw {
    cursor: nwse-resize;
    left: -10px;
    top: -10px;
  }
  
  .cropper-point.point-sw {
    bottom: -10px;
    cursor: nesw-resize;
    left: -10px;
  }
  
  .cropper-point.point-se {
    bottom: -10px;
    cursor: nwse-resize;
    height: 20px;
    right: -10px;
    width: 20px;
  }
  
  .cropper-point.point-se:before {
    content: '';
    display: table;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: black;
    opacity: 0.8;
    z-index: 11;
    position: absolute;
    top: calc(50% - 4px);
    left: calc(50% - 4px);
  }
  
  .cropper-invisible {
    opacity: 0;
  }
  
  .cropper-bg {
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC');
  }
  
  .cropper-hide {
    display: block;
    height: 0;
    position: absolute;
    width: 0;
  }
  
  .cropper-hidden {
    display: none !important;
  }
  
  .cropper-move {
    cursor: move;
  }
  
  .cropper-crop {
    cursor: crosshair;
  }
  
  .cropper-disabled .cropper-drag-box,
  .cropper-disabled .cropper-face,
  .cropper-disabled .cropper-line,
  .cropper-disabled .cropper-point {
    cursor: not-allowed;
  }
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export { Wrapper, Container };
