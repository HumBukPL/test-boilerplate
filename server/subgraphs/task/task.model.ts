import { getModelForClass } from '@typegoose/typegoose';
import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
export default class Task {
  @Field()
  desc: string;

  @Field()
  completed: Boolean;
}

export const TaskModel = getModelForClass(Task)