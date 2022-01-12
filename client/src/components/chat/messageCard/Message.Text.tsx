import React from 'react'
import styled from 'styled-components'
import RegularTextStyle from '../../../assets/styles/default.RegularText'

const Content = styled.div`
  margin: 0 10px 0 10px;
`
const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${RegularTextStyle}
`

function TextMessage(props: { message?: string; width?: number }) {
  return (
    <Content>
      <Text>{props.message}</Text>
    </Content>
  )
}

export { TextMessage }
