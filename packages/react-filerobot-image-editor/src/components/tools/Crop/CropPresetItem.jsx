/** External Dependeices */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependeices */
import {
  StyledMenuItemIcon,
  StyledMenuItem,
  StyledRatioDescription,
  StyledMenuItemLabel,
} from './Crop.styled';

const CropPresetItem = ({
  titleKey,
  description,
  ratio,
  onClick,
  Icon,
  isActive,
  isAccordion,
  theme,
  width,
  height,
  t,
  disableManualResize,
  noEffect,
}) => {
  const handleOnClick = (e) =>
    onClick(e, ratio, {
      ratioTitleKey: titleKey,
      width,
      height,
      disableManualResize,
      noEffect,
    });

  return (
    <StyledMenuItem
      active={isActive}
      onClick={handleOnClick}
      isAccordion={isAccordion}
    >
      {Icon && (
        <StyledMenuItemIcon>
          {typeof Icon === 'string' ? (
            // eslint-disable-next-line react/no-danger
            <span dangerouslySetInnerHTML={{ __html: Icon }} />
          ) : (
            <Icon color={theme.palette['icon-primary']} />
          )}
        </StyledMenuItemIcon>
      )}

      <StyledMenuItemLabel>{t(titleKey)}</StyledMenuItemLabel>

      {description && (
        <StyledRatioDescription>{description}</StyledRatioDescription>
      )}
    </StyledMenuItem>
  );
};

CropPresetItem.defaultProps = {
  Icon: undefined,
  width: undefined,
  height: undefined,
  disableManualResize: false,
  isAccordion: false,
  noEffect: false,
};

CropPresetItem.propTypes = {
  titleKey: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disableManualResize: PropTypes.bool,
  isAccordion: PropTypes.bool,
  theme: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
  noEffect: PropTypes.bool,
};

export default CropPresetItem;
