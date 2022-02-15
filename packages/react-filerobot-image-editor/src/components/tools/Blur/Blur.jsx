/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Blur as BlurIcon } from '@scaleflex/icons/blur';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Blur = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_blur-tool-button"
    id={TOOLS_IDS.BLUR}
    label={t('blurTool')}
    Icon={BlurIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Blur.defaultProps = {
  isSelected: false,
};

Blur.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default Blur;
