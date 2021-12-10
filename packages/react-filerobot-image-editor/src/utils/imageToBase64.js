const imageToBase64 = (image) => {
  if (image instanceof HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    return canvas.toDataURL();
  }

  return '';
};

export default imageToBase64;
