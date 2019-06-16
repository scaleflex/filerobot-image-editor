import React, { Component } from 'react';
import { Wrapper } from './styledComponents/index';
import { Header, Preview, Footer } from './components/index';
import imageType from 'image-type';
import './lib/caman';


export default class extends Component {
  constructor(props) {
    super();

    const { processWithCloudimage, uploadWithCloudimageLink } = props.config;

    this.state = {
      isShowSpinner: true,
      isHideCanvas: false,
      activeTab: null,
      operations: [],
      currentOperation: null,
      original: { width: 300, height: 200 },
      cropDetails: { width: 300, height: 200 },
      canvasDimensions: { width: 300, height: 200, ratio: 1.5 },
      processWithCloudimage: processWithCloudimage,
      uploadCloudimageImage: uploadWithCloudimageLink
    }
  }

  componentDidMount() {
    this.determineImageType();
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

  updateState = props => { this.setState(props); }

  onRevert = (all) => {
    const { cleanTemp, activeTab, revert, applyOperations, operations } = this.state;
    const index = all ? 0 : operations.length - 1;

    if (activeTab === 'effects' || activeTab === 'filters') {
      this.setState({ activeTab: null, isShowSpinner: true, isHideCanvas: true });
      cleanTemp();
      return;
    }

    if (activeTab === 'rotate') {
      revert(() => {
        applyOperations(operations, index, () => {
          this.setState({ isHideCanvas: false, isShowSpinner: false });
        });
      });
    }

    this.setState({ activeTab: null, isShowSpinner: false, isHideCanvas: false });
  }

  forceApplyOperations = (operations, activeTab) => {
    const { revert, applyOperations } = this.state;

    this.setState({ activeTab: null, isShowSpinner: true, isHideCanvas: true });

    revert(() => {
      applyOperations(operations, operations.length, () => {
        this.setState({ isHideCanvas: false, isShowSpinner: false, activeTab: activeTab });
      });
    });
  }

  onAdjust = (handler, value) => {
    const { adjust } = this.state;

    adjust(handler, value);
  }

  onRotate = (value, total) => {
    const { rotate } = this.state;

    rotate(value, total);
  }

  onSave = () => {
    const { saveImage } = this.state;

    this.setState({ isShowSpinner: true });
    saveImage();
  }

  onDownloadImage = () => {
    const { downloadImage } = this.state;

    downloadImage();
  }

  onResize = (params) => {
    const { resize } = this.state;

    resize(params);
  }

  onApplyEffects = name => {
    const { addEffect } = this.state;

    this.setState({ isHideCanvas: true, isShowSpinner: true });
    addEffect(name);
  }

  apply = () => {
    const { activeTab, applyChanges } = this.state;

    this.setState({ isHideCanvas: true });
    applyChanges(activeTab);
  }

  redoOperation = (operationIndex) => {
    const { applyOperations, operations, revert } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true, isShowSpinner: true });
    revert(() => {
      applyOperations(operations, operationIndex, () => {
        this.setState({ isHideCanvas: false, isShowSpinner: false });
      });
    });
  }

  render() {
    const {
      isShowSpinner, activeTab, operations, currentOperation, isHideCanvas, cropDetails, original,
      canvasDimensions, processWithCloudimage, uploadCloudimageImage, imageMime
    } = this.state;
    const { src, config, onClose, onComplete, closeOnLoad = true, showGoBackBtn = false } = this.props;
    const headerProps = {
      cropDetails,
      original,
      activeTab,
      src,
      onClose,
      canvasDimensions,
      processWithCloudimage,
      operations,
      isShowSpinner,
      showGoBackBtn,
      forceApplyOperations: this.forceApplyOperations,
      updateState: this.updateState,
      onRevert: this.onRevert,
      apply: this.apply,
      onSave: this.onSave,
      onResize: this.onResize,
      onApplyEffects: this.onApplyEffects,
      onRotate: this.onRotate,
      onAdjust: this.onAdjust,
      onDownloadImage: this.onDownloadImage
    };
    const previewProps = {
      activeTab,
      isShowSpinner,
      operations,
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
      updateState: this.updateState
    };
    const footerProps = {
      operations,
      currentOperation,
      processWithCloudimage,
      forceApplyOperations: this.forceApplyOperations,
      updateState: this.updateState,
      redoOperation: this.redoOperation,
      config
    };

    return (
      <Wrapper>

        <Header {...headerProps}/>

        <Preview {...previewProps}/>

        <Footer {...footerProps}/>

      </Wrapper>
    )
  }
}