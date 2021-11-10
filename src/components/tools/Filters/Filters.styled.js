/** External Dependencies */
import { Stage } from 'react-konva';
import styled from 'styled-components';

const StyledFilterItem = styled.div(
  ({ theme }) => `
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 0 4px;
    padding: 2px;
    cursor: pointer;
    border-radius: 2px;
    ${(props) =>
      props.active &&
      `
        background-color: ${theme.palette['bg-primary-active']};
        color: ${theme.palette['txt-primary-invert']};
    `};
  `,
);

const FilterItemPreview = styled(Stage)`
  border: 0.5px solid rgba(0, 0, 0, 0.15);
`;

const FilterItemLabel = styled.div`
  margin-top: 6px;
  font-size: 11px;
  line-height: 12px;
`;

export { StyledFilterItem, FilterItemPreview, FilterItemLabel };
