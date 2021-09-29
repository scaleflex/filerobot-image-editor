/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Blur as BlurIcon } from 'components/common/icons';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Blur = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.BLUR}
    label="Blur"
    Icon={BlurIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Blur.defaultProps = {
  isSelected: false,
};

Blur.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Blur;
