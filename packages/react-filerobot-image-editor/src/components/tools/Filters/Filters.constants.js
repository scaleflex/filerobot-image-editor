/** External Dependencies */
import Konva from 'konva';

/** Internal Dependencies */
import * as CustomKonvaFilters from 'custom/filters';

const konvaFilters = Konva.Filters;
export const AVAILABLE_FILTERS = [
  {
    label: 'Original',
    filterFn: null,
  },
  {
    label: 'Invert',
    filterFn: konvaFilters.Invert,
  },
  {
    label: 'Black & White',
    filterFn: CustomKonvaFilters.BlackAndWhite,
  },
  {
    label: 'Sepia',
    filterFn: konvaFilters.Sepia,
  },
  {
    label: 'Solarize',
    filterFn: konvaFilters.Solarize,
  },
  {
    label: 'Clarendon',
    filterFn: CustomKonvaFilters.Clarendon,
  },
  {
    label: 'Gingham',
    filterFn: CustomKonvaFilters.Gingham,
  },
  {
    label: 'Moon',
    filterFn: CustomKonvaFilters.Moon,
  },
  {
    label: 'Lark',
    filterFn: CustomKonvaFilters.Lark,
  },
  {
    label: 'Reyes',
    filterFn: CustomKonvaFilters.Reyes,
  },
  {
    label: 'Juno',
    filterFn: CustomKonvaFilters.Juno,
  },
  {
    label: 'Slumber',
    filterFn: CustomKonvaFilters.Slumber,
  },
  {
    label: 'Crema',
    filterFn: CustomKonvaFilters.Crema,
  },
  {
    label: 'Ludwig',
    filterFn: CustomKonvaFilters.Ludwig,
  },
  {
    label: 'Aden',
    filterFn: CustomKonvaFilters.Aden,
  },
  {
    label: 'Perpetua',
    filterFn: CustomKonvaFilters.Perpetua,
  },
  {
    label: 'Amaro',
    filterFn: CustomKonvaFilters.Amaro,
  },
  {
    label: 'Mayfair',
    filterFn: CustomKonvaFilters.Mayfair,
  },
  {
    label: 'Rise',
    filterFn: CustomKonvaFilters.Rise,
  },
  {
    label: 'Hudson',
    filterFn: CustomKonvaFilters.Hudson,
  },
  {
    label: 'Valencia',
    filterFn: CustomKonvaFilters.Valencia,
  },
  {
    label: 'X-Pro II',
    filterFn: CustomKonvaFilters.XPro2,
  },
  {
    label: 'Sierra',
    filterFn: CustomKonvaFilters.Sierra,
  },
  {
    label: 'Willow',
    filterFn: CustomKonvaFilters.Willow,
  },
  {
    label: 'Lo-Fi',
    filterFn: CustomKonvaFilters.LoFi,
  },
  {
    label: 'Inkwell',
    filterFn: konvaFilters.Grayscale,
  },
  {
    label: 'Hefe',
    filterFn: CustomKonvaFilters.Hefe,
  },
  {
    label: 'Nashville',
    filterFn: CustomKonvaFilters.Nashville,
  },
  {
    label: 'Stinson',
    filterFn: CustomKonvaFilters.Stinson,
  },
  {
    label: 'Vesper',
    filterFn: CustomKonvaFilters.Vesper,
  },
  {
    label: 'Earlybird',
    filterFn: CustomKonvaFilters.Earlybird,
  },
  {
    label: 'Brannan',
    filterFn: CustomKonvaFilters.Brannan,
  },
  {
    label: 'Sutro',
    filterFn: CustomKonvaFilters.Sutro,
  },
  {
    label: 'Toaster',
    filterFn: CustomKonvaFilters.Toaster,
  },
  {
    label: 'Walden',
    filterFn: CustomKonvaFilters.Walden,
  },
  {
    label: '1977',
    filterFn: CustomKonvaFilters.NinteenSeventySeven,
  },
  {
    label: 'Kelvin',
    filterFn: CustomKonvaFilters.Kelvin,
  },
  {
    label: 'Maven',
    filterFn: CustomKonvaFilters.Maven,
  },
  {
    label: 'Ginza',
    filterFn: CustomKonvaFilters.Ginza,
  },
  {
    label: 'Skyline',
    filterFn: CustomKonvaFilters.Skyline,
  },
  {
    label: 'Dogpatch',
    filterFn: CustomKonvaFilters.Dogpatch,
  },
  {
    label: 'Brooklyn',
    filterFn: CustomKonvaFilters.Brooklyn,
  },
  {
    label: 'Helena',
    filterFn: CustomKonvaFilters.Helena,
  },
  {
    label: 'Ashby',
    filterFn: CustomKonvaFilters.Ashby,
  },
  {
    label: 'Charmes',
    filterFn: CustomKonvaFilters.Charmes,
  },
];
