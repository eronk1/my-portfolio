import React from 'react'
import s from './WebSkills.module.css'
import AnimateIn from '../Animation-stuff/AnimateIn'

export default function WebSkills() {

    let imageList = [
        {imgSrc: 'react.svg',name: 'React'},
        {imgSrc: 'framerMotion.svg',name: 'Animation'},
        {imgSrc: 'svelte.svg',name: 'Svelte'},
        {imgSrc: 'nodejs.svg',name: 'Node JS'},
        {imgSrc: 'socketio.svg',name: 'Socket.IO'},
        {imgSrc: 'redis.svg',name: 'Redis'},
        {imgSrc: 'mongodb.svg',name: 'Mongodb'},
        {imgSrc: 'html.svg',name: 'HTML'},
        {imgSrc: 'ejs.svg',name: 'EJS'},
        {imgSrc: 'css.svg',name: 'CSS'},
        {imgSrc: 'JavaScript.svg',name: 'JavaScript'},
        {imgSrc: 'jquery.svg',name: 'jQuery'},
    ]
  return (
    <div className={s.webSkillsParent}>
        <AnimateIn>
            <h1 className={s.webSkillsHeader}>Web Skills</h1>
        </AnimateIn>
        <div className={s.eachImageListParent}>
            {imageList.map((item,key)=>{
                return <EachImage key={key} imgSrc={'/webSkills/'+item.imgSrc} name={item.name}/>
            })}
        </div>
    </div>
  )
}

function EachImage({imgSrc, name}){
    return(
        <AnimateIn className={s.imgSecParent}>
            <p>{name}</p>
            <img src={imgSrc} alt="" />
        </AnimateIn>
    )
}