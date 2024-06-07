import React from 'react'
import s from './Certifications.module.css';
export default function Certifications() {
  return (
    <div className={s.parent}>
        <p className='title'>Certifications</p>
        <div className={s.certParent}>
            <iframe src="/ccna.pdf" width="100%" height="500px"></iframe>
            <img src="/security+.pdf" alt="Security+" />
            <img src="/a+.pdf" alt="A+" />
        </div>
    </div>
  )
}
