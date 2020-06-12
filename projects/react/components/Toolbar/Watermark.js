import React, { Component } from 'react';
import {
  FieldInput,
  FileInput,
  PositionSquare,
  Switcher,
  WatermarkIcon,
  WatermarkInputs,
  WatermarkInputTypes,
  WatermarkPositionWrapper,
  Watermarks,
  WatermarkWrapper,
  WrapperForControls,
  WrapperForOpacity,
  WrapperForURL
} from '../../styledComponents';
import { debounce } from 'throttle-debounce';
import Range from '../Range';
import Select from '../Shared/Select';
import { WATERMARK_POSITIONS, WATERMARK_POSITIONS_PRESET } from '../../config';


export default class extends Component {
  constructor(props) {
    super(props);
    const { opacity, position, url, applyByDefault, activePositions, handleOpacity } = props.watermark;
    let { urls } = props.watermark;

    let setActivePositions = [];
    let activePosition = position || 'center';

    // check if a preset was selected
    if (typeof activePositions === 'string' && WATERMARK_POSITIONS_PRESET.hasOwnProperty(activePositions)) {
      setActivePositions = WATERMARK_POSITIONS_PRESET[activePositions];
    }

    // check if activePositons is an array
    else if (Array.isArray(activePositions)) {
      const fullPos = Array(9).fill(0);
      // merge with an default of 9 to prevent errors when the length is lower 9
      activePositions.map((val, i) => fullPos[i] = val);
      setActivePositions = fullPos;

      // return the default that all positions are active
    } else {
      setActivePositions = Array(9).fill(1);
    }

    // check if position is active else set the first upcomming active as the new active position
    if (setActivePositions[WATERMARK_POSITIONS.indexOf(activePosition)] !== 1) {
      activePosition = WATERMARK_POSITIONS[setActivePositions.indexOf(1)];
    }

    if (urls) {
      urls = urls.map((url = '') => {
        if (typeof url === 'string') {
          const splittedURL = url.split('/');

          return { url, label: splittedURL[splittedURL.length - 1] }
        } else {
          return url;
        }
      })
    }

    this.state = {
      isBlockRatio: false,
      opacity: opacity || 0.7,
      handleOpacity: typeof handleOpacity === 'boolean' ? handleOpacity : true,
      position: activePosition,
      url: url || urls && urls.length > 1 ? urls[0] && urls[0].url : '',
      urls: urls || [],
      activePositions: setActivePositions,
      isWatermarkList: urls && urls.length > 1,
      applyByDefault: applyByDefault || false,
      showWaterMarkList: false,
      selectedInputType: urls && urls.length > 1 ? 'gallery' : 'upload',
      text: '',
      color: '#000'
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // check if position has ben modified and update
    if (nextProps.watermark.position !== this.state.position) {
      this.onPositionChange(this.state.position);
    }
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

  changeText = (event) => {
    const text = event.target.value;
    const { color } = this.state;

    this.setState({ text }, () => {
      const canvas = document.createElement('canvas')
      const context = canvas.getContext('2d');
      canvas.height = 50;
      canvas.width = 350;

      context.fillStyle = color;
      context.textAlign = "start";
      context.textBaseline = "middle";
      context.font = 'bold 22px verdana';
      let { width } = context.measureText(text);
      context.fillText(text, canvas.width / 2  - (width / 2), canvas.height / 2, canvas.width);
      
      this.changeURL({ target: { value: canvas.toDataURL('image/png', 1) }});
    });
  }

  changeColor = (event) => {
    const { text } = this.state;
    this.setState( { color: event.target.value }, () => {
      this.changeText({ target: { value: text } });
    });
  }

  readFile = (event) => {
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.changeURL({ target: { value: e.target.result } });
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
      this.props.updateState({
        logoImage: newImage,
        isShowSpinner: false,
        watermark: { ...this.props.watermark, url: newImage.src }
      });
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

  handleInputTypeChange = ({ target }) => {
    this.setState({ selectedInputType: target.value });
  }

  render() {
    const {
      isWatermarkList,
      url,
      urls,
      opacity,
      handleOpacity,
      position,
      activePositions,
      applyByDefault,
      showWaterMarkList,
      selectedInputType,
      text,
      color
    } = this.state;
    const fileUploadInput = selectedInputType === 'upload';
    const galleryInput = selectedInputType === 'gallery';
    const urlInput = selectedInputType === 'url';
    const textInput = selectedInputType === 'text';
    const { t } = this.props;

    console.log(urls, url)

    return (
      <WatermarkWrapper>

        <WatermarkInputTypes>
          <label>
            {t['common.gallery']}
            <input
              type="radio"
              value="gallery"
              checked={selectedInputType === 'gallery'}
              onChange={this.handleInputTypeChange}
            />
            <span/>
          </label>
          <label>
            {t['common.upload']}
            <input
              type="radio"
              value="upload"
              checked={selectedInputType === 'upload'}
              onChange={this.handleInputTypeChange}/>
            <span/>
          </label>
          <label>
            {t['common.url']}
            <input
              type="radio"
              value="url"
              checked={selectedInputType === 'url'}
              onChange={this.handleInputTypeChange}/>
            <span/>
          </label>
          <label>
            {t['common.text']}
            <input
              type="radio"
              value="text"
              checked={selectedInputType === 'text'}
              onChange={this.handleInputTypeChange}/>
            <span/>
          </label>
        </WatermarkInputTypes>

        <WatermarkInputs>
          <WrapperForURL>
            {galleryInput && (<>
              <label htmlFor="url">Watermark Gallery</label>
              <Select
                width="100%"
                list={urls}
                valueProp="url"
                id="gallery"
                value={url}
                style={{ width: 'calc(100% - 120px)' }}
                onChange={(url) => { this.changeURL({ target: { value: url } }) }}
              />
            </>)}
            {urlInput && (<>
              <label htmlFor="url">Watermark URL</label>
              <FieldInput
                id="url"
                value={url}
                style={{ width: 'calc(100% - 120px)' }}
                onChange={this.changeURL}
              />
            </>)}
            {fileUploadInput && (<>
              <label htmlFor="image-upload">Watermark Image</label>
              <FileInput
                id="image-upload"
                style={{ width: 'calc(100% - 120px)' }}
                onChange={this.readFile}
              />
            </>)}
            {textInput && (<>
              <label htmlFor="text">Watermark Text</label>
              <FieldInput
                id="text"
                value={text}
                style={{ width: 'calc(70% - 120px)' }}
                onChange={this.changeText}
                maxLength={24}
              />
              <FieldInput
                value={color}
                type="color"
                style={{ width: 'calc(35% - 120px)', marginLeft: '10px' }}
                onChange={this.changeColor}
              />
            </>)}
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
          {WATERMARK_POSITIONS.map((value, index) => (
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

        {isWatermarkList && showWaterMarkList && (
          <Watermarks>
            {urls.map(url => <WatermarkIcon key={url} src={url} onClick={() => { this.onChangeWatermark(url) }}/>)}
          </Watermarks>
        )}

      </WatermarkWrapper>
    )
  }
}