import React from 'react';
import PT from 'prop-types';
import {
  Button,
  ColorPicker,
  ModalContent,
  ModalTitle,
} from '@scaleflex/ui/core';
import ColorPickerIcon from '@scaleflex/icons/color-picker';

import { useStore } from 'hooks';
import Styled from './ColorPickerModal.styled';

const modalStyles = { zIndex: 1301 };

const ColorPickerModal = ({
  hideModalTitle,
  defaultColor = '',
  onChange,
  open,
  pinnedColors,
  onClose,
  onApply,
}) => {
  const { t } = useStore();

  if (!open) {
    return null;
  }

  return (
    <Styled.ColorPickerModal
      onClose={onClose}
      open={open}
      fullWidth
      modalStyles={modalStyles}
    >
      {!hideModalTitle && (
        <ModalTitle
          onClose={onClose}
          primary={t('colorPickerModalTitleLabel', 'Pick color')}
          icon={<ColorPickerIcon size={29} />}
          iconShadow
          variant="with-icon"
        />
      )}

      <ModalContent>
        <Styled.ColorPickerWrap hideModalTitle={hideModalTitle}>
          <ColorPicker
            onChange={onChange}
            pinnedColors={pinnedColors}
            defaultColor={defaultColor}
            showTransparentColor
          />
        </Styled.ColorPickerWrap>
      </ModalContent>

      <Styled.ModalActions>
        <Button color="basic" onClick={onClose}>
          {t('cancel')}
        </Button>
        <Button color="primary" onClick={onApply}>
          {t('apply')}
        </Button>
      </Styled.ModalActions>
    </Styled.ColorPickerModal>
  );
};

ColorPickerModal.defaultProps = {
  defaultColor: '',
  pinnedColors: [],
  onChange: () => {},
  open: false,
  hideModalTitle: false,
  onClose: () => {},
  onApply: () => {},
};

ColorPickerModal.propTypes = {
  defaultColor: PT.string,
  onChange: PT.func,
  open: PT.bool,
  hideModalTitle: PT.bool,
  pinnedColors: PT.arrayOf(PT.string),
  onClose: PT.func,
  onApply: PT.func,
};

export default ColorPickerModal;
