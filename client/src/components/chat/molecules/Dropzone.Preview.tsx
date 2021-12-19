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
import PreviewSendButton from '../atoms/Preview.SendButton'
import PreviewImage from '../atoms/Preview.Image'
import PreviewFile from '../atoms/Preview.File'
import PreviewVideo from '../atoms/Preview.Video'

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
  min-width: 30vw;
  min-height: 50vh;
`

const PreviewThumbnail = styled.div`
  max-width: 70vw;
  max-height: 70vh;
`

const CloseButton = styled(OutlinedButton)`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  z-index: 9999;
  &:hover {
    transform: scale(1);
  }
`

const InputBox = styled.div`
  display: flex;
  flex-direction: row;
  height: 48px;
  width: 100%;
`

const PreviewInput = styled(PrimaryInput)`
  border-radius: 0px 0px 0px 10px;
  background-color: ${props => props.theme.colors.primary.main.elevation_4};
  height: inherit;
  width: 100%;
  &::placeholder {
    color: ${props => props.theme.fontColor.secondary};
  }
`

function Preview(props: { files: DropFile[]; close: any }) {
  const file = props.files[0]

  const handleClose = () => {
    URL.revokeObjectURL(file.preview)
    props.close()
  }

  return (
    <PreviewBox>
      <CloseButton onClick={handleClose}>
        <Close fontSize="large" />
      </CloseButton>
      <PreviewThumbnail>
        <PreviewFile name={'jubileu'} size={43444} type='MP4' />
      </PreviewThumbnail>
      <InputBox>
        <PreviewInput placeholder="say something about it" />
        <PreviewSendButton />
      </InputBox>
    </PreviewBox>
  )
}

export default Preview
