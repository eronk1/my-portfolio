import React from 'react'
import s from '/ProjectPagesElements.module.css'

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

export function CommandBlock({children}){
    return(
        <div className={s.CommandBlockParent}>
            <p>Command Block</p>
            {React.Children.map(children, (child, index)=>{
                <div className={s.eachChild}>

                </div>
            })}
            {children}
        </div>
    )
}