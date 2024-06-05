/** External Dependencies */
import React from 'react';
import PropTypes from 'prop-types';

/** Internal Dependencies */
import { StyledSeparator } from './Separator.styled';

const Separator = ({ height = '24px', width = '1px' }) => (
  <StyledSeparator height={height} width={width} />
);

Separator.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
};

export default Separator;
