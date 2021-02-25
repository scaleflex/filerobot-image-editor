import styled from 'styled-components';


const AdjustWrapper = styled.div`
  color: ${props => props.theme.colors.text};
  text-align: center;
  display: flex;
  justify-content: center;
  width: fit-content;
  margin: 0 auto;

  div {
    margin-left: 10px;
  }
  
  @media (max-width: 768px) {
    flex-wrap: wrap;
    
    .image-editor-range-wrapper {
      width: 50%;
      
      input {
        width: 100% !important;
      }
    }
  }
`;

export { AdjustWrapper };