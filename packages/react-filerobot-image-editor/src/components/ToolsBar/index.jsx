/** External Depepdencneis */
import React, { useCallback, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';

/** Internal Depepdencneis */
import { SELECT_TOOL } from 'actions';
import { TABS_TOOLS, TOOLS_ITEMS } from 'components/tools/tools.constants';
import { TABS_IDS, TOOLS_IDS } from 'utils/constants';
import { useStore } from 'hooks';
import Carousel from 'components/common/Carousel';
import { DEFAULT_CROP_PRESETS } from 'components/tools/Crop/Crop.constants';
import { StyledToolsBar, StyledToolsBarItems } from './ToolsBar.styled';
import ToolsBarItemOptionsWrapper from './ToolsBarItemOptionsWrapper';
import CustomCropButtons from '../tools/Crop/CustomCropButtons';

const style = { maxWidth: '100%', width: '100%' };

const ToolsBar = ({ isPhoneScreen, dynamicButtons, upperToolbar }) => {
  const {
    t,
    dispatch,
    tabId,
    toolId,
    annotations,
    selectionsIds = [],
    config: { defaultTabId, defaultToolId, useCloudimage, Crop },
    dynamicCropToolId,
  } = useStore();
  const currentTabId = tabId || defaultTabId;
  const currentToolId =
    toolId || defaultToolId || TABS_TOOLS[currentTabId]?.[0];

  const tabTools = useMemo(() => {
    const tools = TABS_TOOLS[currentTabId] || [];

    const toolsToExclude = dynamicButtons ? [TOOLS_IDS.CROP] : [];

    return tools.filter((tool) => !toolsToExclude.includes(tool));
  }, [currentTabId, dynamicButtons]);

  const selectTool = useCallback((newToolId) => {
    dispatch({
      type: SELECT_TOOL,
      payload: {
        toolId: newToolId,
        dynamicButtons: Crop.dynamicButtons,
        dynamicCropToolId: '',
      },
    });
  }, []);

  const allPresets = useMemo(() => {
    const { presetsItems = [], presetsFolders = [], lockCropAreaAt } = Crop;
    const defaultPresets = lockCropAreaAt
      ? DEFAULT_CROP_PRESETS.filter((item) => !item.hide?.({ lockCropAreaAt }))
      : DEFAULT_CROP_PRESETS;

    return dynamicButtons
      ? [...presetsItems]
      : [...presetsFolders, ...defaultPresets, ...presetsItems];
  }, [Crop]);

  const items = useMemo(() => {
    if (upperToolbar) {
      const CustomCropVariants = allPresets;

      return CustomCropVariants.map((item) => (
        <CustomCropButtons
          customKey={`custom-crop-${item.titleKey}`}
          key={`${item.titleKey}-index`}
          isSelected={dynamicCropToolId === item.titleKey}
          item={item}
          t={t}
        />
      ));
    }

    return tabTools.map((id) => {
      const { Item, hideFn } = TOOLS_ITEMS[id];

      return (
        Item &&
        (!hideFn || !hideFn({ useCloudimage })) && (
          <Item
            key={id}
            selectTool={selectTool}
            t={t}
            isSelected={currentToolId === id}
          />
        )
      );
    });
  }, [tabTools, currentToolId, dynamicCropToolId]);

  const ToolOptionsComponent = useMemo(() => {
    if (!currentToolId) {
      return false;
    }

    if (currentTabId === TABS_IDS.ANNOTATE) {
      const selectionsLength = selectionsIds.length;
      if (selectionsLength === 1) {
        const selectedAnnotation = annotations[selectionsIds[0]];
        return TOOLS_ITEMS[selectedAnnotation.name]?.ItemOptions;
      }
      if (selectionsLength > 1) {
        return null;
      }
    }

    return (
      currentTabId &&
      currentToolId &&
      TABS_TOOLS[currentTabId].includes(currentToolId) &&
      (!TOOLS_ITEMS[toolId]?.hideFn ||
        !TOOLS_ITEMS[toolId]?.hideFn({ useCloudimage })) &&
      TOOLS_ITEMS[toolId]?.ItemOptions
    );
  }, [currentTabId, currentToolId, annotations, selectionsIds]);

  useEffect(() => {
    if (!toolId && currentToolId) {
      dispatch({
        type: SELECT_TOOL,
        payload: { toolId: currentToolId },
      });
    }
  }, []);

  return (
    <StyledToolsBar className="FIE_tools-bar-wrapper">
      {!upperToolbar && (
        <ToolsBarItemOptionsWrapper isPhoneScreen={isPhoneScreen}>
          {ToolOptionsComponent && <ToolOptionsComponent t={t} />}
        </ToolsBarItemOptionsWrapper>
      )}
      {items && (
        <StyledToolsBarItems
          className="FIE_tools-bar"
          isPhoneScreen={isPhoneScreen}
        >
          {currentTabId !== TABS_IDS.WATERMARK ? (
            <Carousel className="FIE_tools" style={style}>
              {items}
            </Carousel>
          ) : (
            items
          )}
        </StyledToolsBarItems>
      )}
    </StyledToolsBar>
  );
};

ToolsBar.defaultProps = {
  isPhoneScreen: false,
  dynamicButtons: false,
  upperToolbar: false,
};

ToolsBar.propTypes = {
  isPhoneScreen: PropTypes.bool,
  dynamicButtons: PropTypes.bool,
  upperToolbar: PropTypes.bool,
};

export default ToolsBar;
