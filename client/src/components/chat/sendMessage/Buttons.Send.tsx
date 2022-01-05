import React from 'react'
import Send from '@material-ui/icons/Send'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import { motion } from 'framer-motion'

const SendButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <Send
        fontSize="medium"
        component={motion.svg}
        whileHover={{ rotateZ: '-35deg', transition: { duration: 0.1 } }}
      />
    </RoundedButton>
  )
}

export default SendButton
