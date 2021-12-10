/** External Dependencies */
import React, { useCallback, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Menu from '@scaleflex/ui/core/menu';
import Transparency from '@scaleflex/icons/transparency';
import Shadow from '@scaleflex/icons/shadow';
import Stroke from '@scaleflex/icons/stroke';
import Position from '@scaleflex/icons/position';

/** Internal Dependencies */
import { useStore } from 'hooks';
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
  hidePositionField,
  ...rest
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentOption, setCurrentOption] = useState(null);
  const {
    config: { useCloudimage },
  } = useStore();
  const options = useMemo(
    () => [
      ...morePoppableOptionsPrepended,
      {
        title: 'Transparency',
        name: POPPABLE_OPTIONS.TRANSPARENCY,
        Icon: Transparency,
      },
      ...(!useCloudimage
        ? [
            { title: 'Stroke', name: POPPABLE_OPTIONS.STROKE, Icon: Stroke },
            { title: 'Shadow', name: POPPABLE_OPTIONS.SHADOW, Icon: Shadow },
          ]
        : []),
      !hidePositionField
        ? {
            title: 'Position',
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
      {options.map(
        (option) =>
          option && (
            <StyledIconWrapper
              key={option.name}
              title={option.title}
              onClick={(e) => toggleOptionPopup(e, option.name)}
            >
              <option.Icon size={18} />
            </StyledIconWrapper>
          ),
      )}
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
  hidePositionField: false,
};

AnnotationOptions.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
  children: PropTypes.node,
  hideFillOption: PropTypes.bool,
  morePoppableOptionsPrepended: PropTypes.arrayOf(PropTypes.object),
  morePoppableOptionsAppended: PropTypes.arrayOf(PropTypes.object),
  moreOptionsPopupComponentsObj: PropTypes.instanceOf(Object),
  hidePositionField: PropTypes.bool,
};

export default AnnotationOptions;
