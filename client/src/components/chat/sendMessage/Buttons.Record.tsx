import React from 'react'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import KeyboardVoice from '@material-ui/icons/KeyboardVoice'
import { motion } from 'framer-motion'

const RecordButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <KeyboardVoice
        component={motion.svg}
        whileHover={{ y: -3, transition: { duration: 0.1 } }}
      />
    </RoundedButton>
  )
}

export default RecordButton
