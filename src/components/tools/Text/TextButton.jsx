/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Text as TextIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const TextButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.TEXT}
    label="Text"
    Icon={TextIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

TextButton.defaultProps = {
  isSelected: false,
};

TextButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default TextButton;
