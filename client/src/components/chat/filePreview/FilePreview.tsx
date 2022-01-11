import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import PreviewCloseButton from './FilePreview.CloseButton'
import PreviewSend from './FilePreview.Form'
import PreviewItems from './FilePreview.Items'
import { DropFile } from '../../../lib/interfaces'
import { motion } from 'framer-motion'
import DarkenBackground from '../../global/DarkenBackground'
import { filePreviewAnimations } from './FilePreview.Animations'

const PreviewBox = styled(motion.div)`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  border-radius: 10px 10px 10px 10px;
  background-color: ${props => props.theme.colors.dark.elevation_4};
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
  const backgroundRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeWithoutSave()
    }
  }

  return (
    <DarkenBackground onClick={handleClickOutside}>
      <PreviewBox
        variants={filePreviewAnimations}
        animate="animate"
        initial="initial"
        exit="exit"
      >
        <PreviewCloseButton onClick={closeWithoutSave} />
        <PreviewItems file={files[0]} />
        <PreviewSend file={files[0]} close={close} />
      </PreviewBox>
    </DarkenBackground>
  )
}

export default FilePreview
