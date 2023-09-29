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
  cancelLabel,
  isOpened,
  doneButtonStyle,
  doneButtonColor = 'basic',
  cancelButtonColor = 'basic',
  children,
  areButtonsDisabled,
  zIndex,
  className,
  width,
  isWarning,
}) => {
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onDone(e);
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
    >
      <StyledModalTitle
        icon={<Icon size={25} />}
        iconShadow
        isWarning={isWarning}
        onClose={onCancel}
        primary={title}
        secondary={hint}
        variant="with-icon"
      />
      {children && <ModalContent>{children}</ModalContent>}
      <StyledModalActions align="center">
        <Button
          color={cancelButtonColor}
          onClick={onCancel}
          size="md"
          disabled={areButtonsDisabled}
        >
          {cancelLabel}
        </Button>
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
      </StyledModalActions>
    </StyledModal>
  );
};

Modal.defaultProps = {
  hint: '',
  isOpened: false,
  doneLabel: 'Yes',
  cancelLabel: 'No',
  doneButtonStyle: undefined,
  doneButtonColor: 'basic',
  cancelButtonColor: 'basic',
  children: undefined,
  areButtonsDisabled: false,
  zIndex: undefined,
  className: undefined,
  width: '',
  isWarning: false,
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
};

export default Modal;
