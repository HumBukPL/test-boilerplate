import React from "react"
import LoginForm from '../../views/components/LoginForm'

const LoginPage = () => {

  const loginHandler = (loginData: any) => {
    // Tutaj do backendu
  }
  
  return(
    <section>
      <LoginForm onLogin={loginHandler} />
    </section>
  )
}

export default LoginPage