import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import classes from './NavStatic.module.scss'

const NavStatic = () => {
  const router = useRouter()

  return (
    <React.Fragment>
      <li>
        <Link href="/">
          <a
            className={router.pathname === '/' ? classes.active : classes.link}
          >
            HOME
          </a>
        </Link>
      </li>
      <li>
        <Link href="/tasks">
          <a
            className={
              router.pathname === '/tasks' ? classes.active : classes.link
            }
          >
            MY TASKS
          </a>
        </Link>
      </li>
      <li>
        <Link href="/tasks/new">
          <a
            className={
              router.pathname === '/tasks/new' ? classes.active : classes.link
            }
          >
            NEW TASK
          </a>
        </Link>
      </li>
    </React.Fragment>
  )
}

export default NavStatic
