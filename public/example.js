(function() {
  window.onload = function() {
    if (window.AirstoreImageEditor) {
      let options = {
        // optional default: 'airstore-image-editor' | image editor root element to boost the plugin
        //ELEMENT_ID: 'airstore-image-editor',
        // * required if PROCESS_WITH_CLOUDIMAGE set to false | Airstore uploaded key
        //UPLOAD_KEY: '0cbe9ccc4f164bf8be26bd801d53b132',
        UPLOAD_KEY: '7cc1f659309c480cbc8a608dc6ba5f03',
        // * required if PROCESS_WITH_CLOUDIMAGE set to false | Airstore uploaded key
        //UPLOAD_CONTAINER: 'example',
        UPLOAD_CONTAINER: 'scaleflex-tests-v5a',
        // optional | use cloudimage operations to generate final url
        PROCESS_WITH_CLOUDIMAGE: true,
        // * required if PROCESS_WITH_CLOUDIMAGE set to true | cloudimage token
        CLOUDIMAGE_TOKEN: 'demo',

        // required | handle callback
        onUpload: function (newUrl) { // newUrl - result image url
          const image = document.getElementById('image');

          image.src = newUrl;
          // close the editor
          window.AirstoreImageEditor.close();
        }
      };

      window.AirstoreImageEditor.init(options);

      // Open Image Editor and pass source of image
      const image = document.getElementById('image');

      if (image) image.onclick = function(event) {
        // open the editor
        window.AirstoreImageEditor.open(event.target.src);
      }
    }
  }
})();