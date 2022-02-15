/** External Dependencies */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlipY as FlipYIcon } from '@scaleflex/icons/flip-y';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { FLIP_DIRECTIONS, TOOLS_IDS } from 'utils/constants';
import { TOGGLE_FLIP } from 'actions';
import { useStore } from 'hooks';

const xFlipReverseSideStyle = {
  transform: 'scaleY(-1)',
};

const FlipY = ({ selectTool, isSelected, t }) => {
  const {
    dispatch,
    adjustments: { isFlippedY },
  } = useStore();

  const { reverseLabelOfCurrXFlipDir, reverseIconOfCurrXFlipDir } = useMemo(
    () => ({
      reverseLabelOfCurrXFlipDir: isFlippedY ? t('unFlipY') : t('flipY'),
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

  const handleButtonClick = useCallback((flipYToolId) => {
    selectTool(flipYToolId);
    toggleFlipY();
  }, []);

  return (
    <ToolsBarItemButton
      className="FIE_flip-y-tool-button"
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
  t: PropTypes.func.isRequired,
};

export default FlipY;
