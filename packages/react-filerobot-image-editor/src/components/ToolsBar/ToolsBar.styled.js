/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledToolsBar = styled.div`
  width: fit-content;
  margin: 0 auto;
  max-width: 99.5%;
  max-height: 112px;

  [data-phone='true'] & {
    padding: 0;
    margin-top: 8px;
    max-height: initial;
  }
`;

const StyledToolsBarItems = styled.div`
  padding: 0 16px 16px 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  overflow-x: auto;
  [data-phone='true'] & {
    background: ${({ theme }) => theme.palette['bg-primary']};
  }
`;

const StyledToolsBarItemButton = styled.div(
  ({ theme }) => `
    display: flex;
    border-radius: 2px;
    align-items: center;
    justify-content: center;
    padding: 8px 12px;

    svg {
      color: ${theme.palette[PC.IconsPrimary]};
    }

    &,
    * {
      cursor: pointer;
    }

    &:hover {
      background: ${theme.palette['bg-primary-active']};
    }

    &[aria-selected='true'] {
      background: ${theme.palette['bg-primary-active']};
      border-radius: 4px;

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }
  `,
);

const StyledToolsBarItemButtonLabel = styled(Label)`
  margin-left: 6px;
  color: ${({ theme: { palette } }) => palette[PC.TextPrimary]};
`;

const StyledToolsBarItemOptionsWrapper = styled.div`
  position: relative;
  width: 100%;
  transition: max-height 100ms ease-in-out;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;

  ${(props) => `
      max-height: ${props.hasChildren ? '56px' : 0};
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
