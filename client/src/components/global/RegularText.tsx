import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  color: ${props => props.theme.fontColor.secondary};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: 400;
`

const RegularText = (props: { children: string }) => {
  return <Text>{props.children}</Text>
}

export default RegularText
