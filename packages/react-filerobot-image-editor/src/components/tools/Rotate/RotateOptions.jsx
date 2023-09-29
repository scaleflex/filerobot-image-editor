/** External Dependencies */
import React from 'react';
import RotationLeft from '@scaleflex/icons/rotation-left';
import RotationRight from '@scaleflex/icons/rotation-right';
import { Rotate90 } from '@scaleflex/icons';

/** Internal Dependencies */
import { useDebouncedCallback, usePhoneScreen, useStore } from 'hooks';
import { CHANGE_ROTATION, SET_RESIZE } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import getSizeAfterRotation from 'utils/getSizeAfterRotation';
import { TOOLS_IDS } from 'utils/constants';
import ToolsBarItemButton from 'components/ToolsBar/ToolsBarItemButton';
import {
  StyledRotationOptions,
  StyledRotationSlider,
  StyledRotateButton,
} from './Rotate.styled';

const RotateOptions = () => {
  const {
    dispatch,
    adjustments: { rotation = 0 },
    resize = {},
    config,
  } = useStore();
  const rotateConfig = config[TOOLS_IDS.ROTATE];
  const isPhoneScreen = usePhoneScreen();

  const changeRotation = useDebouncedCallback((_e, newRotation) => {
    const rotationAngle = restrictNumber(newRotation, -180, 180);

    dispatch({
      type: CHANGE_ROTATION,
      payload: {
        rotation: rotationAngle,
      },
    });

    if (resize.width && resize.height) {
      const sizeAfterRotation = getSizeAfterRotation(
        resize.width,
        resize.height,
        rotationAngle,
      );
      dispatch({
        type: SET_RESIZE,
        payload: {
          width: sizeAfterRotation.width,
          height: sizeAfterRotation.height,
        },
      });
    }
  }, 20);

  const changeRotationButtonPositive = (e) => {
    const newAngle = rotation + rotateConfig.angle;
    changeRotation(e, newAngle);
  };
  const changeRotationButtonNegative = (e) => {
    const newAngle = rotation - rotateConfig.angle;
    changeRotation(e, newAngle);
  };

  if (rotateConfig.componentType === 'buttons') {
    return (
      <>
        <ToolsBarItemButton
          className="FIE_rotate_button_left"
          id={TOOLS_IDS.IMAGE}
          label={`-${rotateConfig.angle}°`}
          Icon={RotationLeft}
          onClick={changeRotationButtonNegative}
        />
        <ToolsBarItemButton
          className="FIE_rotate_button_right"
          id={TOOLS_IDS.IMAGE}
          label={`+${rotateConfig.angle}°`}
          Icon={RotationRight}
          onClick={changeRotationButtonPositive}
        />
      </>
    );
  }

  return (
    <StyledRotationOptions>
      <StyledRotationSlider
        className="FIE_rotate-slider"
        showCurrentMarkText
        min={-180}
        max={180}
        step={isPhoneScreen ? rotateConfig.angle / 3 : 1}
        value={rotation}
        angle={rotateConfig.angle || 90}
        onChange={changeRotation}
      />
      <StyledRotateButton
        size="sm"
        color="basic"
        onClick={(e) => changeRotation(e, rotation + 90)}
      >
        <Rotate90 width={15} />
      </StyledRotateButton>
    </StyledRotationOptions>
  );
};

export default RotateOptions;
