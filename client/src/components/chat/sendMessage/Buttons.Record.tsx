import React from 'react'
import KeyboardVoice from '@material-ui/icons/KeyboardVoice'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@mui/material'
import { ButtonAnimation } from './SendMessage.Animations'

const RecordButton = (props: ButtonProps) => {
  return (
    <Button variant="send-message-button" color="primary" {...props}>
      <KeyboardVoice
        component={motion.svg}
        fontSize="medium"
        whileHover={ButtonAnimation.animate}
        whileTap={ButtonAnimation.animate}
      />
    </Button>
  )
}

export default RecordButton
