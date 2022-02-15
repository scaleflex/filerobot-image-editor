/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import Line from '@scaleflex/icons/line';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const LineButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_line-tool-button"
    id={TOOLS_IDS.LINE}
    label={t('lineTool')}
    Icon={Line}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

LineButton.defaultProps = {
  isSelected: false,
};

LineButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default LineButton;
