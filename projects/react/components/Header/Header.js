import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn
} from '../../styledComponents';
import { Button, CloseBtn } from '../../styledComponents';
import { Toolbar } from '../';


export default class extends Component {
  render() {
    const {
      activeTab, onRevert, apply, onClose, showGoBackBtn, processWithCloudService,
      handleSave, activeBody, t, config
    } = this.props;
    const { tools } = config;
    const isOneTool = tools.length === 1;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = !processWithCloudService ? t['toolbar.download'] : t['toolbar.save'];
    const applyAndSave = () => { apply(handleSave); };

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{t[`toolbar.${filteredName}`] || t[`header.image_editor_title`]}</Title>
          <CloseBtn onClick={onClose}/>
        </HeaderTop>

        <ToolbarWrapper overlayYHidden={activeTab !== 'watermark'}>
          <LeftActions>
            <CancelBtn hide={!activeTab} onClick={isOneTool ? onClose : onRevert} sm default fullSize>
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
              success={!activeTab || activeTab === 'resize'}
              themeBtn={activeTab}
              fullSize
              onClick={isOneTool ? applyAndSave : !activeTab ? () => { handleSave(); } : () => { apply(); }}
            >
              {!activeTab || activeTab === 'resize' ? onFinishButtonLabel : t['toolbar.apply']}
            </Button>
          </RightActions>}
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}