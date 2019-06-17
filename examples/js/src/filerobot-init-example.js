import '../../../projects/js/index';


const buttonEditDownload = document.getElementById('edit-btn-download');
const buttonEditUpload = document.getElementById('edit-btn-upload');
const buttonEditModify = document.getElementById('edit-btn-modify');
const resultModal = document.getElementById('result-modal');
const image = document.getElementById('result-image');
const resultLink = document.getElementById('result-link');

function initImageEditorDownload() {
  const image = document.querySelector('img.active');

  if (FilerobotImageEditor.unmount) FilerobotImageEditor.unmount();

  FilerobotImageEditor.init({}, function() {
    const resultModal = document.getElementById('result-modal');
    const image = document.getElementById('result-image');
    const resultLink = document.getElementById('result-link');

    resultLink.innerText = 'Your images started to download';
    resultModal.style.display = 'block';

    FilerobotImageEditor.close();
  });


  FilerobotImageEditor.open(image.src.slice(image.src.lastIndexOf('http')));
}

function initImageEditorUpload() {
  const image = document.querySelector('img.active');

  if (FilerobotImageEditor.unmount) FilerobotImageEditor.unmount();

  FilerobotImageEditor.init({
    filerobotUploadKey: 'bf72d18393ea40d5b4fccd9fb83806fa',
    filerobotContainer: 'fpdlhfjm',
    uploadParams: {
      dir: '/Github-Image-Editor'
    }
  }, function(newUrl) {
    const copyText = document.getElementById("copy-text");
    const resultImage = document.getElementById('result-image');
    const url = newUrl.replace('https://fpdlhfjm.airstore.io/', 'https://store.filerobot.com/fpdlhfjm/');

    copyText.value = url;
    resultImage.src = url;
    resultLink.innerText = url;
    resultModal.style.display = 'block';

    FilerobotImageEditor.close();
  });


  FilerobotImageEditor.open(image.src.slice(image.src.lastIndexOf('http')));
}

function initImageEditorModify() {
  const image = document.querySelector('img.active');

  if (FilerobotImageEditor.unmount) FilerobotImageEditor.unmount();

  FilerobotImageEditor.init({
    processWithCloudimage: true,
    cloudimageToken: 'scaleflex'
  }, function(newUrl) {
    const copyText = document.getElementById("copy-text");
    const resultImage = document.getElementById('result-image');

    copyText.value = newUrl;
    resultImage.src = newUrl;
    resultLink.innerText = newUrl;
    resultModal.style.display = 'block';

    FilerobotImageEditor.close();
  });


  FilerobotImageEditor.open(image.src.slice(image.src.lastIndexOf('http')));
}

buttonEditDownload.onclick = initImageEditorDownload;
buttonEditUpload.onclick = initImageEditorUpload;
buttonEditModify.onclick = initImageEditorModify;