/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Polygon as PolygonIcon } from '@scaleflex/icons/polygon';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const PolygonButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_polygon-tool-button"
    id={TOOLS_IDS.POLYGON}
    label={t('polygonTool')}
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
  t: PropTypes.func.isRequired,
};

export default PolygonButton;
