/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import MenuItem from '@scaleflex/ui/core/menu-item';

/** Internal Dependencies */
import { useStore } from 'hooks';
import CropPresetGroup from './CropPresetGroup';

const CropPresetGroupsFolder = ({
  titleKey,
  Icon,
  groups,
  onItemSelect,
  prefixIconDimensions,
  t,
}) => {
  const {
    adjustments: {
      crop: { ratioFolderKey },
    },
  } = useStore();

  const onItemSelectFromFolder = (e, newRatio, cropProps) => {
    onItemSelect(e, newRatio, {
      ...cropProps,
      ratioFolderKey: titleKey,
    });
  };

  return (
    <MenuItem
      size="sm"
      list={[
        {
          content: t(titleKey),
          key: titleKey,
          active: titleKey === ratioFolderKey,
          prefix:
            Icon &&
            (typeof Icon === 'string' ? ( // eslint-disable-next-line react/no-danger
              <span dangerouslySetInnerHTML={{ __html: Icon }} />
            ) : (
              <Icon {...prefixIconDimensions} />
            )),
          subList: groups.map(({ titleKey: groupTitleKey, items }) => ({
            content: (
              <CropPresetGroup
                groupTitleKey={t(groupTitleKey)}
                t={t}
                items={items}
                onItemSelect={onItemSelectFromFolder}
              />
            ),
            key: groupTitleKey,
          })),
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
  prefixIconDimensions: PropTypes.instanceOf(Object).isRequired,
  Icon: PropTypes.oneOfType([
    PropTypes.elementType,
    PropTypes.string,
    PropTypes.instanceOf(HTMLElement),
  ]),
};

export default CropPresetGroupsFolder;
