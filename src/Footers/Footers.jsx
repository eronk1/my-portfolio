import React from 'react'
import s from './Footers.module.css'
import EndSec from '../Contents/EndSec.jsx'
import { useLocation } from 'react-router-dom'
export default function Footers() {
  let location = useLocation();
  return (
    <>
      {location.pathname !== '/home' && (
        <div className={s.footerParent}>
          <div className={s.midSec}>
            <h1>Contact Me</h1>
            <EndSec />
          </div>
        </div>
      )}
    </>
  )
}
