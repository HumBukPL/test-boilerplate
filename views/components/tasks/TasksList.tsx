import React from 'react'

import SingleTask from './SingleTask'
import classes from './TasksList.module.scss'

const DUMMY_TASKS = [
  {
    title: 'Task 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    completed: true,
  },
  {
    title: 'Task 2',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    completed: false,
  },
  {
    title: 'Task 3',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    completed: true,
  },
]

const TasksList = (props: any) => {
  return (
    <section>
      <ul className={classes.task__list}>
        {DUMMY_TASKS.map((task) => {
          return (
            <SingleTask
              title={task.title}
              desc={task.desc}
              completed={task.completed}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default TasksList
