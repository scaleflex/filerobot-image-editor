import React, { Component } from 'react';
import {
  OrientationWrapper, RotateWrapper, RotateButton, RotateLabel, RotateIcon, DarkBtn
} from '../../styledComponents';


export default class extends Component {
  state = { rotate: 0 };

  leftRotate = () => {
    const { onRotate } = this.props;
    const { rotate } = this.state;

    onRotate(-90, rotate - 90);
    this.setState({ rotate: rotate - 90 })
  }

  rightRotate = () => {
    const { onRotate } = this.props;
    const { rotate } = this.state;

    onRotate(90, rotate + 90);
    this.setState({ rotate: rotate + 90 })
  }

  render() {
    return (
      <OrientationWrapper>
        <RotateWrapper>
          <RotateLabel>Rotate</RotateLabel>
          <RotateButton>
            <DarkBtn onClick={this.leftRotate}><RotateIcon name="left-rotate"/></DarkBtn>
            <DarkBtn onClick={this.rightRotate}><RotateIcon name="right-rotate"/></DarkBtn>
          </RotateButton>
        </RotateWrapper>
      </OrientationWrapper>
    )
  }
}