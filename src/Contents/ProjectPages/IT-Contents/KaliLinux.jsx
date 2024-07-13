import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function KaliLinux() {
  return (
    <div>
      <TitleText backC={'#005163'}>
          <h1>Basic PenTest Using Kali</h1>
          <h2>Used Kali to perform basic passive/active reconnaissance and DoS.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Passive Reconnaissance</LargeText>
        <MediumSection>
            <MediumText>Using theHarvester</MediumText>
            <SmallText>First, I installed the necessary dependency and looked at the options.</SmallText>
            <SmallText>I tried it on a domain example.com with the <code>-d</code> option.</SmallText>
            <SmallText>Searched Bing and DuckDuckGo with the <code>-b</code> option.</SmallText>
            <SmallText>Looked for 10,000 searches for each with the <code>-l</code> option.</SmallText>
            <SmallText>Made it verbose with the <code>-v</code> option and stored it on cags2Harvest.html with the <code>-f</code> option.</SmallText>
            <ImgSec ImgSrc="/kaliLinux/3.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Analyzing the Result</MediumText>
            <SmallText>After the search, three emails were found along with seven subdomains.</SmallText>
            <SmallText>This means that future reconnaissance and attack vectors should also consider these emails and subdomains.</SmallText>
            <ImgSec ImgSrc="/kaliLinux/5.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Active Reconnaissance</LargeText>
        <MediumSection>
          <MediumText>Using nmap</MediumText>
          <SmallText>The <code>-sS</code> flag is used to send SYN packets to target TCP ports. If the port is open, it responds with a SYN-ACK.</SmallText>
          <SmallText>If I were to check UDP ports too, I would add the <code>-sU</code> flag.</SmallText>
          <SmallText>Here, the target is my domain chat.cags2.com.</SmallText>
          <ImgSec ImgSrc="/kaliLinux/7.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Analyzing the Result</MediumText>
          <SmallText>As shown in the results, chat.cags2.com has three TCP ports open: 80, 443, and 8080.</SmallText>
          <SmallText>These ports can be used to potentially exploit vulnerabilities.</SmallText>
          <ImgSec ImgSrc="/kaliLinux/10.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>DoS attack</LargeText>
        <MediumSection>
          <MediumText>Using hping3</MediumText>
          <SmallText>This tool allows for custom TCP/IP packet creation.</SmallText>
          <SmallText>The <code>-S</code> sets the SYN flag in the packet to true. <code>-p 80</code> targets the HTTP port.</SmallText>
          <SmallText>The <code>-i u1</code> means the packet will be sent in a 1 microsecond interval.</SmallText>
          <SmallText>Here, the target is again, my domain chat.cags2.com.</SmallText>
          <SmallText>Lastly, <code>-c 10</code> sends a count of 10 packets to the target.</SmallText>
          <ImgSec ImgSrc="/kaliLinux/18.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Analyzing the Results</MediumText>
          <SmallText>The first time the command is executed there is a 0% packet loss.</SmallText>
          <SmallText>However, the second time the command is executed there is a 100% packet loss.</SmallText>
          <SmallText>This indicates that after the first attempt, the port rate-limited, which means it's doing its job properly.</SmallText>
          <ImgSec ImgSrc="/kaliLinux/20.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
          <MediumSection>
              <MediumText>Final Takeaways</MediumText>
              <SmallText>I had a lot of fun testing various techniques for passive and active reconnaissance, as well as testing various ways to attack. These were just the few I liked the most. I am going to continue practicing penetration testing because it provides great insights into various security aspects.</SmallText>
          </MediumSection>
      </LargeSection>
    </div>
  )
}
