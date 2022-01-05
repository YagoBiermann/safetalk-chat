import React from 'react'
import RoundedButton, { RoundeButtonProps } from '../../global/Button.Rounded'
import AttachFile from '@material-ui/icons/AttachFile'
import { motion } from 'framer-motion'

const UploadButton = (props: Omit<RoundeButtonProps, 'children'>) => {
  return (
    <RoundedButton {...props}>
      <AttachFile
        component={motion.svg}
        whileHover={{ y: -3, transition: { duration: 0.1 } }}
      />
    </RoundedButton>
  )
}

export default UploadButton
