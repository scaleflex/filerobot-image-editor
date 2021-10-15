/** External Dependencies */
import React, { useCallback } from 'react';
import { MenuItem } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { ANNOTATIONS_NAMES } from 'utils/constants';
import { Bold, Italic } from 'components/common/icons';
import AnnotationOptions from 'components/common/AnnotationOptions';
import { StyledIconWrapper } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import {
  StyledFontFamilySelect,
  StyledFontSizeInput,
} from './TextOptions.styled';
import {
  textOptionsPopupComponents,
  TEXT_POPPABLE_OPTIONS,
} from './TextOptions.constants';

const TextOptions = () => {
  const [text, saveText] = useAnnotation({
    name: ANNOTATIONS_NAMES.TEXT,
    fontFamily: 'Arial',
    letterSpacing: 0,
    lineHeight: 1,
    opacity: 1,
    text: 'Testing...',
    align: 'left',
  });

  const changeTextProps = useCallback(
    (e) => {
      saveText({
        [e.target.name]: e.target.value,
      });
    },
    [saveText],
  );

  const changeFontFamily = useCallback(
    (newFontFamily) => {
      changeTextProps({
        target: { name: 'fontFamily', value: newFontFamily },
      });
    },
    [changeTextProps],
  );

  const changeFontStyle = useCallback(
    (newStyle) => {
      let fontStyle = text.fontStyle?.split(' ') || [];
      if (fontStyle && fontStyle.includes(newStyle)) {
        fontStyle = fontStyle.filter((style) => style !== newStyle);
      } else {
        fontStyle.push(newStyle);
      }

      changeTextProps({
        target: {
          name: 'fontStyle',
          value: fontStyle.join(' '),
        },
      });
    },
    [text],
  );

  return (
    <AnnotationOptions
      annotation={text}
      updateAnnotation={saveText}
      morePoppableOptionsPrepended={TEXT_POPPABLE_OPTIONS}
      moreOptionsPopupComponentsObj={textOptionsPopupComponents}
    >
      <StyledFontFamilySelect
        onChange={changeFontFamily}
        value={text.fontFamily}
        placeholder="Font family"
        size="sm"
      >
        {/* TODO: Make this customizable from config/props */}
        {['Arial', 'Times New Roman', 'Courier New', 'Comic Sans MS'].map(
          (fontFamily) => (
            <MenuItem key={fontFamily} value={fontFamily}>
              {fontFamily}
            </MenuItem>
          ),
        )}
      </StyledFontFamilySelect>
      <StyledFontSizeInput
        value={text.fontSize || ''}
        name="fontSize"
        onChange={changeTextProps}
        inputMode="numeric"
        type="number"
        size="sm"
        placeholder="size"
      />
      <StyledIconWrapper
        aria-selected={(text.fontStyle || '').includes('bold')}
        onClick={() => changeFontStyle('bold')}
      >
        <Bold />
      </StyledIconWrapper>
      <StyledIconWrapper
        aria-selected={(text.fontStyle || '').includes('italic')}
        onClick={() => changeFontStyle('italic')}
      >
        <Italic />
      </StyledIconWrapper>
    </AnnotationOptions>
  );
};

export default TextOptions;
