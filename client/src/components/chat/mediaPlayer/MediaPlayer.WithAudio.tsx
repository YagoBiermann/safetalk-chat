import React from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import { MediaPlayerRenderProps } from '../mediaPlayer/MediaPlayer'

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 350px;

  @media (max-width: ${props => props.theme.mediaWidthSizes.large}) {
    justify-content: flex-start;
    width: 300px;
  }
`

const SliderWrapper = styled.div`
  display: flex;
  width: 85%;
  align-self: center;
`

const VolumeWrapper = styled.div`
  width: 84px;
  
`

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;

  @media (max-width: ${props => props.theme.mediaWidthSizes.large}) {
    margin: 0 15px 0 5px;
  }
`

const Text = styled.p`
  ${TextMessageStyle};
`

type AudioPlayerProps = MediaPlayerRenderProps & {
  mediaRef?: React.RefObject<HTMLAudioElement | null>
}

function AudioPlayer(props: AudioPlayerProps) {
  const {
    MediaCurrentTime,
    MediaDuration,
    PlayerButton,
    PlayerSlider,
    PlayerVolume
  } = props
  return (
    <>
      <Content>
        {PlayerButton}
        <TimeWrapper>
          {MediaCurrentTime} <Text bold> / </Text> {MediaDuration}
        </TimeWrapper>
        <VolumeWrapper>{PlayerVolume}</VolumeWrapper>
      </Content>
      <SliderWrapper>{PlayerSlider}</SliderWrapper>
    </>
  )
}

export default AudioPlayer
