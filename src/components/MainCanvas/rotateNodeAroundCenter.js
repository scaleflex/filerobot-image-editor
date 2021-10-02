/* eslint-disable no-underscore-dangle */
import Konva from 'konva';

const rotatePoint = ({ x, y }, rad) => {
  const rcos = Math.cos(rad);
  const rsin = Math.sin(rad);

  return {
    x: x * rcos - y * rsin,
    y: y * rcos + x * rsin,
  };
};

// for nodes with top-left origin, like rectangle
const rotateNodeAroundCenter = (node, rotation) => {
  // current rotation origin (0, 0)
  // relative to desired origin - center (node.width()/2, node.height()/2)
  const nodeScale = node.scale() || { x: 1, y: 1 };
  const topLeft = {
    x: (-node.width() * nodeScale.x) / 2,
    y: (-node.height() * nodeScale.y) / 2,
  };
  const current = rotatePoint(topLeft, Konva.getAngle(node.rotation()));
  const rotated = rotatePoint(topLeft, Konva.getAngle(rotation));
  const dx = rotated.x - current.x;
  const dy = rotated.y - current.y;

  node._setAttr('rotation', rotation);
  node._setAttr('x', node.x() + dx);
  node._setAttr('y', node.y() + dy);

  return node;
};

export default rotateNodeAroundCenter;
