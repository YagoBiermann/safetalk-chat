import type { NextPage } from 'next'
import { useEffect } from 'react'
import { useAppSelector } from '../../store'
import Container from '../../components/global/Container'
import styled from 'styled-components'
import MessagesBox from '../../components/chat/molecules/Messages'
import SendMessage from '../../components/chat/molecules/SendMessage'
import Box from '../../components/global/Box'
import ErrorAlert from '../../components/global/ErrorAlert'

const ChatContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
`

const ChatBox = styled(Box)`
  flex-direction: column;
  width: 55vw;
  margin-top: 30px;
`

const Chat: NextPage = props => {
  const roomCode = useAppSelector(state => state.user.roomCode)
  const socketID = useAppSelector(state => state.user.socketID)
  const username = useAppSelector(state => state.user.username)
  const error = useAppSelector(state => state.app.error)

  useEffect(() => {
    if (!username || !socketID || !roomCode) {
      window.location.href = '/'
    }
  }, [])

  return (
    <>
      <ChatContainer>
        <ChatBox>
          <MessagesBox />
          <SendMessage />
        </ChatBox>
      </ChatContainer>
      {error ? <ErrorAlert error={error} /> : null}
    </>
  )
}

export default Chat
