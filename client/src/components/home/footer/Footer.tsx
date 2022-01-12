import React from 'react'
import styled from 'styled-components'
import CenterColumn from '../../../assets/styles/default.CenterColumn'
import Icon from '../footer/Footer.Icon'

const FooterBox = styled.div`
  ${CenterColumn}
  margin: 0 25px 0 25px;
  align-self: flex-end;
  @media (max-height: ${props => props.theme.mediaWidthSizes.small}) {
  }
`

function Footer() {
  return (
    <FooterBox>
      <Icon
        src={'/static/images/github.png'}
        href={'https://github.com/YagoBiermann'}
        alt="Github link"
      />
    </FooterBox>
  )
}

export default Footer
