import React from 'react'
import Close from '@material-ui/icons/Close'
import styled from 'styled-components'
import { Button, ButtonProps } from '@mui/material'

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  z-index: 9999;
`

const PreviewCloseButton = (props: ButtonProps) => {
  return (
    <CloseButton {...props}>
      <Close fontSize="large" />
    </CloseButton>
  )
}

export default PreviewCloseButton
