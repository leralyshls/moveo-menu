import styled from 'styled-components';
import { StyledUL, FlexRow } from '../../../styles/sharedStyles';

export const ScheduleUl = styled(StyledUL)`
  height: 25vh;
  padding: 0.5rem;

  @media only screen and (min-width: 500px) {
    align-items: center;
    text-align: left;
    padding: 1rem;
  }
`;

export const FinishButtonsWrapper = styled.div`
  ${FlexRow};
  width: 70%;
  justify-content: space-between;

  @media only screen and (min-width: 500px) {
    width: 50%;
  }
  @media only screen and (min-width: 800px) {
    width: 30%;
  }
`;
