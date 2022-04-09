import React from 'react'
import styled from 'styled-components'
import EmojiButton from './Buttons.Emoji'
import UploadButton from './Buttons.Upload'
import SendButton from './Buttons.Send'
import RecordButton from './Buttons.Record'
import { SendMessageButtonsMobile } from './SendMessage.MediaQueries'
import { HTMLMotionProps } from 'framer-motion/types/render/html/types'
import { motion, useAnimation } from 'framer-motion'
import { syncButtonsAnimation } from './SendMessage.Animations'

const MainBox = styled(motion.div)`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: flex-end;
  margin-left: 15px;
  & > div {
    margin-left: 15px;
  }
  ${SendMessageButtonsMobile}
`

type SendMessageButtonsProps = React.HTMLAttributes<HTMLDivElement> &
  HTMLMotionProps<'div'> & {
    hasMessage: boolean
    startRecord: () => void
  }

function SendMessageButtons(props: SendMessageButtonsProps) {
  const controls = useAnimation()

  return (
    <MainBox
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {props.hasMessage ? (
        <motion.div>
          <SendButton form="messageForm" type="submit" />
        </motion.div>
      ) : (
        <motion.div
          custom={1}
          variants={syncButtonsAnimation}
          animate={controls}
        >
          <RecordButton
            onClick={async () => {
              await controls.start('click')
              props.startRecord()
            }}
          />
        </motion.div>
      )}
      <motion.div custom={2} variants={syncButtonsAnimation} animate={controls}>
        <EmojiButton />
      </motion.div>
      <motion.div custom={3} variants={syncButtonsAnimation} animate={controls}>
        <UploadButton />
      </motion.div>
    </MainBox>
  )
}

export default SendMessageButtons
