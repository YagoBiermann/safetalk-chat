import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import Box from '../../global/Box'
import Dropzone from './Messages.Dropzone'
import { MessageTemplate } from '../messageCard/MessageCard'
import { ImageMessage } from '../messageCard/Message.Image'
import { TextMessage } from '../messageCard/Message.Text'
import { VideoMessage } from '../messageCard/Message.Video'
import { AudioMessage } from '../messageCard/Message.Audio'

const OuterBox = styled(Box)`
  background-color: ${props => props.theme.colors.secondary.dark.elevation_0};
  border-radius: 25px 5px 5px 5px;
  height: 80vh;
  width: inherit;
  position: relative;
`
const InnerBox = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`

function MessagesBox() {
  const [isDragOver, setDragOver] = useState(false)

  const closeDropzone = () => {
    setDragOver(false)
  }

  // close dropzone with escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeDropzone()
      }
    }

    window.addEventListener('keydown', handleKeyDown, false)
    return () => {
      window.removeEventListener('keydown', handleKeyDown, false)
    }
  }, [isDragOver])

  return (
    <OuterBox
      onDragEnter={e => {
        setDragOver(true)
      }}
      onDragLeave={e => {
        const chat = document.getElementById('chatContainer')
        if (e.relatedTarget === chat) {
          setDragOver(false)
        }
      }}
    >
      <InnerBox>
        <MessageTemplate myMessage username="Yago biermann">
          <ImageMessage
            imageURL="https://picsum.photos/id/237/800/600"
            message="This is a test message"
          />
        </MessageTemplate>
        <MessageTemplate username="Yago biermann">
          <TextMessage message="Lorem ipsum dolor sadssit amet Lorem isasapsum dolor sit amet assaLorem ipsussam dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet " />
        </MessageTemplate>
        <MessageTemplate username="Yago biermann">
          <VideoMessage
            message="Lorem ipsum dolor sadssit amet Lorem isasapsum dolor sit amet assaLorem ipsussam dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet "
            videoURL={'/static/images/video.mp4'}
          />
        </MessageTemplate>
        <MessageTemplate username="Yago biermann">
          <AudioMessage src={'/static/images/audio.mp3'} type="audio/mp3" />
        </MessageTemplate>
      </InnerBox>
      {isDragOver ? <Dropzone close={closeDropzone} /> : null}
    </OuterBox>
  )
}

export default MessagesBox
