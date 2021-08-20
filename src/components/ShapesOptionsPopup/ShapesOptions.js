import React, { useContext, useMemo, useState } from 'react';
import {
  Accordion, Arrow, IconButton, InputGroup, Label, MenuItem, SelectGroup, SwitcherGroup,
} from '@scaleflex/ui/core';
import { Minus } from '@scaleflex/icons';

import Context from '../../context';
import { DEFAULT_FONTS, SHAPES_NAMES } from '../../utils/constants';
import { OptionsWrapper, OptionInputWrapper, OptionInput } from './ShapesOptionsPopup.styled';
import capitalize from '../../utils/capitalize';
import { getAlignmentBaseValX, getAlignmentBaseValY } from './getShapeAlignmentBase';

const accordionHeaderStyle = { marginTop: 4, marginBottom: 6 };
const accordionDetailStyle = { marginTop: 8, marginBottom: 8 };

// TODO: Make options container resizable, opacity changing, movable and have cancel button.
// TODO: Split this component into sub components and imprvoe them with adding more options if available.
// TODO: Make freehand options applying more faster by making it non-blocking for the UI.
const ShapesOptions = ({ fontFamilies = DEFAULT_FONTS }) => {
  const { designLayer, selections = [] } = useContext(Context);
  const [showGeneralOptions, setShowGeneralOptions] = useState(true);
  const [showShadowOptions, setShowShadowOptions] = useState(true);
  const [showAlignmentOptions, setShowAlignmentOptions] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(true);
  const [reRenderVal, reRender] = useState(false); // for re-rendering the chosen font family/style.

  const { designLayerWidth, designLayerHeight } = useMemo(() => ({
    designLayerWidth: designLayer?.getWidth(),
    designLayerHeight: designLayer?.getHeight(),
  }), [designLayer]);
  const doesShapeNeed = useMemo(
    () => {
      const selectedShapeName = selections[0].name();
      const isPolygon = SHAPES_NAMES.POLYGON === selectedShapeName;
      const isArrow = SHAPES_NAMES.ARROW === selectedShapeName;
      const isFreehand = SHAPES_NAMES.FREEHAND === selectedShapeName;

      return ({
        cornerRadiusOnly: SHAPES_NAMES.RECT === selectedShapeName,
        sides: isPolygon,
        radius: isPolygon || SHAPES_NAMES.CIRCLE === selectedShapeName,
        radiusXY: SHAPES_NAMES.ELLIPSE === selectedShapeName,
        textOptions: SHAPES_NAMES.TEXT === selectedShapeName,
        lineOptions: isFreehand || SHAPES_NAMES.LINE === selectedShapeName,
        arrowOptions: isArrow,
        freehandOptions: isFreehand,
        imageOptions: SHAPES_NAMES.IMAGE === selectedShapeName,
      });
    }, [selections],
  );
  const selectedShape = doesShapeNeed.freehandOptions ? selections[0].children[0] : selections[0];
  const siblingsLength = useMemo(() => +((designLayer.children.length || 1) - 1), [designLayer]); // -1 since transformer considered layer

  const dontShowMoreOptionsSection = doesShapeNeed.cornerRadiusOnly
    || doesShapeNeed.freehandOptions
    || doesShapeNeed.imageOptions;

  const applyOptionChangeToFreehand = (name, value) => new Promise((resolve, reject) => {
    selections[0].children.forEach((freehandLine) => {
      freehandLine.setAttr(name, value);
    });
    resolve();
  });

  const changeOption = (event) => {
    let { value } = event.target;

    if (event.target.min && value < +event.target.min) {
      value = event.target.min;
    } else if (event.target.max && value > +event.target.max) {
      value = event.target.max;
    }

    value = event.target.min || event.target.max
      ? +value
      : value;

    if (doesShapeNeed.freehandOptions) {
      applyOptionChangeToFreehand(event.target.name, value);
    } else {
      selectedShape.setAttr(event.target.name, value);
    }
  };

  const changeShapeAlignment = (alignmentDir) => {
    switch (alignmentDir) {
      case 'left':
        selectedShape.x(getAlignmentBaseValX(selectedShape));
        break;
      case 'center':
        selectedShape.x(
          (designLayerWidth / 2) - (
            (selectedShape.width() / 2) - getAlignmentBaseValX(selectedShape)
          ),
        );
        break;
      case 'right':
        selectedShape.x(
          designLayerWidth - (
            selectedShape.width() - getAlignmentBaseValX(selectedShape)
          ),
        );
        break;
      case 'top':
        selectedShape.y(getAlignmentBaseValY(selectedShape));
        break;
      case 'middle':
        selectedShape.y(
          (designLayerHeight / 2) - (
            (selectedShape.height() / 2) - getAlignmentBaseValY(selectedShape)
          ),
        );
        break;
      case 'bottom':
        selectedShape.y(
          designLayerHeight - (
            selectedShape.height() - getAlignmentBaseValY(selectedShape)
          ),
        );
        break;
      default:
        break;
    }
  };

  const changeFontFamily = (fontFamily) => {
    selectedShape.fontFamily(fontFamily);
    reRender(!reRenderVal);
  };

  const changeFontStyle = (fontStyle) => {
    selectedShape.fontStyle(fontStyle);
    reRender(!reRenderVal);
  };

  const changeTextAlignment = (isVerticalAlign, alignmentDirection) => {
    if (isVerticalAlign) {
      selectedShape.verticalAlign(alignmentDirection);
    } else {
      selectedShape.align(alignmentDirection);
    }
    reRender(!reRenderVal);
  };

  const changeTextDecoration = (value) => {
    selectedShape.textDecoration(value);
    reRender(!reRenderVal);
  };

  const changeLineCap = (value) => {
    selectedShape.lineCap(value);
    reRender(!reRenderVal);
  };

  const toggleLineDashing = (event) => {
    selectedShape.dashEnabled(event.target.checked);
    reRender(!reRenderVal);
  };

  const togglePointer = (event) => {
    selectedShape[event.target.name](event.target.checked);
    reRender(!reRenderVal);
  };

  const renderOptions = () => (
    <>
      <Accordion
        expanded={showGeneralOptions}
        label="General options"
        headerStyle={accordionHeaderStyle}
        detailStyle={accordionDetailStyle}
        onChange={setShowGeneralOptions}
      >
        <OptionsWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-transparency' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-transparency' }}
              label="Transparency"
              onChange={changeOption}
              name="opacity"
              type="input"
              defaultValue={+selectedShape.opacity() ?? 1}
              min={0}
              step={0.1}
              max={1}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-order' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-order' }}
              label="Order"
              onChange={changeOption}
              name="zIndex"
              type="input"
              defaultValue={+selectedShape.zIndex() ?? 1}
              min={1}
              step={1}
              max={siblingsLength}
              maxWidth={80}
            />
          </OptionInputWrapper>
          {doesShapeNeed.cornerRadiusOnly && (
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-corner-radius' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-corner-radius' }}
                label="Round corners"
                onChange={changeOption}
                name="cornerRadius"
                type="input"
                defaultValue={+selectedShape.cornerRadius() ?? 0}
                min={0}
                max={100}
                maxWidth={66}
              />
            </OptionInputWrapper>
          )}
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-stroke-width' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-stroke-width' }}
              label="Stroke size"
              onChange={changeOption}
              name="strokeWidth"
              type="input"
              defaultValue={+selectedShape.strokeWidth() ?? 0}
              min={doesShapeNeed.lineOptions || doesShapeNeed.arrowOptions ? 1 : 0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          {!(doesShapeNeed.lineOptions || doesShapeNeed.imageOptions) && (
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'color', id: 'filerobot-image-editor_shape-fill' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-fill' }}
                label="Fill color"
                onChange={changeOption}
                name="fill"
                type="input"
                defaultValue={selectedShape.fill()}
                maxWidth={50}
                noBorder
                noPadding
                noOutline
                pointerCursor
              />
            </OptionInputWrapper>
          )}
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'color', id: 'filerobot-image-editor_shape-stroke-color' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-stroke-color' }}
              label="Stroke color"
              onChange={changeOption}
              name="stroke"
              type="input"
              defaultValue={selectedShape.stroke() ?? '#000000'}
              maxWidth={64}
              noBorder
              noPadding
              noOutline
              pointerCursor
            />
          </OptionInputWrapper>
        </OptionsWrapper>
      </Accordion>
      <Accordion
        expanded={showShadowOptions}
        label="Shadow options"
        onChange={setShowShadowOptions}
        headerStyle={accordionHeaderStyle}
        detailStyle={accordionDetailStyle}
      >
        <OptionsWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-shadow-offset-x' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-offset-x' }}
              label="Horizontal"
              onChange={changeOption}
              name="shadowOffsetX"
              type="input"
              defaultValue={+selectedShape.shadowOffsetX() ?? 0}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-shadow-offset-y' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-offset-y' }}
              label="Vertical"
              onChange={changeOption}
              name="shadowOffsetY"
              type="input"
              defaultValue={+selectedShape.shadowOffsetY() ?? 0}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-shadow-blurriness' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-blurriness' }}
              label="Blurriness"
              onChange={changeOption}
              name="shadowBlur"
              type="input"
              defaultValue={+selectedShape.shadowBlur() ?? 0}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-shadow-transparency' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-transparency' }}
              label="Transparency"
              onChange={changeOption}
              name="shadowOpacity"
              type="input"
              defaultValue={+selectedShape.shadowOpacity() ?? 1}
              min={0}
              step={0.1}
              max={1}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'color', id: 'filerobot-image-editor_shape-shadow-color' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-color' }}
              label="Color"
              onChange={changeOption}
              name="shadowColor"
              type="input"
              defaultValue={selectedShape.shadowColor() ?? '#000000'}
              maxWidth={64}
              noBorder
              noPadding
              noOutline
              pointerCursor
            />
          </OptionInputWrapper>
        </OptionsWrapper>
      </Accordion>
      {!doesShapeNeed.freehandOptions && (
        <Accordion
          expanded={showAlignmentOptions}
          label="Alignment options"
          onChange={setShowAlignmentOptions}
          headerStyle={accordionHeaderStyle}
          detailStyle={accordionDetailStyle}
        >
          <OptionsWrapper>
            <OptionInputWrapper>
              <Label>
                Horizontal
              </Label>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeShapeAlignment('left')}
              >
                <Arrow size={12} type="left" />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeShapeAlignment('center')}
              >
                <Minus size={12} />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeShapeAlignment('right')}
              >
                <Arrow size={12} type="right" />
              </IconButton>
            </OptionInputWrapper>
            <OptionInputWrapper>
              <Label>
                Vertical
              </Label>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeShapeAlignment('top')}
              >
                <Arrow size={12} type="top" />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeShapeAlignment('middle')}
              >
                <Minus size={12} />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeShapeAlignment('bottom')}
              >
                <Arrow size={12} type="bottom" />
              </IconButton>
            </OptionInputWrapper>
          </OptionsWrapper>
        </Accordion>
      )}
      {!dontShowMoreOptionsSection && (
      <Accordion
        expanded={showMoreOptions}
        label={`${capitalize(selectedShape.name())} options`}
        onChange={setShowMoreOptions}
        headerStyle={accordionHeaderStyle}
        detailStyle={accordionDetailStyle}
      >
        <OptionsWrapper>
          {doesShapeNeed.radius && (
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-radius' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-radius' }}
              label="Radius"
              onChange={changeOption}
              name="radius"
              type="input"
              defaultValue={+selectedShape.radius() ?? 0}
              min={0}
              max={250}
              maxWidth={66}
            />
          </OptionInputWrapper>
          )}
          {doesShapeNeed.radiusXY && (
          <>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-radius-x' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-radius-x' }}
                label="Horizontal radius"
                onChange={changeOption}
                name="radiusX"
                type="input"
                defaultValue={+selectedShape.radiusX() ?? 0}
                min={0}
                max={250}
                maxWidth={90}
              />
            </OptionInputWrapper>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-radius-y' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-radius-y' }}
                label="Vertical radius"
                onChange={changeOption}
                name="radiusY"
                type="input"
                defaultValue={+selectedShape.radiusY() ?? 0}
                min={0}
                max={250}
                maxWidth={75}
              />
            </OptionInputWrapper>
          </>
          )}
          {doesShapeNeed.sides && (
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-sides' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-sides' }}
              label="Sides"
              onChange={changeOption}
              name="sides"
              type="input"
              defaultValue={+selectedShape.sides() ?? 3}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          )}
          {(doesShapeNeed.lineOptions || doesShapeNeed.arrowOptions) && (
          <>
            <OptionInputWrapper>
              <SelectGroup
                fullWidth={false}
                label="Line cap"
                onChange={changeLineCap}
                value={selectedShape.lineCap()}
                name="lineCap"
              >
                {['Butt', 'Round', 'Square'].map((lineCap) => (
                  <MenuItem
                          active={selectedShape.lineCap() === lineCap}
                          size="md"
                          value={lineCap.toLowerCase()}
                          key={lineCap}
                        >
                          {lineCap}
                        </MenuItem>
                ))}
              </SelectGroup>
            </OptionInputWrapper>
            <OptionInputWrapper>
              <SwitcherGroup
                checked={selectedShape.dashEnabled()}
                label="Dashed line"
                onChange={toggleLineDashing}
                switcherProps={{ name: 'dashEnabled' }}
              />
            </OptionInputWrapper>
            {doesShapeNeed.arrowOptions && (
            <>
              <OptionInputWrapper>
                <OptionInput
                          inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-pointer-length' }}
                          LabelProps={{ htmlFor: 'filerobot-image-editor_shape-pointer-length' }}
                          label="Pointer length"
                          onChange={changeOption}
                          name="pointerLength"
                          type="input"
                          defaultValue={+selectedShape.pointerLength()}
                          min={0}
                          max={100}
                          maxWidth={66}
                        />
              </OptionInputWrapper>
              <OptionInputWrapper>
                <OptionInput
                          inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-pointer-width' }}
                          LabelProps={{ htmlFor: 'filerobot-image-editor_shape-pointer-width' }}
                          label="Pointer width"
                          onChange={changeOption}
                          name="pointerWidth"
                          type="input"
                          defaultValue={+selectedShape.pointerWidth()}
                          min={1}
                          max={100}
                          maxWidth={66}
                        />
              </OptionInputWrapper>
              <OptionInputWrapper>
                <SwitcherGroup
                          checked={selectedShape.pointerAtBeginning()}
                          label="Start pointer"
                          onChange={togglePointer}
                          switcherProps={{ name: 'pointerAtBeginning' }}
                        />
              </OptionInputWrapper>
              <OptionInputWrapper>
                <SwitcherGroup
                          checked={selectedShape.pointerAtEnding()}
                          label="End pointer"
                          onChange={togglePointer}
                          switcherProps={{ name: 'pointerAtEnding' }}
                        />
              </OptionInputWrapper>
            </>
            )}
          </>
          )}
          {doesShapeNeed.textOptions && (
          <>
            <OptionInputWrapper>
              <SelectGroup
                fullWidth={false}
                label="Font family"
                onChange={changeFontFamily}
                value={selectedShape.fontFamily()}
                name="fontFamily"
              >
                {fontFamilies.map((fontFamily) => (
                  <MenuItem
                          active={selectedShape.fontFamily() === fontFamily}
                          size="md"
                          value={fontFamily}
                          key={fontFamily}
                        >
                          {fontFamily}
                        </MenuItem>
                ))}
              </SelectGroup>
            </OptionInputWrapper>
            <OptionInputWrapper>
              <SelectGroup
                fullWidth={false}
                label="Font style"
                onChange={changeFontStyle}
                value={selectedShape.fontStyle()}
                name="fontStyle"
              >
                {['Normal', 'Bold', 'Bold italic'].map((fontStyle) => (
                  <MenuItem
                          active={selectedShape.fontStyle() === fontStyle}
                          size="md"
                          value={fontStyle.toLowerCase()}
                          key={fontStyle}
                        >
                          {fontStyle}
                        </MenuItem>
                ))}
              </SelectGroup>
            </OptionInputWrapper>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_font-size' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_font-size' }}
                label="Size"
                onChange={changeOption}
                name="fontSize"
                type="input"
                defaultValue={+selectedShape.fontSize() ?? 20}
                min={0}
                max={150}
                maxWidth={66}
              />
            </OptionInputWrapper>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_font-padding' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_font-padding' }}
                label="Padding"
                onChange={changeOption}
                name="padding"
                type="input"
                defaultValue={+selectedShape.padding() ?? 0}
                min={0}
                max={30}
                maxWidth={60}
              />
            </OptionInputWrapper>
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_font-line-height' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_font-line-height' }}
                label="Line height"
                onChange={changeOption}
                name="lineHeight"
                type="input"
                defaultValue={+selectedShape.lineHeight() ?? 1}
                min={0}
                max={20}
                maxWidth={66}
              />
            </OptionInputWrapper>
          </>
          )}
        </OptionsWrapper>
        {doesShapeNeed.textOptions && (
        <>
          <OptionsWrapper>
            <OptionInputWrapper>
              <InputGroup
                label="Text"
                onChange={changeOption}
                name="text"
                type="textarea"
                defaultValue={selectedShape.text()}
                style={{ width: 111, height: 50, resize: 'both' }}
              />
            </OptionInputWrapper>
            <OptionInputWrapper>
              <Label>
                Horizontal align
              </Label>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextAlignment(false, 'left')}
                disabled={selectedShape.align === 'left'}
              >
                <Arrow size={12} type="left" />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextAlignment(false, 'center')}
                disabled={selectedShape.align === 'center'}
              >
                <Minus size={12} />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextAlignment(false, 'right')}
                disabled={selectedShape.align === 'right'}
              >
                <Arrow size={12} />
              </IconButton>
            </OptionInputWrapper>
            <OptionInputWrapper>
              <Label>
                Vertical align
              </Label>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextAlignment(true, 'top')}
                disabled={selectedShape.verticalAlign === 'top'}
              >
                <Arrow size={12} type="top" />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextAlignment(true, 'middle')}
                disabled={selectedShape.verticalAlign === 'middle'}
              >
                <Minus size={12} />
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextAlignment(true, 'bottom')}
                disabled={selectedShape.verticalAlign === 'bottom'}
              >
                <Arrow size={12} type="bottom" />
              </IconButton>
            </OptionInputWrapper>
            <OptionInputWrapper>
              <Label>
                Text decoration
              </Label>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextDecoration('')}
                disabled={!selectedShape.textDecoration}
              >
                T
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextDecoration('underline')}
                disabled={selectedShape.textDecoration === 'underline'}
              >
                __
              </IconButton>
              <IconButton
                size="sm"
                color="link"
                onClick={() => changeTextDecoration('line-through')}
                disabled={selectedShape.textDecoration === 'line-through'}
              >
                <Minus size={12} />
              </IconButton>
            </OptionInputWrapper>
          </OptionsWrapper>
        </>
        )}
      </Accordion>
      )}
    </>
  );

  return (
    selectedShape && !selectedShape.isDragging()
      ? renderOptions()
      : ''
  );
};

export default ShapesOptions;
