import React from 'react'
import styles from './Button.module.css'

export default function Button({ children, onClick, type }) {
  return (
    <button
      className={`${styles.btn} ${type === 'primary' ? styles.primary : ''} ${
        type === 'back'
          ? styles.back
          : type === 'position'
          ? styles.position
          : ''
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
