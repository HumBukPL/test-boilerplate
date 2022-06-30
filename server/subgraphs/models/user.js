import mongoose from "mongoose";
<<<<<<< HEAD
import bcrypt from "bcrypt";

const { SECRET_KEY } = process.env
=======
>>>>>>> d4d33774232ff44d561bc156134c96e3bc09c519
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

// UserSchema.methods.toJSON = function() {
//   const user = this
//   const userObj = user.toObject()
//   delete userObj.password
  
//   return userObj
// }

const User = mongoose.model('User', UserSchema);

export default User;