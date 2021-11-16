/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Label } from '@scaleflex/ui/core';
import { Padding } from '@scaleflex/icons';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import {
  StyledSpacedOptionFields,
  StyledIconWrapper,
  StyledOptionPopupContent,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import Slider from 'components/common/Slider';

const WatermarkPadding = ({ watermark, saveWatermark }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openOptionPopup = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeOptionPopup = () => {
    setAnchorEl(null);
  };

  const updatePadding = (newPadding) => {
    saveWatermark({ padding: restrictNumber(newPadding, 0, 100) });
  };

  const currentPadding = watermark.padding;

  return (
    <>
      <StyledIconWrapper title="Padding" onClick={openOptionPopup}>
        <Padding />
      </StyledIconWrapper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeOptionPopup}
        position="top"
      >
        <StyledOptionPopupContent>
          <StyledSpacedOptionFields>
            <Label>Padding</Label>
            <Slider
              annotation="px"
              onChange={updatePadding}
              value={currentPadding}
            />
          </StyledSpacedOptionFields>
        </StyledOptionPopupContent>
      </Menu>
    </>
  );
};

WatermarkPadding.propTypes = {
  watermark: PropTypes.instanceOf(Object).isRequired,
  saveWatermark: PropTypes.func.isRequired,
};

export default WatermarkPadding;
