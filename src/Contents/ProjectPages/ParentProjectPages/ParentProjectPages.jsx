import React from 'react'
import s from './ParentProjectPages.module.css'
import { useParams } from 'react-router-dom'
import WebServerAWS from '../Contents/WebServerAWS.jsx';
import ActiveDirectory from '../Contents/ActiveDirectory.jsx';
import WirelessController from '../Contents/WirelessController.jsx';
export default function ParentProjectPages() {
  const { projectName } = useParams();
  return (
    <div className={s.AllProjectsParent}>
        {projectName=='cisco-wlc' && <WirelessController /> }
        {projectName=='secure-website-with-aws-and-cloudflare' && <WebServerAWS /> }
        {projectName=='active-directory-and-splunk' && <ActiveDirectory /> }
        {projectName=='kali-linux-pen-test' && <WebServerAWS /> }
    </div>
  )
}
