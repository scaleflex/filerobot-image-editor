import { Component } from 'react';
import { AddWrapper, SettingsWrapper, FieldGroup, FieldCustomLabel } from '../../styledComponents/Shapes.ui';
import { DEFAULT_IMG_URL } from '../../config';
import { FieldInput } from '../../styledComponents';
import Range from '../Range';

export default class Image extends Component {
  componentDidMount() {
    const { shapeOperations } = this.props;

    shapeOperations.addImage({ img: DEFAULT_IMG_URL });
  }

  updateOpacity = (newVal) => this.props.shapeOperations.updateShape({ opacity: newVal });
  
  updateStroke = (property, value) => {
    const { shapeOperations, selectedShape: { stroke = {} } } = this.props;
    shapeOperations.updateShape({ stroke: { ...stroke, [property]: value }});
  }
  
  updatePropertyFromEvent = (e) => this.props.shapeOperations.updateShape({ [e.target.name]: e.target.value });

  render() {
    const { t, selectedShape = {} } = this.props;
    const { opacity = 1, img, stroke = {} } = selectedShape;

    return (
      <AddWrapper>
        <SettingsWrapper>
          <Range
            label={t['common.opacity']}
            min={0}
            max={1}
            step={0.05}
            range={opacity}
            updateRange={this.updateOpacity}
            labelBefore={true}
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
          <FieldGroup key="url-field">
            <FieldCustomLabel>URL</FieldCustomLabel>
            <FieldInput
              id="img"
              value={(typeof img === 'object') ? img.src : img || ''}
              name="img"
              style={{ minWidth: 111 }}
              onChange={this.updatePropertyFromEvent}
            />
          </FieldGroup>
        </SettingsWrapper>
      </AddWrapper>
    )
  }
}