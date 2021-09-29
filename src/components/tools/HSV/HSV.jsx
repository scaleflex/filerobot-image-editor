/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Saturation as SaturationIcon } from 'components/common/icons';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const HSV = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.HSV}
    label="HSV"
    Icon={SaturationIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

HSV.defaultProps = {
  isSelected: false,
};

HSV.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default HSV;
