import React from 'react'
import { gql, useQuery } from '@apollo/client'

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

// export async function getServerSideProps(context: any) {

//   console.log(data)
//   return({props:{}})
// }

const Tasks = (props) => {
  const { data, loading, error } = useQuery(GET_ALL_TASKS, { ssr: true })
  console.log(data)
  console.log(loading)
  console.log(error)

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
