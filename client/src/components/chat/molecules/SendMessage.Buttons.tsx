import React, { useEffect, useState } from 'react'
import Box from '../../global/Box'
import styled from 'styled-components'
import EmojiButton from '../atoms/Buttons.Emoji'
import UploadButton from '../atoms/Buttons.Upload'

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
  return (
    <>
      (
      <MainBox>
        {props.children}
        <EmojiButton />
        <UploadButton />
      </MainBox>
      )
    </>
  )
}

export default SendMessageButtons
