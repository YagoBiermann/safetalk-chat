import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TimeAgo, { TDate } from 'timeago-react'
import { motion } from 'framer-motion'
import { messageCardAnimation } from './Message.Animations'
import { appTheme } from '../../../assets/styles/theme'
import {
  MessageCardDesktop,
  MessageCardMobile,
  MessageCardTablet
} from './Message.MediaQueries'
import RegularText from '../../global/RegularText'

const MessageContainer = styled.div<{ myMessage?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${props => (props.myMessage ? 'flex-end' : 'flex-start')};
`

const Message = styled(motion.div)<{ maxWidth?: string; myMessage?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  box-shadow: ${props =>
    props.myMessage ? '0px 12px 10px 4px rgba(0, 0, 0, 0.35)' : null};
  max-width: 40%;
  margin: 15px 30px 15px 30px;
  min-width: 20%;
  max-height: auto;
  background-color: ${props => props.theme.colors.dark.elevation_2};
  ${MessageCardDesktop}
  ${MessageCardTablet}
  ${MessageCardMobile}
`

const Header = styled.div`
  margin: 15px;
`

const Footer = styled.div`
  margin: 10px 10px 10px 0;
  align-self: flex-end;
`

type MessageProps = {
  children?: JSX.Element
  username: string
  creationTime: number
  myMessage?: boolean
}

function MessageCard(props: MessageProps) {
  const [time, setTime] = useState<TDate>(0)
  const timeAgoOpts = { minInterval: 60 }
  const { username, children, creationTime, myMessage } = props

  useEffect(() => {
    setTime(creationTime)
  }, [])

  return (
    <MessageContainer myMessage={myMessage}>
      <Message animate={messageCardAnimation}>
        <Header>
          <RegularText
            color={props.myMessage ? '#b294c5' : undefined}
            bold
            fontSize={appTheme.fontSizes.medium}
          >
            {myMessage ? 'You' : username}
          </RegularText>
        </Header>
        {children}
        <Footer>
          <RegularText bold fontSize={appTheme.fontSizes.xsmall}>
            <TimeAgo datetime={time} opts={timeAgoOpts} />
          </RegularText>
        </Footer>
      </Message>
    </MessageContainer>
  )
}

export { MessageCard }
