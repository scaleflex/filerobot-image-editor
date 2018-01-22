import React, { Component } from 'react';
import { } from '../../config';
import {
  CropWrapper, CustomLabel, FieldSet, FieldLabel, FieldInput, BlockRatioWrapper, BlockRatioBtn, BlockRatioIcon
} from '../../styledComponents';


export default class extends Component {
  render() {
    return (
      <CropWrapper>
        <CustomLabel>Custom</CustomLabel>
        <FieldSet>
          <FieldLabel>width</FieldLabel>
          <FieldInput/>
        </FieldSet>
        <BlockRatioWrapper>
          <BlockRatioBtn active={false} link><BlockRatioIcon/></BlockRatioBtn>
        </BlockRatioWrapper>
        <FieldSet>
          <FieldLabel>height</FieldLabel>
          <FieldInput/>
        </FieldSet>
      </CropWrapper>
    )
  }
}