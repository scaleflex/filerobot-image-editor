import React, { Component } from 'react';
import { Footer, PreviousBtn, NextBtn, ResetBtn, Switcher } from '../../styledComponents/index';


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
    const {
      initialZoom, operations, operationsZoomed, currentOperation = null, redoOperation,
      processWithCloudimage, config, resetOperations
    } = this.props;
    const { hideCloudimageSwitcher } = config;
    const operationList = initialZoom === 1 ? operations : operationsZoomed;
    const currentOperationIndex = operationList.findIndex(operation => operation === currentOperation);
    const isCurrentOperationLast = currentOperation && (operationList[operationList.length - 1] === currentOperation);
    const isPrevForbidden = (operationList.length < 1) || (currentOperationIndex === -1);
    const isNextForbidden = (operationList.length < 2 || (operationList.length > 1 && isCurrentOperationLast)) &&
      (currentOperationIndex !== -1 || operationList.length !== 1);

    return (
      <Footer>
        <ResetBtn onClick={resetOperations} title="reset"/>

        <PreviousBtn
          onClick={() => { !isPrevForbidden && redoOperation(currentOperationIndex - 1); }}
          muted={isPrevForbidden}
          title="undo"
        />
        <NextBtn
          onClick={() => { !isNextForbidden && redoOperation(currentOperationIndex + 1); }}
          muted={isNextForbidden}
          title="redo"
        />

        {!hideCloudimageSwitcher &&
        <Switcher
          id="cloudimage-url-generator-switch"
          checked={processWithCloudimage}
          handleChange={this.onChangeProcessWithCloudimageSwitcher}
          text={'Process with cloudimage'}
        />}
      </Footer>
    )
  }
}