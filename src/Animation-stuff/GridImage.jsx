import React, { useState, useEffect, forwardRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useAnimation } from 'framer-motion';

const GridImage = forwardRef(({ className, imagePath, alt }, ref) => {
  const numItems = 49; // 7x7 grid
  const rows = 7;
  const cols = 7;

  // Animation variant
  const itemVariants = {
    hidden: { y: '5rem',x: '5rem', opacity: 0 },
    visible: (index) => ({
      y: '0rem',
      x: '0rem',
      opacity: 1,
      transition: {
        delay: index * 0.02, // Adjust delay as needed
        duration: 0.1,
      },
    }),
  };

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    overflow: 'hidden',
    position: 'relative',
  };

  const itemStyle = {
    width: '100%',
    height: '100%',
    backgroundSize: `${cols * 100}% ${rows * 100}%`, // Adjust according to the grid size
    position: 'relative',
  };
  const [shouldLoad, setShouldLoad] = useState(false);

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
        console.log(inView)
        setShouldLoad(true)
      }
    }
  }, [controls, inView, entry]);
  let [checkImageLoaded, setCheckImageLoaded] = useState(false);
  let [allItemsVisible,setAllItemsVisible] = useState(false);
  let [countItem, setCountItem] = useState(0);
useEffect(()=> console.log(countItem),[countItem])
  return (
    <div ref={combinedRef} className={className} style={containerStyle}>
        <div className={className} style={containerStyle}>
            {Array.from({ length: numItems }).map((_, index) => {
                const row = Math.floor(index / cols);
                const col = index % cols;
                const isLastItem = index === numItems - 1;

                return (
                <motion.div
                    key={index}
                    custom={index}
                    initial="hidden"
                    animate={(shouldLoad && checkImageLoaded )  ? "visible" : "hidden"}
                    variants={itemVariants}
                    style={{
                    ...itemStyle,
                    backgroundImage: `url(${imagePath})`,
                    backgroundPosition: `${(col / (cols - 1)) * 100}% ${(row / (rows - 1)) * 100}%`,
                    gridColumn: col + 1,
                    gridRow: row + 1,
                    }}
                    onAnimationComplete={() => {
                      if (isLastItem) {
                          setAllItemsVisible(true);
                      }
                      setCountItem(old=>old+1)
                  }}
                ></motion.div>
                );
            })}
          <motion.img
            onLoad={() => setCheckImageLoaded(true)}
            className={className}
            src={imagePath}
            alt={alt}
            style={{ display: shouldLoad && countItem%49==0 ? 'block' : 'none', position: 'absolute', zIndex: -1, opacity: 0 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: shouldLoad && countItem%49==0 && allItemsVisible ? 1 : 0, transition: { delay: 0.3, duration: 0.2 } }}
          />
        </div>
    </div>
  );
});

export default GridImage;
