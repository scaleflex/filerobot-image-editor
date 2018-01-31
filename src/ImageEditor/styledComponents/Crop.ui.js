import styled from 'styled-components';
import { Button } from 'scaleflex-react-modules/dist';
import { styleUtils } from 'scaleflex-react-modules/dist';

const { getIconStyles, getIconByName } = styleUtils;

const CropWrapper = styled.div`
  color: ${props => props.theme.textColor};
`;

const CustomLabel = styled.div`
  display: inline-block;
  color: ${props => props.theme.textColor};
  height: 100px;
  line-height: 100px;
  padding: 0 20px 0 0;
`;

const FieldSet = styled.div`
  display: inline-block;
  width: 100px;
  text-align: center;
`;

const FieldLabel = styled.label`
  display: inline-block;
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
  background: ${props => props.dark ? props.theme.mainBackgroundColor : props.theme.inputBackgroundColor};
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
    border: 1px solid ${props => props.theme.mainThemeColor};
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
    color: ${props => props.active ? props.theme.textColorHover : props.theme.textMuted} !important;
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
  background: ${props => props.active ? props.theme.mainBackgroundColorActive : 'transparent'}
`;

const CropBoxInner = styled.div`
  padding: 15px 0;
  height: 100px;
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