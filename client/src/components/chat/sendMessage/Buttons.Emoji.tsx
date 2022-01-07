import React from 'react'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import EmojiEmotions from '@material-ui/icons/EmojiEmotions'
import { motion } from 'framer-motion'

const EmojiButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <EmojiEmotions
        component={motion.svg}
        whileHover={{ y: -3, transition: { duration: 0.1 } }}
      />
    </RoundedButton>
  )
}

export default EmojiButton
