/** External Dependencies */
import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { FlipX as FlipXIcon } from '@scaleflex/icons/flip-x';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { FLIP_DIRECTIONS, TOOLS_IDS } from 'utils/constants';
import { TOGGLE_FLIP } from 'actions';
import { useStore } from 'hooks';

const xFlipReverseSideStyle = {
  transform: 'scaleX(-1)',
};

const FlipX = ({ selectTool, isSelected, t }) => {
  const {
    dispatch,
    adjustments: { isFlippedX },
  } = useStore();

  const { reverseLabelOfCurrXFlipDir, reverseIconOfCurrXFlipDir } = useMemo(
    () => ({
      reverseLabelOfCurrXFlipDir: isFlippedX ? t('unFlipX') : t('flipX'),
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
      className="FIE_flip-x-tool-button"
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
  t: PropTypes.func.isRequired,
};

export default FlipX;
