import weeklyScheduleHandler from '../handlers/weeklyScheduleHandler.js';

const requestAddOrUpdateSchedule = async (req, res) => {
  const weeklyScheduleData = {
    startTime: req.body.startTime,
    orderTeams: req.body.orderTeams,
  };
  console.log(weeklyScheduleData);
  try {
    await weeklyScheduleHandler.createNewWeeklySchedule(weeklyScheduleData);
    res.status(200).json({
      status: 'success',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
    });
  }
  // const timeSlots = req.body.timeSlots.split(',');
  // const orderTeams = req.body.orderTeams.split(',');
  // const startWeek = new Date(req.body.startWeek);
  // const weeklyScheduleData = {
  //   timeSlots,
  //   orderTeams,
  //   startWeek,
  // };
  // try {
  //   const isUpdated = await weeklyScheduleHandler.updateWeeklySchedule(
  //     weeklyScheduleData
  //   );
  //   if (!isUpdated) {
  //     await weeklyScheduleHandler.createNewWeeklySchedule(weeklyScheduleData);
  //   }
  //   res.status(200).json({
  //     status: 'success',
  //   });
  // } catch (err) {
  //   res.status(400).json({
  //     status: 'fail',
  //   });
  // }
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
