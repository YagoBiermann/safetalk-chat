import React from 'react'
import styled from 'styled-components'
import RegularText from '../../global/RegularText'
import { MediaPlayerRenderProps } from '../mediaPlayer/MediaPlayer'
import {
  AudioPlayerContentTablet,
  AudioPlayerTimeTablet
} from './MediaPlayer.MediaQueries'

const Content = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  width: 350px;
  ${AudioPlayerContentTablet}
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

  ${AudioPlayerTimeTablet}
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
          {MediaCurrentTime} <RegularText bold> / </RegularText> {MediaDuration}
        </TimeWrapper>
        <VolumeWrapper>{PlayerVolume}</VolumeWrapper>
      </Content>
      <SliderWrapper>{PlayerSlider}</SliderWrapper>
    </>
  )
}

export default AudioPlayer
