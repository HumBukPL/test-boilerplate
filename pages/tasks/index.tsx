import React from 'react'

import Card from '@views/components/ui/Card'

import TasksList from '@views/components/tasks/TasksList'

const Tasks = () => {
  return (
    <React.Fragment>
      <h1>MOJE TASKI</h1>
      <TasksList />
    </React.Fragment>
  )
}

export default Tasks
