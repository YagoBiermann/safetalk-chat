import React from 'react'
import Close from '@material-ui/icons/Close'
import { styled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'

const CloseButton = styled(Button)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  z-index: 9999;
  &:hover {
    background: ${({ theme }) => theme.palette.primary.dark};
  }
`

const PreviewCloseButton = (props: ButtonProps) => {
  return (
    <CloseButton {...props}>
      <Close fontSize="large" />
    </CloseButton>
  )
}

export default PreviewCloseButton
