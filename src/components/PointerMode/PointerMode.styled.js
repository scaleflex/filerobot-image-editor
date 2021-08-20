import styled, { css } from 'styled-components';

const PointerModeWrapper = styled.div(
  ({ theme }) => css`
    border-left: 1px solid ${theme.palette['borders-primary']};
    margin-left: 4px;
  `,
);

export {
  PointerModeWrapper,
};
