/** External Dependencies */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Color as PC } from '@scaleflex/ui/utils/types/palette';

/** Internal Dependencies */
import { useStore } from 'hooks';
import CropPresetGroup from './CropPresetGroup';
import { StyledMenuItem, StyledMenuItemIcon } from './Crop.styled';

const CropPresetGroupsFolder = ({
  titleKey,
  Icon,
  theme,
  groups,
  onItemSelect,
  t,
}) => {
  const {
    adjustments: {
      crop: { ratioFolderKey, ratioGroupKey },
    },
  } = useStore();
  const [expandedGroup, setExpandedGroup] = useState('');

  const onItemSelectFromFolder = (e, newRatio, cropProps) => {
    onItemSelect(e, newRatio, {
      ...cropProps,
      ratioFolderKey: titleKey,
    });
  };

  return (
    <StyledMenuItem
      isListItem
      list={[
        {
          content: t(titleKey),
          key: titleKey,
          active: titleKey === ratioFolderKey,
          prefix: Icon && (
            <StyledMenuItemIcon>
              {typeof Icon === 'string' ? ( // eslint-disable-next-line react/no-danger
                <span dangerouslySetInnerHTML={{ __html: Icon }} />
              ) : (
                <Icon color={theme.palette['icon-primary']} />
              )}
            </StyledMenuItemIcon>
          ),
          subList: groups.map(({ titleKey: groupTitleKey, items }) => ({
            content: (
              <CropPresetGroup
                groupTitleKey={groupTitleKey}
                setExpandedGroup={setExpandedGroup}
                isExpanded={
                  expandedGroup === ''
                    ? ratioGroupKey === groupTitleKey
                    : expandedGroup === groupTitleKey
                }
                t={t}
                items={items}
                onItemSelect={onItemSelectFromFolder}
              />
            ),
            key: groupTitleKey,
            disableHover: true,
          })),
          subMenuProps: {
            style: { backgroundColor: theme.palette[PC.BackgroundStateless] },
          },
        },
      ]}
    />
  );
};

CropPresetGroupsFolder.defaultProps = {
  Icon: undefined,
};

CropPresetGroupsFolder.propTypes = {
  titleKey: PropTypes.string.isRequired,
  groups: PropTypes.instanceOf(Array).isRequired,
  onItemSelect: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
  theme: PropTypes.instanceOf(Object).isRequired,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
};

export default CropPresetGroupsFolder;
