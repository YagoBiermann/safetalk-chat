import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'

function ButtonState(props: { text: string; loading: boolean }) {
  return props.loading ? (
    <CircularProgress size={18} thickness={8} color="inherit" />
  ) : (
    <span>{props.text}</span>
  )
}

export default ButtonState
