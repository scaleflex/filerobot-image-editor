/* eslint-disable */
// THIS FILE IS NOT USED ANYWHERE, JUST FOR MENTIONING AN EXAMPLE OF CONFIG
import DuplicateIcon from '@scaleflex/icons/duplicate';
import Social from '@scaleflex/icons/social';
import CropClassicTv from '@scaleflex/icons/crop-classic-tv';
import CropCinemaScope from '@scaleflex/icons/crop-cinema-scope';

import FilerobotImageEditor from 'filerobot-image-editor/src';
import toPrecisedFloat from 'react-filerobot-image-editor/src/utils/toPrecisedFloat';

const { TOOLS } = FilerobotImageEditor;

// const saveFnRef = {};
const cropFolderPresets = [
  {
    titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
    icon: Social, // React component, string or HTML Element
    groups: [
      {
        titleKey: 'linkedIn',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 400,
            height: 400,
            descriptionKey: 'liProfilePhotoSize',
            disableManualResize: false,
          },
          {
            titleKey: 'profileCoverPhoto',
            width: 1584,
            height: 396,
            descriptionKey: 'liProfileCoverPhotoSize',
          },
          {
            titleKey: 'blogPostPhoto',
            width: 1200,
            height: 627,
            descriptionKey: 'liBlogPostPhotoSize',
          },
          {
            titleKey: 'companyLogo',
            width: 300,
            height: 300,
            descriptionKey: 'liCompanyLogoSize',
          },
          {
            titleKey: 'companyPageCover',
            width: 1128,
            height: 191,
            descriptionKey: 'liCompanyPageCoverSize',
          },
        ],
      },
      {
        titleKey: 'x',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 400,
            height: 400,
            descriptionKey: 'twProfilePhotoSize',
          },
          {
            titleKey: 'headerPhoto',
            width: 1500,
            height: 500,
            descriptionKey: 'twHeaderPhotoSize',
          },
          {
            titleKey: 'inStreamPhoto',
            width: 1600,
            height: 1900,
            descriptionKey: 'twInStreamPhotoSize',
          },
        ],
      },
      {
        titleKey: 'instagram',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 320,
            height: 320,
            descriptionKey: 'igProfilePhotoSize',
          },
          {
            titleKey: 'feedPortraitPhoto',
            width: 1080,
            height: 1350,
            descriptionKey: 'igFeedPortraitPhotoSize',
          },
          {
            titleKey: 'feedLandscapePhoto',
            width: 1080,
            height: 566,
            descriptionKey: 'igFeedLandscapePhotoSize',
          },
          {
            titleKey: 'feedSquarePhoto',
            width: 1080,
            height: 1080,
            descriptionKey: 'igFeedSquarePhotoSize',
          },
          {
            titleKey: 'storyPhoto',
            width: 1080,
            height: 1920,
            descriptionKey: 'igStoryPhotoSize',
          },
        ],
      },
      {
        titleKey: 'facebook',
        items: [
          {
            titleKey: 'profilePhoto',
            width: 170,
            height: 170,
            descriptionKey: 'fbProfilePhotoSize',
          },
          {
            titleKey: 'profileCoverPhoto',
            width: 851,
            height: 315,
            descriptionKey: 'fbProfileCoverPhotoSize',
          },
          {
            titleKey: 'eventCoverPhoto',
            width: 1200,
            height: 628,
            descriptionKey: 'fbEventCoverPhotoSize',
          },
          {
            titleKey: 'timelinePhoto',
            width: 1200,
            height: 630,
            descriptionKey: 'fbTimelinePhotoSize',
          },
          {
            titleKey: 'storyPhoto',
            width: 1080,
            height: 1920,
            descriptionKey: 'fbStoryPhotoSize',
          },
        ],
      },
    ],
  },
];

