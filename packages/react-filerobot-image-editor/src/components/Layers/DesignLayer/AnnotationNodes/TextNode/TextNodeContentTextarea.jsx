/** External Dependencies */
import React, { useRef, useEffect } from 'react';
import { Html } from 'react-konva-utils';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { useTextAnnotationEditing } from 'hooks';
import { StyledTextNodeContentTextarea } from './TextNode.styled';

const TextNodeContentTextarea = ({
  fill,
  opacity,
  fontFamily,
  fontSize,
  fontStyle,
  letterSpacing,
  lineHeight,
  textAlign,
  text,
  width,
  height,
}) => {
  const textareaRef = useRef();

  const { changeTextContent, cancelTextEditing } = useTextAnnotationEditing();
  const handleOutsideClick = (e) => {
    if (e.target !== textareaRef.current) {
      const textValue = textareaRef.current.value;
      if (changeTextContent(textValue)) {
        cancelTextEditing();
      }
    }
  };

  const handleTextareaKeyDown = (event) => {
    // hide on enter
    // but don't hide on shift + enter
    if (event.key === 'Enter') {
      if (!event.shiftKey) {
        const textContent = event.target.value;
        if (changeTextContent(textContent)) {
          cancelTextEditing();
        }
      }

      return;
    }

    // on esc do not set value back to node
    if (event.key === 'Escape') {
      cancelTextEditing();
    }
  };

  useEffect(() => {
    if (window) {
      window.addEventListener('click', handleOutsideClick);
    }

    return () => {
      window?.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  return (
    <Html>
      <StyledTextNodeContentTextarea
        ref={textareaRef}
        width={width}
        height={height}
        fill={fill}
        opacity={opacity}
        fontFamily={fontFamily}
        fontSize={fontSize}
        fontStyle={fontStyle}
        letterSpacing={letterSpacing}
        lineHeight={lineHeight}
        defaultValue={text}
        textAlign={textAlign}
        onKeyDown={handleTextareaKeyDown}
      />
    </Html>
  );
};

TextNodeContentTextarea.propTypes = {
  text: PropTypes.string,
  fill: PropTypes.string,
  fontFamily: PropTypes.string,
  fontStyle: PropTypes.string,
  textAlign: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  opacity: PropTypes.number,
  fontSize: PropTypes.number,
  letterSpacing: PropTypes.number,
  lineHeight: PropTypes.number,
};

export default TextNodeContentTextarea;
