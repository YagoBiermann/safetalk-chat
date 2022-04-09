import React, { ForwardedRef } from 'react'
import TextField, { TextFieldProps } from '@mui/material/TextField'

type InputMessageTypes = TextFieldProps & {
  width?: string
  height?: string
}

const InputMessage = (props: InputMessageTypes) => {
  return (
    <TextField
      sx={({ dark, breakpoints }) => ({
        backgroundColor: dark.elevation_2,
        borderRadius: '10px',
        width: props.width,
        [breakpoints.down('tablet')]: {
          borderRadius: '0px'
        },
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          height: '48px',
          [breakpoints.down('tablet')]: {
            height: 'unset',
            borderRadius: '0px'
          }
        }
      })}
      variant="outlined"
      inputRef={props.inputRef}
      inputProps={{ maxLength: 400, ...props.inputProps }}
      placeholder="Type a message"
      autoComplete="off"
    />
  )
}

export default InputMessage
