import { Button, ButtonProps } from '@mui/material'
import React from 'react'

function CodeButton(props: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={({ breakpoints }) => ({
        width: '200px',
        padding: '12px 15px',
        margin: '30px 0 0 0',
        letterSpacing: '1.2px',
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none'
        },
        '&:active': {
          boxShadow: 'none'
        },
        [breakpoints.down('tablet')]: {
          width: '60%'
        }
      })}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export default CodeButton
