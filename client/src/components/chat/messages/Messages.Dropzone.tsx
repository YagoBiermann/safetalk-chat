import React, { HTMLAttributes, useContext, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { fileContext } from '../../../lib/context/fileContext'
import createFilePreview from '../../../lib/helpers/createFilePreview'
import { useAppDispatch } from '../../../store'
import { setError } from '../../../store/ducks/app'
import {
  dropzoneOuterBoxMobile,
  dropzoneInnerBoxMobile
} from './Messages.MediaQueries'
import { motion } from 'framer-motion'

const Background = styled.div<{ position: number }>`
  width: 100%;
  height: 100%;
  top: ${props => props.position}px;
  background: rgba(12, 12, 12, 0.2);
  position: absolute;
  z-index: 999;
`

const OuterBox = styled(motion.div)`
  display: flex;
  position: absolute;
  background-color: ${props => props.theme.colors.dark.elevation_2};
  border: 2px solid ${props => props.theme.colors.primary.main};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;

  ${dropzoneOuterBoxMobile}
`

const InnerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 70%;
  border-radius: 12px;
  border: 5px dashed ${props => props.theme.colors.dark.elevation_6};

  ${dropzoneInnerBoxMobile}
`

const activeStyle = {
  borderColor: 'rgb(100, 40, 140, 0.5)'
}

const DropText = styled.h4`
  color: ${props => props.theme.fontColor.tertiary};
`

type DropzoneProps = HTMLAttributes<HTMLDivElement> & {
  close: () => void
  position: number
}

const Dropzone = (props: DropzoneProps) => {
  const dispatch = useAppDispatch()
  const { files, setFiles } = useContext(fileContext)
  const { isDragActive, getRootProps, getInputProps } = useDropzone({
    noDragEventsBubbling: true,
    multiple: false,
    noClick: true,
    maxSize: 1024 ** 3, //1 Gb
    noKeyboard: true,
    onDropAccepted: acceptedFiles => {
      acceptedFiles.forEach(file => {
        setFiles([...files, createFilePreview(file)])
      }),
        props.close()
    },
    onDropRejected: () => {
      dispatch(setError('File not supported'))
      props.close()
    }
  })

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {})
    }),
    [isDragActive]
  )

  return (
    <Background position={props.position}>
      <OuterBox
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          transition: { duration: 0.25, ease: 'easeInOut' }
        }}
        exit={{
          scale: 0,
          opacity: 0,
          transition: { duration: 0.2, ease: 'easeInOut' }
        }}
      >
        <InnerBox {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <DropText>Drop your file here</DropText>
        </InnerBox>
      </OuterBox>
    </Background>
  )
}

export default Dropzone
