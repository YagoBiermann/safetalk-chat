import React, { useEffect } from 'react'
import styled from 'styled-components'
import Check from '@material-ui/icons/Check'
import Close from '@material-ui/icons/Close'
import useTimer from '../../../lib/hooks/useTimer'
import { RecorderMobile } from './SendMessage.MediaQueries'
import { HTMLMotionProps } from 'framer-motion/types/render/html/types'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'

const InnerBox = styled.div`
  margin: 0 20px 0 20px;
`

const MainBox = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
  width: 250px;
  height: 48px;
  ${RecorderMobile}
`

const Timer = styled.span`
  font-weight: bold;
`

type RecordAudioProps = React.HTMLAttributes<HTMLDivElement> &
  HTMLMotionProps<'div'> & {
    cancel: () => void
    finish: () => void
  }

const recorderAnimation = {
  visible: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.3
    }
  },
  hidden: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 0.25
    }
  }
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
    <MainBox variants={recorderAnimation} animate={'visible'} exit={'hidden'}>
      <Button variant="cancel" onClick={props.cancel}>
        <Close />
      </Button>

      <InnerBox id="recordTimerBox">
        <Timer>
          {minute}:{second}
        </Timer>
      </InnerBox>

      <Button variant="confirm" onClick={props.finish}>
        <Check />
      </Button>
    </MainBox>
  )
}

export default RecordAudio
