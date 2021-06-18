import React, { useCallback, useState } from 'react';

import TopbarItem from '../../../../Topbar/TopbarItem';
import { AnnotateOperationsWrapper } from '../Operations.styled';
import { ShapesWrapper } from './Shapes.styled';
import useAnnotation from '../../../../../hooks/useAnnotation';
import { AVAILABLE_SHAPES_OBJECTS } from './Shapes.constants';
import getShapeDefaultState from './getShapeDefaultState';
import ShapesOptionsPopup from '../../../../ShapesOptionsPopup';

const Shapes = ({ defaultFill = '#cceacc'}) => {
  const [_, updateShapeToBeAdded] = useAnnotation({ defaultFill });
  const [chosenShapeObject, setChosenShapeObject] = useState(null);

  const selectShapeObject = useCallback((shapeObject) => {
    updateShapeToBeAdded(
      (updatedShapeData) => ({
        ...updatedShapeData,
        ...getShapeDefaultState(shapeObject)
      }),
      true
    );
    setChosenShapeObject(shapeObject);
  }, [updateShapeToBeAdded]);

  const renderAvailableShapesObjects = useCallback(
    () => AVAILABLE_SHAPES_OBJECTS.map((shape) => (
      <TopbarItem
        key={shape.name}
        onSelect={() => selectShapeObject(shape)}
        isSelected={chosenShapeObject?.name === shape.name}
        item={shape}
      />
    )
  ), [chosenShapeObject?.name, selectShapeObject]);

  return (
    <AnnotateOperationsWrapper>
      <ShapesWrapper alignCenter>
        <ShapesOptionsPopup />
        {renderAvailableShapesObjects()}
      </ShapesWrapper>
    </AnnotateOperationsWrapper>
  );
}

export default Shapes;
