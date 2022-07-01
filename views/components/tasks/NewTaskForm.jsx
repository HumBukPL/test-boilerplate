import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import router, { useRouter } from 'next/router'
import { TextField, Button } from '@mui/material'

import classes from './NewTaskForm.module.scss'

const NewTaskForm = (props) => {
  const [sendingTask, setSendingTask] = useState(false)
  const { register, handleSubmit } = useForm();

  const onSubmitForm = (data) => {
    setSendingTask(true)

    props.onAddTask(data);
    setSendingTask(false);
    //router.prefetch("/tasks")
    router.push('/tasks')
  }

  if (sendingTask) return <h1>Saving task</h1>
  return (
    <React.Fragment>
      <h1 className={classes.pageTitle}>Add new task</h1>
      <div className={classes.newtask}>
        <form className={classes.form} onSubmit={handleSubmit(onSubmitForm)}>
          <div className={classes.title}>
            <TextField
              {...register("title")}
              className={classes.field}
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              required
            />
          </div>
          <div className={classes.field}>
            <TextField
              {...register("desc")}
              className={classes.field}
              multiline
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              rows="10"
              required
            />
          </div>
          <div className={classes.field}>
            <Button variant="contained" color="primary" type="submit">
              SAVE TASK
            </Button>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default NewTaskForm
