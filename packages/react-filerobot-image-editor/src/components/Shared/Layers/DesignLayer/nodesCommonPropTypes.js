import PropTypes from 'prop-types';

const nodesCommonPropTypes = {
  definitions: {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rotation: PropTypes.number,
    scaleX: PropTypes.number,
    scaleY: PropTypes.number,
    stroke: PropTypes.string,
    strokeWidth: PropTypes.number,
    shadowOffsetX: PropTypes.number,
    shadowOffsetY: PropTypes.number,
    shadowBlur: PropTypes.number,
    shadowColor: PropTypes.string,
    shadowOpacity: PropTypes.number,
    opacity: PropTypes.number,
  },
};

export default nodesCommonPropTypes;
