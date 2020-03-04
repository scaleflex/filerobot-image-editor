# Changelog

All breaking changes will be listed here

### 3.7.2

#### new features

* Add possibility to not prefix url when already using Filerobot URL

```js
...
filerobot: {
    token: 'xxxx',
    doNotPrefixURL: true
},
...
```

### 3.7.0

#### deprecated

* `fileUpload` watermark param is deprecated. Now there is possibility to switch watermark input among
url, gallery, file upload

#### new features

* possibility to change watermark input among url, gallery and file upload