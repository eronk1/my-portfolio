import React, {useState,useEffect} from 'react'
import { motion } from 'framer-motion';
import s from './ITskills.module.css'
export default function ITskills() {
    let ciscoWLC = {
        catagory: 'Configuring AP using WLC',
        subCatagory: ["Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, eos.","Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, eos.","Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident, eos."]
    }


    return (
        <div className={s.ITskillsParent}>
            <p className={s.ITskillsTitle}>IT Skills</p>
            <div className={s.scrollList}>
                <ScrollDownList skills={ciscoWLC} />
                <ScrollDownList skills={ciscoWLC} />
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
            style={{filter: filterAmount}}
            onMouseEnter={()=>setFilterAmount("brightness(110%)")}
            onMouseLeave={()=> isOpen ? "" : setFilterAmount("")}
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
