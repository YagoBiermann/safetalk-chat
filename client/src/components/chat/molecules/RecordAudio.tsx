import React, { useEffect, useState } from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import OutlinedButton from '../../global/Button.Outlined'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import defaultText from '../../../assets/styles/default.Text'
import useTimer from '../../../lib/hooks/useTimer'

const MainBox = styled(Box)`
  justify-content: space-around;
  align-items: center;
  margin-left: 25px;
  width: 230px;
`

const InnerBox = styled(Box)`
  margin: 0 10px 0 10px;
`

const Timer = styled.span`
  ${defaultText}
  font-weight: bold;
`

function RecordAudio(props: any) {
  const { second, minute, initTimer, stopTimer } = useTimer()

  useEffect(() => {
    initTimer()
    return () => {
      stopTimer()
    }
  }, [])

  return (
    <MainBox direction="row">
      <OutlinedButton onClick={props.cancel}>
        <Close />
      </OutlinedButton>

      <InnerBox direction="row">
        <Timer>
          {minute}:{second}
        </Timer>
      </InnerBox>

      <OutlinedButton onClick={props.finish}>
        <Check />
      </OutlinedButton>
    </MainBox>
  )
}

export default RecordAudio
