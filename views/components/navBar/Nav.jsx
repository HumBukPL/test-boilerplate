import React from 'react'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NavStatic from './NavStatic'
import NavLogin from './NavLogin'
import classes from './nav.module.css'


const Nav = () => {
  const router = useRouter()

  useEffect(() => {
    const header = document.getElementById("myHeader");
    const sticky = header.offsetTop;
    const scrollCallBack = window.addEventListener("scroll", () => {
      if (window.pageYOffset > sticky) {
        header.classList.add(classes.sticky);
      } else {
        header.classList.remove(classes.sticky);
      }
    });
    return () => {
      window.removeEventListener("scroll", scrollCallBack);
    };
  }, []);
  
  return (
    <nav className={classes.navbar} id="myHeader">
      <ul>
        <NavStatic />
        <NavLogin />
      </ul>
    </nav>
  )
}

export default Nav
