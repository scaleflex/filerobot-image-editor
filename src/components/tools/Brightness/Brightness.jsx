/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Brightness as BrightnessIcon } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Brightness = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.BRIGHTNESS}
    label={t('brightnessTool')}
    Icon={BrightnessIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Brightness.defaultProps = {
  isSelected: false,
};

Brightness.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default Brightness;
