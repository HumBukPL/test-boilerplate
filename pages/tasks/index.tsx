import React from 'react'

import Card from '@views/components/ui/Card'

import TasksList from '@views/components/tasks/Tasks'

export async function getServerSideProps(context : any){
  //fetch tasks for current user and return them
}

const Tasks = () => {
  return <Card>
    <TasksList />
  </Card>
}

export default Tasks
