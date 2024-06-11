import React, {useState, useEffect,useRef} from 'react'
import s from './HomePage.module.css'
import GetLogoIcon from '../more-stuff/GetLogoIcon.jsx';

export default function HomePage({checkScrolledStart}) {
  return (
    <div id='all-main-section-home-page-parent' className={s.homePageParent}>
      <div className={s.homeText}>
        <p className={s.name}>✨ Seon Kim ✨</p>
        <p className={s.jobTitle}>IT Specialist & Web Developer</p>
        <div className={s.socialLinks}>
          <img tabIndex={6} onClick={()=>window.open('https://www.linkedin.com/in/seon-mo-kim/','_blank')} src="/linkedIn.svg" alt="LinkedIn" />
          <img tabIndex={7} onClick={()=>window.open('https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com', '_blank')} src="/gmail.svg" alt="Gmail" />
          <img tabIndex={8} onClick={()=>window.open('https://github.com/eronk1/', '_blank')} src="/github.svg" alt="Github" />
          <img tabIndex={9} onClick={()=>window.open('https://www.credly.com/users/seon-kim.37523a11', '_blank')} src="/credly.svg" alt="Credly" />
        </div>
      </div>
      {checkScrolledStart==1 && <DVDthing />}
    </div>
  )
}



const DVDthing = () => {
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
    newDx += Math.sign(newDx) * (Math.random() * 0.05);
    newDy += Math.sign(newDy) * (Math.random() * 0.05);

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
    <div className={s.box} ref={boxRef}>
      <div
        className={s.logo}
        ref={logoRef}
        style={{ top: `${position.top}px`, left: `${position.left}px`, position: 'absolute' }}
      >
        <p className={s.iLove}><span className={s.left}>I 💗</span><span className={s.right}>{text}</span></p>
        <GetLogoIcon item={text} />
      </div>
    </div>
  );
};