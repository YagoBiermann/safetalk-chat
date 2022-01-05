import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { socketContext } from '../../../lib/context/socketContext'
import { useLazyFetchUsersQuery } from '../../../services/api'
import { useAppSelector } from '../../../store'
import { sidebarAnimation } from './Sidebar.Animations'
import { BadgeWrapper } from './Sidebar.BadgeWrapper'
import SideBarContent from './Sidebar.Content'
import FetchError from './Sidebar.FetchError'
import UserSkeleton from './Sidebar.Skeleton'
import Users from './Sidebar.Users'
import useWindowSize from '../../../lib/hooks/useWindowSize'
import { sidebarMobile } from './Sidebar.MediaQueries'

const Sidebar = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 5px;
  top: 50%;
  right: 0;
  border-radius: 10px 0 0 10px;
  transform: translateY(-50%);
  cursor: pointer;

  ${sidebarMobile}
`

const UserList = styled.div<{ error: boolean }>`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  justify-content: ${props => (props.error ? 'center' : 'flex-start')};
  height: 100%;
  ::-webkit-scrollbar {
    width: 5px;
  }
`

function ChatSidebar() {
  const [users, setUsers] = useState<Array<{ username: string; id: string }>>([
    { username: '', id: '' }
  ])
  const [isOpen, setOpen] = useState(false)
  const { width } = useWindowSize()
  const roomCode = useAppSelector(state => state.user.roomCode)
  const [fetchUsers, result] = useLazyFetchUsersQuery()
  const socket = useContext(socketContext)

  useEffect(() => {
    socket.emit('room:users', { roomCode })

    return () => {
      socket.off('room:users')
    }
  }, [roomCode, socket])

  useEffect(() => {
    socket.on('room:users', () => {
      console.log('signal received')
      fetchUsers(roomCode)
        .unwrap()
        .then(res => {
          console.log(res.users)
          setUsers(res.users)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }, [roomCode, socket])

  const toggleSideBar = () => {
    setOpen(!isOpen)
  }

  return (
    <Sidebar
      variants={sidebarAnimation}
      custom={width}
      animate={isOpen ? 'open' : 'closed'}
      as={motion.div}
      onClick={toggleSideBar}
      initial="closed"
    >
      <AnimatePresence exitBeforeEnter>
        {isOpen ? (
          <SideBarContent key="sidebarContent">
            <UserList error={Boolean(result.error)}>
              {result.isFetching && !result.data ? <UserSkeleton /> : null}
              {result.data ? <Users users={users} /> : null}
              {result.error ? <FetchError /> : null}
            </UserList>
          </SideBarContent>
        ) : (
          <BadgeWrapper key="badgeWrapper" users={users} />
        )}
      </AnimatePresence>
    </Sidebar>
  )
}

export default ChatSidebar
