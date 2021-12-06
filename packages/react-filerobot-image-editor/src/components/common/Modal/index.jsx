/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as LibModal,
  ModalTitle,
  ModalActions,
  Button,
  ModalContent,
} from '@scaleflex/ui/core';

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
  doneButtonColor = 'link',
  cancelButtonColor = 'link',
  children,
}) => {
  const onKeyUp = (e) => {
    if (e.key === 'Enter') {
      onDone(e);
    }
  };

  return (
    <LibModal
      open={isOpened}
      onClose={onCancel}
      style={style}
      onKeyUp={onKeyUp}
    >
      <ModalTitle
        icon={<Icon size={25} />}
        iconShadow
        primary={title}
        secondary={hint}
        variant="with-icon"
      />
      {children && <ModalContent>{children}</ModalContent>}
      <ModalActions align="center">
        <Button color={cancelButtonColor} onClick={onCancel} size="md">
          {cancelLabel}
        </Button>
        <Button
          color={doneButtonColor}
          onClick={onDone}
          size="md"
          style={doneButtonStyle}
        >
          {doneLabel}
        </Button>
      </ModalActions>
    </LibModal>
  );
};

Modal.defaultProps = {
  hint: '',
  isOpened: false,
  doneLabel: 'Yes',
  cancelLabel: 'No',
  doneButtonStyle: undefined,
  doneButtonColor: 'link',
  cancelButtonColor: 'link',
  children: undefined,
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
};

export default Modal;
