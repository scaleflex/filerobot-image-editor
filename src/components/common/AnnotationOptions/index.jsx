/** External Dependencies */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Menu } from '@scaleflex/ui/core';
import { Transparency, Shadow, Stroke, Position } from '@scaleflex/icons';

/** Internal Dependencies */
import TransparencyField from './TransparencyField';
import StrokeFields from './StrokeFields';
import ShadowFields from './ShadowFields';
import PositionFields from './PositionFields';
import {
  StyledOptionPopupContent,
  StyledOptions,
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
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);
  const options = useMemo(
    () => [
      ...morePoppableOptionsPrepended,
      {
        title: 'Transparency',
        name: POPPABLE_OPTIONS.TRANSPARENCY,
        Icon: Transparency,
      },
      { title: 'Stroke', name: POPPABLE_OPTIONS.STROKE, Icon: Stroke },
      { title: 'Shadow', name: POPPABLE_OPTIONS.SHADOW, Icon: Shadow },
      { title: 'Position', name: POPPABLE_OPTIONS.POSITION, Icon: Position },
    ],
    [morePoppableOptionsPrepended],
  );

  const optionsPopups = useMemo(
    () => ({
      ...moreOptionsPopupComponentsObj,
      [POPPABLE_OPTIONS.TRANSPARENCY]: TransparencyField,
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

  return (
    <StyledOptions>
      {!hideFillOption && (
        <ColorInput color={annotation.fill} onChange={changeAnnotationFill} />
      )}
      {children}
      {options.map(({ title, name, Icon }) => (
        <StyledIconWrapper
          key={name}
          title={title}
          onClick={(e) => toggleOptionPopup(e, name)}
        >
          <Icon size={18} />
        </StyledIconWrapper>
      ))}
      {OptionPopupComponent && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={toggleOptionPopup}
          position="top"
        >
          <StyledOptionPopupContent>
            <OptionPopupComponent
              annotation={annotation}
              updateAnnotation={updateAnnotation}
              {...rest}
            />
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
};

AnnotationOptions.propTypes = {
  children: PropTypes.node,
  hideFillOption: PropTypes.bool,
  morePoppableOptionsPrepended: PropTypes.arrayOf(PropTypes.object),
  morePoppableOptionsAppended: PropTypes.arrayOf(PropTypes.object),
  moreOptionsPopupComponentsObj: PropTypes.instanceOf(Object),
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default AnnotationOptions;
