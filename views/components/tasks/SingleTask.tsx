import React from 'react'

import classes from './SingleTask.module.scss'

const SingleTask = (props: any) => {
  return (
    <li className={classes.task}>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
    </li>
  )
}

export default SingleTask
