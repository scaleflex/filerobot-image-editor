import React, { Component } from 'react';
import { Wrapper } from '../styledComponents/index';
import { Header, Preview, Footer } from './';

// for some reason we cannot import caman.full.js into build
const script = document.createElement('script');
script.src = '//jolipage.api.airstore.io/v1/get/_/d93231a3-1e6a-5b0e-8882-342c64c5fb8f/caman.full.min.js';
document.body.appendChild(script);

export default class extends Component {
  constructor(props) {
    super();

    const { PROCESS_WITH_CLOUDIMAGE } = props.config;

   this.state = {
     isShowSpinner: true,
     isHideCanvas: false,
     activeTab: null,
     operations: [],
     currentOperation: null,
     original: { width: 300, height: 200 },
     cropDetails: { width: 300, height: 200 },
     canvasDimensions: { width: 300, height: 200, ratio: 1.5 },
     processWithCloudimage: PROCESS_WITH_CLOUDIMAGE
   }
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

    if (activeTab === 'orientation') {
      revert(() => {
        applyOperations(operations, index, () => {
          this.setState({ isHideCanvas: false, isShowSpinner: false });
        });
      });
    }

    this.setState({ activeTab: null, isShowSpinner: false, isHideCanvas: false });
  }

  forceApplyOperations = (operations, activeTab) => {
    const { revert, applyOperations  } = this.state;

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
      canvasDimensions, processWithCloudimage
    } = this.state;
    const { src, config, onClose, onUpload, closeOnLoad = true } = this.props;
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
      forceApplyOperations: this.forceApplyOperations,
      updateState: this.updateState,
      onRevert: this.onRevert,
      apply: this.apply,
      onSave: this.onSave,
      onResize: this.onResize,
      onApplyEffects: this.onApplyEffects,
      onRotate: this.onRotate,
      onAdjust: this.onAdjust
    };
    const previewProps = {
      activeTab,
      isShowSpinner,
      operations,
      currentOperation,
      isHideCanvas,
      src,
      onClose,
      onUpload,
      canvasDimensions,
      closeOnLoad,
      config,
      processWithCloudimage,
      updateState: this.updateState
    };
    const footerProps = {
      operations,
      currentOperation,
      processWithCloudimage,
      forceApplyOperations: this.forceApplyOperations,
      updateState: this.updateState,
      redoOperation: this.redoOperation
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