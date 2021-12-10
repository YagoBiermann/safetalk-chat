import React from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import Title from '../atoms/Header.Title'
import Logo from '../atoms/Header.Logo'
import SubTitle from '../atoms/Header.SubTitle'

const HeaderBox = styled(Box)`
  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;
    gap: 10px;
    display: flex;
    margin-bottom: 25px;
    margin-top: 10px;
  }
`

function Header() {
  return (
    <HeaderBox>
      <Title />
      <Logo />
      <SubTitle />
    </HeaderBox>
  )
}

export default Header
