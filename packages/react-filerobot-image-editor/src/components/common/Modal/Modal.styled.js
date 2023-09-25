/** External Dependencies */
import styled from 'styled-components';
import modalTitle from '@scaleflex/ui/core/modal-title';
import { ModalActions } from '@scaleflex/ui/core';

const StyledModalTitle = styled(modalTitle)`
  .SfxModalTitle-LabelPrimary {
    font-size: 14px;
    line-height: 16px;
    font-weight: 500;
  }
`;

const StyledModalActions = styled(ModalActions)`
  gap: 12px;
  padding: 24px;

  .SfxButton-root {
    flex: 1;
    margin: 0;
    height: 40px;
  }
`;

export { StyledModalTitle, StyledModalActions };
