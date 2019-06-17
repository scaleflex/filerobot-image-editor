import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn
} from '../../styledComponents';
import { Button, CloseBtn } from '../../styledComponents';
import { Toolbar } from '../';


export default class extends Component {
  handleSave = () => {
    const {  onDownloadImage, processWithFilerobot, processWithCloudimage, onSave } = this.props;

    if (!processWithFilerobot && !processWithCloudimage) {
      onDownloadImage();
    } else {
      onSave();
    }
  }

  render() {
    const {
      activeTab, onRevert, apply, onClose, showGoBackBtn, operations, processWithFilerobot, processWithCloudimage
    } = this.props;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const atLeastOneOperationApplied = !!operations.length;
    const onFinishButtonLabel = (!processWithFilerobot && !processWithCloudimage) ? 'DOWNLOAD' : 'SAVE';

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{filteredName || 'Filerobot Image Editor'}</Title>
          <CloseBtn onClick={onClose}/>
        </HeaderTop>

        <ToolbarWrapper>
          <LeftActions>
            <CancelBtn hide={!activeTab} onClick={onRevert} sm default fullSize>Cancel</CancelBtn>
            {showGoBackBtn &&
            <CancelBtn hide={activeTab} onClick={onClose} sm default fullSize>Go back</CancelBtn>}
          </LeftActions>

          <Toolbar {...this.props}/>

          <RightActions>
            <Button
              themeColor
              sm
              disabled={!atLeastOneOperationApplied && !activeTab}
              success={!activeTab}
              themeBtn={activeTab}
              fullSize
              onClick={() => { !activeTab ? this.handleSave() : apply() }}
            >
              {!activeTab ? onFinishButtonLabel : 'APPLY'}
            </Button>
          </RightActions>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}