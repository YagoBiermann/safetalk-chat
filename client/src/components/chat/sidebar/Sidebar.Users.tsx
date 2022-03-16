import { Avatar } from '@mui/material'
import React, { useMemo } from 'react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles'
import PersonIcon from '@mui/icons-material/Person'
import { motion } from 'framer-motion'
import { userAnimation } from './Sidebar.Animations'
import RegularText from '../../global/RegularText'

const User = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0 10px 0;
`

const UserAvatar = muiStyled(Avatar)`
  margin: 0 10px 0 0;
  width: 24px;
  height: 24px;
`
type userListProps = {
  users: Array<{ username: string; userId: string }>
}

function Users(props: userListProps) {
  const { users } = props

  return (
    <>
      {useMemo(() => {
        return users.map((user, index) => (
          <User key={user.userId} animate={userAnimation(index)}>
            <UserAvatar>
              <PersonIcon fontSize="small" />
            </UserAvatar>
            <RegularText bold>{user.username}</RegularText>
          </User>
        ))
      }, [users])}
    </>
  )
}

export default Users
