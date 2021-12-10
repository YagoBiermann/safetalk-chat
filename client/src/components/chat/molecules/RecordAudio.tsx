import React, { useEffect, useState } from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import OutlinedButton from '../../global/Button.Outlined'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import defaultText from '../../../assets/styles/default.Text'
import { useAppDispatch } from '../../../store'
import { sendMessage } from '../../../services/messages'
import { MESSAGE_TYPE } from '../../../lib/enums'

const MainBox = styled(Box)`
  justify-content: space-between;
  align-items: center;
  margin-left: 10px;
`

const InnerBox = styled(Box)`
  margin: 0 10px 0 10px;
`

const Timer = styled.span`
  ${defaultText}
`

function RecordAudio(props: any) {
  const dispatch = useAppDispatch()

  const sendAudioMessage = () => {
    dispatch(sendMessage({ data: props.data, type: MESSAGE_TYPE.AUDIO }))
  }

  useEffect(() => {
    console.log(props.data)
  })

  return (
    <MainBox direction="row">
      <OutlinedButton onClick={props.cancel}>
        <Close color="error" />
      </OutlinedButton>

      <InnerBox direction="row">
        <Timer>00:45</Timer>
      </InnerBox>

      <OutlinedButton onClick={props.finish}>
        <Check color="success" />
      </OutlinedButton>
    </MainBox>
  )
}

export default RecordAudio
