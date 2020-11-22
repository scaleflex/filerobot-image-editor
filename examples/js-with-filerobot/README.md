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


#### `filerobot.uploadParams`: object

* **dir**: string (default: '/') - specify the folder where you want to upload the file. If the folder doesn't exist, it will be created.

#### `onComplete(url: string, file: object)`: function (required)

Callback, triggers on complete processing image.

#### `saveMode`: string | default: 'duplicate'; 'new', 'duplicate', 'replace'
The mode used in saving the uploaded image whether to have a new image and dismissing the main image's properties, copying the same properties of the main image into the new uploaded image or to replace/overwrite the main image.

#### `imageProperties`: object
The object that contains the main image properties to be copied into the duplicated image or the replacement image used in any of the both saveMode values (duplicate, replace).

***
[Go back to Image Editor](https://github.com/scaleflex/filerobot-image-editor)