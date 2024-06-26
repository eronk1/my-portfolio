import React, {useState,useEffect} from 'react'
import s from './ProjectPagesElements.module.css'
import { motion, AnimatePresence } from 'framer-motion'
export function SmallText({children}) {
    return (
      <div className={s.SmallTextParent}>
          {children}
      </div>
    )
  }

export function MediumText({children}) {
  return (
    <div className={s.MediumTextParent}>
        {children}
    </div>
  )
}

export function LargeText({children}) {
    return (
      <div className={s.LargeTextParent}>
          {children}
      </div>
    )
}
export function TitleText({children,backC}) {
  return (
    <div className={s.TitleTextParent} style={{background: backC}}>
      <div className={s.TitleText}>
        {children}
      </div>
    </div>
  )
}

export function LargeSection({children}){
  return(
    <div className={s.LargeSectionParent}>
      {children}
    </div>
  )
}
export function MediumSection({children}){
  return(
    <div className={s.MediumSectionParent}>
      {children}
    </div>
  )
}


export function ImgSec({ ImgSrc }) {
  const [zoomLevel, setZoomLevel] = useState(0); // 0: not zoomed, 1: zoomed in once, 2: zoomed in twice
  const [transformOrigin, setTransformOrigin] = useState({ x: '50%', y: '50%' });

  const toggleZoom = (event) => {
    setZoomLevel((prevZoomLevel) => {
      if (prevZoomLevel === 0) {
        return 1;
      }
      if (prevZoomLevel === 1) {
        const rect = event.target.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        setTransformOrigin({ x: `${x}%`, y: `${y}%` });
        return 2;
      } else {
        return 1;
      }
    });
  };

  const handleOutsideClick = () => {
    setZoomLevel(0);
  };

  const handleEscape = (event) => {
    if (event.key === 'Escape') {
      setZoomLevel(0);
    }
  };

  useEffect(() => {
    if (zoomLevel > 0) {
      document.body.classList.add(s.noScroll);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove(s.noScroll);
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove(s.noScroll); // Clean up in case the component unmounts
      document.removeEventListener('keydown', handleEscape);
    };
  }, [zoomLevel]);

  return (
    <>
      <div className={s.imageContainer}>
        <img
          className={s.ImgSecParent}
          src={ImgSrc}
          alt="Image failed to load :("
          onClick={toggleZoom}
        />
      </div>
      <AnimatePresence>
        {zoomLevel > 0 && (
          <motion.div
            className={s.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div onClick={handleOutsideClick} className={s.pressurePlate}></div>
            <motion.img
              initial={{ scale: 0.5 }}
              animate={{ scale: zoomLevel === 1 ? 1 : 2.5 }}
              exit={{ scale: 0.5 }}
              transition={{ duration: 0.3 }}
              className={s.zoomedImage}
              src={ImgSrc}
              alt="Zoomed view"
              onClick={toggleZoom}
              style={{
                cursor: zoomLevel === 1 ? 'zoom-in' : 'zoom-out',
                transformOrigin: `${transformOrigin.x} ${transformOrigin.y}`
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}