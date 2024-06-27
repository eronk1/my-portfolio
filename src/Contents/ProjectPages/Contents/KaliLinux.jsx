import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function KaliLinux() {
  return (
    <div>
      <TitleText backC={'#005163'}>
          <h1>Basic Penetration Testing Using Kali</h1>
          <h2>Used Kali to perform basic passive/active reconnaissance and SYN flood.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Passive Reconaissance</LargeText>
        <MediumSection>
            <MediumText>Using theHarvester</MediumText>
            <SmallText>First, I installed the necessary dependency and looked at the options.</SmallText>
            <SmallText>I tried it on a domain example.com with the <code>-d</code> option.</SmallText>
            <SmallText>Searched bing and duckduckgo with the <code>-b</code> option.</SmallText>
            <SmallText>Looked for 10,000 searches for each with the <code>-l</code> option.</SmallText>
            <SmallText>Made it verbose with <code>-v</code> and stored it on cags2Harvest.html with <code>-f</code> option.</SmallText>
            <ImgSec ImgSrc="/kaliLinux/3.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Analyzing Result</MediumText>
            <SmallText>After the search 3 emails were found along with 7 subdomains.</SmallText>
            <SmallText>This means that in the future reconnaissance and attack vectors should also consider these emails and subdomains.</SmallText>
            <ImgSec ImgSrc="/kaliLinux/5.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        
      </LargeSection>
    </div>
  )
}
