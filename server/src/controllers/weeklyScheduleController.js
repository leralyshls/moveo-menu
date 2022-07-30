import weeklyScheduleHandler from '../handlers/weeklyScheduleHandler.js';
import { formatToISO } from '../utilities/dateFormat.js';

const requestAddOrUpdateSchedule = async (req, res) => {
  const isoDate = formatToISO(new Date(req.body.startTime));
  const weeklyScheduleData = {
    startTime: req.body.startTime,
    orderTeams: req.body.orderTeams,
    isoDate,
  };
  // try {
  //   await weeklyScheduleHandler.createNewWeekly(weeklyScheduleData);
  //   res.status(200).json({
  //     status: 'success',
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //   });
  // }
  try {
    const isUpdated = await weeklyScheduleHandler.findWeeklyByIsoAndUpdate(
      weeklyScheduleData
    );
    if (!isUpdated) {
      await weeklyScheduleHandler.createNewWeekly(weeklyScheduleData);
    }
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
    });
  }
};

// const requestFindWeeklySchedule = async (req, res) => {
//   const date = new Date(req.query.date);
//   try {
//     const data = await weeklyScheduleHandler.findWeeklySchedule(date);
//     if (data) {
//       res.status(200).json({
//         status: 'success',
//         data: data,
//       });
//     } else {
//       res.status(204).json({
//         status: 'success',
//         msg: 'no data',
//       });
//     }
//   } catch (err) {
//     res.status(400).json({
//       status: 'fail',
//     });
//   }
// };

const weeklyScheduleController = {
  requestAddOrUpdateSchedule,
  // requestFindWeeklySchedule,
};

export default weeklyScheduleController;
