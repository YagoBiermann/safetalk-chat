import React from 'react'
import styled from 'styled-components'
import PreviewCloseButton from '../atoms/Preview.closeButton'
import PreviewSend from './FilePreview.Send'
import PreviewItems from './FilePreview.Items'
import { DropFile } from '../../../lib/interfaces'

const PreviewBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 10px 10px 10px 10px;
  background-color: ${props => props.theme.colors.grey.elevation_0};
  overflow: hidden;
  z-index: 999;
  min-width: 15vw;
  min-height: 30vh;
`

type previewTypes = {
  files: DropFile[]
  close: () => void
}

function FilePreview(props: previewTypes) {
  const { files, close } = props

  return (
    <PreviewBox>
      <PreviewCloseButton onClick={close} />
      <PreviewItems file={files[0]} />
      <PreviewSend />
    </PreviewBox>
  )
}

export default FilePreview
