import React, { lazy, Suspense, useState } from 'react';
import { Annotation } from '@scaleflex/icons';

import TopbarItem from '../../../../Topbar/TopbarItem';
import { AnnotateOperationsWrapper } from '../Operations.styled';
import { ShapesWrapper, SideShapesWrapper, CurrentShapeWrapper } from './Shapes.styled';
import Loading from '../../../../Loading';

const availableShapes = [
  {
    icon: Annotation,
    label: 'Rect',
    key: 'RECT',
    Component: lazy(() => import('./Rect'))
  },
  {
    icon: Annotation,
    label: 'Circle',
    key: 'CIRCLE',
    Component: lazy(() => import('./Circle'))
  },
  {
    icon: Annotation,
    label: 'Ellipse',
    key: 'ELLIPSE',
    Component: lazy(() => import('./Ellipse'))
  },
  {
    icon: Annotation,
    label: 'Polygon',
    key: 'POLYGON',
    Component: lazy(() => import('./Polygon'))
  },
];

const Shapes = () => {
  const [currentShape, setCurrentShape] = useState(null);

  const selectShape = (shapeObject) => {
    setCurrentShape(shapeObject);
  }

  const renderAvailableShapes = () => availableShapes.map((shape) => (
    <TopbarItem
      key={shape.key}
      onSelect={() => selectShape(shape)}
      isSelected={currentShape?.key === shape.key}
      item={shape}
    />
  ));

  return (
    <AnnotateOperationsWrapper>
      {currentShape?.Component
        ? (
          <ShapesWrapper >
            <SideShapesWrapper>
              {renderAvailableShapes()}
            </SideShapesWrapper>
            <CurrentShapeWrapper>
              <Suspense fallback={<Loading style={{ flexGrow: 1 }} />}>
                <currentShape.Component />
              </Suspense>
            </CurrentShapeWrapper>
          </ShapesWrapper>
        )
        : (
          <ShapesWrapper alignCenter>
            {renderAvailableShapes()}
          </ShapesWrapper>
        )}
    </AnnotateOperationsWrapper>
  );
}

export default Shapes;
