/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Temprature as WarmthIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Warmth = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.WARMTH}
    label="Warmth"
    Icon={WarmthIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Warmth.defaultProps = {
  isSelected: false,
};

Warmth.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Warmth;
