import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function ActiveDirectory() {
  return (
    <div>
      <TitleText backC={'#3645ca'}>
        <h1>Configuring Active Directory & Splunk</h1>
        <h2>Set up the user in an OU, implemented a PowerShell script, and set up DHCP. Then, configured and tested Splunk by attacking with Kali.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Initial setup</LargeText>
        <MediumSection>
          <MediumText>Diagram</MediumText>
          <SmallText>I played with the virtual box a lot and this is the diagram I ended up with. The components inside this diagram is simulated using virtual box.</SmallText>
          <SmallText>There is a internal NAT named AD-Project with a subnet of 192.168.10.0/24.</SmallText>
          <SmallText>There are 2 NICs inside for the AD Windows server. One is connected to the outside while the other internally. The internal NIC assigns the ip address to all clients in its in network.</SmallText>
          <SmallText>Alongside the AD server the Splunk server and the attacker(kali) is also inside the NAT network. </SmallText>
          <ImgSec ImgSrc="/activeDirectory/5.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Virtual Box Setup</MediumText>
          <SmallText>Here, I set up all the necessary configurations in each ISO and virtual enviornment.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/5.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>NIC Config</MediumText>
          <SmallText>After, I configured the ip addresses and dns server along with the default gateway for each OS.</SmallText>
          <SmallText>This is how I configured NIC in kali.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/9.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Active Directory Config</LargeText>
        <MediumSection>
          <MediumText>DHCP setup</MediumText>
          <SmallText>All the users needs information like the default gateway and needs an ip address so I configured DHCP on active Directory to do just that.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/10.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Organizational Unit and User setup</MediumText>
          <SmallText>In here I created 2 OU which are "HR" and "IT". </SmallText>
          <SmallText>In this picture I am creating a user for the "HR" OU.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/50.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Power Shell Script</MediumText>
          <SmallText>I targeted the "IT" OU in this script.</SmallText>
          <SmallText>I gave each user a "officer-" tag for absolutely no reason in particular.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/60.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Attacking AD with Kali & Detecting with Splunk</LargeText>
        <MediumSection>
          <MediumText>Password Cracking AD with Kali</MediumText>
          <SmallText>I first aquired the IP address and enabled RDP in the VM I am going to attack.</SmallText>
          <SmallText>I then installed crowbar on Kali and then using the commonly used password I tried brute forcing the password of the account in the VM.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/80.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Detection with Splunk</MediumText>
          <SmallText>After an attack was made I searched up recent events and narrowed it down.</SmallText>
          <SmallText>I then searched up the splunk event 4625 and it turns out to be failed login attempts.</SmallText>
          <SmallText>Due to the amount of attempts in a short timespan it can be concluded it was an attempted bruteforce password attack.</SmallText>
          <ImgSec ImgSrc="/activeDirectory/90.png" />
        </MediumSection>
      </LargeSection>
    </div>
  )
}
