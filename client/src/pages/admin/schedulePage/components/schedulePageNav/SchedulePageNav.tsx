import { useLocation } from 'react-router-dom';
import Nav, { IAdminNavWithDate } from '../../../../../components/nav/Nav';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';

import { StyledScheduleLink } from './schedulePageNav.styles';
import {
  UppercasedTypography,
  NavBarContentWrapper,
} from '../../../../../styles/sharedStyles';

const ScheduleNav = ({ location }: IAdminNavWithDate) => {
  const urlLocation = useLocation();
  const pathname = urlLocation.pathname;
  const isScheduleMain = pathname === '/admin/schedule' ? true : false;

  return (
    <Nav location={location}>
      <NavBarContentWrapper>
        <UppercasedTypography variant='h5' sx={{ fontWeight: 600 }}>
          {location}
        </UppercasedTypography>
        {isScheduleMain && (
          <>
            <StyledScheduleLink to={'/admin/schedule/weekly'}>
              <UppercasedTypography>Edit/create</UppercasedTypography>
              <ArrowForwardRoundedIcon />
            </StyledScheduleLink>
            <StyledScheduleLink to={'/admin/schedule/history'}>
              <UppercasedTypography>See history</UppercasedTypography>
              <ArrowForwardRoundedIcon />
            </StyledScheduleLink>
          </>
        )}
        {/* {isScheduleWeekly && (
          <>
            <Typography sx={{ textAlign: 'center' }}>
              Pick a {DayWeekEnum.WEEK} to see history
            </Typography>
            <DatePickerWeek
              toggleDatePicker={toggleDatePicker}
              handleDateChange={handleDateChange}
              isDatePickerOpen={isDatePickerOpen}
              selectedDate={selectedDate}
              setIsDatePickerOpen={setIsDatePickerOpen}
            />
          </>
        )} */}
      </NavBarContentWrapper>
    </Nav>
  );
};

export default ScheduleNav;
