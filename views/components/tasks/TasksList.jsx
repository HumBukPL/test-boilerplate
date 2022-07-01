import React from 'react'
import {gql, useQuery} from '@apollo/client';

import SingleTask from './SingleTask.jsx'
import classes from './TasksList.module.scss'

const TasksList = (props) => {
  return (
    <section>
      <ul className={classes.task__list}>
        {props.tasks.map((task) => {
          return (
            <SingleTask
              id={task._id}
              title={task.title}
              desc={task.description}
              completed={task.completed}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default TasksList
