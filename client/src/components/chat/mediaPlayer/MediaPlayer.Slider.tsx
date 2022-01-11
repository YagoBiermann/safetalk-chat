import { Slider } from '@mui/material'
import React from 'react'

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
    <Slider
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
