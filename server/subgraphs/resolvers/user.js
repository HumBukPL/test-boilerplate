import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';


import User from "../models/user"
const customizationOptions = {};

schemaComposer.createInputTC({
  name: 'CreateUserInput',
  fields:
  {
    login: 'String',
    password: 'String'
  }
});

const UserTC = composeMongoose(User, customizationOptions);

<<<<<<< HEAD
UserTC.addResolver({
  name: 'test',
  args: { record: 'CreateUserInput' },
  type: UserTC,
  resolve: async ({source, args}) =>
  {
    console.log(args)
    return 
  }
})
=======
const testAuth = async(resolve, source, args, context, info) => {
  console.log('From middleware')

  console.log('source: ' + source)
  console.log('args: ' + args)
  console.log('info: ' + info)
  return resolve(source, args, context, info)
}
>>>>>>> 5b84962fd6be46d5d8308bfc9b67ba707f74da34

const UserQuery = {
  userById: UserTC.mongooseResolvers.findById(),
  userByIds: UserTC.mongooseResolvers.findByIds(),
  userOne: UserTC.mongooseResolvers.findOne(),
  userMany: UserTC.mongooseResolvers.findMany(),
  userDataLoader: UserTC.mongooseResolvers.dataLoader(),
  userDataLoaderMany: UserTC.mongooseResolvers.dataLoaderMany(),
  userByIdLean: UserTC.mongooseResolvers.findById({ lean: true }),
  userByIdsLean: UserTC.mongooseResolvers.findByIds({ lean: true }),
  userOneLean: UserTC.mongooseResolvers.findOne({ lean: true }),
  userManyLean: UserTC.mongooseResolvers.findMany({ lean: true }),
  userDataLoaderLean: UserTC.mongooseResolvers.dataLoader({ lean: true }),
  userDataLoaderManyLean: UserTC.mongooseResolvers.dataLoaderMany({ lean: true }),
  userCount: UserTC.mongooseResolvers.count(),
  userConnection: UserTC.mongooseResolvers.connection(),
  userPagination: UserTC.mongooseResolvers.pagination(),
};

const UserMutation = {
  userCreateOne: UserTC.getResolver('test'),
  userCreateMany: UserTC.mongooseResolvers.createMany(),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userUpdateOne: UserTC.mongooseResolvers.updateOne(),
  userUpdateMany: UserTC.mongooseResolvers.updateMany(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
  userRemoveMany: UserTC.mongooseResolvers.removeMany(),
};

export {
  UserQuery,
  UserMutation
};