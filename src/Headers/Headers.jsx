import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './Headers.module.css';
import { motion } from 'framer-motion-latest';
export default function Headers() {
  const navigate = useNavigate();
  const [disappearName, setDisappearName] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 870) {
        setDisappearName(true);
      } else {
        setDisappearName(false);
      }
    };

    // Call handleResize initially to set the initial state
    handleResize();

    // Add the resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  const pickedStyle = {
    filter: 'brightness(105%)',
    pointerEvents: 'none',
    scale: '1'
  };
  const currentPage = `${useLocation().pathname}`;
  if(currentPage === '/resume'){
    return null;
  }

  const backStyle = {
    background: 'rgba(30, 177, 108, 0.4)',
    transition: {
      duration: 0.1
    }
  }
  const defBackStyle= {
    background: 'rgba(0, 0, 0, 0)',
    transition: {
      duration: 0.2
    }
  }
  return (
    <div className={s.headerParent}>
      {!disappearName && <p 
        className={s.name} 
        tabIndex={0} 
        onClick={() => navigate('/home')}
      >
        Seon Kim (Eron)
      </p>}
      <motion.button 
        className={s.contactMe} 
        tabIndex={0}
        initial={defBackStyle}
        animate={currentPage === '/home' ? backStyle: defBackStyle}
        style={currentPage === '/home' ? pickedStyle : {}} 
        onClick={(e) => {
          navigate('/home')
          e.currentTarget.blur();
        }}
      >
        Home
      </motion.button>
      <motion.button 
        className={s.contactMe} 
        tabIndex={0} 
        initial={defBackStyle}
        animate={currentPage === '/about' ? backStyle: defBackStyle}
        style={currentPage === '/about' ? pickedStyle : {}} 
        onClick={(e) => {
          navigate('/about')
          e.currentTarget.blur();
        }}
      >
        About
      </motion.button>
      <button 
        className={s.contactMe} 
        tabIndex={0} 
        style={currentPage === '/resume' ? pickedStyle : {}} 
        onClick={(e) => {
          window.open('/Eron-resume.pdf', '_blank', 'noopener,noreferrer')
          e.currentTarget.blur();
        }}
      >
        Resume
      </button>
    </div>
  );
}
