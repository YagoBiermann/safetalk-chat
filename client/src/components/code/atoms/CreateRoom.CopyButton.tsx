import React from 'react'
import styled from 'styled-components'
import Popover from '@material-ui/core/Popover'
import usePopover from '../../../lib/hooks/usePopover'
import copyToClipboard from '../../../lib/helpers/copy'

const StyledPopover = styled(Popover)`
  .MuiPopover-paper {
    padding: 10px;
    border: none;
    background-color: ${props => props.theme.colors.primary.main.elevation_4};
    color: whitesmoke;
    font-weight: 500;
    font-size: ${props => props.theme.fontSizes.medium};
  }
`

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

const StyledIcon = styled.img`
  height: 70%;
  vertical-align: middle;
`

function CopyButton(props: { roomCode: string }) {
  const { showPopover, handleClose, id, open, anchorEl } = usePopover()

  const handleCopy = (e: React.MouseEvent<HTMLButtonElement>) => {
    showPopover(e)
    copyToClipboard(props.roomCode)
    setTimeout(handleClose, 1000)
  }

  return (
    <StyledButton aria-describedby={id} onClick={handleCopy}>
      <StyledPopover
        id={id}
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
      </StyledPopover>
      <StyledIcon src="/static/images/copy.png" />
    </StyledButton>
  )
}

export default CopyButton
