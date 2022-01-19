import { AnimatePresence } from 'framer-motion'
import type { GetServerSideProps, NextPage } from 'next'
import { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import CenterColumn from '../../assets/styles/default.CenterColumn'
import FilePreview from '../../components/chat/filePreview/FilePreview'
import MessagesBox from '../../components/chat/messages/Messages'
import SendMessage from '../../components/chat/sendMessage/SendMessage'
import ChatSidebar from '../../components/chat/sidebar/Sidebar'
import ErrorAlert from '../../components/global/ErrorAlert'
import { fileContext } from '../../lib/context/fileContext'
import { DropFile, OnlineUsersDTO, UserDTO } from '../../lib/interfaces'
import { fetchCurrentUser, fetchUsersOnRoom } from '../../services/api'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  ChatBoxDesktop,
  ChatBoxMobile,
  ChatContainerDesktop,
  ChatHeaderMobile
} from './_chat.MediaQueries'
import nookies from 'nookies'
import { setRoomCode, setUsername } from '../../store/ducks/users'
import { socketContext } from '../../lib/context/socketContext'
import { setUsersOnRoom } from '../../store/ducks/rooms'

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

export const getServerSideProps: GetServerSideProps = async ctx => {
  const cookies = nookies.get(ctx)
  const user: UserDTO = await fetchCurrentUser(cookies)
  const usersOnRoom = user
    ? await fetchUsersOnRoom(cookies, user.room.roomCode)
    : null

  if (!user || !user.room) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return {
    props: {
      user,
      usersOnRoom
    }
  }
}

type ChatPageProps = NextPage & { user: UserDTO; usersOnRoom: OnlineUsersDTO }

const Chat = (props: ChatPageProps) => {
  const { user } = props
  const [files, setFiles] = useState<Array<DropFile>>([])
  const [showPreview, setPreview] = useState(false)
  const dispatch = useAppDispatch()
  const error = useAppSelector(state => state.app.error)
  const socket = useContext(socketContext)

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

  // Hydrate on mount
  useEffect(() => {
    socket.connect()
    //TODO: Hydrate messages
    socket.emit('room:join', { roomCode: user.room.roomCode })
    socket.emit('room:users', { roomCode: user.room.roomCode })
    socket.emit('user:data', user)
    dispatch(setRoomCode(user.room.roomCode))
    dispatch(setUsername(user.username))
    dispatch(setUsersOnRoom(props.usersOnRoom.users))

    return () => {
      socket.off('room:users')
      socket.off('room:join')
      socket.off('user:data')
    }
  }, [])

  return (
    <>
      <fileContext.Provider value={{ files, setFiles }}>
        <>
          <ChatContainer id="chatContainer">
            <ChatBox>
              <ChatHeader />
              <MessagesBox />
              <SendMessage />
            </ChatBox>
          </ChatContainer>
          <ChatSidebar />
        </>
      </fileContext.Provider>
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
