/* eslint-disable no-console */
require('isomorphic-fetch');
const FormData = require('form-data');
const { createReadStream } = require('fs');
const { join } = require('path');
const {
  version: originalVersion,
} = require('../lerna.json');

const splittedVersion = originalVersion.split('.');
const version = splittedVersion
  .filter((v) => parseInt(v, 10) || parseInt(v, 10) === 0)
  .map((v) => parseInt(v, 10))
  .slice(0, 3)
  .join('.');

const apiUrl = process.env.API_URL || 'https://api.filerobot.com';
const pluginsContainer = process.env.PLUGINS_CONTAINER;
const pluginFolder = process.env.PLUGIN_FOLDER;
const pluginVersion = version || 'latest';
const pluginStaticFolder = process.argv[2] === 'latest' ? 'latest' : 'beta';
const securityTemplateId = process.env.UPLOAD_SECURITY_TEMPLATE_ID;

console.log('===== [JS Bundle Deployment is starting] =====');
const generateSassKey = () =>
  fetch(`${apiUrl}/${pluginsContainer}/key/${securityTemplateId}`)
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'error') {
        console.error(
          `[Error] while generating SASS key: ${res.msg} - ${res.hint}`,
        );
        return null;
      }
      console.log('Generated SASS Key.');
      return res.key;
    })
    .catch(
      () =>
        new Error(
          `Unable to get SASS key for the provided security template key ${securityTemplateId}`,
        ),
    );

const deploy = (sassKey, uploadToSubFolder) => {
  const uploadEndpoint = `${apiUrl}/${pluginsContainer}/v4/files?folder=${pluginFolder}/${uploadToSubFolder}`;
  const formData = new FormData();
  formData.append(
    'files[]',
    createReadStream(join(__dirname, '../dist/filerobot-image-editor.min.js')),
  );

  console.log(
    `[Deploying]: Request to sub-folder (${uploadToSubFolder}) started... `,
  );
  // TODO: The fetch fails while deploying, need to check why?
  fetch(uploadEndpoint, {
    method: 'POST',
    body: formData,
    headers: {
      'X-Filerobot-Key': sassKey,
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.status === 'error') {
        console.error(
          `[Error]: While deploying to (${uploadToSubFolder}) :${
            res.msg ? ` ${res.msg} ` : ''
          }${res.hint ? `- ${res.hint}` : ''}`,
        );
      } else {
        console.log(
          `[Deployed] Filerobot Image Editor JS Bundle v${originalVersion} deployed successfully to (${uploadToSubFolder}).`,
        );
        const uploadedFiles = res.files || [];
        uploadedFiles.forEach((file) => {
          console.log(`- [${file.name}] URL:`, file.url?.cdn);
        });
      }
    })
    .catch(console.error);
};

generateSassKey()
  .then((sassKey) => {
    if (pluginStaticFolder !== 'beta') {
      deploy(sassKey, pluginVersion);
    }
    deploy(sassKey, pluginStaticFolder);
  })
  .catch(console.error);
