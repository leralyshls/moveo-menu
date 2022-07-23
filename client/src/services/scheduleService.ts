import axios from '../axios/config';
import { ITeam } from '../utilities/types/apiResponseTypes';
import { formatToISO } from '../utilities/dateHelpers';
import { ErrorVariantsEnum } from '../utilities/types/enums';

export interface WeeklyScheduleParams {
  startWeek: Date;
  orderTeams: string[];
  timeSlots: string[];
}

export const postWeeklySchedule = async ({
  startWeek,
  orderTeams,
  timeSlots,
}: WeeklyScheduleParams) => {
  const params = {
    startWeek: formatToISO(startWeek),
    orderTeams: orderTeams.join(','),
    timeSlots: timeSlots.join(','),
  };
  const res = await axios.post('/schedule', params);
  if (res.status === 200) {
    return res.data;
  } else throw new Error('could not post schedule');
};

export const getWeeklySchedule = async (ISODate: string) => {
  const params = new URLSearchParams({ date: ISODate });
  const res = await axios.get('/schedule', { params });
  if (res.status === 200) {
    return res.data;
  } else if (res.status === 204) {
    return ErrorVariantsEnum.NO_SCHEDULE;
  } else throw new Error('could not fetch schedule');
};

export const getAllTeams = async () => {
  const res = await axios.get('/teams');
  if (res.status === 200) {
    const arrayOfNames = res.data.data.map((team: ITeam) => team.name);
    return arrayOfNames;
  } else throw new Error('could not fetch teams');
};