/** External Dependencies */
import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Transformer } from 'react-konva';

/** Internal Dependencies */
import AppContext from 'context';

const NodesTransformer = ({ designLayer }) => {
  const { selectionsIds = [], theme } = useContext(AppContext);

  const selections = useMemo(
    () =>
      designLayer.findOne
        ? selectionsIds.map((selectionId) =>
            designLayer.findOne(`#${selectionId}`),
          )
        : [],
    [selectionsIds],
  );

  // ALT is used to center scaling
  // SHIFT is used to scaling with keeping ratio
  return (
    <Transformer
      centeredScaling={false}
      rotationSnaps={[0, 45, 90, 135, 180, 225, 270, 315]}
      nodes={selections}
      rotateAnchorOffset={25}
      anchorSize={11}
      anchorCornerRadius={5}
      padding={1}
      borderDash={[3, 20, 7]}
      ignoreStroke={false}
      anchorStroke={theme.palette['borders-strong']}
      anchorFill={theme.palette['accent-primary']}
      borderStroke={theme.palette['access-primary']}
      flipEnabled
    />
  );
};

NodesTransformer.defaultProps = {
  designLayer: {},
};

NodesTransformer.propTypes = {
  designLayer: PropTypes.instanceOf(Object),
};

export default NodesTransformer;
