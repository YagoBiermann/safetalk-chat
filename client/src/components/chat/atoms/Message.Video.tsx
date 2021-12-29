import { Divider } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import TextMessageStyle from '../../../assets/styles/default.ChatMessage'
import MediaPlayer from '../molecules/MediaPlayer'
import VideoPlayer from './VideoPlayer'

const VideoTemplate = styled.video`
  align-self: center;
  width: 100%;
  height: auto;
`

const Text = styled.p<{ bold?: boolean; fontSize?: string }>`
  ${TextMessageStyle};
  margin: 10px 10px 0 10px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
`

function VideoMessage(props: { videoURL: string; message?: string }) {
  const { videoURL, message } = props
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <Content>
      <VideoTemplate ref={videoRef} src={videoURL} />
      <MediaPlayer
        media={videoRef}
        render={(
          PlayerVolume,
          PlayerSlider,
          PlayerButton,
          MediaCurrentTime,
          MediaDuration
        ) => (
          <VideoPlayer
            PlayerVolume={PlayerVolume}
            PlayerSlider={PlayerSlider}
            PlayerButton={PlayerButton}
            MediaCurrentTime={MediaCurrentTime}
            MediaDuration={MediaDuration}
            mediaRef={videoRef}
          />
        )}
      />
      <Divider color="#424242" />
      {message ? <Text>{message}</Text> : null}
    </Content>
  )
}

export { VideoMessage }
