import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import store from '../../store'
import { resetError } from '../../store/ducks/app'
import { motion } from 'framer-motion'

const Error = styled(Alert)`
  border-radius: 25px;
  background-color: #990000dd;
  font-weight: 400;
`

export default function ErrorAlert(props: { error: string }) {
  const [isOpen, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    store.dispatch(resetError())
  }
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        x: [-10, 10],
        scale: 1,
        opacity: 1,
        transition: {
          x: { delay: 0.2, repeatType: 'reverse', repeat: 3, duration: 0.2 }
        }
      }}
      exit={{ x: -100, opacity: 1, transition: { duration: 0.2 } }}
    >
      <Snackbar
        open={isOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Error variant={'filled'} severity="error" onClose={handleClose}>
          {props.error}
        </Error>
      </Snackbar>
    </motion.div>
  )
}
