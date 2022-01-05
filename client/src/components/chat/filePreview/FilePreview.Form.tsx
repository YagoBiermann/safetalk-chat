import React from 'react'
import styled from 'styled-components'
import PrimaryInput from '../../global/Input.Primary'
import { SubmitHandler, useForm } from 'react-hook-form'
import PreviewSendButton from './Form.SendButton'
import { DropFile } from '../../../lib/interfaces'
import { sendFileMessage } from '../../../services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'

const InputBox = styled.form`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 100%;
`

const PreviewInput = styled(PrimaryInput)`
  border-radius: 0px 0px 0px 10px;
  background-color: ${props => props.theme.colors.primary.main.elevation_4};
  height: inherit;
  width: 100%;
  text-indent: 10px;
  &::placeholder {
    color: ${props => props.theme.fontColor.secondary};
  }
`
type FormValues = {
  message: string
}

type PreviewSendTypes = {
  file: DropFile
  close: () => void
  submitted: React.Dispatch<React.SetStateAction<boolean>>
}

function PreviewSend(props: PreviewSendTypes) {
  const { file, close, submitted } = props
  const { resetField, register, handleSubmit } = useForm<FormValues>({
    defaultValues: { message: '' }
  })

  const submitMessage: SubmitHandler<FormValues> = data => {
    sendFileMessage(file.preview, MESSAGE_TYPE.FILE, data.message)
    resetField('message')
    submitted(true)
    close()
  }

  return (
    <InputBox onSubmit={handleSubmit(submitMessage)}>
      <PreviewInput
        {...register('message')}
        placeholder="say something about it"
        autoComplete="off"
      />
      <PreviewSendButton type="submit" />
    </InputBox>
  )
}

export default PreviewSend
