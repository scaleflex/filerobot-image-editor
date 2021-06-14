import { InputGroup } from '@scaleflex/ui/core';
import styled, { css } from 'styled-components';

const SelectedAnnotationPopupWrapper = styled.div.attrs(
  (props) => ({
    style: {
      opacity: props.opacity || 0.9,
    }
  })
)(
  ({ theme }) => css`
    position: relative;
    background: ${theme.palette['bg-primary']};
    border: 1px solid ${theme.palette['borders-strong']};
    border-radius: 3px;
    border-top-left-radius: 0;
    padding: 4px;
    box-shadow: 0px 0px 4px 1px rgba(77, 78, 78, 0.3);
  `
);

const OptionsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OptionInputWrapper = styled.div`
  margin: 4px;
`;

const OptionInput = styled(InputGroup)`
  width: 100%;
  
  input {
    height: 100%;
    ${(props) => props.pointerCursor ? 'cursor: pointer;' : undefined}
  }

  ${(props) => `
    ${props.noBorder ? 'border: 0 !important;' : ''}
    ${props.noPadding ? 'padding: 0;' : ''}
    ${props.maxWidth ? `max-width: ${props.maxWidth}px;` : ''}
    ${props.pointerCursor ? 'cursor: pointer;' : ''}
    ${props.noOutline ? 'outline: none;' : ''}
  `}
`;


export {
  SelectedAnnotationPopupWrapper,
  OptionsWrapper,
  OptionInputWrapper,
  OptionInput
}