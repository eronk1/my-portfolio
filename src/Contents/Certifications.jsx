import React from 'react'
import s from './Certifications.module.css';
export default function Certifications() {
  return (
    <div className={s.parent}>
        <p className={s.title}>IT Certifications</p>
        <div className={s.certParent}>
          <div>
            <p className={s.certTitle}>Cisco CCNA</p>
            {/* <img src="/certifications/ccna.jpg" alt="CCNA" /> */}
          </div>
          <div>
            <p className={s.certTitle}>CompTIA Security+</p>
            {/* <img src="/certifications/security+.png" alt="Security+" /> */}
          </div>
          <div>
            <p className={s.certTitle}>CompTIA A+</p>
            {/* <img src="/certifications/a+.png" alt="A+" /> */}
          </div>
        </div>
    </div>
  )
}
