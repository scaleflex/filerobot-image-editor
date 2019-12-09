import React, { Component } from 'react';
import {
  FieldInput,
  FileInput,
  PositionSquare,
  Switcher,
  WatermarkInputs,
  WatermarkPositionWrapper,
  WatermarkWrapper,
  WrapperForControls,
  WrapperForOpacity,
  WrapperForURL,
  SelectWatermarkLabel,
  Watermarks,
  WatermarkIcon
} from '../../styledComponents';
import { debounce } from 'throttle-debounce';
import Range from '../Range';

const watermarkPositions = [
  "left-top",
  "center-top",
  "right-top",
  "left-center",
  "center",
  "right-center",
  "left-bottom",
  "center-bottom",
  "right-bottom"
];

// possible positions ["corners", "star", "center", "top-row", "center-row", "bottom-row"]
const watermarkPositionsPreset = {
  "corners": [
    1,0,1,
    0,0,0,
    1,0,1,
  ],
  "star": [
    0,1,0,
    1,1,1,
    0,1,0,
  ],
  "center": [
    0,0,0,
    0,1,0,
    0,0,0,
  ],
  "top-row": [
    1,1,1,
    0,0,0,
    0,0,0,
  ],
  "center-row": [
    0,0,0,
    1,1,1,
    0,0,0,
  ],
  "bottom-row": [
    0,0,0,
    0,0,0,
    1,1,1,
  ],
};

export default class extends Component {
  constructor(props) {
    super(props);
    const { opacity, position, url, urls, applyByDefault, activePositions, handleOpacity, fileUpload } = props.watermark;

    const getActivePositions = () => {
      // check a preset was selected
      if (
        typeof activePositions === 'string' && 
        watermarkPositionsPreset.hasOwnProperty(activePositions)
      ) {
        return watermarkPositionsPreset[activePositions];
      }
      // check if activePositons is an array
      else if (Array.isArray(activePositions)) {
        const fullPos = Array(9).fill(0);
        activePositions.map((val, i) => fullPos[i] = val);
        return fullPos;
      }
      // return the default that all positions are active
      return Array(9).fill(1);
    }

    this.state = {
      isBlockRatio: false,
      opacity: opacity || 0.7,
      handleOpacity: typeof handleOpacity === 'boolean' ? handleOpacity : true,
      position: position || 'center',
      url: url || '',
      urls: urls || [],
      activePositions: getActivePositions(),
      isWatermarkList: urls && urls.length > 1,
      applyByDefault: applyByDefault || false,
      showWaterMarkList: false,
      fileUpload: fileUpload || false,
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

  readFile = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.changeURL({ target: { value: e.target.result}});
      }
      reader.readAsDataURL(input.files[0]);
    }
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

    const updateImageState = (newImage) => {
      this.props.updateState({ logoImage: newImage, isShowSpinner: false, watermark: { ...this.props.watermark, url: newImage.src } });
    }

    if (url) {
      logoImage = new Image();
      logoImage.setAttribute('crossOrigin', 'Anonymous');

      logoImage.onload = () => {
        const { imageFilter } = this.props.watermark;

        if (imageFilter && typeof imageFilter === 'function') {
          logoImage.onload = null;
          updateImageState(imageFilter(logoImage));
        } else {
          updateImageState(logoImage);
        }
      }

      logoImage.onerror = () => {
        this.props.updateState({ isShowSpinner: false });
      }

      if (url.match(/^https?:\/\/./)) {
        // if the url is a HTTP URL add a cache breaker
        logoImage.src = url + '?' + new Date().getTime();
      } else {
        logoImage.src = url;
      }
    }
  });

  onApplyWatermarkChange = () => {
    const nextValue = !this.state.applyByDefault;
    this.setState({ applyByDefault: nextValue }, () => {
      this.props.updateState({ watermark: { ...this.props.watermark, applyByDefault: nextValue } });
    });
  }

  showWatermarkList = () => {
    this.setState({ showWaterMarkList: true });
  }

  hideWatermarkList = () => {
    this.setState({ showWaterMarkList: false });
  }

  onChangeWatermark = (url) => {
    this.changeURL({ target: { value: url } });
    this.hideWatermarkList();
  }

  render() {
    const { isWatermarkList, url, urls, opacity, handleOpacity, position, activePositions, applyByDefault, showWaterMarkList, fileUpload } = this.state;
    const { t } = this.props;

    return (
      <WatermarkWrapper>

        <WatermarkInputs>
          <WrapperForURL>
            { !fileUpload && (<>
              <label htmlFor="url">Watermark URL</label>
              <FieldInput
                name="url"
                fullSize
                style={{ width: 'calc(100% - 200px)' }}
                value={url}
                onChange={this.changeURL}
              />
            </>)}
            { fileUpload && (<>
              <label htmlFor="url">Watermark Image</label>
              <FileInput
                style={{ width: 'calc(100% - 200px)' }}
                onChange={this.readFile}
              />
            </>)}
            {isWatermarkList &&
            <SelectWatermarkLabel onClick={this.showWatermarkList}>Select</SelectWatermarkLabel>}
          </WrapperForURL>
            <WrapperForControls switcherPosition={handleOpacity ? 'right' : 'left'}>
              {handleOpacity &&
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
                </WrapperForOpacity>
              }
              <Switcher
                id="switch-watermark"
                checked={applyByDefault}
                handleChange={this.onApplyWatermarkChange}
                text={t['common.apply_watermark']}
                style={{ lineHeight: 'inherit', float: 'none' }}
              />
            </WrapperForControls>
        </WatermarkInputs>

        <WatermarkPositionWrapper>
          {watermarkPositions.map((value, index) => (
            <PositionSquare
              key={value}
              value={value}
              active={value === position}
              clickable={activePositions[index]}
              onClick={() => {
                if (activePositions[index]) {
                  this.onPositionChange(value);
                }
              }}
            />
          ))}
        </WatermarkPositionWrapper>

        {isWatermarkList && showWaterMarkList &&  (
          <Watermarks >
            {urls.map(url => <WatermarkIcon key={url} src={url} onClick={() => { this.onChangeWatermark(url) }}/>)}
          </Watermarks>
        )}

      </WatermarkWrapper>
    )
  }
}