import React, { useEffect } from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import EmojiButton from '../atoms/Buttons.Emoji'
import SendButton from '../atoms/Buttons.Send'
import RecordButton from '../atoms/Buttons.Record'
import UploadButton from '../atoms/Buttons.Upload'
import useRecorder from '../../../lib/hooks/useRecorder'
import RecordAudio from './RecordAudio'

const MainBox = styled(Box)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 10px;
  & > button {
    margin-left: 15px;
  }
`

function SendMessageButtons(props: any) {
  const { startRecord, finishRecord, cancelRecord, recorder } = useRecorder()

  return (
    <>
      {recorder.isRecording ? (
        <RecordAudio
          finish={finishRecord}
          cancel={cancelRecord}
          data={recorder.audio}
        />
      ) : (
        <MainBox>
          {props.hasMessage ? (
            <SendButton type="submit" />
          ) : (
            <RecordButton onClick={startRecord} />
          )}
          <EmojiButton />
          <UploadButton />
        </MainBox>
      )}
    </>
  )
}

export default SendMessageButtons
