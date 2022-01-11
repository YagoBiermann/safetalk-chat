import React from 'react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles'
import GroupIcon from '@mui/icons-material/Group'

const SidebarHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 5px 0 10px 0;
`

const UserTitle = styled.h5`
  font-weight: 500;
  margin-left: 10px;
`

function ContentHeader() {
  return (
    <SidebarHeader>
      <GroupIcon sx={{ fontSize: '32px' }} />
      <UserTitle>Users</UserTitle>
    </SidebarHeader>
  )
}

export default ContentHeader
