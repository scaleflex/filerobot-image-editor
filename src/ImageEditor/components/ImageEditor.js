import React, { Component } from 'react';
import { Wrapper } from '../styledComponents/index';
import { Header, Preview, Footer } from './';


export default class extends Component {
  state = {
    isShowSpinner: true,
    isHideCanvas: false,
    activeTab: null,
    operations: [],
    currentOperation: null,
    original: { width: 300, height: 200 },
    cropDetails: { width: 300, height: 200 },
    canvasDimensions: { width: 300, height: 200, ratio: 1.5 }
  }

  updateState = props => { this.setState(props); }

  onRevert = () => {
    const { cleanTemp, activeTab, revert, applyOperations, operations } = this.state;

    if (activeTab === 'effects' || activeTab === 'filters') {
      this.setState({ activeTab: null, isShowSpinner: true, isHideCanvas: true });
      cleanTemp();
      return;
    }

    if (activeTab === 'orientation') {
      revert(() => {
        applyOperations(operations, operations.length - 1, () => {
          this.setState({ isHideCanvas: false, isShowSpinner: false });
        });
      });
    }

    this.setState({ activeTab: null, isShowSpinner: false, isHideCanvas: false });
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
      canvasDimensions
    } = this.state;
    const { src, onClose, onUpdate } = this.props;
    const headerProps = {
      cropDetails,
      original,
      activeTab,
      src,
      onClose,
      canvasDimensions,
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
      onUpdate,
      canvasDimensions,
      updateState: this.updateState
    };
    const footerProps = { operations, currentOperation, redoOperation: this.redoOperation };

    return (
      <Wrapper>

        <Header {...headerProps}/>

        <Preview {...previewProps}/>

        <Footer {...footerProps}/>

      </Wrapper>
    )
  }
}