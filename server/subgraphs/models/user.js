import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

import Task from './task'


const { SECRET_KEY } = process.env

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
    trim: true,
    minlength: 6,
    validate(value) {
      if(value.toLowerCase().includes('password')) {
        throw new Error('Try to enter better password')
      }
    }
  },
  token: String
});

UserSchema.methods.generateAuthToken = async function () 
{
  this.token = jwt.sign({ _id: this._id.toString() }, SECRET_KEY);
}

UserSchema.virtual('tasks', {
  ref: 'Task',
  localField: '_id',
  foreignField: 'owner'
})

// UserSchema.methods.toJSON = function() {
//   const user = this
//   const userObj = user.toObject()
//   delete userObj.password
  
//   return userObj
// }

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', UserSchema);

export default User;