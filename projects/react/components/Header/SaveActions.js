import React, { Component } from 'react'
import { SAVE_MODES } from '../../config';
import {
  SaveActions as StyledSaveActions,
  SaveActionsSlideButton,
  SaveActionsMenu,
  SaveActionsItem,
  SaveActionsBackdrop
} from '../../styledComponents';

const ACTIONS = Object.keys(SAVE_MODES);

export default class SaveActions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      show: false
    }
  }

  toggleActionsMenu = (visible) => {
    this.setState({ show: visible ?? !this.state.show })
  }

  hideActionsMenu = () => this.toggleActionsMenu(false)

  handleClickedAction = (action) => {
    const { updateState, handleSave } = this.props;

    updateState({
      filerobotSaveMode: SAVE_MODES[action]
    }, () => {
      this.hideActionsMenu();
      handleSave();
    });
  }

  render () {
    const { t } = this.props;

    return (
      <StyledSaveActions>
        {this.state.show && <SaveActionsBackdrop onClick={this.hideActionsMenu} />}
        <SaveActionsSlideButton themeColor onClick={this.toggleActionsMenu}>
          <i />
        </SaveActionsSlideButton>
        <SaveActionsMenu>
          {this.state.show && ACTIONS.map((action) => (
            <SaveActionsItem onClick={() => this.handleClickedAction(action)}>
              {t[`toolbar.${action.toLowerCase()}`]}
            </SaveActionsItem>
          ))}
        </SaveActionsMenu>
      </StyledSaveActions>
    );
  }
}
