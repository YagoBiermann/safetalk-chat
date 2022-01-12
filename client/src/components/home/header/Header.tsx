import React from 'react'
import styled from 'styled-components'
import CenterColumn from '../../../assets/styles/default.FlexColumn'
import Logo from '../header/Header.Logo'
import SubTitle from './Header.SubTitle'
import Title from './Header.Title'

const HeaderBox = styled.div`
  ${CenterColumn}
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
