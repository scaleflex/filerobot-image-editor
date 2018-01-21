import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper
} from '../../styledComponents';
import { CloseBtn, Button } from '../../../lib/styledComponents';
import { Toolbar } from '../';


export default class extends Component{
  render() {
    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>Image Editor</Title>
          <CloseBtn/>
        </HeaderTop>

        <ToolbarWrapper>
          <LeftActions>
            {/*<Button sm fullSize>Cancel</Button>*/}
          </LeftActions>

          <Toolbar/>

          <RightActions>
            <Button success sm fullSize>Save</Button>
          </RightActions>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}