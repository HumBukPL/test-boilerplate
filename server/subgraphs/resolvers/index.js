import { UserQuery, UserMutation } from  './user'
import { TaskQuery, TaskMutation } from './task'
import { schemaComposer } from 'graphql-compose';

schemaComposer.Query.addFields({
  ...UserQuery,
  ...TaskQuery
});

schemaComposer.Mutation.addFields({
  ...UserMutation,
  ...TaskMutation
});

export default schemaComposer.buildSchema()