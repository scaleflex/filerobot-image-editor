/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@scaleflex/ui/core/menu';
import Padding from '@scaleflex/icons/padding';

/** Internal Dependencies */
import restrictNumber from 'utils/restrictNumber';
import {
  StyledSpacedOptionFields,
  StyledIconWrapper,
  StyledOptionPopupContent,
  StyledIconLabel,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import Slider from 'components/common/Slider';
import { Label } from '@scaleflex/ui/core';

const WatermarkPadding = ({ watermark, saveWatermark, t }) => {
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

  const currentPadding = watermark.padding || 0;

  return (
    <>
      <StyledIconWrapper
        className="FIE_watermark-padding-triggerer"
        title={t('padding')}
        onClick={openOptionPopup}
        active={anchorEl}
      >
        <Padding size={20} />
      </StyledIconWrapper>
      <Menu
        className="FIE_watermark-padding-popup"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={closeOptionPopup}
        position="top"
      >
        <StyledOptionPopupContent>
          <Label>{t('padding')}</Label>
          <StyledSpacedOptionFields>
            <Slider
              annotation="px"
              onChange={updatePadding}
              value={currentPadding}
              noMargin
            />
            <StyledIconLabel>{`${currentPadding}px`}</StyledIconLabel>
          </StyledSpacedOptionFields>
        </StyledOptionPopupContent>
      </Menu>
    </>
  );
};

WatermarkPadding.propTypes = {
  watermark: PropTypes.instanceOf(Object).isRequired,
  saveWatermark: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default WatermarkPadding;
