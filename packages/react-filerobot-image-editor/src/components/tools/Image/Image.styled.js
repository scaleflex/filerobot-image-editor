/** External Dependencies */
import styled from 'styled-components';

const StyledImagesGallery = styled.div`
  background: ${({ theme }) => theme.palette['bg-secondary']};
  box-shadow: 0px 1px 2px ${({ theme }) => theme.palette['light-shadow']};
  border-radius: 4px;
  padding: 8px;
  overflow-y: auto;
  max-height: 350px;
  max-width: 300px;
`;

const StyledImageWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  margin: 4px;
  padding: 4px;
  cursor: pointer;
  border-radius: 4px;
  border: 2px solid ${({ theme }) => theme.palette['bg-primary-active']};
  user-select: none;

  :hover {
    border-color: ${({ theme }) => theme.palette['accent-primary-active']};
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export { StyledImagesGallery, StyledImageWrapper };
