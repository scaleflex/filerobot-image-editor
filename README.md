<p align="center">
	<a href="https://www.filerobot.com/en/home#gh-dark-mode-only" />
	<img src="https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469" alt="Filerobot dark mode Logo" width="300px" />
  </a>
  <a href="https://www.filerobot.com/en/home#gh-light-mode-only">
    <img src="https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c" alt="Filerobot white mode Logo" width="300px">
  </a>
	<br />
	<br />
	<img src="https://img.shields.io/npm/l/filerobot-image-editor?style=for-the-badge" alt="License (MIT)" />
	<img src="https://img.shields.io/npm/v/filerobot-image-editor?label=Version&style=for-the-badge" alt="Version" />
	<img src="https://img.shields.io/npm/dt/filerobot-image-editor?style=for-the-badge" alt="Downloads"/>
	<br />
	<br />
	<a href="https://www.filerobot.com/en/home">Learn more about Filerobot</a>
</p>

# Filerobot Image Editor (FIE)

The Filerobot Image Editor is the easiest way to integrate an easy-to-use image editor in your web application. Integrated with few lines of code, your users will be able to apply basic transformations like resize, crop, flip, finetune, annotate, watermark and various filters to any image.

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Edit,%20resize,%20and%20filter%20any%20image&url=https://scaleflex.github.io/filerobot-image-editor/&via=filerobot&hashtags=uploader,image_resizing,image_editor,image_cropping)
![GitHub Repo stars](https://img.shields.io/github/stars/scaleflex/filerobot-image-editor?style=social)

## Demo

GIF Link

## Features

- 📱 Touch, Mobile & Desktop Friendly.<!-- - ⌨️ Keyboard keys mapped. -->
- ⏭️ Live Comparison (Applied Operations & original).
- ⏳ History management (Undo/Redo/Reset).
- ✂️ Image Adjustment.
- 🔂 Export current design state & load it whenever you want to continue past edits *Experimental*
- 🎨 Image Annotating & Drawing.
- 🖼️ Watermarking & positioning.
- 🪟 Image Resizing.
- 🧊 A lot of Image Filters.
- 🌉 VanillaJS + Bridged to frameworks (React & More to support...).
- 🏗️ Easy, Focused & Simple UI for better UX.
- ➕ Ability to customize.
- 🚀 Image file on save customization.
- 🤹🏼 And more to discover by yourself...

<hr />

## Contents

- [Requirements](#requirements)
- [Installation](#installation)
  - React
    - [NPM](#react-component)
  - VanillaJS
    - [NPM](#vanillajs)
    - [CDN](#cdn)
- [Usage/Examples](#usageexamples)
  - [React Example](#react-example)
  - [VanillaJS Example](#vanillajs-example)
- [Config](#config)
  - [Properties](#properties)
  - [Callbacks](#callbacks)
- [Bridges appendix](#bridges-appendix)
  - [VanillaJS](#vanilla-javascript)
- [Used by](#used-by)
- [Feedback](#feedback)

<hr />
  
## Requirements
	> Following requirements required only in NPM installation, but they're included in CDN bundle installation.

- react, react-dom: >= v16.8.0
- styled-components: >= v5.0.0

<details>
  <summary>Requirements Installation (Click to show)</summary>

  - react, react-dom: `npm install --save react react-dom` or use their CDN.
  - styled-components: `npm install --save styled-components` or use their CDN.
</details>

<hr />

## Installation

### NPM

#### React Component

```bash
npm install --save react-filerobot-image-editor
```

#### VanillaJS

```bash
npm install --save filerobot-image-editor
```

### CDN

VanillaJS only

```js
<script src=""></script>
```

<hr />

## Usage/Examples

### React Example

```js
import React, { useState } from 'react';
import FilerobotImageEditor, { TABS, TOOLS } from 'react-filerobot-image-editor';

function App() {
  const [isImgEditorShown, setIsImgEditorShown] = useState(false);

  const openImgEditor = () => {
    setIsImgEditorShown(true);
  };

  const closeImgEditor = () => {
    setIsImgEditorShown(false);
  };

  return (
    <div>
      <button onClick={openImgEditor}>Open Filerobot image editor</button>
      {isImgEditorShown && (
        <FilerobotImageEditor
	  image="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
	  onClose={closeImgEditor}
	  annotationsCommon={{
	    fill: '#ff0000'
	  }}
	  Text={{ text: 'Filerobot...' }}
	  tabs={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
	  defaultTabId={TABS.ANNOTATE} // or 'Annotate'
	  defaultToolId={TOOLS.TEXT} // or 'Text'
        />
      )}
    </div>
  );
}
```

### VanillaJS Example

```js
import FilerobotImageEditor, { TABS, TOOLS } from 'filerobot-image-editor';

const config = {
  image: 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg',
  annotationsCommon: {
    fill: '#ff0000'
  },
  Text: { text: 'Filerobot...' },
  tabs: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
  defaultTabId: TABS.ANNOTATE, // or 'Annotate'
  defaultToolId: TOOLS.TEXT, // or 'Text'
};

// Assuming we have a div with id="editor_container"
const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector('#editor_container'),
  config
);

filerobotImageEditor.render({
  onClose: (closingReason) => {
    console.log('Closing reason', closingReason);
    filerobotImageEdtior.terminate();
  }
});
```

> Important Note: if you are importing the library from CDN then you could access it using `window.FilerobotImageEditor` and access both `TABS & TOOLS` from `window.FilerobotImageEditor.TABS`  & `window.FilerobotImageEditor.TOOLS`.

<hr />

## Config

### Properties

#### `image`

Type: `string` | `HTMLImageElement` ***Required***.

Default: `undefined`.

The image url or an `HTMLImageElement` which the operations will be applied on.

#### `tabsIds`

Type: `string[]`

Default: `[]`

the tabs will be shown to the user, if empty array provided or left by default all tabs will be used otherwise the provided tabs ids would be shown.

#### `defaultTabId`

Type: `string`

Default: `Adjust`

The default opened tab once the user opens the plugin.

#### `defaultToolId`

Type: `string`

Default: first tool of the default opened tab.

The default opened tool once the user opens the plugin, and must be one of the tools related to the opened tab.

#### `useBackendTranslations`

Type: `boolean`

Default: `true`

A backend service that hosts the translations of the plugin to be able to change the translations without making a new build once the translations changed, and gives the change to support more languages too, if `true` the service would be used and the next [`language`](#language) property used in determining which language to show, `false` means avoid using this service in that case default translations and provided [`translations`](#translations) property will be used.

#### `language`

Type: `string`

Default: `en`

The 2 letters shorthand used for the language/translations, would be used in case [`useBackendTranslations`](#usebackendtranslations) is `true`.

#### `translations`

Type: `object`

Default: `null`

If provided will be used in overriding the default translations arrived locally with the plugin but it will **NOT** override the backend's translations if [`useBackendTranslations`](#usebackendtranslations).

#### `avoidChangesNotSavedAlertOnLeave`

Type: `boolean`

Default: `false`

By default once the user makes any change/edit on the image and hasn't saved the image yet and tried to leave the page before saving then a browser's confirmation would be shown asking him if he really wants to leave before saving, `true` means it won't be shown.

#### `showBackButton`

Type: `boolean`

Default: `false`

If `true` Close button on the top right will be hidden and back button will be shown on the top left (with replacing positions of save & history buttons).

#### `defaultSavedImageType`

Type: `string`

Default: `png`

The default type used and selected in saving the image (the user has the possibility to change it from the saving modal).

#### `forceToPngInEllipticalCrop`

Type: `boolean`

Default: `false`

If `true` then the saved image's type will always be `png` type if the user made an elliptical crop for preserving the transparency even if the user chose another extension in the saving modal, otherwise the familiar behavior (defaultSavedImageType or user's selected types) wins.

#### `loadableDesignState` *Experimental*

Type: `object`

Default: `null`

If provided the plugin will load this design state at the initial load to give the possibility to get back to that design in another time and continue editing it.

#### `annotationsCommon`

Type: `object`

Default:
```js
{
    fill: '#000000',
    stroke: '#000000',
    strokeWidth: 0,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowBlur: 0,
    shadowColor: '#000000',
    shadowOpacity: 1,
    opacity: 1,
}
```

The common options existed in all the annotations tools and used as default values.

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| **fill** | string | '#000000' | The filled color for any added annotation |
| **stroke** | string | '#000000' | The stroke color for any added annotation |
| **strokeWidth** | number | 0 | The stroke width for any added annotation |
| **shadowOffsetX** | number | 0 | The horizontal/X shadow offset from its base annotation |
| **shadowOffsetY** | number | 0 | The vertical/Y shadow offset from its base annotation |
| **shadowBlur** | number | 0 | Blur value of the shadow added to the annotation |
| **shadowColor** | string | '#000000' | The color of the shadow added to the annotation |
| **shadowOpacity** | number | 1 | Transparency/Opacity value for the shadow of annotation |
| **opacity** | number (0 - 1) | 1 | Transparency/Opacity value for the whole annotation |

#### `Text`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    fontFamily: 'Arial',
    fonts: [
      { label: 'Arial', value: 'Arial' },
      'Tahoma',
      'Sans-serif',
      { label: 'Comic Sans', value: 'Comic-sans' },
    ],
    fontSize: 14,
    letterSpacing: 0,
    lineHeight: 1,
    align: 'left',
    fontStyle: '',
}
```

The options available for the text annotation tool in additon to the annotationsCommon property,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **text** | string | 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' | The placeholder text added on adding a new text annotation |
| **fontFamily** | string | 'Arial' | The font family used for the text |
| **fonts** | (strings \| objects)[] | mentioned above | The fonts available to the user to choose from while adding text  |
| **fontSize** | number | 14 | The default size of the text added |
| **letterSpacing** | number | 0 | The spaces/paddings between letters of the text |
| **lineHeight** | number | 1 | Height of each line of the added text |
| **align** | string | 'left' ('left' \| 'center' \| 'right') | The horizontal alignment of the added text |
| **fontStyle** | string | '' ('normal' \| 'bold' \| 'italic' \| 'bold italic') | The font style & weight of text added |

> Fonts must be loaded from your side in implementation to take effect as it is not guaranteed that the user has the font on his system.

#### `Image`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    fill: undefined,
}
```

The options available for image annotation tool in additon to the annotationsCommon property,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **fill** | string | undefined | The color fills the image's transparent parts |

#### `Rect`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    cornerRadius: 0,
}
```
The options available for Rect annotation tool in additon to the annotationsCommon property,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **cornerRadius** | number | 0 | The radius of the rectangle's corners |

#### `Ellipse`

Type: `object`

Default: `annotationsCommon`

No specific options available for ellipse only the annotationsCommon are used for ellipse and you could override any of them for ellipse only by passing them here.

#### `Polygon`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    sides: 3,
}
```

The available options for polygon annotation tool in additon to the annotationsCommon property,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **sides** | number | 3 | Number of sides considered by default for the added polygon |

#### `Pen`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    strokeWidth: 1,
}
```

No specific options available for pen tool only the annotationsCommon are used and you could override any of them for pen only by passing them here.

#### `Line`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    lineCap: 'butt',
    strokeWidth: 1,
}
```

The available options for line annotation tool in additon to the annotationsCommon property,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **lineCap** | string | 'butt' ('butt' \| 'round' \| 'square') | The start & end borders line cap |

#### `Arrow`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    strokeWidth: 6,
    lineCap: 'butt',
    pointerLength: undefined,
    pointerWidth: undefined,
}
```

The available options for arrow annotation tool in additon to the annotationsCommon property,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **lineCap** | string | 'butt' ('butt' \| 'round' \| 'square') | The border line cap |
| **pointerLength** | number | undefined | Length of the arrow's pointer in px |
| **pointerWidth** | number | undefined | Width of the arrow's pointer in px |

#### `Watermark`

Type: `object`

Default:

```js
{
    ...(config[TOOLS.TEXT || TOOLS.IMAGE]), // depends on the added watermark type the config will be used
    gallery: [],
}
```

The available options for watermark tool, the watermark is using the options of text and image annotation tools mentioned above depending on the watermark chosen,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **gallery** | string[] | [] | Watermark images urls which are considered to show a list of available watermarks to be used by the user directly from watermark tab |

#### `Crop`

Type: `object`

Default:
```js
{
    minWidth: 14,
    minHeight: 14,
    maxWidth: null,
    maxHeight: null,
    ratio: 'original',
    noPresets: false,
}
```

The available options for crop tool,

| Property | Type | Default (possible values) | Description |
| --- | --- | --- | --- |
| **minWidth** | number | 14 | Minimum width (in px) of the possible crop area |
| **minHeight** | number | 14 | Minimum height (in px) of the possible crop area |
| **maxWidth** | number | null | Maximum width (in px) of the possible crop area |
| **maxHeight** | number | null | Maximum height (in px) of the possible crop area |
| **ratio** | string \| number | 'original' ('original' \| 'ellipse' \| 'custom' \| number) | Default ratio of the crop area |
| **noPresets** | boolean | false | hides the crop presets if `true` |

> Please note the letters-case of the above properties.

### Callbacks

#### `onBeforeSave`

Type: `function(imageFileInfo) {}`

Default: `undefined`

This function will be fired once the user clicks save button and before triggering the default saving behavior...

> If the function returned `false` then the default saving behavior implemented in the plugin won't be triggered.

#### `onSave`

Type: `function(imageObject, imageDesignState) {}` ***Required***

Default: `undefined`

Must be provided for avoiding plugin's error, it's used for handling the save functionality which is triggered once the user clicks on save button of the saving modal or once clicking the save button if the default behavior is prevented from [`onBeforeSave`](#onbeforesave) function.

#### `onClose`

Type: `function(closingReasons) {}`

Default: `undefined`

Triggered once the user clicks either close/cancel button or back button, if not provided then the closing button won't shown at all.

<hr />

## Bridges appendix

### Vanilla Javascript

#### `render(additionalConfig)`

Initializes/rerenders the plugin with the possibility to provide an additional config properties to the previously provided properties to the same plugin's instance.

#### `terminate()`

Unmounts the plugin's container from the page to be removed.

<hr />

## Used By

This project is used by the following companies:

- [Scaleflex](https://scaleflex.com/)

> Fork the repoistory, Append your company's name with the url in above format inside the README.md file and make a PR.

## Feedback

Create an issue on github repo. and mention the details there.

## License

Filerobot Image Editor is provided under [MIT License](https://opensource.org/licenses/MIT)
