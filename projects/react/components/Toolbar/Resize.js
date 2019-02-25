import React, { Component } from 'react';
import {
  ResizeWrapper, ResizeBox, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon
} from '../../styledComponents';


export default class extends Component {
  state = {
    isBlockRatio: false
  };

  componentDidMount() {
    const { operations, processWithCloudimage, updateState, forceApplyOperations } = this.props;
    const operationIndex = operations.findIndex(({ stack }) => stack[0].name === 'resize');

    if (operationIndex > -1 && processWithCloudimage) {
      operations.splice(operationIndex, 1);
      updateState({ operations });
      forceApplyOperations(operations, 'resize');
    }
  }

  changeWidth = (event) => {
    const { isBlockRatio } = this.state;
    const { canvasDimensions } = this.props;
    const width = event.target.value;
    let height = canvasDimensions.height;

    if (!isBlockRatio)
      height = (width && (width / canvasDimensions.ratio)) || 1;

    this.props.updateState({ canvasDimensions: { ...canvasDimensions, width, height } });
  }

  changeHeight = (event) => {
    const { isBlockRatio } = this.state;
    const { canvasDimensions } = this.props;
    const height = event.target.value;
    let width = canvasDimensions.width;

    if (!isBlockRatio)
      width = (height && (height * canvasDimensions.ratio)) || 1;

    this.props.updateState({ canvasDimensions: { ...canvasDimensions, width, height } });
  }

  toggleRatio = () => {
    this.setState({ isBlockRatio: !this.state.isBlockRatio });
  }

  render() {
    const { isBlockRatio } = this.state;
    const { canvasDimensions, processWithCloudimage } = this.props;

    return (
      <ResizeWrapper>
        <ResizeBox>
          <FieldSet>
            <FieldLabel>width</FieldLabel>
            <FieldInput
              fullSize
              value={parseInt(canvasDimensions.width, 10) || ''}
              onChange={this.changeWidth}
            />
          </FieldSet>
          <BlockRatioWrapper>
            <BlockRatioBtn
              active={!isBlockRatio}
              style={processWithCloudimage ? { cursor: 'not-allowed' } : {}}
              link
              onClick={() => { !processWithCloudimage && this.toggleRatio(); }}
            >
              <BlockRatioIcon active={!isBlockRatio} style={processWithCloudimage ? { cursor: 'not-allowed' } : {}}/>
            </BlockRatioBtn>
          </BlockRatioWrapper>
          <FieldSet>
            <FieldLabel>height</FieldLabel>
            <FieldInput
              fullSize
              value={parseInt(canvasDimensions.height, 10) || ''}
              onChange={this.changeHeight}
            />
          </FieldSet>
        </ResizeBox>
      </ResizeWrapper>
    )
  }
}