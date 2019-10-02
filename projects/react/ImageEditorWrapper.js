import React, { Component } from 'react';
import ImageEditor from './ImageEditor';
import { Container } from './styledComponents';
import { ThemeProvider } from 'styled-components';
import { Modal } from './components/Modal';
import { UPLOADER } from './config';
import './assets/fonts/filerobot-font.css';
import en from './assets/i18n/en';
import fr from './assets/i18n/fr';
import dark from './assets/theme/dark';
import light from './assets/theme/light';


class ImageEditorWrapper extends Component {
  constructor({ show = false, src = '', config = {} }) {
    super();

    config.translations = config.translations || {};
    config.language = config.language || 'en';
    config.theme = config.theme || {};
    config.theme.colors = config.theme.colors || {};
    config.theme.fonts = config.theme.fonts || {};
    config.colorScheme = config.colorScheme || 'dark';

    this.state = {
      isVisible: show,
      src,
      config: this.processConfig(config),
      t: {
        ...(config.language === 'en' ? en : fr),
        ...config.translations[config.language]
      },
      colorScheme: config.colorScheme || 'dark',
      theme: {
        colors: {
          ...(config.colorScheme === 'light' ? light : dark).colors,
          ...config.theme.colors
        },
        fonts: {
          ...(config.colorScheme === 'light' ? light : dark).fonts,
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
    const { onComplete = () => {}, onBeforeComplete, showGoBackBtn, closeOnLoad, showInModal = true } = this.props;

    if (!src || !isVisible) return null;

    const Inner = (
      <Container>
        <ImageEditor
          src={src}
          config={config}
          onComplete={onComplete}
          onBeforeComplete={onBeforeComplete}
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