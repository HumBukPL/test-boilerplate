import React from 'react'

import NewTaskForm from '../../views/components/tasks/NewTaskForm'
import Card from '@views/components/ui/Card'

const NewTask = () => {
  const addTaskHandler = (obj : object) => {
    //TODO: Wyslac zapytanie do backendu z dodaniem taska
  }

  return (
    <section>
      <NewTaskForm onAddTask={addTaskHandler}/>
    </section>
  )
}

export default NewTask
