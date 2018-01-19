(function () {
  var enterModule = require('react-hot-loader/patch').enterModule;

  enterModule && enterModule(module);
})();

export { default as ImageEditor } from './components/image-editor-react';
;

(function () {
  var reactHotLoader = require('react-hot-loader/patch').default;

  var leaveModule = require('react-hot-loader/patch').leaveModule;

  if (!reactHotLoader) {
    return;
  }

  leaveModule(module);
})();

;