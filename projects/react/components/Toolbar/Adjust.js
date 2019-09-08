import React, { Component } from 'react';
import { AdjustWrapper } from '../../styledComponents';
import Range from '../Range';


export default class extends Component {
  constructor(){
    super();

    this.state = {
      brightness: 0,
      contrast: 0,
      exposure: 0,
      saturation: 0
    };
  }

  updateBrightness = (value) => {
    this.onAdjust('brightness', value);
  }

  updateContrast = (value) => {
    this.onAdjust('contrast', value);
  }

  updateExposure = (value) => {
    this.onAdjust('exposure', value);
  }

  updateSaturation = (value) => {
    this.onAdjust('saturation', value);
  }

  onAdjust = (type, value) => {
    this.setState({ [type]: value });
    this.props.onAdjust(type, value);
  }

  render () {
    const { t } = this.props;
    const { brightness, contrast, exposure, saturation } = this.state;

    return (
      <AdjustWrapper>
        <Range label={t['adjust.brightness']} range={brightness} updateRange={this.updateBrightness}/>
        <Range label={t['adjust.contrast']} range={contrast} updateRange={this.updateContrast}/>
        <Range label={t['adjust.exposure']} range={exposure} updateRange={this.updateExposure}/>
        <Range label={t['adjust.saturation']} range={saturation} updateRange={this.updateSaturation}/>
      </AdjustWrapper>
    );
  }
}