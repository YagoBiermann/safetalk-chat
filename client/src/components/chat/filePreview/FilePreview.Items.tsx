import React from 'react'
import styled from 'styled-components'
import PreviewImage from './Items.Image'
import PreviewFile from './Items.File'
import PreviewVideo from './Items.Video'
import { DropFile } from '../../../lib/interfaces'

const PreviewThumbnail = styled.div`
  display: flex;
  max-width: 70vw;
  max-height: 70vh;
`

const previewItems = (type: string, file: DropFile) => {
  switch (true) {
    case type.includes('image'):
      return <PreviewImage src={file.preview} />

    case type.includes('video'):
      return <PreviewVideo src={file.preview} />

    case type.includes('application') || type.includes('text/plain'):
      return <PreviewFile file={file} />
      
    default:
      break
  }
}

type PreviewTypes = {
  file: DropFile
}

function PreviewItems(props: PreviewTypes) {
  const { file } = props
  return <PreviewThumbnail>{previewItems(file.type, file)}</PreviewThumbnail>
}

export default PreviewItems
