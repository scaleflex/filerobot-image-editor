/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Contrast as ContrastIcon } from '@scaleflex/icons/contrast';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const Contrast = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_contrast-tool-button"
    id={TOOLS_IDS.CONTRAST}
    label={t('contrastTool')}
    Icon={ContrastIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

Contrast.defaultProps = {
  isSelected: false,
};

Contrast.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default Contrast;
