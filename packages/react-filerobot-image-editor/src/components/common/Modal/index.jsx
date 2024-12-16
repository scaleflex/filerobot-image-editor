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
  doneLabel = 'Yes',
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
      data-testid="FIE-modal-container"
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
    >
      <StyledModalTitle
        data-testid="FIE-modal-title"
        icon={<Icon size={25} />}
        iconShadow
        isWarning={isWarning}
        isError={isError}
        onClose={onCancel}
        primary={title}
        secondary={hint}
        variant="with-icon"
      />
      {children && (
        <ModalContent data-testid="FIE-modal-content">{children}</ModalContent>
      )}
      <StyledModalActions data-testid="FIE-modal-actions" align="center">
        <Button
          data-testid="FIE-modal-cancel-button"
          color={cancelButtonColor}
          onClick={onCancel}
          size="md"
          disabled={areButtonsDisabled}
        >
          {cancelLabel}
        </Button>
        <Button
          data-testid="FIE-modal-confirm-button"
          color={doneButtonColor}
          onClick={onDone}
          size="md"
          warning={isWarning}
          style={doneButtonStyle}
          disabled={areButtonsDisabled}
        >
          {doneLabel}
        </Button>
      </StyledModalActions>
    </StyledModal>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.instanceOf(Object).isRequired,
  onDone: PropTypes.func.isRequired,
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
};

export default Modal;
