import React from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'

const Content = styled.div`
  margin: 0 10px 0 10px;
`
const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${TextMessageStyle}
`

function TextMessage(props: { message?: string; width?: number }) {
  return (
    <Content>
      <Text>{props.message}</Text>
    </Content>
  )
}

export { TextMessage }
