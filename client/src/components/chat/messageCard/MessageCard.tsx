import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import TimeAgo, { TDate } from 'timeago-react'
import { Palette } from '../../../assets/styles/theme'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'

const MessageContainer = styled.div<{ myMessage?: boolean }>`
  display: flex;
  width: 100%;
  justify-content: ${props => (props.myMessage ? 'flex-end' : 'flex-start')};
`

const Message = styled.div<{ maxWidth?: string; myMessage?: boolean }>`
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

  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.xlarge}) {
    max-width: 45%;
  }

  @media screen and (max-width: ${props => props.theme.mediaWidthSizes.large}) {
    margin: 20px;
    max-width: 60%;
  }

  @media (max-width: ${props => props.theme.mediaWidthSizes.medium}) {
    max-width: 100%;
    border-radius: 10px;
    background-color: #161616;
    border: ${props =>
      props.myMessage
        ? `1px solid ${props.theme.colors.primary.light.elevation_0}`
        : null};
    box-shadow: none;
    margin: 10px;
  }
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
      <Message myMessage={myMessage}>
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
