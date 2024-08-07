import React from 'react'
import s from './EndSec.module.css';
export default function EndSec() {
  return (
    <div>
        <div className={s.socialLinks}>
          <a href="https://www.linkedin.com/in/seon-mo-kim/" target="_blank" title="https://www.linkedin.com/in/seon-mo-kim/">
            <img src="/linkedIn.svg" alt="LinkedIn" />
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com" target="_blank" title="https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com">
            <img src="/gmail.svg" alt="Gmail" />
          </a>
          <a href="https://github.com/eronk1/" target="_blank" title="https://github.com/eronk1/">
            <img src="/github.svg" alt="Github" />
          </a>
          <a href="https://www.credly.com/users/seon-kim.37523a11" target="_blank" title="https://www.credly.com/users/seon-kim.37523a11">
            <img src="/credly.svg" alt="Credly" />
          </a>
        </div>
    </div>
  )
}
