import styled from 'styled-components';
import { getWithOpacity, variables } from './styleUtils';


const Button = styled.button`
  text-transform: ${props => props.tt || (variables.button && variables.button.tt) || 'none'};
  display: ${props => props.hide ? 'none': 'inline-block'};
  padding: ${props => getElementStylesBySize(props, 'button', 'p')};
  font-size: ${props => getElementStylesBySize(props, 'button', 'fz')};
  line-height:  ${props => getElementStylesBySize(props, 'button', 'lh')};
  min-width: ${props => props.fullSize ? '100%' : '62px'};
  height: 30px;
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
  -webkit-transition: all 0.2s ease-in-out;
  -o-transition: all 0.2s ease-in-out;
  transition: all 0.2s ease-in-out;
  border-radius: ${props => getElementStylesBySize(props, 'button', 'br')};
  border: 0;
  
  &:focus, &:hover {
    text-decoration: none;
  }
  
  &:focus {
    outline: 0;
    -webkit-box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
            box-shadow: 0 0 0 2px rgba(2, 117, 216, 0.25);
  }
  
  ${props => isDisabled(props)};
  
  ${props => getButtonStyles(props)};
`;

function getElementStylesBySize(props, type, field) {
  const { sm, lg } = props;
  const size = sm ? 'sm' : lg ? 'lg' : 'md';

  return variables[type] && variables[type][size] && variables[type][size][field];
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
    background-color: #28a745;
    border-color: ##28a745;
    
    &:hover {
      color: #fff;
      background-color: #218838;
      border-color: #1e7e34;
    }
    
    &:focus {
      -webkit-box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
              box-shadow: 0 0 0 2px rgba(92, 184, 92, 0.5);
    }
    
    :active {
      color: #fff;
      background-color: #1e7e34;
      background-image: none;
      border-color: #1c7430;
    }
    
    ${props.disabled ? `
      background-color: #009345;
      border-color: #009345;
      
      &:hover {
        background-color: #009345;
        border-color: #009345;
      }
    ` : ''}
    
    ${props.active ? `
      color: #fff;
      background-color: #1e7e34;
      background-image: none;
      border-color: #1c7430;
    ` : ''}
  `;
  else if (props.primary) return `
    color: #fff;
    background-color: #0275d8;
    border-color: #0275d8;
    
    &:hover {
      color: #fff;
      background-color: #025aa5;
      border-color: #01549b;
    }
    
    &:focus {
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
      
      &:hover {
        background-color: #0275d8;
        border-color: #0275d8;
      }
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
    
    &:hover {
      color: #fff;
      background-color: #31b0d5;
      border-color: #2aabd2;
    }
    
    &:focus {
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
      
      &:hover {
        background-color: #5bc0de;
        border-color: #5bc0de;
      }
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
    
    &:hover {
      color: #fff;
      background-color: #ec971f;
      border-color: #eb9316;
    }
    
    &:focus {
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
      
      &:hover {
        background-color: #f0ad4e;
        border-color: #f0ad4e;
      }
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
    
    &:hover {
      color: #fff;
      background-color: #c9302c;
      border-color: #c12e2a;
    }
    
    &:focus {
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
      
      &:hover {
        background-color: #d9534f;
        border-color: #d9534f;
      }
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
    color: ${getLinkColor(props)}; 
    border-radius: 0;
    background-color: transparent;
    outline: none;
    box-shadow: none;
    
    &:hover {
      border-color: transparent;
      color: ${getLinkColor(props, 'over')};
      background-color: transparent;
      outline: none;
      box-shadow: none;
    }
    
    &:focus {
      border-color: transparent;
      outline: none;
      box-shadow: none;
    }
    
    :active {
      background-color: transparent;
      outline: none;
      box-shadow: none;
    }
    
    ${props.disabled ? `
      color: ${getLinkColor(props, 'over')};
      background-color: transparent;
      
      &:hover {
        color: ${getLinkColor(props, 'over')};
        background-color: transparent;
      }
    ` : ''}
    
    ${props.active ? `
      background-color: transparent;
      color: ${getLinkColor(props, 'over')};
    ` : ''}
    
    :disabled:focus, :disabled:hover {
      text-decoration: none;
      outline: none;
      box-shadow: none;
    }
  `;
  else if (props.themeColor) return `
    color: ${getColor(props, 'secondary', 'text')};
    background-color: ${props.theme.colors.button?.primary || getColor(props, 'secondary')};
    border-color: ${props.theme.colors.button?.border || getColor(props, 'secondary', null, true, true)};
    
    &:hover {
      color: ${getColor(props, 'secondary', 'text')};
      background-color: ${props.theme.colors.button?.hover || getColor(props, 'secondary', null, true)};
      border-color: ${props.theme.colors.button?.borderHover || getColor(props, 'secondary', null, true, true)};
    }
    
    &:focus {
      -webkit-box-shadow: 0 0 0 2px ${getWithOpacity(getColor(props, 'secondary'), 0.5)};
              box-shadow: 0 0 0 2px ${getWithOpacity(getColor(props, 'secondary'), 0.5)};
    }
    
    :active {
      color: ${getColor(props, 'secondary', 'text')};
      background-color: ${props.theme.colors.button?.active || getColor(props, 'secondary', null, true)};
      background-image: none;
      border-color: ${props.theme.colors.button?.borderActive || getColor(props, 'secondary', null, true, true)};
    }
    
    ${props.disabled ? `
      background-color: ${getWithOpacity(getColor(props, 'secondary'), 0.5)};
      border-color: ${getWithOpacity(getColor(props, 'secondary'), 0.5)};
      
      &:hover {
        background-color: ${getWithOpacity(getColor(props, 'secondary'), 0.5)};
        border-color: ${getWithOpacity(getColor(props, 'secondary'), 0.5)};
      }
    ` : ''}
    
    ${props.active ? `
      color: ${getColor(props, 'secondary', 'text')};
      background-color: ${getColor(props, 'secondary', null, true)};
      background-image: none;
      border-color: ${getColor(props, 'secondary', null, true, true)};
    ` : ''}
  `;
  else return `
    background: #fff;
    color: #1e262c;
    border-color: #B0B0B0;
    
    &:hover {
      color: #1e262c;
      background-color: #E1E2E3;
      border-color: #B0B0B0;
    }
    
    &:focus {
      -webkit-box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
              box-shadow: 0 0 0 2px rgba(204, 204, 204, 0.5);
    }
    
    :active {
      color: #1e262c;
      background-color: #E1E2E3;
      border-color: #B0B0B0;
    }
    
    ${props.disabled ? `
      background-color: #fff;
      border-color: #1e262c;
      opacity: 0.6;
      
      &:hover {
        background-color: #fff;
        border-color: #1e262c;
        opacity: 0.6;
      }
    ` : ''}
    
    ${props.active ? `
      color: #1e262c;
      background-color: #E1E2E3;
      border-color: #B0B0B0;
    ` : ''}
  `;
}

function getColor(props, type, field = 'base', isThemeOverlay, isSupreme) {
  const themeOverlay = isThemeOverlay ? variables.colors.base : null;

  return variables.colors[type][themeOverlay ? (themeOverlay + (isSupreme ? 'er' : '')) : field];
}

function getLinkColor(props, type = 'base') {
  const forcedColor = props.light ? 'light' : props.dark ? 'dark' : null;
  const isOver = type !== 'base';
  const themeType = variables.colors.base;

  if (forcedColor) return variables.colors[forcedColor][isOver ? themeType : 'base'];
  else return variables.colors.link[type];
}

export { Button }
