import React from 'react'
import styled from 'styled-components'

const StyledTitle = styled.h1`
  margin-top: 30px;

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    order: 2;
  }
`

function Title() {
  return <StyledTitle>Safe Talk</StyledTitle>
}

export default Title
