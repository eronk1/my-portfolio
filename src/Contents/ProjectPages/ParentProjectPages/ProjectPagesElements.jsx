import React, {useState,useEffect} from 'react'
import s from './ProjectPagesElements.module.css'
import { motion, AnimatePresence } from 'framer-motion-latest'
import ProjectPagesElementsAnimate from '../../../Animation-stuff/ProjectPagesElementsAnimate'
import { createPortal } from 'react-dom'

export function SmallText({children}) {
    return (
      <div tabIndex={0} className={s.SmallTextParent}>
          {children}
      </div>
    )
  }

export function MediumText({children}) {
  return (
    <div tabIndex={0} className={s.MediumTextParent}>
        {children}
    </div>
  )
}
export function LargeText({children}) {
    return (
      <div tabIndex={0} className={s.LargeTextParent}>
          {children}
      </div>
    )
}
export function TitleText({children,backC}) {
  return (
    <div className={s.TitleTextParent} style={{background: backC}}>
      <ProjectPagesElementsAnimate tabIndex={0} className={s.TitleText}>
        {children}
      </ProjectPagesElementsAnimate>
    </div>
  )
}

export function LargeSection({children}){
  return(
    <ProjectPagesElementsAnimate className={s.LargeSectionParent}>
      {children}
    </ProjectPagesElementsAnimate>
  )
}
export function MediumSection({children}){
  return(
    <ProjectPagesElementsAnimate className={s.MediumSectionParent}>
      {children}
    </ProjectPagesElementsAnimate>
  )
}


export function ImgSec({ ImgSrc }) {
  const [zoomLevel, setZoomLevel] = useState(0); // 0: not zoomed, 1: zoomed in once, 2: zoomed in twice
  const [transformOrigin, setTransformOrigin] = useState({ x: '50%', y: '50%' });
  const [isDragging, setIsDragging] = useState(false);
  
  const toggleZoom = (event) => {
    if(isDragging){
      event.preventDefault();
      return;
    }
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
    const htmlElement = document.documentElement;
    if (zoomLevel > 0) {
      document.body.classList.add(s.noScroll);
      htmlElement.classList.add(s.noScroll);
      document.addEventListener('keydown', handleEscape);
    } else {
      document.body.classList.remove(s.noScroll);
      htmlElement.classList.remove(s.noScroll);
      document.removeEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.classList.remove(s.noScroll); // Clean up in case the component unmounts
      document.documentElement.classList.remove(s.noScroll);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [zoomLevel]);

  const [maxDimensions, setMaxDimensions] = useState({ width: 0, height: 0 });
  const [maxDimensionsOriginal, setMaxDimensionsOriginal] = useState({ width: 0, height: 0 });

  const handleImageLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const container = e.target.parentNode;
    const maxWidth = container.clientWidth * 0.9;
    const maxHeight = container.clientHeight * 0.9;

    const widthRatio = maxWidth / naturalWidth;
    const heightRatio = maxHeight / naturalHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    const newWidth = naturalWidth * ratio;
    const newHeight = naturalHeight * ratio;

    setMaxDimensions({
      width: newWidth,
      height: newHeight,
    });
  };


  
  const handleImageLoadWith70vh = (e) => {
    const { naturalWidth, naturalHeight } = e.target;
    const container = e.target.parentNode;
    const maxWidth = container.clientWidth;
    console.log(maxWidth)
    const maxHeight = window.innerHeight * 0.7;

    const widthRatio = maxWidth / naturalWidth;
    const heightRatio = maxHeight / naturalHeight;
    const ratio = Math.min(widthRatio, heightRatio);

    const newWidth = naturalWidth * ratio;
    const newHeight = naturalHeight * ratio;

    setMaxDimensionsOriginal({
      width: newWidth,
      height: newHeight,
    });
  };
  const overlay = (
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
            drag={zoomLevel === 2}
            onDragStart={()=>setIsDragging(true)}
            onDragEnd={()=>setIsDragging(false)}
            dragMomentum={false}
            // animate={zoomLevel === 2 ? {} : { x: 0, y: 0 }}
            initial={{ scale: 0.5 }}
            animate={{ 
              scale: zoomLevel === 1 ? 1 : 2.5,
              ...(zoomLevel === 2 ? {} : { x: 0, y: 0 })
            }}
            exit={{ scale: 0.5 }}
            transition={{ duration: 0.3 }}
            className={s.zoomedImage}
            src={ImgSrc}
            alt="Zoomed view"
            onClick={toggleZoom}
            onLoad={handleImageLoad}
            style={{
              width: maxDimensions.width,
              height: maxDimensions.height,
              cursor: zoomLevel === 1 ? 'zoom-in' : 'zoom-out',
              transformOrigin: `${transformOrigin.x} ${transformOrigin.y}`
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      <div className={s.imageContainer}>
        <img
          className={s.ImgSecParent}
          src={ImgSrc}
          alt="Image failed to load :("
          onClick={toggleZoom}
          style={{
            width: maxDimensionsOriginal.width,
            height: maxDimensionsOriginal.height
          }}
          onLoad={handleImageLoadWith70vh}
        />
      </div>
      {createPortal(overlay, document.body)}
    </>
  );
}
export function DemoSection({children}){
  const [firstChild, secondChild] = React.Children.toArray(children);

  // useEffect(() => {
  //     const handleFullscreenChange = () => {
  //         const iframe = document.getElementById('youtube-iframe');
  //         if (document.fullscreenElement && document.fullscreenElement === iframe) {
  //             console.log('Iframe has entered fullscreen mode!');
  //             onEnterFullscreen();
  //         } else {
  //             console.log('Iframe has exited fullscreen mode!');
  //             onExitFullscreen();
  //         }
  //     };

  //     // Add event listener for fullscreen change
  //     document.addEventListener('fullscreenchange', handleFullscreenChange);

  //     // Cleanup function to remove the event listener
  //     return () => {
  //         document.removeEventListener('fullscreenchange', handleFullscreenChange);
  //     };
  // }, []);

  // const onEnterFullscreen = () => {
  //     console.log('Fullscreen button was clicked to enter fullscreen!');
  //     // Add any specific functionality for entering fullscreen here
  // };

  // const onExitFullscreen = () => {
  //     console.log('Fullscreen button was clicked to exit fullscreen!');
  //     // Add any specific functionality for exiting fullscreen here
  // };
  
  return(
    <LargeSection>
      <MediumSection>
        <LargeText>Website Demo</LargeText>
        {secondChild}
        <div className={s.imageContainerDemoSection}>
          {firstChild}
        </div>
      </MediumSection>
    </LargeSection>
  )
}