const config = {
  // source:
  //   'https://api.filerobot.com/scaleflex-tests-v5a/v3/get/d8880a7c-94fc-5524-b1de-a61de6650000?version=1638547407275',
  // annotationsCommon: {
  // fill: '#000000', // or should be no color? === undefined
  // stroke: '#000000', // or should be no color? === undefined
  // strokeWidth: 0,
  // shadowOffsetX: 0,
  // shadowOffsetY: 0,
  // shadowBlur: 0,
  // shadowColor: '#000000', // or should be no color? === undefined
  // shadowOpacity: 1,
  // opacity: 1,
  // },
  [TOOLS.CROP]: {
    // maxWidth: 700,
    // maxHeight: 300,
    // noPresets: false, // Hiding crop presets
    // ratio: 1 / 2, // ORIGINAL_CROP, ELLIPSE_CROP, CUSTOM_CROP, ratio's number (10 / 4, 5 / 10...etc.)
    // ratioTitleKey: 'custom',
    // minWidth: 200,
    // minHeight: 300,
    // autoResize: false,
    // lockCropAreaAt: 'center-center',
    presetsItems: [
      {
        titleKey: 'classicTv',
        descriptionKey: '4:3',
        ratio: toPrecisedFloat(4 / 3),
        icon: CropClassicTv,
        // noEffect: true,
        // disableManualResize: false,
      },
      {
        titleKey: 'cinemascope',
        descriptionKey: '21:9',
        ratio: toPrecisedFloat(21 / 9),
        icon: CropCinemaScope, // optional
      },
    ],
    presetsFolders: cropFolderPresets,
  },
  [TOOLS.ROTATE]: {
    angle: 60,
    componentType: 'slider',
  },
  [TOOLS.IMAGE]: {
    disableUpload: false,
    gallery: [
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGOTYPE+WITH+SCALEFLEX-01-01.png?vh=76c5a7',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX-01.png?vh=467711',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON.png?vh=a4578e',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Icon/FILEROBOT+ICON+ON+WHITE+BG.png?vh=fa44f7',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+Vertical/FILEROBOT+LOGO+VERTICAL.png?vh=05c4c3',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Grayscale+Dark+text.png?vh=313898',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL+WHITE+TEXT.png?vh=fca07b',
      },
      {
        originalUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
        previewUrl:
          'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/Logo+Vertical/SCALEFLEX+LOGO+VERTICAL.PNG?vh=9a6fa1',
      },
    ],
  },
  [TOOLS.WATERMARK]: {
    // onUploadWatermarkImgClick: (loadAndSetWatermarkImg) => {
    //   console.log(
    //     'u could use the following function,',
    //     loadAndSetWatermarkImg,
    //   );
    //   return new Promise((resolve, reject) => {
    //     console.log('Simulating image upload for 2 seconds...');

    //     setTimeout(() => {
    //       resolve({
    //         url: 'https://assets.scaleflex.com/Marketing/Logos/Scaleflex+Logos/PNG/SCALEFLEX+LOGO+-+Color+Dark+text.png?vh=45cac1',
    //         revokeObjectUrl: true,
    //       });
    //     }, 2000);
    //   });
    // },
    // hideTextWatermark: true,
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
    textScalingRatio: 0.33,
    imageScalingRatio: 0.33,
  },
  [TOOLS.TEXT]: {
    text: 'Filerobot...',
    //   fonts: ['Arial', 'another', { label: 'Tahoma', value: 'Tahoma' }, 'hey-there'], // must be loaded in the website or the user have them on his system
    //   fontFamily: 'test',
    // onFontChange: (newFontFamily, reRenderCanvasFn) => {
    //   if (newFontFamily.toLowerCase() === 'sans-serif') {
    //     //  Load sans-serif font.
    //     reRenderCanvasFn();
    //   }
    // },
  },
  // onBeforeSave: (imageFileInfo) => {
  //   console.log('info', imageFileInfo);
  //   return false;
  // }, //  if function returned `false` then the default behavior (opening modal) won't be called,
  // onSave: (savedImageData, imageDesignState) => {
  //   console.log('🕺🏼 Well, my onSave handler function is fired.');
  //   console.log('🎇Image file is downloading.....');
  //   console.log(
  //     '🔔 Also for you to know, we have the following params passed in the onSave handler:',
  //   );
  //   console.log('▶️Image object: ', savedImageData);
  //   console.log('▶️ Image design state:', imageDesignState);
  //   console.log('CYA👋🏼👋🏼👋🏼');
  //   uriDownload(savedImageData.imageBase64, savedImageData.fullName);
  // },
  // moreSaveOptions: [
  //   {
  //     label: '[optional] Save option 1',
  //     icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.6358 1.52611L10.6367 1.52669C12.0996 2.48423 13.0845 3.97393 13.4308 5.67868C13.7768 7.38223 13.4302 9.13505 12.3952 10.5416L12.39 10.5495C11.4327 12.0121 9.94346 12.9968 8.23923 13.3433C7.8098 13.4238 7.35685 13.4767 6.93362 13.4767C3.87462 13.4767 1.16037 11.323 0.519402 8.23739L0.439941 7.68114V7.66612C0.439941 7.51027 0.483542 7.38547 0.56594 7.28247C0.641164 7.18844 0.75786 7.12545 0.882464 7.10167C1.03156 7.10432 1.15179 7.14773 1.25156 7.22754C1.34816 7.30483 1.41201 7.4259 1.43422 7.55435C1.60415 8.96178 2.28062 10.2289 3.35006 11.1576L3.35104 11.1584C5.69121 13.1603 9.21628 12.8792 11.1914 10.5379C13.1928 8.19761 12.9116 4.67271 10.5702 2.6978C9.44164 1.73866 8.00291 1.28774 6.53782 1.40044L6.53642 1.40056C5.21046 1.51341 3.97038 2.10561 3.04061 3.03539L2.70462 3.37138L3.76055 3.27979L3.7724 3.27705C4.02521 3.21871 4.29448 3.3949 4.35713 3.66641C4.41517 3.91791 4.24109 4.1857 3.97196 4.25015L1.82243 4.62652C1.69199 4.6481 1.55534 4.62267 1.46788 4.5527L1.45879 4.54543L1.4488 4.53944C1.35779 4.48483 1.27678 4.36595 1.25738 4.24958L0.819079 2.08516L0.818029 2.08061C0.759688 1.8278 0.935874 1.55854 1.20739 1.49588C1.45905 1.43781 1.72702 1.61214 1.79125 1.88157L1.96243 2.82299L2.19817 2.56396C4.3538 0.195428 7.94737 -0.257315 10.6358 1.52611Z" fill="#5D6D7E"/><path d="M7.49822 3.76409V7.16923L9.24296 8.91397C9.32292 8.99394 9.38351 9.11495 9.38351 9.25603C9.38351 9.37909 9.3437 9.49734 9.24296 9.59809C9.16576 9.67528 9.0184 9.73864 8.9009 9.73864C8.77784 9.73864 8.65958 9.69883 8.55884 9.59809L6.67355 7.7128C6.59636 7.6356 6.533 7.48823 6.533 7.37074V3.76409C6.533 3.50452 6.75603 3.28148 7.0156 3.28148C7.3025 3.28148 7.49822 3.4772 7.49822 3.76409Z" fill="#5D6D7E"/></svg>',
  //     onClick: (openSaveModal, _saveDirectly) => openSaveModal(console.log),
  //   },
  //   {
  //     label: '[optional] Save option 2',
  //     icon: DuplicateIcon,
  //     onClick: (_openSaveModal, saveDirectly) => saveDirectly(console.log),
  //   },
  // ],
  // defaultImageFileName: 'Test',
  // theme: {},
  // useBackendTranslations: true, // if false, translations object will be used if not provided default translations will be there.
  // translations: null,
  // language: 'en', // available same as on backend ('en', 'fr', 'de', 'it', 'pt', 'es', 'nl', 'pl', 'ro')
  // avoidChangesNotSavedAlertOnLeave: false, // true => user tries to close the tab and the it is not
  // loadableDesignState: null, // if provided, it will be used in loading the design state, [TODO: NEEDS TO BE IMPROVED]
  // defaultSavedImageType: null, // 'png', 'jpeg' & 'webp' => 'png' must be provided you want the image to be transparent and use elliptical crop || null (defaualt) means use the same provided image extension (extracted from the image's src url), if it was unknwon PNG will be used
  // defaultSavedImageQuality: 0.92, // Min: 0.1, Max: 1, (1% - 100%) applied for 'jpg', 'jpeg' & 'webp' only
  // defaultSavedImageName: '',
  // forceToPngInEllipticalCrop: false, // in case the develop wants to force the saved image to be PNG if there is elliptical crop is done otherwise the provided savedImageType would be used.
  // onClose: () => console.log('Act closing 👅'), // if we have value then close button will be shown unless showBackButton is true then if onClose has value the back button will be shown otherwise nothing will be shown.
  // tabsIds: [TABS.ADJUST, TABS.WATERMARK],
  // savingPixelRatio: 4,
  previewPixelRatio: window.devicePixelRatio * 4,
  // defaultTabId: TABS.ADJUST,
  // defaultToolId: TOOLS.CROP,
  // showBackButton: true,
  // useCloudimage: true,
  // cloudimage: {
  //   token: 'test',
  //   version: 'v7',
  //   loadableQuery: '',
  //   imageSealing: {
  //     enable: false,
  //     salt: 'test',
  //     charCount: 20,
  //     includeParams: null,
  //   },
  // },
  // observePluginContainerSize: true,
  // showCanvasOnly: true,
  // getCurrentImgDataFnRef: saveFnRef,
  // onModify: (currentDesignState) => {
  //   console.log('current design state', currentDesignState);
  //   const savedImgData = saveFnRef.current({ name: 'Custom name ' });
  //   uriDownload(savedImgData.imageData.imageBase64);
  //   console.log('image after saving', savedImgData);
  // },
  // useZoomPresetsMenu: true,
  // disableZooming: true,
  // noCrossOrigin: false,
  // removeSaveButton: true,
  // disableSaveIfNoChanges: true,
  resetOnImageSourceChange: true,
  // backgroundColor: 'gray',
  // backgroundImage: new Image(),
};

export default config;
