import React from 'react'

import classes from './NewTaskForm.module.css'

const NewTaskForm = (props: any) => {
  return (
    <div className={classes.newtask}>
      <form className={classes.form}>
        <div className={classes.title}>
          <label htmlFor="title">Tytuł:</label>
          <input type="text" />
        </div>
        <div className={classes.field}>
          <label htmlFor="desc">Opis:</label>
          <textarea className={classes.ta}/>
        </div>
        <div className={classes.field}>
          <button className={classes.save__btn}>ZAPISZ TASKA</button>
        </div>
      </form>
    </div>
  )
}

export default NewTaskForm
