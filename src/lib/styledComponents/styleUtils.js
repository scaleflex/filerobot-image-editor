function getModalWidth(props) {
  const { exact, xl, lg, md, sm, xs, fluid } = props;
  const size = exact ? 'exact' : xl ? 'xl' : lg ? 'lg' : md ? 'md' : sm ? 'sm' : xs ? 'xs' : 'md';

  if (size === 'exact') return exact;

  return props.theme.modal[fluid ? 'fluid' : 'fixed'][size];
}

function getIconStyles(props) {
  return `
    font-family: 'scaleflex-icon-font' !important;
    color: ${props.muted ? props.theme.textMuted : props.theme.textColor};
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
  
    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    
    :hover {
      color: ${props.muted ? props.theme.textMuted : props.theme.textColorHover};
    }
  `;
}

function getIconByName(name) {
  let char = '';

  switch (name) {
    case 'cross':
      char = '\\e90c';
      break;
    case 'effects':
      char = '\\e900';
      break;
    case 'filters':
      char = '\\e904';
      break;
    case 'adjust':
      char = '\\e90a';
      break;
    case 'crop':
      char = '\\e901';
      break;
    case 'resize':
      char = '\\e907';
      break;
    case 'orientation':
      char = '\\e90b';
      break;
    case 'previous':
      char = '\\e905';
      break;
    case 'next':
      char = '\\e906';
      break;
    case 'ratio':
      char = '\\e90e';
      break;
    case 'no-ratio':
      char = '\\e90f';
      break;
    case 'left-rotate':
      char = '\\e902';
      break;
    case 'right-rotate':
      char = '\\e908';
      break;
    default:
      return;
  }

  return `
    :before {
      content: '${char}'
    }
  `;
}

function getGlobal() {
  return `
    body {
      margin: 0;
      font-family: 'Roboto', sans-serif;
      font-style: normal;
      font-weight: 400;
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
  `
}


export { getModalWidth, getIconStyles, getIconByName, getGlobal };