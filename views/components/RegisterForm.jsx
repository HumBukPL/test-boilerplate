import React from 'react'
import { useRef, useEffect, useState } from 'react'
import Link from 'next/link'
import classes from './registerform.module.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { gql, useMutation } from '@apollo/client'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'
import Grid from '@mui/material/Grid'

const LOGIN_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/

const CREATE_USER_MUTATION = gql`
  mutation UserRegister($record: CreateUserInput) {
    userRegister(record: $record) {
      _id
      activeToken
    }
  }
`

const RegisterForm = () => {
  const formSchema = Yup.object().shape({
    // Validation
    username: Yup.string()
      .required('Username is mandatory')
      //.min(3, 'Username must be at 3 char long')
      //.max(23, 'Username can not be longer than 23 char')
      .matches(
        LOGIN_REGEX,
        'Username must be between 3-23 chars and can contain small/big letters and numbers'
      ),
    password: Yup.string()
      .required('Password is mandatory')
      //.min(8, 'Password must be at 8 char long')
      //.max(24, 'Password can not be longer than 24 char')
      .matches(
        PWD_REGEX,
        'Password must be between 8-24 chars and have to contain One small letter One big, One number and One special char'
      ),
    confirmPwd: Yup.string()
      .required('Password is mandatory')
      .oneOf([Yup.ref('password')], 'Passwords does not match'),
  })

  const formOptions = { resolver: yupResolver(formSchema) }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions)

  // ReigsterHandler
  const onSubmit = async (data) => {
    console.log(data)
    const result = await createNewUser({
      variables: {
        record: {
          login: data.username,
          password: data.password,
        },
      },
    })
    if (result?.errors) {
      // Or new msg with error
      setErrMsg('Nie udalo sie utworzyc konta!')
    } else {
      // ToDo
      // Login and redirect to home page
      setSuccess(true)
      const token = result.data.userRegister.activeToken
      console.log(token)
      sessionStorage.setItem('token', JSON.stringify(token))
    }
  }

  const [createNewUser] = useMutation(CREATE_USER_MUTATION)

  const errRef = useRef()

  // const [userFocus, setUserFocus] = useState(false)
  // const [pwdFocus, setPwdFocus] = useState(false)
  // const [matchFocus, setMatchFocus] = useState(false)

  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)

  return (
    <>
      {/* Err msg to change */}
      <p ref={errRef} className={errMsg ? 'errmsg' : classes.offscreen}>
        {errMsg}
      </p>
      <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <Grid className={classes.gridContainer} container spacing={0}>
          <h1>Register</h1>
          <Grid className={classes.gridItem} item>
            <TextField
              className={classes.textInput}
              autoFocus={true}
              type="text"
              {...register('username')}
              label="Login"
              id="username"
              autoComplete="off"
              // onFocus={() => setUserFocus(true)}
              color={errors?.username?.message ? 'error' : ''}
            />
            <p className={classes.error_msg}>{errors?.username?.message}</p>
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              className={classes.textInput}
              {...register('password')}
              label="password"
              type="password"
              id="password"
              required
              // onFocus={() => setPwdFocus(true)}
              color={errors?.password?.message ? 'error' : ''}
            />
            <p className={classes.error_msg}>{errors?.password?.message}</p>
          </Grid>
          <Grid item className={classes.gridItem}>
            <TextField
              className={classes.textInput}
              {...register('confirmPwd')}
              label="Confirm Password"
              type="password"
              id="confirm_pwd"
              required
              // onFocus={() => setMatchFocus(true)}
              color={errors?.confirmPwd?.message ? 'error' : ''}
            />
            <p className={classes.errorMsg}>{errors.confirmPwd?.message}</p>
          </Grid>
          <Grid item className={classes.gridItem}>
            <Button
              className={classes.buttonSubmit}
              type="submit"
              variant="outlined"
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item className={classes.gridItem}>
            <p>Already registered?</p>
            <Link href="/auth/login">
              <Button>
                <a>Sign in</a>
              </Button>
            </Link>
          </Grid>
        </Grid>
      </form>
    </>
  )
}

export default RegisterForm
