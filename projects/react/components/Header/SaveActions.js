import { Component } from 'react'
import {
  SaveActions as StyledSaveActions,
  SaveActionsSlideButton,
  SaveActionsMenu,
  SaveActionsItem,
  SaveActionsBackdrop
} from '../../styledComponents';

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

  handleSaving = () => {
    this.props.handleSaveAs()
    this.hideActionsMenu()
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
          {this.state.show && (
            <SaveActionsItem onClick={this.handleSaving}>
              {t['toolbar.saveAsNewImage']}
            </SaveActionsItem>
          )}
        </SaveActionsMenu>
      </StyledSaveActions>
    );
  }
}
