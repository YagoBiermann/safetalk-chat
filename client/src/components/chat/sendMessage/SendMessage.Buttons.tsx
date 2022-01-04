import React from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import EmojiButton from './Buttons.Emoji'
import UploadButton from './Buttons.Upload'
import SendButton from './Buttons.Send'
import RecordButton from './Buttons.Record'

const MainBox = styled(Box)`
  flex-direction: row;
  justify-content: space-evenly;
  margin-left: 10px;
  & > button {
    margin-left: 15px;
  }

  @media screen and (max-width: ${props =>
      props.theme.mediaWidthSizes.medium}) {
    margin: 0 0 15px 0;
    width: 100%;
    justify-content: center;
    flex-direction: row-reverse;
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
