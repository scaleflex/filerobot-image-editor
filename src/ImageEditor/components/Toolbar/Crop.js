import React, { Component } from 'react';
import {} from '../../config';
import {
  CropWrapper, CustomLabel, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon,
  CropBox, CropBoxInner, CropShape, CropLabel
} from '../../styledComponents';


const BOXES = [
  { name: 'original', value: 0 },
  { name: 'square', value: 1 },
  { name: '5 : 4', value: 1.25 },
  { name: '4 : 3', value: 1.33333 },
  { name: '6 : 4', value: 1.5 },
]


export default class extends Component {
  state = {
    aspectRatio: NaN,
    activeRatio: 'custom'
  }

  changeWidth = (event) => {
    const { cropDetails, original } = this.props;
    const container = document.querySelector('#preview-img-box');
    const rect = container.getBoundingClientRect();
    const width = original.width === rect.width ?
      +event.target.value : ((rect.width / original.width) * +event.target.value);

    window.scaleflexPlugins.cropperjs.setCropBoxData({ ...cropDetails, width  });
  }

  changeHeight = (event) => {
    const { cropDetails, original } = this.props;
    const container = document.querySelector('#preview-img-box');
    const rect = container.getBoundingClientRect();
    const height = original.height === rect.height ?
      +event.target.value : ((rect.height / original.height) * +event.target.value);

    window.scaleflexPlugins.cropperjs.setCropBoxData({ ...cropDetails, height });
  }

  toggleRatio = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const { cropDetails } = this.props;
    const { width, height } = cropDetails;
    let aspectRatio = this.state.aspectRatio;
    aspectRatio = aspectRatio ? NaN : width / height;

    window.scaleflexPlugins.cropperjs.setAspectRatio(aspectRatio);
    this.setState({ aspectRatio });
  }

  changeRatio = (box) => {
    const { aspectRatio } = this.state;
    const { original: { width = 1, height = 1 } } = this.props;
    let value;

    if (box.name === 'custom' && !aspectRatio) {
      this.setState({ activeRatio: box.name });
      return;
    }

    value = box.name === 'original' ? width / height : box.value;
    window.scaleflexPlugins.cropperjs.setAspectRatio(value);
    this.setState({ activeRatio: box.name, aspectRatio: value });
  }

  render() {
    const { aspectRatio, activeRatio } = this.state;
    const { cropDetails, original } = this.props;

    return (
      <CropWrapper>
        <CropBox
          active={activeRatio === 'custom'}
          onClick={this.changeRatio.bind(this, { name: 'custom' })}
        >
          <FieldSet>
            <FieldLabel>width</FieldLabel>
            <FieldInput
              dark={activeRatio === 'custom'}
              fullSize
              value={parseInt(cropDetails.width, 10)}
              onChange={this.changeWidth}
            />
          </FieldSet>
          <BlockRatioWrapper>
            <BlockRatioBtn active={aspectRatio} link onClick={this.toggleRatio}>
              <BlockRatioIcon active={aspectRatio}/>
            </BlockRatioBtn>
          </BlockRatioWrapper>
          <FieldSet>
            <FieldLabel>height</FieldLabel>
            <FieldInput
              dark={activeRatio === 'custom'}
              fullSize
              value={parseInt(cropDetails.height, 10)}
              onChange={this.changeHeight}
            />
          </FieldSet>
          <CustomLabel>Custom</CustomLabel>
        </CropBox>

        {BOXES.map(box => (
          <CropBox active={activeRatio === box.name} onClick={this.changeRatio.bind(this, box)} key={box.name}>
            <CropBoxInner>
              <CropShape ratio={box.value || original.width / original.height}/>
              <CropLabel>
                {box.name}
              </CropLabel>
            </CropBoxInner>
          </CropBox>
        ))}
      </CropWrapper>
    )
  }
}