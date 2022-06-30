import React from 'react'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import classes from './registerform.module.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

// Login zaczyna sie od litery
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// Mala litera + duza litera + cyfra + znak specjalny
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const RegisterForm = () => {

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

  const [matchPwd, setMatchPwd] = useState('')
  const [validMatch, setValidMatch] = useState(false)
  const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    userRef.current.focus()
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user)
    console.log(result)
    console.log(user)
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = PWD_REGEX.test(pwd)
    console.log(result)
    console.log(pwd)
    setValidPwd(result)
    const match = pwd === matchPwd
    setValidMatch(match)
  }, [pwd, matchPwd])

  // Usuwanie errMsg po tym jak uzytkownik zmienił jakiegokolwiek inputa
  useEffect(() => {
    setErrMsg('')
  }, [user, pwd, matchPwd])

  return(
    <section className={classes.wraper}>
      <div className={classes.container}>
      {/* aria-live - dostepnosc dla czytnikow ekranu */}
      <p ref={errRef} className={errMsg ? 'errmsg' : classes.offscreen} aria-live='assertive'>{errMsg}</p>
      <h1>Register</h1>
      <form className={classes.registerForm}>
        <div className={classes.control}>
          <TextField
            label='Username'
            type='text'
            id='username'
            ref={userRef}
            autoComplete='off'
            onChange={(e) => setUser(e.target.value)}
            required
            aria-invalid={validName ? 'false' : 'true'}
            aria_describedby='uidnote'
            onFocus={() => setUserFocus(true)}
            onBlur={() => setUserFocus(false)}
            color={validName ? 'success' : ''}
          />
          <p id='uidnote' className={userFocus && user && !validName ? classes.instructions : classes.offscreen}>
            4 to 24 characters.<br />
            Must begin with a letter. <br />
            Letters, numbers, underscores, hyphens allowed.
            </p>
        </div>
        <div className={classes.control}>
          <TextField
            label='password'
            type='password'
            id='password'
            onChange={(e) => setPwd(e.target.value)}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby='pwdnote'
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
            color={validPwd? 'success' : ''}
          />
          <p id='pwdnote' className={pwdFocus && !validPwd ? classes.instructions : classes.offscreen}>
            8 to 24 characters.<br />
            Must include uppercase and lowercase letters, a number and a special character.<br />
          </p>
        </div>
        <div className={classes.control}>
          <TextField
            label='Confirm Password'
            type='password'
            id='confirm_pwd'
            onChange={(e) => setMatchPwd(e.target.value)}
            required
            aria-invalid={validMatch ? 'false' : 'true'}
            aria_describedby='confirmnote'
            onFocus={() => setMatchFocus(true)}
            onBlur={() => setMatchFocus(false)}
            color={validMatch && validPwd ? 'success' : ''}
          />
          <p id='confirmnote' className={matchFocus && !validMatch ? classes.instructions : classes.offscreen}>
            Must match the first password input field.
          </p>
        </div>
        <div className={classes.control}>
          <Button variant='outlined' disabled={!validName || !validPwd || !validMatch ? true : false}>
            Sign Up
          </Button>
        </div>
        <div className={classes.control}>
          <p>Already registered?</p>
          <Link href="/auth/login"><a>Sign in</a></Link>
        </div>
      </form>
      </div>
    </section>
  )
}

export default RegisterForm
