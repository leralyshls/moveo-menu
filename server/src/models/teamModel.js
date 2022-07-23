import mongoose from 'mongoose';

export const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must have a name'],
  },
});

export const Team = mongoose.model('Team', TeamSchema);

export default Team;
