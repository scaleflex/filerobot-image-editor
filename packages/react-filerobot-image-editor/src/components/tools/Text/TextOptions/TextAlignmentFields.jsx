/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import {
  StyledSpacedOptionFields,
  StyledIconWrapper,
} from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import { TextAlignCenter, TextAlignLeft } from '@scaleflex/icons';

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
        active={align === 'left'}
        data-testid="FIE-text-alignment-left"
      >
        <TextAlignLeft />
      </StyledIconWrapper>
      <StyledIconWrapper
        onClick={() => changeHorizontalAlignment('center')}
        active={align === 'center'}
        data-testid="FIE-text-alignment-center"
      >
        <TextAlignCenter />
      </StyledIconWrapper>
      <StyledIconWrapper
        onClick={() => changeHorizontalAlignment('right')}
        active={align === 'right'}
        data-testid="FIE-text-alignment-right"
      >
        <TextAlignLeft style={rightAlignmentCssTransform} />
      </StyledIconWrapper>
    </StyledSpacedOptionFields>
  );
};

TextAlignmentFields.propTypes = {
  annotation: PropTypes.instanceOf(Object).isRequired,
  updateAnnotation: PropTypes.func.isRequired,
};

export default TextAlignmentFields;
