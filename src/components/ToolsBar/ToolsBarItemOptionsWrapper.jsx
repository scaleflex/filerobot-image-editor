/** External Dependencies */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledToolsBarItemOptionsWrapper } from './ToolsBar.styles';

const ToolsBarItemOptionsWrapper = ({ children }) => {
  const [prevChildren, setPrevChildren] = useState(children);

  useEffect(() => {
    if (!children) {
      setTimeout(
        () => {
          setPrevChildren(null);
        },
        0.15, // 0.15 = 0.15s of CSS animation/transition.
      );
    } else {
      setPrevChildren(children);
    }
  }, [children]);

  return (
    <StyledToolsBarItemOptionsWrapper hasChildren={Boolean(children)}>
      {prevChildren}
    </StyledToolsBarItemOptionsWrapper>
  );
};

ToolsBarItemOptionsWrapper.defaultProps = {
  children: undefined,
};

ToolsBarItemOptionsWrapper.propTypes = {
  children: PropTypes.node,
};

export default ToolsBarItemOptionsWrapper;
