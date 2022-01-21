import React from 'react'
import styled from 'styled-components'

const StyledLogo = styled.img`
  width: auto;
  height: 160px;
  @media (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    height: 140px;
  }
  @media (max-width: ${props => props.theme.appBreakpoints.mobile}) {
    height: 120px;
  }

  @media (max-height: ${props => props.theme.appBreakpoints.tablet}) {
    height: 120px;
  }

  @media (max-height: ${props => props.theme.appBreakpoints.mobile}) {
    height: 64px;
    order: 1;
  }
`

function Logo() {
  return <StyledLogo src={'/static/images/appLogo.svg'} />
}

export default Logo
