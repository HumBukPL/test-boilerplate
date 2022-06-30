import mongoose from "mongoose";

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
  }
});

const User = mongoose.model('User', UserSchema);

export default User;