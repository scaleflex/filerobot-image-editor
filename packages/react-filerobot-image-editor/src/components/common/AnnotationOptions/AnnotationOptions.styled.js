/** External Dependencies */
import styled from 'styled-components';
import Label from '@scaleflex/ui/core/label';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const StyledOptions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  margin-top: 4px;
  gap: 8px;
  flex-wrap: wrap;

  svg {
    color: ${({ theme: { palette } }) => palette[PC.IconsPrimary]};
  }
`;

const StyledOptionPopupContent = styled.div`
  background: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px ${({ theme }) => theme.palette['light-shadow']};
  border-radius: 4px;
  display: grid;
  grid-template-columns: repeat(4, auto);
  overflow: visible;

  * {
    font-family: 'Roboto', sans-serif;
  }
`;

const StyledSpacedOptionFields = styled.div`
  padding: 8px 12px;
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
  ({ theme, addThinBorder, secondaryIconColor, active }) => `
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 2px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;

    svg {
      vertical-align: middle;
      margin: 0 auto;
    }

    ${
      addThinBorder
        ? `border: 0.5px solid ${theme.palette['borders-secondary']};
        padding: 9px 9px;`
        : ''
    };
    color: ${secondaryIconColor ? theme.palette[PC.IconsSecondary] : ''};

    ${
      active &&
      `
      border-radius: 4px;
      border-color: ${theme.palette[PC.AccentStateless]};
      background-color: ${theme.palette[PC.BackgroundActive]};

        * {
          color: ${theme.palette[PC.AccentStateless]};
        }
      `
    }

    :hover {
      background: ${theme.palette['bg-primary-active']};
    }
  `,
);

const StyledIconLabel = styled(Label)`
  color: ${({ theme: { palette } }) => palette[PC.TextPrimary]};
`;

export {
  StyledTwoColumnsContainer,
  StyledColumn,
  StyledIconWrapper,
  StyledSpacedOptionFields,
  StyledOptions,
  StyledOptionPopupContent,
  StyledIconLabel,
};
