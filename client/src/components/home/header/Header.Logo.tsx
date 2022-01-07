import React from 'react'
import styled from 'styled-components'

const StyledLogo = styled.img`
  width: auto;
  height: 180px;
  @media (max-width: ${props => props.theme.mediaWidthSizes.medium}) {
    height: 140px;
  }
  @media (max-width: ${props => props.theme.mediaWidthSizes.small}) {
    height: 100px;
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.medium}) {
    height: 120px;
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    height: 64px;
    order: 1;
  }
`

function Logo() {
  return <StyledLogo src={'/static/images/appLogo.svg'} />
}

export default Logo
