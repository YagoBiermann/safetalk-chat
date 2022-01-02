import React from 'react'
import styled from 'styled-components'

const Text = styled.span<{ bold?: boolean }>`
  color: ${props => props.theme.fontColor.secondary};
  font-size: ${props => props.theme.fontSizes.medium};
  font-weight: ${props => (props.bold ? 600 : 400)};
`

const RegularText = (props: { children: string; bold?: boolean }) => {
  return <Text bold={props.bold}>{props.children}</Text>
}

export default RegularText
