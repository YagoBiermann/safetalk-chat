import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import { DropFile } from '../../../lib/interfaces'
import { useAppDispatch } from '../../../store'
import { setError } from '../../../store/ducks/app'

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

const DropText = styled.h2`
  font-family: ${props => props.theme.fonts.primary};
  color: ${props => props.theme.fontColor.tertiary};
`

const Dropzone = React.forwardRef(
  (props: any, ref: ForwardedRef<HTMLDivElement>) => {
    const dispatch = useAppDispatch()
    const [files, setFiles] = useState<DropFile[]>([])
    const {
      acceptedFiles,
      fileRejections,
      isDragAccept,
      isDragActive,
      getRootProps,
      getInputProps,
      rootRef
    } = useDropzone({
      noDragEventsBubbling: true,
      multiple: false,
      noClick: true,
      noKeyboard: true,
      accept:
        'image/png, image/jpeg, video/mp4, video/mov, video/wmv, video/avi',
      onDrop: acceptedFiles => {
        setFiles(
          acceptedFiles.map(file =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          )
        )
      },
      onDropRejected: () => {
        props.open(false)
        dispatch(setError('File type not supported'))
      }
    })

    const style = useMemo(
      () => ({
        ...(isDragActive ? activeStyle : {})
      }),
      [isDragActive]
    )

    useEffect(() => {
      files.forEach(file => {
        URL.revokeObjectURL(file.preview)
      })
    }, [files])

    if (files.length > 0) {
      return props.render(files)
    }

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
