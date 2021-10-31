/** External Dependencies */
import React, { useCallback, useContext, useEffect } from 'react';
import { MenuItem } from '@scaleflex/ui/core';

/** Internal Dependencies */
import { useAnnotation } from 'hooks';
import { TOOLS_IDS, TRANSFORMERS_LAYER_ID } from 'utils/constants';
import { Bold, Italic } from 'components/common/icons';
import AnnotationOptions from 'components/common/AnnotationOptions';
import { StyledIconWrapper } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import AppContext from 'context';
import { ENABLE_TEXT_CONTENT_EDIT } from 'actions';
import restrictNumber from 'utils/restrictNumber';
import {
  StyledFontFamilySelect,
  StyledFontSizeInput,
} from './TextOptions.styled';
import {
  textOptionsPopupComponents,
  TEXT_POPPABLE_OPTIONS,
} from './TextOptions.constants';
import {
  activateTextChange,
  deactivateTextChange,
} from './handleTextChangeArea';

const TextOptions = () => {
  const { dispatch, textIdOfEditableContent, designLayer } =
    useContext(AppContext);
  const [text, saveText] = useAnnotation({
    name: TOOLS_IDS.TEXT,
    fontFamily: 'Arial',
    letterSpacing: 0,
    lineHeight: 1,
    opacity: 1,
    align: 'left',
  });

  const changeTextProps = useCallback(
    (e) => {
      const { name, value, type } = e.target;
      saveText((latestText) => ({
        id: latestText.id,
        [name]: type === 'number' ? restrictNumber(value, 1, 500) : value,
      }));
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

  const disableTextEdit = useCallback(() => {
    dispatch({
      type: ENABLE_TEXT_CONTENT_EDIT,
      payload: {
        textIdOfEditableContent: null,
      },
    });
  }, []);

  const changeTextContent = useCallback((newContent) => {
    changeTextProps({
      target: {
        name: 'text',
        value: newContent,
      },
    });
    disableTextEdit();
  }, []);

  useEffect(() => {
    let transformer;
    if (textIdOfEditableContent && text.id === textIdOfEditableContent) {
      const canvasStage = designLayer.getStage();
      [transformer] = canvasStage.findOne(`#${TRANSFORMERS_LAYER_ID}`).children;
      activateTextChange(
        textIdOfEditableContent,
        canvasStage,
        transformer,
        changeTextContent,
        disableTextEdit,
      );
    }

    return () => {
      if (transformer && textIdOfEditableContent) deactivateTextChange();
    };
  }, [textIdOfEditableContent]);

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
