import type { GetServerSideProps, NextPage } from 'next'
import { OnlineUsersDTO, UserDTO } from '../../lib/interfaces'
import { fetchCurrentUser, fetchUsersInRoom } from '../../lib/services/api'
import Chat from '../../components/chat/main/Chat'
import nookies from 'nookies'

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
      <Chat
        user={props.user}
        usersInRoom={props.usersInRoom}
        {...props.getInitialProps}
      />
    </>
  )
}

export default ChatPage
