import React, {useState,useEffect} from 'react'
import { motion } from 'framer-motion';
import s from './ITskills.module.css'
export default function ITskills() {
    let ciscoWLC = {
        catagory: 'Configuring WLC',
        subCatagory: [
            "",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, eos.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, eos."
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
    let cloudflare = {
        catagory: 'Cloudflare',
        subCatagory: [
            "Setting up DNS",
            "Configuring DNS records",
            "implementing cloudflare's SSL Certificate"
        ]
    }
    let activeDirectory = {
        catagory: 'Active Directory',
        subCatagory: [

        ]
    }
    let splunk = {
        catagory: 'Splunk',
        subCatagory: [

        ]
    }
    let kaliLinux = {
        catagory: 'Penetration Testing',
        subCatagory: [
            'Kali Linux',
            'Passive & Active Reconaissance',
            'Password attacks',
            'Burp Suite'
        ]
    }


    return (
        <div className={s.ITskillsParent}>
            <p className={s.ITskillsTitle}>IT Skills</p>
            <div className={s.scrollList}>
                <div className={s.skillColumn}>
                    <ScrollDownList skills={ciscoWLC} />
                    <ScrollDownList skills={awsSkill} />
                    <ScrollDownList skills={cloudflare} />
                </div>
                <div className={s.skillColumn}>
                    <ScrollDownList skills={activeDirectory} />
                    <ScrollDownList skills={splunk} />
                    <ScrollDownList skills={kaliLinux} />
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
        <div
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
        </div>
    );
};
