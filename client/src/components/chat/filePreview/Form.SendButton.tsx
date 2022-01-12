import React from 'react'
import { styled } from '@mui/material/styles'
import { Button, ButtonProps } from '@mui/material'
import Send from '@material-ui/icons/Send'

const SendButton = styled(Button)(
  ({ theme }) => `
  border-radius: 0px 0px 10px 0;
  height: inherit;
  width: 82px;
  box-shadow: none;

  @media screen and (max-width: 600px) {
    & > svg {
      font-size: 1.6em;
    }
  }
`
)

const PreviewSendButton = ({ ...props }: ButtonProps) => {
  return (
    <SendButton color="primary" variant="contained" {...props}>
      <Send fontSize="medium" />
    </SendButton>
  )
}

export default PreviewSendButton
