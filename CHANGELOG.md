# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Types of changes:
- `Added` for new features.
- `Changed` for changes in existing functionality.
- `Deprecated` for soon-to-be removed features.
- `Removed` for now removed features.
- `Fixed` for any bug fixes.
- `Security` in case of vulnerabilities.

> Date format: YYYY-MM-DD

> If we have some "Breaking changes" we can mark it in message by `**BREAKING**` preffix, like:  
> `- **BREAKING**: Some message`

-------------

## TODOs
> Todo list for future

- ...

-------------
## 3.12.8 - 2020-12-17
### Fixed
- showing the appropriate styles for the plugin while being showing inside page not as modal.

## 3.12.7 - 2020-11-23
### Fixed
- Styling of adjust controls by having spaces between each control.

## 3.12.6 - 2020-11-22
### Added
- `saveMode`, `imageProperties`, `imageMeta` & `imageName` properties into filerobot object of upload mode to be used in determining the save/upload mode of filerobot whether to have a newly created image without the old image's properties & meta, duplicate the image data with the edits (different name with same old image's properties & meta with considering the new edits/design) or replacing the main image with the newly edited one.

## 3.12.5 - 2020-11-22
### Fixed
- Watermark scaling box stays in its place if watermark is positioned from watermark's positioning squares.
- Image's stroke width input issue of not changing.
- Issue of multiple canvases on saving image.
- Cloudimage's mode generated url.

### Improved
- Improved the positioning of watermark in cloudimage mode.
- Adding selectors to the styled components.
- Applying watermark's default position when changing the watermark image.
- Scaling the watermark to 30% + 1.5% spacing when using watermark positioning sqaures and watermark's current size is bigger than 30% of edited image.
- Disabling scaling up the watermark image and allowing scaling down with scaling up to the max. size of the watermark image.

## 3.12.4 - 2020-11-19
### Improved
- Improved the positioning of watermark in cloudimage mode.
- Avoiding the overwriting of watermark's applying switcher styles.

## 3.12.3 - 2020-11-14
### Fixed
- Objects scaling on different image sizes issue.
- Canvas moving in while flipping issue.
- Text watermark position changing when undo then redo issue.
- Fixing issue of importing SVGs.

### Added
- added `lockScaleToPercentage` property to watermark object in config for scaling the watermark image and preventing users from re-scaling/re-sizing it.

### Improved
- Changing canvases selectors to be able to use multiple instances in same page.
- Using first url of watermark's urls array as the default watermark url if no string url property is provided.

## 3.12.2 - 2020-10-22
### Fixed
- Showing shapes borders in light color scheme.

### Added
- Watermark fonts for using those fonts in text watermark fonts field.
- Theme fonts for supporting those fonts in text & text watermark fonts field (if no fonts provided for watermark object).

## 3.12.1 - 2020-10-09
### Fixed
- Removing hot loader build paths from the complied library files.

### Improved
- Decreasing the library size a bit.

## 3.12.0 - 2020-10-07
### Fixed
- Watermark or added images quality is not destroyed and it would be relative to the edited image.
- The UI of font family field's dropdown while adding text through phone.
- Importing watermark/image through URL.

### Added
- noCapitalStrs prop for disabling the capitalization of strings.
- minCropAreaWidth & minCropAreaHeight props for limiting/fixing the customized crop area with minimum values.

### Improved
- Objects (Watermark/shapes...etc) on the image while editing became more accurate to the same positions & looking in produced/saved image which means after saving you will get the same looking (from position & quality of objects) as you are editing.
- Customizing the default element id regarding the used service by appending the used service to the id [|-cloudimage|-uploader].
- Replacing all used unsafe deprecated methods (UNSAFE_*).

## 3.11.5 - 2020-10-05
### Fixed
- bug with modal id. Added using modal id from config

## 3.11.4 - 2020-10-02
### Fixed
- Add classes for modal overlay and modal root container on purpose to manage plugin in external projects

## 3.11.3 - 2020-09-22
### Fixed
- Objects drag & drop error 

## 3.11.2 - 2020-09-21
### Fixed
- Watermark issue when no urls provided in the configurations

### Added
- Touch support for moving objects' places

## 3.11.1 - 2020-09-16
### Fixed
- Watermark spinner is always shown if no watermark urls provided
- Watermark image upload issue

## 3.11.0 - 2020-09-03
### Fixed
- Text watermark design
- Problem of image saving without adding watermark in upload & modify modes

### Added
- showInModal & watermark.defaultText props
- onClose method's status

## 3.10.1 - 2020-08-12
### Changed
- update fonts

## 3.10.0 - 2020-08-12
### Added
- draw shapes, images, text with possibility to drag&drop and scale

## 3.9.6 - 2020-07-28
### Changed
- move back button into config

## 3.9.5 - 2020-07-27
### Fixed
- FocusPoint console error

### Changed
/ FocusPointPreview improvements (sizes)

## 3.9.4 - 2020-07-24
### Fixed
- go back button visibility

## 3.9.3 - 2020-06-18
### Fixed
- image sealing
- fixed problem of canvas rendering on SSR

### Added
- support for initial crop area (beginCropArea)


## 3.9.2 - 2020-06-13
### Fixed
- round the radius for cloudimage integration
- using blob as source

### Added
- round crop
- SSR support


## 3.9.1 - 2020-06-12
### Fixed
- onComplete method doesn't call with new callback syntax


## 3.9.0 - 2020-06-12

### Fixed
- calculating final size when zooming was applied on download
- problem with query sting on generate cloudimage url
- configuration of tools
- fix canvas initilization error

### Added
- image sealing
- support for onOpen & onClose methods
- fullscreen mode
- focus point


## 3.7.7 - 2020-05-17
## 3.7.6 - 2020-05-17

### Fixed
- problem with localization
- mobile layout


### 3.7.2

#### Added

- Add possibility to not prefix url when already using Filerobot URL

```js
...
filerobot: {
    token: 'xxxx',
    doNotPrefixURL: true
},
...
```

### 3.7.0

#### Deprecated

- `fileUpload` watermark param is deprecated. Now there is possibility to switch watermark input among
url, gallery, file upload

#### Added

- possibility to change watermark input among url, gallery and file upload