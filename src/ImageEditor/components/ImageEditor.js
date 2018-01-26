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
    this.setState({ activeTab: null });
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

    this.setState({ isHideCanvas: true });
    addEffect(name);
  }

  apply = () => {
    const { activeTab, applyChanges } = this.state;

    this.setState({ isHideCanvas: true });
    applyChanges(activeTab);
  }

  redoOperation = (operationIndex) => {
    const { applyOperations, operations } = this.state;

    this.setState({ activeTab: null, isHideCanvas: true });
    applyOperations(operations, operationIndex);
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
      onApplyEffects: this.onApplyEffects
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