import React, { useState } from 'react'
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { styled } from '@mui/material/styles'
import store from '../../store'
import { resetError } from '../../store/ducks/app'

const Error = styled(Alert)`
  border-radius: 25px;
  background-color: #990000dd;
`

export default function ErrorAlert(props: { error: string }) {
  const [isOpen, setOpen] = useState(true)

  const handleClose = () => {
    setOpen(false)
    store.dispatch(resetError())
  }
  return (
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
  )
}
