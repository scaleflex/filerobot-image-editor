/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Button, ModalContent } from '@scaleflex/ui/core';

/** Internal Dependencies */
import {
  StyledModal,
  StyledModalTitle,
  StyledModalActions,
} from './Modal.styled';

const Modal = ({
  title,
  hint,
  Icon,
  onDone,
  onCancel,
  doneLabel,
  cancelLabel = 'No',
  isOpened = false,
  doneButtonStyle,
  doneButtonColor = 'basic',
  cancelButtonColor = 'basic',
  children,
  areButtonsDisabled = false,
  zIndex,
  className,
  width,
  isWarning = false,
  isError = false,
  hideShadow = false,
  iconMarginBottom,
  iconPadding,
  disableOverlayClick = false,
  modalActionsStyles,
  modalTitleStyles,
}) => {
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.stopPropagation();
      onDone(e);
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      onCancel(e);
    }
  };

  return (
    <StyledModal
      className={className}
      open={isOpened}
      onClose={onCancel}
      style={{ zIndex }}
      onKeyUp={onKeyUp}
      width={width}
      role="dialog"
      tabIndex={-1}
      aria-modal="true"
      aria-label={title}
      disableOverlayClick={disableOverlayClick}
    >
      <StyledModalTitle
        icon={<Icon size={25} />}
        iconShadow
        hideShadow={hideShadow}
        isWarning={isWarning}
        isError={isError}
        onClose={onCancel}
        primary={title}
        secondary={hint}
        variant="with-icon"
        iconMarginBottom={iconMarginBottom}
        iconPadding={iconPadding}
        style={modalTitleStyles}
      />
      {children && <ModalContent>{children}</ModalContent>}
      <StyledModalActions align="center" style={modalActionsStyles}>
        <Button
          color={cancelButtonColor}
          onClick={onCancel}
          size="md"
          disabled={areButtonsDisabled}
        >
          {cancelLabel}
        </Button>
        {doneLabel && (
          <Button
            color={doneButtonColor}
            onClick={onDone}
            size="md"
            warning={isWarning}
            style={doneButtonStyle}
            disabled={areButtonsDisabled}
          >
            {doneLabel}
          </Button>
        )}
      </StyledModalActions>
    </StyledModal>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.instanceOf(Object).isRequired,
  onDone: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  hint: PropTypes.string,
  isOpened: PropTypes.bool,
  doneLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  doneButtonStyle: PropTypes.instanceOf(Object),
  doneButtonColor: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  children: PropTypes.node,
  areButtonsDisabled: PropTypes.bool,
  zIndex: PropTypes.number,
  className: PropTypes.string,
  width: PropTypes.string,
  isWarning: PropTypes.bool,
  isError: PropTypes.bool,
  hideShadow: PropTypes.bool,
  iconMarginBottom: PropTypes.number,
  iconPadding: PropTypes.number,
  disableOverlayClick: PropTypes.bool,
  modalActionsStyles: PropTypes.instanceOf(Object),
  modalTitleStyles: PropTypes.instanceOf(Object),
};

export default Modal;
