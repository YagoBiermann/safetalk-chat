import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InputMessage from './SendMessage.Input'
import SendMessageButtons from './SendMessage.Buttons'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../store'
import { sendAudioMessage, sendTextMessage } from '../../../services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'
import useRecorder from '../../../lib/hooks/useRecorder'
import RecordAudio from './SendMessage.Recorder'

const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  & > input {
    padding: 0;
    text-indent: 10px;
  }

  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    flex-direction: column-reverse;
    width: 100vw;
    margin-top: 15px;
    & > input {
      border-radius: 0;
    }
  }
`

type FormValues = {
  message: string
}

function SendMessage() {
  const dispatch = useAppDispatch()
  const { cancelRecord, finishRecord, recorder, startRecord } = useRecorder()
  const { register, handleSubmit, watch, resetField } = useForm<FormValues>()
  const message = watch('message', '')

  // Send text message
  const handleSubmitMessage: SubmitHandler<FormValues> = data => {
    resetField('message')
    sendTextMessage(data.message)
  }

  // Send audio message
  useEffect(() => {
    if (recorder.audio) {
      console.log(recorder.audio)
    }
  }, [recorder.audio])

  return (
    <MessageForm id="messageForm" onSubmit={handleSubmit(handleSubmitMessage)}>
      <InputMessage width="100%" height="48px" {...register('message')} />
      {recorder.isRecording ? (
        <RecordAudio finish={finishRecord} cancel={cancelRecord} />
      ) : (
        <SendMessageButtons
          hasMessage={Boolean(message)}
          startRecord={startRecord}
        />
      )}
    </MessageForm>
  )
}

export default SendMessage
