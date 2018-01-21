import styled from 'styled-components';


const PreviewWrapper = styled.div`
  height: calc(100% - 140px);
  text-align: center;
  line-height: calc(100% - 140px);
  padding: 20px;
  
  :before {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
`;

const PreviewImg = styled.img`
  display: inline-block;
  max-height: 100%;
  max-width: 100%;
  vertical-align: middle;
`;

export { PreviewWrapper, PreviewImg }