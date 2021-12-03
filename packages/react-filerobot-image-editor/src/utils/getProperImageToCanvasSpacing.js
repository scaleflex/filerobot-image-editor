const SPACING_PERCENTAGE = 0.05;
const DEFAULT_SPACING = 12;

const getProperImageToCanvasSpacing = () =>
  (window
    ? Math.min(window.innerHeight, window.innerWidth) * SPACING_PERCENTAGE
    : DEFAULT_SPACING) * 2;

export default getProperImageToCanvasSpacing;
