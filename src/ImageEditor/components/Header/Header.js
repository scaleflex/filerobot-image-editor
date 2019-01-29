import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn
} from '../../styledComponents';
import { Button, CloseBtn } from '../../styledComponents';
import { Toolbar } from '../';


export default class extends Component {
  render() {
    const { activeTab, onRevert, apply, onClose, onSave } = this.props;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{filteredName || 'Image Editor'}</Title>
          <CloseBtn onClick={onClose}/>
        </HeaderTop>

        <ToolbarWrapper>
          <LeftActions>
            <CancelBtn hide={!activeTab} onClick={onRevert} sm default fullSize>Cancel</CancelBtn>
          </LeftActions>

          <Toolbar {...this.props}/>

          <RightActions>
            <Button
              themeColor
              sm
              success={!activeTab}
              themeBtn={activeTab}
              fullSize
              onClick={() => { !activeTab ? onSave() : apply() }}
            >
              {!activeTab ? 'SAVE' : 'APPLY'}
            </Button>
          </RightActions>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}