import { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, ButtonsWrapper, ToolbarWrapper, CancelBtn, Button, CloseBtn
} from '../../styledComponents';
import { Toolbar } from '../';
import { ON_CLOSE_STATUSES } from '../../config';
import SaveActions from './SaveActions';

export default class extends Component {
  render() {
    const {
      activeTab, onRevert, apply, onClose, processWithCloudService, processWithFilerobot,
      handleSave, t, config
    } = this.props;
    const { tools, closeButtonProps, noCapitalStrs, filerobot } = config;
    const isOneTool = tools.length === 1;
    const filteredName = activeTab === 'rotate' ? 'orientation' : activeTab;
    const onFinishButtonLabel = (!processWithCloudService && !processWithFilerobot)
      ? t['toolbar.download']
      : t['toolbar.save'];
    const applyAndSave = () => { apply(handleSave); };
    const cancelBtnClosingFn = () => onClose(ON_CLOSE_STATUSES.TOOLBAR_CANCEL_BTN_CLICKED);

    const isLastStep = !activeTab || activeTab === 'resize';
    const saveAsFn = () => { handleSave(true) };
    const applySaveAsHandle = isOneTool
      ? () => { apply(saveAsFn) }
      : saveAsFn;

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
              themeBtn={activeTab}
              onClick={isOneTool ? applyAndSave : !activeTab ? () => { handleSave(); } : () => { apply(); }}
              borderRadius={'2px 0px 0px 2px'}
            >
              {isLastStep ? onFinishButtonLabel : t['toolbar.apply']}
            </Button>
            {isLastStep && processWithFilerobot && !processWithCloudService && filerobot.onSaveAs && (
              <SaveActions t={t} handleSaveAs={applySaveAsHandle} />
            )}
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