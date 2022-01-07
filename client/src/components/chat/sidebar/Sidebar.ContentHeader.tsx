import React from 'react'
import styled from 'styled-components'
import GroupIcon from '@mui/icons-material/Group'

const StyledGroupIcon = styled(GroupIcon)`
  font-size: 32px;
  color: ${props => props.theme.colors.secondary};
`

const SidebarHeader = styled.div`
  margin: 5px 0 10px 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

const UserTitle = styled.h5`
  font-weight: 500;
  margin-left: 10px;
`

function ContentHeader() {
  return (
    <SidebarHeader>
      <StyledGroupIcon />
      <UserTitle>Users</UserTitle>
    </SidebarHeader>
  )
}

export default ContentHeader
