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
      'https://cdn.scaleflex.it/demo/filerobot.png',
      'https://cdn.scaleflex.it/demo/superman.png'
    ],
    position: 'center',
    opacity: 0.7,
    applyByDefault: false
  },
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
});

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
    applyByDefault: false
  }
};
const onCompleteUpload = function(newUrl) {
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

// Image Editor to apply transformation by modifying url

const configModify = {
  elementId: 'image-editor-modify',
  cloudimage: {
    token: 'scaleflex'
  },
  isLowQualityPreview: true,
  reduceBeforeEdit: {
    mode: 'manual',
    widthLimit: 2000,
    heightLimit: 2000
  },
  cropBeforeEdit: {
    width: 400,
    height: 200
  }
};

const onCompleteModify = function(newUrl) {
  const copyText = document.getElementById("copy-text");
  const resultImage = document.getElementById('result-image');

  responseMessage.style.display = 'none';
  responseMessage.innerText = '';
  copyText.value = newUrl;
  resultImage.src = newUrl;
  resultLink.innerText = newUrl;
  resultModal.style.display = 'block';
};

ImageEditorModify = new FilerobotImageEditor(configModify, onCompleteModify);

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
    const url = image.style.backgroundImage.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
    action.open(url);
  } else if (image.tagName === 'IMG') {
    action.open('https://scaleflex.ultrafast.io/' + image.src.slice(image.src.lastIndexOf('http')));
  }
}

buttonEditDownload.onclick = initImageEditorDownload;
buttonEditUpload.onclick = initImageEditorUpload;
buttonEditModify.onclick = initImageEditorModify;