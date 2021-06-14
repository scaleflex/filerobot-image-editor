import React, { useCallback, useContext, useState } from 'react';

import TopbarItem from '../../../../Topbar/TopbarItem';
import { AnnotateOperationsWrapper } from '../Operations.styled';
import { ShapesWrapper } from './Shapes.styled';
import Context from '../../../../../context';
import useAnnotation from '../../../../../hooks/useAnnotation';
import { AVAILABLE_SHAPES_OBJECTS } from './Shapes.constants';
import getShapeDefaultState from './getShapeDefaultState';
import OptionsPopup from '../../OptionsPopup';

const Shapes = ({ defaultFill = '#cceacc'}) => {
  const [_, updateShapeToBeAdded] = useAnnotation({ defaultFill });
  const { selections = [] } = useContext(Context);
  const [chosenShapeObject, setChosenShapeObject] = useState(null);
  const selectedShape = selections[0];

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
        <OptionsPopup />
        {renderAvailableShapesObjects()}
      </ShapesWrapper>
    </AnnotateOperationsWrapper>
  );
}

export default Shapes;
