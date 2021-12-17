import React from 'react'
import { styled } from '@mui/material/styles'
import { IconButton } from '@mui/material'
import Send from '@material-ui/icons/Send'

const SendButton = styled(IconButton)(
  ({ theme }) => `
  border-radius: 0px 0px 10px 0;
  background-color: ${theme.palette.primary.main};
  transition: background-color 0.2s ease-in-out;
  height: 100%;
  padding-left: 12px;
  &:hover {
    background-color: ${theme.palette.primary.light};
  }
  > .MuiTouchRipple-root span {
    transform: scale(1.5);
  }
  & > svg {
    font-size: 1.2em;
    color: whitesmoke;
  }
`
)

const PreviewSendButton: React.FC<
  React.ButtonHTMLAttributes<HTMLButtonElement>
> = () => {
  return (
    <SendButton>
      <Send fontSize="medium" />
    </SendButton>
  )
}

export default PreviewSendButton
