import React from 'react'
import { useRef, useState, useEffect } from 'react'
import classes from './loginform.module.css'
import Link from 'next/link'

const LoginForm = (props) => {

  const loginInputRef = useRef()
  const passwordInputRef = useRef()

  const [user, setUser] = useState('')
  const [pwd, setPwd] = useState('')

  useEffect(() => {
    loginInputRef.current.focus()
  }, [])

  // Do zmiany po napisaniu back endu
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
    <div className={classes.wraper}>
    <form className={classes.forms} onSubmit={submitHandler}>
      <h1>Zaloguj się</h1>
      <div className={classes.control}>
        <label htmlFor='username'>Login</label>
        <input 
          type="text" 
          required 
          id='username'
          onChange={(e) => setUser(e.target.value)}
          ref={loginInputRef}
        />
      </div>
      <div className={classes.control}>
        <label htmlFor='password'>Hasło</label>
        <input 
          type="password" 
          required 
          id='password'
          onChange={(e) => setPwd(e.target.value)}
          ref={passwordInputRef}
        />
      </div>
      <div className={classes.control}>
        <button>Zaloguj</button>
      </div>
      <div className={classes.control}>
        <span>Nie masz konta?</span>
        <Link href="/auth/register"><a className={classes.link}>Zarejestruj się</a></Link>
      </div>
    </form>
    </div>
  )
}

export default LoginForm
