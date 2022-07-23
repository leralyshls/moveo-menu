import { useEffect, useState, MouseEvent } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { getHours } from 'date-fns';
import startOfWeek from 'date-fns/startOfWeek';
import Typography from '@mui/material/Typography';
import Logo from '../../components/logo/Logo';
import { getMenuForADay } from '../../services/menuService';
import { getWeeklySchedule } from '../../services/scheduleService';
import {
  formatToISO,
  formatDateHomePage,
  isWeekend,
} from '../../utilities/dateHelpers';
import { addDays, nextSunday } from 'date-fns';
import { urls } from '../../components/notFound/notFound.utils';
import { isRTLCheck } from '../../utilities/isRTL';

import {
  MenuOrScheduleEnum,
  ErrorVariantsEnum,
} from '../../utilities/types/enums';
import {
  StyledPageContainer,
  UppercasedTypography,
} from '../../styles/sharedStyles';
import {
  StyledCard,
  StyledCardsWrapper,
  CenteredTypography,
  StyledCardUl,
  HomePageLink,
} from './homePage.styles';
import COLORS from '../../styles/colors';

const HomePage = () => {
  const [day, setDay] = useState<Date>(new Date());
  const [ISODay, setISODay] = useState<string>(formatToISO(day));

  const navigate = useNavigate();

  const weekStart = startOfWeek(day);
  const ISOWeekStart = formatToISO(weekStart);

  // get menu for today in the morning, for tomorrow in the evening, on the weekend - the menu for sunday
  useEffect(() => {
    if (isWeekend(day)) {
      const sunday = nextSunday(day);
      setDay(sunday);
      setISODay(formatToISO(sunday));
    } else {
      const hour = getHours(day);
      if (hour >= 15) {
        const tomorrow = addDays(day, 1);
        setDay(tomorrow);
        setISODay(formatToISO(tomorrow));
      }
    }
  }, [day]);

  const menuQuery = useQuery(['menu', ISODay], () => getMenuForADay(ISODay));
  const scheduleQuery = useQuery(['schedule', ISOWeekStart], () =>
    getWeeklySchedule(ISOWeekStart)
  );

  const handleAdminEnter = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault();
    const isPassword = localStorage.getItem('admin');
    if (isPassword) {
      const isAuthenticated = JSON.parse(isPassword);
      if (isAuthenticated === process.env.REACT_APP_ADMIN_PASSWORD) {
        navigate('/admin');
      }
    } else {
      const adminInput = window.prompt('Please enter the password:');
      if (adminInput === process.env.REACT_APP_ADMIN_PASSWORD) {
        localStorage.setItem('admin', JSON.stringify(adminInput));
        navigate('/admin');
      }
    }
  };

  return (
    <StyledPageContainer>
      <Logo />
      <StyledCardsWrapper>
        <CenteredTypography variant='h5' sx={{ mt: 2, fontWeight: '600' }}>
          {formatDateHomePage(day)}
        </CenteredTypography>
        <StyledCard id={MenuOrScheduleEnum.SCHEDULE}>
          <UppercasedTypography
            variant='h6'
            sx={{ color: `${COLORS.moveoRed}`, fontWeight: '600' }}
          >
            {MenuOrScheduleEnum.SCHEDULE}
          </UppercasedTypography>
          {scheduleQuery.data === ErrorVariantsEnum.NO_SCHEDULE ? (
            <CenteredTypography sx={{ my: 1.5 }}>
              The schedule was not posted
            </CenteredTypography>
          ) : (
            <StyledCardUl>
              {scheduleQuery?.data?.data?.orderTeams.map(
                (team: string, index: number) => (
                  <li key={team}>
                    {scheduleQuery?.data?.data?.timeSlots[index]} ⎻ {team}
                  </li>
                )
              )}
            </StyledCardUl>
          )}
        </StyledCard>

        <StyledCard id={MenuOrScheduleEnum.MENU}>
          <UppercasedTypography
            variant='h6'
            sx={{ color: `${COLORS.moveoLightBlue}`, fontWeight: '600' }}
          >
            {MenuOrScheduleEnum.MENU}
          </UppercasedTypography>
          {menuQuery.data === ErrorVariantsEnum.NO_MENU ? (
            <>
              <Typography sx={{ my: 1.5 }}>The menu was not posted</Typography>
              <img
                src={urls[ErrorVariantsEnum.NO_MENU]}
                alt={`${ErrorVariantsEnum.NO_MENU}`}
                width={180}
                style={{ borderRadius: '0.25rem' }}
              />
            </>
          ) : (
            <StyledCardUl
              dir={isRTLCheck(menuQuery?.data?.data?.menu[0]).textDir}
            >
              {menuQuery?.data?.data?.menu.map((item: string) => (
                <li key={item}>
                  <Typography>⎻ {item}</Typography>
                </li>
              ))}
            </StyledCardUl>
          )}
        </StyledCard>
      </StyledCardsWrapper>
      <HomePageLink to='/admin' onClick={handleAdminEnter}>
        Admin Page
      </HomePageLink>
    </StyledPageContainer>
  );
};

export default HomePage;
