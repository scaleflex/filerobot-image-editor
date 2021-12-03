/** External Dependencies */
import { createGlobalStyle } from 'styled-components';

/** Internal Dependencies */
import { ROOT_CONTAINER_CLASS_NAME } from 'utils/constants';

const FontsFaces = createGlobalStyle`
  .${ROOT_CONTAINER_CLASS_NAME} {
    font-family: ${({ theme = {} }) => theme.typography?.fontFamily || 'Arial'};
    box-sizing: border-box;
  }

  .SfxModal-Wrapper * {
    font-family: ${({ theme = {} }) => theme.typography?.fontFamily || 'Arial'};
  }
`;

const IconsColor = createGlobalStyle`
  :not(button) > svg:not([color]) {
    color: ${({ theme }) => theme.palette['icons-primary']}
  }
`;

export { FontsFaces, IconsColor };
