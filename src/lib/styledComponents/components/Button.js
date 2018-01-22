import styled from 'styled-components';


const Button = styled.button`
  text-transform: ${props => props.tt || props.theme.button.tt || 'none'};
  display: ${props => props.hide ? 'none': 'inline-block'};
  padding: ${props => getButtonPadding(props)};
  font-size: ${props => getbuttonFontSize(props)};
  min-width: ${props => props.fullSize ? '100%' : 'auto'};
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  border: 1px solid transparent;
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  border-radius: ${props => props.theme.button.borderRadius || '2px'};
  
  :focus, :hover {
    text-decoration: none;
  }
  
  :focus {
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
            box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
  }
  
  ${props => isDisabled(props)}
  
  ${props => getButtonStyles(props)}
`;

function getButtonPadding(props) {
  const { sm, lg } = props;
  const size = sm ? 'sm' : lg ? 'lg' : 'md';

  return props.theme.button[size].p || '6px 12px';
}

function getbuttonFontSize(props) {
  const { fz, sm, lg } = props;

  if (fz) return fz;

  const size = sm ? 'sm' : lg ? 'lg' : 'md';

  return  props.theme.button[size].fz || '14px';
}

function isDisabled(props) {
  if (!props.disabled) return '';

  return `
    cursor: not-allowed;
    opacity: .65;
  `;
}

function getButtonStyles(props) {
  if (props.success) return `
    color: #fff;
    background-color: #009345;
    border-color: #009345;
    
    :hover {
      color: #fff;
      background-color: #00b549;
      border-color: #00b142;
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
              box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #00c559;
      background-image: none;
      border-color: #00c252;
    }
    
    ${props.disabled ? `
      background-color: #009345;
      border-color: #009345;
    ` : ''}
    
    ${props.active ? `
      color: #fff;
      background-color: #00c559;
      background-image: none;
      border-color: #00c252;
    ` : ''}
  `;
  else if (props.primary) return `
    color: #fff;
    background-color: #0275d8;
    border-color: #0275d8;
    
    :hover {
      color: #fff;
      background-color: #025aa5;
      border-color: #01549b;
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
              box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #025aa5;
      background-image: none;
      border-color: #01549b;
    }
    
    ${props.disabled ? `
      background-color: #0275d8;
      border-color: #0275d8;
    ` : ''}
    
    ${props.active ? `
      color: #fff;
      background-color: #025aa5;
      background-image: none;
      border-color: #01549b;
    ` : ''}
  `;
  else if (props.info) return `
    color: #fff;
    background-color: #5bc0de;
    border-color: #5bc0de;
    
    :hover {
      color: #fff;
      background-color: #31b0d5;
      border-color: #2aabd2;
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);
              box-shadow: 0 0 0 2px rgba(91, 192, 222, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #31b0d5;
      background-image: none;
      border-color: #2aabd2;
    }
    
    ${props.disabled ? `
      background-color: #5bc0de;
      border-color: #5bc0de;
    ` : ''}
    
    ${props.active ? `
      color: #fff;
      background-color: #31b0d5;
      background-image: none;
      border-color: #2aabd2;
    ` : ''}
  `;
  else if (props.warning) return `
    color: #fff;
    background-color: #f0ad4e;
    border-color: #f0ad4e;
    
    :hover {
      color: #fff;
      background-color: #ec971f;
      border-color: #eb9316;
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);
              box-shadow: 0 0 0 2px rgba(240, 173, 78, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #ec971f;
      background-image: none;
      border-color: #eb9316;
    }
    
    ${props.disabled ? `
      background-color: #f0ad4e;
      border-color: #f0ad4e;
    ` : ''}
    
    ${props.active ? `
      color: #fff;
      background-color: #ec971f;
      background-image: none;
      border-color: #eb9316;
    ` : ''}
  `;
  else if (props.danger) return `
    color: #fff;
    background-color: #d9534f;
    border-color: #d9534f;
    
    :hover {
      color: #fff;
      background-color: #c9302c;
      border-color: #c12e2a;
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);
              box-shadow: 0 0 0 2px rgba(217, 83, 79, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #c9302c;
      background-image: none;
      border-color: #c12e2a;
    }
    
    ${props.disabled ? `
      background-color: #d9534f;
      border-color: #d9534f;
    ` : ''}
    
    ${props.active ? `
      color: #fff;
      background-color: #c9302c;
      background-image: none;
      border-color: #c12e2a;
    ` : ''}
  `;
  else if (props.link) return `
    font-weight: normal;
    color: #0275d8;
    border-radius: 0;
    background-color: transparent;
    
    :hover {
      border-color: transparent;
      color: #014c8c;
      background-color: transparent;
    }
    
    :focus {
      border-color: transparent;
    }
    
    :active {
      background-color: transparent;
    }
    
    ${props.disabled ? `
      color: #636c72;
      background-color: transparent;
    ` : ''}
    
    ${props.active ? `
      background-color: transparent;
    ` : ''}
    
    :disabled:focus, :disabled:hover {
      text-decoration: none;
    }
  `;
  else return `
    background: #34444c;
    color: #fff;
    border-color: #161f24;
    
    :hover {
      color: #fff;
      background-color: #394952;
      border-color: #1c272d
    }
    
    :focus {
      -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
              box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #435661;
      background-image: none;
      border-color: #202d33
    }
    
    ${props.disabled ? `
      background-color: #fff;
      border-color: #ccc;
    ` : ''}
    
    ${props.active ? `
      color: #292b2c;
      background-color: #e6e6e6;
      background-image: none;
      border-color: #adadad;
    ` : ''}
  `;
}

export { Button }