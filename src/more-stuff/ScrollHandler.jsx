import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
const ScrollHandler = ({ setCheckScrolledStart }) => {
  let currentPath = useLocation().pathname;
  
  if(currentPath != '/home'){
    return;
  }
  useEffect(() => {
    const handleScroll = () => {
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
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setCheckScrolledStart]);

  return null; // This component doesn't render anything
};

export default ScrollHandler;
