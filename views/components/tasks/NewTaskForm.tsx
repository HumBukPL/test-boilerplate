import React from 'react'
import { useRef, useState } from 'react'
import router, { useRouter } from 'next/router'

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

    //TODO: Wyslac obiekt
    props.onAddTask({})

    router.push('/tasks')
  }

  if (sendingTask) return <h1>Saving task</h1>
  return (
    <div className={classes.newtask}>
      <form className={classes.form} onSubmit={onSubmitForm}>
        <div className={classes.title}>
          <label htmlFor="title">Tytuł:</label>
          <input type="text" ref={titleInputRef} required />
        </div>
        <div className={classes.field}>
          <label htmlFor="desc">Opis:</label>
          <textarea className={classes.ta} ref={descInputRef} required />
        </div>
        <div className={classes.field}>
          <button className={classes.save__btn}>ZAPISZ TASKA</button>
        </div>
      </form>
    </div>
  )
}

export default NewTaskForm
