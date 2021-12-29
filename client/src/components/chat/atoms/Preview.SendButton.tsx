import React from 'react'
import { styled } from '@mui/material/styles'
import { IconButton, IconButtonProps } from '@mui/material'
import Send from '@material-ui/icons/Send'

const SendButton = styled(IconButton)(
  ({ theme }) => `
  border-radius: 0px 0px 10px 0;
  background-color: ${theme.palette.primary.main};
  transition: background-color 0.2s ease-in-out;
  height: inherit;
  width: 82px;
  &:hover {
    background-color: ${theme.palette.primary.light};
  }
  > .MuiTouchRipple-root span {
    transform: scale(1.5);
  }
  & > svg {
    font-size: 1.3em;
    color: whitesmoke;
  }
`
)

const PreviewSendButton = ({ ...props }: IconButtonProps) => {
  return (
    <SendButton {...props}>
      <Send fontSize="medium" />
    </SendButton>
  )
}

export default PreviewSendButton
