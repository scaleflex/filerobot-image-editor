import React, { Component } from 'react';
import { ResizeWrapper, FieldSet, FieldLabel, FieldInput, ResizeBox } from '../../styledComponents';


export default class extends Component {
  componentDidMount() { }

  changeWidth = ({target: {value}}) => {
    const { updateState, focusPoint, canvasDimensions } = this.props;
    const newFocusPoint = {
      ...focusPoint,
      x: Math.min(isNaN(value) ? 0 : +value, canvasDimensions.width)
    };

    updateState({focusPoint: newFocusPoint});
  }


  changeHeight = ({target: {value}}) => {
    const { updateState, focusPoint, canvasDimensions } = this.props;
    const newFocusPoint = {
      ...focusPoint,
      y: Math.min(isNaN(value) ? 0 : +value, canvasDimensions.height)
    };

    updateState({focusPoint: newFocusPoint});
  }

  render() {
    const { focusPoint, t } = this.props;

    return (
      <ResizeWrapper>
        <ResizeBox active>
          <FieldSet>
            <FieldLabel>{t['common.x']}</FieldLabel>
            <FieldInput
              dark
              fullSize
              value={Math.round(focusPoint.x)}
              onChange={this.changeWidth}
            />
          </FieldSet>
          &nbsp;&nbsp;
          <FieldSet>
            <FieldLabel>{t['common.y']}</FieldLabel>
            <FieldInput
              dark
              fullSize
              value={Math.round(focusPoint.y)}
              onChange={this.changeHeight}
            />
          </FieldSet>
        </ResizeBox>
      </ResizeWrapper>
    )
  }
}