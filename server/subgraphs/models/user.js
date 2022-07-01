import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { SECRET_KEY } = process.env
import Task from './task'
import Task from './task'
import bcrypt from "bcrypt";

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

UserSchema.pre('save', async function (next) {
  const user = this

  if (user.isModified('password')) {
      user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

const User = mongoose.model('User', UserSchema);

export default User;