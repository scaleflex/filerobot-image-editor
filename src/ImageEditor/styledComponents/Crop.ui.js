import styled from 'styled-components';
import { Button } from 'scaleflex-react-ui-kit/dist';
import { styleUtils } from 'scaleflex-react-ui-kit/dist';

const { getIconStyles, getIconByName } = styleUtils;

const CropWrapper = styled.div`
  color: ${props => props.theme.colors.text.base};
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
  
  ::-webkit-scrollbar {
    height: 10px !important;
  }
   
  ::-webkit-scrollbar-thumb {
    background: #3b4d54;
    border-radius: 5px;
  }
`;

const CustomLabel = styled.div`
  display: block;
  color: ${props => props.theme.colors.text.base};
  height: 30px;
  line-height: 30px;
`;

const FieldSet = styled.div`
  display: inline-block;
  width: 100px;
  padding-top: 10px;
  text-align: center;
`;

const FieldLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FieldInput = styled.input.attrs({
  type: props => props.type ? props.type : 'text'
})`
  display: inline-block;
  width: ${props => props.fullSize ? '100%' : props.theme.fieldWidth};
  height: 30px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 30px;
  color: rgb(242, 242, 242);
  background: ${props => props.dark ? props.theme.colors.dark.base : props.theme.colors.primary.lighter};
  border-radius: 3px;
  box-shadow: rgba(0, 0, 0, 0.5) 0px 1px 1px inset, rgba(82, 104, 109, 0.4) 0px 1px 0px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  vertical-align: middle;
  border: 0px solid transparent;
  font-family: Roboto, sans-serif;
  
  :hover {
    outline: none;
  }
  
  :focus {
    border: 1px solid ${props => props.theme.colors.secondary.base};
    outline: none;
    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;
  }
`;

const BlockRatioWrapper = styled.div`
  display: inline-block;
  padding: 0 5px;
`;

const BlockRatioBtn = Button.extend`
  padding: 0;
  
  > span {
    color: ${props => props.active ? props.theme.colors.text.light : props.theme.colors.text.mute} !important;
   }
`;

const BlockRatioIcon = styled.span`
  cursor: pointer;
  position: relative;
  font-weight: bold;
  font-size: ${props => props.fz || '28px'};

  ${props => getIconStyles(props)}
  ${props => getIconByName(props.active ? 'ratio' : 'no-ratio')}
  
  color: ${props => props.theme.textMuted}
`

const CropBox = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
  background: ${props => props.active ? props.theme.colors.primary.lighter : 'transparent'}
`;

const CropBoxInner = styled.div`
  padding: 15px 0;
  height: 90px;
  line-height: 100px;
`;

const CropShape = styled.div`
  height: 50px;
  border: 1px solid ${props => props.theme.textColor};
  width: ${props => 50 * props.ratio}px;
`;

const CropLabel = styled.div`
  height: 20px;
  line-height: 20px;
`;

export {
  CropWrapper, CustomLabel, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon,
  CropBox, CropBoxInner, CropShape, CropLabel
};