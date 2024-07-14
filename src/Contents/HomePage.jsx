import React, {useState, useEffect,useRef} from 'react'
import s from './HomePage.module.css'
import GetLogoIcon from '../more-stuff/GetLogoIcon.jsx';
import { motion } from 'framer-motion';
import ContactMePage from './ContactMePage.jsx';
import Footers from '../Footers/Footers.jsx';

export default function HomePage({ checkScrolledStart, setCheckScrolledStart }) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [hideHome, setHideHome] = useState(true);

  useEffect(() => {
    if (checkScrolledStart === 2) {
      setStartAnimation(true);
      setHideHome(true)
    } else {
      setHideHome(false)
      setStartAnimation(false);
    }
  }, [checkScrolledStart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  let instantSet = null;
  let homeHeadersRef = useRef(null);
  let homeHeadersRef2 = useRef(null);
  let [bkColor, setbkColor] = useState('var(--third-color)')
  const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();// for factor
  const thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim(); // for factor
  useEffect(()=>{
    document.documentElement.style.backgroundColor = bkColor;
  },[bkColor])
  useEffect(() => {
    // Retrieve the hex colors from CSS variables
    const primaryColorHex = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const thirdColorHex = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();

    const handleScroll = () => {
      const interpolatedColor = interpolateColor(primaryColorHex, thirdColorHex, calculateBoxOpacity());
      if(calculateBoxOpacity()!=0){
        document.documentElement.style.backgroundColor = interpolatedColor;
      }
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const [hideHomeTrue, setHideHomeTrue] = useState(false)
  let temp1 = true;
  const calculateBoxOpacity = () => {
    const viewportHeight = window.innerHeight;
    const scrollPos = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const startScroll = viewportHeight;
    const endScroll = documentHeight - 2*viewportHeight;
    if(scrollPos/viewportHeight<=1.2){
      if(hideHome==true && temp1==true){
        temp1 = false;
        setHideHome(false)
      }
      if(homeHeadersRef && homeHeadersRef.current){
        homeHeadersRef.current.style.opacity = 1 - scrollPos/viewportHeight;
      }
      if(homeHeadersRef2 && homeHeadersRef2.current){
        homeHeadersRef2.current.style.opacity = 1 - scrollPos/viewportHeight;
      }
    }else{
      if(hideHome==false&&temp1==false){
        temp1 == true;
        setHideHome(true)
      }
    }
    if (scrollPos < startScroll) {
        setTimeout(() => {
            const scrollPos = window.scrollY;
            const startScroll = viewportHeight;
            if(scrollPos < startScroll){
              setCheckScrolledStart(1);
            }
        }, 0);
      return 0;
    }

    const scrollRange = endScroll - startScroll;
    const scrollProgress = (scrollPos - startScroll) / scrollRange;
    if(scrollProgress>0.5){
      if(!hideHome && (instantSet===false||instantSet===null)){
        instantSet = true;
        setHideHome(true);
      }
    }else{
      if(hideHome && (instantSet===true||instantSet===null)){
        
        instantSet = false;
        setHideHome(false)
      }
    }
    let factor = Math.min(scrollProgress, 1);
    
    
    return factor;
  };
  const handleDownArrowClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  let boxVariants = {
    initial: {
      opacity: calculateBoxOpacity(),
    },
    animate: {
      opacity: calculateBoxOpacity(),
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <div id="all-main-section-home-page-parent" className={s.homePageParent}>
      {!hideHome && <div ref={homeHeadersRef} className={s.homeText}>
        <motion.p
          className={s.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: checkScrolledStart === 2 ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          ✨ Seon Kim ✨
        </motion.p>
        <motion.p
          className={s.jobTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: checkScrolledStart === 2 ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          IT Specialist & Web Developer
        </motion.p>
        <motion.div
          className={s.socialLinks}
          initial={{ opacity: 0 }}
          animate={{ opacity: checkScrolledStart === 2 ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <img
            tabIndex={0}
            onClick={() => window.open('https://www.linkedin.com/in/seon-mo-kim/', '_blank')}
            src="/linkedIn.svg"
            alt="LinkedIn"
          />
          <img
            tabIndex={0}
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com', '_blank')}
            src="/gmail.svg"
            alt="Gmail"
          />
          <img
            tabIndex={0}
            onClick={() => window.open('https://github.com/eronk1/', '_blank')}
            src="/github.svg"
            alt="Github"
          />
          <img
            tabIndex={0}
            onClick={() => window.open('https://www.credly.com/users/seon-kim.37523a11', '_blank')}
            src="/credly.svg"
            alt="Credly"
          />
        </motion.div>
      </div>}
      {calculateBoxOpacity()!=0 && <motion.div
      className={s.contactMeBoxParent}
        initial="initial"
        animate={startAnimation ? "animate" : "initial"}
        variants={boxVariants}
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          height: '100vh',
          color: 'white',
        }}
      >
        <ContactMePage />
        
        <div className={s.footer}>
          <Footers use={true}/>
        </div>
      </motion.div>}
      {(!hideHome && checkScrolledStart==1) && <motion.div
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 10,
          bottom: 0,
          display: 'grid',
          placeContent: 'center'
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
            <svg
              onClick={handleDownArrowClick}
              width="3rem"
              height="3rem"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              className={s.downArrowSVG}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#797979"
                strokeWidth="20.48"
              >
                <path
                  d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                  fill="#ffffff"
                />
              </g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                  fill="#ffffff"
                />
              </g>
            </svg>
      </motion.div>}
      {!hideHome &&<div ref={homeHeadersRef2}>
        <DVDthing checkScrolledStart={checkScrolledStart} />
      </div>}
    </div>
  );
}

const interpolateColor = (color1, color2, factor) => {
  const result = color1.slice(1).match(/.{2}/g)
    .map((hex, index) => {
      const color1Int = parseInt(hex, 16);
      const color2Int = parseInt(color2.slice(1).match(/.{2}/g)[index], 16);
      const interpolated = Math.round(color1Int + factor * (color2Int - color1Int));
      return interpolated.toString(16).padStart(2, '0');
    });
  return `#${result.join('')}`;
};


const DVDthing = ({checkScrolledStart}) => {
  const boxRef = useRef(null);
  const logoRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [velocity, setVelocity] = useState({ dx: 1, dy: 0.5 });
  const [acceleration, setAcceleration] = useState({ ax: 0.2, ay: 0.2 });
  const [text, setText] = useState('Cisco');
  const texts = ['Cisco', 'Firefox', 'JavaScript', 'VS Code','Linux'];
  const collisionBuffer = 2; // Buffer to prevent repeated collisions

  useEffect(() => {
    const interval = setInterval(moveLogo, 5);

    return () => clearInterval(interval);
  }, [position, velocity, acceleration]);

  const moveLogo = () => {
    const box = boxRef.current;
    const logo = logoRef.current;
    if (!box || !logo) return;

    const boxWidth = box.clientWidth;
    const boxHeight = box.clientHeight;
    const logoWidth = logo.clientWidth;
    const logoHeight = logo.clientHeight;

    let { top, left } = position;
    let { dx, dy } = velocity;
    let { ax, ay } = acceleration;

    let newTop = top + dy;
    let newLeft = left + dx;
    let newDx = dx + ax;
    let newDy = dy + ay;

    let collided = false;

    if (newTop <= 0) {
      newTop = collisionBuffer; // Move logo slightly away from the top edge
      newDy = -dy;
      collided = true;
    } else if (newTop + logoHeight >= boxHeight) {
      newTop = boxHeight - logoHeight - collisionBuffer; // Move logo slightly away from the bottom edge
      newDy = -dy;
      collided = true;
    }

    if (newLeft <= 0) {
      newLeft = collisionBuffer; // Move logo slightly away from the left edge
      newDx = -dx;
      collided = true;
    } else if (newLeft + logoWidth >= boxWidth) {
      newLeft = boxWidth - logoWidth - collisionBuffer; // Move logo slightly away from the right edge
      newDx = -dx;
      collided = true;
    }

    if (collided) {
      setText(prevText => {
        const newIndex = (texts.indexOf(prevText) + 1) % texts.length;
        return texts[newIndex];
      });
      setAcceleration({
        ax: (Math.random() - 0.5) * 0.4, // Random acceleration between -0.2 and 0.2
        ay: (Math.random() - 0.5) * 0.4  // Random acceleration between -0.2 and 0.2
      });
    }

    // Add small random jerk in the same direction as the velocity
    // newDx += Math.sign(newDx) * (Math.random() * 0.05);
    // newDy += Math.sign(newDy) * (Math.random() * 0.05);

    // Ensure x velocity is at least 1 or -1 and clamp values
    newDx = Math.max(-2, Math.min(2, newDx));
    if (Math.abs(newDx) < 1) {
      newDx = newDx < 0 ? -1 : 1;
    }

    // Ensure y velocity is at least 0.5 or -0.5 and clamp values
    newDy = Math.max(-1, Math.min(1, newDy));
    if (Math.abs(newDy) < 0.5) {
      newDy = newDy < 0 ? -0.5 : 0.5;
    }

    setPosition({ top: newTop, left: newLeft });
    setVelocity({ dx: newDx, dy: newDy });
  };

  return (
    <motion.div className={s.box} ref={boxRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: checkScrolledStart==1 ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div
        className={s.logo}
        ref={logoRef}
        style={{ top: `${position.top}px`, left: `${position.left}px`, position: 'absolute' }}
      >
        <p className={s.iLove}><span className={s.left}>I 💗</span><span className={s.right}>{text}</span></p>
        <GetLogoIcon item={text} />
      </div>
    </motion.div>
  );
};