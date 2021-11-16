/** External Dependencies */
import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlipX as FlipXIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import AppContext from 'context';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { FLIP_DIRECTIONS, TOOLS_IDS } from 'utils/constants';
import { TOGGLE_FLIP } from 'actions';

const xFlipReverseSideStyle = {
  transform: 'scaleX(-1)',
};

const FlipX = ({ selectTool, isSelected }) => {
  const {
    dispatch,
    adjustments: { isFlippedX },
  } = useContext(AppContext);

  const { reverseLabelOfCurrXFlipDir, reverseIconOfCurrXFlipDir } = useMemo(
    () => ({
      reverseLabelOfCurrXFlipDir: isFlippedX ? 'Un-Flip X' : 'Flip X',
      reverseIconOfCurrXFlipDir: () => (
        <FlipXIcon style={isFlippedX ? xFlipReverseSideStyle : undefined} />
      ),
    }),
    [isFlippedX],
  );

  const toggleFlipX = useCallback(() => {
    dispatch({
      type: TOGGLE_FLIP,
      payload: {
        direction: FLIP_DIRECTIONS.X,
      },
    });
  }, []);

  const handleButtonClick = useCallback((flipXToolId) => {
    selectTool(flipXToolId);
    toggleFlipX();
  }, []);

  return (
    <ToolsBarItemButton
      id={TOOLS_IDS.FLIP_X}
      label={reverseLabelOfCurrXFlipDir}
      Icon={reverseIconOfCurrXFlipDir}
      onClick={handleButtonClick}
      isSelected={isSelected}
    />
  );
};

FlipX.defaultProps = {
  isSelected: false,
};

FlipX.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default FlipX;
