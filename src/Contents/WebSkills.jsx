import React from 'react'
import s from './WebSkills.module.css'

export default function WebSkills() {
  return (
    <div className={s.webSkillsParent}>
        <h1 className={s.webSkillsHeader}>Tech Skills</h1>
        <div className={s.eachImageListParent}>
            <EachImage imgSrc='/public/webSkills/reactLogo.png' name='react'/>
            <EachImage imgSrc='/public/webSkills/reactLogo.png' name='react'/>
            <EachImage imgSrc='/public/webSkills/reactLogo.png' name='react'/>
            <EachImage imgSrc='/public/webSkills/reactLogo.png' name='react'/>
            <EachImage imgSrc='/public/webSkills/reactLogo.png' name='react'/>
        </div>
    </div>
  )
}

function EachImage({imgSrc, name}){
    return(
        <div className={s.imgSecParent}>
            <p>{name}</p>
            <img src={imgSrc} alt="" />
        </div>
    )
}