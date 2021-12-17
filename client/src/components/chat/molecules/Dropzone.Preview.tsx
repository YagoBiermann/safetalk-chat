import React, {
  ForwardedRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import styled from 'styled-components'
import PrimaryInput from '../../global/Input.Primary'
import OutlinedButton from '../../global/Button.Outlined'
import Close from '@material-ui/icons/Close'
import { useForm } from 'react-hook-form'
import { DropFile } from '../../../lib/interfaces'
import PreviewImage from '../atoms/Preview.Image'
import PreviewSendButton from '../atoms/Preview.SendButton'

const PreviewBox = styled.div`
  position: relative;
  display: flex;
  align-self: center;
  flex-direction: column;
  background-color: ${props => props.theme.colors.grey.elevation_0};
  border-radius: 10px 10px 25px 10px;
  max-width: 70%;
  max-height: auto;
`

const PreviewThumbnail = styled.div`
  width: 100%;
  height: 100%;
`

const CloseButton = styled(OutlinedButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  &:hover {
    transform: scale(1);
  }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
`

const PreviewInput = styled(PrimaryInput)`
  border-radius: 0px 0px 0px 10px;
`

function Preview(props: { files: DropFile[]; close: any }) {
  const file = props.files[0]

  const handleClose = () => {
    URL.revokeObjectURL(file.preview)
    props.close()
  }

  useEffect(() => {
    console.log(file)
  })

  return (
    <PreviewBox>
      <CloseButton onClick={handleClose}>
        <Close fontSize="large" />
      </CloseButton>
      <PreviewThumbnail>
        <PreviewImage src={file.preview} />
      </PreviewThumbnail>
      <InputBox>
        <PreviewInput width={'100%'} />
        <PreviewSendButton />
      </InputBox>
    </PreviewBox>
  )
}

export default Preview
