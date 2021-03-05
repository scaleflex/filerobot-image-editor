# Filerobot Image Editor using cloudimage service

<a href="https://www.cloudimage.io/en/home"><img src="https://cdn.scaleflex.it/filerobot/assets/cloudimage-icon.png" width="200"></a>

Point the Image Editor to your origin image URL, edit it and deliver the result lightning fast over the Cloudimage image CDN.
Limited to the Cloudimage inline transformation features.

## Requirements

To use the Cloudimage Responsive plugin, you will need a
Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by
registering [here](https://www.cloudimage.io/en/register_page).
Once your token is created, you can configure it as described below.
This token allows you to use 25GB of image cache and 25GB of worldwide
CDN traffic per month for free.


## Example

```
<script>
  const config = {
    cloudimage: {
      token: '******'
    }
  };

  const onComplete = function(newUrl) {
    console.log('your url for the edited image: ', newUrl);
  };

  const ImageEditor = new FilerobotImageEditor(config, onComplete);

  ImageEditor.open('https://cdn.scaleflex.it/demo/stephen-walker-unsplash.jpg');
</script>
```

## Config/Methods

#### `cloudimage`: object (required)

#### `cloudimage.token`: string (required)

Your Cloudimage customer token.
[Subscribe](https://www.cloudimage.io/en/register_page) for a
Cloudimage account to get one. The subscription takes less than a
minute and is totally free.

#### `cloudimage.dontCleanQuery`: boolean (optional)

Normally the passed image's url's query is cleaned before processing to cloudimage url for avoiding conflicts or overriding, but with this property if you passed it `true` no query cleaning would be happen but it is not guaranteed that the results would be as expected.

#### `onComplete(url: string)`: function (required)

Callback, triggers on complete processing image.


***
[Go back to Image Editor](https://github.com/scaleflex/filerobot-image-editor)