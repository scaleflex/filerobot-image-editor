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
import { WATERMARK_POSITIONS, WATERMARK_POSITIONS_PRESET, WATERMARK_STANDARD_FONTS, WATERMARK_CLOUDIMAGE_FONTS, WATERMARK_UNIQUE_KEY } from '../../config';


export default class extends Component {
  constructor(props) {
    super(props);
    const { opacity, position, url, applyByDefault, activePositions, handleOpacity } = props.watermark;
    let { urls, fonts } = props.watermark;

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
      color: '#000000',
      textSize: 62,
      textFont: 'Arial',
      fonts: fonts || WATERMARK_STANDARD_FONTS,
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    // check if position has ben modified and update
    if (nextProps.watermark.position !== this.state.position) {
      this.onPositionChange(this.state.position);
    }
    if (nextProps.watermark.applyByDefault !== this.props.watermark.applyByDefault) {
      if (this.props.watermark.logoImage) {
        this.updateWatermarkProperty({ applyByDefault: false }, { hidden: true }, { applyByDefault: false });
      } else {
        this.setState({ applyByDefault: nextProps.watermark.applyByDefault });
      }

      if (nextProps.watermark.applyByDefault) {
        if (!this.props.watermark.logoImage) {
          this.initWatermarkImage(nextProps.watermark.url);
        } else {
          this.updateWatermarkProperty({ applyByDefault: true }, { hidden: false }, { applyByDefault: true });
        }
      }
    }
  }

  changeOpacity = (opacity) => {
    this.updateWatermarkProperty({ opacity });
  }

  updateWatermarkProperty = (data, shapeData, watermarkObjectData) => {
    const { shapeOperations } = this.props;
    if (!shapeData) { shapeData = data }
    if (!watermarkObjectData) { watermarkObjectData = data }

    const watermark = this.getWatermarkLayer(shapeOperations);
    this.setState(data, () => {
      shapeOperations.updateShape(shapeData, watermark.index,
      {
        watermark: {
          ...this.props.watermark,
          ...watermarkObjectData
        }
      });
    });
  }

  getWatermarkLayer = (operations) => {
    return operations.getShape({ key: WATERMARK_UNIQUE_KEY });
  }

  changeURL = (event) => {
    const nextValue = event.target.value;

    if (this.props.watermark.text) {
      this.initWatermarkImage(nextValue);
      return;
    }

    this.updateWatermarkProperty({ url: nextValue }, { img: nextValue }, { url: '', text: false })
  }

  changeTextProperty = (event) => {
    const updatedProperty = { [event.target.name]: event.target.value };
    const { shapeOperations } = this.props;

    if (this.props.watermark.text) {
      this.updateWatermarkProperty(updatedProperty);
      return;
    }

    const { text, color, textSize, textFont, opacity } = this.state;

    const newWatermarkData = {
      text,
      color,
      textSize,
      textFont,
      opacity,
      ...updatedProperty
    };

    this.setState({ ...updatedProperty }, () => {
      shapeOperations.addText({
        ...newWatermarkData,
        key: WATERMARK_UNIQUE_KEY,
        otherStates: {
          watermark: {
            ...this.props.watermark, 
            text: {
              ...newWatermarkData
            },
          }
        }
      });
    })
  }

  readFile = (event) => {
    const { config } = this.props;
    // Disable uploading file processing if it's through cloudimage
    if (config.processWithCloudimage) return null;
    
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
      const { shapeOperations } = this.props;

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

        shapeOperations.addImage({ img: logoImage, key: WATERMARK_UNIQUE_KEY });
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
    
    this.updateWatermarkProperty(
      { applyByDefault: nextValue },
      { hidden: !nextValue },
      { applyByDefault: nextValue }
    );
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
      color,
      textFont,
      textSize,
      fonts,
    } = this.state;
    const { config } = this.props;
    const fileUploadInput = selectedInputType === 'upload';
    const galleryInput = selectedInputType === 'gallery';
    const urlInput = selectedInputType === 'url';
    const textInput = selectedInputType === 'text';
    const { t } = this.props;

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
          <label style={{ cursor: config.processWithCloudimage ? 'not-allowed' : 'auto' }}>
            {t['common.upload']}
            <input
              type="radio"
              value="upload"
              checked={selectedInputType === 'upload'}
              disabled={config.processWithCloudimage}
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
                onChange={(url) => { console.log('chosen', url); this.changeURL({ target: { value: url } }) }}
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
                style={{ width: 'calc(65% - 135px)' }}
                name="text"
                onChange={this.changeTextProperty}
              />
              <Select
                list={config.processWithCloudimage ? WATERMARK_CLOUDIMAGE_FONTS : fonts}
                valueProp="value"
                id="textFont"
                value={textFont}
                style={{ width: 111, display: 'inline-block', marginLeft: 8 }}
                onChange={(value) => this.changeTextProperty({ target: { name: 'textFont', value } })}
              />
              <FieldInput
                value={textSize}
                type="number"
                name="textSize"
                style={{ width: 60, marginLeft: 8 }}
                onChange={this.changeTextProperty}
              />
              <FieldInput
                value={color}
                type="color"
                style={{ width: 30, marginLeft: 8, padding: 0, background: 'transparent', boxShadow: 'none' }}
                name="color"
                onChange={this.changeTextProperty}
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
                updateRange={this.changeOpacity}
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