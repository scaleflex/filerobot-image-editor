import styled from 'styled-components';


const Wrapper = styled.div`
  position: relative;
  background: ${props => props.theme.mainBackgroundColor};
  font-size: ${props => props.theme.textFontSize};
  z-index: 1050;
  width: 100%;
  height: 100%;
  min-height: 400px;
  scroll-y: auto;
`;

export { Wrapper };