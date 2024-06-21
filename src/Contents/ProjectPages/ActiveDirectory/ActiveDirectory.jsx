import React from 'react'
import s from './ActiveDirectory.module.css'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function ActiveDirectory() {
  return (
    <div>
      <TitleText backC={'#193f50'}>
        <h1>Configuring Active Directory & splunk</h1>
        <h2>Set up the user in an OU, implemented a PowerShell script, and set up DHCP. Then, configured and tested Splunk by attacking with Kali.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Initial setup</LargeText>
        <MediumSection>
          <MediumText>Diagram</MediumText>
          <SmallText>First, I set up an EC2 instance, and while doing so, I created a key pair and saved it in a file so I could use it for file transfer.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/5.png" />
        </MediumSection>
      </LargeSection>
    </div>
  )
}
