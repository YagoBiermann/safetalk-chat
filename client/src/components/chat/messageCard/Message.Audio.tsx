import React, { useRef } from 'react'
import MediaPlayer from '../mediaPlayer/MediaPlayer'
import AudioPlayer from '../mediaPlayer/MediaPlayer.WithAudio'

type AudioMessageProps = {
  src: string
  type: string
}

function AudioMessage(props: AudioMessageProps) {
  const { src, type } = props

  const audioRef = useRef<HTMLAudioElement>(null)
  return (
    <>
      <audio preload="metadata" ref={audioRef}>
        <source src={src} type={type} />
      </audio>
      <MediaPlayer
        media={audioRef}
        render={(
          PlayerVolume,
          PlayerSlider,
          PlayerButton,
          MediaCurrentTime,
          MediaDuration
        ) => (
          <AudioPlayer
            PlayerVolume={PlayerVolume}
            PlayerSlider={PlayerSlider}
            PlayerButton={PlayerButton}
            MediaDuration={MediaDuration}
            MediaCurrentTime={MediaCurrentTime}
          />
        )}
      />
    </>
  )
}

export { AudioMessage }
