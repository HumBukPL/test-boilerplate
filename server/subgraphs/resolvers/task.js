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
  taskCreateOne: TaskTC.mongooseResolvers.createOne().withMiddlewares([auth]),
  taskCreateMany: TaskTC.mongooseResolvers.createMany(),
  taskUpdateById: TaskTC.mongooseResolvers.updateById(),
  taskUpdateOne: TaskTC.mongooseResolvers.updateOne(),
  taskUpdateMany: TaskTC.mongooseResolvers.updateMany(),
  taskRemoveById: TaskTC.mongooseResolvers.removeById(),
  taskRemoveOne: TaskTC.mongooseResolvers.removeOne(),
  taskRemoveMany: TaskTC.mongooseResolvers.removeMany(),
}

export {
  TaskQuery,
  TaskMutation
}