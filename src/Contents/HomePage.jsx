import React from 'react'
import s from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={s.homePageParent}>
      <div className={s.imageSection}>
        <img className={s.homeImage} src="/water4.jpg" alt="" />
      </div>
      <div className={s.homeText}>
        <p className={s.name}>Hello! I am an</p>
        <p className={s.jobTitle}>IT Specialist</p>
        <p className={s.name}>and a </p>
        <p className={s.jobTitle}>Web Developer</p>
        <div className={s.socialLinks}>
          <img onClick={()=>window.open('https://www.linkedin.com/in/seon-mo-kim/','_blank')} src="/linkedIn.svg" alt="LinkedIn" />
          <img onClick={()=>window.open('https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com', '_blank')} src="/gmail.svg" alt="Gmail" />
          <img onClick={()=>window.open('https://github.com/eronk1/', '_blank')} src="/github.svg" alt="Github" />
          <img onClick={()=>window.open('https://www.credly.com/users/seon-kim.37523a11', '_blank')} src="/credly.svg" alt="Credly" />
        </div>
      </div>
    </div>
  )
}
