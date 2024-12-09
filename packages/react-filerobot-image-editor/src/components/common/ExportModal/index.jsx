/** External Dependencies */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Success, Error } from '@scaleflex/icons';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

/** Internal Dependencies */
import { useStore } from 'hooks';
import Modal from 'components/common/Modal';
import Spinner from '../Spinner';

const getExportState = (progress, error, t) => {
  const states = {
    completed: {
      title: t('exportCompleted'),
      hint: t('exportCompletedHint'),
      cancelLabel: t('done'),
    },
    error: {
      title: t('exportError'),
      hint: t('exportErrorHint'),
      cancelLabel: t('ok'),
    },
    inProgress: {
      title: t('exportProgress'),
      hint: t('exportProgressHint'),
      cancelLabel: t('cancel'),
    },
  };

  if (progress === 100) return states.completed;
  if (error) return states.error;
  return states.inProgress;
};

const ExportModal = ({ open, progress, onCancel, error }) => {
  const { t, theme } = useStore();

  const { title, hint, cancelLabel } = useMemo(
    () => getExportState(progress, error, t),
    [progress, error, t],
  );

  const renderIcon = useCallback(() => {
    return (
      <>
        {error && <Error size={58} color={theme.palette[PC.Error]} />}
        {progress === 100 && !error && (
          <Success size={58} color={theme.palette[PC.Success]} />
        )}
        {progress < 100 && !error && (
          <Spinner isLoading theme={theme} iconSize={58} showInline>
            {progress}%
          </Spinner>
        )}
      </>
    );
  }, [theme, progress, open, error]);

  return (
    open && (
      <Modal
        title={title}
        hint={hint}
        isOpened={open}
        onCancel={onCancel}
        Icon={renderIcon}
        cancelLabel={cancelLabel}
        width="400px"
        hideShadow
        iconMarginBottom={0}
        iconPadding={12}
        modalActionsStyles={{ padding: '24px 32px 32px 32px' }}
        modalTitleStyles={{ padding: '24px 32px 0 32px' }}
        disableOverlayClick={progress < 100 && !error}
      />
    )
  );
};

ExportModal.propTypes = {
  progress: PropTypes.number,
  open: PropTypes.bool,
  onCancel: PropTypes.func,
  error: PropTypes.string,
};

export default ExportModal;
