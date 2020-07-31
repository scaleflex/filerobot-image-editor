import React, { Component } from 'react';
import { AddWrapper, SettingsWrapper, FieldGroup, FieldCustomLabel } from '../../styledComponents/Shapes.ui';
import { STANDARD_FONTS } from '../../config';
import { FieldInput } from '../../styledComponents';
import Range from '../Range';
import Select from '../Shared/Select';

export default class Text extends Component {
  componentDidMount() {
    const { shapeOperations } = this.props;

    shapeOperations.addText();
  }

  updateOpacity = (newVal) => this.props.shapeOperations.updateShape({ opacity: newVal });

  updateStroke = (property, value) => {
    const { shapeOperations, selectedShape: { stroke = {} } } = this.props;
    shapeOperations.updateShape({ stroke: { ...stroke, [property]: value }});
  }

  updatePropertyFromEvent = (e) => this.props.shapeOperations.updateShape({ [e.target.name]: e.target.value });

  render() {
    const { t, selectedShape = {} } = this.props;
    const {
      text = '',
      textFont = 'Arial',
      textSize = 62,
      stroke = {},
      color = '#000000',
      opacity = 1
    } = selectedShape;

    return (
      <AddWrapper>
        <SettingsWrapper>
          <FieldGroup>
            <FieldCustomLabel>Text</FieldCustomLabel>
            <FieldInput
              id="text"
              value={text}
              name="text"
              style={{ minWidth: 111 }}
              onChange={this.updatePropertyFromEvent}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldCustomLabel>Font family</FieldCustomLabel>
            <Select
                list={STANDARD_FONTS}
                valueProp="value"
                id="textFont"
                value={textFont}
                style={{ width: 111 }}
                onChange={(value) => this.updatePropertyFromEvent({ target: { name: 'textFont', value }})}
                color="text-font"
                notRelativePosition
              />
          </FieldGroup>
          <FieldGroup>
          <FieldCustomLabel>Font size</FieldCustomLabel>
            <FieldInput
              value={textSize}
              type="number"
              style={{ width: 60 }}
              name="textSize"
              onChange={this.updatePropertyFromEvent}
              min={0}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldCustomLabel>Fill Color</FieldCustomLabel>
            <FieldInput
              value={color}
              type="color"
              style={{ width: 30, padding: 0, background: 'transparent', boxShadow: 'none' }}
              name="color"
              onChange={this.updatePropertyFromEvent}
            />
          </FieldGroup>
          <Range
            label={t['common.opacity']}
            min={0}
            max={1}
            step={0.05}
            range={opacity}
            updateRange={this.updateOpacity}
            labelBefore={true}
            labelStyles={{ color: '#fff' }}
          />
          <FieldGroup>
            <FieldCustomLabel>Stroke Color</FieldCustomLabel>
            <FieldInput
              value={stroke.color || '#000000'}
              type="color"
              style={{ width: 30, padding: 0, background: 'transparent', boxShadow: 'none' }}
              onChange={({ target: { value } }) => this.updateStroke('color', value)}
            />
          </FieldGroup>
          <FieldGroup>
            <FieldCustomLabel>Stroke width</FieldCustomLabel>
            <FieldInput
              value={stroke.width || 0}
              type="number"
              style={{ width: 60 }}
              onChange={({ target: { value } }) => this.updateStroke('width', value)}
              min={0}
            />
          </FieldGroup>
        </SettingsWrapper>
      </AddWrapper>
    )
  }
}