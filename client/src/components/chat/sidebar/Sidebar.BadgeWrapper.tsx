import React from 'react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles'
import GroupIcon from '@mui/icons-material/Group'
import Badge, { BadgeProps } from '@mui/material/Badge'
import { motion } from 'framer-motion'
import { badgeAnimation } from './Sidebar.Animations'
import { badgeBoxMobile, badgeMobile } from './Sidebar.MediaQueries'

const BadgeBox = styled(motion.div)`
  margin-left: 18px;
  ${badgeBoxMobile}
`

const StyledBadge = muiStyled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.dark.elevation_0,
    borderRadius: '25px',
    width: '25px',
    height: '25px',
    fontWeight: 'bold',
    fontSize: '14px',
    [theme.breakpoints.down('tablet')]: badgeMobile
  }
}))

type BadgeWrapperProps = {
  users: Array<{ username: string; userId: string }>
}

function BadgeWrapper(props: BadgeWrapperProps) {
  const { users } = props
  return (
    <BadgeBox
      variants={badgeAnimation}
      animate="closed"
      initial="closed"
      exit="open"
    >
      <StyledBadge
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        badgeContent={users.length}
      >
        <GroupIcon sx={{ fontSize: '32px' }} />
      </StyledBadge>
    </BadgeBox>
  )
}

export { BadgeWrapper }
