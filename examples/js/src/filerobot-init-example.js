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
  isLowQualityPreview: true
});


// Image Editor to upload images and get url in response

const configUpload = {
  elementId: 'image-editor-upload',
  filerobot: {
    uploadKey: 'bf72d18393ea40d5b4fccd9fb83806fa',
    container: 'fpdlhfjm',
    uploadParams: {
      dir: '/Github-Image-Editor'
    }
  },
  isLowQualityPreview: true
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
    action.open(image.src.slice(image.src.lastIndexOf('http')));
  }
}

buttonEditDownload.onclick = initImageEditorDownload;
buttonEditUpload.onclick = initImageEditorUpload;
buttonEditModify.onclick = initImageEditorModify;