import React, {useState, useEffect,useRef} from 'react'
import s from './HomePage.module.css'
import GetLogoIcon from '../more-stuff/GetLogoIcon.jsx';
import { motion } from 'framer-motion';

export default function HomePage({ checkScrolledStart }) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);
  const [hideHome, setHideHome] = useState(true);
  
  useEffect(() => {
    if (checkScrolledStart === 2) {
      setStartAnimation(true);
    } else {
      setHideHome(false)
      setStartAnimation(false);
    }
  }, [checkScrolledStart]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  let instantSet = null;
  let homeHeadersRef = useRef(null);
  const calculateBoxOpacity = () => {
    const viewportHeight = window.innerHeight;
    const scrollPos = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const startScroll = viewportHeight;
    const endScroll = documentHeight - 2*viewportHeight;
    if(homeHeadersRef && homeHeadersRef.current){
      homeHeadersRef.current.style.opacity = 1 - scrollPos/viewportHeight;
    }
    if (scrollPos < startScroll) {
      return 0;
    }

    const scrollRange = endScroll - startScroll;
    const scrollProgress = (scrollPos - startScroll) / scrollRange;
    if(scrollProgress>0.5){
      if(!hideHome && (instantSet===false||instantSet===null)){
        instantSet = true;
        setHideHome(true);
      }
    }else{
      if(hideHome && (instantSet===true||instantSet===null)){
        
        instantSet = false;
        setHideHome(false)
      }
    }
    return Math.min(scrollProgress, 1);
  };
  const handleDownArrowClick = () => {
    window.scrollTo({
      top: window.scrollY + window.innerHeight * 0.9,
      behavior: 'smooth'
    });
  };

  const boxVariants = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: calculateBoxOpacity(),
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
      },
    },
  };
  return (
    <div id="all-main-section-home-page-parent" className={s.homePageParent}>
      {!hideHome && <div ref={homeHeadersRef} className={s.homeText}>
        <motion.p
          className={s.name}
          initial={{ opacity: 0 }}
          animate={{ opacity: checkScrolledStart === 2 ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          ✨ Seon Kim ✨
        </motion.p>
        <motion.p
          className={s.jobTitle}
          initial={{ opacity: 0 }}
          animate={{ opacity: checkScrolledStart === 2 ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          IT Specialist & Web Developer
        </motion.p>
        <motion.div
          className={s.socialLinks}
          initial={{ opacity: 0 }}
          animate={{ opacity: checkScrolledStart === 2 ? 0 : 1 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          <img
            tabIndex={6}
            onClick={() => window.open('https://www.linkedin.com/in/seon-mo-kim/', '_blank')}
            src="/linkedIn.svg"
            alt="LinkedIn"
          />
          <img
            tabIndex={7}
            onClick={() => window.open('https://mail.google.com/mail/?view=cm&fs=1&to=skimnumber@gmail.com', '_blank')}
            src="/gmail.svg"
            alt="Gmail"
          />
          <img
            tabIndex={8}
            onClick={() => window.open('https://github.com/eronk1/', '_blank')}
            src="/github.svg"
            alt="Github"
          />
          <img
            tabIndex={9}
            onClick={() => window.open('https://www.credly.com/users/seon-kim.37523a11', '_blank')}
            src="/credly.svg"
            alt="Credly"
          />
        </motion.div>
      </div>}
      {calculateBoxOpacity()!=0 && <motion.div
      className={s.contactMeBoxParent}
        initial="initial"
        animate={startAnimation ? "animate" : "initial"}
        variants={boxVariants}
        style={{
          position: 'fixed',
          bottom: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--third-color)', // Using CSS variable for the background color
          color: 'white',
        }}
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque ex illo dolorum perspiciatis unde repellat accusantium earum enim mollitia neque debitis, ab, incidunt corrupti nobis nostrum consectetur nam tempore! Earum, impedit. Soluta adipisci blanditiis, nostrum nisi dolores, corporis ipsum amet, fugiat reiciendis excepturi magnam eum eveniet praesentium minima totam aspernatur impedit necessitatibus architecto obcaecati ipsam vel. Doloribus harum tempora temporibus molestias voluptates modi mollitia cumque, pariatur blanditiis fuga facere quas omnis reiciendis excepturi nobis consequatur dignissimos! Iure sit consequuntur molestias ex dolorum sunt, aut dolore, laborum facere quod optio magnam deserunt totam quos placeat repellendus. Deleniti, in. Hic at nobis voluptatem corrupti eaque ea, est, ducimus iusto velit recusandae doloremque ut magni fugiat illo voluptates officia quis natus. Voluptatum cumque repellat officia! Explicabo quas repellendus vel iusto soluta. Expedita aspernatur officia assumenda in eaque dolor, porro quas veniam ratione, voluptatibus odit eius neque nulla et quod atque iure distinctio enim? Ut vero, molestiae laudantium reiciendis deserunt, iure soluta, neque optio necessitatibus nulla expedita vel animi fugiat quasi. Necessitatibus exercitationem voluptatum possimus quam, repellendus ratione nisi officiis, minus optio vero ea quos omnis perspiciatis aspernatur, quasi unde beatae mollitia! Doloremque, esse. Sapiente tenetur explicabo harum repellat corrupti architecto deserunt ex sit ab sequi quod debitis repellendus omnis, consequuntur dolorem saepe a aliquid animi magnam nam, eveniet impedit? Quam quasi quod consectetur obcaecati distinctio placeat consequatur adipisci quae error, doloremque, quisquam ducimus similique! Totam fuga excepturi sapiente recusandae dolores? Neque labore libero architecto error rerum, quibusdam voluptas sapiente aliquam dolore? Doloremque in neque explicabo laborum numquam beatae atque ab earum dignissimos fugiat deleniti consectetur, molestiae cupiditate, quae natus facere vero dolor quidem ad quas. Eum sequi, atque voluptatem sunt quaerat id iste porro tempore quas modi praesentium! Minima optio cupiditate laborum, eaque totam perspiciatis quae voluptate libero doloribus animi reprehenderit, illo nihil. Inventore asperiores culpa tempora nemo veritatis ad velit hic quam quibusdam tempore, cum ipsam voluptatum modi, saepe pariatur fugiat. Ullam, nobis. Corrupti alias eos laudantium ipsam. Praesentium nam deleniti perspiciatis error placeat cum veritatis nostrum. Sint ad voluptatibus accusamus eaque, omnis atque ullam aspernatur ipsa odit maiores animi eveniet deserunt magni voluptate! Unde provident corporis beatae esse voluptas voluptate soluta, nobis consequuntur autem laborum rem repellendus cum alias magni odio sed rerum vitae perferendis tempore similique? Fuga nam odio libero itaque delectus accusantium nesciunt fugiat impedit temporibus exercitationem voluptates ad laborum nemo et enim in velit architecto qui magnam neque laudantium accusamus, sit molestiae. Exercitationem eos quas corrupti culpa ad quasi labore doloribus nemo voluptatem molestias provident incidunt soluta est et, impedit accusamus esse quisquam autem nostrum officia animi? Soluta porro, totam, reprehenderit qui nisi molestiae eius ad, nesciunt consequatur maxime similique culpa itaque neque velit suscipit id fugiat incidunt ab. Cumque, ipsum odit. Nulla perspiciatis expedita distinctio maiores incidunt eum doloribus quod magni sunt illo asperiores, laudantium officiis deleniti temporibus, nostrum ab minus obcaecati dolore dolorum vel placeat sint consectetur excepturi. Natus laboriosam velit repellat minus, ducimus sunt corporis dolor placeat amet, sequi sapiente iure eos? Necessitatibus et dignissimos amet ipsa voluptate quae commodi autem maxime voluptas repudiandae quod magnam labore ab voluptatum, inventore esse consequatur eveniet. Aperiam, deserunt ad minima, ullam ea eos mollitia beatae debitis saepe repellat nam, accusamus fuga? Quam, consequuntur consequatur eum labore numquam praesentium aliquid maiores at dolor velit eaque et neque incidunt nostrum totam officia possimus sunt magni dolorem ea voluptas soluta vel iste. Porro quos in soluta nostrum esse ab pariatur unde excepturi culpa ad, ipsum libero! Exercitationem, pariatur. Doloribus, non modi sed est accusantium repudiandae quos sit. Inventore suscipit nesciunt iste voluptatum ipsum minus sit quae rem! Totam consectetur repellendus et quasi, aut ipsam eius? Neque repellendus, harum, dolore debitis esse pariatur non doloremque ut excepturi, at alias. Aperiam excepturi, quis quo autem quod, ipsam non laborum repellat dicta perferendis rem nesciunt sed harum voluptatibus? Minus doloremque animi laudantium incidunt voluptatum molestias aliquam ut consequatur deserunt a, excepturi ad repellendus minima in veniam fugit praesentium sit quas neque, doloribus veritatis modi et dolorum. Similique, beatae. Praesentium expedita fugiat officiis at obcaecati. Numquam inventore, ad sunt nam eligendi illum eius consectetur nisi veritatis ex, quam, sed repellendus. Exercitationem optio neque odio repellendus ducimus fugit earum autem alias ipsum hic similique fugiat voluptatem maxime laborum, qui velit eos cum obcaecati quidem! Iure pariatur fuga eveniet dolorem voluptatibus quam, nulla, dolorum aspernatur necessitatibus at reiciendis eius reprehenderit. Quod rerum, culpa explicabo consectetur molestias debitis rem possimus unde cumque numquam beatae, obcaecati doloribus error! Voluptatum corrupti, aspernatur placeat ex dolorem iusto doloremque? Voluptatem, et? Quidem, corrupti aut? Beatae, laborum quibusdam eveniet in voluptatum amet sint assumenda atque numquam nemo esse eum reiciendis aliquid consequatur eius nihil quam natus animi saepe alias, culpa corporis non nisi aspernatur. Dolor minima provident ullam nam tenetur. Ad omnis repellat neque dicta facere earum, animi iure pariatur nulla. Minus architecto odio omnis facere, aut consectetur quasi nemo nisi iure magnam tenetur quo laborum mollitia veniam corporis corrupti ab delectus quia nesciunt repudiandae quas asperiores in commodi! Et, quos tempore quam id perferendis delectus, sequi quidem cumque perspiciatis culpa incidunt deserunt nihil voluptatem vel, illo aspernatur similique. Facere distinctio, nesciunt numquam eius eos dolore saepe voluptatem provident odio vitae explicabo aliquam quo voluptatum dignissimos dolor? Porro perspiciatis ullam veritatis temporibus eaque distinctio dolore iusto dolores dicta necessitatibus inventore eligendi nobis doloribus, nihil voluptatem odio at quos alias doloremque soluta nesciunt. Voluptatum deserunt distinctio rerum quidem reprehenderit ducimus, cum optio officia repellat fugit sed facere, ipsum placeat deleniti quaerat asperiores eligendi eveniet at? Tenetur laudantium quaerat quidem amet, provident sit dolore fuga assumenda eaque tempora consequuntur eos dolores cupiditate, doloribus consectetur obcaecati magni nisi qui laborum modi animi voluptas adipisci? Suscipit error quam optio modi dolorum, id voluptatibus, aspernatur perspiciatis expedita quasi ipsam commodi totam autem maiores, temporibus impedit! Quam animi similique, ab, quo asperiores esse reiciendis ipsa optio commodi obcaecati fuga iusto doloremque odio veritatis quia laborum sunt eos aut vitae! Vel, at? Eaque, tempora placeat debitis fugiat obcaecati beatae blanditiis voluptate excepturi ab deleniti, odio cum accusantium at unde molestiae?
      </motion.div>}
      {(!hideHome && checkScrolledStart==1) && <motion.div
        style={{
          position: 'fixed',
          width: '100%',
          zIndex: 10,
          bottom: 0,
          display: 'grid',
          placeContent: 'center'
        }}
        animate={{
          y: [0, -20, 0],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
            <svg
              onClick={handleDownArrowClick}
              width="3rem"
              height="3rem"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
              fill="#000000"
              className={s.downArrowSVG}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0" />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#797979"
                strokeWidth="20.48"
              >
                <path
                  d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                  fill="#ffffff"
                />
              </g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M903.232 256l56.768 50.432L512 768 64 306.432 120.768 256 512 659.072z"
                  fill="#ffffff"
                />
              </g>
            </svg>
      </motion.div>}
      {!hideHome && <DVDthing checkScrolledStart={checkScrolledStart} />}
    </div>
  );
}


const DVDthing = ({checkScrolledStart}) => {
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
    <motion.div className={s.box} ref={boxRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: checkScrolledStart==1 ? 1 : 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
    >
      <div
        className={s.logo}
        ref={logoRef}
        style={{ top: `${position.top}px`, left: `${position.left}px`, position: 'absolute' }}
      >
        <p className={s.iLove}><span className={s.left}>I 💗</span><span className={s.right}>{text}</span></p>
        <GetLogoIcon item={text} />
      </div>
    </motion.div>
  );
};