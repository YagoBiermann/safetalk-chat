import React, { ForwardedRef, useContext, useMemo } from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { fileContext } from '../../../lib/context/fileContext'
import createFilePreview from '../../../lib/helpers/createFilePreview'
import { useAppDispatch } from '../../../store'
import { setError } from '../../../store/ducks/app'
import { acceptedTypes } from '../../../lib/enums'

const OuterBox = styled.div`
  display: flex;
  position: absolute;
  background-color: ${props => props.theme.colors.grey.elevation_0};
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

const Dropzone = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLDivElement>) => {
    const dispatch = useAppDispatch()
    const { files, setFiles } = useContext(fileContext)
    const { isDragActive, getRootProps, getInputProps } = useDropzone({
      noDragEventsBubbling: true,
      multiple: false,
      noClick: true,
      noKeyboard: true,
      accept: acceptedTypes,
      onDropAccepted: acceptedFiles => {
        console.log(acceptedFiles)
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
      <OuterBox {...getRootProps({ ref })}>
        <InnerBox {...getRootProps({ style })}>
          <input {...getInputProps()} />
          <DropText>Drop your file here</DropText>
        </InnerBox>
      </OuterBox>
    )
  }
)

export default Dropzone
