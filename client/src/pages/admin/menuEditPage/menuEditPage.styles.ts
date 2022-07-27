import styled from 'styled-components';
import { Paper } from '@mui/material';
import { FlexColumn, FlexRow } from '../../../styles/sharedStyles';
import COLORS from '../../../styles/colors';

export const MenuPageContentWrapper = styled.div<{ shouldHaveHight: number }>`
  ${FlexColumn};
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 1.5rem;
  height: ${({ shouldHaveHight }) => (shouldHaveHight < 1 ? '300px' : '')};
`;

export const SaveButtonPaper = styled(Paper)`
  ${FlexRow};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  padding-inline: 15%;
  padding-bottom: 20px;
  background: ${COLORS.lightGrey} !important;
`;
