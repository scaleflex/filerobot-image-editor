import styled from 'styled-components';

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @-moz-keyframes rotate {
    100% {
      -moz-transform: rotate(360deg);
    }
  }

  @-webkit-keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
    }
  }

  @keyframes rotate {
    100% {
      -webkit-transform: rotate(360deg);
      transform:rotate(360deg);
    }
  }

  svg {
    -webkit-animation: rotate 2s linear infinite;
    -moz-animation: rotate 2s linear infinite;
    animation: rotate 2s linear infinite;
  }
`;

export {
  StyledLoading,
};
