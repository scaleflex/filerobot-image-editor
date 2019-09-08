import styled from 'styled-components';


const ResizeWrapper = styled.div`
  color: ${props => props.theme.colors.text.base};
  text-align: center;
`;

const ResizeBox = styled.div`
  display: inline-block;
  width: 300px;
  padding: 20px;
  height: 100px;
`;

const PreResizeActions = styled('div')`
  button {
    min-width: 240px;
  }
`;

const PreResizeWarning = styled('p')`
  color: #f7931e;
  font-size: 14px;
  max-width: 600px;
  line-height: 1.4;
  margin: 0 auto;
  background: #263138;
  border-radius: 4px;
  padding: 15px 15px 15px 55px;
  position: relative;
  font-weight: normal;
  text-align: left;
  
  :before {
    content: '\\e917';
    font-family: filerobot-image-editor-font;
    position: absolute;
    font-size: 20px;
    line-height: 20px;
    left: 20px;
    top: 50%;
    margin-top: -10px;
  }
`;

const PreResizeInner = styled('div')`
  max-width: 600px;
  margin: 15px auto;
  background: #263138;
  border-radius: 4px;
  padding: 15px;
  
  h4 {
    line-height: 1.4;
    font-size: 16px;
  }
`;

export { ResizeWrapper, ResizeBox, PreResizeActions, PreResizeWarning, PreResizeInner };