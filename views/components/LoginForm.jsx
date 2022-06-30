import React from 'react'
import { useRef, useState, useEffect } from 'react'
import classes from './registerform.module.css'
import Link from 'next/link'
import { TextField, Button, Box } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle';
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';

// Login zaczyna sie od litery
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// Mala litera + duza litera + cyfra + znak specjalny
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const LoginForm = () => {

  const userRef = useRef()
  const errRef = useRef()

  const [user, setUser] = useState('')
  const [validName, setValidName] = useState(false)
  const [userFocus, setUserFocus] = useState(false)

  const [pwd, setPwd] = useState('')
  const [validPwd, setValidPwd] = useState(false)
  const [pwdFocus, setPwdFocus] = useState(false)

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
    const result = PWD_REGEX.test(user)
    console.log(result)
    console.log(pwd)
    setValidPwd(true)
  }, [pwd])

  useEffect(() => {
    setErrMsg('')
  }, [user, pwd])

  return(
    <section className={classes.wraper}>
      <div className={classes.container}>
        <p ref={errRef} className={errMsg ? 'errmsg' : classes.offscreen} aria-live='assertive'>{errMsg}</p>
        <h1>Login</h1>
        <form className={classes.formBox}>
          <div className={classes.control}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <PersonOutlineRoundedIcon sx={{fontSize: 40}}/>
              <TextField 
                label='Username'
                type='text'
                id='username'
                ref={userRef}
                autocomplete='off'
                onChange={(e) => setUser(e.target.value)}
                required
                aria-invalid={validName ? 'false' : 'true'}
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
              />
            </Box>
          </div>
          <div className={classes.control}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <VpnKeyRoundedIcon sx={{fontSize: 40}}/>
              <TextField 
                label='Password'
                type='password'
                id='password'
                onChange={(e) => setPwd(e.target.value)}
                required
                aria-invalid={validPwd ? 'false' : 'true'}
                onFocus={() => setPwdFocus(true)}
                onBlur={() => setPwdFocus(false)}
              />
            </Box>
          </div>
          <div className={classes.control}>
            <Button className={classes.loginButton} variant='outlined' disabled={!validName || !validPwd ? true : false }>
              Sign in
            </Button>
          </div>
          <div className={classes.control}>
            <span>Need account?</span>
            <Link href="/auth/register"><a>Sign up</a></Link>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginForm