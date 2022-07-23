import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import { MenuOrScheduleEnum } from '../../utilities/types/enums';
import { FlexColumnFull, FlexColumn } from '../../styles/sharedStyles';
import COLORS from '../../styles/colors';

export const StyledCard = styled(FlexColumnFull)<{ id: MenuOrScheduleEnum }>`
  background: ${({ id }) =>
    id === MenuOrScheduleEnum.MENU ? COLORS.lightBlue : COLORS.lightRed};
  border-radius: 0.5rem;
  min-height: 12rem;
  padding: 1rem;
  max-width: 25rem;
`;

export const StyledCardsWrapper = styled.div`
  ${FlexColumn};
  gap: 2rem;
  width: 100%;
  padding: 1rem;
  min-height: 78%;
  margin-bottom: 10px;
  align-items: center;
`;

export const CenteredTypography = styled(Typography)`
  text-align: center;
`;

export const StyledCardUl = styled.ul`
  ${FlexColumn};
  margin-top: 0.8rem;
  align-self: flex-end;
  border: 1px sokid green;
`;

export const HomePageLink = styled(Link)`
  border-bottom: 1px solid ${COLORS.moveoLightBlue};
  width: fit-content;
`;
