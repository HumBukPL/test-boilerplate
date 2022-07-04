import jwt from "jsonwebtoken"
import Task from '../models/task'
import User from '../models/user'

const auth = async(resolve, source, args, context, info) => {
  try {
  const token = context.req.headers.authorization.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.SECRET_KEY)
  const user = await User.findOne({ _id: decoded._id})

  if(!user) {
    throw new Error('User not found')
  }

  // const match = user.nonValidTokens.find((temp) => temp === token)
  // if(match) {
  //   throw new Error('Token is non valid')
  // }

  } catch {
    throw new Error('Please authenticate')
  }
  return resolve(source, args, context, info)
}

export default auth