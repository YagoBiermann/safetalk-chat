import { useState, useEffect } from 'react'

type usePlayerProps = ReturnType<typeof usePlayer>

const usePlayer = (
  media: React.RefObject<HTMLVideoElement | HTMLAudioElement | null>
) => {
  const [mediaState, setMediaState] = useState({
    playing: false,
    finish: false
  })
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)

  useEffect(() => {
    if (media.current) {
      media.current.ontimeupdate = () => {
        setCurrentTime(media.current!.currentTime)
      }
    }
  }, [media.current])

  useEffect(() => {
    if (media.current) {
      media.current.onloadedmetadata = () => {
        setDuration(media.current!.duration)
      }
    }
  }, [media.current])

  useEffect(() => {
    if (media.current) {
      media.current.onended = () => {
        setMediaState({
          playing: false,
          finish: true
        })
      }
    }
  }, [media.current])

  const handlePlay = () => {
    if (media.current) {
      if (mediaState.playing) {
        media.current.pause()
        setMediaState(prev => ({ ...prev, playing: false }))
      } else {
        media.current.play()
        setMediaState({ finish: false, playing: true })
      }
    }
  }

  const handleMute = () => {
    if (media.current) {
      if (media.current.volume === 0) {
        setVolume(1)
        media.current.volume = 1
      } else {
        media.current.volume = 0
        setVolume(0)
      }
    }
  }

  const handleVolume = (volume: number) => {
    if (media.current) {
      setVolume(volume / 100)
      media.current.volume = volume / 100
    }
  }

  const handleSeekChange = (e: Event, value: number | number[]) => {
    if (media.current) {
      media.current.currentTime = value as number
      setCurrentTime(value as number)
    }
  }

  const handleSeekMouseDown = (e: any) => {
    if (media.current) {
      media.current.pause()
      setMediaState(prev => ({ ...prev, playing: false }))
    }
  }

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement>) => {
    if (media.current) {
      media.current.play()
      setMediaState({ finish: false, playing: true })
    }
  }

  return {
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
  }
}

export { usePlayer }
export type { usePlayerProps }
