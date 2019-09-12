import React, { Component } from 'react';
import { Footer, PreviousBtn, NextBtn, ResetBtn, Switcher } from '../../styledComponents';


export default class extends Component {
  onApplyWatermarkChange = () => {
    this.props.updateState({
      watermark: { ...this.props.watermark, applyByDefault: !this.props.watermark.applyByDefault }
    });
  }

  render() {
    const {
      initialZoom, operations, operationsZoomed, currentOperation = null, redoOperation,
      resetOperations, activeBody, t, logoImage, watermark
    } = this.props;
    const operationList = initialZoom === 1 ? operations : operationsZoomed;
    const currentOperationIndex = operationList.findIndex(operation => operation === currentOperation);
    const isCurrentOperationLast = currentOperation && (operationList[operationList.length - 1] === currentOperation);
    const isPrevForbidden = (operationList.length < 1) || (currentOperationIndex === -1);
    const isNextForbidden = (operationList.length < 2 || (operationList.length > 1 && isCurrentOperationLast)) &&
      (currentOperationIndex !== -1 || operationList.length !== 1);

    return (
      <Footer>
        <ResetBtn
          muted={activeBody !== 'preview'}
          onClick={() => { activeBody === 'preview' && resetOperations(); }}
          title={t['footer.reset']}
        />

        <PreviousBtn
          onClick={() => { !isPrevForbidden && redoOperation(currentOperationIndex - 1); }}
          muted={isPrevForbidden}
          title={t['footer.undo']}
        />
        <NextBtn
          onClick={() => { !isNextForbidden && redoOperation(currentOperationIndex + 1); }}
          muted={isNextForbidden}
          title={t['footer.redo']}
        />

        {logoImage && watermark &&
        <Switcher
          id="switch-watermark-footer"
          checked={watermark && watermark.applyByDefault}
          handleChange={this.onApplyWatermarkChange}
          text={'Apply watermark'}
        />}
      </Footer>
    )
  }
}