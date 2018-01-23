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
    cropDetails: { width: 300, height: 200 }
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
      isShowSpinner, activeTab, operations, currentOperation, isHideCanvas, cropDetails, original
    } = this.state;
    const { src, onClose, onUpdate } = this.props;
    const headerProps = {
      updateState: this.updateState, activeTab, onRevert: this.onRevert, apply: this.apply, src, onClose,
      onSave: this.onSave, cropDetails, original
    };
    const previewProps = {
      updateState: this.updateState, activeTab, isShowSpinner, operations, currentOperation, isHideCanvas,
      src, onClose, onUpdate
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