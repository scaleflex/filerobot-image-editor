const rgbaToHexWithOpacity = (rgba = '') => {
  let [r, g, b, opacity] = rgba.split(',');
  r = parseFloat(r.replace(/rgba?\(/, '').trim()).toString(16);
  g = parseFloat(g.trim()).toString(16);
  b = parseFloat(b.trim()).toString(16);
  opacity = opacity ? parseFloat(opacity.trim() ?? 1) : undefined;

  if (r.length === 1) r = `0${r}`;
  if (g.length === 1) g = `0${g}`;
  if (b.length === 1) b = `0${b}`;

  return {
    hex: `${r}${g}${b}`,
    opacity,
  };
};

export default rgbaToHexWithOpacity;
