import React from 'react'
import Link from 'next/link'

import classes from './nav.module.css'

const Nav = () => (
  <nav className={classes.navbar}>
    <ul>
      <li>
        <Link href="/"><a className={classes.link}>HOME</a></Link>
        <Link href="/tasks"><a className={classes.link}>MY TASKS</a></Link>
        <Link href="/tasks/new"><a className={classes.link}>NEW TASK</a></Link>
        <Link href="/auth/login"><a className={classes.link}>LOGIN</a></Link>
        <Link href="/auth/register"><a className={classes.link}>REGISTER</a></Link>
      </li>
    </ul>
  </nav>


)

export default Nav
