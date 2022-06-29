import React from 'react'

import NewTaskForm from '../../views/components/tasks/NewTaskForm'
import Card from '@views/components/ui/Card'
import classes from './new.module.css'

const NewTask = () => {
  return <Card>
    <NewTaskForm/>
  </Card>
}

export default NewTask
