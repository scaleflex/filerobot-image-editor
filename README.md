> **THIS BRANCH IS THE *`BETA`* RELEASE OF THE NEW MAJOR VERSION (V4)**

<p align="center">
	<img src="https://img.shields.io/npm/l/filerobot-image-editor?style=for-the-badge" alt="License (MIT)" />
	<img src="https://img.shields.io/npm/v/filerobot-image-editor/beta?label=Version&style=for-the-badge" alt="Version" />
	<img src="https://img.shields.io/npm/dt/filerobot-image-editor?style=for-the-badge" alt="Downloads"/>
	<br />
	<br />
	<a href="https://www.filerobot.com/en/home#gh-dark-mode-only" />
	<img src="https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+BLACK+BG.png?vh=619469" alt="Filerobot dark mode Logo" width="300px" />
  </a>
  <a href="https://www.filerobot.com/en/home#gh-light-mode-only">
    <img src="https://assets.scaleflex.com/Marketing/Logos/Filerobot+Logos/Logo+with+Scaleflex/LOGO+WITH+SCALEFLEX+ON+WHITE+BG.png?vh=7ae33c" alt="Filerobot white mode Logo" width="300px">
  </a>
	<br />
	<br />
	<a href="https://www.filerobot.com/en/home">Learn more about Filerobot</a>
</p>

# Filerobot Image Editor (FIE)

