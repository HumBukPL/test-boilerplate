import React from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'

import TasksList from '@views/components/tasks/TasksList'

const GET_ALL_TASKS = gql`
  query TaskMany {
    taskMany {
      title
      description
      completed
      owner
      _id
      updatedAt
      createdAt
    }
  }
`

export async function getServerSideProps(context) {
  return({props:{}})
}

const Tasks = (props) => {
  const { loading, error, data } = useQuery(GET_ALL_TASKS, { ssr:true,
    fetchPolicy: 'network-only',
  })

  //console.log(error)

  if (error) return <h1>ERROR</h1>
  if (!loading) {
    return (
      <React.Fragment>
        <h1>MY TASKS</h1>
        <TasksList tasks={data.taskMany} />
      </React.Fragment>
    )
  }
  return <h1>Loading...</h1>
}

export default Tasks
