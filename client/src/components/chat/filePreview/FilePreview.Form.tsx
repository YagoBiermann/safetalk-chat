import React from 'react'
import styled from 'styled-components'
import { SubmitHandler, useForm } from 'react-hook-form'
import PreviewSendButton from './Form.SendButton'
import { FileWithPreview } from '../../../lib/interfaces'
import { TextField } from '@mui/material'
import { alpha } from '@mui/material/styles'
import { sendFileMessage } from '../../../lib/services/api'
import getFileType from '../../../lib/helpers/getFileType'

const InputBox = styled.form`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 100%;
`

type FormValues = {
  message: string
}

type PreviewSendTypes = {
  file: FileWithPreview
  close: () => void
}

function PreviewSend(props: PreviewSendTypes) {
  const { file, close } = props
  const { resetField, register, handleSubmit } = useForm<FormValues>({
    defaultValues: { message: '' }
  })

  const submitMessage: SubmitHandler<FormValues> = data => {
    sendFileMessage({
      file,
      message: data.message,
      messageType: getFileType(file)
    })
    resetField('message')
    close()
  }

  return (
    <InputBox onSubmit={handleSubmit(submitMessage)}>
      <TextField
        sx={({ palette }) => ({
          justifyContent: 'center',
          width: '100%',
          padding: '0 0 0 15px',
          backgroundColor: alpha(palette.primary.main, 0.4),
          color: alpha(palette.primary.light, 0.5),
          transition: 'background-color 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: alpha(palette.primary.main, 0.6),
            boxShadow: 1
          }
        })}
        inputProps={{ ...register('message') }}
        InputProps={{ disableUnderline: true }}
        placeholder="say something about it"
        autoComplete="off"
        variant="standard"
      />
      <PreviewSendButton type="submit" />
    </InputBox>
  )
}

export default PreviewSend
