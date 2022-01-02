import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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
import ChatSideBar from '../../components/chat/molecules/Chat.SideBar'


const ChatContainer = styled(Container)`
  flex-direction: column;
  justify-content: flex-start;
`

const ChatBox = styled(Box)`
  flex-direction: column;
  width: 65vw;
  margin-top: 30px;
`

const Chat: NextPage = props => {
  const [files, setFiles] = useState<Array<DropFile>>([])
  const [showPreview, setPreview] = useState(false)
  const dispatch = useAppDispatch()
  const roomCode = useAppSelector(state => state.user.roomCode)
  const socketID = useAppSelector(state => state.user.socketID)
  const username = useAppSelector(state => state.user.username)
  const error = useAppSelector(state => state.app.error)

  const clearPreview = () => {
    files.forEach(file => {
      URL.revokeObjectURL(file.preview)
    })
    setFiles([])
  }

  const closeWithoutSave = () => {
    clearPreview()
    setPreview(false)
  }

  const closePreview = () => {
    setPreview(false)
  }

  useEffect(() => {
    if (files.length > 0) {
      setPreview(true)
    }
  }, [files])

  useEffect(() => {
    if (!username || !socketID || !roomCode) {
      window.location.href = '/'
    }
  }, [])

  return (
    <>
      <fileContext.Provider value={{ files, setFiles }}>
        <ChatContainer id="chatContainer">
          <ChatBox>
            <MessagesBox />
            <SendMessage />
          </ChatBox>
          <ChatSideBar />
        </ChatContainer>
      </fileContext.Provider>
      {showPreview ? (
        <DarkenBackground>
          <FilePreview
            files={files}
            close={closePreview}
            closeWithoutSave={closeWithoutSave}
          />
        </DarkenBackground>
      ) : null}
      {error ? <ErrorAlert error={error} /> : null}
    </>
  )
}

export default Chat
