/** External Dependencies */
import Undo from '@scaleflex/icons/undo';

/** Internal Dependencies */
import { useManageHistoryState, useStore } from 'hooks';
import { StyledHistoryButton } from './HistoryButtons.styled';

const UndoButton = (props) => {
  const { t, feedback } = useStore();
  const { hasUndo, undo } = useManageHistoryState();
  const isBlockerError = feedback.duration === 0;

  return (
    <StyledHistoryButton
      className="FIE_buttons-undo-btn"
      color="basic"
      size="sm"
      onClick={hasUndo ? undo : undefined}
      disabled={!hasUndo || isBlockerError}
      title={t('undoTitle')}
      {...props}
    >
      <Undo />
    </StyledHistoryButton>
  );
};

export default UndoButton;
