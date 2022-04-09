import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InputMessage from './SendMessage.Input'
import SendMessageButtons from './SendMessage.Buttons'
import { SubmitHandler, useForm } from 'react-hook-form'
import useRecorder from '../../../lib/hooks/useRecorder'
import RecordAudio from './SendMessage.Recorder'
import {
  EmojiPickerDesktop,
  EmojiPickerMobile,
  EmojiPickerTablet,
  MessageFormMobile
} from './SendMessage.MediaQueries'
import { LayoutGroup } from 'framer-motion'
import { sendMessage } from '../../../lib/services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'
import { sendFileMessage } from '../../../lib/services/api'
import { emojiContext } from '../../../lib/context/emojiContext'
import 'emoji-mart/css/emoji-mart.css'
import { BaseEmoji, Picker } from 'emoji-mart'
import { alpha } from '@mui/material'

const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  ${MessageFormMobile}
`

const Wrapper = styled.div`
  position: relative;
`

const PickerStyles = styled.div`
  position: fixed;
  bottom: 160px;
  z-index: 9999;
  ${EmojiPickerDesktop}
  ${EmojiPickerMobile}
  ${EmojiPickerTablet}
`

type FormValues = {
  message: string
}

function SendMessage() {
  const [isEmojiPickerOpen, setEmojiPickerOpen] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const pickerRef = useRef<HTMLDivElement>(null)
  const { cancelRecord, finishRecord, recorder, clearRecord, startRecord } =
    useRecorder()
  const { register, handleSubmit, watch, resetField, setValue } =
    useForm<FormValues>()
  const message = watch('message', '')

  const closeEmojiPickerOnClickOutside = (ev: MouseEvent) => {
    const emojiButton = document.getElementById('emojiButton')
    if (pickerRef.current?.contains(ev.target as Node)) return
    if (emojiButton?.contains(ev.target as Node)) return
    setEmojiPickerOpen(false)
  }

  const handleEmojiPickup = (emoji: BaseEmoji) => {
    // code reference: https://stackoverflow.com/a/70046604/12898748
    if (inputRef.current) {
      const cursorPosition = inputRef.current.selectionStart || 0
      const text =
        message.slice(0, cursorPosition) +
        emoji.native +
        message.slice(cursorPosition)
      setValue('message', text)
      const newCursorPosition = cursorPosition + emoji.native!.length
      setTimeout(() => {
        inputRef.current?.setSelectionRange(
          newCursorPosition,
          newCursorPosition
        )
      }, 10)
    }
  }

  // Send text message
  const handleSubmitMessage: SubmitHandler<FormValues> = async data => {
    sendMessage({
      message: data.message,
      messageType: MESSAGE_TYPE.TEXT
    })

    resetField('message', { defaultValue: '', keepTouched: true })
  }

  // Send audio message
  useEffect(() => {
    if (recorder.audio) {
      sendFileMessage({
        file: recorder.audio,
        messageType: MESSAGE_TYPE.AUDIO,
        message: ''
      })
    }
    return () => {
      clearRecord()
    }
  }, [recorder.audio])

  useEffect(() => {
    document.addEventListener('click', closeEmojiPickerOnClickOutside, false)

    return () => {
      document.removeEventListener(
        'click',
        closeEmojiPickerOnClickOutside,
        false
      )
    }
  })

  useEffect(() => {
    console.log(message)
  }, [message])

  return (
    <emojiContext.Provider value={{ isEmojiPickerOpen, setEmojiPickerOpen }}>
      <MessageForm
        id="messageForm"
        onSubmit={handleSubmit(handleSubmitMessage)}
      >
        <InputMessage
          inputRef={inputRef}
          width="100%"
          inputProps={{ ...register('message') }}
        />
        <LayoutGroup>
          {recorder.isRecording ? (
            <RecordAudio layout finish={finishRecord} cancel={cancelRecord} />
          ) : (
            <Wrapper>
              {isEmojiPickerOpen && (
                <PickerStyles ref={pickerRef}>
                  <Picker
                    onSelect={handleEmojiPickup}
                    onClick={() => inputRef.current?.focus()}
                    title="Pick your emoji"
                    emoji="point_up"
                    color={alpha('rgba(150, 60, 160, 1)', 0.8)}
                    theme="dark"
                  />
                </PickerStyles>
              )}

              <SendMessageButtons
                layout
                hasMessage={Boolean(message)}
                startRecord={startRecord}
              />
            </Wrapper>
          )}
        </LayoutGroup>
      </MessageForm>
    </emojiContext.Provider>
  )
}

export default SendMessage
