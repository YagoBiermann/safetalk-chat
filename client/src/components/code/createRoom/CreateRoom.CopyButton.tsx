import Popover from '@material-ui/core/Popover'
import React from 'react'
import { styled } from '@mui/material/styles'
import copyToClipboard from '../../../lib/helpers/copy'
import usePopover from '../../../lib/hooks/usePopover'
import { ContentCopy } from '@mui/icons-material'
import { Button } from '@mui/material'
import { alpha } from '@mui/material'

const StyledButton = styled(Button)`
  width: 52px;
  height: 52px;
  border-radius: 5px 25px 25px 5px;
  margin-left: 10px;
  background-color: none;
  border: 1px solid ${({ theme }) => theme.fontColor.tertiary};
  &:hover {
    border: 1px solid ${({ theme }) => theme.palette.primary.main};
    background-color: ${({ theme }) => alpha(theme.palette.primary.main, 0.3)};
  }
`

function CopyButton(props: { roomCode: string }) {
  const { showPopover, handleClose, open, anchorEl } = usePopover()

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    showPopover(e)
    copyToClipboard(props.roomCode)
    setTimeout(handleClose, 1000)
  }

  return (
    <StyledButton onClick={handleCopy}>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        Copied
      </Popover>
      <ContentCopy sx={{ height: '70%', verticalAlign: 'middle' }} />
    </StyledButton>
  )
}

export default CopyButton
