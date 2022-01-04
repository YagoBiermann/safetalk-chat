import React from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import { ImageMessageMobile } from './Message.MediaQueries'

const ImageTemplate = styled.img`
  align-self: center;
  width: 100%;
  height: auto;
  max-height: 400px;
  object-fit: cover;
  cursor: pointer;

  ${ImageMessageMobile}
`

const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${TextMessageStyle};
  margin: 10px 10px 0 10px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

function ImageMessage(props: { imageURL: string; message?: string }) {
  const { imageURL, message } = props

  return (
    <Content>
      <ImageTemplate src={imageURL} />
      {message ? <Text>{message}</Text> : null}
    </Content>
  )
}

export { ImageMessage }
