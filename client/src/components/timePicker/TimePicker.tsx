import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TextField from '@mui/material/TextField';
import { TimePickerContainer } from './timePicker.styles';
import { DateInputType } from '../../utilities/types/types';

export interface ITimePickerProps {
  selectedTimeDate: DateInputType;
  toggleTimePicker: () => void;
  handleTimeDateChange: (value: DateInputType) => void;
  isTimePickerOpen: boolean;
  setIsTimePickerOpen: (bool: boolean) => void;
}

const TimePickerComponent = ({
  handleTimeDateChange,
  isTimePickerOpen,
  toggleTimePicker,
  selectedTimeDate,
  setIsTimePickerOpen,
}: ITimePickerProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileTimePicker
        ampm={false}
        ampmInClock={true}
        value={selectedTimeDate}
        open={isTimePickerOpen}
        onOpen={toggleTimePicker}
        onClose={toggleTimePicker}
        onChange={(newValue) => {
          handleTimeDateChange(newValue);
        }}
        InputProps={{
          disableUnderline: true,
        }}
        renderInput={(params) => (
          <TimePickerContainer onClick={() => setIsTimePickerOpen(true)}>
            {selectedTimeDate ? '' : 'Time'}
            <TextField
              variant='standard'
              {...params}
              inputProps={{
                ...params.inputProps,
                placeholder: '',
                readOnly: true,
                sx: {
                  cursor: 'pointer',
                  display: !selectedTimeDate && 'none',
                  padding: 0,
                },
              }}
            />
            <AccessTimeIcon />
          </TimePickerContainer>
        )}
      />
    </LocalizationProvider>
  );
};

export default TimePickerComponent;
