/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Accordion from '@scaleflex/ui/core/accordion';

/** Internal Dependencies */
import toPrecisedFloat from 'utils/toPrecisedFloat';
import { useStore } from 'hooks';
import CropPresetItem from './CropPresetItem';

const CropPresetGroup = ({ groupTitleKey, items, onItemSelect, t }) => {
  const {
    adjustments: {
      crop: { ratio: currentRatio, ratioGroupKey },
    },
  } = useStore();
  const [isExpanded, setIsExpanded] = useState(ratioGroupKey === groupTitleKey);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const onItemSelectFromGroup = (e, newRatio, cropProps) => {
    onItemSelect(e, newRatio, {
      ...cropProps,
      ratioGroupKey: groupTitleKey,
    });
  };

  return (
    <Accordion
      label={t(groupTitleKey)}
      onChange={toggleExpand}
      expanded={isExpanded}
    >
      {items.map(({ titleKey, ratio, width, height, descriptionKey, icon }) => {
        const newRatio = ratio ?? toPrecisedFloat(width / height);

        return (
          <CropPresetItem
            key={titleKey}
            title={t(titleKey)}
            description={t(descriptionKey)}
            size="sm"
            onClick={onItemSelectFromGroup}
            width={width}
            height={height}
            ratio={newRatio}
            Icon={icon}
            isActive={
              currentRatio === newRatio && ratioGroupKey === groupTitleKey
            }
          />
        );
      })}
    </Accordion>
  );
};

CropPresetGroup.propTypes = {
  groupTitleKey: PropTypes.string.isRequired,
  items: PropTypes.instanceOf(Array).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default CropPresetGroup;
