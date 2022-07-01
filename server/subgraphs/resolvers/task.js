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
    console.log(context.req.headers.authorization)
    console.log(args)
    
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
})

const TaskQuery = {
  taskById: TaskTC.mongooseResolvers.findById(),
  taskByIds: TaskTC.mongooseResolvers.findByIds(),
  taskOne: TaskTC.mongooseResolvers.findOne(),
  taskMany: TaskTC.mongooseResolvers.findMany(),
  taskDataLoader: TaskTC.mongooseResolvers.dataLoader(),
  taskDataLoaderMany: TaskTC.mongooseResolvers.dataLoaderMany(),
  taskByIdLean: TaskTC.mongooseResolvers.findById({ lean: true }),
  taskByIdsLean: TaskTC.mongooseResolvers.findByIds({ lean: true }),
  taslOneLean: TaskTC.mongooseResolvers.findOne({ lean: true }),
  taskManyLean: TaskTC.mongooseResolvers.findMany({ lean: true }),
  taskDataLoaderLean: TaskTC.mongooseResolvers.dataLoader({ lean: true }),
  taskDataLoaderManyLean: TaskTC.mongooseResolvers.dataLoaderMany({ lean: true }),
  taskCount: TaskTC.mongooseResolvers.count(),
  taskConnection: TaskTC.mongooseResolvers.connection(),
  taskPagination: TaskTC.mongooseResolvers.pagination(),
}

const TaskMutation = {
  taskCreateOne: TaskTC.getResolver('Creating').withMiddlewares([auth]),
  taskCreateMany: TaskTC.mongooseResolvers.createMany().withMiddlewares([auth]),
  taskUpdateById: TaskTC.mongooseResolvers.updateById().withMiddlewares([auth]),
  taskUpdateOne: TaskTC.mongooseResolvers.updateOne().withMiddlewares([auth]),
  taskUpdateMany: TaskTC.mongooseResolvers.updateMany().withMiddlewares([auth]),
  taskRemoveById: TaskTC.mongooseResolvers.removeById().withMiddlewares([auth]),
  taskRemoveOne: TaskTC.mongooseResolvers.removeOne().withMiddlewares([auth]),
  taskRemoveMany: TaskTC.mongooseResolvers.removeMany().withMiddlewares([auth]),
}

export {
  TaskQuery,
  TaskMutation
}