The Filerobot Image Editor is the easiest way to integrate an easy-to-use image editor in your web application. Integrated with few lines of code, your users will be able to apply basic transformations like resize, crop, flip, finetune, annotate, watermark and various filters to any image.

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Edit,%20resize,%20and%20filter%20any%20image&url=https://scaleflex.github.io/filerobot-image-editor/&via=filerobot&hashtags=uploader,image_resizing,image_editor,image_cropping)
![GitHub Repo stars](https://img.shields.io/github/stars/scaleflex/filerobot-image-editor?style=social)

## Demo

[***TEMP. DEMO HERE***](https://scaleflex.cloudimg.io/v7/plugins/filerobot-image-editor/v4_beta-demo/index.html?vh=d37a98&func=proxy)

GIF Link TO BE ADDED...

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
- 🧩 ES6 library supports tree-shaking for eliminating dead code.
- 🤹🏼 And more to discover by yourself...

<hr />

## Contents
- [Prerequisites](#prerequisites)
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
- [Bridges](#bridges)
- [Bridges docs](#bridges-docs)
  - [VanillaJS](#vanilla-javascript)
- [Used by](#used-by)
- [Feedback](#feedback)
- [Contributing](#contributing)
- [License](#license)

<hr />

## Prerequisites
	> Following prerequisites are required only in NPM installation, but they're included in CDN bundle installation.

- react, react-dom: >= v16.8.0
- styled-components: >= v5.1.0

<details>
  <summary>Prerequisites Installation (Click to show)</summary>

  - react, react-dom: `npm install --save react react-dom` or use their CDN.
  - styled-components: `npm install --save styled-components` or use their CDN.
</details>

<hr />

## Installation

### NPM

#### React Component

```bash
npm install --save react-filerobot-image-editor@beta
```

#### VanillaJS

```bash
npm install --save filerobot-image-editor@beta
```

### CDN

VanillaJS only

```js
<script src="https://scaleflex.cloudimg.io/v7/plugins/filerobot-image-editor/4.0.0-beta/filerobot-image-editor.min.js"></script>
```

> In all installation cases you must import the font family that will be used from your side as it is not included in the library by default, the default font family used is [**Roboto**](https://fonts.google.com/share?selection.family=Roboto:wght@400;500) in 2 font-weight (normal === 400 & medium === 500) which falls-back to **Arial** if not found.

> Just import the font in your HTML/JS file before loading the plugin whether it's Roboto or you have provided another fontFamily from [`theme`](#theme) property and that's all!

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
	  img="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
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
  img: 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg',
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

#### `img`

Type: `string` | `HTMLImageElement` ***Required***.

Default: `undefined`.

The image url or an `HTMLImageElement` for the image which the operations/edits will be applied on.

#### `theme`

Type: `object`

Default:

Theme from [@scaleflex/ui](https://github.com/scaleflex/ui/blob/1617f8b19ade7199110df6e2ceff77dacefd75bd/packages/ui/src/theme/entity/default-theme.ts#L43) deep merged with following overrides

```
{
  palette: {
    'bg-primary-active': '#ECF3FF',
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
}
```

Almost you would need those 2 objects ([**palette**](https://github.com/scaleflex/ui/blob/master/packages/ui/src/utils/types/palette/color.ts#L1) *values are the possible keys for palette object* & [**typograpghy**](https://github.com/scaleflex/ui/blob/master/packages/ui/src/theme/entity/default-theme.ts#L52)) to have the proper theme you want.

As the colors of the plugin are retrieved dynamically from the theme object, it gives you the possibility to customize the colors and font-family to yours.

> Note: You must import the font family from your side in 2 weights (Normal === 400, Medium === 500) to have fonts work properly and show text as expected, which means `Roboto` is not included in the plugin by default so you must import it from your side too if you have provided another font family value through theme don't forget to import it from your side too.

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

If provided will be used in overriding the default translations arrived locally with the plugin & [backend's](#usebackendtranslations) translations.

> All the translation keys could be found [here](https://github.com/scaleflex/filerobot-image-editor/blob/v4/packages/react-filerobot-image-editor/src/context/defaultTranslations.js#L1).

#### `avoidChangesNotSavedAlertOnLeave`

Type: `boolean`

Default: `false`

By default once the user makes any change/edit on the image and hasn't saved the image yet and tried to leave the page before saving then a browser's confirmation would be shown asking him if he really wants to leave before saving, `true` means it won't be shown.

#### `showBackButton`

Type: `boolean`

Default: `false`

If `true` Close button on the top right will be hidden and back button will be shown on the top left (with replacing positions of save & history buttons).

#### `defaultSavedImageName`

Type: `string`

Default: undefined

The image file name used as default name for the image's file that will be saved if not provided the name will be extracted from provided image's src.

#### `defaultSavedImageType`

Type: `string`

Default: `png`

Possible values: `'png' | 'jpeg' | 'webp'`

The default type used and selected in saving the image (the user has the possibility to change it from the saving modal).

> Note: Quality modification will be applied to `jpeg` and `webp` types in returned [`base64`](#onsave) format only while saving the image by the default behavior.

#### `forceToPngInEllipticalCrop`

Type: `boolean`

Default: `false`

If `true` then the saved image's type will always be `png` type if the user made an elliptical crop for preserving the transparency even if the user chose another extension in the saving modal, otherwise the familiar behavior (defaultSavedImageType or user's selected types) wins.

#### `closeAfterSave`

Type: `boolean`

Default: `false`

Fires [`onClose`](#onclose) callback after handling save & triggering [`onSave`](#onsave) if `true`.

#### `loadableDesignState` *Experimental*

Type: `object`

Default: `null`

If provided the plugin will load this design state at the initial load to give the possibility to get back to that design in another time and continue editing it, it accepts the same object as provided in the [`onSave`](#onsave) callback's designState parameter.

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

| Property            | Type           | Default   | Description                                             |
| ------------------- | -------------- | --------- | ------------------------------------------------------- |
| **`fill`**          | string         | '#000000' | The filled color for any added annotation               |
| **`stroke`**        | string         | '#000000' | The stroke color for any added annotation               |
| **`strokeWidth`**   | number         | 0         | The stroke width for any added annotation               |
| **`shadowOffsetX`** | number         | 0         | The horizontal/X shadow offset from its base annotation |
| **`shadowOffsetY`** | number         | 0         | The vertical/Y shadow offset from its base annotation   |
| **`shadowBlur`**    | number         | 0         | Blur value of the shadow added to the annotation        |
| **`shadowColor`**   | string         | '#000000' | The color of the shadow added to the annotation         |
| **`shadowOpacity`** | number         | 1         | Transparency/Opacity value for the shadow of annotation |
| **`opacity`**       | number (0 - 1) | 1         | Transparency/Opacity value for the whole annotation     |

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
    fontStyle: 'normal',
}
```

The options available for the text annotation tool in additon to the annotationsCommon property,

| Property            | Type                   | Default (possible values)                                  | Description                                                      |
| ------------------- | ---------------------- | ---------------------------------------------------------- | ---------------------------------------------------------------- |
| **`text`**          | string                 | 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' | The placeholder text added on adding a new text annotation       |
| **`fontFamily`**    | string                 | 'Arial'                                                    | The font family used for the text                                |
| **`fonts`**         | (strings \| objects)[] | mentioned above                                            | The fonts available to the user to choose from while adding text |
| **`fontSize`**      | number                 | 14                                                         | The default size of the text added                               |
| **`letterSpacing`** | number                 | 0                                                          | The spaces/paddings between letters of the text                  |
| **`lineHeight`**    | number                 | 1                                                          | Height of each line of the added text                            |
| **`align`**         | string                 | 'left' ('left' \| 'center' \| 'right')                     | The horizontal alignment of the added text                       |
| **`fontStyle`**     | string                 | 'normal' ('normal' \| 'bold' \| 'italic' \| 'bold italic') | The font style & weight of text added                            |

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

| Property   | Type   | Default (possible values) | Description                                   |
| ---------- | ------ | ------------------------- | --------------------------------------------- |
| **`fill`** | string | undefined                 | The color fills the image's transparent parts |

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

| Property           | Type   | Default (possible values) | Description                           |
| ------------------ | ------ | ------------------------- | ------------------------------------- |
| **`cornerRadius`** | number | 0                         | The radius of the rectangle's corners |

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

| Property    | Type   | Default (possible values) | Description                                                 |
| ----------- | ------ | ------------------------- | ----------------------------------------------------------- |
| **`sides`** | number | 3                         | Number of sides considered by default for the added polygon |

#### `Pen`

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    strokeWidth: 1,
    tension: 0.5,
    lineCap: 'round',
}
```

The available options for pen annotation tool in additon to the annotationsCommon property,

| Property      | Type   | Default (possible values)              | Description                                                                                                 |
| ------------- | ------ | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`lineCap`** | string | 'butt' ('butt' \| 'round' \| 'square') | The start & end borders line cap                                                                            |
| **`tension`** | number | 0.5                                    | Tension value of the drawn line higher value makes line more curvy & tensioned (better to leave it default) |

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

| Property      | Type   | Default (possible values)              | Description                      |
| ------------- | ------ | -------------------------------------- | -------------------------------- |
| **`lineCap`** | string | 'butt' ('butt' \| 'round' \| 'square') | The start & end borders line cap |

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

| Property            | Type   | Default (possible values)              | Description                         |
| ------------------- | ------ | -------------------------------------- | ----------------------------------- |
| **`lineCap`**       | string | 'butt' ('butt' \| 'round' \| 'square') | The border line cap                 |
| **`pointerLength`** | number | undefined                              | Length of the arrow's pointer in px |
| **`pointerWidth`**  | number | undefined                              | Width of the arrow's pointer in px  |

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

| Property      | Type     | Default (possible values) | Description                                                                                                                          |
| ------------- | -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **`gallery`** | string[] | []                        | Watermark images urls which are considered to show a list of available watermarks to be used by the user directly from watermark tab |

> Text watermark width/multi-lines are not supported in the [cloudimage](#usecloudimage) mode even if the transformation/resize frame is shown while selecting which means text watermark will always be 1 line in generated cloudimage's URL from the plugin
>
> Supported fonts for text watermark in cloudimage mode only are found [here](https://docs.cloudimage.io/go/cloudimage-documentation-v7/en/watermarking/text-watermark/watermark-fonts) you could provide them/any of them through [`Text` property](#text).

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

| Property        | Type             | Default (possible values)                                  | Description                                      |
| --------------- | ---------------- | ---------------------------------------------------------- | ------------------------------------------------ |
| **`minWidth`**  | number           | 14                                                         | Minimum width (in px) of the possible crop area  |
| **`minHeight`** | number           | 14                                                         | Minimum height (in px) of the possible crop area |
| **`maxWidth`**  | number           | null                                                       | Maximum width (in px) of the possible crop area  |
| **`maxHeight`** | number           | null                                                       | Maximum height (in px) of the possible crop area |
| **`ratio`**     | string \| number | 'original' ('original' \| 'ellipse' \| 'custom' \| number) | Default ratio of the crop area                   |
| **`noPresets`** | boolean          | false                                                      | hides the crop presets if `true`                 |

> Please note the letters-case of the above properties..

#### `useCloudimage`

Type: `boolean`

Default: `false`

If `true` the plugin will work in [`cloudimage`](https://cloudimage.io/) mode means you will receive a cloudimage's URL contains the transformations/operations on saving not the image itself and some of tabs, tools and options are not supported in this mode, otherwise the default mode is used.

> To use the Cloudimage mode, you will need a Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by registering [here](https://www.cloudimage.io/en/register_page). Once your token is created, you can configure it as described in [`cloudimage` property](#cloudimage). This token allows you to use 25GB of image cache and 25GB of worldwide CDN traffic per month for free.

#### `cloudimage`

Type: `object`

Default:
```js
{
  token: '',
  dontPrefixUrl: false,
  domain: 'cloudimg.io',
  version: '',
  secureProtocol: true,
  imageSealing: {
    enable: false,
    salt: '',
    charCount: 10,
    includeParams: [],
  }
}
```
The options available for cloudimage mode,

| Property                         | Type                                                            | Default (possible values) | Description                                                                                                                                                                                                                                                   |
| -------------------------------- | --------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`token`**                      | string ***Required if [useCloudimage](#usecloudimage) `true`*** | ''                        | The [cloudimage](https://cloudimage.io/) token                                                                                                                                                                                                                |
| **`dontPrefixUrl`**              | boolean                                                         | false                     | Don't prefix the whole URL (protocol, token & domain) to the generated cloudimage URL                                                                                                                                                                         |
| **`domain`**                     | string                                                          | cloudimg.io               | Domain used in cloudimage service                                                                                                                                                                                                                             |
| **`version`**                    | string                                                          | ''                        | The version of cloudimage service used                                                                                                                                                                                                                        |
| **`secureProtocol`**             | boolean                                                         | true                      | `true` means using (`https`) in the URL, `false` means using (`http`)                                                                                                                                                                                         |
| **`imageSealing`**               | object                                                          | mentioned above           | Assigns the options for image sealing feature (your cloudimage account must support it)                                                                                                                                                                       |
| imageSealing.**`enable`**        | boolean                                                         | true                      | `true` means using (`https`) in the URL, `false` means using (`http`)                                                                                                                                                                                         |
| imageSealing.**`salt`**          | string ***Required if imageSealing enabled***                   | ''                        | The salt string is set upon configuration and is used for the encryption                                                                                                                                                                                      |
| imageSealing.**`charCount`**     | number                                                          | 10                        | Calculated hash (URL ci_seal parameter) length                                                                                                                                                                                                                |
| imageSealing.**`includeParams`** | string[]                                                        | []                        | URL query parameters to be sealed. By default, all parameters will be sealed. you can set a list of query parameters, ex, ['wat_url'] which enables you to freely append additional transformations to the URL (the sealed parameters cannot be overwritten). |

### Callbacks

#### `onBeforeSave`

Type: `function(imageFileInfo) {}`

Default: `undefined`

This function will be fired once the user clicks save button and before triggering the default saving behavior...

> If the function returned `false` then the default saving behavior implemented in the plugin won't be triggered.
> 
> This function is doesn't work in [`cloudimage mode`](#usecloudimage) and [`onSave`](#onsave) is fired directly.

#### `onSave`

Type: `function(savedImageData, imageDesignState) {}` ***Required***

Default: `undefined`

Must be provided for avoiding plugin's error, it's used for handling the save functionality which is triggered once the user clicks on save button of the saving modal or once clicking the save button if the default behavior is prevented from [`onBeforeSave`](#onbeforesave) function.

> In `savedImageData` parameter you have 2 formats (Base64 string & Canvas HTML element) of saved image, the Canvas HTML element format doesn't support quality chosen while saving from default behavior.

#### `onClose`

Type: `function(closingReason, haveNotSavedChanges) {}`

Default: `undefined`

Triggered once the user clicks either close/cancel button or back button, if not provided then the closing button won't shown at all.

- *`closingReason`*: A string value showcases the place/reason the plugin closed.
- *`haveNotSavedChanges`*: A boolean value, true means the user has clicked the close button before saving latest changes otherwise he closed after saving.

<hr />

## Bridges

* [Vanilla JS <s>***(done)***</s>](#vanilla-javascript)
* [React <s>***(done)***</s>](#react-component)
* Angular (no ETA)
* Vue (no ETA)
* React-native (no ETA)
* Flutter (no ETA)

> Note: Currently additional docs of bridges are provided in the current page but on having more bridges docs will be moved to separate files.

<hr />

## Bridges docs

### Vanilla Javascript

In addition to the main config mentioned above which works for all bridges, the following methods are specific for this bridge only:

#### `render(additionalConfig)`

Initializes/rerenders the plugin with the possibility to provide an additional config properties to the previously provided properties to the same plugin's instance.

#### `terminate()`

Unmounts the plugin's container from the page to be removed.

<hr />

## Used By

This project is used by the following companies:

- [Scaleflex](https://scaleflex.com/)

> Fork the repoistory, append your company's name with the URL in above format inside the README.md file and make a PR!

## Feedback

Create an issue on github repo. and mention the details there.

## Contributing

All contributions are super welcome!

## License

Filerobot Image Editor is provided under [MIT License](https://opensource.org/licenses/MIT)
