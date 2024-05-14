/** External Dependencies */
import React, { useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import ThemeProvider from '@scaleflex/ui/theme';

/** Internal Dependencies */
import App from 'components/App';
import { AppProvider } from 'context';
import defaultConfig from 'context/defaultConfig';
import deepMerge from 'utils/deepMerge';
import assignFinetuneNamesToKonva from 'utils/assignFinetuneNamesToKonva';
import { FontsFaces, OverrideDefaultStyles } from './globalStyles';

const AssemblyPoint = (props) => {
  const { source, useCloudimage, cloudimage } = props;
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

  useEffect(() => {
    assignFinetuneNamesToKonva();
  }, [])

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
};

AssemblyPoint.propTypes = {
  source: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.instanceOf(HTMLImageElement),
    PropTypes.instanceOf(SVGImageElement),
    PropTypes.instanceOf(ImageBitmap),
  ]).isRequired,
  useCloudimage: PropTypes.bool,
  cloudimage: PropTypes.instanceOf(Object),
};

export default memo(AssemblyPoint);
