import mongoose from "mongoose";
import Task from './task'

const UserSchema = new mongoose.Schema({
  login:
  {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password:
  {
    type: String,
    required: true,
    trim: true
  },

});
UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})
const User = mongoose.model('User', UserSchema);

export default User;