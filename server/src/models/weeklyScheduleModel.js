import mongoose from 'mongoose';
import { TeamSchema } from './teamModel.js';

export const WeeklyScheduleSchema = new mongoose.Schema({
  timeSlots: {
    type: [String],
    required: [true, 'must have an array of time slots to build the schedule'],
  },
  orderTeams: {
    type: [String],
    required: [
      true,
      'must have an array of ordered teams to build the schedule',
    ],
  },
  startWeek: {
    type: Date,
    required: [true, 'must have start week date to build the default schedule'],
    unique: true,
  },
});

export const WeeklySchedule = mongoose.model(
  'WeeklySchedule',
  WeeklyScheduleSchema
);

export default WeeklySchedule;
