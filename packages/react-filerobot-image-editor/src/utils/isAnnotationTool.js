import { TABS_TOOLS } from 'components/tools/tools.constants';
import { TABS_IDS } from './constants';

const isAnnotationTool = (toolId) =>
  TABS_TOOLS[TABS_IDS.ANNOTATE].includes(toolId);

export default isAnnotationTool;
