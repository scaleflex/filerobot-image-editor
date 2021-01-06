import React, { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, ButtonsWrapper, ToolbarWrapper, CancelBtn, Button, CloseBtn
} from '../../styledComponents';
import { Toolbar } from '../';
import { ON_CLOSE_STATUSES } from '../../config';


export default class extends Component {
  render() {
    const {
      activeTab, onRevert, apply, onClose, processWithCloudService, processWithFilerobot,
      handleSave, t, config
    } = this.props;
    const { tools, closeButtonProps, noCapitalStrs } = config;
    const isOneTool = tools.length === 1;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = (!processWithCloudService && !processWithFilerobot) ? t['toolbar.download'] : t['toolbar.save'];
    const applyAndSave = () => { apply(handleSave); };
    const cancelBtnClosingFn = () => onClose(ON_CLOSE_STATUSES.TOOLBAR_CANCEL_BTN_CLICKED);

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title noCapitalStrs={noCapitalStrs}>{t[`toolbar.${filteredName}`] || t[`header.image_editor_title`]}</Title>
          <ButtonsWrapper>
            <CancelBtn
              hide={!activeTab}
              onClick={isOneTool ? cancelBtnClosingFn : onRevert}
              noCapitalStrs={noCapitalStrs}
              sm default fullSize
            >
              {t[`toolbar.cancel`]}
            </CancelBtn>
            <Button
              themeColor
              sm
              success={!activeTab || activeTab === 'resize'}
              themeBtn={activeTab}
              onClick={isOneTool ? applyAndSave : !activeTab ? () => { handleSave(); } : () => { apply(); }}
            >
              {!activeTab || activeTab === 'resize' ? onFinishButtonLabel : t['toolbar.apply']}
            </Button>
          </ButtonsWrapper>
          
          <CloseBtn onClick={onClose} title={t[`header.close_modal`]} {...closeButtonProps}>
            {!closeButtonProps?.noLabel && (closeButtonProps?.label || t['header.close'])}
          </CloseBtn>
        </HeaderTop>

        <ToolbarWrapper overlayYHidden={activeTab !== 'watermark'}>
          <Toolbar {...this.props}/>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}