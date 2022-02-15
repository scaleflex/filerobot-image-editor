/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledToolsBarItemOptionsWrapper } from './ToolsBar.styled';

const ToolsBarItemOptionsWrapper = ({ children }) => (
  <StyledToolsBarItemOptionsWrapper
    className="FIE_tool-options-wrapper"
    hasChildren={Boolean(children)}
  >
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
