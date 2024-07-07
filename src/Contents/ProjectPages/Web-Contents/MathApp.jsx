import React from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec, DemoSection } from '../ParentProjectPages/ProjectPagesElements.jsx'


export default function MathApp() {
  return (
    <div>
      <TitleText backC={'rgba(1, 215, 247, 0.34)'}>
          <h1>Random Math Problem Generator</h1>
          <h2>The goal was to generate random math problems so that all possible math problems can be practiced.</h2>
      </TitleText>
      <DemoSection>
      <iframe width="560" height="315" src="https://www.youtube.com/embed/fyFDj491Up4?si=F7NVHLyLYjWJU7Wb" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        <MediumSection>
            <MediumText>
                <a target="_blank" href="https://chat.cags2.com">https://chat.cags2.com 
                  <svg style={{marginLeft:"0.5rem"}} fill="var(--secondary-color)" width="1.5rem" height="1.5rem" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5,2 L7,2 C7.55228475,2 8,2.44771525 8,3 C8,3.51283584 7.61395981,3.93550716 7.11662113,3.99327227 L7,4 L5,4 C4.48716416,4 4.06449284,4.38604019 4.00672773,4.88337887 L4,5 L4,19 C4,19.5128358 4.38604019,19.9355072 4.88337887,19.9932723 L5,20 L19,20 C19.5128358,20 19.9355072,19.6139598 19.9932723,19.1166211 L20,19 L20,17 C20,16.4477153 20.4477153,16 21,16 C21.5128358,16 21.9355072,16.3860402 21.9932723,16.8833789 L22,17 L22,19 C22,20.5976809 20.75108,21.9036609 19.1762728,21.9949073 L19,22 L5,22 C3.40231912,22 2.09633912,20.75108 2.00509269,19.1762728 L2,19 L2,5 C2,3.40231912 3.24891996,2.09633912 4.82372721,2.00509269 L5,2 L7,2 L5,2 Z M21,2 L21.081,2.003 L21.2007258,2.02024007 L21.2007258,2.02024007 L21.3121425,2.04973809 L21.3121425,2.04973809 L21.4232215,2.09367336 L21.5207088,2.14599545 L21.5207088,2.14599545 L21.6167501,2.21278596 L21.7071068,2.29289322 L21.7071068,2.29289322 L21.8036654,2.40469339 L21.8036654,2.40469339 L21.8753288,2.5159379 L21.9063462,2.57690085 L21.9063462,2.57690085 L21.9401141,2.65834962 L21.9401141,2.65834962 L21.9641549,2.73400703 L21.9641549,2.73400703 L21.9930928,2.8819045 L21.9930928,2.8819045 L22,3 L22,3 L22,9 C22,9.55228475 21.5522847,10 21,10 C20.4477153,10 20,9.55228475 20,9 L20,5.414 L13.7071068,11.7071068 C13.3466228,12.0675907 12.7793918,12.0953203 12.3871006,11.7902954 L12.2928932,11.7071068 C11.9324093,11.3466228 11.9046797,10.7793918 12.2097046,10.3871006 L12.2928932,10.2928932 L18.584,4 L15,4 C14.4477153,4 14,3.55228475 14,3 C14,2.44771525 14.4477153,2 15,2 L21,2 Z"/>
                  </svg>
                </a>
            </MediumText>
        </MediumSection>
      </DemoSection>
      <LargeSection>
        <LargeText>Before Authentication</LargeText>
        <MediumSection>
          <MediumText>Starting Page</MediumText>
          <SmallText>Choose to sign up or log in</SmallText>
          <ImgSec ImgSrc="/mathApp/10.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Sign Up</MediumText>
          <SmallText>Used Passport for authentication.</SmallText>
          <ImgSec ImgSrc="/mathApp/30.png" />
          <SmallText>Also checks if the username is available or if the password or username is valid while the user is typing.</SmallText>
        </MediumSection>
        <MediumSection>
          <MediumText>Login</MediumText>
          <SmallText>Needed logins for leaderboards (never got to it).</SmallText>
          <ImgSec ImgSrc="/mathApp/40.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>After Authentication</LargeText>
        <MediumSection>
          <MediumText>Home Page</MediumText>
          <SmallText>User can log out using the settings icon or choose to start the math. It also displays the user's level.</SmallText>
          <ImgSec ImgSrc="/mathApp/60.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Chapter Page</MediumText>
          <SmallText>Here, the user can choose which skill to work on. Lots of CSS were used here.</SmallText>
          <ImgSec ImgSrc="/mathApp/100.png" />
        </MediumSection>
        <MediumSection>
          <MediumText>Questions Page</MediumText>
          <SmallText>After clicking on one of the skills, it randomly generates a question with the choices and an explanation for the answer.</SmallText>
          <ImgSec ImgSrc="/mathApp/120.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <MediumSection>
          <MediumText>Final Takeaways</MediumText>
          <SmallText>I wasn't able to finish the project because, as I tried to randomly generate the questions, it became harder and harder. I think what I learned the most in this project is to think about practicality before attempting it. I also improved significantly in CSS during this project.</SmallText>
        </MediumSection>
      </LargeSection>
    </div>
  )
}
