import React from 'react'
import Link from 'next/link'
import styles from './nav.module.scss'

const Nav = () => (
  <nav>
    <ul>
      <li>
        <Link href="/">
          <a>HOME</a>
        </Link>
        <Link href="/tasks/all">
          <a>MY TASK</a>
        </Link>
        <Link href="/tasks/new">
          <a>NEW TASK</a>
        </Link>
        <Link href="/auth/login">
          <a>LOGIN</a>
        </Link>
        <Link href="/auth/register">
          <a>REGISTER</a>
        </Link>
      </li>
    </ul>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
        margin: 1rem 0;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </nav>
)

export default Nav
