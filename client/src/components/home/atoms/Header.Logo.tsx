import React from 'react'
import styled from 'styled-components'

const StyledImage = styled.img`
  width: auto;
  height: 200px;
  @media (max-width: ${props => props.theme.mediaWidthSizes.medium}) {
    height: 150px;
  }
  @media (max-width: ${props => props.theme.mediaWidthSizes.small}) {
    height: 100px;
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.medium}){
    height: 120px;
  }

  @media (max-height: ${props => props.theme.mediaWidthSizes.small}){
    height: 64px;
    order: 1;
  }
`

function Logo() {
  return (
    <>
      <StyledImage src={'/static/images/appLogo.png'} alt="Safe Talk logo" />
    </>
  )
}

export default Logo
