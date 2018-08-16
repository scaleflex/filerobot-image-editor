import React, { Component } from 'react';
import { Footer, PreviousBtn, NextBtn, Switcher } from '../../styledComponents/index';


export default class extends Component {
  onChangeProcessWithCloudimageSwitcher = (processWithCloudimage) => {
    const { updateState, onRevert, forceApplyOperations } = this.props;

    updateState({ processWithCloudimage });

    if (processWithCloudimage) {
      forceApplyOperations([]);
      updateState({ operations: [], activeTab: null });
    }
  }

  render() {
    const { operations = [], currentOperation = null, redoOperation, processWithCloudimage } = this.props;
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
          handleChange={this.onChangeProcessWithCloudimageSwitcher}
          text={'Process with cloudimage'}
        />
      </Footer>
    )
  }
}