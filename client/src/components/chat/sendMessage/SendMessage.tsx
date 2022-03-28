import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import InputMessage from './SendMessage.Input'
import SendMessageButtons from './SendMessage.Buttons'
import { SubmitHandler, useForm } from 'react-hook-form'
import useRecorder from '../../../lib/hooks/useRecorder'
import RecordAudio from './SendMessage.Recorder'
import { MessageFormMobile } from './SendMessage.MediaQueries'
import { LayoutGroup } from 'framer-motion'
import { sendMessage } from '../../../lib/services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'
import { sendFileMessage } from '../../../lib/services/api'

const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  margin-top: 30px;
  ${MessageFormMobile}
`

type FormValues = {
  message: string
}

function SendMessage() {
  const { cancelRecord, finishRecord, recorder, clearRecord, startRecord } =
    useRecorder()
  const { register, handleSubmit, watch, resetField } = useForm<FormValues>()
  const message = watch('message', '')

  // Send text message
  const handleSubmitMessage: SubmitHandler<FormValues> = async data => {
    sendMessage({
      message: data.message,
      messageType: MESSAGE_TYPE.TEXT
    })

    resetField('message')
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

  return (
    <MessageForm id="messageForm" onSubmit={handleSubmit(handleSubmitMessage)}>
      <InputMessage width="100%" {...register('message')} />
      <LayoutGroup>
        {recorder.isRecording ? (
          <RecordAudio layout finish={finishRecord} cancel={cancelRecord} />
        ) : (
          <SendMessageButtons
            layout
            hasMessage={Boolean(message)}
            startRecord={startRecord}
          />
        )}
      </LayoutGroup>
    </MessageForm>
  )
}

export default SendMessage
