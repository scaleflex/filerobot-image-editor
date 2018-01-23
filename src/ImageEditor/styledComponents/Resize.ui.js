import styled from 'styled-components';


const ResizeWrapper = styled.div`
  color: ${props => props.theme.textColor};
  text-align: center;
`;

const ResizeBox = styled.div`
  display: inline-block;
  width: 300px;
  padding: 20px;
  height: 100px;
`;


export { ResizeWrapper, ResizeBox }