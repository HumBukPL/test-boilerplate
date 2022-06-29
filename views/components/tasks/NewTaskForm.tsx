import React from 'react'

import classes from './NewTaskForm.module.css'

const NewTaskForm = (props: any) => {
  return (
    <form className={classes.form}>
      <div className={classes.field}>
        <label htmlFor="title">Tytuł:</label>
        <input type="text" />
      </div>
      <br />
      <div className={classes.field}>
        <label htmlFor="desc">Opis:</label>
        <input type="desc" />
      </div>
      <br />
      <br />
      <div className={classes.field}>
        <button className={classes.save__btn}>ZAPISZ TASKA</button>
      </div>
    </form>
  )
}

export default NewTaskForm
