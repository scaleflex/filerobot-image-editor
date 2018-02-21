(function() {
  let onUploadHandler = function (newSrc) {
    const image = document.getElementById('image');

    image.src = newSrc;
    window.AirstoreImageEditor.close();
  };

  let options = {
    //ELEMENT_ID: 'airstore-image-editor',          // optional default: 'airstore-image-editor'
    UPLOAD_KEY: '0cbe9ccc4f164bf8be26bd801d53b132', // required
    CONTAINER: 'example',                           // required
    onUpload: onUploadHandler                       // required
  };

  window.onload = function() {
    if (window.AirstoreImageEditor) {
      window.AirstoreImageEditor.init(options);

      const image = document.getElementById('image');

      if (image) image.onclick = (event) => {
        window.AirstoreImageEditor.open(event.target.src);
      }
    }
  }
})();