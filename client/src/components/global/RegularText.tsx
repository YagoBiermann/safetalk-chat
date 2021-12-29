import React from 'react'
import styled from 'styled-components'

const Text = styled.span`
  color: ${props => props.theme.fontColor.secondary};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: 400;
`

const RegularText: React.FC<{ text: string }> = (props: { text: string }) => {
  return <Text>{props.text}</Text>
}

export default RegularText
