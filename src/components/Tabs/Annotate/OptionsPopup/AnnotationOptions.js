import React, { useContext, useMemo, useState } from 'react';
import { Accordion, Arrow, IconButton, InputGroup, Label, MenuItem, SelectGroup, SwitcherGroup } from '@scaleflex/ui/core';
import { Minus } from '@scaleflex/icons';

import Context from '../../../../context';
import { AVAILABLE_ANNOTATIONS_NAMES } from './OptionsPopup.constants';
import { DEFAULT_FONTS } from '../../../../utils/constants';
import { OptionsWrapper, OptionInputWrapper, OptionInput } from './OptionsPopup.styled';
import capitalize from '../../../../utils/capitalize';

const accordionHeaderStyle = { marginTop: 4, marginBottom: 6 };
const accordionDetailStyle = { marginTop: 8, marginBottom: 8 };

// TODO: Make options container resizable, opacity changing, movable and have cancel button.
// TODO: Split this component into sub components and imprvoe them with adding more options if available.
const AnnotationOptions = ({ fontFamilies = DEFAULT_FONTS }) => {
  const { selections = [] } = useContext(Context);
  const [showGeneralOptions, setShowGeneralOptions] = useState(true);
  const [showShadowOptions, setShowShadowOptions] = useState(true);
  const [showMoreOptions, setShowMoreOptions] = useState(true);
  const [reRenderVal, reRender] = useState(false); // for re-rendering the chosen font family/style.

  const doesShapeNeed = useMemo(
    () => {
      const selectedAnnotationName = selections[0].name();
      const isPolygon = AVAILABLE_ANNOTATIONS_NAMES.POLYGON === selectedAnnotationName;
      const isArrow = AVAILABLE_ANNOTATIONS_NAMES.ARROW === selectedAnnotationName;
      const isFreehand = AVAILABLE_ANNOTATIONS_NAMES.FREEHAND === selectedAnnotationName;

      return ({
        cornerRadiusOnly: AVAILABLE_ANNOTATIONS_NAMES.RECT === selectedAnnotationName,
        sides: isPolygon,
        radius: isPolygon || AVAILABLE_ANNOTATIONS_NAMES.CIRCLE === selectedAnnotationName,
        radiusXY: AVAILABLE_ANNOTATIONS_NAMES.ELLIPSE === selectedAnnotationName,
        textOptions: AVAILABLE_ANNOTATIONS_NAMES.TEXT === selectedAnnotationName,
        lineOptions: isFreehand || AVAILABLE_ANNOTATIONS_NAMES.LINE === selectedAnnotationName,
        arrowOptions: isArrow,
        freehandOptions: isFreehand,
      })
    }, [selections]
  );
  const selectedAnnotation = doesShapeNeed.freehandOptions ? selections[0].children[0] : selections[0];

  const dontShowMoreOptionsSection = doesShapeNeed.cornerRadiusOnly || doesShapeNeed.freehandOptions;

  const applyOptionChangeToFreehand = (name, value) => new Promise((resolve, reject) => {
    selections[0].children.forEach((freehandLine) => {
      freehandLine.setAttr(name, value)
    });
    resolve();
  });

  const changeOption = (event) => {  
    let value = event.target.value;

    if (event.target.min && value < +event.target.min ) {
      value = event.target.min;
    } else if(event.target.max && value > +event.target.max) {
      value = event.target.max;
    }

    value = event.target.min || event.target.max
      ? +value
      : value;

    if (doesShapeNeed.freehandOptions) {
      applyOptionChangeToFreehand(event.target.name, value);
    } else {
      selectedAnnotation.setAttr(event.target.name, value);
    }
    
  }

  const changeFontFamily = (fontFamily) => {
    selectedAnnotation.fontFamily(fontFamily);
    reRender(!reRenderVal);
  }

  const changeFontStyle = (fontStyle) => {
    selectedAnnotation.fontStyle(fontStyle);
    reRender(!reRenderVal);
  }
  
  const changeTextAlignment = (isVerticalAlign, alignmentDirection) => {
    if (isVerticalAlign) {
      selectedAnnotation.verticalAlign(alignmentDirection);
    } else {
      selectedAnnotation.align(alignmentDirection);
    }
    reRender(!reRenderVal);
  }

  const changeTextDecoration = (value) => {
    selectedAnnotation.textDecoration(value);
    reRender(!reRenderVal);
  }

  const changeLineCap = (value) => {
    selectedAnnotation.lineCap(value);
    reRender(!reRenderVal);
  }

  const toggleLineDashing = (event) => {
    selectedAnnotation.dashEnabled(event.target.checked);
    reRender(!reRenderVal);
  }

  const togglePointer = (event) => {
    selectedAnnotation[event.target.name](event.target.checked);
    reRender(!reRenderVal);
  }

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
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-transparency'}}
              label="Transparency"
              onChange={changeOption}
              name="opacity"
              type="input"
              defaultValue={+selectedAnnotation.opacity() ?? 1}
              min={0}
              step={0.1}
              max={1}
              maxWidth={66}
            />
          </OptionInputWrapper>
          {doesShapeNeed.cornerRadiusOnly && (
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-corner-radius' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-corner-radius'}}
                label="Round corners"
                onChange={changeOption}
                name="cornerRadius"
                type="input"
                defaultValue={+selectedAnnotation.cornerRadius() ?? 0}
                min={0}
                max={100}
                maxWidth={66}
              />
            </OptionInputWrapper>
          )}
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-stroke-width' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-stroke-width'}}
              label="Stroke size"
              onChange={changeOption}
              name="strokeWidth"
              type="input"
              defaultValue={+selectedAnnotation.strokeWidth() ?? 0}
              min={doesShapeNeed.lineOptions || doesShapeNeed.arrowOptions ? 1 : 0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          {!doesShapeNeed.lineOptions && (
            <OptionInputWrapper>
              <OptionInput
                inputProps={{ type: 'color', id: 'filerobot-image-editor_shape-fill' }}
                LabelProps={{ htmlFor: 'filerobot-image-editor_shape-fill'}}
                label="Fill color"
                onChange={changeOption}
                name="fill"
                type="input"
                defaultValue={selectedAnnotation.fill()}
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
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-stroke-color'}}
              label="Stroke color"
              onChange={changeOption}
              name="stroke"
              type="input"
              defaultValue={selectedAnnotation.stroke() ?? '#000000'}
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
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-offset-x'}}
              label="Horizontal"
              onChange={changeOption}
              name="shadowOffsetX"
              type="input"
              defaultValue={+selectedAnnotation.shadowOffsetX() ?? 0}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-shadow-offset-y' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-offset-y'}}
              label="Vertical"
              onChange={changeOption}
              name="shadowOffsetY"
              type="input"
              defaultValue={+selectedAnnotation.shadowOffsetY() ?? 0}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-shadow-blurriness' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-blurriness'}}
              label="Blurriness"
              onChange={changeOption}
              name="shadowBlur"
              type="input"
              defaultValue={+selectedAnnotation.shadowBlur() ?? 0}
              min={0}
              max={100}
              maxWidth={66}
            />
          </OptionInputWrapper>
          <OptionInputWrapper>
            <OptionInput
              inputProps={{ type: 'color', id: 'filerobot-image-editor_shape-shadow-color' }}
              LabelProps={{ htmlFor: 'filerobot-image-editor_shape-shadow-color'}}
              label="Color"
              onChange={changeOption}
              name="shadowColor"
              type="input"
              defaultValue={selectedAnnotation.shadowColor() ?? '#000000'}
              maxWidth={64}
              noBorder
              noPadding
              noOutline
              pointerCursor
            />
          </OptionInputWrapper>
        </OptionsWrapper>
        </Accordion>
        {!dontShowMoreOptionsSection && (
          <Accordion
            expanded={showMoreOptions}
            label={`${capitalize(selectedAnnotation.name())} options`}
            onChange={setShowMoreOptions}
            headerStyle={accordionHeaderStyle}
            detailStyle={accordionDetailStyle}
          >
            <OptionsWrapper>
              {doesShapeNeed.radius && (
                <OptionInputWrapper>
                  <OptionInput
                    inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-radius' }}
                    LabelProps={{ htmlFor: 'filerobot-image-editor_shape-radius'}}
                    label="Radius"
                    onChange={changeOption}
                    name="radius"
                    type="input"
                    defaultValue={+selectedAnnotation.radius() ?? 0}
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
                      LabelProps={{ htmlFor: 'filerobot-image-editor_shape-radius-x'}}
                      label="Horizontal radius"
                      onChange={changeOption}
                      name="radiusX"
                      type="input"
                      defaultValue={+selectedAnnotation.radiusX() ?? 0}
                      min={0}
                      max={250}
                      maxWidth={90}
                    />
                  </OptionInputWrapper>
                  <OptionInputWrapper>
                    <OptionInput
                      inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-radius-y' }}
                      LabelProps={{ htmlFor: 'filerobot-image-editor_shape-radius-y'}}
                      label="Vertical radius"
                      onChange={changeOption}
                      name="radiusY"
                      type="input"
                      defaultValue={+selectedAnnotation.radiusY() ?? 0}
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
                    LabelProps={{ htmlFor: 'filerobot-image-editor_shape-sides'}}
                    label="Sides"
                    onChange={changeOption}
                    name="sides"
                    type="input"
                    defaultValue={+selectedAnnotation.sides() ?? 3}
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
                      value={selectedAnnotation.lineCap()}
                      name="lineCap"
                    >
                      {['Butt', 'Round', 'Square'].map((lineCap) => (
                        <MenuItem
                          active={selectedAnnotation.lineCap() === lineCap}
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
                      checked={selectedAnnotation.dashEnabled()}
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
                          LabelProps={{ htmlFor: 'filerobot-image-editor_shape-pointer-length'}}
                          label="Pointer length"
                          onChange={changeOption}
                          name="pointerLength"
                          type="input"
                          defaultValue={+selectedAnnotation.pointerLength()}
                          min={0}
                          max={100}
                          maxWidth={66}
                        />
                      </OptionInputWrapper>
                      <OptionInputWrapper>
                        <OptionInput
                          inputProps={{ type: 'number', id: 'filerobot-image-editor_shape-pointer-width' }}
                          LabelProps={{ htmlFor: 'filerobot-image-editor_shape-pointer-width'}}
                          label="Pointer width"
                          onChange={changeOption}
                          name="pointerWidth"
                          type="input"
                          defaultValue={+selectedAnnotation.pointerWidth()}
                          min={1}
                          max={100}
                          maxWidth={66}
                        />
                      </OptionInputWrapper>
                      <OptionInputWrapper>
                        <SwitcherGroup
                          checked={selectedAnnotation.pointerAtBeginning()}
                          label="Start pointer"
                          onChange={togglePointer}
                          switcherProps={{ name: 'pointerAtBeginning' }}
                        />
                      </OptionInputWrapper>
                      <OptionInputWrapper>
                        <SwitcherGroup
                          checked={selectedAnnotation.pointerAtEnding()}
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
                      value={selectedAnnotation.fontFamily()}
                      name="fontFamily"
                    >
                      {fontFamilies.map((fontFamily) => (
                        <MenuItem
                          active={selectedAnnotation.fontFamily() === fontFamily}
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
                      value={selectedAnnotation.fontStyle()}
                      name="fontStyle"
                    >
                      {['Normal', 'Bold', 'Bold italic'].map((fontStyle) => (
                        <MenuItem
                          active={selectedAnnotation.fontStyle() === fontStyle}
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
                      LabelProps={{ htmlFor: 'filerobot-image-editor_font-size'}}
                      label="Size"
                      onChange={changeOption}
                      name="fontSize"
                      type="input"
                      defaultValue={+selectedAnnotation.fontSize() ?? 20}
                      min={0}
                      max={150}
                      maxWidth={66}
                    />
                  </OptionInputWrapper>
                  <OptionInputWrapper>
                    <OptionInput
                      inputProps={{ type: 'number', id: 'filerobot-image-editor_font-padding' }}
                      LabelProps={{ htmlFor: 'filerobot-image-editor_font-padding'}}
                      label="Padding"
                      onChange={changeOption}
                      name="padding"
                      type="input"
                      defaultValue={+selectedAnnotation.padding() ?? 0}
                      min={0}
                      max={30}
                      maxWidth={60}
                    />
                  </OptionInputWrapper>
                  <OptionInputWrapper>
                    <OptionInput
                      inputProps={{ type: 'number', id: 'filerobot-image-editor_font-line-height' }}
                      LabelProps={{ htmlFor: 'filerobot-image-editor_font-line-height'}}
                      label="Line height"
                      onChange={changeOption}
                      name="lineHeight"
                      type="input"
                      defaultValue={+selectedAnnotation.lineHeight() ?? 1}
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
                      defaultValue={selectedAnnotation.text()}
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
                      disabled={selectedAnnotation.align === 'left'}
                    >
                      <Arrow size={12} type="left" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="link"
                      onClick={() => changeTextAlignment(false, 'center')}
                      disabled={selectedAnnotation.align === 'center'}
                    >
                      <Minus size={12} />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="link"
                      onClick={() => changeTextAlignment(false, 'right')}
                      disabled={selectedAnnotation.align === 'right'}
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
                      disabled={selectedAnnotation.verticalAlign === 'top'}
                    >
                      <Arrow size={12} type="top" />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="link"
                      onClick={() => changeTextAlignment(true, 'middle')}
                      disabled={selectedAnnotation.verticalAlign === 'middle'}
                    >
                      <Minus size={12} />
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="link"
                      onClick={() => changeTextAlignment(true, 'bottom')}
                      disabled={selectedAnnotation.verticalAlign === 'bottom'}
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
                      disabled={!selectedAnnotation.textDecoration}
                    >
                      T
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="link"
                      onClick={() => changeTextDecoration('underline')}
                      disabled={selectedAnnotation.textDecoration === 'underline'}
                    >
                      __
                    </IconButton>
                    <IconButton
                      size="sm"
                      color="link"
                      onClick={() => changeTextDecoration('line-through')}
                      disabled={selectedAnnotation.textDecoration === 'line-through'}
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
    selectedAnnotation && !selectedAnnotation.isDragging()
      ? renderOptions()
      : ''
  )
}

export default AnnotationOptions;
