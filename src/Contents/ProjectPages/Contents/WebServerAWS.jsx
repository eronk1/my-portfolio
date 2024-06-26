import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'
export default function WebServerAWS() {
  return (
    <div>
      <TitleText backC={'#1c2f6d'}>
        <h1>Secure Website with AWS and Cloudflare</h1>
        <h2>This article explains the process and challenges I encountered while setting up my website.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Securing Website with AWS</LargeText>
        <MediumSection>
          <MediumText>SCP Key Pair</MediumText>
          <SmallText>First, I set up an EC2 instance, and while doing so, I created a key pair and saved it in a file so I could use it for file transfer.</SmallText>
          <ImgSec ImgSrc="/projectAWS/30.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>File Transfer</MediumText>
          <SmallText>After setting up the EC2 instance, I transferred all my project files to it using the key I created.</SmallText>
          <ImgSec ImgSrc="/projectAWS/70.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>EC2 Instance Security Group</MediumText>
          <SmallText>Then, I configured the EC2 instance to allow inbound traffic for only the necessary ports.</SmallText>
          <ImgSec ImgSrc="/projectAWS/90.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>AWS Certificate Manager</MediumText>
          <SmallText>Using AWS Certificate Manager, I assigned a certificate to my app domain name (chat.cags2.com).</SmallText>
          <ImgSec ImgSrc="/projectAWS/180.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Application Load Balancer</MediumText>
          <SmallText>Then, I configured the EC2 instance to convert traffic from HTTPS to HTTP.</SmallText>
          <SmallText>For the most part, this allowed the EC2 instance to receive user traffic without any problems while still maintaining secure traffic with users. My website was securely up after this step.</SmallText>
          <ImgSec ImgSrc="/projectAWS/320.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Problems Faced and Solutions:</LargeText>

        <MediumSection>
          <MediumText>Problem:</MediumText>
          <SmallText>Due to a recent cyberattack, all non-essential ports were blocked on my school campus, causing my website to lose some of its essential function in the school campus.</SmallText>
          <MediumText>Solution:</MediumText>
          <SmallText>I tried various methods, but I found out that Nginx was the most effective. By sending requests through URL parameters, translating them, and then forwarding them to its internal ports, the issue was resolved.</SmallText>
          <ImgSec ImgSrc="/projectAWS/340.png" />
        </MediumSection>

        <MediumSection>
          <MediumText>Problem:</MediumText>
          <SmallText>While using the AWS free tier, I realized I was being charged for using the IP address in the Application Load Balancer.</SmallText>
          <MediumText>Solution:</MediumText>
          <SmallText>From the various methods I tried, I realized that using Cloudflare and installing a certificate onto the origin server was the best option so I created and downloaded the certificate in Cloudflare.</SmallText>
          <ImgSec ImgSrc="/projectAWS/360.png" />
          <SmallText>I configured Nginx to receive from port 443 with the downloaded certificate. I then enabled Full (strict) mode to establish HTTPS, allowing the load balancer to be removed entirely.</SmallText>
          <ImgSec ImgSrc="/projectAWS/370.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>
            This is the fully configured secure website:
          </MediumText>
          <MediumText>
            <a target="_blank" href="https://chat.cags2.com">https://chat.cags2.com 
              <svg style={{marginLeft:"0.5rem"}} fill="var(--secondary-color)" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5,2 L7,2 C7.55228475,2 8,2.44771525 8,3 C8,3.51283584 7.61395981,3.93550716 7.11662113,3.99327227 L7,4 L5,4 C4.48716416,4 4.06449284,4.38604019 4.00672773,4.88337887 L4,5 L4,19 C4,19.5128358 4.38604019,19.9355072 4.88337887,19.9932723 L5,20 L19,20 C19.5128358,20 19.9355072,19.6139598 19.9932723,19.1166211 L20,19 L20,17 C20,16.4477153 20.4477153,16 21,16 C21.5128358,16 21.9355072,16.3860402 21.9932723,16.8833789 L22,17 L22,19 C22,20.5976809 20.75108,21.9036609 19.1762728,21.9949073 L19,22 L5,22 C3.40231912,22 2.09633912,20.75108 2.00509269,19.1762728 L2,19 L2,5 C2,3.40231912 3.24891996,2.09633912 4.82372721,2.00509269 L5,2 L7,2 L5,2 Z M21,2 L21.081,2.003 L21.2007258,2.02024007 L21.2007258,2.02024007 L21.3121425,2.04973809 L21.3121425,2.04973809 L21.4232215,2.09367336 L21.5207088,2.14599545 L21.5207088,2.14599545 L21.6167501,2.21278596 L21.7071068,2.29289322 L21.7071068,2.29289322 L21.8036654,2.40469339 L21.8036654,2.40469339 L21.8753288,2.5159379 L21.9063462,2.57690085 L21.9063462,2.57690085 L21.9401141,2.65834962 L21.9401141,2.65834962 L21.9641549,2.73400703 L21.9641549,2.73400703 L21.9930928,2.8819045 L21.9930928,2.8819045 L22,3 L22,3 L22,9 C22,9.55228475 21.5522847,10 21,10 C20.4477153,10 20,9.55228475 20,9 L20,5.414 L13.7071068,11.7071068 C13.3466228,12.0675907 12.7793918,12.0953203 12.3871006,11.7902954 L12.2928932,11.7071068 C11.9324093,11.3466228 11.9046797,10.7793918 12.2097046,10.3871006 L12.2928932,10.2928932 L18.584,4 L15,4 C14.4477153,4 14,3.55228475 14,3 C14,2.44771525 14.4477153,2 15,2 L21,2 Z"/>
              </svg>
            </a>
          </MediumText>
        </MediumSection>
      </LargeSection>
    </div>
  )
}
