/** External Dependencies */
import styled from 'styled-components';

const StyledWatermarkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;
`;

const StyledControlsWrapper = styled.div`
  margin-bottom: 8px;
`;

const StyledWatermarkGalleryItem = styled.div(
  ({ theme }) => `
    padding: 4px;
    border: 1px solid ${theme.palette['borders-primary']};
    width: fit-content;
    height: 32px;
    border-radius: 2px;
    overflow: hidden;
    cursor: pointer;

    :hover {
      background-color: #ecf3ff; // TODO(Styles): Add this color to the theme and consider dark color for it.
    }

    &[aria-selected='true'] {
      background-color: #ecf3ff; // TODO(Styles): Add this color to the theme and consider dark color for it.
      border-color: ${theme.palette['accent-primary-active']};
    }

    img {
      max-width: 100%;
      max-height: 100%;
    }
  `,
);

export {
  StyledWatermarkWrapper,
  StyledControlsWrapper,
  StyledWatermarkGalleryItem,
};
