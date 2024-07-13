import React from 'react'
import s from './About.module.css'
import Footers from '../Footers/Footers.jsx'

export default function About() {
  return (
    <div className={s.AboutParent}>
        <h1>About Me</h1>
        <div>
            <img src="/water4" alt="" />
            <div>
                <div>Hello World!</div>
                <div></div>
            </div>
        </div>
        <Footers use={true}/>
    </div>
  )
}
