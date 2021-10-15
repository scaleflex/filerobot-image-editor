/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { CenterAlignment, LeftAlignment } from 'components/common/icons';
import {
  StyledSpacedOptionFields,
  StyledIconWrapper,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';

const rightAlignmentCssTransform = { transform: 'scaleX(-1)' };

const TextAlignmentFields = ({
  annotation: text,
  updateAnnotation: updateText,
}) => {
  const { align } = text;

  const changeHorizontalAlignment = (newHorizonalAlignment) => {
    updateText({ align: newHorizonalAlignment });
  };

  return (
    <StyledSpacedOptionFields>
      <StyledIconWrapper
        onClick={() => changeHorizontalAlignment('left')}
        aria-selected={align === 'left'}
      >
        <LeftAlignment />
      </StyledIconWrapper>
      <StyledIconWrapper
        onClick={() => changeHorizontalAlignment('center')}
        aria-selected={align === 'center'}
      >
        <CenterAlignment />
      </StyledIconWrapper>
      <StyledIconWrapper
        onClick={() => changeHorizontalAlignment('right')}
        aria-selected={align === 'right'}
      >
        <LeftAlignment style={rightAlignmentCssTransform} />
      </StyledIconWrapper>
    </StyledSpacedOptionFields>
  );
};

TextAlignmentFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default TextAlignmentFields;
