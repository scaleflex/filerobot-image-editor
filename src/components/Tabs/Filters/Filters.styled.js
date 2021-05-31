import styled from 'styled-components';

const StyledFiltersWrapper = styled.div`
  padding: 16px 0;
`;

const StyledFilterItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 40px;
    height: 40px;
  }
`;

const FilterItemLabel = styled.div`
  margin-top: 6px;
  font-size: 11px;
  line-height: 12px;
`;

export {
  StyledFiltersWrapper,
  StyledFilterItem,
  FilterItemLabel,
}
