import React from 'react'
import styled from 'styled-components'

const StyledIcon = styled.img`
  width: auto;
  height: 48px;
  transition: ease-in-out 0.3s;
  &:hover {
    cursor: pointer;
    transform: scale(1.2);
  }
  &:active {
    transform: scale(0.9);
  }

  @media (max-width: ${props => props.theme.mediaWidthSizes.small}) {
    height: 42px;
  }
`
const StyledLink = styled.a``

function Icon(props: any) {
  return (
    <StyledLink href={props.href} target={'_blank'}>
      <StyledIcon {...props} />
    </StyledLink>
  )
}

export default Icon
