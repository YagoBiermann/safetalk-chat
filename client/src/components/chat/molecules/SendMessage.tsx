import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InputMessage from '../atoms/SendMessage.Input'
import SendMessageButtons from './SendMessage.Buttons'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../store'
import { sendMessage } from '../../../services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'
import SendButton from '../atoms/Buttons.Send'
import RecordButton from '../atoms/Buttons.Record'
import useRecorder from '../../../lib/hooks/useRecorder'
import RecordAudio from './RecordAudio'

const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  width: inherit;
  margin-top: 30px;
`

function SendMessage() {
  const dispatch = useAppDispatch()
  const { cancelRecord, finishRecord, recorder, startRecord } = useRecorder()
  const { register, handleSubmit, watch, resetField } =
    useForm<{ message: string }>()
  const message = watch('message', '')

  //Send text message
  const handleSubmitMessage = (data: string) => {
    resetField('message')
    dispatch(sendMessage({ data, type: MESSAGE_TYPE.TEXT }))
  }

  //send audio message
  useEffect(() => {
    if (recorder.audio) {
      dispatch(sendMessage({ data: recorder.audio, type: MESSAGE_TYPE.AUDIO }))
    }
  }, [recorder.audio])

  return (
    <MessageForm
      id="messageForm"
      onSubmit={handleSubmit(data => handleSubmitMessage(data.message))}
    >
      <InputMessage {...register('message')} />
      {recorder.isRecording ? (
        <RecordAudio finish={finishRecord} cancel={cancelRecord} />
      ) : (
        <SendMessageButtons>
          {message ? (
            <SendButton type="submit" />
          ) : (
            <RecordButton onClick={startRecord} />
          )}
        </SendMessageButtons>
      )}
    </MessageForm>
  )
}

export default SendMessage
