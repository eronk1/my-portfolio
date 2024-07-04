import React, { useRef, useState } from 'react'
import s from './ITProjects.module.css'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function WebProjects() {
    const chatApp = {
        title: 'Transparency Chat App',
        desc: 'An app inspired by Discord, where the other person can see you typing in real-time while chatting.',
        imgLink: '/projectChatApp/0.png',
        navigateLink: 'transparency-chat-app'
    }
    const passwordGenerator = {
        title: 'Random Password Generator',
        desc: 'Simple design, practiced UI/UX design with react',
        imgLink: '/passwordGenerator/0.png',
        navigateLink: 'random-password-generator'
    }
    
    const weatherApp = {
        title: 'Configuring Active Directory & Splunk',
        desc: 'My first finished project, used 3rd party API',
        imgLink: '/weatherApp/0.png',
        navigateLink: 'weather-app'
    }
    
    const quickQuiz = {
        title: 'Basic Penetration Testing Using Kali',
        desc: 'Used Kali to perform basic passive/active reconnaissance and DoS.',
        imgLink: '/kaliLinux/0.png',
        navigateLink: 'kali-linux-pen-test'
    }
  return (
    <div className={s.ITProjectsParent}>
        <p className={s.ITProjectsHeader}>Web Projects</p>
        <div className={s.projectsParent}>
            <div className={s.projectColumn}>
                <ProjectSec projectContent={chatApp} />
                <ProjectSec projectContent={passwordGenerator} />
            </div>
            <div className={s.projectColumn}>
                <ProjectSec projectContent={weatherApp} />
                <ProjectSec projectContent={quickQuiz} />
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
        <div
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
        </div>
    )
}