import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Task = mongoose.model('Task', TaskSchema)

export default Task