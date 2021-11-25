/** External Dependencies */
import styled from 'styled-components';
import { Label } from '@scaleflex/ui/core';

const StyledTabs = styled.div`
  padding: 12px 12px 12px 0;

  [data-phone='true'] & {
    display: flex;
    padding: 0;
  }
`;

const StyledTabItem = styled.div(
  ({ theme }) => `
    width: 67px;
    height: 62px;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    background-color: ${theme.palette['bg-primary']};
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;

    [data-phone='true'] & {
      margin-bottom: 0;
      height: 50px;
      border-radius: 0;
    }

    &,
    * {
      cursor: pointer;
    }

    &:hover {
      background-color: #ecf3ff; // TODO(Styles): Add this color to the theme and consider dark color for it.
    }

    &[aria-selected='true'] {
      background-color: #ecf3ff; // TODO(Styles): Add this color to the theme and consider dark color for it.

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }
  `,
);

const StyledTabItemLabel = styled(Label)`
  margin-top: 6px;
  font-size: 11px;
  line-height: 12px;

  [data-phone='true'] & {
    font-size: 10px;
  }
`;

export { StyledTabs, StyledTabItem, StyledTabItemLabel };
