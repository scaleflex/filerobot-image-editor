/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { RotationLeft } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Rotate = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.ROTATE}
    label="Rotate"
    Icon={RotationLeft}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Rotate.defaultProps = {
  isSelected: false,
};

Rotate.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Rotate;
