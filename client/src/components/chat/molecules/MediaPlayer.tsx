import React from 'react'
import { usePlayer } from '../../../lib/hooks/usePlayer'
import MediaPlayerVolume from '../atoms/MediaPlayer.Volume'
import PlayerSlider from '../atoms/MediaPlayer.Slider'
import PlayerButton from '../atoms/MediaPlayer.Button'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import { calculateTime } from '../../../lib/helpers/calculateTime'

export type MediaPlayerRenderProps = {
  PlayerVolume: JSX.Element
  PlayerSlider: JSX.Element
  PlayerButton: JSX.Element
  MediaCurrentTime: JSX.Element
  MediaDuration: JSX.Element
}

type MediaPlayerProps = {
  media: React.RefObject<HTMLVideoElement | HTMLAudioElement | null>
  render: (
    PlayerVolume: JSX.Element,
    PlayerSlider: JSX.Element,
    PlayerButton: JSX.Element,
    MediaCurrentTime: JSX.Element,
    MediaDuration: JSX.Element,
  ) => JSX.Element
}

const Text = styled.p`
  ${TextMessageStyle}
`

function MediaPlayer(props: MediaPlayerProps) {
  const {
    mediaState,
    currentTime,
    duration,
    volume,
    handleMute,
    handleVolume,
    handlePlay,
    handleSeekMouseDown,
    handleSeekMouseUp,
    handleSeekChange
  } = usePlayer(props.media)

  return (
    <>
      {props.render(
        <MediaPlayerVolume
          handleMute={handleMute}
          handleVolume={handleVolume}
          volume={volume}
        />,
        <PlayerSlider
          currentTime={currentTime}
          duration={duration}
          handleSeekChange={handleSeekChange}
          handleSeekMouseDown={handleSeekMouseDown}
          handleSeekMouseUp={handleSeekMouseUp}
        />,
        <PlayerButton onClick={handlePlay} mediaState={mediaState} />,
        <Text bold>{calculateTime(currentTime)}</Text>,
        <Text bold>{calculateTime(duration)}</Text>
      )}
    </>
  )
}

export default MediaPlayer
