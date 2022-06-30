import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { SECRET_KEY } = process.env
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

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})


const User = mongoose.model('User', UserSchema);

export default User;