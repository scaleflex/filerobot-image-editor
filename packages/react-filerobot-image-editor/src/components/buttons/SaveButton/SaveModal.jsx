/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@scaleflex/ui/core/menu-item';
import Label from '@scaleflex/ui/core/label';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';
import Slider from 'components/common/Slider';
import { Resize } from 'components/tools/Resize';
import {
  StyledFileExtensionSelect,
  StyledFileNameInput,
  StyledQualityWrapper,
  StyledResizeOnSave,
  StyledResizeOnSaveLabel,
} from './SaveButton.styled';

const sliderStyle = { marginBottom: 16 };

const SaveModal = ({
  modalProps = {},
  fileInfo,
  icon,
  open,
  isQualityAcceptable,
  supportedTypes = [],
  hideResizeSection,
  onDone,
  onFileNameChange,
  onSelectFileExtension,
  onQualityChange,
  onCancel,
  onResize,
}) => {
  const state = useStore();
  const {
    isLoadingGlobally,
    t,
    config: { removeSaveButton },
  } = state;

  if (removeSaveButton) {
    return null;
  }

  return (
    <Modal
      className="FIE_save-modal"
      title={t('saveAsModalTitle')}
      // eslint-disable-next-line react/no-unstable-nested-components
      Icon={icon}
      isOpened={open}
      onCancel={onCancel}
      onDone={onDone}
      doneLabel={t('save')}
      cancelLabel={t('cancel')}
      doneButtonColor="primary"
      areButtonsDisabled={isLoadingGlobally}
      zIndex={11110}
      {...modalProps}
    >
      <StyledFileNameInput
        className="FIE_save-file-name-input"
        value={fileInfo.name}
        onChange={onFileNameChange}
        size="sm"
        label={t('name')}
        placeholder={t('imageName')}
        error={!fileInfo.name}
        fullWidth
        focusOnMount
      />
      <StyledFileExtensionSelect
        className="FIE_save-extension-selector"
        onChange={onSelectFileExtension}
        value={fileInfo.extension}
        label={t('format')}
        placeholder={t('extension')}
        size="sm"
        fullWidth
      >
        {supportedTypes.map((ext) => (
          <MenuItem key={ext} value={ext}>
            {ext}
          </MenuItem>
        ))}
      </StyledFileExtensionSelect>
      {isQualityAcceptable && (
        <StyledQualityWrapper className="FIE_save-quality-wrapper">
          <Label>{t('quality')}</Label>
          <Slider
            annotation="%"
            min={1}
            max={100}
            onChange={onQualityChange}
            value={parseInt(fileInfo.quality * 100, 10)}
            width="100%"
            style={sliderStyle}
          />
        </StyledQualityWrapper>
      )}
      {!hideResizeSection && (
        <StyledResizeOnSave className="FIE_save-resize-wrapper">
          <StyledResizeOnSaveLabel>{t('resize')}</StyledResizeOnSaveLabel>
          <Resize
            onChange={onResize}
            currentSize={fileInfo?.size || {}}
            hideResetButton
            alignLeft
            alignment="space-between"
          />
        </StyledResizeOnSave>
      )}
    </Modal>
  );
};

SaveModal.propTypes = {
  onSave: PropTypes.func,
  modalProps: PropTypes.instanceOf(Object),
  fileInfo: PropTypes.instanceOf(Object),
  open: PropTypes.bool,
  isQualityAcceptable: PropTypes.bool,
  icon: PropTypes.func,
  supportedTypes: PropTypes.arrayOf(PropTypes.string),
  hideResizeSection: PropTypes.bool,
  onDone: PropTypes.func,
  onFileNameChange: PropTypes.func,
  onSelectFileExtension: PropTypes.func,
  onQualityChange: PropTypes.func,
  onCancel: PropTypes.func,
  onResize: PropTypes.func,
};

export default SaveModal;
