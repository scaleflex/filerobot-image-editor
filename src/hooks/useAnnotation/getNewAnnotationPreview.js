/** External Dependencies */
import Konva from 'konva';

/** Internal Dependencies */
import { ANNOTATIONS_NAMES } from 'utils/constants';

const annotationsNamesToKonvaClasses = {
  [ANNOTATIONS_NAMES.RECT]: Konva.Rect,
  [ANNOTATIONS_NAMES.CIRCLE]: Konva.Circle,
  [ANNOTATIONS_NAMES.ELLIPSE]: Konva.Arrow,
  [ANNOTATIONS_NAMES.POLYGON]: Konva.RegularPolygon,
  [ANNOTATIONS_NAMES.LINE]: Konva.Line,
  [ANNOTATIONS_NAMES.IMAGE]: Konva.Image,
  [ANNOTATIONS_NAMES.TEXT]: Konva.Text,
  [ANNOTATIONS_NAMES.ARROW]: Konva.Arrow,
};

const getNewAnnotationPreview = (annotation) => (
  new annotationsNamesToKonvaClasses[annotation.name]({
    ...annotation,
    opacity: 0.7,
    x: annotation.x ?? 0,
    y: annotation.y ?? 0,
    // x: annotation.absoluteDimensions
    //   ? annotation.x - canvasDimensions.x
    //   : annotation.x ?? 0,
    // y: annotation.absoluteDimensions
    //   ? annotation.y - canvasDimensions.y
    //   : annotation.y ?? 0,
  })
);

export default getNewAnnotationPreview;
