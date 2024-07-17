import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion-latest';

const ScrollHandler = ({ checkScrolledStart, setCheckScrolledStart }) => {
  let currentPath = useLocation().pathname;
  let [finished, setFinished] = useState(true);
  let [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(()=> console.log(finished), [finished])
  useEffect(() => {
    window.scrollTo(0, 0);
    let imageCount = 0;
    let goal;
    if(currentPath=='/home') goal=29;
    if(currentPath=='/about') goal=5;
    if(currentPath=='/project/secure-website-with-aws-and-cloudflare') goal=12;
    if(currentPath=='/project/cisco-wlc') goal=13;
    if(currentPath=='/project/active-directory-and-splunk') goal=12;
    if(currentPath=='/project/kali-linux-pen-test') goal=10;
    if(currentPath=='/project/transparency-chat-app') goal=16;
    if(currentPath=='/project/virtual-dining-restraunt-simulation') goal=9;
    if(currentPath=='/project/random-password-generator') goal=6;
    if(currentPath=='/project/weather-app') goal=9;
    if(currentPath=='/project/quick-quiz') goal=8;
    if(currentPath=='/project/random-math-problem-generator') goal=10;

    const timeoutId = setTimeout(() => {
      if(goal>imageCount){
        setFinished(false);
      }
    }, 300);
    let waitFinish;
    const handleImageLoad = (event) => {
      imageCount++;
      if(imageCount >= goal){
        console.log('finished',goal)
        waitFinish = setTimeout(() => {
          setFinished(true);
        }, 200);
      }
      setLoadingProgress(Math.round((imageCount/goal)*100));
    };

    const images = document.querySelectorAll('img');

    images.forEach((img) => {
      img.addEventListener('load', handleImageLoad);
    });

    return () => {
      clearTimeout(timeoutId);
      clearTimeout(waitFinish);

      images.forEach((img) => {
        img.removeEventListener('load', handleImageLoad);
      });
    };
  }, [currentPath]);
  const handleScroll = () => {
    if (checkScrolledStart !== 2) {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;

      // Update checkScrolledStart based on scroll position
      if (scrollTop >= viewportHeight) {
        setCheckScrolledStart(2);
      } else if (scrollTop > 0) {
        setCheckScrolledStart(0);
      } else {
        setCheckScrolledStart(1);
      }

      // Calculate the background color based on scroll position
      const maxScroll = viewportHeight;
      const scrollPercentage = Math.min(scrollTop / maxScroll, 1);
      const colorInterpolation = (color1, color2, factor) => {
        const hex = (x) => {
          x = x.toString(16);
          return (x.length === 1) ? '0' + x : x;
        };

        const r1 = parseInt(color1.substring(1, 3), 16);
        const g1 = parseInt(color1.substring(3, 5), 16);
        const b1 = parseInt(color1.substring(5, 7), 16);

        const r2 = parseInt(color2.substring(1, 3), 16);
        const g2 = parseInt(color2.substring(3, 5), 16);
        const b2 = parseInt(color2.substring(5, 7), 16);

        const r = Math.round(r1 + factor * (r2 - r1));
        const g = Math.round(g1 + factor * (g2 - g1));
        const b = Math.round(b1 + factor * (b2 - b1));
        return `#${hex(r)}${hex(g)}${hex(b)}`;
      };

      const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
      const thirdColor = getComputedStyle(document.documentElement).getPropertyValue('--third-color').trim();
      const backgroundColor = colorInterpolation(thirdColor, primaryColor, scrollPercentage);

      const targetElement = document.documentElement;
      if (targetElement) {
        targetElement.style.backgroundColor = backgroundColor;
      }
    }
  };
  useEffect(()=>{
    if (currentPath !== '/home') {
      return;
    }
    handleScroll();
  },[])
  
  useEffect(() => {
    if (currentPath !== '/home') {
      return;
    }
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [checkScrolledStart, setCheckScrolledStart, currentPath]);

  return (
    <AnimatePresence>
      {!finished && (
        <LoadingAnimation loadingProgress={loadingProgress} key={`loading-animation-${finished}`} />
      )}
    </AnimatePresence>
  );
};


let LoadingAnimation = ({loadingProgress}) => {
  useEffect(() => {
    // Disable scrolling on the body and remove the scroll bar
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    // Cleanup function to reset the overflow property when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  const loadingScreenStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100vh',
    width: '100vw',
    fontSize: '4rem',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    color: 'white',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 100000
  };

  const dotAnimation = {
    y: ["0rem", "-1rem", "0rem"], // Move up and down
  };
  const loadingContainerStyle = {
    width: '90vmin',
    height: '3rem',
    border: '0.2rem var(--secondary-color) solid',
    borderRadius: '1rem',
    overflow: 'hidden',
    margin: '0.7rem auto',
    marginBottom: '2rem'
  };

  const loadingBarStyle = {
    height: '100%',
    backgroundColor: 'var(--secondary-color)'
  };

  return (
    <motion.div
      style={loadingScreenStyle}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 0.5, ease: 'easeOut'}}
    >
      {/* style={{marginRight: 'auto', marginLeft: 'calc((100vw - 90vmin)/2)'}} */}
      <div>
        <span>Loading</span>
        <motion.span
          animate={dotAnimation}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 0
          }}
          style={{ marginLeft: '0.5rem', display: 'inline-block' }}
        >
          .
        </motion.span>
        <motion.span
          animate={dotAnimation}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 0.2
          }}
          style={{ marginLeft: '0.5rem', display: 'inline-block' }}
        >
          .
        </motion.span>
        <motion.span
          animate={dotAnimation}
          transition={{
            duration: 0.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 0.5,
            delay: 0.4
          }}
          style={{ marginLeft: '0.5rem', display: 'inline-block' }}
        >
          .
        </motion.span>
      </div>
      <div style={loadingContainerStyle}>
        <motion.div
          style={{ ...loadingBarStyle, width: `${loadingProgress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </motion.div>
  );
};
export default ScrollHandler;
