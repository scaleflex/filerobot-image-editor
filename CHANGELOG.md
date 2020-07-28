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