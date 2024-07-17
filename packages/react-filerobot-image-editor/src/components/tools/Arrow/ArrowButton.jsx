/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowTool as ArrowIcon } from '@scaleflex/icons/arrow-tool';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const ArrowButton = ({ selectTool, isSelected = false, t }) => (
  <ToolsBarItemButton
    className="FIE_arrow-tool-button"
    id={TOOLS_IDS.ARROW}
    label={t('arrowTool')}
    Icon={ArrowIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

ArrowButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default ArrowButton;
