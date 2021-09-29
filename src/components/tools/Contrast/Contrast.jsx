/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Contrast as ContrastIcon } from 'components/common/icons';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Contrast = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.CONTRAST}
    label="Contrast"
    Icon={ContrastIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Contrast.defaultProps = {
  isSelected: false,
};

Contrast.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Contrast;
