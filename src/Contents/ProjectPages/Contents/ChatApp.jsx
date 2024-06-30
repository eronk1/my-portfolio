import React, {useEffect, useState} from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function ChatApp() {

  return (
    <div>
      <TitleText backC={'#2c2f33'}>
          <h1>Transparency Chat App</h1>
          <h2>An app inspired by Discord, where the user can see the other user typing in real-time while chatting.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Initial Auth</LargeText>
        <MediumSection>
            <MediumText>Sign Up</MediumText>
            <SmallText>I leveraged JWT for all authentication functions.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/9.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Login</MediumText>
            <SmallText>Upon loging in the real-time transmissions start using socket.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/20.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>The Settings</MediumText>
            <SmallText>On the bottom left the user can click on the settings icon. It will show their profile along with the option to logout.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/80.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Friends</LargeText>
        <MediumSection>
            <MediumText>Add Friends</MediumText>
            <SmallText>If friend request was a success it will say so if not it will say why.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/30.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Pending</MediumText>
            <SmallText>shows in real-time when another user sent a request or when that user sent it.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/35.png" />
            <ImgSec ImgSrc="/projectChatApp/40.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>All Friends</MediumText>
            <SmallText>This is where user checks their friends and their profile (shown later).</SmallText>
            <ImgSec ImgSrc="/projectChatApp/50.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Messaging Proccess</LargeText>
        <MediumSection>
            <MediumText>Initial</MediumText>
            <SmallText>This is where socket does the magic. When the user joins they will be put in a room dedicated to their channel.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/60.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Typing</MediumText>
            <SmallText>Since they are now in the same room the user can type to each other and theyll see the other's messages.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/70.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Sending & Receiving Messages</MediumText>
            <SmallText>Pretty standard to any messaging app.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/80.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Friend Profile</LargeText>
        <MediumSection>
            <MediumText>Options</MediumText>
            <SmallText>Upon clicking on the 3 dots the user is presented with the option to remove the friend or view their profile</SmallText>
            <ImgSec ImgSrc="/projectChatApp/90.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>The Profile</MediumText>
            <SmallText>Here user can see all the other user's friends and their mutual friends along with their profile information.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/100.png" />
        </MediumSection>
      </LargeSection>
    </div>
  )
}
