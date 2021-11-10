/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Menu, Label } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { Padding } from 'components/common/icons';
import restrictNumber from 'utils/restrictNumber';
import {
  StyledSpacedOptionFields,
  StyledSliderField,
  StyledIconWrapper,
  StyledOptionPopupContent,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';

const WatermarkPadding = ({ watermark, saveWatermark }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const openOptionPopup = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const closeOptionPopup = () => {
    setAnchorEl(null);
  };

  const updatePadding = (newPaddingObj) => {
    saveWatermark({ padding: restrictNumber(newPaddingObj.from, 0, 100) });
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
            <StyledSliderField
              annotation="px"
              isActive={Boolean(currentPadding)}
              onChange={updatePadding}
              value={{ from: currentPadding }}
              step={1}
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
