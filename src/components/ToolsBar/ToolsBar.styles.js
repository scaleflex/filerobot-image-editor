/** External Dependencies */
import styled, { css } from 'styled-components';
import { Label } from '@scaleflex/ui/core';

const StyledToolsBar = styled.div`
  padding: 8px 8px 12px;
  width: 100%;
`;

const StyledToolsBarItems = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledToolsBarItemButton = styled.div(
  ({ theme }) => css`
    display: flex;
    border-radius: 2px;
    align-items: center;
    justify-content: center;
    padding: 8px;
    
    &:not(:last-child) {
      margin-right: 8px;
    }

    &, * {
      cursor: pointer;
    }

    &:hover {
      background-color: #ECF3FF;  // TODO(Styles): Add this color to the theme and consider dark color for it.
    }

    &[aria-selected="true"] {
      background-color: #ECF3FF;  // TODO(Styles): Add this color to the theme and consider dark color for it.

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }
  `,
);

const StyledToolsBarItemButtonLabel = styled(Label)`
  margin-left: 6px;
`;

const StyledToolsBarItemOptionsWrapper = styled.div`
    position: relative;
    width: 100%;
    transition: max-height 100ms ease-in-out;
    display: flex;
    justify-content: center;
    align-items: center;

    ${(props) => `
      max-height: ${props.hasChildren ? '40px' : 0};
      margin: ${props.hasChildren ? '0 auto 8px' : 0};
    `};
`;

export {
  StyledToolsBar,
  StyledToolsBarItems,
  StyledToolsBarItemButton,
  StyledToolsBarItemButtonLabel,
  StyledToolsBarItemOptionsWrapper,
};
