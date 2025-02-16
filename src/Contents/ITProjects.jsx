import React, { useState } from 'react';
import s from './ITProjects.module.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import AnimateIn from '../Animation-stuff/AnimateIn';
import { allBlogs } from './ProjectPages/ParentProjectPages/blogsAggregator.jsx';

export default function ITProjects() {
  // Static projects (unchanged)
  const ciscoWLC = {
    title: 'Configuring AP with WLC',
    desc: 'Configured Cisco access point and its group with Catalyst 9800-CL Wireless Controller.',
    imgLink: '/ciscoWLC/0.png',
    navigateLink: 'cisco-wlc'
  };
  const aws = {
    title: 'Setting Up a Website with AWS and Cloudflare',
    desc: 'This article explains the process and challenges encountered during setup.',
    imgLink: '/projectAWS/awsProject.png',
    navigateLink: 'secure-website-with-aws-and-cloudflare'
  };
  const activeDirectory = {
    title: 'Configuring Active Directory & Splunk',
    desc: 'Set up OU, implemented PS script, configured DHCP, tested Splunk with Kali.',
    imgLink: '/activeDirectory/0.png',
    navigateLink: 'active-directory-and-splunk'
  };
  const kaliLinux = {
    title: 'Basic PenTest Using Kali',
    desc: 'Used Kali to perform basic passive/active reconnaissance and DoS.',
    imgLink: '/kaliLinux/0.png',
    navigateLink: 'kali-linux-pen-test'
  };

  // Convert each discovered blog into a project card
  const dynamicBlogProjects = allBlogs.map((blog) => {
    const { folderName, data: blogJson, coverImage } = blog;
    const blogTitle = blogJson?.headers?.title || folderName;
    const blogDesc = blogJson?.headers?.subject || 'A new blog.';
    // Use the computed coverImage; if none, fallback to a default image.
    const cover = coverImage || '/assets/noimage.png';

    return {
      title: blogTitle,
      desc: blogDesc,
      imgLink: cover,
      navigateLink: `blog-${folderName}`
    };
  });

  const combinedProjects = [
    aws,
    ciscoWLC,
    activeDirectory,
    kaliLinux,
    ...dynamicBlogProjects
  ];

  // 2-column layout split
  const mid = Math.ceil(combinedProjects.length / 2);
  const leftColumn = combinedProjects.slice(0, mid);
  const rightColumn = combinedProjects.slice(mid);

  return (
    <div className={s.ITProjectsParent}>
      <AnimateIn>
        <p className={s.ITProjectsHeader}>IT Experiences & Blogs</p>
      </AnimateIn>
      <div className={s.projectsParent}>
        <div className={s.projectColumn}>
          {leftColumn.map((proj, i) => (
            <ProjectSec key={i} projectContent={proj} />
          ))}
        </div>
        <div className={s.projectColumn}>
          {rightColumn.map((proj, i) => (
            <ProjectSec key={i} projectContent={proj} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProjectSec({ projectContent }) {
  const navigate = useNavigate();
  const { title, desc, imgLink, navigateLink } = projectContent;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <AnimateIn
      tabIndex={0}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      onFocus={() => setIsOpen(true)}
      onBlur={() => setIsOpen(false)}
      className={s.projectSecParent}
      onClick={() => navigate(`/project/${navigateLink}`)}
    >
      <img className={s.projectImg} src={imgLink} alt={title} />
      {isOpen && (
        <motion.div
          className={s.projectContentParent}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0.5 }}
          transition={{ duration: 0.05 }}
        >
          <motion.p
            className={s.title}
            initial={{ opacity: 0.2, y: '2rem' }}
            animate={{ opacity: 1, y: '0rem' }}
            exit={{ opacity: 0.2, y: '2rem' }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            {title}
          </motion.p>
          <motion.p
            className={s.desc}
            initial={{ opacity: 0.2, y: '2rem' }}
            animate={{ opacity: 0.8, y: '0rem' }}
            exit={{ opacity: 0.2, y: '2rem' }}
            transition={{ duration: 0.1, ease: 'easeOut' }}
          >
            {desc}
          </motion.p>
        </motion.div>
      )}
    </AnimateIn>
  );
}
