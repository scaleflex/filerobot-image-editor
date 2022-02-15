/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { RotationLeftOutline as RotateIcon } from '@scaleflex/icons/rotation-left-outline';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const RotateButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_rotate-tool-button"
    id={TOOLS_IDS.ROTATE}
    label={t('rotateTool')}
    Icon={RotateIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

RotateButton.defaultProps = {
  isSelected: false,
};

RotateButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default RotateButton;
