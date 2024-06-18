import React from 'react'
import s from './ParentProjectPages.module.css'
import { useParams } from 'react-router-dom'
import WebServerAWS from '../WebServerAWS/WebServerAWS';

export default function ParentProjectPages() {
  const { projectName } = useParams();
  return (
    <div className={s.AllProjectsParent}>
        {projectName=='cisco-wlc' && <WebServerAWS /> }
        {projectName=='secure-website-with-aws-and-cloudflare' && <WebServerAWS /> }
        {projectName=='cloudflare-dns-ssl-config' && <WebServerAWS /> }
        {projectName=='active-directory' && <WebServerAWS /> }
        {projectName=='kali-linux-pen-test' && <WebServerAWS /> }
    </div>
  )
}
