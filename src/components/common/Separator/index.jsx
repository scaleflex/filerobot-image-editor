/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledSeparator } from './Separator.styled';

const Separator = ({ height, width }) => (
  <StyledSeparator height={height} width={width} />
);

Separator.defaultProps = {
  height: '11px',
  width: '1px',
};

Separator.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Separator;
