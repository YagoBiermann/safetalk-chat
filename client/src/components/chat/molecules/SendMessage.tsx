import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import InputMessage from '../atoms/SendMessage.Input'
import SendMessageButtons from './SendMessage.Buttons'
import { useForm } from 'react-hook-form'
import { useAppDispatch, useAppSelector } from '../../../store'
import { sendMessage } from '../../../services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'
import socket from '../../../services/sockets'

const MessageForm = styled.form`
  display: flex;
  flex-direction: row;
  width: inherit;
  margin-top: 30px;
`

function SendMessage() {
  const dispatch = useAppDispatch()
  const { register, handleSubmit, watch, resetField } =
    useForm<{ message: string }>()

  const message = watch('message', '')
  const handleSubmitMessage = (data: string) => {
    resetField('message')
    dispatch(sendMessage({ data, type: MESSAGE_TYPE.TEXT }))
  }

  useEffect(() => {
    socket.on('message', message => {
      console.log(message)
    })
    return () => {
      socket.off('message')
    }
  })

  return (
    <MessageForm
      id="messageForm"
      onSubmit={handleSubmit(data => handleSubmitMessage(data.message))}
    >
      <InputMessage {...register('message')} />
      <SendMessageButtons hasMessage={Boolean(message)} />
    </MessageForm>
  )
}

export default SendMessage
