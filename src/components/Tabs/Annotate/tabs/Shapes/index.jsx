/** External Dependencies */
import React, { useCallback, useState } from 'react';

/** Internal Dependencies */
import { ANNOTATIONS_NAMES } from 'utils/constants';
import { useAnnotation } from 'hooks';

const Shapes = ({ defaultFill = '#cceacc' }) => {
  const [rect, setRect] = useAnnotation({
    name: ANNOTATIONS_NAMES.RECT,
    fill: defaultFill,
  }, true);

  return null;
  // const [_, updateShapeToBeAdded] = useAnnotation({ defaultFill });
  // const [chosenShapeObject, setChosenShapeObject] = useState(null);

  // const selectShapeObject = useCallback((shapeObject) => {
  //   updateShapeToBeAdded(
  //     (updatedShapeData) => ({
  //       ...updatedShapeData,
  //       ...getShapeDefaultState(shapeObject),
  //     }),
  //     true,
  //   );
  //   setChosenShapeObject(shapeObject);
  // }, [updateShapeToBeAdded]);

  // const renderAvailableShapesObjects = useCallback(
  //   () => AVAILABLE_SHAPES_OBJECTS.map((shape) => (
  //     <TopbarItem
  //       key={shape.name}
  //       onSelect={() => selectShapeObject(shape)}
  //       isSelected={chosenShapeObject?.name === shape.name}
  //       item={shape}
  //     />
  //   )), [chosenShapeObject?.name, selectShapeObject],
  // );

  // return (
  //   <AnnotateOperationsWrapper>
  //     <ShapesWrapper alignCenter>
  //       <ShapesOptionsPopup />
  //       {renderAvailableShapesObjects()}
  //     </ShapesWrapper>
  //   </AnnotateOperationsWrapper>
  // );
};

export default Shapes;
