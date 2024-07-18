import React, { useEffect, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const AboutMeAnimate = forwardRef(({ children, ...props }, ref) => {
    const controls = useAnimation();
    let [scrollViewThreshold,setScrollViewThreshold] = useState(0.5);
    const [inViewRef, inView, entry] = useInView({
      triggerOnce: true,
      threshold: scrollViewThreshold, // Adjust this value to control how much of the element needs to be visible
    });
  
    const combinedRef = (node) => {
      inViewRef(node);
      if (ref) {
        ref.current = node;
      }
    };
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth <= 1030) {
          setScrollViewThreshold(0)
        } else {
          setScrollViewThreshold(0.5)
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
    useEffect(() => {
      if (entry) {
        const isScrolledPast = entry.boundingClientRect.top < 0;
        if (inView || isScrolledPast) {
          controls.start('visible');
        }
      }
    }, [controls, inView, entry]);

  return (
    <motion.div
      ref={combinedRef}
      initial="hidden"
      animate={controls}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
        transition: { duration: 0.2, ease: 'easeIn' }
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default AboutMeAnimate;