<p align="center">
	<a href="https://github.com/scaleflex/filerobot-image-editor/blob/master/LICENSE">
		<img src="https://img.shields.io/npm/l/filerobot-image-editor?style=for-the-badge" alt="License (MIT)" />
	</a>
	<a href="#installation">
		<img src="https://img.shields.io/npm/v/filerobot-image-editor/latest?label=Version&style=for-the-badge&logo=npm" alt="Version" />
	</a>
	<a href="#">
		<img alt="GitHub stars" src="https://img.shields.io/github/stars/scaleflex/filerobot-image-editor?style=for-the-badge&logo=github" />
	</a>
	<a href="#installation">
		<img src="https://img.shields.io/npm/dt/filerobot-image-editor?style=for-the-badge&logo=npm" alt="Downloads"/>
	</a>
	<a href="https://www.scaleflex.com/">
		<img alt="Built with love by Scaleflex team" src="https://img.shields.io/badge/%3C%2F%3E%20w%2F%20%E2%99%A5%20by-the%20Scaleflex%20team-6986fa.svg?style=for-the-badge" />
	</a>
	<br />
	<a href="#installation">
		<img alt="Typescript types" src="https://img.shields.io/badge/types-included-blue?style=for-the-badge&logo=typescript" />
	</a>
	<a href="https://github.com/scaleflex/filerobot-image-editor/issues?q=is%3Aissue+is%3Aclosed">
		<img alt="GitHub closed issues" src="https://img.shields.io/github/issues-closed-raw/scaleflex/filerobot-image-editor?style=for-the-badge&logo=github" />
	</a>
	<a href="https://github.com/scaleflex/filerobot-image-editor/issues">
		<img alt="GitHub open issues" src="https://img.shields.io/github/issues-raw/scaleflex/filerobot-image-editor?style=for-the-badge&color=red&logo=github" />
	</a>
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
	<a href="https://scaleflex.github.io/filerobot-image-editor/">Editor Preview</a>
  •
	<a href="https://www.filerobot.com/en/home">Learn more about Filerobot</a>
  •
	<a href="https://codesandbox.io/s/holy-resonance-j0n5z">CodeSandbox</a>

</p>

# Filerobot Image Editor (FIE)

The Filerobot Image Editor is the easiest way to integrate an easy-to-use image editor in your web application. Integrated with few lines of code, your users will be able to apply basic transformations like resize, crop, flip, finetune, annotate, watermark and various filters to any image.

