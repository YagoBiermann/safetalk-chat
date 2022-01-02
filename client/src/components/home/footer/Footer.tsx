import React from 'react'
import styled from 'styled-components'
import Icon from '../footer/Footer.Icon'
import Box from '../../global/Box'

const FooterBox = styled(Box)`
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
