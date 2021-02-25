import { Component } from 'react';
import {
  BlockRatioBtn,
  BlockRatioIcon,
  BlockRatioWrapper,
  FieldInput,
  FieldLabel,
  FieldSet,
  ResizeBox,
  ResizeWrapper,
  SuggestionOption,
  SuggestionsBox
} from '../../styledComponents';


export default class extends Component {
  state = {
    isBlockRatio: false
  };

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

  applyPreset = ({ width, height }) => {
    this.props.updateState({ canvasDimensions: { ratio: width / height, width, height } });
  }

  toggleRatio = () => {
    this.setState({ isBlockRatio: !this.state.isBlockRatio });
  }

  render() {
    const { isBlockRatio } = this.state;
    const { canvasDimensions, processWithCloudService, t, config } = this.props;
    const { resizePresets = [] } = config;

    return (
      <ResizeWrapper>
        <ResizeBox>
          <FieldSet>
            <FieldLabel>{t['common.width']}</FieldLabel>
            <FieldInput
              fullSize
              value={parseInt(canvasDimensions.width, 10) || ''}
              onChange={this.changeWidth}
            />
          </FieldSet>
          <BlockRatioWrapper>
            <BlockRatioBtn
              active={!isBlockRatio}
              style={processWithCloudService ? { cursor: 'not-allowed' } : {}}
              link
              onClick={() => { !processWithCloudService && this.toggleRatio(); }}
            >
              <BlockRatioIcon active={!isBlockRatio} style={processWithCloudService ? { cursor: 'not-allowed' } : {}}/>
            </BlockRatioBtn>
          </BlockRatioWrapper>
          <FieldSet>
            <FieldLabel>{t['common.height']}</FieldLabel>
            <FieldInput
              fullSize
              value={parseInt(canvasDimensions.height, 10) || ''}
              onChange={this.changeHeight}
            />
          </FieldSet>
        </ResizeBox>
        <SuggestionsBox>
          {resizePresets
            .filter(preset =>
              Math.abs(canvasDimensions.width / canvasDimensions.height - preset.ratio) < 0.05
            )
            .map(preset => (
              <SuggestionOption key={preset.name} onClick={() => { this.applyPreset(preset); }}>
                <div>{preset.width} x {preset.height}</div>
                <div>{preset.name}</div>
              </SuggestionOption>
            ))}
        </SuggestionsBox>
      </ResizeWrapper>
    )
  }
}