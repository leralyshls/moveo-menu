import cron from 'node-cron';
import { formatToISO } from '../utilities/dateFormat.js';
import { nextSunday, previousSunday } from 'date-fns';
import weeklyScheduleHandler from '../handlers/weeklyScheduleHandler.js';
import rotate from '../utilities/rotateArr.js';

// correct string for the cron job, change after demo
// '50 23 * * 6'
// “At 23:50 on Saturday.”

// pass 'prev' or 'next'
const calcSunday = (str) => {
  const date = new Date();
  let sunday;
  if (str === 'prev') {
    sunday = previousSunday(date);
  } else if (str === 'next') {
    sunday = nextSunday(date);
  } else return;
  const ISO = formatToISO(sunday);
  const concat = ISO + 'T00:00:00.000+00:00';
  const res = new Date(concat);
  return res;
};

// for the demo runs every minute
const cronTask = cron.schedule('50 23 * * 6', async () => {
  const startWeek = calcSunday('prev');
  const schedule = await weeklyScheduleHandler.findWeeklySchedule(startWeek);
  if (!schedule) return;
  const newOrder = rotate(schedule.orderTeams, 1);
  const nextWeek = calcSunday('next');
  const weeklyScheduleData = {
    timeSlots: schedule.timeSlots,
    orderTeams: newOrder,
    startWeek: nextWeek,
  };
  // for the demo change even if the schedule for next week exists
  // for the app - if exists - do not change
  const isUpdated = await weeklyScheduleHandler.updateWeeklySchedule(
    weeklyScheduleData
  );
  if (!isUpdated) {
    await weeklyScheduleHandler.createNewWeeklySchedule(weeklyScheduleData);
  }
  const newSchedule = await weeklyScheduleHandler.findWeeklySchedule(nextWeek);
  // for the demo - print to the console
  console.log(newSchedule);
  console.log('scheduler run');
});

cronTask.start();

export default cronTask;
