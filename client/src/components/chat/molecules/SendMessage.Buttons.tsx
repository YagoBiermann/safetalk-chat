import React from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import EmojiButton from '../atoms/Buttons.Emoji'
import UploadButton from '../atoms/Buttons.Upload'
import SendButton from '../atoms/Buttons.Send'
import RecordButton from '../atoms/Buttons.Record'

const MainBox = styled(Box)`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  margin-left: 10px;
  & > button {
    margin-left: 15px;
  }
`

function SendMessageButtons(props: {
  hasMessage: boolean
  startRecord: () => void
}) {
  return (
    <>
      <MainBox>
        {props.hasMessage ? (
          <SendButton form="messageForm" type="submit" />
        ) : (
          <RecordButton onClick={props.startRecord} />
        )}
        <EmojiButton />
        <UploadButton />
      </MainBox>
    </>
  )
}

export default SendMessageButtons
