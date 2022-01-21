import React from 'react'
import styled from 'styled-components'
import PrimaryInput from '../../global/Input.Primary'
import { SubmitHandler, useForm } from 'react-hook-form'
import PreviewSendButton from './Form.SendButton'
import { DropFile } from '../../../lib/interfaces'
import { sendFileMessage } from '../../../services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'
import { TextField } from '@mui/material'
import { alpha } from '@mui/material/styles'

const InputBox = styled.form`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 100%;
`

const PreviewInput = styled(PrimaryInput)`
  border-radius: 0px 0px 0px 10px;
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
}

function PreviewSend(props: PreviewSendTypes) {
  const { file, close } = props
  const { resetField, register, handleSubmit } = useForm<FormValues>({
    defaultValues: { message: '' }
  })

  const submitMessage: SubmitHandler<FormValues> = data => {
    sendFileMessage(file.preview, MESSAGE_TYPE.FILE, data.message)
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
