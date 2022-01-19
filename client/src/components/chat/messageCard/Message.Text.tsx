import React from 'react'
import styled from 'styled-components'
import RegularText from '../../global/RegularText'

const Content = styled.div`
  margin: 0 10px 0 10px;
`
type TextMessageProps = {
  message: string
}

function TextMessage(props: TextMessageProps) {
  return (
    <Content>
      <RegularText children={props.message} />
    </Content>
  )
}

export { TextMessage }
