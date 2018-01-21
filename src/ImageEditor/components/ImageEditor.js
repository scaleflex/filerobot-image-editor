import React, { Component } from 'react';
import { Wrapper } from '../styledComponents/index';
import { Header, Preview, Footer } from './';


export default class extends Component {
  state = {
    isShowSpinner: true,
    isHideCanvas: false,
    activeTab: null,
    operations: [],
    currentOperation: null
  }

  updateState = props => { this.setState(props); }

  onRevert = () => {
    this.setState({ activeTab: null });
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
    const { isShowSpinner, activeTab, operations, currentOperation, isHideCanvas } = this.state;
    const headerProps = { updateState: this.updateState, activeTab, onRevert: this.onRevert, apply: this.apply };
    const previewProps = {
      updateState: this.updateState, activeTab, isShowSpinner, operations, currentOperation, isHideCanvas
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