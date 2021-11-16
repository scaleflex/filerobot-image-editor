/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Polygon as PolygonIcon } from '@scaleflex/icons';

/** Internal Dependencies */
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
