export const getWatermarkPosition = (watermark, canvas, image) => {
  const { position = 'center' } = watermark;
  let cw, ch, lw, lh, pw, ph, r;
  let wx, wy, ww, wh;
  let imageRatio = image.width / image.height;

  cw = canvas.width;
  ch = canvas.height;
  lw = cw / 3;
  lh = ch / 3;
  pw = cw / 60;
  ph = ch / 60;

  if (position === 'center') {
    ww = wx = lw;
    wh = ww / imageRatio;
    wy = ch / 2 - wh / 2;

    if (wh > lh) {
      wy = wh = lh;
      ww = wh * imageRatio;
      wx = cw / 2 - ww / 2;
    }
  }

  else if (position === 'left-bottom') {
    ww = lw - pw * 2;
    wx = pw;
    wh = ww / imageRatio;
    wy = ch - ph - wh;

    if (wh > lh) {
      wh = lh - ph * 2;
      wx = pw;
      ww = wh * imageRatio;
      wy = ch * 2 / 3 + ph;
    }
  }

  else if (position === 'left-top') {
    ww = lw - pw * 2;
    wx = pw;
    wh = ww / imageRatio;
    wy = ph;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
    }
  }

  else if (position === 'left-center') {
    ww = lw - pw * 2;
    wx = pw;
    wh = ww / imageRatio;
    wy = ch / 2 - wh / 2;

    if (wh > lh) {
      wy = lh;
      wh = lh;
      ww = wh * imageRatio;
    }
  }

  else if (position === 'right-top') {
    ww = lw - pw * 2;
    wx = lw * 2 + pw;
    wh = ww / imageRatio;
    wy = ph;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw - pw - ww;
      wy = ph;
    }
  }

  else if (position === 'right-bottom') {
    ww = lw - pw * 2;
    wx = lw * 2 + pw;
    wh = ww / imageRatio;
    wy = ch - ph - wh;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw - pw - ww;
      wy = ch - lh + ph;
    }
  }

  else if (position === 'center-top') {
    ww = lw;
    wh = ww / imageRatio;
    wx = lw;
    wy = ph;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw / 2 - ww / 2;
    }
  }

  else if (position === 'right-center') {
    ww = lw - pw * 2;
    wh = ww / imageRatio;
    wx = 2 * lw + pw;
    wy = ch / 2 - wh / 2;

    if (wh > lh) {
      wh = lh;
      ww = wh * imageRatio;
      wx = cw - pw - ww;
      wy = lh + ph;
    }
  }

  else if (position === 'center-bottom') {
    ww = lw;
    wh = ww / imageRatio;
    wx = lw;
    wy = ch - ph - wh;

    if (wh > lh) {
      wh = lh - ph * 2;
      ww = wh * imageRatio;
      wx = cw / 2 - ww / 2;
      wy = ch - lh + ph;
    }
  }

  return [wx, wy, ww, wh];
}