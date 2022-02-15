/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Temprature as WarmthIcon } from '@scaleflex/icons/tempreture';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Warmth = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_warmth-tool-button"
    id={TOOLS_IDS.WARMTH}
    label={t('warmthTool')}
    Icon={WarmthIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Warmth.defaultProps = {
  isSelected: false,
};

Warmth.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default Warmth;
