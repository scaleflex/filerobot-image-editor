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

const BrowserScrollbarStyles = createGlobalStyle`
  .Menu-open {
    overflow: visible !important;
  }

  .${ROOT_CONTAINER_CLASS_NAME} * {
    scrollbar-color: rgba(203, 211, 218, 1) rgba(203, 211, 218, 0.35);

    &::-webkit-scrollbar {
      width: 4px;
      height: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(203, 211, 218, 0.35);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(203, 211, 218, 1);
      border-radius: 10px;
    }
  }
`;

const IconsColor = createGlobalStyle`
  :not(button) > svg:not([color]) {
    color: ${({ theme }) => theme.palette['icons-primary']}
  }
`;

export { FontsFaces, IconsColor, BrowserScrollbarStyles };
