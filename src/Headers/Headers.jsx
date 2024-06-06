import React from 'react'
import s from './Headers.module.css'

export default function Headers({currentPage}) {
  return (
    <div className={s.headerParent}>
        <p className={s.name}>Eron Kim</p>
        <button className={s.contactMe}>Contact Me</button>
    </div>
  )
}
