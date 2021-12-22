import type { NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../store'
import Container from '../../components/global/Container'
import styled from 'styled-components'
import MessagesBox from '../../components/chat/molecules/Messages'
import SendMessage from '../../components/chat/molecules/SendMessage'
import Box from '../../components/global/Box'
import ErrorAlert from '../../components/global/ErrorAlert'
import { fileContext } from '../../lib/context/fileContext'
import { DropFile } from '../../lib/interfaces'
import FilePreview from '../../components/chat/molecules/FilePreview'
import DarkenBackground from '../../components/global/DarkenBackground'

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
  const [files, setFiles] = useState<Array<DropFile>>([])
  const dispatch = useAppDispatch()
  const roomCode = useAppSelector(state => state.user.roomCode)
  const socketID = useAppSelector(state => state.user.socketID)
  const username = useAppSelector(state => state.user.username)
  const error = useAppSelector(state => state.app.error)

  const closePreview = () => {
    files.forEach(file => {
      URL.revokeObjectURL(file.preview)
    })
    setFiles([])
  }

  useEffect(() => {
    if (!username || !socketID || !roomCode) {
      window.location.href = '/'
    }
  }, [])

  return (
    <>
      <fileContext.Provider value={{ files, setFiles }}>
        <ChatContainer>
          <ChatBox>
            <MessagesBox />
            <SendMessage />
          </ChatBox>
        </ChatContainer>
      </fileContext.Provider>
      {files.length > 0 ? (
        <DarkenBackground>
          <FilePreview files={files} close={closePreview} />
        </DarkenBackground>
      ) : null}
      {error ? <ErrorAlert error={error} /> : null}
    </>
  )
}

export default Chat
