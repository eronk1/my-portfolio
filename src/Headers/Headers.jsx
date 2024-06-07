import React from 'react'
import s from './Headers.module.css'

export default function Headers({currentPage}) {
  return (
    <div className={s.headerParent}>
        <p className={s.name}>Seon Kim (Eron)</p>
        <button className={s.contactMe}>Contact</button>
    </div>
  )
}
