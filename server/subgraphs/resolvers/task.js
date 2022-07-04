import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import jwt from "jsonwebtoken"
import Task from '../models/task'
import User from '../models/user'
import next from 'next'
import { contentSecurityPolicy } from 'helmet'
import auth from '../utils/auth'
import moongose, { isObjectIdOrHexString } from 'mongoose'

const customizationOptions = {}
const TaskTC = composeMongoose(Task, customizationOptions)

schemaComposer.createInputTC({
  name: 'CreateTaskInput',
  fields:
  
   {
    title: 'String',
    description: 'String',
    completed: 'Boolean'
  }
})

schemaComposer.createInputTC({
  name: 'removeById',
  fields:{
    _id: 'String'
  }
})

TaskTC.addResolver({
  name: 'createOneTask',
  args: {record: 'CreateTaskInput'},
  type: TaskTC,
  resolve: async({source, args, context}) => {
    //1.Finding user
    //2.Creating task with user id
    //3.Saving task
    const user = context.req.user;
    const task = new Task({
      ...args.record,
      owner: user._id
    })
    await task.save()
    return task
  }
});

TaskTC.addResolver({
  name: 'findMyTasks',
  type: '[Task!]!',
  resolve: async ({ context }) =>
  {
    const user = context.req.user;
    await user.populate('tasks');
    return user.tasks;
  }
});

// TaskTC.addResolver({
//   name: 'UpadateMyTaskById',
//   type: TaskTC,
//   resolve: async
// });
TaskTC.addResolver({
  name: 'deleteTask',
  args: {record: 'removeById'},
  type: TaskTC,
  resolve: async({ args, context }) => {
    const user = context.req.user;
    await user.populate('tasks')
    const taskToDel = user.tasks.filter((task) => {
      return args.record._id === task._id.toString()
    })
    if(!taskToDel) {
      throw new Error('Task not found')
    }
    return await Task.findByIdAndDelete({ _id: args.record._id, owner: user._id})
  }
})

const TaskQuery = {
  taskById: TaskTC.mongooseResolvers.findById().withMiddlewares([auth]),
  taskByIds: TaskTC.mongooseResolvers.findByIds().withMiddlewares([auth]),
  taskOne: TaskTC.mongooseResolvers.findOne().withMiddlewares([auth]),
  taskMany: TaskTC.getResolver('findMyTasks').withMiddlewares([auth]),
  taskCount: TaskTC.mongooseResolvers.count().withMiddlewares([auth]),
}

const TaskMutation = {
  taskCreateOne: TaskTC.getResolver('createOneTask').withMiddlewares([auth]),
  taskUpdateById: TaskTC.mongooseResolvers.updateById().withMiddlewares([auth]),
  taskUpdateOne: TaskTC.mongooseResolvers.updateOne().withMiddlewares([auth]),
  taskRemoveById: TaskTC.getResolver('deleteTask').withMiddlewares([auth])
}

export {
  TaskQuery,
  TaskMutation
}