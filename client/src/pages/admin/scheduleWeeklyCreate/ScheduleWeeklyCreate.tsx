import { useState } from 'react';
import { useQuery } from 'react-query';
import { Typography } from '@mui/material';
import Nav from '../../../components/nav/Nav';
import TimePicker from '../../../components/timePicker/TimePicker';
import VerticalStepper from './components/stepper/VerticalStepper';
import AddNewScheduleSlot from './components/addNewScheduleSlot/AddNewScheduleSlot';
import ScheduleList from './components/scheduleList/ScheduleList';
import { DateInputType } from '../../../utilities/types/types';
import { getAllTeams } from '../../../services/scheduleService';
import { isDuplicateTeam } from '../../../utilities/isDuplicateTeam';
import { notify } from '../../../utilities/notifyWithToast';
import {
  ApiResStatusEnum,
  MenuOrScheduleEnum,
} from '../../../utilities/types/enums';
import { addMinutes } from 'date-fns';
import { getTime } from '../../../utilities/dateHelpers';

import {
  NavBarContentWrapper,
  UppercasedTypography,
  StyledAdminPageContainer,
  FlexColumnFull,
  FlexRowFull,
  StyledMainButton,
} from '../../../styles/sharedStyles';
import { FinishButtonsPaper } from './scheduleWeeklyCreate.styles';
import COLORS from '../../../styles/colors';

export interface IScheduleWeeklyCreate {
  location: MenuOrScheduleEnum;
}

export interface ITeamDuration {
  name: string;
  duration: string;
}

const ScheduleWeeklyCreate = ({ location }: IScheduleWeeklyCreate) => {
  const [isStepperVisible, setIsStepperVisible] = useState<boolean>(false);
  const [stepperActiveStep, setStepperActiveStep] = useState<number>(0);
  const [isCanCreate, setIsCanCreate] = useState<boolean>(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState<boolean>(false);
  const [selectedTimeDate, setSelectedTimeDate] = useState<DateInputType>(null);
  const [teamsOrder, setTeamsOrder] = useState<ITeamDuration[]>([]);
  const [scheduleTimes, setScheduleTimes] = useState<Date[]>([]);
  const [timeStrings, setTimeStrings] = useState<string[]>([]);
  const teamsQuery = useQuery('teams', getAllTeams);

  const handleTimeDateChange = (newValue: DateInputType) => {
    if (scheduleTimes.length === 0 && newValue) {
      setSelectedTimeDate(newValue);
      setIsStepperVisible(true);
    } else {
      setSelectedTimeDate(null);
      setIsStepperVisible(false);
    }
  };

  const toggleTimePicker = () => {
    setIsTimePickerOpen(!isTimePickerOpen);
  };

  const handleAddTimeSlot = (duration: string, teams: string) => {
    if (isDuplicateTeam(teams, teamsOrder)) {
      notify.error('Duplicate team, try again');
      return;
    }
    setTeamsOrder((teamsOrder) => [...teamsOrder, { name: teams, duration }]);
  };

  const handleAddTime = () => {
    if (selectedTimeDate) {
      let newDate: any;
      if (scheduleTimes.length < 1) {
        newDate = selectedTimeDate;
        setScheduleTimes((scheduleTimes) => [...scheduleTimes, newDate]);
      } else {
        newDate = addMinutes(
          scheduleTimes[scheduleTimes.length - 1],
          Number(teamsOrder[scheduleTimes.length - 1].duration)
        );
        setScheduleTimes((scheduleTimes) => [...scheduleTimes, newDate]);
      }
      setTimeStrings((timeStrings) => [...timeStrings, getTime(newDate)]);
    }
  };

  const handleSaveSchedule = () => {
    console.log(teamsOrder);
    notify.success('The schedule was saved successfully');
  };

  const handleClearList = () => {
    setTeamsOrder([]);
    setScheduleTimes([]);
    setTimeStrings([]);
  };

  return (
    <>
      <Nav location={location}>
        <NavBarContentWrapper>
          <UppercasedTypography variant='h5' sx={{ fontWeight: 600 }}>
            {location}
          </UppercasedTypography>
          <Typography sx={{ textAlign: 'center', fontSize: '18px' }}>
            When does the lunch start?
          </Typography>
          <TimePicker
            handleTimeDateChange={handleTimeDateChange}
            toggleTimePicker={toggleTimePicker}
            selectedTimeDate={selectedTimeDate}
            isTimePickerOpen={isTimePickerOpen}
            setIsTimePickerOpen={setIsTimePickerOpen}
            disabled={scheduleTimes.length > 0}
          />
        </NavBarContentWrapper>
      </Nav>
      <StyledAdminPageContainer>
        {selectedTimeDate && (
          <FlexColumnFull>
            <FlexRowFull
              style={{
                marginBottom: '1.5rem',
                justifyContent: 'center',
              }}
            >
              {isStepperVisible && stepperActiveStep !== 3 && (
                <VerticalStepper
                  isVisible={isStepperVisible}
                  setIsVisible={setIsStepperVisible}
                  setIsCanCreate={setIsCanCreate}
                  activeStep={stepperActiveStep}
                  setActiveStep={setStepperActiveStep}
                />
              )}
            </FlexRowFull>
            {teamsQuery.status === ApiResStatusEnum.SUCCESS && isCanCreate && (
              <>
                <AddNewScheduleSlot
                  teams={teamsQuery.data}
                  handleAddTimeSlot={handleAddTimeSlot}
                  handleAddTime={handleAddTime}
                />
                <ScheduleList
                  teamsOrder={teamsOrder}
                  timeStrings={timeStrings}
                />
              </>
            )}
            {teamsQuery.status === ApiResStatusEnum.ERROR && (
              <Typography variant='body1' sx={{ textAlign: 'center' }}>
                Sorry, something went wrong, try again later
              </Typography>
            )}
          </FlexColumnFull>
        )}

        {isCanCreate && teamsQuery.status === ApiResStatusEnum.SUCCESS && (
          <FinishButtonsPaper elevation={3}>
            <StyledMainButton
              variant='contained'
              onClick={handleClearList}
              sx={{
                justifySelf: 'flex-end',
                background: `${COLORS.moveoRed} !important`,
              }}
            >
              Clear
            </StyledMainButton>
            <StyledMainButton
              variant='contained'
              onClick={handleSaveSchedule}
              sx={{ justifySelf: 'flex-end' }}
            >
              Save
            </StyledMainButton>
          </FinishButtonsPaper>
        )}
      </StyledAdminPageContainer>
    </>
  );
};

export default ScheduleWeeklyCreate;
