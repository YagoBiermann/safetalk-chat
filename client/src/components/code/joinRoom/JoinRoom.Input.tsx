import React, { ForwardedRef } from 'react'
import TextField from '@mui/material/TextField'

const JoinRoomInput = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLInputElement>) => {
    return (
      <TextField
        inputRef={ref}
        sx={({ breakpoints }) => ({
          width: '100%'
        })}
        required
        id="outlined-join-room-input"
        label="enter your code"
        variant="outlined"
        InputLabelProps={{ required: false }}
        inputProps={{ maxLength: 32, ...props }}
        onInput={e => {
          ;(e.target as HTMLInputElement).setCustomValidity('')
        }}
        onInvalid={e => {
          ;(e.target as HTMLInputElement).setCustomValidity(
            'did you forget something? :P'
          )
        }}
      />
    )
  }
)

export default JoinRoomInput
