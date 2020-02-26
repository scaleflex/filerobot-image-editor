import styled from 'styled-components';
import { Button } from './Button';
import { getIconStyles, getIconByName } from './styleUtils';


const CropWrapper = styled.div`
  color: ${props => props.theme.colors.text};
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
  color: ${props => props.theme.colors.text};
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
  line-height: 15px;
`;

const FieldInput = styled.input.attrs(props => ({
  type: props.type ? props.type : 'text'
}))`
  display: inline-block;
  width: ${props => props.fullSize ? '100%' : props.theme.fieldWidth};
  height: 30px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 30px;
  color: ${p => p.theme.colors.text};
  background: ${props => props.dark ? props.theme.colors.primaryBg : props.theme.colors.secondaryBgHover};
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
    border: 1px solid ${props => props.theme.colors.secondaryBg};
    outline: none;
    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;
  }
`;

const FileInput = styled('input').attrs(props => ({
  type: props.type ? props.type : 'file'
}))`
  display: inline-block;
  width: ${props => props.fullSize ? '100%' : props.theme.fieldWidth};
  height: 30px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 1;
  color: ${p => p.theme.colors.text};
  background: ${props => props.dark ? props.theme.colors.primaryBg : props.theme.colors.secondaryBgHover};
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
    border: 1px solid ${props => props.theme.colors.secondaryBg};
    outline: none;
    box-shadow: rgba(0, 112, 124, 0.5) 0px 1px 1px inset, rgba(0, 112, 124, 0.4) 0px 1px 0px;
  }
`;

const BlockRatioWrapper = styled.div`
  display: inline-block;
  padding: 0 5px;
`;

const BlockRatioBtn = styled(Button)`
  padding: 0;
  
  > span {
    color: ${props => props.active ? props.theme.colors.text : props.theme.colors.textMute} !important;
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
  background: ${props => props.active ? props.theme.colors.secondaryBgHover : 'transparent'}
`;

const CropBoxInner = styled.div`
  padding: 15px 0;
  height: 90px;
  line-height: 100px;
`;

const CropShape = styled.div`
  height: ${props => getHeightOfShape(props.ratio)}px;
  border: 1px solid ${props => props.theme.textColor};
  width: ${props => getWidthOfShape(props.ratio)}px;
  margin: 0 auto;
  display: inline-block;
  vertical-align: middle;
`;

const CropShapeWrapper = styled('div')`
  height: 50px;
  line-height: 50px;
`;

const ShapeAligner = styled('div')`
  display: inline-block;
  vertical-align: middle;
  height: 50px;
`;

const CropLabel = styled.div`
  height: 20px;
  line-height: 20px;
`;


const getWidthOfShape = (ratio) => {
  let width = 50 * ratio;

  if (width > 200) {
    width = 200;
  }

  return width;
};

const getHeightOfShape = (ratio) => {
  let height = 50;
  let width = 50 * ratio;

  if (width > 200) {
    height = 200 / ratio;
  }

  return height;
};

export {
  CropWrapper, CustomLabel, FieldSet, FieldLabel, FileInput, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon,
  CropBox, CropBoxInner, CropShape, CropLabel, CropShapeWrapper, ShapeAligner
};