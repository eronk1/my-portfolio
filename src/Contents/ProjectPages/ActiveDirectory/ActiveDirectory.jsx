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
          <SmallText>This is all inside the virtual box.</SmallText>
          <SmallText>There is a internal NAT named </SmallText>
          <ImgSec ImgSrc="/activeDirectory/5.png" />
        </MediumSection>
      </LargeSection>
    </div>
  )
}
