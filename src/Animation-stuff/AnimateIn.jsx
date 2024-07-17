import React, { useEffect, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const AnimateIn = forwardRef(({ children, ...props }, ref) => {
  const controls = useAnimation();
  const [inViewRef, inView, entry] = useInView({
    triggerOnce: true,
    threshold: 0, // Adjust this value to control how much of the element needs to be visible
  });

  const combinedRef = (node) => {
    inViewRef(node);
    if (ref) {
      if (typeof ref === 'function') {
        ref(node);
      } else {
        ref.current = node;
      }
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
        visible: { 
          opacity: 1, 
          y: '0rem',
          transition: { duration: 0.1, ease: 'easeIn' }
        },
        hidden: { 
          opacity: 0, 
          y: '3rem',
          transition: { duration: 0.1, ease: 'easeIn' }
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});

export default AnimateIn;
