import React, { Component } from 'react';
import { AddWrapper, ItemsWrapper, SettingsWrapper, ItemGroup, ItemIcon, FieldGroup, FieldCustomLabel } from '../../styledComponents/Add.ui';
import { SHAPES_VARIANTS, WATERMARK_STANDARD_FONTS } from '../../config';
import { FieldInput } from '../../styledComponents';
import Range from '../Range';
import Select from '../Shared/Select';

export default class Add extends Component {
  
  renderSettings = (selectedShape) => {
    const { shapeOperations, t } = this.props;
    const { variant, opacity, color, stroke = {} } = selectedShape;

    const updateOpacity = (newVal) => shapeOperations.updateShape({ opacity: newVal });
    const updateStroke = (property, value) => shapeOperations.updateShape({ stroke: { ...stroke, [property]: value }});
    const updatePropertyFromEvent = (e) => shapeOperations.updateShape({ [e.target.name]: e.target.value });

    const defaultSettings = (
      <React.Fragment key="default-settings">
        <Range
          label={t['common.opacity']}
          min={0}
          max={1}
          step={0.05}
          range={opacity}
          updateRange={updateOpacity}
          labelBefore={true}
          labelStyles={{ color: '#fff' }}
        />
        <FieldGroup>
          <FieldCustomLabel>Stroke Color</FieldCustomLabel>
          <FieldInput
            value={stroke.color || '#000000'}
            type="color"
            style={{ width: 30, padding: 0, background: 'transparent', boxShadow: 'none' }}
            onChange={({ target: { value } }) => updateStroke('color', value)}
          />
        </FieldGroup>
        <FieldGroup>
          <FieldCustomLabel>Stroke width</FieldCustomLabel>
          <FieldInput
            value={stroke.width || 0}
            type="number"
            style={{ width: 60 }}
            onChange={({ target: { value } }) => updateStroke('width', value)}
            min={0}
          />
        </FieldGroup>
      </React.Fragment>
    );

    const commonSettings = (
      <FieldGroup key="common-settings-fields">
        <FieldCustomLabel>Color</FieldCustomLabel>
        <FieldInput
          value={color || '#000'}
          type="color"
          style={{ width: 30, padding: 0, background: 'transparent', boxShadow: 'none' }}
          name="color"
          onChange={updatePropertyFromEvent}
          key="shape-color"
        />
      </FieldGroup>
    );

    const shownSettings = [defaultSettings];

    switch(variant) {
      case SHAPES_VARIANTS.RECT:
      case SHAPES_VARIANTS.SQUARE:
      case SHAPES_VARIANTS.CIRCLE:
        shownSettings.push(commonSettings);
        break;
      case SHAPES_VARIANTS.TEXT:
        const textFontField = (
          <React.Fragment key="text-group-fields">
            <FieldGroup>
              <FieldCustomLabel>Text</FieldCustomLabel>
              <FieldInput
                id="text"
                value={selectedShape.text || 'Text'}
                name="text"
                style={{ minWidth: 111 }}
                onChange={updatePropertyFromEvent}
              />
            </FieldGroup>
            <FieldGroup>
              <FieldCustomLabel>Font family</FieldCustomLabel>
              <Select
                //  TODO: Separate the fonts from watermark's.
                list={WATERMARK_STANDARD_FONTS}
                valueProp="value"
                id="textFont"
                value={selectedShape.textFont || 'Arial'}
                style={{ width: 111 }}
                onChange={(value) => updatePropertyFromEvent({ target: { name: 'textFont', value }})}
                color="text-font"
              />
            </FieldGroup>
            <FieldGroup>
              <FieldCustomLabel>Font size</FieldCustomLabel>
              <FieldInput
                value={selectedShape.textSize}
                type="number"
                style={{ width: 60 }}
                name="textSize"
                onChange={updatePropertyFromEvent}
                min={0}
              />
            </FieldGroup>
          </React.Fragment>
        );
        shownSettings.unshift(textFontField, commonSettings);
        break;
      case SHAPES_VARIANTS.IMAGE:
        const urlField = (
          <FieldGroup key="url-field">
            <FieldCustomLabel>URL</FieldCustomLabel>
            <FieldInput
              id="img"
              value={(selectedShape.img || {}).src || ''}
              name="img"
              style={{ minWidth: 111 }}
              onChange={updatePropertyFromEvent}
            />
          </FieldGroup>
        );
        shownSettings.unshift(urlField);
        break;
      default:
        break;
    }

    return shownSettings;
  }

  render() {
    const { availableShapes, selectedShape = {} } = this.props;
    const isShapeSelected = Object.keys(selectedShape).length;

    return (
      <AddWrapper>
        <ItemsWrapper shapeAdded={isShapeSelected}>
          {availableShapes.map((
            { label, content, iconStyles, drawFn, iconUrl, variant }
            ) => (
              <ItemGroup key={label} onClick={() => drawFn()} selected={variant === selectedShape.variant}>
                <ItemIcon style={iconStyles} isIconNotProvided={!Boolean(content || iconUrl || iconStyles)}>
                  {content
                    || (iconUrl
                        &&
                        <img src={iconUrl} alt={`${label} icon`} />
                      )
                  }
                </ItemIcon>
                <label>{label}</label>
              </ItemGroup>
              )
            )
          }
        </ItemsWrapper>
        {isShapeSelected > 0 && (
          <SettingsWrapper>
            {this.renderSettings(selectedShape)}
          </SettingsWrapper>
          )
        }
      </AddWrapper>
    )
  }
}