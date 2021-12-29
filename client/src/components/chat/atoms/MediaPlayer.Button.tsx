import {
  ExtendButtonBase,
  IconButton,
  IconButtonProps,
  IconButtonTypeMap
} from '@mui/material'
import React from 'react'
import styled, { DefaultTheme, StyledComponent } from 'styled-components'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ReplayIcon from '@mui/icons-material/Replay'
import PauseIcon from '@mui/icons-material/Pause'
import { SvgIconProps } from '@material-ui/core'

const StyledButton = styled(IconButton)`
  height: min-content;
  margin: 5px;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: ${props => props.theme.colors.primary.main.elevation_2};
  }
  & > svg {
    color: whitesmoke;
  }
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
    return <StyledButton {...props}>{playIcon(mediaState)}</StyledButton>
  }
  return <StyledButton {...props}>{children}</StyledButton>
}

export default PlayerButton
