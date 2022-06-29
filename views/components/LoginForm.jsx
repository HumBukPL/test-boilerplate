import { defaultClasses } from '@typegoose/typegoose'
import React from 'react'
import { useRef } from 'react'
import classes from './loginform.module.css'

const LoginForm = (props) => {

  const loginInputRef = useRef()
  const passwordInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredLogin = loginInputRef.current.value
    const enteredPassword = passwordInputRef.current.value

    const loginData = {
      login: enteredLogin,
      password: enteredPassword
    }
    props.onLogin(loginData)
  }

  return(
    <form className={classes.forms} onSubmit={submitHandler}>
      <h1>Logowanie</h1>
      <div className={classes.control}>
        <label htmlFor='login'>Login</label>
        <input type="text" required id='title' ref={loginInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Hasło</label>
        <input type="password" required id='password' ref={passwordInputRef} />
      </div>
      <div className={classes.control}>
        <button>Zaloguj</button>
      </div>
    </form>
  )
}

export default LoginForm
