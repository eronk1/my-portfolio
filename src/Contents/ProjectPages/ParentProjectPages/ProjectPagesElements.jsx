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
  const [isZoomed, setIsZoomed] = useState(false);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const handleOutsideClick = () => {
    setIsZoomed(false);
  };

  useEffect(() => {
    if (isZoomed) {
      document.body.classList.add(s.noScroll);
    } else {
      document.body.classList.remove(s.noScroll);
    }

    return () => {
      document.body.classList.remove(s.noScroll); // Clean up in case the component unmounts
    };
  }, [isZoomed]);

  return (
    <>
      <div className={s.imageContainer}>
        <img className={s.ImgSecParent} src={ImgSrc} alt="Image failed to load :(" onClick={toggleZoom} />
      </div>
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            className={s.overlay}
            onClick={handleOutsideClick}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 0.3}}
          >
            <motion.img
            initial={{scale: 0.5}}
            animate={{scale: 1}}
            exit={{scale: 0.5}}
            transition={{duration: 0.3}}
            className={s.zoomedImage} src={ImgSrc} alt="Zoomed view" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}