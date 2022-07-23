import { useState } from 'react';
import ScheduleNav from './components/schedulePageNav/SchedulePageNav';
import { DateInputType } from '../../../utilities/types/types';
import { MenuOrScheduleEnum } from '../../../utilities/types/enums';

// const mockSchedule = [
//   { name: 'A', time: '12:15' },
//   { name: 'B', time: '12:30' },
//   { name: 'C', time: '12:45' },
// ];

export interface ISchedulePageProps {
  location: MenuOrScheduleEnum;
}

const SchedulePage = ({ location }: ISchedulePageProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [selectedWeekDate, setSelectedWeekDate] = useState<DateInputType>(null); //week of ... (some date)
  const [startWeekDate, setStartWeekDate] = useState<DateInputType>(null); //the actual date of the first day of that week

  const handleDateChange = (newValue: DateInputType) => {
    if (newValue) {
      setSelectedWeekDate(newValue);
    } else {
      setSelectedWeekDate(null);
    }
  };

  const toggleDatePicker = () => {
    setIsDatePickerOpen(!isDatePickerOpen);
  };

  return (
    <>
      <ScheduleNav
        location={location}
        toggleDatePicker={toggleDatePicker}
        handleDateChange={handleDateChange}
        isDatePickerOpen={isDatePickerOpen}
        selectedDate={selectedWeekDate}
        setIsDatePickerOpen={setIsDatePickerOpen}
      />
    </>
  );
};

export default SchedulePage;
