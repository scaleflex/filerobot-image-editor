/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { RotationLeft } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const RotateButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.ROTATE}
    label="Rotate"
    Icon={RotationLeft}
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
};

export default RotateButton;
