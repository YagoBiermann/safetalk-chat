import { Avatar } from '@mui/material'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import PersonIcon from '@mui/icons-material/Person'
import { motion } from 'framer-motion'
import { userAnimation } from './Sidebar.Animations'

const User = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0 10px 0;
`

const Username = styled.p`
  ${TextMessageStyle}
`

const UserAvatar = styled(Avatar)`
  margin: 0 10px 0 0;
  width: 24px;
  height: 24px;
`
type userListProps = {
  users: Array<{ username: string; id: string }>
}

function Users(props: userListProps) {
  const { users } = props

  return (
    <>
      {useMemo(() => {
        return users.map((user, index) => (
          <User key={user.id} animate={userAnimation(index)}>
            <UserAvatar>
              <PersonIcon fontSize="small" />
            </UserAvatar>
            <Username bold>{user.username}</Username>
          </User>
        ))
      }, [users])}
    </>
  )
}

export default Users
