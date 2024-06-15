import React, { useRef, useState } from 'react'
import s from './ITProjects.module.css'
import { motion } from 'framer-motion'
export default function ITProjects() {
    const ciscoWLC = {
        title: 'Configuring AP with WLC',
        desc: 'Configured cisco access point and its group with Catalyst 9800-CL embedded Wireless Controller.',
        imgLink: ''
    }
    const aws = {
        title: 'Setting Up secure website on AWS',
        desc: 'Utilized services: EC2 instance, Application Load Balancer, Access Credential Manager (ACM)',
        imgLink: ''
    }
    const cloudflare = {
        title: 'DNS & SSL Certificate with cloudflare',
        desc: 'Bought a domain, configured DNS records, obtained an SSL Certificate from cloudflare, and set it up on nginx.',
        imgLink: ''
    }
    const activeDirectory = {
        title: 'Configuring Active Directory',
        desc: 'Set up user in a OU, implemented a powershell script, and set up DHCP',
        imgLink: ''
    }
    const splunk = {
        title: 'Navigating through Splunk',
        desc: '',
        imgLink: ''
    }
    const kaliLinux = {
        title: 'Basic Penetration Testing Using Kali',
        desc: '',
        imgLink: ''
    }
  return (
    <div className={s.ITProjectsParent}>
        <p className={s.ITProjectsHeader}>IT Experiences</p>
        <div className={s.projectsParent}>
            <div className={s.projectColumn}>
                <ProjectSec projectContent={ciscoWLC} />
                <ProjectSec projectContent={aws} />
                <ProjectSec projectContent={cloudflare} />
            </div>
            <div className={s.projectColumn}>
                <ProjectSec projectContent={activeDirectory} />
                <ProjectSec projectContent={splunk} />
                <ProjectSec projectContent={kaliLinux} />
            </div>
        </div>
    </div>
  )
}
function ProjectSec({projectContent}){
    const {title, desc, imgLink} = projectContent
    const [isOpen, setIsOpen] = useState(false);
    return(
        <div
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={s.projectSecParent}
        >
            <img className={s.projectImg} src="/water4.jpg" alt={title} />
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