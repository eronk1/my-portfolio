import React, { useEffect, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const AboutMeAnimate = forwardRef(({ children, ...props }, ref) => {
    const controls = useAnimation();
    const [inViewRef, inView, entry] = useInView({
      triggerOnce: true,
      threshold: 0.5, // Adjust this value to control how much of the element needs to be visible
    });
  
    const combinedRef = (node) => {
      inViewRef(node);
      if (ref) {
        ref.current = node;
      }
    };
  
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