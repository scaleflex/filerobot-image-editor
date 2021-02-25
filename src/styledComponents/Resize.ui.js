import styled from 'styled-components';


const ResizeWrapper = styled.div`
  color: ${props => props.theme.colors.text};
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ResizeBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: flex-end;
  padding: 8px 0 20px;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 500px;
    margin: 0;
  }
`;

const PreResizeActions = styled('div')`
  button {
    min-width: 240px;

    @media(max-width: 768px) {
      min-width: 174px;
    }
  }
`;

const PreResizeWarning = styled('p')`
  color: ${p => p.theme.colors.textWarn};
  font-size: 14px;
  max-width: 600px;
  line-height: 1.4;
  margin: 0 auto;
  background: ${p => p.theme.colors.secondaryBg};
  border-radius: 4px;
  padding: 15px 15px 15px 55px;
  position: relative;
  font-weight: normal;
  text-align: left;
  
  &:before {
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
  background: ${p => p.theme.colors.secondaryBg};
  border-radius: 4px;
  padding: 2px;
  
  h4 {
    line-height: 1.4;
    margin: 0;
    font-size: 16px;
    color: ${p => p.theme.colors.text};
  }
`;

const SuggestionsBox = styled('div')`
  display: inline-block;
`;

const SuggestionOption = styled('div')`
  display: inline-block;
  background: ${p => p.theme.colors.primaryBg};
  padding: 15px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  
  &:hover {
    background-color: ${p => p.theme.colors.primaryBgHover};
  }
`;

export {
  ResizeWrapper, ResizeBox, PreResizeActions, PreResizeWarning, PreResizeInner, SuggestionsBox, SuggestionOption
};
