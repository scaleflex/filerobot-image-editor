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
      handleSave, activeBody, t
    } = this.props;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = (!processWithFilerobot && !processWithCloudimage) ?
      t['toolbar.download'] : t['toolbar.save'];

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{t[`toolbar.${filteredName}`] || t[`header.image_editor_title`]}</Title>
          <CloseBtn onClick={onClose}/>
        </HeaderTop>

        <ToolbarWrapper>
          <LeftActions>
            <CancelBtn hide={!activeTab} onClick={() => { onRevert(); }} sm default fullSize>
              {t[`toolbar.cancel`]}
            </CancelBtn>
            {showGoBackBtn &&
            <CancelBtn hide={activeTab} onClick={onClose} sm default fullSize>{t[`toolbar.go_back`]}</CancelBtn>}
          </LeftActions>

          <Toolbar {...this.props}/>

          {activeBody === 'preview' &&
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
              {!activeTab || activeTab === 'resize' ? onFinishButtonLabel : t['toolbar.apply']}
            </Button>
          </RightActions>}
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}