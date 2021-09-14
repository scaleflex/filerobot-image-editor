// filters
import colorize from '../assets/images/filters/colorize.jpg';
import contrast from '../assets/images/filters/contrast.png';
import cross_process from '../assets/images/filters/cross_process.png';
import glow_sun from '../assets/images/filters/glow_sun.png';
import hdr_effect from '../assets/images/filters/hdr_effect.png';
import jarques from '../assets/images/filters/jarques.png';
import love from '../assets/images/filters/love.png';
import old_boot from '../assets/images/filters/old_boot.png';
import orange_peel from '../assets/images/filters/orange_peel.png';
import pin_hole from '../assets/images/filters/pin_hole.png';
import pleasant from '../assets/images/filters/pleasant.png';
import sepia from '../assets/images/filters/sepia.png';
import sun_rise from '../assets/images/filters/sun_rise.png';
import vintage from '../assets/images/filters/vintage.png';
// effects
import clarity from '../assets/images/effects/clarity.png';
import edge_enhance from '../assets/images/effects/edge_enhance.png';
import emboss from '../assets/images/effects/emboss.png';
import grungy from '../assets/images/effects/grungy.png';
import hazy from '../assets/images/effects/hazy.png';
import lomo from '../assets/images/effects/lomo.png';
import noise from '../assets/images/effects/noise.png';
import old_paper from '../assets/images/effects/old_paper.png';
import posterize from '../assets/images/effects/posterize.png';
import radial_blur from '../assets/images/effects/radial_blur.png';
import sin_city from '../assets/images/effects/sin_city.png';
import tilt_shift from '../assets/images/effects/tilt_shift.png';

export const getIcon = (name) => {
  switch (name) {
    //filters
    case 'colorize':
      return colorize;
    case 'contrast':
      return contrast;
    case 'cross_process':
      return cross_process;
    case 'glow_sun':
      return glow_sun;
    case 'hdr_effect':
      return hdr_effect;
    case 'jarques':
      return jarques;
    case 'love':
      return love;
    case 'old_boot':
      return old_boot;
    case 'orange_peel':
      return orange_peel;
    case 'pin_hole':
      return pin_hole;
    case 'pleasant':
      return pleasant;
    case 'sepia':
      return sepia;
    case 'sun_rise':
      return sun_rise;
    case 'vintage':
      return vintage;
    //effets
    case 'clarity':
      return clarity;
    case 'edge_enhance':
      return edge_enhance;
    case 'emboss':
      return emboss;
    case 'grungy':
      return grungy;
    case 'hazy':
      return hazy;
    case 'lomo':
      return lomo;
    case 'noise':
      return noise;
    case 'old_paper':
      return old_paper;
  case 'posterize':
      return posterize;
    case 'radial_blur':
      return radial_blur;
    case 'sin_city':
      return sin_city;
    case 'tilt_shift':
      return tilt_shift;
    default:
      return '';
  }
};
