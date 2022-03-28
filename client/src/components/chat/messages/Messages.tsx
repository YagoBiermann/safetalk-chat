import React, { useContext, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import Dropzone from './Messages.Dropzone'
import { AnimatePresence } from 'framer-motion'
import { useAppDispatch, useAppSelector } from '../../../store'
import MappedMessages from './Messages.Mapped'
import { socketContext } from '../../../lib/context/socketContext'
import { Message } from '../../../lib/interfaces'
import { addMessage } from '../../../store/ducks/messages'

const OuterBox = styled.div<{ isDragOver: boolean }>`
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.dark.elevation_0};
  border: 1px solid ${props => props.theme.fontColor.tertiary};
  border-radius: 25px 5px 5px 5px;
  width: 100%;
  height: 100%;
  overflow-y: ${props => (props.isDragOver ? 'hidden' : 'scroll')};
  position: relative;

  @media screen and (max-width: ${props => props.theme.appBreakpoints.tablet}) {
    border-radius: 0;
  }
`

function MessagesBox() {
  const [isDragOver, setDragOver] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const messagesRef = useRef<HTMLDivElement>(null)
  const messages = useAppSelector(state => state.message.messages)
  const socket = useContext(socketContext)
  const dispatch = useAppDispatch()

  const closeDropzone = () => {
    setDragOver(false)
  }

  useEffect(() => {
    socket.on('room:message', (message: Message) => {
      dispatch(addMessage(message))
    })
  }, [socket])

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
      {MappedMessages({ messages })}
      <AnimatePresence>
        {isDragOver ? (
          <Dropzone
            position={messagesRef.current!.scrollTop}
            id="dropzone"
            close={closeDropzone}
          />
        ) : null}
      </AnimatePresence>
      <div ref={scrollRef} />
    </OuterBox>
  )
}

export default MessagesBox
