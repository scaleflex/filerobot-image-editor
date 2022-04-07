/* eslint-disable no-console */
/** Internal Dependencies */
import defaultTranslations from 'context/defaultTranslations';
import { TRANSLATIONS_GRID_UUID } from './constants';

const backendTranslations = {};
const activatedTranslations = { ...defaultTranslations };

const hardcodedErrorMsg = 'Error while loading translations from backend.';

export const updateTranslations = (newTranslations = {}, language = 'en') =>
  Object.assign(
    activatedTranslations,
    backendTranslations?.[language?.toLowerCase()] || {},
    newTranslations,
  );

const sendMissingTranslationsToBackend = (missingTranslations = []) =>
  new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr.response);
      } else {
        console.warn(
          `Error in sending translation key to backend ${xhr.response?.hint}, ${xhr.status}`,
        );
        reject();
      }
    };

    xhr.onerror = () => {
      console.warn(
        `Error in sending translation key to backend ${xhr.response?.hint}, ${xhr.status}`,
      );
      reject();
    };

    const payload = {
      grid_uuid: TRANSLATIONS_GRID_UUID,
      translations_requests: missingTranslations,
    };

    xhr.open(
      'POST',
      `https://neo.wordplex.io/api/import/request-translations?grid_uuid=${TRANSLATIONS_GRID_UUID}`,
    );
    xhr.send(JSON.stringify(payload));
  });

export const getBackendTranslations = (
  language = 'en',
  additionalTranslations,
) =>
  new Promise((resolve, reject) => {
    const loweredCaseLanguage = language.toLowerCase();
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        (xhr.response || []).forEach((translation) => {
          backendTranslations[loweredCaseLanguage] = {
            ...backendTranslations[loweredCaseLanguage],
            [translation.translation_key]:
              translation.translations[loweredCaseLanguage],
          };
        });
        const missingTranslations = [];
        Object.keys(defaultTranslations).forEach((key) => {
          if (key && !backendTranslations[loweredCaseLanguage]?.[key]) {
            missingTranslations.push({
              key,
              lang: loweredCaseLanguage,
              default: defaultTranslations[key],
            });
          }
        });

        if (missingTranslations.length > 0) {
          sendMissingTranslationsToBackend(missingTranslations);
        }

        updateTranslations(additionalTranslations, loweredCaseLanguage);
        resolve(activatedTranslations);
      } else {
        console.error(`Status code: ${xhr.status}`);
        console.error(
          xhr.response?.msg ||
            xhr.response?.msg ||
            xhr.response?.details ||
            hardcodedErrorMsg,
        );
        reject();
      }
    };

    xhr.onerror = () => {
      console.error(`Status code ${xhr.status}, error: ${hardcodedErrorMsg}`);
      reject();
    };

    xhr.open(
      'GET',
      `https://i18n.ultrafast.io/api/export?grid=${TRANSLATIONS_GRID_UUID}`,
    );
    xhr.send();
  });

export const translate = (key) => activatedTranslations[key] || key || '';
