import React, { Component } from 'react';
import { Footer, PreviousBtn, NextBtn, Switcher } from '../../styledComponents/index';


export default class extends Component {
  render() {
    const { operations = [], currentOperation = null, redoOperation, updateState, processWithCloudimage } = this.props;
    const currentOperationIndex = operations.findIndex(operation => operation === currentOperation);
    const isCurrentOperationLast = currentOperation && (operations[operations.length - 1] === currentOperation);
    const isPrevForbidden = (operations.length < 1) || (currentOperationIndex === -1);
    const isNextForbidden = (operations.length < 2 || (operations.length > 1 && isCurrentOperationLast)) &&
      (currentOperationIndex !== -1 || operations.length !== 1);

    return (
      <Footer>
        <PreviousBtn
          onClick={() => { !isPrevForbidden && redoOperation(currentOperationIndex - 1); }}
          muted={isPrevForbidden}
        />
        <NextBtn
          onClick={() => { !isNextForbidden && redoOperation(currentOperationIndex + 1); }}
          muted={isNextForbidden}
        />

        <Switcher
          id="cloudimage-url-generator-switch"
          checked={processWithCloudimage}
          handleChange={(processWithCloudimage) => { updateState({ processWithCloudimage }) }}
          text={'Process with cloudimage'}
        />
      </Footer>
    )
  }
}