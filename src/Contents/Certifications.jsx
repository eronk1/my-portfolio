import React from 'react'
import s from './Certifications.module.css';
export default function Certifications() {
  return (
    <div className={s.parent}>
        <p className={s.title}>IT Certifications</p>
        <div className={s.certParent}>
            <img src="/ccna.jpg" alt="CCNA" />
            <img src="/security+.jpg" alt="Security+" />
            <img src="/a+.jpg" alt="A+" />
        </div>
    </div>
  )
}
