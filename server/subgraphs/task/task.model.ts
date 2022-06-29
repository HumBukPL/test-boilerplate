import { Field, ID, InputType, ObjectType } from 'type-graphql'

@ObjectType()
class task {
  @Field()
  desc: string;

  @Field()
  completed: Boolean;
}