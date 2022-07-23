import { WeeklySchedule } from '../models/weeklyScheduleModel.js';

const createNewWeeklySchedule = (scheduleData) => {
  return WeeklySchedule.create(scheduleData);
};

const updateWeeklySchedule = (data) => {
  return WeeklySchedule.findOneAndUpdate({ startWeek: data.startWeek }, data);
};

const findWeeklySchedule = (startWeek) => {
  return WeeklySchedule.findOne({ startWeek }).exec();
};

const deleteWeeklySchedule = (startWeek) => {
  return WeeklySchedule.findOneAndDelete({ startWeek });
};

const weeklyScheduleHandler = {
  createNewWeeklySchedule,
  updateWeeklySchedule,
  findWeeklySchedule,
  deleteWeeklySchedule,
};

export default weeklyScheduleHandler;
