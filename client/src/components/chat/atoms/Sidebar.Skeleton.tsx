import React from 'react'
import styled from 'styled-components'
import Skeleton from '@mui/material/Skeleton'

const StyledSkeleton = styled(Skeleton)`
  background-color: ${props => props.theme.colors.grey.elevation_4};
`
const User = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 10px 0 10px 0;
`

function UserSkeleton() {
  const sideBarSkeleton = () => {
    const skeleton = []

    for (let i = 0; i < 8; i++) {
      skeleton.push(
        <User key={i}>
          <StyledSkeleton
            variant="circular"
            width={24}
            height={24}
            sx={{ marginRight: '10px' }}
          />
          <StyledSkeleton variant="text" width={100} height={32} />
        </User>
      )
    }
    return skeleton
  }

  return <>{sideBarSkeleton()}</>
}

export default UserSkeleton
