/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Modal as LibModal, Button, ModalContent } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { StyledModalTitle, StyledModalActions } from './Modal.styled';

const style = { width: 300 };

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
}) => {
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onDone(e);
    }
  };

  return (
    <LibModal
      className={className}
      open={isOpened}
      onClose={onCancel}
      style={{ ...style, zIndex }}
      onKeyUp={onKeyUp}
    >
      <StyledModalTitle
        icon={<Icon size={25} />}
        iconShadow
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
          style={doneButtonStyle}
          disabled={areButtonsDisabled}
        >
          {doneLabel}
        </Button>
      </StyledModalActions>
    </LibModal>
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
};

export default Modal;
