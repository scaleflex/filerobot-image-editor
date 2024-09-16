/** External Dependencies */
import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@scaleflex/ui/core/menu-item';
import FontBold from '@scaleflex/icons/font-bold';
import FontItalic from '@scaleflex/icons/font-italic';

/** Internal Dependencies */
import { TOOLS_IDS } from 'utils/constants';
import AnnotationOptions from 'components/common/AnnotationOptions';
import { StyledIconWrapper } from 'components/common/AnnotationOptions/AnnotationOptions.styled';
import { useStore, useTextAnnotationEditing } from 'hooks';
import {
  StyledFontFamilySelect,
  StyledFontSizeInput,
  StyledToolsWrapper,
} from './TextOptions.styled';
import {
  textOptionsPopupComponents,
  TEXT_POPPABLE_OPTIONS,
} from './TextOptions.constants';

const TextControls = ({ text: tmpTextAnnotation, saveText, children }) => {
  const { designLayer, t, config } = useStore();
  const { updateTextFormats, currentTextAnnotation } =
    useTextAnnotationEditing(true);
  const text = {
    ...tmpTextAnnotation,
    ...currentTextAnnotation,
  };

  const { useCloudimage } = config;
  const { fonts = [], onFontChange } = config[TOOLS_IDS.TEXT];

  const updateTargetTextFormats = (newUpdates = {}) => {
    if (currentTextAnnotation?.id) {
      updateTextFormats(newUpdates);
      return;
    }

    saveText((latestText) => ({
      id: latestText.id,
      ...newUpdates,
    }));
  };

  const changeFontFamily = useCallback(
    (newFontFamily) => {
      updateTargetTextFormats({ fontFamily: newFontFamily });
      if (
        text.fontFamily !== newFontFamily &&
        typeof onFontChange === 'function'
      ) {
        const reRenderCanvasFn = designLayer.draw.bind(designLayer);
        onFontChange(newFontFamily, reRenderCanvasFn);
      }
    },
    [text, designLayer],
  );

  return (
    <AnnotationOptions
      className="FIE_text-tool-options"
      annotation={text}
      updateAnnotation={updateTargetTextFormats}
      morePoppableOptionsPrepended={!useCloudimage ? TEXT_POPPABLE_OPTIONS : []}
      moreOptionsPopupComponentsObj={
        !useCloudimage ? textOptionsPopupComponents : {}
      }
      t={t}
      showTransparentColor={false}
    >
      {Array.isArray(fonts) && fonts.length > 1 && (
        <StyledFontFamilySelect
          className="FIE_text-font-family-option"
          onChange={changeFontFamily}
          value={text.fontFamily?.toLowerCase()}
          placeholder={t('fontFamily')}
          size="sm"
        >
          {/* fontFamily is string or object */}
          {fonts.map((fontFamily = '') => (
            <MenuItem
              className="FIE_text-font-family-item"
              key={fontFamily.value ?? fontFamily}
              value={(fontFamily.value ?? fontFamily)?.toLowerCase()}
            >
              {fontFamily.label ?? fontFamily}
            </MenuItem>
          ))}
        </StyledFontFamilySelect>
      )}
      <StyledFontSizeInput
        className="FIE_text-size-option"
        value={text.fontSize || ''}
        name="fontSize"
        onChange={(e) =>
          updateTargetTextFormats({ fontSize: parseFloat(e.target.value) })
        }
        inputMode="numeric"
        type="number"
        size="sm"
        placeholder={t('size')}
      />

      <StyledToolsWrapper>
        {!useCloudimage && (
          <>
            <StyledIconWrapper
              className="FIE_text-bold-option"
              active={text.fontWeight === 'bold'}
              onClick={() =>
                updateTargetTextFormats({
                  fontWeight: text.fontWeight === 'bold' ? 'normal' : 'bold',
                })
              }
              watermarkTool
            >
              <FontBold size={20} />
            </StyledIconWrapper>
            <StyledIconWrapper
              className="FIE_text-italic-option"
              active={text.fontStyle === 'italic'}
              onClick={() =>
                updateTargetTextFormats({
                  fontStyle: text.fontStyle === 'italic' ? 'normal' : 'italic',
                })
              }
              watermarkTool
            >
              <FontItalic size={20} />
            </StyledIconWrapper>
          </>
        )}
        {children}
      </StyledToolsWrapper>
    </AnnotationOptions>
  );
};

TextControls.propTypes = {
  text: PropTypes.instanceOf(Object).isRequired,
  saveText: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default TextControls;
