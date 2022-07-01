import React, { useState } from 'react'
import { FormControlLabel, FormGroup, Switch, Button } from '@mui/material'
import { gql, useMutation } from '@apollo/client'
import { Snackbar } from '@mui/material'

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

const COMPLETE_TASK_MUTATION = gql`
  mutation TaskUpdateById($id: MongoID!, $record: UpdateByIdTaskInput!) {
    taskUpdateById(_id: $id, record: $record) {
      record {
        _id
        completed
      }
    }
  }
`

const SingleTask = (props) => {
  const [isCompleted, setIsCompleted] = useState(props.object.completed)
  const [completeTask] = useMutation(COMPLETE_TASK_MUTATION)
  const [openChangedSnackbar, setOpenChangedSnackbar] = React.useState(false)

  const handleCompletedChange = (e) => {
    e.preventDefault()

    setIsCompleted(!isCompleted)
    completeTask({
      variables: { id: props.object.id, record: { completed: !isCompleted } },
    })
    setOpenChangedSnackbar(true)
  }

  const deleteButtonHandler = (e) => {
    e.preventDefault()
    //TODO: refetchQueries
    props.onDelete({ variables: { id: props.object.id } })
    //deleteTask({ variables: { id: props.object.id }})
  }

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpenChangedSnackbar(false)
  }

  return (
    <li id={props.id} className={classes.task}>
      <h1>{props.object.title}</h1>
      <p>{props.object.desc}</p>
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
        <Snackbar
          autoHideDuration={3000}
          open={openChangedSnackbar}
          message="Changed completion state"
          close={handleCloseSnackbar}
        />
      </div>
    </li>
  )
}

export default SingleTask
