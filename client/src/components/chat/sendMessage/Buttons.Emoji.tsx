import React, { useContext } from 'react'
import { Button, ButtonProps } from '@mui/material'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import { motion } from 'framer-motion'
import { ButtonAnimation } from './SendMessage.Animations'
import { emojiContext } from '../../../lib/context/emojiContext'

const EmojiButton = (props: ButtonProps) => {
  const { isEmojiPickerOpen, setEmojiPickerOpen } = useContext(emojiContext)

  return (
    <Button
      id="emojiButton"
      onClick={() => setEmojiPickerOpen(!isEmojiPickerOpen)}
      variant="send-message-button"
      color="primary"
      {...props}
    >
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
