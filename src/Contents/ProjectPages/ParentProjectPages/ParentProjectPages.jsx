import React from 'react'
import s from './ParentProjectPages.module.css'
import { useParams } from 'react-router-dom'
import WebServerAWS from '../WebServerAWS/WebServerAWS';
import ActiveDirectory from '../ActiveDirectory/ActiveDirectory';

export default function ParentProjectPages() {
  const { projectName } = useParams();
  return (
    <div className={s.AllProjectsParent}>
        {projectName=='cisco-wlc' && <WebServerAWS /> }
        {projectName=='secure-website-with-aws-and-cloudflare' && <WebServerAWS /> }
        {projectName=='active-directory-and-splunk' && <ActiveDirectory /> }
        {projectName=='kali-linux-pen-test' && <WebServerAWS /> }
    </div>
  )
}
