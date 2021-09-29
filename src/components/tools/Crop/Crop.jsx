/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Crop as CropIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Crop = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.CROP}
    label="Crop"
    Icon={CropIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Crop.defaultProps = {
  isSelected: false,
};

Crop.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default Crop;
