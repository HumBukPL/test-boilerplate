import { getModelForClass, prop as Property } from '@typegoose/typegoose'
import { Field, ID, InputType, ObjectType } from 'type-graphql'
import * as mongoose from 'mongoose'
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses'

import Email from '@server/common/models/Email'

@ObjectType()
@InputType('UserInput')
export default class User extends TimeStamps {
  @Field((_type: any) => ID, { nullable: true })
  readonly _id: mongoose.ObjectId

  @Field((_type: any) => String, { nullable: true })
  @Property({ required: false })
  firstName: string

  @Field((_type:any) => String, { nullable: true })
  @Property({ required: false })
  familyName: string

  @Field((_type: any) => String, { nullable: true })
  @Property({ required: false })
  avatar: string

  @Field((_type: any) => Email, { nullable: true })
  @Property({ type: Email, required: false })
  email: Email
}

export const UserModel = getModelForClass(User)
