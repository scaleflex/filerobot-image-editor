/** External Dependencies */
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@scaleflex/ui/theme';

/** Internal Dependencies */
import App from 'components/App';
import { AppProvider } from 'context';
import defaultConfig from 'context/defaultConfig';
import deepMerge from 'utils/deepMerge';
import { FontsFaces, OverrideDefaultStyles } from './globalStyles';

const AssemblyPoint = (props) => {
  const { img, source, useCloudimage, cloudimage } = props;
  // TODO: Remove this property from here after PROD. release
  if (img) {
    throw new Error(
      '`img` is renamed to `source` please consider renaming it from your configurations.',
    );
  }
  if (
    !source ||
    (typeof source !== 'string' && !(source instanceof HTMLImageElement))
  ) {
    throw new Error(
      '`source` property is required either a string of image url or a HTMLImageElement for the image that will be edited.',
    );
  }
  if (useCloudimage) {
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
        <OverrideDefaultStyles />
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
  // TODO: Remove this property from here after PROD. release
  img: undefined,
};

AssemblyPoint.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]).isRequired,
  // TODO: Remove this property from here after PROD. release
  img: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]),
  useCloudimage: PropTypes.bool,
  cloudimage: PropTypes.instanceOf(Object),
};

export default memo(AssemblyPoint);
