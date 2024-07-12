import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import s from './Headers.module.css';

export default function Headers({ currentPage, setCurrentPage }) {
  const navigate = useNavigate();

  const pickedStyle = {
    filter: 'brightness(105%)',
    background: 'rgba(30, 177, 108, 0.4)'
  };

  const handleClick = (page) => {
    setCurrentPage(page);
  };
  useEffect(()=>{
    navigate(`/${currentPage.toLowerCase()}`);
  },[currentPage])

  return (
    <div className={s.headerParent}>
      <p 
        className={s.name} 
        tabIndex={0} 
        onClick={() => handleClick('Home')}
      >
        Seon Kim (Eron)
      </p>
      <button 
        className={s.contactMe} 
        tabIndex={0} 
        style={currentPage === 'Home' ? pickedStyle : {}} 
        onClick={() => handleClick('Home')}
      >
        Home
      </button>
      <button 
        className={s.contactMe} 
        tabIndex={0} 
        style={currentPage === 'About' ? pickedStyle : {}} 
        onClick={() => handleClick('About')}
      >
        About
      </button>
      <button 
        className={s.contactMe} 
        tabIndex={0} 
        style={currentPage === 'Resume' ? pickedStyle : {}} 
        onClick={() => handleClick('Resume')}
      >
        Resume
      </button>
      <button 
        className={`${s.contactMe} ${s.realContactMe}`} 
        tabIndex={0} 
        style={currentPage === 'Contact' ? pickedStyle : {}} 
        onClick={() => handleClick('Contact')}
      >
        Contact
      </button>
    </div>
  );
}
