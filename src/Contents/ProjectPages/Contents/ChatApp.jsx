import React, {useEffect, useState} from 'react'
import { SmallText, MediumText, LargeText, TitleText, MediumSection, LargeSection, ImgSec } from '../ParentProjectPages/ProjectPagesElements.jsx'

export default function ChatApp() {

  return (
    <div>
      <TitleText backC={'#2c2f33'}>
          <h1>Transparency Chat App</h1>
          <h2>An app inspired by Discord, where the other person can see you typing in real-time while chatting.</h2>
      </TitleText>
      <LargeSection>
        <LargeText>Initial Auth</LargeText>
        <MediumSection>
            <MediumText>Sign Up</MediumText>
            <MediumText>I leveraged JWT for all authentication functions.</MediumText>
            <ImgSec ImgSrc="/projectChatApp/9.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Login</MediumText>
            <MediumText>Upon loging in the real-time transmissions start using socket.</MediumText>
            <ImgSec ImgSrc="/projectChatApp/20.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Friends</LargeText>
        <MediumSection>
            <MediumText>Add Friends</MediumText>
            <MediumText>If friend request was a success it will say so if not it will say why.</MediumText>
            <ImgSec ImgSrc="/projectChatApp/30.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>Pending</MediumText>
            <SmallText>shows in real-time when someone sent a request or when you sent it.</SmallText>
            <ImgSec ImgSrc="/projectChatApp/40.png" />
            <ImgSec ImgSrc="/projectChatApp/50.png" />
        </MediumSection>
        <MediumSection>
            <MediumText>All Friends</MediumText>
            <MediumText>This is where you check your friends and their profile (shown later).</MediumText>
            <ImgSec ImgSrc="/projectChatApp/60.png" />
        </MediumSection>
      </LargeSection>
      <LargeSection>
        <LargeText>Messaging Proccess</LargeText>
        <MediumSection>
            <MediumText></MediumText>
            <MediumText>I leveraged JWT for all authentication functions.</MediumText>
            <ImgSec ImgSrc="/projectChatApp/9.png" />
        </MediumSection>
      </LargeSection>
    </div>
  )
}
