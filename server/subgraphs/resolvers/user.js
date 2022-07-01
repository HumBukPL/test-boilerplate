import { composeMongoose } from 'graphql-compose-mongoose';
import { schemaComposer } from 'graphql-compose';
import { moongose } from 'mongoose'
import { jwt } from 'jsonwebtoken'
import User from "../models/user"

const customizationOptions = {};
const UserTC = composeMongoose(User, customizationOptions);

UserTC.removeField('password');

schemaComposer.createInputTC({
  name: 'CreateUserInput',
  fields:
  {
    login: 'String',
    password: 'String'
  }
});

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
  name: 'Register',
  args : { record: 'CreateUserInput'},
  type: UserTC,
  resolve: async({source, args}) => {
    // 1. Saving and fetching id user data
    // 2. making a jwt token from id
    // 3. transfer token to client
    console.log(args)
    console.log(source)

    const user = new User(args.record);
    await user.save();
    user.generateAuthToken();
    return user
  }
})

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
  userRegister: UserTC.getResolver('Register'),
  userUpdateById: UserTC.mongooseResolvers.updateById(),
  userRemoveById: UserTC.mongooseResolvers.removeById(),
  userRemoveOne: UserTC.mongooseResolvers.removeOne(),
};

export {
  UserQuery,
  UserMutation
};