import React from 'react'
import s from './Footers.module.css'
import EndSec from '../Contents/EndSec.jsx'
import { useLocation } from 'react-router-dom'
export default function Footers({use = false}) {
  let location = useLocation();

  return (
    <>
      {(location.pathname.includes('/project')|| use) && (
        <div className={s.footerParent}>
          <div className={s.midSec}>
            <h1>My Pages</h1>
            <EndSec />
          </div>
        </div>
      )}
    </>
  )
}
