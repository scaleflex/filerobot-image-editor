import styled from 'styled-components';

const StyledTabsNavbar = styled.div`
  min-width: 108px;
  height: 100%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  max-height: 100%;
  box-shadow: 6px 8px 12px 0px rgba(146, 166, 188, 0.14);

  [data-phone='true'] & {
    display: flex;
    padding: 0;
  }
`;

export { StyledTabsNavbar };
