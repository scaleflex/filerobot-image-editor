import { Modal, ModalActions as SfxModalActions } from '@scaleflex/ui/core';
import styled from 'styled-components';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

const ColorPickerModal = styled(Modal)`
  max-width: 350px;
`;

const ColorPickerWrap = styled.div`
  .SfxColorPicker-root {
    max-width: 100%;
    padding: 0;
    box-shadow: none;
    border: none;
    ${({ hideModalTitle }) => hideModalTitle && 'padding-top: 12px;'}
  }

  .SfxColorPicker-action {
    display: flex;
    gap: 12px;

    .SfxColorPicker-select {
      width: 100px;
    }
    .SfxInput-root {
      width: 190px !important;
    }
  }

  .SfxColorPicker-icon {
    color: ${({ theme: { palette } }) => palette[PC.IconsPrimary]};
  }

  .SfxColorPicker-range-picker,
  .SfxColorPicker-bar-wrapper {
    width: 100%;
  }
`;

const ModalActions = styled(SfxModalActions)`
  gap: 12px;
  padding: 24px;

  .SfxButton-root {
    flex: 1;
    margin: 0;
    height: 40px;
  }
`;

const Styled = {
  ColorPickerModal,
  ColorPickerWrap,
  ModalActions,
};

export default Styled;
