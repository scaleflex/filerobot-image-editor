> Repository includes React version and JS wrapper for standalone usage

[![Release](https://img.shields.io/badge/release-v2.0.1-blue.svg)](https://github.com/scaleflex/filerobot-image-editor/releases)
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
   The Filerobot Image Editor is the easiest way to integrate an easy-to-use image editor in your web application. Integrated with few lines of code, your users will be able to apply basic transformations like resize, crop, rotate and various filters to any image.
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

## <a name="table_of_contents"></a>Table of contents

* [Standalone usage](#standalone_usage)
    * [Installation](#installation)
    * [Quick start](#quick_start)
    * [Methods](#methods)
* [React component usage](#react_component)
    * [Installation](#installation_react)
    * [Quick start](#quick_start_react)
    * [Methods/Properties](#methods_react)
* [Filerobot Integration](#filerobot_integration)
* [Cloudimage Integration](#cloudimage_integration)
* [Filerobot UI Family](#ui_family)
* [Contributing](#contributing)
* [License](#license)

## <a name="standalone_usage"></a>Standalone usage

### <a name="installation"></a>Installation

Use latest CDNized plugin version

```html
<script src="https://cdn.scaleflex.it/plugins/filerobot-image-editor/2.0.1/filerobot-image-editor.min.js"></script>
```


You may also use major version number instead of fixed version to have the latest version available.

```html
<script src="https://cdn.scaleflex.it/plugins/filerobot-image-editor/2/filerobot-image-editor.min.js"></script>
```

### <a name="quick_start"></a>Quick start

We provide easy way to integrate image editor in your applications

```html
<script>
    const ImageEditor = new FilerobotImageEditor();

    ImageEditor.open('https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg');
</script>
```
<a href="https://codesandbox.io/s/88jpkv2m09"><img src="https://codesandbox.io/static/img/play-codesandbox.svg" alt="edeit on codesandbox"/></a>

### <a name="methods"></a>Methods

#### `FilerobotImageEditor(config: {}, uploadHandler: callback)`: function

Initialization of Filerobot Image Editor plugin.

#### `ImageEditor.open(url)`: function

Open editor modal.

* **url**: string (required) - image url to edit

#### `ImageEditor.close()`: function

Close editor modal.

#### `ImageEditor.unmount()`: function

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


class App extends Component {
  constructor() {
    super();

    this.state = {
      isShow: false,
      imgSrc: 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg'
    }
  }

  showImageEditor = () => {
    this.setState({ isShow: true });
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
           config={{}}
           onComplete={() => {}}
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

#### `onComplete()`: function (required)

Callback, triggers on complete processing image.

## <a name="filerobot_integration"></a>Filerobot Integration

Upload the image in your Filerobot storage container, edit it in the Image Editor and upload the result.
Deliver lightning fast over CDN.

The example of Image Editor configuration using Filerobot service can be found
[here](https://github.com/scaleflex/filerobot-image-editor/tree/master/examples/js-with-filerobot).

## <a name="cloudimage_integration"></a>Cloudimage Integration

Point the Image Editor to your origin image URL, edit it and deliver the result lightning fast over the Cloudimage image CDN.
Limited to the Cloudimage inline transformation features.

The example of Image Editor configuration using cloudimage service can be found
[here](https://github.com/scaleflex/filerobot-image-editor/tree/master/examples/js-with-cloudimage).

## <a name="ui_family"></a>Filerobot UI Familiy

* [Image Uploader](https://github.com/scaleflex/filerobot-uploader)
* [JS Cloudimage Responsive](https://github.com/scaleflex/js-cloudimage-responsive)
* [JS Cloudimage 360 view](https://github.com/scaleflex/js-cloudimage-360-view)
* [React Cloudimage Responsive](https://github.com/scaleflex/react-cloudimage-responsive)
* [Angular Cloudimage Responsive](https://github.com/scaleflex/ng-cloudimage-responsive)

## <a name="contributing"></a>Contributing!

All contributions are super welcome!

## <a name="license"></a>License
Filerobot Image Editor is provided under the [MIT License](https://opensource.org/licenses/MIT)
