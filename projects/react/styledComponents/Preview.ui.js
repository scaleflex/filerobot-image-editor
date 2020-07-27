import React from 'react';
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

const PreResizeBox = styled('div')`
  display: inline-block;
  vertical-align: middle;
  width: 100%;
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

   ${p => p.isShowWatermark && `
canvas:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: red;
    opacity: 0.5;
  }`}
`;

const Watermark = styled('div')`
  width: ${p => p.width || 0}px;
  height: ${p => p.height || 0}px;
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
  position: absolute;
  background-image: url('${p => p.url ? p.url : 'none'}');
  background-position: ${p => `${p.wx}px ${p.wy}px`};
  background-repeat: no-repeat;
  background-size: ${p => `${p.ww}px ${p.wh}px`};
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  opacity:${p => p.opacity || 0};
`;

const FocusPointWrap = styled(
  React.forwardRef(({ width, height, ...rest }, ref) => <div className="focus-point" {...rest} ref={ref} />)
)(({ width, height }) => ({
  width,
  height,
  position: 'absolute',
  margin: 'auto',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  display: 'inline-block',
  maxHeight: '100%',
  maxWidth: '100%',
  verticalAlign: 'middle',
}));

const FocusPointContainer = styled(({ image, ...rest }) => <div {...rest} />)(({ image }) => ({
  position: 'relative',
  height: '100%',
  width: '100%',
  cursor: 'crosshair',
  ...(image ? {
    backgroundImage: `url(${image})`,
    backgroundSize: 'contain',
  } : {}),
}));

const FocusPoint = styled(
  ({ x, y, visible, ...rest }) => <span {...rest} />
)(({ x = 0, y = 0, visible = true }) => ({
  position: 'absolute',
  top: y,
  left: x,
  visibility: visible ? 'visible' : 'hidden',
  display: 'inline-block',
  width: 30,
  height: 30,
  transform: 'translate(-50%, -50%)',
  fontFamily: 'filerobot-image-editor-font !important',
  color: '#fff',
  fontSize: 30,

  '::before': {
    content: "'\\e919'",
    position: 'absolute',
    top: '50%',
    left: 0,
    textShadow: '0px 0px 3px #000000'
  },
}));

const FocusPointImg = styled(({visible, ...rest}) => <img {...rest} />)(({visible}) => ({
  visibility: visible ? 'visible' : 'hidden',
  maxWidth: '100%',
  maxHeight: '100%'
}))

//watermarkURL
//isShowWatermark
const Canvas = styled.canvas.attrs(() => ({}))`
  display: ${props => props.hide ? 'none' : 'inline-block'};
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
`;

export {
  PreviewWrapper, Canvas, PreviewImgBox, PreResizeBox, Watermark, FocusPoint, FocusPointContainer,
  FocusPointWrap, FocusPointImg
}