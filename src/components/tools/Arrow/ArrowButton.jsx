/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { ArrowRightAlt } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const ArrowIcon = () => (
  <ArrowRightAlt style={{ transform: 'rotate(-45deg)' }} />
);

const ArrowButton = ({ selectTool, isSelected }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.ARROW}
    label="Arrow"
    Icon={ArrowIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

ArrowButton.defaultProps = {
  isSelected: false,
};

ArrowButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
};

export default ArrowButton;
