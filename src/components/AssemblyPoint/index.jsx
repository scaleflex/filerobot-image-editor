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
  const { image } = props;
  if (
    !image ||
    (typeof image !== 'string' && !(image instanceof HTMLImageElement))
  ) {
    throw new Error(
      '`image` property is required either a string of image url or a HTMLImageElement.',
    );
  }

  const defaultAndProvidedConfigMerged = deepMerge(defaultConfig, props);

  return (
    <React.StrictMode>
      <ThemeProvider>
        <FontsFaces />
        <IconsColor />
        <AppProvider config={defaultAndProvidedConfigMerged}>
          <App />
        </AppProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

AssemblyPoint.propTypes = {
  image: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]).isRequired,
};

export default memo(AssemblyPoint);
