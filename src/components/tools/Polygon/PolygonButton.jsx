/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { Polygon as PolygonIcon } from 'components/common/icons';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const PolygonButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.POLYGON}
    label="Polygon"
    Icon={PolygonIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

PolygonButton.defaultProps = {
  isSelected: false,
};

PolygonButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default PolygonButton;
