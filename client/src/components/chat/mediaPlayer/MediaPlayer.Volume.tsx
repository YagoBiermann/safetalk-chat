import { IconButton, Slider } from '@mui/material'
import React from 'react'
import styled from 'styled-components'
import { styled as muiStyled } from '@mui/material/styles'
import VolumeUpIcon from '@mui/icons-material/VolumeUp'
import VolumeOffIcon from '@mui/icons-material/VolumeOff'
import VolumeDownIcon from '@mui/icons-material/VolumeDown'

const VolumeBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-radius: 15px;
  background-color: ${props => props.theme.colors.dark.elevation_4};
  flex-direction: row;
  width: 0px;
  height: max-content;
  position: relative;
  transition: width 0.1s ease-in;

  &:hover,
  &:active {
    width: 125px;
  }

  &:hover > .MuiSlider-root {
    width: 64px;
    overflow: visible;
  }
`

const VolumeSlider = muiStyled(Slider)`
  position: absolute;
  overflow: hidden;
  left: 45px;
  width: 0px;
  transition: width 0.2s ease;
  &:active {
    width: 64px;
    overflow: visible;
  }
`

type MediaPlayerVolumeProps = {
  volume: number
  handleMute: () => void
  handleVolume: (volume: number) => void
}

function MediaPlayerVolume(props: MediaPlayerVolumeProps) {
  const { volume, handleMute, handleVolume } = props

  const volumeIcon = (volume: number) => {
    if (volume === 0) return <VolumeOffIcon />
    if (volume < 0.5) return <VolumeDownIcon />
    return <VolumeUpIcon />
  }

  return (
    <>
      <VolumeBox>
        <IconButton color="primary" size="small" onClick={handleMute}>
          {volumeIcon(volume)}
        </IconButton>
        <VolumeSlider
          onChange={(e: any) => {
            handleVolume(e.target.value as number)
          }}
          value={volume * 100}
          size="small"
        />
      </VolumeBox>
    </>
  )
}

export default MediaPlayerVolume
