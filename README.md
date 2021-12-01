[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
[![GPLv3 License](https://img.shields.io/badge/License-GPL%20v3-yellow.svg)](https://opensource.org/licenses/)
[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)


![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)

# Filerobot Image Editor (FIE)

The Filerobot Image Editor is the easiest way to integrate an easy-to-use image editor in your web application. Integrated with few lines of code, your users will be able to apply basic transformations like resize, crop, flip, finetune, annotate, watermark and various filters to any image.


## Demo

Insert gif or link to demo


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Installation

Install my-project with npm

```bash
  npm install my-project
  cd my-project
```

## Usage/Examples

```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```


## Config

#### image

Type: `string` | `HTMLImageElement` ***Required***.

Default: `undefined`.

The image url or an `HTMLImageElement` which the operations will be applied on.

#### tabsIds

Type: `string[]`

Default: `[]`

the tabs will be shown to the user, if empty array provided or left by default all tabs will be used otherwise the provided tabs ids would be shown.

#### defaultTabId

Type: `string`

Default: `TABS_IDS.ADJUST`

The default opened tab once the user opens the plugin.

#### defaultToolId

Type: `string`

Default: first tool of the default opened tab.

The default opened tool once the user opens the plugin, and must be one of the tools related to the opened tab.

#### useBackendTranslations

Type: `boolean`

Default: `true`

A backend service that hosts the translations of the plugin to be able to change the translations without making a new build once the translations changed, and gives the change to support more languages too, if `true` the service would be used and the next --LINK--`language` property used in determining which language to show, `false` means avoid using this service in that case default translations and provided --LINK--`translations` property will be used.

#### language

Type: `string`

Default: `en`

The 2 letters shorthand used for the language/translations, would be used in case --LINK--`useBackendTranslations` is `true`.

#### translations

Type: `object`

Default: `null`

If provided will be used in overriding the default translations arrived locally with the plugin but it will **NOT** override the backend's translations if --LINK--`useBackendTranslations`.

#### avoidChangesNotSavedAlertOnLeave

Type: `boolean`

Default: `false`

By default once the user makes any change/edit on the image and hasn't saved the image yet and tried to leave the page before saving then a browser's confirmation would be shown asking him if he really wants to leave before saving, `true` means it won't be shown.

#### showBackButton

Type: `boolean`

Default: `false`

If `true` Close button on the top right will be hidden and back button will be shown on the top left (with replacing positions of save & history buttons).

#### defaultSavedImageType

Type: `string`

Default: `png`

The default type used and selected in saving the image (the user has the possibility to change it from the saving modal).

#### forceToPngInEllipticalCrop

Type: `boolean`

Default: `false`

If `true` then the saved image's type will always be `png` type if the user made an elliptical crop for preserving the transparency even if the user chose another extension in the saving modal, otherwise the familiar behavior (defaultSavedImageType or user's selected types) wins.

#### loadableDesignState *Experimental*

Type: `object`

Default: `null`

If provided the plugin will load this design state at the initial load to give the possibility to get back to that design in another time and continue editing it.

/////////////////////

#### onBeforeSave

Type: `function(imageFileInfo) {}`

Default: `undefined`

This function will be fired once the user clicks save button and before triggering the default saving behavior...

> If the function returned `false` then the default saving behavior implemented in the plugin won't be triggered.

#### onSave

Type: `function(imageObject, imageDesignState) {}` ***Required***

Default: `undefined`

Must be provided for avoiding plugin's error, it's used for handling the save functionality which is triggered once the user clicks on save button of the saving modal or once clicking the save button if the default behavior is prevented from --LINK--`onBeforeSave` function.

#### onClose

Type: `function(closingReasons) {}`

Default: `undefined`

Triggered once the user clicks either close/cancel button or back button, if not provided then the closing button won't shown at all.

#### annotationsCommon

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
| fill | string | '#000000' | The filled color for any added annotation |
| stroke | string | '#000000' | The stroke color for any added annotation |
| strokeWidth | number | 0 | The stroke width for any added annotation |
| shadowOffsetX | number | 0 | The horizontal/X shadow offset from its base annotation |
| shadowOffsetY | number | 0 | The vertical/Y shadow offset from its base annotation |
| shadowBlur | number | 0 | Blur value of the shadow added to the annotation |
shadowColor | string | '#000000' | The color of the shadow added to the annotation |
shadowOpacity | number | 1 | Transparency/Opacity value for the shadow of annotation |
opacity | number (0 - 1) | 1 | Transparency/Opacity value for the whole annotation |

#### TOOLS.TEXT

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
| text | string | 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' | The placeholder text added on adding a new text annotation |
| fontFamily | string | 'Arial' | The font family used for the text |
| fonts | (strings \| objects)[] | mentioned above | The fonts available to the user to choose from while adding text  |
| fontSize | number | 14 | The default size of the text added |
| letterSpacing | number | 0 | The spaces/paddings between letters of the text |
| lineHeight | number | 1 | Height of each line of the added text |
| align | string | 'left' ('left' \| 'center' \| 'right') | The horizontal alignment of the added text |
| fontStyle | string | '' ('normal' \| 'bold' \| 'italic' \| 'bold italic') | The font style & weight of text added |

> Fonts must be loaded from your side in implementation to take effect as it is not guaranteed that the user has the font on his system.

#### TOOLS.IMAGE

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    fill: undefined,
}
```

The options available for image annotation tool in additon to the annotationsCommon property,

#### TOOLS.RECT

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    cornerRadius: 0,
}
```
The options available for Rect annotation tool in additon to the annotationsCommon property,

#### TOOLS_IDS.ELLIPSE

Type: `object`

Default: `annotationsCommon`

No specific options available for ellipse only the annotationsCommon are used for ellipse and you could override any of them for ellipse only by passing them here.

#### TOOLS_IDS.POLYGON

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    sides: 3,
}
```

The available options for polygon annotation tool in additon to the annotationsCommon property,

#### TOOLS_IDS.PEN

Type: `object`

Default:
```js
{
    ...annotationsCommon,
    strokeWidth: 1,
}
```

No specific options available for pen tool only the annotationsCommon are used and you could override any of them for pen only by passing them here.

#### TOOLS_IDS.LINE]

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

#### TOOLS_IDS.ARROW

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
    
#### TOOLS_IDS.WATERMARK

Type: `object`

Default:

```js
{
    ...(TOOLS.TEXT || TOOLS.IMAGE), // depends on the added watermark type
    gallery: [],
}
```

The available options for watermark tool, the watermark is using the options of text and image annotation tools mentioned above depending on the watermark chosen.

#### TOOLS_IDS.CROP

Type: `object`

Default:
```js
{
    minWidth: 14,
    minHeight: 14,
    width: null,
    height: null,
    maxWidth: null,
    maxHeight: null,
    ratio: 'original',
    noPresets: false,
}
```
The available options for crop tool.


## Used By

This project is used by the following companies:

- Company 1
- Company 2

## Feedback

Send us on PR.

## License

[MIT](./LICENSE)

