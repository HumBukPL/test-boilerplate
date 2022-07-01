import React from 'react'
import { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'

import SingleTask from './SingleTask.jsx'
import classes from './TasksList.module.scss'

const DELETE_TASK_MUTATION = gql`
  mutation TaskRemoveById($id: MongoID!) {
    taskRemoveById(_id: $id) {
      record {
        _id
      }
    }
  }
`

const TasksList = (props) => {
  const [tasks, setTasks] = useState(props.tasks.map((task) => {
    return {
      id: task._id,
      title: task.title,
      desc: task.description,
      completed: task.completed,
    }
  }))
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION)

  const deleteTaskHandler = (data) => {
    deleteTask(data)
    const arr = tasks.filter((obj) => {return obj.id!==data.variables.id})//task.id!==data.variables.id})
    setTasks(arr)
  }

  return (
    <section>
      <ul className={classes.task__list}>
        {tasks.map((task) => {
          return (
            <SingleTask
              object={task}
              onDelete={deleteTaskHandler}
            />
          )
        })}
      </ul>
    </section>
  )
}

export default TasksList
