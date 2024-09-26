import React from 'react'
import styles from './Sidebar.module.css'
import Logo from './Logo'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'
import AppNav from './AppNav'

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <Footer />
    </div>
  )
}
