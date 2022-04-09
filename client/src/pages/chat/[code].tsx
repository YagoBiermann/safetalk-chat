import type { GetServerSideProps, NextPage } from 'next'
import styled from 'styled-components'
import CenterColumn from '../../assets/styles/default.CenterColumn'
import { OnlineUsersDTO, UserDTO } from '../../lib/interfaces'
import { fetchCurrentUser, fetchUsersInRoom } from '../../lib/services/api'
import Chat from '../../components/chat/main/Chat'

import {
  ChatBoxDesktop,
  ChatBoxMobile,
  ChatContainerDesktop,
  ChatHeaderMobile
} from '../../components/chat/main/_chat.MediaQueries'
import nookies from 'nookies'

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
  const user = await fetchCurrentUser(cookies)
  const usersInRoom = user ? await fetchUsersInRoom(cookies) : null
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
      usersInRoom
    }
  }
}

type ChatPageProps = NextPage & { user: UserDTO; usersInRoom: OnlineUsersDTO }

const ChatPage = (props: ChatPageProps) => {
  return (
    <>
      <Chat user={props.user} usersInRoom={props.usersInRoom} />
    </>
  )
}

export default ChatPage
