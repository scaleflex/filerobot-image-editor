import styled, { css } from 'styled-components';

const StyledTopbar = styled.div`
  display: flex;
  width: fit-content;
  text-align: center;
  margin: 0 auto;
  flex-wrap: wrap;
  align-items: center;
  padding: 16px 0;
  min-height: 50px;
  justify-content: center;
`;

const StyledTopbarItem = styled.div(
  ({ theme }) => css`
    width: 60px;
    font-size: 11px;
    line-height: 12px;
    text-align: center;
    user-select: none;
    cursor: pointer;
    margin: 0 8px;

    * {
      ${(props) => props.selected ? `color: ${theme.palette['accent-primary']};` : undefined}
    }
  `
);

export { StyledTopbar, StyledTopbarItem }