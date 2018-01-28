import React, { Component } from 'react';
import { OrientationWrapper, RotateWrapper, RotateButton, RotateLabel, RotateIcon } from '../../styledComponents';
import { Button } from '../../../lib/styledComponents';


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
            <Button onClick={this.leftRotate}><RotateIcon name="left-rotate"/></Button>
            <Button onClick={this.rightRotate}><RotateIcon name="right-rotate"/></Button>
          </RotateButton>
        </RotateWrapper>
      </OrientationWrapper>
    )
  }
}