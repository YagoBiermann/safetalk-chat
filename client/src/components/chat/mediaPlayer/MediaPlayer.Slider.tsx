import { Slider } from '@mui/material'
import React from 'react'
import styled from 'styled-components'

const StyledSlider = styled(Slider)`
  & > .MuiSlider-track,
  .MuiSlider-rail {
    background-color: rgba(150, 58, 166, 0.85);
  }
  & > .MuiSlider-thumb {
    box-shadow: none;
    background-color: ${props => props.theme.fontColor.secondary};
  }
`

type PlayerSliderProps = {
  currentTime: number
  duration: number
  handleSeekMouseUp: (e: React.MouseEvent<HTMLInputElement>) => void
  handleSeekMouseDown: (e: React.MouseEvent<HTMLInputElement>) => void
  handleSeekChange: (event: Event, value: number | number[]) => void
}

function PlayerSlider(props: PlayerSliderProps) {
  const {
    currentTime,
    duration,
    handleSeekChange,
    handleSeekMouseDown,
    handleSeekMouseUp
  } = props
  return (
    <StyledSlider
      onMouseUp={handleSeekMouseUp}
      onMouseDown={handleSeekMouseDown}
      onChange={handleSeekChange}
      value={currentTime}
      max={duration}
      size="small"
      step={0.1}
    />
  )
}

export default PlayerSlider
