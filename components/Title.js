import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link';

import styles from '../styles/Title.module.css'

const Title = ({text, isActive, path}) => {
  return (
    <li
      className={`${styles.title} ${isActive ? styles.active : ''}`}>
      <Link href={`/#${path}`}  shallow>
        <a>{text}</a>
      </Link>
    </li>
  )
}

export default Title
