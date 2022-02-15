/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { Annotation as PenIcon } from '@scaleflex/icons/annotation';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const PenButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    className="FIE_pen-tool-button"
    id={TOOLS_IDS.PEN}
    label={t('penTool')}
    Icon={PenIcon}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

PenButton.defaultProps = {
  isSelected: false,
};

PenButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default PenButton;
