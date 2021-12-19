import React from 'react'
import styled from 'styled-components'

const Video = styled.video`
  max-width: inherit;
  max-height: inherit;
`

const PreviewVideo: React.FC<React.VideoHTMLAttributes<HTMLVideoElement>> =
  (props: { src?: string }) => {
    return <Video controls src={props.src}></Video>
  }

export default PreviewVideo
