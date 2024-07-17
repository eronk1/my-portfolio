import React from 'react'
import s from './About.module.css'
import Footers from '../Footers/Footers.jsx'
import { motion } from 'framer-motion'
import GridImage from '../Animation-stuff/GridImage.jsx'
import ScaleAboutMe from '../Animation-stuff/ScaleAboutMe.jsx'

export default function About() {

  const variants = {
    hidden: { opacity: 0, x: '-5rem' },
    visible: { opacity: 1, x: '0rem', transition: { duration: 0.3 } },
  };
  
  return (
    <div className={s.AboutParent}>     
        <motion.h1
          className={s.header1}
          initial="hidden"
          animate="visible"
          variants={variants}
        >About Me</motion.h1>
        <div className={s.squigglyLine}></div>
        <div className={s.secondSection}>
            <GridImage className={s.myPic} imagePath={'/aboutMePic.jpg'} alt="image failed to load :(" />
            <ScaleAboutMe className={s.thirdSection}>
                <h2 className={s.secondHeader}>Greetings!</h2>
                <div className={s.actualAboutMeParent}>
                  <div className={s.actualAboutMe}>I'm Seon, but people tend to call me Eron. I was born and raised in southern California in a Korean family. I like to do various physical activities such as running and soccer with my friends, as well as discussing and learning history.</div>
                  <div className={s.actualAboutMe}>My passion for technology formed in 2021 when I first discovered web development. Two years later, exploring various areas in IT became my primary interest. In the present, IT still remains as my primary interest.</div>
                  <div className={s.actualAboutMe}>Exploring and mastering the endless possibilities of technology constantly captivates me. I'm currently looking for an IT job, so if you're interested, I'd be happy to hear from you.</div>
                </div>
            </ScaleAboutMe>
        </div>
        <Footers use={true}/>
    </div>
  )
}
