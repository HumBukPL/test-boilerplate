import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import classes from './NavLogin.module.scss'

const NavLogin = () => {
  const router = useRouter()

  return (
    <React.Fragment>
      <li>
        <Link href="/auth/register">
          <a
            className={
              router.pathname === '/auth/register'
                ? classes.active
                : classes.link
            }
          >
            REGISTER
          </a>
        </Link>
      </li>
      <li>
        <Link href="/auth/login">
          <a
            className={
              router.pathname === '/auth/login' ? classes.active : classes.link
            }
          >
            LOGIN
          </a>
        </Link>
      </li>
    </React.Fragment>
  )
}

export default NavLogin
