/** External Dependencies */
import styled, { css } from 'styled-components';
import Button from '@scaleflex/ui/core/button';
import Label from '@scaleflex/ui/core/label';
import { Accordion, MenuItem } from '@scaleflex/ui/core';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledToolsBarItemButtonWrapper = styled.div`
  display: flex;
`;

const StyledOpenMenuButton = styled(Button)`
  margin: 0 0 0 6px;
  padding: 0;
`;

const StyledMenuItemIcon = styled.div`
  svg,
  span {
    vertical-align: middle;
  }
`;

const StyledRatioDescription = styled(Label)`
  cursor: pointer;
  ${({ theme: { typography } }) => typography.font[FV.InputSm]}
`;

const StyledMenu = styled.div`
  min-width: 270px;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${({ theme: { palette } }) =>
    palette[PC.BackgroundStateless]};
`;

const StyledMenuItem = styled(MenuItem)`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  align-items: center;
  border-radius: 4px;
  padding: 8px 16px;

  ${({ isAccordion }) => isAccordion && 'padding-left: 22px;'}

  ${({ isListItem }) => isListItem && 'padding: 0;'}
`;

const StyledMenuItemLabel = styled(Label)(
  ({ theme }) => css`
    color: ${theme.palette[PC.TextPrimary]};
    ${theme.typography.font[FV.InputMd]};
  `,
);

const StyledAccordion = styled(Accordion)(
  ({ theme }) => css`
    .SfxAccordionHeader-icon {
      padding-left: 0;
    }

    .SfxAccordionHeader-label {
      ${theme.typography.font[FV.LabelMediumEmphasis]};
      color: ${theme.palette[PC.TextPrimary]};
    }

    .SfxAccordionHeader-root {
      display: flex;
      flex-direction: row-reverse;
      width: fit-content;
      gap: 10px;
    }
  `,
);

export {
  StyledToolsBarItemButtonWrapper,
  StyledOpenMenuButton,
  StyledMenuItemIcon,
  StyledRatioDescription,
  StyledMenu,
  StyledMenuItem,
  StyledMenuItemLabel,
  StyledAccordion,
};
