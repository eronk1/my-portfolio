import React from 'react'
import s from './Headers.module.css'

export default function Headers({currentPage}) {
  return (
    <div className={s.headerParent}>
        <p className={s.name} tabIndex={1}>Seon Kim (Eron)</p>
        <button className={s.contactMe} tabIndex={2}>Home</button>
        <button className={s.contactMe} tabIndex={3}>About</button>
        <button className={s.contactMe} tabIndex={4}>Resume</button>
        <button className={`${s.contactMe} ${s.realContactMe}`} tabIndex={5}>Contact</button>
    </div>
  )
}
