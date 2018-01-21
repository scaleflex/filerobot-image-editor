import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper
} from '../../styledComponents';
import { CloseBtn, Button } from '../../../lib/styledComponents';
import { Toolbar } from '../';


export default class extends Component{
  render() {
    const { activeTab, onRevert, apply } = this.props;

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{activeTab || 'Image Editor'}</Title>
          <CloseBtn/>
        </HeaderTop>

        <ToolbarWrapper>
          <LeftActions>
            <Button hide={!activeTab} onClick={onRevert} fullSize>Cancel</Button>
          </LeftActions>

          <Toolbar {...this.props}/>

          <RightActions>
            <Button onClick={apply} success fullSize>{!activeTab ? 'Save' : 'Apply'}</Button>
          </RightActions>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}