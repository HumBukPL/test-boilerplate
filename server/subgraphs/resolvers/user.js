import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { moongose } from 'mongoose'


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
// Testing customresolves
UserTC.addResolver({
  name: 'CreateTokenAndSave',
  args : { record: 'CreateUserInput'},
  type: UserTC,
  resolve: async({source, args}) => {
    // 1. Saving and fetching id user data
    // 2. making a jwt token from id
    // 3. transfer token to client
    console.log(args)
    console.log(source)

    const user = new User({
      login: args.login,
      password: args.password
    })
    await user.save()
    // jwt.generate(user.id)
    //return jwt
  }
})

const testAuth = async(resolve, source, args, context, info) => {
  console.log('From middleware')

  console.log('source: ' + source)
  console.log('args: ' + args)
  console.log('info: ' + info)
  return resolve(source, args, context, info)
}

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