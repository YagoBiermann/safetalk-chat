import React from 'react'
import CircularProgress from '@mui/material/CircularProgress'
import RegularText from './RegularText'

function ButtonState(props: { text: string; loading: boolean }) {
  return props.loading ? (
    <CircularProgress size={18} thickness={8} color="inherit" />
  ) : (
    <RegularText>{props.text}</RegularText>
  )
}

export default ButtonState
