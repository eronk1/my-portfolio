import React from 'react'

export default function enSection() {
  return (
    <div>
        <div className={s.socialLinks}>
          <img onClick={()=>window.open('https://www.linkedin.com/in/seon-mo-kim/','_blank')} src="/linkedIn.svg" alt="LinkedIn" />
          <img onClick={()=>window.open('https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com', '_blank')} src="/gmail.svg" alt="Gmail" />
          <img onClick={()=>window.open('https://github.com/eronk1/', '_blank')} src="/github.svg" alt="Github" />
          <img onClick={()=>window.open('https://www.credly.com/users/seon-kim.37523a11', '_blank')} src="/credly.svg" alt="Credly" />
        </div>
    </div>
  )
}
