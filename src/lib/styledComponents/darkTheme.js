import commonTheme from './commonTheme';


const darkTheme = {
  ...commonTheme,
  // backgrounds
  mainBackgroundColor: '#1e262c',
  mainBackgroundColorHover: '#263138',
  mainBackgroundColorActive: '#34444c',

  secondBackgroundColor: '#263138',

  inputBackgroundColor: '#34444c',

  // text
  textColor: '#f2f2f2',
  textColorHover: '#fff',
  textMuted: '#70777f',

  // border
  borderColor: '#70777f',
  borderDarkColor: '#161e23',

  borderInputColor: '#3b4d54',
  borderInputColorHover: '#52686d',
  borderInputColorActive: '#52686d',

  // main color
  mainThemeColor: '#00707c',
  mainThemeColorHover: '#096868',
  mainThemeColorOpacity: 'rgba(0, 112, 124, 0.5)',

  btnSaveColor: '#009345',
  btnSaveColorHover: '#00b549',

  btnThemeColor: '#34444c',

  btnPaddingSm: '2px 14px',
  btnFontSizeSm: '12px',
  btnBorderRadius: '2px',

  button: {
    tt: 'uppercase',

    sm: {
      p: '4px 10px',
      fz: '12px'
    },
    md: {
      p: '6px 12px',
      fz: '14px'
    },
    lg: {
      p: '8px 14px',
      fz: '16px'
    }
  }
}

export default darkTheme;