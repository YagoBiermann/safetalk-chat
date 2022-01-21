import React, { ForwardedRef } from 'react'
import TextField from '@mui/material/TextField'
import { inputTablet } from './Username.MediaQueries'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'

const UsernameInput = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLInputElement>) => {
    const theme = useTheme()
    const isTablet = useMediaQuery(theme.breakpoints.down('tablet'))
    return (
      <TextField
        inputRef={ref}
        sx={({ breakpoints }) => ({
          width: '400px',
          [breakpoints.down('tablet')]: inputTablet
        })}
        required
        id="outlined-username-input"
        label="enter your username"
        variant="outlined"
        size={isTablet ? 'small' : 'medium'}
        InputLabelProps={{ required: false }}
        inputProps={{ maxLength: 25, ...props }}
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

export default UsernameInput
