import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TimeAgo, { TDate } from 'timeago-react'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import { motion } from 'framer-motion'
import { messageCardAnimation } from './Message.Animations'
import { Palette } from '../../../assets/styles/theme'
import {
  MessageCardDesktop,
  MessageCardMobile,
  MessageCardTablet
} from './Message.MediaQueries'

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
  background-color: #212121;

  ${MessageCardDesktop}

  ${MessageCardTablet}

  ${MessageCardMobile}
`

const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${TextMessageStyle};
`

const Header = styled.div<{ myMessage?: boolean }>`
  margin: 15px;
  & ${Text} {
    color: ${props => (props.myMessage ? '#b294c5' : null)};
  }
`

const Footer = styled.div`
  margin: 10px 10px 10px 0;
  align-self: flex-end;
`

type MessageProps = {
  children?: JSX.Element
  username: string
  myMessage?: boolean
}

function MessageCard(props: MessageProps) {
  const [time, setTime] = useState<TDate>(0)
  const timeAgoOpts = { minInterval: 60 }
  const { username, children, myMessage } = props

  useEffect(() => {
    setTime(Date.now())
  }, [])

  return (
    <MessageContainer myMessage={myMessage}>
      <Message animate={messageCardAnimation} myMessage={myMessage}>
        <Header myMessage={myMessage}>
          <Text bold fontSize={Palette.fontSizes.medium}>
            {props.myMessage ? 'You' : username}
          </Text>
        </Header>
        {children}
        <Footer>
          <Text bold fontSize={Palette.fontSizes.xsmall}>
            <TimeAgo datetime={time} opts={timeAgoOpts} />
          </Text>
        </Footer>
      </Message>
    </MessageContainer>
  )
}

export { MessageCard }
