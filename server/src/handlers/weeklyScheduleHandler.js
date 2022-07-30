import { WeeklySchedule } from '../models/weeklyScheduleModel.js';

const createNewWeekly = (scheduleData) => {
  console.log(scheduleData);
  return WeeklySchedule.create(scheduleData);
};

const findWeeklyByIsoAndUpdate = (data) => {
  return WeeklySchedule.findOneAndUpdate({ isoDate: data.isoDate }, data);
};

const findWeeklyByIsoDate = (isoDate) => {
  return WeeklySchedule.findOne({ isoDate }).exec();
};

const deleteWeeklyByIso = (isoDate) => {
  return WeeklySchedule.findOneAndDelete({ isoDate });
};

const weeklyScheduleHandler = {
  createNewWeekly,
  findWeeklyByIsoDate,
  findWeeklyByIsoAndUpdate,
  deleteWeeklyByIso,
};

export default weeklyScheduleHandler;
