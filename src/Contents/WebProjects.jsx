import React, { useRef, useState } from 'react'
import s from './ITProjects.module.css'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import AnimateIn from '../Animation-stuff/AnimateIn'

export default function WebProjects() {
    const chatApp = {
        title: 'Transparency Chat App',
        desc: 'Website inspired by Discord, where the other person can see you typing in real-time while chatting.',
        imgLink: '/projectChatApp/0.png',
        navigateLink: 'transparency-chat-app'
    }
    const passwordGenerator = {
        title: 'Random Password Generator',
        desc: 'Generates passwords that can be customized. Practiced UI/UX design with React.',
        imgLink: '/passwordGenerator/0.png',
        navigateLink: 'random-password-generator'
    }
    
    const weatherApp = {
        title: 'Weather App',
        desc: 'Shows the current weather details for a place at a particular point in time. Uses a 3rd party weather API.',
        imgLink: '/weatherApp/0.png',
        navigateLink: 'weather-app'
    }
    
    const quickQuiz = {
        title: 'Quick Quiz',
        desc: 'Website inspired by Kahoot, with the goal of automatically generating questions from a topic using ChatGPT.',
        imgLink: '/quickQuiz/0.png',
        navigateLink: 'quick-quiz'
    }
    const vdrs = {
        title: 'Virtual Dining Restraunt Simulation',
        desc: 'Dine virtually, an experience designed to let users chat in real time while eating virtually.',
        imgLink: '/vdrs/0.png',
        navigateLink: 'virtual-dining-restraunt-simulation'
    }
    const mathApp = {
        title: 'Random Math Problem Generator',
        desc: 'The goal was to generate random math problems so that all possible math problems can be practiced.',
        imgLink: '/mathApp/0.png',
        navigateLink: 'random-math-problem-generator'
    }
  return (
    <div className={s.ITProjectsParent}>
        <AnimateIn>
            <p className={s.ITProjectsHeader}>Web Projects</p>
        </AnimateIn>
        <div className={s.projectsParent}>
            <div className={s.projectColumn}>
                <ProjectSec projectContent={chatApp} />
                <ProjectSec projectContent={vdrs} />
                <ProjectSec projectContent={passwordGenerator} />
            </div>
            <div className={s.projectColumn}>
                <ProjectSec projectContent={weatherApp} />
                <ProjectSec projectContent={quickQuiz} />
                <ProjectSec projectContent={mathApp} />
            </div>
        </div>
    </div>
  )
}


function ProjectSec({projectContent}){
    const navigate = useNavigate();
    const {title, desc, imgLink, navigateLink} = projectContent
    const [isOpen, setIsOpen] = useState(false);
    return(
        <AnimateIn
            tabIndex={0}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            onFocus={() => setIsOpen(true)}
            onBlur={() => setIsOpen(false)}
            className={s.projectSecParent}
            onClick={()=>navigate(`/project/${navigateLink}`)}
        >
            <img className={s.projectImg} src={imgLink} alt={title} />
            {isOpen && 
                <motion.div 
                    className={s.projectContentParent}
                    initial={{opacity: 0.5}}
                    animate={{opacity: 1}}
                    exit={{opacity: 0.5}}
                    transition={{duration: 0.05}}
                >
                    <motion.p className={s.title}
                        initial={{opacity: 0.2, y: '2rem'}}
                        animate={{opacity: 1, y: '0rem'}}
                        exit={{opacity: 0.2, y: '2rem'}}
                        transition={{duration: 0.1,ease:'easeOut'}}
                    >{title}</motion.p>
                    <motion.p className={s.desc}
                        initial={{opacity: 0.2, y: '2rem'}}
                        animate={{opacity: 0.8, y: '0rem'}}
                        exit={{opacity: 0.2, y: '2rem'}}
                        transition={{duration: 0.1, ease: 'easeOut'}}
                    >{desc}</motion.p>
                </motion.div>
            }
        </AnimateIn>
    )
}