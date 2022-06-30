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

UserSchema.methods.toJSON = function() {
  const user = this
  const userObj = user.toObject()
  delete userObj.password
  
  return userObj
}

const User = mongoose.model('User', UserSchema);

export default User;