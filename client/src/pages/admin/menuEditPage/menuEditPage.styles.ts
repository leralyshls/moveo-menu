import styled from 'styled-components';
import { FlexColumn } from '../../../styles/sharedStyles';

export const MenuPageContentWrapper = styled.div<{ shouldHaveHight: number }>`
  ${FlexColumn};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  height: ${({ shouldHaveHight }) => (shouldHaveHight < 1 ? '300px' : '')};
`;
