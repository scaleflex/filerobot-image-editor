import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn
} from '../../styledComponents';
import { Button, CloseBtn } from '../../styledComponents';
import { Toolbar } from '../';


export default class extends Component {
  render() {
    const {
      activeTab, onRevert, apply, onClose, showGoBackBtn, processWithFilerobot, processWithCloudimage,
      handleSave
    } = this.props;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = (!processWithFilerobot && !processWithCloudimage) ? 'DOWNLOAD' : 'SAVE';

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{filteredName || 'Filerobot Image Editor'}</Title>
          <CloseBtn onClick={onClose}/>
        </HeaderTop>

        <ToolbarWrapper>
          <LeftActions>
            <CancelBtn hide={!activeTab} onClick={() => { onRevert(); }} sm default fullSize>Cancel</CancelBtn>
            {showGoBackBtn &&
            <CancelBtn hide={activeTab} onClick={onClose} sm default fullSize>Go back</CancelBtn>}
          </LeftActions>

          <Toolbar {...this.props}/>

          <RightActions>
            <Button
              themeColor
              sm
              //disabled={!activeTab}
              success={!activeTab || activeTab === 'resize'}
              themeBtn={activeTab}
              fullSize
              onClick={() => { !activeTab ? handleSave() : apply() }}
            >
              {!activeTab || activeTab === 'resize' ? onFinishButtonLabel : 'APPLY'}
            </Button>
          </RightActions>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}