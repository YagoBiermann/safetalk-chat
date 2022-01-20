import React from 'react'
import Button, { ButtonProps } from '@mui/material/Button'
import { buttonMobile } from './Username.MediaQueries'

function UsernameButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={({ breakpoints }) => ({
        width: '200px',
        padding: '12px 15px',
        margin: '25px 0 0 0',
        letterSpacing: '1.2px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        },
        '&:active': {
          boxShadow: 'none'
        },
        [breakpoints.down('mobile')]: buttonMobile
      })}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default UsernameButton
