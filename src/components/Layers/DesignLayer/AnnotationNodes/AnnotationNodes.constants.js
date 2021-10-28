/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';
import RectNode from './RectNode';
import EllipseNode from './EllipseNode';
import PolygonNode from './PolygonNode';
import TextNode from './TextNode';
import ImageNode from './ImageNode';
import LineNode from './LineNode';
import ArrowNode from './ArrowNode';

export const ANNOTATION_NAMES_TO_COMPONENT = {
  [TOOLS_IDS.RECT]: RectNode,
  [TOOLS_IDS.ELLIPSE]: EllipseNode,
  [TOOLS_IDS.POLYGON]: PolygonNode,
  [TOOLS_IDS.TEXT]: TextNode,
  [TOOLS_IDS.IMAGE]: ImageNode,
  [TOOLS_IDS.LINE]: LineNode,
  [TOOLS_IDS.ARROW]: ArrowNode,
  [TOOLS_IDS.PEN]: LineNode,
};
