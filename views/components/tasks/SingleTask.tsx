import React, { useState } from 'react'

import { FormControlLabel, FormGroup, Switch } from '@mui/material'
import classes from './SingleTask.module.scss'

const SingleTask = (props: any) => {
  const [isCompleted, setIsCompleted] = useState(props.completed)
  const handleCompletedChange = (e) => {
    e.preventDefault()

    setIsCompleted(!isCompleted)
    //TODO: przeslac info do bazy danych
  }

  return (
    <li className={classes.task}>
      <h1>{props.title}</h1>
      <p>{props.desc}</p>
      <FormControlLabel
        className={classes.switches}
        control={
          <Switch onChange={handleCompletedChange} checked={isCompleted} />
        }
        label="Completed"
      />
    </li>
  )
}

export default SingleTask
