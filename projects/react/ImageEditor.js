import React, { Component } from 'react';
import { PreviewWrapper, Spinner, Wrapper } from './styledComponents/index';
import { Header, Preview, PreResize, Footer } from './components/index';
import imageType from 'image-type';
import './lib/caman';


const INITIAL_PARAMS = {
  effect: null,
  filter: null,
  crop: null,
  resize: null,
  rotate: null,
  correctionDegree: 0,
  flipX: false,
  flipY: false,
  adjust: {
    brightness: 0,
    contrast: 0,
    saturation: 0,
    exposure: 0
  },
  canvasDimensions: { width: 300, height: 200, ratio: 1.5 }
};

export default class extends Component {
  constructor(props) {
    super();

    const {
      processWithCloudimage, processWithFilerobot, uploadWithCloudimageLink, reduceBeforeEdit, cropBeforeEdit
    } = props.config;

    this.state = {
      isShowSpinner: true,
      isHideCanvas: false,
      activeTab: null,
      activeBody: null,
      currentOperation: null,
      original: { width: 300, height: 200 },
      cropDetails: { width: 300, height: 200 },
      canvasDimensions: { width: 300, height: 200, ratio: 1.5 },
      processWithFilerobot: processWithFilerobot,
      processWithCloudimage: processWithCloudimage,
      uploadCloudimageImage: uploadWithCloudimageLink,
      reduceBeforeEdit,
      cropBeforeEdit,

      operationsOriginal: [],
      operationsZoomed: [],
      operations: [],

      canvasZoomed: null,
      canvasOriginal: null,
      isPreResize: false,

      initialZoom: 1,

      ...INITIAL_PARAMS
    }
  }

  componentDidMount() {
    this.loadImage();
    this.determineImageType();
  }

  loadImage = () => {
    const { src, config } = this.props;
    const { watermark } = config;
    const { reduceBeforeEdit: { mode, widthLimit, heightLimit } = {} } = this.state;
    const splittedSrc = src.split('/');
    const imageName = splittedSrc[splittedSrc.length - 1];
    const img = new Image();
    let logoImage = null;

    if (watermark && watermark.url) {
      logoImage = new Image();
      logoImage.setAttribute('crossOrigin', 'Anonymous');
      logoImage.src = watermark.url + '?' + new Date().getTime();
    }

    img.src = src; // + '?' + new Date().getTime();
    img.setAttribute('crossOrigin', 'Anonymous');

    img.onload = () => {
      const canvasDimensions = { width: img.width, height: img.height, ratio: img.width / img.height };
      const propsOnApply = {
        activeBody: 'preResize',
        isShowSpinner: false,
        img,
        logoImage,
        imageName: imageName.indexOf('?') > -1 ? imageName.slice(0, imageName.indexOf('?')) : imageName,
      };

      if (mode === 'manual' && (widthLimit < img.width || heightLimit < img.height)) {
        this.setState({
          canvasDimensions,
          ...propsOnApply
        });
      }

      else if (mode === 'auto' && (widthLimit < img.width || heightLimit < img.height)) {
        if (img.width >= img.height) {
          const ratio = img.width / img.height;
          const dimensions = { ratio, width: widthLimit, height: widthLimit / ratio };

          this.setState({
            preCanvasDimensions: { ...dimensions },
            canvasDimensions: { ...dimensions },
            ...propsOnApply,
            activeBody: 'preview',
            isPreResize: true
          });
        } else {
          const ratio = img.height / img.width;
          const dimensions = { ratio, width: heightLimit / ratio, height: heightLimit };

          this.setState({
            preCanvasDimensions: { ...dimensions },
            canvasDimensions: { ...dimensions },
            ...propsOnApply,
            activeBody: 'preview',
            isPreResize: true
          });
        }
      }

      else {
        this.setState({ ...propsOnApply, activeBody: 'preview', isPreResize: false });
      }
    }
  }

  determineImageType = () => {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', this.props.src);
    xhr.responseType = 'arraybuffer';

    xhr.onload = ({ target }) => {
      this.setState({ imageMime: imageType(new Uint8Array(target.response)).mime });
    };

    xhr.send();
  }

  updateState = (props, callback = () => {}) => {
    this.setState(props, callback);
  }

