import Task, { TaskModel } from './task.model'
import { ObjectId } from 'mongoose'

const UserService = {
  async findAll() {
    return TaskModel.find()
  },

  find(candidateId: ObjectId) {
    return TaskModel.findById(candidateId)
  },
}

export default UserService