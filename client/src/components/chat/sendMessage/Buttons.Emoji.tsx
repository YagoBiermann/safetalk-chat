import React from 'react'
import { Button, ButtonProps } from '@mui/material'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import { motion } from 'framer-motion'
import { ButtonAnimation } from './SendMessage.Animations'

const EmojiButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <EmojiEmotions
        component={motion.svg}
        fontSize="medium"
        whileHover={ButtonAnimation.animate}
        whileTap={ButtonAnimation.animate}
      />
    </Button>
  )
}

export default EmojiButton
