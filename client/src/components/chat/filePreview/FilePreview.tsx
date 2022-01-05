import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PreviewCloseButton from './FilePreview.CloseButton'
import PreviewSend from './FilePreview.Form'
import PreviewItems from './FilePreview.Items'
import { DropFile } from '../../../lib/interfaces'
import { motion } from 'framer-motion'

const PreviewBox = styled(motion.div)`
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
  const [submitted, setSubmitted] = useState(false)

  return (
    <PreviewBox
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        scale: [0, 1.1, 1],
        opacity: [0, 0.5, 1],
        transition: {
          ease: 'easeInOut',
          duration: 1
        }
      }}
      exit={
        submitted
          ? {
              y: -30,
              scale: 0,
              transition: {
                ease: 'easeInOut',
                repeat: 2,
                repeatType: 'reverse',
                scale: { delay: 0.5 }
              }
            }
          : {
              x: 1000,
              opacity: 0,
              transition: { ease: 'linear', duration: 0.1 }
            }
      }
    >
      <PreviewCloseButton onClick={closeWithoutSave} />
      <PreviewItems file={files[0]} />
      <PreviewSend file={files[0]} submitted={setSubmitted} close={close} />
    </PreviewBox>
  )
}

export default FilePreview
