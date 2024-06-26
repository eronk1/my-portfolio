import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function WirelessController() {
  return (
    <div>
        <TitleText backC={'#56006e'}>
            <h1>Configuring AP with WLC</h1>
            <h2>Configured cisco access point and its group with Catalyst 9800-CL Wireless Controller.</h2>
        </TitleText>
        <LargeSection>
            <LargeText>Initial setup</LargeText>
            <MediumSection>
                <MediumText>AP Setup</MediumText>
                <SmallText>First, I got the Access Point (AP) set up by connecting the ethernet to the home router.</SmallText>
                <SmallText>I then connected the serial cable to the AP. Then accessed the AP CLI using PuTTY.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/2.png" />
                <SmallText>Inside the CLI, I configured the ip address and the username and password so that I can access it from the web interface.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/3.png" />
                <SmallText>Finally, I went back to my PC and accessed the embedded WLC through the IP address and the login information I configured</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/5.png" />
                
            </MediumSection>
            <MediumSection>
                <MediumText>Logging Into WLC</MediumText>

            </MediumSection>

        </LargeSection>
    </div>
  )
}
