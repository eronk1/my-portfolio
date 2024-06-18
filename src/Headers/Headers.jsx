import React from 'react'
import s from './Headers.module.css'

export default function Headers({currentPage}) {
  return (
    <div className={s.headerParent}>
        <p className={s.name} tabIndex={0}>Seon Kim (Eron)</p>
        <button className={s.contactMe} tabIndex={0}>Home</button>
        <button className={s.contactMe} tabIndex={0}>About</button>
        <button className={s.contactMe} tabIndex={0}>Resume</button>
        <button className={`${s.contactMe} ${s.realContactMe}`} tabIndex={0}>Contact</button>
    </div>
  )
}
