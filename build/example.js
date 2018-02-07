(function() {
  let options = {
    SECRET_KEY: '0cbe9ccc4f164bf8be26bd801d53b132',
    CONTAINER_TOKEN: 'example',
    onUpload: function (newSrc) {
      const image = document.getElementById('image');
      image.src = newSrc;
      AirstoreImageEditor.close();
    }
  };

  window.onload = function() {
    if (AirstoreImageEditor) {
      AirstoreImageEditor.init(options);

      const image = document.getElementById('image');

      if (image) image.onclick = (event) => {
        AirstoreImageEditor.open(event.target.src);
      }
    }
  }
})();