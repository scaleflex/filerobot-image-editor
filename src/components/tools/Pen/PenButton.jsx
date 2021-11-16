/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Annotation as PenIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const PenButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.PEN}
    label="Pen"
    Icon={PenIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

PenButton.defaultProps = {
  isSelected: false,
};

PenButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default PenButton;
