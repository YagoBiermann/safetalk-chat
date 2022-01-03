import React from 'react'
import styled from 'styled-components'
import GroupIcon from '@mui/icons-material/Group'
import Badge from '@mui/material/Badge'
import { motion } from 'framer-motion'
import { badgeVariants } from './SideBar.Animations'

const BadgeBox = styled.div`
  margin: 15px;
  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    margin: 0;
    display: flex;
    justify-content: center;
  }
`

const StyledBadge = styled(Badge)`
  & .MuiBadge-badge {
    border-radius: 25px;
    width: 25px;
    height: 25px;
    background-color: ${props => props.theme.colors.grey.elevation_0};
    font-size: ${props => props.theme.fontSizes.medium};
    font-weight: 400;

    @media screen and (max-width: ${props =>
        props.theme.mediaWidthSizes.medium}) {
      border-radius: 15px;
      padding: 10px;
      width: 0px;
      height: 0px;
    }
  }

  & .MuiSvgIcon-root {
    font-size: 32px;
    color: ${props => props.theme.colors.secondary};
  }
`

const StyledGroupIcon = styled(GroupIcon)`
  font-size: 32px;
  color: ${props => props.theme.colors.secondary};
`

type BadgeWrapperProps = {
  users: Array<{ username: string; id: string }>
}

function BadgeWrapper(props: BadgeWrapperProps) {
  const { users } = props
  return (
    <BadgeBox
      variants={badgeVariants}
      animate="closed"
      initial="closed"
      exit="open"
      as={motion.div}
    >
      <StyledBadge badgeContent={users.length}>
        <StyledGroupIcon />
      </StyledBadge>
    </BadgeBox>
  )
}

export { BadgeWrapper }
