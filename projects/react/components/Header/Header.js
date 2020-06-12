import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn, ActionsWrapper
} from '../../styledComponents';
import { Button, CloseBtn, FullscreenBtn } from '../../styledComponents';
import { Toolbar } from '../';
import { toggleModalFullscreen } from '../../utils/full-screen-handle';


export default class extends Component {
  render() {
    const {
      activeTab, onRevert, apply, onClose, showGoBackBtn, processWithCloudService, processWithFilerobot,
      handleSave, activeBody, t, config
    } = this.props;
    const { tools } = config;
    const isOneTool = tools.length === 1;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = (!processWithCloudService && !processWithFilerobot) ? t['toolbar.download'] : t['toolbar.save'];
    const applyAndSave = () => { apply(handleSave); };

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title>{t[`toolbar.${filteredName}`] || t[`header.image_editor_title`]}</Title>
          <FullscreenBtn onClick={toggleModalFullscreen} title={t[`header.toggle_fullscreen`]} />
          <CloseBtn onClick={onClose} title={t[`header.close_modal`]} />
        </HeaderTop>

        <ToolbarWrapper overlayYHidden={activeTab !== 'watermark'}>
          <ActionsWrapper>
            <LeftActions hide={!activeTab}>
              <CancelBtn onClick={isOneTool ? onClose : onRevert} sm default fullSize>
                {t[`toolbar.cancel`]}
              </CancelBtn>
              {showGoBackBtn &&
              <CancelBtn hide={activeTab} onClick={onClose} sm default fullSize>{t[`toolbar.go_back`]}</CancelBtn>}
            </LeftActions>

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
          </ActionsWrapper>

          <Toolbar {...this.props}/>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}