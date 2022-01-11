/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 8px;
  flex-wrap: wrap;
`;

const StyledOptionPopupContent = styled.div`
  background: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px ${({ theme }) => theme.palette['light-shadow']};
  border-radius: 2px;
  overflow: visible;

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

const StyledSpacedOptionFields = styled.div`
  padding: 8px 12px;
`;

const StyledHeadline = styled(Label)`
  font-weight: 500;
  margin-bottom: 12px;
`;

const StyledTwoColumnsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledColumn = styled.div`
  &:not(:first-child) {
    margin-left: 12px;
  }
`;

const StyledIconWrapper = styled.div(
  ({ theme, addThinBorder, noMargin, secondaryIconColor }) => `
    cursor: pointer;
    padding: 3px 6px;
    margin: ${noMargin ? 0 : '0 4px'};
    display: inline-block;

    svg {
      vertical-align: middle;
      margin: 0 auto;
    }

    ${
      addThinBorder
        ? `border: 0.5px solid ${theme.palette['borders-secondary']}`
        : ''
    };
    color: ${secondaryIconColor ? '#959DA8' : ''};

    &[aria-selected='true'] {
      background: ${theme.palette['bg-primary-active']};

      * {
        color: ${theme.palette['accent-primary-active']};
      }
    }

    :hover {
      background: ${theme.palette['bg-primary-active']};
    }
  `,
);

export {
  StyledHeadline,
  StyledTwoColumnsContainer,
  StyledColumn,
  StyledIconWrapper,
  StyledSpacedOptionFields,
  StyledOptions,
  StyledOptionPopupContent,
};
