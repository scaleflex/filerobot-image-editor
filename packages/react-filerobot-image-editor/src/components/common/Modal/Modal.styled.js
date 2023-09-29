/** External Dependencies */
import styled, { css } from 'styled-components';
import modalTitle from '@scaleflex/ui/core/modal-title';
import { Modal, ModalActions } from '@scaleflex/ui/core';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledModal = styled(Modal)`
  width: ${({ width }) => width || '300px'};
  max-width: unset;
`;

const StyledModalTitle = styled(modalTitle)(
  ({ theme, isWarning }) => css`
    padding-bottom: 0;

    .SfxModalTitle-Icon {
      background-color: ${isWarning && theme.palette[PC.Orange_0_1_Overlay]};
    }

    .SfxModalTitle-LabelPrimary {
      margin-bottom: 24px;
      ${theme.typography.font[FV.TitleH3]};
    }

    .SfxModalTitle-LabelSecondary {
      ${theme.typography.font[FV.TextLarge]};
      text-align: center;
    }
  `,
);

const StyledModalActions = styled(ModalActions)`
  gap: 12px;
  padding: 24px;

  .SfxButton-root {
    flex: 1;
    margin: 0;
    height: 40px;
  }
`;

export { StyledModal, StyledModalTitle, StyledModalActions };
