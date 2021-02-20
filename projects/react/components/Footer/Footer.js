import { Component } from 'react';
import { Footer, PreviousBtn, NextBtn, ResetBtn, Switcher, FullscreenBtn } from '../../styledComponents';
import { toggleModalFullscreen } from '../../utils/full-screen-handle';


export default class extends Component {
  onApplyWatermarkChange = () => {
    this.props.updateState({
      watermark: { ...this.props.watermark, applyByDefault: !this.props.watermark.applyByDefault }
    });
  }

  render() {
    const {
      initialZoom, operations, operationsZoomed, currentOperation = null, redoOperation,
      resetOperations, activeBody, t, logoImage, watermark, config
    } = this.props;
    const { elementId } = config;
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
          onClick={() => { !isPrevForbidden && redoOperation({
            operationIndex: currentOperationIndex - 1,
            operationObject: { ...operationList[currentOperationIndex], index: currentOperationIndex }});
          }}
          muted={isPrevForbidden}
          title={t['footer.undo']}
        />
        <NextBtn
          onClick={() => { !isNextForbidden && redoOperation({
            operationIndex: currentOperationIndex + 1,
            operationObject: { ...operationList[currentOperationIndex], index: currentOperationIndex } });
          }}
          muted={isNextForbidden}
          title={t['footer.redo']}
        />
        <FullscreenBtn onClick={() => toggleModalFullscreen(elementId)} title={t[`header.toggle_fullscreen`]} />

        {logoImage && watermark &&
        <Switcher
          id="switch-watermark-footer"
          checked={watermark && watermark.applyByDefault}
          handleChange={this.onApplyWatermarkChange}
          text={t['common.apply_watermark']}
        />}
      </Footer>
    )
  }
}