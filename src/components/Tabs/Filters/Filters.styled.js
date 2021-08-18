import styled from 'styled-components';

const StyledFiltersWrapper = styled.div`
  padding: 16px 0;
  white-space: nowrap;
  width: 100%;
  overflow: auto;
`;

const StyledFilterItem = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 8px;
  cursor: pointer;
`;

const FilterItemPreview = styled.div`
  border: 0.5px solid rgba(0, 0, 0, 0.15);
`;

const FilterItemLabel = styled.div`
  margin-top: 6px;
  font-size: 11px;
  line-height: 12px;
`;

export {
  StyledFiltersWrapper,
  StyledFilterItem,
  FilterItemPreview,
  FilterItemLabel,
}