[![Tweet](https://img.shields.io/twitter/url/http/shields.io.svg?style=social)](https://twitter.com/intent/tweet?text=Edit,%20resize,%20and%20filter%20any%20image&url=https://scaleflex.github.io/filerobot-image-editor/&via=filerobot&hashtags=uploader,image_resizing,image_editor,image_cropping)

## Demo

<p align="center">
  <strong>
      <a href="https://scaleflex.github.io/filerobot-image-editor/">🔗 <u>DEMO/PREVIEW LINK</u></a>
  </strong>
</p>

<!-- GIF Link TO BE ADDED... -->

## Features

- 📱 Touch, Mobile & Desktop Friendly.<!-- - ⌨️ Keyboard keys mapped. -->
- ⏭️ Live Comparison (Applied Operations & original).
- ⏳ History management (Undo/Redo/Reset).
- ✂️ Image Adjustment.
- 🔂 Export current design state & load it whenever you want to continue past edits _Experimental_
- 🎨 Image Annotating & Drawing.
- 🖼️ Watermarking & positioning.
- 🪟 Image Resizing.
- 🧊 A lot of Image Filters.
- 🌉 VanillaJS + Bridged to frameworks (React & More to support...).
- 🏗️ Easy, Focused & Simple UI for better UX.
- ➕ Ability to customize.
- 🔢 Multiple annotations selections & transformation
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

> Following prerequisites are required only in React Component installation, but they're included in CDN bundle installation and added as dependencies of other bridges/adapters packages.

> All of the following libraries are required, as the plugin is depending on them in the implementation.

- react, react-dom: >= v17.0.0
- react-konva >= v17.0.1-1
- styled-components: >= v5.3.5

**Compatability table (installed version of react should meet the opposite react-konva version in the table).**

| react & react-dom versions | react-konva version       |
| -------------------------- | ------------------------- |
| v17.x.x                    | >= v17.0.1-1 <= v17.0.2-6 |
| v18.x.x                    | v18.x.x                   |

<details>
  <summary>Prerequisites Installation (Click to show)</summary>

- react, react-dom, react-konva & styled-components:
```bash
npm install --save react react-dom react-konva styled-components
```
</details>

<hr />

## Installation

### NPM

#### React component

```bash
npm install --save react-filerobot-image-editor
```

#### VanillaJS

```bash
npm install --save filerobot-image-editor react-filerobot-image-editor
```

> NOTE: if your npm version < 7 you don't need to install react-filerobot-image-editor .

### CDN

VanillaJS only

```js
// latest => last production version of the plugin, possible to replace with some earlier version (ex. 3.17.0) & if available will be requested
<script src="https://scaleflex.cloudimg.io/v7/plugins/filerobot-image-editor/latest/filerobot-image-editor.min.js"></script>
```

> IMPORTANT NOTE: In all installation cases you must import the font family that will be used from your side as it is not included in the library by default, the default font family used is [**Roboto**](https://fonts.google.com/share?selection.family=Roboto:wght@400;500) in 2 font-weight (normal === 400 & medium === 500) which fall-backs to **Arial** if not found.

> Just import the font in your HTML/JS file before loading the plugin whether it's Roboto or you have provided another fontFamily from [`theme`](#theme) property and that's all!

<hr />

## Usage/Examples

### React Example

```js
import React, { useState } from 'react';
import FilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

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
          source="https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg"
          onSave={(editedImageObject, designState) =>
            console.log('saved', editedImageObject, designState)
          }
          onClose={closeImgEditor}
          annotationsCommon={{
            fill: '#ff0000',
          }}
          Text={{ text: 'Filerobot...' }}
          Rotate={{ angle: 90, componentType: 'slider' }}
          Crop={{
            presetsItems: [
              {
                titleKey: 'classicTv',
                descriptionKey: '4:3',
                ratio: 4 / 3,
                // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
              },
              {
                titleKey: 'cinemascope',
                descriptionKey: '21:9',
                ratio: 21 / 9,
                // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
              },
            ],
            presetsFolders: [
              {
                titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
                // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
                groups: [
                  {
                    titleKey: 'facebook',
                    items: [
                      {
                        titleKey: 'profile',
                        width: 180,
                        height: 180,
                        descriptionKey: 'fbProfileSize',
                      },
                      {
                        titleKey: 'coverPhoto',
                        width: 820,
                        height: 312,
                        descriptionKey: 'fbCoverPhotoSize',
                      },
                    ],
                  },
                ],
              },
            ],
          }}
          tabsIds={[TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK]} // or {['Adjust', 'Annotate', 'Watermark']}
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
import FilerobotImageEditor from 'filerobot-image-editor'; // Load library from NPM
// or load from CDN as following and use (window.FilerobotImageEditor):
// <script src="https://scaleflex.cloudimg.io/v7/plugins/filerobot-image-editor/latest/filerobot-image-editor.min.js"></script>

const { TABS, TOOLS } = FilerobotImageEditor;
const config = {
  source: 'https://scaleflex.airstore.io/demo/stephen-walker-unsplash.jpg',
  onSave: (editedImageObject, designState) =>
    console.log('saved', editedImageObject, designState),
  annotationsCommon: {
    fill: '#ff0000',
  },
  Text: { text: 'Filerobot...' },
  Rotate: { angle: 90, componentType: 'slider' },
  translations: {
    profile: 'Profile',
    coverPhoto: 'Cover photo',
    facebook: 'Facebook',
    socialMedia: 'Social Media',
    fbProfileSize: '180x180px',
    fbCoverPhotoSize: '820x312px',
  },
  Crop: {
    presetsItems: [
      {
        titleKey: 'classicTv',
        descriptionKey: '4:3',
        ratio: 4 / 3,
        // icon: CropClassicTv, // optional, CropClassicTv is a React Function component. Possible (React Function component, string or HTML Element)
      },
      {
        titleKey: 'cinemascope',
        descriptionKey: '21:9',
        ratio: 21 / 9,
        // icon: CropCinemaScope, // optional, CropCinemaScope is a React Function component.  Possible (React Function component, string or HTML Element)
      },
    ],
    presetsFolders: [
      {
        titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
        // icon: Social, // optional, Social is a React Function component. Possible (React Function component, string or HTML Element)
        groups: [
          {
            titleKey: 'facebook',
            items: [
              {
                titleKey: 'profile',
                width: 180,
                height: 180,
                descriptionKey: 'fbProfileSize',
              },
              {
                titleKey: 'coverPhoto',
                width: 820,
                height: 312,
                descriptionKey: 'fbCoverPhotoSize',
              },
            ],
          },
        ],
      },
    ],
  },
  tabsIds: [TABS.ADJUST, TABS.ANNOTATE, TABS.WATERMARK], // or ['Adjust', 'Annotate', 'Watermark']
  defaultTabId: TABS.ANNOTATE, // or 'Annotate'
  defaultToolId: TOOLS.TEXT, // or 'Text'
};

// Assuming we have a div with id="editor_container"
const filerobotImageEditor = new FilerobotImageEditor(
  document.querySelector('#editor_container'),
  config,
);

filerobotImageEditor.render({
  onClose: (closingReason) => {
    console.log('Closing reason', closingReason);
    filerobotImageEditor.terminate();
  },
});
```

> NOTE: if you are importing the library from CDN then you could access it using `window.FilerobotImageEditor` and access both `TABS & TOOLS` from `window.FilerobotImageEditor.TABS` & `window.FilerobotImageEditor.TOOLS`, see [`tabsIds`](#tabsids).

<hr />

## Config

> NOTE: The plugin respects the container/wrapper HTML element through CSS by having both `width` & `height` set `100%` so you could change the width/height of the plugin through adding/changing width/height of the wrapper HTML element.

### Properties

#### `source`

<u>Type:</u> `string` | `HTMLImageElement` **_Required_**.

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `undefined`.

The image url or an `HTMLImageElement` for the image which the operations/edits will be applied on.

#### `theme`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

Theme from [@scaleflex/ui](https://github.com/scaleflex/ui/blob/1617f8b19ade7199110df6e2ceff77dacefd75bd/packages/ui/src/theme/entity/default-theme.ts#L43) deep merged with following overrides

```
// Overrides
{
  palette: {
    'bg-primary-active': '#ECF3FF',
  },
  typography: {
    fontFamily: 'Roboto, Arial',
  },
}

// Used properties in case you need to provide your custom colors/theme, you should customize those properties (all or any of them) with your color hex/name string values.
{
  palette: {
    'bg-secondary': '....',
    'bg-primary': : '....',
    'bg-primary-active': : '....',
    'accent-primary': : '....',
    'accent-primary-active': : '....',
    'icons-primary': : '....',
    'icons-secondary': : '....',
    'borders-secondary': : '....',
    'borders-primary': : '....',
    'borders-strong': : '....',
    'light-shadow': : '....',
    'warning': : '....',

  },
  typography: {
    fontFamily: : '....', // Font family string value, you should import this font in your app.
  },
}
```

Almost you would need those 2 objects ([**palette**](https://github.com/scaleflex/ui/blob/master/packages/ui/src/utils/types/palette/color.ts#L1) _values are the possible keys for palette object_ & [**typograpghy**](https://github.com/scaleflex/ui/blob/master/packages/ui/src/theme/entity/default-theme.ts#L52)) to have the proper theme you want.

As the colors of the plugin are retrieved dynamically from the theme object, it gives you the possibility to customize the colors and font-family to yours.

> NOTE: You must import the font family from your side in 2 weights (Normal === 400, Medium === 500) to have fonts work properly and show text as expected, which means `Roboto` is not included in the plugin by default so you must import it from your side too if you have provided another font family value through theme don't forget to import it from your side too.

#### `tabsIds`

<u>Type:</u> `string[]`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `[]`

the tabs will be shown to the user, if empty array provided or left by default all tabs will be used otherwise the provided tabs ids would be shown.

Access the available Tabs ids & tools ids through anyway of the following

```js
// Accessing from the CDN bundle
const { TABS, TOOLS } = window.FilerobotImageEditor;

// Accessing from React Function component lib. NPM
import ReactFilerobotImageEditor, {
  TABS,
  TOOLS,
} from 'react-filerobot-image-editor';

// Access from VanillaJS lib. NPM
import VanillaFilerobotImageEditor from 'filerobot-image-editor';
const { TABS, TOOLS } = VanillaFilerobotImageEditor;
```

#### `defaultTabId`

<u>Type:</u> `string`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `Adjust`

The default opened tab once the user opens the plugin.

#### `defaultToolId`

<u>Type:</u> `string`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> first tool of the default opened tab.

The default opened tool once the user opens the plugin, and must be one of the tools related to the opened tab.

#### `useBackendTranslations`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `true`

A backend service that hosts the translations of the plugin to be able to change the translations without making a new build once the translations changed, and gives the chance to support more languages too, if `true` the service would be used and the next [`language`](#language) property used in determining which language to show, `false` means avoid using this service in that case default translations and provided [`translations`](#translations) property will be used.

#### `language`

<u>Type:</u> `string`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `en`

The 2 letters shorthand used for the language/translations, would be used in case [`useBackendTranslations`](#usebackendtranslations) is `true`.

#### `translations`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `null`

If provided will be used in overriding the default translations arrived locally with the plugin & [backend's](#usebackendtranslations) translations.

> All the translation keys could be found [here](https://github.com/scaleflex/filerobot-image-editor/blob/master/packages/react-filerobot-image-editor/src/context/defaultTranslations.js#L1).

#### `avoidChangesNotSavedAlertOnLeave`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

By default once the user makes any change/edit on the image and hasn't saved the image yet and tried to leave the page before saving then a browser's confirmation would be shown asking him if he really wants to leave before saving, `true` means it won't be shown.

#### `showBackButton`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

If `true` Close button on the top right will be hidden and back button will be shown on the top left (with replacing positions of save & history buttons).

#### `defaultSavedImageName`

<u>Type:</u> `string`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> undefined

The image file name used as default name for the image's file that will be saved if not provided the name will be extracted from provided image's src.

#### `defaultSavedImageType`

<u>Type:</u> `string`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `png`

Possible values: `'png' | 'jpeg' | 'jpg' | 'webp'`

The default type used and selected in saving the image (the user has the possibility to change it from the saving modal).

> NOTE: Quality modification will be applied to `jpeg`, `jpg` and `webp` types in returned [`base64`](#onsave) format only while saving the image by the default behavior.

#### `defaultSavedImageQuality`

<u>Type:</u> `number`

<u>Supported version:</u> +v4.4.0

<u>Default:</u> `0.92`

Possible values: `[0.1 - 1]`

The default value used for quality property used in the final saving of the canvas. the higher value used (Min: 0.1, Max: 1) the higher generated image's resolution the higher generated image file's size and vice-versa.

> NOTE: Quality modification will be applied to `jpeg`, `jpg` and `webp` types in returned [`base64`](#onsave) format only.

> NOTE: The value of this property will reflect the quality option found in the default save behavior's UI (if default save behavior used otherwise UI only is not affected).

#### `forceToPngInEllipticalCrop`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

If `true` then the saved image's type will always be `png` type if the user made an elliptical crop for preserving the transparency even if the user chose another extension in the saving modal, otherwise the familiar behavior (defaultSavedImageType or user's selected types) wins.

#### `closeAfterSave`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

Fires [`onClose`](#onclose) callback after handling save & triggering [`onSave`](#onsave) if `true`.

#### `loadableDesignState`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `null`

If provided the plugin will load this design state at the initial load to give the possibility to get back to that design in another time and continue editing it, it accepts the same object as provided in the [`onSave`](#onsave) callback's designState parameter.

#### `annotationsCommon`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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
    onFontChange: (newFontFamily, reRenderCanvasFn) => undefined,
}
```

The options available for the text annotation tool in additon to the annotationsCommon property,

| Property            | Type                   | Default (possible values)                                  | Description                                                                                                                                                                                                                                                                                               |
| ------------------- | ---------------------- | ---------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`text`**          | string                 | 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' | The placeholder text added on adding a new text annotation                                                                                                                                                                                                                                                |
| **`fontFamily`**    | string                 | 'Arial'                                                    | The font family used for the text                                                                                                                                                                                                                                                                         |
| **`fonts`**         | (strings \| objects)[] | mentioned above                                            | The fonts available to the user to choose from while adding text                                                                                                                                                                                                                                          |
| **`fontSize`**      | number                 | 14                                                         | The default size of the text added                                                                                                                                                                                                                                                                        |
| **`letterSpacing`** | number                 | 0                                                          | The spaces/paddings between letters of the text                                                                                                                                                                                                                                                           |
| **`lineHeight`**    | number                 | 1                                                          | Height of each line of the added text                                                                                                                                                                                                                                                                     |
| **`align`**         | string                 | 'left' ('left' \| 'center' \| 'right')                     | The horizontal alignment of the added text                                                                                                                                                                                                                                                                |
| **`fontStyle`**     | string                 | 'normal' ('normal' \| 'bold' \| 'italic' \| 'bold italic') | The font style & weight of text added                                                                                                                                                                                                                                                                     |
| **`onFontChange`**  | function               | `(newFontFamily, reRenderCanvasFn) => undefined`           | A callback method called on changing the font family (almost will be needed in lazy loading/importing the chosen font family incase you don't want to load all the fonts before user's choice and you have to call `reRenderCanvasFn` after loading the font for rendering the text with the chosen font) |

> If you are lazy loading the font then you must re-render the canvas manually after the font is loaded (if the font wasn't loaded and user changed the font then font won't be applied) you could call the 2nd paramter (`reRenderCanvasFn`) inside the `onFontChange` function to re-render the canvas manually whenever you want.

> Fonts must be loaded from your side in implementation to take effect as it is not guaranteed that the user has the font on his OS.

#### `Image`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

```js
{
    ...annotationsCommon,
    fill: undefined,
    disableUpload: false,
    gallery: [{
      originalUrl: '...', // The url of the image in original size to be added in canvas
      previewUrl: '...', // The url of the image to be used as preview in gallery list (for less data consuming & better performance).
    }]
}
```

The options available for image annotation tool in additon to the annotationsCommon property,

| Property            | Type                                            | Default (possible values) | Description                                                                                                                                                                                                                                               |
| ------------------- | ----------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`fill`**          | string                                          | undefined                 | The color fills the image's transparent parts                                                                                                                                                                                                             |
| **`disableUpload`** | boolean                                         | false                     | If `true` Disables the possibility to upload/add image from local device (user's computer)                                                                                                                                                                |
| **`gallery`**       | ({ originalUrl: string, previewUrl: string })[] | []                        | Custom images that the user will choose from, to add on the canvas, `originalUrl` is the url for the original size for an image `previewUrl` is the preview url for the same image (considers as thumbnail for better performance & less data consuming). |

#### `Rect`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `annotationsCommon`

No specific options available for ellipse only the annotationsCommon are used for ellipse and you could override any of them for ellipse only by passing them here.

#### `Polygon`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

```js
{
    ...annotationsCommon,
    strokeWidth: 1,
    tension: 0.5,
    lineCap: 'round',
    selectAnnotationAfterDrawing: true,
}
```

The available options for pen annotation tool in additon to the annotationsCommon property,

| Property                           | Type    | Default (possible values)              | Description                                                                                                 |
| ---------------------------------- | ------- | -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`lineCap`**                      | string  | 'butt' ('butt' \| 'round' \| 'square') | The start & end borders line cap                                                                            |
| **`tension`**                      | number  | 0.5                                    | Tension value of the drawn line higher value makes line more curvy & tensioned (better to leave it default) |
| **`selectAnnotationAfterDrawing`** | boolean | true                                   | Auto selection after drawing                                                                                |

#### `Line`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

```js
{
    ...(config[TOOLS.TEXT || TOOLS.IMAGE]), // depends on the added watermark type the config will be used
    gallery: [],
    textScalingRatio: 0.33,
    imageScalingRatio: 0.33,
    hideTextWatermark: false,
    onUploadWatermarkImgClick: () => {},
}
```

The available options for watermark tool, the watermark is using the options of text and image annotation tools mentioned above depending on the watermark chosen,

| Property                        | Type                                                                                      | Default (possible values)              | Description                                                                                                                                                                                                                                                                                                                                    |
| ------------------------------- | ----------------------------------------------------------------------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`gallery`**                   | (string                                                                                   | { url: string, previewUrl: string })[] | []                                                                                                                                                                                                                                                                                                                                             | Watermark images urls which are considered to show a list of available watermarks to be used by the user directly from watermark tab |
| **`textScalingRatio`**          | number                                                                                    | 0.33                                   | Ratio for text scaling                                                                                                                                                                                                                                                                                                                         |
| **`imageScalingRatio`**         | number                                                                                    | 0.33                                   | Ratio for image scaling                                                                                                                                                                                                                                                                                                                        |
| **`hideTextWatermark`**         | boolean                                                                                   | false                                  | Used for hiding the possibility to add a text watermark                                                                                                                                                                                                                                                                                        |
| **`onUploadWatermarkImgClick`** | (loadAndSetWatermarkImgFn) => Promise<{ url: string, revokeObjectUrl?: boolean }> \| void | undefined                              | A callback function triggered on clicking add image watermark button, returns a promise with an object contains `url` property that has the watermark image url to be added or you could use from your side the provided callback fn. as argument, `revokeObjectUrl` property is used in revoking the provided URL in-case it is an object url |

> Text watermark width/multi-lines are not supported in the [cloudimage](#usecloudimage) mode even if the transformation/resize frame is shown while selecting which means text watermark will always be 1 line in generated cloudimage's URL from the plugin
>
> Supported fonts for text watermark in cloudimage mode only are found [here](https://docs.cloudimage.io/go/cloudimage-documentation-v7/en/watermarking/text-watermark/watermark-fonts) you could provide them/any of them through [`Text` property](#text).

#### `Rotate`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.3.2

<u>Default:</u>

```js
{
    angle: 90,
    componentType: 'slider',
}
```

The available options for crop tool,

| Property            | Type   | Default (possible values) | Description                          |
| ------------------- | ------ | ------------------------- | ------------------------------------ |
| **`angle`**         | number | 90                        | angle of rotation                    |
| **`componentType`** | number | ('slider' \| 'buttons')   | Component used for changing rotation |

#### `Crop`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

```js
{
    minWidth: 14,
    minHeight: 14,
    maxWidth: null,
    maxHeight: null,
    ratio: 'original',
    ratioTitleKey: 'original',
    noPresets: false,
    autoResize: false,
    presetsItems: [],
    presetsFolders: [],
    lockCropAreaAt: null, // 'top-left'
}
```

The available options for crop tool,

| Property             | Type                                                       | Default (possible values)                                  | Description                                                                                                                                                                                                                         |
| -------------------- | ---------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`minWidth`**       | number                                                     | 14                                                         | Minimum width (in px) of the possible crop area                                                                                                                                                                                     |
| **`minHeight`**      | number                                                     | 14                                                         | Minimum height (in px) of the possible crop area                                                                                                                                                                                    |
| **`maxWidth`**       | number                                                     | null                                                       | Maximum width (in px) of the possible crop area                                                                                                                                                                                     |
| **`maxHeight`**      | number                                                     | null                                                       | Maximum height (in px) of the possible crop area                                                                                                                                                                                    |
| **`ratio`**          | string \| number                                           | 'original' ('original' \| 'ellipse' \| 'custom' \| number) | Default ratio of the crop area                                                                                                                                                                                                      |
| **`ratioTitleKey`**  | string                                                     | same as provided/default crop's `ratio`                    | The title's translation key of the crop's ratio selected that will be shown initially besides the crop's tool icon                                                                                                                  |
| **`noPresets`**      | boolean                                                    | false                                                      | hides the crop presets if `true`                                                                                                                                                                                                    |
| **`autoResize`**     | boolean                                                    | false                                                      | if `true` and the chosen crop preset item has both width & height then the original image will be croped and then apply resizing for the cropped image with the width & height, otherwise cropping without resizing will be applied |
| **`presetsItems`**   | array of [`CropPresetItem`](#croppresetitem)               | []                                                         | Crop presets items to extend with the default ones provided in the plugin, will be shown in the first menu of the crop presets                                                                                                      |
| **`presetsFolders`** | array of [`CropPresetFolder`](#croppresetfolder)           | []                                                         | Crop presets folder to be shown as item with sublist on hovering opens another list with the provided crop presets groups that contains different crop items                                                                        |
| **`presetsItems`**   | array of [`CropPresetItem`](#croppresetitem)               | []                                                         | Crop presets items to extend with the default ones provided in the plugin, will be shown in the first menu of the crop presets                                                                                                      |
| **`lockCropAreaAt`** | string of `y-x` => `top/center/bottom`-`left/center/right` | null                                                       | Defines a fixed position for the crop area, and locks it (no user operations will be allowed)                                                                                                                                       |

##### **CropPresetFolder**:

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

| Property       | Type                                               | Default (possible values) | Description                                                                                                                                                                                 |
| -------------- | -------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`titleKey`** | string **_Required_**                              | ''                        | Translation key for the title of the preset folder (the translation must be existed in [`translations`](#translations) object if the backend's translations don't include that translation) |
| **`groups`**   | array of [`CropPresetGroup`](#croppresetgroup)     | undefined                 | The crop preset groups shown inside the sublist as breadcrumbs for the user and giving him the possibility to choose a crop preset item                                                     |
| **`icon`**     | HTML Element \| string \| React Function component | undefined                 | An icon prefixed to the crop preset folder's title                                                                                                                                          |

##### **CropPresetGroup**:

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

| Property       | Type                                         | Default (possible values) | Description                                                                                                                                                                                |
| -------------- | -------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`titleKey`** | string **_Required_**                        | ''                        | Translation key for the title of the preset group (the translation must be existed in [`translations`](#translations) object if the backend's translations don't include that translation) |
| **`items`**    | array of [`CropPresetItem`](#croppresetitem) | undefined                 | The crop preset items shown inside the group's breadcrumb which let the user choose from                                                                                                   |

##### **CropPresetItem**:

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

| Property                  | Type                                                    | Default (possible values)                          | Description                                                                                                                                                                               |
| ------------------------- | ------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`titleKey`**            | string **_Required_**                                   | ''                                                 | Translation key for the title of the preset item (the translation must be existed in [`translations`](#translations) object if the backend's translations don't include that translation) |
| **`descriptionKey`**      | string                                                  | ''                                                 | The Translation key of crop preset item's description label shown besides the title key for more descriptive preset (almost usedi n showing the preset item's ratio/size)                 |
| **`ratio`**               | string **_Required if no `width` & `height` provided_** | '' ('original' \| 'ellipse' \| 'custom' \| number) | The preset item's ratio used in cropping                                                                                                                                                  |
| **`width`**               | number **_Required if no `ratio` provided_**            | undefined                                          | The width of crop preset item used in tandem with height for calculating the proper preset item's ratio (`ratio = width / height`)                                                        |
| **`height`**              | number **_Required if no `ratio` provided_**            | undefined                                          | The height of crop preset item used in tandem with width for calculating the proper preset item's ratio (`ratio = width / height`)                                                        |
| **`icon`**                | HTML Element \| string \| React Function component      | undefined                                          | An icon prefixed to the crop preset item's title                                                                                                                                          |
| **`disableManualResize`** | boolean                                                 | false                                              | If `true` the resize inputs will be disabled if the user selected this crop preset item and `autoResize` must be `true` otherwise it won't affect                                         |
| **`noEffect`**            | boolean                                                 | false                                              | If `true` A warning text will be shown on the canvas in crop tab only and the crop won't affect the image it's just added as a selected option and handle should be done from your side   |

> NOTE: `titleKey` of each object must be unique between the other objects in the same array.

Example,

```js
{
  autoResize: true,
  presetsItems: [
    {
      titleKey: 'classicTv',
      descriptionKey: '4:3',
      ratio: 4 / 3,
      icon: CropClassicTv,
    },
    {
      titleKey: 'cinemascope',
      descriptionKey: '21:9',
      ratio: 21 / 9,
      icon: CropCinemaScope, // optional
    },
  ],
  presetsFolders: [
    {
      titleKey: 'socialMedia', // will be translated into Social Media as backend contains this translation key
      icon: Social, // React Function component, string or HTML Element
      groups: [
        {
          titleKey: 'facebook',
          items: [
            {
              titleKey: 'profile',
              width: 180,
              height: 180,
              descriptionKey: 'fbProfilePhotoSize',
            },
            {
              titleKey: 'coverPhoto',
              width: 820,
              height: 312,
              descriptionKey: 'fbCoverPhotoSize',
            },
          ],
        },
      ],
    },
  ],
}
```

> Please note the letters-case of the above properties..

#### `useCloudimage`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

If `true` the plugin will work in [`cloudimage`](https://cloudimage.io/) mode means you will receive a cloudimage's URL contains the transformations/operations on saving not the image itself and some of tabs, tools and options are not supported in this mode, otherwise the default mode is used.

> To use the Cloudimage mode, you will need a Cloudimage token to deliver your images over CDN. Don't worry, it only takes seconds to get one by registering [here](https://www.cloudimage.io/en/register_page). Once your token is created, you can configure it as described in [`cloudimage` property](#cloudimage). This token allows you to use 25GB of image cache and 25GB of worldwide CDN traffic per month for free.

#### `cloudimage`

<u>Type:</u> `object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u>

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

| Property                         | Type                                          | Default (possible values) | Description                                                                                                                                                                                                                                                   |
| -------------------------------- | --------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`token`**                      | string                                        | ''                        | The [cloudimage](https://cloudimage.io/) token                                                                                                                                                                                                                |
| **`dontPrefixUrl`**              | boolean                                       | false                     | Don't prefix the whole URL (protocol, token & domain) to the generated cloudimage URL                                                                                                                                                                         |
| **`domain`**                     | string                                        | cloudimg.io               | Domain used in cloudimage service                                                                                                                                                                                                                             |
| **`version`**                    | string                                        | ''                        | The version of cloudimage service used                                                                                                                                                                                                                        |
| **`secureProtocol`**             | boolean                                       | true                      | `true` means using (`https`) in the URL, `false` means using (`http`)                                                                                                                                                                                         |
| **`loadableQuery`**              | string                                        | ''                        | A cloudimage string query params to load in the plugin's design state and continue editing on previous edits (ex, `w=500&h=300&blur=5`), you could use it in addition to [`loadableDesignState`](#loadabledesignstate-experimental)                           |
| **`imageSealing`**               | object                                        | mentioned above           | Assigns the options for image sealing feature (your cloudimage account must support it)                                                                                                                                                                       |
| imageSealing.**`enable`**        | boolean                                       | true                      | `true` means using (`https`) in the URL, `false` means using (`http`)                                                                                                                                                                                         |
| imageSealing.**`salt`**          | string **_Required if imageSealing enabled_** | ''                        | The salt string is set upon configuration and is used for the encryption                                                                                                                                                                                      |
| imageSealing.**`charCount`**     | number                                        | 10                        | Calculated hash (URL ci_seal parameter) length                                                                                                                                                                                                                |
| imageSealing.**`includeParams`** | string[]                                      | []                        | URL query parameters to be sealed. By default, all parameters will be sealed. you can set a list of query parameters, ex, ['wat_url'] which enables you to freely append additional transformations to the URL (the sealed parameters cannot be overwritten). |

#### `savingPixelRatio`

<u>Type:</u> `number`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `4`

The pixel ratio used in saving the image (higher the ratio, higher the resolution of the saved image till reaching the possible max. resolution for the image, higher the memory used & processing time of saving).

> High pixel ratio might cause some device crashes/slowness or showing stack error in some browsers while saving so consider choosing an appropriate ratio for your use case.

#### `previewPixelRatio`

<u>Type:</u> `number`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `window.devicePixelRatio`

The pixel ratio used in previewing the image while doing the operations (higher the ratio, higher the resolution of the drawn/previewed image in the plugin till reaching the possible max. resolution for the image, higher the processing time of drawing the image & more memory used).

> High pixel ratio might cause some device crashes/slowness while drawing/previewing and doing operations so consider choosing an appropriate ratio for your use case.

#### `moreSaveOptions`

<u>Type:</u> `array of objects`

<u>Supported version:</u> +v4.0.0

<u>default:</u> `[]`

Used in case you want to show more saving options to the user besides the current save button as overlay menu opened through arrow next to save button.

If left provided `[]` or left default value the arrow button that would open the menu will be hidden, otherwise it'll be shown

Option's object to be provided,

| Property      | Type                                                    | Default (possible values) | Description                                                                                                                                                                                                                                                                                                           |
| ------------- | ------------------------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`label`**   | string **_Required_**                                   | ''                        | The option's label will be shown to the user                                                                                                                                                                                                                                                                          |
| **`onClick`** | function (triggerSaveModal, triggerSave) **_Required_** | `undefined`               | The function will be triggered on clicking the option, it receives 2 parameters 1st is a function calls the saving modal, 2nd is a function calls saving directly and both of those functions accepts (1 argument as a callback function that's same as [`onSave function`](#onsave) called after the saving process) |
| **`icon`**    | HTML Element \| string \| React Function component      | `null`                    | The option's icon will be shown before the label                                                                                                                                                                                                                                                                      |

> NOTE: you must provide an [`onSave`](#onsave) callback function on using any of the passed functions to the option's onClick function.
> example,

```js
[
  {
    label: 'Save as new version',
    onClick: (triggerSaveModal, triggerSave) =>
      triggerSaveModal((...args) => {
        console.log('saved', args);
      }), // Required to pass the callback function
    icon: '<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">...</svg>', // HTML Element as string
  },
  {
    label: 'Save as new file',
    onClick: (triggerSaveModal, triggerSave) =>
      triggerSave((...args) => {
        console.log('saved', args);
      }), // Required to pass the callback function
    icon: () => (
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        ...
      </svg>
    ), // React Function component
  },
];
```

#### `observePluginContainerSize`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

By default the plugin's root HTML Element is set with `100%` for both `height` & `width` to respect the plugin's container HTML element size using CSS, If provided `true` to this property then that root element will always be the same absolute `width` & `height` values of the plugin's container HTML Element through JS observable not CSS.

> NOTE: This property might be useful in some cases (one of them if you leave height of the container element to `auto` or didn't set it) in those cases the root element will be the same current size values of the container by JS.

#### `showCanvasOnly`

<u>Type:</u> `boolean`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `false`

Hides all the UI of the plugin including (save & close buttons, tabs & tools bars...etc.) except the canvas only if `true`, otherwise the whole UI will be shown as normal.

> This prop might be useful if are using the editor in different ways in the same project, (ex. using the editor in doing different transformations for quick photo editing & using the editor after uploading some profile photo to crop the photo only and dismiss other transformations).

#### `getCurrentImgDataFnRef`

<u>Type:</u> `React Ref | Object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> undefined

If provided the canvas processing/saving/manipulating function will be assigned as `.current` property to this passed `Object | React Ref` to be used/called somewhere else other than the default save button and returns both the final transformed image data object & current design state which are same as params as [`onSave callback`](#onsave),

The passed object/ref becomes with the following syntax after assigning internally

```js
{
  current: (
    imageFileInfo = {},
    pixelRatio = false,
    keepLoadingSpinnerShown = false,
  ) => ({
    imageData, // An object has the current image data & info
    designState, // An object contains the current design state of the image's editor
    hideLoadingSpinner, // A function hides the loading spinner on calling if not already hidden (useful in case you have provided `keepLoadingSpinnerShown` param with `true` and wants to hide the spinner after finishing some operation from ur side)
  });
}
```

The function has the following params:

- _`imageFIleInfo`_: An object, defines the info of the file to be considered while saving, and contains the following properties:
  ```js
  {
    name,
    extension,
    quality, // applied in JPEG/JPG/WEBP formats only
    size: { // used in resizing
      width, height
    },
  }
  ```
- _`pixelRatio`_: A `number`, that defines the pixel ratio used in transforming/saving the image (higher the ratio, higher the resolution of the saved image till reaching the possible max. resolution for the image, higher the memory used & processing time of saving/transforming).

> NOTE: Calling the assigned function will be UI blocker so take care where & when you are calling the function.

#### `updateStateFnRef`

<u>Type:</u> `React Ref | Object`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> undefined

Assigns the update state main function of the plugin inside `.current` property of the passed object/ref to be used in changing the main state of the application, the function has 1 paramter that could be either (`function | object`) the function receives the current state object as argument. The object is the new state part, in both types not required to return/pass the whole state object as it gets deep merged with the current state.

> NOTE: Be-aware while using this function as it might cause an un-expected behavior and we don't recommend to use it unless you know what you are doing.

#### `useZoomPresetsMenu`

<u>Type:</u> `Boolean`

<u>Supported version:</u> +v4.1.0

<u>Default:</u> true

On clicking on the zoom percentage and having this property set `true` some zoom presets percentages will be shown for the user to quickly choose some zoom percentage, if set to `false` the zoom presets won't be shown and only `fit percentage` will be used as default.

Note: If [`disableZooming`](#disablezooming) property is `true` then this property won't have any effect.

#### `disableZooming`

<u>Type:</u> `Boolean`

<u>Supported version:</u> +v4.2.0

<u>Default:</u> false

If `true`, there will be no zooming functionality available in the plugin & UI related to zooming will be removed.

#### `noCrossOrigin`

<u>Type:</u> `Boolean`

<u>Supported version:</u> +v4.5.0

<u>Default:</u> false

If `true`, `crossOrigin=Anonymous` property with its value won't be used in the original image (image to be edited) loading request -- not recommended --.

> Disabling the usage of crossOrigin might cause some issues with applying filters or saving the image so it is not recommended to provide it `true` unless you know what you are doing.

> If u face strange behavior with CORS on chromium based browser, please check this issue [#319](https://github.com/scaleflex/filerobot-image-editor/issues/319) might be useful for you.

#### `disableSaveIfNoChanges`

<u>Type:</u> `Boolean`

<u>Supported version:</u> +v4.6.0

<u>Default:</u> false

If `true`, the save button will be disabled till the user does a change on the image, otherwise on loading the editor without having any user's functionality then it will be disabled and user won't be able to save.

> Disabling the usage of crossOrigin might cause some issues with applying filters or saving the image so it is not recommended to provide it `true` unless you know what you are doing.

> If u face strange behavior with CORS on chromium based browser, please check this issue [#319](https://github.com/scaleflex/filerobot-image-editor/issues/319) might be useful for you.

#### `removeSaveButton`

<u>Type:</u> `Boolean`

<u>Supported version:</u> +v4.7.1

<u>Default:</u> false

If `true`, the save button get removed from the editor.

#### `resetOnImageSourceChange`

<u>Type:</u> `Boolean`

<u>Supported version:</u> +v4.8.0

<u>Default:</u> false

If `true`, the editor will reset its design state & saved data on providing a new original image [source](#source).

#### `backgroundColor`

<u>Type:</u> `String`

<u>Supported version:</u> +vx.x.x

<u>Default:</u> undefined

The color used as background for the canvas while the image is being edited and won't be considered in the final saved image.

#### `backgroundImage`

<u>Type:</u> `HTMLImageElement`

<u>Supported version:</u> +vx.x.x

<u>Default:</u> undefined

An image that will be shown as background image of the canvas and will be repeated (x & y) and it will be disregarded on saving.

> Note: if provided both `backgroundImage` & `backgroundColor`, the priority will be for `backgroundColor`.

### Callbacks

#### `onBeforeSave`

<u>Type:</u> `function(imageFileInfo) {}`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `undefined`

This function will be fired once the user clicks save button and before triggering the default saving behavior...

> If the function returned `false` then the default saving behavior implemented in the plugin won't be triggered.

> This function doesn't work in ([`cloudimage mode`](#usecloudimage) & [`moreSaveOptions`](#moresaveoptions)) and the [`onSave`](#onsave) is fired directly.

#### `onSave`

<u>Type:</u> `function(imageData, imageDesignState) {}`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `undefined`

it's used for handling the save functionality which is triggered once the user clicks on save button of the saving modal or once clicking the save button if the default behavior is prevented from [`onBeforeSave`](#onbeforesave) function, If you need to keep showing the loading spinner (shown on start saving) till you finish some functionality/operation from your project's side (ex. async uploading file to your server) then you must return a `Promise` otherwise returning nothing/void is fine.

> In `imageData` parameter you have 2 formats (Base64 string & Canvas HTML element) of saved image, the Canvas HTML element format doesn't support quality chosen while saving from default behavior.

#### `onModify`

<u>Type:</u> `function(currentImageDesignState)`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `undefined`

Called after any operation/transformation is applied on the image (ex. Add/change filter, resize the image...etc.).

- _`currentImageDesignState`_: An object contains the latest design state of the current state of the plugin.

> NOTE: This callback might be triggered multiple times at changing some properties related to same operation/functionality so please make sure you have checked when it's called to understand the behavior you'll have.

#### `onClose`

<u>Type:</u> `function(closingReason, haveNotSavedChanges) {}`

<u>Supported version:</u> +v4.0.0

<u>Default:</u> `undefined`

Triggered once the user clicks either close/cancel button or back button, if not provided then the closing button won't shown at all.

- _`closingReason`_: A string value showcases the place/reason the plugin closed.
- _`haveNotSavedChanges`_: A boolean value, true means the user has clicked the close button before saving latest changes otherwise he closed after saving.

<hr />

## Bridges

- [Vanilla JS <s>**_(done)_**</s>](#vanilla-javascript)
- [React <s>**_(done)_**</s>](#react-component)
- Angular (no ETA)
- Vue (no ETA)
- React-native (no ETA)
- Flutter (no ETA)

> NOTE: Currently additional docs of bridges are provided in the current page but on having more bridges docs will be moved to separate files.

<hr />

## Bridges docs

### Vanilla Javascript

In addition to the main config mentioned above which works for all bridges, the following methods are specific for this bridge only:

#### `render`

<u>Type:</u> `function render (additionalConfig)`

<u>Supported version:</u> +v4.0.0

Initializes/rerenders the plugin with the possibility to provide an additional config properties to the previously provided properties to the same plugin's instance.

#### `terminate`

<u>Type:</u> `function terminate ()`

<u>Supported version:</u> +v4.0.0

Unmounts the plugin's container from the page to be removed.

#### `getCurrentImgData`

<u>Type:</u> `function getCurrentImgData (imageFileInfo, pixelRatio, keepLoadingSpinnerShown)`

<u>Supported version:</u> +v4.0.0

Calling the function will trigger the function responsible for handling/manipulating the current image operations and have the possible final results of the current image data besides the current design state, it's the bridge for the function mentioned here [`getCurrentImgDataFnRef`](#getcurrentimgdatafnref).

<hr />

## Used By

This project is used by the following companies:

- [Scaleflex](https://scaleflex.com/)
- [Fast Image Resize](https://benkaiser.github.io/fast-image-resizer/)

> Fork the repoistory, append your company's name with the URL in above format inside the README.md file and make a PR! or create a GitHub issue mentioning (Site's name & domain).

## Feedback

Create an issue on github repo. and mention the details there.

## Contributing

All contributions are super welcomed!

## License

Filerobot Image Editor is provided under [MIT License](https://opensource.org/licenses/MIT)
