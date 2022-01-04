import React, { HTMLAttributes, useContext, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { fileContext } from '../../../lib/context/fileContext'
import createFilePreview from '../../../lib/helpers/createFilePreview'
import { useAppDispatch } from '../../../store'
import { setError } from '../../../store/ducks/app'
import { acceptedTypes } from '../../../lib/enums'

const Background = styled.div<{ position: number }>`
  width: 100%;
  height: 100%;
  top: ${props => props.position}px;
  background: rgba(12, 12, 12, 0.2);
  position: absolute;
  z-index: 999;
`

const OuterBox = styled.div`
  display: flex;
  position: absolute;
  background-color: ${props => props.theme.colors.grey.elevation_0};
  border: 2px solid ${props => props.theme.colors.primary.main.elevation_4};
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  top: 25%;
  left: 25%;
  width: 50%;
  height: 50%;
`

const InnerBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  height: 70%;
  border-radius: 12px;
  border: 5px dashed ${props => props.theme.colors.grey.elevation_2};
`

const activeStyle = {
  borderColor: 'rgb(101, 41, 138, 0.65)'
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
    noKeyboard: true,
    accept: acceptedTypes,
    onDropAccepted: acceptedFiles => {
      acceptedFiles.forEach(file => {
        setFiles([...files, createFilePreview(file)])
      }),
        props.close()
    },
    onDropRejected: () => {
      dispatch(setError('File type not supported'))
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
      <OuterBox>
        <InnerBox {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <DropText>Drop your file here</DropText>
        </InnerBox>
      </OuterBox>
    </Background>
  )
}

export default Dropzone
