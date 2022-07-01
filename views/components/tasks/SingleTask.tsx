import React, { useState } from 'react'
import { FormControlLabel, FormGroup, Switch, Button } from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import router from 'next/router'

import classes from './SingleTask.module.scss'

const DELETE_TASK_MUTATION = gql`
  mutation TaskRemoveById($id: MongoID!) {
    taskRemoveById(_id: $id) {
      record {
        _id
      }
    }
  }
`

const SingleTask = (props: any) => {
  const [isCompleted, setIsCompleted] = useState(props.completed)
  const [deleteTask] = useMutation(DELETE_TASK_MUTATION)

  const handleCompletedChange = (e) => {
    e.preventDefault()

    setIsCompleted(!isCompleted)
    //TODO: change state in database
  }

  const deleteButtonHandler = (e) => {
    e.preventDefault()
    //TODO: refetchQueries
    deleteTask({ variables: { id: props.id }})
  }

  return (
    <li id={props.id} className={classes.task}>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <div className={classes.switches}>
        <FormControlLabel
          control={
            <Switch onChange={handleCompletedChange} checked={isCompleted} />
          }
          label="Completed"
        />
        <Button variant="outlined" color="error" onClick={deleteButtonHandler}>
          DELETE TASK
        </Button>
      </div>
    </li>
  )
}

export default SingleTask
