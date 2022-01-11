import React from 'react'
import Send from '@material-ui/icons/Send'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@mui/material'
import { ButtonAnimation } from './SendMessage.Animations'

const SendButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <Send
        fontSize="medium"
        component={motion.svg}
        whileHover={ButtonAnimation.animate}
        whileTap={ButtonAnimation.animate}
      />
    </Button>
  )
}

export default SendButton
