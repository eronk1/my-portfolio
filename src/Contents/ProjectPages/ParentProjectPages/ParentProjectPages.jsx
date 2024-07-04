import React, {useEffect, useState} from 'react'
import s from './ParentProjectPages.module.css'
import { useParams, useLocation } from 'react-router-dom'
import WebServerAWS from '../Contents/WebServerAWS.jsx';
import ActiveDirectory from '../Contents/ActiveDirectory.jsx';
import WirelessController from '../Contents/WirelessController.jsx';
import KaliLinux from '../Contents/KaliLinux.jsx';
import ChatApp from '../Contents/ChatApp2.jsx';
import WeatherApp from '../Contents/WeatherApp.jsx';

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