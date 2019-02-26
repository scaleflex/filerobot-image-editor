import '../../../projects/js/index';


const config = {
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  filerobotContainer: 'scaleflex-tests-v5a',
  processWithCloudimage: false,
  uploadWithCloudimageLink: false,
  cloudimageToken: 'demo',
  // elementId: '',
  // hideCloudimageSwitcher: false,
  // uploadParams: {},
};

const onUpload = function(newUrl) {
  const image = document.getElementById('image');

  image.src = newUrl;
  FilerobotImageEditor.close();
}

FilerobotImageEditor.init(config, onUpload);

const image = document.getElementById('image');

image.onclick = function(event) {
 FilerobotImageEditor.open(event.target.src);
}