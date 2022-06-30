import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavStatic from './NavStatic'
import NavLogin from './NavLogin'
import classes from './nav.module.css'


const Nav = () => {
  const router = useRouter()

  return (
    <nav className={classes.navbar}>
      <ul>
        <NavStatic />
        <NavLogin />
      </ul>
    </nav>
  )
}

export default Nav
