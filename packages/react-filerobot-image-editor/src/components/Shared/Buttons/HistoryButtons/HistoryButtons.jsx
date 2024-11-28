/** External Dependencies */
import React from 'react';

/** Internal dependencies */
import { StyledHistoryButtons } from './HistoryButtons.styled';
import RedoButton from './RedoButton';
import ResetButton from './ResetButton';
import UndoButton from './UndoButton';

const HistoryButtons = (props) => (
  <StyledHistoryButtons className="FIE_buttons-history-btns" {...props}>
    <ResetButton />
    <UndoButton />
    <RedoButton />
  </StyledHistoryButtons>
);

export default HistoryButtons;
