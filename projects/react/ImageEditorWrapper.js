import React, { Component } from 'react';
import ImageEditor from './ImageEditor';
import { Container } from './styledComponents';
import { ThemeProvider } from 'styled-components';
import { Modal } from './components/Modal';
import { CLOUDIMAGE_OPERATIONS, TOOLS, UPLOADER } from './config';
import './assets/fonts/filerobot-font.css';
import translations from './assets/i18n';
import dark from './assets/theme/dark';
import light from './assets/theme/light';


class ImageEditorWrapper extends Component {
  _isMounted = false;

  constructor({ show = false, src = '', config = {} }) {
    super();

    config.translations = config.translations || {};
    config.language = (config.translations[config.language] || translations[config.language]) ? config.language : 'en';
    config.theme = config.theme || {};
    config.theme.colors = config.theme.colors || {};
    config.theme.fonts = config.theme.fonts || {};
    config.colorScheme = config.colorScheme || 'dark';
    config.platform = config.platform || 'filerobot';

    this.state = {
      isVisible: show,
      src,
      config: this.processConfig(config),
      t: {
        ...translations[config.language],
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

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
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
    const processWithCloudService = config.processWithCloudimage;
    const tools = config.tools || (processWithCloudService ? CLOUDIMAGE_OPERATIONS : TOOLS);

    return {
      ...UPLOADER,
      processWithCloudService,
      processWithFilerobot: !!config.filerobot,
      processWithCloudimage: !!config.cloudimage,
      ...config,
      tools: processWithCloudService ? tools.filter(tool => CLOUDIMAGE_OPERATIONS.indexOf(tool) > -1) : tools

    };
  }

  open = (src) => {
    if (this._isMounted) {
      this.setState({ isVisible: true, src });
    }
  }

  close = () => {
    const { onClose } = this.props;

    if (this._isMounted) {
      this.setState({ isVisible: false }, () => {
        if (onClose) onClose();
      });
    }
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