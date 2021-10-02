/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledToolsBarItemOptionsWrapper } from './ToolsBar.styles';

const ToolsBarItemOptionsWrapper = ({ children }) => (
  <StyledToolsBarItemOptionsWrapper hasChildren={Boolean(children)}>
    {children}
  </StyledToolsBarItemOptionsWrapper>
);

ToolsBarItemOptionsWrapper.defaultProps = {
  children: undefined,
};

ToolsBarItemOptionsWrapper.propTypes = {
  children: PropTypes.node,
};

export default ToolsBarItemOptionsWrapper;
