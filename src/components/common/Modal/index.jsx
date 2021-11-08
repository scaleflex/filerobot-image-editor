/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Modal as LibModal,
  ModalTitle,
  ModalActions,
  Button,
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
}) => {
  return (
    <LibModal open={isOpened} onClose={onCancel} style={style}>
      <ModalTitle
        icon={<Icon size={25} />}
        iconShadow
        primary={title}
        secondary={hint}
        variant="with-icon"
      />
      <ModalActions align="center">
        <Button color="link" onClick={onDone} size="md">
          {doneLabel}
        </Button>
        <Button color="primary" onClick={onCancel} size="md">
          {cancelLabel}
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
};

export default Modal;
