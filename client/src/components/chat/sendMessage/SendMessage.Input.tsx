import React, { ForwardedRef } from 'react'
import TextField from '@mui/material/TextField'

interface propTypes {
  width?: string
  height?: string
  props?: any
}

const InputMessage = React.forwardRef(
  (props: propTypes, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <TextField
        inputRef={ref}
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
        inputProps={{ maxLength: 400, ...props }}
        placeholder="Type a message"
        autoComplete="off"
      />
    )
  }
)

export default InputMessage
