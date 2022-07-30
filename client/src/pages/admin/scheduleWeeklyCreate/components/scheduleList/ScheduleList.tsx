import { ScheduleUl } from './scheduleList.styles';
import { Typography } from '@mui/material';
import { ITeamDuration } from '../../ScheduleWeeklyCreate';
import { ListContentWrapper } from '../../../menuEditPage/components/editableListItem/editableLi.styles';
import { TextDirEnum } from '../../../../../utilities/types/enums';

export interface IScheduleListProps {
  teamsOrder: ITeamDuration[];
  timeStrings: string[];
}

const scheduleTextDir = { isRTL: false, textDir: TextDirEnum.LTR };

const ScheduleList = ({ teamsOrder, timeStrings }: IScheduleListProps) => {
  const separateWithComa = (str: string): string => {
    const arr = str.split('/');
    return arr.join(', ');
  };

  return (
    <ScheduleUl isRTLText={scheduleTextDir}>
      {teamsOrder.map((item, index) => (
        <li key={item.name}>
          <ListContentWrapper
            isRTLText={scheduleTextDir}
            style={{ justifyContent: 'space-between' }}
          >
            <Typography>
              {index + 1}. <strong>{separateWithComa(item.name)}</strong> -
              start at <strong>{timeStrings[index]}</strong> (their lunch is{' '}
              {item.duration} minutes)
            </Typography>
          </ListContentWrapper>
        </li>
      ))}
    </ScheduleUl>
  );
};

export default ScheduleList;
