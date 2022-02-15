/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Ellipse as EllipseIcon } from '@scaleflex/icons/ellipse';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const EllipseButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_ellipse-tool-button"
    id={TOOLS_IDS.ELLIPSE}
    label={t('ellipseTool')}
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
  t: PropTypes.func.isRequired,
};

export default EllipseButton;
