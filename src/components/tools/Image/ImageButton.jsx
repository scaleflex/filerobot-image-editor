/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Image as ImageIcon } from 'components/common/icons';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const ImageButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.IMAGE}
    label="Image"
    Icon={ImageIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

ImageButton.defaultProps = {
  isSelected: false,
};

ImageButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default ImageButton;
