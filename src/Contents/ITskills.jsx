import React, {useState,useEffect} from 'react'
import { motion } from 'framer-motion';
import s from './ITskills.module.css'
import AnimateIn from '../Animation-stuff/AnimateIn';

export default function ITskills() {
    let ciscoWLC = {
        catagory: 'Cisco WLC',
        subCatagory: [
            "Setting Up Access Point & WLC",
            "Configuring AP functions",
            "Configuring AP Security"
        ]
    }
    let awsSkill = {
        catagory: 'AWS',
        subCatagory: [
            "Configuring EC2 instance",
            "Configuring Application Load Balancer",
            "Installing a basic SSL Certificate",
            'Reverse proxy with nginx',
            'Pushing docker image into EC2 instance'
        ]
    }
    
    let activeDirectory = {
        catagory: 'Active Directory',
        subCatagory: [
            "Creating OU",
            "Automating tasks with powershell script",
            'Configuring DHCP'
        ]
    }
    let kaliLinux = {
        catagory: 'Basic PenTest',
        subCatagory: [
            'Kali Linux',
            'Passive & Active Reconaissance',
            'Password attacks',
            'Burp Suite'
        ]
    }
    let splunk = {
        catagory: 'Splunk',
        subCatagory: [
            'Push Events to Splunk with the Universal Forwarder',
            'Sorting and Narrowing Down Events',
            'Analyzing Events and Their Event Numbers'
        ]
    }
    let virtualBox = {
        catagory: 'VirtualBox',
        subCatagory: [
            'Setting up Internal Network & NAT Network',
            'Customizing VMs with Different Resources and Features',
            'Save Different VM States with Snapshots'
        ]
    }


    return (
        <div className={s.ITskillsParent}>
            <AnimateIn>
                <p className={s.ITskillsTitle}>IT Skills</p>
            </AnimateIn>
            <div className={s.scrollList}>
                <div className={s.skillColumn}>
                    <ScrollDownList skills={ciscoWLC} />
                    <ScrollDownList skills={awsSkill} />
                    <ScrollDownList skills={splunk} />
                </div>
                <div className={s.skillColumn}>
                    <ScrollDownList skills={activeDirectory} />
                    <ScrollDownList skills={kaliLinux} />
                    <ScrollDownList skills={virtualBox} />
                </div>
            </div>
        </div>
    )
}


const ScrollDownList = ({skills}) => {
    const [isOpen, setIsOpen] = useState(false);
    const {catagory, subCatagory} = skills;
    let [filterAmount, setFilterAmount] = useState("");
    
    const toggleList = () => {
        setIsOpen((old) => {
            setFilterAmount(!old ? "brightness(110%)" : "")
            return !old;
        });
    };

    return (
        <AnimateIn
            style={{filter: filterAmount, transform: (isOpen && filterAmount == "brightness(110%)")|| filterAmount == "brightness(105%)" ? 'scale(1.05)' :
                (!isOpen && filterAmount == "brightness(110%)") ? 'scale(1.1)' :
                'scale(1)'}}
            onMouseEnter={()=>setFilterAmount("brightness(110%)")}
            onMouseLeave={()=> isOpen ? "" : setFilterAmount("")}
            onFocus={() => setFilterAmount("brightness(110%)")}
            onBlur={() => setFilterAmount(isOpen ? "brightness(110%)" : "")}
            onMouseDown={() => setFilterAmount("brightness(105%)")}
            onClick={toggleList}
            className={s.scrollDownContainerParent}
        >
            <div className={s.scrollHeaderParent}>
                <button className={s.scrollContainerTitle}>{catagory}</button>
                <p className={s.scrollOpenSignal}>{isOpen ? "-" : "+"}</p>
            </div>
            <motion.ul
                className={s.scrollContainerParent}
                initial={false}
                animate={{ height: isOpen ? 'auto' : 0 }}
                transition={{ duration: 0.1 }}
                style={{ overflow: 'hidden' }}
            >
                {subCatagory.map((val,key)=>{
                    return <li key={key}>{val}</li>
                })}
            </motion.ul>
        </AnimateIn>
    );
};
