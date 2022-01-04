import React from 'react'
import styled from 'styled-components'
import PreviewCloseButton from './FilePreview.CloseButton'
import PreviewSend from './FilePreview.Form'
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

type PreviewTypes = {
  files: DropFile[]
  close: () => void
  closeWithoutSave: () => void
}

function FilePreview(props: PreviewTypes) {
  const { files, close, closeWithoutSave } = props

  return (
    <PreviewBox>
      <PreviewCloseButton onClick={closeWithoutSave} />
      <PreviewItems file={files[0]} />
      <PreviewSend file={files[0]} close={close} />
    </PreviewBox>
  )
}

export default FilePreview
