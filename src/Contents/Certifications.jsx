import React from 'react'
import s from './Certifications.module.css';
import AnimateIn from '../Animation-stuff/AnimateIn';
export default function Certifications() {
  return (
    <div className={s.parent}>
        <AnimateIn>
          <p className={s.title} tabIndex={0}>IT Certifications</p>
        </AnimateIn>
        <AnimateIn className={s.certParent}>
          <div className={s.certPartParent}>
            <p className={s.certTitle}>Cisco CCNA</p>
            <img src="/certifications/ccna.jpg" alt="CCNA" />
          </div>
          <div className={s.certPartParent}>
            <p className={s.certTitle}>CompTIA Security+</p>
            <img src="/certifications/security+.png" alt="Security+" />
          </div>
          <div className={s.certPartParent}>
            <p className={s.certTitle}>CompTIA A+</p>
            <img src="/certifications/a+.png" alt="A+" />
          </div>
        </AnimateIn>
    </div>
  )
}
