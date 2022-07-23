import styled from 'styled-components';
import { FlexRowFull, FlexRow } from '../../../../../styles/sharedStyles';
import { Link } from 'react-router-dom';
import COLORS from '../../../../../styles/colors';

export const LinksWrapper = styled(FlexRowFull)`
  width: 100%;
  justify-content: space-between;

  @media only screen and (min-width: 600px) {
    width: 40%;
  }
`;

export const StyledScheduleLink = styled(Link)`
  ${FlexRow};
  padding: 0.6rem;
  border: 1px solid ${COLORS.moveoWhite};
  border-radius: 0.5rem;
`;
