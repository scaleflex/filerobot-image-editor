import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, LeftActions, RightActions, ToolbarWrapper, CancelBtn, ActionsWrapper
} from '../../styledComponents';
import { Button, CloseBtn, FullscreenBtn } from '../../styledComponents';
import { Toolbar } from '../';
import { toggleModalFullscreen } from '../../utils/full-screen-handle';
import { ON_CLOSE_STATUSES } from '../../config';


export default class extends Component {
  render() {
    const {
      activeTab, onRevert, apply, onClose, processWithCloudService, processWithFilerobot,
      handleSave, activeBody, t, config
    } = this.props;
    const { tools, showGoBackBtn, elementId, noCapitalStrs } = config;
    const isOneTool = tools.length === 1;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = (!processWithCloudService && !processWithFilerobot) ? t['toolbar.download'] : t['toolbar.save'];
    const applyAndSave = () => { apply(handleSave); };
    const cancelBtnClosingFn = () => onClose(ON_CLOSE_STATUSES.TOOLBAR_CANCEL_BTN_CLICKED);

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title noCapitalStrs={noCapitalStrs}>{t[`toolbar.${filteredName}`] || t[`header.image_editor_title`]}</Title>
          <FullscreenBtn onClick={() => toggleModalFullscreen(elementId)} title={t[`header.toggle_fullscreen`]} />
          <CloseBtn onClick={onClose} title={t[`header.close_modal`]} />
        </HeaderTop>

        <ToolbarWrapper overlayYHidden={activeTab !== 'watermark'}>
          <ActionsWrapper>
            <LeftActions>
              <CancelBtn
                hide={!activeTab}
                onClick={isOneTool ? cancelBtnClosingFn : onRevert}
                noCapitalStrs={noCapitalStrs}
                sm default fullSize
              >
                {t[`toolbar.cancel`]}
              </CancelBtn>
              {showGoBackBtn &&
              <CancelBtn onClick={cancelBtnClosingFn} noCapitalStrs={noCapitalStrs} sm default fullSize>
                {t[`toolbar.go_back`]}
              </CancelBtn>}
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