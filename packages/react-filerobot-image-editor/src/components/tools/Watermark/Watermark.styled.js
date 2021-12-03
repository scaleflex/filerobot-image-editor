/** External Dependencies */
import styled from 'styled-components';

const StyledWatermarkWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  overflow: hidden;

  ${({ noWrap }) => (noWrap ? 'margin-left: 4px; flex-wrap: nowrap;' : '')};
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
      background: ${theme.palette['bg-primary-active']};
    }

    &[aria-selected='true'] {
      background: ${theme.palette['bg-primary-active']};
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
