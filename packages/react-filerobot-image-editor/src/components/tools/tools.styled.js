/** External Dependencies */
import { Label } from '@scaleflex/ui/core';
import styled from 'styled-components';
import { FontVariant as FV } from '@scaleflex/ui/utils/types/typography';

const StyledSliderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledSliderLabel = styled(Label)`
  ${({ theme }) => theme.typography.font[FV.LabelExtraSmallUp]};
`;

export { StyledSliderContainer, StyledSliderLabel };
