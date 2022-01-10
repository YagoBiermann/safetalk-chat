import React from 'react'
import AttachFile from '@material-ui/icons/AttachFile'
import { motion } from 'framer-motion'
import { Button, ButtonProps } from '@mui/material'
import { ButtonAnimation } from './SendMessage.Animations'

const UploadButton = (props: ButtonProps) => {
  return (
    <Button variant="contained" color="primary" {...props}>
      <AttachFile
        component={motion.svg}
        whileHover={ButtonAnimation.animate}
        whileTap={ButtonAnimation.animate}
      />
    </Button>
  )
}

export default UploadButton
