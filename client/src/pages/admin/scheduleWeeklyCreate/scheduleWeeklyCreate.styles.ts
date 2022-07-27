import styled from 'styled-components';
import { Paper } from '@mui/material';
import { StyledUL, FlexRow } from '../../../styles/sharedStyles';
import COLORS from '../../../styles/colors';

export const ScheduleUl = styled(StyledUL)`
  padding: 0 0.5rem 0.5rem 0.5rem;

  @media only screen and (min-width: 500px) {
    align-items: center;
    text-align: left;
    padding: 1rem;
  }
`;

export const FinishButtonsPaper = styled(Paper)`
  ${FlexRow};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: space-between;
  padding-inline: 15%;
  padding-bottom: 20px;
  background: ${COLORS.lightGrey} !important;

  @media only screen and (min-width: 500px) {
    padding-inline: 25%;
  }
  @media only screen and (min-width: 800px) {
    padding-inline: 35%;
  }
`;
