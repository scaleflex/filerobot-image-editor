/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@scaleflex/ui/theme';

/** Internal Dependencies */
import App from 'components/App';
import { AppProvider } from 'context';
import defaultConfig from 'context/defaultConfig';
import deepMerge from 'utils/deepMerge';
import { FontsFaces, IconsColor } from './globalStyles';

const AssemblyPoint = (props) => {
  const { img, onSave, useCloudimage, cloudimage } = props;
  if (!img || (typeof img !== 'string' && !(img instanceof HTMLImageElement))) {
    throw new Error(
      '`img` property is required either a string of image url or a HTMLImageElement.',
    );
  }
  if (!onSave) {
    throw new Error('`onSave` callback function is required.');
  }
  if (useCloudimage) {
    if (!cloudimage?.token) {
      throw new Error('`token` property is required in cloudimage mode.');
    }
    if (cloudimage?.imageSealing?.enable && !cloudimage?.imageSealing?.salt) {
      throw new Error(
        '`salt` property of imageSealing object is required in cloudimage mode as long as `imageSealing` is enabled.',
      );
    }
  }

  const defaultAndProvidedConfigMerged = deepMerge(defaultConfig, props);

  return (
    <React.StrictMode>
      <ThemeProvider theme={defaultAndProvidedConfigMerged.theme}>
        <FontsFaces />
        <IconsColor />
        <AppProvider config={defaultAndProvidedConfigMerged}>
          <App />
        </AppProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

AssemblyPoint.defaultProps = {
  useCloudimage: false,
  cloudimage: {},
};

AssemblyPoint.propTypes = {
  img: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]).isRequired,
  onSave: PropTypes.func.isRequired,
  useCloudimage: PropTypes.bool,
  cloudimage: PropTypes.instanceOf(Object),
};

export default memo(AssemblyPoint);
