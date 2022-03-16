/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';

const StyledToolsBar = styled.div`
  padding: 8px 1px 0;
  width: fit-content;
  margin: 0 auto;
  max-width: 99.5%;
  max-height: 92px;

  [data-phone='true'] & {
    padding: 0;
    margin-top: 8px;
    max-height: initial;
  }
`;

const StyledToolsBarItems = styled.div`
  display: flex;
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
    padding: 8px;

    &:not(:last-child) {
      margin-right: 8px;
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
