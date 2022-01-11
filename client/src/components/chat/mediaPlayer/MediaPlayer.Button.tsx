import { IconButtonProps, IconButton } from '@mui/material'
import { styled as muiStyled } from '@mui/material/styles'
import React from 'react'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ReplayIcon from '@mui/icons-material/Replay'
import PauseIcon from '@mui/icons-material/Pause'
import { SvgIconProps } from '@material-ui/core'

const MediaButton = muiStyled(IconButton)`
  margin: 0 5px 0 5px;
`

type PlayerButtonProps = IconButtonProps & {
  mediaState?: { playing: boolean; finish: boolean }
  children?: SvgIconProps
}

const PlayerButton = ({
  mediaState,
  children,
  ...props
}: PlayerButtonProps) => {
  const playIcon = (mediaState: { playing: boolean; finish: boolean }) => {
    if (mediaState.playing) return <PauseIcon />
    if (mediaState.finish) return <ReplayIcon />
    return <PlayArrowIcon />
  }
  if (mediaState) {
    return (
      <MediaButton color="primary" size="small" {...props}>
        {playIcon(mediaState)}
      </MediaButton>
    )
  }
  return (
    <MediaButton color="primary" size="small" {...props}>
      {children}
    </MediaButton>
  )
}

export default PlayerButton
