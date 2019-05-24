const getLabel = (label = '') => label.replace(/_/g, ' ');

/**
 * Convert a base64 string in a Blob according to the data and contentType.
 *
 * @param b64Data {String} Pure base64 string without contentType
 * @param contentType {String} the content type of the file i.e (image/jpeg - image/png - text/plain)
 * @param sliceSize {Int} SliceSize to process the byteCharacters
 * @see http://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
 * @return Blob
 */
function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  return new Blob(byteArrays, {type: contentType});
}

function getIcon(name) {
  switch (name) {
    //filters
    case 'colorize':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/colorize.jpg';
    case 'contrast':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/contrast.png';
    case 'cross_process':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/cross_process.png';
    case 'glow_sun':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/glow_sun.png';
    case 'hdr_effect':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/hdr_effect.png';
    case 'jarques':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/jarques.png';
    case 'love':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/love.png';
    case 'old_boot':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/old_boot.png';
    case 'orange_peel':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/orange_peel.png';
    case 'pin_hole':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/pin_hole.png';
    case 'pleasant':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/pleasant.png';
    case 'sepia':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/sepia.png';
    case 'sun_rise':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/sun_rise.png';
    case 'vintage':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/filters/vintage.png';
    //effets
    case 'clarity':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/clarity.png';
    case 'edge_enhance':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/edge_enhance.png';
    case 'emboss':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/emboss.png';
    case 'grungy':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/grungy.png';
    case 'hazy':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/hazy.png';
    case 'lomo':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/lomo.png';
    case 'noise':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/noise.png';
    case 'old_paper':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/old_paper.png';
    case 'posterize':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/posterize.png';
    case 'radial_blur':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/radial_blur.png';
    case 'sin_city':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/sin_city.png';
    case 'tilt_shift':
      return 'https://cdn.scaleflex.it/plugins/filerobot-image-editor/assets/images/effects/tilt_shift.png';
    default:
      return '';
  }
}

const encodePermalink = link => link.replace(/\?/g, '%3F');

export { getLabel, b64toBlob, getIcon, encodePermalink };