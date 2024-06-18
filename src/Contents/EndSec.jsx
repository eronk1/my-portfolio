import React from 'react'
import s from './EndSection.module.css';
export default function EndSec() {
  return (
    <div>
        <div className={s.socialLinks}>
          <img tabIndex={0} onClick={()=>window.open('https://www.linkedin.com/in/seon-mo-kim/','_blank')} src="/linkedIn.svg" alt="LinkedIn" />
          <img tabIndex={0} onClick={()=>window.open('https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com', '_blank')} src="/gmail.svg" alt="Gmail" />
          <img tabIndex={0} onClick={()=>window.open('https://github.com/eronk1/', '_blank')} src="/github.svg" alt="Github" />
          <img tabIndex={0} onClick={()=>window.open('https://www.credly.com/users/seon-kim.37523a11', '_blank')} src="/credly.svg" alt="Credly" />
        </div>
    </div>
  )
}
