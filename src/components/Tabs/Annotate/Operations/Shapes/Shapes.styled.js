import styled from 'styled-components';

const ShapesWrapper = styled.div`
  display: flex;
  text-align: center;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;

  ${props => props.alignCenter
    ? `
      margin: 0 auto;
      width: fit-content;
    `
    : undefined}
`;

export {
  ShapesWrapper,
}