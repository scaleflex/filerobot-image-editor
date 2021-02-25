import styled from 'styled-components';
import { Button } from './Button';
import { getIconStyles, getIconByName } from './styleUtils';


const CropWrapper = styled.div`
  color: ${props => props.theme.colors.text};
  display: flex;
  
  @media (min-widthL 768px) {
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PresetsWrapper = styled('div')`
  @media (max-width: 768px) {
    width: 100%;
    overflow-x: scroll;
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
  ${props => !props.fullSize && 'max-width: 400px;'};
  height: 30px;
  padding: 6px 12px;
  font-size: 12px;
  line-height: 30px;
  color: ${p => p.theme.colors.text};
  background: ${props => props.theme.colors.primaryBg};
  border-radius: 2px;
  transition: border-color 0.15s ease-in-out;
  vertical-align: middle;
  font-family: Roboto, sans-serif;
  border: 1px solid ${props => props.theme.colors.border};
  
  ${p => p.type === 'number' && `::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }`};
  
  &:hover {
    outline: none;
  }
  
  &:focus {
    outline: none;
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
  background: ${props => props.theme.colors.primaryBg};
  border-radius: 2px;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  vertical-align: middle;
  border: 0px solid transparent;
  font-family: Roboto, sans-serif;
  border: 1px solid ${props => props.theme.colors.border};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  
  &:hover {
    outline: none;
  }
  
  &:focus {
    outline: none;
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

  ${props => getIconStyles(props)};
  ${props => getIconByName(props.active ? 'ratio' : 'no-ratio')};
  
  color: ${props => props.theme.textMuted};
`;

const CropBox = styled.div`
  display: inline-block;
  vertical-align: top;
  text-align: center;
  padding: 0 20px;
  cursor: pointer;
  background: ${props => props.active ? props.theme.colors.secondaryBgHover : 'transparent'};
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
  ${({ radius }) => radius && `border-radius: ${radius}%;`};
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
  CropBox, CropBoxInner, CropShape, CropLabel, CropShapeWrapper, ShapeAligner, PresetsWrapper
};
