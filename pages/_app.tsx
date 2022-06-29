import App from 'next/app'
import { ApolloProvider } from '@apollo/client'

import apollo from '@lib/apolloClient'
import Nav from '@views/components/Nav'
import Footer from '@views/components/Footer'
import '@styles/main.scss'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props

    return (
      <ApolloProvider client={apollo}>
        <Nav/>
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    )
  }
}

export default MyApp
