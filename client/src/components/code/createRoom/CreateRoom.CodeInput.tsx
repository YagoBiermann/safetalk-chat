import React from 'react'
import styled from 'styled-components'
import PrimaryInput from '../../global/Input.Primary'
import TextField from '@mui/material/TextField'
import copyToClipboard from '../../../lib/helpers/copy'
import KeyIcon from '@mui/icons-material/Key'
import InputAdornment from '@mui/material/InputAdornment'

function CodeInput(props: { roomCode: string }) {
  return (
    <TextField
      value={props.roomCode}
      variant="filled"
      label="Code"
      sx={{
        width: '100%'
      }}
      inputProps={{
        style: { textAlign: 'center' },
        onClick: e => {
          const event = e.target as HTMLInputElement
          event.select()
          copyToClipboard(event.value)
        }
      }}
      InputProps={{
        readOnly: true,
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        )
      }}
    />
  )
}

export default CodeInput
