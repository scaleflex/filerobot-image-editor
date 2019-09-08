import React, { Component } from 'react';
import ImageEditor from './ImageEditor';
import { Container } from './styledComponents';
import { ThemeProvider } from 'styled-components';
import { Modal } from './components/Modal';
import { UPLOADER } from './config';
import './assets/fonts/filerobot-font.css';
import en from './assets/i18n/en';
import dark from './assets/theme/dark';


class ImageEditorWrapper extends Component {
  constructor({ show = false, src = '', config = {} }) {
    super();

    config.translations = config.translations || {};
    config.language = config.language || 'en';
    config.theme = config.theme || {};
    config.theme.colors = config.theme.colors || {};
    config.theme.fonts = config.theme.fonts || {};

    this.state = {
      isVisible: show,
      src,
      config: this.processConfig(config),
      t: {
        ...en,
        ...config.translations[config.language]
      },
      theme: {
        colors: {
          ...dark.colors,
          ...config.theme.colors
        },
        fonts: {
          ...dark.fonts,
          ...config.theme.fonts
        }
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

  processConfig = (config) => {
    return {
      ...UPLOADER,
      processWithFilerobot: !!config.filerobot,
      processWithCloudimage: !!config.cloudimage,
      ...config,
    };
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
    const { isVisible, src, config, t, theme } = this.state;
    const { onComplete = () => {}, showGoBackBtn, closeOnLoad, showInModal = true } = this.props;

    if (!src || !isVisible) return null;

    const Inner = (
      <Container>
        <ImageEditor
          src={src}
          config={config}
          onComplete={onComplete}
          onClose={this.close}
          showGoBackBtn={showGoBackBtn}
          closeOnLoad={closeOnLoad}
          t={t}
        />
      </Container>
    );

    return (
      <ThemeProvider theme={{ ...theme }}>
        {showInModal ?
          <Modal
            noBorder
            fullScreen={'lg'}
            isHideCloseBtn={true}
            style={{ borderRadius: 5 }}
            onClose={this.close}
          >
            {Inner}
          </Modal> : Inner}
      </ThemeProvider>
    );
  }
}

export default ImageEditorWrapper;