import React from 'react'
import { gql, useMutation } from '@apollo/client'

import NewTaskForm from '../../views/components/tasks/NewTaskForm'
import Card from '@views/components/ui/Card'


const CREATE_TASK_MUTATION = gql`
mutation TaskCreateOne($record: CreateOneTaskInput!) {
  taskCreateOne(record: $record) {
    record {
    title,
    description
    }
  }
}
`;

const NewTask = () => {
  const [createNewTask] = useMutation(CREATE_TASK_MUTATION);

  const addTaskHandler = (obj) => {
    createNewTask({variables: {record:{title:obj.title, description:obj.desc}}})
  }

  return (
    <section>
      <NewTaskForm onAddTask={addTaskHandler}/>
    </section>
  )
}

export default NewTask
