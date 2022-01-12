import React from 'react'
import { usePlayer } from '../../../lib/hooks/usePlayer'
import MediaPlayerVolume from './MediaPlayer.Volume'
import PlayerSlider from './MediaPlayer.Slider'
import PlayerButton from './MediaPlayer.Button'
import { calculateTime } from '../../../lib/helpers/calculateTime'
import RegularText from '../../global/RegularText'

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
    MediaDuration: JSX.Element
  ) => JSX.Element
}

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
        <RegularText bold>{calculateTime(currentTime)}</RegularText>,
        <RegularText bold>{calculateTime(duration)}</RegularText>
      )}
    </>
  )
}

export default MediaPlayer
