import Popover from '@material-ui/core/Popover'
import React from 'react'
import styled from 'styled-components'
import copyToClipboard from '../../../lib/helpers/copy'
import usePopover from '../../../lib/hooks/usePopover'
import { ContentCopy } from '@mui/icons-material'

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.primary.main.elevation_4};
  border: none;
  width: 45px;
  height: 45px;
  border-radius: 5px 25px 25px 5px;
  margin-left: 10px;
  transition: background-color 0.5s;
  &:hover {
    background-color: ${props => props.theme.colors.primary.light.elevation_4};
    cursor: pointer;
  }
  &:active {
    background-color: ${props =>
      props.theme.colors.secondary.light.elevation_4};
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
