import React from 'react'
import { useRef, useState } from 'react'
import router, { useRouter } from 'next/router'
import ButtonMUI from '@mui/material/Button'
import { TextField } from '@mui/material'

import classes from './NewTaskForm.module.css'

const NewTaskForm = (props: any) => {
  const [sendingTask, setSendingTask] = useState(false)
  const titleInputRef = useRef()
  const descInputRef = useRef()

  const onSubmitForm = (e: any) => {
    e.preventDefault()
    setSendingTask(true)

    const enteredTitle = titleInputRef.current.value
    const enteredDesc = descInputRef.current.value

    props.onAddTask({ title: enteredTitle, desc: enteredDesc })

    router.push('/tasks')
  }

  if (sendingTask) return <h1>Saving task</h1>
  return (
    <React.Fragment>
      <h1 className={classes.pageTitle}>Add new task</h1>
      <div className={classes.newtask}>
        <form className={classes.form} onSubmit={onSubmitForm}>
          <div className={classes.title}>
            <TextField
              className={classes.field}
              fullWidth
              id="outlined-basic"
              label="Title"
              variant="outlined"
              inputRef={titleInputRef}
              required
            />
          </div>
          <div className={classes.field}>
            <TextField
              className={classes.field}
              multiline
              fullWidth
              id="outlined-basic"
              label="Description"
              variant="outlined"
              inputRef={descInputRef}
              rows="10"
              required
            />
          </div>
          <div className={classes.field}>
            <ButtonMUI variant="contained" color="primary" type="submit">
              SAVE TASK
            </ButtonMUI>
          </div>
        </form>
      </div>
    </React.Fragment>
  )
}

export default NewTaskForm
