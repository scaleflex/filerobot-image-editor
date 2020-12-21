const commonTheme = {
  textFontSize: '14px',

  colors: {
    success: '#5cb85c',
    warning: '#f0ad4e',
    error: '#d9534f',
    muted: '#636c72',

    base: 'light',

    light: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      darker: '#DFE4E8',
    },

    dark: {
      base: '#1e262c',
      light: '#454F5B',
      lighter: '#637381',
    },

    primary: {
      base: '#181830',
      light: '#263138',
      lighter: '#34444c',
      dark: '#101021',
      darker: '#090912',

      text: '#F9FAFB'
    },

    secondary: {
      base: '#00707c',
      light: '#007E8A',
      lighter: '#008D99',
      dark: '#00616D',
      darker: '#005662',

      text: '#F9FAFB'
    },

    text: {
      base: '#F9FAFB',
      dark: '#F4F6F8',
      mute: '#aaa',
      light: '#fff'
    },

    background: {
      base: '#f1f1f1'
    },

    border: {
      base: '#ccc'
    },

    link: {
      base: '#00707c',
      over: '#00616D',
    },

    brand: {
      success: '#5cb85c',
      warning: '#f0ad4e',
      error: '#d9534f',
      muted: '#636c72'
    }
  },

  modal: {
    borderRadius: '4px',
    fluid: {
      xs: '35%',
      sm: '45%',
      md: '60%',
      lg: '80%',
      xl: '90%'
    },
    fixed: {
      xs: '200px',
      sm: '300px',
      md: '450px',
      lg: '650px',
      xl: '800px'
    }
  },

  button: {
    tt: 'none'
  }
}

export const variables = {
  ...commonTheme,

  radii: [
    0, '0.2rem', '0.25rem', '.3rem'
  ],

  // backgrounds
  mainBackgroundColor: '#1e262c',
  mainBackgroundColorHover: '#263138',
  mainBackgroundColorActive: '#34444c',

  secondBackgroundColor: '#263138',

  // text
  textColor: '#e7f1f4',
  textColorHover: '#fff',
  textMuted: '#70777f',

  // border
  borderColor: '#70777f',
  borderDarkColor: '#161e23',

  fieldWidth: '120px',
  borderInputColor: '#3b4d54',
  borderInputColorHover: '#52686d',
  borderInputColorActive: '#52686d',
  inputBackgroundColor: '#34444c',
  inputBoxShadowColor: '#03a9bb',
  inputPlaceholderColor: '#888d94',


  // main color
  mainThemeColor: '#00707c',
  mainThemeColorHover: '#00616D',
  mainThemeColorOpacity: 'rgba(0, 112, 124, 0.5)',

  btnSaveColor: '#009345',
  btnSaveColorHover: '#00b549',

  btnThemeColor: '#34444c',

  btnPaddingSm: '2px 14px',
  btnFontSizeSm: '12px',
  btnBorderRadius: '2px',

  modalOverlayColor: '#484848',

  btnMainColor: (props) => `
    color: #fff;
    background-color: #00707c;
    border-color: #00707c;

    &:hover {
      color: #fff;
      background-color: #00616D;
      border-color: #00616D;
    }

    &:focus {
      -webkit-box-shadow: 0 0 0 2px rgba(0, 112, 124, 0.5);
              box-shadow: 0 0 0 2px rgba(0, 112, 124, 0.5);
    }

    :active {
      color: #fff;
      background-color: #00616D;
      background-image: none;
      border-color: #00616D;
    }

    ${props.disabled ? `
      background-color: rgba(0, 112, 124, 0.5);
      border-color: rgba(0, 112, 124, 0.5);
    ` : ''}

    ${props.active ? `
       color: #fff;
      background-color: #00616D;
      background-image: none;
      border-color: #00616D;
    ` : ''}
  `,

  button: {
    ...commonTheme.button,

    sm: {
      p: '4px 10px',
      fz: '12px',
      lh: '1.5',
      br: '2px'
    },
    md: {
      p: '6px 12px',
      fz: '14px',
      lh: '1.5',
      br: '2px'
    },
    lg: {
      p: '8px 14px',
      fz: '16px',
      lh: '1.5',
      br: '3px'
    }
  },

  modal: {
    ...commonTheme.modal,

    backgroundColor: '#1e262c',
    color: '#e7f1f4',
    colorMuted: '#70777f',
    colorMutedHover: '#e7f1f4'
  }
}

function getModalWidth(props) {
  const { exact, xl, lg, md, sm, xs, fluid } = props;
  const size = exact ? 'exact' : xl ? 'xl' : lg ? 'lg' : md ? 'md' : sm ? 'sm' : xs ? 'xs' : 'md';

  if (size === 'exact') return exact;

  return variables.modal[fluid ? 'fluid' : 'fixed'][size];
}

function getFieldColorStyles(props) {
  if (props.dark) return ``;
  else return `
    color: ${getColor(props, 'text')};
    background-color: ${getColor(props, 'background')};
    border: 1px solid ${getColor(props, 'border')};

    &::-webkit-input-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &::-moz-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &:-ms-input-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &::-ms-input-placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }
    &::placeholder {
      color:  ${getColor(props, 'text', 'muted')};
    }

    &:focus {
      color: ${getColor(props, 'text')};
      background-color: ${getColor(props, 'background')};
      border-color: ${getColor(props, 'link')};
      outline: 0;
    }
    &:focus::-ms-value {
      color: ${getColor(props, 'text')};
      background-color: ${getColor(props, 'background')};
      border-color: ${getColor(props, 'link')};
      outline: 0;
    }
  `;
}

