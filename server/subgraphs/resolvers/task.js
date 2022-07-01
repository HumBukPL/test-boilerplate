import { composeMongoose } from 'graphql-compose-mongoose'
import { schemaComposer } from 'graphql-compose'
import { jwt } from 'jsonwebtoken'

import Task from '../models/task'
import next from 'next'

const customizationOptions = {}
const TaskTC = composeMongoose(Task, customizationOptions)

const auth = async(resolve, source, args, context, info) => {
  console.log('From middleware')
  const token = context.req.headers.authorization.replace('Bearer ', '')

  try {
    jwt.verify(token, process.env.JWT_STR)
    }
    catch {
      throw new Error('Please authenticate')
    }
  return resolve(source, args, context, info)
  }

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
  taskCreateOne: TaskTC.mongooseResolvers.createOne(),
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