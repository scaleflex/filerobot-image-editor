/** External Dependencies */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ArrowRightAlt from '@scaleflex/icons/arrow-right-alt';
import Point from '@scaleflex/icons/point';

/** Internal Dependencies */
import { POSITIONS } from 'utils/constants';
import mapPositionStringToPoint from 'utils/mapPositionStringToPoint';
import { useStore } from 'hooks';
import { StyledIconWrapper } from './AnnotationOptions.styled';
import {
  AVAILABLE_POSITIONS,
  posCssRotateDegFromRightSide,
} from './AnnotationOptions.constants';

const PositionFields = ({ annotation, updateAnnotation }) => {
  const { designLayer } = useStore();

  const changePosition = (newPositionStr) => {
    updateAnnotation(
      mapPositionStringToPoint(annotation, designLayer, newPositionStr),
    );
  };

  const positionsLength = AVAILABLE_POSITIONS.length;

  return AVAILABLE_POSITIONS.map((pos, i) => (
    <Fragment key={pos}>
      <StyledIconWrapper
        onClick={() => changePosition(pos)}
        secondaryIconColor
        addThinBorder
        noMargin
      >
        {pos === POSITIONS.MIDDLE_CENTER ? (
          <Point />
        ) : (
          <ArrowRightAlt
            style={{
              transform: `rotate(${posCssRotateDegFromRightSide[pos]}deg)`,
            }}
          />
        )}
      </StyledIconWrapper>
      {(i + 1) % 3 === 0 && i + 1 !== positionsLength && <div />}
    </Fragment>
  ));
};

PositionFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default PositionFields;
