import React from 'react'
import styles from './AppLayout.module.css'
import PageNav from '../components/PageNav'
import Sidebar from '../components/Sidebar'
import Map from '../components/Map'
import User from '../components/User'

export default function AppLayout() {
  return (
    <div className={styles.app}>
      <User />
      <Sidebar />
      <Map />
    </div>
  )
}
