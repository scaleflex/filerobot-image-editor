# Filerobot Image Editor using filerobot service

<a href="https://www.cloudimage.io/en/home"><img src="https://cdn.scaleflex.it/filerobot/filerobot_logo.png" width="200"></a>

Upload the image in your Filerobot storage container, edit it in the Image Editor and upload the result. Deliver lightning fast over CDN.

## Requirements

To use the plugin, you will need a Filerobot token. Don't worry, it only takes seconds to get one by registering
[here](https://www.filerobot.com/en/registration_temp).
Once your token is created, you can configure it as described below. This token allows you to use 25GB of image
cache and 25GB of worldwide CDN traffic per month for free.

## Example

```
<script>
  const config = {
    filerobot: {
      uploadKey: '******',
      container: '******',
      uploadParams: {
        dir: '/'
      }
    }
  };

  const onComplete = function(newUrl, file) {
    console.log('your url for the edited image: ', newUrl);
  };

  const ImageEditor = new FilerobotImageEditor(config, onComplete);

  ImageEditor.open('https://cdn.scaleflex.it/demo/stephen-walker-unsplash.jpg');
</script>
```

## Config/Methods

#### `filerobot`: object (required)

#### `filerobot.uploadKey`: string (required)

Unique upload key for Filerobot.
[Subscribe](https://www.filerobot.com/en/registration_temp) for a
Filerobot account to get one. The subscription takes less than a
minute and is totally free.

#### `filerobot.container`: string (required)

Filerobot Container name.

#### `filerobot.onSaveAs(triggerUpload: function, exitFullscreenModal: function)`: function (optional - but for showing saveAs button then it's required)

The save as new image button is shown when this function is provided, and it is called after clicking the save as button and before uploading process as uploading is called through manually through this function.

* `triggerUpload(overrides: object)`: function - The function that triggers the upload process to be handled from the plugin's side.

  * **overrides**: object (default: {}) - Object which overrides the passed properties/values (uploadParams) at the filerobot config if it is not provided or some property is passed and another not the original property passed in the uploadParams object of filerobot config would be used. it accepts the exact properties of `filerobot.uploadParams` below.

* `exitFullscreenModal`: a callback function for closing the modal fullscreen off in case it is opened or fullscreened.

#### `filerobot.uploadParams`: object

* **dir**: string (default: '/') - specify the folder where you want to upload the file. If the folder doesn't exist, it will be created.

* **imageName**: string (default: image name from the url) - The name (includes image's extension) of opened image that would be used for the saved image.

* **keepPropsAndMeta**: boolean (default: false) - whether or not to include the below `imageProperties` & `imageMeta` objects in the saved image's propeties & meta.

* **imageProperties**: object (default: undefined) - The object that contains the main image properties to be moved into the saved image.

* **imageMeta**: object (default: undefined) - The object that contains the main image meta to moved into the saved image.


#### `onComplete(url: string, file: object)`: function (required)

Callback, triggers on complete processing image.


***
[Go back to Image Editor](https://github.com/scaleflex/filerobot-image-editor)