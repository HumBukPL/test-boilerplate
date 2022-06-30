import React from 'react'

import SingleTask from './SingleTask'
import classes from './TasksList.module.scss'

const DUMMY_TASKS = [{title: "Task 1", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {title: "Task 2", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}, {title: "Task 3", desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}]

const TasksList = (props: any) => {
  return (
    <section>
      <ul className={classes.task__list}>
        {DUMMY_TASKS.map((task) => {return <SingleTask title={task.title} desc={task.desc}/>})}
      </ul>
    </section>
  )
}

export default TasksList