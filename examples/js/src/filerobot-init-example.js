import '../../../projects/js/index';


const buttonEditDownload = document.getElementById('edit-btn-download');
const buttonEditUpload = document.getElementById('edit-btn-upload');
const buttonEditModify = document.getElementById('edit-btn-modify');
const resultModal = document.getElementById('result-modal');
const resultLink = document.getElementById('result-link');
const responseMessage = document.getElementById('success-message');


let ImageEditorDownload, ImageEditorUpload, ImageEditorModify;

// Image Editor to download images

ImageEditorDownload = new FilerobotImageEditor({
    elementId: 'image-editor-download',
    isLowQualityPreview: true,
    colorScheme: 'dark',
    reduceBeforeEdit: {
      mode: 'manual',
      widthLimit: 2000,
      heightLimit: 2000
    },
    beginCropArea: 1,
    //cropBeforeEdit: {
    //  width: 400,
    //  height: 200
    //},
    translations: {
      en: {}
    },
    language: 'en',
    watermark: {
      url: 'https://cdn.scaleflex.it/demo/filerobot.png',
      urls: [
        { url: 'https://cdn.scaleflex.it/demo/filerobot.png', label: 'filerobot logo' },
        'https://cdn.scaleflex.it/demo/superman.png'
      ],
      // fonts: [
      //   { label: 'Arial', value: 'Arial' }
      // ],
      position: 'center',
      opacity: 0.7,
      applyByDefault: false,
      handleOpacity: true,
      fileUpload: true,
    },
    showGoBackBtn: false
    //cropPresets: [
    //  { name: 'square', value: 1 },
    //  { name: 'half-page ad', value: 300 / 600 },
    //  { name: 'banner', value: 468 / 60 },
    //  { name: 'leaderboard', value: 728 / 90 }
    //],
    //resizePresets: [
    //  { name: 'square', width: 400, height: 400, ratio: 1 },
    //  { name: 'small square', width: 200, height: 200, ratio: 1 },
    //  { name: 'half-page ad', width: 300, height: 600, ratio: 300 / 600 },
    //  { name: 'banner', width: 468, height: 60, ratio: 468 / 60 },
    //  { name: 'leaderboard', width: 728, height: 90, ratio: 728 / 90 }
    //]
  }
  //{
  //  onComplete: (props) => { console.log(props); },
  //  onBeforeComplete: (props) => {
  //    console.log(props);
  //    return false;
  //  }
  //}
  );

// Image Editor to upload images and get url in response

const configUpload = {
  elementId: 'image-editor-upload',
  filerobot: {
    uploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
    container: 'scaleflex-tests-v5a',
    uploadParams: {
      dir: '/Github-Image-Editor'
    }
  },
  isLowQualityPreview: true,
  reduceBeforeEdit: {
    mode: 'manual',
    widthLimit: 2000,
    heightLimit: 2000
  },
  beginCropArea: 0.8,
  cropBeforeEdit: {
    width: 400,
    height: 200
  },
  watermark: {
    url: 'https://cdn.scaleflex.it/demo/filerobot.png',
    urls: [
      'https://cdn.scaleflex.it/demo/filerobot.png',
      'https://cdn.scaleflex.it/demo/superman.png'
    ],
    position: 'center',
    opacity: 0.7,
    applyByDefault: false,
    handleOpacity: true,
    fileUpload: true,
  }
};
const onCompleteUpload = function (newUrl) {
  const copyText = document.getElementById("copy-text");
  const resultImage = document.getElementById('result-image');
  const url = newUrl.replace('https://fpdlhfjm.airstore.io/', 'https://store.filerobot.com/fpdlhfjm/');

  responseMessage.style.display = 'none';
  responseMessage.innerText = '';
  copyText.value = url;
  resultImage.src = url;
  resultLink.innerText = url;
  resultModal.style.display = 'block';
};

ImageEditorUpload = new FilerobotImageEditor(configUpload, onCompleteUpload);

//ImageEditorUpload = new FilerobotImageEditor(configUpload, {
//  onComplete: onCompleteUpload,
//  onBeforeComplete: (props) => {
//    console.log(props);
//    return false;
//  }
//});

// Image Editor to apply transformation by modifying url

const configModify = {
  elementId: 'image-editor-modify',
  //cloudimage: {
  //  token: 'scaleflex'
  //},
  filerobot: {
    token: 'fumwdnfm', // 'fumwdnfm' - sealing token, 'fusqadtm' - not sealing token
    // doNotPrefixURL: true,
    version: 'v7', // Need to add for sealing. In other cases skip version
  },
  processWithCloudimage: true,
  isLowQualityPreview: true,
  beginCropArea: 0.5,
  reduceBeforeEdit: {
    mode: 'manual',
    widthLimit: 2000,
    heightLimit: 2000
  },
  cropBeforeEdit: {
    width: 400,
    height: 200
  },
  watermark: {
    url: 'https://cdn.scaleflex.it/demo/filerobot.png',
    urls: [
      { url: 'https://cdn.scaleflex.it/demo/filerobot.png', label: 'filerobot logo' },
      'https://cdn.scaleflex.it/demo/superman.png'
    ],
    position: 'center',
    opacity: 0.7,
    applyByDefault: true,
    handleOpacity: true
  },
  imageSealing: {
   enabled: true,
   salt: 'test',
   char_count: 10,
   include_params: ['wat', 'wat_url', 'wat_opacity', 'wat_scale', 'wat_pad', 'wat_gravity'], // optional, by default include all
  },
};

const onCompleteModify = function (newUrl) {
  const copyText = document.getElementById("copy-text");
  const resultImage = document.getElementById('result-image');

  responseMessage.style.display = 'none';
  responseMessage.innerText = '';
  copyText.value = newUrl;
  resultImage.src = newUrl;
  resultLink.innerText = newUrl;
  resultModal.style.display = 'block';
};

ImageEditorModify = new FilerobotImageEditor(configModify, {
  onComplete: onCompleteModify,
  onOpen: () => { console.log('open'); },
  onClose: () => { console.log('close') }
});

function initImageEditorDownload() {
  initImageEditorAction(ImageEditorDownload);
}

function initImageEditorUpload() {
  initImageEditorAction(ImageEditorUpload);
}

function initImageEditorModify() {
  initImageEditorAction(ImageEditorModify);
}

function initImageEditorAction(action) {
  const image = document.querySelector('.demo-img.active');
  const resultImage = document.getElementById('result-image');

  resultImage.src = '';

  if (image.tagName === 'DIV') {
    const url = image.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g, '');
    action.open(url);
  } else if (image.tagName === 'IMG') {
    action.open('https://scaleflex.ultrafast.io/' + image.src.slice(image.src.lastIndexOf('http')));
  }
}

buttonEditDownload.onclick = initImageEditorDownload;
buttonEditUpload.onclick = initImageEditorUpload;
buttonEditModify.onclick = initImageEditorModify;