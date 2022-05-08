import { AnimatePresence } from 'framer-motion'
import { useContext, useEffect } from 'react'
import styled from 'styled-components'
import CenterColumn from '../../../assets/styles/default.CenterColumn'
import FilePreview from '../../../components/chat/filePreview/FilePreview'
import MessagesBox from '../../../components/chat/messages/Messages'
import SendMessage from '../../../components/chat/sendMessage/SendMessage'
import ChatSidebar from '../../../components/chat/sidebar/Sidebar'
import ErrorAlert from '../../../components/global/ErrorAlert'
import { fileContext } from '../../../lib/context/fileContext'
import { OnlineUsersDTO, UserDTO } from '../../../lib/interfaces'
import { useAppDispatch, useAppSelector } from '../../../store'
import {
  ChatBoxDesktop,
  ChatBoxMobile,
  ChatContainerDesktop,
  ChatHeaderMobile
} from './_chat.MediaQueries'
import { setRoomCode, setUsername } from '../../../store/ducks/users'
import { socketContext } from '../../../lib/context/socketContext'
import { setUsersInRoom } from '../../../store/ducks/rooms'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import Link from 'next/link'
import { hydrateMessages } from '../../../store/ducks/messages'
import LinearProgress from '@mui/material/LinearProgress'
import useConfirmToLeave from '../../../lib/hooks/useConfirmToLeave'
import useFilePreview from '../../../lib/hooks/useFilePreview'
import DisconnectedFromChat from '../../../components/chat/messages/Messages.Disconnected'
import useSocketStatus from '../../../lib/hooks/useSocketStatus'

const ChatContainer = styled.div`
  ${CenterColumn}
  justify-content: flex-start;
  width: 100vw;
  height: 100vh;
  ${ChatContainerDesktop}
`

const ChatBox = styled.div`
  ${CenterColumn}
  width: 70%;
  height: 90%;
  margin-top: 30px;
  ${ChatBoxDesktop}
  ${ChatBoxMobile}
`

const ChatHeader = styled.div`
  display: none;
  ${ChatHeaderMobile}
`

type ChatPageProps = { user: UserDTO; usersInRoom: OnlineUsersDTO }

const Chat = (props: ChatPageProps) => {
  const { isDisconnected } = useSocketStatus()
  const { user } = props
  const { closePreview, closeWithoutSave, files, setFiles, showPreview } =
    useFilePreview()
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)
  const isUploadingFile = useAppSelector(state => state.app.isUploadingFile)
  const socket = useContext(socketContext)
  const usersInRoom = props.usersInRoom.users
    .filter(user => (user.isOnline ? user : null))
    .map(user => ({ username: user.username, userId: user.userId }))

  useConfirmToLeave()
  // Hydrate on mount
  useEffect(() => {
    socket.connect()
    socket.on('connect', () => {
      socket.emit('room:join', { roomCode: user.roomCode })
      socket.emit('room:allUsers', { roomCode: user.roomCode })
    })
    dispatch(setRoomCode(user.roomCode))
    dispatch(setUsername(user.username))
    dispatch(setUsersInRoom(usersInRoom))
    dispatch(hydrateMessages(user.messages))
  }, [])

  return (
    <>
      <fileContext.Provider value={{ files, setFiles }}>
        <>
          <ChatContainer id="chatContainer">
            {isUploadingFile && (
              <LinearProgress
                sx={{ backgroundColor: 'primary.light', width: '100%' }}
              />
            )}
            <ChatBox>
              <ChatHeader>
                <Link href="/">
                  <ArrowBackIosIcon sx={{ margin: '0 0 0 10px' }} />
                </Link>
              </ChatHeader>
              <MessagesBox />
              <SendMessage />
            </ChatBox>
          </ChatContainer>
          <ChatSidebar />
        </>
      </fileContext.Provider>
      <AnimatePresence>
        {isDisconnected && <DisconnectedFromChat />}
      </AnimatePresence>
      <AnimatePresence>
        {showPreview && (
          <FilePreview
            files={files}
            close={closePreview}
            closeWithoutSave={closeWithoutSave}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {error && <ErrorAlert error={error} key={'chatPageError'} />}
      </AnimatePresence>
    </>
  )
}

export default Chat
