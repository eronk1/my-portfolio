import React from 'react'
import s from './ProjectPagesElements.module.css'

export function SmallText({children}) {
    return (
      <div className={s.SmallTextParent}>
          {children}
      </div>
    )
  }

export function MediumText({children}) {
  return (
    <div className={s.MediumTextParent}>
        {children}
    </div>
  )
}

export function LargeText({children}) {
    return (
      <div className={s.LargeTextParent}>
          {children}
      </div>
    )
}
export function TitleText({children}) {
  return (
    <div className={s.TitleTextParent}>
      <div className={s.TitleText}>
        {children}
      </div>
    </div>
  )
}

export function LargeSection({children}){
  return(
    <div className={s.LargeSectionParent}>
      {children}
    </div>
  )
}
export function MediumSection({children}){
  return(
    <div className={s.MediumSectionParent}>
      {children}
    </div>
  )
}
export function ImgSec({ImgSrc}){
  return(
    <img className={s.ImgSecParent} src={`/projectAWS/${ImgSrc}`} alt="Image failed to load :(" />
  )
}