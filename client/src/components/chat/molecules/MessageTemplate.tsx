import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TimeAgo, { TDate } from 'timeago-react'
import { Palette } from '../../../assets/styles/theme'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'

const MessageContainer = styled.div<{ myMessage?: boolean }>`
  display: flex;
  justify-content: ${props => (props.myMessage ? 'flex-end' : 'flex-start')};
  padding: 15px 25px 15px 25px;
`

const Message = styled.div<{ maxWidth?: string; myMessage?: boolean }>`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  max-width: ${props => props.maxWidth || '40%'};
  min-width: 20%;
  max-height: auto;
  background-color: #212121;
`

const Header = styled.div`
  margin: 15px;
`

const Footer = styled.div`
  margin: 10px 10px 10px 0;
  align-self: flex-end;
`

const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${TextMessageStyle};
`

type MessageProps = {
  children?: JSX.Element
  username: string
  myMessage?: boolean
}

function MessageTemplate(props: MessageProps) {
  const [time, setTime] = useState<TDate>(0)
  const timeAgoOpts = { minInterval: 60 }
  const { username, children, myMessage } = props

  useEffect(() => {
    setTime(Date.now())
  }, [])

  return (
    <MessageContainer myMessage={myMessage}>
      <Message myMessage={myMessage}>
        <Header>
          <Text bold fontSize={Palette.fontSizes.medium}>
            {username}
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

export { MessageTemplate }
