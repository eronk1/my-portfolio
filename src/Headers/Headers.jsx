import React, {useEffect, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import s from './Headers.module.css';

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
    background: 'rgba(30, 177, 108, 0.4)',
    pointerEvents: 'none',
    transform: 'scale(1)'
  };
  const currentPage = `${useLocation().pathname}`;
  if(currentPage === '/resume'){
    return null;
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
      <button 
        className={s.contactMe} 
        tabIndex={0} 
        style={currentPage === '/home' ? pickedStyle : {}} 
        onClick={(e) => {
          navigate('/home')
          e.currentTarget.blur();
        }}
      >
        Home
      </button>
      <button 
        className={s.contactMe} 
        tabIndex={0} 
        style={currentPage === '/about' ? pickedStyle : {}} 
        onClick={(e) => {
          navigate('/about')
          e.currentTarget.blur();
        }}
      >
        About
      </button>
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
