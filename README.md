# Filerobot Image Editor

Edit, resize, and filter any image!

> The example of Image Editor configuration using cloudimage service can be found [here](https://github.com/scaleflex/filerobot-image-editor/tree/v1.0.0/examples/js-with-cloudimage).

[See demo](https://scaleflex.github.io/filerobot-image-editor/)

## Table of contents

* [Standalone usage](#standalone_usage)
    * [Installation](#installation)
    * [Quick start](#quick_start)
    * [Methods](#methods)
* [React component usage](#react_component)
    * [Installation](#installation_react)
    * [Quick start](#quick_start_react)
    * [Methods/Properties](#methods_react)
* [Configuration](#configuration)
* [Contributing](#contributing)

## <a name="standalone_usage"></a>Standalone usage

### <a name="installation"></a>Installation

Use latest CDNized plugin version

```
<script src="https://scaleflex.airstore.io/filerobot/image-editor/1.0.0/main.min.js"></script>
```

### <a name="quick_start"></a>Quick start

We provide easy way to integrate image editor in your applications

```
<script>
  const config = {
      filerobotUploadKey: '7cc1f659309c480cbc8a608dc6ba5f03',
      filerobotContainer: 'scaleflex-tests-v5a'
    };

    const onComplete = function(url) {
      // do something with new url
    }

    FilerobotImageEditor.init(config, onComplete);

    FilerobotImageEditor.open('https://via.placeholder.com/450x150');
</script>
```

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

```
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

### <a name="methods_react"></a>Methods/Properties

#### `show`: bool (required)

**default**: false

Trigger, to display the image editor widget.

#### `config`: object (required)

Image editor config.

#### `onClose()`: function (required)

Callback, triggers on close image editor widget.

#### `onComplete(url: string)`: function (required)

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

## <a name="contributing"></a>Contributing!

All contributions are super welcome!