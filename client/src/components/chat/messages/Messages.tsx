import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Dropzone from './Messages.Dropzone'
import { MessageCard } from '../messageCard/MessageCard'
import { ImageMessage } from '../messageCard/Message.Image'
import { TextMessage } from '../messageCard/Message.Text'
import { VideoMessage } from '../messageCard/Message.Video'
import { AudioMessage } from '../messageCard/Message.Audio'

const OuterBox = styled.div<{ isDragOver: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.secondary.dark.elevation_0};
  border-radius: 25px 5px 5px 5px;
  width: 100%;
  height: 100%;
  overflow-y: ${props => (props.isDragOver ? 'hidden' : 'scroll')};
  position: relative;

  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    border-radius: 0;
  }
`

function MessagesBox() {
  const [isDragOver, setDragOver] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)

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

  // scroll to bottom of messages box
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <OuterBox
      ref={messagesRef}
      isDragOver={isDragOver}
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
      <MessageCard username="Yago biermann">
        <ImageMessage
          imageURL="https://picsum.photos/id/237/800/600"
          message="This is a test message"
        />
      </MessageCard>

      <MessageCard myMessage username="Yago biermann">
        <TextMessage message="Lorem ipsum dolor sadssit amet Lorem isasapsum dolor sit amet assaLorem ipsussam dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet " />
      </MessageCard>

      <MessageCard username="Yago biermann">
        <VideoMessage
          message="Lorem ipsum dolor sadssit amet Lorem isasapsum dolor sit amet assaLorem ipsussam dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet "
          videoURL={'/static/images/video.mp4'}
        />
      </MessageCard>

      <MessageCard myMessage username="Yago biermann">
        <AudioMessage src={'/static/images/audio.mp3'} type="audio/mp3" />
      </MessageCard>
      <div ref={scrollRef} />
      {isDragOver ? (
        <Dropzone
          position={messagesRef.current!.scrollTop}
          id="dropzone"
          close={closeDropzone}
        />
      ) : null}
    </OuterBox>
  )
}

export default MessagesBox
