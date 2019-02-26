import React, { Component } from 'react';
import ImageEditor from './ImageEditor';
import { Container } from './styledComponents';
import { ThemeProvider } from 'styled-components';
import { Modal } from './components/Modal';
import { UPLOADER } from './config';
import theme, { colorSchemes } from './assets/styles/colorScheme';
import './assets/fonts/filerobot-font.css';


class ImageEditorWrapper extends Component {
  constructor({ show = false, src = '', config = {}}) {
    super();

    this.state = {
      isVisible: show,
      src,
      config: {
        ...UPLOADER,
        ...config,

        hideCloudimageSwitcher: !config.cloudimageToken
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      if (this.props.show) {
        this.open(this.props.src);
      } else
        this.close();
    }
  }

  open = (src) => {
    this.setState({ isVisible: true, src });
  }

  close = () => {
    const { onClose } = this.props;

    this.setState({ isVisible: false }, () => {
      if (onClose) onClose();
    });
  }

  render() {
    const { isVisible, src, config } = this.state;
    const { onUpload } = this.props;
    const colors = colorSchemes['default'];

    if (!src || !isVisible) return null;

    return (
      <ThemeProvider theme={{ ...theme, ...colors }}>
        <Modal noBorder fullScreen={'lg'} isHideCloseBtn={true} style={{ borderRadius: 5 }} onClose={this.close}>
          <Container>
            <ImageEditor
              src={src}
              config={config}
              onUpload={onUpload}
              onClose={this.close}
            />
          </Container>
        </Modal>
      </ThemeProvider>
    );
  }
}

export default ImageEditorWrapper;