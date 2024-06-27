import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function ActiveDirectory() {
  return (
    <div>
      <TitleText backC={'#083587'}>
          <h1>Configuring Active Directory & Splunk</h1>
          <h2>Set up the user in an OU, implemented a PowerShell script, and configured DHCP. Then, configured and tested Splunk by attacking it with Kali.</h2>
      </TitleText>
      <LargeSection>
          <LargeText>Initial setup</LargeText>
          <MediumSection>
              <MediumText>Diagram</MediumText>
              <SmallText>I worked extensively with VirtualBox, and this is the diagram I ended up with. The components in this diagram are simulated using VirtualBox.</SmallText>
              <SmallText>There is an internal NAT named AD-Project with a subnet of 192.168.10.0/24.</SmallText>
              <SmallText>There are two NICs in the AD Windows server. One is connected externally, while the other is internal. The internal NIC assigns IP addresses to all clients in its network.</SmallText>
              <SmallText>Alongside the AD server, the Splunk server and the attacker (Kali) are also in the NAT network.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/5.png" />
          </MediumSection>
          <MediumSection>
              <MediumText>Virtual Box Setup</MediumText>
              <SmallText>Here, I set up all the necessary configurations in each ISO and virtual environment.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/5.png" />
          </MediumSection>
          <MediumSection>
              <MediumText>NIC Config</MediumText>
              <SmallText>Afterward, I configured the IP addresses, DNS server, and default gateway for each OS.</SmallText>
              <SmallText>This is how I configured the NIC in Kali.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/9.png" />
          </MediumSection>
      </LargeSection>
      <LargeSection>
          <LargeText>Active Directory Config</LargeText>
          <MediumSection>
              <MediumText>DHCP setup</MediumText>
              <SmallText>All the users need information like the default gateway and an IP address, so I configured DHCP on Active Directory to provide this.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/10.png" />
          </MediumSection>
          <MediumSection>
              <MediumText>Organizational Unit and User setup</MediumText>
              <SmallText>Here, I created two OUs named "HR" and "IT."</SmallText>
              <SmallText>In this picture, I am creating a user for the "HR" OU.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/50.png" />
          </MediumSection>
          <MediumSection>
              <MediumText>Power Shell Script</MediumText>
              <SmallText>I targeted the "IT" OU with this script.</SmallText>
              <SmallText>I gave each user an "officer-" tag for no particular reason.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/60.png" />
          </MediumSection>
      </LargeSection>
      <LargeSection>
          <LargeText>Attacking AD with Kali & Detecting with Splunk</LargeText>
          <MediumSection>
              <MediumText>Password Cracking AD with Kali</MediumText>
              <SmallText>I first acquired the IP address and enabled RDP on the VM I was going to attack.</SmallText>
              <SmallText>I then installed Crowbar on Kali and used commonly known passwords to brute force the account's password on the VM.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/80.png" />
          </MediumSection>
          <MediumSection>
              <MediumText>Detection with Splunk</MediumText>
              <SmallText>After an attack was made, I searched for recent events and narrowed them down.</SmallText>
              <SmallText>I then searched for Splunk event 4625, which turned out to be failed login attempts.</SmallText>
              <SmallText>Due to the number of attempts in a short timespan, it can be concluded that it was an attempted brute force password attack.</SmallText>
              <ImgSec ImgSrc="/activeDirectory/90.png" />
          </MediumSection>
      </LargeSection>
      <LargeSection>
          <MediumSection>Final Takeaways</MediumSection>
          <SmallText>I learned to develop my own internal network and gained a general understanding of what Splunk and Active Directory are like. Active Directory was interesting because I was able to understand why it is used often in the IT world.</SmallText>
      </LargeSection>
    </div>
  )
}
