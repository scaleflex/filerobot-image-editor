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
  theme,
  width,
  height,
  t,
  disableManualResize,
}) => {
  const handleOnClick = (e) =>
    onClick(e, ratio, {
      ratioTitleKey: titleKey,
      width,
      height,
      disableManualResize,
    });

  return (
    <StyledMenuItem active={isActive} onClick={handleOnClick}>
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
};

CropPresetItem.propTypes = {
  titleKey: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  ratio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  disableManualResize: PropTypes.bool,
  theme: PropTypes.instanceOf(Object).isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
};

export default CropPresetItem;
