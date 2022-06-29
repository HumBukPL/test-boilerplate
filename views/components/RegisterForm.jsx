import { defaultClasses } from '@typegoose/typegoose'
import React from 'react'
import { useRef } from 'react'
import classes from './loginform.module.css'

const RegisterForm = (props) => {

  const loginInputRef = useRef()
  const passwordInputRef = useRef()
  const passwordRepeatInputRef = useRef()
  const emailInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredLogin = loginInputRef.current.value
    const enteredPassword = passwordInputRef.current.value
    const enteredRepeatPassword = passwordRepeatInputRef.current.value
    const enteredEmail = emailInputRef.current.value

    const registerData = {
      login: enteredLogin,
      password: enteredPassword,
      email : enteredEmail,
    }
    props.onRegister(registerData)
  }

  return(
    <div className={classes.wraper}>
    <form className={classes.forms} onSubmit={submitHandler}>
      <h1>Rejestracja</h1>
      <div className={classes.control}>
        <label htmlFor='login'>Login</label>
        <input type="text" required id='title' ref={loginInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Hasło</label>
        <input type="password" required id='password' ref={passwordInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='password_repeat'>Hasło jescze raz</label>
        <input type="password" required id='password_repeat' ref={passwordRepeatInputRef} />
      </div>
      <div className={classes.control}>
        <label htmlFor='email'>Email</label>
        <input type="password" required id='email' ref={emailInputRef} />
      </div>
      <div className={classes.control}>
        <button>Rejestracja</button>
      </div>
    </form>
    </div>
  )
}

export default RegisterForm
