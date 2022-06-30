import React from 'react'
import { gql, useMutation } from '@apollo/client'

import NewTaskForm from '../../views/components/tasks/NewTaskForm'
import Card from '@views/components/ui/Card'


const CREATE_LINK_MUTATION = gql`
  mutation taskCreateOne(
    $title: String!
    $description: String!
  ) {
    post(title: $title, description: $description) {
      id
      createdAt
      url
      description
    }
  }
`;

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
