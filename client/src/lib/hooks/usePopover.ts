import React from 'react'

const usePopover = () => {
  const [anchorEl, setAnchorEl] = React.useState<Element | null>(null)

  const showPopover = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  return { showPopover, handleClose, open, anchorEl }
}
export default usePopover
