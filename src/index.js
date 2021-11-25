/* eslint-disable */
/** External Dependencies */
import React from 'react';
import { render } from 'react-dom';

/** Internal Dependencies */
import { TABS_IDS, TOOLS_IDS } from 'utils/constants';
import uriDownload from 'utils/uriDownload';
import AssemblyPoint from './components/AssemblyPoint';

// ==========> DEMO PAGE.

const config = {
  // string or image html element
  image:
    'https://images.unsplash.com/photo-1553451166-232112bda6f6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1920',
  annotationsCommon: {
    // fill: '#000000', // or should be no color? === undefined
    // stroke: '#000000', // or should be no color? === undefined
    // strokeWidth: 0,
    // shadowOffsetX: 0,
    // shadowOffsetY: 0,
    // shadowBlur: 0,
    // shadowColor: '#000000', // or should be no color? === undefined
    // shadowOpacity: 1,
    // opacity: 1,
  },
  [TOOLS_IDS.CROP]: {
    // maxWidth: 700,
    // maxHeight: 300,
    // width: 600,
    // noPresets: false, // Hiding crop presets
    // ratio: 4 / 100, // ORIGINAL_CROP, ELLIPSE_CROP, CUSTOM_CROP, ratio's number (10 / 4, 5 / 10...etc.)
    // minWidth: 200,
    // minHeight: 300,
  },
  [TOOLS_IDS.WATERMARK]: {
    gallery: [
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
      'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
      'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
    ],
  },
  // [TOOLS_IDS.TEXT]: {
  //   fonts: ['Arial', 'another', { label: 'Tahoma', value: 'Tahoma' }, 'hey-there'], // must be loaded in the website or the user have them on his system
  //   fontFamily: 'test',
  // },
  onSave: (imageObject, imageDesignState) => {
    console.log('🕺🏼 Well, my onSave handler function is fired.');
    console.log('🎇Image file is downloading.....');
    console.log(
      '🔔 Also for you to know, we have the following params passed in the onSave handler:',
    );
    console.log('▶️Image object: ', imageObject);
    console.log('▶️ Image design state:', imageDesignState);
    console.log('CYA👋🏼👋🏼👋🏼');
    uriDownload(imageObject.imageBase64, imageObject.fullName);
  },
  // useBackendTranslations: true, // if false, translations object will be used if not provided default translations will be there.
  // translations: null,
  // language: 'en', // available same as on backend ('en', 'fr', 'de', 'it', 'pt', 'es', 'nl', 'pl', 'ro)
  // noChangesNotSavedAlertOnLeave: false, // true => user tries to close the tab and the it is not
  // loadableDesignState: null, // if provided, it will be used in loading the design state, [TODO: NEEDS TO BE IMPROVED]
  // savedImageType: null, // 'png','jpg', 'jpeg' & 'webp' => 'png' must be provided you want the image to be transparent and use elliptical crop || null (defaualt) means use the same provided image extension (extracted from the image's src url), if it was unknwon PNG will be used
  // forceToPngInEllipticalCrop: false, // in case the develop wants to force the saved image to be PNG if there is elliptical crop is done otherwise the provided savedImageType would be used.
  // onSaveAs: () => console.log('saving as') // called on clickng save as button and after finishing save as functionality onSave is called.... if onSaveAs function returned false then the default behavior (opening saveAs modal) won't be opened
  onClose: () => console.log('Act closing 👅'), // if we have value then close button will be shown unless showBackButton is true then if onClose has value the back button will be shown otherwise nothing will be shown.
  // tabsIds: [TABS_IDS.ADJUST, TABS_IDS.WATERMARK],
  // defaultTabId: TABS_IDS.ADJUST,
  // defaultToolId: TOOLS_IDS.CROP,
  // showBackButton: true,
  // hideSaveAsMenu: false,
  // dontFitContainerIfSmallerImg: false // By default the image fits the container whether it's smaller or bigger than the container if false, it won't fit if smaller but it'll fit if bigger
};

render(
  // eslint-disable-next-line react/jsx-filename-extension
  <AssemblyPoint {...config} />,
  document.getElementById('root'),
);
