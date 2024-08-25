/** External Dependencies */
import Redo from '@scaleflex/icons/redo';

/** Internal Dependencies */
import { useManageHistoryState, useStore } from 'hooks';
import { StyledHistoryButton } from './HistoryButtons.styled';

const RedoButton = (props) => {
  const { t } = useStore();
  const { redo, hasRedo } = useManageHistoryState();

  return (
    <StyledHistoryButton
      className="FIE_buttons-redo-btn"
      color="basic"
      size="sm"
      onClick={hasRedo ? redo : undefined}
      disabled={!hasRedo}
      title={t('redoTitle')}
      {...props}
    >
      <Redo />
    </StyledHistoryButton>
  );
};

export default RedoButton;
