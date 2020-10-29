import React, { Component } from 'react';
import {
  FieldInput,
  FileInput,
  PositionSquare,
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
import {
  WATERMARK_POSITIONS,
  WATERMARK_POSITIONS_PRESET,
  WATERMARK_CLOUDIMAGE_FONTS,
  WATERMARK_UNIQUE_KEY,
  SHAPES_VARIANTS
} from '../../config';
import { getWatermarkPosition, getCanvasNode } from '../../utils';


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

    this.initWatermarkImage(url);

    this.state = {
      isBlockRatio: false,
      opacity: opacity || 0.7,
      handleOpacity: typeof handleOpacity === 'boolean' ? handleOpacity : true,
      position: activePosition,
      url: url || (urls && urls.length > 1 ? urls[0] && urls[0].url : ''),
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
      fonts: fonts || this.props.config.theme.fonts,
    }
  }

  componentDidUpdate(prevProps) {
    const nextProps = this.props;
    // check if position has ben modified and update
    if (nextProps.watermark.position !== this.state.position) {
      this.onPositionChange(this.state.position);
    }
    if (nextProps.watermark.applyByDefault !== prevProps.watermark.applyByDefault) {
      if (this.getWatermarkLayer()) {
        this.updateWatermarkProperty(
          { applyByDefault: false },
          { hidden: true, resizingBox: false },
          { applyByDefault: false }
        );
      } else {
        this.setState({ applyByDefault: nextProps.watermark.applyByDefault });
      }

      if (nextProps.watermark.applyByDefault) {
        if (!this.getWatermarkLayer()) {
          this.initWatermarkImage(nextProps.watermark.url);
        } else {
          this.updateWatermarkProperty(
            { applyByDefault: true },
            { hidden: false, resizingBox: true },
            { applyByDefault: true }
          );
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

    const watermark = this.getWatermarkLayer() || {};
    this.setState(data, () => {
      shapeOperations.addOrUpdate({ ...shapeData, key: WATERMARK_UNIQUE_KEY, index: watermark.index, tab: 'watermark' },
      {
        watermark: {
          ...this.props.watermark,
          ...watermarkObjectData
        }
      });
    });
  }

  getWatermarkLayer = () => {
    const { shapeOperations } = this.props;
    return shapeOperations.getShape({ key: WATERMARK_UNIQUE_KEY });
  }

  changeURL = (event, shapeData = {}) => {
    const nextValue = event.target.value;

    if (this.props.watermark.text) {
      this.initWatermarkImage(nextValue);
      return;
    }

    this.updateWatermarkProperty({ url: nextValue }, { img: nextValue, ...shapeData }, { url: '', text: false })
  }

  changeTextProperty = (event) => {
    const updatedProperty = { [event.target.name]: event.target.value };

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
      variant: SHAPES_VARIANTS.TEXT,
      tab: 'watermark',
      ...updatedProperty
    };

    this.updateWatermarkProperty(
      { ...updatedProperty },
      { ...newWatermarkData, resizingBox: true },
      { text: { ...this.props.watermark.text, ...newWatermarkData } },
    );
  }

  readFile = (event) => {
    const { config } = this.props;
    // Disable uploading file processing if it's through cloudimage
    if (config.processWithCloudimage) return null;
    
    const input = event.target;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.changeURL({ target: { value: e.target.result } }, { variant: SHAPES_VARIANTS.IMAGE });
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  onPositionChange = value => {
    const { width, height } = this.getWatermarkLayer();
    const [x, y] = getWatermarkPosition(value, getCanvasNode(this.props.config.elementId), width, height);
    this.updateWatermarkProperty({ position: value }, { x, y }, { position: value, x, y });
  }

  initWatermarkImage = debounce(500, (url) => {
    const { updateState } = this.props;
    let logoImage = null;

    updateState({ isShowSpinner: true });

    const watermarkImageState = (newImage) => ({
        logoImage: newImage,
        isShowSpinner: false,
        watermark: { ...this.props.watermark, url: newImage.src }
    });

    if (url) {
      const { shapeOperations } = this.props;
      const { opacity } = this.state;

      logoImage = new Image();
      logoImage.setAttribute('crossOrigin', 'Anonymous');

      logoImage.onload = () => {
        const { imageFilter } = this.props.watermark;
        let watermarkImageStateObj;
        if (imageFilter && typeof imageFilter === 'function') {
          logoImage.onload = null;
          watermarkImageStateObj = watermarkImageState(imageFilter(logoImage));
        } else {
          watermarkImageStateObj = watermarkImageState(logoImage);
        }

        const index = (this.getWatermarkLayer() || {}).index;

        shapeOperations.addOrUpdate({
          img: logoImage,
          opacity,
          index,
          variant: SHAPES_VARIANTS.IMAGE,
          key: WATERMARK_UNIQUE_KEY,
          tab: 'watermark'
        }, watermarkImageStateObj);
      }

      logoImage.onerror = () => {
        updateState({ isShowSpinner: false });
      }

      if (url.match(/^https?:\/\/./)) {
        // if the url is a HTTP URL add a cache breaker
        logoImage.src = url + '?' + new Date().getTime();
      } else {
        logoImage.src = url;
      }
    } else {
      updateState({ isShowSpinner: false });
    }
  });

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
    const { updateState, config } = this.props;
    updateState({ isShowSpinner: true });

    this.setState({ selectedInputType: target.value });
    if (target.value === 'text') {
      this.changeTextProperty({
        target: {
          name: 'text',
          value: (config.watermark || {}).defaultText || 'Your text'
        }
      })
      updateState({ isShowSpinner: false })
    } else {
      updateState({ watermark: {...this.props.watermark, text: null } });
      this.initWatermarkImage(this.props.watermark.url || '')
    }
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
                style={{ width: 'calc(65% - 135px)', minWidth: 120 }}
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
              <label htmlFor="opacity" style={{ minWidth: 80 }}>Opacity</label>
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