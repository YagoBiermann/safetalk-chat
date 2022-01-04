import React, { useEffect } from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import OutlinedButton from '../../global/Button.Outlined'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import useTimer from '../../../lib/hooks/useTimer'

const InnerBox = styled(Box)`
  margin: 0 10px 0 10px;
`

const MainBox = styled(Box)`
  justify-content: space-around;
  margin-left: 25px;
  width: 230px;

  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    margin: 0 0 15px 0;
    justify-content: center;
    & ${InnerBox} {
      margin: 0 15px 0 15px;
    }
  }
`

const Timer = styled.span`
  font-weight: bold;
`

type RecordAudioProps = {
  cancel: () => void
  finish: () => void
}

function RecordAudio(props: RecordAudioProps) {
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
