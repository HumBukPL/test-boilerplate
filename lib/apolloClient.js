import fetch from 'node-fetch'

import { ApolloClient, InMemoryCache, from, HttpLink } from '@apollo/client'
import { onError } from '@apollo/client/link/error'
import { session } from 'passport'
import { setContext } from '@apollo/client/link/context';

const { GRAPHQL_URL } = process.env
const { NODE_ENV } = process.env

const httpLink = new HttpLink({
  uri: NODE_ENV !== 'production' ? '/graphql' : GRAPHQL_URL,
  fetch: fetch,
  credentials: 'same-origin',
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  const token = sessionStorage.getItem('token')
  console.log(token ? `Bearer ${token}` : '')
  // return the headers to the context so httpLink can read them
  console.log(token)
  return {
    headers: {
      ...headers,

      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

//merger all apollo links
const link = from([errorLink, authLink, httpLink])

const cache = new InMemoryCache()

//main apollo client
const apollo = new ApolloClient({
  defaultOptions: {
    watchQuery: {
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
  ssrMode: true, //!process.browser, // Disables forceFetch on the server (so queries are only run once)
  ssrForceFetchDelay: 200,
  link,
  cache,
})

export default apollo
