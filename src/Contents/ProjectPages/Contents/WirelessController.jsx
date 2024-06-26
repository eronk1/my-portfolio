import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function WirelessController() {
  return (
    <div>
        <TitleText backC={'#56006e'}>
            <h1>Configuring AP with WLC</h1>
            <h2>Configured Cisco access point and its group with Catalyst 9800-CL Wireless Controller.</h2>
        </TitleText>
        <LargeSection>
            <LargeText>Initial setup</LargeText>
            <MediumSection>
                <MediumText>Device Setup</MediumText>
                <SmallText>First, I set up the Access Point (AP) by connecting the Ethernet to the home router.</SmallText>
                <SmallText>I then connected the serial cable to the AP and accessed the AP CLI using PuTTY.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/2.png" />
            </MediumSection>
            <MediumSection>
                <MediumText>WLC Setup</MediumText>
                <SmallText>Inside the CLI, I configured the IP address, username, and password so that I could access it from the web interface.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/3.png" />
                <SmallText>Finally, I went back to my PC and accessed the embedded WLC using the IP address and login information I configured.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/5.png" />
            </MediumSection>
        </LargeSection>
        <LargeSection>
            <LargeText>WLC Config</LargeText>
            <MediumSection>
                <MediumText>WLAN Profile</MediumText>
                <SmallText>First, I went into Configurations {">"} Wireless Setup {">"} Advanced.</SmallText>
                <SmallText>I added a new WLAN profile with the SSID cags2, enabling only the 5GHz frequency.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/9.png" />
                <SmallText>Then I enabled WPA2 PSK security with an ASCII format password.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/10.png" />
            </MediumSection>
            <MediumSection>
                <MediumText>Policy Tag</MediumText>
                <SmallText>Afterward, I grouped the WLAN profile with the pre-configured Policy Profile on the Policy tag named cags2.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/20.png" />
            </MediumSection>
            <MediumSection>
                <MediumText>Applying into the AP</MediumText>
                <SmallText>I created a tag for the AP using the preconfigured Site and RF profile with the policy I had just created.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/91.png" />
                <SmallText>I then deployed it to the AP and saved all the configurations I made.</SmallText>
                <ImgSec ImgSrc="/ciscoWLC/95.png" />
                <MediumText>Deployment Result</MediumText>
                <ImgSec ImgSrc="/ciscoWLC/100.png" />
            </MediumSection>
        </LargeSection>
        <LargeSection>
            <MediumSection>
                <MediumText>Final Takeaways</MediumText>
                <SmallText>I had a lot of fun tinkering with different WLC mechanisms, which allowed me to put my wireless Cisco knowledge into practice. I think this experience helped me improve my knowledge of the wireless world in networking.</SmallText>
            </MediumSection>
        </LargeSection>
    </div>
  )
}
