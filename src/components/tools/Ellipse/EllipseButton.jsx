/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Ellipse as EllipseIcon } from 'components/common/icons';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const EllipseButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.ELLIPSE}
    label="Ellipse"
    Icon={EllipseIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

EllipseButton.defaultProps = {
  isSelected: false,
};

EllipseButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default EllipseButton;