  onRevert = () => {
    const { cancelLastOperation, activeTab } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });

    cancelLastOperation(activeTab, () => {
      this.setState({ isHideCanvas: false, isShowSpinner: false, ...INITIAL_PARAMS });
    });
  }

  onAdjust = (handler, value) => {
    const { onAdjust } = this.state;

    onAdjust(handler, value);
  }

  onRotate = (value, correctionDegree, flipX, flipY) => {
    const { onRotate } = this.state;

    onRotate(value, correctionDegree, flipX, flipY);
  }

  onFlip = (axis) => {
    const { flip } = this.state;

    flip(axis);
  }

  onSave = () => {
    const { saveImage } = this.state;

    this.setState({ isShowSpinner: true });
    saveImage();
  }

  onDownloadImage = () => {
    const { downloadImage } = this.state;

    downloadImage(() => {
      this.props.onComplete({ status: 'success' });
      this.props.onClose();
    });
  }

  onApplyEffects = name => {
    const { applyCorrections, effect } = this.state;
    const nextEffect = effect === name ? null : name;

    this.setState(
      { isShowSpinner: true, effect: nextEffect },
      () => {
        applyCorrections(
          () => {
            this.setState({ isShowSpinner: false })
          }
        );
      }
    );
  }

  onApplyFilters = name => {
    const { applyCorrections, filter } = this.state;
    const nextFilter = filter === name ? null : name;

    this.setState(
      { isShowSpinner: true, filter: nextFilter },
      () => {
        applyCorrections(
          () => {
            this.setState({ isShowSpinner: false })
          }
        );
      }
    );
  }

  handleSave = () => {
    const {  processWithFilerobot, processWithCloudimage } = this.state;

    if (!processWithFilerobot && !processWithCloudimage) {
      this.onDownloadImage();
    } else {
      this.onSave();
    }
  }

  apply = () => {
    const { activeTab, applyChanges } = this.state;

    applyChanges(activeTab);
    this.setState({ activeTab: null });
  }

  redoOperation = (operationIndex) => {
    const { applyOperations } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });

    applyOperations(
      operationIndex,
      () => { this.setState({ isHideCanvas: false, isShowSpinner: false }); },
    );
  }

  resetOperations = () => {
    const { resetAll } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });

    resetAll(() => {
      this.setState({
        isHideCanvas: false,
        isShowSpinner: false,
        ...INITIAL_PARAMS
      });
    });
  }

  onPreResize = (value) => {
    switch (value) {
      case 'keep':
        this.setState({ canvasDimensions: {}, isPreResize: false, activeBody: 'preview' });
        break;
      case 'resize':
        const { canvasDimensions } = this.state;
        this.setState({ preCanvasDimensions: canvasDimensions, isPreResize: true, activeBody: 'preview' });
        break;
    }
  }

  render() {
    const {
      isShowSpinner, activeTab, operations, operationsOriginal, operationsZoomed, currentOperation, isHideCanvas,
      cropDetails, original, canvasDimensions, processWithCloudimage, processWithFilerobot, uploadCloudimageImage,
      imageMime, lastOperation, operationList, initialZoom, canvasZoomed, canvasOriginal, reduceBeforeEdit,
      cropBeforeEdit, img, imageName, activeBody, isPreResize, preCanvasDimensions, logoImage,

      effect,
      filter,
      crop,
      resize,
      rotate,
      correctionDegree,
      flipX,
      flipY,
      adjust
    } = this.state;
    const { src, config, onClose, onComplete, closeOnLoad = true, showGoBackBtn = false, t = {}, theme } = this.props;
    const imageParams = { effect, filter, crop, resize, rotate, flipX, flipY, adjust, correctionDegree };
    const headerProps = {
      t,
      theme,
      cropDetails,
      original,
      activeTab,
      src,
      onClose,
      config,
      canvasDimensions,
      processWithCloudimage,
      processWithFilerobot,
      operations,
      operationsOriginal,
      operationsZoomed,
      initialZoom,
      isShowSpinner,
      showGoBackBtn,
      img,
      logoImage,
      imageName,
      activeBody,
      preCanvasDimensions,
      updateState: this.updateState,
      onRevert: this.onRevert,
      apply: this.apply,
      onSave: this.onSave,
      onFlip: this.onFlip,
      onApplyEffects: this.onApplyEffects,
      onApplyFilters: this.onApplyFilters,
      onRotate: this.onRotate,
      onAdjust: this.onAdjust,
      onDownloadImage: this.onDownloadImage,
      handleSave: this.handleSave,

      ...imageParams
    };
    const previewProps = {
      t,
      theme,
      cropDetails,
      original,
      activeTab,
      isShowSpinner,
      operations,
      operationsOriginal,
      operationsZoomed,
      initialZoom,
      currentOperation,
      isHideCanvas,
      src,
      imageMime,
      onClose,
      onComplete,
      canvasDimensions,
      closeOnLoad,
      config,
      processWithCloudimage,
      uploadCloudimageImage,
      lastOperation,
      operationList,
      canvasZoomed,
      canvasOriginal,
      reduceBeforeEdit,
      cropBeforeEdit,
      img,
      logoImage,
      imageName,
      isPreResize,
      preCanvasDimensions,
      updateState: this.updateState,
      handleSave: this.handleSave,
      onPreResize: this.onPreResize,

      ...imageParams
    };
    const footerProps = {
      logoImage,
      t,
      theme,
      activeBody,
      operations,
      operationsOriginal,
      operationsZoomed,
      initialZoom,
      currentOperation,
      processWithCloudimage,
      updateState: this.updateState,
      redoOperation: this.redoOperation,
      resetOperations: this.resetOperations,
      config
    };

    return (
      <Wrapper>

        <Header {...headerProps}/>

        <PreviewWrapper>
          {activeBody === 'preview' && <Preview {...previewProps}/>}
          {activeBody === 'preResize' && <PreResize {...previewProps}/>}

          <Spinner overlay show={isShowSpinner} label={t['spinner.label']}/>
        </PreviewWrapper>
        <Footer {...footerProps}/>

      </Wrapper>
    )
  }
}