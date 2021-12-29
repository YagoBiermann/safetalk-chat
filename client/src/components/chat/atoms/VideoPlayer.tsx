import React from 'react'
import { default as VideoButton } from './MediaPlayer.Button'
import FullscreenIcon from '@mui/icons-material/Fullscreen'
import PictureInPictureIcon from '@mui/icons-material/PictureInPicture'
import styled from 'styled-components'
import { MediaPlayerRenderProps } from '../molecules/MediaPlayer'

const PlayerBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  width: 100%;
`
const VolumeContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SliderBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 32px;
  margin-bottom: 15px;
  justify-content: space-around;
  width: 100%;
`
const SliderWrapper = styled.div`
  display: flex;
  width: 60%;
`

type VideoPlayerProps = MediaPlayerRenderProps & {
  mediaRef: React.RefObject<HTMLVideoElement | null>
}

function VideoPlayer(props: VideoPlayerProps) {
  const {
    PlayerButton,
    PlayerSlider,
    PlayerVolume,
    MediaCurrentTime,
    MediaDuration,
    mediaRef
  } = props
  const togglePiP = () => {
    if (document.pictureInPictureElement) {
      document.exitPictureInPicture()
    }
    if (document.pictureInPictureEnabled) {
      mediaRef.current?.requestPictureInPicture()
    }
  }
  return (
    <>
      <PlayerBox>
        <VolumeContainer>
          {PlayerButton}
          {PlayerVolume}
        </VolumeContainer>
        <div>
          <VideoButton onClick={() => mediaRef.current?.requestFullscreen()}>
            <FullscreenIcon />
          </VideoButton>
          <VideoButton onClick={togglePiP}>
            <PictureInPictureIcon />
          </VideoButton>
        </div>
      </PlayerBox>
      <SliderBox>
        {MediaCurrentTime}
        <SliderWrapper>{PlayerSlider}</SliderWrapper>
        {MediaDuration}
      </SliderBox>
    </>
  )
}

export default VideoPlayer
