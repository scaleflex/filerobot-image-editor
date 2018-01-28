import React, { Component } from 'react';
import { AdjustWrapper } from '../../styledComponents';
import { Button } from '../../../lib/styledComponents';


export default class extends Component {
  render () {
    const { onAdjust } = this.props;

    return (
      <AdjustWrapper>
        <Button onClick={() => { onAdjust('brightness', -30) }}>Brightness</Button>
        <Button onClick={() => { onAdjust('contrast', 30) }}>Contrast</Button>
        <Button onClick={() => { onAdjust('gamma', 5) }}>Gamma</Button>
        <Button onClick={() => { onAdjust('saturation', 30) }}>Saturation</Button>
      </AdjustWrapper>
    );
  }
}