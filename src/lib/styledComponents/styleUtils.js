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
    default:
      return;
  }

  return `
    :before {
      content: '${char}'
    }
  `;
}


export { getModalWidth, getIconStyles, getIconByName };