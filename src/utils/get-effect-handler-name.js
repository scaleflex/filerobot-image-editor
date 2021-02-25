export const getEffectHandlerName = name => {
  switch (name) {
    //filters
    case 'colorize':
      return 'colorize';
    case 'contrast':
      return 'contrast';
    case 'cross_process':
      return 'crossProcess';
    case 'glow_sun':
      return 'glowingSun';
    case 'hdr_effect':
      return 'hdr';
    case 'jarques':
      return 'jarques';
    case 'love':
      return 'love';
    case 'old_boot':
      return 'oldBoot';
    case 'orange_peel':
      return 'orangePeel';
    case 'pin_hole':
      return 'pinhole';
    case 'pleasant':
      return 'pleasant';
    case 'sepia':
      return 'sepia';
    case 'sun_rise':
      return 'sunrise';
    case 'vintage':
      return 'vintage';
    //effets
    case 'clarity':
      return '';
    case 'edge_enhance':
      return 'edgeEnhance';
    case 'emboss':
      return 'emboss';
    case 'grungy':
      return 'grungy';
    case 'hazy':
      return 'hazyDays';
    case 'lomo':
      return 'lomo';
    case 'noise':
      return 'noise';
    case 'old_paper':
      return 'oldPaper'; //?
    case 'posterize':
      return 'posterize';
    case 'radial_blur':
      return 'radialBlur';
    case 'sin_city':
      return 'sinCity';
    case 'tilt_shift':
      return 'tiltShift';
    default:
      return null;
  }
}