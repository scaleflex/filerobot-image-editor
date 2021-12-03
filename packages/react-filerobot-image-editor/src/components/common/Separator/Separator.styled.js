import styled from 'styled-components';

const StyledSeparator = styled.div`
  display: inline-block;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 1px;
  background: #dfe7ed;
`;

export { StyledSeparator };
