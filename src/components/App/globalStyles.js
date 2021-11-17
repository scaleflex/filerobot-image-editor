/** External Dependencies */
import { createGlobalStyle } from 'styled-components';

/** Internal Dependencies */
import RobotoRegularCyrillicExt from 'custom/fonts/Roboto/Regular-cyrillic-ext.woff2';
import RobotoRegularCyrillic from 'custom/fonts/Roboto/Regular-cyrillic.woff2';
import RobotoRegularGreekExt from 'custom/fonts/Roboto/Regular-greek-ext.woff2';
import RobotoRegularGreek from 'custom/fonts/Roboto/Regular-greek.woff2';
import RobotoRegularVietnamese from 'custom/fonts/Roboto/Regular-vietnamese.woff2';
import RobotoRegularLatinExt from 'custom/fonts/Roboto/Regular-latin-ext.woff2';
import RobotoRegularLatin from 'custom/fonts/Roboto/Regular-latin.woff2';
import RobotoMediumCyrillicExt from 'custom/fonts/Roboto/Medium-cyrillic-ext.woff2';
import RobotoMediumCyrillic from 'custom/fonts/Roboto/Medium-cyrillic.woff2';
import RobotoMediumGreekExt from 'custom/fonts/Roboto/Medium-greek-ext.woff2';
import RobotoMediumGreek from 'custom/fonts/Roboto/Medium-greek.woff2';
import RobotoMediumVietnamese from 'custom/fonts/Roboto/Medium-vietnamese.woff2';
import RobotoMediumLatinExt from 'custom/fonts/Roboto/Medium-latin-ext.woff2';
import RobotoMediumLatin from 'custom/fonts/Roboto/Medium-latin.woff2';
import { ROOT_CONTAINER_ID } from 'utils/constants';

const FontsFaces = createGlobalStyle`
  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularCyrillicExt}) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularCyrillic}) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularGreekExt}) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularGreek}) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularVietnamese}) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularLatinExt}) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 400;
    src: url(${RobotoRegularLatin}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumCyrillicExt}) format('woff2');
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumCyrillic}) format('woff2');
    unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* greek-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumGreekExt}) format('woff2');
    unicode-range: U+1F00-1FFF;
  }
  /* greek */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumGreek}) format('woff2');
    unicode-range: U+0370-03FF;
  }
  /* vietnamese */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumVietnamese}) format('woff2');
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169, U+01A0-01A1, U+01AF-01B0, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumLatinExt}) format('woff2');
    unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: 'Roboto';
    font-style: normal;
    font-weight: 500;
    src: url(${RobotoMediumLatin}) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  #${ROOT_CONTAINER_ID} {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }

  .SfxModal-Wrapper * {
    font-family: 'Roboto', sans-serif;
  }
`;

const IconsColor = createGlobalStyle`
  :not(button) > svg:not([color]) {
    color: ${({ theme }) => theme.palette['icons-primary']}
  }
`;

export { FontsFaces, IconsColor };
