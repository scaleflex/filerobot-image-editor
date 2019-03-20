> Repository includes React version and JS wrapper for standalone usage

[![Release](https://img.shields.io/badge/release-v1.1.3-blue.svg)](https://github.com/scaleflex/filerobot-image-editor/releases)
[![Free plan](https://img.shields.io/badge/price-includes%20free%20plan-green.svg)](https://www.filerobot.com/en/home#2de3fb9f-dd4a-457a-999a-025ad9bd5f3b)
[![Contributions welcome](https://img.shields.io/badge/contributions-welcome-orange.svg)](#contributing)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Scaleflex team](https://img.shields.io/badge/%3C%2F%3E%20with%20%E2%99%A5%20by-the%20Scaleflex%20team-6986fa.svg)](https://www.scaleflex.it/en/home)

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Edit,%20resize,%20and%20filter%20any%20image&url=https://scaleflex.github.io/filerobot-image-editor/&via=filerobot&hashtags=uploader,image_resizing,image_editor,image_cropping)

<p align="center">
	<img
		height="175"
		alt="The Lounge"
		src="https://scaleflex.airstore.io/filerobot/robot-filerobot.png?sanitize=true">
</p>

<h1 align="center">
   Filerobot Image Editor
</h1>

<p align="center">
	<strong>
		<a href="#table_of_contents">Docs</a>
		•
		<a href="https://scaleflex.github.io/filerobot-image-editor/" target="_blank">Demo</a>
		•
		<a href="https://codesandbox.io/s/88jpkv2m09" target="_blank">CodeSandbox</a>
	</strong>
</p>

<p align="center">
   The Filerobot Image Editor is the easiest way to integrate an easy-to-use image editor in your web application. Integrated with few lines of code, your users will be able to apply basic transformations like resize, crop, rotate and various filters to any image. Once edited, the Image Editor will return an URL to the resulting image and deliver it rocket fast over CDN all around the World.
</p>

<p align="center">
    <a href="https://scaleflex.github.io/filerobot-image-editor/" target="_blank">
        <img
            width="800"
            alt="Filerobot Image Editor"
            src="https://scaleflex.airstore.io/filerobot/assets/filerobotimageeditor3_min.gif?sanitize=true">
    </a>
</p>

<p align="center"><a href="https://scaleflex.github.io/filerobot-image-editor/" target="_blank">Demo</a></p>

> The example of Image Editor configuration using cloudimage service can be found [here](https://github.com/scaleflex/filerobot-image-editor/tree/v1.0.0/examples/js-with-cloudimage).

## Requirements

To use the plugin, you will need a Filerobot token. Don't worry, it only
takes seconds to get one by registering [here](https://www.filerobot.com/en/home).
Once your token is created, you can configure it as described below.
This token allows you to use 25GB of image cache and 25GB of worldwide
CDN traffic per month for free.

## <a name="table_of_contents"></a>Table of contents

* [Standalone usage](#standalone_usage)
    * [Installation](#installation)
    * [Quick start](#quick_start)
    * [Methods](#methods)
* [React component usage](#react_component)
    * [Installation](#installation_react)
    * [Quick start](#quick_start_react)
    * [Methods/Properties](#methods_react)
* [Configuration](#configuration)
* [Filerobot UI Family](#ui_family)
* [Contributing](#contributing)
* [License](#license)

## <a name="standalone_usage"></a>Standalone usage

### <a name="installation"></a>Installation

Use latest CDNized plugin version

```html
<script src="https://scaleflex.airstore.io/filerobot/image-editor/1.1.3/main.min.js"></script>
```

### <a name="quick_start"></a>Quick start

We provide easy way to integrate image editor in your applications

```html
<script>
  const config = {
      filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
      filerobotContainer: 'scaleflex-tests-v5a'
    };

    const onComplete = function(url, file) {
      // do something with new url or file
    }

    FilerobotImageEditor.init(config, onComplete);

    FilerobotImageEditor.open('https://scaleflex.airstore.io/filerobot/assets/filerobot-demo-2-min.jpg');
</script>
```
<a href="https://codesandbox.io/s/88jpkv2m09"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edeit on codesandbox"/></a>

### <a name="methods"></a>Methods

#### `FilerobotImageEditor.init(config: {}, uploadHandler: callback)`: function

Initialization of Filerobot Image Editor plugin.

#### `FilerobotImageEditor.open(url)`: function

Open editor modal.

* **url**: string (required) - image url to edit

#### `FilerobotImageEditor.close()`: function

Close editor modal.

#### `FilerobotImageEditor.unmount()`: function

Destroy editor

## <a name="react_component"></a>React component usage

### <a name="installation_react"></a>Installation

```
$ npm install --save filerobot-image-editor
```

### <a name="quick_start_react"></a>Quick start

We provide easy way to integrate image editor in your applications

```javascript
import React, { Component } from 'react';
import { render } from 'react-dom';
import FilerobotImageEditor from 'filerobot-image-editor';


const config = {
  filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
  filerobotContainer: 'scaleflex-tests-v5a',
};

class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
      imgSrc: '//scaleflex.airstore.io/filerobot/assets/filerobot-demo-2-min.png'
    }
  }

  showImageEditor = () => {
    this.setState({ isShow: true });
  }

  onComplete = (newUrl) => {
    this.setState({ imgSrc: newUrl });
  }

  onClose = () => {
    this.setState({ isShow: false });
  }

  render() {
    const { imgSrc, isShow } = this.state;

    return (
      <div>
        <h1>Filerobot Image Editor</h1>

          <img src={imgSrc} onClick={this.showImageEditor} alt="example image"/>

        <FilerobotImageEditor
           show={isShow}
           src={imgSrc}
           config={config}
           onComplete={this.onComplete}
           onClose={this.onClose}
        />
      </div>
    )
  }
}

render(<App/>, document.getElementById('app'));
```
<a href="https://codesandbox.io/s/k3q9vrk707"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edeit on codesandbox"/></a>

### <a name="methods_react"></a>Methods/Properties

#### `show`: bool (required)

**default**: false

Trigger, to display the image editor widget.

#### `config`: object (required)

Image editor config.

#### `onClose()`: function (required)

Callback, triggers on close image editor widget.

#### `onComplete(url: string, file: object)`: function (required)

Callback, triggers on complete processing image.

## <a name="configuration"></a>Configuration

#### `filerobotContainer`: string (required)

Filerobot Container name.

```
filerobotContainer: 'demo'
```

#### `filerobotUploadKey`: string (required)

Unique upload key for Filerobot.

```
filerobotUploadKey: 'xxxxxxxxxxxx'
```

#### `uploadParams`: object

[see documentation](https://docs.airstore.io/go/airstore-public-documentation/en/airstore-api-reference/upload-files/#od_9911d3cb)

* **dir**: string (default: '/') - specify the folder where you want to upload the file. If the folder doesn't exist, it will be created.

```
 uploadParams: {
    dir: '/folder_name',
    ...
}
```
## <a name="ui_family"></a>Filerobot UI Familiy

* [Image Uploader](https://github.com/scaleflex/filerobot-uploader)
* [JS Cloudimage Responsive](https://github.com/scaleflex/js-cloudimage-responsive)
* [React Cloudimage Responsive](https://github.com/scaleflex/react-cloudimage-responsive)
* [Angular Cloudimage Responsive](https://github.com/scaleflex/ng-cloudimage-responsive)

## <a name="contributing"></a>Contributing!

All contributions are super welcome!

## <a name="license"></a>License
Filerobot Image Editor is provided under the [MIT License](https://opensource.org/licenses/MIT)
