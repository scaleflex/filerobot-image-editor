import styled from 'styled-components';
import { styleUtils } from 'scaleflex-react-ui-kit/dist';

const { getIconStyles, getIconByName } = styleUtils;


const OrientationWrapper = styled.div`
  color: ${props => props.theme.colors.text.base};
  text-align: center;
`;

const RotateWrapper = styled.div`
  display: inline-block;
  padding: 20px;
`;

const RotateLabel = styled.div`

`;

const RotateButton = styled.div`
  margin-top: 10px;
  
  button:focus,  button:active {
    outline: none !important;
    box-shadow: none !important;
  }
`;

const RotateIcon = styled.span`
  ${props => getIconStyles(props)}
  ${props => getIconByName(props.name)}
  height: 14px;
  font-size: 14px;
  color: ${props => props.theme.colors.dark.base};
`;

export { OrientationWrapper, RotateWrapper, RotateButton, RotateLabel, RotateIcon }