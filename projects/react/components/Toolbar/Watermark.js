import React, { Component } from 'react';
import {
  FieldInput,
  PositionSquare,
  Switcher,
  WatermarkInputs,
  WatermarkPositionWrapper,
  WatermarkWrapper,
  WrapperForOpacity,
  WrapperForURL
} from '../../styledComponents';
import { debounce } from 'throttle-debounce';
import Range from '../Range';


const watermarkPositions = [
  "left-top", "center-top", "right-top", "left-center", "center", "right-center", "left-bottom", "center-bottom",
  "right-bottom"
];


export default class extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isBlockRatio: false,
      opacity: props.watermark.opacity || 0.7,
      position: props.watermark.position || 'center',
      url: props.watermark.url || '',
      applyByDefault: props.watermark.applyByDefault || false
    }
  }

  componentWillReceiveProps(nextProps) {
   if (nextProps.watermark.applyByDefault !== this.props.watermark.applyByDefault) {
     this.setState({ applyByDefault: nextProps.watermark.applyByDefault });

     if (nextProps.watermark.applyByDefault) {
       this.initWatermarkImage(nextProps.watermark.url);
     }
   }
  }

  updateOpacity = (value) => {
    this.setState({ opacity: value }, () => {
      this.props.updateState({
        watermark: {
          ...this.props.watermark,
          opacity: value
        }
      });
    });
  }

  changeURL = (event) => {
    const nextValue = event.target.value;

    this.setState({ url: nextValue }, () => {
      this.props.updateState({
        watermark: {
          ...this.props.watermark,
          url: ''
        }
      });

      this.initWatermarkImage(nextValue);
    });
  }

  onPositionChange = value => {
    this.setState({ position: value }, () => {
      this.props.updateState({
        watermark: {
          ...this.props.watermark,
          position: value
        }
      });
    });
  }

  initWatermarkImage = debounce(500, (url) => {
    let logoImage = null;

    if (url) {
      logoImage = new Image();
      logoImage.setAttribute('crossOrigin', 'Anonymous');

      logoImage.onload = () => {
        this.props.updateState({ logoImage, isShowSpinner: false, watermark: { ...this.props.watermark, url } });
      }

      logoImage.onerror = () => {
        this.props.updateState({ isShowSpinner: false });
      }

      logoImage.src = url + '?' + new Date().getTime();
    }
  });

  onApplyWatermarkChange = () => {
    const nextValue = !this.state.applyByDefault;
    this.setState({ applyByDefault: nextValue }, () => {
      this.props.updateState({ watermark: { ...this.props.watermark, applyByDefault: nextValue } });
    });
  }

  render() {
    const { url, opacity, position, applyByDefault } = this.state;
    const { t } = this.props;

    return (
      <WatermarkWrapper>

        <WatermarkInputs>
          <WrapperForURL>
            <label htmlFor="url">Watermark URL</label>
            <FieldInput
              name="url"
              fullSize
              value={url}
              onChange={this.changeURL}
            />
          </WrapperForURL>
          <WrapperForOpacity>
            <label htmlFor="opacity">Opacity</label>
            <Range
              label={t['common.opacity']}
              min={0}
              max={1}
              step={0.05}
              range={opacity}
              updateRange={this.updateOpacity}
            />
            <Switcher
              id="switch-watermark"
              checked={applyByDefault}
              handleChange={this.onApplyWatermarkChange}
              text={'Apply watermark'}
            />
          </WrapperForOpacity>
        </WatermarkInputs>

        <WatermarkPositionWrapper>
          {watermarkPositions.map(value => (
            <PositionSquare
              key={value}
              value={value}
              active={value === position}
              onClick={() => { this.onPositionChange(value); }}
            />
          ))}
        </WatermarkPositionWrapper>

      </WatermarkWrapper>
    )
  }
}