/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { RotationLeftOutline } from '@scaleflex/icons';

/** Internal Dependencies */
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import { TOOLS_IDS } from 'utils/constants';

const RotateButton = ({ selectTool, isSelected, t }) => (
  <ToolsBarItemButton
    id={TOOLS_IDS.ROTATE}
    label={t('rotateTool')}
    Icon={RotationLeftOutline}
    onClick={selectTool}
    isSelected={isSelected}
  />
);

RotateButton.defaultProps = {
  isSelected: false,
};

RotateButton.propTypes = {
  selectTool: PropTypes.func.isRequired,
  isSelected: PropTypes.bool,
  t: PropTypes.func.isRequired,
};

export default RotateButton;
