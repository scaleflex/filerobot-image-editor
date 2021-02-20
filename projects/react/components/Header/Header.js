import { Component } from 'react';
import {
  HeaderWrapper, HeaderTop, Title, ButtonsWrapper, BackButtonWrapper, BackBtnSeparator,
  ToolbarWrapper, CancelBtn, Button, CloseBtn
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
    const { tools, replaceCloseWithBackButton, noCapitalStrs, filerobot } = config;
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

    const showSaveAs = isLastStep && processWithFilerobot && !processWithCloudService && filerobot.onSaveAs

    return (
      <HeaderWrapper>
        <HeaderTop>
          <Title noCapitalStrs={noCapitalStrs}>{t[`toolbar.${filteredName}`] || t[`header.image_editor_title`]}</Title>
          <ButtonsWrapper>
            {replaceCloseWithBackButton && (
              <BackButtonWrapper>
                <svg width="14" height="13" viewBox="0 0 14 13" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={onClose}>
                  <path d="M0.145833 5.26248C0.0583333 5.34998 0 5.46664 0 5.55414C0 5.64164 0.0583333 5.78748 0.145833 5.84581L6.3 10.95C6.3875 11.0375 6.59167 11.0375 6.7375 11.0083C6.88334 10.9791 6.97084 10.8041 6.97084 10.6583V8.00414C9.47917 8.00414 11.1708 8.20831 13.2708 11.8541C13.3292 12 13.475 12.0583 13.6208 12.0583C13.6792 12.0583 13.6792 12.0583 13.7083 12.0583C13.9125 12 14 11.8541 14 11.6791V11.3875C14 10.0458 14 8.03331 13.0958 6.34164C12.0458 4.35831 9.975 3.30831 7 3.22081V0.508312C7 0.362478 6.9125 0.216645 6.76667 0.158312C6.62084 0.0999783 6.47501 0.0999783 6.38751 0.216645L0.145833 5.26248Z" fill="5D6D7E" />
                </svg>
                <BackBtnSeparator />
              </BackButtonWrapper>
            )}
            <Button
              themeColor
              sm
              themeBtn={activeTab}
              onClick={isOneTool ? applyAndSave : !activeTab ? () => { handleSave(); } : () => { apply(); }}
              borderRadius={showSaveAs ? '2px 0px 0px 2px' : '2px'}
            >
              {isLastStep ? onFinishButtonLabel : t['toolbar.apply']}
            </Button>
            {showSaveAs && (
              <SaveActions t={t} handleSaveAs={applySaveAsHandle} />
            )}
            <CancelBtn
              hide={!activeTab}
              onClick={isOneTool ? cancelBtnClosingFn : onRevert}
              noCapitalStrs={noCapitalStrs}
              sm default fullSize
            >
              {t[`toolbar.cancel`]}
            </CancelBtn>
          </ButtonsWrapper>

          {!replaceCloseWithBackButton && (<CloseBtn onClick={onClose} title={t[`header.close_modal`]} />)}
        </HeaderTop>

        <ToolbarWrapper overlayYHidden={activeTab !== 'watermark'}>
          <Toolbar {...this.props}/>
        </ToolbarWrapper>
      </HeaderWrapper>
    )
  }
}