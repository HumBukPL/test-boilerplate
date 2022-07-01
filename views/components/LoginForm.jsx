import React from 'react'
import { useRef, useState } from 'react'
import Link from 'next/link'
import { TextField, Button } from '@mui/material'
import classes from './registerform.module.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid'

// Login zaczyna sie od litery
const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
// Mala litera + duza litera + cyfra + znak specjalny
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const LoginForm = () => {
  const formSchema = Yup.object().shape({
    username: Yup.string()
      .required('Username is mandatory')
      //.min(3, 'Username must be at 3 char long')
      //.max(23, 'Username can not be longer than 23 char')
      .matches(LOGIN_REGEX, 'Incorrect username'),
    password: Yup.string()
      .required('Password is mandatory')
      .matches(PWD_REGEX, 'Invalid password'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions)

  const onSubmit = async (data) => {
    console.log(data)
    // Tutaj dodac logowanie po zrobieniu backendu
  }

  const errRef = useRef()

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  return (
    <>
      {/* Wiadomosc z bledem do zrobienia po napisanie backendu */}
      <p ref={errRef} className={errMsg ? 'errmsg' : classes.offscreen}>
        {errMsg}
      </p>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid className={classes.gridContainer} container spacing={0}>
          <h1>Login</h1>
          <Grid className={classes.gridItem} item>
            <TextField
              className={classes.textInput}
              autoFocus={true}
              type="text"
              required
              {...register('username')}
              label="Login"
              id="username"
              autoComplete="off"
              // onFocus={() => setUserFocus(true)}
              color={errors?.username?.message ? 'error' : ''}
            />
            <p className={classes.errorMsg}>{errors?.username?.message}</p>
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              className={classes.text_input}
              {...register('password')}
              label="password"
              type="password"
              id="password"
              required
              // onFocus={() => setPwdFocus(true)}
              color={errors?.password?.message ? 'error' : ''}
            />
            <p className={classes.errorMsg}>{errors?.password?.message}</p>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button
              className={classes.buttonSubmit}
              type="submit"
              variant="outlined"
            >
              Sign In
            </Button>
          </Grid>
          <Grid item className={`${classes.gridItem} ${classes.gridItem_last}`}>
            <p>Already registered?</p>
            <Link href="/auth/login">
              <Button>
                <a>Sign up</a>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default LoginForm