function getIconStyles(props) {
  return `
    font-family: 'filerobot-image-editor-font' !important;
    color: ${props.muted ? props.theme.colors.textMute : props.theme.colors.text};
    speak: none;
    font-style: normal;
    font-weight: normal;
    font-variant: normal;
    text-transform: none;
    line-height: 1;

    /* Better Font Rendering =========== */
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    &:hover {
      color: ${props.muted ? props.theme.colors.textMute : props.theme.colors.text};
    }
  `;
}

function shadeBlendConvert(p, from, to) {
  if(typeof(p)!="number"||p<-1||p>1||typeof(from)!="string"||(from[0]!='r'&&from[0]!='#')||(typeof(to)!="string"&&typeof(to)!="undefined"))return null; //ErrorCheck
  if(!window.sbcRip)window.sbcRip=(d)=>{
    let l=d.length,RGB=new Object();
    if(l>9){
      d=d.split(",");
      if(d.length<3||d.length>4)return null;//ErrorCheck
      RGB[0]=i(d[0].slice(4)),RGB[1]=i(d[1]),RGB[2]=i(d[2]),RGB[3]=d[3]?parseFloat(d[3]):-1;
    }else{
      if(l==8||l==6||l<4)return null; //ErrorCheck
      if(l<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(l>4?d[4]+""+d[4]:""); //3 digit
      d=i(d.slice(1),16),RGB[0]=d>>16&255,RGB[1]=d>>8&255,RGB[2]=d&255,RGB[3]=l==9||l==5?r(((d>>24&255)/255)*10000)/10000:-1;
    }
    return RGB;}
  var i=parseInt,r=Math.round,h=from.length>9,h=typeof(to)=="string"?to.length>9?true:to=="c"?!h:false:h,b=p<0,p=b?p*-1:p,to=to&&to!="c"?to:b?"#000000":"#FFFFFF",f=window.sbcRip(from),t=window.sbcRip(to);
  if(!f||!t)return null; //ErrorCheck
  if(h)return "rgb("+r((t[0]-f[0])*p+f[0])+","+r((t[1]-f[1])*p+f[1])+","+r((t[2]-f[2])*p+f[2])+(f[3]<0&&t[3]<0?")":","+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*10000)/10000:t[3]<0?f[3]:t[3])+")");
  else return "#"+(0x100000000+(f[3]>-1&&t[3]>-1?r(((t[3]-f[3])*p+f[3])*255):t[3]>-1?r(t[3]*255):f[3]>-1?r(f[3]*255):255)*0x1000000+r((t[0]-f[0])*p+f[0])*0x10000+r((t[1]-f[1])*p+f[1])*0x100+r((t[2]-f[2])*p+f[2])).toString(16).slice(f[3]>-1||t[3]>-1?1:3);
}

function isHex(color) {
  return (/^#?([a-f\d])([a-f\d])([a-f\d])$/i).test(color) || (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).test(color);
}

function hexToRgb(hex) {
  // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {
    return r + r + g + g + b + b;
  });

  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

export const getHoverColor = (color) => {
  if (!color) return null;

  const nextColor = shadeBlendConvert(-0.1, color) || '';

  return nextColor.toLowerCase() === color.toLowerCase() ? shadeBlendConvert(0.25, color) : nextColor;
}

export const getWithOpacity = (color, opacity) => {
  if (!color) return null;

  const isHexColor = isHex(color);
  const hexColor = isHexColor ? color : shadeBlendConvert(0, color, 'c');
  if (!hexColor) return null;
  const rgbColor = hexToRgb(hexColor);

  if (!rgbColor) return color;

  return `rgba(${rgbColor.r}, ${rgbColor.g}, ${rgbColor.b}, ${opacity})`;
}

export const getElementStylesBySize = (props, type, field) => {
  const { sm, lg } = props;
  const size = sm ? 'sm' : lg ? 'lg' : 'md';

  return variables[type] && variables[type][size] && variables[type][size][field];
}

export const getColor = (props, type, field = 'base', isThemeOverlay, isSupreme) => {
  const themeOverlay = isThemeOverlay ? variables.colors.base : null;

  return variables.colors[type][themeOverlay ? (themeOverlay + (isSupreme ? 'er' : '')) : field];
}

function getIconByName(name) {
  let char = '';

  switch (name) {
    case 'watermark':
      char = '\\e918';
      break;
    case 'reset':
      char = '\\e912';
      break;
    case 'flip-v':
      char = '\\e916';
      break;
    case 'flip-h':
      char = '\\e914';
      break;
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
    case 'rotate':
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
    case 'focus_point':
      char = '\\e919';
      break;
    case 'shapes':
      char = '\\e91b';
      break;
    case 'image':
      char = '\\e91a';
      break;
    case 'text':
      char = 'T';
      break;
    default:
      return;
  }

  return `
    &:before {
      content: '${char}'
    }
  `;
}


export { getModalWidth, getIconStyles, getFieldColorStyles, getIconByName };
