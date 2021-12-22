import React from 'react'
import styled from 'styled-components'
import PrimaryInput from '../../global/Input.Primary'
import { useForm } from 'react-hook-form'
import PreviewSendButton from '../atoms/Preview.SendButton'

const InputBox = styled.div`
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
  &::placeholder {
    color: ${props => props.theme.fontColor.secondary};
  }
`

function PreviewSend() {
  return (
    <InputBox>
      <PreviewInput placeholder="say something about it" />
      <PreviewSendButton />
    </InputBox>
  )
}

export default PreviewSend
