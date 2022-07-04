import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import validator from "validator"

const { SECRET_KEY } = process.env

const UserSchema = new mongoose.Schema({
  login:
  {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value)
    {
      if (!validator.isEmail(value))
        return
      throw new Error("This is not an email.");
    }
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
  activeToken:
  {
    type: String
  },
  // nonValidTokens: [{   zostanie dodane potem
  //   token: {
  //     type: String,
  //     required:true
  //   }
  // }]
});

UserSchema.methods.generateAuthToken = async function () {
  this.activeToken = jwt.sign({ _id: this._id.toString() }, SECRET_KEY);
}

UserSchema.statics.findByCredentials = async ({ login, password }) => {
  const user = await User.findOne({ login });
  if (!user)
      throw new Error('Unable to login');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) 
      throw new Error('Unable to login');
  return user;
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