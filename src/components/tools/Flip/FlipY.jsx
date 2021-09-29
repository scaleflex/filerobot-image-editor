/** External Dependencies */
import React, { useCallback, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import AppContext from 'context';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { FlipY as FlipYIcon } from 'components/common/icons';
import { FLIP_DIRECTIONS, TOOLS_IDS } from 'utils/constants';
import { TOGGLE_FLIP } from 'actions';

const xFlipReverseSideStyle = {
  transform: 'scaleY(-1)',
};

const FlipY = ({ selectTool, isSelected }) => {
  const {
    dispatch,
    adjustments: {
      isFlippedY,
    },
  } = useContext(AppContext);

  const {
    reverseLabelOfCurrXFlipDir,
    reverseIconOfCurrXFlipDir,
  } = useMemo(
    () => ({
      reverseLabelOfCurrXFlipDir: isFlippedY ? 'Un-Flip Y' : 'Flip Y',
      reverseIconOfCurrXFlipDir: () => (
        <FlipYIcon style={isFlippedY ? xFlipReverseSideStyle : undefined} />
      ),
    }),
    [isFlippedY],
  );

  const toggleFlipY = useCallback(() => {
    dispatch({
      type: TOGGLE_FLIP,
      payload: {
        direction: FLIP_DIRECTIONS.Y,
      },
    });
  }, []);

  const handleButtonClick = useCallback(
    (flipYToolId) => {
      selectTool(flipYToolId);
      toggleFlipY();
    },
    [],
  );

  return (
    <ToolsBarItemButton
      id={TOOLS_IDS.FLIP_Y}
      label={reverseLabelOfCurrXFlipDir}
      Icon={reverseIconOfCurrXFlipDir}
      onClick={handleButtonClick}
      isSelected={isSelected}
    />
  );
};

FlipY.defaultProps = {
  isSelected: false,
};

FlipY.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default FlipY;
