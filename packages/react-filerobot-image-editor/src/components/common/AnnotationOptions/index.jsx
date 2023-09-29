/** External Dependencies */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { usePhoneScreen, useStore } from 'hooks';
import { Label } from '@scaleflex/ui/core';
import Menu from '@scaleflex/ui/core/menu';
import Transparency from '@scaleflex/icons/transparency';
import Shadow from '@scaleflex/icons/shadow';
import Stroke from '@scaleflex/icons/stroke';
import Position from '@scaleflex/icons/position';

/** Internal Dependencies */
import OpacityField from './OpacityField';
import StrokeFields from './StrokeFields';
import ShadowFields from './ShadowFields';
import PositionFields from './PositionFields';
import {
  StyledOptionPopupContent,
  StyledOptions,
  StyledOptionsWrapper,
  StyledIconWrapper,
} from './AnnotationOptions.styled';
import { POPPABLE_OPTIONS } from './AnnotationOptions.constants';
import ColorInput from '../ColorInput';

const AnnotationOptions = ({
  children,
  morePoppableOptionsPrepended,
  moreOptionsPopupComponentsObj,
  morePoppableOptionsAppended,
  annotation,
  updateAnnotation,
  hideFillOption,
  hidePositionField,
  className,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);
  const {
    config: { useCloudimage },
    t,
  } = useStore();

  const isPhoneScreen = usePhoneScreen(320);

  const options = useMemo(
    () => [
      ...morePoppableOptionsPrepended,
      {
        titleKey: 'opacity',
        name: POPPABLE_OPTIONS.OPACITY,
        Icon: Transparency,
      },
      ...(!useCloudimage
        ? [
            { titleKey: 'stroke', name: POPPABLE_OPTIONS.STROKE, Icon: Stroke },
            { titleKey: 'shadow', name: POPPABLE_OPTIONS.SHADOW, Icon: Shadow },
          ]
        : []),
      !hidePositionField
        ? {
            titleKey: 'position',
            name: POPPABLE_OPTIONS.POSITION,
            Icon: Position,
          }
        : undefined,
    ],
    [morePoppableOptionsPrepended],
  );

  const optionsPopups = useMemo(
    () => ({
      ...moreOptionsPopupComponentsObj,
      [POPPABLE_OPTIONS.OPACITY]: OpacityField,
      [POPPABLE_OPTIONS.STROKE]: StrokeFields,
      [POPPABLE_OPTIONS.SHADOW]: ShadowFields,
      [POPPABLE_OPTIONS.POSITION]: PositionFields,
      ...morePoppableOptionsAppended,
    }),
    [moreOptionsPopupComponentsObj],
  );

  const toggleOptionPopup = useCallback((e, targetOptionName) => {
    const targetAnchorEl = e?.currentTarget;
    setAnchorEl(targetAnchorEl);
    setCurrentOption(targetOptionName);
  }, []);

  const changeAnnotationFill = useCallback(
    (newFill) => {
      updateAnnotation({ fill: newFill });
    },
    [updateAnnotation],
  );

  const OptionPopupComponent =
    anchorEl && currentOption && optionsPopups[currentOption];

  const renderPositionFields = () => (
    <>
      <Label>{t('position')}</Label>
      <StyledOptionPopupContent position>
        <OptionPopupComponent
          annotation={annotation}
          updateAnnotation={updateAnnotation}
          {...rest}
        />
      </StyledOptionPopupContent>
    </>
  );

  return (
    <StyledOptions
      className={`FIE_annotations-options${className ? ` ${className}` : ''}`}
      isPhoneScreen={isPhoneScreen}
    >
      {!hideFillOption && (
        <ColorInput
          color={annotation.fill}
          onChange={changeAnnotationFill}
          colorFor="fill"
        />
      )}

      {children}

      <StyledOptionsWrapper>
        {options.map(
          (option) =>
            option && (
              <StyledIconWrapper
                className="FIE_annotation-option-triggerer"
                key={option.name}
                title={t(option.titleKey)}
                onClick={(e) => toggleOptionPopup(e, option.name)}
                active={currentOption === option.name}
              >
                <option.Icon size={20} />
              </StyledIconWrapper>
            ),
        )}
      </StyledOptionsWrapper>

      {OptionPopupComponent && (
        <Menu
          className="FIE_annotation-option-popup"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={toggleOptionPopup}
          position="top"
        >
          <StyledOptionPopupContent>
            {currentOption === POPPABLE_OPTIONS.POSITION ? (
              renderPositionFields()
            ) : (
              <OptionPopupComponent
                annotation={annotation}
                updateAnnotation={updateAnnotation}
                {...rest}
              />
            )}
          </StyledOptionPopupContent>
        </Menu>
      )}
    </StyledOptions>
  );
};

AnnotationOptions.defaultProps = {
  children: undefined,
  morePoppableOptionsPrepended: [],
  moreOptionsPopupComponentsObj: {},
  morePoppableOptionsAppended: [],
  hideFillOption: false,
  hidePositionField: false,
  className: undefined,
};

AnnotationOptions.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  children: PropTypes.node,
  hideFillOption: PropTypes.bool,
  morePoppableOptionsPrepended: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  morePoppableOptionsAppended: PropTypes.arrayOf(PropTypes.instanceOf(Object)),
  moreOptionsPopupComponentsObj: PropTypes.instanceOf(Object),
  hidePositionField: PropTypes.bool,
  className: PropTypes.string,
};

export default AnnotationOptions;
