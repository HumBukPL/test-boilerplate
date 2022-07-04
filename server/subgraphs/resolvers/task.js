import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import jwt from "jsonwebtoken"
import Task from '../models/task'
import User from '../models/user'
import next from 'next'
import { contentSecurityPolicy } from 'helmet'
import auth from '../utils/auth'

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

TaskTC.addResolver({
  name: 'Creating',
  args: {record: 'CreateTaskInput'},
  type: TaskTC,
  resolve: async({source, args, context}) => {
    //1.Finding user
    //2.Creating task with user id
    //3.Saving task
    const token = context.req.headers.authorization.replace('Bearer ', '')
    const decoded = jwt.verify(token, process.env.SECRET_KEY)
    const user = await User.findOne({ _id: decoded._id})
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
    const token = context.req.headers.authorization.replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded);
    await user.populate('tasks');
    console.log(user.tasks);
    return user.tasks;
  }
});

const TaskQuery = {
  taskById: TaskTC.mongooseResolvers.findById().withMiddlewares([auth]),
  taskByIds: TaskTC.mongooseResolvers.findByIds().withMiddlewares([auth]),
  taskOne: TaskTC.mongooseResolvers.findOne().withMiddlewares([auth]),
  taskMany: TaskTC.getResolver('findMyTasks').withMiddlewares([auth]),
  taskCount: TaskTC.mongooseResolvers.count().withMiddlewares([auth]),
}

const TaskMutation = {
  taskCreateOne: TaskTC.getResolver('Creating').withMiddlewares([auth]),
  taskUpdateById: TaskTC.mongooseResolvers.updateById().withMiddlewares([auth]),
  taskUpdateOne: TaskTC.mongooseResolvers.updateOne().withMiddlewares([auth]),
  taskRemoveById: TaskTC.mongooseResolvers.removeById().withMiddlewares([auth]),
  taskRemoveOne: TaskTC.mongooseResolvers.removeOne().withMiddlewares([auth]),
  taskRemoveMany: TaskTC.mongooseResolvers.removeMany().withMiddlewares([auth]),
}

export {
  TaskQuery,
  TaskMutation
}