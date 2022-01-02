import { AnimatePresence, motion } from 'framer-motion'
import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { socketContext } from '../../../lib/context/socketContext'
import { useLazyFetchUsersQuery } from '../../../services/api'
import { useAppSelector } from '../../../store'
import { sideBarVariants } from '../atoms/SideBar.Animations'
import { BadgeWrapper } from '../atoms/SideBar.BadgeWrapper'
import SideBarContent from '../atoms/SideBar.Content'
import FetchError from '../atoms/SideBar.FetchError'
import UserSkeleton from '../atoms/Sidebar.Skeleton'
import Users from '../atoms/SideBar.Users'

const SideBar = styled.div`
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

function ChatSideBar() {
  const [isOpen, setOpen] = useState(false)
  const [users, setUsers] = useState<Array<{ username: string; id: string }>>([
    { username: '', id: '' }
  ])
  const roomCode = useAppSelector(state => state.user.roomCode)
  const [fetchUsers, result] = useLazyFetchUsersQuery()
  const socket = useContext(socketContext)

  useEffect(() => {
    socket.emit('room:users', { roomCode })

    return () => {
      socket.off('room:users')
    }
  }, [])

  useEffect(() => {
    socket.on('room:users', () => {
      fetchUsers(roomCode)
        .unwrap()
        .then(res => {
          setUsers(res.users)
        })
        .catch(err => {
          console.log(err)
        })
    })
  }, [socket])

  const toggleSideBar = () => {
    setOpen(!isOpen)
  }

  return (
    <SideBar
      variants={sideBarVariants}
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
    </SideBar>
  )
}

export default ChatSideBar
