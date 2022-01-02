import React from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import { MediaPlayerRenderProps } from '../mediaPlayer/MediaPlayer'

const Content = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

const SliderWrapper = styled.div`
  display: flex;
  width: 180px;
  margin: 0 20px 0 20px;
`

const VolumeWrapper = styled.div`
  width: 84px;
`

const TimeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 10px 0 5px;
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
    PlayerVolume,
    mediaRef
  } = props
  return (
    <Content>
      {PlayerButton}
      <TimeWrapper>
        {MediaCurrentTime} <Text bold> / </Text> {MediaDuration}
      </TimeWrapper>
      <SliderWrapper>{PlayerSlider}</SliderWrapper>
      <VolumeWrapper>{PlayerVolume}</VolumeWrapper>
    </Content>
  )
}

export default AudioPlayer
