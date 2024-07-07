import React, {useEffect, useState} from 'react'
import s from './ParentProjectPages.module.css'
import { useParams, useLocation } from 'react-router-dom'
import WebServerAWS from '../IT-Contents/WebServerAWS.jsx';
import ActiveDirectory from '../IT-Contents/ActiveDirectory.jsx';
import WirelessController from '../IT-Contents/WirelessController.jsx';
import KaliLinux from '../IT-Contents/KaliLinux.jsx';
import ChatApp from '../Web-Contents/ChatApp2.jsx';
import WeatherApp from '../Web-Contents/WeatherApp.jsx';
import QuickQuiz from '../Web-Contents/QuickQuiz.jsx';
import MathApp from '../Web-Contents/MathApp.jsx';
import VDRS from '../Web-Contents/VDRS.jsx';
import PasswordApp from '../Web-Contents/PasswordApp.jsx';

export default function ParentProjectPages() {
  const { projectName } = useParams();
  return (
    <div className={s.AllProjectsParent}>
      <ScrollToTop />
        {projectName=='cisco-wlc' && <WirelessController /> }
        {projectName=='secure-website-with-aws-and-cloudflare' && <WebServerAWS /> }
        {projectName=='active-directory-and-splunk' && <ActiveDirectory /> }
        {projectName=='kali-linux-pen-test' && <KaliLinux /> }
        {projectName=='transparency-chat-app' && <ChatApp /> }
        {projectName=='weather-app' && <WeatherApp /> }
        {projectName=='quick-quiz' && <QuickQuiz/> }
        {projectName=='random-math-problem-generator' && <MathApp /> }
        {projectName=='virtual-dining-restraunt-simulation' && <VDRS /> }
        {projectName=='random-password-generator' && <PasswordApp /> }
    </div>
  )
}
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};